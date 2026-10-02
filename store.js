// The native app owns credits and only grants rewards after SDK confirmation.
const native=()=>window.BlockBlockNative;
let serial=0;
const pending=new Map();
window.addEventListener('block-block-store',event=>{
 const {id,...result}=event.detail??{};
 const request=pending.get(id);if(!request)return;
 clearTimeout(request.timer);pending.delete(id);
 result.error?request.reject(new Error(result.error)):request.resolve(result);
});
export const hasNativeStore=()=>Boolean(native());
export function storeRequest(action){
 if(!native())return Promise.reject(new Error('Tips are available in the Android app.'));
 return new Promise((resolve,reject)=>{
  const id=String(++serial),timer=setTimeout(()=>{pending.delete(id);reject(new Error('The store took too long. Try again; any earned credits are kept.'))},180000);
  pending.set(id,{resolve,reject,timer});
  try{native().request(JSON.stringify({id,action}))}catch(error){clearTimeout(timer);pending.delete(id);reject(error)}
 });
}
