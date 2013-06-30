var Game = function () {
    this._cheese = null;
    this._context = null;
    this._canvas = null;

    this._bg = new Image();
    this._bg.src = "images/bg.png";
};

Game.TICK = 30;

Game.prototype.init = function () {
    this._canvas = document.getElementById("game");
    this._context = this._canvas.getContext("2d");

    this._canvas.addEventListener("click", this.clickListener.bind(this));

    this._cheese = new Cheese(0, this._canvas.height - 469, Levels[2]);
};

Game.prototype.start = function () {
    this._mainLoop();
};

Game.prototype._mainLoop = function () {
    this._update();
    this._draw();

    setTimeout(this._mainLoop.bind(this), Game.TICK);
};

Game.prototype.clickListener = function (e) {
    this._cheese.clickEvent({x: e.clientX, y: e.clientY});
};

Game.prototype._update = function () {
    this._cheese.update(Game.TICK);
};

Game.prototype._draw = function () {
    this._context.drawImage(this._bg, 0, 0);
    this._cheese.draw(this._context);
};
