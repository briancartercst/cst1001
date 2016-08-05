$(function () {
    var j = [{
        name: "Brand_Page",
        json: '{"FishingLicense":"DC98529F-7352-4229-9A76-B274398C7049", "FishingBaitName":"Level_Page", "FishingBaitParms":[{"ParmName":"Category", "ParmValue":"CigarBrand"},{"ParmName":"PageSize", "ParmValue":10}, {"ParmName":"PageNumber", "ParmValue":1}, {"ParmName":"SyncDate", "ParmValue":"2010-01-01"}]}'
    },
    {
        name: "Cigar_Page",
        json: '{"FishingLicense":"DC98529F-7352-4229-9A76-B274398C7049", "FishingBaitName":"Level_Page", "FishingBaitParms":[{"ParmName":"Category", "ParmValue":"Cigar"},{"ParmName":"PageSize", "ParmValue":10}, {"ParmName":"PageNumber", "ParmValue":1}, {"ParmName":"SyncDate", "ParmValue":"2010-01-01"}]}'
    },
    {
        name: "Brewery_Page",
        json: '{"FishingLicense":"EC98529F-7352-4229-9A76-B274398C7049", "FishingBaitName":"Level_Page", "FishingBaitParms":[{"ParmName":"Category", "ParmValue":"Brewery"},{"ParmName":"PageSize", "ParmValue":10}, {"ParmName":"PageNumber", "ParmValue":1}, {"ParmName":"SyncDate", "ParmValue":"2010-01-01"}]}'
    },
    {
        name: "Beer_Page",
        json: '{"FishingLicense":"EC98529F-7352-4229-9A76-B274398C7049", "FishingBaitName":"Level_Page", "FishingBaitParms":[{"ParmName":"Category", "ParmValue":"Beer"},{"ParmName":"PageSize", "ParmValue":10}, {"ParmName":"PageNumber", "ParmValue":1}, {"ParmName":"SyncDate", "ParmValue":"2010-01-01"}]}'
    }
    ],
        f = $("#samples").html("Samples: "),
        d = $("body"),
        l = $("textarea", $("#json")),
        b = $("#json-parse"),
        m = $("code", b),
        h = $("#json-eval"),
        x = $("#json-exec"),
        y = $("textarea", x),
        c = $("code", h),
        o = m.add(c).delegate(".clickable", "mousedown", function () {
            $(this).parent().toggleClass("collapsed")
        }),
        e = 0;
    $("#show-json-parse").mousedown(function () {
        d.toggleClass("show-parse");
        b.addClass("ko").removeClass("ok");
        g();
        a()
    });
    $("#show-json-eval").mousedown(function () {
        d.toggleClass("show-eval");
        h.addClass("ko").removeClass("ok");
        g();
        a()
    });
    $("#show-json-exec").mousedown(function () {
        d.toggleClass("show-exec");
        h.addClass("ko").removeClass("ok");
        //execPondWater();
    });
    $("#show-types").mousedown(function () {
        d.toggleClass("show-types")
    });
    $("#show-indexes").mousedown(function () {
        d.toggleClass("show-indexes")
    });
    $("#colorize").mousedown(function () {
        d.toggleClass("colorize")
    });
    $("#inline-view").mousedown(function () {
        d.addClass("inline-view").removeClass("tree-view compact-tree-view");
        a()
    });
    $("#tree-view").mousedown(function () {
        d.addClass("tree-view").removeClass("inline-view compact-tree-view");
        a()
    });
    $("#compact-tree-view").mousedown(function () {
        d.addClass("compact-tree-view").removeClass("inline-view tree-view");
        a()
    });
    $("#history-link").add("#history-close").mousedown(function () {
        $("#history").toggleClass("show");
        a()
    });
    $("#show-json-exec").add("#execution-close").mousedown(function () {
        $("#execution").toggleClass("show");
        a()
    });
    $("#execution").add("#execution-run").mousedown(function () {
        execPondWater()
    });

    function execPondWater() {
        var divToBeWorkedOn = '#test';
        var webMethod = 'fishingPole.asmx/Cast'
        var i = l.val();

        var data2Send = '{"fishingBox":' + i + '}';
        //alert("Data = " + data2Send);

        $.ajax({
            type: "POST",
            url: webMethod,
            data: data2Send,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) { AjaxSucceeded(msg); },
            error: AjaxFailed
        });
    }

    function AjaxSucceeded(result) {
        y.html(result.d);
    }

    function AjaxFailed(result) {
        alert(result.status + ' \n\r ' + result.statusText + ' \n\r ' + result.responseText);
    }

    function g() {
        var i = l.val();
        if (d.hasClass("show-parse")) {
            setTimeout(function () {
                var p = k(i);
                m.html(p.html);
                if (p.valid) {
                    if (!b.hasClass("ok")) {
                        b.addClass("ok").removeClass("ko");
                        $("#favicon").after('<link rel="icon" type="image/png" href="favicon.png" id="favicon"/>').remove()
                    }
                } else {
                    if (!b.hasClass("ko")) {
                        b.addClass("ko").removeClass("ok");
                        $("#favicon").after('<link rel="icon" type="image/png" href="favicon-ko.png" id="favicon"/>').remove()
                    }
                }
            }, 0)
        }
        if (d.hasClass("show-eval")) {
            setTimeout(function () {
                try {
                    c.html(n($.parseJSON(i)));
                    if (!h.hasClass("ok")) {
                        h.addClass("ok").removeClass("ko")
                    }
                } catch (p) {
                    c.html('<span class="error">' + p + "</span>");
                    if (!h.hasClass("ko")) {
                        h.addClass("ko").removeClass("ok")
                    }
                }
            }, 0)
        }
    }
    l.blur(function () {
        g()
    }).keyup(function () {
        g()
    });
    g();
    for (e; e < j.length; e++) {
        f.append("<a>" + j[e].name + "</a>");
        if (e + 1 < j.length) {
            f.append(", ")
        }
    }
    $("a", f).each(function (p) {
        $(this).click(function () {
            l.val(j[p].json);
            g()
        })
    });
    setTimeout(function () {
        var p = ["warn.png", "tick.png", "checkbox.png", "checkbox-on.png", "checkbox-off.png", "favicon.png", "favicon-ko.png"],
            r = 0,
            q;
        for (r; r < p.length; r++) {
            q = new Image();
            q.src = p[r]
        }
    }, 1000);

    function a() {
        o.height(0);
        var i = $(window).height() - $("html").outerHeight(),
            q, p;
        if (d.hasClass("inline-view")) {
            if (d.hasClass("show-eval") && d.hasClass("show-parse")) {
                q = Math.floor(i / 2);
                p = i - q;
                if (q < 50) {
                    q = 56;
                    p = 57
                }
                c.height(q);
                m.height(p)
            } else {
                c.height(i);
                m.height(i)
            }
        } else {
            if (i < 150) {
                i = 150
            }
            o.height(i)
        }
    }
    a();

    function n(p) {
        function i(q) {
            function r(s) {
                if (s === null) {
                    return "null"
                }
                if (typeof (s) === "object" && s.length) {
                    return "array"
                }
                return typeof s
            }
            function w(t, y, B) {
                var x = "",
                    A, z;
                for (z in t) {
                    if (t.hasOwnProperty(z)) {
                        if (x !== "") {
                            x += B
                        }
                        A = t[z];
                        if (A === undefined) {
                            A = null
                        }
                        x += ' <span class="';
                        x += (y === "array") ? "index" : "property";
                        if (["array", "object"].indexOf(r(A)) !== -1) {
                            x += " clickable"
                        }
                        x += '">';
                        x += (y === "array") ? z + "</span>" : (y === "object") ? '"' + z + '"</span>:' : z + "</span>:";
                        x += " ";
                        x += i(A)
                    }
                }
                return x
            }
            var v = "",
                u = r(q);
            switch (u) {
                case "object":
                    v = '<span class="type">object</span><span class="object">{</span><ul> <li>' + w(q, u, ", </li><li>") + '</li> </ul><span class="etc">&#8230;</span><span class="object">}</span>';
                    break;
                case "array":
                    v = '<span class="type">array</span><span class="array">[</span><span class="cardinality">' + q.length + "</span><ol> <li>" + w(q, u, ", </li><li>") + '</li> </ol><span class="array">]</span>';
                    break;
                case "null":
                    v = '<span class="null">' + u + "</span>";
                    break;
                case "string":
                    v = '<span class="type">' + u + '</span><span class="' + u + '">"' + q + '"</span>';
                    break;
                default:
                    v = '<span class="type">' + u + '</span><span class="' + u + '">' + q + "</span>";
                    break
            }
            return v
        }
        return i(p)
    }
    function k(v) {
        function p(A) {
            return x(q(A))
        }
        function q(A) {
            return A.replace(/\s+$/g, "")
        }
        function x(A) {
            return A.replace(/^\s+/g, "")
        }
        function r() {
            var C = 0,
                B, A;
            do {
                C = u.indexOf('"', C + 1), B = 0, A = 1;
                do {
                    if (u.substring(C - A, C - A + 1) === "\\") {
                        B = B + 1;
                        A++;
                        continue
                    }
                    break
                } while (true);
                if (B % 2 === 0) {
                    break
                }
            } while (true);
            return C
        }
        function s(B) {
            function A(E) {
                function C(H) {
                    var F, G = H.substring(0, 1);
                    H.update(" ");
                    if (G === '"') {
                        F = H.shift(r(H.todo) + 1);
                        if (F.search(/\\u(?![\d|A-F]{4})/g) !== -1) {
                            return H.err("\\u must be followed by 4 hexadecimal characters", F)
                        }
                        if (F.search(/\\[^\"|\\|\/|b|f|n|r|t|u]/g) !== -1) {
                            return H.err("Backslash must be escaped", F)
                        }
                        return H.span("property clickable", F)
                    }
                    F = H.shift(H.indexOf(":"));
                    return H.err("Name property must be a String wrapped in double quotes.", F)
                }
                function D(F) {
                    if (F.substring(0, 1) !== ":") {
                        F.err("Semi-column is missing.", F.shift(F.indexOf(":")))
                    }
                    return F.swap(1).update(" ")
                }
                E.update("<li>");
                if (E.substring(0, 1) === "}") {
                    return E.update("</li>")
                }
                E = C(E);
                E = D(E);
                E = t(E, "}");
                if (E.substring(0, 1) === ",") {
                    E.swap(1).update("</li>");
                    return A(E)
                }
                if (E.substring(0, 1) === "}") {
                    return E.update("</li>")
                }
                return E.err("Comma is missing", E.shift(E.indexOf("}"))).update("</li>")
            }
            if (B.indexOf("{") === -1) {
                B.err("Opening brace is missing", B.todo);
                return B.update("", "")
            } else {
                B.update('<span class="type">object</span>').span("object", B.shift(1)).update("<ul> ");
                B = A(B).update(" </ul>");
                if (B.indexOf("}") === -1) {
                    B.err("Closing brace is missing", B.todo);
                    return B.update("", "")
                }
                return B.update('<span class="etc">&#8230;</span>').span("object", B.shift(1))
            }
        }
        function i(B) {
            function A(D, C) {
                D.update('<li><span class="index clickable">' + C + "</span> ");
                D = t(D, "]");
                if (D.substring(0, 1) === ",") {
                    D.swap(1).update(" </li>");
                    return A(D, ++C)
                }
                if (D.substring(0, 1) === "]") {
                    return D.update('</li> </ol><span class="cardinality">' + (C + 1) + "</span>")
                }
                return D.err("Comma is missing", D.shift(D.search(/(,|\])/))).update('</li> </ol><span class="cardinality">' + (C + 1) + "</span>")
            }
            if (B.indexOf("[") === -1) {
                B.err("Opening square bracket is missing", B.todo);
                return B.update("", "")
            }
            B.span("array", B.update('<span class="type">array</span>').shift(1)).update("<ol> ");
            if (B.indexOf("]") === 0) {
                return B.update(' </ol><span class="cardinality">0</span>').span("array", B.shift(1))
            }
            B = A(B, 0);
            if (B.indexOf("]") === -1) {
                B.err("Closing square bracket is missing", B.todo);
                return B.update("", "")
            }
            return B.span("array", B.shift(1))
        }
        function t(E, B) {
            var F, C, A, D = "";
            if (E.search(/^(")/) === 0) {
                E.update('<span class="type">string</span>');
                F = E.shift(r(E.todo) + 1);
                if (F.search(/\\u(?![\d|A-F]{4})/g) !== -1) {
                    return E.err("\\u must be followed by 4 hexadecimal characters", F)
                }
                if (F.search(/\\[^\"|\\|\/|b|f|n|r|t|u]/g) !== -1) {
                    return E.err("Backslash must be escaped", F)
                }
                return E.span("string", F)
            }
            if (E.search(/^\{/) === 0) {
                return s(E)
            }
            if (E.search(/^\[/) === 0) {
                return i(E)
            }
            C = E.search(new RegExp("(,|" + B + ")"));
            if (C === -1) {
                C = E.todo.length - 1;
                A = q(E.todo);
                E.update("", "")
            } else {
                A = q(E.shift(C))
            }
            try {
                D = typeof $.parseJSON(A)
            } catch (G) { }
            switch (D) {
                case "boolean":
                case "number":
                    return E.update('<span class="type">' + D + "</span>").span(D, A);
                default:
                    if (A === "null") {
                        return E.update(" ").span("null", A)
                    } else {
                        if (A.search(/^(')/) === 0) {
                            return E.update('<span class="type">string</span>').err("String must be wrapped in double quotes", A)
                        }
                        return E.update('<span class="type">?</span>').err("Unknown type", A)
                    }
            }
        }
        var w = false,
            y = function (A) {
                this.done = "";
                this.todo = A ? A : "";
                this.update = function (C, B) {
                    if (C) {
                        this.done += C
                    }
                    if (B !== undefined) {
                        this.todo = x(B)
                    }
                    return this
                };
                this.swap = function (B) {
                    if (B && !isNaN(Number(B)) && this.todo.length >= B) {
                        this.update(this.todo.substr(0, B), this.todo.substring(B))
                    }
                    return this
                };
                this.toString = function () {
                    if (this.todo.length !== 0) {
                        this.err("Text after last closing brace.", this.todo)
                    }
                    return this.done
                };
                this.span = function (B, C) {
                    return this.update('<span class="' + B + '">' + C + "</span>")
                };
                this.err = function (C, B) {
                    w = true;
                    return this.update('<span class="error" title="' + C + '">' + B + "</span>")
                };
                this.shift = function (B) {
                    var C;
                    if (B && !isNaN(Number(B)) && this.todo.length >= B) {
                        C = this.substring(0, B);
                        this.update("", this.substring(B));
                        return q(C)
                    }
                    return ""
                };
                this.indexOf = function (C, B) {
                    if (B) {
                        return this.todo.indexOf(C, B)
                    } else {
                        return this.todo.indexOf(C)
                    }
                };
                this.substring = function (B, C) {
                    if (C) {
                        return this.todo.substring(B, C)
                    } else {
                        return this.todo.substring(B)
                    }
                };
                this.search = function (B) {
                    return this.todo.search(B)
                }
            },
            u = new y(p(v)),
            z;
        if (x(v).substr(0, 1) === "[") {
            z = {
                html: i(u).toString(),
                valid: !w
            }
        } else {
            if (x(v).substr(0, 1) === "{") {
                z = {
                    html: s(u).toString(),
                    valid: !w
                }
            } else {
                z = {
                    html: u.err("JSON expression must be an object or an array", v).update(null, "").toString(),
                    valid: false
                }
            }
        }
        return z
    }
    setTimeout(function () {
        window.sc_project = 5853101;
        window.sc_invisible = 1;
        window.sc_partition = 56;
        window.sc_click_stat = 1;
        window.sc_security = "7bff74d0";
        $("body").append('<script type="text/javascript" src="http://www.statcounter.com/counter/counter_xhtml.js"><\/script>')
    }, 100)
});