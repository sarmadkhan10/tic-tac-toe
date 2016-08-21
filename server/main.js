import { Meteor } from 'meteor/meteor';

Players = new Mongo.Collection("players");

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish("players", function publishPlayers() {
	return Players.find();
});

Meteor.methods({
	'insertPlayer': function(playerName1, playerName2){
		var result = Players.findOne({name: playerName1});

		// if the name is not found, insert it in the database with a score of 0
		if(!result)
		{
			Players.insert({name: playerName1, score: 0});
		}

		result = Players.findOne({name: playerName2});

		// if the name is not found, insert it in the database with a score of 0
		if(!result)
		{
			Players.insert({name: playerName2, score: 0});
		}
	},

	'updateScoreBoard': function(playerName){
		var prevScore;

		var result = Players.findOne({name: playerName});

		if(result)
		{
			prevScore = result.score;

			Players.update(
				{"name": playerName},
				{$set: {"score": prevScore+1}}
			);
		}
	},

});