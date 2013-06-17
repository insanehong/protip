/**
* protip.jquery.js
*
* Copyright (c) 2013 Insanehong and Daegeun Kim
*
* Contributors
*
* Licensed under the MIT license.
* https://github.com/insanehong/protip/blob/master/LICENSE
*/

(function ($) {

  "use strict"; // jshint ;_;

  var ProTip = function (element, options) {
    this.$element = $(element);
    this.options = options;
  };

  ProTip.prototype = {
    // initialize ProTip
    setInit : function() {
      this.$element.css( {'z-index' : '999'});
    },

    // start view
    start : function() {

    },
    // stop to rolling 
    stop : function() {

    }, 
    // remove protip layer 
    close : function() {

    },

    // toggle start, close
    toggle : function() {

    }
  };

  $.fn.protip = function (option) {
    return this.each(function () {
      var $this = $(this),
        data = $this.data('protip'),
        options = $.extend({},
        $.fn.protip.defaults, typeof option == 'object' && option);

      if (!data) $this.data('protip', (data = new ProTip(this, options)));
      if (option == 'toggle') data.toggle();
      else if (option) data.setInit();
    });
  };

  $.fn.protip.defaults = {
    interval : 60000,
    auto : false,
    path: './protip.json',
    rate : 0.3,
    btnClose : '.btn-protip-close'
  };

})(jQuery);
