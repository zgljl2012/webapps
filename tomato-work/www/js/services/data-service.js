/* 
 * 简单粗暴。。。
 */
app.service("dataService", function() {
   this.find = function(list, obj) {
       if(list !== null) {
           var newlist = [];
           for(var o in list) {
               if(o !== null) {
                   if(typeof list[o] === 'object') {
                       var is = true;
                       for(var o1 in obj) {
                           if(obj[o1] !== list[o][o1]) {
                               is = false;
                               break;
                           }
                       }
                       if(is) {
                           newlist.push(list[o]);
                       }
                   }
               }
           }
           return newlist;
       }
       return list;
   };
});

