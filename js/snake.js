var Snake = function(length, row, col, mapArr, 
    foodPos, game, barrier, status) {
    this.bodyArr = [];
    this.bodyClear = null;

    this.row = row;
    this.col = col;
    this.snakeLength = length;
    this.mapArr = mapArr;
    this.foodPos = foodPos;
    this.game = game;
    this.barrier = barrier;

    this.startSide = 3;

    this.canMove = false;

    this.timer = null;
    this.time = 200;

    this.setDirLock = false;
    this.originDir = 39;
    this.direction = 39;

    this.score = null;

    this.status = status;
};

Snake.prototype.initBody = function() {
    this.score = document.getElementById("score").childNodes[1];
    for (var i = 0; i < this.snakeLength; i++) {
        this.bodyArr.push([parseInt(this.row / 2 - 1), this.startSide + i, this.direction]);
    }
    this.drawBody();
};

Snake.prototype.drawBody = function() {
    if (this.bodyClear != null) {
        this.mapArr[this.bodyClear[0]][this.bodyClear[1]].className = "";
        this.mapArr[this.bodyClear[0]][this.bodyClear[1]].style.backgroundImage = "";
        this.bodyClear = null;
    }
    for (var i = 0; i < this.bodyArr.length; i++) {
        if (i == 0) {
            this.mapArr[this.bodyArr[i][0]][this.bodyArr[i][1]].className = "head";
            if (this.bodyArr[i + 1][2] == 37) {
                this.mapArr[this.bodyArr[i][0]][this.bodyArr[i][1]].style.backgroundImage = "url(../images/f3.png)";
            } else if (this.bodyArr[i + 1][2] == 38) {
                this.mapArr[this.bodyArr[i][0]][this.bodyArr[i][1]].style.backgroundImage = "url(../images/f4.png)";
            } else if (this.bodyArr[i + 1][2] == 39) {
                this.mapArr[this.bodyArr[i][0]][this.bodyArr[i][1]].style.backgroundImage = "url(../images/f1.png)";
            } else if (this.bodyArr[i + 1][2] == 40) {
                this.mapArr[this.bodyArr[i][0]][this.bodyArr[i][1]].style.backgroundImage = "url(../images/f2.png)";
            }
            continue;
        }
        if (i == this.bodyArr.length - 1) {
            this.mapArr[this.bodyArr[i][0]][this.bodyArr[i][1]].className = "footer";
            if (this.bodyArr[i][2] == 37) {
                this.mapArr[this.bodyArr[i][0]][this.bodyArr[i][1]].style.backgroundImage = "url(../images/h1.png)";
            } else if (this.bodyArr[i][2] == 38) {
                this.mapArr[this.bodyArr[i][0]][this.bodyArr[i][1]].style.backgroundImage = "url(../images/h2.png)";
            } else if (this.bodyArr[i][2] == 39) {
                this.mapArr[this.bodyArr[i][0]][this.bodyArr[i][1]].style.backgroundImage = "url(../images/h3.png)";
            } else if (this.bodyArr[i][2] == 40) {
                this.mapArr[this.bodyArr[i][0]][this.bodyArr[i][1]].style.backgroundImage = "url(../images/h4.png)";
            }
            continue;
        }
        this.mapArr[this.bodyArr[i][0]][this.bodyArr[i][1]].className = "snake";
        this.mapArr[this.bodyArr[i][0]][this.bodyArr[i][1]].style.backgroundImage = "url(../images/f5.png)";

    }
};

Snake.prototype.checkIsOutMap = function(y, x) {
    if (y < 0 || y > this.row - 1 || x < 0 || x > this.col - 1) {
        return true;
    } else {
        return false;
    }
};

Snake.prototype.checkEatFood = function(y, x) {
    if (y == this.foodPos[0] && x == this.foodPos[1]) {
        this.score.innerHTML = parseInt(this.score.innerHTML) + 1;
        return true;
    } else {
        return false;
    }
};

Snake.prototype.recheck = function(y, x) {
    this.game.reinitFood();
    // 循环判断新产生食物是否落在蛇身上
    var needCheck = true;
    while (needCheck) {
        needCheck = false;
        if (y == this.foodPos[0] && x == this.foodPos[1]) {
            this.game.reinitFood();
            needCheck = true;
        } else {
            for (var i = 0; i < this.bodyArr.length; i++) {
                if (this.bodyArr[i][0] == this.foodPos[0] && x == this.foodPos[1]) {
                    this.game.reinitFood();
                    needCheck = true;
                }
            }
        }
    }
    if (!needCheck) {
        this.game.drawFood();
    }
}

Snake.prototype.checkHitBody = function(y, x) {
    for (var i = 0; i < this.bodyArr.length; i++) {
        if (this.bodyArr[i][0] == y && this.bodyArr[i][1] == x) {
            return true;
        }
    }

    return false;
};

Snake.prototype.checkHitStone = function(y, x) {
    for (var i = 0; i < this.barrier.stoneArr.length; i++) {
        if (y == this.barrier.stoneArr[i][0] && x == this.barrier.stoneArr[i][1]) {
            return true;
        }
    }

    return false;
};

Snake.prototype.move = function() {
    var sef = this;
    this.timer = setInterval(function() {
        this.setDirLock = true;
        var newHead = sef.bodyArr[sef.bodyArr.length - 1];
        // direction
        if (Math.abs(sef.originDir - sef.direction) == 2) {
            sef.direction = sef.originDir;
        }
        var x = 0;
        var y = 0;
        if (sef.direction == 37) {
            x = newHead[1] - 1;
            y = newHead[0];
        } else if (sef.direction == 38) {
            x = newHead[1];
            y = newHead[0] - 1;
        } else if (sef.direction == 39) {
            x = newHead[1] + 1;
            y = newHead[0];
        } else if (sef.direction == 40) {
            x = newHead[1];
            y = newHead[0] + 1;
        }

        // 判断新位置是否越界
        if (sef.checkIsOutMap(y, x)) {
            sef.status.setEnd();
            // document.getElementById("status").className = "end";
            clearInterval(sef.timer);
            return;
        }

        // 判读是否吃到食物
        if (!sef.checkEatFood(y, x)) {
            sef.bodyClear = sef.bodyArr.shift();
        } else {
            // 重画食物并且循环检是否食物出现在蛇身上
            sef.recheck();
        }

        // 检测是否撞到自己身上
        if (sef.checkHitBody(y, x)) {
            sef.status.setEnd();
            // document.getElementById("status").className = "end";
            clearInterval(sef.timer);
            return;
        }

        // 判断是否撞到墙上
        if (sef.checkHitStone(y, x)) {
            sef.status.setEnd();
            // document.getElementById("status").className = "end";
            clearInterval(sef.timer);
            return;
        }

        sef.bodyArr.push([y, x, sef.direction]);
        sef.drawBody();
        sef.originDir = sef.direction;

        // 解锁
        sef.setDirLock = false;
    }, sef.time);
};