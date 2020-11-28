var Scoreboard = (function() {
  var _this = {};
  var locked = false;
  var buzzer = new Audio("media/buzz.wav");

  _this.init = function() {
    $.each([1, 2, 3], function(_index, player) {
      $($.templates("#playerTemplate").render({player: player})).appendTo("#players");
      $("#player-" + player + " .name").text(localStorage.getItem("name-" + player) || "Player " + player);
      setScore(player, localStorage.getItem("score-" + player) || 0);
      $("#player-" + player + " .name").editable({success: function(_response, value) { Scoreboard.saveName(player, value); }});
    });
  };

  _this.bind = function() {
    $(document).bind("keypress", Scoreboard.keypress);
    $(document).bind("buzz", Scoreboard.buzz);
    $("#reset-button").bind("click", Scoreboard.reset);
    $(".name").bind("shown", function() { locked = true; });
    $(".name").bind("hidden", Scoreboard.unlock);
    $(".plus").bind("click", Scoreboard.addPoint);
    $(".minus").bind("click", Scoreboard.subtractPoint);
  };

  _this.keypress = function(event) {
    if (event.which >= 49 && event.which <= 51) {
      $(document).trigger("buzz", {player: event.which - 48});
    } else if (event.which == 32) {
      Scoreboard.unlock();
    }
  };

  _this.buzz = function(event, data) {
    if (!locked) {
      lock(data.player);
      buzzer.play();
    }
  };

  _this.saveName = function(player, name) {
    localStorage.setItem("name-" + player, name);
  };

  _this.reset = function() {
    $.each([1, 2, 3, 4], function(_index, player) {
      setScore(player, 0);
    });
  };

  _this.addPoint = function() {
    this.blur();
    player = $(this).data("index");
    setScore(player, currentScore(player) + 1);
    Scoreboard.unlock();
  };

  _this.subtractPoint = function() {
    this.blur();
    player = $(this).data("index");
    setScore(player, currentScore(player) - 1);
    Scoreboard.unlock();
  };

  _this.unlock = function() {
    locked = false;
    $(".player").removeClass("disabled");
    $(".player").removeClass("buzzed");
  };

  function currentScore(player) {
    return parseInt(scoreElement(player).text());
  }

  function setScore(player, score) {
    scoreElement(player).text(score);
    localStorage.setItem("score-" + player, score);
  }

  function scoreElement(player) {
    return $("#score-" + player);
  }

  function lock(player) {
    locked = true;
    $(".player").addClass("disabled");
    $("#player-" + player).removeClass("disabled");
    $("#player-" + player).addClass("buzzed");
  }

  _this.init();
  return _this;
}).call($);

// var counter = 30;
// var interval = setInterval(function() {
//     counter--;
//     // Display 'counter' wherever you want to display it.
//     if (counter <= 0) {
//      		clearInterval(interval);
//       	$('#timer').html("00");  
//         return;
//     }else{
//     	$('#time').text(counter);
      
//     }
// }, 1000);
$(function() {
  Scoreboard.bind();
});
