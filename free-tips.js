import {cleanScores} from './progress.js';
const SPENT_KEY='block-block-free-tips-spent';
export function tipStatus(scores,levelCount,spent=0){
 const completed=Object.keys(cleanScores(scores,levelCount)).length;
 const earned=Math.floor(completed/3);
 if(!Number.isSafeInteger(spent)||spent<0)throw new Error('Your Tip record could not be read. Contact support for help.');
 return {completed,earned,spent,credits:Math.max(0,earned-spent),untilNext:earned===Math.floor(levelCount/3)?0:3-completed%3};
}
export function createTipWallet(storage){
 const read=()=>{const raw=storage.getItem(SPENT_KEY);if(raw===null)return 0;if(!/^\d+$/.test(raw))throw new Error('Your Tip record could not be read. Contact support for help.');return Number(raw)};
 return {
  status:(scores,count)=>tipStatus(scores,count,read()),
  spend(scores,count){
   const status=tipStatus(scores,count,read());
   if(status.credits<1)return false;
   // Persist first: failed storage must never spend a Tip or show a free trail.
   storage.setItem(SPENT_KEY,String(status.spent+1));
   return true;
  }
 };
}
