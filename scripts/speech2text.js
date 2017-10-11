



$(function(){
	"use strict";
	var spokens = [];
	function changeButtonStates(){
		if($("#speechbutton").prop("disabled"))
			$("#speechbutton").prop("disabled", false);
		else
			$("#speechbutton").prop("disabled", true);
		if($("#stopbutton").prop("disabled"))
			$("#stopbutton").prop("disabled", false);
		else
			$("#stopbutton").prop("disabled", true);
	}
	$("#speechbutton").click(function(evt){
		changeButtonStates();
		recognition.start();
		$("#indicator").text("Speak, please!");
	});
	$("#stopbutton").click(function(evt){
		changeButtonStates();
		recognition.stop();
		$("#indicator").text("Not listening");
	});
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	var text = $("#mathAnnotation");
	
	
/*
	recognition.onresult = function(event) {
    var interim_transcript = '';
	    if (typeof(event.results) == 'undefined') {
	      recognition.onend = null;
	      recognition.stop();
	      upgrade();
	      return;
	    }
	    for (var i = event.resultIndex; i < event.results.length; ++i) {
	      if (event.results[i].isFinal) {
	        final_transcript += event.results[i][0].transcript;
	      } else {
	        interim_transcript += event.results[i][0].transcript;
	      }
	    }
	    final_transcript = capitalize(final_transcript);
	    text.innerHTML = linebreak(final_transcript);
	    interim_span.innerHTML = linebreak(interim_transcript);
	    if (final_transcript || interim_transcript) {
	      showButtons('inline-block');
	    }
	};
*/
	
	
	
	recognition.onresult = function(event) {
		var res = [];
		for(var i= event.resultIndex; i<event.results.length; i++)
			res.push(event.results[i][0].transcript);
		var utterance = res+"";
		text.append(utterance);
		console.log('Utterance: '+utterance);
		$("#indicator-sr").text(utterance);
		spokens = spokens.concat(res);
	};
/*
	$("#undobutton").click(function(event){
		if(!spokens.length){
			$("#indicator").text("Can't undo");
			return;
		}
		var remove = spokens.pop();
		var utterance = spokens+"";
		text.text(utterance);
		$("#indicator").text("Removed "+remove);
	});
*/
/*
	$("#clearbutton").click(function(event){
		if(!confirm("Are you sure you want to delete everything you said? This cannot be undone.")){
			return;
		}
		spokens = [];
		text.text("");
		$("#indicator").text("Everything you said was just deleted.");
	});
*/
});