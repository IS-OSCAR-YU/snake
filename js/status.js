var StatusHandler = function() {
    this.handler = document.getElementById("status");
};

StatusHandler.prototype.setStart = function() {
    this.handler.className = "start";
};

StatusHandler.prototype.setEnd = function() {
    this.handler.className = "end";
};

StatusHandler.prototype.setNone = function() {
    this.handler.className = "";
};