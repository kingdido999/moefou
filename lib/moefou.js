const extend = require('xtend');
const request = require('request');
const querystring = require('querystring');

const GENERAL_API_URL = 'http://api.moefou.org'; // 通用接口
const SPECIAL_API_URL = 'http://moe.fm'; // 专用接口

var Moefou = function(apiKey) {
  this.credentials = {
    api_key: apiKey
  }
}

Moefou.prototype._get = function(base, url, parameters, callback) {
  parameters = extend(parameters, this.credentials);
  var getUrl = base + '/' + url + '?' + querystring.stringify(parameters);

  request(getUrl, function(error, response, body) {
    callback(error, body || {});
  });
}

Moefou.prototype._getGeneral = function(url, parameters, callback) {
  this._get(GENERAL_API_URL, url, parameters, function(error, body) {
    callback(error, body);
  })
}

Moefou.prototype._getSpecial = function(url, parameters, callback) {
  this._get(SPECIAL_API_URL, url, parameters, function(error, body) {
    callback(error, body);
  })
}

// 条目 ------------------------------------------------------------------------

Moefou.prototype.wikis = function(wiki_type, optionals, callback) {
  this._getGeneral('wikis', extend({ wiki_type: wiki_type }, optionals),
  function(error, body) {
    callback(error, body);
  });
}

// http://open.moefou.org/docs/api/on-air
Moefou.prototype.onAir = function(optionals, callback) {
  this._getGeneral('on-air', optionals, function(error, body) {
    callback(error, body);
  });
}

// http://open.moefou.org/docs/api/wiki/detail
Moefou.prototype.wikiDetail = function(wiki_type, optionals, callback) {
  this._getGeneral(wiki_type + '/detail', optionals, function(error, body) {
    callback(error, body);
  });
}

// http://open.moefou.org/docs/api/wiki/subs
Moefou.prototype.wikiSubs = function(wiki_type, optionals, callback) {
  this._getGeneral(wiki_type + '/subs', optionals, function(error, body) {
    callback(error, body);
  });
}

// http://open.moefou.org/docs/api/wiki/favs
Moefou.prototype.wikiFavs = function(wiki_type, optionals, callback) {
  this._getGeneral(wiki_type + '/favs', optionals, function(error, body) {
    callback(error, body);
  });
}

// http://open.moefou.org/docs/api/wiki/ratings
Moefou.prototype.wikiRatings = function(wiki_type, optionals, callback) {
  this._getGeneral(wiki_type + '/ratings', optionals, function(error, body) {
    callback(error, body);
  });
}

// http://open.moefou.org/docs/api/wiki/relationships
Moefou.prototype.wikiRelationships = function(wiki_type, optionals, callback) {
  this._getGeneral(wiki_type + '/relationships', optionals, function(error, body) {
    callback(error, body);
  });
}

// http://open.moefou.org/docs/api/wiki/similarity
Moefou.prototype.wikiSimilarity = function(wiki_type, optionals, callback) {
  this._getGeneral(wiki_type + '/similarity', optionals, function(error, body) {
    callback(error, body);
  });
}

// 子条目 ----------------------------------------------------------------------

// http://open.moefou.org/docs/api/sub/detail
Moefou.prototype.subDetail = function(sub_type, sub_id, callback) {
  this._getGeneral(sub_type + '/detail', { sub_id: sub_id }, function(error, body) {
    callback(error, body);
  });
}

// http://open.moefou.org/docs/api/sub/favs
Moefou.prototype.subFavs = function(sub_type, sub_id, optionals, callback) {
  this._getGeneral(sub_type + '/favs', extend({ sub_id: sub_id }, optionals),
  function(error, body) {
    callback(error, body);
  });
}

// http://open.moefou.org/docs/api/sub/ratings
Moefou.prototype.subRatings = function(sub_type, sub_id, optionals, callback) {
  this._getGeneral(sub_type + '/ratings', extend({ sub_id: sub_id }, optionals),
  function(error, body) {
    callback(error, body);
  });
}

// http://open.moefou.org/docs/api/sub/relationships
Moefou.prototype.subRelationships = function(sub_type, sub_id, optionals, callback) {
  this._getGeneral(sub_type + '/relationships', extend({ sub_id: sub_id }, optionals),
  function(error, body) {
    callback(error, body);
  });
}

// 用户 ------------------------------------------------------------------------

/**
 * 获取一个用户的基础资料，如用户名、昵称、好友列表等。
 * 这个用户可以是当前登录用户，也可以是由参数指定的用户。
 *
 * http://open.moefou.org/docs/api/user/detail
 *
 * @param  {object}   optionals { uid: 'uid', user_name: 'user_name' }
 * @callback  compelete
 */
Moefou.prototype.userDetail = function(optionals, callback) {
  this._getGeneral('user/detail', optionals, function(error, body) {
    callback(error, body);
  });
}

// http://open.moefou.org/docs/api/user/favs/wiki
Moefou.prototype.userFavsWiki = function(optionals, callback) {
  this._getGeneral('user/favs/wiki', optionals, function(error, body) {
    callback(error, body);
  });
}

// http://open.moefou.org/docs/api/user/favs/sub
Moefou.prototype.userFavsSub = function(optionals, callback) {
  this._getGeneral('user/favs/sub', optionals, function(error, body) {
    callback(error, body);
  });
}

// 搜索 ------------------------------------------------------------------------

// http://open.moefou.org/docs/api/search/wiki
Moefou.prototype.searchWiki = function(keyword, optionals, callback) {
  this._getGeneral('search/wiki', extend({ keyword: keyword }, optionals),
  function(error, body) {
    callback(error, body);
  });
}

// http://open.moefou.org/docs/api/search/sub
Moefou.prototype.searchSub = function(keyword, optionals, callback) {
  this._getGeneral('search/sub', extend({ keyword: keyword }, optionals),
  function(error, body) {
    callback(error, body);
  });
}

// 播放接口 ---------------------------------------------------------------------

// http://open.moefou.org/docs/moe.fm/api/listen/playlist
Moefou.prototype.listenPlaylist = function(optionals, callback) {
  this._getSpecial('listen/playlist?api=json', optionals, function(error, body) {
    callback(error, body);
  });
}

module.exports = Moefou;
