$(function() {
	"use strict";

	// Some variables for later
	var dictionary, set_lang;
	var eng_lang = "english";
	var hindi_lang = "hindi";

	// Object literal behaving as multi-dictionary
	dictionary = {
		"english" : {

			/**
			 * SIDE BAR
			 */

			"_primary" : "Primary"
			
		
		},
		"hindi" : {

			/**
			 * SIDE BAR
			 */
			"_primary" : "प्राथमिक"
			
		}
	};
	

	// set language according to type
	set_lang = function(language) {
		if (dictionary.hasOwnProperty(language)) {

			$(".loader").fadeIn();

			$("[data-translate]").text(function() {
				var key = $(this).data("translate");
				if (dictionary.hasOwnProperty(language)) {
					let value = dictionary[language][key];
					// console.log("value > "+value);
					$(this).text(value);
				}
				$(".loader").fadeOut();
			});
		}
	};

	/**
	 * Hindi language
	 */
	$("#pills-hindi-tab").click(function() {
		set_lang(hindi_lang);
	});

	/**
	 * English language
	 */
	$("#pills-english-tab").click(function() {
		set_lang(eng_lang);
	});

	// Set initial language to English
	set_lang(eng_lang);
});
