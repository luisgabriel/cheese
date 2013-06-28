var Game = function () {
    this.cheese = null;
    this.context = null;
    this.canvas = null;

    this.init = function () {
        this.canvas = document.getElementById("game");
        this.context = this.canvas.getContext("2d");

        this.canvas.addEventListener("click", this.clickListener.bind(this));

        this.cheese = new Cheese(0, this.canvas.height - 469, Levels[2]);
    };

    this.clickListener = function (e) {
        this.cheese.clickEvent({x: e.clientX, y: e.clientY});
    };

    this.start = function () {
        this._mainLoop();
    };

    this._mainLoop = function () {
        this.cheese.update(Game.TICK);
        this.cheese.draw(this.context);

        setTimeout(this._mainLoop.bind(this), Game.TICK);
    };
};

Game.TICK = 30;
