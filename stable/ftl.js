(k => {
    var f, j = P = {
            x: 0,
            y: 0
        },
        M = e => {
            var c = {
                x: e.clientX,
                y: e.clientY
            };
            j = c;
            u()
        },
        G = Math,
        H = G.pow,
        l = v => {
            return G.min(200, G.max(-200, v))
        },
        O = document,
        V = (a, b, c) => {
            a.dispatchEvent(new CustomEvent(b, {
                detail: c
            }))
        },
        F = 'parentNode',
        u = k => {
            var q = j,
                D = {
                    x: l((q.x - P.x) * 4),
                    y: l((q.y - P.y) * 4)
                },
                C = {
                    x: q.x + D.x,
                    y: q.y + D.y,
                    d: H(H(D.x, 2) + H(D.y, 2), .5)
                };
            V(O, "precursormove", {
                x: C.x,
                y: C.y,
                d: C.d
            });
            E(C);
            P = j
        },
        E = s => {
            var l = O.elementFromPoint(s.x, s.y),
                B = A = [],
                n = f,
                r = 'classList',
                v = 'prehover';
            if (f && (!l || l != f)) {
                f[r].remove(v);
                V(f, "erphover")
            }
            if (l && f != l) {
                while (n) B.push(n = n[F]);
                n = l;
                while (n) A.push(n = n[F]);
                for (n of B) {
                    if (n && A.indexOf(n) < 0) {
                        n[r].remove(v)
                    }
                }
                for (n of A) {
                    if (n && B.indexOf(n) < 0) {
                        n[r].add(v)
                    }
                }
                l[r].add(v);
                V(l, v, {
                    d: s.d
                });
                f = l
            }
        };
    O.addEventListener("mousemove", M)
})()
