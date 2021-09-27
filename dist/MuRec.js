(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MuRec"] = factory();
	else
		root["MuRec"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/MuRec.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/MuRec.js":
/*!**********************!*\
  !*** ./src/MuRec.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/*!\n *  MuRec.js v1.0\n *  \n *  Copyright (c) 2020 Ryotaro Toma\n *  \n *   This software is released under the ISC.\n *   see https://opensource.org/licenses/ISC\n!*/\nwindow.AudioContext = window.AudioContext || window.webkitAudioContext;\nnavigator.mediaDevices = navigator.mediaDevices || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;\nvar AudioContext = window.AudioContext;\n\nvar MuRec = /*#__PURE__*/function () {\n  function MuRec() {\n    _classCallCheck(this, MuRec);\n\n    this.recordStart = 0;\n    this.data = {};\n  }\n\n  _createClass(MuRec, [{\n    key: \"recognize\",\n    value: function () {\n      var _recognize = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {\n        var _this = this;\n\n        var context;\n        return regeneratorRuntime.wrap(function _callee3$(_context3) {\n          while (1) {\n            switch (_context3.prev = _context3.next) {\n              case 0:\n                context = new AudioContext();\n\n                if (navigator.mediaDevices === undefined) {\n                  navigator.mediaDevices = {};\n                  console.log('navigator.mediaDevices is undefinded.');\n                }\n\n                if (navigator.mediaDevices.getUserMedia === undefined) {\n                  console.log('navigator.mediaDevices.getUserMedia is undefind.');\n\n                  navigator.mediaDevices.getUserMedia = function (constraints) {\n                    var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;\n\n                    if (!getUserMedia) {\n                      return Promise.reject(new Error('getUserMedia is not implemented in this browser. If you use HTTP, please switch to HTTPS.'));\n                    }\n\n                    return new Promise(function (resolve, reject) {\n                      getUserMedia.call(navigator, constraints, resolve, reject);\n                    });\n                  };\n                }\n\n                return _context3.abrupt(\"return\", navigator.mediaDevices.getUserMedia({\n                  audio: true,\n                  video: false\n                }).then( /*#__PURE__*/function () {\n                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(stream) {\n                    var bufSize, lenPerBuf, input, processor, startTime, startTimes, currentTime, stop, retData, interval, duration, file, num, errorFlag, logs, rS, send, _send, data, numOfFiles, flag, wait;\n\n                    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n                      while (1) {\n                        switch (_context2.prev = _context2.next) {\n                          case 0:\n                            _send = function _send3() {\n                              _send = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {\n                                var i, data_file, formData;\n                                return regeneratorRuntime.wrap(function _callee$(_context) {\n                                  while (1) {\n                                    switch (_context.prev = _context.next) {\n                                      case 0:\n                                        if (!stop) {\n                                          _context.next = 2;\n                                          break;\n                                        }\n\n                                        return _context.abrupt(\"return\");\n\n                                      case 2:\n                                        i = file;\n                                        data_file = exportWAVE(data, context.sampleRate);\n                                        formData = new FormData();\n                                        formData.append('pretty', 1);\n                                        formData.append('per_page', 1);\n                                        formData.append('page', 1);\n                                        formData.append('audio_data', data_file);\n                                        formData.append('relationships[]', 'original_songs');\n                                        console.log('Audio File', i, ': send: ', data_file);\n                                        _context.next = 13;\n                                        return fetch('https://api.songle.jp/api/v2/song/match.json', {\n                                          method: 'POST',\n                                          headers: {\n                                            'Accept': 'application/json'\n                                          },\n                                          body: formData\n                                        }).then(function (res) {\n                                          return res.json();\n                                        }).then(function (res) {\n                                          if (res.data.length != 0 && !stop) {\n                                            console.log('Audio File', i, ': get response: ', res);\n                                            stop = true;\n                                            retData = res;\n                                            rS = i <= 2 ? startTimes[1] : startTimes[i - 1];\n                                            context.close();\n                                            processor.disconnect();\n                                            processor.onaudioprocess = null;\n                                            processor = null;\n                                            stream.getTracks().forEach(function (track) {\n                                              track.stop();\n                                            });\n                                          } else if (!stop) {\n                                            console.log('Audio File', i, ': response is empty.');\n                                          }\n                                        })[\"catch\"](function (err) {\n                                          console.log(err.status + \":\" + err.statuText);\n                                        });\n\n                                      case 13:\n                                      case \"end\":\n                                        return _context.stop();\n                                    }\n                                  }\n                                }, _callee);\n                              }));\n                              return _send.apply(this, arguments);\n                            };\n\n                            send = function _send2(_x2) {\n                              return _send.apply(this, arguments);\n                            };\n\n                            bufSize = 4096;\n                            lenPerBuf = context.sampleRate / bufSize;\n                            input = context.createMediaStreamSource(stream);\n                            processor = context.createScriptProcessor(bufSize, 1, 1);\n                            startTime = context.currentTime;\n                            startTimes = [0];\n                            currentTime = null;\n                            stop = false;\n                            retData = null;\n                            interval = 10;\n                            duration = 20;\n                            file = 1;\n                            num = [0];\n                            errorFlag = false;\n                            logs = [];\n                            rS = 0;\n                            input.connect(processor);\n                            processor.connect(context.destination);\n                            data = [];\n                            numOfFiles = -1;\n                            flag = true;\n\n                            processor.onaudioprocess = function (e) {\n                              if (flag) {\n                                startTimes.push(performance.now() - 1 / lenPerBuf);\n                                flag = false;\n                              }\n\n                              var array = e.inputBuffer.getChannelData(0);\n                              var bufData = new Float32Array(bufSize);\n\n                              for (var i = 0; i < bufSize; i++) {\n                                bufData[i] = array[i];\n                              }\n\n                              data.push(bufData);\n                              currentTime = context.currentTime;\n\n                              if (currentTime - startTime > interval && !stop) {\n                                send(data.slice(Math.max(0, parseInt(interval * lenPerBuf * numOfFiles)), data.length - 1));\n                                flag = true;\n                                file++;\n                                startTime += interval;\n                                numOfFiles++;\n                              }\n                            };\n\n                            wait = function wait(ms) {\n                              return new Promise(function (resolve) {\n                                return setTimeout(resolve, ms);\n                              });\n                            };\n\n                          case 25:\n                            if (stop) {\n                              _context2.next = 30;\n                              break;\n                            }\n\n                            _context2.next = 28;\n                            return wait(1000);\n\n                          case 28:\n                            _context2.next = 25;\n                            break;\n\n                          case 30:\n                            _this.recordStart = rS;\n                            _this.data = retData;\n                            return _context2.abrupt(\"return\", retData);\n\n                          case 33:\n                          case \"end\":\n                            return _context2.stop();\n                        }\n                      }\n                    }, _callee2);\n                  }));\n\n                  return function (_x) {\n                    return _ref.apply(this, arguments);\n                  };\n                }())[\"catch\"](function (err) {\n                  console.log('error: ', err);\n                }));\n\n              case 4:\n              case \"end\":\n                return _context3.stop();\n            }\n          }\n        }, _callee3);\n      }));\n\n      function recognize() {\n        return _recognize.apply(this, arguments);\n      }\n\n      return recognize;\n    }()\n  }, {\n    key: \"exportWAVE\",\n    value: function exportWAVE(data, sampleRate) {\n      function encodeWAVE(samples, sampleRate) {\n        var buf = new ArrayBuffer(44 + samples.length * 2);\n        var view = new DataView(buf);\n\n        function writeString(view, offset, str) {\n          for (var i = 0; i < str.length; i++) {\n            view.setUint8(offset + i, str.charCodeAt(i));\n          }\n        }\n\n        function floatTo16bitPCM(output, offset, input) {\n          for (var i = 0; i < input.length; i++) {\n            var s = Math.max(-1, Math.min(1, input[i]));\n            output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);\n            offset += 2;\n          }\n        }\n\n        writeString(view, 0, 'RIFF');\n        view.setUint32(4, 32 + samples.length * 2, true);\n        writeString(view, 8, 'WAVE');\n        writeString(view, 12, 'fmt ');\n        view.setUint32(16, 16, true);\n        view.setUint16(20, 1, true);\n        view.setUint16(22, 1, true);\n        view.setUint32(24, sampleRate, true);\n        view.setUint32(28, sampleRate * 2, true);\n        view.setUint16(32, 2, true);\n        view.setUint16(34, 16, true);\n        writeString(view, 36, 'data');\n        view.setUint32(40, samples.length * 2, true);\n        floatTo16bitPCM(view, 44, samples);\n        return view;\n      }\n\n      function mergeBufs(data) {\n        var sampleLen = 0;\n\n        for (var i = 0; i < data.length; i++) {\n          sampleLen += data[i].length;\n        }\n\n        var samples = new Float32Array(sampleLen);\n        var index = 0;\n\n        for (var _i = 0; _i < data.length; _i++) {\n          for (var j = 0; j < data[_i].length; j++) {\n            samples[index] = data[_i][j];\n            index++;\n          }\n        }\n\n        return samples;\n      }\n\n      var dataView = encodeWAVE(mergeBufs(data), sampleRate);\n      return new File([dataView], 'audio.wav', {\n        type: 'audio/wav'\n      });\n    }\n  }]);\n\n  return MuRec;\n}();\n\nfunction exportWAVE(data, sampleRate) {\n  function encodeWAVE(samples, sampleRate) {\n    var buf = new ArrayBuffer(44 + samples.length * 2);\n    var view = new DataView(buf);\n\n    function writeString(view, offset, str) {\n      for (var i = 0; i < str.length; i++) {\n        view.setUint8(offset + i, str.charCodeAt(i));\n      }\n    }\n\n    function floatTo16bitPCM(output, offset, input) {\n      for (var i = 0; i < input.length; i++) {\n        var s = Math.max(-1, Math.min(1, input[i]));\n        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);\n        offset += 2;\n      }\n    }\n\n    writeString(view, 0, 'RIFF');\n    view.setUint32(4, 32 + samples.length * 2, true);\n    writeString(view, 8, 'WAVE');\n    writeString(view, 12, 'fmt ');\n    view.setUint32(16, 16, true);\n    view.setUint16(20, 1, true);\n    view.setUint16(22, 1, true);\n    view.setUint32(24, sampleRate, true);\n    view.setUint32(28, sampleRate * 2, true);\n    view.setUint16(32, 2, true);\n    view.setUint16(34, 16, true);\n    writeString(view, 36, 'data');\n    view.setUint32(40, samples.length * 2, true);\n    floatTo16bitPCM(view, 44, samples);\n    return view;\n  }\n\n  function mergeBufs(data) {\n    var sampleLen = 0;\n\n    for (var i = 0; i < data.length; i++) {\n      sampleLen += data[i].length;\n    }\n\n    var samples = new Float32Array(sampleLen);\n    var index = 0;\n\n    for (var _i2 = 0; _i2 < data.length; _i2++) {\n      for (var j = 0; j < data[_i2].length; j++) {\n        samples[index] = data[_i2][j];\n        index++;\n      }\n    }\n\n    return samples;\n  }\n\n  var dataView = encodeWAVE(mergeBufs(data), sampleRate);\n  return new File([dataView], 'audio.wav', {\n    type: 'audio/wav'\n  });\n}\n\n//# sourceURL=webpack://MuRec/./src/MuRec.js?");

/***/ })

/******/ })["default"];
});