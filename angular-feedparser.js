angular.module('angular-feedparser', []);

angular.module('angular-feedparser').service('x2js', function() {
  return new X2JS();
});

angular.module('angular-feedparser').service('feedparser', function(x2js) {
  var me = this;
  
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
  
  me.parse = function(xmldata) {
    var jsondata = x2js.xml_str2json(xmldata);
      rss = jsondata.rss,
      feed = rss ? jsondata.rss.channel : jsondata.feed,
      feedEntries = rss ? feed.item : feed.entry,
      entries = [];
      
    feedEntries.forEach(function(entry) {
      entries.push({
        title: rss ? entry.title : entry.title.__cdata,
        link: rss ? entry.link : getAtomLink(entry)
      });
    });

    return {
      title: rss ? feed.title : feed.title.__text,
      subtitle: rss ? feed.description : feed.subtitle.__text,
      updated: new Date(rss ? feed.lastBuildDate : feed.updated),
      entries: entries
    };
  };
});