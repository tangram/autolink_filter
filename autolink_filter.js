jQuery(function($) {

  var comment = '';
  var textarea = $('.form-textarea');
  var input, backpanel, dummytext, autocomplete;

  $(document).ready(function() {

    // insert necessary elements
    textarea
      .after('<div class="autolink-backpanel">\
              <pre class="autolink-dummytext"></pre>\
              <input class="autolink-input" type="text">\
              </div>')
      .parent().css({ position: 'relative' });

    // on blur, the input text is output to textarea
    input = $('.autolink-input').blur(function() {
    
      backpanel.css({ zIndex: -1 });
      autocomplete.hide();
      textarea.focus();
      textarea.val(comment + input.val());
      dummytext.text(textarea.val());
      input.val('');
    
    // initialize betterAutocomplete
    }).betterAutocomplete('init', '/autolink-filter-fetch/', {}, {
      
      // queries are on the form path/query
      constructURL: function(path, query) {
        return path + query;
      },

      // inserts non-blank result title to input
      select: function(result, $input) {
        if (result.title != '')
          input.val(result.title);
        input.blur();
      },

    });

    // the backpanel sits behind the textarea
    backpanel = $('.autolink-backpanel').css({ 
      position: 'absolute', 
      left: 0, 
      top: 0, 
      zIndex: -1
    });

    // the dummytext is a <pre> with most of the properties of
    // the textarea, to push the input to about the same spot as the cursor
    dummytext = $('.autolink-dummytext').css({ 
      visibility: 'hidden',  
      display: 'inline',
      font: textarea.css('font'),
      margin: textarea.css('margin'), 
      padding: textarea.css('padding'),
    });
    
    autocomplete = $('.better-autocomplete');

  });

  textarea.keyup(function() {

    // copy textarea to dummytext, move autocomplete to new position
    comment = textarea.val();
    dummytext.text(comment);
    autocomplete.css({
      left: input.position().left,
      top: input.position().top + input.outerHeight()
    });

    // check for typed @, avoid for e.g. an email adress
    if (comment[comment.length-1] == '@' && 
       (comment[comment.length-2] == ' ' || 
        comment[comment.length-2] == undefined)) {

      // bring input to front, focus
      backpanel.css({ zIndex: 10 });
      input.focus().keyup(function () {

        // if esc or enter, hide input
        if (event.which == 27 || event.which == 13)
          input.blur();

      });

    }
  });
});