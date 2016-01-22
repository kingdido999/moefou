const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync(path.normalize(__dirname + '/config.json', 'utf8')));

describe('Moefou API', function() {
  const Moefou = require('../lib/moefou.js');
  const API = new Moefou(config.apiKey);

  // 条目 ----------------------------------------------------------------------
  describe('wikis test', function() {
    it('should get wikis of music and radio', function(done) {
      API.wikis('music,radio', {}, done);
    });
  });

  describe('onAir test', function() {
    it('should get all on-air animes', function(done) {
      API.onAir({}, done);
    });
  });

  describe('wiki detail test', function() {
    it('should get details of a wiki', function(done) {
      API.wikiDetail('music', { wiki_id: 47251 }, done);
    });
  });

  describe('wiki subs test', function() {
    it('should get subs of a wiki', function(done) {
      API.wikiSubs('music', { wiki_id: 47251 }, done);
    });
  });

  describe('wiki favs test', function() {
    it('should get favorites of a wiki', function(done) {
      API.wikiFavs('music', { wiki_id: 47251 }, done);
    });
  });

  describe('wiki ratings test', function() {
    it('should get ratings of a wiki', function(done) {
      API.wikiRatings('music', { wiki_id: 47251 }, done);
    });
  });

  describe('wiki relationships test', function() {
    it('should get relationships of a wiki', function(done) {
      API.wikiRelationships('music', { wiki_id: 47251 }, done);
    });
  });

  describe('wiki similarity test', function() {
    it('should get similar wikis of a wiki', function(done) {
      API.wikiSimilarity('music', { wiki_id: 47251 }, done);
    });
  });

  // 子条目 --------------------------------------------------------------------
  describe('sub detail test', function() {
    it('should get details of a sub', function(done) {
      API.subDetail('song', 218878, done);
    });
  });

  describe('sub favorites test', function() {
    it('should get favorites of a sub', function(done) {
      API.subFavs('song', 218878, {}, done);
    });
  });

  describe('sub ratings test', function() {
    it('should get ratings of a sub', function(done) {
      API.subRatings('song', 218878, {}, done);
    });
  });

  describe('sub relationships test', function() {
    it('should get relationships of a sub', function(done) {
      API.subRelationships('song', 218878, {}, done);
    });
  });

  // 用户 ----------------------------------------------------------------------
  describe('userDetail test', function() {
    it('should get user details', function(done) {
      API.userDetail({ uid: 2127 }, done);
    });
  });

  describe('userFavsWiki test', function() {
    it('should get user favorite wikis', function(done) {
      API.userFavsWiki({ uid: 2127 }, done);
    });
  });

  describe('userFavsSub test', function() {
    it('should get user favorite sub wikis', function(done) {
      API.userFavsSub({ uid: 2127 }, done);
    });
  });

  // 搜索 ----------------------------------------------------------------------
  describe('searchWiki test', function() {
    it('should get search result of a wiki', function(done) {
      API.searchWiki('东方', {}, done);
    });
  });

  describe('searchSub test', function() {
    it('should get search result of a sub', function(done) {
      API.searchSub('研究所', { sub_type: 'song' }, done);
    });
  });

  // 播放接口 -------------------------------------------------------------------
  describe('listenPlaylist test', function() {
    it('should get a music list', function(done) {
      API.listenPlaylist({}, done);
    });
  });

  // 网页接口 -------------------------------------------------------------------
  describe('explore test', function() {
    it('should get content from explore page', function(done) {
      API.explore({ new_musics: 1 }, done);
    });
  });

  describe('music test', function() {
    it('should get content from music page', function(done) {
      API.music(47251, done);
    });
  });

  describe('music songs test', function() {
    it('should get content from music songs page', function(done) {
      API.musicSongs(47251, done);
    });
  });

  describe('music favs test', function() {
    it('should get content from music favs page', function(done) {
      API.musicFavs(47251, done);
    });
  });
});
