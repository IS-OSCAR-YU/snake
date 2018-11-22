var GameLauncher = function(container, row, col, width, snackLength) {
    this.container = container;
    this.ROW = row;
    this.COL = col;
    this.WIDTH = width;
    this.snackLength = snackLength;

    this.map = null;
    this.food = null;
    this.snake = null;

    this.run = true;

    this.status = null;
};

GameLauncher.prototype.initStatus = function() {
    var status = new StatusHandler();
    this.status = status;
};

GameLauncher.prototype.initTable = function() {
    var map = new Map(this.ROW, this.COL, this.WIDTH, this.container);
    map.initTable();

    this.container.style.width = this.COL * this.WIDTH + "px";
    this.container.style.height = this.ROW * this.WIDTH + "px";

    this.map = map;
};

GameLauncher.prototype.initBarrier = function() {
    var stone = new Stone(this.map.trArr, this.ROW, this.COL);
    stone.initBarrier();

    this.stone = stone;
};

GameLauncher.prototype.initFood = function() {
    var food = new Food(this.ROW, this.COL, this.stone.stoneArr);
    food.initFood();
    var foodPos = food.getPosition();
    var trArr = this.map.trArr;
    trArr[foodPos[0]][foodPos[1]].className = "active";

    this.food = food;
};

/**
 * 重新生成食物位置，并且将位置更新到自身和蛇类
 */
GameLauncher.prototype.reinitFood = function() {
    // var food = new Food(this.ROW, this.COL, this.stone.stoneArr);
    console.log("由于吃到食物导致食物重画");
    this.food.initFood();
    this.snake.food = this.food;
    this.snake.foodPos = this.food.getPosition();
};
/**
 * 将最后一次确定食物的位置重画
 */
GameLauncher.prototype.drawFood = function() {
    var foodPos = this.food.getPosition();
    var trArr = this.map.trArr;
    trArr[foodPos[0]][foodPos[1]].className = "active";
};

GameLauncher.prototype.initSnake = function() {
    var snake = 
        new Snake(this.snackLength, this.ROW, this.COL, 
            this.map.trArr, this.food.getPosition(), this, this.stone, this.status);
    this.snake = snake;
    this.snake.initBody();
};

GameLauncher.prototype.orderRun = function(e) {
    if (this.run && e.keyCode == 82) {
        this.snake.move();
        this.run = false;
        this.status.setNone();
        // document.getElementById("status").className = "";
    }
};

GameLauncher.prototype.inputOrder = function(e) {
    if (!this.snake.setDirLock) {
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            this.snake.direction = e.keyCode;
        }
    }
};
