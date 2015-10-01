'use strict';

describe('[angular-feedparser] ', function () {
  var feedparser;
  
  beforeEach(function() {
    module('angular-feedparser');
      
    inject(function($injector) {
      feedparser = $injector.get('feedparser');
    });
  });
  
  it('hello world test', function() {
    expect(feedparser.hello()).toBe('Hello world');
  });
});