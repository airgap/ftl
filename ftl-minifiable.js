var FTL = {
	lastPos: {
		x: 0,
		y: 0
	},
	cp: {
		x: 0,
		y: 0
	},
	foreseen: null,
	moved: e => {
		var c = {
			x: e.clientX,
			y: e.clientY
		};
		FTL.cp = c;
		FTL.pollCursor();
	},
	pollCursor: () => {
		var c = FTL.cp;

		//deltas
		var p = FTL.lastPos || {
			x: 0,
			y: 0
		};
		var p2 = FTL.cp || {
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
		function l(v) {
			return Math.min(200, Math.max(-200, v))
		}
		var pD = {
			x: l(delta.x * 7),
			y: l(delta.y * 7)
		};
		FTL.pC = {
			x: c.x + pD.x,
			y: c.y + pD.y
		};
		document.dispatchEvent(
			new CustomEvent("precursormove", {
				detail: {
					x: FTL.pC.x,
					y: FTL.pC.y
				}
			})
		);
		FTL.hoverElement(FTL.pC);
		FTL.lastPos = FTL.cp;
	},
	hoverElement: pos => {
		var el = document.elementFromPoint(~~pos.x, ~~pos.y);
		if (FTL.fs && (!el || el != FTL.fs)) {
			FTL.fs.classList.remove("prehover");
			FTL.fs.dispatchEvent(
				new CustomEvent(
					"erphover", //The foreseen hover ain't coming through
					{
						bubbles: true,
						cancelable: true
					}
				)
			);
		}
		if (el && FTL.fs != el) {
			var oAn = [];
			var n = FTL.fs;
			while (n) {
				n = n.parentNode;
				oAn.push(n);
			}
			var nAn = [];
			n = el;
			while (n) {
				n = n.parentNode;
				nAn.push(n);
			}
			for (var n of Array.from(oAn))
				if (n && n.classList && nAn.indexOf(n) < 0)
					n.classList.remove("prehover");
			for (var n of Array.from(nAn))
				if (n && n.classList && oAn.indexOf(n) < 0)
					n.classList.add("prehover");

			el.classList.add("prehover");
			el.dispatchEvent(
				new CustomEvent("prehover", {
					bubbles: true,
					cancelable: true
				})
			);
			FTL.fs = el;
		}
	}
};

document.addEventListener("mousemove", FTL.moved);
