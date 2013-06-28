var Levels = [];

Levels[1] = {
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

Levels[2] = {
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
