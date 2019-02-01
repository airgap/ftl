var FTL = {
  lastPos: { x: 0, y: 0 },
  cpos: { x: 0, y: 0 }
};

var foreseen;

FTL.moved = e => {
  var c = {
    x: e.clientX,
    y: e.clientY,
    f: FTL.frame++
  };
  FTL.cpos = c;
  FTL.pollCursor();
};

//Get the cursor's current position and calculate its trajectory.
FTL.pollCursor = () => {
  var c = FTL.cpos;

  //deltas
  var p = FTL.lastPos || { x: 0, y: 0 };
  var p2 = FTL.cpos || { x: 0, y: 0 };
  var delta = {
    x: p2.x - p.x,
    y: p2.y - p.y
  };
  if (!delta) delta = { x: 0, y: 0 };

  //Maybe make X3
  var projectedDelta = { x: delta.x * 8, y: delta.y * 8 };
  //requestAnimationFrame(FTL.pollCursor);
  FTL.predictedCpos = FTL.sum(c, projectedDelta);
  document.dispatchEvent(
    new CustomEvent("precursormove", {
			detail: {
	      x: FTL.predictedCpos.x,
	      y: FTL.predictedCpos.y
			}
    })
  );
  FTL.hoverElement(FTL.predictedCpos);
  FTL.lastPos = FTL.cpos;
};

//See if the cursor's projected trajectory includes an element to forsee a hover event for.
FTL.hoverElement = pos => {
  var el = document.elementFromPoint(~~pos.x, ~~pos.y);
  if (foreseen && (!el || el != foreseen)) {
    foreseen.classList.remove("prehover");
    foreseen.dispatchEvent(
      new CustomEvent(
        "erphover", //The foreseen hover ain't coming through
        {
          bubbles: true,
          cancelable: true
        }
      )
    );
  }
  if (el && foreseen != el) {
    var oldAncestors = [];
    var node = foreseen;
    while (node) {
      node = node.parentNode;
      oldAncestors.push(node);
    }
    var newAncestors = [];
    var node = el;
    while (node) {
      node = node.parentNode;
      newAncestors.push(node);
    }
    for (var node of Array.from(oldAncestors))
      if (node && node.classList && newAncestors.indexOf(node) < 0)
        node.classList.remove("prehover");
    for (var node of Array.from(newAncestors))
      if (node && node.classList && oldAncestors.indexOf(node) < 0)
        node.classList.add("prehover");

    el.classList.add("prehover");
    el.dispatchEvent(
      new CustomEvent("prehover", {
        bubbles: true,
        cancelable: true
      })
    );
    foreseen = el;
  }
};

//Sum two coordinates.
FTL.sum = (posa, posb) => {
  return {
    x: posa.x + posb.x,
    y: posa.y + posb.y
  };
};

document.addEventListener("mousemove", FTL.moved);
console.log("FTL drive activated.");
