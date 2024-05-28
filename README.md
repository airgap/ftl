# FTL

Hover events before they happen.

## What it does

FTL is a tiny JavaScript plugin that allows your website to respond to `:hover` events faster than normally possible. On default settings, FTL will make your site visibly snappier. Crank it up to eleven and watch as buttons `:hover` hundreds of pixels away from the cursor in the vague direction it's headed.

## How it works

To figure out where your cursor is headed, FTL generates a precursor (aka the "ghost cursor") whereever it sees your mouse is headed. If this precursor hovers over an element, the `.prehover` class is added to the element.

## How to use it

At the core of FTL is the `.prehover` class. Anywhere you have `:hover` in your CSS, simply replace it with `.prehover` or append it to the existing CSS to have your element react to both selectors.

```CSS
a:hover, a.prehover {
	background: hotpink;
}
```

FTL also fires JavaScript events when a hover event is foreseen. Listen for the `prehover` event for foreseen hovers, `erphover<` for cancelled foresights, and `precursormove` to track the ghost cursor's position.

```JavaScript
myElement.addEventListener('prehover', foreseenHoverFunc)
myElement.addEventListener('erphover', cancelledForsightFunc)
myElement.addEventListener('precursormove', ghostCursorMovedFunc)
```
