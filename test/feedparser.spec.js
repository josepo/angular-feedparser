'use strict';

describe('[angular-feedparser] ', function () {
  var feedparser, templateCache;
  
  beforeEach(function() {
    module('angular-feedparser');
    module('test/data/atom.xml');
    
    inject(function($injector, $templateCache) {
      templateCache = $templateCache;
      feedparser = $injector.get('feedparser');
    });
  });
  
  describe('atom > ', function() {
    var atom;
    
    beforeEach(function() {
      atom = templateCache.get('test/data/atom.xml');
    });
    
    it('should get meta info', function() {
      var info = feedparser.parse(atom);
      
      expect(info.title).toBe('Alexandra Franzen');
      expect(info.subtitle).toBeUndefined();
      expect(info.updated).toEqual(new Date('2015-09-30T05:57:45Z'));
    });
    
    it('should get entries info', function() {
      var entries = feedparser.parse(atom).entries;
      
      expect(entries.length).toBe(10);
      expect(entries[0].title).toBe('Show some respect for the brave.');
      expect(entries[0].link).toBe('http://www.alexandrafranzen.com/2015/09/29/respect/');
      expect(entries[0].content).toBeDefined();
    });
  });

});