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
	},G=Math,H=G.pow,l=v=>{
		return G.min(200, G.max(-200, v))
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
				y: q.y + D.y,
				d:H(H(D.x,2)+H(D.y,2),.5)
			}
			O[Y](
				new V("precursormove", {
					detail: {
						x: C.x,
						y: C.y,
						d: C.d
					}
				})
			)
			E(C)
			P = j
		},E= s => {
		var l = O.elementFromPoint(~~s.x, ~~s.y),Q={
			bubbles: 1,
			cancellable: 1
		},B = A =[],n = f,r='classList',v='prehover',T=Q;
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
			T.detail={'d':s.d};
			l[Y](
				new V(v, T)
			)
			f = l
		}
	};
O.addEventListener("mousemove", M)
})()
