var FTL = {
	lastPos: {
		x: 0,
		y: 0
	},
	cpos: {
		x: 0,
		y: 0
	}
};

var foreseen;

FTL.moved = e => {
	var c = {
		x: e.clientX,
		y: e.clientY
	};
	FTL.cpos = c;
	FTL.pollCursor();
};

//Get the cursor's current position and calculate its trajectory.
FTL.pollCursor = () => {
	var c = FTL.cpos;

	//deltas
	var p = FTL.lastPos || {
		x: 0,
		y: 0
	};
	var p2 = FTL.cpos || {
		x: 0,
		y: 0
	};
	var delta = {
		x: p2.x - p.x,
		y: p2.y - p.y
	};
	if (!delta) delta = {
		x: 0,
		y: 0
	};

	//Keep the cursor from jumping super far away.
	function lim(v) {
		return Math.min(200, Math.max(-200, v))
	}
	var projectedDelta = {
		x: lim(delta.x * 7),
		y: lim(delta.y * 7)
	};
	FTL.predictedCpos = {
		x: c.x + projectedDelta.x,
		y: c.y + projectedDelta.y
	};
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
		node = el;
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

document.addEventListener("mousemove", FTL.moved);
