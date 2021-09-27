# MuRec
[![](http://img.shields.io/badge/license-ISC-blue.svg)](./LICENSE)

MuRec is an ISC Licensed library, written in JavaScript.

## Description
MuRec stands for music recognition.  You can easily add the function to recognize the music playing around a device to your website with MuRec.

## Usage
When you use MuRec, call the recognize() method.
```javascript
const murec = new MuRec();
murec.recognize().then(res => {
    console.log('Song: ' + res.data[0].attributes.name);
    console.log('URL: ' + res.data[0].attributes.permalink);
});
```
The return value is a json like the one below.
```json
{
  "meta": {
    "api_version": 2,
    "method": "POST",
    "status": 200,
    "total_pages": 150,
    "active_page": 1
  },
  "data": [
    {
      "type": "songle_song",
      "id": 1904044,
      "attributes": {
        "code": "a74836cf5",
        "name": "(MMD)Tell Your World",
        "duration_time_ms": 300100,
        "duration_time_sec": 300.1,
        "play_count": 3,
        "edit_count": 0,
        "permalink": "http://www.nicovideo.jp/watch/sm36222234",
        "created_at": "2020-01-14 13:19:00 +0900",
        "updated_at": "2020-03-16 10:11:04 +0900",
        "checked_at": "2020-03-16 10:11:04 +0900",
        "edited_at": null,
        "recognized_at": "2020-01-14 13:34:00 +0900"
      },
      "relationships": {
        "original_songs": {
          "data": [
            {
              "type": "songle_song",
              "id": 6875,
              "attributes": {
                "code": "aa8109025",
                "name": "【初音ミク】 livetune (kz) - Tell Your World - Full size Ver.【ラジオ音源】",
                "duration_time_ms": 257399,
                "duration_time_sec": 257.4,
                "play_count": 170,
                "edit_count": 4242,
                "permalink": "http://www.nicovideo.jp/watch/sm16550626",
                "created_at": "2013-06-14 14:48:58 +0900",
                "updated_at": "2020-02-27 04:17:49 +0900",
                "checked_at": "2020-02-27 04:17:49 +0900",
                "edited_at": "2019-04-17 19:08:03 +0900",
                "recognized_at": "2013-08-27 02:19:54 +0900"
              },
              "relationships": {
                "fingerprint_result": {
                  "data": {
                    "type": "songle_song_fingerprint_result",
                    "id": 6875,
                    "attributes": {
                      "rank": 1,
                      "start_time_ms": 51786,
                      "start_time_sec": 51.786
                    }
                  }
                }
              }
            }
          ]
        },
        "fingerprint_result": {
          "data": {
            "type": "songle_song_fingerprint_result",
            "id": 1904044,
            "attributes": {
              "rank": 1,
              "start_time_ms": 52686,
              "start_time_sec": 52.686
            }
          }
        }
      }
    }
  ],
  "links": {
    "self": "/api/v2/song/match.json"
  }
}
```
The instance of MuRec object has two properties, recordStart and data.  The recordStart property has the value of performance.now() when the recognized music was started recording.  The data property has an object same as the return value.  So you can use the properties like the one below.
```javascript
const murec = new MuRec();
murec.recognize().then(res => {
    if(murec.data == res) console.log("murec.data equals the return value");
    else console.log("murec.data doesn't equal the return value");
    console.log("RecordStart: " + murec.recordStart);
});
```