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
  
  it('hello world test', function() {
    expect(feedparser.hello()).toBe('Hello world');
  });
});