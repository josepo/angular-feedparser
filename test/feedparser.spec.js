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
  });

});