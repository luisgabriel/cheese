var Hole = function (x, y, type) {
    if (Hole.images[type - 1].src === "")
        Hole.images[type - 1].src = "images/hole" + type + ".png";

    this.image = Hole.images[type - 1];

    this.x = x || 0;
    this.y = y || 0;

    this.draw = function (context) {
        context.drawImage(this.image, this.x - this.image.width/2, this.y - this.image.height/2);
    };
};

Hole.images = [
    new Image(),
    new Image(),
    new Image(),
    new Image()
];
