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

  "use strict";

  var ProTip = function (element, options) {
    this.$element = $(element);
    this.options = options;
    this.cursor = 0;
    this._initialize(element, options);
  };

  ProTip.prototype = {

    constructor: ProTip,

    _initialize : function() {
      var self = this;
      var enable = this.options.rate >= Math.random();
        
      if (enable) {
        if(typeof self.options.tips === 'string') {
          $.getJSON( self.options.tips , self._ProtipSetting); 
        } else if( typeof self.options.tips === 'object') {
          self._ProtipSetting(self.options.tips);
        }
      } else {
        self.$(element).remove();
      }
    },
    _ProtipSetting : function(data) {
      var self = this;

      self.tips = [];
      for(var key in data) {
        self.tips.push(data[key]);
      }

      self.tips = (self.options.shuffle === false ) ? self.tips :
          self.tips.sort(function() { return 0.5 - Math.random();  }); 

      if (self.options.auto === true) {
        self.timer = setInterval(self.next.bind(self), self.options.interval);
      }
      self.show();
    },
    show : function() {
      this.stopped = false;
      this.$element.find('[data-content="protip"]').html(this.tips[this.cursor]);
      this.$element.show();
    },
    resume : function() {
      this.stopped = false;
    },
    pause : function() {
      this.stopped = true;
    },
    next : function() {
      if (this.stopped === false) {
        this.cursor++;
        this.cursor = this.cursor % this.tips.length;
        this.show();
      }
    },
    close : function() {
      clearInterval(this.timer);
      this.$element.remove();
    }
  };

  $.fn.protip = function (option) {
    return this.each(function () {
      var $this = $(this);
     
      var data = $this.data('protip'),
        options = $.extend({}, $.fn.protip.defaults, option);
        
      if (!data) $this.data('protip', (data = new ProTip(this, options)));
      if(typeof option == 'string') data[option].call($this);

    });
  };

  $.fn.protip.Constructor = ProTip;

  $.fn.protip.defaults = {
    interval : 60000,
    auto : false,
    rate : 1,
    tips : {},
    shuffle : true
  };

  $(document).on('click', '[data-close="protip"]',function(e){
    var target = $(this).data('target');
    $('#'+target).data('protip').close();
  });

})(jQuery);
