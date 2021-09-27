window.AudioContext = window.AudioContext || window.webkitAudioContext;
navigator.mediaDevices = navigator.mediaDevices || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  
const AudioContext = window.AudioContext;

class MuRec {

    constructor() {
        this.recordStart = 0;
        this.data = {};
    }

    async recognize() {
        const context = new AudioContext();

        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
            console.log('navigator.mediaDevices is undefinded.');
        }
        if (navigator.mediaDevices.getUserMedia === undefined) {
            console.log('navigator.mediaDevices.getUserMedia is undefind.');
            navigator.mediaDevices.getUserMedia = constraints => {
    
                const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    
                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser. If you use HTTP, please switch to HTTPS.'));
                }
    
                return new Promise(function(resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            };
        }
        return navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        }).then(async stream => {
            const bufSize = 4096;
            const lenPerBuf = context.sampleRate / bufSize;
            const input = context.createMediaStreamSource(stream);
            let processor = context.createScriptProcessor(bufSize, 1, 1);
            let startTime = context.currentTime;
            const startTimes = [0];
            let currentTime = null;
            let stop = false;
            let retData = null;
            const interval = 5;
            const duration = 20;
            let file = 1;
            let num = [0];
            let errorFlag = false;
            const logs = [];
            let rS = 0;

            input.connect(processor);
            processor.connect(context.destination);

            async function send(data) {
                if(stop) return;
                const i = file;
                const data_file = exportWAVE(data, context.sampleRate);
                const formData = new FormData();
                formData.append('pretty', 1);
                formData.append('per_page', 1);
                formData.append('page', 1);
                formData.append('audio_data', data_file);
                formData.append('relationships[]', 'original_songs');
                console.log('Audio File', i, ': send: ', data_file);

                await fetch(
                    'https://api.songle.jp/api/v2/song/match.json',
                    {
                        method: 'POST',
                        headers: {'Accept': 'application/json'},
                        body: formData
                    }
                ).then(res => res.json()).then(res => {
                    if(res.data.length != 0 && !stop) {
                        console.log('Audio File', i, ': get response: ', res);
                        stop = true;
                        retData = res;
                        rS = (i <= 2) ? startTimes[1] : startTimes[i - 1];
                        context.close();
                        processor.disconnect()
                        processor.onaudioprocess = null;
                        processor = null;
                        stream.getTracks().forEach((track) => {
                            track.stop();
                        });
                    }
                    else if(!stop) {
                        console.log('Audio File', i, ': response is empty.');
                    }
                }).catch(err => {
                    console.log(err.status + ":" + err.statuText);
                });
            }

            const data = [];
            let numOfFiles = -1;
            let flag = true;

            processor.onaudioprocess = e => {
                if(flag) {
                    startTimes.push(performance.now() - 1 / lenPerBuf);
                    flag = false;
                }
                const array = e.inputBuffer.getChannelData(0);
                const bufData = new Float32Array(bufSize);
                for(let i = 0; i < bufSize; i++) {
                    bufData[i] = array[i];
                }
                data.push(bufData);
                currentTime = context.currentTime;
                if(currentTime - startTime > interval && !stop) {
                    send(data.slice(Math.max(0, parseInt(interval * lenPerBuf * numOfFiles)), data.length - 1));
                    flag = true;
                    file++;
                    startTime += interval;
                    numOfFiles++;
                }
            }

            const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
            while(!stop) {
                await wait(1000);
            }
            this.recordStart = rS;
            this.data = retData;
            return retData;
        }).catch(err => {
            console.log('error: ', err);
        });
    }

    exportWAVE(data, sampleRate) {

        function encodeWAVE(samples, sampleRate) {
            const buf = new ArrayBuffer(44 + samples.length * 2);
            const view = new DataView(buf);
    
            function writeString(view, offset, str) {
                for(let i = 0; i < str.length; i++) {
                    view.setUint8(offset + i, str.charCodeAt(i));
                }
            }
    
            function floatTo16bitPCM(output, offset, input) {
                for(let i = 0; i< input.length; i++) {
                    const s = Math.max(-1, Math.min(1, input[i]));
                    output.setInt16(offset, (s < 0) ? (s * 0x8000) : (s * 0x7FFF), true);
                    offset += 2;
                }
            }
    
            writeString(view, 0, 'RIFF');
            view.setUint32(4, 32 + samples.length * 2, true);
            writeString(view, 8, 'WAVE');
            writeString(view, 12, 'fmt ');
            view.setUint32(16, 16, true);
            view.setUint16(20, 1, true);
            view.setUint16(22, 1, true);
            view.setUint32(24, sampleRate, true);
            view.setUint32(28, sampleRate * 2, true);
            view.setUint16(32, 2, true);
            view.setUint16(34, 16, true);
            writeString(view, 36, 'data');
            view.setUint32(40, samples.length * 2, true);
            floatTo16bitPCM(view, 44, samples);
    
            return view;
        }
    
        function mergeBufs(data) {
            let sampleLen = 0;
            for(let i = 0; i < data.length; i++) {
                sampleLen += data[i].length;
            }
            const samples = new Float32Array(sampleLen);
            let index = 0;
            for(let i = 0; i < data.length; i++) {
                for(let j = 0; j < data[i].length; j++) {
                    samples[index] = data[i][j];
                    index++;
                }
            }
            return samples;
        }
    
        const dataView = encodeWAVE(mergeBufs(data), sampleRate);
        return new File([dataView], 'audio.wav', {type: 'audio/wav'});
    }
}

function exportWAVE(data, sampleRate) {

    function encodeWAVE(samples, sampleRate) {
        const buf = new ArrayBuffer(44 + samples.length * 2);
        const view = new DataView(buf);

        function writeString(view, offset, str) {
            for(let i = 0; i < str.length; i++) {
                view.setUint8(offset + i, str.charCodeAt(i));
            }
        }

        function floatTo16bitPCM(output, offset, input) {
            for(let i = 0; i< input.length; i++) {
                const s = Math.max(-1, Math.min(1, input[i]));
                output.setInt16(offset, (s < 0) ? (s * 0x8000) : (s * 0x7FFF), true);
                offset += 2;
            }
        }

        writeString(view, 0, 'RIFF');
        view.setUint32(4, 32 + samples.length * 2, true);
        writeString(view, 8, 'WAVE');
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(view, 36, 'data');
        view.setUint32(40, samples.length * 2, true);
        floatTo16bitPCM(view, 44, samples);

        return view;
    }

    function mergeBufs(data) {
        let sampleLen = 0;
        for(let i = 0; i < data.length; i++) {
            sampleLen += data[i].length;
        }
        const samples = new Float32Array(sampleLen);
        let index = 0;
        for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < data[i].length; j++) {
                samples[index] = data[i][j];
                index++;
            }
        }
        return samples;
    }

    const dataView = encodeWAVE(mergeBufs(data), sampleRate);
    return new File([dataView], 'audio.wav', {type: 'audio/wav'});
}