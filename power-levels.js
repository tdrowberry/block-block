// Static puzzles verified by the same transition rules used in play.
export const sizeIntro={
  "name": "A change of scale",
  "description": "NEW: ↑3 grows, ↓1 shrinks, =2 restores. Touch a pad to stand on it.",
  "map": [
    "111111111",
    "111111111",
    "111111111",
    "000010000",
    "000010000",
    "111111111",
    "111111111",
    "111111111"
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
      "x": 3,
      "z": 1,
      "type": "grow"
    },
    {
      "x": 4,
      "z": 2,
      "type": "shrink"
    },
    {
      "x": 4,
      "z": 5,
      "type": "normal"
    }
  ]
};
export const powerLevels=[
  {
    "name": "Tall order",
    "description": "Use all three sizes. Restore your shape before escaping.",
    "map": [
      "111011101000",
      "111111111100",
      "011110110101",
      "100011010110",
      "110101110011",
      "011010111101",
      "111110100111",
      "010001111010",
      "001111111111",
      "000100111101",
      "011111101110",
      "111100110110"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      3,
      10
    ],
    "pads": [
      {
        "x": 6,
        "z": 4,
        "type": "grow"
      },
      {
        "x": 6,
        "z": 9,
        "type": "shrink"
      },
      {
        "x": 9,
        "z": 11,
        "type": "normal"
      }
    ],
    "par": 26
  },
  {
    "name": "Small advantages",
    "description": "A cube fits where a long block cannot.",
    "map": [
      "100111111011",
      "111001111101",
      "111111111101",
      "111011010101",
      "111011100001",
      "010100101001",
      "001111101101",
      "011111010011",
      "111101011101",
      "100101110111",
      "110000011010",
      "010110101100"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      2,
      8
    ],
    "pads": [
      {
        "x": 1,
        "z": 2,
        "type": "grow"
      },
      {
        "x": 6,
        "z": 2,
        "type": "shrink"
      },
      {
        "x": 5,
        "z": 9,
        "type": "normal"
      }
    ],
    "par": 30
  },
  {
    "name": "Three steps ahead",
    "description": "Think about the footprint of your next shape.",
    "map": [
      "111011101111",
      "111101111111",
      "101111010111",
      "110110011110",
      "011110011110",
      "110110110111",
      "101101110110",
      "111111111111",
      "110110010111",
      "111100100010",
      "001010110010",
      "000101111001"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      4,
      3
    ],
    "pads": [
      {
        "x": 3,
        "z": 3,
        "type": "grow"
      },
      {
        "x": 9,
        "z": 4,
        "type": "shrink"
      },
      {
        "x": 0,
        "z": 9,
        "type": "normal"
      }
    ],
    "par": 34
  },
  {
    "name": "Shape of the escape",
    "description": "A change in size can mean a change of route.",
    "map": [
      "101101011110",
      "110110111110",
      "111111101001",
      "010101111011",
      "111110001100",
      "011111111000",
      "100101101110",
      "111000110111",
      "111111111010",
      "110101111110",
      "111111111110",
      "110100110010"
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
        "x": 4,
        "z": 10,
        "type": "grow"
      },
      {
        "x": 5,
        "z": 3,
        "type": "shrink"
      },
      {
        "x": 0,
        "z": 10,
        "type": "normal"
      }
    ],
    "par": 38
  },
  {
    "name": "Building bridges",
    "description": "NEW: ⏻ toggles every dotted bridge. Touch it again to reverse.",
    "map": [
      "00b111101001",
      "111111110110",
      "011b01100111",
      "110101101001",
      "111011111011",
      "010111001110",
      "011011011011",
      "11b101111001",
      "11111111b111",
      "101111b11101",
      "101101110110",
      "111110000101"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      0,
      9
    ],
    "pads": [
      {
        "x": 5,
        "z": 8,
        "type": "grow"
      },
      {
        "x": 4,
        "z": 4,
        "type": "shrink"
      },
      {
        "x": 5,
        "z": 0,
        "type": "normal"
      },
      {
        "x": 2,
        "z": 10,
        "type": "bridge"
      }
    ],
    "par": 42
  },
  {
    "name": "Cross purposes",
    "description": "Change the crossing, then change your shape.",
    "map": [
      "11b101111101",
      "111100010100",
      "110011110011",
      "111011111100",
      "11111b010000",
      "101011011111",
      "100100111010",
      "b11111011111",
      "b11101111111",
      "111100110110",
      "111111000110",
      "100111011011"
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
        "x": 7,
        "z": 4,
        "type": "shrink"
      },
      {
        "x": 0,
        "z": 4,
        "type": "normal"
      },
      {
        "x": 10,
        "z": 11,
        "type": "bridge"
      }
    ],
    "par": 46
  },
  {
    "name": "The shifting maze",
    "description": "Your route depends on both shape and bridges.",
    "map": [
      "110100110110",
      "111111100010",
      "011111001111",
      "111110111001",
      "110110101101",
      "011111110110",
      "01111b1b0100",
      "001011001110",
      "11111111111b",
      "111111011111",
      "111011101110",
      "01000b110111"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      7,
      11
    ],
    "pads": [
      {
        "x": 2,
        "z": 8,
        "type": "grow"
      },
      {
        "x": 7,
        "z": 8,
        "type": "shrink"
      },
      {
        "x": 2,
        "z": 3,
        "type": "normal"
      },
      {
        "x": 10,
        "z": 10,
        "type": "bridge"
      }
    ],
    "par": 50
  },
  {
    "name": "A matter of scale",
    "description": "Small steps and long rolls must work together.",
    "map": [
      "10010b111110",
      "111101100111",
      "101111001111",
      "10111101010b",
      "1111110b0100",
      "111011111111",
      "101111111110",
      "010111001b10",
      "111110110111",
      "111111111001",
      "111111001001",
      "110101001101"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      11,
      11
    ],
    "pads": [
      {
        "x": 4,
        "z": 5,
        "type": "grow"
      },
      {
        "x": 1,
        "z": 7,
        "type": "shrink"
      },
      {
        "x": 0,
        "z": 11,
        "type": "normal"
      },
      {
        "x": 6,
        "z": 1,
        "type": "bridge"
      }
    ],
    "par": 54
  },
  {
    "name": "All the right changes",
    "description": "Every transformation has its moment.",
    "map": [
      "111101111101",
      "011111111110",
      "111001111111",
      "010110111111",
      "111000011111",
      "101101110111",
      "11b11111b011",
      "111011100010",
      "10011b100010",
      "110111100011",
      "b11110001111",
      "110111111111"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      1,
      9
    ],
    "pads": [
      {
        "x": 5,
        "z": 6,
        "type": "grow"
      },
      {
        "x": 9,
        "z": 3,
        "type": "shrink"
      },
      {
        "x": 6,
        "z": 9,
        "type": "normal"
      },
      {
        "x": 2,
        "z": 7,
        "type": "bridge"
      }
    ],
    "par": 58
  },
  {
    "name": "Beyond balance",
    "description": "Master three sizes and the changing crossings.",
    "map": [
      "b11111110001",
      "010011111010",
      "111101000011",
      "111100101011",
      "101111101011",
      "111110100110",
      "1b100011b011",
      "111001110001",
      "101b11111110",
      "101111110100",
      "11011111001b",
      "011001100010"
    ],
    "start": [
      1,
      1
    ],
    "goal": [
      4,
      1
    ],
    "pads": [
      {
        "x": 0,
        "z": 6,
        "type": "grow"
      },
      {
        "x": 0,
        "z": 10,
        "type": "shrink"
      },
      {
        "x": 10,
        "z": 8,
        "type": "normal"
      },
      {
        "x": 3,
        "z": 0,
        "type": "bridge"
      }
    ],
    "par": 62
  }
];
