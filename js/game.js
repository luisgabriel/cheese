var Game = function () {
    this._cheese = null;
    this._context = null;
    this._canvas = null;
    this._inputs = null;
    this._currentLevel = null;
    this._pauseButton = null;

    this._bg = new Image();
    this._bg.src = "images/bg.png";

    this._running = false;
    this._pause = false;
};

Game.TICK = 30;

Game.prototype.init = function () {
    this._canvas = document.getElementById("game");
    this._context = this._canvas.getContext("2d");

    this._inputs = [];
    this._canvas.addEventListener("click", this.onClicked.bind(this));

    this._pauseButton = document.getElementById("pause_button");
    this._pauseButton.addEventListener("click", this.onPauseClicked.bind(this));

    this._currentLevel = Levels[1];
    this._cheese = new Cheese(0, this._canvas.height - 469);
    this._cheese.loadLevel(this._currentLevel);
};

Game.prototype.reset = function () {
    this._inputs = [];
    this._cheese = new Cheese(0, this._canvas.height - 469);
    this._cheese.loadLevel(this._currentLevel);
};

Game.prototype.onPauseClicked = function (e) {
    if (!this._running)
        return;

    this._pause = !this._pause;
    if (!this._pause) {
        this._mainLoop();
        this._pauseButton.src = "images/pause.png"
    } else {
        Utils.drawText(this._context, "PAUSE", 164, 200, 50);
        this._pauseButton.src = "images/play.png"
    }
};

Game.prototype.onClicked = function (e) {
    if (this._pause)
        return;

    if (!this._running) {
        this.reset();
        this.start();
        return;
    }

    var click = {
        x: e.clientX,
        y: e.clientY
    };
    this._inputs.push(click);
};

Game.prototype.start = function () {
    this._running = true;
    this._mainLoop();
};

Game.prototype._mainLoop = function () {
    if (!this._running || this._pause)
        return;

    if (this._cheese.hp < this._currentLevel.minScore) {
        this._gameOver();
        return;
    } else if (this._cheese.aliveRats === 0) {
        this._youWon();
        return;
    }

    this._processInput();
    this._update();
    this._draw();

    setTimeout(this._mainLoop.bind(this), Game.TICK);
};

Game.prototype._gameOver = function () {
    this._running = false;
    Utils.drawText(this._context, "GAME OVER!", 74, 200, 50);
    Utils.drawText(this._context, "Click anywhere to restart the game.", 120, 220, 15);
};

Game.prototype._youWon = function () {
    this._running = false;
    Utils.drawText(this._context, "YOU WON!", 104, 200, 50);
    Utils.drawText(this._context, "Click anywhere to restart the game.", 120, 220, 15);
};

Game.prototype._processInput = function () {
    this._cheese.processInputs(this._inputs);
    this._inputs = [];
};

Game.prototype._update = function () {
    this._cheese.update(Game.TICK);
};

Game.prototype._draw = function () {
    this._context.drawImage(this._bg, 0, 0);
    this._cheese.draw(this._context);
    Utils.drawText(this._context, "LIFE: " + this._cheese.hp, 5, 20);
};
