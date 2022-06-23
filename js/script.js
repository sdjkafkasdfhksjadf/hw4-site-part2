/*
File: script.js
GUI Assignment: HW4 Multiplication Table Generator
Timothy Retelle, UMass Lowell Computer Science, timothy_retelle@student.uml.edu
Copyright (c) 2022 by Timothy Retelle. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author. This is a small site to generate multiplication tables.
updated on June 23rd, 2022
*/

//variables to hold user inputs
var topStart = 0;
var topEnd = 0;
var sideStart = 0;
var sideEnd = 0;

var table;
var tableRow;
var value;

$(function(){
	$("#slider1").slider({ //functions to create the sliders. when they slide, the change the text input to reflect their value
		min: -50, max: 50, step:1, value: 0,
		slide: function(event, ui){
			$("#topStart").val(ui.value);
		}
		
	});
	$("#slider2").slider({
		min: -50, max: 50, step:1, value: 0,
		slide: function(event, ui){
			$("#topEnd").val(ui.value);
		}
		
	});
	$("#slider3").slider({
		min: -50, max: 50, step:1, value: 0,
		slide: function(event, ui){
			$("#sideStart").val(ui.value);
		}
		
	});
	$("#slider4").slider({
		min: -50, max: 50, step:1, value: 0,
		slide: function(event, ui){
			$("#sideEnd").val(ui.value);
		}
		
	});
	$("#topStart").change(function(){ //functions to change the slider when text box is modified
		var inputValue = $(this).val();
		if(isNaN(inputValue) || inputValue > 50 || inputValue < -50){
			return;
		}
		$("#slider1").slider("option", "value", inputValue);
	});
	$("#topEnd").change(function(){
		var inputValue = $(this).val();
		if(isNaN(inputValue) || inputValue > 50 || inputValue < -50){
			return;
		}
		$("#slider2").slider("option", "value", inputValue);
	});
	$("#sideStart").change(function(){
		var inputValue = $(this).val();
		if(isNaN(inputValue) || inputValue > 50 || inputValue < -50){
			return;
		}
		$("#slider3").slider("option", "value", inputValue);
	});
	$("#sideEnd").change(function(){
		var inputValue = $(this).val();
		if(isNaN(inputValue) || inputValue > 50 || inputValue < -50){
			return;
		}
		$("#slider4").slider("option", "value", inputValue);
	});
	});
  
$.validator.addMethod("greaterThan", function(value, element, param) {//custom rule to make sure the upper bound inputs aren't smaller than the lower bounds
	return (value >= $(param).val());
});
$(document).ready(function(){
	$('#inputForm').validate({
		onkeyup: false,
		onclick: false,
		onfocusout: false,
		rules: {
			field1: {
			required: true,
			range: [-50, 50]
			},
			field2: {
			required: true,
			range: [-50, 50],
			greaterThan: "#topStart"
			},
			field3: {
			required: true,
			range: [-50, 50]
			},
			field4: {
			required: true,
			range: [-50, 50],
			greaterThan: "#sideStart"
			}
		},
		messages: {
			field2: {
				greaterThan: "Cannot be smaller than the start value"
			},
			field4: {
				greaterThan: "Cannot be smaller than the start value"
			}
		},
		errorPlacement:function(error,element){
			error.appendTo(element.parent().parent().after());//make the error appear below the boxes instead of to the side
		}
	});
});


//function called when the go button is clicked
function generate() {
	if(!$('#inputForm').valid()){ //don't run the rest of the function if the form isn't valid
		return;
	}
	topStart = document.getElementById("topStart").value;
	topEnd = document.getElementById("topEnd").value;
	sideStart = document.getElementById("sideStart").value;
	sideEnd = document.getElementById("sideEnd").value;
	sideEnd++;//fix off by one error
	table = document.getElementById("multTable");
	
	while(table.firstChild){//just in case there was already a table, remove it
		table.removeChild(table.firstChild);
	}
	
	tableRow = document.createElement("tr");
	
	var newElement = document.createElement("th");//create blank for the corner
	var text = document.createTextNode("");
	newElement.appendChild(text);
	tableRow.appendChild(newElement);
	var first = true;
	for (let j = sideStart; j <= sideEnd; j++){
		for (let i = topStart; i <= topEnd; i++) {
			if(first){
				value = i;
				newElement = document.createElement("th");
			}
			else{
				value = i* (j-1); //multiply by the column, if it isnt the header row
				newElement = document.createElement("td");
			}
			
			text = document.createTextNode(value);
			newElement.appendChild(text);
			tableRow.appendChild(newElement);
		}

		first = false;
		table.appendChild(tableRow);
		tableRow = document.createElement("tr");
		newElement = document.createElement("th");
		text = document.createTextNode(j);
		newElement.appendChild(text);
		tableRow.appendChild(newElement);
	}
	
	
	//create table
	
}
