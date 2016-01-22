"use strict";

const extend = require('xtend');
const request = require('request');
const querystring = require('querystring');
const GENERAL_API_URL = 'http://api.moefou.org'; // 通用接口
const SPECIAL_API_URL = 'http://moe.fm'; // 专用接口

class Moefou {
  constructor(apiKey) {
    this.credentials = {
      api_key: apiKey
    }
  }

  _get (base, url, parameters, callback) {
    parameters = extend(parameters, this.credentials);
    var getUrl = base + '/' + url + '?' + querystring.stringify(parameters);

    request(getUrl, function(error, response, body) {
      callback(error, JSON.parse(body) || {});
    });
  }

  _getGeneral (url, parameters, callback) {
    this._get(GENERAL_API_URL, url, parameters, function(error, body) {
      callback(error, body);
    })
  }

  _getSpecial (url, parameters, callback) {
    this._get(SPECIAL_API_URL, url, parameters, function(error, body) {
      callback(error, body);
    })
  }

  // 条目 ----------------------------------------------------------------------

  /**
   * 根据条件获取条目列表。
   * http://open.moefou.org/docs/api/wikis
   * @param  {String}   wiki_type
   * @param  {Object}   optionals { page, perpage, initial, tag, wiki_id, date }
   * @param  {Function} callback
   */
  wikis (wiki_type, optionals, callback) {
    this._getGeneral('wikis', extend({ wiki_type: wiki_type }, optionals),
    function(error, body) {
      callback(error, body);
    });
  }

  /**
   * 按星期数获取正在连载的动画放映表。
   * http://open.moefou.org/docs/api/on-air
   * @param  {Object}   optionals { week }
   * @param  {Function} callback
   */
  onAir (optionals, callback) {
    this._getGeneral('on-air', optionals, function(error, body) {
      callback(error, body);
    });
  }

  /**
   * 获取条目的基础信息，如条目标题、描述等。
   * http://open.moefou.org/docs/api/wiki/detail
   * @param  {String}   wiki_type
   * @param  {Object}   optionals { wiki_id, wiki_name }
   * @param  {Function} callback
   */
  wikiDetail (wiki_type, optionals, callback) {
    this._getGeneral(wiki_type + '/detail', optionals, function(error, body) {
      callback(error, body);
    });
  }

  /**
   * 获取条目的从属子条目，如条目的章节、曲目。
   * http://open.moefou.org/docs/api/wiki/subs
   * @param  {String}   wiki_type
   * @param  {Object}   optionals { wiki_id, wiki_name, sub_type, page, perpage }
   * @param  {Function} callback
   */
  wikiSubs (wiki_type, optionals, callback) {
    this._getGeneral(wiki_type + '/subs', optionals, function(error, body) {
      callback(error, body);
    });
  }

  /**
   * 获取条目的被收藏记录。
   * http://open.moefou.org/docs/api/wiki/favs
   * @param  {String}   wiki_type
   * @param  {Object}   optionals { wiki_id, wiki_name, fav_type, page, perpage }
   * @param  {Function} callback
   */
  wikiFavs (wiki_type, optionals, callback) {
    this._getGeneral(wiki_type + '/favs', optionals, function(error, body) {
      callback(error, body);
    });
  }

  /**
   * 获取条目的评分记录。
   * http://open.moefou.org/docs/api/wiki/ratings
   * @param  {String}   wiki_type
   * @param  {Object}   optionals { wiki_id, wiki_name, fav_type, page, perpage }
   * @param  {Function} callback
   */
  wikiRatings (wiki_type, optionals, callback) {
    this._getGeneral(wiki_type + '/ratings', optionals, function(error, body) {
      callback(error, body);
    });
  }

  /**
   * 获取条目的关联条目或关联子条目。
   * http://open.moefou.org/docs/api/wiki/relationships
   * @param  {String}   wiki_type
   * @param  {Object}   optionals { wiki_id, wiki_name, obj_type }
   * @param  {Function} callback
   */
  wikiRelationships (wiki_type, optionals, callback) {
    this._getGeneral(wiki_type + '/relationships', optionals, function(error, body) {
      callback(error, body);
    });
  }

  /**
   * 获取条目的相似条目。
   * http://open.moefou.org/docs/api/wiki/similarity
   * @param  {String}   wiki_type
   * @param  {Object}   optionals { wiki_id, wiki_name }
   * @param  {Function} callback
   */
  wikiSimilarity (wiki_type, optionals, callback) {
    this._getGeneral(wiki_type + '/similarity', optionals, function(error, body) {
      callback(error, body);
    });
  }

  // 子条目 --------------------------------------------------------------------

  /**
   * 获取子条目的基础信息，如子条目标题、描述等。
   * @param  {String}   sub_type
   * @param  {Integer}  sub_id
   * @param  {Function} callback
   */
  subDetail (sub_type, sub_id, callback) {
    this._getGeneral(sub_type + '/detail', { sub_id: sub_id }, function(error, body) {
      callback(error, body);
    });
  }

  /**
   * 获取子条目的被收藏记录。
   * http://open.moefou.org/docs/api/sub/favs
   * @param  {String}   sub_type
   * @param  {Integer}  sub_id
   * @param  {Object}   optionals { fav_type, page, perpage }
   * @param  {Function} callback
   */
  subFavs (sub_type, sub_id, optionals, callback) {
    this._getGeneral(sub_type + '/favs', extend({ sub_id: sub_id }, optionals),
    function(error, body) {
      callback(error, body);
    });
  }

