define('common/teamplex-nav', [
	'jquery',
	'jqueryui',
	'plugins/jquery.timeago',
	'plugins/jquery.ez-bg-resize',
	'plugins/select2'
	], function ($) {
	
$(document).ready(function() {
	
	// Bootstrap에서 Modal 폼이 backdrop 뒤에 있는 현상 수정
	// 참고: http://jsfiddle.net/ATeaH/8/
	$('.modal').appendTo($('body'));
	
	$("#search").submit(function(e) {
		e.preventDefault();
		
		var term = $(this).find("input").val();
		location.href = $(this).attr("action") + "/" + term;
	});
	
	$("#signupForm, #writePostForm").modal({
		show: false
	});
	
	$("#signupTag, #writePostTag").select2({
		tags: [],
		placeholder: "Input your interests",
		minimumInputLength: 1,
		ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
			url: CONTEXT_PATH + "tag/search",
			dataType: 'json',
			data: function (term, page) {
				return {
					 term: term, // search term
					 limit: 10
				};
			},
			results: function (data, page) {
				console.log(data);
				return {results: data};
			},
		}
	});
	
	if ($("#inbox").size() > 0) {
		$("#notification").position({
			of: "#inbox",
			at: "bottom",
			my: "top",
			collision: "none"
		}).removeClass("not visible");
		
		$("#inbox").click(function(e) {
			$("#notification").toggleClass("in");
			
			var $inbox = $(this);
			
			$.get($inbox.attr("data-read-url"), function(data) {
				$inbox.find(".badge").css("visibility", "hidden");
			});
		});
		
		$(".notification-timeago").timeago();
	}
});

});