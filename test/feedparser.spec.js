'use strict';

describe('[angular-feedparser] ', function () {
  var feedparser, templateCache;
  
  beforeEach(function() {
    module('angular-feedparser');
    module('test/data/atom1.xml');
    module('test/data/rss2.xml');
    module('test/data/rdf1.xml');
    
    inject(function($injector, $templateCache) {
      templateCache = $templateCache;
      feedparser = $injector.get('feedparser');
    });
  });
  
  describe('rdf 1.0 > ', function() {
    var rdf;
    
    beforeEach(function() {
      rdf = templateCache.get('test/data/rdf1.xml').toString();
    });
    
    it('meta info', function() {
      var info = feedparser.parse(rdf);
      
      expect(info.title).toBe('La Biblioteca de Babel');
      expect(info.subtitle).toBe('La Biblioteca de Babel el blog de Daurmith sobre ciencia');
      expect(info.updated).toBeUndefined();
    });
    
    it('entries basic info', function() {
      var entries = feedparser.parse(rdf).entries;
      
      expect(entries.length).toBe(2);
      expect(entries[0].title).toBe('Explicaciones');
      expect(entries[0].link).toBe('http://daurmith.blogalia.com//historias/75874');
      expect(entries[0].updated).toBeUndefined();
    });   
  });
  
  describe('rss 2.0 > ', function() {
    var rss;
    
    beforeEach(function() {
      rss = templateCache.get('test/data/rss2.xml');
    });
    
    it('meta info', function() {
      var info = feedparser.parse(rss);
      
      expect(info.title).toBe('All The Rage');
      expect(info.subtitle).toBe('Committed to the power of the evidential narrative');
      expect(info.updated).toEqual(new Date('Wed, 16 Sep 2015 06:27:03 +0000'));
    });
    
    it('entries basic info', function() {
      var entries = feedparser.parse(rss).entries;
      
      expect(entries.length).toBe(9);
      expect(entries[0].title).toBe('So you want to order coffee in Spain');
      expect(entries[0].link).toBe('https://daurmith.wordpress.com/2012/04/18/so-you-want-to-order-coffee-in-spain/');
      expect(entries[0].updated).toEqual(new Date('Wed, 18 Apr 2012 14:26:27 +0000'));
    });    
  });
  
  describe('atom 1.0 > ', function() {
    var atom;
    
    beforeEach(function() {
      atom = templateCache.get('test/data/atom1.xml');
    });
    
    it('meta info', function() {
      var info = feedparser.parse(atom);
      
      expect(info.title).toBe('Alexandra Franzen');
      expect(info.subtitle).toBeUndefined();
      expect(info.updated).toEqual(new Date('2015-09-30T05:57:45Z'));
    });
    
    it('entries basic info', function() {
      var entries = feedparser.parse(atom).entries;
      
      expect(entries.length).toBe(10);
      expect(entries[0].title).toBe('Show some respect for the brave.');
      expect(entries[0].link).toBe('http://www.alexandrafranzen.com/2015/09/29/respect/');
      expect(entries[0].updated).toEqual(new Date('2015-09-30T01:18:45Z'));
    });
  });
});