/**
* protip.jquery.js
*
* Copyright (c) 2013 Insanehong and Daegeun Kim
*
* Contributors
*
* Licensed under the MIT license.
* https://github.com/insanehong/tip/blob/master/LICENSE
*/

!function ($) {

  "use strict"; // jshint ;_;

  var Tip = function (element, options) {
    this.$element = $(element);
    this.options = options;
  }

  Tip.prototype = {
    // initialize Tip
    setInit : function() {
      this.$element.css( {'z-index' : '999'});
    },

    // start view
    start : function() {

    },
    // stop to rolling 
    stop : function() {

    }, 
    // remove tip layer 
    close : function() {

    },

    // toggle start, close
    toggle : function() {

    }
  }

  $.fn.tip = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tip')
        , options = $.extend({}, $.fn.tip.defaults, typeof option == 'object' && option);
        
      if (!data) $this.data('tip', (data = new Tip(this, options)));
      if (option == 'toggle') data.toggle();
      else if (option) data.setInit();
    })
  }

  $.fn.tip.defaults = {
    interval : 60000,
    auto : false,
    path: './tip.json',
    rate : 0.3,
    btnClose : '#BtnTipClose'
  }

}(window.jQuery);