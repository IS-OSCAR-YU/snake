window.onload = function () {
    var container = document.getElementById("container");
    var ROW = 23;
    var COL = 30;
    var WIDTH = 25;
    var snakeLength = 5;

    // var game = new GameLauncher(container, ROW, COL, WIDTH, snakeLength);
    // game.initTable();
    // game.initBarrier();

    var game = null;

    var startGame = function() {
        if (game) {
            container.removeChild(game.map.table);
        }
        game = new GameLauncher(container, ROW, COL, WIDTH, snakeLength);
        game.initStatus();
        game.initTable();
        game.initBarrier();
        game.initFood();
        game.initSnake();
    };

    startGame();

    document.onkeydown = function(e) {
        if (e.keyCode == 32) {
            startGame();
            game.status.setStart();
            // document.getElementById("status").className = "start";
        };
        game.orderRun(e);
        game.inputOrder(e);
    };
};