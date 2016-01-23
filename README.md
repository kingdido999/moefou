# Moefou 萌否 API wrapper

This is a node module that allows you to interact with [萌否API](http://open.moefou.org/docs/).

## Install

`npm install moefou`

## Example

```javascript
const moefou = require('moefou');
var m = new moefou('your_api_key');

// 获取一个用户的基础资料
// http://open.moefou.org/docs/api/user/detail
m.userDetail({ uid: 2127 }, function(error, body) {
  if (error) {
    console.log(error);
  }

  console.log(body.response.user);
});
```

Notice that some methods require a parameter called `optionals`, which is a JavaScript Object contains optional parameters. You can pass in `{}` if you do not want specify any optional parameter.

## Testing

Fill in `apiKey` in `config-sample.json`, rename the file to `config.json`.

Run tests: `mocha`

## Endpoints

- api.moefou.org
  - wiki/条目
    - [x] wikis
    - [x] on-air
    - [x] wiki/detail
    - [x] wiki/subs
    - [x] wiki/favs
    - [x] wiki/ratings
    - [x] wiki/relationships
    - [x] wiki/similarity

  - sub/子条目
    - [x] sub/detail
    - [x] sub/favs
    - [x] sub/ratings
    - [x] sub/relationships

  - user/用户
    - [x] user/detail
    - [x] user/favs/wiki
    - [x] user/favs/sub

  - search/搜索
    - [x] search/wiki
    - [x] search/sub

  - fav/收藏
    - [ ] fav/add
    - [ ] fav/delete

- moe.fm
  - play/播放接口
    - [x] listen/playlist?api=json
    - [ ] ajax/log?log_obj_type=sub&log_type=listen&obj_type=song&api=format

  - web/网页接口
    - [x] explore?api=format
    - [x] music/{wiki_id}?api=format
    - [x] music/{wiki_id}/songs?api=format
    - [x] music/{wiki_id}/favs?api=format

  - other/其他接口
    - [ ] search/direct
