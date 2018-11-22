var Food = function(row, col, stoneArr) {
    this.stoneArr = stoneArr;
    this.row = row;
    this.col = col;
    this.ranY = 0;
    this.ranX = 0;
};

Food.prototype.initFood = function() {
    this.ranY = parseInt(Math.random() * this.row);
    this.ranX = parseInt(Math.random() * this.col);
    this.checkHitStone();
    console.log("生成食物位置：" + this.ranY + "|" + this.ranX);
};
Food.prototype.getPosition = function() {
    return [this.ranY, this.ranX];
};
/**
 * 判断新产生的食物是否撞上墙
 */
Food.prototype.checkHitStone = function() {
    var isContinue = true;
    while (isContinue) {
        isContinue = false;
        for (var i = 0; i < this.stoneArr.length; i++) {
            if (this.stoneArr[i][0] == this.ranY
                && this.stoneArr[i][1] == this.ranX) {
                console.log("食物撞墙，位置重置");
                this.ranY = parseInt(Math.random() * this.row);
                this.ranX = parseInt(Math.random() * this.col);
                isContinue = true;
            }
        }
    }
    
};