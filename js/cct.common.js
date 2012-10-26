var CCT = window.CCT || {};

CCT.Common = (function() {
	var _activity_monitor = null;
	var _inactivity_duration = 0;

	function _init() {
		_init_activity_monitor();

		// disable right click
		$(document).bind("contextmenu",function(e){
			return false;
		});
	}

	function _init_activity_monitor() {
		_activity_monitor = setInterval(function() {
			if (_inactivity_duration >= 2) {
				clearInterval(_activity_monitor);

				// restart autoslider if no activity for 10 seconds
				$('.iosSlider').iosSlider('autoSlide', true);

			} else {
				_inactivity_duration += 1;
			}
		}, 5000);

		$(document).on('mousemove', function() {
			_reset_activity_monitor();
		});
	}

	function _reset_activity_monitor() {
		_inactivity_duration = 0;
	}

	return {
		init: function() {
			_init();
		}
	};
})();

$(document).ready(function() {
	CCT.Common.init();
});