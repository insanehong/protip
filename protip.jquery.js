/**
 * protip.jquery.js
 *
 * Copyright (c) 2013 Insanehong and Daegeun Kim
 *
 * Licensed under the MIT license.
 * https://github.com/hackrslab/protip/blob/master/LICENSE
 */

(function ($) {

  "use strict";

  var ProTip = function(element, options) {
    this.$element = $(element);
    this.options = options;
    this.initialize(element, options);
  };

  ProTip.prototype = {
    constructor : ProTip,
    initialize : function() {
      var self = this;
      var enable = self.options.rate >= Math.random();
      self.cursor = 0;
        
      if (enable) {
        if (typeof self.options.tips === 'string') {
          $.getJSON(self.options.tips, self.preprocessor);
        } else if (typeof self.options.tips === 'object') {
          self.preprocessor(self.options.tips);
        }
      } else {
        self.$element.remove();
      }
    },
    preprocessor : function(data) {
      var self = this;

      self.tips = data;
      self.tips = (self.options.shuffle === false) ? self.tips :
          self.tips.sort(function() { return 0.5 - Math.random(); }); 

      if (self.options.auto === true) {
        self.timer = setInterval(self.next.bind(self), self.options.interval);
      }
      self.show();
    },
    show : function() {
      this.stopped = false;
      var target = this.$element.find('[data-content="protip"]');

      if (target) $(target).html(this.tips[this.cursor]);
      else this.$element.html(this.tips[this.cursor]);
      
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
        this.cursor = ++this.cursor % this.tips.length;
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
      var data = $this.data('protip');
      var options = $.extend({}, $.fn.protip.defaults, option);

      if (!data) $this.data('protip', (data = new ProTip(this, options)));
      if (typeof option === 'string') data[option].call($this);

      $this.on('mouseover', function(e) {
        console.log('over');
        e.preventDefault();
        $this.data('protip').pause();
      });

      $this.on('mouseout', function(e) {
        console.log('out');
        e.preventDefault();
        $this.data('protip').resume();
      });
    });
  };

  $.fn.protip.Constructor = ProTip;

  $.fn.protip.defaults = {
    interval : 60000,
    auto : false,
    rate : 1,
    tips : [],
    shuffle : true
  };

  $(document).on('click', '[data-close="protip"]', function(e) {
    var target = $(this).data('target');

    e.preventDefault();
    $('#'+target).data('protip').close();
  });
})(jQuery);
