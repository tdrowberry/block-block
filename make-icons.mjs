import {writeFileSync} from 'node:fs';
import {deflateSync} from 'node:zlib';
function crc(b){let c=0xffffffff;for(const v of b){c^=v;for(let k=0;k<8;k++)c=(c>>>1)^((c&1)?0xedb88320:0)}return(c^0xffffffff)>>>0}
function chunk(type,data){const t=Buffer.from(type),size=Buffer.alloc(4),check=Buffer.alloc(4);size.writeUInt32BE(data.length);check.writeUInt32BE(crc(Buffer.concat([t,data])));return Buffer.concat([size,t,data,check])}
const faces=[{points:[[160,167],[256,119],[352,167],[256,215]],color:[225,243,174]},{points:[[160,167],[256,215],[256,393],[160,345]],color:[148,180,102]},{points:[[256,215],[352,167],[352,345],[256,393]],color:[189,214,138]}];
function inside(x,y,p){let yes=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const[a,b]=p[i],[c,d]=p[j];if((b>y)!==(d>y)&&x<(c-a)*(y-b)/(d-b)+a)yes=!yes}return yes}
for(const n of [192,512]){const raw=Buffer.alloc(n*(n*3+1));for(let y=0;y<n;y++)for(let x=0;x<n;x++){const color=faces.find(f=>inside(x*512/n,y*512/n,f.points))?.color??[19,37,30];const offset=y*(n*3+1)+1+x*3;raw.set(color,offset)}const header=Buffer.alloc(13);header.writeUInt32BE(n,0);header.writeUInt32BE(n,4);header[8]=8;header[9]=2;writeFileSync(`icon-${n}.png`,Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',header),chunk('IDAT',deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]))}
