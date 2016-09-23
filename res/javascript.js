CodeMirror.defineMode("javascript", function(e, t) {
    function r(e, t, r) {
        return t.tokenize = r, r(e, t)
    }
    function n(e, t) {
        for (var r, n = !1; null != (r = e.next());) {
            if (r == t && !n)
                return !1;
            n = !n && "\\" == r
        }
        return n
    }
    function a(e, t, r) {
        return G = e, H = r, t
    }
    function i(e, t) {
        var i = e.next();
        if ('"' == i || "'" == i)
            return r(e, t, o(i));
        if ("." == i && e.match(/^\d+(?:[eE][+\-]?\d+)?/))
            return a("number", "number");
        if (/[\[\]{}\(\),;\:\.]/.test(i))
            return a(i);
        if ("0" == i && e.eat(/x/i))
            return e.eatWhile(/[\da-f]/i), a("number", "number");
        if (/\d/.test(i))
            return e.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/), a("number", "number");
        if ("/" == i)
            return e.eat("*") ? r(e, t, c) : e.eat("/") ? (e.skipToEnd(), a("comment", "comment")) : "operator" == t.lastType || "keyword c" == t.lastType || /^[\[{}\(,;:]$/.test(t.lastType) ? (n(e, "/"), e.eatWhile(/[gimy]/), a("regexp", "string-2")) : (e.eatWhile(X), a("operator", null, e.current()));
        if ("#" == i)
            return e.skipToEnd(), a("error", "error");
        if (X.test(i))
            return e.eatWhile(X), a("operator", null, e.current());
        e.eatWhile(/[\w\$_]/);
        var l = e.current(),
            u = R.propertyIsEnumerable(l) && R[l];
        return u && "." != t.lastType ? a(u.type, u.style, l) : a("variable", "variable", l)
    }
    function o(e) {
        return function(t, r) {
            return n(t, e) || (r.tokenize = i), a("string", "string")
        }
    }
    function c(e, t) {
        for (var r, n = !1; r = e.next();) {
            if ("/" == r && n) {
                t.tokenize = i;
                break
            }
            n = "*" == r
        }
        return a("comment", "comment")
    }
    function l(e, t, r, n, a, i) {
        this.indented = e, this.column = t, this.type = r, this.prev = a, this.info = i, null != n && (this.align = n)
    }
    function u(e, t) {
        for (var r = e.localVars; r; r = r.next)
            if (r.name == t)
                return !0
    }
    function s(e, t, r, n, a) {
        var i = e.cc;
        for (Z.state = e, Z.stream = a, Z.marked = null, Z.cc = i, e.lexical.hasOwnProperty("align") || (e.lexical.align = !0);;) {
            var o = i.length ? i.pop() : L ? k : x;
            if (o(r, n)) {
                for (; i.length && i[i.length - 1].lex;)
                    i.pop()();
                return Z.marked ? Z.marked : "variable" == r && u(e, n) ? "variable-2" : t
            }
        }
    }
    function f() {
        for (var e = arguments.length - 1; e >= 0; e--)
            Z.cc.push(arguments[e])
    }
    function p() {
        return f.apply(null, arguments), !0
    }
    function d(e) {
        function t(t) {
            for (var r = t; r; r = r.next)
                if (r.name == e)
                    return !0;
            return !1
        }
        var r = Z.state;
        if (r.context) {
            if (Z.marked = "def", t(r.localVars))
                return;
            r.localVars = {
                name: e,
                next: r.localVars
            }
        } else {
            if (t(r.globalVars))
                return;
            r.globalVars = {
                name: e,
                next: r.globalVars
            }
        }
    }
    function v() {
        Z.state.context = {
            prev: Z.state.context,
            vars: Z.state.localVars
        }, Z.state.localVars = et
    }
    function m() {
        Z.state.localVars = Z.state.context.vars, Z.state.context = Z.state.context.prev
    }
    function y(e, t) {
        var r = function() {
            var r = Z.state,
                n = r.indented;
            "stat" == r.lexical.type && (n = r.lexical.indented), r.lexical = new l(n, Z.stream.column(), e, null, r.lexical, t)
        };
        return r.lex = !0, r
    }
    function b() {
        var e = Z.state;
        e.lexical.prev && (")" == e.lexical.type && (e.indented = e.lexical.indented), e.lexical = e.lexical.prev)
    }
    function h(e) {
        return function(t) {
            return t == e ? p() : ";" == e ? f() : p(arguments.callee)
        }
    }
    function x(e) {
        return "var" == e ? p(y("vardef"), N, h(";"), b) : "keyword a" == e ? p(y("form"), k, x, b) : "keyword b" == e ? p(y("form"), x, b) : "{" == e ? p(y("}"), W, b) : ";" == e ? p() : "if" == e ? p(y("form"), k, x, b, A) : "function" == e ? p(D) : "for" == e ? p(y("form"), h("("), y(")"), U, h(")"), b, x, b) : "variable" == e ? p(y("stat"), E) : "switch" == e ? p(y("form"), k, y("}", "switch"), h("{"), W, b, b) : "case" == e ? p(k, h(":")) : "default" == e ? p(h(":")) : "catch" == e ? p(y("form"), v, h("("), F, h(")"), x, b, m) : f(y("stat"), k, h(";"), b)
    }
    function k(e) {
        return M(e, !1)
    }
    function g(e) {
        return M(e, !0)
    }
    function M(e, t) {
        var r = t ? C : V;
        return Y.hasOwnProperty(e) ? p(r) : "function" == e ? p(D) : "keyword c" == e ? p(t ? j : w) : "(" == e ? p(y(")"), w, h(")"), b, r) : "operator" == e ? p(t ? g : k) : "[" == e ? p(y("]"), P(g, "]"), b, r) : "{" == e ? p(y("}"), P(I, "}"), b, r) : p()
    }
    function w(e) {
        return e.match(/[;\}\)\],]/) ? f() : f(k)
    }
    function j(e) {
        return e.match(/[;\}\)\],]/) ? f() : f(g)
    }
    function V(e, t) {
        return "," == e ? p(k) : C(e, t, !1)
    }
    function C(e, t, r) {
        var n = 0 == r ? V : C,
            a = 0 == r ? k : g;
        return "operator" == e ? /\+\+|--/.test(t) ? p(n) : "?" == t ? p(k, h(":"), a) : p(a) : ";" != e ? "(" == e ? p(y(")", "call"), P(g, ")"), b, n) : "." == e ? p(T, n) : "[" == e ? p(y("]"), w, h("]"), b, n) : void 0 : void 0
    }
    function E(e) {
        return ":" == e ? p(b, x) : f(V, h(";"), b)
    }
    function T(e) {
        return "variable" == e ? (Z.marked = "property", p()) : void 0
    }
    function I(e, t) {
        if ("variable" == e) {
            if (Z.marked = "property", "get" == t || "set" == t)
                return p(z)
        } else
            ("number" == e || "string" == e) && (Z.marked = e + " property");
        return Y.hasOwnProperty(e) ? p(h(":"), g) : void 0
    }
    function z(e) {
        return ":" == e ? p(k) : "variable" != e ? p(h(":"), k) : (Z.marked = "property", p(D))
    }
    function P(e, t) {
        function r(n) {
            if ("," == n) {
                var a = Z.state.lexical;
                return "call" == a.info && (a.pos = (a.pos || 0) + 1), p(e, r)
            }
            return n == t ? p() : p(h(t))
        }
        return function(n) {
            return n == t ? p() : f(e, r)
        }
    }
    function W(e) {
        return "}" == e ? p() : f(x, W)
    }
    function O(e) {
        return ":" == e ? p(S) : f()
    }
    function S(e) {
        return "variable" == e ? (Z.marked = "variable-3", p()) : f()
    }
    function N(e, t) {
        return "variable" == e ? (d(t), Q ? p(O, $) : p($)) : f()
    }
    function $(e, t) {
        return "=" == t ? p(g, $) : "," == e ? p(N) : void 0
    }
    function A(e, t) {
        return "keyword b" == e && "else" == t ? p(y("form"), x, b) : void 0
    }
    function U(e) {
        return "var" == e ? p(N, h(";"), q) : ";" == e ? p(q) : "variable" == e ? p(_) : f(k, h(";"), q)
    }
    function _(e, t) {
        return "in" == t ? p(k) : p(V, q)
    }
    function q(e, t) {
        return ";" == e ? p(B) : "in" == t ? p(k) : f(k, h(";"), B)
    }
    function B(e) {
        ")" != e && p(k)
    }
    function D(e, t) {
        return "variable" == e ? (d(t), p(D)) : "(" == e ? p(y(")"), v, P(F, ")"), b, x, m) : void 0
    }
    function F(e, t) {
        return "variable" == e ? (d(t), Q ? p(O) : p()) : void 0
    }
    var G,
        H,
        J = e.indentUnit,
        K = t.statementIndent,
        L = t.json,
        Q = t.typescript,
        R = function() {
            function e(e) {
                return {
                    type: e,
                    style: "keyword"
                }
            }
            var t = e("keyword a"),
                r = e("keyword b"),
                n = e("keyword c"),
                a = e("operator"),
                i = {
                    type: "atom",
                    style: "atom"
                },
                o = {
                    "if": e("if"),
                    "while": t,
                    "with": t,
                    "else": r,
                    "do": r,
                    "try": r,
                    "finally": r,
                    "return": n,
                    "break": n,
                    "continue": n,
                    "new": n,
                    "delete": n,
                    "throw": n,
                    "var": e("var"),
                    "const": e("var"),
                    let: e("var"),
                    "function": e("function"),
                    "catch": e("catch"),
                    "for": e("for"),
                    "switch": e("switch"),
                    "case": e("case"),
                    "default": e("default"),
                    "in": a,
                    "typeof": a,
                    "instanceof": a,
                    "true": i,
                    "false": i,
                    "null": i,
                    undefined: i,
                    NaN: i,
                    Infinity: i,
                    "this": e("this")
                };
            if (Q) {
                var c = {
                        type: "variable",
                        style: "variable-3"
                    },
                    l = {
                        "interface": e("interface"),
                        "class": e("class"),
                        "extends": e("extends"),
                        constructor: e("constructor"),
                        "public": e("public"),
                        "private": e("private"),
                        "protected": e("protected"),
                        "static": e("static"),
                        "super": e("super"),
                        string: c,
                        number: c,
                        bool: c,
                        any: c
                    };
                for (var u in l)
                    o[u] = l[u]
            }
            return o
        }(),
        X = /[+\-*&%=<>!?|~^]/,
        Y = {
            atom: !0,
            number: !0,
            variable: !0,
            string: !0,
            regexp: !0,
            "this": !0
        },
        Z = {
            state: null,
            column: null,
            marked: null,
            cc: null
        },
        et = {
            name: "this",
            next: {
                name: "arguments"
            }
        };
    return b.lex = !0, {
        startState: function(e) {
            return {
                tokenize: i,
                lastType: null,
                cc: [],
                lexical: new l((e || 0) - J, 0, "block", !1),
                localVars: t.localVars,
                globalVars: t.globalVars,
                context: t.localVars && {
                    vars: t.localVars
                },
                indented: 0
            }
        },
        token: function(e, t) {
            if (e.sol() && (t.lexical.hasOwnProperty("align") || (t.lexical.align = !1), t.indented = e.indentation()), t.tokenize != c && e.eatSpace())
                return null;
            var r = t.tokenize(e, t);
            return "comment" == G ? r : (t.lastType = "operator" != G || "++" != H && "--" != H ? G : "incdec", s(t, r, G, H, e))
        },
        indent: function(e, r) {
            if (e.tokenize == c)
                return CodeMirror.Pass;
            if (e.tokenize != i)
                return 0;
            for (var n = r && r.charAt(0), a = e.lexical, o = e.cc.length - 1; o >= 0; --o) {
                var l = e.cc[o];
                if (l == b)
                    a = a.prev;
                else if (l != A || /^else\b/.test(r))
                    break
            }
            "stat" == a.type && "}" == n && (a = a.prev), K && ")" == a.type && "stat" == a.prev.type && (a = a.prev);
            var u = a.type,
                s = n == u;
            return "vardef" == u ? a.indented + ("operator" == e.lastType || "," == e.lastType ? 4 : 0) : "form" == u && "{" == n ? a.indented : "form" == u ? a.indented + J : "stat" == u ? a.indented + ("operator" == e.lastType || "," == e.lastType ? K || J : 0) : "switch" != a.info || s || 0 == t.doubleIndentSwitch ? a.align ? a.column + (s ? 0 : 1) : a.indented + (s ? 0 : J) : a.indented + (/^(?:case|default)\b/.test(r) ? J : 2 * J)
        },
        electricChars: ":{}",
        blockCommentStart: L ? null : "/*",
        blockCommentEnd: L ? null : "*/",
        lineComment: L ? null : "//",
        fold: "brace",
        helperType: L ? "json" : "javascript",
        jsonMode: L
    }
}), CodeMirror.defineMIME("text/javascript", "javascript"), CodeMirror.defineMIME("text/ecmascript", "javascript"), CodeMirror.defineMIME("application/javascript", "javascript"), CodeMirror.defineMIME("application/ecmascript", "javascript"), CodeMirror.defineMIME("application/json", {
    name: "javascript",
    json: !0
}), CodeMirror.defineMIME("application/x-json", {
    name: "javascript",
    json: !0
}), CodeMirror.defineMIME("text/typescript", {
    name: "javascript",
    typescript: !0
}), CodeMirror.defineMIME("application/typescript", {
    name: "javascript",
    typescript: !0
});