  /**
   * 获取子条目的评分记录。
   * http://open.moefou.org/docs/api/sub/ratings
   * @param  {String}   sub_type
   * @param  {Integer}  sub_id
   * @param  {Object}   optionals { fav_type, page, perpage }
   * @param  {Function} callback
   */
  subRatings (sub_type, sub_id, optionals, callback) {
    this._getGeneral(sub_type + '/ratings', extend({ sub_id: sub_id }, optionals),
    function(error, body) {
      callback(error, body);
    });
  }

  /**
   * 获取关联特定子条目的条目或子条目。
   * http://open.moefou.org/docs/api/sub/relationships
   * @param  {String}   sub_type
   * @param  {Integer}  sub_id
   * @param  {Object}   optionals { obj_type }
   * @param  {Function} callback
   */
  subRelationships (sub_type, sub_id, optionals, callback) {
    this._getGeneral(sub_type + '/relationships', extend({ sub_id: sub_id }, optionals),
    function(error, body) {
      callback(error, body);
    });
  }

  // 用户 ----------------------------------------------------------------------

  /**
   * 获取一个用户的基础资料，如用户名、昵称、好友列表等。这个用户可以是当前登录用户，
   * 也可以是由参数指定的用户。
   * http://open.moefou.org/docs/api/user/detail
   * @param  {Object}   optionals { uid, user_name }
   * @param  {Function} callback
   */
  userDetail (optionals, callback) {
    this._getGeneral('user/detail', optionals, function(error, body) {
      callback(error, body);
    });
  }

  /**
   * 获取用户收藏的条目。这个用户可以是当前登录用户，也可以是由参数指定的用户。
   * http://open.moefou.org/docs/api/user/favs/wiki
   * @param  {Object}   optionals { uid, user_name, obj_type, fav_type, page, perpage }
   * @param  {Function} callback
   */
  userFavsWiki (optionals, callback) {
    this._getGeneral('user/favs/wiki', optionals, function(error, body) {
      callback(error, body);
    });
  }

  /**
   * 获取用户收藏的子条目。
   * http://open.moefou.org/docs/api/user/favs/sub
   * @param  {Object}   optionals { uid, user_name, obj_type, fav_type, page, perpage }
   * @param  {Function} callback
   */
  userFavsSub (optionals, callback) {
    this._getGeneral('user/favs/sub', optionals, function(error, body) {
      callback(error, body);
    });
  }

  // 搜索 ----------------------------------------------------------------------

  /**
   * 根据关键词搜索条目。
   * http://open.moefou.org/docs/api/search/wiki
   * @param  {String}   keyword
   * @param  {Object}   optionals { wiki_type, page, perpage }
   * @param  {Function} callback
   */
  searchWiki (keyword, optionals, callback) {
    this._getGeneral('search/wiki', extend({ keyword: keyword }, optionals),
    function(error, body) {
      callback(error, body);
    });
  }

  /**
   * 根据关键词搜索子条目，包括搜索章节（ep）、曲目（song）。
   * http://open.moefou.org/docs/api/search/sub
   * @param  {String}   keyword
   * @param  {Object}   optionals { sub_type, page, perpage }
   * @param  {Function} callback
   */
  searchSub (keyword, optionals, callback) {
    this._getGeneral('search/sub', extend({ keyword: keyword }, optionals),
    function(error, body) {
      callback(error, body);
    });
  }

  // 播放接口 -------------------------------------------------------------------

  /**
   * 获取萌否电台的音乐播放列表。
   * http://open.moefou.org/docs/moe.fm/api/listen/playlist
   * @param  {Object}   optionals { page, perpage, fav, music, song, radio }
   * @param  {Function} callback
   */
  listenPlaylist (optionals, callback) {
    this._getSpecial('listen/playlist?api=json', optionals, function(error, body) {
      callback(error, body);
    });
  }

  // 网页接口 -------------------------------------------------------------------

  /**
   * 萌否电台“发现音乐”页面。
   * http://open.moefou.org/docs/moe.fm/api/explore
   * @param  {Object}   optionals { new_musics, hot_musics, hot_radios, musics, tags }
   * @param  {Function} callback
   */
  explore (optionals, callback) {
    this._getSpecial('explore?api=json', optionals, function(error, body) {
      callback(error, body);
    });
  }

  /**
   * 萌否电台“音乐专辑”页面，即具体某一张专辑的页面。
   * http://open.moefou.org/docs/moe.fm/api/music
   * @param  {Integer}  wiki_id
   * @param  {Function} callback
   */
  music (wiki_id, callback) {
    this._getSpecial('music/' + wiki_id + '?api=json', {}, function(error, body) {
      callback(error, body);
    });
  }

  /**
   * 萌否电台“专辑曲目”页面，即具体某一张专辑的曲目列表页面。
   * http://open.moefou.org/docs/moe.fm/api/music/songs
   * @param  {Integer}  wiki_id
   * @param  {Function} callback
   */
  musicSongs (wiki_id, callback) {
    this._getSpecial('music/' + wiki_id + '/songs?api=json', {}, function(error, body) {
      callback(error, body);
    });
  }

  /**
   * 萌否电台“专辑收藏”页面，即具体某一张专辑有谁在收藏的页面。
   * http://open.moefou.org/docs/moe.fm/api/music/favs
   * @param  {Integer}  wiki_id
   * @param  {Function} callback
   */
  musicFavs (wiki_id, callback) {
    this._getSpecial('music/' + wiki_id + '/favs?api=json', {}, function(error, body) {
      callback(error, body);
    });
  }
}

module.exports = Moefou;
