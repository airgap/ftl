(k=>{
	var m=Array.from, f,j=P = {
		x: 0,
		y: 0
	},M=e => {
		var c = {
			x: e.clientX,
			y: e.clientY
		}
		j = c
		u()
	},l=v=>{
		return Math.min(200, Math.max(-200, v))
	},
		O=document,
		V=CustomEvent,
		Y='dispatchEvent',
		F='parentNode',
		u= k => {

			//deltas
			//can technically minify more by making each x/y own object,
			//but will drastically reduce readability
			var q = j,d = {
				x: q.x - P.x,
				y: q.y - P.y
			},D = {
				x: l(d.x * 4),
				y: l(d.y * 4)
			},

			C = {
				x: q.x + D.x,
				y: q.y + D.y
			}
			O[Y](
				new V("precursormove", {
					detail: {
						x: C.x,
						y: C.y
					}
				})
			)
			E(C)
			P = j
		},E= s => {
		var l = O.elementFromPoint(~~s.x, ~~s.y),Q={
			bubbles: 1,
			cancellable: 1
		},B = A =[],n = f,r='classList',v='prehover';
		if (f && (!l || l != f)) {
			f[r].remove(v)
			f[Y](
				new V(
					"erphover", //The foreseen hover ain't coming through
					Q
				)
			)
		}
		if (l && f != l) {
			while (n) {

				B.push(n = n[F])
			}
			n = l
			while (n) {

				A.push(n = n[F])
			}
			for (n of m(B))
				if (n && A.indexOf(n) < 0)
					n[r].remove(v)
			for (n of m(A))
				if (n && B.indexOf(n) < 0)
					n[r].add(v)

			l[r].add(v)
			l[Y](
				new V(v, Q)
			)
			f = l
		}
	};
O.addEventListener("mousemove", M)
})()
