var t, e;
t = this, e = function() {
    function t1(t2, e2) {
        var n = Object.keys(t2);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t2);
            e2 && (r = r.filter(function(e3) {
                return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
            })), n.push.apply(n, r);
        }
        return n;
    }
    function e1(e4) {
        for(var n = 1; n < arguments.length; n++){
            var i = null != arguments[n] ? arguments[n] : {
            };
            n % 2 ? t1(Object(i), !0).forEach(function(t3) {
                r1(e4, t3, i[t3]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e4, Object.getOwnPropertyDescriptors(i)) : t1(Object(i)).forEach(function(t4) {
                Object.defineProperty(e4, t4, Object.getOwnPropertyDescriptor(i, t4));
            });
        }
        return e4;
    }
    function n1(t5) {
        return (n1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t6) {
            return typeof t6;
        } : function(t7) {
            return t7 && "function" == typeof Symbol && t7.constructor === Symbol && t7 !== Symbol.prototype ? "symbol" : typeof t7;
        })(t5);
    }
    function r1(t8, e5, n) {
        return e5 in t8 ? Object.defineProperty(t8, e5, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t8[e5] = n, t8;
    }
    function i1(t9) {
        return (function(t10) {
            if (Array.isArray(t10)) return s1(t10);
        })(t9) || (function(t11) {
            if ("undefined" != typeof Symbol && null != t11[Symbol.iterator] || null != t11["@@iterator"]) return Array.from(t11);
        })(t9) || o1(t9) || (function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        })();
    }
    function o1(t12, e6) {
        if (t12) {
            if ("string" == typeof t12) return s1(t12, e6);
            var n = Object.prototype.toString.call(t12).slice(8, -1);
            return "Object" === n && t12.constructor && (n = t12.constructor.name), "Map" === n || "Set" === n ? Array.from(t12) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? s1(t12, e6) : void 0;
        }
    }
    function s1(t13, e7) {
        (null == e7 || e7 > t13.length) && (e7 = t13.length);
        for(var n = 0, r = new Array(e7); n < e7; n++)r[n] = t13[n];
        return r;
    }
    var u1 = function(t14) {
        return "string" == typeof t14 ? document.querySelector(t14) : t14();
    }, a1 = function(t15, e8) {
        var n = "string" == typeof t15 ? document.createElement(t15) : t15;
        for(var r in e8){
            var i = e8[r];
            if ("inside" === r) i.append(n);
            else if ("dest" === r) u1(i[0]).insertAdjacentElement(i[1], n);
            else if ("around" === r) {
                var o = i;
                o.parentNode.insertBefore(n, o), n.append(o), null != o.getAttribute("autofocus") && o.focus();
            } else r in n ? n[r] = i : n.setAttribute(r, i);
        }
        return n;
    }, c1 = function(t16, e9) {
        return t16 = t16.toString().toLowerCase(), e9 ? t16.normalize("NFD").replace(/[\u0300-\u036f]/g, "").normalize("NFC") : t16;
    }, l1 = function(t17, n) {
        return a1("mark", e1({
            innerHTML: t17
        }, "string" == typeof n && {
            class: n
        })).outerHTML;
    }, f1 = function(t18, e10) {
        e10.input.dispatchEvent(new CustomEvent(t18, {
            bubbles: !0,
            detail: e10.feedback,
            cancelable: !0
        }));
    }, p1 = function(t19, e11, n) {
        var r = n || {
        }, i = r.mode, o = r.diacritics, s = r.highlight, u = c1(e11, o);
        if (e11 = e11.toString(), t19 = c1(t19, o), "loose" === i) {
            var a = (t19 = t19.replace(/ /g, "")).length, f = 0, p = Array.from(e11).map(function(e12, n) {
                return f < a && u[n] === t19[f] && (e12 = s ? l1(e12, s) : e12, f++), e12;
            }).join("");
            if (f === a) return p;
        } else {
            var d = u.indexOf(t19);
            if (~d) return t19 = e11.substring(d, d + t19.length), d = s ? e11.replace(t19, l1(t19, s)) : e11;
        }
    }, d1 = function(t20, e13) {
        return new Promise(function(n2, r) {
            var i;
            return (i = t20.data).cache && i.store ? n2() : new Promise(function(t21, n) {
                return "function" == typeof i.src ? i.src(e13).then(t21, n) : t21(i.src);
            }).then(function(e14) {
                try {
                    return t20.feedback = i.store = e14, f1("response", t20), n2();
                } catch (t22) {
                    return r(t22);
                }
            }, r);
        });
    }, h = function(t23, e15) {
        var n3 = e15.data, r2 = e15.searchEngine, i2 = [];
        n3.store.forEach(function(s3, u2) {
            var a2 = function(n) {
                var o = n ? s3[n] : s3, u = "function" == typeof r2 ? r2(t23, o) : p1(t23, o, {
                    mode: r2,
                    diacritics: e15.diacritics,
                    highlight: e15.resultItem.highlight
                });
                if (u) {
                    var a = {
                        match: u,
                        value: s3
                    };
                    n && (a.key = n), i2.push(a);
                }
            };
            if (n3.keys) {
                var c, l = function(t24, e16) {
                    var n = "undefined" != typeof Symbol && t24[Symbol.iterator] || t24["@@iterator"];
                    if (!n) {
                        if (Array.isArray(t24) || (n = o1(t24)) || e16 && t24 && "number" == typeof t24.length) {
                            n && (t24 = n);
                            var r = 0, i = function() {
                            };
                            return {
                                s: i,
                                n: function() {
                                    return r >= t24.length ? {
                                        done: !0
                                    } : {
                                        done: !1,
                                        value: t24[r++]
                                    };
                                },
                                e: function(t25) {
                                    throw t25;
                                },
                                f: i
                            };
                        }
                        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                    }
                    var s, u = !0, a = !1;
                    return {
                        s: function() {
                            n = n.call(t24);
                        },
                        n: function() {
                            var t26 = n.next();
                            return u = t26.done, t26;
                        },
                        e: function(t27) {
                            a = !0, s = t27;
                        },
                        f: function() {
                            try {
                                u || null == n.return || n.return();
                            } finally{
                                if (a) throw s;
                            }
                        }
                    };
                }(n3.keys);
                try {
                    for(l.s(); !(c = l.n()).done;)a2(c.value);
                } catch (t28) {
                    l.e(t28);
                } finally{
                    l.f();
                }
            } else a2();
        }), n3.filter && (i2 = n3.filter(i2));
        var s2 = i2.slice(0, e15.resultsList.maxResults);
        e15.feedback = {
            query: t23,
            matches: i2,
            results: s2
        }, f1("results", e15);
    }, m = "aria-expanded", b = "aria-activedescendant", y = "aria-selected", v = function(t29, n) {
        t29.feedback.selection = e1({
            index: n
        }, t29.feedback.results[n]);
    }, g = function(t30) {
        t30.isOpen || ((t30.wrapper || t30.input).setAttribute(m, !0), t30.list.removeAttribute("hidden"), t30.isOpen = !0, f1("open", t30));
    }, w = function(t31) {
        t31.isOpen && ((t31.wrapper || t31.input).setAttribute(m, !1), t31.input.setAttribute(b, ""), t31.list.setAttribute("hidden", ""), t31.isOpen = !1, f1("close", t31));
    }, O = function(t32, e17) {
        var n = e17.resultItem, r = e17.list.getElementsByTagName(n.tag), o = !!n.selected && n.selected.split(" ");
        if (e17.isOpen && r.length) {
            var s, u, a = e17.cursor;
            t32 >= r.length && (t32 = 0), t32 < 0 && (t32 = r.length - 1), e17.cursor = t32, a > -1 && (r[a].removeAttribute(y), o && (u = r[a].classList).remove.apply(u, i1(o))), r[t32].setAttribute(y, !0), o && (s = r[t32].classList).add.apply(s, i1(o)), e17.input.setAttribute(b, r[e17.cursor].id), e17.list.scrollTop = r[t32].offsetTop - e17.list.clientHeight + r[t32].clientHeight + 5, e17.feedback.cursor = e17.cursor, v(e17, t32), f1("navigate", e17);
        }
    }, A = function(t33) {
        O(t33.cursor + 1, t33);
    }, k = function(t34) {
        O(t34.cursor - 1, t34);
    }, L = function(t35, e18, n) {
        (n = n >= 0 ? n : t35.cursor) < 0 || (t35.feedback.event = e18, v(t35, n), f1("selection", t35), w(t35));
    };
    function j(t36, n4) {
        var r3 = this;
        return new Promise(function(i3, o2) {
            var s4, u3;
            function c2() {
                return i3();
            }
            return s4 = n4 || ((u3 = t36.input) instanceof HTMLInputElement || u3 instanceof HTMLTextAreaElement ? u3.value : u3.innerHTML), (function(t37, e19, n) {
                return e19 ? e19(t37) : t37.length >= n;
            })(s4 = t36.query ? t36.query(s4) : s4, t36.trigger, t36.threshold) ? d1(t36, s4).then(function(n5) {
                try {
                    return t36.feedback instanceof Error ? i3() : (h(s4, t36), t36.resultsList && (function(t38) {
                        var n6 = t38.resultsList, r4 = t38.list, i = t38.resultItem, o = t38.feedback, s = o.matches, u = o.results;
                        if (t38.cursor = -1, r4.innerHTML = "", s.length || n6.noResults) {
                            var c = new DocumentFragment;
                            u.forEach(function(t39, n) {
                                var r = a1(i.tag, e1({
                                    id: "".concat(i.id, "_").concat(n),
                                    role: "option",
                                    innerHTML: t39.match,
                                    inside: c
                                }, i.class && {
                                    class: i.class
                                }));
                                i.element && i.element(r, t39);
                            }), r4.append(c), n6.element && n6.element(r4, o), g(t38);
                        } else w(t38);
                    })(t36), c2.call(r3));
                } catch (t40) {
                    return o2(t40);
                }
            }, o2) : (w(t36), c2.call(r3));
        });
    }
    var S = function(t41, e20) {
        for(var n in t41)for(var r in t41[n])e20(n, r);
    }, T = function(t42) {
        var n7, r5, i4, o = t42.events, s = (n7 = function() {
            return j(t42);
        }, r5 = t42.debounce, function() {
            clearTimeout(i4), i4 = setTimeout(function() {
                return n7();
            }, r5);
        }), u = t42.events = e1({
            input: e1({
            }, o && o.input)
        }, t42.resultsList && {
            list: o ? e1({
            }, o.list) : {
            }
        }), a = {
            input: {
                input: function() {
                    s();
                },
                keydown: function(e21) {
                    !function(t43, e22) {
                        switch(t43.keyCode){
                            case 40:
                            case 38:
                                t43.preventDefault(), 40 === t43.keyCode ? A(e22) : k(e22);
                                break;
                            case 13:
                                e22.submit || t43.preventDefault(), e22.cursor >= 0 && L(e22, t43);
                                break;
                            case 9:
                                e22.resultsList.tabSelect && e22.cursor >= 0 && L(e22, t43);
                                break;
                            case 27:
                                e22.input.value = "", w(e22);
                        }
                    }(e21, t42);
                },
                blur: function() {
                    w(t42);
                }
            },
            list: {
                mousedown: function(t44) {
                    t44.preventDefault();
                },
                click: function(e23) {
                    !function(t45, e24) {
                        var n = e24.resultItem.tag.toUpperCase(), r = Array.from(e24.list.querySelectorAll(n)), i = t45.target.closest(n);
                        i && i.nodeName === n && L(e24, t45, r.indexOf(i));
                    }(e23, t42);
                }
            }
        };
        S(a, function(e, n) {
            (t42.resultsList || "input" === n) && (u[e][n] || (u[e][n] = a[e][n]));
        }), S(u, function(e, n) {
            t42[e].addEventListener(n, u[e][n]);
        });
    };
    function E(t46) {
        var n = this;
        return new Promise(function(r, i) {
            var o, s, u;
            if (o = t46.placeHolder, u = {
                role: "combobox",
                "aria-owns": (s = t46.resultsList).id,
                "aria-haspopup": !0,
                "aria-expanded": !1
            }, a1(t46.input, e1(e1({
                "aria-controls": s.id,
                "aria-autocomplete": "both"
            }, o && {
                placeholder: o
            }), !t46.wrapper && e1({
            }, u))), t46.wrapper && (t46.wrapper = a1("div", e1({
                around: t46.input,
                class: t46.name + "_wrapper"
            }, u))), s && (t46.list = a1(s.tag, e1({
                dest: [
                    s.destination,
                    s.position
                ],
                id: s.id,
                role: "listbox",
                hidden: "hidden"
            }, s.class && {
                class: s.class
            }))), T(t46), t46.data.cache) return d1(t46).then(function(t) {
                try {
                    return c.call(n);
                } catch (t47) {
                    return i(t47);
                }
            }, i);
            function c() {
                return f1("init", t46), r();
            }
            return c.call(n);
        });
    }
    function x(t48) {
        var e25 = t48.prototype;
        e25.init = function() {
            E(this);
        }, e25.start = function(t49) {
            j(this, t49);
        }, e25.unInit = function() {
            if (this.wrapper) {
                var t50 = this.wrapper.parentNode;
                t50.insertBefore(this.input, this.wrapper), t50.removeChild(this.wrapper);
            }
            var e26;
            S((e26 = this).events, function(t, n) {
                e26[t].removeEventListener(n, e26.events[t][n]);
            });
        }, e25.open = function() {
            g(this);
        }, e25.close = function() {
            w(this);
        }, e25.goTo = function(t51) {
            O(t51, this);
        }, e25.next = function() {
            A(this);
        }, e25.previous = function() {
            k(this);
        }, e25.select = function(t52) {
            L(this, null, t52);
        }, e25.search = function(t53, e27, n) {
            return p1(t53, e27, n);
        };
    }
    return function t54(e28) {
        this.options = e28, this.id = t54.instances = (t54.instances || 0) + 1, this.name = "autoComplete", this.wrapper = 1, this.threshold = 1, this.debounce = 0, this.resultsList = {
            position: "afterend",
            tag: "ul",
            maxResults: 5
        }, this.resultItem = {
            tag: "li"
        }, (function(t55) {
            var e29 = t55.name, r = t55.options, i = t55.resultsList, o = t55.resultItem;
            for(var s in r)if ("object" === n1(r[s])) for(var a in t55[s] || (t55[s] = {
            }), r[s])t55[s][a] = r[s][a];
            else t55[s] = r[s];
            t55.selector = t55.selector || "#" + e29, i.destination = i.destination || t55.selector, i.id = i.id || e29 + "_list_" + t55.id, o.id = o.id || e29 + "_result", t55.input = u1(t55.selector);
        })(this), x.call(this, t54), E(this);
    };
}, "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).autoComplete = e();

//# sourceMappingURL=popup.a090d1f1.js.map
