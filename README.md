# FTL
Hover events before they happen.

## WHAT IT DOES

FTL is a tiny JavaScript plugin that allows your website to respond to <code>:hover</code> events faster than normally possible. On default settings, FTL will make your site visibly snappier. Crank it up to eleven and watch as buttons <code>:hover</code> hundreds of pixels away from the cursor in the vague direction its headed.

## HOW IT WORKS

To figure out where your cursor is headed, FTL generates a precursor (aka the "ghost cursor") whereever it sees your mouse is headed. If this precursor hovers over an element, the <code>.prehover</code> class is added to the element. The cursor shown on this page is for demonstrative purposes only and does is not part of the plugin.

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
(k=>{var R={O:document,V:CustomEvent,P:{x:0,y:0},M:e=>{var c={x:e.clientX,y:e.clientY};R.j=c;R.u()},u:k=>{var l=v=>{return Math.min(200,Math.max(-200,v))};var q=R.j,d={x:q.x-R.P.x,y:q.y-R.P.y},D={x:l(d.x*4),y:l(d.y*4)};if(!d){d={x:0,y:0}}R.C={x:q.x+D.x,y:q.y+D.y};R.O.dispatchEvent(new R.V("precursormove",{detail:{x:R.C.x,y:R.C.y}}));R.E(R.C);R.P=R.j},E:s=>{var l=R.O.elementFromPoint(~~s.x,~~s.y),Q={bubbles:true,cancellable:true},B=A=[],n=R.f,r=k=>{return k.classList},v='prehover';if(R.f&&(!l||l!=R.f)){r(R.f).remove(v);R.f.dispatchEvent(new R.V("erphover",Q))}if(l&&R.f!=l){while(n){B.push(n=n.parentNode)}n=l;while(n){A.push(n=n.parentNode)}var m=Array.from;for(n of m(B)){if(n&&r(n)&&A.indexOf(n)<0){r(n).remove(v)}}for(n of m(A)){if(n&&r(n)&&B.indexOf(n)<0){r(n).add(v)}}r(l).add(v);l.dispatchEvent(new R.V(v,Q));R.f=l}}};R.j=R.P;R.O.addEventListener("mousemove",R.M);FTL=R})()
```
