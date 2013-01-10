jQuery(function($) {

  var comment = '';
  var query = '';
  var textarea = $('.form-textarea');
  var position = 0;

  $(document).ready(function() {

    textarea.css({

      position: 'relative'

    }).betterAutocomplete('init', '/autolink-filter-fetch/', {delay: 100}, {

      afterHide: function($results) {
        textarea.betterAutocomplete('disable');
      },

      canonicalQuery: function(rawQuery, caseSensitive) {
        if (position > 0)
          return rawQuery.substring(position).toLowerCase();
        else
          return '';
      },

      // queries are on the form path/query
      constructURL: function(path, query) {
        return path + query;
      },

      insertSuggestionList: function($results, $input) {
        $results.width($input.outerWidth())
          .css({

            position: 'absolute',
            left: $input.position().left,
            top: $input.position().top + $input.outerHeight(),
            zIndex: 10,
            maxHeight: '330px',

          })
          .hide()
          .insertAfter($input);
      },

      // inserts non-blank result title to textarea
      select: function(result, $input) {
        if (result.title != '') {
          textarea.val(comment.substring(0, position) + result.title);
          comment = '';
          position = 0;
          textarea.betterAutocomplete('disable');
        }
      },

    }).betterAutocomplete('disable');

  });

  textarea.keyup(function() {

    comment = textarea.val();

    // check for typed @, avoid for e.g. an email adress
    if (comment[comment.length-1] == '@' &&
       (comment[comment.length-2] == ' ' ||
        comment[comment.length-2] == '\n' ||
        comment[comment.length-2] == undefined)) {
      position = comment.length;
      textarea.betterAutocomplete('enable');
    }

    if (event.which == 27 || event.which == 13) {
      position = 0;
      textarea.betterAutocomplete('disable');
    }

  });
});