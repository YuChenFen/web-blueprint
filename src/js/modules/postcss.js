function Bt(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
function Tt(o) {
  if (o.__esModule) return o;
  var e = o.default;
  if (typeof e == "function") {
    var t = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(o).forEach(function(r) {
    var s = Object.getOwnPropertyDescriptor(o, r);
    Object.defineProperty(t, r, s.get ? s : {
      enumerable: !0,
      get: function() {
        return o[r];
      }
    });
  }), t;
}
var Oe = { exports: {} }, m = String, Ze = function() {
  return { isColorSupported: !1, reset: m, bold: m, dim: m, italic: m, underline: m, inverse: m, hidden: m, strikethrough: m, black: m, red: m, green: m, yellow: m, blue: m, magenta: m, cyan: m, white: m, gray: m, bgBlack: m, bgRed: m, bgGreen: m, bgYellow: m, bgBlue: m, bgMagenta: m, bgCyan: m, bgWhite: m };
};
Oe.exports = Ze();
Oe.exports.createColors = Ze;
var jt = Oe.exports;
const Wt = {}, Vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wt
}, Symbol.toStringTag, { value: "Module" })), x = /* @__PURE__ */ Tt(Vt);
let Ne = jt, De = x, ue = class et extends Error {
  constructor(e, t, r, s, n, i) {
    super(e), this.name = "CssSyntaxError", this.reason = e, n && (this.file = n), s && (this.source = s), i && (this.plugin = i), typeof t < "u" && typeof r < "u" && (typeof t == "number" ? (this.line = t, this.column = r) : (this.line = t.line, this.column = t.column, this.endLine = r.line, this.endColumn = r.column)), this.setMessage(), Error.captureStackTrace && Error.captureStackTrace(this, et);
  }
  setMessage() {
    this.message = this.plugin ? this.plugin + ": " : "", this.message += this.file ? this.file : "<css input>", typeof this.line < "u" && (this.message += ":" + this.line + ":" + this.column), this.message += ": " + this.reason;
  }
  showSourceCode(e) {
    if (!this.source) return "";
    let t = this.source;
    e == null && (e = Ne.isColorSupported), De && e && (t = De(t));
    let r = t.split(/\r?\n/), s = Math.max(this.line - 3, 0), n = Math.min(this.line + 2, r.length), i = String(n).length, a, l;
    if (e) {
      let { bold: u, gray: f, red: p } = Ne.createColors(!0);
      a = (d) => u(p(d)), l = (d) => f(d);
    } else
      a = l = (u) => u;
    return r.slice(s, n).map((u, f) => {
      let p = s + 1 + f, d = " " + (" " + p).slice(-i) + " | ";
      if (p === this.line) {
        let w = l(d.replace(/\d/g, " ")) + u.slice(0, this.column - 1).replace(/[^\t]/g, " ");
        return a(">") + l(d) + u + `
 ` + w + a("^");
      }
      return " " + l(d) + u;
    }).join(`
`);
  }
  toString() {
    let e = this.showSourceCode();
    return e && (e = `

` + e + `
`), this.name + ": " + this.message + e;
  }
};
var Ee = ue;
ue.default = ue;
var _ = {};
_.isClean = Symbol("isClean");
_.my = Symbol("my");
const ze = {
  after: `
`,
  beforeClose: `
`,
  beforeComment: `
`,
  beforeDecl: `
`,
  beforeOpen: " ",
  beforeRule: `
`,
  colon: ": ",
  commentLeft: " ",
  commentRight: " ",
  emptyBody: "",
  indent: "    ",
  semicolon: !1
};
function Gt(o) {
  return o[0].toUpperCase() + o.slice(1);
}
let fe = class {
  constructor(e) {
    this.builder = e;
  }
  atrule(e, t) {
    let r = "@" + e.name, s = e.params ? this.rawValue(e, "params") : "";
    if (typeof e.raws.afterName < "u" ? r += e.raws.afterName : s && (r += " "), e.nodes)
      this.block(e, r + s);
    else {
      let n = (e.raws.between || "") + (t ? ";" : "");
      this.builder(r + s + n, e);
    }
  }
  beforeAfter(e, t) {
    let r;
    e.type === "decl" ? r = this.raw(e, null, "beforeDecl") : e.type === "comment" ? r = this.raw(e, null, "beforeComment") : t === "before" ? r = this.raw(e, null, "beforeRule") : r = this.raw(e, null, "beforeClose");
    let s = e.parent, n = 0;
    for (; s && s.type !== "root"; )
      n += 1, s = s.parent;
    if (r.includes(`
`)) {
      let i = this.raw(e, null, "indent");
      if (i.length)
        for (let a = 0; a < n; a++) r += i;
    }
    return r;
  }
  block(e, t) {
    let r = this.raw(e, "between", "beforeOpen");
    this.builder(t + r + "{", e, "start");
    let s;
    e.nodes && e.nodes.length ? (this.body(e), s = this.raw(e, "after")) : s = this.raw(e, "after", "emptyBody"), s && this.builder(s), this.builder("}", e, "end");
  }
  body(e) {
    let t = e.nodes.length - 1;
    for (; t > 0 && e.nodes[t].type === "comment"; )
      t -= 1;
    let r = this.raw(e, "semicolon");
    for (let s = 0; s < e.nodes.length; s++) {
      let n = e.nodes[s], i = this.raw(n, "before");
      i && this.builder(i), this.stringify(n, t !== s || r);
    }
  }
  comment(e) {
    let t = this.raw(e, "left", "commentLeft"), r = this.raw(e, "right", "commentRight");
    this.builder("/*" + t + e.text + r + "*/", e);
  }
  decl(e, t) {
    let r = this.raw(e, "between", "colon"), s = e.prop + r + this.rawValue(e, "value");
    e.important && (s += e.raws.important || " !important"), t && (s += ";"), this.builder(s, e);
  }
  document(e) {
    this.body(e);
  }
  raw(e, t, r) {
    let s;
    if (r || (r = t), t && (s = e.raws[t], typeof s < "u"))
      return s;
    let n = e.parent;
    if (r === "before" && (!n || n.type === "root" && n.first === e || n && n.type === "document"))
      return "";
    if (!n) return ze[r];
    let i = e.root();
    if (i.rawCache || (i.rawCache = {}), typeof i.rawCache[r] < "u")
      return i.rawCache[r];
    if (r === "before" || r === "after")
      return this.beforeAfter(e, r);
    {
      let a = "raw" + Gt(r);
      this[a] ? s = this[a](i, e) : i.walk((l) => {
        if (s = l.raws[t], typeof s < "u") return !1;
      });
    }
    return typeof s > "u" && (s = ze[r]), i.rawCache[r] = s, s;
  }
  rawBeforeClose(e) {
    let t;
    return e.walk((r) => {
      if (r.nodes && r.nodes.length > 0 && typeof r.raws.after < "u")
        return t = r.raws.after, t.includes(`
`) && (t = t.replace(/[^\n]+$/, "")), !1;
    }), t && (t = t.replace(/\S/g, "")), t;
  }
  rawBeforeComment(e, t) {
    let r;
    return e.walkComments((s) => {
      if (typeof s.raws.before < "u")
        return r = s.raws.before, r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")), !1;
    }), typeof r > "u" ? r = this.raw(t, null, "beforeDecl") : r && (r = r.replace(/\S/g, "")), r;
  }
  rawBeforeDecl(e, t) {
    let r;
    return e.walkDecls((s) => {
      if (typeof s.raws.before < "u")
        return r = s.raws.before, r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")), !1;
    }), typeof r > "u" ? r = this.raw(t, null, "beforeRule") : r && (r = r.replace(/\S/g, "")), r;
  }
  rawBeforeOpen(e) {
    let t;
    return e.walk((r) => {
      if (r.type !== "decl" && (t = r.raws.between, typeof t < "u"))
        return !1;
    }), t;
  }
  rawBeforeRule(e) {
    let t;
    return e.walk((r) => {
      if (r.nodes && (r.parent !== e || e.first !== r) && typeof r.raws.before < "u")
        return t = r.raws.before, t.includes(`
`) && (t = t.replace(/[^\n]+$/, "")), !1;
    }), t && (t = t.replace(/\S/g, "")), t;
  }
  rawColon(e) {
    let t;
    return e.walkDecls((r) => {
      if (typeof r.raws.between < "u")
        return t = r.raws.between.replace(/[^\s:]/g, ""), !1;
    }), t;
  }
  rawEmptyBody(e) {
    let t;
    return e.walk((r) => {
      if (r.nodes && r.nodes.length === 0 && (t = r.raws.after, typeof t < "u"))
        return !1;
    }), t;
  }
  rawIndent(e) {
    if (e.raws.indent) return e.raws.indent;
    let t;
    return e.walk((r) => {
      let s = r.parent;
      if (s && s !== e && s.parent && s.parent === e && typeof r.raws.before < "u") {
        let n = r.raws.before.split(`
`);
        return t = n[n.length - 1], t = t.replace(/\S/g, ""), !1;
      }
    }), t;
  }
  rawSemicolon(e) {
    let t;
    return e.walk((r) => {
      if (r.nodes && r.nodes.length && r.last.type === "decl" && (t = r.raws.semicolon, typeof t < "u"))
        return !1;
    }), t;
  }
  rawValue(e, t) {
    let r = e[t], s = e.raws[t];
    return s && s.value === r ? s.raw : r;
  }
  root(e) {
    this.body(e), e.raws.after && this.builder(e.raws.after);
  }
  rule(e) {
    this.block(e, this.rawValue(e, "selector")), e.raws.ownSemicolon && this.builder(e.raws.ownSemicolon, e, "end");
  }
  stringify(e, t) {
    if (!this[e.type])
      throw new Error(
        "Unknown AST node type " + e.type + ". Maybe you need to change PostCSS stringifier."
      );
    this[e.type](e, t);
  }
};
var tt = fe;
fe.default = fe;
let Jt = tt;
function he(o, e) {
  new Jt(e).stringify(o);
}
var q = he;
he.default = he;
let { isClean: N, my: Ht } = _, Yt = Ee, Qt = tt, Kt = q;
function ce(o, e) {
  let t = new o.constructor();
  for (let r in o) {
    if (!Object.prototype.hasOwnProperty.call(o, r) || r === "proxyCache") continue;
    let s = o[r], n = typeof s;
    r === "parent" && n === "object" ? e && (t[r] = e) : r === "source" ? t[r] = s : Array.isArray(s) ? t[r] = s.map((i) => ce(i, t)) : (n === "object" && s !== null && (s = ce(s)), t[r] = s);
  }
  return t;
}
let pe = class {
  constructor(e = {}) {
    this.raws = {}, this[N] = !1, this[Ht] = !0;
    for (let t in e)
      if (t === "nodes") {
        this.nodes = [];
        for (let r of e[t])
          typeof r.clone == "function" ? this.append(r.clone()) : this.append(r);
      } else
        this[t] = e[t];
  }
  addToError(e) {
    if (e.postcssNode = this, e.stack && this.source && /\n\s{4}at /.test(e.stack)) {
      let t = this.source;
      e.stack = e.stack.replace(
        /\n\s{4}at /,
        `$&${t.input.from}:${t.start.line}:${t.start.column}$&`
      );
    }
    return e;
  }
  after(e) {
    return this.parent.insertAfter(this, e), this;
  }
  assign(e = {}) {
    for (let t in e)
      this[t] = e[t];
    return this;
  }
  before(e) {
    return this.parent.insertBefore(this, e), this;
  }
  cleanRaws(e) {
    delete this.raws.before, delete this.raws.after, e || delete this.raws.between;
  }
  clone(e = {}) {
    let t = ce(this);
    for (let r in e)
      t[r] = e[r];
    return t;
  }
  cloneAfter(e = {}) {
    let t = this.clone(e);
    return this.parent.insertAfter(this, t), t;
  }
  cloneBefore(e = {}) {
    let t = this.clone(e);
    return this.parent.insertBefore(this, t), t;
  }
  error(e, t = {}) {
    if (this.source) {
      let { end: r, start: s } = this.rangeBy(t);
      return this.source.input.error(
        e,
        { column: s.column, line: s.line },
        { column: r.column, line: r.line },
        t
      );
    }
    return new Yt(e);
  }
  getProxyProcessor() {
    return {
      get(e, t) {
        return t === "proxyOf" ? e : t === "root" ? () => e.root().toProxy() : e[t];
      },
      set(e, t, r) {
        return e[t] === r || (e[t] = r, (t === "prop" || t === "value" || t === "name" || t === "params" || t === "important" || /* c8 ignore next */
        t === "text") && e.markDirty()), !0;
      }
    };
  }
  markDirty() {
    if (this[N]) {
      this[N] = !1;
      let e = this;
      for (; e = e.parent; )
        e[N] = !1;
    }
  }
  next() {
    if (!this.parent) return;
    let e = this.parent.index(this);
    return this.parent.nodes[e + 1];
  }
  positionBy(e, t) {
    let r = this.source.start;
    if (e.index)
      r = this.positionInside(e.index, t);
    else if (e.word) {
      t = this.toString();
      let s = t.indexOf(e.word);
      s !== -1 && (r = this.positionInside(s, t));
    }
    return r;
  }
  positionInside(e, t) {
    let r = t || this.toString(), s = this.source.start.column, n = this.source.start.line;
    for (let i = 0; i < e; i++)
      r[i] === `
` ? (s = 1, n += 1) : s += 1;
    return { column: s, line: n };
  }
  prev() {
    if (!this.parent) return;
    let e = this.parent.index(this);
    return this.parent.nodes[e - 1];
  }
  rangeBy(e) {
    let t = {
      column: this.source.start.column,
      line: this.source.start.line
    }, r = this.source.end ? {
      column: this.source.end.column + 1,
      line: this.source.end.line
    } : {
      column: t.column + 1,
      line: t.line
    };
    if (e.word) {
      let s = this.toString(), n = s.indexOf(e.word);
      n !== -1 && (t = this.positionInside(n, s), r = this.positionInside(n + e.word.length, s));
    } else
      e.start ? t = {
        column: e.start.column,
        line: e.start.line
      } : e.index && (t = this.positionInside(e.index)), e.end ? r = {
        column: e.end.column,
        line: e.end.line
      } : typeof e.endIndex == "number" ? r = this.positionInside(e.endIndex) : e.index && (r = this.positionInside(e.index + 1));
    return (r.line < t.line || r.line === t.line && r.column <= t.column) && (r = { column: t.column + 1, line: t.line }), { end: r, start: t };
  }
  raw(e, t) {
    return new Qt().raw(this, e, t);
  }
  remove() {
    return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
  }
  replaceWith(...e) {
    if (this.parent) {
      let t = this, r = !1;
      for (let s of e)
        s === this ? r = !0 : r ? (this.parent.insertAfter(t, s), t = s) : this.parent.insertBefore(t, s);
      r || this.remove();
    }
    return this;
  }
  root() {
    let e = this;
    for (; e.parent && e.parent.type !== "document"; )
      e = e.parent;
    return e;
  }
  toJSON(e, t) {
    let r = {}, s = t == null;
    t = t || /* @__PURE__ */ new Map();
    let n = 0;
    for (let i in this) {
      if (!Object.prototype.hasOwnProperty.call(this, i) || i === "parent" || i === "proxyCache") continue;
      let a = this[i];
      if (Array.isArray(a))
        r[i] = a.map((l) => typeof l == "object" && l.toJSON ? l.toJSON(null, t) : l);
      else if (typeof a == "object" && a.toJSON)
        r[i] = a.toJSON(null, t);
      else if (i === "source") {
        let l = t.get(a.input);
        l == null && (l = n, t.set(a.input, n), n++), r[i] = {
          end: a.end,
          inputId: l,
          start: a.start
        };
      } else
        r[i] = a;
    }
    return s && (r.inputs = [...t.keys()].map((i) => i.toJSON())), r;
  }
  toProxy() {
    return this.proxyCache || (this.proxyCache = new Proxy(this, this.getProxyProcessor())), this.proxyCache;
  }
  toString(e = Kt) {
    e.stringify && (e = e.stringify);
    let t = "";
    return e(this, (r) => {
      t += r;
    }), t;
  }
  warn(e, t, r) {
    let s = { node: this };
    for (let n in r) s[n] = r[n];
    return e.warn(t, s);
  }
  get proxyOf() {
    return this;
  }
};
var X = pe;
pe.default = pe;
let qt = X, de = class extends qt {
  constructor(e) {
    e && typeof e.value < "u" && typeof e.value != "string" && (e = { ...e, value: String(e.value) }), super(e), this.type = "decl";
  }
  get variable() {
    return this.prop.startsWith("--") || this.prop[0] === "$";
  }
};
var Z = de;
de.default = de;
let Xt = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", Zt = (o, e = 21) => (t = e) => {
  let r = "", s = t;
  for (; s--; )
    r += o[Math.random() * o.length | 0];
  return r;
}, er = (o = 21) => {
  let e = "", t = o;
  for (; t--; )
    e += Xt[Math.random() * 64 | 0];
  return e;
};
var tr = { nanoid: er, customAlphabet: Zt };
let { SourceMapConsumer: Fe, SourceMapGenerator: Be } = x, { existsSync: rr, readFileSync: sr } = x, { dirname: ne, join: ir } = x;
function nr(o) {
  return Buffer ? Buffer.from(o, "base64").toString() : window.atob(o);
}
let me = class {
  constructor(e, t) {
    if (t.map === !1) return;
    this.loadAnnotation(e), this.inline = this.startWith(this.annotation, "data:");
    let r = t.map ? t.map.prev : void 0, s = this.loadMap(t.from, r);
    !this.mapFile && t.from && (this.mapFile = t.from), this.mapFile && (this.root = ne(this.mapFile)), s && (this.text = s);
  }
  consumer() {
    return this.consumerCache || (this.consumerCache = new Fe(this.text)), this.consumerCache;
  }
  decodeInline(e) {
    let t = /^data:application\/json;charset=utf-?8;base64,/, r = /^data:application\/json;base64,/, s = /^data:application\/json;charset=utf-?8,/, n = /^data:application\/json,/, i = e.match(s) || e.match(n);
    if (i)
      return decodeURIComponent(e.substr(i[0].length));
    let a = e.match(t) || e.match(r);
    if (a)
      return nr(e.substr(a[0].length));
    let l = e.match(/data:application\/json;([^,]+),/)[1];
    throw new Error("Unsupported source map encoding " + l);
  }
  getAnnotationURL(e) {
    return e.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
  }
  isMap(e) {
    return typeof e != "object" ? !1 : typeof e.mappings == "string" || typeof e._mappings == "string" || Array.isArray(e.sections);
  }
  loadAnnotation(e) {
    let t = e.match(/\/\*\s*# sourceMappingURL=/g);
    if (!t) return;
    let r = e.lastIndexOf(t.pop()), s = e.indexOf("*/", r);
    r > -1 && s > -1 && (this.annotation = this.getAnnotationURL(e.substring(r, s)));
  }
  loadFile(e) {
    if (this.root = ne(e), rr(e))
      return this.mapFile = e, sr(e, "utf-8").toString().trim();
  }
  loadMap(e, t) {
    if (t === !1) return !1;
    if (t) {
      if (typeof t == "string")
        return t;
      if (typeof t == "function") {
        let r = t(e);
        if (r) {
          let s = this.loadFile(r);
          if (!s)
            throw new Error(
              "Unable to load previous source map: " + r.toString()
            );
          return s;
        }
      } else {
        if (t instanceof Fe)
          return Be.fromSourceMap(t).toString();
        if (t instanceof Be)
          return t.toString();
        if (this.isMap(t))
          return JSON.stringify(t);
        throw new Error(
          "Unsupported previous source map format: " + t.toString()
        );
      }
    } else {
      if (this.inline)
        return this.decodeInline(this.annotation);
      if (this.annotation) {
        let r = this.annotation;
        return e && (r = ir(ne(e), r)), this.loadFile(r);
      }
    }
  }
  startWith(e, t) {
    return e ? e.substr(0, t.length) === t : !1;
  }
  withContent() {
    return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
  }
};
var rt = me;
me.default = me;
let { SourceMapConsumer: or, SourceMapGenerator: lr } = x, { fileURLToPath: Te, pathToFileURL: D } = x, { isAbsolute: ge, resolve: we } = x, { nanoid: ar } = tr, oe = x, je = Ee, ur = rt, le = Symbol("fromOffsetCache"), fr = !!(or && lr), We = !!(we && ge), H = class {
  constructor(e, t = {}) {
    if (e === null || typeof e > "u" || typeof e == "object" && !e.toString)
      throw new Error(`PostCSS received ${e} instead of CSS string`);
    if (this.css = e.toString(), this.css[0] === "\uFEFF" || this.css[0] === "￾" ? (this.hasBOM = !0, this.css = this.css.slice(1)) : this.hasBOM = !1, t.from && (!We || /^\w+:\/\//.test(t.from) || ge(t.from) ? this.file = t.from : this.file = we(t.from)), We && fr) {
      let r = new ur(this.css, t);
      if (r.text) {
        this.map = r;
        let s = r.consumer().file;
        !this.file && s && (this.file = this.mapResolve(s));
      }
    }
    this.file || (this.id = "<input css " + ar(6) + ">"), this.map && (this.map.file = this.from);
  }
  error(e, t, r, s = {}) {
    let n, i, a;
    if (t && typeof t == "object") {
      let u = t, f = r;
      if (typeof u.offset == "number") {
        let p = this.fromOffset(u.offset);
        t = p.line, r = p.col;
      } else
        t = u.line, r = u.column;
      if (typeof f.offset == "number") {
        let p = this.fromOffset(f.offset);
        i = p.line, a = p.col;
      } else
        i = f.line, a = f.column;
    } else if (!r) {
      let u = this.fromOffset(t);
      t = u.line, r = u.col;
    }
    let l = this.origin(t, r, i, a);
    return l ? n = new je(
      e,
      l.endLine === void 0 ? l.line : { column: l.column, line: l.line },
      l.endLine === void 0 ? l.column : { column: l.endColumn, line: l.endLine },
      l.source,
      l.file,
      s.plugin
    ) : n = new je(
      e,
      i === void 0 ? t : { column: r, line: t },
      i === void 0 ? r : { column: a, line: i },
      this.css,
      this.file,
      s.plugin
    ), n.input = { column: r, endColumn: a, endLine: i, line: t, source: this.css }, this.file && (D && (n.input.url = D(this.file).toString()), n.input.file = this.file), n;
  }
  fromOffset(e) {
    let t, r;
    if (this[le])
      r = this[le];
    else {
      let n = this.css.split(`
`);
      r = new Array(n.length);
      let i = 0;
      for (let a = 0, l = n.length; a < l; a++)
        r[a] = i, i += n[a].length + 1;
      this[le] = r;
    }
    t = r[r.length - 1];
    let s = 0;
    if (e >= t)
      s = r.length - 1;
    else {
      let n = r.length - 2, i;
      for (; s < n; )
        if (i = s + (n - s >> 1), e < r[i])
          n = i - 1;
        else if (e >= r[i + 1])
          s = i + 1;
        else {
          s = i;
          break;
        }
    }
    return {
      col: e - r[s] + 1,
      line: s + 1
    };
  }
  mapResolve(e) {
    return /^\w+:\/\//.test(e) ? e : we(this.map.consumer().sourceRoot || this.map.root || ".", e);
  }
  origin(e, t, r, s) {
    if (!this.map) return !1;
    let n = this.map.consumer(), i = n.originalPositionFor({ column: t, line: e });
    if (!i.source) return !1;
    let a;
    typeof r == "number" && (a = n.originalPositionFor({ column: s, line: r }));
    let l;
    ge(i.source) ? l = D(i.source) : l = new URL(
      i.source,
      this.map.consumer().sourceRoot || D(this.map.mapFile)
    );
    let u = {
      column: i.column,
      endColumn: a && a.column,
      endLine: a && a.line,
      line: i.line,
      url: l.toString()
    };
    if (l.protocol === "file:")
      if (Te)
        u.file = Te(l);
      else
        throw new Error("file: protocol is not available in this PostCSS build");
    let f = n.sourceContentFor(i.source);
    return f && (u.source = f), u;
  }
  toJSON() {
    let e = {};
    for (let t of ["hasBOM", "css", "file", "id"])
      this[t] != null && (e[t] = this[t]);
    return this.map && (e.map = { ...this.map }, e.map.consumerCache && (e.map.consumerCache = void 0)), e;
  }
  get from() {
    return this.file || this.id;
  }
};
var ee = H;
H.default = H;
oe && oe.registerInput && oe.registerInput(H);
let { SourceMapConsumer: st, SourceMapGenerator: G } = x, { dirname: J, relative: it, resolve: nt, sep: ot } = x, { pathToFileURL: Ve } = x, hr = ee, cr = !!(st && G), pr = !!(J && nt && it && ot), dr = class {
  constructor(e, t, r, s) {
    this.stringify = e, this.mapOpts = r.map || {}, this.root = t, this.opts = r, this.css = s, this.originalCSS = s, this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute, this.memoizedFileURLs = /* @__PURE__ */ new Map(), this.memoizedPaths = /* @__PURE__ */ new Map(), this.memoizedURLs = /* @__PURE__ */ new Map();
  }
  addAnnotation() {
    let e;
    this.isInline() ? e = "data:application/json;base64," + this.toBase64(this.map.toString()) : typeof this.mapOpts.annotation == "string" ? e = this.mapOpts.annotation : typeof this.mapOpts.annotation == "function" ? e = this.mapOpts.annotation(this.opts.to, this.root) : e = this.outputFile() + ".map";
    let t = `
`;
    this.css.includes(`\r
`) && (t = `\r
`), this.css += t + "/*# sourceMappingURL=" + e + " */";
  }
  applyPrevMaps() {
    for (let e of this.previous()) {
      let t = this.toUrl(this.path(e.file)), r = e.root || J(e.file), s;
      this.mapOpts.sourcesContent === !1 ? (s = new st(e.text), s.sourcesContent && (s.sourcesContent = null)) : s = e.consumer(), this.map.applySourceMap(s, t, this.toUrl(this.path(r)));
    }
  }
  clearAnnotation() {
    if (this.mapOpts.annotation !== !1)
      if (this.root) {
        let e;
        for (let t = this.root.nodes.length - 1; t >= 0; t--)
          e = this.root.nodes[t], e.type === "comment" && e.text.indexOf("# sourceMappingURL=") === 0 && this.root.removeChild(t);
      } else this.css && (this.css = this.css.replace(/\n*\/\*#[\S\s]*?\*\/$/gm, ""));
  }
  generate() {
    if (this.clearAnnotation(), pr && cr && this.isMap())
      return this.generateMap();
    {
      let e = "";
      return this.stringify(this.root, (t) => {
        e += t;
      }), [e];
    }
  }
  generateMap() {
    if (this.root)
      this.generateString();
    else if (this.previous().length === 1) {
      let e = this.previous()[0].consumer();
      e.file = this.outputFile(), this.map = G.fromSourceMap(e, {
        ignoreInvalidMapping: !0
      });
    } else
      this.map = new G({
        file: this.outputFile(),
        ignoreInvalidMapping: !0
      }), this.map.addMapping({
        generated: { column: 0, line: 1 },
        original: { column: 0, line: 1 },
        source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
      });
    return this.isSourcesContent() && this.setSourcesContent(), this.root && this.previous().length > 0 && this.applyPrevMaps(), this.isAnnotation() && this.addAnnotation(), this.isInline() ? [this.css] : [this.css, this.map];
  }
  generateString() {
    this.css = "", this.map = new G({
      file: this.outputFile(),
      ignoreInvalidMapping: !0
    });
    let e = 1, t = 1, r = "<no source>", s = {
      generated: { column: 0, line: 0 },
      original: { column: 0, line: 0 },
      source: ""
    }, n, i;
    this.stringify(this.root, (a, l, u) => {
      if (this.css += a, l && u !== "end" && (s.generated.line = e, s.generated.column = t - 1, l.source && l.source.start ? (s.source = this.sourcePath(l), s.original.line = l.source.start.line, s.original.column = l.source.start.column - 1, this.map.addMapping(s)) : (s.source = r, s.original.line = 1, s.original.column = 0, this.map.addMapping(s))), n = a.match(/\n/g), n ? (e += n.length, i = a.lastIndexOf(`
`), t = a.length - i) : t += a.length, l && u !== "start") {
        let f = l.parent || { raws: {} };
        (!(l.type === "decl" || l.type === "atrule" && !l.nodes) || l !== f.last || f.raws.semicolon) && (l.source && l.source.end ? (s.source = this.sourcePath(l), s.original.line = l.source.end.line, s.original.column = l.source.end.column - 1, s.generated.line = e, s.generated.column = t - 2, this.map.addMapping(s)) : (s.source = r, s.original.line = 1, s.original.column = 0, s.generated.line = e, s.generated.column = t - 1, this.map.addMapping(s)));
      }
    });
  }
  isAnnotation() {
    return this.isInline() ? !0 : typeof this.mapOpts.annotation < "u" ? this.mapOpts.annotation : this.previous().length ? this.previous().some((e) => e.annotation) : !0;
  }
  isInline() {
    if (typeof this.mapOpts.inline < "u")
      return this.mapOpts.inline;
    let e = this.mapOpts.annotation;
    return typeof e < "u" && e !== !0 ? !1 : this.previous().length ? this.previous().some((t) => t.inline) : !0;
  }
  isMap() {
    return typeof this.opts.map < "u" ? !!this.opts.map : this.previous().length > 0;
  }
  isSourcesContent() {
    return typeof this.mapOpts.sourcesContent < "u" ? this.mapOpts.sourcesContent : this.previous().length ? this.previous().some((e) => e.withContent()) : !0;
  }
  outputFile() {
    return this.opts.to ? this.path(this.opts.to) : this.opts.from ? this.path(this.opts.from) : "to.css";
  }
  path(e) {
    if (this.mapOpts.absolute || e.charCodeAt(0) === 60 || /^\w+:\/\//.test(e)) return e;
    let t = this.memoizedPaths.get(e);
    if (t) return t;
    let r = this.opts.to ? J(this.opts.to) : ".";
    typeof this.mapOpts.annotation == "string" && (r = J(nt(r, this.mapOpts.annotation)));
    let s = it(r, e);
    return this.memoizedPaths.set(e, s), s;
  }
  previous() {
    if (!this.previousMaps)
      if (this.previousMaps = [], this.root)
        this.root.walk((e) => {
          if (e.source && e.source.input.map) {
            let t = e.source.input.map;
            this.previousMaps.includes(t) || this.previousMaps.push(t);
          }
        });
      else {
        let e = new hr(this.originalCSS, this.opts);
        e.map && this.previousMaps.push(e.map);
      }
    return this.previousMaps;
  }
  setSourcesContent() {
    let e = {};
    if (this.root)
      this.root.walk((t) => {
        if (t.source) {
          let r = t.source.input.from;
          if (r && !e[r]) {
            e[r] = !0;
            let s = this.usesFileUrls ? this.toFileUrl(r) : this.toUrl(this.path(r));
            this.map.setSourceContent(s, t.source.input.css);
          }
        }
      });
    else if (this.css) {
      let t = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
      this.map.setSourceContent(t, this.css);
    }
  }
  sourcePath(e) {
    return this.mapOpts.from ? this.toUrl(this.mapOpts.from) : this.usesFileUrls ? this.toFileUrl(e.source.input.from) : this.toUrl(this.path(e.source.input.from));
  }
  toBase64(e) {
    return Buffer ? Buffer.from(e).toString("base64") : window.btoa(unescape(encodeURIComponent(e)));
  }
  toFileUrl(e) {
    let t = this.memoizedFileURLs.get(e);
    if (t) return t;
    if (Ve) {
      let r = Ve(e).toString();
      return this.memoizedFileURLs.set(e, r), r;
    } else
      throw new Error(
        "`map.absolute` option is not available in this PostCSS build"
      );
  }
  toUrl(e) {
    let t = this.memoizedURLs.get(e);
    if (t) return t;
    ot === "\\" && (e = e.replace(/\\/g, "/"));
    let r = encodeURI(e).replace(/[#?]/g, encodeURIComponent);
    return this.memoizedURLs.set(e, r), r;
  }
};
var lt = dr;
let mr = X, ye = class extends mr {
  constructor(e) {
    super(e), this.type = "comment";
  }
};
var te = ye;
ye.default = ye;
let { isClean: at, my: ut } = _, ft = Z, ht = te, gr = X, ct, Re, Ae, pt;
function dt(o) {
  return o.map((e) => (e.nodes && (e.nodes = dt(e.nodes)), delete e.source, e));
}
function mt(o) {
  if (o[at] = !1, o.proxyOf.nodes)
    for (let e of o.proxyOf.nodes)
      mt(e);
}
let S = class gt extends gr {
  append(...e) {
    for (let t of e) {
      let r = this.normalize(t, this.last);
      for (let s of r) this.proxyOf.nodes.push(s);
    }
    return this.markDirty(), this;
  }
  cleanRaws(e) {
    if (super.cleanRaws(e), this.nodes)
      for (let t of this.nodes) t.cleanRaws(e);
  }
  each(e) {
    if (!this.proxyOf.nodes) return;
    let t = this.getIterator(), r, s;
    for (; this.indexes[t] < this.proxyOf.nodes.length && (r = this.indexes[t], s = e(this.proxyOf.nodes[r], r), s !== !1); )
      this.indexes[t] += 1;
    return delete this.indexes[t], s;
  }
  every(e) {
    return this.nodes.every(e);
  }
  getIterator() {
    this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), this.lastEach += 1;
    let e = this.lastEach;
    return this.indexes[e] = 0, e;
  }
  getProxyProcessor() {
    return {
      get(e, t) {
        return t === "proxyOf" ? e : e[t] ? t === "each" || typeof t == "string" && t.startsWith("walk") ? (...r) => e[t](
          ...r.map((s) => typeof s == "function" ? (n, i) => s(n.toProxy(), i) : s)
        ) : t === "every" || t === "some" ? (r) => e[t](
          (s, ...n) => r(s.toProxy(), ...n)
        ) : t === "root" ? () => e.root().toProxy() : t === "nodes" ? e.nodes.map((r) => r.toProxy()) : t === "first" || t === "last" ? e[t].toProxy() : e[t] : e[t];
      },
      set(e, t, r) {
        return e[t] === r || (e[t] = r, (t === "name" || t === "params" || t === "selector") && e.markDirty()), !0;
      }
    };
  }
  index(e) {
    return typeof e == "number" ? e : (e.proxyOf && (e = e.proxyOf), this.proxyOf.nodes.indexOf(e));
  }
  insertAfter(e, t) {
    let r = this.index(e), s = this.normalize(t, this.proxyOf.nodes[r]).reverse();
    r = this.index(e);
    for (let i of s) this.proxyOf.nodes.splice(r + 1, 0, i);
    let n;
    for (let i in this.indexes)
      n = this.indexes[i], r < n && (this.indexes[i] = n + s.length);
    return this.markDirty(), this;
  }
  insertBefore(e, t) {
    let r = this.index(e), s = r === 0 ? "prepend" : !1, n = this.normalize(
      t,
      this.proxyOf.nodes[r],
      s
    ).reverse();
    r = this.index(e);
    for (let a of n) this.proxyOf.nodes.splice(r, 0, a);
    let i;
    for (let a in this.indexes)
      i = this.indexes[a], r <= i && (this.indexes[a] = i + n.length);
    return this.markDirty(), this;
  }
  normalize(e, t) {
    if (typeof e == "string")
      e = dt(ct(e).nodes);
    else if (typeof e > "u")
      e = [];
    else if (Array.isArray(e)) {
      e = e.slice(0);
      for (let s of e)
        s.parent && s.parent.removeChild(s, "ignore");
    } else if (e.type === "root" && this.type !== "document") {
      e = e.nodes.slice(0);
      for (let s of e)
        s.parent && s.parent.removeChild(s, "ignore");
    } else if (e.type)
      e = [e];
    else if (e.prop) {
      if (typeof e.value > "u")
        throw new Error("Value field is missed in node creation");
      typeof e.value != "string" && (e.value = String(e.value)), e = [new ft(e)];
    } else if (e.selector || e.selectors)
      e = [new Re(e)];
    else if (e.name)
      e = [new Ae(e)];
    else if (e.text)
      e = [new ht(e)];
    else
      throw new Error("Unknown node type in node creation");
    return e.map((s) => (s[ut] || gt.rebuild(s), s = s.proxyOf, s.parent && s.parent.removeChild(s), s[at] && mt(s), typeof s.raws.before > "u" && t && typeof t.raws.before < "u" && (s.raws.before = t.raws.before.replace(/\S/g, "")), s.parent = this.proxyOf, s));
  }
  prepend(...e) {
    e = e.reverse();
    for (let t of e) {
      let r = this.normalize(t, this.first, "prepend").reverse();
      for (let s of r) this.proxyOf.nodes.unshift(s);
      for (let s in this.indexes)
        this.indexes[s] = this.indexes[s] + r.length;
    }
    return this.markDirty(), this;
  }
  push(e) {
    return e.parent = this, this.proxyOf.nodes.push(e), this;
  }
  removeAll() {
    for (let e of this.proxyOf.nodes) e.parent = void 0;
    return this.proxyOf.nodes = [], this.markDirty(), this;
  }
  removeChild(e) {
    e = this.index(e), this.proxyOf.nodes[e].parent = void 0, this.proxyOf.nodes.splice(e, 1);
    let t;
    for (let r in this.indexes)
      t = this.indexes[r], t >= e && (this.indexes[r] = t - 1);
    return this.markDirty(), this;
  }
  replaceValues(e, t, r) {
    return r || (r = t, t = {}), this.walkDecls((s) => {
      t.props && !t.props.includes(s.prop) || t.fast && !s.value.includes(t.fast) || (s.value = s.value.replace(e, r));
    }), this.markDirty(), this;
  }
  some(e) {
    return this.nodes.some(e);
  }
  walk(e) {
    return this.each((t, r) => {
      let s;
      try {
        s = e(t, r);
      } catch (n) {
        throw t.addToError(n);
      }
      return s !== !1 && t.walk && (s = t.walk(e)), s;
    });
  }
  walkAtRules(e, t) {
    return t ? e instanceof RegExp ? this.walk((r, s) => {
      if (r.type === "atrule" && e.test(r.name))
        return t(r, s);
    }) : this.walk((r, s) => {
      if (r.type === "atrule" && r.name === e)
        return t(r, s);
    }) : (t = e, this.walk((r, s) => {
      if (r.type === "atrule")
        return t(r, s);
    }));
  }
  walkComments(e) {
    return this.walk((t, r) => {
      if (t.type === "comment")
        return e(t, r);
    });
  }
  walkDecls(e, t) {
    return t ? e instanceof RegExp ? this.walk((r, s) => {
      if (r.type === "decl" && e.test(r.prop))
        return t(r, s);
    }) : this.walk((r, s) => {
      if (r.type === "decl" && r.prop === e)
        return t(r, s);
    }) : (t = e, this.walk((r, s) => {
      if (r.type === "decl")
        return t(r, s);
    }));
  }
  walkRules(e, t) {
    return t ? e instanceof RegExp ? this.walk((r, s) => {
      if (r.type === "rule" && e.test(r.selector))
        return t(r, s);
    }) : this.walk((r, s) => {
      if (r.type === "rule" && r.selector === e)
        return t(r, s);
    }) : (t = e, this.walk((r, s) => {
      if (r.type === "rule")
        return t(r, s);
    }));
  }
  get first() {
    if (this.proxyOf.nodes)
      return this.proxyOf.nodes[0];
  }
  get last() {
    if (this.proxyOf.nodes)
      return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
  }
};
S.registerParse = (o) => {
  ct = o;
};
S.registerRule = (o) => {
  Re = o;
};
S.registerAtRule = (o) => {
  Ae = o;
};
S.registerRoot = (o) => {
  pt = o;
};
var C = S;
S.default = S;
S.rebuild = (o) => {
  o.type === "atrule" ? Object.setPrototypeOf(o, Ae.prototype) : o.type === "rule" ? Object.setPrototypeOf(o, Re.prototype) : o.type === "decl" ? Object.setPrototypeOf(o, ft.prototype) : o.type === "comment" ? Object.setPrototypeOf(o, ht.prototype) : o.type === "root" && Object.setPrototypeOf(o, pt.prototype), o[ut] = !0, o.nodes && o.nodes.forEach((e) => {
    S.rebuild(e);
  });
};
let wr = C, wt, yt, $ = class extends wr {
  constructor(e) {
    super({ type: "document", ...e }), this.nodes || (this.nodes = []);
  }
  toResult(e = {}) {
    return new wt(new yt(), this, e).stringify();
  }
};
$.registerLazyResult = (o) => {
  wt = o;
};
$.registerProcessor = (o) => {
  yt = o;
};
var Pe = $;
$.default = $;
let Ge = {};
var xt = function(e) {
  Ge[e] || (Ge[e] = !0, typeof console < "u" && console.warn && console.warn(e));
};
let xe = class {
  constructor(e, t = {}) {
    if (this.type = "warning", this.text = e, t.node && t.node.source) {
      let r = t.node.rangeBy(t);
      this.line = r.start.line, this.column = r.start.column, this.endLine = r.end.line, this.endColumn = r.end.column;
    }
    for (let r in t) this[r] = t[r];
  }
  toString() {
    return this.node ? this.node.error(this.text, {
      index: this.index,
      plugin: this.plugin,
      word: this.word
    }).message : this.plugin ? this.plugin + ": " + this.text : this.text;
  }
};
var bt = xe;
xe.default = xe;
let yr = bt, be = class {
  constructor(e, t, r) {
    this.processor = e, this.messages = [], this.root = t, this.opts = r, this.css = void 0, this.map = void 0;
  }
  toString() {
    return this.css;
  }
  warn(e, t = {}) {
    t.plugin || this.lastPlugin && this.lastPlugin.postcssPlugin && (t.plugin = this.lastPlugin.postcssPlugin);
    let r = new yr(e, t);
    return this.messages.push(r), r;
  }
  warnings() {
    return this.messages.filter((e) => e.type === "warning");
  }
  get content() {
    return this.css;
  }
};
var $e = be;
be.default = be;
const ae = 39, Je = 34, z = 92, He = 47, F = 10, A = 32, B = 12, T = 9, j = 13, xr = 91, br = 93, Sr = 40, Cr = 41, vr = 123, Or = 125, Er = 59, Rr = 42, Ar = 58, Pr = 64, W = /[\t\n\f\r "#'()/;[\\\]{}]/g, V = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g, $r = /.[\r\n"'(/\\]/, Ye = /[\da-f]/i;
var Mr = function(e, t = {}) {
  let r = e.css.valueOf(), s = t.ignoreErrors, n, i, a, l, u, f, p, d, w, y, Ue = r.length, h = 0, re = [], L = [];
  function Nt() {
    return h;
  }
  function se(v) {
    throw e.error("Unclosed " + v, h);
  }
  function Dt() {
    return L.length === 0 && h >= Ue;
  }
  function zt(v) {
    if (L.length) return L.pop();
    if (h >= Ue) return;
    let ie = v ? v.ignoreUnclosed : !1;
    switch (n = r.charCodeAt(h), n) {
      case F:
      case A:
      case T:
      case j:
      case B: {
        i = h;
        do
          i += 1, n = r.charCodeAt(i);
        while (n === A || n === F || n === T || n === j || n === B);
        y = ["space", r.slice(h, i)], h = i - 1;
        break;
      }
      case xr:
      case br:
      case vr:
      case Or:
      case Ar:
      case Er:
      case Cr: {
        let Le = String.fromCharCode(n);
        y = [Le, Le, h];
        break;
      }
      case Sr: {
        if (d = re.length ? re.pop()[1] : "", w = r.charCodeAt(h + 1), d === "url" && w !== ae && w !== Je && w !== A && w !== F && w !== T && w !== B && w !== j) {
          i = h;
          do {
            if (f = !1, i = r.indexOf(")", i + 1), i === -1)
              if (s || ie) {
                i = h;
                break;
              } else
                se("bracket");
            for (p = i; r.charCodeAt(p - 1) === z; )
              p -= 1, f = !f;
          } while (f);
          y = ["brackets", r.slice(h, i + 1), h, i], h = i;
        } else
          i = r.indexOf(")", h + 1), l = r.slice(h, i + 1), i === -1 || $r.test(l) ? y = ["(", "(", h] : (y = ["brackets", l, h, i], h = i);
        break;
      }
      case ae:
      case Je: {
        a = n === ae ? "'" : '"', i = h;
        do {
          if (f = !1, i = r.indexOf(a, i + 1), i === -1)
            if (s || ie) {
              i = h + 1;
              break;
            } else
              se("string");
          for (p = i; r.charCodeAt(p - 1) === z; )
            p -= 1, f = !f;
        } while (f);
        y = ["string", r.slice(h, i + 1), h, i], h = i;
        break;
      }
      case Pr: {
        W.lastIndex = h + 1, W.test(r), W.lastIndex === 0 ? i = r.length - 1 : i = W.lastIndex - 2, y = ["at-word", r.slice(h, i + 1), h, i], h = i;
        break;
      }
      case z: {
        for (i = h, u = !0; r.charCodeAt(i + 1) === z; )
          i += 1, u = !u;
        if (n = r.charCodeAt(i + 1), u && n !== He && n !== A && n !== F && n !== T && n !== j && n !== B && (i += 1, Ye.test(r.charAt(i)))) {
          for (; Ye.test(r.charAt(i + 1)); )
            i += 1;
          r.charCodeAt(i + 1) === A && (i += 1);
        }
        y = ["word", r.slice(h, i + 1), h, i], h = i;
        break;
      }
      default: {
        n === He && r.charCodeAt(h + 1) === Rr ? (i = r.indexOf("*/", h + 2) + 1, i === 0 && (s || ie ? i = r.length : se("comment")), y = ["comment", r.slice(h, i + 1), h, i], h = i) : (V.lastIndex = h + 1, V.test(r), V.lastIndex === 0 ? i = r.length - 1 : i = V.lastIndex - 2, y = ["word", r.slice(h, i + 1), h, i], re.push(y), h = i);
        break;
      }
    }
    return h++, y;
  }
  function Ft(v) {
    L.push(v);
  }
  return {
    back: Ft,
    endOfFile: Dt,
    nextToken: zt,
    position: Nt
  };
};
let St = C, Y = class extends St {
  constructor(e) {
    super(e), this.type = "atrule";
  }
  append(...e) {
    return this.proxyOf.nodes || (this.nodes = []), super.append(...e);
  }
  prepend(...e) {
    return this.proxyOf.nodes || (this.nodes = []), super.prepend(...e);
  }
};
var Me = Y;
Y.default = Y;
St.registerAtRule(Y);
let Ct = C, vt, Ot, O = class extends Ct {
  constructor(e) {
    super(e), this.type = "root", this.nodes || (this.nodes = []);
  }
  normalize(e, t, r) {
    let s = super.normalize(e);
    if (t) {
      if (r === "prepend")
        this.nodes.length > 1 ? t.raws.before = this.nodes[1].raws.before : delete t.raws.before;
      else if (this.first !== t)
        for (let n of s)
          n.raws.before = t.raws.before;
    }
    return s;
  }
  removeChild(e, t) {
    let r = this.index(e);
    return !t && r === 0 && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[r].raws.before), super.removeChild(e);
  }
  toResult(e = {}) {
    return new vt(new Ot(), this, e).stringify();
  }
};
O.registerLazyResult = (o) => {
  vt = o;
};
O.registerProcessor = (o) => {
  Ot = o;
};
var U = O;
O.default = O;
Ct.registerRoot(O);
let M = {
  comma(o) {
    return M.split(o, [","], !0);
  },
  space(o) {
    let e = [" ", `
`, "	"];
    return M.split(o, e);
  },
  split(o, e, t) {
    let r = [], s = "", n = !1, i = 0, a = !1, l = "", u = !1;
    for (let f of o)
      u ? u = !1 : f === "\\" ? u = !0 : a ? f === l && (a = !1) : f === '"' || f === "'" ? (a = !0, l = f) : f === "(" ? i += 1 : f === ")" ? i > 0 && (i -= 1) : i === 0 && e.includes(f) && (n = !0), n ? (s !== "" && r.push(s.trim()), s = "", n = !1) : s += f;
    return (t || s !== "") && r.push(s.trim()), r;
  }
};
var Et = M;
M.default = M;
let Rt = C, kr = Et, Q = class extends Rt {
  constructor(e) {
    super(e), this.type = "rule", this.nodes || (this.nodes = []);
  }
  get selectors() {
    return kr.comma(this.selector);
  }
  set selectors(e) {
    let t = this.selector ? this.selector.match(/,\s*/) : null, r = t ? t[0] : "," + this.raw("between", "beforeOpen");
    this.selector = e.join(r);
  }
};
var ke = Q;
Q.default = Q;
Rt.registerRule(Q);
let Ir = Z, _r = Mr, Ur = te, Lr = Me, Nr = U, Qe = ke;
const Ke = {
  empty: !0,
  space: !0
};
function Dr(o) {
  for (let e = o.length - 1; e >= 0; e--) {
    let t = o[e], r = t[3] || t[2];
    if (r) return r;
  }
}
let zr = class {
  constructor(e) {
    this.input = e, this.root = new Nr(), this.current = this.root, this.spaces = "", this.semicolon = !1, this.createTokenizer(), this.root.source = { input: e, start: { column: 1, line: 1, offset: 0 } };
  }
  atrule(e) {
    let t = new Lr();
    t.name = e[1].slice(1), t.name === "" && this.unnamedAtrule(t, e), this.init(t, e[2]);
    let r, s, n, i = !1, a = !1, l = [], u = [];
    for (; !this.tokenizer.endOfFile(); ) {
      if (e = this.tokenizer.nextToken(), r = e[0], r === "(" || r === "[" ? u.push(r === "(" ? ")" : "]") : r === "{" && u.length > 0 ? u.push("}") : r === u[u.length - 1] && u.pop(), u.length === 0)
        if (r === ";") {
          t.source.end = this.getPosition(e[2]), t.source.end.offset++, this.semicolon = !0;
          break;
        } else if (r === "{") {
          a = !0;
          break;
        } else if (r === "}") {
          if (l.length > 0) {
            for (n = l.length - 1, s = l[n]; s && s[0] === "space"; )
              s = l[--n];
            s && (t.source.end = this.getPosition(s[3] || s[2]), t.source.end.offset++);
          }
          this.end(e);
          break;
        } else
          l.push(e);
      else
        l.push(e);
      if (this.tokenizer.endOfFile()) {
        i = !0;
        break;
      }
    }
    t.raws.between = this.spacesAndCommentsFromEnd(l), l.length ? (t.raws.afterName = this.spacesAndCommentsFromStart(l), this.raw(t, "params", l), i && (e = l[l.length - 1], t.source.end = this.getPosition(e[3] || e[2]), t.source.end.offset++, this.spaces = t.raws.between, t.raws.between = "")) : (t.raws.afterName = "", t.params = ""), a && (t.nodes = [], this.current = t);
  }
  checkMissedSemicolon(e) {
    let t = this.colon(e);
    if (t === !1) return;
    let r = 0, s;
    for (let n = t - 1; n >= 0 && (s = e[n], !(s[0] !== "space" && (r += 1, r === 2))); n--)
      ;
    throw this.input.error(
      "Missed semicolon",
      s[0] === "word" ? s[3] + 1 : s[2]
    );
  }
  colon(e) {
    let t = 0, r, s, n;
    for (let [i, a] of e.entries()) {
      if (r = a, s = r[0], s === "(" && (t += 1), s === ")" && (t -= 1), t === 0 && s === ":")
        if (!n)
          this.doubleColon(r);
        else {
          if (n[0] === "word" && n[1] === "progid")
            continue;
          return i;
        }
      n = r;
    }
    return !1;
  }
  comment(e) {
    let t = new Ur();
    this.init(t, e[2]), t.source.end = this.getPosition(e[3] || e[2]), t.source.end.offset++;
    let r = e[1].slice(2, -2);
    if (/^\s*$/.test(r))
      t.text = "", t.raws.left = r, t.raws.right = "";
    else {
      let s = r.match(/^(\s*)([^]*\S)(\s*)$/);
      t.text = s[2], t.raws.left = s[1], t.raws.right = s[3];
    }
  }
  createTokenizer() {
    this.tokenizer = _r(this.input);
  }
  decl(e, t) {
    let r = new Ir();
    this.init(r, e[0][2]);
    let s = e[e.length - 1];
    for (s[0] === ";" && (this.semicolon = !0, e.pop()), r.source.end = this.getPosition(
      s[3] || s[2] || Dr(e)
    ), r.source.end.offset++; e[0][0] !== "word"; )
      e.length === 1 && this.unknownWord(e), r.raws.before += e.shift()[1];
    for (r.source.start = this.getPosition(e[0][2]), r.prop = ""; e.length; ) {
      let u = e[0][0];
      if (u === ":" || u === "space" || u === "comment")
        break;
      r.prop += e.shift()[1];
    }
    r.raws.between = "";
    let n;
    for (; e.length; )
      if (n = e.shift(), n[0] === ":") {
        r.raws.between += n[1];
        break;
      } else
        n[0] === "word" && /\w/.test(n[1]) && this.unknownWord([n]), r.raws.between += n[1];
    (r.prop[0] === "_" || r.prop[0] === "*") && (r.raws.before += r.prop[0], r.prop = r.prop.slice(1));
    let i = [], a;
    for (; e.length && (a = e[0][0], !(a !== "space" && a !== "comment")); )
      i.push(e.shift());
    this.precheckMissedSemicolon(e);
    for (let u = e.length - 1; u >= 0; u--) {
      if (n = e[u], n[1].toLowerCase() === "!important") {
        r.important = !0;
        let f = this.stringFrom(e, u);
        f = this.spacesFromEnd(e) + f, f !== " !important" && (r.raws.important = f);
        break;
      } else if (n[1].toLowerCase() === "important") {
        let f = e.slice(0), p = "";
        for (let d = u; d > 0; d--) {
          let w = f[d][0];
          if (p.trim().indexOf("!") === 0 && w !== "space")
            break;
          p = f.pop()[1] + p;
        }
        p.trim().indexOf("!") === 0 && (r.important = !0, r.raws.important = p, e = f);
      }
      if (n[0] !== "space" && n[0] !== "comment")
        break;
    }
    e.some((u) => u[0] !== "space" && u[0] !== "comment") && (r.raws.between += i.map((u) => u[1]).join(""), i = []), this.raw(r, "value", i.concat(e), t), r.value.includes(":") && !t && this.checkMissedSemicolon(e);
  }
  doubleColon(e) {
    throw this.input.error(
      "Double colon",
      { offset: e[2] },
      { offset: e[2] + e[1].length }
    );
  }
  emptyRule(e) {
    let t = new Qe();
    this.init(t, e[2]), t.selector = "", t.raws.between = "", this.current = t;
  }
  end(e) {
    this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.semicolon = !1, this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.spaces = "", this.current.parent ? (this.current.source.end = this.getPosition(e[2]), this.current.source.end.offset++, this.current = this.current.parent) : this.unexpectedClose(e);
  }
  endFile() {
    this.current.parent && this.unclosedBlock(), this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.root.source.end = this.getPosition(this.tokenizer.position());
  }
  freeSemicolon(e) {
    if (this.spaces += e[1], this.current.nodes) {
      let t = this.current.nodes[this.current.nodes.length - 1];
      t && t.type === "rule" && !t.raws.ownSemicolon && (t.raws.ownSemicolon = this.spaces, this.spaces = "");
    }
  }
  // Helpers
  getPosition(e) {
    let t = this.input.fromOffset(e);
    return {
      column: t.col,
      line: t.line,
      offset: e
    };
  }
  init(e, t) {
    this.current.push(e), e.source = {
      input: this.input,
      start: this.getPosition(t)
    }, e.raws.before = this.spaces, this.spaces = "", e.type !== "comment" && (this.semicolon = !1);
  }
  other(e) {
    let t = !1, r = null, s = !1, n = null, i = [], a = e[1].startsWith("--"), l = [], u = e;
    for (; u; ) {
      if (r = u[0], l.push(u), r === "(" || r === "[")
        n || (n = u), i.push(r === "(" ? ")" : "]");
      else if (a && s && r === "{")
        n || (n = u), i.push("}");
      else if (i.length === 0)
        if (r === ";")
          if (s) {
            this.decl(l, a);
            return;
          } else
            break;
        else if (r === "{") {
          this.rule(l);
          return;
        } else if (r === "}") {
          this.tokenizer.back(l.pop()), t = !0;
          break;
        } else r === ":" && (s = !0);
      else r === i[i.length - 1] && (i.pop(), i.length === 0 && (n = null));
      u = this.tokenizer.nextToken();
    }
    if (this.tokenizer.endOfFile() && (t = !0), i.length > 0 && this.unclosedBracket(n), t && s) {
      if (!a)
        for (; l.length && (u = l[l.length - 1][0], !(u !== "space" && u !== "comment")); )
          this.tokenizer.back(l.pop());
      this.decl(l, a);
    } else
      this.unknownWord(l);
  }
  parse() {
    let e;
    for (; !this.tokenizer.endOfFile(); )
      switch (e = this.tokenizer.nextToken(), e[0]) {
        case "space":
          this.spaces += e[1];
          break;
        case ";":
          this.freeSemicolon(e);
          break;
        case "}":
          this.end(e);
          break;
        case "comment":
          this.comment(e);
          break;
        case "at-word":
          this.atrule(e);
          break;
        case "{":
          this.emptyRule(e);
          break;
        default:
          this.other(e);
          break;
      }
    this.endFile();
  }
  precheckMissedSemicolon() {
  }
  raw(e, t, r, s) {
    let n, i, a = r.length, l = "", u = !0, f, p;
    for (let d = 0; d < a; d += 1)
      n = r[d], i = n[0], i === "space" && d === a - 1 && !s ? u = !1 : i === "comment" ? (p = r[d - 1] ? r[d - 1][0] : "empty", f = r[d + 1] ? r[d + 1][0] : "empty", !Ke[p] && !Ke[f] ? l.slice(-1) === "," ? u = !1 : l += n[1] : u = !1) : l += n[1];
    if (!u) {
      let d = r.reduce((w, y) => w + y[1], "");
      e.raws[t] = { raw: d, value: l };
    }
    e[t] = l;
  }
  rule(e) {
    e.pop();
    let t = new Qe();
    this.init(t, e[0][2]), t.raws.between = this.spacesAndCommentsFromEnd(e), this.raw(t, "selector", e), this.current = t;
  }
  spacesAndCommentsFromEnd(e) {
    let t, r = "";
    for (; e.length && (t = e[e.length - 1][0], !(t !== "space" && t !== "comment")); )
      r = e.pop()[1] + r;
    return r;
  }
  // Errors
  spacesAndCommentsFromStart(e) {
    let t, r = "";
    for (; e.length && (t = e[0][0], !(t !== "space" && t !== "comment")); )
      r += e.shift()[1];
    return r;
  }
  spacesFromEnd(e) {
    let t, r = "";
    for (; e.length && (t = e[e.length - 1][0], t === "space"); )
      r = e.pop()[1] + r;
    return r;
  }
  stringFrom(e, t) {
    let r = "";
    for (let s = t; s < e.length; s++)
      r += e[s][1];
    return e.splice(t, e.length - t), r;
  }
  unclosedBlock() {
    let e = this.current.source.start;
    throw this.input.error("Unclosed block", e.line, e.column);
  }
  unclosedBracket(e) {
    throw this.input.error(
      "Unclosed bracket",
      { offset: e[2] },
      { offset: e[2] + 1 }
    );
  }
  unexpectedClose(e) {
    throw this.input.error(
      "Unexpected }",
      { offset: e[2] },
      { offset: e[2] + 1 }
    );
  }
  unknownWord(e) {
    throw this.input.error(
      "Unknown word",
      { offset: e[0][2] },
      { offset: e[0][2] + e[0][1].length }
    );
  }
  unnamedAtrule(e, t) {
    throw this.input.error(
      "At-rule without name",
      { offset: t[2] },
      { offset: t[2] + t[1].length }
    );
  }
};
var Fr = zr;
let Br = C, Tr = Fr, jr = ee;
function K(o, e) {
  let t = new jr(o, e), r = new Tr(t);
  try {
    r.parse();
  } catch (s) {
    throw process.env.NODE_ENV !== "production" && s.name === "CssSyntaxError" && e && e.from && (/\.scss$/i.test(e.from) ? s.message += `
You tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser` : /\.sass/i.test(e.from) ? s.message += `
You tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser` : /\.less$/i.test(e.from) && (s.message += `
You tried to parse Less with the standard CSS parser; try again with the postcss-less parser`)), s;
  }
  return r.root;
}
var Ie = K;
K.default = K;
Br.registerParse(K);
let { isClean: b, my: Wr } = _, Vr = lt, Gr = q, Jr = C, Hr = Pe, Yr = xt, qe = $e, Qr = Ie, Kr = U;
const qr = {
  atrule: "AtRule",
  comment: "Comment",
  decl: "Declaration",
  document: "Document",
  root: "Root",
  rule: "Rule"
}, Xr = {
  AtRule: !0,
  AtRuleExit: !0,
  Comment: !0,
  CommentExit: !0,
  Declaration: !0,
  DeclarationExit: !0,
  Document: !0,
  DocumentExit: !0,
  Once: !0,
  OnceExit: !0,
  postcssPlugin: !0,
  prepare: !0,
  Root: !0,
  RootExit: !0,
  Rule: !0,
  RuleExit: !0
}, Zr = {
  Once: !0,
  postcssPlugin: !0,
  prepare: !0
}, E = 0;
function P(o) {
  return typeof o == "object" && typeof o.then == "function";
}
function At(o) {
  let e = !1, t = qr[o.type];
  return o.type === "decl" ? e = o.prop.toLowerCase() : o.type === "atrule" && (e = o.name.toLowerCase()), e && o.append ? [
    t,
    t + "-" + e,
    E,
    t + "Exit",
    t + "Exit-" + e
  ] : e ? [t, t + "-" + e, t + "Exit", t + "Exit-" + e] : o.append ? [t, E, t + "Exit"] : [t, t + "Exit"];
}
function Xe(o) {
  let e;
  return o.type === "document" ? e = ["Document", E, "DocumentExit"] : o.type === "root" ? e = ["Root", E, "RootExit"] : e = At(o), {
    eventIndex: 0,
    events: e,
    iterator: 0,
    node: o,
    visitorIndex: 0,
    visitors: []
  };
}
function Se(o) {
  return o[b] = !1, o.nodes && o.nodes.forEach((e) => Se(e)), o;
}
let Ce = {}, R = class Pt {
  constructor(e, t, r) {
    this.stringified = !1, this.processed = !1;
    let s;
    if (typeof t == "object" && t !== null && (t.type === "root" || t.type === "document"))
      s = Se(t);
    else if (t instanceof Pt || t instanceof qe)
      s = Se(t.root), t.map && (typeof r.map > "u" && (r.map = {}), r.map.inline || (r.map.inline = !1), r.map.prev = t.map);
    else {
      let n = Qr;
      r.syntax && (n = r.syntax.parse), r.parser && (n = r.parser), n.parse && (n = n.parse);
      try {
        s = n(t, r);
      } catch (i) {
        this.processed = !0, this.error = i;
      }
      s && !s[Wr] && Jr.rebuild(s);
    }
    this.result = new qe(e, s, r), this.helpers = { ...Ce, postcss: Ce, result: this.result }, this.plugins = this.processor.plugins.map((n) => typeof n == "object" && n.prepare ? { ...n, ...n.prepare(this.result) } : n);
  }
  async() {
    return this.error ? Promise.reject(this.error) : this.processed ? Promise.resolve(this.result) : (this.processing || (this.processing = this.runAsync()), this.processing);
  }
  catch(e) {
    return this.async().catch(e);
  }
  finally(e) {
    return this.async().then(e, e);
  }
  getAsyncError() {
    throw new Error("Use process(css).then(cb) to work with async plugins");
  }
  handleError(e, t) {
    let r = this.result.lastPlugin;
    try {
      if (t && t.addToError(e), this.error = e, e.name === "CssSyntaxError" && !e.plugin)
        e.plugin = r.postcssPlugin, e.setMessage();
      else if (r.postcssVersion && process.env.NODE_ENV !== "production") {
        let s = r.postcssPlugin, n = r.postcssVersion, i = this.result.processor.version, a = n.split("."), l = i.split(".");
        (a[0] !== l[0] || parseInt(a[1]) > parseInt(l[1])) && console.error(
          "Unknown error from PostCSS plugin. Your current PostCSS version is " + i + ", but " + s + " uses " + n + ". Perhaps this is the source of the error below."
        );
      }
    } catch (s) {
      console && console.error && console.error(s);
    }
    return e;
  }
  prepareVisitors() {
    this.listeners = {};
    let e = (t, r, s) => {
      this.listeners[r] || (this.listeners[r] = []), this.listeners[r].push([t, s]);
    };
    for (let t of this.plugins)
      if (typeof t == "object")
        for (let r in t) {
          if (!Xr[r] && /^[A-Z]/.test(r))
            throw new Error(
              `Unknown event ${r} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
            );
          if (!Zr[r])
            if (typeof t[r] == "object")
              for (let s in t[r])
                s === "*" ? e(t, r, t[r][s]) : e(
                  t,
                  r + "-" + s.toLowerCase(),
                  t[r][s]
                );
            else typeof t[r] == "function" && e(t, r, t[r]);
        }
    this.hasListener = Object.keys(this.listeners).length > 0;
  }
  async runAsync() {
    this.plugin = 0;
    for (let e = 0; e < this.plugins.length; e++) {
      let t = this.plugins[e], r = this.runOnRoot(t);
      if (P(r))
        try {
          await r;
        } catch (s) {
          throw this.handleError(s);
        }
    }
    if (this.prepareVisitors(), this.hasListener) {
      let e = this.result.root;
      for (; !e[b]; ) {
        e[b] = !0;
        let t = [Xe(e)];
        for (; t.length > 0; ) {
          let r = this.visitTick(t);
          if (P(r))
            try {
              await r;
            } catch (s) {
              let n = t[t.length - 1].node;
              throw this.handleError(s, n);
            }
        }
      }
      if (this.listeners.OnceExit)
        for (let [t, r] of this.listeners.OnceExit) {
          this.result.lastPlugin = t;
          try {
            if (e.type === "document") {
              let s = e.nodes.map(
                (n) => r(n, this.helpers)
              );
              await Promise.all(s);
            } else
              await r(e, this.helpers);
          } catch (s) {
            throw this.handleError(s);
          }
        }
    }
    return this.processed = !0, this.stringify();
  }
  runOnRoot(e) {
    this.result.lastPlugin = e;
    try {
      if (typeof e == "object" && e.Once) {
        if (this.result.root.type === "document") {
          let t = this.result.root.nodes.map(
            (r) => e.Once(r, this.helpers)
          );
          return P(t[0]) ? Promise.all(t) : t;
        }
        return e.Once(this.result.root, this.helpers);
      } else if (typeof e == "function")
        return e(this.result.root, this.result);
    } catch (t) {
      throw this.handleError(t);
    }
  }
  stringify() {
    if (this.error) throw this.error;
    if (this.stringified) return this.result;
    this.stringified = !0, this.sync();
    let e = this.result.opts, t = Gr;
    e.syntax && (t = e.syntax.stringify), e.stringifier && (t = e.stringifier), t.stringify && (t = t.stringify);
    let s = new Vr(t, this.result.root, this.result.opts).generate();
    return this.result.css = s[0], this.result.map = s[1], this.result;
  }
  sync() {
    if (this.error) throw this.error;
    if (this.processed) return this.result;
    if (this.processed = !0, this.processing)
      throw this.getAsyncError();
    for (let e of this.plugins) {
      let t = this.runOnRoot(e);
      if (P(t))
        throw this.getAsyncError();
    }
    if (this.prepareVisitors(), this.hasListener) {
      let e = this.result.root;
      for (; !e[b]; )
        e[b] = !0, this.walkSync(e);
      if (this.listeners.OnceExit)
        if (e.type === "document")
          for (let t of e.nodes)
            this.visitSync(this.listeners.OnceExit, t);
        else
          this.visitSync(this.listeners.OnceExit, e);
    }
    return this.result;
  }
  then(e, t) {
    return process.env.NODE_ENV !== "production" && ("from" in this.opts || Yr(
      "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
    )), this.async().then(e, t);
  }
  toString() {
    return this.css;
  }
  visitSync(e, t) {
    for (let [r, s] of e) {
      this.result.lastPlugin = r;
      let n;
      try {
        n = s(t, this.helpers);
      } catch (i) {
        throw this.handleError(i, t.proxyOf);
      }
      if (t.type !== "root" && t.type !== "document" && !t.parent)
        return !0;
      if (P(n))
        throw this.getAsyncError();
    }
  }
  visitTick(e) {
    let t = e[e.length - 1], { node: r, visitors: s } = t;
    if (r.type !== "root" && r.type !== "document" && !r.parent) {
      e.pop();
      return;
    }
    if (s.length > 0 && t.visitorIndex < s.length) {
      let [i, a] = s[t.visitorIndex];
      t.visitorIndex += 1, t.visitorIndex === s.length && (t.visitors = [], t.visitorIndex = 0), this.result.lastPlugin = i;
      try {
        return a(r.toProxy(), this.helpers);
      } catch (l) {
        throw this.handleError(l, r);
      }
    }
    if (t.iterator !== 0) {
      let i = t.iterator, a;
      for (; a = r.nodes[r.indexes[i]]; )
        if (r.indexes[i] += 1, !a[b]) {
          a[b] = !0, e.push(Xe(a));
          return;
        }
      t.iterator = 0, delete r.indexes[i];
    }
    let n = t.events;
    for (; t.eventIndex < n.length; ) {
      let i = n[t.eventIndex];
      if (t.eventIndex += 1, i === E) {
        r.nodes && r.nodes.length && (r[b] = !0, t.iterator = r.getIterator());
        return;
      } else if (this.listeners[i]) {
        t.visitors = this.listeners[i];
        return;
      }
    }
    e.pop();
  }
  walkSync(e) {
    e[b] = !0;
    let t = At(e);
    for (let r of t)
      if (r === E)
        e.nodes && e.each((s) => {
          s[b] || this.walkSync(s);
        });
      else {
        let s = this.listeners[r];
        if (s && this.visitSync(s, e.toProxy()))
          return;
      }
  }
  warnings() {
    return this.sync().warnings();
  }
  get content() {
    return this.stringify().content;
  }
  get css() {
    return this.stringify().css;
  }
  get map() {
    return this.stringify().map;
  }
  get messages() {
    return this.sync().messages;
  }
  get opts() {
    return this.result.opts;
  }
  get processor() {
    return this.result.processor;
  }
  get root() {
    return this.sync().root;
  }
  get [Symbol.toStringTag]() {
    return "LazyResult";
  }
};
R.registerPostcss = (o) => {
  Ce = o;
};
var $t = R;
R.default = R;
Kr.registerLazyResult(R);
Hr.registerLazyResult(R);
let es = lt, ts = q, rs = xt, ss = Ie;
const is = $e;
let ve = class {
  constructor(e, t, r) {
    t = t.toString(), this.stringified = !1, this._processor = e, this._css = t, this._opts = r, this._map = void 0;
    let s, n = ts;
    this.result = new is(this._processor, s, this._opts), this.result.css = t;
    let i = this;
    Object.defineProperty(this.result, "root", {
      get() {
        return i.root;
      }
    });
    let a = new es(n, s, this._opts, t);
    if (a.isMap()) {
      let [l, u] = a.generate();
      l && (this.result.css = l), u && (this.result.map = u);
    } else
      a.clearAnnotation(), this.result.css = a.css;
  }
  async() {
    return this.error ? Promise.reject(this.error) : Promise.resolve(this.result);
  }
  catch(e) {
    return this.async().catch(e);
  }
  finally(e) {
    return this.async().then(e, e);
  }
  sync() {
    if (this.error) throw this.error;
    return this.result;
  }
  then(e, t) {
    return process.env.NODE_ENV !== "production" && ("from" in this._opts || rs(
      "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
    )), this.async().then(e, t);
  }
  toString() {
    return this._css;
  }
  warnings() {
    return [];
  }
  get content() {
    return this.result.css;
  }
  get css() {
    return this.result.css;
  }
  get map() {
    return this.result.map;
  }
  get messages() {
    return [];
  }
  get opts() {
    return this.result.opts;
  }
  get processor() {
    return this.result.processor;
  }
  get root() {
    if (this._root)
      return this._root;
    let e, t = ss;
    try {
      e = t(this._css, this._opts);
    } catch (r) {
      this.error = r;
    }
    if (this.error)
      throw this.error;
    return this._root = e, e;
  }
  get [Symbol.toStringTag]() {
    return "NoWorkResult";
  }
};
var ns = ve;
ve.default = ve;
let os = ns, ls = $t, as = Pe, us = U, k = class {
  constructor(e = []) {
    this.version = "8.4.41", this.plugins = this.normalize(e);
  }
  normalize(e) {
    let t = [];
    for (let r of e)
      if (r.postcss === !0 ? r = r() : r.postcss && (r = r.postcss), typeof r == "object" && Array.isArray(r.plugins))
        t = t.concat(r.plugins);
      else if (typeof r == "object" && r.postcssPlugin)
        t.push(r);
      else if (typeof r == "function")
        t.push(r);
      else if (typeof r == "object" && (r.parse || r.stringify)) {
        if (process.env.NODE_ENV !== "production")
          throw new Error(
            "PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation."
          );
      } else
        throw new Error(r + " is not a PostCSS plugin");
    return t;
  }
  process(e, t = {}) {
    return !this.plugins.length && !t.parser && !t.stringifier && !t.syntax ? new os(this, e, t) : new ls(this, e, t);
  }
  use(e) {
    return this.plugins = this.plugins.concat(this.normalize([e])), this;
  }
};
var fs = k;
k.default = k;
us.registerProcessor(k);
as.registerProcessor(k);
let hs = Z, cs = rt, ps = te, ds = Me, ms = ee, gs = U, ws = ke;
function I(o, e) {
  if (Array.isArray(o)) return o.map((s) => I(s));
  let { inputs: t, ...r } = o;
  if (t) {
    e = [];
    for (let s of t) {
      let n = { ...s, __proto__: ms.prototype };
      n.map && (n.map = {
        ...n.map,
        __proto__: cs.prototype
      }), e.push(n);
    }
  }
  if (r.nodes && (r.nodes = o.nodes.map((s) => I(s, e))), r.source) {
    let { inputId: s, ...n } = r.source;
    r.source = n, s != null && (r.source.input = e[s]);
  }
  if (r.type === "root")
    return new gs(r);
  if (r.type === "decl")
    return new hs(r);
  if (r.type === "rule")
    return new ws(r);
  if (r.type === "comment")
    return new ps(r);
  if (r.type === "atrule")
    return new ds(r);
  throw new Error("Unknown node type: " + o.type);
}
var ys = I;
I.default = I;
let xs = Ee, Mt = Z, bs = $t, Ss = C, _e = fs, Cs = q, vs = ys, kt = Pe, Os = bt, It = te, _t = Me, Es = $e, Rs = ee, As = Ie, Ps = Et, Ut = ke, Lt = U, $s = X;
function c(...o) {
  return o.length === 1 && Array.isArray(o[0]) && (o = o[0]), new _e(o);
}
c.plugin = function(e, t) {
  let r = !1;
  function s(...i) {
    console && console.warn && !r && (r = !0, console.warn(
      e + `: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`
    ), process.env.LANG && process.env.LANG.startsWith("cn") && console.warn(
      e + `: 里面 postcss.plugin 被弃用. 迁移指南:
https://www.w3ctech.com/topic/2226`
    ));
    let a = t(...i);
    return a.postcssPlugin = e, a.postcssVersion = new _e().version, a;
  }
  let n;
  return Object.defineProperty(s, "postcss", {
    get() {
      return n || (n = s()), n;
    }
  }), s.process = function(i, a, l) {
    return c([s(l)]).process(i, a);
  }, s;
};
c.stringify = Cs;
c.parse = As;
c.fromJSON = vs;
c.list = Ps;
c.comment = (o) => new It(o);
c.atRule = (o) => new _t(o);
c.decl = (o) => new Mt(o);
c.rule = (o) => new Ut(o);
c.root = (o) => new Lt(o);
c.document = (o) => new kt(o);
c.CssSyntaxError = xs;
c.Declaration = Mt;
c.Container = Ss;
c.Processor = _e;
c.Document = kt;
c.Comment = It;
c.Warning = Os;
c.AtRule = _t;
c.Result = Es;
c.Input = Rs;
c.Rule = Ut;
c.Root = Lt;
c.Node = $s;
bs.registerPostcss(c);
var Ms = c;
c.default = c;
const g = /* @__PURE__ */ Bt(Ms);
g.stringify;
g.fromJSON;
g.plugin;
const Hs = g.parse;
g.list;
g.document;
g.comment;
g.atRule;
g.rule;
g.decl;
g.root;
g.CssSyntaxError;
g.Declaration;
g.Container;
g.Processor;
g.Document;
g.Comment;
g.Warning;
g.AtRule;
g.Result;
g.Input;
g.Rule;
g.Root;
g.Node;
export {
  Hs as parse
};
