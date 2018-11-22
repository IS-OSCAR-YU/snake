var Map = function(row, col, width, parent) {
    this.trArr = [];
    this.table = document.createElement("table");
    this.tr = document.createElement("tr");
    this.td = document.createElement("td");

    this.row = row;
    this.col = col;

    this.width = width;
    this.parent = parent;
};

Map.prototype.initTable = function() {
    this.td.style.width = this.width + "px";
    this.td.style.height = this.width + "px";
    for (var i = 0; i < this.row; i++) {
        var newTr = this.tr.cloneNode();
        var newTrArr = [];
        for (var j = 0; j < this.col; j++) {
            var newTd = this.td.cloneNode();
            newTr.appendChild(newTd);
            this.table.appendChild(newTr);
            newTrArr.push(newTd);
        }
        this.trArr.push(newTrArr);
    }

    this.parent.appendChild(this.table);
};