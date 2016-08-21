import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './highscores.html';

Players = new Mongo.Collection("players");

const board_size = 3;

var board_data = new Array(board_size);
const index_x = 5;
const index_y = 7;

var game_over = false;
var player1 = "";
var player2 = "";

Template.tic_tac_toe.onCreated(function onCreated() {
 	for (var i = 0; i <= 2; i++)
  		board_data[i] = new Array(3);

	for (var y = 0; y <= 2; y++)
		for (var x = 0; x <= 2; x++)
			board_data[y][x] = 2;

	Session.set("current_player", 1);
});

Template.tic_tac_toe.helpers({
});

Template.tic_tac_toe.events({
	'click .rectangle'(event) {
    	if (game_over == false)
    	{
	    	if(Session.get("current_player") == 1)
	    	{
	    		markX(event.target);
	    		if (game_over == true)
	    			updateScore(player1);
	    		else
	    			Session.set("current_player", 2);
	    	}
	    	else
	    	{
	    		markO(event.target);
	    		if (game_over == true)
	    			updateScore(player2);
	    		else
	    			Session.set("current_player", 1);
	    	}
	    }
	},
});

Template.play_template.onCreated(function onCreated() {
	Session.set("result", "Game in progress.");
});

Template.play_template.helpers({
	result: function() {
		return "Winner: " + Session.get("result");
	},

	player: function() {
		if (Session.get("current_player") == 1)
 			return player1;
 		else
 			return player2;
 	},

 	gameStarted: function() {
 		return Session.get("usernamesEntered");
 	}
});

Template.usernames_template.helpers({
});

Template.usernames_template.events({
	'submit .js_usernames'(event) {
		event.preventDefault();

		player1 = event.target.player1.value;
		player2 = event.target.player2.value;

		Meteor.call("insertPlayer", player1, player2);

		Session.set("usernamesEntered", true);
	},
});

Template.highscores_template.onCreated(function onCreated() {
	Meteor.subscribe("players");
});

Template.highscores_template.helpers({
	scoreTable: function() {
		return Players.find();
	},
});

markO = function(element) {
	element.innerHTML = "O";

	var x_index = parseInt(element.id[index_x] - 1);
	var y_index = parseInt(element.id[index_y] - 1);
	board_data[y_index][x_index] = "O";

	checkBoardSate(x_index, y_index, "O");
}

markX = function(element) {
	element.innerHTML = "X";
	
	var x_index = parseInt(element.id[index_x] - 1);
	var y_index = parseInt(element.id[index_y] - 1);
	board_data[y_index][x_index] = "X";

	checkBoardSate(x_index, y_index, "X");
}

printArray = function() {
	for (var y = 0; y <= 2; y++)
	{
		for (var x = 0; x <= 2; x++)
			console.log(board_data[y][x]);
		console.log(" ");
	}

}

checkBoardSate = function(x, y, state) {
	// check rows
	for (var i = 0; i<3; i++)
	{
		if (board_data[y][i] != state)
			break;
		if (i == board_size-1)
			gameOver();
	}

	// check columns
	for (var i = 0; i<3; i++)
	{
		if (board_data[i][x] != state)
			break;
		if (i == board_size-1)
			gameOver();
	}

	// check diagonal and anti-diagonal
	if ((x === y) || ((board_size -1 - y) === x) || ((board_size -1 - x) === y))
	{
		for (var i=0; i<3; i++)
		{
			if (board_data[i][i] != state)
				break;
			if (i === board_size-1)
				gameOver();
		}

		for (var i=0; i<3; i++)
		{
			if (board_data[i][(board_size-1)-i] != state)
				break;
			if (i === board_size-1)
				gameOver();
		}

	}

}

gameOver = function(state) {
	if (Session.get("current_player") == 1)
		Session.set("result", player1);
	else
		Session.set("result", player2);
	game_over = true;
}

updateScore = function(winner) {
	Meteor.call("updateScoreBoard", winner);
}