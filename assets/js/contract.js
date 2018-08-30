








var contractOLD = function(){


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

	var now = new Date() / 1000;

	var brainGain = {
		Start: 1528082179,
		End: 1529669779,
		Perc: ((now - 1528082179) / (1529669779 - 1528082179)) * 100
	}; // Block 5728592


	var fund = {value: undefined, method: "b60d4288", updated: undefined};
	var plot = {value: 1, method: "da178cb0", updated: undefined};
	var eta = {value: undefined, method: "f7992d85", requiresStage: true, updated: undefined};
	var plotTotal = {value: undefined, method: "b5d1dbe4", requiresStage: true, updated: undefined};


	// Helper functions
	var toPaddedHex = function(num){ var s = num.toString(16); while (s.length < 64) {s = "0" + s;} return s; };
	var asTTP = function(bigNum){ return parseFloat(bigNum) / Math.pow(10, 15) };
	var asEth = function(bigNum){ return parseFloat(bigNum) / Math.pow(10, 18) };

	var data = function(fn, data){
		if(typeof data !== "undefined"){ fn += toPaddedHex(data); }
		return {module: "proxy", action: "eth_call", to: address, data: fn};
	};


	var getData = function(what, andthen) {
		$.ajax({
			dataType: "json",
			url: APIURL,
			data: data(what.method, what.requiresStage ? plot.value : undefined),
			success: function( d ) {
				what.value = parseInt(d.result, 16);
				what.updated = Date.now();
				if(typeof andthen !== "undefined") andthen();
			}
		});
	};


	var getETA = function(){
		getData(eta, function() {
			console.log(eta.value)
		})
	};


	function timeDifference(current, previous) {
		var msPerMinute = 60;
		var msPerHour = msPerMinute * 60;
		var msPerDay = msPerHour * 24;
		var msPerMonth = msPerDay * 30;
		var msPerYear = msPerDay * 365;

		var elapsed = current - previous;

		if (elapsed < msPerMinute) {
			jQuery(".showIncrement").html( Math.round(elapsed));
			jQuery(".showIncp2").html('seconds');
		} else if (elapsed < msPerHour) {
			jQuery(".showIncrement").html( Math.round(elapsed/msPerMinute));
			jQuery(".showIncp2").html('minutes');
		} else {
			jQuery(".showIncrement").html( Math.round(elapsed/msPerHour ));
			jQuery(".showIncp2").html('hours');
		}

		var Start = eta.value - (21 * 60 * 60);
		var Perc = ((now - Start) / (21 * 60 * 60)) * 100;
		jQuery(".barPerc").attr("style", "width:" + Perc + "%;");
		jQuery(".barPerc .current-percent").html(Math.floor(Perc) + "%")
	}


	var updatePlot = function(){getData(plot, function() {$(".streekingNumber").html(("000" + (plot.value-1)).slice(-3));});}

	var updateETA = function(){
		getData(eta, function() {
			timeDifference(eta.value, now);
		});
	};

	var init = function(){
		updatePlot();
		updateETA();
	};


	return {
		data: function(){ return {
			raised: asEth(fund.value).toFixed(2),
			plot: plot.value,
			plotEndTime: plot.value === 0 ? undefined : eta.value,
			plotValue: stageValue[plot.value],
			plotRaised: plotTotal.value
		}},
		contract: address,
		trent: ttpAddress,
		faythe: fyeAddress,
		brainGain: brainGain,
		plotValue: function(p){ return stageValue[p]; },
		update: function(){
			init();

		}
	}
}();

//contract.start();


