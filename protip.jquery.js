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
    constructor : ProTip,

    initialize : function() {
      this.$element.css({'z-index' : '999'});
    },
    // start rollting
    start : function() {

    },
    // stop rolling
    stop : function() {

    },
    // next protip
    next : function() {

    },
    // remove protip
    close : function() {

    },
    // show protip
    show : function() {

    }
  };

  $.fn.protip = function (option) {
    return this.each(function () {
      var $this = $(this),
        data = $this.data('protip'),
        options = $.extend({}, $.fn.protip.defaults, typeof option == 'object' && option);

      if (!data) {
        $this.data('protip', (data = new ProTip(this, options)));
        data.initialize();
      }
      if (option == 'show') data.show();
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
