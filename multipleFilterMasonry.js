(function($){
  'use strict';
  $.fn.multipleFilterMasonry = function(options){
    var init = function($container){
      $container.masonry(options);
    };

    //reload masonry
    var reload = function($container){
      $container.masonry();
    };

    var proc = function($container){
      var checkboxes=$(options.filtersGroupSelector).find('input[type=checkbox]');
      var checkboxesLen=checkboxes.length;
      checkboxes.change(function() {
        var hidden=checkboxes.not(':checked');
        var hiddenLen=hidden.length;
        $('head style[title=multipleFilterMasonry]').remove();
        // only update if something is unselected. If all are unselected do not update either.
        if (hiddenLen>0 && hiddenLen!==checkboxesLen) {
          var selectors=[];
          hidden.each(function() {
            selectors.push(this.value);
          });
          $('<style title="multipleFilterMasonry">.'+selectors.join(',.')+'{display:none}</style>').appendTo('head');
        }
        reload($container);
      });
    };

    return this.each(function() {
      var $$ = $(this);
      init($$);
      proc($$);
    });
  };
}(window.jQuery));
