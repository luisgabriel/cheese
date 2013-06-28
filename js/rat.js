var Rat = function (interval, probability) {
    this.image = new Image();
    this.image.src = "images/mouse1.png";

    this._dyingImage = new Image();
    this._dyingImage.src = "images/mouse2.png";

    this.x = 0;
    this.y = 0;

    this.interval = interval;
    this.probability = probability;
    this._visible = false;
    this._timeout = 0;
    this._state = Rat.State.Default;

    this.draw = function (context) {
        if (!this.isVisible())
            return;

        if (this._state === Rat.State.Default) {
            context.drawImage(this.image, this.x - this.image.width/2,
                              this.y - this.image.height/2);
        } else if (this._state === Rat.State.Dying) {
            context.drawImage(this._dyingImage, 0, 0, this.image.width, this.image.height,
                              this.x - this.image.width/2, this.y - this.image.height/2,
                              this.image.width, this.image.height);
        }
    };

    this.update = function (delta) {
        if (!this.isVisible())
            return;

        if (this._timeout <= 0)
            this._visible = false;

        if (this._state === Rat.State.Dying) {
            if (this._dyingTimeout <= 0) {
                this._state = Rat.State.Dead;
                this._dyingTimeout = 0;
            } else {
                this._dyingTimeout -= delta;
            }
        }

        this._timeout -= delta;
    };

    this.isVisible = function () {
        return this._visible;
    };

    this.isDead = function () {
        return this._state !== Rat.State.Default;
    };

    this.show = function (hole) {
        if (this.isVisible())
            return;

        if (this.isDead())
            return;

        this.x = hole.x;
        this.y = hole.y;
        this._hole = hole;
        this._visible = true;
        this._timeout = this.interval;
    };

    this.collides = function (point) {
        var width = this.image.width;
        var height = this.image.height;

        var left = this.x - width / 2;
        var right = this.x + width / 2;
        var top = this.y - height / 2;
        var bottom = this.y + height / 2;

        return point.x > left && point.x < right && point.y > top && point.y < bottom;
    };

    this.kill = function () {
        this._state = Rat.State.Dying;
        this._dyingTimeout = 1000;
    };
};

Rat.State = {
    Default: 0,
    Dying: 1,
    Dead: 2
};
