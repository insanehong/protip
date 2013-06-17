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
      var self = this;
      var enable = this.options.rate >= Math.random();
      if (enable) {
        $.get(this.options.path, function(json) {
          self.cursor = 0;
          self.tips = self.options.shuffle === false ? json :
              json.sort(function() { return 0.5 - Math.random(); });
          self.show();
          if (self.options.auto === true) {
            self.timer = setInterval(self.next.bind(self), self.options.interval);
            self.$element.on('mouseover', function() {
              self.pause();
            })
            .on('mouseout', function() {
              self.resume();
            });
          }
        });
      }
    },
    show : function() {
      this.stopped = false;
      this.$element.html(this.tips[this.cursor]);
      this.$element.show();
    },
    resume : function() {
      this.stopped = false;
    },
    pause : function() {
      this.stopped = true;
    },
    next : function() {
      if (this.started === true) {
        this.cursor++;
        this.cursor = this.cursor % this.tips.length;
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
      option = option || {};
      option.path = option.path || $this.data('path');
      option.auto = option.auto || $this.data('auto');
      option.rate = option.rate || $this.data('rate');
      option.shuffle = option.shuffle || $this.data('shuffle');
      option.interval = option.interval || $this.data('interval');

      var data = $this.data('protip'),
        options = $.extend({}, $.fn.protip.defaults, option);

      if (!data) {
        $this.data('protip', (data = new ProTip(this, options)));
        data.initialize();
        $this.find(options.btnClose).on('click', function() {
          data.close();
        });
      }
    });
  };

  $.fn.protip.defaults = {
    interval : 60000,
    auto : false,
    path: './protip.json',
    rate : 1,
    shuffle : true,
    btnClose : '.btn-protip-close'
  };

})(jQuery);
