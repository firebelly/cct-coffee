var CCT = window.CCT || {};

CCT.Coffee = (function() {
	var _slideshow;
	var _slideNav;

	function _init() {
		_slideNav = $('#slide-nav ul')

		// retrieve JSON data
		$.ajax({
			url: $('body').attr('id').replace('slide-','')+'.json',
			dataType: 'json',
			success: function(data) {
				_slideshow = data;
				_init_slideshow();
			}
		});
	}

	function _init_slideshow() {
		// set title from JSON file on document and in HTML
		document.title = document.title + ' - ' + _slideshow.title;
		$('#slide-title').html(_slideshow.html_title);

		// build slideshow HTML from JSON data
		_numSlides = _slideshow.slides.length;
		$.each(_slideshow.slides, function(i, slide) {
			slide.title = slide.title.replace('&','<br><strong>&</strong>');
			$('<li>' + slide.title + '</li>').appendTo(_slideNav).click(function() {
				_slideTo(i);
				$('.iosSlider').iosSlider('autoSlide', false);
			});
			var slideTemplate = ich.slide(slide);
			$('#slide').append(slideTemplate);
		});

		// 
		_slideNav.find('li:first').addClass('active');

		// do we have a page-bg to init?
		if ($('.page-bg').length>0) {
			$('#bg1').fadeOut(0).attr('src','images/'+_slideshow.slides[0].bg).fadeIn(1500);
		}

		// init the touch-enabled slider
		$('.iosSlider').iosSlider({
			snapToChildren: true,
			desktopClickDrag: true,
			onSlideChange: _slideChange,
			onSlideComplete: _slideComplete,
			infiniteSlider: true,
			keyboardControls: true,
			autoSlide: true
		});
	}

	// show active slide in nav
	function _slideChange (args) {
		_slideAt = args.currentSlideNumber-1;
		_slideNav.find('li').removeClass('active');
		_slideNav.find('li:eq('+_slideAt+')').addClass('active');
	}
3
	// update background (if present) after slide has completed animating
	function _slideComplete(args) {
		if ($('.page-bg').length>0) {
			$('#bg1').attr('src',$('#bg2').attr('src')).fadeIn(0).fadeOut(300);
			$('#bg2').fadeOut(0).attr('src','images/'+_slideshow.slides[_slideAt].bg).fadeIn(1500);
		}
	}

	function _slideTo(to) {
		$('.iosSlider').iosSlider('goToSlide', to+1);
	}


	return {
		init: function() {
			_init();
		}
	};
})();

$(document).ready(function() {
	CCT.Coffee.init();
});