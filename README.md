# FTL
Hover events before they happen.

## WHAT IT DOES

FTL is a tiny JavaScript plugin that allows your website to respond to <code>:hover</code> events faster than normally possible. On default settings, FTL will make your site visibly snappier. Crank it up to eleven and watch as buttons <code>:hover</code> hundreds of pixels away from the cursor in the vague direction its headed.

## HOW IT WORKS

To figure out where your cursor is headed, FTL generates a precursor (aka the "ghost cursor") whereever it sees your mouse is headed. If this precursor hovers over an element, the <code>.prehover</code> class is added to the element.

## HOW TO USE IT

At the core of FTL is the <code>.prehover</code> class. Anywhere you have <code>:hover</code> in your CSS, simply replace it with <code>.prehover</code> or append it to the existing CSS to have your element react to both selectors.

```CSS
a:hover, a.prehover {
	background: hotpink;
}
```

FTL also fires JavaScript events when a hover event is foreseen. Listen for the <code>prehover</code> event for foreseen hovers, <code>erphover</code> for cancelled foresights, and <code>precursormove</code> to track the ghost cursor's position.

```JavaScript
myElement.addEventListener('prehover', foreseenHoverFunc)
myElement.addEventListener('erphover', cancelledForsightFunc)
myElement.addEventListener('precursormove', ghostCursorMovedFunc)
```

## DOWNLOAD IT

Download <a target="_blank" href="ftl.min.js">this file</a> or copy this code into your <code>script</code> tag:

```JavaScript
(k=>{var f,j=P={x:0,y:0},M=e=>{var c={x:e.clientX,y:e.clientY};j=c;u()},G=Math,H=G.pow,l=v=>{return G.min(200,G.max(-200,v))},O=document,V=(a,b,c)=>{a.dispatchEvent(new CustomEvent(b,{detail:c}))},F='parentNode',u=k=>{var q=j,D={x:l((q.x-P.x)*4),y:l((q.y-P.y)*4)},C={x:q.x+D.x,y:q.y+D.y,d:H(H(D.x,2)+H(D.y,2),.5)};V(O,"precursormove",{x:C.x,y:C.y,d:C.d});E(C);P=j},E=s=>{var l=O.elementFromPoint(s.x,s.y),B=A=[],n=f,r='classList',v='prehover';if(f&&(!l||l!=f)){f[r].remove(v);V(f,"erphover")}if(l&&f!=l){while(n)B.push(n=n[F]);n=l;while(n)A.push(n=n[F]);for(n of B){if(n&&A.indexOf(n)<0){n[r].remove(v)}}for(n of A){if(n&&B.indexOf(n)<0){n[r].add(v)}}l[r].add(v);V(l,v,{d:s.d});f=l}};O.addEventListener("mousemove",M)})()
```
It's recommended you paste the code itself into your website's `<head>` as it saves you from one more server request and FTL is only 722 bytes long.
