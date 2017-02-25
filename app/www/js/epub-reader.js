(function() {
  'use strict';

  var webViewInterface = window.nsWebViewInterface;
  var book;

  webViewInterface.on('loadBook', function(fileName) {
    book = ePub({
      bookPath: 'books/' + fileName
    });
    book.renderTo('book');
  })

  webViewInterface.on('nextPage', function() {
    book.nextPage();
  })

  webViewInterface.on('previousPage', function() {
    book.prevPage();
  })
})();
