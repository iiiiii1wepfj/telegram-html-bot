window.CodeMirror = function() {
    "use strict";
    function t(r, n) {
        if (!(this instanceof t))
            return new t(r, n);
        this.options = n = n || {};
        for (var i in no)
            !n.hasOwnProperty(i) && no.hasOwnProperty(i) && (n[i] = no[i]);
        h(n);
        var o = "string" == typeof n.value ? 0 : n.value.first,
            l = this.display = e(r, o);
        l.wrapper.CodeMirror = this, u(this), n.autofocus && !Pi && de(this), this.state = {
            keyMaps: [],
            overlays: [],
            modeGen: 0,
            overwrite: !1,
            focused: !1,
            suppressEdits: !1,
            pasteIncoming: !1,
            draggingText: !1,
            highlight: new Xn
        }, s(this), n.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap");
        var a = n.value;
        "string" == typeof a && (a = new yo(n.value, n.mode)), oe(this, cn)(this, a), ki && setTimeout(ti(he, this, !0), 20), ge(this);
        var c;
        try {
            c = document.activeElement == l.input
        } catch (f) {}
        c || n.autofocus && !Pi ? setTimeout(ti(De, this), 20) : We(this), oe(this, function() {
            for (var t in ro)
                ro.propertyIsEnumerable(t) && ro[t](this, n[t], io);
            for (var e = 0; e < ao.length; ++e)
                ao[e](this)
        })()
    }
    function e(t, e) {
        var r = {},
            n = r.input = ni("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none; font-size: 4px;");
        return Ti ? n.style.width = "1000px" : n.setAttribute("wrap", "off"), Ii && (n.style.border = "1px solid black"), n.setAttribute("autocorrect", "off"), n.setAttribute("autocapitalize", "off"), n.setAttribute("spellcheck", "false"), r.inputDiv = ni("div", [n], null, "overflow: hidden; position: relative; width: 3px; height: 0px;"), r.scrollbarH = ni("div", [ni("div", null, null, "height: 1px")], "CodeMirror-hscrollbar"), r.scrollbarV = ni("div", [ni("div", null, null, "width: 1px")], "CodeMirror-vscrollbar"), r.scrollbarFiller = ni("div", null, "CodeMirror-scrollbar-filler"), r.gutterFiller = ni("div", null, "CodeMirror-gutter-filler"), r.lineDiv = ni("div", null, "CodeMirror-code"), r.selectionDiv = ni("div", null, null, "position: relative; z-index: 1"), r.cursor = ni("div", " ", "CodeMirror-cursor"), r.otherCursor = ni("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"), r.measure = ni("div", null, "CodeMirror-measure"), r.lineSpace = ni("div", [r.measure, r.selectionDiv, r.lineDiv, r.cursor, r.otherCursor], null, "position: relative; outline: none"), r.mover = ni("div", [ni("div", [r.lineSpace], "CodeMirror-lines")], null, "position: relative"), r.sizer = ni("div", [r.mover], "CodeMirror-sizer"), r.heightForcer = ni("div", null, null, "position: absolute; height: " + Lo + "px; width: 1px;"), r.gutters = ni("div", null, "CodeMirror-gutters"), r.lineGutter = null, r.scroller = ni("div", [r.sizer, r.heightForcer, r.gutters], "CodeMirror-scroll"), r.scroller.setAttribute("tabIndex", "-1"), r.wrapper = ni("div", [r.inputDiv, r.scrollbarH, r.scrollbarV, r.scrollbarFiller, r.gutterFiller, r.scroller], "CodeMirror"), Si && (r.gutters.style.zIndex = -1, r.scroller.style.paddingRight = 0), t.appendChild ? t.appendChild(r.wrapper) : t(r.wrapper), Ii && (n.style.width = "0px"), Ti || (r.scroller.draggable = !0), Wi ? (r.inputDiv.style.height = "1px", r.inputDiv.style.position = "absolute") : Si && (r.scrollbarH.style.minWidth = r.scrollbarV.style.minWidth = "18px"), r.viewOffset = r.lastSizeC = 0, r.showingFrom = r.showingTo = e, r.lineNumWidth = r.lineNumInnerWidth = r.lineNumChars = null, r.prevInput = "", r.alignWidgets = !1, r.pollingFast = !1, r.poll = new Xn, r.cachedCharWidth = r.cachedTextHeight = null, r.measureLineCache = [], r.measureLineCachePos = 0, r.inaccurateSelection = !1, r.maxLine = null, r.maxLineLength = 0, r.maxLineChanged = !1, r.wheelDX = r.wheelDY = r.wheelStartX = r.wheelStartY = null, r
    }
    function r(e) {
        e.doc.mode = t.getMode(e.options, e.doc.modeOption), e.doc.iter(function(t) {
            t.stateAfter && (t.stateAfter = null), t.styles && (t.styles = null)
        }), e.doc.frontier = e.doc.first, W(e, 100), e.state.modeGen++, e.curOp && ae(e)
    }
    function n(t) {
        t.options.lineWrapping ? (t.display.wrapper.className += " CodeMirror-wrap", t.display.sizer.style.minWidth = "") : (t.display.wrapper.className = t.display.wrapper.className.replace(" CodeMirror-wrap", ""), f(t)), o(t), ae(t), X(t), setTimeout(function() {
            d(t)
        }, 100)
    }
    function i(t) {
        var e = ee(t.display),
            r = t.options.lineWrapping,
            n = r && Math.max(5, t.display.scroller.clientWidth / re(t.display) - 3);
        return function(i) {
            return Rr(t.doc, i) ? 0 : r ? (Math.ceil(i.text.length / n) || 1) * e : e
        }
    }
    function o(t) {
        var e = t.doc,
            r = i(t);
        e.iter(function(t) {
            var e = r(t);
            e != t.height && pn(t, e)
        })
    }
    function l(t) {
        var e = fo[t.options.keyMap],
            r = e.style;
        t.display.wrapper.className = t.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") + (r ? " cm-keymap-" + r : ""), t.state.disableInput = e.disableInput
    }
    function s(t) {
        t.display.wrapper.className = t.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + t.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), X(t)
    }
    function a(t) {
        u(t), ae(t), setTimeout(function() {
            g(t)
        }, 20)
    }
    function u(t) {
        var e = t.display.gutters,
            r = t.options.gutters;
        ii(e);
        for (var n = 0; n < r.length; ++n) {
            var i = r[n],
                o = e.appendChild(ni("div", null, "CodeMirror-gutter " + i));
            "CodeMirror-linenumbers" == i && (t.display.lineGutter = o, o.style.width = (t.display.lineNumWidth || 1) + "px")
        }
        e.style.display = n ? "" : "none"
    }
    function c(t, e) {
        if (0 == e.height)
            return 0;
        for (var r, n = e.text.length, i = e; r = Ir(i);) {
            var o = r.find();
            i = fn(t, o.from.line), n += o.from.ch - o.to.ch
        }
        for (i = e; r = Pr(i);) {
            var o = r.find();
            n -= i.text.length - o.from.ch, i = fn(t, o.to.line), n += i.text.length - o.to.ch
        }
        return n
    }
    function f(t) {
        var e = t.display,
            r = t.doc;
        e.maxLine = fn(r, r.first), e.maxLineLength = c(r, e.maxLine), e.maxLineChanged = !0, r.iter(function(t) {
            var n = c(r, t);
            n > e.maxLineLength && (e.maxLineLength = n, e.maxLine = t)
        })
    }
    function h(t) {
        for (var e = !1, r = 0; r < t.gutters.length; ++r)
            "CodeMirror-linenumbers" == t.gutters[r] && (t.lineNumbers ? e = !0 : t.gutters.splice(r--, 1));
        !e && t.lineNumbers && t.gutters.push("CodeMirror-linenumbers")
    }
    function d(t) {
        var e = t.display,
            r = t.doc.height,
            n = r + P(e);
        e.sizer.style.minHeight = e.heightForcer.style.top = n + "px", e.gutters.style.height = Math.max(n, e.scroller.clientHeight - Lo) + "px";
        var i = Math.max(n, e.scroller.scrollHeight),
            o = e.scroller.scrollWidth > e.scroller.clientWidth + 1,
            l = i > e.scroller.clientHeight + 1;
        l ? (e.scrollbarV.style.display = "block", e.scrollbarV.style.bottom = o ? ui(e.measure) + "px" : "0", e.scrollbarV.firstChild.style.height = i - e.scroller.clientHeight + e.scrollbarV.clientHeight + "px") : (e.scrollbarV.style.display = "", e.scrollbarV.firstChild.style.height = "0"), o ? (e.scrollbarH.style.display = "block", e.scrollbarH.style.right = l ? ui(e.measure) + "px" : "0", e.scrollbarH.firstChild.style.width = e.scroller.scrollWidth - e.scroller.clientWidth + e.scrollbarH.clientWidth + "px") : (e.scrollbarH.style.display = "", e.scrollbarH.firstChild.style.width = "0"), o && l ? (e.scrollbarFiller.style.display = "block", e.scrollbarFiller.style.height = e.scrollbarFiller.style.width = ui(e.measure) + "px") : e.scrollbarFiller.style.display = "", o && t.options.coverGutterNextToScrollbar && t.options.fixedGutter ? (e.gutterFiller.style.display = "block", e.gutterFiller.style.height = ui(e.measure) + "px", e.gutterFiller.style.width = e.gutters.offsetWidth + "px") : e.gutterFiller.style.display = "", Oi && 0 === ui(e.measure) && (e.scrollbarV.style.minWidth = e.scrollbarH.style.minHeight = Ei ? "18px" : "12px")
    }
    function p(t, e, r) {
        var n = t.scroller.scrollTop,
            i = t.wrapper.clientHeight;
        "number" == typeof r ? n = r : r && (n = r.top, i = r.bottom - r.top), n = Math.floor(n - I(t));
        var o = Math.ceil(n + i);
        return {
            from: mn(e, n),
            to: mn(e, o)
        }
    }
    function g(t) {
        var e = t.display;
        if (e.alignWidgets || e.gutters.firstChild && t.options.fixedGutter) {
            for (var r = y(e) - e.scroller.scrollLeft + t.doc.scrollLeft, n = e.gutters.offsetWidth, i = r + "px", o = e.lineDiv.firstChild; o; o = o.nextSibling)
                if (o.alignable)
                    for (var l = 0, s = o.alignable; l < s.length; ++l)
                        s[l].style.left = i;
            t.options.fixedGutter && (e.gutters.style.left = r + n + "px")
        }
    }
    function m(t) {
        if (!t.options.lineNumbers)
            return !1;
        var e = t.doc,
            r = v(t.options, e.first + e.size - 1),
            n = t.display;
        if (r.length != n.lineNumChars) {
            var i = n.measure.appendChild(ni("div", [ni("div", r)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                o = i.firstChild.offsetWidth,
                l = i.offsetWidth - o;
            return n.lineGutter.style.width = "", n.lineNumInnerWidth = Math.max(o, n.lineGutter.offsetWidth - l), n.lineNumWidth = n.lineNumInnerWidth + l, n.lineNumChars = n.lineNumInnerWidth ? r.length : -1, n.lineGutter.style.width = n.lineNumWidth + "px", !0
        }
        return !1
    }
    function v(t, e) {
        return String(t.lineNumberFormatter(e + t.firstLineNumber))
    }
    function y(t) {
        return si(t.scroller).left - si(t.sizer).left
    }
    function b(t, e, r, n) {
        for (var i, o = t.display.showingFrom, l = t.display.showingTo, s = p(t.display, t.doc, r); x(t, e, s, n) && (n = !1, i = !0, A(t), d(t), r && (r = Math.min(t.display.scroller.scrollHeight - t.display.scroller.clientHeight, "number" == typeof r ? r : r.top)), s = p(t.display, t.doc, r), !(s.from >= t.display.showingFrom && s.to <= t.display.showingTo));)
            e = [];
        return i && (Bn(t, "update", t), (t.display.showingFrom != o || t.display.showingTo != l) && Bn(t, "viewportChange", t, t.display.showingFrom, t.display.showingTo)), i
    }
    function x(t, e, r, n) {
        var i = t.display,
            o = t.doc;
        if (!i.wrapper.clientWidth)
            return i.showingFrom = i.showingTo = o.first, i.viewOffset = 0, void 0;
        if (!(!n && 0 == e.length && r.from > i.showingFrom && r.to < i.showingTo)) {
            m(t) && (e = [{
                from: o.first,
                to: o.first + o.size
            }]);
            var l = i.sizer.style.marginLeft = i.gutters.offsetWidth + "px";
            i.scrollbarH.style.left = t.options.fixedGutter ? l : "0";
            var s = 1 / 0;
            if (t.options.lineNumbers)
                for (var a = 0; a < e.length; ++a)
                    e[a].diff && e[a].from < s && (s = e[a].from);
            var u = o.first + o.size,
                c = Math.max(r.from - t.options.viewportMargin, o.first),
                f = Math.min(u, r.to + t.options.viewportMargin);
            if (i.showingFrom < c && c - i.showingFrom < 20 && (c = Math.max(o.first, i.showingFrom)), i.showingTo > f && i.showingTo - f < 20 && (f = Math.min(u, i.showingTo)), Yi)
                for (c = gn(Fr(o, fn(o, c))); u > f && Rr(o, fn(o, f));)
                    ++f;
            var h = [{
                from: Math.max(i.showingFrom, o.first),
                to: Math.min(i.showingTo, u)
            }];
            if (h = h[0].from >= h[0].to ? [] : L(h, e), Yi)
                for (var a = 0; a < h.length; ++a)
                    for (var d, p = h[a]; d = Pr(fn(o, p.to - 1));) {
                        var g = d.find().from.line;
                        if (!(g > p.from)) {
                            h.splice(a--, 1);
                            break
                        }
                        p.to = g
                    }
            for (var v = 0, a = 0; a < h.length; ++a) {
                var p = h[a];
                p.from < c && (p.from = c), p.to > f && (p.to = f), p.from >= p.to ? h.splice(a--, 1) : v += p.to - p.from
            }
            if (!n && v == f - c && c == i.showingFrom && f == i.showingTo)
                return w(t), void 0;
            h.sort(function(t, e) {
                return t.from - e.from
            });
            try {
                var y = document.activeElement
            } catch (b) {}
            .7 * (f - c) > v && (i.lineDiv.style.display = "none"), S(t, c, f, h, s), i.lineDiv.style.display = "", y && document.activeElement != y && y.offsetHeight && y.focus();
            var x = c != i.showingFrom || f != i.showingTo || i.lastSizeC != i.wrapper.clientHeight;
            return x && (i.lastSizeC = i.wrapper.clientHeight, W(t, 400)), i.showingFrom = c, i.showingTo = f, C(t), w(t), !0
        }
    }
    function C(t) {
        for (var e, r = t.display, n = r.lineDiv.offsetTop, i = r.lineDiv.firstChild; i; i = i.nextSibling)
            if (i.lineObj) {
                if (Si) {
                    var o = i.offsetTop + i.offsetHeight;
                    e = o - n, n = o
                } else {
                    var l = si(i);
                    e = l.bottom - l.top
                }
                var s = i.lineObj.height - e;
                if (2 > e && (e = ee(r)), s > .001 || -.001 > s) {
                    pn(i.lineObj, e);
                    var a = i.lineObj.widgets;
                    if (a)
                        for (var u = 0; u < a.length; ++u)
                            a[u].height = a[u].node.offsetHeight
                }
            }
    }
    function w(t) {
        var e = t.display.viewOffset = vn(t, fn(t.doc, t.display.showingFrom));
        t.display.mover.style.top = e + "px"
    }
    function L(t, e) {
        for (var r = 0, n = e.length || 0; n > r; ++r) {
            for (var i = e[r], o = [], l = i.diff || 0, s = 0, a = t.length; a > s; ++s) {
                var u = t[s];
                i.to <= u.from && i.diff ? o.push({
                    from: u.from + l,
                    to: u.to + l
                }) : i.to <= u.from || i.from >= u.to ? o.push(u) : (i.from > u.from && o.push({
                    from: u.from,
                    to: i.from
                }), i.to < u.to && o.push({
                    from: i.to + l,
                    to: u.to + l
                }))
            }
            t = o
        }
        return t
    }
    function k(t) {
        for (var e = t.display, r = {}, n = {}, i = e.gutters.firstChild, o = 0; i; i = i.nextSibling, ++o)
            r[t.options.gutters[o]] = i.offsetLeft, n[t.options.gutters[o]] = i.offsetWidth;
        return {
            fixedPos: y(e),
            gutterTotalWidth: e.gutters.offsetWidth,
            gutterLeft: r,
            gutterWidth: n,
            wrapperWidth: e.wrapper.clientWidth
        }
    }
    function S(t, e, r, n, i) {
        function o(e) {
            var r = e.nextSibling;
            return Ti && Fi && t.display.currentWheelTarget == e ? (e.style.display = "none", e.lineObj = null) : e.parentNode.removeChild(e), r
        }
        var l = k(t),
            s = t.display,
            a = t.options.lineNumbers;
        n.length || Ti && t.display.currentWheelTarget || ii(s.lineDiv);
        var u = s.lineDiv,
            c = u.firstChild,
            f = n.shift(),
            h = e;
        for (t.doc.iter(e, r, function(e) {
            if (f && f.to == h && (f = n.shift()), Rr(t.doc, e)) {
                if (0 != e.height && pn(e, 0), e.widgets && c && c.previousSibling)
                    for (var r = 0; r < e.widgets.length; ++r) {
                        var s = e.widgets[r];
                        if (s.showIfHidden) {
                            var d = c.previousSibling;
                            if (/pre/i.test(d.nodeName)) {
                                var p = ni("div", null, null, "position: relative");
                                d.parentNode.replaceChild(p, d), p.appendChild(d), d = p
                            }
                            var g = d.appendChild(ni("div", [s.node], "CodeMirror-linewidget"));
                            s.handleMouseEvents || (g.ignoreEvents = !0), T(s, g, d, l)
                        }
                    }
            } else if (f && f.from <= h && f.to > h) {
                for (; c.lineObj != e;)
                    c = o(c);
                a && h >= i && c.lineNumber && li(c.lineNumber, v(t.options, h)), c = c.nextSibling
            } else {
                if (e.widgets)
                    for (var m, y = 0, b = c; b && 20 > y; ++y, b = b.nextSibling)
                        if (b.lineObj == e && /div/i.test(b.nodeName)) {
                            m = b;
                            break
                        }
                var x = M(t, e, h, l, m);
                if (x != m)
                    u.insertBefore(x, c);
                else {
                    for (; c != m;)
                        c = o(c);
                    c = c.nextSibling
                }
                x.lineObj = e
            }
            ++h
        }); c;)
            c = o(c)
    }
    function M(t, e, r, n, i) {
        var o,
            l = Qr(t, e),
            s = e.gutterMarkers,
            a = t.display;
        if (!(t.options.lineNumbers || s || e.bgClass || e.wrapClass || e.widgets))
            return l;
        if (i) {
            i.alignable = null;
            for (var u, c = !0, f = 0, h = null, d = i.firstChild; d; d = u)
                if (u = d.nextSibling, /\bCodeMirror-linewidget\b/.test(d.className)) {
                    for (var p = 0; p < e.widgets.length; ++p) {
                        var g = e.widgets[p];
                        if (g.node == d.firstChild) {
                            g.above || h || (h = d), T(g, d, i, n), ++f;
                            break
                        }
                    }
                    if (p == e.widgets.length) {
                        c = !1;
                        break
                    }
                } else
                    i.removeChild(d);
            i.insertBefore(l, h), c && f == e.widgets.length && (o = i, i.className = e.wrapClass || "")
        }
        if (o || (o = ni("div", null, e.wrapClass, "position: relative"), o.appendChild(l)), e.bgClass && o.insertBefore(ni("div", null, e.bgClass + " CodeMirror-linebackground"), o.firstChild), t.options.lineNumbers || s) {
            var m = o.insertBefore(ni("div", null, null, "position: absolute; left: " + (t.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) + "px"), o.firstChild);
            if (t.options.fixedGutter && (o.alignable || (o.alignable = [])).push(m), !t.options.lineNumbers || s && s["CodeMirror-linenumbers"] || (o.lineNumber = m.appendChild(ni("div", v(t.options, r), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + n.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + a.lineNumInnerWidth + "px"))), s)
                for (var y = 0; y < t.options.gutters.length; ++y) {
                    var b = t.options.gutters[y],
                        x = s.hasOwnProperty(b) && s[b];
                    x && m.appendChild(ni("div", [x], "CodeMirror-gutter-elt", "left: " + n.gutterLeft[b] + "px; width: " + n.gutterWidth[b] + "px"))
                }
        }
        if (Si && (o.style.zIndex = 2), e.widgets && o != i)
            for (var p = 0, C = e.widgets; p < C.length; ++p) {
                var g = C[p],
                    w = ni("div", [g.node], "CodeMirror-linewidget");
                g.handleMouseEvents || (w.ignoreEvents = !0), T(g, w, o, n), g.above ? o.insertBefore(w, t.options.lineNumbers && 0 != e.height ? m : l) : o.appendChild(w), Bn(g, "redraw")
            }
        return o
    }
    function T(t, e, r, n) {
        if (t.noHScroll) {
            (r.alignable || (r.alignable = [])).push(e);
            var i = n.wrapperWidth;
            e.style.left = n.fixedPos + "px", t.coverGutter || (i -= n.gutterTotalWidth, e.style.paddingLeft = n.gutterTotalWidth + "px"), e.style.width = i + "px"
        }
        t.coverGutter && (e.style.zIndex = 5, e.style.position = "relative", t.noHScroll || (e.style.marginLeft = -n.gutterTotalWidth + "px"))
    }
    function A(t) {
        var e = t.display,
            r = Xe(t.doc.sel.from, t.doc.sel.to);
        if (r || t.options.showCursorWhenSelecting ? N(t) : e.cursor.style.display = e.otherCursor.style.display = "none", r ? e.selectionDiv.style.display = "none" : H(t), t.options.moveInputWithCursor) {
            var n = q(t, t.doc.sel.head, "div"),
                i = si(e.wrapper),
                o = si(e.lineDiv);
            e.inputDiv.style.top = Math.max(0, Math.min(e.wrapper.clientHeight - 10, n.top + o.top - i.top)) + "px", e.inputDiv.style.left = Math.max(0, Math.min(e.wrapper.clientWidth - 10, n.left + o.left - i.left)) + "px"
        }
    }
    function N(t) {
        var e = t.display,
            r = q(t, t.doc.sel.head, "div");
        e.cursor.style.left = r.left + "px", e.cursor.style.top = r.top + "px", e.cursor.style.height = Math.max(0, r.bottom - r.top) * t.options.cursorHeight + "px", e.cursor.style.display = "", r.other ? (e.otherCursor.style.display = "", e.otherCursor.style.left = r.other.left + "px", e.otherCursor.style.top = r.other.top + "px", e.otherCursor.style.height = .85 * (r.other.bottom - r.other.top) + "px") : e.otherCursor.style.display = "none"
    }
    function H(t) {
        function e(t, e, r, n) {
            0 > e && (e = 0), l.appendChild(ni("div", null, "CodeMirror-selected", "position: absolute; left: " + t + "px; top: " + e + "px; width: " + (null == r ? s - t : r) + "px; height: " + (n - e) + "px"))
        }
        function r(r, n, o) {
            function l(e, n) {
                return Z(t, Ue(r, e), "div", f, n)
            }
            var u,
                c,
                f = fn(i, r),
                h = f.text.length;
            return fi(yn(f), n || 0, null == o ? h : o, function(t, r, i) {
                var f,
                    d,
                    p,
                    g = l(t, "left");
                if (t == r)
                    f = g, d = p = g.left;
                else {
                    if (f = l(r - 1, "right"), "rtl" == i) {
                        var m = g;
                        g = f, f = m
                    }
                    d = g.left, p = f.right
                }
                null == n && 0 == t && (d = a), f.top - g.top > 3 && (e(d, g.top, null, g.bottom), d = a, g.bottom < f.top && e(d, g.bottom, null, f.top)), null == o && r == h && (p = s), (!u || g.top < u.top || g.top == u.top && g.left < u.left) && (u = g), (!c || f.bottom > c.bottom || f.bottom == c.bottom && f.right > c.right) && (c = f), a + 1 > d && (d = a), e(d, f.top, p - d, f.bottom)
            }), {
                start: u,
                end: c
            }
        }
        var n = t.display,
            i = t.doc,
            o = t.doc.sel,
            l = document.createDocumentFragment(),
            s = n.lineSpace.offsetWidth,
            a = F(t.display);
        if (o.from.line == o.to.line)
            r(o.from.line, o.from.ch, o.to.ch);
        else {
            var u = fn(i, o.from.line),
                c = fn(i, o.to.line),
                f = Fr(i, u) == Fr(i, c),
                h = r(o.from.line, o.from.ch, f ? u.text.length : null).end,
                d = r(o.to.line, f ? 0 : null, o.to.ch).start;
            f && (h.top < d.top - 2 ? (e(h.right, h.top, null, h.bottom), e(a, d.top, d.left, d.bottom)) : e(h.right, h.top, d.left - h.right, h.bottom)), h.bottom < d.top && e(a, h.bottom, null, d.top)
        }
        oi(n.selectionDiv, l), n.selectionDiv.style.display = ""
    }
    function D(t) {
        if (t.state.focused) {
            var e = t.display;
            clearInterval(e.blinker);
            var r = !0;
            e.cursor.style.visibility = e.otherCursor.style.visibility = "", t.options.cursorBlinkRate > 0 && (e.blinker = setInterval(function() {
                e.cursor.style.visibility = e.otherCursor.style.visibility = (r = !r) ? "" : "hidden"
            }, t.options.cursorBlinkRate))
        }
    }
    function W(t, e) {
        t.doc.mode.startState && t.doc.frontier < t.display.showingTo && t.state.highlight.set(e, ti(O, t))
    }
    function O(t) {
        var e = t.doc;
        if (e.frontier < e.first && (e.frontier = e.first), !(e.frontier >= t.display.showingTo)) {
            var r,
                n = +new Date + t.options.workTime,
                i = mr(e.mode, z(t, e.frontier)),
                o = [];
            e.iter(e.frontier, Math.min(e.first + e.size, t.display.showingTo + 500), function(l) {
                if (e.frontier >= t.display.showingFrom) {
                    var s = l.styles;
                    l.styles = $r(t, l, i);
                    for (var a = !s || s.length != l.styles.length, u = 0; !a && u < s.length; ++u)
                        a = s[u] != l.styles[u];
                    a && (r && r.end == e.frontier ? r.end++ : o.push(r = {
                        start: e.frontier,
                        end: e.frontier + 1
                    })), l.stateAfter = mr(e.mode, i)
                } else
                    qr(t, l, i), l.stateAfter = 0 == e.frontier % 5 ? mr(e.mode, i) : null;
                return ++e.frontier, +new Date > n ? (W(t, t.options.workDelay), !0) : void 0
            }), o.length && oe(t, function() {
                for (var t = 0; t < o.length; ++t)
                    ae(this, o[t].start, o[t].end)
            })()
        }
    }
    function E(t, e, r) {
        for (var n, i, o = t.doc, l = t.doc.mode.innerMode ? 1e3 : 100, s = e, a = e - l; s > a; --s) {
            if (s <= o.first)
                return o.first;
            var u = fn(o, s - 1);
            if (u.stateAfter && (!r || s <= o.frontier))
                return s;
            var c = _n(u.text, null, t.options.tabSize);
            (null == i || n > c) && (i = s - 1, n = c)
        }
        return i
    }
    function z(t, e, r) {
        var n = t.doc,
            i = t.display;
        if (!n.mode.startState)
            return !0;
        var o = E(t, e, r),
            l = o > n.first && fn(n, o - 1).stateAfter;
        return l = l ? mr(n.mode, l) : vr(n.mode), n.iter(o, e, function(r) {
            qr(t, r, l);
            var s = o == e - 1 || 0 == o % 5 || o >= i.showingFrom && o < i.showingTo;
            r.stateAfter = s ? mr(n.mode, l) : null, ++o
        }), l
    }
    function I(t) {
        return t.lineSpace.offsetTop
    }
    function P(t) {
        return t.mover.offsetHeight - t.lineSpace.offsetHeight
    }
    function F(t) {
        var e = oi(t.measure, ni("pre", null, null, "text-align: left")).appendChild(ni("span", "x"));
        return e.offsetLeft
    }
    function R(t, e, r, n, i) {
        var o = -1;
        n = n || V(t, e);
        for (var l = r;; l += o) {
            var s = n[l];
            if (s)
                break;
            0 > o && 0 == l && (o = 1)
        }
        return i = l > r ? "left" : r > l ? "right" : i, "left" == i && s.leftSide ? s = s.leftSide : "right" == i && s.rightSide && (s = s.rightSide), {
            left: r > l ? s.right : s.left,
            right: l > r ? s.left : s.right,
            top: s.top,
            bottom: s.bottom
        }
    }
    function B(t, e) {
        for (var r = t.display.measureLineCache, n = 0; n < r.length; ++n) {
            var i = r[n];
            if (i.text == e.text && i.markedSpans == e.markedSpans && t.display.scroller.clientWidth == i.width && i.classes == e.textClass + "|" + e.bgClass + "|" + e.wrapClass)
                return i
        }
    }
    function G(t, e) {
        var r = B(t, e);
        r && (r.text = r.measure = r.markedSpans = null)
    }
    function V(t, e) {
        var r = B(t, e);
        if (r)
            return r.measure;
        var n = K(t, e),
            i = t.display.measureLineCache,
            o = {
                text: e.text,
                width: t.display.scroller.clientWidth,
                markedSpans: e.markedSpans,
                measure: n,
                classes: e.textClass + "|" + e.bgClass + "|" + e.wrapClass
            };
        return 16 == i.length ? i[++t.display.measureLineCachePos % 16] = o : i.push(o), n
    }
    function K(t, e) {
        function r(t) {
            var e = t.top - p.top,
                r = t.bottom - p.top;
            r > v && (r = v), 0 > e && (e = 0);
            for (var n = g.length - 2; n >= 0; n -= 2) {
                var i = g[n],
                    o = g[n + 1];
                if (!(i > r || e > o) && (e >= i && o >= r || i >= e && r >= o || Math.min(r, o) - Math.max(e, i) >= r - e >> 1)) {
                    g[n] = Math.min(e, i), g[n + 1] = Math.max(r, o);
                    break
                }
            }
            return 0 > n && (n = g.length, g.push(e, r)), {
                left: t.left - p.left,
                right: t.right - p.left,
                top: n,
                bottom: null
            }
        }
        function n(t) {
            t.bottom = g[t.top + 1], t.top = g[t.top]
        }
        var i = t.display,
            o = Qn(e.text.length),
            l = Qr(t, e, o, !0);
        if (ki && !Si && !t.options.lineWrapping && l.childNodes.length > 100) {
            for (var s = document.createDocumentFragment(), a = 10, u = l.childNodes.length, c = 0, f = Math.ceil(u / a); f > c; ++c) {
                for (var h = ni("div", null, null, "display: inline-block"), d = 0; a > d && u; ++d)
                    h.appendChild(l.firstChild), --u;
                s.appendChild(h)
            }
            l.appendChild(s)
        }
        oi(i.measure, l);
        var p = si(i.lineDiv),
            g = [],
            m = Qn(e.text.length),
            v = l.offsetHeight;
        Mi && i.measure.first != l && oi(i.measure, l);
        for (var y, c = 0; c < o.length; ++c)
            if (y = o[c]) {
                var b = y,
                    x = null;
                if (/\bCodeMirror-widget\b/.test(y.className) && y.getClientRects) {
                    1 == y.firstChild.nodeType && (b = y.firstChild);
                    var C = b.getClientRects();
                    C.length > 1 && (x = m[c] = r(C[0]), x.rightSide = r(C[C.length - 1]))
                }
                x || (x = m[c] = r(si(b))), y.measureRight && (x.right = si(y.measureRight).left), y.leftSide && (x.leftSide = r(si(y.leftSide)))
            }
        ii(t.display.measure);
        for (var y, c = 0; c < m.length; ++c)
            (y = m[c]) && (n(y), y.leftSide && n(y.leftSide), y.rightSide && n(y.rightSide));
        return m
    }
    function U(t, e) {
        var r = !1;
        if (e.markedSpans)
            for (var n = 0; n < e.markedSpans; ++n) {
                var i = e.markedSpans[n];
                !i.collapsed || null != i.to && i.to != e.text.length || (r = !0)
            }
        var o = !r && B(t, e);
        if (o)
            return R(t, e, e.text.length, o.measure, "right").right;
        var l = Qr(t, e, null, !0),
            s = l.appendChild(ci(t.display.measure));
        return oi(t.display.measure, l), si(s).right - si(t.display.lineDiv).left
    }
    function X(t) {
        t.display.measureLineCache.length = t.display.measureLineCachePos = 0, t.display.cachedCharWidth = t.display.cachedTextHeight = null, t.options.lineWrapping || (t.display.maxLineChanged = !0), t.display.lineNumChars = null
    }
    function _() {
        return window.pageXOffset || (document.documentElement || document.body).scrollLeft
    }
    function Y() {
        return window.pageYOffset || (document.documentElement || document.body).scrollTop
    }
    function j(t, e, r, n) {
        if (e.widgets)
            for (var i = 0; i < e.widgets.length; ++i)
                if (e.widgets[i].above) {
                    var o = Ur(e.widgets[i]);
                    r.top += o, r.bottom += o
                }
        if ("line" == n)
            return r;
        n || (n = "local");
        var l = vn(t, e);
        if ("local" == n ? l += I(t.display) : l -= t.display.viewOffset, "page" == n || "window" == n) {
            var s = si(t.display.lineSpace);
            l += s.top + ("window" == n ? 0 : Y());
            var a = s.left + ("window" == n ? 0 : _());
            r.left += a, r.right += a
        }
        return r.top += l, r.bottom += l, r
    }
    function $(t, e, r) {
        if ("div" == r)
            return e;
        var n = e.left,
            i = e.top;
        if ("page" == r)
            n -= _(), i -= Y();
        else if ("local" == r || !r) {
            var o = si(t.display.sizer);
            n += o.left, i += o.top
        }
        var l = si(t.display.lineSpace);
        return {
            left: n - l.left,
            top: i - l.top
        }
    }
    function Z(t, e, r, n, i) {
        return n || (n = fn(t.doc, e.line)), j(t, n, R(t, n, e.ch, null, i), r)
    }
    function q(t, e, r, n, i) {
        function o(e, o) {
            var l = R(t, n, e, i, o ? "right" : "left");
            return o ? l.left = l.right : l.right = l.left, j(t, n, l, r)
        }
        function l(t, e) {
            var r = s[e],
                n = r.level % 2;
            return t == hi(r) && e && r.level < s[e - 1].level ? (r = s[--e], t = di(r) - (r.level % 2 ? 0 : 1), n = !0) : t == di(r) && e < s.length - 1 && r.level < s[e + 1].level && (r = s[++e], t = hi(r) - r.level % 2, n = !1), n && t == r.to && t > r.from ? o(t - 1) : o(t, n)
        }
        n = n || fn(t.doc, e.line), i || (i = V(t, n));
        var s = yn(n),
            a = e.ch;
        if (!s)
            return o(a);
        var u = bi(s, a),
            c = l(a, u);
        return null != zo && (c.other = l(a, zo)), c
    }
    function J(t, e, r, n) {
        var i = new Ue(t, e);
        return i.xRel = n, r && (i.outside = !0), i
    }
    function Q(t, e, r) {
        var n = t.doc;
        if (r += t.display.viewOffset, 0 > r)
            return J(n.first, 0, !0, -1);
        var i = mn(n, r),
            o = n.first + n.size - 1;
        if (i > o)
            return J(n.first + n.size - 1, fn(n, o).text.length, !0, 1);
        for (0 > e && (e = 0);;) {
            var l = fn(n, i),
                s = te(t, l, i, e, r),
                a = Pr(l),
                u = a && a.find();
            if (!a || !(s.ch > u.from.ch || s.ch == u.from.ch && s.xRel > 0))
                return s;
            i = u.to.line
        }
    }
    function te(t, e, r, n, i) {
        function o(n) {
            var i = q(t, Ue(r, n), "line", e, u);
            return s = !0, l > i.bottom ? i.left - a : l < i.top ? i.left + a : (s = !1, i.left)
        }
        var l = i - vn(t, e),
            s = !1,
            a = 2 * t.display.wrapper.clientWidth,
            u = V(t, e),
            c = yn(e),
            f = e.text.length,
            h = pi(e),
            d = gi(e),
            p = o(h),
            g = s,
            m = o(d),
            v = s;
        if (n > m)
            return J(r, d, v, 1);
        for (;;) {
            if (c ? d == h || d == Ci(e, h, 1) : 1 >= d - h) {
                for (var y = p > n || m - n >= n - p ? h : d, b = n - (y == h ? p : m); To.test(e.text.charAt(y));)
                    ++y;
                var x = J(r, y, y == h ? g : v, 0 > b ? -1 : b ? 1 : 0);
                return x
            }
            var C = Math.ceil(f / 2),
                w = h + C;
            if (c) {
                w = h;
                for (var L = 0; C > L; ++L)
                    w = Ci(e, w, 1)
            }
            var k = o(w);
            k > n ? (d = w, m = k, (v = s) && (m += 1e3), f = C) : (h = w, p = k, g = s, f -= C)
        }
    }
    function ee(t) {
        if (null != t.cachedTextHeight)
            return t.cachedTextHeight;
        if (null == Gi) {
            Gi = ni("pre");
            for (var e = 0; 49 > e; ++e)
                Gi.appendChild(document.createTextNode("x")), Gi.appendChild(ni("br"));
            Gi.appendChild(document.createTextNode("x"))
        }
        oi(t.measure, Gi);
        var r = Gi.offsetHeight / 50;
        return r > 3 && (t.cachedTextHeight = r), ii(t.measure), r || 1
    }
    function re(t) {
        if (null != t.cachedCharWidth)
            return t.cachedCharWidth;
        var e = ni("span", "x"),
            r = ni("pre", [e]);
        oi(t.measure, r);
        var n = e.offsetWidth;
        return n > 2 && (t.cachedCharWidth = n), n || 10
    }
    function ne(t) {
        t.curOp = {
            changes: [],
            forceUpdate: !1,
            updateInput: null,
            userSelChange: null,
            textChanged: null,
            selectionChanged: !1,
            cursorActivity: !1,
            updateMaxLine: !1,
            updateScrollPos: !1,
            id: ++ji
        }, wo++ || (Co = [])
    }
    function ie(t) {
        var e = t.curOp,
            r = t.doc,
            n = t.display;
        if (t.curOp = null, e.updateMaxLine && f(t), n.maxLineChanged && !t.options.lineWrapping && n.maxLine) {
            var i = U(t, n.maxLine);
            n.sizer.style.minWidth = Math.max(0, i + 3 + Lo) + "px", n.maxLineChanged = !1;
            var o = Math.max(0, n.sizer.offsetLeft + n.sizer.offsetWidth - n.scroller.clientWidth);
            o < r.scrollLeft && !e.updateScrollPos && Le(t, Math.min(n.scroller.scrollLeft, o), !0)
        }
        var l,
            s;
        if (e.updateScrollPos)
            l = e.updateScrollPos;
        else if (e.selectionChanged && n.scroller.clientHeight) {
            var a = q(t, r.sel.head);
            l = lr(t, a.left, a.top, a.left, a.bottom)
        }
        (e.changes.length || e.forceUpdate || l && null != l.scrollTop) && (s = b(t, e.changes, l && l.scrollTop, e.forceUpdate), t.display.scroller.offsetHeight && (t.doc.scrollTop = t.display.scroller.scrollTop)), !s && e.selectionChanged && A(t), e.updateScrollPos ? (n.scroller.scrollTop = n.scrollbarV.scrollTop = r.scrollTop = l.scrollTop, n.scroller.scrollLeft = n.scrollbarH.scrollLeft = r.scrollLeft = l.scrollLeft, g(t), e.scrollToPos && ir(t, $e(t.doc, e.scrollToPos), e.scrollToPosMargin)) : l && nr(t), e.selectionChanged && D(t), t.state.focused && e.updateInput && he(t, e.userSelChange);
        var u = e.maybeHiddenMarkers,
            c = e.maybeUnhiddenMarkers;
        if (u)
            for (var h = 0; h < u.length; ++h)
                u[h].lines.length || Rn(u[h], "hide");
        if (c)
            for (var h = 0; h < c.length; ++h)
                c[h].lines.length && Rn(c[h], "unhide");
        var d;
        if (--wo || (d = Co, Co = null), e.textChanged && Rn(t, "change", t, e.textChanged), e.cursorActivity && Rn(t, "cursorActivity", t), d)
            for (var h = 0; h < d.length; ++h)
                d[h]()
    }
    function oe(t, e) {
        return function() {
            var r = t || this,
                n = !r.curOp;
            n && ne(r);
            try {
                var i = e.apply(r, arguments)
            } finally {
                n && ie(r)
            }
            return i
        }
    }
    function le(t) {
        return function() {
            var e,
                r = this.cm && !this.cm.curOp;
            r && ne(this.cm);
            try {
                e = t.apply(this, arguments)
            } finally {
                r && ie(this.cm)
            }
            return e
        }
    }
    function se(t, e) {
        var r,
            n = !t.curOp;
        n && ne(t);
        try {
            r = e()
        } finally {
            n && ie(t)
        }
        return r
    }
    function ae(t, e, r, n) {
        null == e && (e = t.doc.first), null == r && (r = t.doc.first + t.doc.size), t.curOp.changes.push({
            from: e,
            to: r,
            diff: n
        })
    }
    function ue(t) {
        t.display.pollingFast || t.display.poll.set(t.options.pollInterval, function() {
            fe(t), t.state.focused && ue(t)
        })
    }
    function ce(t) {
        function e() {
            var n = fe(t);
            n || r ? (t.display.pollingFast = !1, ue(t)) : (r = !0, t.display.poll.set(60, e))
        }
        var r = !1;
        t.display.pollingFast = !0, t.display.poll.set(20, e)
    }
    function fe(t) {
        var e = t.display.input,
            r = t.display.prevInput,
            n = t.doc,
            i = n.sel;
        if (!t.state.focused || Wo(e) || pe(t) || t.state.disableInput)
            return !1;
        t.state.pasteIncoming && t.state.fakedLastChar && (e.value = e.value.substring(0, e.value.length - 1), t.state.fakedLastChar = !1);
        var o = e.value;
        if (o == r && Xe(i.from, i.to))
            return !1;
        if (ki && !Mi && t.display.inputHasSelection === o)
            return he(t, !0), !1;
        var l = !t.curOp;
        l && ne(t), i.shift = !1;
        for (var s = 0, a = Math.min(r.length, o.length); a > s && r.charCodeAt(s) == o.charCodeAt(s);)
            ++s;
        var u = i.from,
            c = i.to;
        s < r.length ? u = Ue(u.line, u.ch - (r.length - s)) : t.state.overwrite && Xe(u, c) && !t.state.pasteIncoming && (c = Ue(c.line, Math.min(fn(n, c.line).text.length, c.ch + (o.length - s))));
        var f = t.curOp.updateInput,
            h = {
                from: u,
                to: c,
                text: Do(o.slice(s)),
                origin: t.state.pasteIncoming ? "paste" : "+input"
            };
        return Pe(t.doc, h, "end"), t.curOp.updateInput = f, Bn(t, "inputRead", t, h), o.length > 1e3 || o.indexOf("\n") > -1 ? e.value = t.display.prevInput = "" : t.display.prevInput = o, l && ie(t), t.state.pasteIncoming = !1, !0
    }
    function he(t, e) {
        var r,
            n,
            i = t.doc;
        if (Xe(i.sel.from, i.sel.to))
            e && (t.display.prevInput = t.display.input.value = "", ki && !Mi && (t.display.inputHasSelection = null));
        else {
            t.display.prevInput = "", r = Oo && (i.sel.to.line - i.sel.from.line > 100 || (n = t.getSelection()).length > 1e3);
            var o = r ? "-" : n || t.getSelection();
            t.display.input.value = o, t.state.focused && $n(t.display.input), ki && !Mi && (t.display.inputHasSelection = o)
        }
        t.display.inaccurateSelection = r
    }
    function de(t) {
        "nocursor" == t.options.readOnly || Pi && document.activeElement == t.display.input || t.display.input.focus()
    }
    function pe(t) {
        return t.options.readOnly || t.doc.cantEdit
    }
    function ge(t) {
        function e() {
            t.state.focused && setTimeout(ti(de, t), 0)
        }
        function r() {
            null == s && (s = setTimeout(function() {
                s = null, l.cachedCharWidth = l.cachedTextHeight = No = null, X(t), se(t, ti(ae, t))
            }, 100))
        }
        function n() {
            for (var t = l.wrapper.parentNode; t && t != document.body; t = t.parentNode)
                ;
            t ? setTimeout(n, 5e3) : Fn(window, "resize", r)
        }
        function i(e) {
            Gn(t, e) || t.options.onDragEvent && t.options.onDragEvent(t, Hn(e)) || En(e)
        }
        function o() {
            l.inaccurateSelection && (l.prevInput = "", l.inaccurateSelection = !1, l.input.value = t.getSelection(), $n(l.input))
        }
        var l = t.display;
        Pn(l.scroller, "mousedown", oe(t, ye)), ki ? Pn(l.scroller, "dblclick", oe(t, function(e) {
            if (!Gn(t, e)) {
                var r = ve(t, e);
                if (r && !be(t, e) && !me(t.display, e)) {
                    Dn(e);
                    var n = dr(fn(t.doc, r.line).text, r);
                    Je(t.doc, n.from, n.to)
                }
            }
        })) : Pn(l.scroller, "dblclick", function(e) {
            Gn(t, e) || Dn(e)
        }), Pn(l.lineSpace, "selectstart", function(t) {
            me(l, t) || Dn(t)
        }), Xi || Pn(l.scroller, "contextmenu", function(e) {
            Oe(t, e)
        }), Pn(l.scroller, "scroll", function() {
            l.scroller.clientHeight && (we(t, l.scroller.scrollTop), Le(t, l.scroller.scrollLeft, !0), Rn(t, "scroll", t))
        }), Pn(l.scrollbarV, "scroll", function() {
            l.scroller.clientHeight && we(t, l.scrollbarV.scrollTop)
        }), Pn(l.scrollbarH, "scroll", function() {
            l.scroller.clientHeight && Le(t, l.scrollbarH.scrollLeft)
        }), Pn(l.scroller, "mousewheel", function(e) {
            ke(t, e)
        }), Pn(l.scroller, "DOMMouseScroll", function(e) {
            ke(t, e)
        }), Pn(l.scrollbarH, "mousedown", e), Pn(l.scrollbarV, "mousedown", e), Pn(l.wrapper, "scroll", function() {
            l.wrapper.scrollTop = l.wrapper.scrollLeft = 0
        });
        var s;
        Pn(window, "resize", r), setTimeout(n, 5e3), Pn(l.input, "keyup", oe(t, function(e) {
            Gn(t, e) || t.options.onKeyEvent && t.options.onKeyEvent(t, Hn(e)) || 16 == e.keyCode && (t.doc.sel.shift = !1)
        })), Pn(l.input, "input", ti(ce, t)), Pn(l.input, "keydown", oe(t, Ne)), Pn(l.input, "keypress", oe(t, He)), Pn(l.input, "focus", ti(De, t)), Pn(l.input, "blur", ti(We, t)), t.options.dragDrop && (Pn(l.scroller, "dragstart", function(e) {
            Ce(t, e)
        }), Pn(l.scroller, "dragenter", i), Pn(l.scroller, "dragover", i), Pn(l.scroller, "drop", oe(t, xe))), Pn(l.scroller, "paste", function(e) {
            me(l, e) || (de(t), ce(t))
        }), Pn(l.input, "paste", function() {
            if (Ti && !t.state.fakedLastChar && !(new Date - t.state.lastMiddleDown < 200)) {
                var e = l.input.selectionStart,
                    r = l.input.selectionEnd;
                l.input.value += "$", l.input.selectionStart = e, l.input.selectionEnd = r, t.state.fakedLastChar = !0
            }
            t.state.pasteIncoming = !0, ce(t)
        }), Pn(l.input, "cut", o), Pn(l.input, "copy", o), Wi && Pn(l.sizer, "mouseup", function() {
            document.activeElement == l.input && l.input.blur(), de(t)
        })
    }
    function me(t, e) {
        for (var r = zn(e); r != t.wrapper; r = r.parentNode)
            if (!r || r.ignoreEvents || r.parentNode == t.sizer && r != t.mover)
                return !0
    }
    function ve(t, e, r) {
        var n = t.display;
        if (!r) {
            var i = zn(e);
            if (i == n.scrollbarH || i == n.scrollbarH.firstChild || i == n.scrollbarV || i == n.scrollbarV.firstChild || i == n.scrollbarFiller || i == n.gutterFiller)
                return null
        }
        var o,
            l,
            s = si(n.lineSpace);
        try {
            o = e.clientX, l = e.clientY
        } catch (e) {
            return null
        }
        return Q(t, o - s.left, l - s.top)
    }
    function ye(t) {
        function e(t) {
            if (!Xe(v, t)) {
                if (v = t, "single" == c)
                    return Je(i.doc, $e(l, a), t), void 0;
                if (g = $e(l, g), m = $e(l, m), "double" == c) {
                    var e = dr(fn(l, t.line).text, t);
                    _e(t, g) ? Je(i.doc, e.from, m) : Je(i.doc, g, e.to)
                } else
                    "triple" == c && (_e(t, g) ? Je(i.doc, m, $e(l, Ue(t.line, 0))) : Je(i.doc, g, $e(l, Ue(t.line + 1, 0))))
            }
        }
        function r(t) {
            var n = ++b,
                s = ve(i, t, !0);
            if (s)
                if (Xe(s, h)) {
                    var a = t.clientY < y.top ? -20 : t.clientY > y.bottom ? 20 : 0;
                    a && setTimeout(oe(i, function() {
                        b == n && (o.scroller.scrollTop += a, r(t))
                    }), 50)
                } else {
                    i.state.focused || De(i), h = s, e(s);
                    var u = p(o, l);
                    (s.line >= u.to || s.line < u.from) && setTimeout(oe(i, function() {
                        b == n && r(t)
                    }), 150)
                }
        }
        function n(t) {
            b = 1 / 0, Dn(t), de(i), Fn(document, "mousemove", x), Fn(document, "mouseup", C)
        }
        if (!Gn(this, t)) {
            var i = this,
                o = i.display,
                l = i.doc,
                s = l.sel;
            if (s.shift = t.shiftKey, me(o, t))
                return Ti || (o.scroller.draggable = !1, setTimeout(function() {
                    o.scroller.draggable = !0
                }, 100)), void 0;
            if (!be(i, t)) {
                var a = ve(i, t);
                switch (In(t)) {
                case 3:
                    return Xi && Oe.call(i, i, t), void 0;
                case 2:
                    return Ti && (i.state.lastMiddleDown = +new Date), a && Je(i.doc, a), setTimeout(ti(de, i), 20), Dn(t), void 0
                }
                if (!a)
                    return zn(t) == o.scroller && Dn(t), void 0;
                i.state.focused || De(i);
                var u = +new Date,
                    c = "single";
                if (Ki && Ki.time > u - 400 && Xe(Ki.pos, a))
                    c = "triple", Dn(t), setTimeout(ti(de, i), 20), pr(i, a.line);
                else if (Vi && Vi.time > u - 400 && Xe(Vi.pos, a)) {
                    c = "double", Ki = {
                        time: u,
                        pos: a
                    }, Dn(t);
                    var f = dr(fn(l, a.line).text, a);
                    Je(i.doc, f.from, f.to)
                } else
                    Vi = {
                        time: u,
                        pos: a
                    };
                var h = a;
                if (i.options.dragDrop && Ao && !pe(i) && !Xe(s.from, s.to) && !_e(a, s.from) && !_e(s.to, a) && "single" == c) {
                    var d = oe(i, function(e) {
                        Ti && (o.scroller.draggable = !1), i.state.draggingText = !1, Fn(document, "mouseup", d), Fn(o.scroller, "drop", d), Math.abs(t.clientX - e.clientX) + Math.abs(t.clientY - e.clientY) < 10 && (Dn(e), Je(i.doc, a), de(i))
                    });
                    return Ti && (o.scroller.draggable = !0), i.state.draggingText = d, o.scroller.dragDrop && o.scroller.dragDrop(), Pn(document, "mouseup", d), Pn(o.scroller, "drop", d), void 0
                }
                Dn(t), "single" == c && Je(i.doc, $e(l, a));
                var g = s.from,
                    m = s.to,
                    v = a,
                    y = si(o.wrapper),
                    b = 0,
                    x = oe(i, function(t) {
                        ki || In(t) ? r(t) : n(t)
                    }),
                    C = oe(i, n);
                Pn(document, "mousemove", x), Pn(document, "mouseup", C)
            }
        }
    }
    function be(t, e) {
        var r = t.display;
        try {
            var n = e.clientX,
                i = e.clientY
        } catch (e) {
            return !1
        }
        if (n >= Math.floor(si(r.gutters).right))
            return !1;
        if (Dn(e), !Kn(t, "gutterClick"))
            return !0;
        var o = si(r.lineDiv);
        if (i > o.bottom)
            return !0;
        i -= o.top - r.viewOffset;
        for (var l = 0; l < t.options.gutters.length; ++l) {
            var s = r.gutters.childNodes[l];
            if (s && si(s).right >= n) {
                var a = mn(t.doc, i),
                    u = t.options.gutters[l];
                Bn(t, "gutterClick", t, a, u, e);
                break
            }
        }
        return !0
    }
    function xe(t) {
        var e = this;
        if (!(Gn(e, t) || me(e.display, t) || e.options.onDragEvent && e.options.onDragEvent(e, Hn(t)))) {
            Dn(t), ki && ($i = +new Date);
            var r = ve(e, t, !0),
                n = t.dataTransfer.files;
            if (r && !pe(e))
                if (n && n.length && window.FileReader && window.File)
                    for (var i = n.length, o = Array(i), l = 0, s = function(t, n) {
                            var s = new FileReader;
                            s.onload = function() {
                                o[n] = s.result, ++l == i && (r = $e(e.doc, r), Pe(e.doc, {
                                    from: r,
                                    to: r,
                                    text: Do(o.join("\n")),
                                    origin: "paste"
                                }, "around"))
                            }, s.readAsText(t)
                        }, a = 0; i > a; ++a)
                        s(n[a], a);
                else {
                    if (e.state.draggingText && !_e(r, e.doc.sel.from) && !_e(e.doc.sel.to, r))
                        return e.state.draggingText(t), setTimeout(ti(de, e), 20), void 0;
                    try {
                        var o = t.dataTransfer.getData("Text");
                        if (o) {
                            var u = e.doc.sel.from,
                                c = e.doc.sel.to;
                            tr(e.doc, r, r), e.state.draggingText && Ke(e.doc, "", u, c, "paste"), e.replaceSelection(o, null, "paste"), de(e), De(e)
                        }
                    } catch (t) {}
                }
        }
    }
    function Ce(t, e) {
        if (ki && (!t.state.draggingText || +new Date - $i < 100))
            return En(e), void 0;
        if (!Gn(t, e) && !me(t.display, e)) {
            var r = t.getSelection();
            if (e.dataTransfer.setData("Text", r), e.dataTransfer.setDragImage && !Di) {
                var n = ni("img", null, null, "position: fixed; left: 0; top: 0;");
                Hi && (n.width = n.height = 1, t.display.wrapper.appendChild(n), n._top = n.offsetTop), e.dataTransfer.setDragImage(n, 0, 0), Hi && n.parentNode.removeChild(n)
            }
        }
    }
    function we(t, e) {
        Math.abs(t.doc.scrollTop - e) < 2 || (t.doc.scrollTop = e, Li || b(t, [], e), t.display.scroller.scrollTop != e && (t.display.scroller.scrollTop = e), t.display.scrollbarV.scrollTop != e && (t.display.scrollbarV.scrollTop = e), Li && b(t, []), W(t, 100))
    }
    function Le(t, e, r) {
        (r ? e == t.doc.scrollLeft : Math.abs(t.doc.scrollLeft - e) < 2) || (e = Math.min(e, t.display.scroller.scrollWidth - t.display.scroller.clientWidth), t.doc.scrollLeft = e, g(t), t.display.scroller.scrollLeft != e && (t.display.scroller.scrollLeft = e), t.display.scrollbarH.scrollLeft != e && (t.display.scrollbarH.scrollLeft = e))
    }
    function ke(t, e) {
        var r = e.wheelDeltaX,
            n = e.wheelDeltaY;
        null == r && e.detail && e.axis == e.HORIZONTAL_AXIS && (r = e.detail), null == n && e.detail && e.axis == e.VERTICAL_AXIS ? n = e.detail : null == n && (n = e.wheelDelta);
        var i = t.display,
            o = i.scroller;
        if (r && o.scrollWidth > o.clientWidth || n && o.scrollHeight > o.clientHeight) {
            if (n && Fi && Ti)
                for (var l = e.target; l != o; l = l.parentNode)
                    if (l.lineObj) {
                        t.display.currentWheelTarget = l;
                        break
                    }
            if (r && !Li && !Hi && null != qi)
                return n && we(t, Math.max(0, Math.min(o.scrollTop + n * qi, o.scrollHeight - o.clientHeight))), Le(t, Math.max(0, Math.min(o.scrollLeft + r * qi, o.scrollWidth - o.clientWidth))), Dn(e), i.wheelStartX = null, void 0;
            if (n && null != qi) {
                var s = n * qi,
                    a = t.doc.scrollTop,
                    u = a + i.wrapper.clientHeight;
                0 > s ? a = Math.max(0, a + s - 50) : u = Math.min(t.doc.height, u + s + 50), b(t, [], {
                    top: a,
                    bottom: u
                })
            }
            20 > Zi && (null == i.wheelStartX ? (i.wheelStartX = o.scrollLeft, i.wheelStartY = o.scrollTop, i.wheelDX = r, i.wheelDY = n, setTimeout(function() {
                if (null != i.wheelStartX) {
                    var t = o.scrollLeft - i.wheelStartX,
                        e = o.scrollTop - i.wheelStartY,
                        r = e && i.wheelDY && e / i.wheelDY || t && i.wheelDX && t / i.wheelDX;
                    i.wheelStartX = i.wheelStartY = null, r && (qi = (qi * Zi + r) / (Zi + 1), ++Zi)
                }
            }, 200)) : (i.wheelDX += r, i.wheelDY += n))
        }
    }
    function Se(t, e, r) {
        if ("string" == typeof e && (e = co[e], !e))
            return !1;
        t.display.pollingFast && fe(t) && (t.display.pollingFast = !1);
        var n = t.doc,
            i = n.sel.shift,
            o = !1;
        try {
            pe(t) && (t.state.suppressEdits = !0), r && (n.sel.shift = !1), o = e(t) != ko
        } finally {
            n.sel.shift = i, t.state.suppressEdits = !1
        }
        return o
    }
    function Me(t) {
        var e = t.state.keyMaps.slice(0);
        return t.options.extraKeys && e.push(t.options.extraKeys), e.push(t.options.keyMap), e
    }
    function Te(t, e) {
        var r = yr(t.options.keyMap),
            n = r.auto;
        clearTimeout(Ji), n && !xr(e) && (Ji = setTimeout(function() {
            yr(t.options.keyMap) == r && (t.options.keyMap = n.call ? n.call(null, t) : n, l(t))
        }, 50));
        var i = Cr(e, !0),
            o = !1;
        if (!i)
            return !1;
        var s = Me(t);
        return o = e.shiftKey ? br("Shift-" + i, s, function(e) {
            return Se(t, e, !0)
        }) || br(i, s, function(e) {
            return ("string" == typeof e ? /^go[A-Z]/.test(e) : e.motion) ? Se(t, e) : void 0
        }) : br(i, s, function(e) {
            return Se(t, e)
        }), o && (Dn(e), D(t), Mi && (e.oldKeyCode = e.keyCode, e.keyCode = 0), Bn(t, "keyHandled", t, i, e)), o
    }
    function Ae(t, e, r) {
        var n = br("'" + r + "'", Me(t), function(e) {
            return Se(t, e, !0)
        });
        return n && (Dn(e), D(t), Bn(t, "keyHandled", t, "'" + r + "'", e)), n
    }
    function Ne(t) {
        var e = this;
        if (e.state.focused || De(e), !(Gn(e, t) || e.options.onKeyEvent && e.options.onKeyEvent(e, Hn(t)))) {
            ki && 27 == t.keyCode && (t.returnValue = !1);
            var r = t.keyCode;
            e.doc.sel.shift = 16 == r || t.shiftKey;
            var n = Te(e, t);
            Hi && (to = n ? r : null, !n && 88 == r && !Oo && (Fi ? t.metaKey : t.ctrlKey) && e.replaceSelection(""))
        }
    }
    function He(t) {
        var e = this;
        if (!(Gn(e, t) || e.options.onKeyEvent && e.options.onKeyEvent(e, Hn(t)))) {
            var r = t.keyCode,
                n = t.charCode;
            if (Hi && r == to)
                return to = null, Dn(t), void 0;
            if (!(Hi && (!t.which || t.which < 10) || Wi) || !Te(e, t)) {
                var i = String.fromCharCode(null == n ? r : n);
                this.options.electricChars && this.doc.mode.electricChars && this.options.smartIndent && !pe(this) && this.doc.mode.electricChars.indexOf(i) > -1 && setTimeout(oe(e, function() {
                    ur(e, e.doc.sel.to.line, "smart")
                }), 75), Ae(e, t, i) || (ki && !Mi && (e.display.inputHasSelection = null), ce(e))
            }
        }
    }
    function De(t) {
        "nocursor" != t.options.readOnly && (t.state.focused || (Rn(t, "focus", t), t.state.focused = !0, -1 == t.display.wrapper.className.search(/\bCodeMirror-focused\b/) && (t.display.wrapper.className += " CodeMirror-focused"), t.curOp || (he(t, !0), Ti && setTimeout(ti(he, t, !0), 0))), ue(t), D(t))
    }
    function We(t) {
        t.state.focused && (Rn(t, "blur", t), t.state.focused = !1, t.display.wrapper.className = t.display.wrapper.className.replace(" CodeMirror-focused", "")), clearInterval(t.display.blinker), setTimeout(function() {
            t.state.focused || (t.doc.sel.shift = !1)
        }, 150)
    }
    function Oe(t, e) {
        function r() {
            if (null != i.input.selectionStart) {
                var t = i.input.value = " " + (Xe(o.from, o.to) ? "" : i.input.value);
                i.prevInput = " ", i.input.selectionStart = 1, i.input.selectionEnd = t.length
            }
        }
        function n() {
            if (i.inputDiv.style.position = "relative", i.input.style.cssText = a, Mi && (i.scrollbarV.scrollTop = i.scroller.scrollTop = s), ue(t), null != i.input.selectionStart) {
                (!ki || Mi) && r(), clearTimeout(Qi);
                var e = 0,
                    n = function() {
                        " " == i.prevInput && 0 == i.input.selectionStart ? oe(t, co.selectAll)(t) : e++ < 10 ? Qi = setTimeout(n, 500) : he(t)
                    };
                Qi = setTimeout(n, 200)
            }
        }
        if (!Gn(t, e, "contextmenu")) {
            var i = t.display,
                o = t.doc.sel;
            if (!me(i, e)) {
                var l = ve(t, e),
                    s = i.scroller.scrollTop;
                if (l && !Hi) {
                    (Xe(o.from, o.to) || _e(l, o.from) || !_e(l, o.to)) && oe(t, tr)(t.doc, l, l);
                    var a = i.input.style.cssText;
                    if (i.inputDiv.style.position = "absolute", i.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (e.clientY - 5) + "px; left: " + (e.clientX - 5) + "px; z-index: 1000; background: white; outline: none;" + "border-width: 0; outline: none; overflow: hidden; opacity: .05; -ms-opacity: .05; filter: alpha(opacity=5);", de(t), he(t, !0), Xe(o.from, o.to) && (i.input.value = i.prevInput = " "), ki && !Mi && r(), Xi) {
                        En(e);
                        var u = function() {
                            Fn(window, "mouseup", u), setTimeout(n, 20)
                        };
                        Pn(window, "mouseup", u)
                    } else
                        setTimeout(n, 50)
                }
            }
        }
    }
    function Ee(t, e, r) {
        if (!_e(e.from, r))
            return $e(t, r);
        var n = e.text.length - 1 - (e.to.line - e.from.line);
        if (r.line > e.to.line + n) {
            var i = r.line - n,
                o = t.first + t.size - 1;
            return i > o ? Ue(o, fn(t, o).text.length) : Ze(r, fn(t, i).text.length)
        }
        if (r.line == e.to.line + n)
            return Ze(r, jn(e.text).length + (1 == e.text.length ? e.from.ch : 0) + fn(t, e.to.line).text.length - e.to.ch);
        var l = r.line - e.from.line;
        return Ze(r, e.text[l].length + (l ? 0 : e.from.ch))
    }
    function ze(t, e, r) {
        if (r && "object" == typeof r)
            return {
                anchor: Ee(t, e, r.anchor),
                head: Ee(t, e, r.head)
            };
        if ("start" == r)
            return {
                anchor: e.from,
                head: e.from
            };
        var n = eo(e);
        if ("around" == r)
            return {
                anchor: e.from,
                head: n
            };
        if ("end" == r)
            return {
                anchor: n,
                head: n
            };
        var i = function(t) {
            if (_e(t, e.from))
                return t;
            if (!_e(e.to, t))
                return n;
            var r = t.line + e.text.length - (e.to.line - e.from.line) - 1,
                i = t.ch;
            return t.line == e.to.line && (i += n.ch - e.to.ch), Ue(r, i)
        };
        return {
            anchor: i(t.sel.anchor),
            head: i(t.sel.head)
        }
    }
    function Ie(t, e, r) {
        var n = {
            canceled: !1,
            from: e.from,
            to: e.to,
            text: e.text,
            origin: e.origin,
            cancel: function() {
                this.canceled = !0
            }
        };
        return r && (n.update = function(e, r, n, i) {
            e && (this.from = $e(t, e)), r && (this.to = $e(t, r)), n && (this.text = n), void 0 !== i && (this.origin = i)
        }), Rn(t, "beforeChange", t, n), t.cm && Rn(t.cm, "beforeChange", t.cm, n), n.canceled ? null : {
            from: n.from,
            to: n.to,
            text: n.text,
            origin: n.origin
        }
    }
    function Pe(t, e, r, n) {
        if (t.cm) {
            if (!t.cm.curOp)
                return oe(t.cm, Pe)(t, e, r, n);
            if (t.cm.state.suppressEdits)
                return
        }
        if (!(Kn(t, "beforeChange") || t.cm && Kn(t.cm, "beforeChange")) || (e = Ie(t, e, !0))) {
            var i = _i && !n && Er(t, e.from, e.to);
            if (i) {
                for (var o = i.length - 1; o >= 1; --o)
                    Fe(t, {
                        from: i[o].from,
                        to: i[o].to,
                        text: [""]
                    });
                i.length && Fe(t, {
                    from: i[0].from,
                    to: i[0].to,
                    text: e.text
                }, r)
            } else
                Fe(t, e, r)
        }
    }
    function Fe(t, e, r) {
        var n = ze(t, e, r);
        wn(t, e, n, t.cm ? t.cm.curOp.id : 0 / 0), Ge(t, e, n, Wr(t, e));
        var i = [];
        un(t, function(t, r) {
            r || -1 != Zn(i, t.history) || (An(t.history, e), i.push(t.history)), Ge(t, e, null, Wr(t, e))
        })
    }
    function Re(t, e) {
        if (!t.cm || !t.cm.state.suppressEdits) {
            var r = t.history,
                n = ("undo" == e ? r.done : r.undone).pop();
            if (n) {
                var i = {
                    changes: [],
                    anchorBefore: n.anchorAfter,
                    headBefore: n.headAfter,
                    anchorAfter: n.anchorBefore,
                    headAfter: n.headBefore,
                    generation: r.generation
                };
                ("undo" == e ? r.undone : r.done).push(i), r.generation = n.generation || ++r.maxGeneration;
                for (var o = Kn(t, "beforeChange") || t.cm && Kn(t.cm, "beforeChange"), l = n.changes.length - 1; l >= 0; --l) {
                    var s = n.changes[l];
                    if (s.origin = e, o && !Ie(t, s, !1))
                        return ("undo" == e ? r.done : r.undone).length = 0, void 0;
                    i.changes.push(Cn(t, s));
                    var a = l ? ze(t, s, null) : {
                        anchor: n.anchorBefore,
                        head: n.headBefore
                    };
                    Ge(t, s, a, Or(t, s));
                    var u = [];
                    un(t, function(t, e) {
                        e || -1 != Zn(u, t.history) || (An(t.history, s), u.push(t.history)), Ge(t, s, null, Or(t, s))
                    })
                }
            }
        }
    }
    function Be(t, e) {
        function r(t) {
            return Ue(t.line + e, t.ch)
        }
        t.first += e, t.cm && ae(t.cm, t.first, t.first, e), t.sel.head = r(t.sel.head), t.sel.anchor = r(t.sel.anchor), t.sel.from = r(t.sel.from), t.sel.to = r(t.sel.to)
    }
    function Ge(t, e, r, n) {
        if (t.cm && !t.cm.curOp)
            return oe(t.cm, Ge)(t, e, r, n);
        if (e.to.line < t.first)
            return Be(t, e.text.length - 1 - (e.to.line - e.from.line)), void 0;
        if (!(e.from.line > t.lastLine())) {
            if (e.from.line < t.first) {
                var i = e.text.length - 1 - (t.first - e.from.line);
                Be(t, i), e = {
                    from: Ue(t.first, 0),
                    to: Ue(e.to.line + i, e.to.ch),
                    text: [jn(e.text)],
                    origin: e.origin
                }
            }
            var o = t.lastLine();
            e.to.line > o && (e = {
                from: e.from,
                to: Ue(o, fn(t, o).text.length),
                text: [e.text[0]],
                origin: e.origin
            }), e.removed = hn(t, e.from, e.to), r || (r = ze(t, e, null)), t.cm ? Ve(t.cm, e, n, r) : ln(t, e, n, r)
        }
    }
    function Ve(t, e, r, n) {
        var o = t.doc,
            l = t.display,
            s = e.from,
            a = e.to,
            u = !1,
            f = s.line;
        t.options.lineWrapping || (f = gn(Fr(o, fn(o, s.line))), o.iter(f, a.line + 1, function(t) {
            return t == l.maxLine ? (u = !0, !0) : void 0
        })), _e(o.sel.head, e.from) || _e(e.to, o.sel.head) || (t.curOp.cursorActivity = !0), ln(o, e, r, n, i(t)), t.options.lineWrapping || (o.iter(f, s.line + e.text.length, function(t) {
            var e = c(o, t);
            e > l.maxLineLength && (l.maxLine = t, l.maxLineLength = e, l.maxLineChanged = !0, u = !1)
        }), u && (t.curOp.updateMaxLine = !0)), o.frontier = Math.min(o.frontier, s.line), W(t, 400);
        var h = e.text.length - (a.line - s.line) - 1;
        if (ae(t, s.line, a.line + 1, h), Kn(t, "change")) {
            var d = {
                from: s,
                to: a,
                text: e.text,
                removed: e.removed,
                origin: e.origin
            };
            if (t.curOp.textChanged) {
                for (var p = t.curOp.textChanged; p.next; p = p.next)
                    ;
                p.next = d
            } else
                t.curOp.textChanged = d
        }
    }
    function Ke(t, e, r, n, i) {
        if (n || (n = r), _e(n, r)) {
            var o = n;
            n = r, r = o
        }
        "string" == typeof e && (e = Do(e)), Pe(t, {
            from: r,
            to: n,
            text: e,
            origin: i
        }, null)
    }
    function Ue(t, e) {
        return this instanceof Ue ? (this.line = t, this.ch = e, void 0) : new Ue(t, e)
    }
    function Xe(t, e) {
        return t.line == e.line && t.ch == e.ch
    }
    function _e(t, e) {
        return t.line < e.line || t.line == e.line && t.ch < e.ch
    }
    function Ye(t) {
        return Ue(t.line, t.ch)
    }
    function je(t, e) {
        return Math.max(t.first, Math.min(e, t.first + t.size - 1))
    }
    function $e(t, e) {
        if (e.line < t.first)
            return Ue(t.first, 0);
        var r = t.first + t.size - 1;
        return e.line > r ? Ue(r, fn(t, r).text.length) : Ze(e, fn(t, e.line).text.length)
    }
    function Ze(t, e) {
        var r = t.ch;
        return null == r || r > e ? Ue(t.line, e) : 0 > r ? Ue(t.line, 0) : t
    }
    function qe(t, e) {
        return e >= t.first && e < t.first + t.size
    }
    function Je(t, e, r, n) {
        if (t.sel.shift || t.sel.extend) {
            var i = t.sel.anchor;
            if (r) {
                var o = _e(e, i);
                o != _e(r, i) ? (i = e, e = r) : o != _e(e, r) && (e = r)
            }
            tr(t, i, e, n)
        } else
            tr(t, e, r || e, n);
        t.cm && (t.cm.curOp.userSelChange = !0)
    }
    function Qe(t, e, r) {
        var n = {
            anchor: e,
            head: r
        };
        return Rn(t, "beforeSelectionChange", t, n), t.cm && Rn(t.cm, "beforeSelectionChange", t.cm, n), n.anchor = $e(t, n.anchor), n.head = $e(t, n.head), n
    }
    function tr(t, e, r, n, i) {
        if (!i && Kn(t, "beforeSelectionChange") || t.cm && Kn(t.cm, "beforeSelectionChange")) {
            var o = Qe(t, e, r);
            r = o.head, e = o.anchor
        }
        var l = t.sel;
        if (l.goalColumn = null, (i || !Xe(e, l.anchor)) && (e = rr(t, e, n, "push" != i)), (i || !Xe(r, l.head)) && (r = rr(t, r, n, "push" != i)), !Xe(l.anchor, e) || !Xe(l.head, r)) {
            l.anchor = e, l.head = r;
            var s = _e(r, e);
            l.from = s ? r : e, l.to = s ? e : r, t.cm && (t.cm.curOp.updateInput = t.cm.curOp.selectionChanged = t.cm.curOp.cursorActivity = !0), Bn(t, "cursorActivity", t)
        }
    }
    function er(t) {
        tr(t.doc, t.doc.sel.from, t.doc.sel.to, null, "push")
    }
    function rr(t, e, r, n) {
        var i = !1,
            o = e,
            l = r || 1;
        t.cantEdit = !1;
        t:
        for (;;) {
            var s = fn(t, o.line);
            if (s.markedSpans)
                for (var a = 0; a < s.markedSpans.length; ++a) {
                    var u = s.markedSpans[a],
                        c = u.marker;
                    if ((null == u.from || (c.inclusiveLeft ? u.from <= o.ch : u.from < o.ch)) && (null == u.to || (c.inclusiveRight ? u.to >= o.ch : u.to > o.ch))) {
                        if (n && (Rn(c, "beforeCursorEnter"), c.explicitlyCleared)) {
                            if (s.markedSpans) {
                                --a;
                                continue
                            }
                            break
                        }
                        if (!c.atomic)
                            continue;
                        var f = c.find()[0 > l ? "from" : "to"];
                        if (Xe(f, o) && (f.ch += l, f.ch < 0 ? f = f.line > t.first ? $e(t, Ue(f.line - 1)) : null : f.ch > s.text.length && (f = f.line < t.first + t.size - 1 ? Ue(f.line + 1, 0) : null), !f)) {
                            if (i)
                                return n ? (t.cantEdit = !0, Ue(t.first, 0)) : rr(t, e, r, !0);
                            i = !0, f = e, l = -l
                        }
                        o = f;
                        continue t
                    }
                }
            return o
        }
    }
    function nr(t) {
        var e = ir(t, t.doc.sel.head, t.options.cursorScrollMargin);
        if (t.state.focused) {
            var r = t.display,
                n = si(r.sizer),
                i = null;
            if (e.top + n.top < 0 ? i = !0 : e.bottom + n.top > (window.innerHeight || document.documentElement.clientHeight) && (i = !1), null != i && !zi) {
                var o = "none" == r.cursor.style.display;
                o && (r.cursor.style.display = "", r.cursor.style.left = e.left + "px", r.cursor.style.top = e.top - r.viewOffset + "px"), r.cursor.scrollIntoView(i), o && (r.cursor.style.display = "none")
            }
        }
    }
    function ir(t, e, r) {
        for (null == r && (r = 0);;) {
            var n = !1,
                i = q(t, e),
                o = lr(t, i.left, i.top - r, i.left, i.bottom + r),
                l = t.doc.scrollTop,
                s = t.doc.scrollLeft;
            if (null != o.scrollTop && (we(t, o.scrollTop), Math.abs(t.doc.scrollTop - l) > 1 && (n = !0)), null != o.scrollLeft && (Le(t, o.scrollLeft), Math.abs(t.doc.scrollLeft - s) > 1 && (n = !0)), !n)
                return i
        }
    }
    function or(t, e, r, n, i) {
        var o = lr(t, e, r, n, i);
        null != o.scrollTop && we(t, o.scrollTop), null != o.scrollLeft && Le(t, o.scrollLeft)
    }
    function lr(t, e, r, n, i) {
        var o = t.display,
            l = ee(t.display);
        0 > r && (r = 0);
        var s = o.scroller.clientHeight - Lo,
            a = o.scroller.scrollTop,
            u = {},
            c = t.doc.height + P(o),
            f = l > r,
            h = i > c - l;
        if (a > r)
            u.scrollTop = f ? 0 : r;
        else if (i > a + s) {
            var d = Math.min(r, (h ? c : i) - s);
            d != a && (u.scrollTop = d)
        }
        var p = o.scroller.clientWidth - Lo,
            g = o.scroller.scrollLeft;
        e += o.gutters.offsetWidth, n += o.gutters.offsetWidth;
        var m = o.gutters.offsetWidth,
            v = m + 10 > e;
        return g + m > e || v ? (v && (e = 0), u.scrollLeft = Math.max(0, e - 10 - m)) : n > p + g - 3 && (u.scrollLeft = n + 10 - p), u
    }
    function sr(t, e, r) {
        t.curOp.updateScrollPos = {
            scrollLeft: null == e ? t.doc.scrollLeft : e,
            scrollTop: null == r ? t.doc.scrollTop : r
        }
    }
    function ar(t, e, r) {
        var n = t.curOp.updateScrollPos || (t.curOp.updateScrollPos = {
                scrollLeft: t.doc.scrollLeft,
                scrollTop: t.doc.scrollTop
            }),
            i = t.display.scroller;
        n.scrollTop = Math.max(0, Math.min(i.scrollHeight - i.clientHeight, n.scrollTop + r)), n.scrollLeft = Math.max(0, Math.min(i.scrollWidth - i.clientWidth, n.scrollLeft + e))
    }
    function ur(t, e, r, n) {
        var i = t.doc;
        if (null == r && (r = "add"), "smart" == r)
            if (t.doc.mode.indent)
                var o = z(t, e);
            else
                r = "prev";
        var l,
            s = t.options.tabSize,
            a = fn(i, e),
            u = _n(a.text, null, s),
            c = a.text.match(/^\s*/)[0];
        if ("smart" == r && (l = t.doc.mode.indent(o, a.text.slice(c.length), a.text), l == ko)) {
            if (!n)
                return;
            r = "prev"
        }
        "prev" == r ? l = e > i.first ? _n(fn(i, e - 1).text, null, s) : 0 : "add" == r ? l = u + t.options.indentUnit : "subtract" == r ? l = u - t.options.indentUnit : "number" == typeof r && (l = u + r), l = Math.max(0, l);
        var f = "",
            h = 0;
        if (t.options.indentWithTabs)
            for (var d = Math.floor(l / s); d; --d)
                h += s, f += "	";
        l > h && (f += Yn(l - h)), f != c && Ke(t.doc, f, Ue(e, 0), Ue(e, c.length), "+input"), a.stateAfter = null
    }
    function cr(t, e, r) {
        var n = e,
            i = e,
            o = t.doc;
        return "number" == typeof e ? i = fn(o, je(o, e)) : n = gn(e), null == n ? null : r(i, n) ? (ae(t, n, n + 1), i) : null
    }
    function fr(t, e, r, n, i) {
        function o() {
            var e = s + r;
            return e < t.first || e >= t.first + t.size ? f = !1 : (s = e, c = fn(t, e))
        }
        function l(t) {
            var e = (i ? Ci : wi)(c, a, r, !0);
            if (null == e) {
                if (t || !o())
                    return f = !1;
                a = i ? (0 > r ? gi : pi)(c) : 0 > r ? c.text.length : 0
            } else
                a = e;
            return !0
        }
        var s = e.line,
            a = e.ch,
            u = r,
            c = fn(t, s),
            f = !0;
        if ("char" == n)
            l();
        else if ("column" == n)
            l(!0);
        else if ("word" == n || "group" == n)
            for (var h = null, d = "group" == n, p = !0; !(0 > r) || l(!p); p = !1) {
                var g = c.text.charAt(a) || "\n",
                    m = ei(g) ? "w" : d ? /\s/.test(g) ? null : "p" : null;
                if (h && h != m) {
                    0 > r && (r = 1, l());
                    break
                }
                if (m && (h = m), r > 0 && !l(!p))
                    break
            }
        var v = rr(t, Ue(s, a), u, !0);
        return f || (v.hitSide = !0), v
    }
    function hr(t, e, r, n) {
        var i,
            o = t.doc,
            l = e.left;
        if ("page" == n) {
            var s = Math.min(t.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
            i = e.top + r * (s - (0 > r ? 1.5 : .5) * ee(t.display))
        } else
            "line" == n && (i = r > 0 ? e.bottom + 3 : e.top - 3);
        for (;;) {
            var a = Q(t, l, i);
            if (!a.outside)
                break;
            if (0 > r ? 0 >= i : i >= o.height) {
                a.hitSide = !0;
                break
            }
            i += 5 * r
        }
        return a
    }
    function dr(t, e) {
        var r = e.ch,
            n = e.ch;
        if (t) {
            (e.xRel < 0 || n == t.length) && r ? --r : ++n;
            for (var i = t.charAt(r), o = ei(i) ? ei : /\s/.test(i) ? function(t) {
                    return /\s/.test(t)
                } : function(t) {
                    return !/\s/.test(t) && !ei(t)
                }; r > 0 && o(t.charAt(r - 1));)
                --r;
            for (; n < t.length && o(t.charAt(n));)
                ++n
        }
        return {
            from: Ue(e.line, r),
            to: Ue(e.line, n)
        }
    }
    function pr(t, e) {
        Je(t.doc, Ue(e, 0), $e(t.doc, Ue(e + 1, 0)))
    }
    function gr(e, r, n, i) {
        t.defaults[e] = r, n && (ro[e] = i ? function(t, e, r) {
            r != io && n(t, e, r)
        } : n)
    }
    function mr(t, e) {
        if (e === !0)
            return e;
        if (t.copyState)
            return t.copyState(e);
        var r = {};
        for (var n in e) {
            var i = e[n];
            i instanceof Array && (i = i.concat([])), r[n] = i
        }
        return r
    }
    function vr(t, e, r) {
        return t.startState ? t.startState(e, r) : !0
    }
    function yr(t) {
        return "string" == typeof t ? fo[t] : t
    }
    function br(t, e, r) {
        function n(e) {
            e = yr(e);
            var i = e[t];
            if (i === !1)
                return "stop";
            if (null != i && r(i))
                return !0;
            if (e.nofallthrough)
                return "stop";
            var o = e.fallthrough;
            if (null == o)
                return !1;
            if ("[object Array]" != Object.prototype.toString.call(o))
                return n(o);
            for (var l = 0, s = o.length; s > l; ++l) {
                var a = n(o[l]);
                if (a)
                    return a
            }
            return !1
        }
        for (var i = 0; i < e.length; ++i) {
            var o = n(e[i]);
            if (o)
                return "stop" != o
        }
    }
    function xr(t) {
        var e = Eo[t.keyCode];
        return "Ctrl" == e || "Alt" == e || "Shift" == e || "Mod" == e
    }
    function Cr(t, e) {
        if (Hi && 34 == t.keyCode && t["char"])
            return !1;
        var r = Eo[t.keyCode];
        return null == r || t.altGraphKey ? !1 : (t.altKey && (r = "Alt-" + r), (Ui ? t.metaKey : t.ctrlKey) && (r = "Ctrl-" + r), (Ui ? t.ctrlKey : t.metaKey) && (r = "Cmd-" + r), !e && t.shiftKey && (r = "Shift-" + r), r)
    }
    function wr(t, e) {
        this.pos = this.start = 0, this.string = t, this.tabSize = e || 8, this.lastColumnPos = this.lastColumnValue = 0
    }
    function Lr(t, e) {
        this.lines = [], this.type = e, this.doc = t
    }
    function kr(t, e, r, n, i) {
        if (n && n.shared)
            return Mr(t, e, r, n, i);
        if (t.cm && !t.cm.curOp)
            return oe(t.cm, kr)(t, e, r, n, i);
        var o = new Lr(t, i);
        if ("range" == i && !_e(e, r))
            return o;
        n && Jn(n, o), o.replacedWith && (o.collapsed = !0, o.replacedWith = ni("span", [o.replacedWith], "CodeMirror-widget"), n.handleMouseEvents || (o.replacedWith.ignoreEvents = !0)), o.collapsed && (Yi = !0), o.addToHistory && wn(t, {
            from: e,
            to: r,
            origin: "markText"
        }, {
            head: t.sel.head,
            anchor: t.sel.anchor
        }, 0 / 0);
        var l,
            s,
            a,
            u = e.line,
            c = 0,
            f = t.cm;
        if (t.iter(u, r.line + 1, function(n) {
            f && o.collapsed && !f.options.lineWrapping && Fr(t, n) == f.display.maxLine && (a = !0);
            var i = {
                from: null,
                to: null,
                marker: o
            };
            c += n.text.length, u == e.line && (i.from = e.ch, c -= e.ch), u == r.line && (i.to = r.ch, c -= n.text.length - r.ch), o.collapsed && (u == r.line && (s = zr(n, r.ch)), u == e.line ? l = zr(n, e.ch) : pn(n, 0)), Nr(n, i), ++u
        }), o.collapsed && t.iter(e.line, r.line + 1, function(e) {
            Rr(t, e) && pn(e, 0)
        }), o.clearOnEnter && Pn(o, "beforeCursorEnter", function() {
            o.clear()
        }), o.readOnly && (_i = !0, (t.history.done.length || t.history.undone.length) && t.clearHistory()), o.collapsed) {
            if (l != s)
                throw new Error("Inserting collapsed marker overlapping an existing one");
            o.size = c, o.atomic = !0
        }
        return f && (a && (f.curOp.updateMaxLine = !0), (o.className || o.title || o.startStyle || o.endStyle || o.collapsed) && ae(f, e.line, r.line + 1), o.atomic && er(f)), o
    }
    function Sr(t, e) {
        this.markers = t, this.primary = e;
        for (var r = 0, n = this; r < t.length; ++r)
            t[r].parent = this, Pn(t[r], "clear", function() {
                n.clear()
            })
    }
    function Mr(t, e, r, n, i) {
        n = Jn(n), n.shared = !1;
        var o = [kr(t, e, r, n, i)],
            l = o[0],
            s = n.replacedWith;
        return un(t, function(t) {
            s && (n.replacedWith = s.cloneNode(!0)), o.push(kr(t, $e(t, e), $e(t, r), n, i));
            for (var a = 0; a < t.linked.length; ++a)
                if (t.linked[a].isParent)
                    return;
            l = jn(o)
        }), new Sr(o, l)
    }
    function Tr(t, e) {
        if (t)
            for (var r = 0; r < t.length; ++r) {
                var n = t[r];
                if (n.marker == e)
                    return n
            }
    }
    function Ar(t, e) {
        for (var r, n = 0; n < t.length; ++n)
            t[n] != e && (r || (r = [])).push(t[n]);
        return r
    }
    function Nr(t, e) {
        t.markedSpans = t.markedSpans ? t.markedSpans.concat([e]) : [e], e.marker.attachLine(t)
    }
    function Hr(t, e, r) {
        if (t)
            for (var n, i = 0; i < t.length; ++i) {
                var o = t[i],
                    l = o.marker,
                    s = null == o.from || (l.inclusiveLeft ? o.from <= e : o.from < e);
                if (s || "bookmark" == l.type && o.from == e && (!r || !o.marker.insertLeft)) {
                    var a = null == o.to || (l.inclusiveRight ? o.to >= e : o.to > e);
                    (n || (n = [])).push({
                        from: o.from,
                        to: a ? null : o.to,
                        marker: l
                    })
                }
            }
        return n
    }
    function Dr(t, e, r) {
        if (t)
            for (var n, i = 0; i < t.length; ++i) {
                var o = t[i],
                    l = o.marker,
                    s = null == o.to || (l.inclusiveRight ? o.to >= e : o.to > e);
                if (s || "bookmark" == l.type && o.from == e && (!r || o.marker.insertLeft)) {
                    var a = null == o.from || (l.inclusiveLeft ? o.from <= e : o.from < e);
                    (n || (n = [])).push({
                        from: a ? null : o.from - e,
                        to: null == o.to ? null : o.to - e,
                        marker: l
                    })
                }
            }
        return n
    }
    function Wr(t, e) {
        var r = qe(t, e.from.line) && fn(t, e.from.line).markedSpans,
            n = qe(t, e.to.line) && fn(t, e.to.line).markedSpans;
        if (!r && !n)
            return null;
        var i = e.from.ch,
            o = e.to.ch,
            l = Xe(e.from, e.to),
            s = Hr(r, i, l),
            a = Dr(n, o, l),
            u = 1 == e.text.length,
            c = jn(e.text).length + (u ? i : 0);
        if (s)
            for (var f = 0; f < s.length; ++f) {
                var h = s[f];
                if (null == h.to) {
                    var d = Tr(a, h.marker);
                    d ? u && (h.to = null == d.to ? null : d.to + c) : h.to = i
                }
            }
        if (a)
            for (var f = 0; f < a.length; ++f) {
                var h = a[f];
                if (null != h.to && (h.to += c), null == h.from) {
                    var d = Tr(s, h.marker);
                    d || (h.from = c, u && (s || (s = [])).push(h))
                } else
                    h.from += c, u && (s || (s = [])).push(h)
            }
        if (u && s) {
            for (var f = 0; f < s.length; ++f)
                null != s[f].from && s[f].from == s[f].to && "bookmark" != s[f].marker.type && s.splice(f--, 1);
            s.length || (s = null)
        }
        var p = [s];
        if (!u) {
            var g,
                m = e.text.length - 2;
            if (m > 0 && s)
                for (var f = 0; f < s.length; ++f)
                    null == s[f].to && (g || (g = [])).push({
                        from: null,
                        to: null,
                        marker: s[f].marker
                    });
            for (var f = 0; m > f; ++f)
                p.push(g);
            p.push(a)
        }
        return p
    }
    function Or(t, e) {
        var r = kn(t, e),
            n = Wr(t, e);
        if (!r)
            return n;
        if (!n)
            return r;
        for (var i = 0; i < r.length; ++i) {
            var o = r[i],
                l = n[i];
            if (o && l)
                t:
                for (var s = 0; s < l.length; ++s) {
                    for (var a = l[s], u = 0; u < o.length; ++u)
                        if (o[u].marker == a.marker)
                            continue t;
                    o.push(a)
                }
            else
                l && (r[i] = l)
        }
        return r
    }
    function Er(t, e, r) {
        var n = null;
        if (t.iter(e.line, r.line + 1, function(t) {
            if (t.markedSpans)
                for (var e = 0; e < t.markedSpans.length; ++e) {
                    var r = t.markedSpans[e].marker;
                    !r.readOnly || n && -1 != Zn(n, r) || (n || (n = [])).push(r)
                }
        }), !n)
            return null;
        for (var i = [{
                from: e,
                to: r
            }], o = 0; o < n.length; ++o)
            for (var l = n[o], s = l.find(), a = 0; a < i.length; ++a) {
                var u = i[a];
                if (!_e(u.to, s.from) && !_e(s.to, u.from)) {
                    var c = [a, 1];
                    (_e(u.from, s.from) || !l.inclusiveLeft && Xe(u.from, s.from)) && c.push({
                        from: u.from,
                        to: s.from
                    }), (_e(s.to, u.to) || !l.inclusiveRight && Xe(u.to, s.to)) && c.push({
                        from: s.to,
                        to: u.to
                    }), i.splice.apply(i, c), a += c.length - 1
                }
            }
        return i
    }
    function zr(t, e) {
        var r,
            n = Yi && t.markedSpans;
        if (n)
            for (var i, o = 0; o < n.length; ++o)
                i = n[o], i.marker.collapsed && (null == i.from || i.from < e) && (null == i.to || i.to > e) && (!r || r.width < i.marker.width) && (r = i.marker);
        return r
    }
    function Ir(t) {
        return zr(t, -1)
    }
    function Pr(t) {
        return zr(t, t.text.length + 1)
    }
    function Fr(t, e) {
        for (var r; r = Ir(e);)
            e = fn(t, r.find().from.line);
        return e
    }
    function Rr(t, e) {
        var r = Yi && e.markedSpans;
        if (r)
            for (var n, i = 0; i < r.length; ++i)
                if (n = r[i], n.marker.collapsed) {
                    if (null == n.from)
                        return !0;
                    if (!n.marker.replacedWith && 0 == n.from && n.marker.inclusiveLeft && Br(t, e, n))
                        return !0
                }
    }
    function Br(t, e, r) {
        if (null == r.to) {
            var n = r.marker.find().to,
                i = fn(t, n.line);
            return Br(t, i, Tr(i.markedSpans, r.marker))
        }
        if (r.marker.inclusiveRight && r.to == e.text.length)
            return !0;
        for (var o, l = 0; l < e.markedSpans.length; ++l)
            if (o = e.markedSpans[l], o.marker.collapsed && !o.marker.replacedWith && o.from == r.to && (o.marker.inclusiveLeft || r.marker.inclusiveRight) && Br(t, e, o))
                return !0
    }
    function Gr(t) {
        var e = t.markedSpans;
        if (e) {
            for (var r = 0; r < e.length; ++r)
                e[r].marker.detachLine(t);
            t.markedSpans = null
        }
    }
    function Vr(t, e) {
        if (e) {
            for (var r = 0; r < e.length; ++r)
                e[r].marker.attachLine(t);
            t.markedSpans = e
        }
    }
    function Kr(t) {
        return function() {
            var e = !this.cm.curOp;
            e && ne(this.cm);
            try {
                var r = t.apply(this, arguments)
            } finally {
                e && ie(this.cm)
            }
            return r
        }
    }
    function Ur(t) {
        return null != t.height ? t.height : (t.node.parentNode && 1 == t.node.parentNode.nodeType || oi(t.cm.display.measure, ni("div", [t.node], null, "position: relative")), t.height = t.node.offsetHeight)
    }
    function Xr(t, e, r, n) {
        var i = new ho(t, r, n);
        return i.noHScroll && (t.display.alignWidgets = !0), cr(t, e, function(e) {
            var r = e.widgets || (e.widgets = []);
            if (null == i.insertAt ? r.push(i) : r.splice(Math.min(r.length - 1, Math.max(0, i.insertAt)), 0, i), i.line = e, !Rr(t.doc, e) || i.showIfHidden) {
                var n = vn(t, e) < t.doc.scrollTop;
                pn(e, e.height + Ur(i)), n && ar(t, 0, i.height)
            }
            return !0
        }), i
    }
    function _r(t, e, r, n) {
        t.text = e, t.stateAfter && (t.stateAfter = null), t.styles && (t.styles = null), null != t.order && (t.order = null), Gr(t), Vr(t, r);
        var i = n ? n(t) : 1;
        i != t.height && pn(t, i)
    }
    function Yr(t) {
        t.parent = null, Gr(t)
    }
    function jr(t, e, r, n, i) {
        var o = r.flattenSpans;
        null == o && (o = t.options.flattenSpans);
        var l,
            s = 0,
            a = null,
            u = new wr(e, t.options.tabSize);
        for ("" == e && r.blankLine && r.blankLine(n); !u.eol();)
            u.pos > t.options.maxHighlightLength ? (o = !1, u.pos = Math.min(e.length, u.start + 5e4), l = null) : l = r.token(u, n), o && a == l || (s < u.start && i(u.start, a), s = u.start, a = l), u.start = u.pos;
        s < u.pos && i(u.pos, a)
    }
    function $r(t, e, r) {
        var n = [t.state.modeGen];
        jr(t, e.text, t.doc.mode, r, function(t, e) {
            n.push(t, e)
        });
        for (var i = 0; i < t.state.overlays.length; ++i) {
            var o = t.state.overlays[i],
                l = 1,
                s = 0;
            jr(t, e.text, o.mode, !0, function(t, e) {
                for (var r = l; t > s;) {
                    var i = n[l];
                    i > t && n.splice(l, 1, t, n[l + 1], i), l += 2, s = Math.min(t, i)
                }
                if (e)
                    if (o.opaque)
                        n.splice(r, l - r, t, e), l = r + 2;
                    else
                        for (; l > r; r += 2) {
                            var a = n[r + 1];
                            n[r + 1] = a ? a + " " + e : e
                        }
            })
        }
        return n
    }
    function Zr(t, e) {
        return e.styles && e.styles[0] == t.state.modeGen || (e.styles = $r(t, e, e.stateAfter = z(t, gn(e)))), e.styles
    }
    function qr(t, e, r) {
        var n = t.doc.mode,
            i = new wr(e.text, t.options.tabSize);
        for ("" == e.text && n.blankLine && n.blankLine(r); !i.eol() && i.pos <= t.options.maxHighlightLength;)
            n.token(i, r), i.start = i.pos
    }
    function Jr(t) {
        return t ? go[t] || (go[t] = "cm-" + t.replace(/ +/g, " cm-")) : null
    }
    function Qr(t, e, r, n) {
        for (var i, o = e, l = !0; i = Ir(o);)
            o = fn(t.doc, i.find().from.line);
        var s = {
            pre: ni("pre"),
            col: 0,
            pos: 0,
            measure: null,
            measuredSomething: !1,
            cm: t,
            copyWidgets: n
        };
        o.textClass && (s.pre.className = o.textClass);
        do {
            o.text && (l = !1), s.measure = o == e && r, s.pos = 0, s.addToken = s.measure ? en : tn, (ki || Ti) && t.getOption("lineWrapping") && (s.addToken = rn(s.addToken));
            var a = on(o, s, Zr(t, o));
            r && o == e && !s.measuredSomething && (r[0] = s.pre.appendChild(ci(t.display.measure)), s.measuredSomething = !0), a && (o = fn(t.doc, a.to.line))
        } while (a);
        !r || s.measuredSomething || r[0] || (r[0] = s.pre.appendChild(l ? ni("span", " ") : ci(t.display.measure))), s.pre.firstChild || Rr(t.doc, e) || s.pre.appendChild(document.createTextNode(" "));
        var u;
        if (r && ki && (u = yn(o))) {
            var c = u.length - 1;
            u[c].from == u[c].to && --c;
            var f = u[c],
                h = u[c - 1];
            if (f.from + 1 == f.to && h && f.level < h.level) {
                var d = r[s.pos - 1];
                d && d.parentNode.insertBefore(d.measureRight = ci(t.display.measure), d.nextSibling)
            }
        }
        return Rn(t, "renderLine", t, e, s.pre), s.pre
    }
    function tn(t, e, r, n, i, o) {
        if (e) {
            if (mo.test(e))
                for (var l = document.createDocumentFragment(), s = 0;;) {
                    mo.lastIndex = s;
                    var a = mo.exec(e),
                        u = a ? a.index - s : e.length - s;
                    if (u && (l.appendChild(document.createTextNode(e.slice(s, s + u))), t.col += u), !a)
                        break;
                    if (s += u + 1, "	" == a[0]) {
                        var c = t.cm.options.tabSize,
                            f = c - t.col % c;
                        l.appendChild(ni("span", Yn(f), "cm-tab")), t.col += f
                    } else {
                        var h = ni("span", "•", "cm-invalidchar");
                        h.title = "\\u" + a[0].charCodeAt(0).toString(16), l.appendChild(h), t.col += 1
                    }
                }
            else {
                t.col += e.length;
                var l = document.createTextNode(e)
            }
            if (r || n || i || t.measure) {
                var d = r || "";
                n && (d += n), i && (d += i);
                var h = ni("span", [l], d);
                return o && (h.title = o), t.pre.appendChild(h)
            }
            t.pre.appendChild(l)
        }
    }
    function en(t, e, r, n, i) {
        for (var o = t.cm.options.lineWrapping, l = 0; l < e.length; ++l) {
            var s = e.charAt(l),
                a = 0 == l;
            s >= "���" && "���" > s && l < e.length - 1 ? (s = e.slice(l, l + 2), ++l) : l && o && ai(e, l) && t.pre.appendChild(ni("wbr"));
            var u = t.measure[t.pos],
                c = t.measure[t.pos] = tn(t, s, r, a && n, l == e.length - 1 && i);
            u && (c.leftSide = u.leftSide || u), ki && o && " " == s && l && !/\s/.test(e.charAt(l - 1)) && l < e.length - 1 && !/\s/.test(e.charAt(l + 1)) && (c.style.whiteSpace = "normal"), t.pos += s.length
        }
        e.length && (t.measuredSomething = !0)
    }
    function rn(t) {
        function e(t) {
            for (var e = " ", r = 0; r < t.length - 2; ++r)
                e += r % 2 ? " " : " ";
            return e += " "
        }
        return function(r, n, i, o, l, s) {
            return t(r, n.replace(/ {3,}/, e), i, o, l, s)
        }
    }
    function nn(t, e, r, n) {
        var i = !n && r.replacedWith;
        if (i && (t.copyWidgets && (i = i.cloneNode(!0)), t.pre.appendChild(i), t.measure)) {
            if (e)
                t.measure[t.pos] = i;
            else {
                var o = ci(t.cm.display.measure);
                if ("bookmark" != r.type || r.insertLeft) {
                    if (t.measure[t.pos])
                        return;
                    t.measure[t.pos] = t.pre.insertBefore(o, i)
                } else
                    t.measure[t.pos] = t.pre.appendChild(o)
            }
            t.measuredSomething = !0
        }
        t.pos += e
    }
    function on(t, e, r) {
        var n = t.markedSpans,
            i = t.text,
            o = 0;
        if (n)
            for (var l, s, a, u, c, f, h = i.length, d = 0, p = 1, g = "", m = 0;;) {
                if (m == d) {
                    s = a = u = c = "", f = null, m = 1 / 0;
                    for (var v = [], y = 0; y < n.length; ++y) {
                        var b = n[y],
                            x = b.marker;
                        b.from <= d && (null == b.to || b.to > d) ? (null != b.to && m > b.to && (m = b.to, a = ""), x.className && (s += " " + x.className), x.startStyle && b.from == d && (u += " " + x.startStyle), x.endStyle && b.to == m && (a += " " + x.endStyle), x.title && !c && (c = x.title), x.collapsed && (!f || f.marker.size < x.size) && (f = b)) : b.from > d && m > b.from && (m = b.from), "bookmark" == x.type && b.from == d && x.replacedWith && v.push(x)
                    }
                    if (f && (f.from || 0) == d && (nn(e, (null == f.to ? h : f.to) - d, f.marker, null == f.from), null == f.to))
                        return f.marker.find();
                    if (!f && v.length)
                        for (var y = 0; y < v.length; ++y)
                            nn(e, 0, v[y])
                }
                if (d >= h)
                    break;
                for (var C = Math.min(h, m);;) {
                    if (g) {
                        var w = d + g.length;
                        if (!f) {
                            var L = w > C ? g.slice(0, C - d) : g;
                            e.addToken(e, L, l ? l + s : s, u, d + L.length == m ? a : "", c)
                        }
                        if (w >= C) {
                            g = g.slice(C - d), d = C;
                            break
                        }
                        d = w, u = ""
                    }
                    g = i.slice(o, o = r[p++]), l = Jr(r[p++])
                }
            }
        else
            for (var p = 1; p < r.length; p += 2)
                e.addToken(e, i.slice(o, o = r[p]), Jr(r[p + 1]))
    }
    function ln(t, e, r, n, i) {
        function o(t) {
            return r ? r[t] : null
        }
        function l(t, r, n) {
            _r(t, r, n, i), Bn(t, "change", t, e)
        }
        var s = e.from,
            a = e.to,
            u = e.text,
            c = fn(t, s.line),
            f = fn(t, a.line),
            h = jn(u),
            d = o(u.length - 1),
            p = a.line - s.line;
        if (0 == s.ch && 0 == a.ch && "" == h) {
            for (var g = 0, m = u.length - 1, v = []; m > g; ++g)
                v.push(new po(u[g], o(g), i));
            l(f, f.text, d), p && t.remove(s.line, p), v.length && t.insert(s.line, v)
        } else if (c == f)
            if (1 == u.length)
                l(c, c.text.slice(0, s.ch) + h + c.text.slice(a.ch), d);
            else {
                for (var v = [], g = 1, m = u.length - 1; m > g; ++g)
                    v.push(new po(u[g], o(g), i));
                v.push(new po(h + c.text.slice(a.ch), d, i)), l(c, c.text.slice(0, s.ch) + u[0], o(0)), t.insert(s.line + 1, v)
            }
        else if (1 == u.length)
            l(c, c.text.slice(0, s.ch) + u[0] + f.text.slice(a.ch), o(0)), t.remove(s.line + 1, p);
        else {
            l(c, c.text.slice(0, s.ch) + u[0], o(0)), l(f, h + f.text.slice(a.ch), d);
            for (var g = 1, m = u.length - 1, v = []; m > g; ++g)
                v.push(new po(u[g], o(g), i));
            p > 1 && t.remove(s.line + 1, p - 1), t.insert(s.line + 1, v)
        }
        Bn(t, "change", t, e), tr(t, n.anchor, n.head, null, !0)
    }
    function sn(t) {
        this.lines = t, this.parent = null;
        for (var e = 0, r = t.length, n = 0; r > e; ++e)
            t[e].parent = this, n += t[e].height;
        this.height = n
    }
    function an(t) {
        this.children = t;
        for (var e = 0, r = 0, n = 0, i = t.length; i > n; ++n) {
            var o = t[n];
            e += o.chunkSize(), r += o.height, o.parent = this
        }
        this.size = e, this.height = r, this.parent = null
    }
    function un(t, e, r) {
        function n(t, i, o) {
            if (t.linked)
                for (var l = 0; l < t.linked.length; ++l) {
                    var s = t.linked[l];
                    if (s.doc != i) {
                        var a = o && s.sharedHist;
                        (!r || a) && (e(s.doc, a), n(s.doc, t, a))
                    }
                }
        }
        n(t, null, !0)
    }
    function cn(t, e) {
        if (e.cm)
            throw new Error("This document is already in use.");
        t.doc = e, e.cm = t, o(t), r(t), t.options.lineWrapping || f(t), t.options.mode = e.modeOption, ae(t)
    }
    function fn(t, e) {
        for (e -= t.first; !t.lines;)
            for (var r = 0;; ++r) {
                var n = t.children[r],
                    i = n.chunkSize();
                if (i > e) {
                    t = n;
                    break
                }
                e -= i
            }
        return t.lines[e]
    }
    function hn(t, e, r) {
        var n = [],
            i = e.line;
        return t.iter(e.line, r.line + 1, function(t) {
            var o = t.text;
            i == r.line && (o = o.slice(0, r.ch)), i == e.line && (o = o.slice(e.ch)), n.push(o), ++i
        }), n
    }
    function dn(t, e, r) {
        var n = [];
        return t.iter(e, r, function(t) {
            n.push(t.text)
        }), n
    }
    function pn(t, e) {
        for (var r = e - t.height, n = t; n; n = n.parent)
            n.height += r
    }
    function gn(t) {
        if (null == t.parent)
            return null;
        for (var e = t.parent, r = Zn(e.lines, t), n = e.parent; n; e = n, n = n.parent)
            for (var i = 0; n.children[i] != e; ++i)
                r += n.children[i].chunkSize();
        return r + e.first
    }
    function mn(t, e) {
        var r = t.first;
        t:
        do {
            for (var n = 0, i = t.children.length; i > n; ++n) {
                var o = t.children[n],
                    l = o.height;
                if (l > e) {
                    t = o;
                    continue t
                }
                e -= l, r += o.chunkSize()
            }
            return r
        } while (!t.lines);
        for (var n = 0, i = t.lines.length; i > n; ++n) {
            var s = t.lines[n],
                a = s.height;
            if (a > e)
                break;
            e -= a
        }
        return r + n
    }
    function vn(t, e) {
        e = Fr(t.doc, e);
        for (var r = 0, n = e.parent, i = 0; i < n.lines.length; ++i) {
            var o = n.lines[i];
            if (o == e)
                break;
            r += o.height
        }
        for (var l = n.parent; l; n = l, l = n.parent)
            for (var i = 0; i < l.children.length; ++i) {
                var s = l.children[i];
                if (s == n)
                    break;
                r += s.height
            }
        return r
    }
    function yn(t) {
        var e = t.order;
        return null == e && (e = t.order = Io(t.text)), e
    }
    function bn(t) {
        return {
            done: [],
            undone: [],
            undoDepth: 1 / 0,
            lastTime: 0,
            lastOp: null,
            lastOrigin: null,
            generation: t || 1,
            maxGeneration: t || 1
        }
    }
    function xn(t, e, r, n) {
        var i = e["spans_" + t.id],
            o = 0;
        t.iter(Math.max(t.first, r), Math.min(t.first + t.size, n), function(r) {
            r.markedSpans && ((i || (i = e["spans_" + t.id] = {}))[o] = r.markedSpans), ++o
        })
    }
    function Cn(t, e) {
        var r = {
                line: e.from.line,
                ch: e.from.ch
            },
            n = {
                from: r,
                to: eo(e),
                text: hn(t, e.from, e.to)
            };
        return xn(t, n, e.from.line, e.to.line + 1), un(t, function(t) {
            xn(t, n, e.from.line, e.to.line + 1)
        }, !0), n
    }
    function wn(t, e, r, n) {
        var i = t.history;
        i.undone.length = 0;
        var o = +new Date,
            l = jn(i.done);
        if (l && (i.lastOp == n || i.lastOrigin == e.origin && e.origin && ("+" == e.origin.charAt(0) && t.cm && i.lastTime > o - t.cm.options.historyEventDelay || "*" == e.origin.charAt(0)))) {
            var s = jn(l.changes);
            Xe(e.from, e.to) && Xe(e.from, s.to) ? s.to = eo(e) : l.changes.push(Cn(t, e)), l.anchorAfter = r.anchor, l.headAfter = r.head
        } else
            for (l = {
                changes: [Cn(t, e)],
                generation: i.generation,
                anchorBefore: t.sel.anchor,
                headBefore: t.sel.head,
                anchorAfter: r.anchor,
                headAfter: r.head
            }, i.done.push(l), i.generation = ++i.maxGeneration; i.done.length > i.undoDepth;)
                i.done.shift();
        i.lastTime = o, i.lastOp = n, i.lastOrigin = e.origin
    }
    function Ln(t) {
        if (!t)
            return null;
        for (var e, r = 0; r < t.length; ++r)
            t[r].marker.explicitlyCleared ? e || (e = t.slice(0, r)) : e && e.push(t[r]);
        return e ? e.length ? e : null : t
    }
    function kn(t, e) {
        var r = e["spans_" + t.id];
        if (!r)
            return null;
        for (var n = 0, i = []; n < e.text.length; ++n)
            i.push(Ln(r[n]));
        return i
    }
    function Sn(t, e) {
        for (var r = 0, n = []; r < t.length; ++r) {
            var i = t[r],
                o = i.changes,
                l = [];
            n.push({
                changes: l,
                anchorBefore: i.anchorBefore,
                headBefore: i.headBefore,
                anchorAfter: i.anchorAfter,
                headAfter: i.headAfter
            });
            for (var s = 0; s < o.length; ++s) {
                var a,
                    u = o[s];
                if (l.push({
                    from: u.from,
                    to: u.to,
                    text: u.text
                }), e)
                    for (var c in u)
                        (a = c.match(/^spans_(\d+)$/)) && Zn(e, Number(a[1])) > -1 && (jn(l)[c] = u[c], delete u[c])
            }
        }
        return n
    }
    function Mn(t, e, r, n) {
        r < t.line ? t.line += n : e < t.line && (t.line = e, t.ch = 0)
    }
    function Tn(t, e, r, n) {
        for (var i = 0; i < t.length; ++i) {
            for (var o = t[i], l = !0, s = 0; s < o.changes.length; ++s) {
                var a = o.changes[s];
                if (o.copied || (a.from = Ye(a.from), a.to = Ye(a.to)), r < a.from.line)
                    a.from.line += n, a.to.line += n;
                else if (e <= a.to.line) {
                    l = !1;
                    break
                }
            }
            o.copied || (o.anchorBefore = Ye(o.anchorBefore), o.headBefore = Ye(o.headBefore), o.anchorAfter = Ye(o.anchorAfter), o.readAfter = Ye(o.headAfter), o.copied = !0), l ? (Mn(o.anchorBefore), Mn(o.headBefore), Mn(o.anchorAfter), Mn(o.headAfter)) : (t.splice(0, i + 1), i = 0)
        }
    }
    function An(t, e) {
        var r = e.from.line,
            n = e.to.line,
            i = e.text.length - (n - r) - 1;
        Tn(t.done, r, n, i), Tn(t.undone, r, n, i)
    }
    function Nn() {
        En(this)
    }
    function Hn(t) {
        return t.stop || (t.stop = Nn), t
    }
    function Dn(t) {
        t.preventDefault ? t.preventDefault() : t.returnValue = !1
    }
    function Wn(t) {
        t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
    }
    function On(t) {
        return null != t.defaultPrevented ? t.defaultPrevented : 0 == t.returnValue
    }
    function En(t) {
        Dn(t), Wn(t)
    }
    function zn(t) {
        return t.target || t.srcElement
    }
    function In(t) {
        var e = t.which;
        return null == e && (1 & t.button ? e = 1 : 2 & t.button ? e = 3 : 4 & t.button && (e = 2)), Fi && t.ctrlKey && 1 == e && (e = 3), e
    }
    function Pn(t, e, r) {
        if (t.addEventListener)
            t.addEventListener(e, r, !1);
        else if (t.attachEvent)
            t.attachEvent("on" + e, r);
        else {
            var n = t._handlers || (t._handlers = {}),
                i = n[e] || (n[e] = []);
            i.push(r)
        }
    }
    function Fn(t, e, r) {
        if (t.removeEventListener)
            t.removeEventListener(e, r, !1);
        else if (t.detachEvent)
            t.detachEvent("on" + e, r);
        else {
            var n = t._handlers && t._handlers[e];
            if (!n)
                return;
            for (var i = 0; i < n.length; ++i)
                if (n[i] == r) {
                    n.splice(i, 1);
                    break
                }
        }
    }
    function Rn(t, e) {
        var r = t._handlers && t._handlers[e];
        if (r)
            for (var n = Array.prototype.slice.call(arguments, 2), i = 0; i < r.length; ++i)
                r[i].apply(null, n)
    }
    function Bn(t, e) {
        function r(t) {
            return function() {
                t.apply(null, i)
            }
        }
        var n = t._handlers && t._handlers[e];
        if (n) {
            var i = Array.prototype.slice.call(arguments, 2);
            Co || (++wo, Co = [], setTimeout(Vn, 0));
            for (var o = 0; o < n.length; ++o)
                Co.push(r(n[o]))
        }
    }
    function Gn(t, e, r) {
        return Rn(t, r || e.type, t, e), On(e) || e.codemirrorIgnore
    }
    function Vn() {
        --wo;
        var t = Co;
        Co = null;
        for (var e = 0; e < t.length; ++e)
            t[e]()
    }
    function Kn(t, e) {
        var r = t._handlers && t._handlers[e];
        return r && r.length > 0
    }
    function Un(t) {
        t.prototype.on = function(t, e) {
            Pn(this, t, e)
        }, t.prototype.off = function(t, e) {
            Fn(this, t, e)
        }
    }
    function Xn() {
        this.id = null
    }
    function _n(t, e, r, n, i) {
        null == e && (e = t.search(/[^\s\u00a0]/), -1 == e && (e = t.length));
        for (var o = n || 0, l = i || 0; e > o; ++o)
            "	" == t.charAt(o) ? l += r - l % r : ++l;
        return l
    }
    function Yn(t) {
        for (; So.length <= t;)
            So.push(jn(So) + " ");
        return So[t]
    }
    function jn(t) {
        return t[t.length - 1]
    }
    function $n(t) {
        if (Ii)
            t.selectionStart = 0, t.selectionEnd = t.value.length;
        else
            try {
                t.select()
            } catch (e) {}
    }
    function Zn(t, e) {
        if (t.indexOf)
            return t.indexOf(e);
        for (var r = 0, n = t.length; n > r; ++r)
            if (t[r] == e)
                return r;
        return -1
    }
    function qn(t, e) {
        function r() {}
        r.prototype = t;
        var n = new r;
        return e && Jn(e, n), n
    }
    function Jn(t, e) {
        e || (e = {});
        for (var r in t)
            t.hasOwnProperty(r) && (e[r] = t[r]);
        return e
    }
    function Qn(t) {
        for (var e = [], r = 0; t > r; ++r)
            e.push(void 0);
        return e
    }
    function ti(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return function() {
            return t.apply(null, e)
        }
    }
    function ei(t) {
        return /\w/.test(t) || t > "" && (t.toUpperCase() != t.toLowerCase() || Mo.test(t))
    }
    function ri(t) {
        for (var e in t)
            if (t.hasOwnProperty(e) && t[e])
                return !1;
        return !0
    }
    function ni(t, e, r, n) {
        var i = document.createElement(t);
        if (r && (i.className = r), n && (i.style.cssText = n), "string" == typeof e)
            li(i, e);
        else if (e)
            for (var o = 0; o < e.length; ++o)
                i.appendChild(e[o]);
        return i
    }
    function ii(t) {
        for (var e = t.childNodes.length; e > 0; --e)
            t.removeChild(t.firstChild);
        return t
    }
    function oi(t, e) {
        return ii(t).appendChild(e)
    }
    function li(t, e) {
        Mi ? (t.innerHTML = "", t.appendChild(document.createTextNode(e))) : t.textContent = e
    }
    function si(t) {
        return t.getBoundingClientRect()
    }
    function ai() {
        return !1
    }
    function ui(t) {
        if (null != No)
            return No;
        var e = ni("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
        return oi(t, e), e.offsetWidth && (No = e.offsetHeight - e.clientHeight), No || 0
    }
    function ci(t) {
        if (null == Ho) {
            var e = ni("span", "​");
            oi(t, ni("span", [e, document.createTextNode("x")])), 0 != t.firstChild.offsetHeight && (Ho = e.offsetWidth <= 1 && e.offsetHeight > 2 && !Si)
        }
        return Ho ? ni("span", "​") : ni("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px")
    }
    function fi(t, e, r, n) {
        if (!t)
            return n(e, r, "ltr");
        for (var i = !1, o = 0; o < t.length; ++o) {
            var l = t[o];
            (l.from < r && l.to > e || e == r && l.to == e) && (n(Math.max(l.from, e), Math.min(l.to, r), 1 == l.level ? "rtl" : "ltr"), i = !0)
        }
        i || n(e, r, "ltr")
    }
    function hi(t) {
        return t.level % 2 ? t.to : t.from
    }
    function di(t) {
        return t.level % 2 ? t.from : t.to
    }
    function pi(t) {
        var e = yn(t);
        return e ? hi(e[0]) : 0
    }
    function gi(t) {
        var e = yn(t);
        return e ? di(jn(e)) : t.text.length
    }
    function mi(t, e) {
        var r = fn(t.doc, e),
            n = Fr(t.doc, r);
        n != r && (e = gn(n));
        var i = yn(n),
            o = i ? i[0].level % 2 ? gi(n) : pi(n) : 0;
        return Ue(e, o)
    }
    function vi(t, e) {
        for (var r, n; r = Pr(n = fn(t.doc, e));)
            e = r.find().to.line;
        var i = yn(n),
            o = i ? i[0].level % 2 ? pi(n) : gi(n) : n.text.length;
        return Ue(e, o)
    }
    function yi(t, e, r) {
        var n = t[0].level;
        return e == n ? !0 : r == n ? !1 : r > e
    }
    function bi(t, e) {
        for (var r, n = 0; n < t.length; ++n) {
            var i = t[n];
            if (i.from < e && i.to > e)
                return zo = null, n;
            if (i.from == e || i.to == e) {
                if (null != r)
                    return yi(t, i.level, t[r].level) ? (zo = r, n) : (zo = n, r);
                r = n
            }
        }
        return zo = null, r
    }
    function xi(t, e, r, n) {
        if (!n)
            return e + r;
        do e += r;
        while (e > 0 && To.test(t.text.charAt(e)));
        return e
    }
    function Ci(t, e, r, n) {
        var i = yn(t);
        if (!i)
            return wi(t, e, r, n);
        for (var o = bi(i, e), l = i[o], s = xi(t, e, l.level % 2 ? -r : r, n);;) {
            if (s > l.from && s < l.to)
                return s;
            if (s == l.from || s == l.to)
                return bi(i, s) == o ? s : (l = i[o += r], r > 0 == l.level % 2 ? l.to : l.from);
            if (l = i[o += r], !l)
                return null;
            s = r > 0 == l.level % 2 ? xi(t, l.to, -1, n) : xi(t, l.from, 1, n)
        }
    }
    function wi(t, e, r, n) {
        var i = e + r;
        if (n)
            for (; i > 0 && To.test(t.text.charAt(i));)
                i += r;
        return 0 > i || i > t.text.length ? null : i
    }
    var Li = /gecko\/\d/i.test(navigator.userAgent),
        ki = /MSIE \d/.test(navigator.userAgent),
        Si = ki && (null == document.documentMode || document.documentMode < 8),
        Mi = ki && (null == document.documentMode || document.documentMode < 9),
        Ti = /WebKit\//.test(navigator.userAgent),
        Ai = Ti && /Qt\/\d+\.\d+/.test(navigator.userAgent),
        Ni = /Chrome\//.test(navigator.userAgent),
        Hi = /Opera\//.test(navigator.userAgent),
        Di = /Apple Computer/.test(navigator.vendor),
        Wi = /KHTML\//.test(navigator.userAgent),
        Oi = /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent),
        Ei = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent),
        zi = /PhantomJS/.test(navigator.userAgent),
        Ii = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent),
        Pi = Ii || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent),
        Fi = Ii || /Mac/.test(navigator.platform),
        Ri = /win/i.test(navigator.platform),
        Bi = Hi && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
    Bi && (Bi = Number(Bi[1])), Bi && Bi >= 15 && (Hi = !1, Ti = !0);
    var Gi,
        Vi,
        Ki,
        Ui = Fi && (Ai || Hi && (null == Bi || 12.11 > Bi)),
        Xi = Li || ki && !Mi,
        _i = !1,
        Yi = !1,
        ji = 0,
        $i = 0,
        Zi = 0,
        qi = null;
    ki ? qi = -.53 : Li ? qi = 15 : Ni ? qi = -.7 : Di && (qi = -1 / 3);
    var Ji,
        Qi,
        to = null,
        eo = t.changeEnd = function(t) {
            return t.text ? Ue(t.from.line + t.text.length - 1, jn(t.text).length + (1 == t.text.length ? t.from.ch : 0)) : t.to
        };
    t.Pos = Ue, t.prototype = {
        constructor: t,
        focus: function() {
            window.focus(), de(this), De(this), ce(this)
        },
        setOption: function(t, e) {
            var r = this.options,
                n = r[t];
            (r[t] != e || "mode" == t) && (r[t] = e, ro.hasOwnProperty(t) && oe(this, ro[t])(this, e, n))
        },
        getOption: function(t) {
            return this.options[t]
        },
        getDoc: function() {
            return this.doc
        },
        addKeyMap: function(t, e) {
            this.state.keyMaps[e ? "push" : "unshift"](t)
        },
        removeKeyMap: function(t) {
            for (var e = this.state.keyMaps, r = 0; r < e.length; ++r)
                if (e[r] == t || "string" != typeof e[r] && e[r].name == t)
                    return e.splice(r, 1), !0
        },
        addOverlay: oe(null, function(e, r) {
            var n = e.token ? e : t.getMode(this.options, e);
            if (n.startState)
                throw new Error("Overlays may not be stateful.");
            this.state.overlays.push({
                mode: n,
                modeSpec: e,
                opaque: r && r.opaque
            }), this.state.modeGen++, ae(this)
        }),
        removeOverlay: oe(null, function(t) {
            for (var e = this.state.overlays, r = 0; r < e.length; ++r) {
                var n = e[r].modeSpec;
                if (n == t || "string" == typeof t && n.name == t)
                    return e.splice(r, 1), this.state.modeGen++, ae(this), void 0
            }
        }),
        indentLine: oe(null, function(t, e, r) {
            "string" != typeof e && "number" != typeof e && (e = null == e ? this.options.smartIndent ? "smart" : "prev" : e ? "add" : "subtract"), qe(this.doc, t) && ur(this, t, e, r)
        }),
        indentSelection: oe(null, function(t) {
            var e = this.doc.sel;
            if (Xe(e.from, e.to))
                return ur(this, e.from.line, t);
            for (var r = e.to.line - (e.to.ch ? 0 : 1), n = e.from.line; r >= n; ++n)
                ur(this, n, t)
        }),
        getTokenAt: function(t, e) {
            var r = this.doc;
            t = $e(r, t);
            for (var n = z(this, t.line, e), i = this.doc.mode, o = fn(r, t.line), l = new wr(o.text, this.options.tabSize); l.pos < t.ch && !l.eol();) {
                l.start = l.pos;
                var s = i.token(l, n)
            }
            return {
                start: l.start,
                end: l.pos,
                string: l.current(),
                className: s || null,
                type: s || null,
                state: n
            }
        },
        getTokenTypeAt: function(t) {
            t = $e(this.doc, t);
            var e = Zr(this, fn(this.doc, t.line)),
                r = 0,
                n = (e.length - 1) / 2,
                i = t.ch;
            if (0 == i)
                return e[2];
            for (;;) {
                var o = r + n >> 1;
                if ((o ? e[2 * o - 1] : 0) >= i)
                    n = o;
                else {
                    if (!(e[2 * o + 1] < i))
                        return e[2 * o + 2];
                    r = o + 1
                }
            }
        },
        getModeAt: function(e) {
            var r = this.doc.mode;
            return r.innerMode ? t.innerMode(r, this.getTokenAt(e).state).mode : r
        },
        getHelper: function(t, e) {
            if (uo.hasOwnProperty(e)) {
                var r = uo[e],
                    n = this.getModeAt(t);
                return n[e] && r[n[e]] || n.helperType && r[n.helperType] || r[n.name]
            }
        },
        getStateAfter: function(t, e) {
            var r = this.doc;
            return t = je(r, null == t ? r.first + r.size - 1 : t), z(this, t + 1, e)
        },
        cursorCoords: function(t, e) {
            var r,
                n = this.doc.sel;
            return r = null == t ? n.head : "object" == typeof t ? $e(this.doc, t) : t ? n.from : n.to, q(this, r, e || "page")
        },
        charCoords: function(t, e) {
            return Z(this, $e(this.doc, t), e || "page")
        },
        coordsChar: function(t, e) {
            return t = $(this, t, e || "page"), Q(this, t.left, t.top)
        },
        lineAtHeight: function(t, e) {
            return t = $(this, {
                top: t,
                left: 0
            }, e || "page").top, mn(this.doc, t + this.display.viewOffset)
        },
        heightAtLine: function(t, e) {
            var r = !1,
                n = this.doc.first + this.doc.size - 1;
            t < this.doc.first ? t = this.doc.first : t > n && (t = n, r = !0);
            var i = fn(this.doc, t);
            return j(this, fn(this.doc, t), {
                top: 0,
                left: 0
            }, e || "page").top + (r ? i.height : 0)
        },
        defaultTextHeight: function() {
            return ee(this.display)
        },
        defaultCharWidth: function() {
            return re(this.display)
        },
        setGutterMarker: oe(null, function(t, e, r) {
            return cr(this, t, function(t) {
                var n = t.gutterMarkers || (t.gutterMarkers = {});
                return n[e] = r, !r && ri(n) && (t.gutterMarkers = null), !0
            })
        }),
        clearGutter: oe(null, function(t) {
            var e = this,
                r = e.doc,
                n = r.first;
            r.iter(function(r) {
                r.gutterMarkers && r.gutterMarkers[t] && (r.gutterMarkers[t] = null, ae(e, n, n + 1), ri(r.gutterMarkers) && (r.gutterMarkers = null)), ++n
            })
        }),
        addLineClass: oe(null, function(t, e, r) {
            return cr(this, t, function(t) {
                var n = "text" == e ? "textClass" : "background" == e ? "bgClass" : "wrapClass";
                if (t[n]) {
                    if (new RegExp("(?:^|\\s)" + r + "(?:$|\\s)").test(t[n]))
                        return !1;
                    t[n] += " " + r
                } else
                    t[n] = r;
                return !0
            })
        }),
        removeLineClass: oe(null, function(t, e, r) {
            return cr(this, t, function(t) {
                var n = "text" == e ? "textClass" : "background" == e ? "bgClass" : "wrapClass",
                    i = t[n];
                if (!i)
                    return !1;
                if (null == r)
                    t[n] = null;
                else {
                    var o = i.match(new RegExp("(?:^|\\s+)" + r + "(?:$|\\s+)"));
                    if (!o)
                        return !1;
                    var l = o.index + o[0].length;
                    t[n] = i.slice(0, o.index) + (o.index && l != i.length ? " " : "") + i.slice(l) || null
                }
                return !0
            })
        }),
        addLineWidget: oe(null, function(t, e, r) {
            return Xr(this, t, e, r)
        }),
        removeLineWidget: function(t) {
            t.clear()
        },
        lineInfo: function(t) {
            if ("number" == typeof t) {
                if (!qe(this.doc, t))
                    return null;
                var e = t;
                if (t = fn(this.doc, t), !t)
                    return null
            } else {
                var e = gn(t);
                if (null == e)
                    return null
            }
            return {
                line: e,
                handle: t,
                text: t.text,
                gutterMarkers: t.gutterMarkers,
                textClass: t.textClass,
                bgClass: t.bgClass,
                wrapClass: t.wrapClass,
                widgets: t.widgets
            }
        },
        getViewport: function() {
            return {
                from: this.display.showingFrom,
                to: this.display.showingTo
            }
        },
        addWidget: function(t, e, r, n, i) {
            var o = this.display;
            t = q(this, $e(this.doc, t));
            var l = t.bottom,
                s = t.left;
            if (e.style.position = "absolute", o.sizer.appendChild(e), "over" == n)
                l = t.top;
            else if ("above" == n || "near" == n) {
                var a = Math.max(o.wrapper.clientHeight, this.doc.height),
                    u = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth);
                ("above" == n || t.bottom + e.offsetHeight > a) && t.top > e.offsetHeight ? l = t.top - e.offsetHeight : t.bottom + e.offsetHeight <= a && (l = t.bottom), s + e.offsetWidth > u && (s = u - e.offsetWidth)
            }
            e.style.top = l + "px", e.style.left = e.style.right = "", "right" == i ? (s = o.sizer.clientWidth - e.offsetWidth, e.style.right = "0px") : ("left" == i ? s = 0 : "middle" == i && (s = (o.sizer.clientWidth - e.offsetWidth) / 2), e.style.left = s + "px"), r && or(this, s, l, s + e.offsetWidth, l + e.offsetHeight)
        },
        triggerOnKeyDown: oe(null, Ne),
        execCommand: function(t) {
            return co[t](this)
        },
        findPosH: function(t, e, r, n) {
            var i = 1;
            0 > e && (i = -1, e = -e);
            for (var o = 0, l = $e(this.doc, t); e > o && (l = fr(this.doc, l, i, r, n), !l.hitSide); ++o)
                ;
            return l
        },
        moveH: oe(null, function(t, e) {
            var r,
                n = this.doc.sel;
            r = n.shift || n.extend || Xe(n.from, n.to) ? fr(this.doc, n.head, t, e, this.options.rtlMoveVisually) : 0 > t ? n.from : n.to, Je(this.doc, r, r, t)
        }),
        deleteH: oe(null, function(t, e) {
            var r = this.doc.sel;
            Xe(r.from, r.to) ? Ke(this.doc, "", r.from, fr(this.doc, r.head, t, e, !1), "+delete") : Ke(this.doc, "", r.from, r.to, "+delete"), this.curOp.userSelChange = !0
        }),
        findPosV: function(t, e, r, n) {
            var i = 1,
                o = n;
            0 > e && (i = -1, e = -e);
            for (var l = 0, s = $e(this.doc, t); e > l; ++l) {
                var a = q(this, s, "div");
                if (null == o ? o = a.left : a.left = o, s = hr(this, a, i, r), s.hitSide)
                    break
            }
            return s
        },
        moveV: oe(null, function(t, e) {
            var r = this.doc.sel,
                n = q(this, r.head, "div");
            null != r.goalColumn && (n.left = r.goalColumn);
            var i = hr(this, n, t, e);
            "page" == e && ar(this, 0, Z(this, i, "div").top - n.top), Je(this.doc, i, i, t), r.goalColumn = n.left
        }),
        toggleOverwrite: function(t) {
            (null == t || t != this.state.overwrite) && ((this.state.overwrite = !this.state.overwrite) ? this.display.cursor.className += " CodeMirror-overwrite" : this.display.cursor.className = this.display.cursor.className.replace(" CodeMirror-overwrite", ""))
        },
        hasFocus: function() {
            return this.state.focused
        },
        scrollTo: oe(null, function(t, e) {
            sr(this, t, e)
        }),
        getScrollInfo: function() {
            var t = this.display.scroller,
                e = Lo;
            return {
                left: t.scrollLeft,
                top: t.scrollTop,
                height: t.scrollHeight - e,
                width: t.scrollWidth - e,
                clientHeight: t.clientHeight - e,
                clientWidth: t.clientWidth - e
            }
        },
        scrollIntoView: oe(null, function(t, e) {
            "number" == typeof t && (t = Ue(t, 0)), e || (e = 0);
            var r = t;
            t && null == t.line || (this.curOp.scrollToPos = t ? $e(this.doc, t) : this.doc.sel.head, this.curOp.scrollToPosMargin = e, r = q(this, this.curOp.scrollToPos));
            var n = lr(this, r.left, r.top - e, r.right, r.bottom + e);
            sr(this, n.scrollLeft, n.scrollTop)
        }),
        setSize: oe(null, function(t, e) {
            function r(t) {
                return "number" == typeof t || /^\d+$/.test(String(t)) ? t + "px" : t
            }
            null != t && (this.display.wrapper.style.width = r(t)), null != e && (this.display.wrapper.style.height = r(e)), this.options.lineWrapping && (this.display.measureLineCache.length = this.display.measureLineCachePos = 0), this.curOp.forceUpdate = !0
        }),
        operation: function(t) {
            return se(this, t)
        },
        refresh: oe(null, function() {
            X(this), sr(this, this.doc.scrollLeft, this.doc.scrollTop), ae(this)
        }),
        swapDoc: oe(null, function(t) {
            var e = this.doc;
            return e.cm = null, cn(this, t), X(this), he(this, !0), sr(this, t.scrollLeft, t.scrollTop), e
        }),
        getInputField: function() {
            return this.display.input
        },
        getWrapperElement: function() {
            return this.display.wrapper
        },
        getScrollerElement: function() {
            return this.display.scroller
        },
        getGutterElement: function() {
            return this.display.gutters
        }
    }, Un(t);
    var ro = t.optionHandlers = {},
        no = t.defaults = {},
        io = t.Init = {
            toString: function() {
                return "CodeMirror.Init"
            }
        };
    gr("value", "", function(t, e) {
        t.setValue(e)
    }, !0), gr("mode", null, function(t, e) {
        t.doc.modeOption = e, r(t)
    }, !0), gr("indentUnit", 2, r, !0), gr("indentWithTabs", !1), gr("smartIndent", !0), gr("tabSize", 4, function(t) {
        r(t), X(t), ae(t)
    }, !0), gr("electricChars", !0), gr("rtlMoveVisually", !Ri), gr("theme", "default", function(t) {
        s(t), a(t)
    }, !0), gr("keyMap", "default", l), gr("extraKeys", null), gr("onKeyEvent", null), gr("onDragEvent", null), gr("lineWrapping", !1, n, !0), gr("gutters", [], function(t) {
        h(t.options), a(t)
    }, !0), gr("fixedGutter", !0, function(t, e) {
        t.display.gutters.style.left = e ? y(t.display) + "px" : "0", t.refresh()
    }, !0), gr("coverGutterNextToScrollbar", !1, d, !0), gr("lineNumbers", !1, function(t) {
        h(t.options), a(t)
    }, !0), gr("firstLineNumber", 1, a, !0), gr("lineNumberFormatter", function(t) {
        return t
    }, a, !0), gr("showCursorWhenSelecting", !1, A, !0), gr("readOnly", !1, function(t, e) {
        "nocursor" == e ? (We(t), t.display.input.blur()) : e || he(t, !0)
    }), gr("dragDrop", !0), gr("cursorBlinkRate", 530), gr("cursorScrollMargin", 0), gr("cursorHeight", 1), gr("workTime", 100), gr("workDelay", 100), gr("flattenSpans", !0), gr("pollInterval", 100), gr("undoDepth", 40, function(t, e) {
        t.doc.history.undoDepth = e
    }), gr("historyEventDelay", 500), gr("viewportMargin", 10, function(t) {
        t.refresh()
    }, !0), gr("maxHighlightLength", 1e4, function(t) {
        r(t), t.refresh()
    }, !0), gr("moveInputWithCursor", !0, function(t, e) {
        e || (t.display.inputDiv.style.top = t.display.inputDiv.style.left = 0)
    }), gr("tabindex", null, function(t, e) {
        t.display.input.tabIndex = e || ""
    }), gr("autofocus", null);
    var oo = t.modes = {},
        lo = t.mimeModes = {};
    t.defineMode = function(e, r) {
        if (t.defaults.mode || "null" == e || (t.defaults.mode = e), arguments.length > 2) {
            r.dependencies = [];
            for (var n = 2; n < arguments.length; ++n)
                r.dependencies.push(arguments[n])
        }
        oo[e] = r
    }, t.defineMIME = function(t, e) {
        lo[t] = e
    }, t.resolveMode = function(e) {
        if ("string" == typeof e && lo.hasOwnProperty(e))
            e = lo[e];
        else if (e && "string" == typeof e.name && lo.hasOwnProperty(e.name)) {
            var r = lo[e.name];
            e = qn(r, e), e.name = r.name
        } else if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+xml$/.test(e))
            return t.resolveMode("application/xml");
        return "string" == typeof e ? {
            name: e
        } : e || {
            name: "null"
        }
    }, t.getMode = function(e, r) {
        var r = t.resolveMode(r),
            n = oo[r.name];
        if (!n)
            return t.getMode(e, "text/plain");
        var i = n(e, r);
        if (so.hasOwnProperty(r.name)) {
            var o = so[r.name];
            for (var l in o)
                o.hasOwnProperty(l) && (i.hasOwnProperty(l) && (i["_" + l] = i[l]), i[l] = o[l])
        }
        return i.name = r.name, i
    }, t.defineMode("null", function() {
        return {
            token: function(t) {
                t.skipToEnd()
            }
        }
    }), t.defineMIME("text/plain", "null");
    var so = t.modeExtensions = {};
    t.extendMode = function(t, e) {
        var r = so.hasOwnProperty(t) ? so[t] : so[t] = {};
        Jn(e, r)
    }, t.defineExtension = function(e, r) {
        t.prototype[e] = r
    }, t.defineDocExtension = function(t, e) {
        yo.prototype[t] = e
    }, t.defineOption = gr;
    var ao = [];
    t.defineInitHook = function(t) {
        ao.push(t)
    };
    var uo = t.helpers = {};
    t.registerHelper = function(e, r, n) {
        uo.hasOwnProperty(e) || (uo[e] = t[e] = {}), uo[e][r] = n
    }, t.isWordChar = ei, t.copyState = mr, t.startState = vr, t.innerMode = function(t, e) {
        for (; t.innerMode;) {
            var r = t.innerMode(e);
            if (!r || r.mode == t)
                break;
            e = r.state, t = r.mode
        }
        return r || {
                mode: t,
                state: e
            }
    };
    var co = t.commands = {
            selectAll: function(t) {
                t.setSelection(Ue(t.firstLine(), 0), Ue(t.lastLine()))
            },
            killLine: function(t) {
                var e = t.getCursor(!0),
                    r = t.getCursor(!1),
                    n = !Xe(e, r);
                n || t.getLine(e.line).length != e.ch ? t.replaceRange("", e, n ? r : Ue(e.line), "+delete") : t.replaceRange("", e, Ue(e.line + 1, 0), "+delete")
            },
            deleteLine: function(t) {
                var e = t.getCursor().line;
                t.replaceRange("", Ue(e, 0), Ue(e), "+delete")
            },
            delLineLeft: function(t) {
                var e = t.getCursor();
                t.replaceRange("", Ue(e.line, 0), e, "+delete")
            },
            undo: function(t) {
                t.undo()
            },
            redo: function(t) {
                t.redo()
            },
            goDocStart: function(t) {
                t.extendSelection(Ue(t.firstLine(), 0))
            },
            goDocEnd: function(t) {
                t.extendSelection(Ue(t.lastLine()))
            },
            goLineStart: function(t) {
                t.extendSelection(mi(t, t.getCursor().line))
            },
            goLineStartSmart: function(t) {
                var e = t.getCursor(),
                    r = mi(t, e.line),
                    n = t.getLineHandle(r.line),
                    i = yn(n);
                if (i && 0 != i[0].level)
                    t.extendSelection(r);
                else {
                    var o = Math.max(0, n.text.search(/\S/)),
                        l = e.line == r.line && e.ch <= o && e.ch;
                    t.extendSelection(Ue(r.line, l ? 0 : o))
                }
            },
            goLineEnd: function(t) {
                t.extendSelection(vi(t, t.getCursor().line))
            },
            goLineRight: function(t) {
                var e = t.charCoords(t.getCursor(), "div").top + 5;
                t.extendSelection(t.coordsChar({
                    left: t.display.lineDiv.offsetWidth + 100,
                    top: e
                }, "div"))
            },
            goLineLeft: function(t) {
                var e = t.charCoords(t.getCursor(), "div").top + 5;
                t.extendSelection(t.coordsChar({
                    left: 0,
                    top: e
                }, "div"))
            },
            goLineUp: function(t) {
                t.moveV(-1, "line")
            },
            goLineDown: function(t) {
                t.moveV(1, "line")
            },
            goPageUp: function(t) {
                t.moveV(-1, "page")
            },
            goPageDown: function(t) {
                t.moveV(1, "page")
            },
            goCharLeft: function(t) {
                t.moveH(-1, "char")
            },
            goCharRight: function(t) {
                t.moveH(1, "char")
            },
            goColumnLeft: function(t) {
                t.moveH(-1, "column")
            },
            goColumnRight: function(t) {
                t.moveH(1, "column")
            },
            goWordLeft: function(t) {
                t.moveH(-1, "word")
            },
            goGroupRight: function(t) {
                t.moveH(1, "group")
            },
            goGroupLeft: function(t) {
                t.moveH(-1, "group")
            },
            goWordRight: function(t) {
                t.moveH(1, "word")
            },
            delCharBefore: function(t) {
                t.deleteH(-1, "char")
            },
            delCharAfter: function(t) {
                t.deleteH(1, "char")
            },
            delWordBefore: function(t) {
                t.deleteH(-1, "word")
            },
            delWordAfter: function(t) {
                t.deleteH(1, "word")
            },
            delGroupBefore: function(t) {
                t.deleteH(-1, "group")
            },
            delGroupAfter: function(t) {
                t.deleteH(1, "group")
            },
            indentAuto: function(t) {
                t.indentSelection("smart")
            },
            indentMore: function(t) {
                t.indentSelection("add")
            },
            indentLess: function(t) {
                t.indentSelection("subtract")
            },
            insertTab: function(t) {
                t.replaceSelection("	", "end", "+input")
            },
            defaultTab: function(t) {
                t.somethingSelected() ? t.indentSelection("add") : t.replaceSelection("	", "end", "+input")
            },
            transposeChars: function(t) {
                var e = t.getCursor(),
                    r = t.getLine(e.line);
                e.ch > 0 && e.ch < r.length - 1 && t.replaceRange(r.charAt(e.ch) + r.charAt(e.ch - 1), Ue(e.line, e.ch - 1), Ue(e.line, e.ch + 1))
            },
            newlineAndIndent: function(t) {
                oe(t, function() {
                    t.replaceSelection("\n", "end", "+input"), t.indentLine(t.getCursor().line, null, !0)
                })()
            },
            toggleOverwrite: function(t) {
                t.toggleOverwrite()
            }
        },
        fo = t.keyMap = {};
    fo.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharAfter",
        Backspace: "delCharBefore",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite"
    }, fo.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Alt-Up": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Down": "goDocEnd",
        "Ctrl-Left": "goGroupLeft",
        "Ctrl-Right": "goGroupRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore",
        "Ctrl-Delete": "delGroupAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        fallthrough: "basic"
    }, fo.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
        "Cmd-Left": "goLineStart",
        "Cmd-Right": "goLineEnd",
        "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter",
        "Alt-Delete": "delGroupAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        "Cmd-Backspace": "delLineLeft",
        fallthrough: ["basic", "emacsy"]
    }, fo["default"] = Fi ? fo.macDefault : fo.pcDefault, fo.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-D": "delWordAfter",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars"
    }, t.lookupKey = br, t.isModifierKey = xr, t.keyName = Cr, t.fromTextArea = function(e, r) {
        function n() {
            e.value = u.getValue()
        }
        if (r || (r = {}), r.value = e.value, !r.tabindex && e.tabindex && (r.tabindex = e.tabindex), !r.placeholder && e.placeholder && (r.placeholder = e.placeholder), null == r.autofocus) {
            var i = document.body;
            try {
                i = document.activeElement
            } catch (o) {}
            r.autofocus = i == e || null != e.getAttribute("autofocus") && i == document.body
        }
        if (e.form && (Pn(e.form, "submit", n), !r.leaveSubmitMethodAlone)) {
            var l = e.form,
                s = l.submit;
            try {
                var a = l.submit = function() {
                    n(), l.submit = s, l.submit(), l.submit = a
                }
            } catch (o) {}
        }
        e.style.display = "none";
        var u = t(function(t) {
            e.parentNode.insertBefore(t, e.nextSibling)
        }, r);
        return u.save = n, u.getTextArea = function() {
            return e
        }, u.toTextArea = function() {
            n(), e.parentNode.removeChild(u.getWrapperElement()), e.style.display = "", e.form && (Fn(e.form, "submit", n), "function" == typeof e.form.submit && (e.form.submit = s))
        }, u
    }, wr.prototype = {
        eol: function() {
            return this.pos >= this.string.length
        },
        sol: function() {
            return 0 == this.pos
        },
        peek: function() {
            return this.string.charAt(this.pos) || void 0
        },
        next: function() {
            return this.pos < this.string.length ? this.string.charAt(this.pos++) : void 0
        },
        eat: function(t) {
            var e = this.string.charAt(this.pos);
            if ("string" == typeof t)
                var r = e == t;
            else
                var r = e && (t.test ? t.test(e) : t(e));
            return r ? (++this.pos, e) : void 0
        },
        eatWhile: function(t) {
            for (var e = this.pos; this.eat(t);)
                ;
            return this.pos > e
        },
        eatSpace: function() {
            for (var t = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos));)
                ++this.pos;
            return this.pos > t
        },
        skipToEnd: function() {
            this.pos = this.string.length
        },
        skipTo: function(t) {
            var e = this.string.indexOf(t, this.pos);
            return e > -1 ? (this.pos = e, !0) : void 0
        },
        backUp: function(t) {
            this.pos -= t
        },
        column: function() {
            return this.lastColumnPos < this.start && (this.lastColumnValue = _n(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue
        },
        indentation: function() {
            return _n(this.string, null, this.tabSize)
        },
        match: function(t, e, r) {
            if ("string" != typeof t) {
                var n = this.string.slice(this.pos).match(t);
                return n && n.index > 0 ? null : (n && e !== !1 && (this.pos += n[0].length), n)
            }
            var i = function(t) {
                    return r ? t.toLowerCase() : t
                },
                o = this.string.substr(this.pos, t.length);
            return i(o) == i(t) ? (e !== !1 && (this.pos += t.length), !0) : void 0
        },
        current: function() {
            return this.string.slice(this.start, this.pos)
        }
    }, t.StringStream = wr, t.TextMarker = Lr, Un(Lr), Lr.prototype.clear = function() {
        if (!this.explicitlyCleared) {
            var t = this.doc.cm,
                e = t && !t.curOp;
            if (e && ne(t), Kn(this, "clear")) {
                var r = this.find();
                r && Bn(this, "clear", r.from, r.to)
            }
            for (var n = null, i = null, o = 0; o < this.lines.length; ++o) {
                var l = this.lines[o],
                    s = Tr(l.markedSpans, this);
                null != s.to && (i = gn(l)), l.markedSpans = Ar(l.markedSpans, s), null != s.from ? n = gn(l) : this.collapsed && !Rr(this.doc, l) && t && pn(l, ee(t.display))
            }
            if (t && this.collapsed && !t.options.lineWrapping)
                for (var o = 0; o < this.lines.length; ++o) {
                    var a = Fr(t.doc, this.lines[o]),
                        u = c(t.doc, a);
                    u > t.display.maxLineLength && (t.display.maxLine = a, t.display.maxLineLength = u, t.display.maxLineChanged = !0)
                }
            null != n && t && ae(t, n, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, t && er(t)), e && ie(t)
        }
    }, Lr.prototype.find = function() {
        for (var t, e, r = 0; r < this.lines.length; ++r) {
            var n = this.lines[r],
                i = Tr(n.markedSpans, this);
            if (null != i.from || null != i.to) {
                var o = gn(n);
                null != i.from && (t = Ue(o, i.from)), null != i.to && (e = Ue(o, i.to))
            }
        }
        return "bookmark" == this.type ? t : t && {
            from: t,
            to: e
        }
    }, Lr.prototype.changed = function() {
        var t = this.find(),
            e = this.doc.cm;
        if (t && e) {
            "bookmark" != this.type && (t = t.from);
            var r = fn(this.doc, t.line);
            if (G(e, r), t.line >= e.display.showingFrom && t.line < e.display.showingTo) {
                for (var n = e.display.lineDiv.firstChild; n; n = n.nextSibling)
                    if (n.lineObj == r) {
                        n.offsetHeight != r.height && pn(r, n.offsetHeight);
                        break
                    }
                se(e, function() {
                    e.curOp.selectionChanged = e.curOp.forceUpdate = e.curOp.updateMaxLine = !0
                })
            }
        }
    }, Lr.prototype.attachLine = function(t) {
        if (!this.lines.length && this.doc.cm) {
            var e = this.doc.cm.curOp;
            e.maybeHiddenMarkers && -1 != Zn(e.maybeHiddenMarkers, this) || (e.maybeUnhiddenMarkers || (e.maybeUnhiddenMarkers = [])).push(this)
        }
        this.lines.push(t)
    }, Lr.prototype.detachLine = function(t) {
        if (this.lines.splice(Zn(this.lines, t), 1), !this.lines.length && this.doc.cm) {
            var e = this.doc.cm.curOp;
            (e.maybeHiddenMarkers || (e.maybeHiddenMarkers = [])).push(this)
        }
    }, t.SharedTextMarker = Sr, Un(Sr), Sr.prototype.clear = function() {
        if (!this.explicitlyCleared) {
            this.explicitlyCleared = !0;
            for (var t = 0; t < this.markers.length; ++t)
                this.markers[t].clear();
            Bn(this, "clear")
        }
    }, Sr.prototype.find = function() {
        return this.primary.find()
    };
    var ho = t.LineWidget = function(t, e, r) {
        if (r)
            for (var n in r)
                r.hasOwnProperty(n) && (this[n] = r[n]);
        this.cm = t, this.node = e
    };
    Un(ho), ho.prototype.clear = Kr(function() {
        var t = this.line.widgets,
            e = gn(this.line);
        if (null != e && t) {
            for (var r = 0; r < t.length; ++r)
                t[r] == this && t.splice(r--, 1);
            t.length || (this.line.widgets = null);
            var n = vn(this.cm, this.line) < this.cm.doc.scrollTop;
            pn(this.line, Math.max(0, this.line.height - Ur(this))), n && ar(this.cm, 0, -this.height), ae(this.cm, e, e + 1)
        }
    }), ho.prototype.changed = Kr(function() {
        var t = this.height;
        this.height = null;
        var e = Ur(this) - t;
        if (e) {
            pn(this.line, this.line.height + e);
            var r = gn(this.line);
            ae(this.cm, r, r + 1)
        }
    });
    var po = t.Line = function(t, e, r) {
        this.text = t, Vr(this, e), this.height = r ? r(this) : 1
    };
    Un(po);
    var go = {},
        mo = /[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\uFEFF]/g;
    sn.prototype = {
        chunkSize: function() {
            return this.lines.length
        },
        removeInner: function(t, e) {
            for (var r = t, n = t + e; n > r; ++r) {
                var i = this.lines[r];
                this.height -= i.height, Yr(i), Bn(i, "delete")
            }
            this.lines.splice(t, e)
        },
        collapse: function(t) {
            t.splice.apply(t, [t.length, 0].concat(this.lines))
        },
        insertInner: function(t, e, r) {
            this.height += r, this.lines = this.lines.slice(0, t).concat(e).concat(this.lines.slice(t));
            for (var n = 0, i = e.length; i > n; ++n)
                e[n].parent = this
        },
        iterN: function(t, e, r) {
            for (var n = t + e; n > t; ++t)
                if (r(this.lines[t]))
                    return !0
        }
    }, an.prototype = {
        chunkSize: function() {
            return this.size
        },
        removeInner: function(t, e) {
            this.size -= e;
            for (var r = 0; r < this.children.length; ++r) {
                var n = this.children[r],
                    i = n.chunkSize();
                if (i > t) {
                    var o = Math.min(e, i - t),
                        l = n.height;
                    if (n.removeInner(t, o), this.height -= l - n.height, i == o && (this.children.splice(r--, 1), n.parent = null), 0 == (e -= o))
                        break;
                    t = 0
                } else
                    t -= i
            }
            if (this.size - e < 25) {
                var s = [];
                this.collapse(s), this.children = [new sn(s)], this.children[0].parent = this
            }
        },
        collapse: function(t) {
            for (var e = 0, r = this.children.length; r > e; ++e)
                this.children[e].collapse(t)
        },
        insertInner: function(t, e, r) {
            this.size += e.length, this.height += r;
            for (var n = 0, i = this.children.length; i > n; ++n) {
                var o = this.children[n],
                    l = o.chunkSize();
                if (l >= t) {
                    if (o.insertInner(t, e, r), o.lines && o.lines.length > 50) {
                        for (; o.lines.length > 50;) {
                            var s = o.lines.splice(o.lines.length - 25, 25),
                                a = new sn(s);
                            o.height -= a.height, this.children.splice(n + 1, 0, a), a.parent = this
                        }
                        this.maybeSpill()
                    }
                    break
                }
                t -= l
            }
        },
        maybeSpill: function() {
            if (!(this.children.length <= 10)) {
                var t = this;
                do {
                    var e = t.children.splice(t.children.length - 5, 5),
                        r = new an(e);
                    if (t.parent) {
                        t.size -= r.size, t.height -= r.height;
                        var n = Zn(t.parent.children, t);
                        t.parent.children.splice(n + 1, 0, r)
                    } else {
                        var i = new an(t.children);
                        i.parent = t, t.children = [i, r], t = i
                    }
                    r.parent = t.parent
                } while (t.children.length > 10);
                t.parent.maybeSpill()
            }
        },
        iterN: function(t, e, r) {
            for (var n = 0, i = this.children.length; i > n; ++n) {
                var o = this.children[n],
                    l = o.chunkSize();
                if (l > t) {
                    var s = Math.min(e, l - t);
                    if (o.iterN(t, s, r))
                        return !0;
                    if (0 == (e -= s))
                        break;
                    t = 0
                } else
                    t -= l
            }
        }
    };
    var vo = 0,
        yo = t.Doc = function(t, e, r) {
            if (!(this instanceof yo))
                return new yo(t, e, r);
            null == r && (r = 0), an.call(this, [new sn([new po("", null)])]), this.first = r, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.history = bn(), this.cleanGeneration = 1, this.frontier = r;
            var n = Ue(r, 0);
            this.sel = {
                from: n,
                to: n,
                head: n,
                anchor: n,
                shift: !1,
                extend: !1,
                goalColumn: null
            }, this.id = ++vo, this.modeOption = e, "string" == typeof t && (t = Do(t)), ln(this, {
                from: n,
                to: n,
                text: t
            }, null, {
                head: n,
                anchor: n
            })
        };
    yo.prototype = qn(an.prototype, {
        constructor: yo,
        iter: function(t, e, r) {
            r ? this.iterN(t - this.first, e - t, r) : this.iterN(this.first, this.first + this.size, t)
        },
        insert: function(t, e) {
            for (var r = 0, n = 0, i = e.length; i > n; ++n)
                r += e[n].height;
            this.insertInner(t - this.first, e, r)
        },
        remove: function(t, e) {
            this.removeInner(t - this.first, e)
        },
        getValue: function(t) {
            var e = dn(this, this.first, this.first + this.size);
            return t === !1 ? e : e.join(t || "\n")
        },
        setValue: function(t) {
            var e = Ue(this.first, 0),
                r = this.first + this.size - 1;
            Pe(this, {
                from: e,
                to: Ue(r, fn(this, r).text.length),
                text: Do(t),
                origin: "setValue"
            }, {
                head: e,
                anchor: e
            }, !0)
        },
        replaceRange: function(t, e, r, n) {
            e = $e(this, e), r = r ? $e(this, r) : e, Ke(this, t, e, r, n)
        },
        getRange: function(t, e, r) {
            var n = hn(this, $e(this, t), $e(this, e));
            return r === !1 ? n : n.join(r || "\n")
        },
        getLine: function(t) {
            var e = this.getLineHandle(t);
            return e && e.text
        },
        setLine: function(t, e) {
            qe(this, t) && Ke(this, e, Ue(t, 0), $e(this, Ue(t)))
        },
        removeLine: function(t) {
            t ? Ke(this, "", $e(this, Ue(t - 1)), $e(this, Ue(t))) : Ke(this, "", Ue(0, 0), $e(this, Ue(1, 0)))
        },
        getLineHandle: function(t) {
            return qe(this, t) ? fn(this, t) : void 0
        },
        getLineNumber: function(t) {
            return gn(t)
        },
        getLineHandleVisualStart: function(t) {
            return "number" == typeof t && (t = fn(this, t)), Fr(this, t)
        },
        lineCount: function() {
            return this.size
        },
        firstLine: function() {
            return this.first
        },
        lastLine: function() {
            return this.first + this.size - 1
        },
        clipPos: function(t) {
            return $e(this, t)
        },
        getCursor: function(t) {
            var e,
                r = this.sel;
            return e = null == t || "head" == t ? r.head : "anchor" == t ? r.anchor : "end" == t || t === !1 ? r.to : r.from, Ye(e)
        },
        somethingSelected: function() {
            return !Xe(this.sel.head, this.sel.anchor)
        },
        setCursor: le(function(t, e, r) {
            var n = $e(this, "number" == typeof t ? Ue(t, e || 0) : t);
            r ? Je(this, n) : tr(this, n, n)
        }),
        setSelection: le(function(t, e, r) {
            tr(this, $e(this, t), $e(this, e || t), r)
        }),
        extendSelection: le(function(t, e, r) {
            Je(this, $e(this, t), e && $e(this, e), r)
        }),
        getSelection: function(t) {
            return this.getRange(this.sel.from, this.sel.to, t)
        },
        replaceSelection: function(t, e, r) {
            Pe(this, {
                from: this.sel.from,
                to: this.sel.to,
                text: Do(t),
                origin: r
            }, e || "around")
        },
        undo: le(function() {
            Re(this, "undo")
        }),
        redo: le(function() {
            Re(this, "redo")
        }),
        setExtending: function(t) {
            this.sel.extend = t
        },
        historySize: function() {
            var t = this.history;
            return {
                undo: t.done.length,
                redo: t.undone.length
            }
        },
        clearHistory: function() {
            this.history = bn(this.history.maxGeneration)
        },
        markClean: function() {
            this.cleanGeneration = this.changeGeneration()
        },
        changeGeneration: function() {
            return this.history.lastOp = this.history.lastOrigin = null, this.history.generation
        },
        isClean: function(t) {
            return this.history.generation == (t || this.cleanGeneration)
        },
        getHistory: function() {
            return {
                done: Sn(this.history.done),
                undone: Sn(this.history.undone)
            }
        },
        setHistory: function(t) {
            var e = this.history = bn(this.history.maxGeneration);
            e.done = t.done.slice(0), e.undone = t.undone.slice(0)
        },
        markText: function(t, e, r) {
            return kr(this, $e(this, t), $e(this, e), r, "range")
        },
        setBookmark: function(t, e) {
            var r = {
                replacedWith: e && (null == e.nodeType ? e.widget : e),
                insertLeft: e && e.insertLeft
            };
            return t = $e(this, t), kr(this, t, t, r, "bookmark")
        },
        findMarksAt: function(t) {
            t = $e(this, t);
            var e = [],
                r = fn(this, t.line).markedSpans;
            if (r)
                for (var n = 0; n < r.length; ++n) {
                    var i = r[n];
                    (null == i.from || i.from <= t.ch) && (null == i.to || i.to >= t.ch) && e.push(i.marker.parent || i.marker)
                }
            return e
        },
        getAllMarks: function() {
            var t = [];
            return this.iter(function(e) {
                var r = e.markedSpans;
                if (r)
                    for (var n = 0; n < r.length; ++n)
                        null != r[n].from && t.push(r[n].marker)
            }), t
        },
        posFromIndex: function(t) {
            var e,
                r = this.first;
            return this.iter(function(n) {
                var i = n.text.length + 1;
                return i > t ? (e = t, !0) : (t -= i, ++r, void 0)
            }), $e(this, Ue(r, e))
        },
        indexFromPos: function(t) {
            t = $e(this, t);
            var e = t.ch;
            return t.line < this.first || t.ch < 0 ? 0 : (this.iter(this.first, t.line, function(t) {
                e += t.text.length + 1
            }), e)
        },
        copy: function(t) {
            var e = new yo(dn(this, this.first, this.first + this.size), this.modeOption, this.first);
            return e.scrollTop = this.scrollTop, e.scrollLeft = this.scrollLeft, e.sel = {
                from: this.sel.from,
                to: this.sel.to,
                head: this.sel.head,
                anchor: this.sel.anchor,
                shift: this.sel.shift,
                extend: !1,
                goalColumn: this.sel.goalColumn
            }, t && (e.history.undoDepth = this.history.undoDepth, e.setHistory(this.getHistory())), e
        },
        linkedDoc: function(t) {
            t || (t = {});
            var e = this.first,
                r = this.first + this.size;
            null != t.from && t.from > e && (e = t.from), null != t.to && t.to < r && (r = t.to);
            var n = new yo(dn(this, e, r), t.mode || this.modeOption, e);
            return t.sharedHist && (n.history = this.history), (this.linked || (this.linked = [])).push({
                doc: n,
                sharedHist: t.sharedHist
            }), n.linked = [{
                doc: this,
                isParent: !0,
                sharedHist: t.sharedHist
            }], n
        },
        unlinkDoc: function(e) {
            if (e instanceof t && (e = e.doc), this.linked)
                for (var r = 0; r < this.linked.length; ++r) {
                    var n = this.linked[r];
                    if (n.doc == e) {
                        this.linked.splice(r, 1), e.unlinkDoc(this);
                        break
                    }
                }
            if (e.history == this.history) {
                var i = [e.id];
                un(e, function(t) {
                    i.push(t.id)
                }, !0), e.history = bn(), e.history.done = Sn(this.history.done, i), e.history.undone = Sn(this.history.undone, i)
            }
        },
        iterLinkedDocs: function(t) {
            un(this, t)
        },
        getMode: function() {
            return this.mode
        },
        getEditor: function() {
            return this.cm
        }
    }), yo.prototype.eachLine = yo.prototype.iter;
    var bo = "iter insert remove copy getEditor".split(" ");
    for (var xo in yo.prototype)
        yo.prototype.hasOwnProperty(xo) && Zn(bo, xo) < 0 && (t.prototype[xo] = function(t) {
            return function() {
                return t.apply(this.doc, arguments)
            }
        }(yo.prototype[xo]));
    Un(yo), t.e_stop = En, t.e_preventDefault = Dn, t.e_stopPropagation = Wn;
    var Co,
        wo = 0;
    t.on = Pn, t.off = Fn, t.signal = Rn;
    var Lo = 30,
        ko = t.Pass = {
            toString: function() {
                return "CodeMirror.Pass"
            }
        };
    Xn.prototype = {
        set: function(t, e) {
            clearTimeout(this.id), this.id = setTimeout(e, t)
        }
    }, t.countColumn = _n;
    var So = [""],
        Mo = /[\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
        To = /[\u0300-\u036F\u0483-\u0487\u0488-\u0489\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED\uA66F\uA670-\uA672\uA674-\uA67D\uA69F\udc00-\udfff]/;
    t.replaceGetRect = function(t) {
        si = t
    };
    var Ao = function() {
        if (Mi)
            return !1;
        var t = ni("div");
        return "draggable" in t || "dragDrop" in t
    }();
    Li ? ai = function(t, e) {
        return 36 == t.charCodeAt(e - 1) && 39 == t.charCodeAt(e)
    } : Di && !/Version\/([6-9]|\d\d)\b/.test(navigator.userAgent) ? ai = function(t, e) {
        return /\-[^ \-?]|\?[^ !\'\"\),.\-\/:;\?\]\}]/.test(t.slice(e - 1, e + 1))
    } : Ti && !/Chrome\/(?:29|[3-9]\d|\d\d\d)\./.test(navigator.userAgent) && (ai = function(t, e) {
        if (e > 1 && 45 == t.charCodeAt(e - 1)) {
            if (/\w/.test(t.charAt(e - 2)) && /[^\-?\.]/.test(t.charAt(e)))
                return !0;
            if (e > 2 && /[\d\.,]/.test(t.charAt(e - 2)) && /[\d\.,]/.test(t.charAt(e)))
                return !1
        }
        return /[~!#%&*)=+}\]|\"\.>,:;][({[<]|-[^\-?\.\u2010-\u201f\u2026]|\?[\w~`@#$%\^&*(_=+{[|><]|…[\w~`@#$%\^&*(_=+{[><]/.test(t.slice(e - 1, e + 1))
    });
    var No,
        Ho,
        Do = 3 != "\n\nb".split(/\n/).length ? function(t) {
            for (var e = 0, r = [], n = t.length; n >= e;) {
                var i = t.indexOf("\n", e);
                -1 == i && (i = t.length);
                var o = t.slice(e, "\r" == t.charAt(i - 1) ? i - 1 : i),
                    l = o.indexOf("\r");
                -1 != l ? (r.push(o.slice(0, l)), e += l + 1) : (r.push(o), e = i + 1)
            }
            return r
        } : function(t) {
            return t.split(/\r\n?|\n/)
        };
    t.splitLines = Do;
    var Wo = window.getSelection ? function(t) {
            try {
                return t.selectionStart != t.selectionEnd
            } catch (e) {
                return !1
            }
        } : function(t) {
            try {
                var e = t.ownerDocument.selection.createRange()
            } catch (r) {}
            return e && e.parentElement() == t ? 0 != e.compareEndPoints("StartToEnd", e) : !1
        },
        Oo = function() {
            var t = ni("div");
            return "oncopy" in t ? !0 : (t.setAttribute("oncopy", "return;"), "function" == typeof t.oncopy)
        }(),
        Eo = {
            3: "Enter",
            8: "Backspace",
            9: "Tab",
            13: "Enter",
            16: "Shift",
            17: "Ctrl",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Esc",
            32: "Space",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "Left",
            38: "Up",
            39: "Right",
            40: "Down",
            44: "PrintScrn",
            45: "Insert",
            46: "Delete",
            59: ";",
            91: "Mod",
            92: "Mod",
            93: "Mod",
            109: "-",
            107: "=",
            127: "Delete",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'",
            63276: "PageUp",
            63277: "PageDown",
            63275: "End",
            63273: "Home",
            63234: "Left",
            63232: "Up",
            63235: "Right",
            63233: "Down",
            63302: "Insert",
            63272: "Delete"
        };
    t.keyNames = Eo, function() {
        for (var t = 0; 10 > t; t++)
            Eo[t + 48] = String(t);
        for (var t = 65; 90 >= t; t++)
            Eo[t] = String.fromCharCode(t);
        for (var t = 1; 12 >= t; t++)
            Eo[t + 111] = Eo[t + 63235] = "F" + t
    }();
    var zo,
        Io = function() {
            function t(t) {
                return 255 >= t ? e.charAt(t) : t >= 1424 && 1524 >= t ? "R" : t >= 1536 && 1791 >= t ? r.charAt(t - 1536) : t >= 1792 && 2220 >= t ? "r" : "L"
            }
            var e = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLL",
                r = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmmrrrrrrrrrrrrrrrrrr",
                n = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
                i = /[stwN]/,
                o = /[LRr]/,
                l = /[Lb1n]/,
                s = /[1n]/,
                a = "L";
            return function(e) {
                if (!n.test(e))
                    return !1;
                for (var r, u = e.length, c = [], f = 0; u > f; ++f)
                    c.push(r = t(e.charCodeAt(f)));
                for (var f = 0, h = a; u > f; ++f) {
                    var r = c[f];
                    "m" == r ? c[f] = h : h = r
                }
                for (var f = 0, d = a; u > f; ++f) {
                    var r = c[f];
                    "1" == r && "r" == d ? c[f] = "n" : o.test(r) && (d = r, "r" == r && (c[f] = "R"))
                }
                for (var f = 1, h = c[0]; u - 1 > f; ++f) {
                    var r = c[f];
                    "+" == r && "1" == h && "1" == c[f + 1] ? c[f] = "1" : "," != r || h != c[f + 1] || "1" != h && "n" != h || (c[f] = h), h = r
                }
                for (var f = 0; u > f; ++f) {
                    var r = c[f];
                    if ("," == r)
                        c[f] = "N";
                    else if ("%" == r) {
                        for (var p = f + 1; u > p && "%" == c[p]; ++p)
                            ;
                        for (var g = f && "!" == c[f - 1] || u - 1 > p && "1" == c[p] ? "1" : "N", m = f; p > m; ++m)
                            c[m] = g;
                        f = p - 1
                    }
                }
                for (var f = 0, d = a; u > f; ++f) {
                    var r = c[f];
                    "L" == d && "1" == r ? c[f] = "L" : o.test(r) && (d = r)
                }
                for (var f = 0; u > f; ++f)
                    if (i.test(c[f])) {
                        for (var p = f + 1; u > p && i.test(c[p]); ++p)
                            ;
                        for (var v = "L" == (f ? c[f - 1] : a), y = "L" == (u - 1 > p ? c[p] : a), g = v || y ? "L" : "R", m = f; p > m; ++m)
                            c[m] = g;
                        f = p - 1
                    }
                for (var b, x = [], f = 0; u > f;)
                    if (l.test(c[f])) {
                        var C = f;
                        for (++f; u > f && l.test(c[f]); ++f)
                            ;
                        x.push({
                            from: C,
                            to: f,
                            level: 0
                        })
                    } else {
                        var w = f,
                            L = x.length;
                        for (++f; u > f && "L" != c[f]; ++f)
                            ;
                        for (var m = w; f > m;)
                            if (s.test(c[m])) {
                                m > w && x.splice(L, 0, {
                                    from: w,
                                    to: m,
                                    level: 1
                                });
                                var k = m;
                                for (++m; f > m && s.test(c[m]); ++m)
                                    ;
                                x.splice(L, 0, {
                                    from: k,
                                    to: m,
                                    level: 2
                                }), w = m
                            } else
                                ++m;
                        f > w && x.splice(L, 0, {
                            from: w,
                            to: f,
                            level: 1
                        })
                    }
                return 1 == x[0].level && (b = e.match(/^\s+/)) && (x[0].from = b[0].length, x.unshift({
                    from: 0,
                    to: b[0].length,
                    level: 0
                })), 1 == jn(x).level && (b = e.match(/\s+$/)) && (jn(x).to -= b[0].length, x.push({
                    from: u - b[0].length,
                    to: u,
                    level: 0
                })), x[0].level != jn(x).level && x.push({
                    from: u,
                    to: u,
                    level: x[0].level
                }), x
            }
        }();
    return t.version = "3.16.1", t
}();
