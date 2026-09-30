import {powerLevels,sizeIntro} from './power-levels.js';
export * from './puzzle.js';
import {advancedLevels} from './advanced-levels.js';
import {finalLevels} from './final-levels.js';
import {teleportLevels} from './teleport-levels.js';
const midchapterPowers={
  5:{description:'Grow tall, cross the board, then restore your balance.',pads:[{x:1,z:0,type:'grow'},{x:8,z:0,type:'normal'}],par:33},
  7:{description:'Shrink to a cube, find the route, then return to normal.',pads:[{x:4,z:0,type:'shrink'},{x:5,z:5,type:'normal'}],par:28},
};
const prepareAdvanced=(level,index)=>index===4?sizeIntro:midchapterPowers[index]?{...level,...midchapterPowers[index]}:level;
export const levels = [
  {name:'First steps',description:'Every great escape starts with a little push.',map:['1110000','1111110','1111111','0111111','0001111','0000111'],start:[1,1],goal:[5,4]},
  {name:'The long way',description:'The shortest route isn’t always a straight line.',map:['11110000','11111100','11111100','00111110','00011111','00001111','00001111'],start:[1,1],goal:[6,5]},
  {name:'Mind the gap',description:'A little space can make a big difference.',map:['1111111','1110111','1110111','1111111','0011100','0011111','0011111'],start:[1,1],goal:[5,6]},
  {name:'Around the bend',description:'Good things come to those who turn.',map:['11110000','11111111','11111111','00011011','11111011','11111111','11111111'],start:[1,1],goal:[1,5]},
  {name:'Narrow thinking',description:'Find your balance between the islands.',map:['11100111','11111111','11111111','00100110','11111111','11111111','11100111'],start:[1,1],goal:[6,5]},
  {name:'The last escape',description:'One block. A few turns. You know the way.',map:['111100111','111111111','111100111','001100110','111111111','111001111','111111111','001111000'],start:[1,1],goal:[7,5]},
  ...advancedLevels.map(prepareAdvanced), ...powerLevels, ...teleportLevels, ...finalLevels
];

