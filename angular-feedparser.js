angular.module('angular-feedparser', []);

angular.module('angular-feedparser').service('x2js', function() {
   return new X2JS();
});

angular.module('angular-feedparser').service('feedparser', function(x2js) {
   var me = this;
   
   me.parse = function(xmldata) {
      var jsondata = x2js.xml_str2json(xmldata);
      
      return {
         title: jsondata.feed.title.__text,
         subtitle: jsondata.feed.subtitle.__text,
         updated: new Date(jsondata.feed.updated),
         entries: []
      }
   };
});