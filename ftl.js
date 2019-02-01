var FTL = {
	lastPos: {
		x: 0,
		y: 0
	},
	cpos: {
		x: 0,
		y: 0
	},
	foreseen: null,
	moved: e => {
		var c = {
			x: e.clientX,
			y: e.clientY
		};
		FTL.cpos = c;
		FTL.pollCursor();
	},
	pollCursor: () => {
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
	},
	hoverElement: pos => {
		var el = document.elementFromPoint(~~pos.x, ~~pos.y);
		if (FTL.foreseen && (!el || el != FTL.foreseen)) {
			FTL.foreseen.classList.remove("prehover");
			FTL.foreseen.dispatchEvent(
				new CustomEvent(
					"erphover", //The foreseen hover ain't coming through
					{
						bubbles: true,
						cancelable: true
					}
				)
			);
		}
		if (el && FTL.foreseen != el) {
			var oldAncestors = [];
			var node = FTL.foreseen;
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
			FTL.foreseen = el;
		}
	}
};

document.addEventListener("mousemove", FTL.moved);
