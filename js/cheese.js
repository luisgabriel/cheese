var Cheese = function (x, y) {
    this.image = new Image();
    this.image.src = "images/cheese.png";

    this.bg = new Image();
    this.bg.src = "images/bg.png";

    this.x = x || 0;
    this.y = y || 0;

    this._area = {x: 83, y: 113, width: 310, height: 264};

    this._createTimeout = 0;

    this.level = Cheese.levels[2];

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


    this.clickEvent = function (point) {
        this._click = point;
    };

    this.update = function (delta) {
        var click = null;
        if (this._click) {
            click = {};
            click.x = this._click.x - this.x;
            click.y = this._click.y - this.y;
        }

        for (var i = 0; i < this.rats.length; i++) {
            var rat = this.rats[i];

            if (click) {
                if (rat.isVisible() && rat.collides(click))
                    rat.kill();
            }

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

        this._click = null;
        if (this._createTimeout <= 0)
            this._createTimeout = 1000;
        this._createTimeout -= delta;
    };

    this.draw = function (context) {
        context.drawImage(this.bg, 0, 0);
        context.drawImage(this.image, this.x, this.y);

        context.save();
        context.translate(this.x, this.y);
        for (var i = 0; i < this.holes.length; i++) {
            this.holes[i].draw(context);
        }
        for (i = 0; i < this.rats.length; i++) {
            this.rats[i].draw(context);
        }
        context.restore();
    };
};

Cheese.levels = [];

Cheese.levels[1] = {
    "holes": [
        {"x": 300 + 73/2, "y": 200 + 49/2, "type": 1},
        {"x": 20 + 105/2, "y": 170 + 81/2, "type": 2}
    ],
    "minScore": 2,
    "hp": 100,
    "enemies": [
        {"enemy": "Rat", "interval": 1000, "probability": 0.3},
        {"enemy": "Rat", "interval": 1000, "probability": 0.3}
    ]
};

Cheese.levels[2] = {
    "holes": [
        {"x": 300 + 73/2, "y": 200 + 49/2, "type": 1},
        {"x": 20 + 105/2, "y": 170 + 81/2, "type": 2},
        {"x": 300 + 73/2, "y": 30 + 49/2, "type": 3},
        {"x": 30 + 73/2, "y": 40 + 49/2, "type": 1},
        {"x": 350 + 73/2, "y": 100 + 49/2, "type": 3},
        {"x": 250 + 73/2, "y": 300 + 49/2, "type": 3},
        {"x": 350 + 73/2, "y": 350 + 49/2, "type": 3}
    ],
    "minScore": 2,
    "hp": 100,
    "enemies": [
        {"enemy": "Rat", "interval": 800, "probability": 0.3},
        {"enemy": "Rat", "interval": 1000, "probability": 0.3},
        {"enemy": "Rat", "interval": 1000, "probability": 0.3},
        {"enemy": "Rat", "interval": 2000, "probability": 0.6},
        {"enemy": "Rat", "interval": 1500, "probability": 0.4}
    ]
};
