var Utils = {
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    drawText: function (context, text, x, y, size, color) {
        context.lineWidth = 1;
        context.fillStyle = color || "#FFFF00";
        context.lineStyle = "#FFFFFF00";
        context.font = (size || 18) + "px sans-serif";
        context.fillText(text, x, y);
    }
};
