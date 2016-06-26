Router.configure({
  layoutTemplate: "main_layout_template"
});

Router.route('/', function () {
  this.render('play_template');
  this.layout("main_layout_template");
  document.title = "Play";
});

Router.route('/highscores', function () {
  this.render('highscores_template');
  this.layout("main_layout_template");
  document.title = "High Scores";
});