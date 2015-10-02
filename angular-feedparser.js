angular.module('angular-feedparser', []);

angular.module('angular-feedparser').service('x2js', function() {
   return new X2JS();
});

angular.module('angular-feedparser').service('feedparser', function(x2js) {
   var me = this;
   
   me.parse = function(xmldata) {
      var feed = x2js.xml_str2json(xmldata).feed,
         entries = [];
      
      feed.entry.forEach(function(entry) {
         var linkfound = false,
            i = 0,
            link;
            
         while (!linkfound && (i < entry.link.length)) {
            if (entry.link[i]._rel == 'alternate') {
               linkfound = true;
               link = entry.link[i]._href;
            } else {
               i++;
            }
         }

         entries.push({
            title: entry.title.__cdata,
            content: entry.content.__cdata,
            link: link
         });
      });
      
      return {
         title: feed.title.__text,
         subtitle: feed.subtitle.__text,
         updated: new Date(feed.updated),
         entries: entries
      };
   };
});