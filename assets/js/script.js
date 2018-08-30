/* Template	:	Website V3 v1.3.2 */
(function($){
	'use strict';
	var $win = $(window), $body_m = $('body'), $navbar = $('.navbar');
	
	// Touch Class
	if (!("ontouchstart" in document.documentElement)) {
		$body_m.addClass("no-touch");
	}
	// Get Window Width
	function winwidth () {
		return $win.width();
	}
	var wwCurrent = winwidth();
	$win.on('resize', function () { 
		wwCurrent = winwidth(); 
	});

	// Sticky
	var $is_sticky = $('.is-sticky');
	if ($is_sticky.length > 0 ) {
		var $navm = $('#mainnav').offset();
		$win.scroll(function(){
			var $scroll = $win.scrollTop();
			if ($win.width() > 991) {
				if($scroll > $navm.top ){
					if(!$is_sticky.hasClass('has-fixed')) {$is_sticky.addClass('has-fixed');}
				} else {
					if($is_sticky.hasClass('has-fixed')) {$is_sticky.removeClass('has-fixed');}
				}
			} else {
				if($is_sticky.hasClass('has-fixed')) {$is_sticky.removeClass('has-fixed');}
			}
		});
	}
	
	// OnePage Scrolling
	$('a.menu-link[href*="#"]:not([href="#"])').on("click", function() {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			var toHash = $(this.hash), toHashN = (this.hash.slice(1)) ? $('[name=' + this.hash.slice(1) + ']') : false, nbar = (wwCurrent >= 992) ? $navbar.height() - 1 : 0;

			toHash = toHash.length ? toHash : toHashN;
			if (toHash.length) {
				$('html, body').animate({
					scrollTop: (toHash.offset().top - nbar)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});
	
	// Active page menu when click
	var CurURL = window.location.href, urlSplit = CurURL.split("#");
	var $nav_link = $(".nav li a");
	if ($nav_link.length > 0) {
		$nav_link.each(function() {
			if (CurURL === (this.href) && (urlSplit[1]!=="")) {
				$(this).closest("li").addClass("active").parent().closest("li").addClass("active");
			}
		});
	}
	
	// Bootstrap Dropdown 
	var $dropdown_menu = $('.dropdown-toggle');	
	if ($dropdown_menu.length > 0 ) {
		$dropdown_menu.on("mouseover",function(){
			if ($win.width() > 991) {
				$('.dropdown-menu', this).not('.in .dropdown-menu').stop().fadeIn("400");
				$(this).parent().addClass('open'); 
			}
		});
		$dropdown_menu.on("mouseleave",function(){
			if ($win.width() > 991) {
				$('.dropdown-menu', this).not('.in .dropdown-menu').stop().fadeOut("400");
				$(this).parent().removeClass('open'); 
			}
		});
		$dropdown_menu.on("click",function(){
			if ($win.width() < 991) {
				$(this).parent().children('.dropdown-menu').fadeToggle(400);
				$(this).parent().toggleClass('open'); 
				return false;
			}
		});
		
	}
	$win.on('resize', function() {
		$('.navbar-collapse').removeClass('in');
		$dropdown_menu.parent().children('.dropdown-menu').fadeOut("400");
	});

	// remove ani
	var $navtoggler = $('.navbar-toggler'), $trannav =$('.is-transparent');
	if ($navtoggler.length > 0) {
		$navtoggler.on("click",function(){
			$('.remove-animation').removeClass('animated');
			if (!$trannav.hasClass('active')) {
				$trannav.addClass('active');
			}else{
				$trannav.removeClass('active');
			}
		});
	}
	
	// Select
	var $selectbox = $('select');
	if ($selectbox.length > 0) {
		$selectbox.select2();
	}
	
	// Nav collapse
	$('.menu-link').on("click",function() {
		$('.navbar-collapse').collapse('hide');
		$trannav.removeClass('active');
	});
	$(document).on('mouseup', function(e){
		if (!$trannav.is(e.target) && $trannav.has(e.target).length===0) {
			$('.navbar-collapse').collapse('hide');
			$trannav.removeClass('active');
		}
	});
	
	//Carousel Time Line
	var $timeline_carousel = $('.timeline-carousel');
	if ($timeline_carousel.length > 0 ) {
		var c_rtl = ($body_m.hasClass('is-rtl')) ? true : false;
		$timeline_carousel.addClass('owl-carousel').owlCarousel({
			navText: ["<i class='ti ti-angle-left'></i>","<i class='ti ti-angle-right'></i>"],
			items:6,
			nav:true,
			margin:30,
			rtl: c_rtl,
			responsive:{
				0 : {
					items:1,
				},
				400 : {
					items:2,
					center:false,
				},
				599 : {
					items:3,
				},
				1024 : {
					items:5,
				},
				1170 : {
					items:6,
				}
			}
		});
	}
	
	//Carousel Roadmap
	var $roadmap_carousel = $('.roadmap-carousel');
	if ($roadmap_carousel.length > 0 ) {
		var c_rtl_r = ($body_m.hasClass('is-rtl')) ? true : false;
		$roadmap_carousel.addClass('owl-carousel').owlCarousel({
			items:6,
			nav:false,
			dost:true,
			margin:30,
			rtl: c_rtl_r,
			responsive:{
				0 : {
					items:1,
				},
				400 : {
					items:2,
					center:false,
				},
				599 : {
					items:3,
				},
				1024 : {
					items:4,
				},
				1170 : {
					items:5,
				}
			}
		});
	}	
	
	//Carousel Roadmap
	var $roadmap_carousel_withnav = $('.roadmap-carousel-withnav');
	if ($roadmap_carousel_withnav.length > 0 ) {
		var c_rtl_rn = ($body_m.hasClass('is-rtl')) ? true : false;
		$roadmap_carousel_withnav.addClass('owl-carousel').owlCarousel({
			navText: ["<i class='ti ti-angle-left'></i>","<i class='ti ti-angle-right'></i>"],
			items:5,
			nav:true,
			dost:false,
			margin:30,
			rtl: c_rtl_rn,
			responsive:{
				0 : {
					items:1,
				},
				400 : {
					items:2,
					center:false,
				},
				599 : {
					items:3,
				},
				1024 : {
					items:4,
				},
				1170 : {
					items:5,
				}
			}
		});
	}	

	//Carousel
	var $has_carousel = $('.has-carousel');
	if ($has_carousel.length > 0 ) {
		var c_rtl_c = ($body_m.hasClass('is-rtl')) ? true : false;
		$has_carousel.each(function(){
			var $self = $(this);
			var c_item = ($self.data('items')) ? $self.data('items') : 4;
			var c_item_t = (c_item >= 3) ? 2 : c_item;
			var c_item_m = (c_item_t >= 2) ? 1 : c_item_t;
			var c_delay = ($self.data('delay')) ? $self.data('delay') : 6000;
			var c_auto = ($self.data('auto')) ? true : false;
			var c_loop = ($self.data('loop')) ? true : false;
			var c_dots = ($self.data('dots')) ? true : false;
			var c_navs = ($self.data('navs')) ? true : false;
			var c_ctr = ($self.data('center')) ? true : false;
			var c_mgn = ($self.data('margin')) ? $self.data('margin') : 30;
			$self.addClass('owl-carousel').owlCarousel({
				navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
				items: c_item, loop: c_loop, nav: c_navs, dots: c_dots, margin: c_mgn, center: c_ctr,
				autoplay: c_auto, autoplayTimeout: c_delay, autoplaySpeed: 300, rtl: c_rtl_c,
				responsive:{ 0:{ items:1 }, 480:{ items: c_item_m }, 768:{ items: c_item_t }, 1170:{ items: c_item } }
			});
		});
	}



	var contract = function () {

		var address = "0x7415c7bF3e2415Fa9A55f1Fd8B6FCcf2914C39a6";

		var ttpAddress = "0x38f22479795a1a51ccd1e5a41f09c7525fb27318";
		var fyeAddress = "0xde9f3378969b482b2223b7ba9c6f9b5186f3124a";

		var stageValue = [1000000,100628393,3609941,3605629,3600887,3596389,3591631,3586901,3582353,3577543,3572707,3567973,
			3563477,3558829,3554203,3549319,3544763,3539857,3535043,3530537,3525541,3520667,3515731,3511247,3506329,3501917,
			3496949,3492287,3487439,3482669,3477811,3472943,3468163,3463381,3458471,3453761,3448997,3444253,3439669,3435347,
			3430717,3425999,3421321,3416639,3411857,3407333,3402787,3398047,3393563,3388789,3384319,3379427,3374927,3370151,
			3365743,3361097,3356081,3351191,3346589,3341783,3337361,3332489,3327773,3323059,3318389,3313727,3309091,3304661,
			3299687,3294919,3290159,3285677,3280877,3276253,3271673,3266909,3262313,3257717,3253013,3248237,3243677,3238681,
			3234311,3229649,3225127,3220453,3215819,3211129,3206767,3202039,3197657,3193027,3188509,3183839,3179257,3174467,
			3169981,3165377,3160709,3155993,3151543,3146863,3142301,3137507,3132737,3128039,3123403,3118691,3114301,3109553,
			3105007,3100327,3095551,3090827,3086389,3081697,3077143,3072683,3068231,3063409,3058843,3053987,3049381,3044597,
			3040091,3035203,3030523,3025963,3021101,3016399,3011707,3007159,3002533,2997913,2993363,2988637,2983987,2979569,
			2974891,2970157,2965549,2961067,2956297,2951617,2946961,2942249,2937511,2932903,2928271,2923471,2919013,2914363,
			2909591,2905099,2900419,2895881,2891041,2886467,2881873,2877167,2872433,2867573,2863117,2858393,2853707,2848939,
			2844311,2839769,2835221,2830913,2826091,2821537,2817127,2812541,2808313,2803673,2799187,2794541,2789993,2785129,
			2780647,2775859,2771281,2766677,2762063,2757577,2752843,2748089,2743501,2739127,2734187,2729533,2724703,2719883,
			2715533,2710963,2706413,2701871,2697301,2692763,2688239,2683679,2679199,2674523,2669603,2664931,2660311,2655889,
			2651359,2646841,2642257,2637673,2632937,2628713,2623969,2619257,2614691,2610241,2605439,2600687,2596133,2591609,
			2586953,2582323,2577917,2573561,2568941,2564333,2559863,2555171,2550739,2546009,2541479,2536691,2531981,2527489,
			2523173,2518643,2513839,2509337,2504717,2500163,2495749,2490941,2486513,2481889,2477281,2472607,2467957,2463413,
			2458837,2454161,2449813,2445241,2440681,2435957,2431409,2426747,2422093,2417603,2413231,2408513,2403701,2399143,
			2394673,2389993,2385787,2381143,2376559,2371879,2367289,2362819,2358331,2353823,2349101,2344379,2339921,2335219,
			2330761,2326211,2321393,2316697,2311873,2307541,2302799,2298397,2293817,2289263,2284837,2279843,2275199,2270839,
			2266507,2261993,2257579,2253281,2248507,2244091,2239327,2234789,2230219,2225863,2221403,2216611,2211919,2207357,
			2202997,2198293,2193599,2189147,2184617,2179939,2175497];

		var APIURL = "https://api.etherscan.io/api";

		var fund = {value: undefined, method: "b60d4288", updated: undefined};
		var plot = {value: 1, method: "da178cb0", updated: undefined};
		var eta = {value: undefined, method: "f7992d85", requiresStage: true, updated: undefined};
		var plotTotal = {value: undefined, method: "b5d1dbe4", requiresStage: true, updated: undefined};
		var usdPrice = {value: undefined};

		// Helper functions
		var toPaddedHex = function(num){ var s = num.toString(16); while (s.length < 64) {s = "0" + s;} return s; };
		var asTTP = function(bigNum){ return parseFloat(bigNum) / Math.pow(10, 15) };
		var asEth = function(bigNum){ return parseFloat(bigNum) / Math.pow(10, 18) };

		var data = function(fn, data){
			if(typeof data !== "undefined"){ fn += toPaddedHex(data); }
			return {module: "proxy", action: "eth_call", to: address, data: fn};
		};

		var getData = function(what, andthen) {
			if(typeof what.updated === "undefined"){
				$.ajax({
					dataType: "json",
					url: APIURL,
					data: data(what.method, what.requiresStage ? plot.value : undefined),
					success: function( d ) {
						what.value = parseInt(d.result, 16);
						what.updated = Date.now();
						if(typeof andthen !== "undefined") andthen(what);
					}
				});
			} else {
				andthen(what)
			}
		};


		return {
			getETA: function(f){getData(eta, f);},
			getFund: function(f){getData(fund, f);},
			getPriceUSD: function(f){
				if(typeof usdPrice.value === "undefined"){
					$.ajax({
						dataType: "json",
						url: "https://api.etherscan.io/api?module=stats&action=ethprice",
						success: function(d) {
							console.log(d);
							usdPrice.value = d.result.ethusd;
							if(typeof f !== "undefined") f(usdPrice);
						}
					})
				} else {
					if(typeof f !== "undefined") f(usdPrice);
				}
			},
			getStage: function(f){getData(plot, f);},
			getLastPlotTotal: function(f){
				plot.value -= 1;
				getData(plotTotal, f);
				plot.value += 1;
			},
			plotValues: stageValue
		}
	}();

	// Countdown

	var $count_token = $('.token-countdown');
	if ($count_token.length > 0 ) {
		contract.getETA(function(result){
			$count_token.each(function() {
				var $self = $(this);
				$self.countdown(result.value * 1000).on('update.countdown', function(event) {
					$(this).html(event.strftime(''  + '<div class="col"><span class="countdown-time">%H</span><span class="countdown-text">Hours</span></div>' + '<div class="col"><span class="countdown-time">%M</span><span class="countdown-text">Minutes</span></div>' + '<div class="col"><span class="countdown-time countdown-time-last">%S</span><span class="countdown-text">Seconds</span></div>'));
				});
			});
		});
	}

	var $ethRaised = $('.ethRaised');
    var $ethRaisedUSD = $('.ethRaisedUSD');

	if($ethRaised.length > 0) {

        contract.getFund(function(result){

            $ethRaised.each(function() {$(this).html(Math.round(result.value / 10 ** 18).toLocaleString());});

            if($ethRaisedUSD.length > 0) {
                contract.getPriceUSD(function (price) {

                    $ethRaisedUSD.each(function() {$(this).html(Math.round(result.value / 10 ** 18 * price.value).toLocaleString());});

                    contract.getStage(function(result){
                    	var supply = contract.plotValues.slice(0,result.value).reduce((a, b) => a + b, 0); //.toLocaleString();

						$(".supply").each(function(){$(this).html(Math.round(supply/1000000).toLocaleString());});
                    	$('.current-streaking').each(function(){$(this).html(result.value - 1)});
                    	$(".current-plot").each(function(){$(this).html(result.value + 1)});

                        contract.getLastPlotTotal(function(lp){
                            var currentPrice = (lp.value / 10 ** 18 * price.value / contract.plotValues[result.value - 1]);

                            $(".volume24").each(function(){$(this).html((lp.value / 10 ** 18 * price.value / 1000000).toFixed(1))});
                            $(".current-price").each(function(){$(this).html(currentPrice.toFixed(2))});
                            $(".marketcap").each(function(){$(this).html(Math.round(supply * currentPrice / 1000000))});
                        })
                    });
                });
            }
		});
	}
	
	//POPUP - Content
	var $content_popup = $('.content-popup');
	if ($content_popup.length > 0 ) {
		$content_popup.magnificPopup({
			type: 'inline',
			preloader: true,
			removalDelay: 400,
			mainClass: 'mfp-fade bg-team-exp'
		});
	}
	
	//POPUP - Video
	var $video_play = $('.video-play');
	if ($video_play.length > 0 ) {
		$video_play.magnificPopup({
			type: 'iframe',
			removalDelay: 160,
			preloader: true,
			fixedContentPos: false,
			callbacks: {
			beforeOpen: function() {
					this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
					this.st.mainClass = this.st.el.attr('data-effect');
				}
			},
		});
	}
	
	//ImageBG
	var $imageBG = $('.imagebg');
	if ($imageBG.length > 0) {
		$imageBG.each(function(){
			var $this = $(this), 
				$that = $this.parent(),
				overlay = $this.data('overlay'),
				image = $this.children('img').attr('src');
			var olaytyp = (typeof overlay!=='undefined' && overlay!=='') ? overlay.split('-') : false;
			
			// If image found
			if (typeof image!=='undefined' && image !==''){
				if (!$that.hasClass('has-bg-image')) {
					$that.addClass('has-bg-image');
				}
				if ( olaytyp!=='' && (olaytyp[0]==='dark') ) {
					if (!$that.hasClass('light')) {
						$that.addClass('light');
					}
				}
				$this.css("background-image", 'url("'+ image +'")').addClass('bg-image-loaded');
			}
		});
	}
	// Mask Class add
	var $maskOV = $('[class*="mask-ov"]');
	if ($maskOV.length > 0) {
		$maskOV.each(function(){
			var $this = $(this), $that = $this.parent();
			if (!$that.hasClass('has-maskbg')) {
				$that.addClass('has-maskbg');
			}
		});
	}
	// Ajax Form Submission
	// var contactForm = $('#contact-form'), subscribeForm = $('#subscribe-form');
	// if (contactForm.length > 0 || subscribeForm.length > 0) {
	// 	if( !$().validate || !$().ajaxSubmit ) {
	// 		console.log('contactForm: jQuery Form or Form Validate not Defined.');
	// 		return true;
	// 	}
	// 	// ContactForm
	// 	if (contactForm.length > 0) {
	// 		var selectRec = contactForm.find('select.required'),
	// 		qf_results = contactForm.find('.form-results');
	// 		contactForm.validate({
	// 		invalidHandler: function () { qf_results.slideUp(400); },
	// 		submitHandler: function(form) {
	// 			qf_results.slideUp(400);
	// 			$(form).ajaxSubmit({
	// 				target: qf_results, dataType: 'json',
	// 				success: function(data) {
	// 					var type = (data.result==='error') ? 'alert-danger' : 'alert-success';
	// 					qf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert ' + type ).html(data.message).slideDown(400);
	// 					if (data.result !== 'error') { $(form).clearForm().find('.input-field').removeClass('input-focused'); }
	// 				}
	// 			});
	// 			}
	// 		});
	// 		selectRec.on('change', function() { $(this).valid(); });
	// 	}
	// 	// SubscribeForm
	// 	if (subscribeForm.length > 0) {
	// 		var sf_results = subscribeForm.find('.subscribe-results');
	// 		subscribeForm.validate({
	// 		invalidHandler: function () { sf_results.slideUp(400); },
	// 		submitHandler: function(form) {
	// 			sf_results.slideUp(400);
	// 			$(form).ajaxSubmit({
	// 				target: sf_results, dataType: 'json',
	// 				success: function(data) {
	// 					var type = (data.result==='error') ? 'alert-danger' : 'alert-success';
	// 					sf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert ' + type ).html(data.message).slideDown(400);
	// 					if (data.result !== 'error') { $(form).clearForm(); }
	// 				}
	// 			});
	// 			}
	// 		});
	// 	}
	// }data
	
	// Input Animation
	var $inputline = $('.input-line');
	if ($inputline.length > 0) {
		$inputline.each(function(){
			var $this = $(this);
			var $thisval = $(this).val();
			if($thisval.length > 0) {
				$this.parent().addClass('input-focused');
			}
			$this.on('focus', function(){
				$this.parent().addClass('input-focused');
			});
			$this.on('blur', function(){
				$this.parent().removeClass('input-focused');
				var $afterblur = $(this).val();		
					if($afterblur.length > 0) {
					$this.parent().addClass('input-focused');
				}
			});
			
		});
	}
	
	// On Scroll Animation
	var $aniKey = $('.animated');
	if($().waypoint && $aniKey.length > 0){
		$win.on('load', function() {
			$aniKey.each(function(){
			var aniWay = $(this), typ = aniWay.data("animate"), dur = aniWay.data("duration"), dly = aniWay.data("delay");
			aniWay.waypoint(function(){
				aniWay.addClass("animated "+typ).css("visibility", "visible");
				if(dur){ 
					aniWay.css('animation-duration', dur+'s'); 
				}
				if(dly){ 
					aniWay.css('animation-delay', dly+'s'); 
				}
				}, { offset: '93%' });
			});
		});
	}
	
	// Preloader
	var $preload = $('#preloader'), $loader = $('#loader');
	if ($preload.length > 0) {
		$win.on('load', function() {
			$loader.fadeOut(300);
			$body_m.addClass("loaded");
			$preload.delay(700).fadeOut(300);
		});
	}
	
	/* @v1.2.0 */
	//Process Slider
	var slider_p = '.slider-pane', slider_n = '.slider-nav';
	if ($(slider_p).length > 0 ) {
		var c_rtl_s = ($body_m.hasClass('is-rtl')) ? true : false;
		$(slider_p).addClass('owl-carousel').owlCarousel({
		 	items:1,
			nav:false,
			dotsContainer:slider_n,
			margin:30,
			loop:true,
			autoplayTimeout:3000,
			rtl: c_rtl_s,
			autoplay:true,
			animateOut:'fadeOut',
			autoplayHoverPause:true
		});
	}
    
    // accordian
	var $card = $('.card');
	if ($card.length > 0) {
		$card.each(function(){
			var $cha = $('.card-header a') ;
			$cha.on('click', function(){
                var $this = $(this);
                $this.parent().parent().parent().parent().find($card).removeClass('active');
				$this.parent().parent().parent().addClass('active');
			});
		});
	}
    
	// particlesJS
	var $particles_js = $('#particles-js');
	if ($particles_js.length > 0 ) {
		particlesJS('particles-js',
		// Update your personal code.
        {
		"particles": {
			"number": {
				"value": 100,
				"density": {
					"enable": true,
					"value_area": 800
				}
			},
			"color": {
				"value": "#ffe303"
			},
			"shape": {
				"type": "circle",
				"opacity": 0.7500,
				"stroke": {
					"width": 0,
					"color": "#ffe303"
				},
				"polygon": {
					"nb_sides": 5
				}
			},
			"opacity": {
				"value": 0.7500,
				"random": false,
				"anim": {
					"enable": false,
					"speed": 1,
					"opacity_min": 0.12,
					"sync": false
				}
			},
			"size": {
				"value": 4,
				"random": true,
				"anim": {
					"enable": false,
					"speed": 40,
					"size_min": 0.08,
					"sync": false
				}
			},
			"line_linked": {
				"enable": true,
				"distance": 300, //150,
				"color": "#ffe303",
				"opacity": 0.75,
				"width": 1.3
			},
			"move": {
				"enable": true,
				"speed": 10,
				"direction": "none",
				"random": true,
				"straight": false,
				"out_mode": "bounce",
				"bounce": false,
				"attract": {
					"enable": false,
					"rotateX": 600,
					"rotateY": 1200
				}
			}
		},
		"interactivity": {
			"detect_on": "canvas",
			"events": {
				"onhover": {
					"enable": false,
					"mode": "repulse"
				},
				"onclick": {
					"enable": true,
					"mode": "push"
				},
				"resize": true
			},
			"modes": {
				"grab": {
				"distance": 400,
					"line_linked": {
						"opacity": 1
					}
				},
				"bubble": {
					"distance": 400,
					"size": 40,
					"duration": 2,
					"opacity": 8,
					"speed": 3
				},
				"repulse": {
					"distance": 200,
					"duration": 0.4
				},
				"push": {
					"particles_nb": 40
				},
				"remove": {
					"particles_nb": 2
				}
			}
		},
			"retina_detect": true
		}
		// Stop here.
      );
	}
	
})(jQuery);