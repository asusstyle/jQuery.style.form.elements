/*
This plugin is developed by Ashish Panchal
Code license - GNU GPL v3
Please visit http://www.ashishuideveloper.in
*/
;(function($){
var AP = window.AP || {};
AP.css = "";
AP.defaults = {
	radio: true,
	checkbox: true,
	dropdown: true
};
AP.functions = {
	init : function(frm, settings){
		if(settings.radio)
			AP.css += ".rd_wrapper{display:inline-block;position:absolute;z-index:0;}.rd_wrapper .selected{background-position:0 -50px;}";
		if(settings.checkbox)
			AP.css += ".chk_wrapper{display:inline-block;position:absolute;z-index:0;}.chk_wrapper .selected{background-position:0 0;}";
		if(settings.dropdown)
			AP.css += ".sel_wrapper{position:relative;}.origSelect{position:absolute;top:0;left:0;opacity:0;filter:alpha(opacity=0);}";
			
		if($("#fancyFormElementsCSS").length <= 0) $("head").append("<style id='fancyFormElementsCSS' type='text/css'>"+ AP.css +"</style>");

		AP.functions.resetBtn(frm);

		$(frm).children("input").each(function() {
			var input = $(this),
				type = input.attr("type");

			if(type == 'radio'){
				if(settings.radio)
					AP.functions.styleRadioButton(input);
			} else if(type == 'checkbox'){
				if(settings.checkbox)
					AP.functions.styleCheckBoxButton(input);
			}
        });
		$(frm).children("select").each(function() {
			var dropdown = $(this);
			
			if(settings.dropdown)
				AP.functions.styleDropDown(dropdown);
			
        });
	},
	styleRadioButton : function(selectors){
		var _this = $(selectors),
			name = _this.attr("name"),
			_class = _this.attr("class");

		_this.wrap("<div class='rd_wrapper' />");
		$("<div class='input_bkground' />").insertBefore(_this);
		_this.prev(".input_bkground").addClass(_class);
		_this.css("opacity","0");
		$(".rd_wrapper").next("label").css({"padding-left":"20px","position":"relative"});

		_this.click(function(){
			$("input[name="+name+"]").prev(".input_bkground").removeClass("selected");
			_this.prev(".input_bkground").addClass("selected");
		});
	},
	styleCheckBoxButton : function(selectors){
		var _this = $(selectors),
			_class = _this.attr("class");

		_this.wrap("<div class='chk_wrapper' />");
		$("<div class='input_bkground' />").insertBefore(_this);
		_this.prev(".input_bkground").addClass(_class);
		_this.css("opacity","0");
		$(".chk_wrapper").next("label").css({"padding-left":"15px","position":"relative"});

		_this.click(function(){
			_this.prev(".input_bkground").toggleClass("selected");
		});
	},
	styleDropDown : function(selectors){
		var _this = $(selectors),
			selClass = _this.attr("class") || "",
			selValue = $("option:selected", _this).text();

		_this.wrap("<div class='sel_wrapper' />");
		$("<input type='text' readonly='readonly' class='apInputBox' />").insertBefore(_this);

		var inputSel = _this.prev("input"),
			inputSelClass = inputSel.addClass(selClass);

		_this.addClass("origSelect");
		inputSel.attr("value",selValue);

		_this.change(function() {
			$("option:selected").each(function() {
				selValue = $("option:selected", _this).text();
				inputSel.attr("value",selValue);
			});
		});
	},
	resetBtn : function(selector){
		var rstBtn = $(selector).find("input[type=reset]");
		rstBtn.click(function(e){
			e.preventDefault();
			selector[0].reset();
			var prntForm = $(this).parents("form");

			prntForm.find(".input_bkground").removeClass("selected");
			prntForm.find("select").each(function() {
				var dropdown = $(this),
					defVal = $("option:selected", dropdown).text();
				
				dropdown.prev(".apInputBox").attr("value", defVal);
			});
		});
	}
};
$.fn.fancyFormElements = function(options){
	var settings = $.extend({}, AP.defaults, options);
	
	return this.each(function(){
		AP.functions.init($(this), settings);
	});
};
})(jQuery);