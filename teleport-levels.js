// Verified static levels 27–36. Portals first appear at level 31.
export const teleportLevels=[
  {
    "name": "The long return",
    "description": "Three sizes. One route that brings them together.",
    "map": [
      "01011100011b",
      "111111111111",
      "101101101001",
      "111100110111",
      "10b111011111",
      "11111b1000b1",
      "110010001011",
      "111111111001",
      "111111111011",
      "000011111011",
      "110010011011",
      "b11111111110"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      11,
      7
    ],
    "pads": [
      {
        "x": 4,
        "z": 1,
        "type": "grow"
      },
      {
        "x": 10,
        "z": 11,
        "type": "shrink"
      },
      {
        "x": 10,
        "z": 3,
        "type": "normal"
      },
      {
        "x": 7,
        "z": 8,
        "type": "bridge"
      }
    ],
    "par": 42
  },
  {
    "name": "A delicate balance",
    "description": "Open the crossing at just the right moment.",
    "map": [
      "110111110110",
      "111100011011",
      "11111100011b",
      "111111010111",
      "011011011b11",
      "111101011b01",
      "111011111101",
      "001111110110",
      "11110110110b",
      "001011101100",
      "00101b011110",
      "110111110000"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      11,
      1
    ],
    "pads": [
      {
        "x": 6,
        "z": 7,
        "type": "grow"
      },
      {
        "x": 1,
        "z": 6,
        "type": "shrink"
      },
      {
        "x": 2,
        "z": 9,
        "type": "normal"
      },
      {
        "x": 7,
        "z": 11,
        "type": "bridge"
      }
    ],
    "par": 46
  },
  {
    "name": "Changing lanes",
    "description": "Leave yourself room to change your mind.",
    "map": [
      "01001011111b",
      "0100b101011b",
      "111111011111",
      "110101100110",
      "010110111111",
      "110b01110101",
      "111110100101",
      "111101111111",
      "111111000111",
      "111101011110",
      "011001110b11",
      "011100100001"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      5,
      10
    ],
    "pads": [
      {
        "x": 2,
        "z": 7,
        "type": "grow"
      },
      {
        "x": 1,
        "z": 11,
        "type": "shrink"
      },
      {
        "x": 9,
        "z": 5,
        "type": "normal"
      },
      {
        "x": 3,
        "z": 4,
        "type": "bridge"
      }
    ],
    "par": 50
  },
  {
    "name": "Before the leap",
    "description": "Master your shape before the next discovery.",
    "map": [
      "101011001010",
      "011111111111",
      "100011111111",
      "11111101b010",
      "111111011111",
      "11b010011010",
      "101100111100",
      "101110101110",
      "1101101b1011",
      "011010011111",
      "1b110111b100",
      "000011101011"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      8,
      11
    ],
    "pads": [
      {
        "x": 5,
        "z": 1,
        "type": "grow"
      },
      {
        "x": 10,
        "z": 7,
        "type": "shrink"
      },
      {
        "x": 4,
        "z": 5,
        "type": "normal"
      },
      {
        "x": 6,
        "z": 10,
        "type": "bridge"
      }
    ],
    "par": 54
  },
  {
    "name": "A step through space",
    "description": "NEW: stand tall on ◎A to reach the matching ◎A. Cubes cannot teleport.",
    "map": [
      "1111100011111",
      "1111100011111",
      "1111100011111"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      11,
      1
    ],
    "pads": [
      {
        "x": 4,
        "z": 1,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 8,
        "z": 1,
        "type": "teleport",
        "pair": "A"
      }
    ],
    "par": 4
  },
  {
    "name": "Distant shores",
    "description": "An empty space is no longer the end of the road.",
    "map": [
      "111100101101",
      "110110111110",
      "111010111110",
      "111010111100",
      "111110101101",
      "111010000110",
      "111110111111",
      "110110100111",
      "100110111101",
      "011100100110",
      "011100111100",
      "111100110011"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      6,
      10
    ],
    "pads": [
      {
        "x": 2,
        "z": 11,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 8,
        "z": 3,
        "type": "teleport",
        "pair": "A"
      }
    ],
    "par": 28
  },
  {
    "name": "The tall traveller",
    "description": "Grow or restore before you step through the portal.",
    "map": [
      "011000001101",
      "011110111000",
      "101100111100",
      "111010111011",
      "100100111111",
      "111110011110",
      "011110011111",
      "111110111111",
      "111110111101",
      "111100111010",
      "111100010111",
      "111010110011"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      6,
      9
    ],
    "pads": [
      {
        "x": 1,
        "z": 10,
        "type": "grow"
      },
      {
        "x": 2,
        "z": 1,
        "type": "shrink"
      },
      {
        "x": 6,
        "z": 1,
        "type": "normal"
      },
      {
        "x": 1,
        "z": 6,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 8,
        "z": 3,
        "type": "teleport",
        "pair": "A"
      }
    ],
    "par": 34
  },
  {
    "name": "Between worlds",
    "description": "Two pairs of portals. Choose where to stand.",
    "map": [
      "011100001101",
      "111110111101",
      "101110011011",
      "111110111110",
      "001110110111",
      "110100111011",
      "111110101011",
      "000010111101",
      "101110111111",
      "001010000111",
      "101110111101",
      "110100101101"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      6,
      7
    ],
    "pads": [
      {
        "x": 2,
        "z": 4,
        "type": "grow"
      },
      {
        "x": 11,
        "z": 5,
        "type": "shrink"
      },
      {
        "x": 8,
        "z": 0,
        "type": "normal"
      },
      {
        "x": 2,
        "z": 0,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 10,
        "z": 8,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 4,
        "z": 9,
        "type": "teleport",
        "pair": "B"
      },
      {
        "x": 8,
        "z": 5,
        "type": "teleport",
        "pair": "B"
      }
    ],
    "par": 40
  },
  {
    "name": "The relay",
    "description": "Shape, switches, and portals must work together.",
    "map": [
      "101010000111",
      "011110111100",
      "11b1001b1110",
      "100110110111",
      "011110001111",
      "111110110111",
      "111100110111",
      "111010111100",
      "010110110111",
      "111110101b11",
      "0111b0111011",
      "01111010111b"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      6,
      1
    ],
    "pads": [
      {
        "x": 0,
        "z": 5,
        "type": "grow"
      },
      {
        "x": 2,
        "z": 1,
        "type": "shrink"
      },
      {
        "x": 9,
        "z": 3,
        "type": "normal"
      },
      {
        "x": 7,
        "z": 6,
        "type": "bridge"
      },
      {
        "x": 1,
        "z": 10,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 11,
        "z": 8,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 4,
        "z": 5,
        "type": "teleport",
        "pair": "B"
      },
      {
        "x": 9,
        "z": 7,
        "type": "teleport",
        "pair": "B"
      }
    ],
    "par": 46
  },
  {
    "name": "No place like home",
    "description": "Find your way between islands and back to normal.",
    "map": [
      "101110111110",
      "b11110111111",
      "101110011101",
      "100100111111",
      "111110110011",
      "001100bb1111",
      "101100001011",
      "11b110111011",
      "0b0110110111",
      "000010111100",
      "011010110111",
      "111110011110"
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
        "x": 0,
        "z": 7,
        "type": "grow"
      },
      {
        "x": 2,
        "z": 2,
        "type": "shrink"
      },
      {
        "x": 7,
        "z": 2,
        "type": "normal"
      },
      {
        "x": 2,
        "z": 10,
        "type": "bridge"
      },
      {
        "x": 4,
        "z": 11,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 9,
        "z": 9,
        "type": "teleport",
        "pair": "A"
      },
      {
        "x": 0,
        "z": 11,
        "type": "teleport",
        "pair": "B"
      },
      {
        "x": 9,
        "z": 0,
        "type": "teleport",
        "pair": "B"
      }
    ],
    "par": 52
  }
];
