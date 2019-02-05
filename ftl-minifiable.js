(k=>{
	var R={
		O:document,
		V:CustomEvent,
	P: {
		x: 0,
		y: 0
	},
	M: e => {
		var c = {
			x: e.clientX,
			y: e.clientY
		}
		R.j = c
		R.u()
	},
	u: k => {
			//Keep the cursor from jumping super far away.
			var l=v=>{
				return Math.min(200, Math.max(-200, v))
			};

		//deltas
		var q = R.j,d = {
			x: q.x - R.P.x,
			y: q.y - R.P.y
		},D = {
			x: l(d.x * 4),
			y: l(d.y * 4)
		}
		if (!d) d = {
			x: 0,
			y: 0
		}

		R.C = {
			x: q.x + D.x,
			y: q.y + D.y
		}
		R.O.dispatchEvent(
			new R.V("precursormove", {
				detail: {
					x: R.C.x,
					y: R.C.y
				}
			})
		)
		R.E(R.C)
		R.P = R.j
	},
	E: s => {
		var l = R.O.elementFromPoint(~~s.x, ~~s.y),Q={
			bubbles: true,
			cancellable: true
		},B = A =[],n = R.f,r=k=>{return k.classList},v='prehover';
		if (R.f && (!l || l != R.f)) {
			r(R.f).remove(v)
			R.f.dispatchEvent(
				new R.V(
					"erphover", //The foreseen hover ain't coming through
					Q
				)
			)
		}
		if (l && R.f != l) {
			while (n) {

				B.push(n = n.parentNode)
			}
			n = l
			while (n) {

				A.push(n = n.parentNode)
			}
			var m=Array.from
			for (n of m(B))
				if (n && r(n) && A.indexOf(n) < 0)
					r(n).remove(v)
			for (n of m(A))
				if (n && r(n) && B.indexOf(n) < 0)
					r(n).add(v)

			r(l).add(v)
			l.dispatchEvent(
				new R.V(v, Q)
			)
			R.f = l
		}
	}
}
R.j=R.P
R.O.addEventListener("mousemove", R.M)
FTL=R
})()
