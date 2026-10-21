export const tipPacks=[1,5,10,20,30,40,50].map(count=>({id:`tips_${count}`,count}));
// Compare actual Google Play prices only, in the same currency.
export function packSavings(single,pack){
 if(!single||!pack||single.currency!==pack.currency||!Number.isSafeInteger(single.priceMicros)||single.priceMicros<=0||!Number.isSafeInteger(pack.priceMicros)||pack.priceMicros<=0)return null;
 const full=single.priceMicros*pack.count;
 if(!Number.isSafeInteger(full)||pack.priceMicros>=full)return null;
 const percent=Math.floor((full-pack.priceMicros)*100/full+1e-8);
 return percent>0?percent:null;
}
export function availablePacks(offers=[]){
 return tipPacks.map(pack=>{
  const offer=offers.find(item=>item.id===pack.id&&item.count===pack.count&&typeof item.price==='string'&&item.price.length>0);
  return {...pack,...(offer??{}),available:Boolean(offer)};
 });
}
