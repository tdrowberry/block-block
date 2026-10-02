import {solve,step,stateKey,supported,won} from './puzzle.js';
export function planTip(level,current){
 if(!supported(level,current)||won(level,current))return null;
 const solution=solve(level,current);if(!solution?.length)return null;
 let state={...current};
 const steps=solution.slice(0,20).map(direction=>{const from={...state};state=step(level,state,direction);return{direction,from,to:{...state}}});
 return{steps,finishes:solution.length<=20};
}
export function advanceTip(tip,state){
 if(!tip?.steps.length)return null;
 if(stateKey(tip.steps[0].to)!==stateKey(state))return null;
 const steps=tip.steps.slice(1);return steps.length?{...tip,steps}:null;
}
