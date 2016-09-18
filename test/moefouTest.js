const fs = require('fs')
const path = require('path')
const assert = require('assert')
const config = JSON.parse(fs.readFileSync(path.normalize(__dirname + '/config.json', 'utf8')))

describe('Moefou API', function() {
  const Moefou = require('../lib/moefou.js')
  const API = new Moefou(config.apiKey)

  // 条目 ----------------------------------------------------------------------
  describe('wikis test', function() {
    it('should get wikis of music and radio', (done) => {
      API.wikis('music,radio', {}, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  describe('onAir test', function() {
    it('should get all on-air animes', (done) => {
      API.onAir({}, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  describe('wiki detail test', function() {
    it('should get details of a wiki', (done) => {
      API.wikiDetail('music', { wiki_id: 47251 }, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  describe('wiki subs test', function() {
    it('should get subs of a wiki', (done) => {
      API.wikiSubs('music', { wiki_id: 47251 }, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  describe('wiki favs test', function() {
    it('should get favorites of a wiki', (done) => {
      API.wikiFavs('music', { wiki_id: 47251 }, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  describe('wiki ratings test', function() {
    it('should get ratings of a wiki', (done) => {
      API.wikiRatings('music', { wiki_id: 47251 }, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  describe('wiki relationships test', function() {
    it('should get relationships of a wiki', (done) => {
      API.wikiRelationships('music', { wiki_id: 47251 }, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  describe('wiki similarity test', function() {
    it('should get similar wikis of a wiki', (done) => {
      API.wikiSimilarity('music', { wiki_id: 47251 }, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  // 子条目 --------------------------------------------------------------------
  describe('sub detail test', function() {
    it('should get details of a sub', (done) => {
      API.subDetail('song', 218878, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  describe('sub favorites test', function() {
    it('should get favorites of a sub', (done) => {
      API.subFavs('song', 218878, {}, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  describe('sub ratings test', function() {
    it('should get ratings of a sub', (done) => {
      API.subRatings('song', 218878, {}, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  describe('sub relationships test', function() {
    it('should get relationships of a sub', (done) => {
      API.subRelationships('song', 218878, {}, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  // 用户 ----------------------------------------------------------------------
  describe('userDetail test', function() {
    it('should get user details', (done) => {
      API.userDetail({ uid: 2127 }, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  describe('userFavsWiki test', function() {
    it('should get user favorite wikis', (done) => {
      API.userFavsWiki({ uid: 2127 }, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  describe('userFavsSub test', function() {
    it('should get user favorite sub wikis', (done) => {
      API.userFavsSub({ uid: 2127 }, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  // 搜索 ----------------------------------------------------------------------
  describe('searchWiki test', function() {
    it('should get search result of a wiki', (done) => {
      API.searchWiki('东方', {}, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  describe('searchSub test', function() {
    it('should get search result of a sub', (done) => {
      API.searchSub('研究所', { sub_type: 'song' }, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  // 播放接口 -------------------------------------------------------------------
  describe('listenPlaylist test', function() {
    it('should get a music list', (done) => {
      API.listenPlaylist({}, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  // 网页接口 -------------------------------------------------------------------
  describe('explore test', function() {
    it('should get content from explore page', (done) => {
      API.explore({ new_musics: 1 }, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  describe('music test', function() {
    it('should get content from music page', (done) => {
      API.music(47251, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  describe('music songs test', function() {
    it('should get content from music songs page', (done) => {
      API.musicSongs(47251, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })

  describe('music favs test', function() {
    it('should get content from music favs page', (done) => {
      API.musicFavs(47251, (error, response, body) => {
        assertOk(error, response, done)
      })
    })
  })
})

function assertOk(error, response, done) {
  if (error) {
    done(error)
  } else {
    assert.deepEqual(response.statusCode, 200)
    done()
  }
}
