angular.module('angular-feedparser', []);

angular.module('angular-feedparser').service('x2js', function() {
  return new X2JS();
});

angular.module('angular-feedparser').factory('rssparser', function() {
  function getEntries(feedEntries) {
    var entries = [];
    
    feedEntries.forEach(function(entry) {
      entries.push({
        title: entry.title,
        link: entry.link,
        updated: new Date(entry.pubDate)
      });
    });    
    
    return entries;
  }
  
  return {
    parse: function(jsondata) {
      var feed = jsondata.rss.channel;
      
      return {
        title: feed.title,
        subtitle: feed.description,
        updated: new Date(feed.lastBuildDate),
        entries: getEntries(feed.item)
      };
    }
  };
});

angular.module('angular-feedparser').factory('rdfparser', function() {
  function getEntries(feedEntries) {
    var entries = [];
    
    feedEntries.forEach(function(entry) {
      entries.push({
        title: entry.title,
        link: entry.link
      });
    });    
    
    return entries;
  }
  
  return {
    parse: function(jsondata) {
      var feed = jsondata.RDF,
        channel = feed.channel;
      
      return {
        title: channel.title,
        subtitle: channel.description,
        entries: getEntries(feed.item)
      };
    }
  };
});

angular.module('angular-feedparser').factory('atomparser', function() {
  function getAtomLink(entry) {
    var linkfound = false, i = 0, link;

    while (!linkfound && (i < entry.link.length)) {
      if (entry.link[i]._rel == 'alternate') {
        linkfound = true;
        link = entry.link[i]._href;
      } else {
        i++;
      }
    }
    
    return link;
  }

  function getEntries(feedEntries) {
    var entries = [];
    
    feedEntries.forEach(function(entry) {
      entries.push({
        title: entry.title.__cdata,
        link: getAtomLink(entry),
        updated: new Date(entry.updated)
      });
    });    
    
    return entries;
  }
  
  return {
    parse: function(jsondata) {
      var feed = jsondata.feed;
      
      return {
        title: feed.title.__text,
        subtitle: feed.subtitle.__text,
        updated: new Date(feed.updated),
        entries: getEntries(feed.entry)
      };
    }
  };
});

angular.module('angular-feedparser').service('feedparser', function(x2js, atomparser, rssparser, rdfparser) {
  var me = this;
  
  me.parse = function(xmldata) {
    var jsondata = x2js.xml_str2json(xmldata);
    
    if (jsondata.rss) {
      return rssparser.parse(jsondata);
    } else if (jsondata.RDF) {
      return rdfparser.parse(jsondata);
    } else {
      return atomparser.parse(jsondata);
    }
  };
});