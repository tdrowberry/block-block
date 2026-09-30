export const sassyEscapes=[
 'Well eventually you escaped',
 'Glad you managed that one',
 'Taking the scenic route, were we?',
 'The exit was starting to miss you',
 'A few detours. Just a few.',
 'You really explored your options',
];
export function escapeRating(moves,minimum,variant=0){
 const extra=Math.max(0,moves-minimum);
 if(extra===0)return{title:'Absolutely Perfect',extra,perfect:true};
 if(extra<=10)return{title:'Almost perfect',extra,perfect:false};
 if(extra<=20)return{title:'Good escape',extra,perfect:false};
 return{title:sassyEscapes[variant%sassyEscapes.length],extra,perfect:false};
}
