var Cheese = function (x, y, level) {
    this.image = new Image();
    this.image.src = "images/cheese.png";

    this.x = x || 0;
    this.y = y || 0;

    this._createTimeout = 0;

    this.level = level;

    this.hp = this.level.hp;

    var i;
    this.holes = [];
    for (i = 0; i < this.level.holes.length; i++) {
        var hole = this.level.holes[i];
        this.holes[i] = new Hole(hole.x, hole.y, hole.type);
    }

    this.rats = [];
    for (i = 0; i < this.level.enemies.length; i++) {
        var enemy = this.level.enemies[i];
        this.rats[i] = new Rat(enemy.interval, enemy.probability);
    }
};

Cheese.prototype.processInputs = function (clicks) {
    if (!clicks)
        return;

    for (var i = 0; i < clicks.length; i++) {
        var click = {
            x: clicks[i].x - this.x,
            y: clicks[i].y - this.y
        };

        for (var j = 0; j < this.rats.length; j++) {
            var rat = this.rats[j];
            if (rat.isVisible() && rat.collides(click))
                rat.kill();
        }
    }
};

Cheese.prototype.update = function (delta) {
    for (var i = 0; i < this.rats.length; i++) {
        var rat = this.rats[i];

        if (!rat.isVisible() && !rat.isDead()) {
            if (this._createTimeout <= 0 && rat.probability > Math.random()) {
                var hole = this.holes[Utils.getRandomInt(0, this.holes.length - 1)];
                rat.show(hole);
            }

            if (this._createTimeout <= 0)
                this.hp--;
        }
        rat.update(delta);
    }

    if (this._createTimeout <= 0)
        this._createTimeout = 1000;
    this._createTimeout -= delta;
};

Cheese.prototype.draw = function (context) {
    context.save();
    context.translate(this.x, this.y);

    context.drawImage(this.image, 0, 0);
    for (var i = 0; i < this.holes.length; i++) {
        this.holes[i].draw(context);
    }
    for (i = 0; i < this.rats.length; i++) {
        this.rats[i].draw(context);
    }

    context.restore();
};
