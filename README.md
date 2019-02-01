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
var FTL={lastPos:{x:0,y:0},cpos:{x:0,y:0},foreseen:null,moved:e=>{var c={x:e.clientX,y:e.clientY};FTL.cpos=c;FTL.pollCursor()},pollCursor:()=>{var c=FTL.cpos;var p=FTL.lastPos||{x:0,y:0};var p2=FTL.cpos||{x:0,y:0};var delta={x:p2.x-p.x,y:p2.y-p.y};if(!delta){delta={x:0,y:0}}function lim(v){return Math.min(200,Math.max(-200,v))}var projectedDelta={x:lim(delta.x*7),y:lim(delta.y*7)};FTL.pCpos={x:c.x+projectedDelta.x,y:c.y+projectedDelta.y};document.dispatchEvent(new CustomEvent("precursormove",{detail:{x:FTL.pCpos.x,y:FTL.pCpos.y}}));FTL.hoverElement(FTL.pCpos);FTL.lastPos=FTL.cpos},hoverElement:pos=>{var el=document.elementFromPoint(~~pos.x,~~pos.y);if(FTL.fs&&(!el||el!=FTL.fs)){FTL.fs.classList.remove("prehover");FTL.fs.dispatchEvent(new CustomEvent("erphover",{bubbles:true,cancelable:true}))}if(el&&FTL.fs!=el){var oAn=[];var node=FTL.fs;while(node){node=node.parentNode;oAn.push(node)}var nAn=[];node=el;while(node){node=node.parentNode;nAn.push(node)}for(var node of Array.from(oAn)){if(node&&node.classList&&nAn.indexOf(node)<0){node.classList.remove("prehover")}}for(var node of Array.from(nAn)){if(node&&node.classList&&oAn.indexOf(node)<0){node.classList.add("prehover")}}el.classList.add("prehover");el.dispatchEvent(new CustomEvent("prehover",{bubbles:true,cancelable:true}));FTL.fs=el}}};document.addEventListener("mousemove",FTL.moved);
```
