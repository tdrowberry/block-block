// Levels 61–70: compact puzzles selected for deceptive choices and state-dependent revisits.
export const mindbenderLevels=[
  {
    "name": "So close",
    "description": "The exit is close. The right approach is not.",
    "map": [
      "101101111",
      "111101111",
      "111111101",
      "001111111",
      "111110010",
      "011011010",
      "101101111",
      "001110111",
      "101111111"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      2,
      1
    ],
    "pads": [
      {
        "x": 3,
        "z": 1,
        "type": "grow"
      },
      {
        "x": 1,
        "z": 2,
        "type": "shrink"
      },
      {
        "x": 7,
        "z": 3,
        "type": "normal"
      }
    ],
    "par": 19
  },
  {
    "name": "Wrong first turn",
    "description": "Sometimes progress starts in the other direction.",
    "map": [
      "111111111",
      "111011111",
      "110110101",
      "111001111",
      "101111111",
      "110101101",
      "111101100",
      "110011111",
      "111111101"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      6,
      0
    ],
    "pads": [
      {
        "x": 2,
        "z": 4,
        "type": "grow"
      },
      {
        "x": 0,
        "z": 3,
        "type": "shrink"
      },
      {
        "x": 8,
        "z": 3,
        "type": "normal"
      }
    ],
    "par": 19
  },
  {
    "name": "Almost a mirror",
    "description": "Similar paths do not promise the same result.",
    "map": [
      "110111011",
      "110111011",
      "111010111",
      "110111011",
      "110111011",
      "111111111",
      "111111111",
      "010111010",
      "111000111"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      3,
      5
    ],
    "pads": [
      {
        "x": 1,
        "z": 2,
        "type": "grow"
      },
      {
        "x": 4,
        "z": 4,
        "type": "shrink"
      },
      {
        "x": 6,
        "z": 2,
        "type": "normal"
      }
    ],
    "par": 22
  },
  {
    "name": "Borrowed ground",
    "description": "A crossing can change what you need on the way back.",
    "map": [
      "111b10101",
      "111110110",
      "111111111",
      "11b101110",
      "011101010",
      "111bb1101",
      "011101111",
      "001001010",
      "11001110b"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      5,
      4
    ],
    "pads": [
      {
        "x": 3,
        "z": 2,
        "type": "grow"
      },
      {
        "x": 2,
        "z": 7,
        "type": "shrink"
      },
      {
        "x": 7,
        "z": 4,
        "type": "normal"
      },
      {
        "x": 6,
        "z": 2,
        "type": "bridge"
      }
    ],
    "par": 24
  },
  {
    "name": "The shape of a shortcut",
    "description": "A shortcut is only useful in the right shape.",
    "map": [
      "111111111",
      "111111100",
      "101110010",
      "111111011",
      "101010001",
      "111111111",
      "110111100",
      "111111110",
      "101111101"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      2,
      7
    ],
    "pads": [
      {
        "x": 4,
        "z": 5,
        "type": "grow"
      },
      {
        "x": 2,
        "z": 1,
        "type": "shrink"
      },
      {
        "x": 4,
        "z": 8,
        "type": "normal"
      }
    ],
    "par": 23
  },
  {
    "name": "Return to sender",
    "description": "A familiar landing can hide a different possibility.",
    "map": [
      "110111011",
      "011111111",
      "111111111",
      "001010100",
      "110001111",
      "111111111",
      "010010110",
      "111111111",
      "010110110"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      3,
      5
    ],
    "pads": [
      {
        "x": 2,
        "z": 1,
        "type": "grow"
      },
      {
        "x": 6,
        "z": 7,
        "type": "shrink"
      },
      {
        "x": 8,
        "z": 0,
        "type": "normal"
      },
      {
        "x": 6,
        "z": 2,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 1,
        "z": 6,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 7,
        "z": 5,
        "type": "teleport",
        "pair": "B"
      },
      {
        "x": 5,
        "z": 4,
        "type": "teleport",
        "pair": "B"
      }
    ],
    "par": 32
  },
  {
    "name": "Delicate detour",
    "description": "A safe-looking route still needs the right orientation.",
    "map": [
      "11110111f",
      "110ff0101",
      "011011111",
      "0f1110110",
      "111111011",
      "f1101f100",
      "01110011f",
      "111111f11",
      "11100111f"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      2,
      5
    ],
    "pads": [
      {
        "x": 6,
        "z": 5,
        "type": "grow"
      },
      {
        "x": 1,
        "z": 2,
        "type": "shrink"
      },
      {
        "x": 8,
        "z": 7,
        "type": "normal"
      }
    ],
    "par": 21
  },
  {
    "name": "Crossed intentions",
    "description": "Think about what your next crossing will leave behind.",
    "map": [
      "111111111",
      "111110111",
      "01011111b",
      "101011011",
      "011011111",
      "111111111",
      "101011011",
      "11b111110",
      "11b111b10"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      2,
      4
    ],
    "pads": [
      {
        "x": 3,
        "z": 7,
        "type": "grow"
      },
      {
        "x": 2,
        "z": 3,
        "type": "shrink"
      },
      {
        "x": 8,
        "z": 0,
        "type": "normal"
      },
      {
        "x": 0,
        "z": 7,
        "type": "bridge"
      }
    ],
    "par": 43
  },
  {
    "name": "Two ways nowhere",
    "description": "Matching symbols do not guarantee matching outcomes.",
    "map": [
      "111111111",
      "110111111",
      "011111101",
      "111111111",
      "101001101",
      "111010011",
      "110111011",
      "111111111",
      "111101111"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      5,
      4
    ],
    "pads": [
      {
        "x": 2,
        "z": 3,
        "type": "grow"
      },
      {
        "x": 0,
        "z": 8,
        "type": "shrink"
      },
      {
        "x": 4,
        "z": 5,
        "type": "normal"
      },
      {
        "x": 0,
        "z": 1,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 7,
        "z": 6,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 5,
        "z": 1,
        "type": "teleport",
        "pair": "B"
      },
      {
        "x": 8,
        "z": 4,
        "type": "teleport",
        "pair": "B"
      }
    ],
    "par": 34
  },
  {
    "name": "Second thoughts",
    "description": "Look again. The useful route may be the one you dismissed.",
    "map": [
      "11111111f",
      "011b01111",
      "bf1111f11",
      "1111f1110",
      "10b111f10",
      "1bb1f1011",
      "1111101b1",
      "110010110",
      "11f111101"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      0,
      4
    ],
    "pads": [
      {
        "x": 7,
        "z": 4,
        "type": "grow"
      },
      {
        "x": 3,
        "z": 8,
        "type": "shrink"
      },
      {
        "x": 7,
        "z": 1,
        "type": "normal"
      },
      {
        "x": 6,
        "z": 6,
        "type": "bridge"
      },
      {
        "x": 0,
        "z": 8,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 3,
        "z": 2,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 5,
        "z": 0,
        "type": "teleport",
        "pair": "B"
      },
      {
        "x": 5,
        "z": 3,
        "type": "teleport",
        "pair": "B"
      }
    ],
    "par": 28
  }
];
