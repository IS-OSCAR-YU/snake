var Stone = function(bodyArr, row, col) {
    this.bodyArr = bodyArr;
    this.row = row;
    this.col = col;
    this.stoneArr = [];
};

Stone.prototype.initBarrier = function() {
    var x = parseInt(this.col / 2) - 1;
    var y = 5;
    var blength = 12;
    for (var i = 0; i < blength; i++) {
        this.stoneArr.push([y + i, x]);
        this.bodyArr[y + i][x].className = "stone";
    }
};