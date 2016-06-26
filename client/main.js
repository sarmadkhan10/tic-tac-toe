import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var board_data = new Array(3);
const pos_x = 5;
const pos_y = 7;

/*
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
*/

Template.tic_tac_toe.onCreated(function helloOnCreated() {
 	for (var i = 0; i <= 2; i++) {
  		board_data[i] = new Array(3);
	}

	for (var y = 0; y <= 2; y++)
		for (var x = 0; x <= 2; x++)
			board_data[y][x] = 2;

	Session.set("player_no", 1);
});

Template.play_template.helpers({
 	player: function() {
 		return Session.get("player_no");
 	},
});

Template.tic_tac_toe.events({
	'click .rectangle'(event) {
    	console.log(event.target.id);
    	markX(event.target);
	},
});

markO = function(element) {
	element.innerHTML = "O";

	var x_index = parseInt(element.id[pos_x] - 1);
	var y_index = parseInt(element.id[pos_y] - 1);
	board_data[y_index][x_index] = 0;

	printArray();
}

markX = function(element) {
	element.innerHTML = "X";
	
	var x_index = parseInt(element.id[pos_x] - 1);
	var y_index = parseInt(element.id[pos_y] - 1);
	board_data[y_index][x_index] = 1;

	printArray();
}

printArray = function() {
	for (var y = 0; y <= 2; y++)
	{
		for (var x = 0; x <= 2; x++)
			console.log(board_data[y][x]);
		console.log(" ");
	}

}