// Levels 37–50. Fixed boards with shortest routes verified by puzzle.js.
export const finalLevels=[
  {
    "name": "Echo chamber",
    "description": "Restore your shape before crossing between islands.",
    "map": [
      "000110110111",
      "111100111111",
      "111100111011",
      "101110011110",
      "110100100111",
      "111110011111",
      "111100111001",
      "111100111011",
      "100110111001",
      "011110110111",
      "011010011111",
      "100000111101"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      7,
      7
    ],
    "pads": [
      {
        "x": 3,
        "z": 2,
        "type": "shrink"
      },
      {
        "x": 3,
        "z": 9,
        "type": "normal"
      },
      {
        "x": 0,
        "z": 1,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 8,
        "z": 2,
        "type": "teleport",
        "pair": "A"
      }
    ],
    "par": 44
  },
  {
    "name": "The other side",
    "description": "Choose your shape before opening the crossing.",
    "map": [
      "100100100111",
      "11b111001111",
      "111001111111",
      "11111011b100",
      "011b11110010",
      "111111010111",
      "011100011101",
      "1111011001b1",
      "010111111110",
      "11b111101111",
      "111111011101",
      "101101111111"
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
        "x": 1,
        "z": 4,
        "type": "grow"
      },
      {
        "x": 6,
        "z": 11,
        "type": "shrink"
      },
      {
        "x": 3,
        "z": 7,
        "type": "normal"
      },
      {
        "x": 5,
        "z": 1,
        "type": "bridge"
      }
    ],
    "par": 48
  },
  {
    "name": "Loop the loop",
    "description": "Two pairs. Three sizes. Find the useful detour.",
    "map": [
      "111010111111",
      "111110110111",
      "001100000011",
      "001100111111",
      "011110110011",
      "110100101110",
      "011110101010",
      "111110110010",
      "111010111010",
      "101110111101",
      "111100111110",
      "101110111110"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      6,
      3
    ],
    "pads": [
      {
        "x": 7,
        "z": 7,
        "type": "grow"
      },
      {
        "x": 10,
        "z": 5,
        "type": "shrink"
      },
      {
        "x": 10,
        "z": 10,
        "type": "normal"
      },
      {
        "x": 2,
        "z": 0,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 7,
        "z": 1,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 4,
        "z": 8,
        "type": "teleport",
        "pair": "B"
      },
      {
        "x": 11,
        "z": 0,
        "type": "teleport",
        "pair": "B"
      }
    ],
    "par": 52
  },
  {
    "name": "Across the divide",
    "description": "Every crossing needs the right shape and an open bridge.",
    "map": [
      "110110111111",
      "010010111011",
      "111110111000",
      "111100101111",
      "0b0110110101",
      "001110b1b111",
      "b11110111110",
      "111110011111",
      "101110110100",
      "111110111111",
      "1111b0111110",
      "001100011111"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      6,
      3
    ],
    "pads": [
      {
        "x": 9,
        "z": 4,
        "type": "grow"
      },
      {
        "x": 9,
        "z": 9,
        "type": "shrink"
      },
      {
        "x": 11,
        "z": 11,
        "type": "normal"
      },
      {
        "x": 10,
        "z": 1,
        "type": "bridge"
      },
      {
        "x": 3,
        "z": 10,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 8,
        "z": 11,
        "type": "teleport",
        "pair": "A"
      }
    ],
    "par": 56
  },
  {
    "name": "Light-footed",
    "description": "NEW: cracked tiles hold cubes or lying blocks, never a tall upright block.",
    "map": [
      "111000111",
      "111fff111",
      "111fff111"
    ],
    "start": [
      1,
      0
    ],
    "goal": [
      7,
      0
    ],
    "par": 8
  },
  {
    "name": "Spread the weight",
    "description": "Stay low while crossing the cracked tiles.",
    "map": [
      "111111111f1",
      "11111101111",
      "100f1101110",
      "10100f11010",
      "101111ff101",
      "f11101111f1",
      "10001101010",
      "11101111f10",
      "11111101f11",
      "1111100f1f0",
      "11111010f11"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      9,
      7
    ],
    "par": 20
  },
  {
    "name": "Little by little",
    "description": "Shrink before crossing, then grow back to escape.",
    "map": [
      "111010111f0",
      "11111111011",
      "01101f01101",
      "00101f11111",
      "1111100101f",
      "11011011011",
      "01111f11111",
      "10001111111",
      "110f0100111",
      "ff100111111",
      "111111f10f0"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      2,
      9
    ],
    "pads": [
      {
        "x": 3,
        "z": 1,
        "type": "shrink"
      },
      {
        "x": 4,
        "z": 4,
        "type": "normal"
      }
    ],
    "par": 24
  },
  {
    "name": "A familiar feeling",
    "description": "A classic rolling puzzle. Take a breath and plan ahead.",
    "map": [
      "10010111111",
      "01111111111",
      "11011101101",
      "00011011011",
      "01101101011",
      "11010011110",
      "00111100011",
      "00111001111",
      "01111111110",
      "10110110101",
      "11110111101"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      6,
      8
    ],
    "par": 28
  },
  {
    "name": "Careful connections",
    "description": "Cross the bridge without standing on a weak spot.",
    "map": [
      "1001011011f",
      "111111f1101",
      "0111111f1b1",
      "1001b011011",
      "10101111111",
      "11110001110",
      "11110f0110f",
      "f1b1111f001",
      "1101011111b",
      "100111f1b01",
      "011f101000f"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      1,
      5
    ],
    "pads": [
      {
        "x": 8,
        "z": 0,
        "type": "bridge"
      }
    ],
    "par": 32
  },
  {
    "name": "Far and fragile",
    "description": "Use the portal, then find a safe landing.",
    "map": [
      "111110f0101",
      "11f11011111",
      "111f00f1101",
      "1111101f001",
      "110000f1001",
      "01111011101",
      "1110101111f",
      "11111010111",
      "1011f011011",
      "f0111011101",
      "f1f1000f110"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      8,
      1
    ],
    "pads": [
      {
        "x": 4,
        "z": 7,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 6,
        "z": 5,
        "type": "teleport",
        "pair": "A"
      }
    ],
    "par": 36
  },
  {
    "name": "Heavy decisions",
    "description": "Three squares spread out. One cube steps lightly.",
    "map": [
      "1111101f11f",
      "11f10111111",
      "001110110f0",
      "1111111001f",
      "111f0101110",
      "00111101f11",
      "11001110110",
      "110111110f0",
      "111011ff110",
      "10100111110",
      "100001f1f11"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      0,
      3
    ],
    "pads": [
      {
        "x": 2,
        "z": 4,
        "type": "grow"
      },
      {
        "x": 0,
        "z": 0,
        "type": "shrink"
      },
      {
        "x": 9,
        "z": 9,
        "type": "normal"
      }
    ],
    "par": 40
  },
  {
    "name": "Between the cracks",
    "description": "Switch the bridge and keep your weight spread out.",
    "map": [
      "11f1111f111",
      "11f01110101",
      "01111111110",
      "01101010101",
      "111111111f1",
      "00011001f11",
      "10111b11000",
      "101111b0011",
      "1100100b0f0",
      "1f1f10f01b0",
      "01f10011010"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      4,
      0
    ],
    "pads": [
      {
        "x": 4,
        "z": 4,
        "type": "grow"
      },
      {
        "x": 0,
        "z": 0,
        "type": "shrink"
      },
      {
        "x": 6,
        "z": 1,
        "type": "normal"
      },
      {
        "x": 5,
        "z": 7,
        "type": "bridge"
      }
    ],
    "par": 44
  },
  {
    "name": "Return ticket",
    "description": "Travel light, then stand tall to use the portals.",
    "map": [
      "11100011111",
      "111ff01011f",
      "10111011f00",
      "11f1100f110",
      "1010000f010",
      "11f11001110",
      "00111001011",
      "10111001f10",
      "001110111f0",
      "11111010101",
      "10110011111"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      7,
      6
    ],
    "pads": [
      {
        "x": 2,
        "z": 4,
        "type": "grow"
      },
      {
        "x": 9,
        "z": 1,
        "type": "shrink"
      },
      {
        "x": 9,
        "z": 6,
        "type": "normal"
      },
      {
        "x": 3,
        "z": 6,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 8,
        "z": 3,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 4,
        "z": 3,
        "type": "teleport",
        "pair": "B"
      },
      {
        "x": 6,
        "z": 10,
        "type": "teleport",
        "pair": "B"
      }
    ],
    "par": 48
  },
  {
    "name": "The grand escape",
    "description": "Bring together every trick: size, bridges, portals, and fragile tiles.",
    "map": [
      "0100100f101",
      "1111b010011",
      "001110f1111",
      "01b11011111",
      "00111011111",
      "01010010101",
      "111f100f00f",
      "11111001111",
      "1011f011111",
      "11f1001b11b",
      "10b0f0110f0"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      7,
      10
    ],
    "pads": [
      {
        "x": 1,
        "z": 3,
        "type": "grow"
      },
      {
        "x": 9,
        "z": 8,
        "type": "shrink"
      },
      {
        "x": 9,
        "z": 3,
        "type": "normal"
      },
      {
        "x": 6,
        "z": 9,
        "type": "bridge"
      },
      {
        "x": 0,
        "z": 6,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 6,
        "z": 4,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 2,
        "z": 7,
        "type": "teleport",
        "pair": "B"
      },
      {
        "x": 6,
        "z": 1,
        "type": "teleport",
        "pair": "B"
      }
    ],
    "par": 52
  }
];
