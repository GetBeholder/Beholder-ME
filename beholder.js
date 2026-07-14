(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/jquery/dist-module/jquery.module.js
  function jQueryFactory(window2, noGlobal) {
    if (typeof window2 === "undefined" || !window2.document) {
      throw new Error("jQuery requires a window with a document");
    }
    var arr = [];
    var getProto = Object.getPrototypeOf;
    var slice = arr.slice;
    var flat = arr.flat ? function(array) {
      return arr.flat.call(array);
    } : function(array) {
      return arr.concat.apply([], array);
    };
    var push = arr.push;
    var indexOf = arr.indexOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var fnToString = hasOwn.toString;
    var ObjectFunctionString = fnToString.call(Object);
    var support = {};
    function toType(obj) {
      if (obj == null) {
        return obj + "";
      }
      return typeof obj === "object" ? class2type[toString.call(obj)] || "object" : typeof obj;
    }
    function isWindow(obj) {
      return obj != null && obj === obj.window;
    }
    function isArrayLike(obj) {
      var length = !!obj && obj.length, type = toType(obj);
      if (typeof obj === "function" || isWindow(obj)) {
        return false;
      }
      return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
    }
    var document$1 = window2.document;
    var preservedScriptAttributes = {
      type: true,
      src: true,
      nonce: true,
      noModule: true
    };
    function DOMEval(code, node, doc) {
      doc = doc || document$1;
      var i2, script = doc.createElement("script");
      script.text = code;
      for (i2 in preservedScriptAttributes) {
        if (node && node[i2]) {
          script[i2] = node[i2];
        }
      }
      if (doc.head.appendChild(script).parentNode) {
        script.parentNode.removeChild(script);
      }
    }
    var version = "4.0.0", rhtmlSuffix = /HTML$/i, jQuery3 = function(selector, context) {
      return new jQuery3.fn.init(selector, context);
    };
    jQuery3.fn = jQuery3.prototype = {
      // The current version of jQuery being used
      jquery: version,
      constructor: jQuery3,
      // The default length of a jQuery object is 0
      length: 0,
      toArray: function() {
        return slice.call(this);
      },
      // Get the Nth element in the matched element set OR
      // Get the whole matched element set as a clean array
      get: function(num) {
        if (num == null) {
          return slice.call(this);
        }
        return num < 0 ? this[num + this.length] : this[num];
      },
      // Take an array of elements and push it onto the stack
      // (returning the new matched element set)
      pushStack: function(elems) {
        var ret = jQuery3.merge(this.constructor(), elems);
        ret.prevObject = this;
        return ret;
      },
      // Execute a callback for every element in the matched set.
      each: function(callback) {
        return jQuery3.each(this, callback);
      },
      map: function(callback) {
        return this.pushStack(jQuery3.map(this, function(elem, i2) {
          return callback.call(elem, i2, elem);
        }));
      },
      slice: function() {
        return this.pushStack(slice.apply(this, arguments));
      },
      first: function() {
        return this.eq(0);
      },
      last: function() {
        return this.eq(-1);
      },
      even: function() {
        return this.pushStack(jQuery3.grep(this, function(_elem, i2) {
          return (i2 + 1) % 2;
        }));
      },
      odd: function() {
        return this.pushStack(jQuery3.grep(this, function(_elem, i2) {
          return i2 % 2;
        }));
      },
      eq: function(i2) {
        var len = this.length, j = +i2 + (i2 < 0 ? len : 0);
        return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
      },
      end: function() {
        return this.prevObject || this.constructor();
      }
    };
    jQuery3.extend = jQuery3.fn.extend = function() {
      var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i2 = 1, length = arguments.length, deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[i2] || {};
        i2++;
      }
      if (typeof target !== "object" && typeof target !== "function") {
        target = {};
      }
      if (i2 === length) {
        target = this;
        i2--;
      }
      for (; i2 < length; i2++) {
        if ((options = arguments[i2]) != null) {
          for (name in options) {
            copy = options[name];
            if (name === "__proto__" || target === copy) {
              continue;
            }
            if (deep && copy && (jQuery3.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
              src = target[name];
              if (copyIsArray && !Array.isArray(src)) {
                clone = [];
              } else if (!copyIsArray && !jQuery3.isPlainObject(src)) {
                clone = {};
              } else {
                clone = src;
              }
              copyIsArray = false;
              target[name] = jQuery3.extend(deep, clone, copy);
            } else if (copy !== void 0) {
              target[name] = copy;
            }
          }
        }
      }
      return target;
    };
    jQuery3.extend({
      // Unique for each copy of jQuery on the page
      expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
      // Assume jQuery is ready without the ready module
      isReady: true,
      error: function(msg) {
        throw new Error(msg);
      },
      noop: function() {
      },
      isPlainObject: function(obj) {
        var proto, Ctor;
        if (!obj || toString.call(obj) !== "[object Object]") {
          return false;
        }
        proto = getProto(obj);
        if (!proto) {
          return true;
        }
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
      },
      isEmptyObject: function(obj) {
        var name;
        for (name in obj) {
          return false;
        }
        return true;
      },
      // Evaluates a script in a provided context; falls back to the global one
      // if not specified.
      globalEval: function(code, options, doc) {
        DOMEval(code, { nonce: options && options.nonce }, doc);
      },
      each: function(obj, callback) {
        var length, i2 = 0;
        if (isArrayLike(obj)) {
          length = obj.length;
          for (; i2 < length; i2++) {
            if (callback.call(obj[i2], i2, obj[i2]) === false) {
              break;
            }
          }
        } else {
          for (i2 in obj) {
            if (callback.call(obj[i2], i2, obj[i2]) === false) {
              break;
            }
          }
        }
        return obj;
      },
      // Retrieve the text value of an array of DOM nodes
      text: function(elem) {
        var node, ret = "", i2 = 0, nodeType = elem.nodeType;
        if (!nodeType) {
          while (node = elem[i2++]) {
            ret += jQuery3.text(node);
          }
        }
        if (nodeType === 1 || nodeType === 11) {
          return elem.textContent;
        }
        if (nodeType === 9) {
          return elem.documentElement.textContent;
        }
        if (nodeType === 3 || nodeType === 4) {
          return elem.nodeValue;
        }
        return ret;
      },
      // results is for internal usage only
      makeArray: function(arr2, results) {
        var ret = results || [];
        if (arr2 != null) {
          if (isArrayLike(Object(arr2))) {
            jQuery3.merge(
              ret,
              typeof arr2 === "string" ? [arr2] : arr2
            );
          } else {
            push.call(ret, arr2);
          }
        }
        return ret;
      },
      inArray: function(elem, arr2, i2) {
        return arr2 == null ? -1 : indexOf.call(arr2, elem, i2);
      },
      isXMLDoc: function(elem) {
        var namespace = elem && elem.namespaceURI, docElem = elem && (elem.ownerDocument || elem).documentElement;
        return !rhtmlSuffix.test(namespace || docElem && docElem.nodeName || "HTML");
      },
      // Note: an element does not contain itself
      contains: function(a, b) {
        var bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && // Support: IE 9 - 11+
        // IE doesn't have `contains` on SVG.
        (a.contains ? a.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      },
      merge: function(first, second) {
        var len = +second.length, j = 0, i2 = first.length;
        for (; j < len; j++) {
          first[i2++] = second[j];
        }
        first.length = i2;
        return first;
      },
      grep: function(elems, callback, invert) {
        var callbackInverse, matches2 = [], i2 = 0, length = elems.length, callbackExpect = !invert;
        for (; i2 < length; i2++) {
          callbackInverse = !callback(elems[i2], i2);
          if (callbackInverse !== callbackExpect) {
            matches2.push(elems[i2]);
          }
        }
        return matches2;
      },
      // arg is for internal usage only
      map: function(elems, callback, arg) {
        var length, value, i2 = 0, ret = [];
        if (isArrayLike(elems)) {
          length = elems.length;
          for (; i2 < length; i2++) {
            value = callback(elems[i2], i2, arg);
            if (value != null) {
              ret.push(value);
            }
          }
        } else {
          for (i2 in elems) {
            value = callback(elems[i2], i2, arg);
            if (value != null) {
              ret.push(value);
            }
          }
        }
        return flat(ret);
      },
      // A global GUID counter for objects
      guid: 1,
      // jQuery.support is not used in Core but other projects attach their
      // properties to it so it needs to exist.
      support
    });
    if (typeof Symbol === "function") {
      jQuery3.fn[Symbol.iterator] = arr[Symbol.iterator];
    }
    jQuery3.each(
      "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
      function(_i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
      }
    );
    function nodeName(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    }
    var pop = arr.pop;
    var whitespace = "[\\x20\\t\\r\\n\\f]";
    var isIE = document$1.documentMode;
    var rbuggyQSA = isIE && new RegExp(
      // Support: IE 9 - 11+
      // IE's :disabled selector does not pick up the children of disabled fieldsets
      ":enabled|:disabled|\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + `*(?:''|"")`
    );
    var rtrimCSS = new RegExp(
      "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
      "g"
    );
    var identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+";
    var rleadingCombinator = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*");
    var rdescend = new RegExp(whitespace + "|>");
    var rsibling = /[+~]/;
    var documentElement$1 = document$1.documentElement;
    var matches = documentElement$1.matches || documentElement$1.msMatchesSelector;
    function createCache() {
      var keys = [];
      function cache(key, value) {
        if (keys.push(key + " ") > jQuery3.expr.cacheLength) {
          delete cache[keys.shift()];
        }
        return cache[key + " "] = value;
      }
      return cache;
    }
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context;
    }
    var attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + // Operator (capture 2)
    "*([*^$|!~]?=)" + whitespace + // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
    `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + identifier + "))|)" + whitespace + "*\\]";
    var pseudos = ":(" + identifier + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + attributes + ")*)|.*)\\)|)";
    var filterMatchExpr = {
      ID: new RegExp("^#(" + identifier + ")"),
      CLASS: new RegExp("^\\.(" + identifier + ")"),
      TAG: new RegExp("^(" + identifier + "|[*])"),
      ATTR: new RegExp("^" + attributes),
      PSEUDO: new RegExp("^" + pseudos),
      CHILD: new RegExp(
        "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)",
        "i"
      )
    };
    var rpseudo = new RegExp(pseudos);
    var runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"), funescape = function(escape, nonHex) {
      var high = "0x" + escape.slice(1) - 65536;
      if (nonHex) {
        return nonHex;
      }
      return high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
    };
    function unescapeSelector(sel) {
      return sel.replace(runescape, funescape);
    }
    function selectorError(msg) {
      jQuery3.error("Syntax error, unrecognized expression: " + msg);
    }
    var rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*");
    var tokenCache = createCache();
    function tokenize(selector, parseOnly) {
      var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = jQuery3.expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push(tokens = []);
        }
        matched = false;
        if (match = rleadingCombinator.exec(soFar)) {
          matched = match.shift();
          tokens.push({
            value: matched,
            // Cast descendant combinators to space
            type: match[0].replace(rtrimCSS, " ")
          });
          soFar = soFar.slice(matched.length);
        }
        for (type in filterMatchExpr) {
          if ((match = jQuery3.expr.match[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      if (parseOnly) {
        return soFar.length;
      }
      return soFar ? selectorError(selector) : (
        // Cache the tokens
        tokenCache(selector, groups).slice(0)
      );
    }
    var preFilter = {
      ATTR: function(match) {
        match[1] = unescapeSelector(match[1]);
        match[3] = unescapeSelector(match[3] || match[4] || match[5] || "");
        if (match[2] === "~=") {
          match[3] = " " + match[3] + " ";
        }
        return match.slice(0, 4);
      },
      CHILD: function(match) {
        match[1] = match[1].toLowerCase();
        if (match[1].slice(0, 3) === "nth") {
          if (!match[3]) {
            selectorError(match[0]);
          }
          match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
          match[5] = +(match[7] + match[8] || match[3] === "odd");
        } else if (match[3]) {
          selectorError(match[0]);
        }
        return match;
      },
      PSEUDO: function(match) {
        var excess, unquoted = !match[6] && match[2];
        if (filterMatchExpr.CHILD.test(match[0])) {
          return null;
        }
        if (match[3]) {
          match[2] = match[4] || match[5] || "";
        } else if (unquoted && rpseudo.test(unquoted) && // Get excess from tokenize (recursively)
        (excess = tokenize(unquoted, true)) && // advance to the next closing parenthesis
        (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
          match[0] = match[0].slice(0, excess);
          match[2] = unquoted.slice(0, excess);
        }
        return match.slice(0, 3);
      }
    };
    function toSelector(tokens) {
      var i2 = 0, len = tokens.length, selector = "";
      for (; i2 < len; i2++) {
        selector += tokens[i2].value;
      }
      return selector;
    }
    function access(elems, fn, key, value, chainable, emptyGet, raw) {
      var i2 = 0, len = elems.length, bulk = key == null;
      if (toType(key) === "object") {
        chainable = true;
        for (i2 in key) {
          access(elems, fn, i2, key[i2], true, emptyGet, raw);
        }
      } else if (value !== void 0) {
        chainable = true;
        if (typeof value !== "function") {
          raw = true;
        }
        if (bulk) {
          if (raw) {
            fn.call(elems, value);
            fn = null;
          } else {
            bulk = fn;
            fn = function(elem, _key, value2) {
              return bulk.call(jQuery3(elem), value2);
            };
          }
        }
        if (fn) {
          for (; i2 < len; i2++) {
            fn(
              elems[i2],
              key,
              raw ? value : value.call(elems[i2], i2, fn(elems[i2], key))
            );
          }
        }
      }
      if (chainable) {
        return elems;
      }
      if (bulk) {
        return fn.call(elems);
      }
      return len ? fn(elems[0], key) : emptyGet;
    }
    var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
    jQuery3.fn.extend({
      attr: function(name, value) {
        return access(this, jQuery3.attr, name, value, arguments.length > 1);
      },
      removeAttr: function(name) {
        return this.each(function() {
          jQuery3.removeAttr(this, name);
        });
      }
    });
    jQuery3.extend({
      attr: function(elem, name, value) {
        var ret, hooks, nType = elem.nodeType;
        if (nType === 3 || nType === 8 || nType === 2) {
          return;
        }
        if (typeof elem.getAttribute === "undefined") {
          return jQuery3.prop(elem, name, value);
        }
        if (nType !== 1 || !jQuery3.isXMLDoc(elem)) {
          hooks = jQuery3.attrHooks[name.toLowerCase()];
        }
        if (value !== void 0) {
          if (value === null || // For compat with previous handling of boolean attributes,
          // remove when `false` passed. For ARIA attributes -
          // many of which recognize a `"false"` value - continue to
          // set the `"false"` value as jQuery <4 did.
          value === false && name.toLowerCase().indexOf("aria-") !== 0) {
            jQuery3.removeAttr(elem, name);
            return;
          }
          if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
            return ret;
          }
          elem.setAttribute(name, value);
          return value;
        }
        if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
          return ret;
        }
        ret = elem.getAttribute(name);
        return ret == null ? void 0 : ret;
      },
      attrHooks: {},
      removeAttr: function(elem, value) {
        var name, i2 = 0, attrNames = value && value.match(rnothtmlwhite);
        if (attrNames && elem.nodeType === 1) {
          while (name = attrNames[i2++]) {
            elem.removeAttribute(name);
          }
        }
      }
    });
    if (isIE) {
      jQuery3.attrHooks.type = {
        set: function(elem, value) {
          if (value === "radio" && nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }
      };
    }
    var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
    function fcssescape(ch, asCodePoint) {
      if (asCodePoint) {
        if (ch === "\0") {
          return "\uFFFD";
        }
        return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
      }
      return "\\" + ch;
    }
    jQuery3.escapeSelector = function(sel) {
      return (sel + "").replace(rcssescape, fcssescape);
    };
    var sort = arr.sort;
    var splice = arr.splice;
    var hasDuplicate;
    function sortOrder(a, b) {
      if (a === b) {
        hasDuplicate = true;
        return 0;
      }
      var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
      if (compare) {
        return compare;
      }
      compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : (
        // Otherwise we know they are disconnected
        1
      );
      if (compare & 1) {
        if (a == document$1 || a.ownerDocument == document$1 && jQuery3.contains(document$1, a)) {
          return -1;
        }
        if (b == document$1 || b.ownerDocument == document$1 && jQuery3.contains(document$1, b)) {
          return 1;
        }
        return 0;
      }
      return compare & 4 ? -1 : 1;
    }
    jQuery3.uniqueSort = function(results) {
      var elem, duplicates = [], j = 0, i2 = 0;
      hasDuplicate = false;
      sort.call(results, sortOrder);
      if (hasDuplicate) {
        while (elem = results[i2++]) {
          if (elem === results[i2]) {
            j = duplicates.push(i2);
          }
        }
        while (j--) {
          splice.call(results, duplicates[j], 1);
        }
      }
      return results;
    };
    jQuery3.fn.uniqueSort = function() {
      return this.pushStack(jQuery3.uniqueSort(slice.apply(this)));
    };
    var i, outermostContext, document2, documentElement, documentIsHTML, dirruns = 0, done = 0, classCache = createCache(), compilerCache = createCache(), nonnativeSelectorCache = createCache(), rwhitespace = new RegExp(whitespace + "+", "g"), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = jQuery3.extend({
      // For use in libraries implementing .is()
      // We use this for POS matching in `select`
      needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
    }, filterMatchExpr), rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rquickExpr$1 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, unloadHandler = function() {
      setDocument();
    }, inDisabledFieldset = addCombinator(
      function(elem) {
        return elem.disabled === true && nodeName(elem, "fieldset");
      },
      { dir: "parentNode", next: "legend" }
    );
    function find(selector, context, results, seed) {
      var m, i2, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
      results = results || [];
      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      }
      if (!seed) {
        setDocument(context);
        context = context || document2;
        if (documentIsHTML) {
          if (nodeType !== 11 && (match = rquickExpr$1.exec(selector))) {
            if (m = match[1]) {
              if (nodeType === 9) {
                if (elem = context.getElementById(m)) {
                  push.call(results, elem);
                }
                return results;
              } else {
                if (newContext && (elem = newContext.getElementById(m)) && jQuery3.contains(context, elem)) {
                  push.call(results, elem);
                  return results;
                }
              }
            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results;
            } else if ((m = match[3]) && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          }
          if (!nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
            newSelector = selector;
            newContext = context;
            if (nodeType === 1 && (rdescend.test(selector) || rleadingCombinator.test(selector))) {
              newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
              if (newContext != context || isIE) {
                if (nid = context.getAttribute("id")) {
                  nid = jQuery3.escapeSelector(nid);
                } else {
                  context.setAttribute("id", nid = jQuery3.expando);
                }
              }
              groups = tokenize(selector);
              i2 = groups.length;
              while (i2--) {
                groups[i2] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i2]);
              }
              newSelector = groups.join(",");
            }
            try {
              push.apply(
                results,
                newContext.querySelectorAll(newSelector)
              );
              return results;
            } catch (qsaError) {
              nonnativeSelectorCache(selector, true);
            } finally {
              if (nid === jQuery3.expando) {
                context.removeAttribute("id");
              }
            }
          }
        }
      }
      return select(selector.replace(rtrimCSS, "$1"), context, results, seed);
    }
    function markFunction(fn) {
      fn[jQuery3.expando] = true;
      return fn;
    }
    function createInputPseudo(type) {
      return function(elem) {
        return nodeName(elem, "input") && elem.type === type;
      };
    }
    function createButtonPseudo(type) {
      return function(elem) {
        return (nodeName(elem, "input") || nodeName(elem, "button")) && elem.type === type;
      };
    }
    function createDisabledPseudo(disabled) {
      return function(elem) {
        if ("form" in elem) {
          if (elem.parentNode && elem.disabled === false) {
            if ("label" in elem) {
              if ("label" in elem.parentNode) {
                return elem.parentNode.disabled === disabled;
              } else {
                return elem.disabled === disabled;
              }
            }
            return elem.isDisabled === disabled || // Where there is no isDisabled, check manually
            elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
          }
          return elem.disabled === disabled;
        } else if ("label" in elem) {
          return elem.disabled === disabled;
        }
        return false;
      };
    }
    function createPositionalPseudo(fn) {
      return markFunction(function(argument) {
        argument = +argument;
        return markFunction(function(seed, matches2) {
          var j, matchIndexes = fn([], seed.length, argument), i2 = matchIndexes.length;
          while (i2--) {
            if (seed[j = matchIndexes[i2]]) {
              seed[j] = !(matches2[j] = seed[j]);
            }
          }
        });
      });
    }
    function setDocument(node) {
      var subWindow, doc = node ? node.ownerDocument || node : document$1;
      if (doc == document2 || doc.nodeType !== 9) {
        return;
      }
      document2 = doc;
      documentElement = document2.documentElement;
      documentIsHTML = !jQuery3.isXMLDoc(document2);
      if (isIE && document$1 != document2 && (subWindow = document2.defaultView) && subWindow.top !== subWindow) {
        subWindow.addEventListener("unload", unloadHandler);
      }
    }
    find.matches = function(expr, elements) {
      return find(expr, null, null, elements);
    };
    find.matchesSelector = function(elem, expr) {
      setDocument(elem);
      if (documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          return matches.call(elem, expr);
        } catch (e) {
          nonnativeSelectorCache(expr, true);
        }
      }
      return find(expr, document2, null, [elem]).length > 0;
    };
    jQuery3.expr = {
      // Can be adjusted by the user
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      find: {
        ID: function(id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var elem = context.getElementById(id);
            return elem ? [elem] : [];
          }
        },
        TAG: function(tag, context) {
          if (typeof context.getElementsByTagName !== "undefined") {
            return context.getElementsByTagName(tag);
          } else {
            return context.querySelectorAll(tag);
          }
        },
        CLASS: function(className, context) {
          if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
            return context.getElementsByClassName(className);
          }
        }
      },
      relative: {
        ">": { dir: "parentNode", first: true },
        " ": { dir: "parentNode" },
        "+": { dir: "previousSibling", first: true },
        "~": { dir: "previousSibling" }
      },
      preFilter,
      filter: {
        ID: function(id) {
          var attrId = unescapeSelector(id);
          return function(elem) {
            return elem.getAttribute("id") === attrId;
          };
        },
        TAG: function(nodeNameSelector) {
          var expectedNodeName = unescapeSelector(nodeNameSelector).toLowerCase();
          return nodeNameSelector === "*" ? function() {
            return true;
          } : function(elem) {
            return nodeName(elem, expectedNodeName);
          };
        },
        CLASS: function(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
            return pattern.test(
              typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || ""
            );
          });
        },
        ATTR: function(name, operator, check) {
          return function(elem) {
            var result = jQuery3.attr(elem, name);
            if (result == null) {
              return operator === "!=";
            }
            if (!operator) {
              return true;
            }
            result += "";
            if (operator === "=") {
              return result === check;
            }
            if (operator === "!=") {
              return result !== check;
            }
            if (operator === "^=") {
              return check && result.indexOf(check) === 0;
            }
            if (operator === "*=") {
              return check && result.indexOf(check) > -1;
            }
            if (operator === "$=") {
              return check && result.slice(-check.length) === check;
            }
            if (operator === "~=") {
              return (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1;
            }
            if (operator === "|=") {
              return result === check || result.slice(0, check.length + 1) === check + "-";
            }
            return false;
          };
        },
        CHILD: function(type, what, _argument, first, last) {
          var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
          return first === 1 && last === 0 ? (
            // Shortcut for :nth-*(n)
            function(elem) {
              return !!elem.parentNode;
            }
          ) : function(elem, _context, xml) {
            var cache, outerCache, node, nodeIndex, start, dir2 = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
            if (parent) {
              if (simple) {
                while (dir2) {
                  node = elem;
                  while (node = node[dir2]) {
                    if (ofType ? nodeName(node, name) : node.nodeType === 1) {
                      return false;
                    }
                  }
                  start = dir2 = type === "only" && !start && "nextSibling";
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              if (forward && useCache) {
                outerCache = parent[jQuery3.expando] || (parent[jQuery3.expando] = {});
                cache = outerCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while (node = ++nodeIndex && node && node[dir2] || // Fallback to seeking `elem` from the start
                (diff = nodeIndex = 0) || start.pop()) {
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    outerCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                if (useCache) {
                  outerCache = elem[jQuery3.expando] || (elem[jQuery3.expando] = {});
                  cache = outerCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                }
                if (diff === false) {
                  while (node = ++nodeIndex && node && node[dir2] || (diff = nodeIndex = 0) || start.pop()) {
                    if ((ofType ? nodeName(node, name) : node.nodeType === 1) && ++diff) {
                      if (useCache) {
                        outerCache = node[jQuery3.expando] || (node[jQuery3.expando] = {});
                        outerCache[type] = [dirruns, diff];
                      }
                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              }
              diff -= last;
              return diff === first || diff % first === 0 && diff / first >= 0;
            }
          };
        },
        PSEUDO: function(pseudo, argument) {
          var fn = jQuery3.expr.pseudos[pseudo] || jQuery3.expr.setFilters[pseudo.toLowerCase()] || selectorError("unsupported pseudo: " + pseudo);
          if (fn[jQuery3.expando]) {
            return fn(argument);
          }
          return fn;
        }
      },
      pseudos: {
        // Potentially complex pseudos
        not: markFunction(function(selector) {
          var input = [], results = [], matcher = compile(selector.replace(rtrimCSS, "$1"));
          return matcher[jQuery3.expando] ? markFunction(function(seed, matches2, _context, xml) {
            var elem, unmatched = matcher(seed, null, xml, []), i2 = seed.length;
            while (i2--) {
              if (elem = unmatched[i2]) {
                seed[i2] = !(matches2[i2] = elem);
              }
            }
          }) : function(elem, _context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            input[0] = null;
            return !results.pop();
          };
        }),
        has: markFunction(function(selector) {
          return function(elem) {
            return find(selector, elem).length > 0;
          };
        }),
        contains: markFunction(function(text) {
          text = unescapeSelector(text);
          return function(elem) {
            return (elem.textContent || jQuery3.text(elem)).indexOf(text) > -1;
          };
        }),
        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // https://www.w3.org/TR/selectors/#lang-pseudo
        lang: markFunction(function(lang) {
          if (!ridentifier.test(lang || "")) {
            selectorError("unsupported lang: " + lang);
          }
          lang = unescapeSelector(lang).toLowerCase();
          return function(elem) {
            var elemLang;
            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        // Miscellaneous
        target: function(elem) {
          var hash = window2.location && window2.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        root: function(elem) {
          return elem === documentElement;
        },
        focus: function(elem) {
          return elem === document2.activeElement && document2.hasFocus() && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        // Boolean properties
        enabled: createDisabledPseudo(false),
        disabled: createDisabledPseudo(true),
        checked: function(elem) {
          return nodeName(elem, "input") && !!elem.checked || nodeName(elem, "option") && !!elem.selected;
        },
        selected: function(elem) {
          if (isIE && elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        // Contents
        empty: function(elem) {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        parent: function(elem) {
          return !jQuery3.expr.pseudos.empty(elem);
        },
        // Element/input types
        header: function(elem) {
          return rheader.test(elem.nodeName);
        },
        input: function(elem) {
          return rinputs.test(elem.nodeName);
        },
        button: function(elem) {
          return nodeName(elem, "input") && elem.type === "button" || nodeName(elem, "button");
        },
        text: function(elem) {
          return nodeName(elem, "input") && elem.type === "text";
        },
        // Position-in-collection
        first: createPositionalPseudo(function() {
          return [0];
        }),
        last: createPositionalPseudo(function(_matchIndexes, length) {
          return [length - 1];
        }),
        eq: createPositionalPseudo(function(_matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        even: createPositionalPseudo(function(matchIndexes, length) {
          var i2 = 0;
          for (; i2 < length; i2 += 2) {
            matchIndexes.push(i2);
          }
          return matchIndexes;
        }),
        odd: createPositionalPseudo(function(matchIndexes, length) {
          var i2 = 1;
          for (; i2 < length; i2 += 2) {
            matchIndexes.push(i2);
          }
          return matchIndexes;
        }),
        lt: createPositionalPseudo(function(matchIndexes, length, argument) {
          var i2;
          if (argument < 0) {
            i2 = argument + length;
          } else if (argument > length) {
            i2 = length;
          } else {
            i2 = argument;
          }
          for (; --i2 >= 0; ) {
            matchIndexes.push(i2);
          }
          return matchIndexes;
        }),
        gt: createPositionalPseudo(function(matchIndexes, length, argument) {
          var i2 = argument < 0 ? argument + length : argument;
          for (; ++i2 < length; ) {
            matchIndexes.push(i2);
          }
          return matchIndexes;
        })
      }
    };
    jQuery3.expr.pseudos.nth = jQuery3.expr.pseudos.eq;
    for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
      jQuery3.expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in { submit: true, reset: true }) {
      jQuery3.expr.pseudos[i] = createButtonPseudo(i);
    }
    function setFilters() {
    }
    setFilters.prototype = jQuery3.expr.pseudos;
    jQuery3.expr.setFilters = new setFilters();
    function addCombinator(matcher, combinator, base) {
      var dir2 = combinator.dir, skip = combinator.next, key = skip || dir2, checkNonElements = base && key === "parentNode", doneName = done++;
      return combinator.first ? (
        // Check against closest ancestor/preceding element
        function(elem, context, xml) {
          while (elem = elem[dir2]) {
            if (elem.nodeType === 1 || checkNonElements) {
              return matcher(elem, context, xml);
            }
          }
          return false;
        }
      ) : (
        // Check against all ancestor/preceding elements
        function(elem, context, xml) {
          var oldCache, outerCache, newCache = [dirruns, doneName];
          if (xml) {
            while (elem = elem[dir2]) {
              if (elem.nodeType === 1 || checkNonElements) {
                if (matcher(elem, context, xml)) {
                  return true;
                }
              }
            }
          } else {
            while (elem = elem[dir2]) {
              if (elem.nodeType === 1 || checkNonElements) {
                outerCache = elem[jQuery3.expando] || (elem[jQuery3.expando] = {});
                if (skip && nodeName(elem, skip)) {
                  elem = elem[dir2] || elem;
                } else if ((oldCache = outerCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                  return newCache[2] = oldCache[2];
                } else {
                  outerCache[key] = newCache;
                  if (newCache[2] = matcher(elem, context, xml)) {
                    return true;
                  }
                }
              }
            }
          }
          return false;
        }
      );
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function(elem, context, xml) {
        var i2 = matchers.length;
        while (i2--) {
          if (!matchers[i2](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function multipleContexts(selector, contexts, results) {
      var i2 = 0, len = contexts.length;
      for (; i2 < len; i2++) {
        find(selector, contexts[i2], results);
      }
      return results;
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem, newUnmatched = [], i2 = 0, len = unmatched.length, mapped = map != null;
      for (; i2 < len; i2++) {
        if (elem = unmatched[i2]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i2);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter2, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[jQuery3.expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[jQuery3.expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function(seed, results, context, xml) {
        var temp, i2, elem, matcherOut, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(
          selector || "*",
          context.nodeType ? [context] : context,
          []
        ), matcherIn = preFilter2 && (seed || !selector) ? condense(elems, preMap, preFilter2, context, xml) : elems;
        if (matcher) {
          matcherOut = postFinder || (seed ? preFilter2 : preexisting || postFilter) ? (
            // ...intermediate processing is necessary
            []
          ) : (
            // ...otherwise use results directly
            results
          );
          matcher(matcherIn, matcherOut, context, xml);
        } else {
          matcherOut = matcherIn;
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i2 = temp.length;
          while (i2--) {
            if (elem = temp[i2]) {
              matcherOut[postMap[i2]] = !(matcherIn[postMap[i2]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter2) {
            if (postFinder) {
              temp = [];
              i2 = matcherOut.length;
              while (i2--) {
                if (elem = matcherOut[i2]) {
                  temp.push(matcherIn[i2] = elem);
                }
              }
              postFinder(null, matcherOut = [], temp, xml);
            }
            i2 = matcherOut.length;
            while (i2--) {
              if ((elem = matcherOut[i2]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i2]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }
        } else {
          matcherOut = condense(
            matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut
          );
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext, matcher, j, len = tokens.length, leadingRelative = jQuery3.expr.relative[tokens[0].type], implicitRelative = leadingRelative || jQuery3.expr.relative[" "], i2 = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
        return elem === checkContext;
      }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
        return indexOf.call(checkContext, elem) > -1;
      }, implicitRelative, true), matchers = [function(elem, context, xml) {
        var ret = !leadingRelative && (xml || context != outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
        checkContext = null;
        return ret;
      }];
      for (; i2 < len; i2++) {
        if (matcher = jQuery3.expr.relative[tokens[i2].type]) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = jQuery3.expr.filter[tokens[i2].type].apply(null, tokens[i2].matches);
          if (matcher[jQuery3.expando]) {
            j = ++i2;
            for (; j < len; j++) {
              if (jQuery3.expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(
              i2 > 1 && elementMatcher(matchers),
              i2 > 1 && toSelector(
                // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                tokens.slice(0, i2 - 1).concat({ value: tokens[i2 - 2].type === " " ? "*" : "" })
              ).replace(rtrimCSS, "$1"),
              matcher,
              i2 < j && matcherFromTokens(tokens.slice(i2, j)),
              j < len && matcherFromTokens(tokens = tokens.slice(j)),
              j < len && toSelector(tokens)
            );
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
        var elem, j, matcher, matchedCount = 0, i2 = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && jQuery3.expr.find.TAG("*", outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1;
        if (outermost) {
          outermostContext = context == document2 || context || outermost;
        }
        for (; (elem = elems[i2]) != null; i2++) {
          if (byElement && elem) {
            j = 0;
            if (!context && elem.ownerDocument != document2) {
              setDocument(elem);
              xml = !documentIsHTML;
            }
            while (matcher = elementMatchers[j++]) {
              if (matcher(elem, context || document2, xml)) {
                push.call(results, elem);
                break;
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique;
            }
          }
          if (bySet) {
            if (elem = !matcher && elem) {
              matchedCount--;
            }
            if (seed) {
              unmatched.push(elem);
            }
          }
        }
        matchedCount += i2;
        if (bySet && i2 !== matchedCount) {
          j = 0;
          while (matcher = setMatchers[j++]) {
            matcher(unmatched, setMatched, context, xml);
          }
          if (seed) {
            if (matchedCount > 0) {
              while (i2--) {
                if (!(unmatched[i2] || setMatched[i2])) {
                  setMatched[i2] = pop.call(results);
                }
              }
            }
            setMatched = condense(setMatched);
          }
          push.apply(results, setMatched);
          if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
            jQuery3.uniqueSort(results);
          }
        }
        if (outermost) {
          dirruns = dirrunsUnique;
          outermostContext = contextBackup;
        }
        return unmatched;
      };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    function compile(selector, match) {
      var i2, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
      if (!cached) {
        if (!match) {
          match = tokenize(selector);
        }
        i2 = match.length;
        while (i2--) {
          cached = matcherFromTokens(match[i2]);
          if (cached[jQuery3.expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(
          selector,
          matcherFromGroupMatchers(elementMatchers, setMatchers)
        );
        cached.selector = selector;
      }
      return cached;
    }
    function select(selector, context, results, seed) {
      var i2, tokens, token, type, find2, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
      results = results || [];
      if (match.length === 1) {
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && jQuery3.expr.relative[tokens[1].type]) {
          context = (jQuery3.expr.find.ID(
            unescapeSelector(token.matches[0]),
            context
          ) || [])[0];
          if (!context) {
            return results;
          } else if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        i2 = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
        while (i2--) {
          token = tokens[i2];
          if (jQuery3.expr.relative[type = token.type]) {
            break;
          }
          if (find2 = jQuery3.expr.find[type]) {
            if (seed = find2(
              unescapeSelector(token.matches[0]),
              rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
            )) {
              tokens.splice(i2, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results;
              }
              break;
            }
          }
        }
      }
      (compiled || compile(selector, match))(
        seed,
        context,
        !documentIsHTML,
        results,
        !context || rsibling.test(selector) && testContext(context.parentNode) || context
      );
      return results;
    }
    setDocument();
    jQuery3.find = find;
    find.compile = compile;
    find.select = select;
    find.setDocument = setDocument;
    find.tokenize = tokenize;
    function dir(elem, dir2, until) {
      var matched = [], truncate = until !== void 0;
      while ((elem = elem[dir2]) && elem.nodeType !== 9) {
        if (elem.nodeType === 1) {
          if (truncate && jQuery3(elem).is(until)) {
            break;
          }
          matched.push(elem);
        }
      }
      return matched;
    }
    function siblings(n, elem) {
      var matched = [];
      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== elem) {
          matched.push(n);
        }
      }
      return matched;
    }
    var rneedsContext = jQuery3.expr.match.needsContext;
    var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function isObviousHtml(input) {
      return input[0] === "<" && input[input.length - 1] === ">" && input.length >= 3;
    }
    function winnow(elements, qualifier, not) {
      if (typeof qualifier === "function") {
        return jQuery3.grep(elements, function(elem, i2) {
          return !!qualifier.call(elem, i2, elem) !== not;
        });
      }
      if (qualifier.nodeType) {
        return jQuery3.grep(elements, function(elem) {
          return elem === qualifier !== not;
        });
      }
      if (typeof qualifier !== "string") {
        return jQuery3.grep(elements, function(elem) {
          return indexOf.call(qualifier, elem) > -1 !== not;
        });
      }
      return jQuery3.filter(qualifier, elements, not);
    }
    jQuery3.filter = function(expr, elems, not) {
      var elem = elems[0];
      if (not) {
        expr = ":not(" + expr + ")";
      }
      if (elems.length === 1 && elem.nodeType === 1) {
        return jQuery3.find.matchesSelector(elem, expr) ? [elem] : [];
      }
      return jQuery3.find.matches(expr, jQuery3.grep(elems, function(elem2) {
        return elem2.nodeType === 1;
      }));
    };
    jQuery3.fn.extend({
      find: function(selector) {
        var i2, ret, len = this.length, self = this;
        if (typeof selector !== "string") {
          return this.pushStack(jQuery3(selector).filter(function() {
            for (i2 = 0; i2 < len; i2++) {
              if (jQuery3.contains(self[i2], this)) {
                return true;
              }
            }
          }));
        }
        ret = this.pushStack([]);
        for (i2 = 0; i2 < len; i2++) {
          jQuery3.find(selector, self[i2], ret);
        }
        return len > 1 ? jQuery3.uniqueSort(ret) : ret;
      },
      filter: function(selector) {
        return this.pushStack(winnow(this, selector || [], false));
      },
      not: function(selector) {
        return this.pushStack(winnow(this, selector || [], true));
      },
      is: function(selector) {
        return !!winnow(
          this,
          // If this is a positional/relative selector, check membership in the returned set
          // so $("p:first").is("p:last") won't return true for a doc with two "p".
          typeof selector === "string" && rneedsContext.test(selector) ? jQuery3(selector) : selector || [],
          false
        ).length;
      }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init = jQuery3.fn.init = function(selector, context) {
      var match, elem;
      if (!selector) {
        return this;
      }
      if (selector.nodeType) {
        this[0] = selector;
        this.length = 1;
        return this;
      } else if (typeof selector === "function") {
        return rootjQuery.ready !== void 0 ? rootjQuery.ready(selector) : (
          // Execute immediately if ready is not present
          selector(jQuery3)
        );
      } else {
        match = selector + "";
        if (isObviousHtml(match)) {
          match = [null, selector, null];
        } else if (typeof selector === "string") {
          match = rquickExpr.exec(selector);
        } else {
          return jQuery3.makeArray(selector, this);
        }
        if (match && (match[1] || !context)) {
          if (match[1]) {
            context = context instanceof jQuery3 ? context[0] : context;
            jQuery3.merge(this, jQuery3.parseHTML(
              match[1],
              context && context.nodeType ? context.ownerDocument || context : document$1,
              true
            ));
            if (rsingleTag.test(match[1]) && jQuery3.isPlainObject(context)) {
              for (match in context) {
                if (typeof this[match] === "function") {
                  this[match](context[match]);
                } else {
                  this.attr(match, context[match]);
                }
              }
            }
            return this;
          } else {
            elem = document$1.getElementById(match[2]);
            if (elem) {
              this[0] = elem;
              this.length = 1;
            }
            return this;
          }
        } else if (!context || context.jquery) {
          return (context || rootjQuery).find(selector);
        } else {
          return this.constructor(context).find(selector);
        }
      }
    };
    init.prototype = jQuery3.fn;
    rootjQuery = jQuery3(document$1);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
      children: true,
      contents: true,
      next: true,
      prev: true
    };
    jQuery3.fn.extend({
      has: function(target) {
        var targets = jQuery3(target, this), l = targets.length;
        return this.filter(function() {
          var i2 = 0;
          for (; i2 < l; i2++) {
            if (jQuery3.contains(this, targets[i2])) {
              return true;
            }
          }
        });
      },
      closest: function(selectors, context) {
        var cur, i2 = 0, l = this.length, matched = [], targets = typeof selectors !== "string" && jQuery3(selectors);
        if (!rneedsContext.test(selectors)) {
          for (; i2 < l; i2++) {
            for (cur = this[i2]; cur && cur !== context; cur = cur.parentNode) {
              if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : (
                // Don't pass non-elements to jQuery#find
                cur.nodeType === 1 && jQuery3.find.matchesSelector(cur, selectors)
              ))) {
                matched.push(cur);
                break;
              }
            }
          }
        }
        return this.pushStack(matched.length > 1 ? jQuery3.uniqueSort(matched) : matched);
      },
      // Determine the position of an element within the set
      index: function(elem) {
        if (!elem) {
          return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        }
        if (typeof elem === "string") {
          return indexOf.call(jQuery3(elem), this[0]);
        }
        return indexOf.call(
          this,
          // If it receives a jQuery object, the first element is used
          elem.jquery ? elem[0] : elem
        );
      },
      add: function(selector, context) {
        return this.pushStack(
          jQuery3.uniqueSort(
            jQuery3.merge(this.get(), jQuery3(selector, context))
          )
        );
      },
      addBack: function(selector) {
        return this.add(
          selector == null ? this.prevObject : this.prevObject.filter(selector)
        );
      }
    });
    function sibling(cur, dir2) {
      while ((cur = cur[dir2]) && cur.nodeType !== 1) {
      }
      return cur;
    }
    jQuery3.each({
      parent: function(elem) {
        var parent = elem.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
      },
      parents: function(elem) {
        return dir(elem, "parentNode");
      },
      parentsUntil: function(elem, _i, until) {
        return dir(elem, "parentNode", until);
      },
      next: function(elem) {
        return sibling(elem, "nextSibling");
      },
      prev: function(elem) {
        return sibling(elem, "previousSibling");
      },
      nextAll: function(elem) {
        return dir(elem, "nextSibling");
      },
      prevAll: function(elem) {
        return dir(elem, "previousSibling");
      },
      nextUntil: function(elem, _i, until) {
        return dir(elem, "nextSibling", until);
      },
      prevUntil: function(elem, _i, until) {
        return dir(elem, "previousSibling", until);
      },
      siblings: function(elem) {
        return siblings((elem.parentNode || {}).firstChild, elem);
      },
      children: function(elem) {
        return siblings(elem.firstChild);
      },
      contents: function(elem) {
        if (elem.contentDocument != null && // Support: IE 11+
        // <object> elements with no `data` attribute has an object
        // `contentDocument` with a `null` prototype.
        getProto(elem.contentDocument)) {
          return elem.contentDocument;
        }
        if (nodeName(elem, "template")) {
          elem = elem.content || elem;
        }
        return jQuery3.merge([], elem.childNodes);
      }
    }, function(name, fn) {
      jQuery3.fn[name] = function(until, selector) {
        var matched = jQuery3.map(this, fn, until);
        if (name.slice(-5) !== "Until") {
          selector = until;
        }
        if (selector && typeof selector === "string") {
          matched = jQuery3.filter(selector, matched);
        }
        if (this.length > 1) {
          if (!guaranteedUnique[name]) {
            jQuery3.uniqueSort(matched);
          }
          if (rparentsprev.test(name)) {
            matched.reverse();
          }
        }
        return this.pushStack(matched);
      };
    });
    function createOptions(options) {
      var object = {};
      jQuery3.each(options.match(rnothtmlwhite) || [], function(_, flag) {
        object[flag] = true;
      });
      return object;
    }
    jQuery3.Callbacks = function(options) {
      options = typeof options === "string" ? createOptions(options) : jQuery3.extend({}, options);
      var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function() {
        locked = locked || options.once;
        fired = firing = true;
        for (; queue.length; firingIndex = -1) {
          memory = queue.shift();
          while (++firingIndex < list.length) {
            if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
              firingIndex = list.length;
              memory = false;
            }
          }
        }
        if (!options.memory) {
          memory = false;
        }
        firing = false;
        if (locked) {
          if (memory) {
            list = [];
          } else {
            list = "";
          }
        }
      }, self = {
        // Add a callback or a collection of callbacks to the list
        add: function() {
          if (list) {
            if (memory && !firing) {
              firingIndex = list.length - 1;
              queue.push(memory);
            }
            (function add(args) {
              jQuery3.each(args, function(_, arg) {
                if (typeof arg === "function") {
                  if (!options.unique || !self.has(arg)) {
                    list.push(arg);
                  }
                } else if (arg && arg.length && toType(arg) !== "string") {
                  add(arg);
                }
              });
            })(arguments);
            if (memory && !firing) {
              fire();
            }
          }
          return this;
        },
        // Remove a callback from the list
        remove: function() {
          jQuery3.each(arguments, function(_, arg) {
            var index;
            while ((index = jQuery3.inArray(arg, list, index)) > -1) {
              list.splice(index, 1);
              if (index <= firingIndex) {
                firingIndex--;
              }
            }
          });
          return this;
        },
        // Check if a given callback is in the list.
        // If no argument is given, return whether or not list has callbacks attached.
        has: function(fn) {
          return fn ? jQuery3.inArray(fn, list) > -1 : list.length > 0;
        },
        // Remove all callbacks from the list
        empty: function() {
          if (list) {
            list = [];
          }
          return this;
        },
        // Disable .fire and .add
        // Abort any current/pending executions
        // Clear all callbacks and values
        disable: function() {
          locked = queue = [];
          list = memory = "";
          return this;
        },
        disabled: function() {
          return !list;
        },
        // Disable .fire
        // Also disable .add unless we have memory (since it would have no effect)
        // Abort any pending executions
        lock: function() {
          locked = queue = [];
          if (!memory && !firing) {
            list = memory = "";
          }
          return this;
        },
        locked: function() {
          return !!locked;
        },
        // Call all callbacks with the given context and arguments
        fireWith: function(context, args) {
          if (!locked) {
            args = args || [];
            args = [context, args.slice ? args.slice() : args];
            queue.push(args);
            if (!firing) {
              fire();
            }
          }
          return this;
        },
        // Call all the callbacks with the given arguments
        fire: function() {
          self.fireWith(this, arguments);
          return this;
        },
        // To know if the callbacks have already been called at least once
        fired: function() {
          return !!fired;
        }
      };
      return self;
    };
    function Identity(v) {
      return v;
    }
    function Thrower(ex) {
      throw ex;
    }
    function adoptValue(value, resolve, reject, noValue) {
      var method;
      try {
        if (value && typeof (method = value.promise) === "function") {
          method.call(value).done(resolve).fail(reject);
        } else if (value && typeof (method = value.then) === "function") {
          method.call(value, resolve, reject);
        } else {
          resolve.apply(void 0, [value].slice(noValue));
        }
      } catch (value2) {
        reject(value2);
      }
    }
    jQuery3.extend({
      Deferred: function(func) {
        var tuples = [
          // action, add listener, callbacks,
          // ... .then handlers, argument index, [final state]
          [
            "notify",
            "progress",
            jQuery3.Callbacks("memory"),
            jQuery3.Callbacks("memory"),
            2
          ],
          [
            "resolve",
            "done",
            jQuery3.Callbacks("once memory"),
            jQuery3.Callbacks("once memory"),
            0,
            "resolved"
          ],
          [
            "reject",
            "fail",
            jQuery3.Callbacks("once memory"),
            jQuery3.Callbacks("once memory"),
            1,
            "rejected"
          ]
        ], state = "pending", promise = {
          state: function() {
            return state;
          },
          always: function() {
            deferred.done(arguments).fail(arguments);
            return this;
          },
          catch: function(fn) {
            return promise.then(null, fn);
          },
          // Keep pipe for back-compat
          pipe: function() {
            var fns = arguments;
            return jQuery3.Deferred(function(newDefer) {
              jQuery3.each(tuples, function(_i, tuple) {
                var fn = typeof fns[tuple[4]] === "function" && fns[tuple[4]];
                deferred[tuple[1]](function() {
                  var returned = fn && fn.apply(this, arguments);
                  if (returned && typeof returned.promise === "function") {
                    returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                  } else {
                    newDefer[tuple[0] + "With"](
                      this,
                      fn ? [returned] : arguments
                    );
                  }
                });
              });
              fns = null;
            }).promise();
          },
          then: function(onFulfilled, onRejected, onProgress) {
            var maxDepth = 0;
            function resolve(depth, deferred2, handler, special) {
              return function() {
                var that = this, args = arguments, mightThrow = function() {
                  var returned, then;
                  if (depth < maxDepth) {
                    return;
                  }
                  returned = handler.apply(that, args);
                  if (returned === deferred2.promise()) {
                    throw new TypeError("Thenable self-resolution");
                  }
                  then = returned && // Support: Promises/A+ section 2.3.4
                  // https://promisesaplus.com/#point-64
                  // Only check objects and functions for thenability
                  (typeof returned === "object" || typeof returned === "function") && returned.then;
                  if (typeof then === "function") {
                    if (special) {
                      then.call(
                        returned,
                        resolve(maxDepth, deferred2, Identity, special),
                        resolve(maxDepth, deferred2, Thrower, special)
                      );
                    } else {
                      maxDepth++;
                      then.call(
                        returned,
                        resolve(maxDepth, deferred2, Identity, special),
                        resolve(maxDepth, deferred2, Thrower, special),
                        resolve(
                          maxDepth,
                          deferred2,
                          Identity,
                          deferred2.notifyWith
                        )
                      );
                    }
                  } else {
                    if (handler !== Identity) {
                      that = void 0;
                      args = [returned];
                    }
                    (special || deferred2.resolveWith)(that, args);
                  }
                }, process = special ? mightThrow : function() {
                  try {
                    mightThrow();
                  } catch (e) {
                    if (jQuery3.Deferred.exceptionHook) {
                      jQuery3.Deferred.exceptionHook(
                        e,
                        process.error
                      );
                    }
                    if (depth + 1 >= maxDepth) {
                      if (handler !== Thrower) {
                        that = void 0;
                        args = [e];
                      }
                      deferred2.rejectWith(that, args);
                    }
                  }
                };
                if (depth) {
                  process();
                } else {
                  if (jQuery3.Deferred.getErrorHook) {
                    process.error = jQuery3.Deferred.getErrorHook();
                  }
                  window2.setTimeout(process);
                }
              };
            }
            return jQuery3.Deferred(function(newDefer) {
              tuples[0][3].add(
                resolve(
                  0,
                  newDefer,
                  typeof onProgress === "function" ? onProgress : Identity,
                  newDefer.notifyWith
                )
              );
              tuples[1][3].add(
                resolve(
                  0,
                  newDefer,
                  typeof onFulfilled === "function" ? onFulfilled : Identity
                )
              );
              tuples[2][3].add(
                resolve(
                  0,
                  newDefer,
                  typeof onRejected === "function" ? onRejected : Thrower
                )
              );
            }).promise();
          },
          // Get a promise for this deferred
          // If obj is provided, the promise aspect is added to the object
          promise: function(obj) {
            return obj != null ? jQuery3.extend(obj, promise) : promise;
          }
        }, deferred = {};
        jQuery3.each(tuples, function(i2, tuple) {
          var list = tuple[2], stateString = tuple[5];
          promise[tuple[1]] = list.add;
          if (stateString) {
            list.add(
              function() {
                state = stateString;
              },
              // rejected_callbacks.disable
              // fulfilled_callbacks.disable
              tuples[3 - i2][2].disable,
              // rejected_handlers.disable
              // fulfilled_handlers.disable
              tuples[3 - i2][3].disable,
              // progress_callbacks.lock
              tuples[0][2].lock,
              // progress_handlers.lock
              tuples[0][3].lock
            );
          }
          list.add(tuple[3].fire);
          deferred[tuple[0]] = function() {
            deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments);
            return this;
          };
          deferred[tuple[0] + "With"] = list.fireWith;
        });
        promise.promise(deferred);
        if (func) {
          func.call(deferred, deferred);
        }
        return deferred;
      },
      // Deferred helper
      when: function(singleValue) {
        var remaining = arguments.length, i2 = remaining, resolveContexts = Array(i2), resolveValues = slice.call(arguments), primary = jQuery3.Deferred(), updateFunc = function(i3) {
          return function(value) {
            resolveContexts[i3] = this;
            resolveValues[i3] = arguments.length > 1 ? slice.call(arguments) : value;
            if (!--remaining) {
              primary.resolveWith(resolveContexts, resolveValues);
            }
          };
        };
        if (remaining <= 1) {
          adoptValue(
            singleValue,
            primary.done(updateFunc(i2)).resolve,
            primary.reject,
            !remaining
          );
          if (primary.state() === "pending" || typeof (resolveValues[i2] && resolveValues[i2].then) === "function") {
            return primary.then();
          }
        }
        while (i2--) {
          adoptValue(resolveValues[i2], updateFunc(i2), primary.reject);
        }
        return primary.promise();
      }
    });
    var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    jQuery3.Deferred.exceptionHook = function(error, asyncError) {
      if (error && rerrorNames.test(error.name)) {
        window2.console.warn(
          "jQuery.Deferred exception",
          error,
          asyncError
        );
      }
    };
    jQuery3.readyException = function(error) {
      window2.setTimeout(function() {
        throw error;
      });
    };
    var readyList = jQuery3.Deferred();
    jQuery3.fn.ready = function(fn) {
      readyList.then(fn).catch(function(error) {
        jQuery3.readyException(error);
      });
      return this;
    };
    jQuery3.extend({
      // Is the DOM ready to be used? Set to true once it occurs.
      isReady: false,
      // A counter to track how many items to wait for before
      // the ready event fires. See trac-6781
      readyWait: 1,
      // Handle when the DOM is ready
      ready: function(wait) {
        if (wait === true ? --jQuery3.readyWait : jQuery3.isReady) {
          return;
        }
        jQuery3.isReady = true;
        if (wait !== true && --jQuery3.readyWait > 0) {
          return;
        }
        readyList.resolveWith(document$1, [jQuery3]);
      }
    });
    jQuery3.ready.then = readyList.then;
    function completed() {
      document$1.removeEventListener("DOMContentLoaded", completed);
      window2.removeEventListener("load", completed);
      jQuery3.ready();
    }
    if (document$1.readyState !== "loading") {
      window2.setTimeout(jQuery3.ready);
    } else {
      document$1.addEventListener("DOMContentLoaded", completed);
      window2.addEventListener("load", completed);
    }
    var rdashAlpha = /-([a-z])/g;
    function fcamelCase(_all, letter) {
      return letter.toUpperCase();
    }
    function camelCase(string) {
      return string.replace(rdashAlpha, fcamelCase);
    }
    function acceptData(owner) {
      return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
    }
    function Data() {
      this.expando = jQuery3.expando + Data.uid++;
    }
    Data.uid = 1;
    Data.prototype = {
      cache: function(owner) {
        var value = owner[this.expando];
        if (!value) {
          value = /* @__PURE__ */ Object.create(null);
          if (acceptData(owner)) {
            if (owner.nodeType) {
              owner[this.expando] = value;
            } else {
              Object.defineProperty(owner, this.expando, {
                value,
                configurable: true
              });
            }
          }
        }
        return value;
      },
      set: function(owner, data, value) {
        var prop, cache = this.cache(owner);
        if (typeof data === "string") {
          cache[camelCase(data)] = value;
        } else {
          for (prop in data) {
            cache[camelCase(prop)] = data[prop];
          }
        }
        return value;
      },
      get: function(owner, key) {
        return key === void 0 ? this.cache(owner) : (
          // Always use camelCase key (gh-2257)
          owner[this.expando] && owner[this.expando][camelCase(key)]
        );
      },
      access: function(owner, key, value) {
        if (key === void 0 || key && typeof key === "string" && value === void 0) {
          return this.get(owner, key);
        }
        this.set(owner, key, value);
        return value !== void 0 ? value : key;
      },
      remove: function(owner, key) {
        var i2, cache = owner[this.expando];
        if (cache === void 0) {
          return;
        }
        if (key !== void 0) {
          if (Array.isArray(key)) {
            key = key.map(camelCase);
          } else {
            key = camelCase(key);
            key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
          }
          i2 = key.length;
          while (i2--) {
            delete cache[key[i2]];
          }
        }
        if (key === void 0 || jQuery3.isEmptyObject(cache)) {
          if (owner.nodeType) {
            owner[this.expando] = void 0;
          } else {
            delete owner[this.expando];
          }
        }
      },
      hasData: function(owner) {
        var cache = owner[this.expando];
        return cache !== void 0 && !jQuery3.isEmptyObject(cache);
      }
    };
    var dataPriv = new Data();
    var dataUser = new Data();
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
    function getData(data) {
      if (data === "true") {
        return true;
      }
      if (data === "false") {
        return false;
      }
      if (data === "null") {
        return null;
      }
      if (data === +data + "") {
        return +data;
      }
      if (rbrace.test(data)) {
        return JSON.parse(data);
      }
      return data;
    }
    function dataAttr(elem, key, data) {
      var name;
      if (data === void 0 && elem.nodeType === 1) {
        name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
        data = elem.getAttribute(name);
        if (typeof data === "string") {
          try {
            data = getData(data);
          } catch (e) {
          }
          dataUser.set(elem, key, data);
        } else {
          data = void 0;
        }
      }
      return data;
    }
    jQuery3.extend({
      hasData: function(elem) {
        return dataUser.hasData(elem) || dataPriv.hasData(elem);
      },
      data: function(elem, name, data) {
        return dataUser.access(elem, name, data);
      },
      removeData: function(elem, name) {
        dataUser.remove(elem, name);
      },
      // TODO: Now that all calls to _data and _removeData have been replaced
      // with direct calls to dataPriv methods, these can be deprecated.
      _data: function(elem, name, data) {
        return dataPriv.access(elem, name, data);
      },
      _removeData: function(elem, name) {
        dataPriv.remove(elem, name);
      }
    });
    jQuery3.fn.extend({
      data: function(key, value) {
        var i2, name, data, elem = this[0], attrs = elem && elem.attributes;
        if (key === void 0) {
          if (this.length) {
            data = dataUser.get(elem);
            if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
              i2 = attrs.length;
              while (i2--) {
                if (attrs[i2]) {
                  name = attrs[i2].name;
                  if (name.indexOf("data-") === 0) {
                    name = camelCase(name.slice(5));
                    dataAttr(elem, name, data[name]);
                  }
                }
              }
              dataPriv.set(elem, "hasDataAttrs", true);
            }
          }
          return data;
        }
        if (typeof key === "object") {
          return this.each(function() {
            dataUser.set(this, key);
          });
        }
        return access(this, function(value2) {
          var data2;
          if (elem && value2 === void 0) {
            data2 = dataUser.get(elem, key);
            if (data2 !== void 0) {
              return data2;
            }
            data2 = dataAttr(elem, key);
            if (data2 !== void 0) {
              return data2;
            }
            return;
          }
          this.each(function() {
            dataUser.set(this, key, value2);
          });
        }, null, value, arguments.length > 1, null, true);
      },
      removeData: function(key) {
        return this.each(function() {
          dataUser.remove(this, key);
        });
      }
    });
    jQuery3.extend({
      queue: function(elem, type, data) {
        var queue;
        if (elem) {
          type = (type || "fx") + "queue";
          queue = dataPriv.get(elem, type);
          if (data) {
            if (!queue || Array.isArray(data)) {
              queue = dataPriv.set(elem, type, jQuery3.makeArray(data));
            } else {
              queue.push(data);
            }
          }
          return queue || [];
        }
      },
      dequeue: function(elem, type) {
        type = type || "fx";
        var queue = jQuery3.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery3._queueHooks(elem, type), next = function() {
          jQuery3.dequeue(elem, type);
        };
        if (fn === "inprogress") {
          fn = queue.shift();
          startLength--;
        }
        if (fn) {
          if (type === "fx") {
            queue.unshift("inprogress");
          }
          delete hooks.stop;
          fn.call(elem, next, hooks);
        }
        if (!startLength && hooks) {
          hooks.empty.fire();
        }
      },
      // Not public - generate a queueHooks object, or return the current one
      _queueHooks: function(elem, type) {
        var key = type + "queueHooks";
        return dataPriv.get(elem, key) || dataPriv.set(elem, key, {
          empty: jQuery3.Callbacks("once memory").add(function() {
            dataPriv.remove(elem, [type + "queue", key]);
          })
        });
      }
    });
    jQuery3.fn.extend({
      queue: function(type, data) {
        var setter = 2;
        if (typeof type !== "string") {
          data = type;
          type = "fx";
          setter--;
        }
        if (arguments.length < setter) {
          return jQuery3.queue(this[0], type);
        }
        return data === void 0 ? this : this.each(function() {
          var queue = jQuery3.queue(this, type, data);
          jQuery3._queueHooks(this, type);
          if (type === "fx" && queue[0] !== "inprogress") {
            jQuery3.dequeue(this, type);
          }
        });
      },
      dequeue: function(type) {
        return this.each(function() {
          jQuery3.dequeue(this, type);
        });
      },
      clearQueue: function(type) {
        return this.queue(type || "fx", []);
      },
      // Get a promise resolved when queues of a certain type
      // are emptied (fx is the type by default)
      promise: function(type, obj) {
        var tmp, count = 1, defer = jQuery3.Deferred(), elements = this, i2 = this.length, resolve = function() {
          if (!--count) {
            defer.resolveWith(elements, [elements]);
          }
        };
        if (typeof type !== "string") {
          obj = type;
          type = void 0;
        }
        type = type || "fx";
        while (i2--) {
          tmp = dataPriv.get(elements[i2], type + "queueHooks");
          if (tmp && tmp.empty) {
            count++;
            tmp.empty.add(resolve);
          }
        }
        resolve();
        return defer.promise(obj);
      }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
    var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
    var cssExpand = ["Top", "Right", "Bottom", "Left"];
    function isHiddenWithinTree(elem, el) {
      elem = el || elem;
      return elem.style.display === "none" || elem.style.display === "" && jQuery3.css(elem, "display") === "none";
    }
    var ralphaStart = /^[a-z]/, rautoPx = /^(?:Border(?:Top|Right|Bottom|Left)?(?:Width|)|(?:Margin|Padding)?(?:Top|Right|Bottom|Left)?|(?:Min|Max)?(?:Width|Height))$/;
    function isAutoPx(prop) {
      return ralphaStart.test(prop) && rautoPx.test(prop[0].toUpperCase() + prop.slice(1));
    }
    function adjustCSS(elem, prop, valueParts, tween) {
      var adjusted, scale, maxIterations = 20, currentValue = tween ? function() {
        return tween.cur();
      } : function() {
        return jQuery3.css(elem, prop, "");
      }, initial = currentValue(), unit = valueParts && valueParts[3] || (isAutoPx(prop) ? "px" : ""), initialInUnit = elem.nodeType && (!isAutoPx(prop) || unit !== "px" && +initial) && rcssNum.exec(jQuery3.css(elem, prop));
      if (initialInUnit && initialInUnit[3] !== unit) {
        initial = initial / 2;
        unit = unit || initialInUnit[3];
        initialInUnit = +initial || 1;
        while (maxIterations--) {
          jQuery3.style(elem, prop, initialInUnit + unit);
          if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
            maxIterations = 0;
          }
          initialInUnit = initialInUnit / scale;
        }
        initialInUnit = initialInUnit * 2;
        jQuery3.style(elem, prop, initialInUnit + unit);
        valueParts = valueParts || [];
      }
      if (valueParts) {
        initialInUnit = +initialInUnit || +initial || 0;
        adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
        if (tween) {
          tween.unit = unit;
          tween.start = initialInUnit;
          tween.end = adjusted;
        }
      }
      return adjusted;
    }
    var rmsPrefix = /^-ms-/;
    function cssCamelCase(string) {
      return camelCase(string.replace(rmsPrefix, "ms-"));
    }
    var defaultDisplayMap = {};
    function getDefaultDisplay(elem) {
      var temp, doc = elem.ownerDocument, nodeName2 = elem.nodeName, display = defaultDisplayMap[nodeName2];
      if (display) {
        return display;
      }
      temp = doc.body.appendChild(doc.createElement(nodeName2));
      display = jQuery3.css(temp, "display");
      temp.parentNode.removeChild(temp);
      if (display === "none") {
        display = "block";
      }
      defaultDisplayMap[nodeName2] = display;
      return display;
    }
    function showHide(elements, show) {
      var display, elem, values = [], index = 0, length = elements.length;
      for (; index < length; index++) {
        elem = elements[index];
        if (!elem.style) {
          continue;
        }
        display = elem.style.display;
        if (show) {
          if (display === "none") {
            values[index] = dataPriv.get(elem, "display") || null;
            if (!values[index]) {
              elem.style.display = "";
            }
          }
          if (elem.style.display === "" && isHiddenWithinTree(elem)) {
            values[index] = getDefaultDisplay(elem);
          }
        } else {
          if (display !== "none") {
            values[index] = "none";
            dataPriv.set(elem, "display", display);
          }
        }
      }
      for (index = 0; index < length; index++) {
        if (values[index] != null) {
          elements[index].style.display = values[index];
        }
      }
      return elements;
    }
    jQuery3.fn.extend({
      show: function() {
        return showHide(this, true);
      },
      hide: function() {
        return showHide(this);
      },
      toggle: function(state) {
        if (typeof state === "boolean") {
          return state ? this.show() : this.hide();
        }
        return this.each(function() {
          if (isHiddenWithinTree(this)) {
            jQuery3(this).show();
          } else {
            jQuery3(this).hide();
          }
        });
      }
    });
    var isAttached = function(elem) {
      return jQuery3.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
    }, composed = { composed: true };
    if (!documentElement$1.getRootNode) {
      isAttached = function(elem) {
        return jQuery3.contains(elem.ownerDocument, elem);
      };
    }
    var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
    var wrapMap = {
      // Table parts need to be wrapped with `<table>` or they're
      // stripped to their contents when put in a div.
      // XHTML parsers do not magically insert elements in the
      // same way that tag soup parsers do, so we cannot shorten
      // this by omitting <tbody> or other required elements.
      thead: ["table"],
      col: ["colgroup", "table"],
      tr: ["tbody", "table"],
      td: ["tr", "tbody", "table"]
    };
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    function getAll(context, tag) {
      var ret;
      if (typeof context.getElementsByTagName !== "undefined") {
        ret = arr.slice.call(context.getElementsByTagName(tag || "*"));
      } else if (typeof context.querySelectorAll !== "undefined") {
        ret = context.querySelectorAll(tag || "*");
      } else {
        ret = [];
      }
      if (tag === void 0 || tag && nodeName(context, tag)) {
        return jQuery3.merge([context], ret);
      }
      return ret;
    }
    var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;
    function setGlobalEval(elems, refElements) {
      var i2 = 0, l = elems.length;
      for (; i2 < l; i2++) {
        dataPriv.set(
          elems[i2],
          "globalEval",
          !refElements || dataPriv.get(refElements[i2], "globalEval")
        );
      }
    }
    var rhtml = /<|&#?\w+;/;
    function buildFragment(elems, context, scripts, selection, ignored) {
      var elem, tmp, tag, wrap, attached, j, fragment = context.createDocumentFragment(), nodes = [], i2 = 0, l = elems.length;
      for (; i2 < l; i2++) {
        elem = elems[i2];
        if (elem || elem === 0) {
          if (toType(elem) === "object" && (elem.nodeType || isArrayLike(elem))) {
            jQuery3.merge(nodes, elem.nodeType ? [elem] : elem);
          } else if (!rhtml.test(elem)) {
            nodes.push(context.createTextNode(elem));
          } else {
            tmp = tmp || fragment.appendChild(context.createElement("div"));
            tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
            wrap = wrapMap[tag] || arr;
            j = wrap.length;
            while (--j > -1) {
              tmp = tmp.appendChild(context.createElement(wrap[j]));
            }
            tmp.innerHTML = jQuery3.htmlPrefilter(elem);
            jQuery3.merge(nodes, tmp.childNodes);
            tmp = fragment.firstChild;
            tmp.textContent = "";
          }
        }
      }
      fragment.textContent = "";
      i2 = 0;
      while (elem = nodes[i2++]) {
        if (selection && jQuery3.inArray(elem, selection) > -1) {
          if (ignored) {
            ignored.push(elem);
          }
          continue;
        }
        attached = isAttached(elem);
        tmp = getAll(fragment.appendChild(elem), "script");
        if (attached) {
          setGlobalEval(tmp);
        }
        if (scripts) {
          j = 0;
          while (elem = tmp[j++]) {
            if (rscriptType.test(elem.type || "")) {
              scripts.push(elem);
            }
          }
        }
      }
      return fragment;
    }
    function disableScript(elem) {
      elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
      return elem;
    }
    function restoreScript(elem) {
      if ((elem.type || "").slice(0, 5) === "true/") {
        elem.type = elem.type.slice(5);
      } else {
        elem.removeAttribute("type");
      }
      return elem;
    }
    function domManip(collection, args, callback, ignored) {
      args = flat(args);
      var fragment, first, scripts, hasScripts, node, doc, i2 = 0, l = collection.length, iNoClone = l - 1, value = args[0], valueIsFunction = typeof value === "function";
      if (valueIsFunction) {
        return collection.each(function(index) {
          var self = collection.eq(index);
          args[0] = value.call(this, index, self.html());
          domManip(self, args, callback, ignored);
        });
      }
      if (l) {
        fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
        first = fragment.firstChild;
        if (fragment.childNodes.length === 1) {
          fragment = first;
        }
        if (first || ignored) {
          scripts = jQuery3.map(getAll(fragment, "script"), disableScript);
          hasScripts = scripts.length;
          for (; i2 < l; i2++) {
            node = fragment;
            if (i2 !== iNoClone) {
              node = jQuery3.clone(node, true, true);
              if (hasScripts) {
                jQuery3.merge(scripts, getAll(node, "script"));
              }
            }
            callback.call(collection[i2], node, i2);
          }
          if (hasScripts) {
            doc = scripts[scripts.length - 1].ownerDocument;
            jQuery3.map(scripts, restoreScript);
            for (i2 = 0; i2 < hasScripts; i2++) {
              node = scripts[i2];
              if (rscriptType.test(node.type || "") && !dataPriv.get(node, "globalEval") && jQuery3.contains(doc, node)) {
                if (node.src && (node.type || "").toLowerCase() !== "module") {
                  if (jQuery3._evalUrl && !node.noModule) {
                    jQuery3._evalUrl(node.src, {
                      nonce: node.nonce,
                      crossOrigin: node.crossOrigin
                    }, doc);
                  }
                } else {
                  DOMEval(node.textContent, node, doc);
                }
              }
            }
          }
        }
      }
      return collection;
    }
    var rcheckableType = /^(?:checkbox|radio)$/i;
    var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
    function returnTrue() {
      return true;
    }
    function returnFalse() {
      return false;
    }
    function on(elem, types, selector, data, fn, one) {
      var origFn, type;
      if (typeof types === "object") {
        if (typeof selector !== "string") {
          data = data || selector;
          selector = void 0;
        }
        for (type in types) {
          on(elem, type, selector, data, types[type], one);
        }
        return elem;
      }
      if (data == null && fn == null) {
        fn = selector;
        data = selector = void 0;
      } else if (fn == null) {
        if (typeof selector === "string") {
          fn = data;
          data = void 0;
        } else {
          fn = data;
          data = selector;
          selector = void 0;
        }
      }
      if (fn === false) {
        fn = returnFalse;
      } else if (!fn) {
        return elem;
      }
      if (one === 1) {
        origFn = fn;
        fn = function(event) {
          jQuery3().off(event);
          return origFn.apply(this, arguments);
        };
        fn.guid = origFn.guid || (origFn.guid = jQuery3.guid++);
      }
      return elem.each(function() {
        jQuery3.event.add(this, types, fn, data, selector);
      });
    }
    jQuery3.event = {
      add: function(elem, types, handler, data, selector) {
        var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
        if (!acceptData(elem)) {
          return;
        }
        if (handler.handler) {
          handleObjIn = handler;
          handler = handleObjIn.handler;
          selector = handleObjIn.selector;
        }
        if (selector) {
          jQuery3.find.matchesSelector(documentElement$1, selector);
        }
        if (!handler.guid) {
          handler.guid = jQuery3.guid++;
        }
        if (!(events = elemData.events)) {
          events = elemData.events = /* @__PURE__ */ Object.create(null);
        }
        if (!(eventHandle = elemData.handle)) {
          eventHandle = elemData.handle = function(e) {
            return typeof jQuery3 !== "undefined" && jQuery3.event.triggered !== e.type ? jQuery3.event.dispatch.apply(elem, arguments) : void 0;
          };
        }
        types = (types || "").match(rnothtmlwhite) || [""];
        t = types.length;
        while (t--) {
          tmp = rtypenamespace.exec(types[t]) || [];
          type = origType = tmp[1];
          namespaces = (tmp[2] || "").split(".").sort();
          if (!type) {
            continue;
          }
          special = jQuery3.event.special[type] || {};
          type = (selector ? special.delegateType : special.bindType) || type;
          special = jQuery3.event.special[type] || {};
          handleObj = jQuery3.extend({
            type,
            origType,
            data,
            handler,
            guid: handler.guid,
            selector,
            needsContext: selector && jQuery3.expr.match.needsContext.test(selector),
            namespace: namespaces.join(".")
          }, handleObjIn);
          if (!(handlers = events[type])) {
            handlers = events[type] = [];
            handlers.delegateCount = 0;
            if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
              if (elem.addEventListener) {
                elem.addEventListener(type, eventHandle);
              }
            }
          }
          if (special.add) {
            special.add.call(elem, handleObj);
            if (!handleObj.handler.guid) {
              handleObj.handler.guid = handler.guid;
            }
          }
          if (selector) {
            handlers.splice(handlers.delegateCount++, 0, handleObj);
          } else {
            handlers.push(handleObj);
          }
        }
      },
      // Detach an event or set of events from an element
      remove: function(elem, types, handler, selector, mappedTypes) {
        var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
        if (!elemData || !(events = elemData.events)) {
          return;
        }
        types = (types || "").match(rnothtmlwhite) || [""];
        t = types.length;
        while (t--) {
          tmp = rtypenamespace.exec(types[t]) || [];
          type = origType = tmp[1];
          namespaces = (tmp[2] || "").split(".").sort();
          if (!type) {
            for (type in events) {
              jQuery3.event.remove(elem, type + types[t], handler, selector, true);
            }
            continue;
          }
          special = jQuery3.event.special[type] || {};
          type = (selector ? special.delegateType : special.bindType) || type;
          handlers = events[type] || [];
          tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
          origCount = j = handlers.length;
          while (j--) {
            handleObj = handlers[j];
            if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
              handlers.splice(j, 1);
              if (handleObj.selector) {
                handlers.delegateCount--;
              }
              if (special.remove) {
                special.remove.call(elem, handleObj);
              }
            }
          }
          if (origCount && !handlers.length) {
            if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
              jQuery3.removeEvent(elem, type, elemData.handle);
            }
            delete events[type];
          }
        }
        if (jQuery3.isEmptyObject(events)) {
          dataPriv.remove(elem, "handle events");
        }
      },
      dispatch: function(nativeEvent) {
        var i2, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), event = jQuery3.event.fix(nativeEvent), handlers = (dataPriv.get(this, "events") || /* @__PURE__ */ Object.create(null))[event.type] || [], special = jQuery3.event.special[event.type] || {};
        args[0] = event;
        for (i2 = 1; i2 < arguments.length; i2++) {
          args[i2] = arguments[i2];
        }
        event.delegateTarget = this;
        if (special.preDispatch && special.preDispatch.call(this, event) === false) {
          return;
        }
        handlerQueue = jQuery3.event.handlers.call(this, event, handlers);
        i2 = 0;
        while ((matched = handlerQueue[i2++]) && !event.isPropagationStopped()) {
          event.currentTarget = matched.elem;
          j = 0;
          while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
            if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
              event.handleObj = handleObj;
              event.data = handleObj.data;
              ret = ((jQuery3.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
              if (ret !== void 0) {
                if ((event.result = ret) === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }
            }
          }
        }
        if (special.postDispatch) {
          special.postDispatch.call(this, event);
        }
        return event.result;
      },
      handlers: function(event, handlers) {
        var i2, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
        if (delegateCount && // Support: Firefox <=42 - 66+
        // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
        // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
        // Support: IE 11+
        // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
        !(event.type === "click" && event.button >= 1)) {
          for (; cur !== this; cur = cur.parentNode || this) {
            if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
              matchedHandlers = [];
              matchedSelectors = {};
              for (i2 = 0; i2 < delegateCount; i2++) {
                handleObj = handlers[i2];
                sel = handleObj.selector + " ";
                if (matchedSelectors[sel] === void 0) {
                  matchedSelectors[sel] = handleObj.needsContext ? jQuery3(sel, this).index(cur) > -1 : jQuery3.find(sel, this, null, [cur]).length;
                }
                if (matchedSelectors[sel]) {
                  matchedHandlers.push(handleObj);
                }
              }
              if (matchedHandlers.length) {
                handlerQueue.push({ elem: cur, handlers: matchedHandlers });
              }
            }
          }
        }
        cur = this;
        if (delegateCount < handlers.length) {
          handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
        }
        return handlerQueue;
      },
      addProp: function(name, hook) {
        Object.defineProperty(jQuery3.Event.prototype, name, {
          enumerable: true,
          configurable: true,
          get: typeof hook === "function" ? function() {
            if (this.originalEvent) {
              return hook(this.originalEvent);
            }
          } : function() {
            if (this.originalEvent) {
              return this.originalEvent[name];
            }
          },
          set: function(value) {
            Object.defineProperty(this, name, {
              enumerable: true,
              configurable: true,
              writable: true,
              value
            });
          }
        });
      },
      fix: function(originalEvent) {
        return originalEvent[jQuery3.expando] ? originalEvent : new jQuery3.Event(originalEvent);
      },
      special: jQuery3.extend(/* @__PURE__ */ Object.create(null), {
        load: {
          // Prevent triggered image.load events from bubbling to window.load
          noBubble: true
        },
        click: {
          // Utilize native event to ensure correct state for checkable inputs
          setup: function(data) {
            var el = this || data;
            if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
              leverageNative(el, "click", true);
            }
            return false;
          },
          trigger: function(data) {
            var el = this || data;
            if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
              leverageNative(el, "click");
            }
            return true;
          },
          // For cross-browser consistency, suppress native .click() on links
          // Also prevent it if we're currently inside a leveraged native-event stack
          _default: function(event) {
            var target = event.target;
            return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
          }
        },
        beforeunload: {
          postDispatch: function(event) {
            if (event.result !== void 0) {
              event.preventDefault();
            }
          }
        }
      })
    };
    function leverageNative(el, type, isSetup) {
      if (!isSetup) {
        if (dataPriv.get(el, type) === void 0) {
          jQuery3.event.add(el, type, returnTrue);
        }
        return;
      }
      dataPriv.set(el, type, false);
      jQuery3.event.add(el, type, {
        namespace: false,
        handler: function(event) {
          var result, saved = dataPriv.get(this, type);
          if (event.isTrigger & 1 && this[type]) {
            if (!saved.length) {
              saved = slice.call(arguments);
              dataPriv.set(this, type, saved);
              this[type]();
              result = dataPriv.get(this, type);
              dataPriv.set(this, type, false);
              if (saved !== result) {
                event.stopImmediatePropagation();
                event.preventDefault();
                return result && result.value;
              }
            } else if ((jQuery3.event.special[type] || {}).delegateType) {
              event.stopPropagation();
            }
          } else if (saved.length) {
            dataPriv.set(this, type, {
              value: jQuery3.event.trigger(
                saved[0],
                saved.slice(1),
                this
              )
            });
            event.stopPropagation();
            event.isImmediatePropagationStopped = returnTrue;
          }
        }
      });
    }
    jQuery3.removeEvent = function(elem, type, handle) {
      if (elem.removeEventListener) {
        elem.removeEventListener(type, handle);
      }
    };
    jQuery3.Event = function(src, props) {
      if (!(this instanceof jQuery3.Event)) {
        return new jQuery3.Event(src, props);
      }
      if (src && src.type) {
        this.originalEvent = src;
        this.type = src.type;
        this.isDefaultPrevented = src.defaultPrevented ? returnTrue : returnFalse;
        this.target = src.target;
        this.currentTarget = src.currentTarget;
        this.relatedTarget = src.relatedTarget;
      } else {
        this.type = src;
      }
      if (props) {
        jQuery3.extend(this, props);
      }
      this.timeStamp = src && src.timeStamp || Date.now();
      this[jQuery3.expando] = true;
    };
    jQuery3.Event.prototype = {
      constructor: jQuery3.Event,
      isDefaultPrevented: returnFalse,
      isPropagationStopped: returnFalse,
      isImmediatePropagationStopped: returnFalse,
      isSimulated: false,
      preventDefault: function() {
        var e = this.originalEvent;
        this.isDefaultPrevented = returnTrue;
        if (e && !this.isSimulated) {
          e.preventDefault();
        }
      },
      stopPropagation: function() {
        var e = this.originalEvent;
        this.isPropagationStopped = returnTrue;
        if (e && !this.isSimulated) {
          e.stopPropagation();
        }
      },
      stopImmediatePropagation: function() {
        var e = this.originalEvent;
        this.isImmediatePropagationStopped = returnTrue;
        if (e && !this.isSimulated) {
          e.stopImmediatePropagation();
        }
        this.stopPropagation();
      }
    };
    jQuery3.each({
      altKey: true,
      bubbles: true,
      cancelable: true,
      changedTouches: true,
      ctrlKey: true,
      detail: true,
      eventPhase: true,
      metaKey: true,
      pageX: true,
      pageY: true,
      shiftKey: true,
      view: true,
      "char": true,
      code: true,
      charCode: true,
      key: true,
      keyCode: true,
      button: true,
      buttons: true,
      clientX: true,
      clientY: true,
      offsetX: true,
      offsetY: true,
      pointerId: true,
      pointerType: true,
      screenX: true,
      screenY: true,
      targetTouches: true,
      toElement: true,
      touches: true,
      which: true
    }, jQuery3.event.addProp);
    jQuery3.each({ focus: "focusin", blur: "focusout" }, function(type, delegateType) {
      function focusMappedHandler(nativeEvent) {
        var event = jQuery3.event.fix(nativeEvent);
        event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
        event.isSimulated = true;
        if (event.target === event.currentTarget) {
          dataPriv.get(this, "handle")(event);
        }
      }
      jQuery3.event.special[type] = {
        // Utilize native event if possible so blur/focus sequence is correct
        setup: function() {
          leverageNative(this, type, true);
          if (isIE) {
            this.addEventListener(delegateType, focusMappedHandler);
          } else {
            return false;
          }
        },
        trigger: function() {
          leverageNative(this, type);
          return true;
        },
        teardown: function() {
          if (isIE) {
            this.removeEventListener(delegateType, focusMappedHandler);
          } else {
            return false;
          }
        },
        // Suppress native focus or blur if we're currently inside
        // a leveraged native-event stack
        _default: function(event) {
          return dataPriv.get(event.target, type);
        },
        delegateType
      };
    });
    jQuery3.each({
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      pointerenter: "pointerover",
      pointerleave: "pointerout"
    }, function(orig, fix) {
      jQuery3.event.special[orig] = {
        delegateType: fix,
        bindType: fix,
        handle: function(event) {
          var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
          if (!related || related !== target && !jQuery3.contains(target, related)) {
            event.type = handleObj.origType;
            ret = handleObj.handler.apply(this, arguments);
            event.type = fix;
          }
          return ret;
        }
      };
    });
    jQuery3.fn.extend({
      on: function(types, selector, data, fn) {
        return on(this, types, selector, data, fn);
      },
      one: function(types, selector, data, fn) {
        return on(this, types, selector, data, fn, 1);
      },
      off: function(types, selector, fn) {
        var handleObj, type;
        if (types && types.preventDefault && types.handleObj) {
          handleObj = types.handleObj;
          jQuery3(types.delegateTarget).off(
            handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
            handleObj.selector,
            handleObj.handler
          );
          return this;
        }
        if (typeof types === "object") {
          for (type in types) {
            this.off(type, selector, types[type]);
          }
          return this;
        }
        if (selector === false || typeof selector === "function") {
          fn = selector;
          selector = void 0;
        }
        if (fn === false) {
          fn = returnFalse;
        }
        return this.each(function() {
          jQuery3.event.remove(this, types, fn, selector);
        });
      }
    });
    var rnoInnerhtml = /<script|<style|<link/i;
    function manipulationTarget(elem, content) {
      if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
        return jQuery3(elem).children("tbody")[0] || elem;
      }
      return elem;
    }
    function cloneCopyEvent(src, dest) {
      var type, i2, l, events = dataPriv.get(src, "events");
      if (dest.nodeType !== 1) {
        return;
      }
      if (events) {
        dataPriv.remove(dest, "handle events");
        for (type in events) {
          for (i2 = 0, l = events[type].length; i2 < l; i2++) {
            jQuery3.event.add(dest, type, events[type][i2]);
          }
        }
      }
      if (dataUser.hasData(src)) {
        dataUser.set(dest, jQuery3.extend({}, dataUser.get(src)));
      }
    }
    function remove(elem, selector, keepData) {
      var node, nodes = selector ? jQuery3.filter(selector, elem) : elem, i2 = 0;
      for (; (node = nodes[i2]) != null; i2++) {
        if (!keepData && node.nodeType === 1) {
          jQuery3.cleanData(getAll(node));
        }
        if (node.parentNode) {
          if (keepData && isAttached(node)) {
            setGlobalEval(getAll(node, "script"));
          }
          node.parentNode.removeChild(node);
        }
      }
      return elem;
    }
    jQuery3.extend({
      htmlPrefilter: function(html) {
        return html;
      },
      clone: function(elem, dataAndEvents, deepDataAndEvents) {
        var i2, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = isAttached(elem);
        if (isIE && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery3.isXMLDoc(elem)) {
          destElements = getAll(clone);
          srcElements = getAll(elem);
          for (i2 = 0, l = srcElements.length; i2 < l; i2++) {
            if (nodeName(destElements[i2], "textarea")) {
              destElements[i2].defaultValue = srcElements[i2].defaultValue;
            }
          }
        }
        if (dataAndEvents) {
          if (deepDataAndEvents) {
            srcElements = srcElements || getAll(elem);
            destElements = destElements || getAll(clone);
            for (i2 = 0, l = srcElements.length; i2 < l; i2++) {
              cloneCopyEvent(srcElements[i2], destElements[i2]);
            }
          } else {
            cloneCopyEvent(elem, clone);
          }
        }
        destElements = getAll(clone, "script");
        if (destElements.length > 0) {
          setGlobalEval(destElements, !inPage && getAll(elem, "script"));
        }
        return clone;
      },
      cleanData: function(elems) {
        var data, elem, type, special = jQuery3.event.special, i2 = 0;
        for (; (elem = elems[i2]) !== void 0; i2++) {
          if (acceptData(elem)) {
            if (data = elem[dataPriv.expando]) {
              if (data.events) {
                for (type in data.events) {
                  if (special[type]) {
                    jQuery3.event.remove(elem, type);
                  } else {
                    jQuery3.removeEvent(elem, type, data.handle);
                  }
                }
              }
              elem[dataPriv.expando] = void 0;
            }
            if (elem[dataUser.expando]) {
              elem[dataUser.expando] = void 0;
            }
          }
        }
      }
    });
    jQuery3.fn.extend({
      detach: function(selector) {
        return remove(this, selector, true);
      },
      remove: function(selector) {
        return remove(this, selector);
      },
      text: function(value) {
        return access(this, function(value2) {
          return value2 === void 0 ? jQuery3.text(this) : this.empty().each(function() {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
              this.textContent = value2;
            }
          });
        }, null, value, arguments.length);
      },
      append: function() {
        return domManip(this, arguments, function(elem) {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            var target = manipulationTarget(this, elem);
            target.appendChild(elem);
          }
        });
      },
      prepend: function() {
        return domManip(this, arguments, function(elem) {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            var target = manipulationTarget(this, elem);
            target.insertBefore(elem, target.firstChild);
          }
        });
      },
      before: function() {
        return domManip(this, arguments, function(elem) {
          if (this.parentNode) {
            this.parentNode.insertBefore(elem, this);
          }
        });
      },
      after: function() {
        return domManip(this, arguments, function(elem) {
          if (this.parentNode) {
            this.parentNode.insertBefore(elem, this.nextSibling);
          }
        });
      },
      empty: function() {
        var elem, i2 = 0;
        for (; (elem = this[i2]) != null; i2++) {
          if (elem.nodeType === 1) {
            jQuery3.cleanData(getAll(elem, false));
            elem.textContent = "";
          }
        }
        return this;
      },
      clone: function(dataAndEvents, deepDataAndEvents) {
        dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
        deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
        return this.map(function() {
          return jQuery3.clone(this, dataAndEvents, deepDataAndEvents);
        });
      },
      html: function(value) {
        return access(this, function(value2) {
          var elem = this[0] || {}, i2 = 0, l = this.length;
          if (value2 === void 0 && elem.nodeType === 1) {
            return elem.innerHTML;
          }
          if (typeof value2 === "string" && !rnoInnerhtml.test(value2) && !wrapMap[(rtagName.exec(value2) || ["", ""])[1].toLowerCase()]) {
            value2 = jQuery3.htmlPrefilter(value2);
            try {
              for (; i2 < l; i2++) {
                elem = this[i2] || {};
                if (elem.nodeType === 1) {
                  jQuery3.cleanData(getAll(elem, false));
                  elem.innerHTML = value2;
                }
              }
              elem = 0;
            } catch (e) {
            }
          }
          if (elem) {
            this.empty().append(value2);
          }
        }, null, value, arguments.length);
      },
      replaceWith: function() {
        var ignored = [];
        return domManip(this, arguments, function(elem) {
          var parent = this.parentNode;
          if (jQuery3.inArray(this, ignored) < 0) {
            jQuery3.cleanData(getAll(this));
            if (parent) {
              parent.replaceChild(elem, this);
            }
          }
        }, ignored);
      }
    });
    jQuery3.each({
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith"
    }, function(name, original) {
      jQuery3.fn[name] = function(selector) {
        var elems, ret = [], insert = jQuery3(selector), last = insert.length - 1, i2 = 0;
        for (; i2 <= last; i2++) {
          elems = i2 === last ? this : this.clone(true);
          jQuery3(insert[i2])[original](elems);
          push.apply(ret, elems);
        }
        return this.pushStack(ret);
      };
    });
    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
    var rcustomProp = /^--/;
    function getStyles(elem) {
      var view = elem.ownerDocument.defaultView;
      if (!view) {
        view = window2;
      }
      return view.getComputedStyle(elem);
    }
    function swap(elem, options, callback) {
      var ret, name, old = {};
      for (name in options) {
        old[name] = elem.style[name];
        elem.style[name] = options[name];
      }
      ret = callback.call(elem);
      for (name in options) {
        elem.style[name] = old[name];
      }
      return ret;
    }
    function curCSS(elem, name, computed) {
      var ret, isCustomProp = rcustomProp.test(name);
      computed = computed || getStyles(elem);
      if (computed) {
        ret = computed.getPropertyValue(name) || computed[name];
        if (isCustomProp && ret) {
          ret = ret.replace(rtrimCSS, "$1") || void 0;
        }
        if (ret === "" && !isAttached(elem)) {
          ret = jQuery3.style(elem, name);
        }
      }
      return ret !== void 0 ? (
        // Support: IE <=9 - 11+
        // IE returns zIndex value as an integer.
        ret + ""
      ) : ret;
    }
    var cssPrefixes = ["Webkit", "Moz", "ms"], emptyStyle = document$1.createElement("div").style;
    function vendorPropName(name) {
      var capName = name[0].toUpperCase() + name.slice(1), i2 = cssPrefixes.length;
      while (i2--) {
        name = cssPrefixes[i2] + capName;
        if (name in emptyStyle) {
          return name;
        }
      }
    }
    function finalPropName(name) {
      if (name in emptyStyle) {
        return name;
      }
      return vendorPropName(name) || name;
    }
    var reliableTrDimensionsVal, reliableColDimensionsVal, table = document$1.createElement("table");
    function computeTableStyleTests() {
      if (
        // This is a singleton, we need to execute it only once
        !table || // Finish early in limited (non-browser) environments
        !table.style
      ) {
        return;
      }
      var trStyle, col = document$1.createElement("col"), tr = document$1.createElement("tr"), td = document$1.createElement("td");
      table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate;border-spacing:0";
      tr.style.cssText = "box-sizing:content-box;border:1px solid;height:1px";
      td.style.cssText = "height:9px;width:9px;padding:0";
      col.span = 2;
      documentElement$1.appendChild(table).appendChild(col).parentNode.appendChild(tr).appendChild(td).parentNode.appendChild(td.cloneNode(true));
      if (table.offsetWidth === 0) {
        documentElement$1.removeChild(table);
        return;
      }
      trStyle = window2.getComputedStyle(tr);
      reliableColDimensionsVal = isIE || Math.round(
        parseFloat(
          window2.getComputedStyle(col).width
        )
      ) === 18;
      reliableTrDimensionsVal = Math.round(parseFloat(trStyle.height) + parseFloat(trStyle.borderTopWidth) + parseFloat(trStyle.borderBottomWidth)) === tr.offsetHeight;
      documentElement$1.removeChild(table);
      table = null;
    }
    jQuery3.extend(support, {
      reliableTrDimensions: function() {
        computeTableStyleTests();
        return reliableTrDimensionsVal;
      },
      reliableColDimensions: function() {
        computeTableStyleTests();
        return reliableColDimensionsVal;
      }
    });
    var cssShow = { position: "absolute", visibility: "hidden", display: "block" }, cssNormalTransform = {
      letterSpacing: "0",
      fontWeight: "400"
    };
    function setPositiveNumber(_elem, value, subtract) {
      var matches2 = rcssNum.exec(value);
      return matches2 ? (
        // Guard against undefined "subtract", e.g., when used as in cssHooks
        Math.max(0, matches2[2] - (subtract || 0)) + (matches2[3] || "px")
      ) : value;
    }
    function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
      var i2 = dimension === "width" ? 1 : 0, extra = 0, delta = 0, marginDelta = 0;
      if (box === (isBorderBox ? "border" : "content")) {
        return 0;
      }
      for (; i2 < 4; i2 += 2) {
        if (box === "margin") {
          marginDelta += jQuery3.css(elem, box + cssExpand[i2], true, styles);
        }
        if (!isBorderBox) {
          delta += jQuery3.css(elem, "padding" + cssExpand[i2], true, styles);
          if (box !== "padding") {
            delta += jQuery3.css(elem, "border" + cssExpand[i2] + "Width", true, styles);
          } else {
            extra += jQuery3.css(elem, "border" + cssExpand[i2] + "Width", true, styles);
          }
        } else {
          if (box === "content") {
            delta -= jQuery3.css(elem, "padding" + cssExpand[i2], true, styles);
          }
          if (box !== "margin") {
            delta -= jQuery3.css(elem, "border" + cssExpand[i2] + "Width", true, styles);
          }
        }
      }
      if (!isBorderBox && computedVal >= 0) {
        delta += Math.max(0, Math.ceil(
          elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5
          // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
          // Use an explicit zero to avoid NaN (gh-3964)
        )) || 0;
      }
      return delta + marginDelta;
    }
    function getWidthOrHeight(elem, dimension, extra) {
      var styles = getStyles(elem), boxSizingNeeded = isIE || extra, isBorderBox = boxSizingNeeded && jQuery3.css(elem, "boxSizing", false, styles) === "border-box", valueIsBorderBox = isBorderBox, val = curCSS(elem, dimension, styles), offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
      if (rnumnonpx.test(val)) {
        if (!extra) {
          return val;
        }
        val = "auto";
      }
      if (
        // Fall back to offsetWidth/offsetHeight when value is "auto"
        // This happens for inline elements with no explicit setting (gh-3571)
        (val === "auto" || // Support: IE 9 - 11+
        // Use offsetWidth/offsetHeight for when box sizing is unreliable.
        // In those cases, the computed value can be trusted to be border-box.
        isIE && isBorderBox || !support.reliableColDimensions() && nodeName(elem, "col") || !support.reliableTrDimensions() && nodeName(elem, "tr")) && // Make sure the element is visible & connected
        elem.getClientRects().length
      ) {
        isBorderBox = jQuery3.css(elem, "boxSizing", false, styles) === "border-box";
        valueIsBorderBox = offsetProp in elem;
        if (valueIsBorderBox) {
          val = elem[offsetProp];
        }
      }
      val = parseFloat(val) || 0;
      return val + boxModelAdjustment(
        elem,
        dimension,
        extra || (isBorderBox ? "border" : "content"),
        valueIsBorderBox,
        styles,
        // Provide the current computed size to request scroll gutter calculation (gh-3589)
        val
      ) + "px";
    }
    jQuery3.extend({
      // Add in style property hooks for overriding the default
      // behavior of getting and setting a style property
      cssHooks: {},
      // Get and set the style property on a DOM Node
      style: function(elem, name, value, extra) {
        if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
          return;
        }
        var ret, type, hooks, origName = cssCamelCase(name), isCustomProp = rcustomProp.test(name), style = elem.style;
        if (!isCustomProp) {
          name = finalPropName(origName);
        }
        hooks = jQuery3.cssHooks[name] || jQuery3.cssHooks[origName];
        if (value !== void 0) {
          type = typeof value;
          if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
            value = adjustCSS(elem, name, ret);
            type = "number";
          }
          if (value == null || value !== value) {
            return;
          }
          if (type === "number") {
            value += ret && ret[3] || (isAutoPx(origName) ? "px" : "");
          }
          if (isIE && value === "" && name.indexOf("background") === 0) {
            style[name] = "inherit";
          }
          if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== void 0) {
            if (isCustomProp) {
              style.setProperty(name, value);
            } else {
              style[name] = value;
            }
          }
        } else {
          if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== void 0) {
            return ret;
          }
          return style[name];
        }
      },
      css: function(elem, name, extra, styles) {
        var val, num, hooks, origName = cssCamelCase(name), isCustomProp = rcustomProp.test(name);
        if (!isCustomProp) {
          name = finalPropName(origName);
        }
        hooks = jQuery3.cssHooks[name] || jQuery3.cssHooks[origName];
        if (hooks && "get" in hooks) {
          val = hooks.get(elem, true, extra);
        }
        if (val === void 0) {
          val = curCSS(elem, name, styles);
        }
        if (val === "normal" && name in cssNormalTransform) {
          val = cssNormalTransform[name];
        }
        if (extra === "" || extra) {
          num = parseFloat(val);
          return extra === true || isFinite(num) ? num || 0 : val;
        }
        return val;
      }
    });
    jQuery3.each(["height", "width"], function(_i, dimension) {
      jQuery3.cssHooks[dimension] = {
        get: function(elem, computed, extra) {
          if (computed) {
            return jQuery3.css(elem, "display") === "none" ? swap(elem, cssShow, function() {
              return getWidthOrHeight(elem, dimension, extra);
            }) : getWidthOrHeight(elem, dimension, extra);
          }
        },
        set: function(elem, value, extra) {
          var matches2, styles = getStyles(elem), isBorderBox = extra && jQuery3.css(elem, "boxSizing", false, styles) === "border-box", subtract = extra ? boxModelAdjustment(
            elem,
            dimension,
            extra,
            isBorderBox,
            styles
          ) : 0;
          if (subtract && (matches2 = rcssNum.exec(value)) && (matches2[3] || "px") !== "px") {
            elem.style[dimension] = value;
            value = jQuery3.css(elem, dimension);
          }
          return setPositiveNumber(elem, value, subtract);
        }
      };
    });
    jQuery3.each({
      margin: "",
      padding: "",
      border: "Width"
    }, function(prefix, suffix) {
      jQuery3.cssHooks[prefix + suffix] = {
        expand: function(value) {
          var i2 = 0, expanded = {}, parts = typeof value === "string" ? value.split(" ") : [value];
          for (; i2 < 4; i2++) {
            expanded[prefix + cssExpand[i2] + suffix] = parts[i2] || parts[i2 - 2] || parts[0];
          }
          return expanded;
        }
      };
      if (prefix !== "margin") {
        jQuery3.cssHooks[prefix + suffix].set = setPositiveNumber;
      }
    });
    jQuery3.fn.extend({
      css: function(name, value) {
        return access(this, function(elem, name2, value2) {
          var styles, len, map = {}, i2 = 0;
          if (Array.isArray(name2)) {
            styles = getStyles(elem);
            len = name2.length;
            for (; i2 < len; i2++) {
              map[name2[i2]] = jQuery3.css(elem, name2[i2], false, styles);
            }
            return map;
          }
          return value2 !== void 0 ? jQuery3.style(elem, name2, value2) : jQuery3.css(elem, name2);
        }, name, value, arguments.length > 1);
      }
    });
    function Tween(elem, options, prop, end, easing) {
      return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    jQuery3.Tween = Tween;
    Tween.prototype = {
      constructor: Tween,
      init: function(elem, options, prop, end, easing, unit) {
        this.elem = elem;
        this.prop = prop;
        this.easing = easing || jQuery3.easing._default;
        this.options = options;
        this.start = this.now = this.cur();
        this.end = end;
        this.unit = unit || (isAutoPx(prop) ? "px" : "");
      },
      cur: function() {
        var hooks = Tween.propHooks[this.prop];
        return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
      },
      run: function(percent) {
        var eased, hooks = Tween.propHooks[this.prop];
        if (this.options.duration) {
          this.pos = eased = jQuery3.easing[this.easing](
            percent,
            this.options.duration * percent,
            0,
            1,
            this.options.duration
          );
        } else {
          this.pos = eased = percent;
        }
        this.now = (this.end - this.start) * eased + this.start;
        if (this.options.step) {
          this.options.step.call(this.elem, this.now, this);
        }
        if (hooks && hooks.set) {
          hooks.set(this);
        } else {
          Tween.propHooks._default.set(this);
        }
        return this;
      }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
      _default: {
        get: function(tween) {
          var result;
          if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
            return tween.elem[tween.prop];
          }
          result = jQuery3.css(tween.elem, tween.prop, "");
          return !result || result === "auto" ? 0 : result;
        },
        set: function(tween) {
          if (jQuery3.fx.step[tween.prop]) {
            jQuery3.fx.step[tween.prop](tween);
          } else if (tween.elem.nodeType === 1 && (jQuery3.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
            jQuery3.style(tween.elem, tween.prop, tween.now + tween.unit);
          } else {
            tween.elem[tween.prop] = tween.now;
          }
        }
      }
    };
    jQuery3.easing = {
      linear: function(p) {
        return p;
      },
      swing: function(p) {
        return 0.5 - Math.cos(p * Math.PI) / 2;
      },
      _default: "swing"
    };
    jQuery3.fx = Tween.prototype.init;
    jQuery3.fx.step = {};
    var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
    function schedule() {
      if (inProgress) {
        if (document$1.hidden === false && window2.requestAnimationFrame) {
          window2.requestAnimationFrame(schedule);
        } else {
          window2.setTimeout(schedule, 13);
        }
        jQuery3.fx.tick();
      }
    }
    function createFxNow() {
      window2.setTimeout(function() {
        fxNow = void 0;
      });
      return fxNow = Date.now();
    }
    function genFx(type, includeWidth) {
      var which, i2 = 0, attrs = { height: type };
      includeWidth = includeWidth ? 1 : 0;
      for (; i2 < 4; i2 += 2 - includeWidth) {
        which = cssExpand[i2];
        attrs["margin" + which] = attrs["padding" + which] = type;
      }
      if (includeWidth) {
        attrs.opacity = attrs.width = type;
      }
      return attrs;
    }
    function createTween(value, prop, animation) {
      var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length;
      for (; index < length; index++) {
        if (tween = collection[index].call(animation, prop, value)) {
          return tween;
        }
      }
    }
    function defaultPrefilter(elem, props, opts) {
      var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
      if (!opts.queue) {
        hooks = jQuery3._queueHooks(elem, "fx");
        if (hooks.unqueued == null) {
          hooks.unqueued = 0;
          oldfire = hooks.empty.fire;
          hooks.empty.fire = function() {
            if (!hooks.unqueued) {
              oldfire();
            }
          };
        }
        hooks.unqueued++;
        anim.always(function() {
          anim.always(function() {
            hooks.unqueued--;
            if (!jQuery3.queue(elem, "fx").length) {
              hooks.empty.fire();
            }
          });
        });
      }
      for (prop in props) {
        value = props[prop];
        if (rfxtypes.test(value)) {
          delete props[prop];
          toggle = toggle || value === "toggle";
          if (value === (hidden ? "hide" : "show")) {
            if (value === "show" && dataShow && dataShow[prop] !== void 0) {
              hidden = true;
            } else {
              continue;
            }
          }
          orig[prop] = dataShow && dataShow[prop] || jQuery3.style(elem, prop);
        }
      }
      propTween = !jQuery3.isEmptyObject(props);
      if (!propTween && jQuery3.isEmptyObject(orig)) {
        return;
      }
      if (isBox && elem.nodeType === 1) {
        opts.overflow = [style.overflow, style.overflowX, style.overflowY];
        restoreDisplay = dataShow && dataShow.display;
        if (restoreDisplay == null) {
          restoreDisplay = dataPriv.get(elem, "display");
        }
        display = jQuery3.css(elem, "display");
        if (display === "none") {
          if (restoreDisplay) {
            display = restoreDisplay;
          } else {
            showHide([elem], true);
            restoreDisplay = elem.style.display || restoreDisplay;
            display = jQuery3.css(elem, "display");
            showHide([elem]);
          }
        }
        if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
          if (jQuery3.css(elem, "float") === "none") {
            if (!propTween) {
              anim.done(function() {
                style.display = restoreDisplay;
              });
              if (restoreDisplay == null) {
                display = style.display;
                restoreDisplay = display === "none" ? "" : display;
              }
            }
            style.display = "inline-block";
          }
        }
      }
      if (opts.overflow) {
        style.overflow = "hidden";
        anim.always(function() {
          style.overflow = opts.overflow[0];
          style.overflowX = opts.overflow[1];
          style.overflowY = opts.overflow[2];
        });
      }
      propTween = false;
      for (prop in orig) {
        if (!propTween) {
          if (dataShow) {
            if ("hidden" in dataShow) {
              hidden = dataShow.hidden;
            }
          } else {
            dataShow = dataPriv.set(elem, "fxshow", { display: restoreDisplay });
          }
          if (toggle) {
            dataShow.hidden = !hidden;
          }
          if (hidden) {
            showHide([elem], true);
          }
          anim.done(function() {
            if (!hidden) {
              showHide([elem]);
            }
            dataPriv.remove(elem, "fxshow");
            for (prop in orig) {
              jQuery3.style(elem, prop, orig[prop]);
            }
          });
        }
        propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = propTween.start;
          if (hidden) {
            propTween.end = propTween.start;
            propTween.start = 0;
          }
        }
      }
    }
    function propFilter(props, specialEasing) {
      var index, name, easing, value, hooks;
      for (index in props) {
        name = cssCamelCase(index);
        easing = specialEasing[name];
        value = props[index];
        if (Array.isArray(value)) {
          easing = value[1];
          value = props[index] = value[0];
        }
        if (index !== name) {
          props[name] = value;
          delete props[index];
        }
        hooks = jQuery3.cssHooks[name];
        if (hooks && "expand" in hooks) {
          value = hooks.expand(value);
          delete props[name];
          for (index in value) {
            if (!(index in props)) {
              props[index] = value[index];
              specialEasing[index] = easing;
            }
          }
        } else {
          specialEasing[name] = easing;
        }
      }
    }
    function Animation(elem, properties, options) {
      var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery3.Deferred().always(function() {
        delete tick.elem;
      }), tick = function() {
        if (stopped) {
          return false;
        }
        var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), percent = 1 - (remaining / animation.duration || 0), index2 = 0, length2 = animation.tweens.length;
        for (; index2 < length2; index2++) {
          animation.tweens[index2].run(percent);
        }
        deferred.notifyWith(elem, [animation, percent, remaining]);
        if (percent < 1 && length2) {
          return remaining;
        }
        if (!length2) {
          deferred.notifyWith(elem, [animation, 1, 0]);
        }
        deferred.resolveWith(elem, [animation]);
        return false;
      }, animation = deferred.promise({
        elem,
        props: jQuery3.extend({}, properties),
        opts: jQuery3.extend(true, {
          specialEasing: {},
          easing: jQuery3.easing._default
        }, options),
        originalProperties: properties,
        originalOptions: options,
        startTime: fxNow || createFxNow(),
        duration: options.duration,
        tweens: [],
        createTween: function(prop, end) {
          var tween = jQuery3.Tween(
            elem,
            animation.opts,
            prop,
            end,
            animation.opts.specialEasing[prop] || animation.opts.easing
          );
          animation.tweens.push(tween);
          return tween;
        },
        stop: function(gotoEnd) {
          var index2 = 0, length2 = gotoEnd ? animation.tweens.length : 0;
          if (stopped) {
            return this;
          }
          stopped = true;
          for (; index2 < length2; index2++) {
            animation.tweens[index2].run(1);
          }
          if (gotoEnd) {
            deferred.notifyWith(elem, [animation, 1, 0]);
            deferred.resolveWith(elem, [animation, gotoEnd]);
          } else {
            deferred.rejectWith(elem, [animation, gotoEnd]);
          }
          return this;
        }
      }), props = animation.props;
      propFilter(props, animation.opts.specialEasing);
      for (; index < length; index++) {
        result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
        if (result) {
          if (typeof result.stop === "function") {
            jQuery3._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
          }
          return result;
        }
      }
      jQuery3.map(props, createTween, animation);
      if (typeof animation.opts.start === "function") {
        animation.opts.start.call(elem, animation);
      }
      animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
      jQuery3.fx.timer(
        jQuery3.extend(tick, {
          elem,
          anim: animation,
          queue: animation.opts.queue
        })
      );
      return animation;
    }
    jQuery3.Animation = jQuery3.extend(Animation, {
      tweeners: {
        "*": [function(prop, value) {
          var tween = this.createTween(prop, value);
          adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
          return tween;
        }]
      },
      tweener: function(props, callback) {
        if (typeof props === "function") {
          callback = props;
          props = ["*"];
        } else {
          props = props.match(rnothtmlwhite);
        }
        var prop, index = 0, length = props.length;
        for (; index < length; index++) {
          prop = props[index];
          Animation.tweeners[prop] = Animation.tweeners[prop] || [];
          Animation.tweeners[prop].unshift(callback);
        }
      },
      prefilters: [defaultPrefilter],
      prefilter: function(callback, prepend) {
        if (prepend) {
          Animation.prefilters.unshift(callback);
        } else {
          Animation.prefilters.push(callback);
        }
      }
    });
    jQuery3.speed = function(speed, easing, fn) {
      var opt = speed && typeof speed === "object" ? jQuery3.extend({}, speed) : {
        complete: fn || easing || typeof speed === "function" && speed,
        duration: speed,
        easing: fn && easing || easing && typeof easing !== "function" && easing
      };
      if (jQuery3.fx.off) {
        opt.duration = 0;
      } else {
        if (typeof opt.duration !== "number") {
          if (opt.duration in jQuery3.fx.speeds) {
            opt.duration = jQuery3.fx.speeds[opt.duration];
          } else {
            opt.duration = jQuery3.fx.speeds._default;
          }
        }
      }
      if (opt.queue == null || opt.queue === true) {
        opt.queue = "fx";
      }
      opt.old = opt.complete;
      opt.complete = function() {
        if (typeof opt.old === "function") {
          opt.old.call(this);
        }
        if (opt.queue) {
          jQuery3.dequeue(this, opt.queue);
        }
      };
      return opt;
    };
    jQuery3.fn.extend({
      fadeTo: function(speed, to, easing, callback) {
        return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({ opacity: to }, speed, easing, callback);
      },
      animate: function(prop, speed, easing, callback) {
        var empty = jQuery3.isEmptyObject(prop), optall = jQuery3.speed(speed, easing, callback), doAnimation = function() {
          var anim = Animation(this, jQuery3.extend({}, prop), optall);
          if (empty || dataPriv.get(this, "finish")) {
            anim.stop(true);
          }
        };
        doAnimation.finish = doAnimation;
        return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
      },
      stop: function(type, clearQueue, gotoEnd) {
        var stopQueue = function(hooks) {
          var stop = hooks.stop;
          delete hooks.stop;
          stop(gotoEnd);
        };
        if (typeof type !== "string") {
          gotoEnd = clearQueue;
          clearQueue = type;
          type = void 0;
        }
        if (clearQueue) {
          this.queue(type || "fx", []);
        }
        return this.each(function() {
          var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery3.timers, data = dataPriv.get(this);
          if (index) {
            if (data[index] && data[index].stop) {
              stopQueue(data[index]);
            }
          } else {
            for (index in data) {
              if (data[index] && data[index].stop && rrun.test(index)) {
                stopQueue(data[index]);
              }
            }
          }
          for (index = timers.length; index--; ) {
            if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
              timers[index].anim.stop(gotoEnd);
              dequeue = false;
              timers.splice(index, 1);
            }
          }
          if (dequeue || !gotoEnd) {
            jQuery3.dequeue(this, type);
          }
        });
      },
      finish: function(type) {
        if (type !== false) {
          type = type || "fx";
        }
        return this.each(function() {
          var index, data = dataPriv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery3.timers, length = queue ? queue.length : 0;
          data.finish = true;
          jQuery3.queue(this, type, []);
          if (hooks && hooks.stop) {
            hooks.stop.call(this, true);
          }
          for (index = timers.length; index--; ) {
            if (timers[index].elem === this && timers[index].queue === type) {
              timers[index].anim.stop(true);
              timers.splice(index, 1);
            }
          }
          for (index = 0; index < length; index++) {
            if (queue[index] && queue[index].finish) {
              queue[index].finish.call(this);
            }
          }
          delete data.finish;
        });
      }
    });
    jQuery3.each(["toggle", "show", "hide"], function(_i, name) {
      var cssFn = jQuery3.fn[name];
      jQuery3.fn[name] = function(speed, easing, callback) {
        return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
      };
    });
    jQuery3.each({
      slideDown: genFx("show"),
      slideUp: genFx("hide"),
      slideToggle: genFx("toggle"),
      fadeIn: { opacity: "show" },
      fadeOut: { opacity: "hide" },
      fadeToggle: { opacity: "toggle" }
    }, function(name, props) {
      jQuery3.fn[name] = function(speed, easing, callback) {
        return this.animate(props, speed, easing, callback);
      };
    });
    jQuery3.timers = [];
    jQuery3.fx.tick = function() {
      var timer, i2 = 0, timers = jQuery3.timers;
      fxNow = Date.now();
      for (; i2 < timers.length; i2++) {
        timer = timers[i2];
        if (!timer() && timers[i2] === timer) {
          timers.splice(i2--, 1);
        }
      }
      if (!timers.length) {
        jQuery3.fx.stop();
      }
      fxNow = void 0;
    };
    jQuery3.fx.timer = function(timer) {
      jQuery3.timers.push(timer);
      jQuery3.fx.start();
    };
    jQuery3.fx.start = function() {
      if (inProgress) {
        return;
      }
      inProgress = true;
      schedule();
    };
    jQuery3.fx.stop = function() {
      inProgress = null;
    };
    jQuery3.fx.speeds = {
      slow: 600,
      fast: 200,
      // Default speed
      _default: 400
    };
    jQuery3.fn.delay = function(time, type) {
      time = jQuery3.fx ? jQuery3.fx.speeds[time] || time : time;
      type = type || "fx";
      return this.queue(type, function(next, hooks) {
        var timeout = window2.setTimeout(next, time);
        hooks.stop = function() {
          window2.clearTimeout(timeout);
        };
      });
    };
    var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
    jQuery3.fn.extend({
      prop: function(name, value) {
        return access(this, jQuery3.prop, name, value, arguments.length > 1);
      },
      removeProp: function(name) {
        return this.each(function() {
          delete this[jQuery3.propFix[name] || name];
        });
      }
    });
    jQuery3.extend({
      prop: function(elem, name, value) {
        var ret, hooks, nType = elem.nodeType;
        if (nType === 3 || nType === 8 || nType === 2) {
          return;
        }
        if (nType !== 1 || !jQuery3.isXMLDoc(elem)) {
          name = jQuery3.propFix[name] || name;
          hooks = jQuery3.propHooks[name];
        }
        if (value !== void 0) {
          if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
            return ret;
          }
          return elem[name] = value;
        }
        if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
          return ret;
        }
        return elem[name];
      },
      propHooks: {
        tabIndex: {
          get: function(elem) {
            var tabindex = elem.getAttribute("tabindex");
            if (tabindex) {
              return parseInt(tabindex, 10);
            }
            if (rfocusable.test(elem.nodeName) || // href-less anchor's `tabIndex` property value is `0` and
            // the `tabindex` attribute value: `null`. We want `-1`.
            rclickable.test(elem.nodeName) && elem.href) {
              return 0;
            }
            return -1;
          }
        }
      },
      propFix: {
        "for": "htmlFor",
        "class": "className"
      }
    });
    if (isIE) {
      jQuery3.propHooks.selected = {
        get: function(elem) {
          var parent = elem.parentNode;
          if (parent && parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
          return null;
        },
        set: function(elem) {
          var parent = elem.parentNode;
          if (parent) {
            parent.selectedIndex;
            if (parent.parentNode) {
              parent.parentNode.selectedIndex;
            }
          }
        }
      };
    }
    jQuery3.each([
      "tabIndex",
      "readOnly",
      "maxLength",
      "cellSpacing",
      "cellPadding",
      "rowSpan",
      "colSpan",
      "useMap",
      "frameBorder",
      "contentEditable"
    ], function() {
      jQuery3.propFix[this.toLowerCase()] = this;
    });
    function stripAndCollapse(value) {
      var tokens = value.match(rnothtmlwhite) || [];
      return tokens.join(" ");
    }
    function getClass(elem) {
      return elem.getAttribute && elem.getAttribute("class") || "";
    }
    function classesToArray(value) {
      if (Array.isArray(value)) {
        return value;
      }
      if (typeof value === "string") {
        return value.match(rnothtmlwhite) || [];
      }
      return [];
    }
    jQuery3.fn.extend({
      addClass: function(value) {
        var classNames, cur, curValue, className, i2, finalValue;
        if (typeof value === "function") {
          return this.each(function(j) {
            jQuery3(this).addClass(value.call(this, j, getClass(this)));
          });
        }
        classNames = classesToArray(value);
        if (classNames.length) {
          return this.each(function() {
            curValue = getClass(this);
            cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
            if (cur) {
              for (i2 = 0; i2 < classNames.length; i2++) {
                className = classNames[i2];
                if (cur.indexOf(" " + className + " ") < 0) {
                  cur += className + " ";
                }
              }
              finalValue = stripAndCollapse(cur);
              if (curValue !== finalValue) {
                this.setAttribute("class", finalValue);
              }
            }
          });
        }
        return this;
      },
      removeClass: function(value) {
        var classNames, cur, curValue, className, i2, finalValue;
        if (typeof value === "function") {
          return this.each(function(j) {
            jQuery3(this).removeClass(value.call(this, j, getClass(this)));
          });
        }
        if (!arguments.length) {
          return this.attr("class", "");
        }
        classNames = classesToArray(value);
        if (classNames.length) {
          return this.each(function() {
            curValue = getClass(this);
            cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
            if (cur) {
              for (i2 = 0; i2 < classNames.length; i2++) {
                className = classNames[i2];
                while (cur.indexOf(" " + className + " ") > -1) {
                  cur = cur.replace(" " + className + " ", " ");
                }
              }
              finalValue = stripAndCollapse(cur);
              if (curValue !== finalValue) {
                this.setAttribute("class", finalValue);
              }
            }
          });
        }
        return this;
      },
      toggleClass: function(value, stateVal) {
        var classNames, className, i2, self;
        if (typeof value === "function") {
          return this.each(function(i3) {
            jQuery3(this).toggleClass(
              value.call(this, i3, getClass(this), stateVal),
              stateVal
            );
          });
        }
        if (typeof stateVal === "boolean") {
          return stateVal ? this.addClass(value) : this.removeClass(value);
        }
        classNames = classesToArray(value);
        if (classNames.length) {
          return this.each(function() {
            self = jQuery3(this);
            for (i2 = 0; i2 < classNames.length; i2++) {
              className = classNames[i2];
              if (self.hasClass(className)) {
                self.removeClass(className);
              } else {
                self.addClass(className);
              }
            }
          });
        }
        return this;
      },
      hasClass: function(selector) {
        var className, elem, i2 = 0;
        className = " " + selector + " ";
        while (elem = this[i2++]) {
          if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
            return true;
          }
        }
        return false;
      }
    });
    jQuery3.fn.extend({
      val: function(value) {
        var hooks, ret, valueIsFunction, elem = this[0];
        if (!arguments.length) {
          if (elem) {
            hooks = jQuery3.valHooks[elem.type] || jQuery3.valHooks[elem.nodeName.toLowerCase()];
            if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== void 0) {
              return ret;
            }
            ret = elem.value;
            return ret == null ? "" : ret;
          }
          return;
        }
        valueIsFunction = typeof value === "function";
        return this.each(function(i2) {
          var val;
          if (this.nodeType !== 1) {
            return;
          }
          if (valueIsFunction) {
            val = value.call(this, i2, jQuery3(this).val());
          } else {
            val = value;
          }
          if (val == null) {
            val = "";
          } else if (typeof val === "number") {
            val += "";
          } else if (Array.isArray(val)) {
            val = jQuery3.map(val, function(value2) {
              return value2 == null ? "" : value2 + "";
            });
          }
          hooks = jQuery3.valHooks[this.type] || jQuery3.valHooks[this.nodeName.toLowerCase()];
          if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === void 0) {
            this.value = val;
          }
        });
      }
    });
    jQuery3.extend({
      valHooks: {
        select: {
          get: function(elem) {
            var value, option, i2, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one", values = one ? null : [], max = one ? index + 1 : options.length;
            if (index < 0) {
              i2 = max;
            } else {
              i2 = one ? index : 0;
            }
            for (; i2 < max; i2++) {
              option = options[i2];
              if (option.selected && // Don't return options that are disabled or in a disabled optgroup
              !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
                value = jQuery3(option).val();
                if (one) {
                  return value;
                }
                values.push(value);
              }
            }
            return values;
          },
          set: function(elem, value) {
            var optionSet, option, options = elem.options, values = jQuery3.makeArray(value), i2 = options.length;
            while (i2--) {
              option = options[i2];
              if (option.selected = jQuery3.inArray(jQuery3(option).val(), values) > -1) {
                optionSet = true;
              }
            }
            if (!optionSet) {
              elem.selectedIndex = -1;
            }
            return values;
          }
        }
      }
    });
    if (isIE) {
      jQuery3.valHooks.option = {
        get: function(elem) {
          var val = elem.getAttribute("value");
          return val != null ? val : (
            // Support: IE <=10 - 11+
            // option.text throws exceptions (trac-14686, trac-14858)
            // Strip and collapse whitespace
            // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
            stripAndCollapse(jQuery3.text(elem))
          );
        }
      };
    }
    jQuery3.each(["radio", "checkbox"], function() {
      jQuery3.valHooks[this] = {
        set: function(elem, value) {
          if (Array.isArray(value)) {
            return elem.checked = jQuery3.inArray(jQuery3(elem).val(), value) > -1;
          }
        }
      };
    });
    var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, stopPropagationCallback = function(e) {
      e.stopPropagation();
    };
    jQuery3.extend(jQuery3.event, {
      trigger: function(event, data, elem, onlyHandlers) {
        var i2, cur, tmp, bubbleType, ontype, handle, special, lastElement, eventPath = [elem || document$1], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
        cur = lastElement = tmp = elem = elem || document$1;
        if (elem.nodeType === 3 || elem.nodeType === 8) {
          return;
        }
        if (rfocusMorph.test(type + jQuery3.event.triggered)) {
          return;
        }
        if (type.indexOf(".") > -1) {
          namespaces = type.split(".");
          type = namespaces.shift();
          namespaces.sort();
        }
        ontype = type.indexOf(":") < 0 && "on" + type;
        event = event[jQuery3.expando] ? event : new jQuery3.Event(type, typeof event === "object" && event);
        event.isTrigger = onlyHandlers ? 2 : 3;
        event.namespace = namespaces.join(".");
        event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
        event.result = void 0;
        if (!event.target) {
          event.target = elem;
        }
        data = data == null ? [event] : jQuery3.makeArray(data, [event]);
        special = jQuery3.event.special[type] || {};
        if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
          return;
        }
        if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
          bubbleType = special.delegateType || type;
          if (!rfocusMorph.test(bubbleType + type)) {
            cur = cur.parentNode;
          }
          for (; cur; cur = cur.parentNode) {
            eventPath.push(cur);
            tmp = cur;
          }
          if (tmp === (elem.ownerDocument || document$1)) {
            eventPath.push(tmp.defaultView || tmp.parentWindow || window2);
          }
        }
        i2 = 0;
        while ((cur = eventPath[i2++]) && !event.isPropagationStopped()) {
          lastElement = cur;
          event.type = i2 > 1 ? bubbleType : special.bindType || type;
          handle = (dataPriv.get(cur, "events") || /* @__PURE__ */ Object.create(null))[event.type] && dataPriv.get(cur, "handle");
          if (handle) {
            handle.apply(cur, data);
          }
          handle = ontype && cur[ontype];
          if (handle && handle.apply && acceptData(cur)) {
            event.result = handle.apply(cur, data);
            if (event.result === false) {
              event.preventDefault();
            }
          }
        }
        event.type = type;
        if (!onlyHandlers && !event.isDefaultPrevented()) {
          if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
            if (ontype && typeof elem[type] === "function" && !isWindow(elem)) {
              tmp = elem[ontype];
              if (tmp) {
                elem[ontype] = null;
              }
              jQuery3.event.triggered = type;
              if (event.isPropagationStopped()) {
                lastElement.addEventListener(type, stopPropagationCallback);
              }
              elem[type]();
              if (event.isPropagationStopped()) {
                lastElement.removeEventListener(type, stopPropagationCallback);
              }
              jQuery3.event.triggered = void 0;
              if (tmp) {
                elem[ontype] = tmp;
              }
            }
          }
        }
        return event.result;
      },
      // Piggyback on a donor event to simulate a different one
      // Used only for `focus(in | out)` events
      simulate: function(type, elem, event) {
        var e = jQuery3.extend(
          new jQuery3.Event(),
          event,
          {
            type,
            isSimulated: true
          }
        );
        jQuery3.event.trigger(e, null, elem);
      }
    });
    jQuery3.fn.extend({
      trigger: function(type, data) {
        return this.each(function() {
          jQuery3.event.trigger(type, data, this);
        });
      },
      triggerHandler: function(type, data) {
        var elem = this[0];
        if (elem) {
          return jQuery3.event.trigger(type, data, elem, true);
        }
      }
    });
    var location = window2.location;
    var nonce = { guid: Date.now() };
    var rquery = /\?/;
    jQuery3.parseXML = function(data) {
      var xml, parserErrorElem;
      if (!data || typeof data !== "string") {
        return null;
      }
      try {
        xml = new window2.DOMParser().parseFromString(data, "text/xml");
      } catch (e) {
      }
      parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
      if (!xml || parserErrorElem) {
        jQuery3.error("Invalid XML: " + (parserErrorElem ? jQuery3.map(parserErrorElem.childNodes, function(el) {
          return el.textContent;
        }).join("\n") : data));
      }
      return xml;
    };
    var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    function buildParams(prefix, obj, traditional, add) {
      var name;
      if (Array.isArray(obj)) {
        jQuery3.each(obj, function(i2, v) {
          if (traditional || rbracket.test(prefix)) {
            add(prefix, v);
          } else {
            buildParams(
              prefix + "[" + (typeof v === "object" && v != null ? i2 : "") + "]",
              v,
              traditional,
              add
            );
          }
        });
      } else if (!traditional && toType(obj) === "object") {
        for (name in obj) {
          buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
        }
      } else {
        add(prefix, obj);
      }
    }
    jQuery3.param = function(a, traditional) {
      var prefix, s = [], add = function(key, valueOrFunction) {
        var value = typeof valueOrFunction === "function" ? valueOrFunction() : valueOrFunction;
        s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
      };
      if (a == null) {
        return "";
      }
      if (Array.isArray(a) || a.jquery && !jQuery3.isPlainObject(a)) {
        jQuery3.each(a, function() {
          add(this.name, this.value);
        });
      } else {
        for (prefix in a) {
          buildParams(prefix, a[prefix], traditional, add);
        }
      }
      return s.join("&");
    };
    jQuery3.fn.extend({
      serialize: function() {
        return jQuery3.param(this.serializeArray());
      },
      serializeArray: function() {
        return this.map(function() {
          var elements = jQuery3.prop(this, "elements");
          return elements ? jQuery3.makeArray(elements) : this;
        }).filter(function() {
          var type = this.type;
          return this.name && !jQuery3(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
        }).map(function(_i, elem) {
          var val = jQuery3(this).val();
          if (val == null) {
            return null;
          }
          if (Array.isArray(val)) {
            return jQuery3.map(val, function(val2) {
              return { name: elem.name, value: val2.replace(rCRLF, "\r\n") };
            });
          }
          return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
        }).get();
      }
    });
    var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), originAnchor = document$1.createElement("a");
    originAnchor.href = location.href;
    function addToPrefiltersOrTransports(structure) {
      return function(dataTypeExpression, func) {
        if (typeof dataTypeExpression !== "string") {
          func = dataTypeExpression;
          dataTypeExpression = "*";
        }
        var dataType, i2 = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
        if (typeof func === "function") {
          while (dataType = dataTypes[i2++]) {
            if (dataType[0] === "+") {
              dataType = dataType.slice(1) || "*";
              (structure[dataType] = structure[dataType] || []).unshift(func);
            } else {
              (structure[dataType] = structure[dataType] || []).push(func);
            }
          }
        }
      };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
      var inspected = {}, seekingTransport = structure === transports;
      function inspect(dataType) {
        var selected;
        inspected[dataType] = true;
        jQuery3.each(structure[dataType] || [], function(_, prefilterOrFactory) {
          var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
          if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
            options.dataTypes.unshift(dataTypeOrTransport);
            inspect(dataTypeOrTransport);
            return false;
          } else if (seekingTransport) {
            return !(selected = dataTypeOrTransport);
          }
        });
        return selected;
      }
      return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
      var key, deep, flatOptions = jQuery3.ajaxSettings.flatOptions || {};
      for (key in src) {
        if (src[key] !== void 0) {
          (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
        }
      }
      if (deep) {
        jQuery3.extend(true, target, deep);
      }
      return target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
      var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
      while (dataTypes[0] === "*") {
        dataTypes.shift();
        if (ct === void 0) {
          ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
        }
      }
      if (ct) {
        for (type in contents) {
          if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break;
          }
        }
      }
      if (dataTypes[0] in responses) {
        finalDataType = dataTypes[0];
      } else {
        for (type in responses) {
          if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
            finalDataType = type;
            break;
          }
          if (!firstDataType) {
            firstDataType = type;
          }
        }
        finalDataType = finalDataType || firstDataType;
      }
      if (finalDataType) {
        if (finalDataType !== dataTypes[0]) {
          dataTypes.unshift(finalDataType);
        }
        return responses[finalDataType];
      }
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
      var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
      if (dataTypes[1]) {
        for (conv in s.converters) {
          converters[conv.toLowerCase()] = s.converters[conv];
        }
      }
      current = dataTypes.shift();
      while (current) {
        if (s.responseFields[current]) {
          jqXHR[s.responseFields[current]] = response;
        }
        if (!prev && isSuccess && s.dataFilter) {
          response = s.dataFilter(response, s.dataType);
        }
        prev = current;
        current = dataTypes.shift();
        if (current) {
          if (current === "*") {
            current = prev;
          } else if (prev !== "*" && prev !== current) {
            conv = converters[prev + " " + current] || converters["* " + current];
            if (!conv) {
              for (conv2 in converters) {
                tmp = conv2.split(" ");
                if (tmp[1] === current) {
                  conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                  if (conv) {
                    if (conv === true) {
                      conv = converters[conv2];
                    } else if (converters[conv2] !== true) {
                      current = tmp[0];
                      dataTypes.unshift(tmp[1]);
                    }
                    break;
                  }
                }
              }
            }
            if (conv !== true) {
              if (conv && s.throws) {
                response = conv(response);
              } else {
                try {
                  response = conv(response);
                } catch (e) {
                  return {
                    state: "parsererror",
                    error: conv ? e : "No conversion from " + prev + " to " + current
                  };
                }
              }
            }
          }
        }
      }
      return { state: "success", data: response };
    }
    jQuery3.extend({
      // Counter for holding the number of active queries
      active: 0,
      // Last-Modified header cache for next request
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: location.href,
        type: "GET",
        isLocal: rlocalProtocol.test(location.protocol),
        global: true,
        processData: true,
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        /*
        timeout: 0,
        data: null,
        dataType: null,
        username: null,
        password: null,
        cache: null,
        throws: false,
        traditional: false,
        headers: {},
        */
        accepts: {
          "*": allTypes,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript"
        },
        contents: {
          xml: /\bxml\b/,
          html: /\bhtml/,
          json: /\bjson\b/
        },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON"
        },
        // Data converters
        // Keys separate source (or catchall "*") and destination types with a single space
        converters: {
          // Convert anything to text
          "* text": String,
          // Text to html (true = no transformation)
          "text html": true,
          // Evaluate text as a json expression
          "text json": JSON.parse,
          // Parse text as xml
          "text xml": jQuery3.parseXML
        },
        // For options that shouldn't be deep extended:
        // you can add your own custom options here if
        // and when you create one that shouldn't be
        // deep extended (see ajaxExtend)
        flatOptions: {
          url: true,
          context: true
        }
      },
      // Creates a full fledged settings object into target
      // with both ajaxSettings and settings fields.
      // If target is omitted, writes into ajaxSettings.
      ajaxSetup: function(target, settings) {
        return settings ? (
          // Building a settings object
          ajaxExtend(ajaxExtend(target, jQuery3.ajaxSettings), settings)
        ) : (
          // Extending ajaxSettings
          ajaxExtend(jQuery3.ajaxSettings, target)
        );
      },
      ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
      ajaxTransport: addToPrefiltersOrTransports(transports),
      // Main method
      ajax: function(url, options) {
        if (typeof url === "object") {
          options = url;
          url = void 0;
        }
        options = options || {};
        var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed2, fireGlobals, i2, uncached, s = jQuery3.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery3(callbackContext) : jQuery3.event, deferred = jQuery3.Deferred(), completeDeferred = jQuery3.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, strAbort = "canceled", jqXHR = {
          readyState: 0,
          // Builds headers hashtable if needed
          getResponseHeader: function(key) {
            var match;
            if (completed2) {
              if (!responseHeaders) {
                responseHeaders = {};
                while (match = rheaders.exec(responseHeadersString)) {
                  responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
                }
              }
              match = responseHeaders[key.toLowerCase() + " "];
            }
            return match == null ? null : match.join(", ");
          },
          // Raw string
          getAllResponseHeaders: function() {
            return completed2 ? responseHeadersString : null;
          },
          // Caches the header
          setRequestHeader: function(name, value) {
            if (completed2 == null) {
              name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
              requestHeaders[name] = value;
            }
            return this;
          },
          // Overrides response content-type header
          overrideMimeType: function(type) {
            if (completed2 == null) {
              s.mimeType = type;
            }
            return this;
          },
          // Status-dependent callbacks
          statusCode: function(map) {
            var code;
            if (map) {
              if (completed2) {
                jqXHR.always(map[jqXHR.status]);
              } else {
                for (code in map) {
                  statusCode[code] = [statusCode[code], map[code]];
                }
              }
            }
            return this;
          },
          // Cancel the request
          abort: function(statusText) {
            var finalText = statusText || strAbort;
            if (transport) {
              transport.abort(finalText);
            }
            done2(0, finalText);
            return this;
          }
        };
        deferred.promise(jqXHR);
        s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");
        s.type = options.method || options.type || s.method || s.type;
        s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
        if (s.crossDomain == null) {
          urlAnchor = document$1.createElement("a");
          try {
            urlAnchor.href = s.url;
            urlAnchor.href = urlAnchor.href;
            s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
          } catch (e) {
            s.crossDomain = true;
          }
        }
        inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
        if (s.data && s.processData && typeof s.data !== "string") {
          s.data = jQuery3.param(s.data, s.traditional);
        }
        if (completed2) {
          return jqXHR;
        }
        fireGlobals = jQuery3.event && s.global;
        if (fireGlobals && jQuery3.active++ === 0) {
          jQuery3.event.trigger("ajaxStart");
        }
        s.type = s.type.toUpperCase();
        s.hasContent = !rnoContent.test(s.type);
        cacheURL = s.url.replace(rhash, "");
        if (!s.hasContent) {
          uncached = s.url.slice(cacheURL.length);
          if (s.data && (s.processData || typeof s.data === "string")) {
            cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
            delete s.data;
          }
          if (s.cache === false) {
            cacheURL = cacheURL.replace(rantiCache, "$1");
            uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
          }
          s.url = cacheURL + uncached;
        } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
          s.data = s.data.replace(r20, "+");
        }
        if (s.ifModified) {
          if (jQuery3.lastModified[cacheURL]) {
            jqXHR.setRequestHeader("If-Modified-Since", jQuery3.lastModified[cacheURL]);
          }
          if (jQuery3.etag[cacheURL]) {
            jqXHR.setRequestHeader("If-None-Match", jQuery3.etag[cacheURL]);
          }
        }
        if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
          jqXHR.setRequestHeader("Content-Type", s.contentType);
        }
        jqXHR.setRequestHeader(
          "Accept",
          s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]
        );
        for (i2 in s.headers) {
          jqXHR.setRequestHeader(i2, s.headers[i2]);
        }
        if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed2)) {
          return jqXHR.abort();
        }
        strAbort = "abort";
        completeDeferred.add(s.complete);
        jqXHR.done(s.success);
        jqXHR.fail(s.error);
        transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
        if (!transport) {
          done2(-1, "No Transport");
        } else {
          jqXHR.readyState = 1;
          if (fireGlobals) {
            globalEventContext.trigger("ajaxSend", [jqXHR, s]);
          }
          if (completed2) {
            return jqXHR;
          }
          if (s.async && s.timeout > 0) {
            timeoutTimer = window2.setTimeout(function() {
              jqXHR.abort("timeout");
            }, s.timeout);
          }
          try {
            completed2 = false;
            transport.send(requestHeaders, done2);
          } catch (e) {
            if (completed2) {
              throw e;
            }
            done2(-1, e);
          }
        }
        function done2(status, nativeStatusText, responses, headers) {
          var isSuccess, success, error, response, modified, statusText = nativeStatusText;
          if (completed2) {
            return;
          }
          completed2 = true;
          if (timeoutTimer) {
            window2.clearTimeout(timeoutTimer);
          }
          transport = void 0;
          responseHeadersString = headers || "";
          jqXHR.readyState = status > 0 ? 4 : 0;
          isSuccess = status >= 200 && status < 300 || status === 304;
          if (responses) {
            response = ajaxHandleResponses(s, jqXHR, responses);
          }
          if (!isSuccess && jQuery3.inArray("script", s.dataTypes) > -1 && jQuery3.inArray("json", s.dataTypes) < 0) {
            s.converters["text script"] = function() {
            };
          }
          response = ajaxConvert(s, response, jqXHR, isSuccess);
          if (isSuccess) {
            if (s.ifModified) {
              modified = jqXHR.getResponseHeader("Last-Modified");
              if (modified) {
                jQuery3.lastModified[cacheURL] = modified;
              }
              modified = jqXHR.getResponseHeader("etag");
              if (modified) {
                jQuery3.etag[cacheURL] = modified;
              }
            }
            if (status === 204 || s.type === "HEAD") {
              statusText = "nocontent";
            } else if (status === 304) {
              statusText = "notmodified";
            } else {
              statusText = response.state;
              success = response.data;
              error = response.error;
              isSuccess = !error;
            }
          } else {
            error = statusText;
            if (status || !statusText) {
              statusText = "error";
              if (status < 0) {
                status = 0;
              }
            }
          }
          jqXHR.status = status;
          jqXHR.statusText = (nativeStatusText || statusText) + "";
          if (isSuccess) {
            deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
          } else {
            deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
          }
          jqXHR.statusCode(statusCode);
          statusCode = void 0;
          if (fireGlobals) {
            globalEventContext.trigger(
              isSuccess ? "ajaxSuccess" : "ajaxError",
              [jqXHR, s, isSuccess ? success : error]
            );
          }
          completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
          if (fireGlobals) {
            globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
            if (!--jQuery3.active) {
              jQuery3.event.trigger("ajaxStop");
            }
          }
        }
        return jqXHR;
      },
      getJSON: function(url, data, callback) {
        return jQuery3.get(url, data, callback, "json");
      },
      getScript: function(url, callback) {
        return jQuery3.get(url, void 0, callback, "script");
      }
    });
    jQuery3.each(["get", "post"], function(_i, method) {
      jQuery3[method] = function(url, data, callback, type) {
        if (typeof data === "function" || data === null) {
          type = type || callback;
          callback = data;
          data = void 0;
        }
        return jQuery3.ajax(jQuery3.extend({
          url,
          type: method,
          dataType: type,
          data,
          success: callback
        }, jQuery3.isPlainObject(url) && url));
      };
    });
    jQuery3.ajaxPrefilter(function(s) {
      var i2;
      for (i2 in s.headers) {
        if (i2.toLowerCase() === "content-type") {
          s.contentType = s.headers[i2] || "";
        }
      }
    });
    jQuery3._evalUrl = function(url, options, doc) {
      return jQuery3.ajax({
        url,
        // Make this explicit, since user can override this through ajaxSetup (trac-11264)
        type: "GET",
        dataType: "script",
        cache: true,
        async: false,
        global: false,
        scriptAttrs: options.crossOrigin ? { "crossOrigin": options.crossOrigin } : void 0,
        // Only evaluate the response if it is successful (gh-4126)
        // dataFilter is not invoked for failure responses, so using it instead
        // of the default converter is kludgy but it works.
        converters: {
          "text script": function() {
          }
        },
        dataFilter: function(response) {
          jQuery3.globalEval(response, options, doc);
        }
      });
    };
    jQuery3.fn.extend({
      wrapAll: function(html) {
        var wrap;
        if (this[0]) {
          if (typeof html === "function") {
            html = html.call(this[0]);
          }
          wrap = jQuery3(html, this[0].ownerDocument).eq(0).clone(true);
          if (this[0].parentNode) {
            wrap.insertBefore(this[0]);
          }
          wrap.map(function() {
            var elem = this;
            while (elem.firstElementChild) {
              elem = elem.firstElementChild;
            }
            return elem;
          }).append(this);
        }
        return this;
      },
      wrapInner: function(html) {
        if (typeof html === "function") {
          return this.each(function(i2) {
            jQuery3(this).wrapInner(html.call(this, i2));
          });
        }
        return this.each(function() {
          var self = jQuery3(this), contents = self.contents();
          if (contents.length) {
            contents.wrapAll(html);
          } else {
            self.append(html);
          }
        });
      },
      wrap: function(html) {
        var htmlIsFunction = typeof html === "function";
        return this.each(function(i2) {
          jQuery3(this).wrapAll(htmlIsFunction ? html.call(this, i2) : html);
        });
      },
      unwrap: function(selector) {
        this.parent(selector).not("body").each(function() {
          jQuery3(this).replaceWith(this.childNodes);
        });
        return this;
      }
    });
    jQuery3.expr.pseudos.hidden = function(elem) {
      return !jQuery3.expr.pseudos.visible(elem);
    };
    jQuery3.expr.pseudos.visible = function(elem) {
      return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    };
    jQuery3.ajaxSettings.xhr = function() {
      return new window2.XMLHttpRequest();
    };
    var xhrSuccessStatus = {
      // File protocol always yields status code 0, assume 200
      0: 200
    };
    jQuery3.ajaxTransport(function(options) {
      var callback;
      return {
        send: function(headers, complete) {
          var i2, xhr = options.xhr();
          xhr.open(
            options.type,
            options.url,
            options.async,
            options.username,
            options.password
          );
          if (options.xhrFields) {
            for (i2 in options.xhrFields) {
              xhr[i2] = options.xhrFields[i2];
            }
          }
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          }
          if (!options.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          }
          for (i2 in headers) {
            xhr.setRequestHeader(i2, headers[i2]);
          }
          callback = function(type) {
            return function() {
              if (callback) {
                callback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = null;
                if (type === "abort") {
                  xhr.abort();
                } else if (type === "error") {
                  complete(
                    // File: protocol always yields status 0; see trac-8605, trac-14207
                    xhr.status,
                    xhr.statusText
                  );
                } else {
                  complete(
                    xhrSuccessStatus[xhr.status] || xhr.status,
                    xhr.statusText,
                    // For XHR2 non-text, let the caller handle it (gh-2498)
                    (xhr.responseType || "text") === "text" ? { text: xhr.responseText } : { binary: xhr.response },
                    xhr.getAllResponseHeaders()
                  );
                }
              }
            };
          };
          xhr.onload = callback();
          xhr.onabort = xhr.onerror = xhr.ontimeout = callback("error");
          callback = callback("abort");
          try {
            xhr.send(options.hasContent && options.data || null);
          } catch (e) {
            if (callback) {
              throw e;
            }
          }
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    });
    function canUseScriptTag(s) {
      return s.scriptAttrs || !s.headers && (s.crossDomain || // When dealing with JSONP (`s.dataTypes` include "json" then)
      // don't use a script tag so that error responses still may have
      // `responseJSON` set. Continue using a script tag for JSONP requests that:
      //   * are cross-domain as AJAX requests won't work without a CORS setup
      //   * have `scriptAttrs` set as that's a script-only functionality
      // Note that this means JSONP requests violate strict CSP script-src settings.
      // A proper solution is to migrate from using JSONP to a CORS setup.
      s.async && jQuery3.inArray("json", s.dataTypes) < 0);
    }
    jQuery3.ajaxSetup({
      accepts: {
        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
      },
      converters: {
        "text script": function(text) {
          jQuery3.globalEval(text);
          return text;
        }
      }
    });
    jQuery3.ajaxPrefilter("script", function(s) {
      if (s.cache === void 0) {
        s.cache = false;
      }
      if (canUseScriptTag(s)) {
        s.type = "GET";
      }
    });
    jQuery3.ajaxTransport("script", function(s) {
      if (canUseScriptTag(s)) {
        var script, callback;
        return {
          send: function(_, complete) {
            script = jQuery3("<script>").attr(s.scriptAttrs || {}).prop({ charset: s.scriptCharset, src: s.url }).on("load error", callback = function(evt) {
              script.remove();
              callback = null;
              if (evt) {
                complete(evt.type === "error" ? 404 : 200, evt.type);
              }
            });
            document$1.head.appendChild(script[0]);
          },
          abort: function() {
            if (callback) {
              callback();
            }
          }
        };
      }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery3.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function() {
        var callback = oldCallbacks.pop() || jQuery3.expando + "_" + nonce.guid++;
        this[callback] = true;
        return callback;
      }
    });
    jQuery3.ajaxPrefilter("jsonp", function(s, originalSettings, jqXHR) {
      var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
      callbackName = s.jsonpCallback = typeof s.jsonpCallback === "function" ? s.jsonpCallback() : s.jsonpCallback;
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      }
      s.converters["script json"] = function() {
        if (!responseContainer) {
          jQuery3.error(callbackName + " was not called");
        }
        return responseContainer[0];
      };
      s.dataTypes[0] = "json";
      overwritten = window2[callbackName];
      window2[callbackName] = function() {
        responseContainer = arguments;
      };
      jqXHR.always(function() {
        if (overwritten === void 0) {
          jQuery3(window2).removeProp(callbackName);
        } else {
          window2[callbackName] = overwritten;
        }
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName);
        }
        if (responseContainer && typeof overwritten === "function") {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = void 0;
      });
      return "script";
    });
    jQuery3.ajaxPrefilter(function(s, origOptions) {
      if (typeof s.data !== "string" && !jQuery3.isPlainObject(s.data) && !Array.isArray(s.data) && // Don't disable data processing if explicitly set by the user.
      !("processData" in origOptions)) {
        s.processData = false;
      }
      if (s.data instanceof window2.FormData) {
        s.contentType = false;
      }
    });
    jQuery3.parseHTML = function(data, context, keepScripts) {
      if (typeof data !== "string" && !isObviousHtml(data + "")) {
        return [];
      }
      if (typeof context === "boolean") {
        keepScripts = context;
        context = false;
      }
      var parsed, scripts;
      if (!context) {
        context = new window2.DOMParser().parseFromString("", "text/html");
      }
      parsed = rsingleTag.exec(data);
      scripts = !keepScripts && [];
      if (parsed) {
        return [context.createElement(parsed[1])];
      }
      parsed = buildFragment([data], context, scripts);
      if (scripts && scripts.length) {
        jQuery3(scripts).remove();
      }
      return jQuery3.merge([], parsed.childNodes);
    };
    jQuery3.fn.load = function(url, params, callback) {
      var selector, type, response, self = this, off = url.indexOf(" ");
      if (off > -1) {
        selector = stripAndCollapse(url.slice(off));
        url = url.slice(0, off);
      }
      if (typeof params === "function") {
        callback = params;
        params = void 0;
      } else if (params && typeof params === "object") {
        type = "POST";
      }
      if (self.length > 0) {
        jQuery3.ajax({
          url,
          // If "type" variable is undefined, then "GET" method will be used.
          // Make value of this field explicit since
          // user can override it through ajaxSetup method
          type: type || "GET",
          dataType: "html",
          data: params
        }).done(function(responseText) {
          response = arguments;
          self.html(selector ? (
            // If a selector was specified, locate the right elements in a dummy div
            // Exclude scripts to avoid IE 'Permission Denied' errors
            jQuery3("<div>").append(jQuery3.parseHTML(responseText)).find(selector)
          ) : (
            // Otherwise use the full result
            responseText
          ));
        }).always(callback && function(jqXHR, status) {
          self.each(function() {
            callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
          });
        });
      }
      return this;
    };
    jQuery3.expr.pseudos.animated = function(elem) {
      return jQuery3.grep(jQuery3.timers, function(fn) {
        return elem === fn.elem;
      }).length;
    };
    jQuery3.offset = {
      setOffset: function(elem, options, i2) {
        var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery3.css(elem, "position"), curElem = jQuery3(elem), props = {};
        if (position === "static") {
          elem.style.position = "relative";
        }
        curOffset = curElem.offset();
        curCSSTop = jQuery3.css(elem, "top");
        curCSSLeft = jQuery3.css(elem, "left");
        calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
        if (calculatePosition) {
          curPosition = curElem.position();
          curTop = curPosition.top;
          curLeft = curPosition.left;
        } else {
          curTop = parseFloat(curCSSTop) || 0;
          curLeft = parseFloat(curCSSLeft) || 0;
        }
        if (typeof options === "function") {
          options = options.call(elem, i2, jQuery3.extend({}, curOffset));
        }
        if (options.top != null) {
          props.top = options.top - curOffset.top + curTop;
        }
        if (options.left != null) {
          props.left = options.left - curOffset.left + curLeft;
        }
        if ("using" in options) {
          options.using.call(elem, props);
        } else {
          curElem.css(props);
        }
      }
    };
    jQuery3.fn.extend({
      // offset() relates an element's border box to the document origin
      offset: function(options) {
        if (arguments.length) {
          return options === void 0 ? this : this.each(function(i2) {
            jQuery3.offset.setOffset(this, options, i2);
          });
        }
        var rect, win, elem = this[0];
        if (!elem) {
          return;
        }
        if (!elem.getClientRects().length) {
          return { top: 0, left: 0 };
        }
        rect = elem.getBoundingClientRect();
        win = elem.ownerDocument.defaultView;
        return {
          top: rect.top + win.pageYOffset,
          left: rect.left + win.pageXOffset
        };
      },
      // position() relates an element's margin box to its offset parent's padding box
      // This corresponds to the behavior of CSS absolute positioning
      position: function() {
        if (!this[0]) {
          return;
        }
        var offsetParent, offset, doc, elem = this[0], parentOffset = { top: 0, left: 0 };
        if (jQuery3.css(elem, "position") === "fixed") {
          offset = elem.getBoundingClientRect();
        } else {
          offset = this.offset();
          doc = elem.ownerDocument;
          offsetParent = elem.offsetParent || doc.documentElement;
          while (offsetParent && offsetParent !== doc.documentElement && jQuery3.css(offsetParent, "position") === "static") {
            offsetParent = offsetParent.offsetParent || doc.documentElement;
          }
          if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 && jQuery3.css(offsetParent, "position") !== "static") {
            parentOffset = jQuery3(offsetParent).offset();
            parentOffset.top += jQuery3.css(offsetParent, "borderTopWidth", true);
            parentOffset.left += jQuery3.css(offsetParent, "borderLeftWidth", true);
          }
        }
        return {
          top: offset.top - parentOffset.top - jQuery3.css(elem, "marginTop", true),
          left: offset.left - parentOffset.left - jQuery3.css(elem, "marginLeft", true)
        };
      },
      // This method will return documentElement in the following cases:
      // 1) For the element inside the iframe without offsetParent, this method will return
      //    documentElement of the parent window
      // 2) For the hidden or detached element
      // 3) For body or html element, i.e. in case of the html node - it will return itself
      //
      // but those exceptions were never presented as a real life use-cases
      // and might be considered as more preferable results.
      //
      // This logic, however, is not guaranteed and can change at any point in the future
      offsetParent: function() {
        return this.map(function() {
          var offsetParent = this.offsetParent;
          while (offsetParent && jQuery3.css(offsetParent, "position") === "static") {
            offsetParent = offsetParent.offsetParent;
          }
          return offsetParent || documentElement$1;
        });
      }
    });
    jQuery3.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(method, prop) {
      var top = "pageYOffset" === prop;
      jQuery3.fn[method] = function(val) {
        return access(this, function(elem, method2, val2) {
          var win;
          if (isWindow(elem)) {
            win = elem;
          } else if (elem.nodeType === 9) {
            win = elem.defaultView;
          }
          if (val2 === void 0) {
            return win ? win[prop] : elem[method2];
          }
          if (win) {
            win.scrollTo(
              !top ? val2 : win.pageXOffset,
              top ? val2 : win.pageYOffset
            );
          } else {
            elem[method2] = val2;
          }
        }, method, val, arguments.length);
      };
    });
    jQuery3.each({ Height: "height", Width: "width" }, function(name, type) {
      jQuery3.each({
        padding: "inner" + name,
        content: type,
        "": "outer" + name
      }, function(defaultExtra, funcName) {
        jQuery3.fn[funcName] = function(margin, value) {
          var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
          return access(this, function(elem, type2, value2) {
            var doc;
            if (isWindow(elem)) {
              return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
            }
            if (elem.nodeType === 9) {
              doc = elem.documentElement;
              return Math.max(
                elem.body["scroll" + name],
                doc["scroll" + name],
                elem.body["offset" + name],
                doc["offset" + name],
                doc["client" + name]
              );
            }
            return value2 === void 0 ? (
              // Get width or height on the element, requesting but not forcing parseFloat
              jQuery3.css(elem, type2, extra)
            ) : (
              // Set width or height on the element
              jQuery3.style(elem, type2, value2, extra)
            );
          }, type, chainable ? margin : void 0, chainable);
        };
      });
    });
    jQuery3.each([
      "ajaxStart",
      "ajaxStop",
      "ajaxComplete",
      "ajaxError",
      "ajaxSuccess",
      "ajaxSend"
    ], function(_i, type) {
      jQuery3.fn[type] = function(fn) {
        return this.on(type, fn);
      };
    });
    jQuery3.fn.extend({
      bind: function(types, data, fn) {
        return this.on(types, null, data, fn);
      },
      unbind: function(types, fn) {
        return this.off(types, null, fn);
      },
      delegate: function(selector, types, data, fn) {
        return this.on(types, selector, data, fn);
      },
      undelegate: function(selector, types, fn) {
        return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
      },
      hover: function(fnOver, fnOut) {
        return this.on("mouseenter", fnOver).on("mouseleave", fnOut || fnOver);
      }
    });
    jQuery3.each(
      "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),
      function(_i, name) {
        jQuery3.fn[name] = function(data, fn) {
          return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
      }
    );
    jQuery3.proxy = function(fn, context) {
      var tmp, args, proxy;
      if (typeof context === "string") {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      if (typeof fn !== "function") {
        return void 0;
      }
      args = slice.call(arguments, 2);
      proxy = function() {
        return fn.apply(context || this, args.concat(slice.call(arguments)));
      };
      proxy.guid = fn.guid = fn.guid || jQuery3.guid++;
      return proxy;
    };
    jQuery3.holdReady = function(hold) {
      if (hold) {
        jQuery3.readyWait++;
      } else {
        jQuery3.ready(true);
      }
    };
    jQuery3.expr[":"] = jQuery3.expr.filters = jQuery3.expr.pseudos;
    if (typeof define === "function" && define.amd) {
      define("jquery", [], function() {
        return jQuery3;
      });
    }
    var _jQuery = window2.jQuery, _$ = window2.$;
    jQuery3.noConflict = function(deep) {
      if (window2.$ === jQuery3) {
        window2.$ = _$;
      }
      if (deep && window2.jQuery === jQuery3) {
        window2.jQuery = _jQuery;
      }
      return jQuery3;
    };
    if (typeof noGlobal === "undefined") {
      window2.jQuery = window2.$ = jQuery3;
    }
    return jQuery3;
  }
  var jQuery2 = jQueryFactory(window, true);
  var jquery_module_default = jQuery2;

  // style.css
  var style_default = `/* Beholder extension \u2014 settings drawer + floating state panel + paper-doll mode
   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Design system: "Tactical Codex" \u2014 refined editorial dark-mode UI.
   - Cinzel for headings (panel title, char name) \u2014 engraved nameplate feel
   - JetBrains Mono for data labels (slot names, drawer section caps, gauges)
   - Body inherits host font
   - Type/space/color tokens declared on .beholder-panel \u2193
   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

@import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=JetBrains+Mono:wght@500;600&display=swap");


/* Settings drawer \u2014 grouped sections with helper text. */
#beholder_settings small.opacity50p {
    display: block;
    margin-top: 6px;
    opacity: 0.6;
    font-size: 0.85em;
}
.bh-settings-main-toggle {
    padding: 6px 8px;
    margin-bottom: 6px;
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
}
.bh-settings-section {
    margin: 8px 0;
    padding: 0;
    border: 1px solid var(--SmartThemeBorderColor, rgba(255, 255, 255, 0.08));
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.015);
}
.bh-settings-section > summary {
    cursor: pointer;
    padding: 7px 10px;
    list-style: none;
    user-select: none;
    font-size: 0.95em;
    border-radius: 6px;
    position: relative;
    padding-right: 24px;
}
.bh-settings-section > summary::-webkit-details-marker { display: none; }
.bh-settings-section > summary::after {
    content: "\u203A";
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
    transition: transform 0.18s;
    opacity: 0.5;
    font-size: 1.2em;
}
.bh-settings-section[open] > summary::after {
    transform: translateY(-50%) rotate(90deg);
}
.bh-settings-section > summary b { color: var(--SmartThemeEmColor, #ffeaa7); }
.bh-settings-body {
    padding: 0 10px 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.bh-settings-body label:not(.checkbox_label) {
    font-size: 0.88em;
    opacity: 0.85;
    margin-top: 6px;
}
.bh-settings-body .checkbox_label { margin-top: 6px; }
.bh-help {
    display: block;
    margin-top: 2px;
    margin-bottom: 4px;
    opacity: 0.55;
    font-size: 0.78em;
    line-height: 1.4;
}
.bh-help-inline {
    margin-left: 4px;
    opacity: 0.6;
    font-size: 0.85em;
    font-weight: normal;
    font-style: italic;
}
.bh-help code,
.bh-settings-body code {
    background: rgba(255, 255, 255, 0.06);
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 0.92em;
}
.bh-settings-buttons {
    gap: 6px;
    margin-top: 8px;
}

/* \u2500\u2500\u2500 Floating state panel \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.beholder-panel {
    position: fixed;
    z-index: 9000;
    width: min(420px, calc(100vw - 40px));
    max-height: 86vh;
    min-width: 240px;
    min-height: 180px;
    /* Fixed-width panel (no resize). Container queries below auto-switch
       to the single-column list layout when the panel is narrow. */
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: var(--SmartThemeBlurTintColor, rgba(20, 20, 24, 0.92));
    color: var(--SmartThemeBodyColor, #e0e0e0);
    border: 1px solid var(--SmartThemeBorderColor, rgba(255, 255, 255, 0.15));
    border-radius: 12px;
    box-shadow:
        0 1px 0 rgba(255, 255, 255, 0.05) inset,
        0 12px 40px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    user-select: none;

    /* \u2500\u2500\u2500\u2500\u2500\u2500 DESIGN TOKENS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
       Every panel-scoped value should reference one of these. Adding a
       new font-size or padding without a token is a design-system bug. */

    /* Master scale knob. Bumps the whole panel proportionally. Slot cards
       cancel this out (font-size: 1em / --bh-ui-scale) to keep their
       content density stable while the surrounding chrome breathes. */
    --bh-ui-scale: 1.1;
    font-size: calc(0.875em * var(--bh-ui-scale));

    /* Type ramp (em, relative to panel base). Five steps, named by role \u2014
       NOT by size. Use the role, not the number, when picking. */
    --bh-text-meta:      0.78em;   /* slot caps, POV hint, tab pulse */
    --bh-text-secondary: 0.875em;  /* species, gauge label, drawer hint */
    --bh-text-body:      1em;      /* chips, tabs, drawer buttons */
    --bh-text-large:     1.143em;  /* panel title, gauge value, drawer focus */
    --bh-text-display:   1.357em;  /* char name */

    /* Font families. Scoped via \`font-family: var(--bh-font-display)\` etc.
       so the host site's body font keeps governing default text \u2014 these
       only apply where we explicitly opt in. */
    --bh-font-display: "Cinzel", "Trajan Pro", "Georgia", serif;
    --bh-font-data:    "JetBrains Mono", "SF Mono", "Menlo", "Consolas", monospace;

    /* Spacing scale \u2014 multiples of 4. Em-based so it co-scales with the type. */
    --bh-space-1: 0.286em;   /*  4px @ 14px base */
    --bh-space-2: 0.571em;   /*  8px */
    --bh-space-3: 0.857em;   /* 12px */
    --bh-space-4: 1.143em;   /* 16px */
    --bh-space-5: 1.714em;   /* 24px */

    /* Color roles \u2014 neutrals layered over the host theme background. Used
       for elevated/inset surfaces and divider strengths. */
    --bh-surface-1: rgba(255, 255, 255, 0.025);  /* inset (drawer, gauge bg) */
    --bh-surface-2: rgba(255, 255, 255, 0.05);   /* elevated (header, hover) */
    --bh-surface-3: rgba(255, 255, 255, 0.085);  /* pressed / active control */
    --bh-divider:   rgba(255, 255, 255, 0.08);   /* hairline dividers */
    --bh-border:    rgba(255, 255, 255, 0.18);   /* control borders, focus */

    /* Opacity roles \u2014 apply via opacity: var(...) for consistent muting. */
    --bh-mute-strong: 0.45;  /* meta, POV hint */
    --bh-mute-soft:   0.7;   /* secondary text */
    --bh-mute-none:   1;     /* primary */
}
/* When user has manually resized, drop the max-height cap so their size sticks. */
.beholder-panel[data-resized="true"] {
    max-height: none;
}

/* (Legacy data-mode rules removed \u2014 only one layout now. Mobile is
   handled via @container query below.) */

/* No tracked state renders a full-size default-human placeholder (same width +
   chrome as a populated panel) so the extension shows at its real size on first
   open, with all header tools visible. data-empty only mutes the placeholder
   name + caption and drops its interactive view controls (it's visual-only
   until real state arrives). */
.beholder-panel[data-empty="true"] .bh-char-name {
    opacity: 0.4;
}
.beholder-panel[data-empty="true"] .bh-figure-controls {
    display: none;
}
.bh-placeholder-note {
    margin: 14px 14px 6px;
    padding: 10px 14px;
    text-align: center;
    font-size: var(--bh-text-secondary);
    line-height: 1.5;
    color: var(--bh-gold, #ffeaa7);
    background: linear-gradient(160deg, rgba(201, 165, 90, 0.14), rgba(201, 165, 90, 0.04));
    border: 1px solid rgba(201, 165, 90, 0.4);
    border-radius: 8px;
}
.bh-placeholder-note b { color: #f3e3b8; font-weight: 600; }

/* Note/intent bar mounted above the chat input: input grows, the apply button
   sits to its right (not stacked under). */
.beholder-notebox {
    display: flex;
    gap: var(--bh-space-2, 6px);
    align-items: stretch;
    margin: 4px 0;
}
.beholder-notebox .beholder-notebox-input { flex: 1 1 auto; min-width: 0; }
.beholder-notebox .beholder-notebox-btn { flex: 0 0 auto; }

.beholder-panel.beholder-dragging {
    opacity: 0.85;
}

.beholder-panel-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--bh-space-2) var(--bh-space-3);
    background: var(--bh-surface-2);
    border-bottom: 1px solid var(--bh-divider);
    cursor: move;
}
/* Hairline accent rule across the top of the header \u2014 quiet brand mark.
   Fades in from the left edge so the panel feels "anchored" on its left side. */
.beholder-panel-header::before {
    content: "";
    position: absolute;
    left: 0; right: 0; top: 0;
    height: 1px;
    background: linear-gradient(
        90deg,
        var(--bh-accent, #c9a55a) 0%,
        rgba(201, 165, 90, 0.4) 22%,
        transparent 60%
    );
    pointer-events: none;
    opacity: 0.7;
}
.beholder-panel-title {
    font-family: var(--bh-font-display);
    font-size: var(--bh-text-large);
    font-weight: 600;
    letter-spacing: 0.12em;
    color: var(--SmartThemeBodyColor, #e8eaee);
}

.beholder-panel-controls {
    display: flex;
    gap: var(--bh-space-2);
    font-size: var(--bh-text-body);
    flex-wrap: wrap;
    justify-content: flex-end;
}

.beholder-panel-controls .fa-solid,
.beholder-tool-btn {
    cursor: pointer;
    opacity: var(--bh-mute-soft);
    transition: opacity 0.15s, color 0.15s, transform 0.15s;
}
/* Header tool icons + active control bump slightly larger than the
   backfill chevrons so the tool row reads as the primary actions. */
.beholder-panel-controls .fa-solid,
.beholder-tool-btn { font-size: 1.08em; padding: 4px; }
.beholder-panel-controls .fa-solid:hover {
    opacity: 1;
    color: var(--bh-accent, #c9a55a);
}
.beholder-panel-controls .fa-solid:active {
    transform: scale(0.92);
}

/* \u2500\u2500\u2500 Layer bar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Sits directly under the header as a permanent control strip. Reads like
   the legend row on a vintage anatomical chart: hairline divider above and
   below, JetBrains Mono small-caps labels, a thin "engagement bar" beneath
   each active layer instead of a chunky fill. Off layers fade to mute-strong
   so the user can see at a glance which dimensions of the state are hidden.

   Disengaged label gets a thin double-strike instead of an underline \u2014 a
   subtle "redacted" cue that echoes editorial typography.                   */
.beholder-layer-bar {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    padding: var(--bh-space-1) var(--bh-space-3) calc(var(--bh-space-1) + 1px);
    background: var(--bh-surface-1);
    border-bottom: 1px solid var(--bh-divider);
    position: relative;
}
/* Bracket marks at both ends, the way an instrument bezel anchors a scale. */
.beholder-layer-bar::before,
.beholder-layer-bar::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 4px;
    height: 9px;
    border: 1px solid var(--bh-divider);
    transform: translateY(-50%);
    pointer-events: none;
}
.beholder-layer-bar::before { left: var(--bh-space-2); border-right: none;  }
.beholder-layer-bar::after  { right: var(--bh-space-2); border-left:  none; }

.bh-layer-cell {
    position: relative;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--bh-space-1) 0 calc(var(--bh-space-1) + 2px);
    min-width: 0;
}
.bh-layer-cell input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}
.bh-layer-cell span {
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-meta);
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--bh-body);
    opacity: var(--bh-mute-strong);
    line-height: 1;
    text-align: center;
    transition: opacity 0.12s ease, color 0.12s ease, letter-spacing 0.12s ease;
    position: relative;
    padding: 1px 2px 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
}
/* Disengaged: a thin overstrike line through the label \u2014 editorial "redacted"
   cue, gentler than strikethrough. Drawn as a pseudo-element so it doesn't
   shift typographic metrics. */
.bh-layer-cell span::before {
    content: "";
    position: absolute;
    left: 8%; right: 8%;
    top: calc(50% - 1px);
    height: 1px;
    background: currentColor;
    opacity: 0.35;
    transition: opacity 0.12s ease, transform 0.12s ease;
    transform-origin: center;
}
/* Engagement bar \u2014 the "instrument" cue. Sits beneath the label, drawn as
   the cell's own pseudo so it tracks cell width, not text width. */
.bh-layer-cell::after {
    content: "";
    position: absolute;
    left: 18%; right: 18%;
    bottom: 0;
    height: 2px;
    background: var(--bh-accent, #c9a55a);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.18s ease, opacity 0.18s ease;
    opacity: 0;
}
.bh-layer-cell:hover span {
    opacity: var(--bh-mute-none);
    color: var(--bh-accent, #c9a55a);
}
.bh-layer-cell:hover span::before { opacity: 0; }
.bh-layer-cell:hover::after {
    transform: scaleX(0.55);
    opacity: 0.55;
}
.bh-layer-cell input:checked + span {
    opacity: var(--bh-mute-none);
    color: var(--SmartThemeBodyColor, #e8eaee);
    letter-spacing: 0.26em;        /* fractionally widens \u2014 "tuned in" */
}
.bh-layer-cell input:checked + span::before { opacity: 0; }
.bh-layer-cell:has(input:checked)::after {
    transform: scaleX(1);
    opacity: 1;
}
.bh-layer-cell input:focus-visible + span {
    outline: 1px dashed var(--bh-accent);
    outline-offset: 3px;
}

/* Narrow container: tighten letter-spacing so labels still fit on 4 cells. */
@container bhpanel (max-width: 320px) {
    .bh-layer-cell span { letter-spacing: 0.14em; font-size: 0.72em; }
    .bh-layer-cell input:checked + span { letter-spacing: 0.18em; }
}

.beholder-panel-body {
    padding: var(--bh-space-3) var(--bh-space-3) var(--bh-space-4);
    overflow-y: auto;
    /* Vertical scrolls; horizontal is CLIPPED (never spills past the panel border).
       \`clip\` (not \`hidden\`) adds no scrollbar and composes with overflow-y:auto. The
       grid/wrap fixes above make content FIT; this is the belt-and-suspenders so a
       stray wide card can never poke over the right edge again. */
    overflow-x: clip;
    flex: 1;
    /* Subtle scrollbar tuning to feel integrated rather than borrowed. */
    scrollbar-width: thin;
    scrollbar-color: var(--bh-border) transparent;
}
.beholder-panel-body::-webkit-scrollbar { width: 6px; }
.beholder-panel-body::-webkit-scrollbar-track { background: transparent; }
.beholder-panel-body::-webkit-scrollbar-thumb {
    background: var(--bh-border);
    border-radius: 3px;
}


.bh-empty-text {
    color: var(--SmartThemeBodyColor, #888);
    opacity: var(--bh-mute-soft);
    text-align: center;
    padding: var(--bh-space-2) 0;
    font-size: var(--bh-text-secondary);
    font-style: italic;
}

/* \u2500\u2500\u2500 Compact mode (legacy text list) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.beholder-char {
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px dashed var(--SmartThemeBorderColor, rgba(255, 255, 255, 0.08));
}
.beholder-char:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.beholder-char-name {
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--SmartThemeEmColor, #ffeaa7);
}
.beholder-species {
    font-weight: normal;
    opacity: 0.5;
    font-size: 0.85em;
    margin-left: 6px;
}
.beholder-row { line-height: 1.5; word-wrap: break-word; }
.beholder-label {
    display: inline-block;
    min-width: 60px;
    opacity: 0.55;
    font-size: 0.8em;
    text-transform: uppercase;
    letter-spacing: 0.4px;
}
.beholder-item { margin-right: 4px; }
.beholder-slot { opacity: 0.45; font-size: 0.85em; font-style: italic; }
.beholder-wound { color: #ff7676; }
.beholder-dmg-warn { color: #f5c06f; }
.beholder-dmg-bad  { color: #ff8585; }

/* \u2500\u2500\u2500 Doll mode \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

/* Tier color scale \u2014 drives slot row borders + damage chips */
.beholder-panel {
    --bh-tier-0: #6ad48b; /* pristine, lightly worn */
    --bh-tier-1: #e3c969; /* frayed, soiled */
    --bh-tier-2: #e9933b; /* damaged, cracked */
    --bh-tier-3: #e26464; /* torn, bloodstained */
    --bh-tier-4: #8c3030; /* tatters, ruined */
    /* Brand gold accent. --bh-accent defaults to gold; a user accent
       preference (or "match host theme" toggle) sets --bh-accent-pref
       inline on the panel to override it. --bh-holding tracks the gold. */
    --bh-gold: #ffeaa7;
    --bh-gold-deep: #c9a55a;
    --bh-holding: var(--bh-gold);
    --bh-body: var(--SmartThemeBodyColor, #cfd2d6);
    --bh-body-soft: color-mix(in srgb, var(--bh-body) 25%, transparent);
    --bh-accent: var(--bh-accent-pref, var(--bh-gold-deep));
    --bh-wound: #ff5252;
}

/* Character tabs \u2014 name nav for multi-char chats. Wraps to multiple rows
   when there are more tabs than fit on one row (instead of horizontal
   scrolling, which hides off-screen characters). */
.bh-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: var(--bh-space-1) var(--bh-space-2);
    margin-bottom: var(--bh-space-3);
    padding-bottom: var(--bh-space-1);
    border-bottom: 1px solid var(--bh-divider);
}
.bh-tab {
    background: transparent;
    border: none;
    color: var(--bh-body);
    padding: var(--bh-space-1) var(--bh-space-2) var(--bh-space-1);
    font: inherit;
    font-family: var(--bh-font-display);
    font-size: var(--bh-text-body);
    letter-spacing: 0.06em;
    cursor: pointer;
    opacity: 0.55;
    border-bottom: 2px solid transparent;
    transition: opacity 0.15s, border-color 0.15s, color 0.15s;
    white-space: nowrap;
}
.bh-tab:hover { opacity: 0.85; }
.bh-tab-active {
    opacity: 1;
    border-bottom-color: var(--bh-accent);
    color: var(--SmartThemeEmColor, #ffeaa7);
    font-weight: 600;
}

/* Multi-char "updated" indicator. Critical for the multi-char RP case:
   when Maggie's state changes while Tim's tab is active, the dot on
   Maggie's tab signals "she changed, click to see." */
.bh-tab-updated {
    opacity: 0.85;
    color: var(--bh-accent);
}
.bh-tab-updated .bh-tab-pulse {
    color: var(--bh-accent);
    font-size: var(--bh-text-meta);
    margin-left: var(--bh-space-1);
    vertical-align: middle;
}
/* Absent \u2014 character is tracked but not currently in the scene. Tab stays
   clickable (last-known state preserved) but reads as "on the roster, not
   here right now": dimmed, italic, no accent. Hover brightens slightly so
   it's clear the tab is still interactive. */
.bh-tab-absent {
    opacity: 0.38;
    font-style: italic;
}
.bh-tab-absent:hover { opacity: 0.7; }
.bh-tab-absent.bh-tab-active {
    /* If user explicitly views an absent char, lift the dim a little so
       their state is readable, but keep italic so the off-scene status is
       still legible. */
    opacity: 0.72;
}

.bh-char-doll {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.bh-char-head {
    display: flex;
    align-items: baseline;
    gap: var(--bh-space-3);
    padding: var(--bh-space-1) 0 var(--bh-space-2);
    border-bottom: 1px solid var(--bh-divider);
    margin-bottom: var(--bh-space-2);
    position: relative;
}
/* Decorative inscription rule under the character name \u2014 codex page feel.
   Sits over the head's bottom border, accenting the left edge. */
.bh-char-head::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 32px;
    height: 1px;
    background: var(--SmartThemeEmColor, #ffeaa7);
    opacity: 0.55;
}
.bh-char-name {
    font-family: var(--bh-font-display);
    font-weight: 600;
    font-size: var(--bh-text-display);
    color: var(--SmartThemeEmColor, #ffeaa7);
    letter-spacing: 0.06em;
    line-height: 1.15;
}

/* (Stamina gauge removed \u2014 the stamina field is no longer tracked. Any
   residual gauge element is hidden via the .bh-char-head .bh-gauge
   display:none rule appended below.) */
.bh-char-species {
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-secondary);
    font-weight: 600;
    color: var(--primary, var(--bh-body));
    opacity: 1;
    letter-spacing: 0.08em;
    text-transform: lowercase;
    padding: 1px var(--bh-space-2);
    border: 1px solid color-mix(in srgb, var(--primary, var(--bh-divider)) 45%, transparent);
    border-radius: 3px;
    background: color-mix(in srgb, var(--primary, var(--bh-surface-1)) 12%, transparent);
}
/* v0.4 (2026-06-03): \`bh-char-gender\` rules removed along with the gender
   field. The wings rules below are kept defensively in case a v0.5+ state
   still emits a \`wings\` slot \u2014 they harmlessly do nothing when paperdoll.js
   never renders the element. */
.bh-char-species::before {
    content: "\xB7";
    margin-right: 4px;
    opacity: 0.5;
}

/* The 3-col grid: left labels | silhouette | right labels */
.bh-doll-grid {
    display: grid;
    /* minmax(0, 1fr) \u2014 NOT bare 1fr. A bare \`1fr\` track has an implicit min of
       min-content, so a wide chip (a long item name) forces the side column \u2014 and the
       whole grid \u2014 past the panel's right edge. minmax(0,\u2026) lets the track shrink and
       the content wrap/clip instead of overflowing. */
    grid-template-columns: minmax(0, 1fr) 140px minmax(0, 1fr);
    gap: 6px;
    align-items: start;
}
.bh-doll-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 4px 0;
}
.bh-figure { display: flex; justify-content: center; }

.bh-col {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
}
.bh-col-empty { min-height: 1px; }

/* \u2500\u2500\u2500 Narrow-viewport / ST sidebar adaptation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Container queries (not media queries) \u2014 the panel responds to its OWN
   size, so it adapts whether it's narrow because of viewport (mobile) or
   because the user docked it in a narrow ST sidebar. */
.beholder-panel {
    container-type: inline-size;
    container-name: bhpanel;
}
/* \u2500\u2500\u2500 Mobile / narrow context = section digest (auto) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Above 360px the panel is the paperdoll grid. Below, the digest takes
   over: wounds \u2192 held \u2192 worn \u2192 state flags, sorted by IMPORTANCE rather
   than by anatomy. The silhouette + slot cards aren't useful at narrow
   widths once the spatial cue is gone \u2014 the digest reformats the same
   data as a priority feed. Both are always rendered; CSS picks one. */
.bh-digest { display: none; }
@container bhpanel (max-width: 360px) {
    .bh-doll-grid     { display: none; }
    .bh-doll-grid.bh-paired { display: none; }
    .bh-digest        { display: block; }
    /* Auto-narrow always shows the digest; hide the digest-side layout
       switch (the panel has no doll grid to switch between at this width). */
    .bh-layout-switch-row { display: none; }
    /* Header tools collapse to the overflow (\u22EF) trigger when narrow. */
    .beholder-tool-btn { display: none; }
    .beholder-tools-more { display: inline-block; }
}

/* Per-slot CARD: one card per anatomical slot, contains chips for each
   worn item / held item / wound that belongs to it. Replaces the
   one-row-per-thing layout (which repeated the slot name on every card).
   The card's left border = worst damage tier across all items in that slot. */
.bh-slot-card {
    background: rgba(255, 255, 255, 0.035);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    padding: 4px 6px 5px 9px;
    position: relative;
    line-height: 1.3;
    /* In paired mode the card IS the grid item (the .bh-col wrapper is display:contents),
       so it needs its own min-width:0 to shrink below its content and let the text wrap
       instead of forcing the track \u2014 and the panel \u2014 wider. */
    min-width: 0;
    /* Cancel the panel's --bh-ui-scale so cards keep their original density
       regardless of how much the surrounding UI is scaled up. */
    font-size: calc(1em / var(--bh-ui-scale, 1));
}
/* Card no longer carries a tier border \u2014 damage tier reads off each chip's
   own left bar (CSS ::before below) so the colored stripes match each
   chip's actual height. Empty card still gets faint outline via main
   .bh-slot-card border style above. */

/* Wound-count marker in the slot card header (\u271A or \u271AN for >1). */
.bh-slot-card-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 6px;
}
/* (Slot-head wound mark removed \u2014 the wound chips inside the card already
   say the same thing; the head-level glyph was duplicating info.) */
/* Right-column = true mirror of left. Border anchors to the right edge
   (toward the silhouette), and chip content reverses so dots/swatches/
   glyphs cluster on the right side near the border, multi-slot tags
   + wound marks float to the left. Text within each label still reads
   left-to-right \u2014 only the element order flips. */
.bh-col-right .bh-slot-card-head { flex-direction: row-reverse; }
.bh-slot-card .bh-slot-name {
    font-family: var(--bh-font-data);
    font-size: 0.82em;          /* slot card scale already shrinks; bump back to readable */
    font-weight: 500;
    opacity: 0.65;
    text-transform: lowercase;
    letter-spacing: 0.06em;
    font-style: normal;
}

/* Right-column cards mirror the border. */
.bh-col-right .bh-slot-card { text-align: right; padding-left: 6px; padding-right: 9px; }
.bh-col-right .bh-slot-card::before { inset: 0 0 0 auto; border-radius: 0 6px 6px 0; }

/* Empty / ghost slot card: faint one-liner, no chips. Lets users see what
   slots ARE available without dominating the visual. */
.bh-slot-card.bh-slot-empty {
    background: transparent;
    border-style: dashed;
    border-color: rgba(255, 255, 255, 0.05);
    opacity: 0.35;
    padding: 2px 6px 2px 9px;
}
.bh-slot-card.bh-slot-empty::before {
    background: rgba(255, 255, 255, 0.06);
}
.bh-slot-card.bh-slot-empty:hover { opacity: 0.7; }

/* Bare slot card (v0.3 \u2014 narration explicitly confirmed uncovered).
   Skin-tone left bar + italic "bare" tag in the same slot as missing's tag.
   Visually distinct from .bh-slot-empty (which means "unknown / nothing said").
   Mutually exclusive with worn/items per schema, so no chips. */
.bh-slot-card.bh-slot-bare {
    background: rgba(220, 188, 156, 0.04);
    border-style: solid;
    border-color: rgba(220, 188, 156, 0.18);
    opacity: 0.85;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 8px 4px 9px;
}
.bh-slot-card.bh-slot-bare::before {
    background: linear-gradient(180deg, rgba(220, 188, 156, 0.5), rgba(220, 188, 156, 0.25));
}
.bh-slot-bare-tag {
    color: rgba(220, 188, 156, 0.95);
    font-family: var(--bh-font-data);
    font-size: 0.78em;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-style: normal;
    font-weight: 600;
}
.bh-slot-card.bh-slot-bare:hover {
    opacity: 1;
    border-color: rgba(220, 188, 156, 0.45);
}

/* \u2500\u2500\u2500 Layered worn-items staircase \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   When a slot has >1 worn item (chest with gambeson + chainmail + breastplate),
   each chip gets a left-side index gutter and a faint connector line. The
   first chip is the outermost layer (per schema worn[0] = outer). */
.bh-chip-layered {
    display: flex;
    align-items: stretch;
    gap: var(--bh-space-1);
    position: relative;
}
.bh-chip-layer-idx {
    font-family: var(--bh-font-data);
    font-size: 0.65em;
    font-weight: 600;
    color: var(--bh-body);
    opacity: 0.4;
    min-width: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
}
/* Connector line tying the indices into a vertical stack. */
.bh-chip-layered:not(:first-child) .bh-chip-layer-idx::before {
    content: "";
    position: absolute;
    top: -3px;
    bottom: 50%;
    width: 1px;
    background: var(--bh-border);
    opacity: 0.5;
}
.bh-chip-layered:not(:last-child) .bh-chip-layer-idx::after {
    content: "";
    position: absolute;
    top: 50%;
    bottom: -3px;
    width: 1px;
    background: var(--bh-border);
    opacity: 0.5;
}
.bh-chip-layered:first-child .bh-chip-layer-idx { color: var(--SmartThemeEmColor, #ffeaa7); opacity: 0.55; }
.bh-chip-layered:hover .bh-chip-layer-idx       { opacity: 0.9; }
/* Right-column layered chips mirror: index ends up on the right side (toward
   the body), connector tick still runs vertically through the index gutter. */
.bh-col-right .bh-chip-layered { flex-direction: row-reverse; }

/* Missing / lost slot card: vertical gray slits, strikethrough on the slot
   name, "missing" tag. Distinct from empty and off-body. */
.bh-slot-card.bh-slot-missing {
    background: repeating-linear-gradient(
        90deg,
        rgba(140, 140, 140, 0.07) 0px, rgba(140, 140, 140, 0.07) 1px,
        transparent 1px, transparent 6px
    );
    border-style: dashed;
    border-color: rgba(140, 140, 140, 0.3);
    opacity: 0.65;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 8px 4px 9px;
}
.bh-slot-card.bh-slot-missing::before { background: rgba(140, 140, 140, 0.45); }
.bh-slot-card.bh-slot-missing .bh-slot-name {
    text-decoration: line-through;
    opacity: 0.7;
}
.bh-slot-missing-tag {
    color: rgba(160, 160, 160, 0.95);
    font-family: var(--bh-font-data);
    font-size: 0.78em;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-style: normal;
    font-weight: 600;
}
.bh-slot-card.bh-slot-missing:hover {
    opacity: 0.85;
    border-color: rgba(160, 160, 160, 0.5);
}

/* Chips inside a slot card: one per item / wound. Damage tier shows as a
   small dot before the item name; the card border still shows the worst
   tier across all items, the per-chip dot tells you which item is which. */
.bh-slot-chips {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 2px;
}
.bh-chip {
    display: flex;
    flex-wrap: wrap;             /* allows the verbose sub-row to drop below */
    align-items: baseline;
    font-size: 1.0em;
    line-height: 1.35;
    padding: 1px 0;
    cursor: help;
    /* Wrap at WORD boundaries only (no mid-word breaks). Long names that
       genuinely need to wrap will, but won't shatter into "breastpla|te". */
    overflow-wrap: normal;
    word-break: normal;
}
/* Chip head \u2014 prefix glyphs + item name + multi-slot tag share ONE inner
   flex line that never wraps as a unit. The text inside is allowed to wrap
   to multiple lines via min-width:0, but the dot/glyph/swatch stay glued to
   the start of the FIRST line. Previously the chip was a single flex with
   wrap, so a long item name would push to a new row, orphaning the prefix
   on the row above. */
.bh-chip-head {
    display: flex;
    flex: 1 1 100%;
    align-items: baseline;
    gap: 6px;
    min-width: 0;
    flex-wrap: nowrap;
}
.bh-chip-text {
    font-weight: 500;
    flex: 1 1 auto;
    min-width: 0;
    /* A single over-long token (an item name with no spaces) can't wrap at a space,
       so break it as a LAST RESORT rather than let it overflow the column past the
       panel edge. Multi-word names still wrap at spaces first (this only fires when a
       word is wider than the column). */
    overflow-wrap: anywhere;
    /* Sentence case at the display layer: normalize the model's casing
       (lowercase everything) and then capitalize the first letter. Means
       "ARMING SWORD" and "arming sword" both render as "Arming sword".
       Display normalization only \u2014 the underlying data stays as authored. */
    text-transform: lowercase;
}
.bh-chip-text::first-letter {
    text-transform: uppercase;
}
.bh-chip-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    background: var(--bh-tier-0);
    align-self: center;
}
.bh-chip.bh-tier-1 .bh-chip-dot { background: var(--bh-tier-1); }
.bh-chip.bh-tier-2 .bh-chip-dot { background: var(--bh-tier-2); }
.bh-chip.bh-tier-3 .bh-chip-dot { background: var(--bh-tier-3); }
.bh-chip.bh-tier-4 .bh-chip-dot { background: var(--bh-tier-4); }
/* Hide the per-chip damage dot in desktop (doll-grid) \u2014 the card's left
   border already encodes the same tier for each item. Mobile (digest)
   keeps the dot because there's no card border to read off. */
.bh-doll-grid .bh-chip-dot { display: none; }

/* \u2500\u2500\u2500 Color swatch (v0.3 worn[].color / holding.color) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Inline color square beside the damage dot. Encodes the item's color
   without stealing characters from the item name. Schema palette = 16
   controlled colors; free-text variants fall back to .bh-c-other (neutral)
   and rely on the tooltip for the exact word. */
.bh-chip-swatch {
    width: 9px;
    height: 9px;
    border-radius: 2px;
    flex-shrink: 0;
    align-self: center;
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25) inset;
}
/* Schema's 16-color controlled palette \u2014 chosen for legibility on dark bg. */
.bh-c-red    { background: #d6534b; }
.bh-c-orange { background: #e6883a; }
.bh-c-yellow { background: #e6c64b; }
.bh-c-green  { background: #5ec27a; }
.bh-c-blue   { background: #4d8fdc; }
.bh-c-purple { background: #9d6dcc; }
.bh-c-pink   { background: #e687a3; }
.bh-c-brown  { background: #8a5a3a; }
.bh-c-black  { background: #1f1f24; border-color: rgba(255, 255, 255, 0.3); }
.bh-c-white  { background: #f0f0f0; border-color: rgba(255, 255, 255, 0.4); }
.bh-c-gray   { background: #888c92; }
.bh-c-beige  { background: #d6c7a3; }
.bh-c-gold   { background: #d4a93a; box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25) inset, 0 0 4px rgba(212, 169, 58, 0.4); }
.bh-c-silver { background: #b5b8bd; }
.bh-c-navy   { background: #2a3d6b; }
.bh-c-tan    { background: #c4a878; }
/* Free-text color (crimson, burgundy, etc.): neutral swatch with a hint
   underline so it reads as "color present, see tooltip". */
.bh-c-other  {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
    border-style: dashed;
}

/* Held items: gold \u2726 glyph identifies "held" \u2014 but the chip text is normal
   color (per-tier dot + color swatch carry the data signals). The previous
   all-yellow text was unreadable on top of the gold glyph + actual damage. */
.bh-chip-hold .bh-chip-text { color: inherit; }
.bh-chip-hold .bh-chip-glyph {
    color: var(--bh-holding);
    font-size: 0.95em;
    text-shadow: 0 0 4px rgba(255, 234, 167, 0.35);
}

/* Wound chips: severity-colored (1=minor amber, 2=serious orange, 3=critical red).
   v0.3 supplies explicit severity + bleeding fields. */
.bh-chip-wound .bh-chip-glyph { font-size: 0.95em; }
.bh-chip-wound-1 { color: #e3c969; }
.bh-chip-wound-1 .bh-chip-glyph { text-shadow: 0 0 4px rgba(227, 201, 105, 0.45); }
.bh-chip-wound-2 { color: #e9933b; }
.bh-chip-wound-2 .bh-chip-glyph { text-shadow: 0 0 4px rgba(233, 147, 59, 0.5); }
.bh-chip-wound-3 { color: #ff4747; }
.bh-chip-wound-3 .bh-chip-glyph { text-shadow: 0 0 4px rgba(255, 71, 71, 0.55); }
.bh-chip-glyph { flex-shrink: 0; }

/* Bleeding indicator \u2014 the wound chip's \u271A glyph pulses with a saturated
   red halo. Settled middle ground: slightly larger base, modest scale +
   opacity pulse, still distinct from a STATIC red \u271A but not jumpy. */
.bh-chip-bleeding .bh-chip-glyph {
    display: inline-block;
    color: #ff3838 !important;
    font-size: 1.12em;
    line-height: 1;
    text-shadow:
        0 0 4px rgba(255, 56, 56, 0.9),
        0 0 9px rgba(255, 56, 56, 0.55) !important;
    animation: bh-bleed-pulse 1.3s ease-in-out infinite;
    transform-origin: center;
}
@keyframes bh-bleed-pulse {
    0%, 100% {
        opacity: 0.78;
        transform: scale(1);
        text-shadow:
            0 0 3px rgba(255, 56, 56, 0.65),
            0 0 6px rgba(255, 56, 56, 0.3);
    }
    50% {
        opacity: 1;
        transform: scale(1.1);
        text-shadow:
            0 0 5px rgba(255, 56, 56, 0.95),
            0 0 11px rgba(255, 56, 56, 0.55),
            0 0 16px rgba(255, 56, 56, 0.3);
    }
}
@media (prefers-reduced-motion: reduce) {
    .bh-chip-bleeding .bh-chip-glyph {
        animation: none;
        opacity: 1;
        transform: scale(1.08);
    }
}

/* \u2500\u2500\u2500 Verbose sub-row (Full view) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Spells out what tooltips show: damage word, color word, severity word,
   bleeding word. The whole row is hidden by default and forced onto a new
   line (flex-basis 100%) under the chip text in Full view \u2014 keeps slot
   cards the same width regardless of label length. */
.bh-chip-verbose {
    font-family: var(--bh-font-data);
    font-size: 0.78em;
    letter-spacing: 0.04em;
    opacity: 0.75;
    text-transform: lowercase;
}
/* Verbose row is no longer gated by Meta \u2014 each label inside has its own
   layer gate (color \u2192 Color layer, damage label \u2192 always, sev/bleed \u2192 live
   on wound chips that are themselves Wound-gated). Meta now only controls
   species pill, layer indices, and multi-slot \u2316 tags. */
.bh-chip-verbose-row {
    display: flex;
    flex-basis: 100%;            /* forces line break inside the wrapping chip */
    flex-direction: column;      /* stack labels vertically \u2014 consistent placement
                                    regardless of how many labels or how long;
                                    we have length, not width, in slot cards. */
    gap: 1px;
    /* Indent past the dot + swatch so labels visually pair with the item text */
    padding-left: 20px;
    margin-top: 2px;
}
/* Layer ownership of verbose labels:
     .bh-chip-verbose-dmg    \u2192 Damage layer
     .bh-chip-verbose-color  \u2192 Color layer
     .bh-chip-verbose-sev    \u2192 Wounds layer (cascades \u2014 wound chip is the gate)
     .bh-chip-verbose-bleed  \u2192 Wounds layer (cascades \u2014 wound chip is the gate)
   The per-label hide rules live alongside the other Damage/Color/Wounds rules
   below (search "bh-hide-damage", etc.). The row hide rules below collapse
   the container when every visible label would be gone \u2014 no orphan margin. */
.bh-chip-verbose-dmg   { color: inherit; opacity: 0.85; }
.bh-chip-verbose-color { opacity: 0.7; font-style: italic; }
.bh-chip-verbose-sev   { color: inherit; font-weight: 600; opacity: 0.9; }
.bh-chip-verbose-bleed {
    color: var(--bh-wound);
    font-weight: 600;
    text-shadow: 0 0 4px rgba(255, 71, 71, 0.4);
}
/* Collapse the verbose row when every label that WOULD render is layer-hidden.
   Three explicit cases cover all "no visible content left" combinations. */
.beholder-panel.bh-hide-color.bh-hide-damage .bh-chip-verbose-row:not(:has(.bh-chip-verbose-sev, .bh-chip-verbose-bleed)) { display: none; }
.beholder-panel.bh-hide-color:not(.bh-hide-damage) .bh-chip-verbose-row:not(:has(.bh-chip-verbose-dmg, .bh-chip-verbose-sev, .bh-chip-verbose-bleed)) { display: none; }
.beholder-panel.bh-hide-damage:not(.bh-hide-color) .bh-chip-verbose-row:not(:has(.bh-chip-verbose-color, .bh-chip-verbose-sev, .bh-chip-verbose-bleed)) { display: none; }

/* Wounds chips own their severity-dot decoration; sev dots and the verbose
   sev word are both severity cues \u2014 keep dots for the visual signal, words
   for the spelled-out tier. They render together when wounds layer is on,
   disappear together when it's off (wound chip is hidden as a whole). */

/* Multi-slot annotation \u2014 when a row covers >1 slot (sundress on 4 slots,
   gown on chest+waist+legs). The chip still appears in every slot it covers
   (testers prefer this), but the small \u2316N tag signals "this item also lives
   in other cards" so readers don't think they're seeing duplicates. */
.bh-chip-multi {
    font-family: var(--bh-font-data);
    font-size: 0.7em;
    letter-spacing: 0.04em;
    color: var(--bh-body);
    opacity: 0.45;
    margin-left: var(--bh-space-1);
    padding: 0 4px;
    border: 1px solid var(--bh-divider);
    border-radius: 3px;
    flex-shrink: 0;
    align-self: center;
    cursor: help;
}
.bh-chip-multi:hover { opacity: 0.85; border-color: var(--bh-border); }

/* Per-chip damage bar (desktop only) \u2014 positioned at the CARD'S LEFT EDGE
   (negative offset hops out of the chip's normal flow, into the card's
   padding-left). Each bar's height matches its own chip exactly, so a
   chest with three layered items shows three stacked bars at the card
   edge \u2014 together they read as a single segmented "card border" that's
   item-aware. Wounds get no bar (different concern).
   Adjacent bars extend \xB11px so they meet across the chip-gap, forming a
   continuous left edge. Mobile digest uses chip-dots instead. */
.bh-doll-grid .bh-chip {
    position: relative;
}
.bh-doll-grid .bh-chip::before {
    content: "";
    position: absolute;
    left: -9px;            /* card has padding-left: 9px \u2192 bar lands at card edge */
    top: -1px;
    bottom: -1px;
    width: 3px;
    background: var(--chip-bar, transparent);
}
.bh-doll-grid .bh-chip.bh-tier-0 { --chip-bar: var(--bh-tier-0); }
.bh-doll-grid .bh-chip.bh-tier-1 { --chip-bar: var(--bh-tier-1); }
.bh-doll-grid .bh-chip.bh-tier-2 { --chip-bar: var(--bh-tier-2); }
.bh-doll-grid .bh-chip.bh-tier-3 { --chip-bar: var(--bh-tier-3); }
.bh-doll-grid .bh-chip.bh-tier-4 { --chip-bar: var(--bh-tier-4); }
/* Wound chips have no bar \u2014 gear damage is a different concern. */
.bh-doll-grid .bh-chip-wound::before { display: none; }
/* Right-column mirror \u2014 bars on the right edge (card has padding-right: 9px
   on right-col cards). */
.bh-doll-grid .bh-col-right .bh-chip::before { left: auto; right: -9px; }

/* Layered worn chips: the bar is positioned on the WRAPPER (not the inner
   chip), so it lands at the card's left edge instead of inside the wrapper
   (where it was overlapping the layer-index gutter and hiding the 1/2/3).
   The tier class is copied onto the wrapper at render time. */
.bh-doll-grid .bh-chip-layered::before {
    content: "";
    position: absolute;
    left: -9px;
    top: -1px;
    bottom: -1px;
    width: 3px;
    background: var(--chip-bar, transparent);
}
.bh-doll-grid .bh-chip-layered.bh-tier-0 { --chip-bar: var(--bh-tier-0); }
.bh-doll-grid .bh-chip-layered.bh-tier-1 { --chip-bar: var(--bh-tier-1); }
.bh-doll-grid .bh-chip-layered.bh-tier-2 { --chip-bar: var(--bh-tier-2); }
.bh-doll-grid .bh-chip-layered.bh-tier-3 { --chip-bar: var(--bh-tier-3); }
.bh-doll-grid .bh-chip-layered.bh-tier-4 { --chip-bar: var(--bh-tier-4); }
/* Inner chip's bar is suppressed when wrapped, to avoid double drawing. */
.bh-doll-grid .bh-chip-layered .bh-chip::before { display: none; }
/* Right-column wrapper bar mirrors to the right edge. */
.bh-doll-grid .bh-col-right .bh-chip-layered::before { left: auto; right: -9px; }

/* Wound group divider \u2014 dashed hairline above the wounds sub-list so the
   gear group and the wound group read as distinct sections inside one
   slot card. */
.bh-slot-wounds {
    margin-top: var(--bh-space-2);
    padding-top: var(--bh-space-2);
    border-top: 1px dashed var(--bh-divider);
    display: flex;
    flex-direction: column;
    gap: 2px;
}

/* Right-col chip content mirrors: dot/swatch/glyph end up on the right
   (toward the silhouette in the middle), multi-slot tag flips to the left,
   text still reads LTR inside its element. The row-reverse goes on the
   head (the inner prefix line); the chip itself stays normal so the verbose
   row stays BELOW the head, not above. */
.bh-col-right .bh-chip-head { flex-direction: row-reverse; }
/* Verbose sub-row indent flips for right-col: indent on the RIGHT (away from
   the body), labels stacked vertically and right-aligned so they sit under
   the item text as it appears in the mirrored layout. */
.bh-col-right .bh-chip-verbose-row {
    padding-left: 0;
    padding-right: 20px;
    align-items: flex-end;
}

/* Spanning-item section: a horizontal strip above the doll grid for items
   that occupy multiple slots (sundress on chest+waist+legs renders once
   here, not in every slot card). */
.bh-spanning-section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 6px;
    margin: 4px 2px 6px;
    padding: 4px 6px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px dashed rgba(255, 255, 255, 0.08);
    border-radius: 6px;
}
.bh-spanning-label {
    font-size: 0.7em;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    opacity: 0.45;
    margin-right: 2px;
}
.bh-chip-spanning {
    padding: 2px 8px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    cursor: help;
}
.bh-chip-spanning .bh-chip-slots {
    font-size: 0.78em;
    opacity: 0.5;
    font-style: italic;
    margin-left: 2px;
}

/* (Obsolete single-row card styling removed \u2014 replaced by .bh-slot-card +
   .bh-chip layout above. Left intentionally so the file is shorter.) */

/* (Right-column mirroring moved into .bh-slot-card / .bh-chip rules above.) */

/* Silhouette \u2014 scales with the panel's --bh-ui-scale knob. */
.bh-silhouette {
    width: calc(140px * var(--bh-ui-scale, 1));
    height: calc(440px * var(--bh-ui-scale, 1));
    display: block;
    color: var(--bh-body);
}
.bh-body-fill {
    fill: var(--bh-body-soft);
    stroke: var(--bh-body);
    stroke-width: 1;
    stroke-opacity: 0.45;
}

.bh-wound-marker .bh-wound-dot {
    fill: var(--bh-wound);
    stroke: rgba(0, 0, 0, 0.5);
    stroke-width: 0.8;
    filter: drop-shadow(0 0 3px rgba(255, 60, 60, 0.55));
    /* Animation budget \u22641 at a time (per UX research). A static dot is
       legible on its own; reserve motion for future severity tiers
       (critical/bleeding) which will animate exclusively. */
}
.bh-wound-marker .bh-wound-count {
    font-size: 7px;
    fill: #fff;
    font-weight: 700;
    pointer-events: none;
}

/* Held-item marker on the silhouette hand \u2014 just the \u2726 glyph, no circle.
   pointer-events: none so the hand part underneath stays hoverable for
   the hover-link with the slot card. */
.bh-hold-marker {
    pointer-events: none;
}
.bh-hold-marker .bh-hold-icon {
    font-size: 8px;
    fill: var(--bh-holding);
    font-weight: 700;
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.65));
}

/* (Gauge CSS removed \u2014 the only consumer was the stamina gauge, which is no
   longer tracked. A defensive .bh-char-head .bh-gauge{display:none} is
   appended below to hide any residual gauge element.) */

/* Old .bh-wounds-block (bottom <details> list) removed \u2014 wounds are now
   first-class slot rows alongside worn/holding (see .bh-row-wound below). */

/* Viewer-perspective hint below the silhouette: the figure faces the user,
   so character-right renders on viewer-left. Without this, ~30% of first-
   time testers think the model swapped hands. */
.bh-figure {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--bh-space-2);
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
}
.bh-pov-hint {
    display: flex;
    align-items: center;
    gap: var(--bh-space-1);
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-meta);
    letter-spacing: 0.16em;
    opacity: var(--bh-mute-strong);
    text-transform: uppercase;
    cursor: help;
    padding-top: var(--bh-space-1);
    white-space: nowrap;
}
.bh-pov-hint:hover { opacity: var(--bh-mute-soft); }
.bh-pov-axis { opacity: 0.5; letter-spacing: 0; }
.bh-pov-note {
    font-family: inherit;
    font-size: 0.92em;
    letter-spacing: 0.04em;
    text-transform: lowercase;
    font-style: italic;
    margin-left: var(--bh-space-1);
    opacity: 0.85;
}

/* \u2500\u2500\u2500 Body-part tinting on the silhouette \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
/* Per-part visual encoding:
     STROKE (ring outside the part) = armor damage tier
     FILL   (interior of the part)  = wound severity
   \`paint-order: stroke\` shifts the fill to paint OVER the inner half of
   the stroke, so the visible stroke ring sits entirely OUTSIDE the fill \u2014
   no muddled blend when armor and wound are both red. Thicker stroke at
   high tiers makes the ring unambiguous. */
.bh-part .bh-body-fill {
    paint-order: stroke fill;
    transition: stroke 0.2s ease, stroke-width 0.2s ease, fill 0.2s ease;
}
.bh-part .bh-body-fill.bh-part-tier-2 { stroke: var(--bh-tier-2); stroke-width: 3.0; stroke-opacity: 1; }
.bh-part .bh-body-fill.bh-part-tier-3 { stroke: var(--bh-tier-3); stroke-width: 4.0; stroke-opacity: 1; }
.bh-part .bh-body-fill.bh-part-tier-4 { stroke: var(--bh-tier-4); stroke-width: 5.0; stroke-opacity: 1; }

/* Body-part wound fill \u2014 tier by MAX SEVERITY. Hue + opacity both shift so
   the three severities are unambiguous at a glance:
     minor    = soft amber, ~20% \u2014 a passing visual nudge ("there's a wound")
     serious  = clear orange, ~40% \u2014 body part is meaningfully hurt
     critical = saturated red, ~65% \u2014 alarming, draws the eye
   Critical also gets a thin red stroke overlay so it pops even when the
   part is small (eyes, ears). */
/* Wound fill \u2014 interior tint by severity. Stroke is reserved for ARMOR;
   wound severity reads from the fill color (no stroke override). This
   keeps the two channels orthogonal: ring = armor, interior = body. */
.bh-part .bh-body-fill.bh-part-wound-1 {
    fill: rgba(235, 200, 110, 0.20);
}
.bh-part .bh-body-fill.bh-part-wound-2 {
    fill: rgba(233, 147, 59, 0.42);
}
.bh-part .bh-body-fill.bh-part-wound-3 {
    fill: rgba(255, 71, 71, 0.65);
}

/* Missing / acquired-loss body part: gray vertical hatch + dashed outline.
   Distinct from off-body (species lacks this part \u2014 handled in row layer with
   \u2300 glyph) and from empty (no item \u2014 handled by ghost card). */
.bh-part .bh-body-fill.bh-part-missing {
    fill: url(#bh-missing-pattern);
    stroke: rgba(140, 140, 140, 0.6) !important;
    stroke-opacity: 0.7 !important;
    stroke-dasharray: 4 3;
}

/* Hover any part to see slot + damage + wounds tooltip via <title>. */
.bh-part { cursor: help; }
.bh-part:hover .bh-body-fill { filter: brightness(1.15); }

/* Hover-link: visually pair a body part with its slot row(s) and vice versa.
   !important here because the hide-damage / hide-wounds rules above use
   !important to neutralize tier strokes and wound fills \u2014 without it the
   hover-link highlight gets stomped in every view except Full.

   The fill is explicitly mixed with the accent color (not just a brightness
   filter) so the highlight reads as a tinted REGION rather than a bright
   outline. Critical on slim slots like legs/arms where the silhouette's
   pale soft-body fill barely shifts under a brightness filter alone. */
.bh-part.bh-hover-link .bh-body-fill {
    fill: var(--bh-accent, #c9a55a) !important;
    fill-opacity: 0.55 !important;
    filter: drop-shadow(0 0 5px var(--bh-accent, #c9a55a)) !important;
    stroke: var(--bh-accent, #c9a55a) !important;
    stroke-width: 2 !important;
    stroke-opacity: 0.95 !important;
}
.bh-slot-card.bh-hover-link {
    background: rgba(201, 165, 90, 0.1);
    border-color: rgba(201, 165, 90, 0.55);
}
.bh-slot-card.bh-hover-link::before {
    box-shadow: 0 0 6px var(--bh-accent, #c9a55a);
}
.bh-chip-spanning.bh-hover-link {
    background: rgba(201, 165, 90, 0.14);
    border-color: rgba(201, 165, 90, 0.6);
}

/* Spine line \u2014 back-view anchor so users know they're seeing the back. */
.bh-spine-line {
    stroke: var(--bh-body);
    stroke-width: 0.8;
    stroke-opacity: 0.35;
    stroke-dasharray: 2 3;
    fill: none;
}

/* Count badges on body parts: \xD7N for multi-wounds, +N for layered clothes.
   Solves the "1 wound vs 3 wounds look identical in fill intensity" and
   "I can't tell if there's a cloak over my chest tunic" problems. */
.bh-count-badge { pointer-events: none; }
.bh-badge-circle { stroke: rgba(0, 0, 0, 0.45); stroke-width: 0.6; }
.bh-badge-wound-bg  { fill: var(--bh-wound); filter: drop-shadow(0 0 3px rgba(255, 60, 60, 0.55)); }
.bh-badge-layers-bg { fill: var(--bh-holding); filter: drop-shadow(0 0 3px rgba(241, 217, 144, 0.4)); }
.bh-badge-text {
    font-size: 7.5px;
    font-weight: 700;
    fill: #fff;
    text-anchor: middle;
    dominant-baseline: middle;
    font-family: inherit;
}

/* Species family tag (top of silhouette, only shown for non-humanoid). */
.bh-family-tag {
    fill: var(--bh-accent);
    font-size: 7px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    opacity: 0.65;
    font-family: inherit;
}

/* Stroke-only body parts (digitigrade legs, serpentine tail) \u2014 inherit
   tier/wound strokes from .bh-part-tier-* / .bh-part-wound-*. */
.bh-silhouette .bh-tail,
.bh-silhouette .bh-digi-leg {
    stroke: var(--bh-body);
    stroke-opacity: 0.45;
}

/* Wings (v0.4) \u2014 drawn behind the body in the SVG layering, slightly
   reduced opacity so they read as "behind / further from camera"
   rather than competing with the torso. The full saturation comes
   back on hover-link. Feathered vs leathery just change the path
   geometry, not the visual treatment. */
.bh-silhouette .bh-wings {
    opacity: 0.72;
}
.bh-silhouette .bh-wings.bh-part-tier-2,
.bh-silhouette .bh-wings.bh-part-tier-3,
.bh-silhouette .bh-wings.bh-part-tier-4 {
    opacity: 0.9;
}
.bh-silhouette .bh-tail.bh-part-tier-2,
.bh-silhouette .bh-digi-leg.bh-part-tier-2 { stroke: var(--bh-tier-2); stroke-opacity: 1; }
.bh-silhouette .bh-tail.bh-part-tier-3,
.bh-silhouette .bh-digi-leg.bh-part-tier-3 { stroke: var(--bh-tier-3); stroke-opacity: 1; }
.bh-silhouette .bh-tail.bh-part-tier-4,
.bh-silhouette .bh-digi-leg.bh-part-tier-4 { stroke: var(--bh-tier-4); stroke-opacity: 1; }

/* Off-silhouette slot row hint: a serpentine character's worn boot still
   shows in the row list, but flagged so users know it doesn't appear on
   the body diagram. */
.bh-row-off-body {
    opacity: 0.6;
}
.bh-off-body {
    display: inline-block;
    margin-left: 4px;
    color: var(--bh-tier-2);
    font-size: 0.85em;
    opacity: 0.8;
    cursor: help;
}

/* \u2500\u2500\u2500 Onboarding popover (first-impression explainer) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.beholder-onboard {
    background: var(--SmartThemeBlurTintColor, rgba(20, 20, 24, 0.95));
    color: var(--SmartThemeBodyColor, #e0e0e0);
    border: 1px solid var(--SmartThemeBorderColor, rgba(255, 255, 255, 0.18));
    border-radius: 12px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    font-size: 0.875em;
    line-height: 1.55;
    animation: bh-onboard-in 0.25s ease-out;
}
.beholder-onboard .bh-onboard-title {
    font-family: "Cinzel", "Trajan Pro", "Georgia", serif;
    font-weight: 600;
    letter-spacing: 0.1em;
    font-size: 1.05em;
}
@keyframes bh-onboard-in {
    from { opacity: 0; transform: scale(0.95); }
    to   { opacity: 1; transform: scale(1); }
}
.bh-onboard-arrow {
    position: absolute;
    top: 18px;
    width: 0; height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
}
.beholder-onboard[data-side="right"] .bh-onboard-arrow {
    right: -8px;
    border-left: 8px solid var(--SmartThemeBorderColor, rgba(255, 255, 255, 0.18));
}
.beholder-onboard[data-side="left"] .bh-onboard-arrow {
    left: -8px;
    border-right: 8px solid var(--SmartThemeBorderColor, rgba(255, 255, 255, 0.18));
}
.bh-onboard-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    border-bottom: 1px solid var(--SmartThemeBorderColor, rgba(255, 255, 255, 0.1));
}
.bh-onboard-title {
    font-weight: 700;
    color: var(--bh-accent, #c9a55a);
    letter-spacing: 0.5px;
}
.bh-onboard-close {
    cursor: pointer;
    opacity: 0.55;
    transition: opacity 0.15s;
}
.bh-onboard-close:hover { opacity: 1; }
.bh-onboard-body {
    padding: 10px 12px;
}
.bh-onboard-body b { color: var(--bh-accent, #c9a55a); font-weight: 600; }
.bh-onboard-tips {
    margin: 8px 0 0;
    padding: 0 0 0 18px;
    font-size: 0.92em;
}
.bh-onboard-tips li {
    margin: 3px 0;
    color: var(--SmartThemeBodyColor, #d0d0d0);
    opacity: 0.85;
}
.bh-onboard-foot {
    padding: 8px 12px 10px;
    text-align: right;
    border-top: 1px solid var(--SmartThemeBorderColor, rgba(255, 255, 255, 0.06));
}
.bh-onboard-dismiss {
    background: var(--bh-accent, #c9a55a);
    color: #fff;
    border: none;
    padding: 6px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.95em;
    font-weight: 600;
    letter-spacing: 0.3px;
}
.bh-onboard-dismiss:hover { filter: brightness(1.1); }

/* \u2500\u2500\u2500 Inline per-message delta badges \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
/* Annotates each AI message with what the extractor saw change. Lives in
   the chat DOM, appended after .mes_text. Shows testers that the extractor
   ran on this turn; great debug surface for the model itself. */
.beholder-msg-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin: 4px 0 6px;
    padding: 4px 8px;
    border-left: 2px solid var(--bh-accent, #c9a55a);
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0 4px 4px 0;
    font-size: 0.78em;
    line-height: 1.45;
}
.beholder-msg-noop {
    color: var(--SmartThemeBodyColor, #aaa);
    opacity: 0.4;
    font-style: italic;
    font-size: 0.75em;
}
.bh-msg-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 1px 7px 2px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    color: var(--SmartThemeBodyColor, #d0d0d0);
}
.bh-msg-char {
    font-weight: 600;
    color: var(--SmartThemeEmColor, #ffeaa7);
    font-size: 0.92em;
}
.bh-msg-text { opacity: 0.92; }

/* Semantic colors per delta kind */
.bh-msg-add   { border-color: rgba(106, 212, 139, 0.5); color: #6ad48b; }
.bh-msg-clear { border-color: rgba(233, 147, 59, 0.5);  color: #e9933b; }
.bh-msg-hold  { border-color: rgba(241, 217, 144, 0.5); color: #f1d990; }
.bh-msg-wound { border-color: rgba(255, 82, 82, 0.55);  color: #ff7676; }
.bh-msg-heal  { border-color: rgba(120, 220, 255, 0.5); color: #78dcff; }
.bh-msg-mod   { border-color: rgba(136, 170, 255, 0.5); color: #aac3ff; }
.bh-msg-add .bh-msg-char,
.bh-msg-clear .bh-msg-char,
.bh-msg-hold .bh-msg-char,
.bh-msg-wound .bh-msg-char,
.bh-msg-heal .bh-msg-char,
.bh-msg-mod .bh-msg-char {
    color: inherit;
    opacity: 0.85;
}

/* \u2500\u2500\u2500 Front / Back view toggle \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Segmented pill toggle. The whole control is one button (a single click
   flips the view), but visually it reads as a Front | Back switch with
   the active label highlighted. */
.bh-figure-controls {
    display: flex;
    justify-content: center;
    margin-top: var(--bh-space-2);
}
.bh-view-toggle {
    background: var(--bh-surface-1);
    color: var(--bh-body);
    border: 1px solid var(--bh-border);
    border-radius: 999px;
    padding: var(--bh-space-1) var(--bh-space-3);
    font: inherit;
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-secondary);
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: var(--bh-space-2);
    transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
}
.bh-view-toggle:hover {
    background: var(--bh-surface-2);
    border-color: var(--bh-accent);
    box-shadow: 0 0 0 3px rgba(201, 165, 90, 0.1);
}
.bh-view-front-label,
.bh-view-back-label {
    transition: color 0.15s, opacity 0.15s;
    opacity: var(--bh-mute-strong);
}
.bh-view-active {
    opacity: 1;
    color: var(--SmartThemeEmColor, #ffeaa7);
    font-weight: 600;
}
.bh-view-sep {
    opacity: 0.35;
    font-size: 0.9em;
    letter-spacing: 0;
}

/* Damage-tier legend popover (toggled by ? icon in panel header). Solves
   the "is this damage or wound severity?" first-impression confusion. */
.beholder-legend {
    padding: var(--bh-space-3) var(--bh-space-3) var(--bh-space-3) var(--bh-space-4);
    border-bottom: 1px solid var(--bh-divider);
    font-size: var(--bh-text-secondary);
    background: var(--bh-surface-1);
}
.beholder-legend[hidden] { display: none; }
.bh-legend-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 2px 0;
    line-height: 1.3;
}
.bh-legend-bar {
    display: inline-block;
    width: 3px;
    height: 14px;
    border-radius: 2px;
    flex-shrink: 0;
}
.bh-legend-bar.bh-tier-0 { background: var(--bh-tier-0); }
.bh-legend-bar.bh-tier-1 { background: var(--bh-tier-1); }
.bh-legend-bar.bh-tier-2 { background: var(--bh-tier-2); }
.bh-legend-bar.bh-tier-3 { background: var(--bh-tier-3); }
.bh-legend-bar.bh-tier-4 { background: var(--bh-tier-4); }
.bh-legend-bar.bh-tier-holding { background: var(--bh-holding); }
.bh-legend-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--bh-wound);
    box-shadow: 0 0 4px var(--bh-wound);
    margin-left: 0;
    flex-shrink: 0;
}

/* Height-only resize handle (bottom edge). Width is intentionally locked \u2014
   changing it throws off the doll grid columns + chip layouts. The handle
   is a thin horizontal grip with ns-resize cursor centered on the bottom
   border so it reads as "stretch downward" not "resize corner". */
.beholder-resize-handle {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 2px;
    width: 44px;
    height: 5px;
    cursor: ns-resize;
    z-index: 50;
    border-radius: 999px;
    background: var(--bh-border);
    opacity: 0.55;
    transition: opacity 0.15s, background 0.15s, width 0.15s;
}
.beholder-resize-handle:hover {
    opacity: 1;
    background: var(--bh-accent, #c9a55a);
    width: 60px;
}
.beholder-panel.beholder-resizing { user-select: none; }

/* \u2500\u2500\u2500 Mobile digest \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   The narrow-width replacement for the doll grid. Four sections in
   priority order: Wounds \u2192 Held \u2192 Worn \u2192 State (missing/bare). Each row
   is one chip + a faint slot annotation on the right. */
.bh-digest-section {
    margin-bottom: var(--bh-space-3);
}
.bh-digest-section:last-child { margin-bottom: 0; }
.bh-digest-heading {
    display: flex;
    align-items: baseline;
    gap: var(--bh-space-2);
    margin: 0 0 var(--bh-space-2);
    padding-bottom: var(--bh-space-1);
    border-bottom: 1px solid var(--bh-divider);
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-secondary);
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--bh-body);
    opacity: var(--bh-mute-soft);
}
.bh-digest-count {
    font-size: 0.85em;
    opacity: 0.6;
    font-weight: 500;
    margin-left: auto;
}
.bh-digest-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--bh-space-1);
}

/* Grouped worn list: each anatomical region (head, torso, arms, legs) is a
   sub-block with its own subheading + nested list. Visually separates a
   long worn list into 4 scannable chunks instead of one wall. */
.bh-digest-list-grouped {
    gap: var(--bh-space-3);
}
.bh-digest-group {
    list-style: none;
    margin: 0;
    padding: 0;
}
.bh-digest-subhead {
    display: flex;
    align-items: center;
    gap: var(--bh-space-2);
    font-family: var(--bh-font-display);
    font-size: var(--bh-text-secondary);
    font-weight: 600;
    letter-spacing: 0.1em;
    color: var(--SmartThemeEmColor, #ffeaa7);
    opacity: 0.85;
    margin: 0 0 var(--bh-space-2);
    padding: var(--bh-space-1) 0 var(--bh-space-1) var(--bh-space-2);
    border-left: 2px solid var(--SmartThemeEmColor, #ffeaa7);
    background: linear-gradient(90deg, rgba(255, 234, 167, 0.06), transparent 60%);
    border-radius: 0 4px 4px 0;
}
.bh-digest-group-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--bh-space-1);
}
.bh-digest-row {
    display: flex;
    align-items: baseline;
    gap: var(--bh-space-2);
    padding: var(--bh-space-1) 0;
    line-height: 1.35;
}
.bh-digest-row .bh-chip {
    flex: 1 1 auto;
    min-width: 0;
}
.bh-digest-slot {
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-meta);
    text-transform: lowercase;
    letter-spacing: 0.06em;
    opacity: 0.55;
    flex-shrink: 0;
    text-align: right;
    align-self: center;
}
.bh-digest-layer {
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-meta);
    font-weight: 600;
    color: var(--SmartThemeEmColor, #ffeaa7);
    opacity: 0.65;
    margin-left: var(--bh-space-1);
    flex-shrink: 0;
}
.bh-digest-flag {
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-meta);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    padding: 2px 8px;
    border: 1px solid var(--bh-border);
    border-radius: 3px;
    flex-shrink: 0;
}
.bh-digest-flag-missing {
    color: rgba(160, 160, 160, 0.95);
    border-color: rgba(140, 140, 140, 0.4);
    background: rgba(140, 140, 140, 0.06);
}
.bh-digest-flag-bare {
    color: rgba(220, 188, 156, 0.95);
    border-color: rgba(220, 188, 156, 0.4);
    background: rgba(220, 188, 156, 0.06);
}
.bh-digest-row-flag {
    justify-content: space-between;
}
/* Section-level color cues, semantic (not nth-of-type \u2014 those break when an
   earlier section is filtered out). */
.bh-digest-section-wounds .bh-digest-heading { color: var(--bh-wound); }
.bh-digest-section-held   .bh-digest-heading { color: var(--bh-holding); }

/* \u2500\u2500\u2500 Mobile digest \xD7 view-ladder filters \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   The doll-grid selectors above don't fire in mobile (the grid is
   display:none). These mirror the same hide semantics for the digest. */

/* hide-wounds: drop the whole wounds section + heading + count. */
.beholder-panel.bh-hide-wounds .bh-digest-section-wounds {
    display: none !important;
}

/* hide-damage: tier-colored heading on wounds is fine (it's wound color,
   not damage). But neutralize held heading's gold "holding" tint so the
   visual budget matches the wider hide-damage view. */
.beholder-panel.bh-hide-damage .bh-digest-section-held .bh-digest-heading {
    color: var(--bh-body) !important;
    opacity: var(--bh-mute-soft);
}

/* hide-meta: drop multi-slot tag inside digest rows (already covered by
   .bh-chip-multi rule above, no extra rule needed here). */


/* \u2500\u2500\u2500 Hide color \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   The chip swatch (the small color square next to each item name) is now
   IDENTITY \u2014 it always renders, even with this layer off, because color is
   often the cheapest way to distinguish one of two similar items at a glance
   ("the *red* cloak vs the *blue* cloak"). The Color layer instead toggles
   the verbose color label inside the chip's wrapping row ("rust-red leather"
   etc.). Identity stays visible; verbose annotation is opt-in. */
.beholder-panel.bh-hide-color .bh-chip-verbose-color {
    display: none !important;
}

/* \u2500\u2500\u2500 Hide wounds \u2014 drop wound chips + body-part red tint \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.beholder-panel.bh-hide-wounds .bh-chip-wound {
    display: none !important;
}
/* Restore the default body-part fill / stroke (var(--bh-body-soft) is the
   default \`.bh-body-fill\` color; var(--bh-body) is text-near-white and was
   the white-out bug). */
.beholder-panel.bh-hide-wounds .bh-body-fill.bh-part-wound-1,
.beholder-panel.bh-hide-wounds .bh-body-fill.bh-part-wound-2,
.beholder-panel.bh-hide-wounds .bh-body-fill.bh-part-wound-3 {
    fill: var(--bh-body-soft) !important;
    stroke: var(--bh-body) !important;
    stroke-opacity: 0.45 !important;
    filter: none !important;
}
/* Compact mode equivalent */
.beholder-panel.bh-hide-wounds .beholder-wound,
.beholder-panel.bh-hide-wounds .beholder-row:has(.beholder-wound) { display: none !important; }

/* \u2500\u2500\u2500 Hide gear damage tier \u2014 every damage visual neutralized \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.beholder-panel.bh-hide-damage .bh-chip-verbose-dmg { display: none !important; }
.beholder-panel.bh-hide-damage .bh-chip-dot { display: none !important; }
.beholder-panel.bh-hide-damage .bh-chip.bh-tier-0,
.beholder-panel.bh-hide-damage .bh-chip.bh-tier-1,
.beholder-panel.bh-hide-damage .bh-chip.bh-tier-2,
.beholder-panel.bh-hide-damage .bh-chip.bh-tier-3,
.beholder-panel.bh-hide-damage .bh-chip.bh-tier-4 {
    color: inherit !important;
}
/* Per-chip damage bar \u2014 kill the chip-bar CSS var so the ::before becomes
   transparent. Covers both inline chips AND the layered-wrapper bars. */
.beholder-panel.bh-hide-damage .bh-chip,
.beholder-panel.bh-hide-damage .bh-chip-layered {
    --chip-bar: transparent !important;
}
/* Body-part armor-tier stroke off */
.beholder-panel.bh-hide-damage .bh-body-fill.bh-part-tier-2,
.beholder-panel.bh-hide-damage .bh-body-fill.bh-part-tier-3,
.beholder-panel.bh-hide-damage .bh-body-fill.bh-part-tier-4 {
    stroke: none !important;
    stroke-width: 0 !important;
}
.beholder-panel.bh-hide-damage .bh-silhouette .bh-tail.bh-part-tier-2,
.beholder-panel.bh-hide-damage .bh-silhouette .bh-tail.bh-part-tier-3,
.beholder-panel.bh-hide-damage .bh-silhouette .bh-tail.bh-part-tier-4,
.beholder-panel.bh-hide-damage .bh-silhouette .bh-digi-leg.bh-part-tier-2,
.beholder-panel.bh-hide-damage .bh-silhouette .bh-digi-leg.bh-part-tier-3,
.beholder-panel.bh-hide-damage .bh-silhouette .bh-digi-leg.bh-part-tier-4 {
    stroke-opacity: 0 !important;
}
/* Held items: drop the gold glyph tint to neutral too */
.beholder-panel.bh-hide-damage .bh-chip-hold .bh-chip-glyph {
    color: inherit !important;
    text-shadow: none !important;
}
/* \u2500\u2500\u2500 Backfill status strip \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Sits between the header and the layer bar. Two modes \u2014 offer banner (on
   chat change, before the run) and progress strip (during the run). Quiet
   surface tint + thin divider so it reads as system chrome, not a chip.    */
.beholder-backfill-status {
    padding: var(--bh-space-2) var(--bh-space-3);
    /* Gold left-edge + faint tint so this reads as the same CTA family as the
       no-model banner (which sits directly below it). */
    background: linear-gradient(
        90deg,
        rgba(201, 165, 90, 0.10),
        rgba(201, 165, 90, 0.02) 60%,
        transparent
    );
    border-bottom: 1px solid rgba(201, 165, 90, 0.4);
    box-shadow: inset 3px 0 0 var(--bh-gold-deep);
    font-size: var(--bh-text-secondary);
}
.beholder-backfill-status[hidden] { display: none; }
.bh-bf-progress {
    display: flex;
    align-items: center;
    gap: var(--bh-space-3);
    flex-wrap: wrap;
}
.bh-bf-text { flex: 1 1 auto; opacity: 0.85; line-height: 1.45; }
.beholder-backfill-status .bh-btn {
    padding: 7px 14px;
    font-size: var(--bh-text-secondary);
}
.bh-bf-bar {
    flex: 0 1 120px;
    height: 6px;
    background: var(--bh-divider);
    border-radius: 3px;
    overflow: hidden;
}
.bh-bf-bar-fill {
    display: block;
    height: 100%;
    background: var(--bh-accent, #c9a55a);
    transition: width 0.2s ease-out;
}

/* \u2500\u2500\u2500 Backfill split-button + menu \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Header "history" control is a 2-part split button: clock icon (default
   action) + caret (opens a small dropdown menu with the less-frequent
   ops \u2014 re-seed-only, rebuild-from-scratch). Menu is absolute-positioned
   so the panel layout doesn't reflow when it opens. */
.beholder-backfill-group {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    position: relative;
}
.beholder-backfill-group .beholder-backfill-more {
    /* The click handler is on this element, so its box IS the hit target. It used
       to be font-size:0.7em + padding:0 2px \u2014 a near-unclickable sliver you had to
       hit pixel-perfect. Give it a real, comfortable button-sized target. */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.82em;
    line-height: 1;
    min-width: 20px;
    min-height: 22px;
    padding: 4px 6px;
    cursor: pointer;
    border-radius: 5px;
    transition: background .12s ease, color .12s ease;
}
.beholder-backfill-group .beholder-backfill-more:hover {
    background: var(--bh-surface-2, rgba(255, 255, 255, 0.09));
    color: var(--bh-accent, #c9a55a);
}
.beholder-backfill-group.bh-menu-open .beholder-backfill-more {
    opacity: 1;
    color: var(--bh-accent, #c9a55a);
}

.beholder-bf-menu {
    /* Rendered to <body> + fixed-positioned by panel.js at the caret, so the
       panel's overflow:hidden + container-type can't clip it. The gold brand
       tokens are scoped to .beholder-panel; this menu lives on <body>, so it
       re-declares the ones it + its items use (otherwise it renders unbranded). */
    --bh-gold: #ffeaa7;
    --bh-gold-deep: #c9a55a;
    --bh-border: rgba(255, 255, 255, 0.18);
    --bh-surface-2: rgba(255, 255, 255, 0.07);
    --bh-mute-soft: 0.7;
    position: fixed;
    z-index: 10001;
    min-width: 240px;
    max-width: min(320px, calc(100vw - 16px));
    padding: 4px;
    /* Match the panel's surface exactly (host theme tint), not a hardcoded dark. */
    background: var(--SmartThemeBlurTintColor, rgba(20, 20, 24, 0.92));
    border: 1px solid var(--bh-border);
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.55) 0 8px 28px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    gap: 1px;
    color: var(--SmartThemeBodyColor, #cfd2d6);
    font-size: 0.875em;
}
/* Gold top hairline \u2014 matches the .beholder-tools-menu header dropdown. */
.beholder-bf-menu::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 1px;
    border-radius: 8px 8px 0 0;
    background: linear-gradient(90deg, var(--bh-gold-deep), rgba(201, 165, 90, 0.35) 40%, transparent 80%);
    opacity: 0.75;
}
.beholder-bf-menu .bh-bf-mode {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 9px;
    width: 100%;
    padding: 9px 11px;
    background: transparent;
    border: none;
    border-radius: 5px;
    color: inherit;
    text-align: left;
    cursor: pointer;
    font: inherit;
    line-height: 1.35;
    transition: background 0.12s;
}
/* Gold leading icon \u2014 the brand's accent, same as the tools (\u22EF) menu items. */
.beholder-bf-menu .bh-bf-mode > i {
    flex-shrink: 0;
    width: 16px;
    margin-top: 2px;
    text-align: center;
    color: var(--bh-gold-deep);
}
.beholder-bf-menu .bh-bf-mode-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
}
.beholder-bf-menu .bh-bf-mode:hover,
.beholder-bf-menu .bh-bf-mode:focus-visible {
    background: var(--bh-surface-2);
    outline: none;
}
.beholder-bf-menu .bh-bf-mode-title {
    font-weight: 600;
    color: var(--SmartThemeBodyColor, #e6e6e6);
}
.beholder-bf-menu .bh-bf-mode-sub {
    opacity: var(--bh-mute-soft);
    font-size: 0.9em;
}
.beholder-bf-menu .bh-bf-mode-danger > i,
.beholder-bf-menu .bh-bf-mode-danger .bh-bf-mode-title {
    color: #ff9888;
}
.beholder-bf-menu .bh-bf-mode-danger:hover .bh-bf-mode-title {
    color: #ffb0a0;
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   Gold brand overlay \u2014 buttons, header tools, paired grid, layout switch,
   bottom-sheet editor, view overlays (settings / doctor / inspector / help),
   the desktop slot editor, slot lock/edit decoration, and toasts. All of
   these read from the gold + surface + space tokens declared on
   .beholder-panel above.
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

/* Quiet brand mark before the panel title \u2014 a small filled lens glyph. */
.beholder-panel-title::before {
    content: "\u25C9";
    color: var(--bh-gold-deep);
    margin-right: 0.45em;
    font-size: 0.82em;
    text-shadow: rgba(201, 165, 90, 0.55) 0 0 9px;
    vertical-align: 0.06em;
}

/* Defensive: hide any residual char-head gauge element (stamina retired). */
.beholder-panel .bh-char-head .bh-gauge { display: none !important; }

/* Idle (untracked) facial features on the silhouette render faintly so the
   face still reads as a face even when no eye/ear/mouth slot is populated. */
.bh-silhouette .bh-face-idle { fill: rgba(207, 210, 214, 0.1); stroke-opacity: 0.28; }

/* Onboarding popover \u2014 gold restyle (higher-specificity overrides of the
   neutral defaults above). */
.beholder-onboard .bh-onboard-title {
    color: var(--bh-gold-deep, #c9a55a);
    font-family: "Cinzel", "Trajan Pro", "Georgia", serif;
}
.beholder-onboard .bh-onboard-body b { color: rgb(243, 227, 184); }
.beholder-onboard .bh-onboard-dismiss {
    background: linear-gradient(160deg, rgba(201, 165, 90, 0.28), rgba(201, 165, 90, 0.1));
    border: 1px solid rgba(201, 165, 90, 0.6);
    color: rgb(243, 227, 184);
}
.beholder-onboard .bh-onboard-dismiss:hover {
    filter: none;
    box-shadow: rgba(201, 165, 90, 0.25) 0 4px 18px;
}

/* \u2500\u2500\u2500 Button family \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Shared pill button used across the view overlays + editors. */
.bh-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 12px;
    border-radius: 7px;
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-secondary);
    letter-spacing: 0.05em;
    border: 1px solid var(--bh-border);
    background: var(--bh-surface-1);
    color: var(--bh-body);
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s, background 0.15s, transform 0.1s;
}
.bh-btn:active { transform: scale(0.97); }
.bh-btn:hover {
    border-color: var(--bh-gold-deep);
    color: var(--SmartThemeBodyColor, #e8eaee);
}
.bh-btn-primary {
    background: linear-gradient(160deg, rgba(201, 165, 90, 0.24), rgba(201, 165, 90, 0.07));
    border-color: rgba(201, 165, 90, 0.6);
    color: rgb(243, 227, 184);
}
.bh-btn-primary:hover {
    box-shadow: rgba(201, 165, 90, 0.22) 0 4px 18px;
    border-color: var(--bh-gold-deep);
}
.bh-btn-danger {
    border-color: rgba(255, 130, 110, 0.45);
    color: rgb(255, 152, 136);
}
.bh-btn-danger:hover {
    border-color: rgb(255, 152, 136);
    color: rgb(255, 176, 160);
    box-shadow: none;
}
.bh-btn[disabled] { opacity: 0.45; pointer-events: none; }

/* \u2500\u2500\u2500 Header tool icons + overflow menu \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   The flat icon row (settings / doctor / inspector / help) + a "\u22EF" overflow
   trigger, separated from the backfill group and close button by thin
   dividers. The icons collapse into the overflow menu at narrow widths
   (see the 360px container query above). */
.beholder-tool-btn:focus-visible {
    outline: 1px solid var(--bh-gold-deep);
    outline-offset: 2px;
    border-radius: 3px;
    opacity: 1;
}
.beholder-panel-controls .bh-header-sep {
    width: 1px;
    height: 14px;
    align-self: center;
    flex-shrink: 0;
    margin: 0 1px;
    background: var(--bh-border);
    opacity: 0.8;
}
.beholder-tools-more { display: none; }
.beholder-tools-more.bh-more-open { opacity: 1; color: var(--bh-accent); }
.beholder-tools-menu {
    position: absolute;
    top: calc(100% + 5px);
    right: var(--bh-space-3);
    z-index: 10001;
    min-width: 180px;
    padding: var(--bh-space-1);
    background: rgba(16, 18, 24, 0.98);
    border: 1px solid var(--bh-border);
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.55) 0 8px 28px;
    display: flex;
    flex-direction: column;
    gap: 1px;
}
.beholder-tools-menu::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 1px;
    border-radius: 8px 8px 0 0;
    background: linear-gradient(90deg, var(--bh-gold-deep), rgba(201, 165, 90, 0.35) 40%, transparent 80%);
    opacity: 0.75;
}
.beholder-tools-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 9px 11px;
    background: transparent;
    border: none;
    border-radius: 5px;
    color: var(--SmartThemeBodyColor, #e6e6e6);
    font: inherit;
    font-size: var(--bh-text-body);
    text-align: left;
    cursor: pointer;
    transition: background 0.12s;
}
.beholder-tools-item:hover,
.beholder-tools-item:focus-visible {
    background: var(--bh-surface-2);
    outline: none;
}
.beholder-tools-item i { width: 17px; text-align: center; color: var(--bh-gold-deep); }

/* \u2500\u2500\u2500 Paired doll grid \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Left / center figure / right column layout. Each anatomical pair sits
   across columns 1 and 3; the empty half of a populated pair gets a faint
   ghost card so the grid stays balanced. (Collapses to the digest at narrow
   widths via the 360px container query above.) */
.bh-doll-grid.bh-paired {
    display: grid;
    /* minmax(0, \u2026) side tracks \u2014 see the base .bh-doll-grid note. Extra-important here
       because \`.bh-col { display: contents }\` below dissolves the columns, so the SLOT
       CARDS are the direct grid items; a bare \`1fr\` would size to the widest card's
       min-content and push the right column over the panel edge. */
    grid-template-columns: minmax(0, 1fr) minmax(132px, 148px) minmax(0, 1fr);
    gap: 4px 6px;
    align-items: stretch;
}
.bh-doll-grid.bh-paired .bh-col { display: contents; }
.bh-doll-grid.bh-paired .bh-figure { align-self: start; }
.bh-doll-grid.bh-paired .bh-slot-ghosted { opacity: 0.22; }
.bh-doll-grid.bh-paired .bh-slot-ghosted:hover { opacity: 0.5; }

/* \u2500\u2500\u2500 Layout switch (paired / columns / list) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   List mode forces the digest render via .bh-layout-compact. */
.beholder-panel.bh-layout-compact .bh-doll-grid { display: none; }
.beholder-panel.bh-layout-compact .bh-digest { display: block; }
.bh-layout-switch {
    display: inline-flex;
    margin-top: var(--bh-space-2);
    border: 1px solid var(--bh-border);
    border-radius: 999px;
    overflow: hidden;
    background: var(--bh-surface-1);
}
.bh-layout-switch .bh-ls-opt {
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--bh-body);
    opacity: var(--bh-mute-strong);
    padding: 2px 9px;
    font-size: var(--bh-text-meta);
    line-height: 1.2;
    transition: background 0.15s, color 0.15s, opacity 0.15s;
}
.bh-layout-switch .bh-ls-opt + .bh-ls-opt { border-left: 1px solid var(--bh-divider); }
.bh-layout-switch .bh-ls-opt:hover {
    opacity: 0.85;
    color: var(--SmartThemeBodyColor, #e8eaee);
}
.bh-layout-switch .bh-ls-opt.bh-ls-active {
    opacity: 1;
    color: var(--bh-gold, #ffeaa7);
    background: var(--bh-surface-2);
}
.bh-layout-switch-row { display: flex; justify-content: flex-end; }

/* Digest toolbar \u2014 "Edit slots" action on the left, a layout switch on the
   right, above the digest priority feed. */
.bh-digest-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--bh-space-2);
    margin-bottom: var(--bh-space-3);
}
.bh-digest-edit {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 6px 14px;
    border-radius: 8px;
    background: linear-gradient(160deg, rgba(201, 165, 90, 0.2), rgba(201, 165, 90, 0.06));
    border: 1px solid rgba(201, 165, 90, 0.5);
    color: rgb(243, 227, 184);
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-secondary);
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: box-shadow 0.15s, border-color 0.15s;
}
.bh-digest-edit:hover {
    box-shadow: rgba(201, 165, 90, 0.2) 0 3px 14px;
    border-color: var(--bh-gold-deep);
}
.bh-digest-edit i { font-size: 0.9em; }

/* \u2500\u2500\u2500 Mobile bottom sheet (slot picker + slot editor) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Slides up from the bottom of the panel on touch / narrow layouts. */
.bh-sheet-backdrop {
    position: absolute;
    inset: 0;
    z-index: 95;
    background: rgba(0, 0, 0, 0.45);
    animation: 0.15s ease-out bh-view-in;
}
.bh-edit-sheet {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 96;
    max-height: 88%;
    display: flex;
    flex-direction: column;
    background: var(--SmartThemeBlurTintColor, rgba(13, 15, 20, 0.98));
    border-top: 1px solid var(--bh-border);
    border-radius: 14px 14px 0 0;
    box-shadow: rgba(0, 0, 0, 0.6) 0 -10px 40px;
    animation: 0.2s cubic-bezier(0.2, 0.7, 0.2, 1) bh-sheet-up;
}
@keyframes bh-sheet-up {
    0% { transform: translateY(100%); }
    100% { transform: none; }
}
@media (prefers-reduced-motion: reduce) {
    .bh-edit-sheet { animation: none; }
    .bh-sheet-backdrop { animation: none; }
}
.bh-edit-sheet::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 1px;
    border-radius: 14px 14px 0 0;
    background: linear-gradient(90deg, var(--bh-gold-deep) 0%, rgba(201, 165, 90, 0.4) 22%, transparent 60%);
    opacity: 0.8;
}
.bh-sheet-head {
    display: flex;
    align-items: center;
    gap: var(--bh-space-2);
    padding: var(--bh-space-3);
    border-bottom: 1px solid var(--bh-divider);
    flex-shrink: 0;
}
.bh-sheet-back,
.bh-sheet-close {
    cursor: pointer;
    opacity: var(--bh-mute-soft);
    padding: 5px;
    font-size: 1.05em;
    transition: opacity 0.15s, color 0.15s;
}
.bh-sheet-back[hidden] { display: none; }
.bh-sheet-back:hover,
.bh-sheet-close:hover { opacity: 1; color: var(--bh-gold-deep); }
.bh-sheet-title {
    flex: 1 1 0%;
    font-family: var(--bh-font-display);
    font-size: var(--bh-text-large);
    font-weight: 600;
    letter-spacing: 0.06em;
}
.bh-sheet-close { margin-left: auto; }
.bh-sheet-body {
    flex: 1 1 0%;
    overflow-y: auto;
    padding: var(--bh-space-3);
    scrollbar-width: thin;
    scrollbar-color: var(--bh-border) transparent;
}
.bh-sheet-lockrow {
    display: flex;
    justify-content: flex-end;
    margin-bottom: var(--bh-space-2);
}
.bh-sheet-body .bh-editor-body { max-height: none; overflow: visible; padding: 0; }
.bh-sheet-body .bh-editor-foot {
    border-top: 1px solid var(--bh-divider);
    margin-top: var(--bh-space-3);
    padding: var(--bh-space-3) 0 0;
    background: transparent;
}
.bh-slot-picker { display: flex; flex-direction: column; gap: var(--bh-space-3); }
.bh-pick-region-head {
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-meta);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--bh-gold-deep);
    margin-bottom: var(--bh-space-1);
}
.bh-pick-slot {
    display: flex;
    align-items: center;
    gap: var(--bh-space-2);
    width: 100%;
    padding: 10px 12px;
    margin-bottom: 3px;
    background: var(--bh-surface-1);
    border: 1px solid var(--bh-divider);
    border-radius: 8px;
    color: var(--bh-body);
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition: background 0.12s, border-color 0.12s;
}
.bh-pick-slot:hover,
.bh-pick-slot:focus-visible {
    background: var(--bh-surface-2);
    border-color: var(--bh-gold-deep);
    outline: none;
}
.bh-pick-label {
    flex-shrink: 0;
    min-width: 5.5em;
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-secondary);
    letter-spacing: 0.04em;
    text-transform: lowercase;
    color: var(--SmartThemeBodyColor, #e6e6e6);
}
.bh-pick-summary {
    flex: 1 1 0%;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: var(--bh-text-secondary);
    opacity: 0.85;
}
.bh-pick-summary.bh-pick-empty { opacity: 0.4; font-style: italic; }
.bh-pick-summary.bh-pick-bare { color: rgba(220, 188, 156, 0.95); opacity: 1; }
.bh-pick-summary.bh-pick-missing { color: rgba(160, 160, 160, 0.95); font-style: italic; opacity: 1; }
.bh-pick-mark { flex-shrink: 0; font-size: 0.85em; }
.bh-pick-lock { color: var(--bh-gold); }
.bh-pick-edited { color: var(--bh-gold-deep); }
.bh-pick-arrow { flex-shrink: 0; opacity: 0.4; font-size: 0.8em; }

/* \u2500\u2500\u2500 View overlay (settings / doctor / inspector / help) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Full-panel overlay surface with its own header, scroll body, and a set of
   collapsible sections. */
.bh-view {
    position: absolute;
    inset: 0;
    z-index: 60;
    display: flex;
    flex-direction: column;
    background: var(--SmartThemeBlurTintColor, rgba(13, 15, 20, 0.97));
    border-radius: 12px;
    overflow: hidden;
    animation: 0.18s ease-out bh-view-in;
}
@keyframes bh-view-in {
    0% { opacity: 0; transform: translateY(6px); }
    100% { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
    .bh-view { animation: none; }
}
.bh-view-head {
    display: flex;
    align-items: center;
    gap: var(--bh-space-2);
    padding: var(--bh-space-2) var(--bh-space-3);
    background: var(--bh-surface-2);
    border-bottom: 1px solid var(--bh-divider);
    position: relative;
    flex-shrink: 0;
    cursor: move;
}
.bh-view-head::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 1px;
    background: linear-gradient(90deg, var(--bh-gold-deep) 0%, rgba(201, 165, 90, 0.4) 22%, transparent 60%);
    opacity: 0.7;
}
.bh-view-back {
    cursor: pointer;
    opacity: var(--bh-mute-soft);
    padding: 2px 6px 2px 2px;
    transition: opacity 0.15s, color 0.15s;
}
.bh-view-back:hover { opacity: 1; color: var(--bh-gold-deep); }
.bh-view-title {
    font-family: var(--bh-font-display);
    font-size: var(--bh-text-large);
    font-weight: 600;
    letter-spacing: 0.1em;
}
.bh-view-title .bh-view-crumb {
    opacity: 0.45;
    font-size: 0.82em;
    letter-spacing: 0.08em;
    margin-right: 0.4em;
}
.bh-view-body {
    flex: 1 1 0%;
    overflow-y: auto;
    padding: var(--bh-space-3);
    scrollbar-width: thin;
    scrollbar-color: var(--bh-border) transparent;
    font-size: var(--bh-text-secondary);
    user-select: text;
}
.bh-vsection {
    border: 1px solid var(--bh-divider);
    border-radius: 10px;
    background: var(--bh-surface-1);
    margin-bottom: var(--bh-space-3);
    overflow: hidden;
}
.bh-vsection > summary {
    list-style: none;
    cursor: pointer;
    padding: var(--bh-space-2) var(--bh-space-3);
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-meta);
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--bh-gold-deep);
    display: flex;
    align-items: center;
    gap: 8px;
    user-select: none;
}
.bh-vsection > summary::-webkit-details-marker { display: none; }
.bh-vsection > summary::after {
    content: "\u203A";
    margin-left: auto;
    opacity: 0.5;
    transition: transform 0.15s;
    font-size: 1.25em;
    letter-spacing: 0;
}
.bh-vsection[open] > summary::after { transform: rotate(90deg); }
.bh-vsection-body {
    padding: 0 var(--bh-space-3) var(--bh-space-3);
    display: flex;
    flex-direction: column;
    gap: var(--bh-space-3);
}
.bh-vsection-body p { margin: 0; opacity: 0.8; line-height: 1.5; }
/* The Advanced > custom-endpoint body is NOT a .bh-vsection-body, so it missed the
   column-gap spacing and its endpoint/model/key bars stacked flush. Match the same
   rhythm so each field has a few px of breathing room under it. */
.bh-adv-endpoint-body {
    display: flex;
    flex-direction: column;
    gap: var(--bh-space-3);
}
.bh-field { display: flex; flex-direction: column; gap: 3px; }
.bh-field > label {
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-meta);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.6;
}
.bh-input,
.bh-select {
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid var(--bh-border);
    border-radius: 6px;
    color: var(--SmartThemeBodyColor, #e6e6e6);
    font: inherit;
    padding: 6px 9px;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.15s, box-shadow 0.15s;
}
.bh-input:focus-visible,
.bh-select:focus-visible {
    outline: none;
    border-color: var(--bh-gold-deep);
    box-shadow: rgba(201, 165, 90, 0.12) 0 0 0 3px;
}
.bh-check { display: flex; align-items: baseline; gap: 8px; cursor: pointer; line-height: 1.45; }
.bh-check input { accent-color: var(--bh-gold-deep); flex-shrink: 0; }
.bh-check small { display: block; opacity: 0.55; font-size: 0.88em; }
.bh-row-actions { display: flex; gap: var(--bh-space-2); flex-wrap: wrap; align-items: center; }
.bh-conn-status {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-meta);
    letter-spacing: 0.06em;
    opacity: 0.85;
}
.bh-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    background: var(--bh-mute-strong, #777);
}
.bh-dot-ok { background: rgb(106, 212, 139); box-shadow: rgba(106, 212, 139, 0.6) 0 0 6px; }
.bh-dot-warn { background: rgb(227, 201, 105); box-shadow: rgba(227, 201, 105, 0.6) 0 0 6px; }
.bh-dot-bad { background: rgb(226, 100, 100); box-shadow: rgba(226, 100, 100, 0.6) 0 0 6px; }
.bh-dot-busy { background: var(--bh-gold-deep); animation: 1s ease-in-out infinite bh-dot-pulse; }
@keyframes bh-dot-pulse {
    50% { opacity: 0.35; }
}
.bh-vitals { display: flex; flex-direction: column; }
.bh-vital {
    display: flex;
    align-items: baseline;
    gap: 10px;
    padding: 6px 2px;
    border-bottom: 1px dashed var(--bh-divider);
    line-height: 1.4;
}
.bh-vital:last-child { border-bottom: none; }
.bh-vital .bh-dot { align-self: center; }
.bh-vital-label {
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-meta);
    letter-spacing: 0.07em;
    text-transform: uppercase;
    opacity: 0.6;
    flex: 0 0 34%;
}
.bh-vital-value { flex: 1 1 0%; min-width: 0; overflow-wrap: anywhere; }
.bh-vital-value code {
    background: rgba(255, 255, 255, 0.06);
    padding: 0 5px;
    border-radius: 3px;
    font-size: 0.92em;
}
.bh-code {
    background: rgba(0, 0, 0, 0.32);
    border: 1px solid var(--bh-divider);
    border-radius: 8px;
    padding: var(--bh-space-2) var(--bh-space-3);
    font-family: var(--bh-font-data);
    font-size: 0.8em;
    line-height: 1.5;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    max-height: 240px;
    overflow-y: auto;
    margin: 0;
    color: var(--bh-body);
    scrollbar-width: thin;
    scrollbar-color: var(--bh-border) transparent;
    user-select: text;
}
.bh-pane-meta {
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-meta);
    letter-spacing: 0.05em;
    opacity: 0.5;
    margin-left: auto;
    text-transform: none;
}
.bh-vlog { display: flex; flex-direction: column; gap: 4px; }
.bh-vlog-row {
    display: flex;
    align-items: baseline;
    gap: 8px;
    font-family: var(--bh-font-data);
    font-size: 0.8em;
    line-height: 1.45;
    padding: 4px 8px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.025);
    border-left: 2px solid var(--bh-divider);
}
.bh-vlog-row b { flex-shrink: 0; font-size: 0.85em; letter-spacing: 0.1em; }
.bh-vlog-warn { border-left-color: rgb(227, 201, 105); }
.bh-vlog-warn b { color: rgb(227, 201, 105); }
.bh-vlog-error { border-left-color: rgb(226, 100, 100); }
.bh-vlog-error b { color: rgb(255, 118, 118); }
.bh-vlog-ok { border-left-color: rgb(106, 212, 139); opacity: 0.75; }
.bh-vlog-ok b { color: rgb(106, 212, 139); }
.bh-turns { width: 100%; border-collapse: collapse; font-size: 0.85em; }
.bh-turns th {
    font-family: var(--bh-font-data);
    font-size: 0.78em;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.5;
    text-align: left;
    padding: 3px 8px 5px 0;
    border-bottom: 1px solid var(--bh-divider);
    font-weight: 500;
}
.bh-turns td {
    padding: 5px 8px 5px 0;
    border-bottom: 1px dashed var(--bh-divider);
    font-family: var(--bh-font-data);
    font-size: 0.92em;
}
.bh-turns tr:last-child td { border-bottom: none; }
.bh-tips {
    margin: 0;
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 7px;
}
.bh-tips li { line-height: 1.5; opacity: 0.85; }
.bh-tips li::marker { color: var(--bh-gold-deep); }
.bh-tips b { color: rgb(243, 227, 184); font-weight: 600; }
.bh-orn {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: var(--bh-space-2) auto;
    max-width: 220px;
    color: rgba(201, 165, 90, 0.55);
    font-size: 0.85em;
    text-shadow: rgba(201, 165, 90, 0.5) 0 0 12px;
}
.bh-orn span {
    flex: 1 1 0%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201, 165, 90, 0.35));
}
.bh-orn span:last-child {
    background: linear-gradient(90deg, rgba(201, 165, 90, 0.35), transparent);
}

/* \u2500\u2500\u2500 Desktop slot editor (floating popover) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Per-slot worn / held / wound editor anchored to the clicked card. */
.bh-editor {
    position: absolute;
    z-index: 80;
    width: min(330px, 100% - 16px);
    background: rgba(16, 18, 24, 0.98);
    border: 1px solid var(--bh-border);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.6) 0 14px 44px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-size: var(--bh-text-secondary);
    animation: 0.15s ease-out bh-view-in;
}
.bh-editor-head {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: var(--bh-space-2) var(--bh-space-3);
    background: var(--bh-surface-2);
    border-bottom: 1px solid var(--bh-divider);
    position: relative;
}
.bh-editor-head::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 1px;
    background: linear-gradient(90deg, var(--bh-gold-deep), rgba(201, 165, 90, 0.35) 40%, transparent 80%);
    opacity: 0.7;
}
.bh-editor-title {
    font-family: var(--bh-font-display);
    font-weight: 600;
    font-size: var(--bh-text-large);
    letter-spacing: 0.08em;
}
.bh-editor-slot {
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-meta);
    letter-spacing: 0.08em;
    text-transform: lowercase;
    opacity: 0.55;
}
.bh-editor-close { margin-left: auto; cursor: pointer; opacity: 0.6; }
.bh-editor-close:hover { opacity: 1; color: var(--bh-gold-deep); }
.bh-editor-body {
    padding: var(--bh-space-3);
    display: flex;
    flex-direction: column;
    gap: var(--bh-space-2);
    overflow-y: auto;
    max-height: 52vh;
    scrollbar-width: thin;
    scrollbar-color: var(--bh-border) transparent;
}
.bh-editor-group-label {
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-meta);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--bh-gold-deep);
    opacity: 0.85;
    margin-top: var(--bh-space-1);
    display: flex;
    align-items: center;
    gap: 8px;
}
.bh-editor-group-label::after { content: ""; flex: 1 1 0%; height: 1px; background: var(--bh-divider); }
.bh-editor-row {
    display: grid;
    grid-template-columns: 1fr 86px 74px 22px;
    gap: 6px;
    align-items: center;
}
.bh-editor-row .bh-input,
.bh-editor-row .bh-select { padding: 4px 7px; font-size: 0.92em; }
.bh-editor-row-wound { grid-template-columns: 1fr 86px 24px 22px; }
.bh-editor-remove {
    background: none;
    border: none;
    color: var(--bh-body);
    opacity: 0.4;
    cursor: pointer;
    font-size: 0.95em;
    padding: 2px;
    transition: opacity 0.12s, color 0.12s;
}
.bh-editor-remove:hover { opacity: 1; color: rgb(255, 133, 133); }
.bh-editor-add {
    align-self: flex-start;
    background: none;
    border: 1px dashed var(--bh-border);
    border-radius: 6px;
    color: var(--bh-body);
    opacity: 0.6;
    cursor: pointer;
    font: inherit;
    font-size: 0.88em;
    padding: 3px 10px;
    transition: opacity 0.12s, border-color 0.12s, color 0.12s;
}
.bh-editor-add:hover { opacity: 1; border-color: var(--bh-gold-deep); color: rgb(243, 227, 184); }
.bh-bleed-check { display: inline-flex; align-items: center; justify-content: center; }
.bh-bleed-check input { accent-color: rgb(255, 71, 71); }
.bh-editor-body.bhe-missing-mode > :not(.bh-row-actions):not(.bh-editor-group-label:last-of-type) {
    opacity: 0.35;
    pointer-events: none;
}
.bh-editor-body.bhe-missing-mode > .bh-row-actions,
.bh-editor-body.bhe-missing-mode > .bh-editor-group-label:last-of-type {
    opacity: 1;
    pointer-events: auto;
}
.bh-editor-foot {
    display: flex;
    gap: var(--bh-space-2);
    padding: var(--bh-space-2) var(--bh-space-3);
    border-top: 1px solid var(--bh-divider);
    background: var(--bh-surface-1);
    align-items: center;
}
.bh-editor-foot .bh-btn-primary { margin-left: auto; }
.bh-lock-toggle {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-meta);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.6;
    border: 1px solid var(--bh-border);
    border-radius: 20px;
    padding: 2px 10px;
    transition: opacity 0.15s, border-color 0.15s, color 0.15s;
    user-select: none;
}
.bh-lock-toggle:hover { opacity: 1; }
.bh-lock-toggle.bh-locked-on {
    opacity: 1;
    color: var(--bh-gold);
    border-color: rgba(255, 234, 167, 0.5);
    text-shadow: rgba(255, 234, 167, 0.4) 0 0 8px;
}

/* \u2500\u2500\u2500 Slot card lock / user-edited decoration \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   A locked slot is pinned by the user so model deltas can't overwrite it; a
   user-edited slot carries a small \u270E mark. */
.bh-slot-card { cursor: pointer; }
.bh-slot-card.bh-slot-locked {
    border-color: rgba(201, 165, 90, 0.45);
    background: rgba(201, 165, 90, 0.05);
}
.bh-slot-lock-glyph {
    color: var(--bh-gold);
    font-size: 0.72em;
    margin-left: 5px;
    text-shadow: rgba(255, 234, 167, 0.45) 0 0 7px;
    flex-shrink: 0;
}
.bh-slot-card.bh-slot-user-edited .bh-slot-name::after {
    content: "\u270E";
    color: var(--bh-gold-deep);
    font-size: 0.85em;
    margin-left: 5px;
    opacity: 0.8;
}

/* \u2500\u2500\u2500 Toast \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Transient confirmation message, centered near the bottom of the viewport. */
.bh-toast {
    position: fixed;
    left: 50%;
    bottom: 86px;
    transform: translateX(-50%) translateY(8px);
    z-index: 99999;
    background: rgba(16, 18, 24, 0.97);
    border: 1px solid rgba(201, 165, 90, 0.55);
    border-radius: 9px;
    color: rgb(243, 227, 184);
    font: 13px / 1.45 "JetBrains Mono", monospace;
    letter-spacing: 0.03em;
    padding: 9px 18px;
    box-shadow: rgba(0, 0, 0, 0.55) 0 10px 34px, rgba(201, 165, 90, 0.12) 0 0 22px;
    opacity: 0;
    transition: opacity 0.2s, transform 0.2s;
    pointer-events: none;
    max-width: min(520px, 86vw);
    text-align: center;
}
.bh-toast.bh-toast-in { opacity: 1; transform: translateX(-50%) translateY(0); }

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   Local-model card + "no model active" banner (browser-engine surfaces)
   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Built entirely from the existing gold + surface + space tokens. The card
   lives at the top of the settings view's Connection section (above the
   custom-endpoint fields, which move under a collapsed Advanced <details>);
   the banner is a persistent strip in the panel, modelled on the backfill
   status strip. No new color system \u2014 readiness dots reuse .bh-dot*,
   buttons reuse .bh-btn family, the progress bar mirrors .bh-bf-bar.
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

/* \u2500\u2500\u2500 Local-model card \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   An elevated panel inside the settings view. Reads as the primary control
   for the connection section \u2014 a touch more presence than a .bh-vsection
   (gold hairline top rule, like the editor/header chrome) without inventing
   new tokens. */
.bh-localmodel-card {
    position: relative;
    border: 1px solid var(--bh-border);
    border-radius: 10px;
    background: var(--bh-surface-2);
    padding: var(--bh-space-3);
    margin-bottom: var(--bh-space-3);
    display: flex;
    flex-direction: column;
    gap: var(--bh-space-2);
    overflow: hidden;
}
/* Quiet gold top rule \u2014 same anchored-on-the-left gradient the header and
   editor use, so the card reads as part of the brand chrome. */
.bh-localmodel-card::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 1px;
    background: linear-gradient(
        90deg,
        var(--bh-gold-deep),
        rgba(201, 165, 90, 0.35) 40%,
        transparent 80%
    );
    opacity: 0.7;
    pointer-events: none;
}

/* Card header: a label + the lifecycle status pill. */
.bh-lm-head {
    display: flex;
    align-items: center;
    gap: var(--bh-space-2);
    flex-wrap: wrap;
}
.bh-lm-title {
    font-family: var(--bh-font-display);
    font-size: var(--bh-text-large);
    font-weight: 600;
    letter-spacing: 0.08em;
    color: var(--SmartThemeBodyColor, #e8eaee);
}
/* Microchip accent at the right of the head (the leading status dot is the
   primary marker). */
.bh-lm-glyph {
    color: var(--bh-gold-deep);
    opacity: 0.6;
    margin-left: auto;
    font-size: 0.95em;
}
/* The pinned model id / version line under the header. */
.bh-lm-modelid {
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-meta);
    opacity: 0.6;
    margin: 2px 0 6px;
}
.bh-lm-modelid code { font-family: inherit; }
/* Status pill \u2014 a dot + short word ("ready", "off", "downloading\u2026").
   Reuses the conn-status idiom and the .bh-dot* color set. */
.bh-lm-status {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-left: auto;
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-meta);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.85;
    white-space: nowrap;
}

/* Descriptive copy line below the header (state-dependent prose). */
.bh-lm-copy {
    font-size: var(--bh-text-secondary);
    line-height: 1.5;
    opacity: 0.8;
    margin: 0;
}
.bh-lm-copy code {
    background: rgba(255, 255, 255, 0.06);
    padding: 0 5px;
    border-radius: 3px;
    font-size: 0.92em;
}

/* \u2500\u2500\u2500 Readiness rows (GPU / Disk / RAM) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Same anatomy as the Doctor vitals: a status dot, a mono label, a value.
   Reuses .bh-dot / .bh-dot-ok / .bh-dot-warn / .bh-dot-bad exactly. */
.bh-lm-readiness {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--bh-divider);
    border-radius: 8px;
    background: var(--bh-surface-1);
    padding: 0 var(--bh-space-3);
}
.bh-lm-readiness-row {
    display: flex;
    align-items: baseline;
    gap: 10px;
    padding: 6px 0;
    border-bottom: 1px dashed var(--bh-divider);
    line-height: 1.4;
}
.bh-lm-readiness-row:last-child { border-bottom: none; }
.bh-lm-readiness-row .bh-dot { align-self: center; }
.bh-lm-readiness-label {
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-meta);
    letter-spacing: 0.07em;
    text-transform: uppercase;
    opacity: 0.6;
    flex: 0 0 22%;
    min-width: 56px;
}
.bh-lm-readiness-value {
    flex: 1 1 0%;
    min-width: 0;
    overflow-wrap: anywhere;
    font-size: var(--bh-text-secondary);
}
/* "hint only" qualifier (RAM is a total-not-free Chromium hint). Quiet
   trailing note so the honest copy doesn't read as a hard number. */
.bh-lm-readiness-hint {
    font-family: var(--bh-font-data);
    font-size: 0.82em;
    letter-spacing: 0.04em;
    opacity: 0.45;
    margin-left: 6px;
    text-transform: lowercase;
}
/* Actionable help line under a FAILED gate (e.g. how to enable WebGPU per
   browser) \u2014 a readable gold block note, NOT the faint inline qualifier above. */
.bh-lm-hint {
    display: block;
    margin-top: 4px;
    font-size: 0.86em;
    line-height: 1.45;
    color: var(--bh-gold-soft, #e9d9a8);
    opacity: 0.9;
}
/* Card "update available" indicator (persists after the dialog is dismissed). */
.bh-lm-update {
    display: flex;
    align-items: center;
    gap: var(--bh-space-2);
    margin: var(--bh-space-2) 0;
    padding: var(--bh-space-2) var(--bh-space-3);
    border-radius: 8px;
    background: rgba(201, 165, 90, 0.12);
    box-shadow: inset 2px 0 0 var(--bh-gold-deep);
    font-size: var(--bh-text-secondary);
}
.bh-lm-update > span { flex: 1 1 auto; min-width: 0; }
.bh-lm-update .bh-btn { flex: 0 0 auto; padding: 5px 12px; }

/* \u2500\u2500\u2500 Model-update banner (in-panel CTA strip; sibling of the no-model banner) \u2500\u2500 */
.bh-update-banner {
    display: flex;
    align-items: center;
    gap: var(--bh-space-3);
    flex-wrap: wrap;
    padding: var(--bh-space-2) var(--bh-space-3);
    font-size: var(--bh-text-secondary);
    border-bottom: 1px solid rgba(201, 165, 90, 0.4);
    box-shadow: inset 3px 0 0 var(--bh-gold-deep);
    background: linear-gradient(
        90deg,
        rgba(201, 165, 90, 0.16),
        rgba(201, 165, 90, 0.04) 60%,
        transparent
    );
}
.bh-update-banner-copy { flex: 1 1 auto; min-width: 0; line-height: 1.45; }
.bh-update-banner-copy > i { color: var(--bh-gold-deep); margin-right: 4px; }
.bh-update-banner-actions {
    display: flex;
    gap: var(--bh-space-2);
    flex: 1 1 100%;
}
.bh-update-banner .bh-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 6px 12px;
    font-size: var(--bh-text-secondary);
    text-decoration: none;
}
.bh-update-banner .bh-update-now { flex: 1 1 0%; }
.bh-update-banner .bh-update-later { flex: 0 0 auto; padding: 6px 10px; opacity: 0.8; }

/* \u2500\u2500\u2500 Progress bar (download / load) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Mirrors the backfill bar (.bh-bf-bar) but full-width with a label row, so
   the long weight-streaming phase reads clearly. */
.bh-lm-progress {
    display: flex;
    flex-direction: column;
    gap: var(--bh-space-1);
}
.bh-lm-progress-label {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--bh-space-2);
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-meta);
    letter-spacing: 0.06em;
    opacity: 0.75;
}
.bh-lm-progress-pct { font-weight: 600; color: rgb(243, 227, 184); }
.bh-lm-progress-bar {
    height: 6px;
    background: var(--bh-divider);
    border-radius: 3px;
    overflow: hidden;
}
.bh-lm-progress-fill {
    display: block;
    height: 100%;
    width: 0;
    background: var(--bh-accent, #c9a55a);
    box-shadow: rgba(201, 165, 90, 0.4) 0 0 8px;
    transition: width 0.2s ease-out;
}
/* Indeterminate phase (WebGPU kernel compile reports no fine-grained pct):
   a slow shimmer across the bar. Honors reduced-motion. */
.bh-lm-progress-bar.bh-lm-indeterminate .bh-lm-progress-fill {
    width: 40%;
    box-shadow: none;
    animation: bh-lm-indet 1.3s ease-in-out infinite;
}
@keyframes bh-lm-indet {
    0%   { transform: translateX(-110%); }
    100% { transform: translateX(310%); }
}
@media (prefers-reduced-motion: reduce) {
    .bh-lm-progress-bar.bh-lm-indeterminate .bh-lm-progress-fill {
        animation: none;
        width: 100%;
        opacity: 0.5;
    }
}

/* \u2500\u2500\u2500 Primary lifecycle button \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   The card's single action (Download \xB7 ~X.X GB / Enable / Disable / Retry /
   Pause). Built on .bh-btn + .bh-btn-primary, just stretched full-width and
   sized a step up so it reads as the card's call-to-action. Disable uses the
   existing danger variant; the action row carries one button at a time. */
.bh-lm-action { display: flex; gap: var(--bh-space-2); align-items: center; }
.bh-lm-btn {
    flex: 1 1 auto;
    justify-content: center;
    padding: 8px 14px;
    font-size: var(--bh-text-body);
    letter-spacing: 0.06em;
}
/* Download size / sublabel inside the button, dimmed so the verb leads. */
.bh-lm-btn .bh-lm-btn-sub {
    opacity: 0.7;
    font-size: 0.88em;
    letter-spacing: 0.04em;
}

/* \u2500\u2500\u2500 Collapsed Advanced section (custom endpoint) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   The existing endpoint/model/apiKey fields move under this <details>. It's
   a quieter sibling of .bh-vsection \u2014 same disclosure idiom, dimmed summary
   so it visually defers to the local-model card above it. */
.bh-lm-advanced {
    border: 1px solid var(--bh-divider);
    border-radius: 8px;
    background: var(--bh-surface-1);
    margin-bottom: var(--bh-space-3);
    overflow: hidden;
}
.bh-lm-advanced > summary {
    list-style: none;
    cursor: pointer;
    padding: var(--bh-space-2) var(--bh-space-3);
    font-family: var(--bh-font-data);
    font-size: var(--bh-text-meta);
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--bh-body);
    opacity: 0.6;
    display: flex;
    align-items: center;
    gap: 8px;
    user-select: none;
    transition: opacity 0.15s, color 0.15s;
}
.bh-lm-advanced > summary:hover { opacity: 0.9; color: var(--bh-gold-deep); }
.bh-lm-advanced > summary::-webkit-details-marker { display: none; }
.bh-lm-advanced > summary::after {
    content: "\u203A";
    margin-left: auto;
    opacity: 0.5;
    transition: transform 0.15s;
    font-size: 1.25em;
    letter-spacing: 0;
}
.bh-lm-advanced[open] > summary {
    opacity: 0.85;
    color: var(--bh-gold-deep);
}
.bh-lm-advanced[open] > summary::after { transform: rotate(90deg); }
.bh-lm-advanced-body {
    padding: 0 var(--bh-space-3) var(--bh-space-3);
    display: flex;
    flex-direction: column;
    gap: var(--bh-space-2);
}

/* \u2500\u2500\u2500 "No model active" banner \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   A persistent strip in the panel, shown when no transport resolves
   (inactive). Two on-brand variants:
     .bh-banner-warn  \u2014 alarm (never set up / endpoint unreachable): gold-edged
                        prominent strip that asks for action.
     .bh-banner-calm  \u2014 deliberate "disabled" note: quieter, neutral chrome
                        so a purposeful off-state doesn't read as an error.
   Modelled on .beholder-backfill-status (surface tint, divider, [hidden]). */
.bh-no-model-banner {
    display: flex;
    align-items: center;
    gap: var(--bh-space-3);
    flex-wrap: wrap;
    padding: var(--bh-space-2) var(--bh-space-3);
    background: var(--bh-surface-1);
    border-bottom: 1px solid var(--bh-divider);
    font-size: var(--bh-text-secondary);
    position: relative;
}
.bh-no-model-banner[hidden] { display: none; }
.bh-no-model-banner .bh-banner-copy {
    flex: 1 1 auto;
    min-width: 0;
    line-height: 1.45;
}
.bh-banner-copy b { color: rgb(243, 227, 184); font-weight: 600; }
.bh-no-model-banner .bh-banner-icon {
    flex-shrink: 0;
    align-self: center;
}
.bh-no-model-banner .bh-banner-actions {
    display: flex;
    gap: var(--bh-space-2);
    flex: 1 1 100%;
    justify-content: center;
}
/* Reuse the pill buttons, sized down to strip scale (matches the backfill
   strip's menu_button sizing). */
.bh-no-model-banner .bh-btn {
    padding: 7px 14px;
    font-size: var(--bh-text-secondary);
}
/* Full-width gold buttons \u2014 split the action row evenly so the CTA reads as one
   solid block rather than centered shrink-to-fit pills. */
.bh-no-model-banner .bh-banner-actions .bh-btn {
    flex: 1 1 0%;
    justify-content: center;
}

/* Warn variant \u2014 prominent but on-brand: gold-tinted left accent + a leading
   \u25C8 glyph that draws the eye without an alarm-red color. */
.bh-no-model-banner.bh-banner-warn,
.bh-no-model-banner.bh-banner-loading {
    background: linear-gradient(
        90deg,
        rgba(201, 165, 90, 0.16),
        rgba(201, 165, 90, 0.04) 60%,
        transparent
    );
    border-bottom-color: rgba(201, 165, 90, 0.4);
    box-shadow: inset 3px 0 0 var(--bh-gold-deep);
}
/* "Loading" shares the gold edge but leans calmer (lighter fill) + a gold spinner,
   so it reads as in-progress, not alarm \u2014 and stays on the gold house style. */
.bh-no-model-banner.bh-banner-loading {
    background: linear-gradient(
        90deg,
        rgba(201, 165, 90, 0.10),
        rgba(201, 165, 90, 0.02) 60%,
        transparent
    );
}
.bh-no-model-banner .bh-banner-spin { color: var(--bh-gold-deep); }
.bh-no-model-banner.bh-banner-warn .bh-banner-icon {
    color: var(--bh-gold-deep);
    text-shadow: rgba(201, 165, 90, 0.45) 0 0 8px;
}

/* Calm variant \u2014 deliberate off: muted, no gold pull, a quiet \u25CB marker.
   It's still persistent, just a note rather than a call to action. */
.bh-no-model-banner.bh-banner-calm {
    background: var(--bh-surface-1);
    opacity: 0.9;
}
.bh-no-model-banner.bh-banner-calm .bh-banner-copy {
    opacity: var(--bh-mute-soft);
}
.bh-no-model-banner.bh-banner-calm .bh-banner-icon {
    color: var(--bh-body);
    opacity: 0.5;
}
.bh-no-model-banner.bh-banner-calm .bh-btn { opacity: 0.8; }
.bh-no-model-banner.bh-banner-calm .bh-btn:hover { opacity: 1; }

/* \u2500\u2500\u2500 Narrow-container behavior (consistent with the panel's @container) \u2500\u2500
   Below 360px the panel is the mobile digest; the card + banner stack their
   actions full-width and drop the readiness label column to a fixed minimum
   so values keep room. Mirrors the existing bhpanel container queries. */
@container bhpanel (max-width: 360px) {
    .bh-lm-head { gap: var(--bh-space-1); }
    .bh-lm-status { margin-left: 0; flex-basis: 100%; }
    .bh-lm-readiness-label { flex-basis: 30%; }
    .bh-no-model-banner { gap: var(--bh-space-2); }
    .bh-no-model-banner .bh-banner-actions {
        flex-basis: 100%;
        justify-content: stretch;
    }
    .bh-no-model-banner .bh-banner-actions .bh-btn { flex: 1 1 0%; justify-content: center; }
}
@container bhpanel (max-width: 320px) {
    .bh-lm-action { flex-direction: column; align-items: stretch; }
    .bh-lm-btn { width: 100%; }
}

/* \u2500\u2500\u2500 Characters view (roster: reorder \xB7 hide \xB7 merge) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.bh-ch-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--bh-space-1, 0.286em); }
.bh-ch {
    display: flex; align-items: center; gap: var(--bh-space-2, 0.571em);
    padding: var(--bh-space-1, 0.286em) var(--bh-space-2, 0.571em);
    border: 1px solid transparent;
    border-left: 2px solid transparent;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.025);
    flex-wrap: wrap;
}
.bh-ch-you { border-left-color: var(--bh-accent, #88aaff); }
.bh-ch-star { color: var(--bh-accent, #88aaff); font-size: 0.8em; }
.bh-ch-grip { cursor: grab; opacity: var(--bh-mute-soft, 0.5); font-size: 0.85em; flex: 0 0 auto; }
.bh-ch-grip:active { cursor: grabbing; }
.bh-ch-dragging { opacity: 0.45; }
.bh-ch-dropzone { border-color: var(--bh-accent, #88aaff); }
.bh-ch-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.bh-ch-name {
    font-family: var(--bh-font-display);
    font-size: var(--bh-text-body, 1em);
    letter-spacing: 0.04em;
    color: var(--bh-body);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.bh-ch-aliases { display: flex; flex-wrap: wrap; gap: var(--bh-space-1, 0.286em); }
.bh-ch-alias {
    display: inline-flex; align-items: center; gap: 0.3em;
    font-size: var(--bh-text-meta, 0.78em);
    opacity: 0.72;
    padding: 0.05em 0.4em;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.05);
}
.bh-ch-alias .fa-xmark { cursor: pointer; opacity: 0.55; font-size: 0.85em; }
.bh-ch-alias .fa-xmark:hover { opacity: 1; }
.bh-ch-tools { display: flex; align-items: center; gap: var(--bh-space-2, 0.571em); flex: 0 0 auto; }
.bh-ch-tools i {
    cursor: pointer; opacity: var(--bh-mute-soft, 0.5);
    transition: opacity 0.15s, color 0.15s; font-size: 1.02em; padding: 2px;
}
.bh-ch-tools i:hover { opacity: 1; }
.bh-ch-hide:hover, .bh-ch-unhide:hover, .bh-ch-merge:hover { color: var(--bh-accent, #88aaff); }
.bh-ch-hidden { opacity: 0.55; }
.bh-ch-empty { opacity: 0.6; font-style: italic; padding: var(--bh-space-2, 0.571em); }
.bh-ch-tray { margin-top: var(--bh-space-3, 0.857em); }
.bh-ch-tray-cap {
    display: block; font-size: var(--bh-text-meta, 0.78em);
    text-transform: uppercase; letter-spacing: 0.08em;
    opacity: 0.45; margin-bottom: var(--bh-space-1, 0.286em);
}
/* inline "is <name>" merge picker */
.bh-ch-pick {
    flex: 1 1 100%;
    display: flex; flex-wrap: wrap; align-items: center; gap: var(--bh-space-1, 0.286em);
    margin-top: var(--bh-space-1, 0.286em);
    padding-top: var(--bh-space-1, 0.286em);
    border-top: 1px dashed var(--SmartThemeBorderColor, rgba(255, 255, 255, 0.12));
}
.bh-ch-pick-lead { font-size: var(--bh-text-meta, 0.78em); opacity: 0.55; font-style: italic; }
.bh-ch-pill {
    cursor: pointer;
    font-family: var(--bh-font-display);
    font-size: var(--bh-text-meta, 0.85em);
    letter-spacing: 0.03em;
    color: var(--bh-body);
    background: transparent;
    border: 1px solid var(--SmartThemeBorderColor, rgba(255, 255, 255, 0.18));
    border-radius: 4px;
    padding: 0.15em 0.6em;
    opacity: 0.85;
    transition: opacity 0.12s, border-color 0.12s, color 0.12s;
}
.bh-ch-pill:hover { opacity: 1; border-color: var(--bh-accent, #88aaff); color: var(--SmartThemeEmColor, #ffeaa7); }
.bh-ch-pick-input {
    flex: 1 1 6em; min-width: 5em;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid var(--SmartThemeBorderColor, rgba(255, 255, 255, 0.15));
    border-radius: 4px; color: inherit;
    padding: 0.2em 0.4em; font-size: var(--bh-text-meta, 0.78em);
}
`;

  // fa-embed.css
  var fa_embed_default = `/* Real FontAwesome-solid glyphs (subset to Beholder's icons), embedded so ME (lucide-only) renders them. */
@font-face{font-family:'bh-fa';font-style:normal;font-weight:900;font-display:block;src:url(data:font/woff;base64,d09GRgABAAAAABkMAAoAAAAAMhQDBQUAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAAW4AAAAFEAAABgYXVZ+GNtYXAAABc0AAABDwAAAbyCUs+BZ2x5ZgAAAPQAABSRAAAr0HTOgsBoZWFkAAAWEAAAADYAAAA2KQTUh2hoZWEAABbAAAAAIAAAACQETAJfaG10eAAAFkgAAAB1AAAA2GbGAUtsb2NhAAAVoAAAAG4AAABuI8sZgm1heHAAABWIAAAAGAAAACAATAGQbmFtZQAAGEQAAACzAAABmB2DOHFwb3N0AAAY+AAAABQAAAAg/94AGXicrVprjCRXdT7ndndV16Orq7q6q7pndrcfNdM17+nanu6amfVA27Ner1/RYCfeJQhrAAW8QJw1STbrYOPxQ2D8A02ISGzyZxIFgZEglmICxDLpRIoQRESbHwFFyo9RlEh482cTggAhuqNzb1V3zcvYSnY1Vec+zqmue8/jO+cWIJjDW/gK7kIAgCt+EDS9hiyVSoEX0L3oOu12UArofjbsdjpBO6D7it/0vKCDoCiGoSi7hqIoirF7sIVXj+2OWpABGPZZDftQg3XYhA/AswC2HPLHuoEb0CPDIAzocX7g858mp6RSENA4jWI0RiOIcij7QRi4mTcVEMj4S8b/s9lsZjJNg2UyzBhTrxuGZxTtPD4ZEYNn8etXrlwpXykPvGx2tZTKZlOlNVleE9Qqbh/b+znDOCyaqMFe3rbznmHgk3m7aHiGMXgWV4X8xmEhJHgIx/UCML6ugH04BSHAtCS7gVMqypLX8P1Akpt+0++G3dBxHVc+GwZBV2yoz7debLrrtHEP/acURc3l1E90Llw+d46xc+cu0/2GX68XbbtYr/tj6taFzidorqI85WM8k+67tt1oNJuNhm2PKQCE4vA1toB98AGw6Uu08oEkS65Ld9cJQ9qhsOvTnnb9Ju0QbihFW+3t2pJkPFJhebOw87RlmqnyI7mMbO/28KsWovWckyrYxoc+a+uacv68oun2Zz9k2IWU8xwgANSwj9twBgAdUiUZA7Eyzc5K2G2fdV16Xvusi19XlCHQO+2IZbjyBl3xEl2HoCg74n0/fFNR6H1qUMNt3OaW1O0EAdkI6ZPQK6FzciBsivRO6J/QvRAvRc+4Egn98OE2zp40EreBgTm8gbewDyW475A9jyxY7tKW03bzzSYtcFzSh264EvfyPqckyUJbVsJuiDVht5H1qohZJZdTZ10Xa7Vud3Oz263V0C3PqLmckkVUz1gWOxvce+/ZgFnWadwTvPvR7d3ErCFmG8utVcEr5Ky2lhvEruVyStnzZu8NzjKSM+t5ZdJtfdjH/8E+bMNv0g7KMtdtN3Bk0iBJlriOc8prcK1p+nIgRVQzDPk++0Ez7IYhqb7rBhHVPus65FjcMOhGlNwNaanEkuCttLrA2IKalpWMqqvGarGsp/NFxykZab1cXDXUnJJR5MQsJXfsLDWtyLcWy45TXhRXrBjqjJ7L6TOqUbCyZl5LF0xl3Uil0yljXTELaS1vZi0rr/q5Q7PUNTFrTY1nFV5Gf2bGR3GF1MgfzML98NAhvUhqp9BL4d1JczspSQ4CSS4FpA91WqOwQ6voe6TJ3Gq8jOOSlow15G6hlzsJy7l7f7JQQCwUJnEnpn5jqViZsBc/iFcdxhz6i3XkR/cIrp2Rid3zo0GfeGoxMycWbXtxVbA6jHTDHP4L3sIvwm3wFABpNLfmZCRrBa0g4BGsE9lntAZC74Xmh92QN4pyMWk4gRsEtBDcVEYGxNUsCPwDgbHhSd4VfSLo9QKrIV4qioWGohQW1tbW1hamzXRG0nO6lrkjK0kMTxg8JIWxFPtxY2J52RqZYyTZsxbyhpFfmF4iNmJ/KCVJWWQpduKMhCAUcQP72Ic8dAHsUqfUDsR203vKnVInDhuloM1VokRmJtf5nA5Xj/buHjpuo+E62GMzsxsbszPMjHdt0I8pE1v0j6bRdKJpJnG0aHw0kRMAEuEUBrgLeZiGc/Au+AD8NoAtdLMdCL303AbpK9/r+mg76qW30euXOqWEwECS3UPPmCF9a/HLi2JdsSbug/1f1n4l5nRYeSwGd8fdZtLL7p3YeLHVijmY8/yYneIQDPcRcA9OA4RJsBRFmrF9K4rSF/b15S8Li+v/gF9F4+WXxWAfEHrDfewJmdMiagr7J18aBonYieFbFZrwSxNwHi4BZLpJMMKVLgIjbooPtYXWCfdOGkcP73ZonxpyiZx82HFX+Myzbgx5mh2EC+vrU43G1Pr6hTH1kGQY9vpkwUKs1siD6AtZNNYlppaKUje52D2sN27b2NzcuK1RxwP0eyxVxYI1OWUXaANyhjyRVgzMsKKklNhrIwmKYvCdAcA+7sDssTuT0MJDu7QXRXpsR4r0vSjm7/Gl3YsAgHhWBAv2Ik3YwT16nt30goB8+hh/WCPXZiWxyJuIxD8e/5bB9yLlbse/BSA1HAz32SbuQRNuh4cBUMSPkWdNYI3IhfL/Mt+zKADzfYuCd7MTCgkNvylzTRjxSa5TwtpGqzXlua6WyWiu6021WhtRj57J6FHPsQB0l5yLpqgspdfrM75tK0q5UlVYCvfQdRt1zzul66c8r95wXTzas38cBO6Rr0oxRdVIHsmt2jZjqqJBaviz4TfZp/DbUIUQ3kX7IUsuRvj24GrQavmucLRF2Q/G71uUfVfyBCIjlJNcU9+387rJtuh65XSxqKXT8QK05+fqV78xs0Ye1vJz2ehN5V//o8op6sOHGwZfwCmv1dq42L0bX9NNOz9o0fWBaq1aSSyFaU1e/oNpJE/drJ4504hf0dQv3FKpV1XvWZoaM7Az64mMZBbeC4Bjz9s+gIiTwZYHUlnsvnUAf4zjtgg9VtANE8EXe0IxH/yu0MvvjExw71Ycb7BHVBT48oN+HjEfBcmr2Bf93xGK/t0HI2ZDUWrEO+jHUmIO4sZePpIH0vBnPFZ9EYowCz24BI/CxwFswqpRpsFRJ6HM0nGdoXBh7SB2Yl5Abqx0fLcwHophUXedd/uOS5CYIG83fDGfuyirmjxjGJblhGbhcPtiApofufUOx7Srk3ldz0+KK37eLGxl5RnLMgxnI5/bO9j8YNIJ7p3YaKFbLpOl0ZXiPWnMDvZBhwq04AK8D36H1jDxUvVkA0XsoMWhnIZwnhc0/QzBvVZAqc04enj+yf5GBJownkr6tXsAqF9NtgaAZ84szZVLjM1+32b4uVnGSuW5pTNnkNnf/1ou57iViuvkcmNqG5vN1WurzSayyuCvKgz7SbCevA7+meSomnZumtml6XOaptLTbLY94QiRzsSYGvycZJLwCmMVQsOF4T+xR/EvYIO0bzrKSP2myI24LxV5Di1AFM15fhRDW56FC8ucFtEq4onAr8iqBAKIljLmEblVVFKQ2fm5OX+lvcA0xrJZPaexyqnTjus+VqnVKiXGLJQZ0zQ9l8VqOt1cXFtfvPqLn3KeRdQYk5URT/nqiTwLj726uL62OJ1JVzGb03WVpbJoMVaq1Orlx1zXOX2qwoghy5jGFlba/tzc1fJbYMnpB1gSOHkSNgDstsfTDIc7JEkmtRNOqRvKba9NpTQrICRNhbTDM2488cQTReO8gTmj2C8aOSRib2trq9fvEbkf92HfOG8U/3XUrBG10xtCrXWwD3D4c+jhnQhgA4ROm/IdsRt1UV/5NE+uDFkpDaGkyMbO3YqyY9o2om2bOxyX7TNCkBVowDyALWyizm3CSkB+y7Usqx1YgVf32h69pAUHk7wBp3p7e7izt7e3h9tHUwHs9YaAEP8RTpocfhO/gN+GSaqk+E05w7WKxwrXCaf5u3hBiO9V7JI9BFNWSlfvJxrBlLPOb92Hf+iaufx+vljEvxxTwKA27LMW/h08DI9xj0zRRQ5Efiuii6gSiLoA2YbYsvE4aXycBpHjEONx7CZIynXfddwMr61FME4Euc+kM1JuAicnZ2cnJ3EiJ2XSaV3LTRR1Hb2pMFOtLrSqNXRyuTiJyuUcqn7cFQTSmjeFul6cyGl6Gh9IOk/8MvUpj5NQEv64QlJJela2zNLj5+bncvOTpxBr1dZdStGuxBGsYheVu3iFZXHpgj4/f+7xkmnJWfqV300iYGDgD/dZDV8CD5YAqNQalwza7XHeG5dS6Y1tr+3xcmwgo3fz5s1CYcuevBKFlSeeLRResCcqRUlRPrb1xAvn8VM3b96kji1bPPJZarxQKAxe2nryhU2RLfwQCM1SRGgSguZeTHijTrIRCv8l/FCvZpqmWTt6XcXJU6doveh6OdnYSzYeSfJwTP0aY/j39AvQkVNRxUn4wigh4b6R9GiFCtQu/rfJeqmcYVw/bxZtTH8pq6j6P1y20MR+wcS/1oqD7XxWloJ78rJS+lUp/XVNU7JfW1BsW0VQtGRFd43qerbv8heM01IBIUXA4qo4gtsCaAvVpNouz2X5tnEm0uZ7G42GbhjInEetjKRVuw880O0y1u0+8I6WcH0p7Z0PXlxbbzQQG431tYud5SXvaw6TL1KIv505+LuNRkOTMtajDkPD0KuCncRgndjJ6S5GzEJQseh1mPOIKl8kAHL7ww7jEf8GA3wF5mADtuDj8Bn4BkBYdANSMrJFUrQk0gvikrWo8LSPZn7hMV0cfEYsAoKeJNqnwk6c2QoJYTMunf0yCXQyEpKtkY39RGj9T+J2aCjKTtLAIswprrWTWGKRB5DT3fGMS6J9KW7/QLR/QMhNoATBk6SPB2Nbx851crnWgbT4JKEis0dCbybU4X4AWyB+KhsJ/N4+3JEZ5wTCGydzAeF5R9nxdoRJ+9F9CJEbnPJWxS9Y9aYwwqt9jue3iSe+R5WU2rn5eX1T9G+S84vql8LeKAK+BHV4N4BL9uaTpfGivRsV7922KDR7DX/aawsMz48xyP+JEdKRZvQCoqQsSs7RC8r//uqrr8qZS1N5LZDzRnaOmY1HMvKrumnqWHzuuecyrCwbeXm2LedNqcYyH0mnFKzXV7x6raLrlVrdW6nXMVt6+eWXMzKrTTyaw9yvpc6gLH1J0/4jvawj6g9+zEDjvgyWJ6Ru01czqkqsqppR/WZXqpS55SXj/Z3wK1SNsU+q/dZHFV+epBKZeRtzeZZ8GCUgL4fxIlZc0B18480njiq/uEdDI7GcuBgPjqa/pUmQHmluBeZhFS6M1iGZg1ri3Qj5RRlFII7U6CLcMIUhPhwPjl8bYmoI270ez0QxTymo4zZqWK3VqlSRqlXR3N7eptySX7A/xlPjRRn0iYvGScz2lF0o2FPiuod56s9jstL2FLwEf0bVBz9GLlTiJFUmmHqYEmpKYUSA18MUL/gGFGA8Dm8PUwIRiWdR/4giXEwulWwgzmM5dGq7XtvjXuEV2hF6RV5vnUle6fVpdHV0eSvzzH6fHEbkN+hG//BL/weRx857JPEE8jJ9qp9WopOJdYDptteOzEOWDx48iPJWjBij8ioFH5FWtfFGNpsVQXZuYW1tdW1BFPTFmYGq0pkanRYsLwfv7AWzmiSZ1/eZs2NKkja3YIynCjaarijLy5xlaZZQAAAb/mL4Og7xb8CCKYH03AO4TibsJxI9ngyGgY8fCYLgmaBQmCHQdtcbb7xhyl5aVY3rJfPmM/gVPkpDM4XCXTdv3sw71w1VTXty/uYzENkc5VNZuBsegPfwPH/kNQhDx2UxSkG52vJjy/jIssN9McXgGO2I+MxLi7Gk6dj/bMXGXjsIsw+2ZsNLh4HypebkRKY2OqzKjvzP8zH1vsMs/3hERvUQuMdyuTmM+Z8f+SHCmX3Wwz6coxyI51+Ho2K8KMJejz+l6+B2/DAR3OIzmfGB3Mgx1XB8HhMVZd7kTKYFDPLD1/G/sA9nKEtEngS7TomKMsIDUiYV5UPtkmVZPAx2/CBAkKXXLVXDQmF56aGJiYeWlgsF1FTrdUk+7zfN/CvYT23J+Xyxfeedt98xr+vzd9x+553tYj4vb6U2B5/E3x980ut219aX7kmgjdMwxfHxcR47djJem59r+bIo8oiTLNIpj2fnpDUdXjoi99YOOof89g7hh/7Ozjbma3lskYdtJcnDXpowxQ79u3VkKicjbH8HPANt6FGdZnQ6L/Of0Q0TCRY/lRXAU2gCjYXTrVIjWAlanVbgBKyVSzFVNU3j9x6n55hRObT38KK3OB2BvT9dmHpq8FnEVZpH8y9ToBAacmqKZhuKMvFwFhGjc0Gui1Wqdxz5toE0z+U+n58vpXh2QkWmqMDEDx3iTIWF0aFQQ1ZK7KOnS0xu9P/t2rVrm0G2gUxrp1kq9ZTMil/ZmF/OIC9VKEq/IbPS6Y+ykiI3+oPvX7t2LbOc9QI9XWGpdOoxWS0ynAs2IfqmiCJdCzbhIbgCTwBMF4MgKNLXDJ6wFHIj/E+W5Aavp4vwLWzMcTPjA/KRuR1N5sOjs9yjsxhgqXjq/bxGk5JRZXmjLGWS+ZSgBwfygQPQPDkQ4dgoviDipGVR7SeTMQzEolMuFFhSrKCj4m2EgU+Ud2AEsqMa7AysQA/ug3fDB+E6vMBtPeAFr/bRmlCECkQ4TwkgweFA+wQ6KjeK6Bel8CIgUqgk7zY+Xq479ODo3JlDDV7uv14tFhGLxergRkxdjyvzNX7ZPpZ8Hu1ikepedH3R1VVVd8V1sEsJf1xZY7WYMk2eT/T4w27FD0OTKPolg50Ydh3+20mKn0k++GKfJG/Hj+BEn+pgyvCbDPFv4S6A6cx0RkTc8SEYLQwvOIi2d6BNPcIRC3QR2SK6otBGefe9Wq7Raq0oqbRmZlF6fyYlS+l0WvGzKL1LTjmalkJNM+c33vGOdy6vq1pO0r+gaVnph8PhkHL/e+W0mknX5ayCmJXZaZZW1aycJbqckldXOk1T0zBlGKcmlzY2bpvLKX+uKFTP4BkHP0+uQBvuhw/B0/AnAOGJqLB94kiUo0fTgsSk8P+VZ6bValmarmtWdOsf6TjQar3t8e3E4JFb7WBz5+2MEqYbDL+FA/wWWHDbSZiOPHYqkFz6QCp2haQ7DV8OeNGVfyrp49UwDJ9cNc2lguMUthRF2a3ql6Xc5zOku7EOa+pLRgGzVXWBPY1fXV1dfTKk6UumeT+jb6Oqg58WjJdULZ5P98znc9JlvbqrPC0yln1GGmLDMmyKr1FEwBsDn9ApiRgvEE838js8N4swk/iEQ7iLNpVkzFb8uKsmBWgeqE2r8gWqmw5u4TbVXzH/4wqjjlfwaqtFYGgr/qGt0uTgRhzdMxXLxD5VXQc9qq3mkVUy1KSYCdvYxxqUCBuJotPhb006x/ZGvpojDSpgRPdx+0A8OBA14H8BrNYSPgAAAHicY2BkYGAwY+xnEGUAARAPBQAAFfYA3gAAAAAAPgDqAT0BeAGlAecCWALyA2YEBgRUBOkFEwU+BbYF7gYnBrQHMweqCEwI7QmaCeoKCgpKCncLFAtVC5gL0wxFDSsNiw4CDogO8w+zEAkQQhDMER4RYhHBEhISaBMOE84UOxTzFUwVrBXoAAAAAQAAAwUFAElLKltfDzz1AAsCAAAAAADiMceFAAAAAOIxx4X/8/+1AosBywAAAAgAAgAAAAAAAHicZY4xCsNADARH2wUMOUya4Madv6Gn3dP8LRNiBemMmxRC0mjZlXWwnSYHAXJetoN1VkETTMWhJa/uYI4nv7TI41SPY2jjULLOXHePz6Vd5KxyNvI+fKvK439+i/hW7vjvObLuPTOyP/InEWfy1P8AFEccXgAAAHicY2BkYGA8/X8rAwNTw//P/z8zdTMwMqACMwC6aQeseJxjYGFiZm5hYGVgYPRhTGNgYHCH0l8ZJBlaGBiYGDiZGWCAUQDOZGBwDA/2ZWhg0P6+hPH0/60MDIynGbxBasAKHRnXMzAwKDAwAAAAVwweAAAAeJxjYGBgYmBgYGZgYBBhYGZgBNMsjCsYGBjSGBwYWBnUGLQfnfrA9IH1A+8HwQ/CHyQ/KH5Q/mD1IeRD5IeED0kf8j4UfOj7sO7DwQ9HP1z/cPvD8w8fP+p+dPp44+Otj/c+Pvsk98n408FPtz/9/Mzyuf3zwc9vv5R/2ftV6qv9V5ev2V/7vq79zvd9yf//DAxwe3hQ7AlGs+cAZfb8vyZrIcDI/5//J/83/q/8H/hf8r/gv8S/i38b/wb+9fxL+Bfzt/Gn84fxB/M78dvzm/Br833gu8PnzufG58xnw8fK+5E3hdebV49XhWcRTyaPHfdW7gJuEa4PXG+4jnEt4WrjVOOYCA5FOgAAgGevqAB4nJXPz0oCYRSH4WdSi1p2BbNUyEFHZ8QWQQTdgNCibY41UI2MUXRTXmPw8WW6cNHuPYfz+3Nw5lFH0j3HlMiJ3DTyiQuryB031pG7ezc9S9vIp66SS3caa99atWcvPqT6ngyk7jXew+bWl8pG4011dJ8qg6pVhWmh8aq23KP/a4dKmUIm96DS2qiDS2pmZiIzMjZXmBjLFeGH40mfBy7XIfs3YbDTHarKXbfhX7cfSe85EgB4nGNgZgCD/7cZJCEsVAAALh8B9w==) format('woff')}
.beholder-panel [class*='fa-'],.beholder-notebox [class*='fa-']{font-family:'bh-fa'!important;font-weight:900!important;font-style:normal!important;-webkit-font-smoothing:antialiased;display:inline-block;line-height:1;text-rendering:auto}
.beholder-panel .fa-arrow-left::before,.beholder-notebox .fa-arrow-left::before{content:"\\f060"}.beholder-panel .fa-arrows-rotate::before,.beholder-notebox .fa-arrows-rotate::before{content:"\\f021"}.beholder-panel .fa-arrow-up::before,.beholder-notebox .fa-arrow-up::before{content:"\\f062"}.beholder-panel .fa-arrow-up-right-from-square::before,.beholder-notebox .fa-arrow-up-right-from-square::before{content:"\\f08e"}.beholder-panel .fa-bolt::before,.beholder-notebox .fa-bolt::before{content:"\\f0e7"}.beholder-panel .fa-broom::before,.beholder-notebox .fa-broom::before{content:"\\f51a"}.beholder-panel .fa-caret-down::before,.beholder-notebox .fa-caret-down::before{content:"\\f0d7"}.beholder-panel .fa-check::before,.beholder-notebox .fa-check::before{content:"\\f00c"}.beholder-panel .fa-chevron-left::before,.beholder-notebox .fa-chevron-left::before{content:"\\f053"}.beholder-panel .fa-chevron-right::before,.beholder-notebox .fa-chevron-right::before{content:"\\f054"}.beholder-panel .fa-circle-question::before,.beholder-notebox .fa-circle-question::before{content:"\\f059"}.beholder-panel .fa-clock-rotate-left::before,.beholder-notebox .fa-clock-rotate-left::before{content:"\\f1da"}.beholder-panel .fa-code-merge::before,.beholder-notebox .fa-code-merge::before{content:"\\f387"}.beholder-panel .fa-copy::before,.beholder-notebox .fa-copy::before{content:"\\f0c5"}.beholder-panel .fa-download::before,.beholder-notebox .fa-download::before{content:"\\f019"}.beholder-panel .fa-ellipsis-vertical::before,.beholder-notebox .fa-ellipsis-vertical::before{content:"\\f142"}.beholder-panel .fa-eraser::before,.beholder-notebox .fa-eraser::before{content:"\\f12d"}.beholder-panel .fa-eye::before,.beholder-notebox .fa-eye::before{content:"\\f06e"}.beholder-panel .fa-eye-slash::before,.beholder-notebox .fa-eye-slash::before{content:"\\f070"}.beholder-panel .fa-feather-pointed::before,.beholder-notebox .fa-feather-pointed::before{content:"\\f56b"}.beholder-panel .fa-file-medical::before,.beholder-notebox .fa-file-medical::before{content:"\\f477"}.beholder-panel .fa-gear::before,.beholder-notebox .fa-gear::before{content:"\\f013"}.beholder-panel .fa-grip-lines::before,.beholder-notebox .fa-grip-lines::before{content:"\\f7a4"}.beholder-panel .fa-grip-vertical::before,.beholder-notebox .fa-grip-vertical::before{content:"\\f58e"}.beholder-panel .fa-hand-holding::before,.beholder-notebox .fa-hand-holding::before{content:"\\f4bd"}.beholder-panel .fa-heart-pulse::before,.beholder-notebox .fa-heart-pulse::before{content:"\\f21e"}.beholder-panel .fa-id-badge::before,.beholder-notebox .fa-id-badge::before{content:"\\f2c1"}.beholder-panel .fa-link::before,.beholder-notebox .fa-link::before{content:"\\f0c1"}.beholder-panel .fa-list::before,.beholder-notebox .fa-list::before{content:"\\f03a"}.beholder-panel .fa-list-check::before,.beholder-notebox .fa-list-check::before{content:"\\f0ae"}.beholder-panel .fa-lock::before,.beholder-notebox .fa-lock::before{content:"\\f023"}.beholder-panel .fa-lock-open::before,.beholder-notebox .fa-lock-open::before{content:"\\f3c1"}.beholder-panel .fa-magnifying-glass::before,.beholder-notebox .fa-magnifying-glass::before{content:"\\f002"}.beholder-panel .fa-microchip::before,.beholder-notebox .fa-microchip::before{content:"\\f2db"}.beholder-panel .fa-palette::before,.beholder-notebox .fa-palette::before{content:"\\f53f"}.beholder-panel .fa-paper-plane::before,.beholder-notebox .fa-paper-plane::before{content:"\\f1d8"}.beholder-panel .fa-pen::before,.beholder-notebox .fa-pen::before{content:"\\f304"}.beholder-panel .fa-pen-nib::before,.beholder-notebox .fa-pen-nib::before{content:"\\f5ad"}.beholder-panel .fa-plug::before,.beholder-notebox .fa-plug::before{content:"\\f1e6"}.beholder-panel .fa-plus::before,.beholder-notebox .fa-plus::before{content:"\\2b"}.beholder-panel .fa-power-off::before,.beholder-notebox .fa-power-off::before{content:"\\f011"}.beholder-panel .fa-robot::before,.beholder-notebox .fa-robot::before{content:"\\f544"}.beholder-panel .fa-rotate-right::before,.beholder-notebox .fa-rotate-right::before{content:"\\f2f9"}.beholder-panel .fa-scroll::before,.beholder-notebox .fa-scroll::before{content:"\\f70e"}.beholder-panel .fa-server::before,.beholder-notebox .fa-server::before{content:"\\f233"}.beholder-panel .fa-shield-halved::before,.beholder-notebox .fa-shield-halved::before{content:"\\f3ed"}.beholder-panel .fa-sliders::before,.beholder-notebox .fa-sliders::before{content:"\\f1de"}.beholder-panel .fa-star::before,.beholder-notebox .fa-star::before{content:"\\f005"}.beholder-panel .fa-stethoscope::before,.beholder-notebox .fa-stethoscope::before{content:"\\f0f1"}.beholder-panel .fa-table-columns::before,.beholder-notebox .fa-table-columns::before{content:"\\f0db"}.beholder-panel .fa-users::before,.beholder-notebox .fa-users::before{content:"\\f0c0"}.beholder-panel .fa-wand-magic-sparkles::before,.beholder-notebox .fa-wand-magic-sparkles::before{content:"\\e2ca"}.beholder-panel .fa-xmark::before,.beholder-notebox .fa-xmark::before{content:"\\f00d"}
`;

  // bh-logo.png
  var bh_logo_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAIAAABt+uBvAAAvpUlEQVR42u28d5Qk13Uf/F6Fruqqzrl7enKOuzvYvNjF7iJHEYEkSAoULVGyKNKWP9uSfSzJIilTyefIsj7pI22KpI9IWoJEChRJAySIuAGLzTO7k3NP5+7qVF05ve+PmhkMF9gAEACtc/D+2umt9H7vd++79757LwAfjA/GB+OD8cH4v3bAn/cHAAAAhBtfAgFAb/yMANr+58/p234ur4QQAgggAAgBC90IBAxCCAGy4ULo/cfr/QMIQgAhBABY1rXTdJC4kyJIEicwDCFkWkgzTEU1NN28Fi8MAgDQ+wjV+wGQzQJzExcIQDToaot7OhK+ZMwbDbAeF0U7cALHMAyzJ2+YlqoZDUEt16RsiV/N1lO5ep4Ttp6JY/Cm7PtnABCGQYSAvdwOEh/qCu0ZSQ50BSN+BgDQFLVKXS5WxUpd5gVFVnXdsCCEBI6xNOl100EfEwkwYT/jdtGWaRW45tRS+cJMbm6V0w3Lhh7At6DkPwOAtkPTFvce29Oxb7Ql6GVKdWluhZteLi2na6WqqGrGTR/lpIho0NXd6h/tjQ50BIM+tlhpvjaZfvVCKltqbsAE3is2vfsAQQjh5qoOd0ceOdq3oz/Gi+rZK5nTE+ml9aphWje4ncCxLQWD3qSwKAc+0Bk+tKN1z0iCocmzVzPff2V+KV2zhc56D3TTuwwQjkFb13Ql/U/eNzw+mFjLNZ49uXDmSkZWdPsaW9FCCE3TCvrcAz3tIb+3szXKVWsvvjaZL1UxCLfoYG/+tn7fjpfXRR0eb3/gcG80yJ6eSD/9o6kNNmHw3ZW4dw0ge5OyLOSkiCfvG7n/cF+u1Pz756dem0hvx8XWwTYE3W3xvTsHGpWch8HKNXlwaKwzGf67H548f2UBwyB6K5m5ZiskCfzY3o4P3z3sZh3f/cnMd1+YtRDaWqT/iwDaWrcd/bF/+cRtbsbx9PPTz55ctH+8hvy2NeikHfcf24+p2f/ns58KJgal6uof/MlfUd6OnrbI3zzz8nqufNM34himGxYAyEmTT9w1+MjR/tVM9ct/f2E118AgRAC8K/KGvwuP2ETnY/ePfOYje+bXKn/0tZMTcwWEAI5BgMA1y2l/fU9H0gGE3/rUMWfXg3/+1X/49X//hYB88fsvTnh9ocHuhM/jWl4v2GS53npsiZJhWFcWipdn87tHWh69c4AXlOVMbetFP2eAbD4zNPlbnzp0fF/n//r+xNeeuSQpOo5j19tZIAYRAgGfr7/VdXiQ/ObTP/j63z53JJGS67l1Ts9wKu3AbxvpzZdq5WrDtox+6nYIEUIu1rl/fLAjGXc4SEGUTMuq8spLZ1e9bucnH97pYamLM3m0uZn+3ACy0YkG2S9+9lg05PrSV0++NpG2yW+aFgAAw7Cfdq+ArXMRAG6W8XvY/ijKlaoTS7WHd7vSOX46bZiISGULLoZub4lemVs1THM7jTAIEUI7h7p+/RMPYhihyfWAh+7pbBMkpSnKCIFLs/lyTXryvuG+1sDrV7OGaeE/G0bvHCAbnba49w8+e1xRjd/7y5fWCw2SwE3TshCyJ2VrnrekuqqqHo+vXOU7InR3awBa5stXOAX6l9YysqJputHTkYAQS2WLWyywVXtbPPTUo8dfPXfF7+B++akP7xjtW19d8HiDpUpD1XQcg8vp2uwK96HjA+NDsdevZFTd/FkweocAbaHzxc8ez3PCf/7/XmqKGo5jhml1JCP7x4fuPDh+/9HdrfFQqdIQJBnDsJ8iEYS6YZqmaTn82YpCkvilFVlEvnSutJQqCJJC4FgiHMBxbHpxHcLN6UEIAHjg2O5STWa0ha/+z/+hescznPGbv/zAD555WsU8XKUGIcQwrMAJl2YLDx7p2zMcP305rRnWO5a1dwKQjU4kwP6Xf3U8zwlf+PLLqmYSOGaa1l237+ppTzbr+Xq1mC02xscG7jo4VuTq+VL1Gq0JIWyKMt8UTUivlzRRA2vpfKlSN0zLzTr7u1oAABRFzi5nTNPaEjIcx3rbEyWOe/T2UNhDfvPvn/3T//7XxwfxcrmwlDdKlZptARA4VuXly7OFh+/oH+sNn7i4blnoeir/XQbI5jlDk1/4jaOKZv7+X72kaiZJ4IZp7R7rDQe9blj87X/zKw89eH/I2fy7773k9YeHepJNUeYFSdON7SsJIVRUnas2KrVGuVIXZbWzNSpKCkWRfo8Lx7BQwDu9uK7rBoQ2e4CDwFmGtpDVl6D8eOni5MwL59LjrepqyUxzerlSh5tuB45j9aYytVz68L0jyYj79StZ+I6MmrcHEITAnt5vfepQLOz+z3/5Mi+qtmSRBLZzeICUlr/xP//iQtZbEYmPf+bfWmvP/Z/Tq36fd8dA556xvsvTy2/CyHY4oU2ukb72bKFC4HhrPERTJN+UZpfTGwoIgwiBOw/uyBbKDgdda8g9LW4LEQ4CMgSYLeI5TmjwwhZNEEI4jlXq0nqh8dRDo7phzaxw70AZvT2A7Bd8+J6hu/Z3f+mrJ9fzDRzHLNMCAPjcbNDvvnOU6WqL/vsvfHlm6vKBpKjVV+bSgqBgmULRzdKD3W1zKxlNN+xp2HPZMqw7kpGw37O4lk9E/JSDJHAcWdZiqrBhWyKAY9jxA2PpPFdrNL2B6OX5IkKGy+mYyUOuac0urV/ztQghHIOZIm9a4BMPjs6ulAuc+HYxwm79Ulv1DHeHP3LvyN98f2J2pYzjmGlaNnEN00IWQhidnX2Z51bnpi9lpp7LFpoEjhuGubCSnVtKO0j8yYeObCcjQgBCaCGEY9hwT+v0YhoA4GadHhdDU45cuWZLoq3j9+3swyBws84iV794ZT5Xh2cWzNcW9Lk0f/Hqom1VYBiGbZIIgxAhAAH4h+enL83kP/ORPayTNN+mMrpVBkEILARIAvtPv3pkJVP763+8BLfZ8hBCVdM7kvFKrTnYyhYbVtDr7El4zs+W8yKbK1XX82UCxxtNaXSgg6vy5WoDAMDQFEEQumEAAG6/bbApynMrWa+bESTV62EJHJ9ZyiiqhmGYZVlu1nl030iRq5cqjWpdECSFqzaKXK3I1eq8ACG0Dcjt/jwCAG2yfma5/PCRPr+HvjiTf1s72q0CZL/myftGdvRH/+ivT4mydo26BQCYphGJJS/PpvuTTEuIujhbnikSFM2cujClagaOY8lYSJYViqKWUnkAwJG9w93tiaW1XDTkC3jZS1MrpmX92sfuK3C1So13u5yZAgcAMEyTphwfe/gIV+NFSak2hHKVjwQ9qmbohokAIHDMdjuGetuOHhjbu6P/rkM7E9GAomoWQrKqQwgkRedF9aP3Dc+slIsV8dYxuiWAbB2RjLg/9+Sep388fXEmj+PXRhUwCBtNyTAMbyi5zhmZKqjrboKgT567CgCkKdKyrKDfrRuG2+VUNb3WEPbv7D8wPnji3BRDUyvpoqoZ+3f1HxwfwHH85IVpUVadlGO4t003zI5kxDQtDMJylV9ez1MOEiEgyaotfaZlJSKBT/zC0dv3DHndDElgEMLhvvYje0fGBroYJ7WWLlgWWs3Wh3sitw0mXnh9xRa9dw0gCCEC4NOPjxM4/pd/e267Xw43BRoBACGsNoRsviQpRq2pZAvlydlV3TAtZLXGw5V600ESIb9HkFQIoSgp3e2xWMjX19Vy6sKMbhj9nS37d/aTJB7wuRZX84VyrSkqmqYnY4Fo0F+qNgACoqTkSrWe9li9uWE0WBbqbot96vG7DNNYWM0upQrVejMR9gOAvXZ5fnp2DgK4e8eQKEp1XsyXhSfuHizXpLVc/Ra19c0BwjBoIdTbFnjq4R3f+N5EKt/AcQwgALe5kbYSRQjZJjIvSHVeECQFQojjmGUhj4sBADgpUlH1tUwxneNMZA31tKYLlRJX2z3aMz7U1dvZIivqwmrexdCdyaimGSSB64Y5OtC1e6z3tYuza9lStlhhnHQs7EtlOVvp9HbEH7/3YKFcm11K13lxaS0/2t+OE+SPXjq1q4v6xY8+2JHwTExOdnX2cpVaKl9rjXkP7Ej+5MyKaaFbUdY3B8j2LT/1CzstC33tmcsQboSyEEI4hrEMremGjRSGQYTQBq0gtP+0/8vnYdwsvZYp6YZx16Gd+XLV42ZCfrfP4xIkJREJMk4KQqxabw52t9Z40c3SvZ2J4d72kb72XLFyeXppNV2848BooVTDMAgxTNV000JeN3N034huWCWulilU5ldyDpIY6m07f2Xh0f2eL3356aIUGNl9/J49sX/6/rO+UCKVKRQr4i8cGyhVxFsk0U0A2tA+Uc8nHx77389NpfIN+/ddQ50jfe17d/Q9eGzv/l2DpmVWak3dMLeUn728Q71tCAAP6wwHvEWuLkgKsiyvhxnsaY2F/RDAvq4WDIOioiaiQU3TfW62KUkuhgIAQBxP5zkMwyzLPH1h9pG7D9yxZ/jFM5OCpGAQ9LTHSly9t6NFkjVdN5qCtJIuNkXZ43JSlNNNCB8+1uGPD/3Hz//XCxcu3r3Ds7Qwk67hhRJXqcs9rf7R3qitiX5WBtmxm8fuGgz52K89c9k0raDf/cDRvcN9nUO9HUM9rbKiKqp6aPfQvp39MwvrgqTYNrEdx+lsjX76o/ctpnJX59dkRWtvCY/0tg50JYN+j9fD5kt1UZJDfnfA68ZxHFnWeoErcg0Hjvs9roDP7XSQ2QJXrDSeeOD2/eODc8vruq77va5UjuOb8vhIzyP3HEhlihCgdL7C1ZosQwmizLJMPEDu7mX59dPf/sHFmamJgx3aUtHI10G2ULYsJEjaw3f0TS+XuZp00+3sRgDZthxF4r/62PjpyfTl2XwyFjy8d6xZzTqgND09s5iutrfEZhZTa+lSwMu2tYQvTi2hbffquj7S33Z471giGtQ0Q1HU7vYEhLiLpfmmFAr4HCS5li16XIyiqAWu4XExt+8enl/NQoBURQMA+TxsRzLamgifn1woVhpu1nlgfDAa8t1zZNfB24YLpcqFyQWSJOZXs+GAp9oQdMNinRROkDEfDPlcizmJdjhCLnwiZdRElM6XIYTFinhoV9LNUBemc2+ECt4BQDa6uwbiR/d0fON7E/WmcuC2Udoqf/F3Pnfo7ic+/Usfnbn0yuRCMR4NvXRmwjCtwe5WAidW0wV80zAxTIumHRBZfq/r8O4hksAbTVHX9c7W6MJajqbI3WO9oqzzgsgwFOUgE9EAgUOacgiSzLLOTLEqiEoiGswWKkuprCCpq+lid3ucphxT8ylRVk6dn2k05Xy5DgGQVV3TDQCArCgt8fjMaoUljZawk3GgyTVZhYGrcyuyqtnf5nM7D+1sffHsiqZbN1bVN2YQRAg8enwAw7B/+MmMz+tOhFxPHo23jD30y7/5pY99/OPt9Pqrr1+py8Tc8noyFtQ0o7stNrWYVlStrzPhZp1NUTJNU9NNB4kbpuX1sF4PyzppQVTWMsXWeBBimH3iTBI4SeCyouq6oWk6yzgtywr4PABARdFIEhcldXEtN9TTGvR7kIVUTTt1YTZfrtWboqbr8Yi/WmuizUiTJMvhUHQ6rearRp7HNcw7tbBaqjQwCO2MEUnW7j/Us5Cq5jnhxlKGXx8dgBAgCeyTD4+9fjU7tVRiGbol7L19yHH53Ctf++7ro64pJJVXivpKXkrnSqZp+T2s1830diQW13IkSYyPdJcqfJ0Xqw3exTIkgbsYusjVZNXAIGyNh0RZRQhRJEnTjkq9ydCUHc2xLERTlKpqpmV6XCxXb+IQ+tzsQFdLd0dc181UrtwSC3LVRqZQsd1dWdEM0xrobq01mgghSVZzRc6yQLVplmrCzOJanZfsfcOeXV1QDuxoIXH80lzhxlJGXBcgABFA7XGvx+W4slAAAIiSLKroylKjJeSMBxmkqzMrYkUAsqLYoSwXQ6fzXFdb/I59o+evLDzz/Ov2o2RFm11MOylHLBwQRLm3s8XvcaXzZQyDDpJwOEhF1SBAkqzgGA6ARZBkpdbIl6tjA92KqkYCXt0wEEJFrp4pVgVRxgkilSkdOzAWCfquLqRcDJ2IhQ7vGc4WuLnltG266oaVznM/LQ12Fs3GocjMcnmwO2IvyZsD5zdnkE28gztbO1v8f/fjacOwDNNinc6mSqhSY7w/yAvymXlJtNjp+VXKQYqSggDyuBhRUrgaf/ueEcO0gn53wMv2dbUMdCcFSTVM07KQICkAQoZysE5KVvVMnsuWKg6SIAlC03WIYbphQgD9Xrem6xiEpmWJkuJy0oIsJ6KB4f5OAsd5QfS6WZIg+rpajh/YMT7SwzfFH7x4ttGU7MC+fcSI2Qfhm2Gs7arDSTvu2N3x2mRalPUbHBBdl0H2Db3toTwnyYphS9zs8rqFkrzictNIVKFqOOeWFmRVpymSwPFSpdESC9Z5oVypdyajn33qQdNEq+vZbLHq87gUTdM0Pej3OEjCQeAkSaRy5fmVjJt1xiMBxklbFlJUTRBlt4shcEI3DEXRBEn2e1xeN2MhKxL0YQDyvHDh6oKTcth+bK7IUSRx6vxUOl9Zz3FbZ00IAQwDAAELIQh/KpnCnttatg4h6Ej4ihURXJ9Cb82grcjhR+4dnl8tT8wX7SNAAEClxtcaQqmulqvC6npOUXUMQt0wE9FAvlSrN0W/162o+uWZZa5S03RdN61GU2xKyr4dA143W2s08+UaTTuuzqcuTi0lo4H2lmgs5Pd5WL/XHQkFgj53wOfFcIhBTJTVfKk6t5z2e1xBnztfrjVF2eEgvW7WshAvyNGgN1usLqfyqWzZPtXYFqUEaFsG36b5uqE+AACKZhzd3cELyvRyGbu+GroegyAAyOui/G5qy3reNHCgICmCpFwj21yV7+2Izy5neEGmHIQoKlfm07yo+D0uWVGrDaE9EbYsy7SsbLFydnIhHPDcd3g8FvbRFGVZlm4YiqpKskI6SBzTSBx3et1u1hkNeaYW1k+en2YZp5MmB7qTBI4Hfe7ZxfVQwNsU5TovXF1YJwicdVJ7x3rWsuVSpWEjc9tIz67h7mg4kCtws0vrK+lCqdLY8Icg0A2rVBVbY14AbpQJ+dYA2QwKeJ0kgRWr4vZH2N6WvRZbrpaNWq0hJGPBTKGiqHo87MsWq3Ve2Luj1xarueW0k3ZAAHweV09HYqi7FWJYUxCLXL3I1SsNSVI0RdVIkqAdpM/t9LmZSNDj9bhvG+np72w5e2VRVdRsoZItVlgnzTB0JOjVDTMRDSqazjelpqTky/VqowkA6GmPHxwf7G6P8YLcFMS+zsRof8fCaua7z50u1/iN6ChCxYrQ0xq4sZ4mro8dCHicloVqvAzANdmnYMsjtcXa9uMLXN3vdZEEjhDqSEaDPjdBYKyTFiVFN6yl9fSRPUORoF83Da+LrTSahVJ1NcutpIuqIrGYhlkg6CeaklHWwBLAmyqMR4PdbdFo0NsSDR3ZM9xoiuVK4/L0ssvlHOltCwa869myrGhjg52r64VL0ys7+tt3DXWGAt6A16Xp5vRCSpJVHMfmltY7W2NdbbFfevz4ucnFE+en7dmUquKugRjlwFXNvJ4aug6DAAAAeN20YSJR0q8hoR0D3X5kvpHyA2CtIWAQjvR3BLwuj8upqJphWclYKJUuyIp2dmJh365+hNBapriyXlhMFTyUOZSgggy2Y2z3+L7Df/Odn4wPJqMB9tSJV2qCvlaun3i96PG4hnta/V6X18MWK/VyjU/GQy7Wmc6VT12YHuptLZZr8Ujg3qCPdVK0g+QFWZQUyzTXcuVqXWiK8p6xnrZEuMYrpQq/Y7jXQujUhRkAQENQKQfhpEhVM8F1ELoRg9wsqRnmZqop2hI9y7JoihzobiUInKs2uCpvq6Qdg53HD+50MTSBw0tTS/l8zedhuWqjJRLQTcvrdq5lS+k853RSoihrJhpKEMdGIy1h9o5HPrnj2Ccl1fyVz//tf/iDP99z8MjO7//JmR9/e3612R0VfnRFPH1pjnIQAEBF1brbogSBr+c4gNC+Hb2KZgAEfG6mu6PF4XBcurqwnivHQr58qTq3mhUlNRryjfZ1vHZ5XuUzB3aPLq0suGhix0Dn5NyqpBgEgVMOHADwTkSMdhCabm5kzKGNsxcAwM6hzsN7Rvo6k5qmS4qCAHzp9OVUtrS4mmVoRzIe0nRD1QzbCOzvbFnPld2s07SsOi9ytaai6YmIn2Wcd+10HNvdjiy9a+woG2x79n9/nSsVZmdndo70EUBuS/hd7sCQJCzXclURS+dLAADWSTlpyklTqqpFQz6vm33+5GUcx0iSSBcqfFMsV/nbRrpL1cbF6ZWgzyXJalsivJqrOrTMN//mLwtqOOhUv/Lnf/j8OQ0AICs6BgFJ3MjfuhFAOI5ZlrWRwrIZWL338K5jB3YghFKZQr0pQgBIkjiyd9gyhybnVl9+/ercSoZ2OEzL8rBOp9PhdTFtLdESVxNEBULMSTlkVfO6mUjAtWso4nHTimQuvvplqzJ1+fTzAIDf/73f6UEnNbFCUjQpq61dsZZIkxId2WIZIRD0uymSaPBiT0fcNK0iV09EA7PLmaVUweNyirLS0RJ97dJ8pc4nIv4i10AI6IaZLxQ+dSwBkPkffveLxw6M3j4WfPHsCumgDdNECNn64Z0ABADA4AYydnpdR0tkfKTHtKyVVF7T9UyhQtMUhECUZMtCHjd7eO/wiXPTfLNhWhZCqA0LIwT8HrZab/g9rKbrts1G4Ljbxaq6IQgyy9AKX0hfejq3vAYA0A2Dr5cZJ+3ELNOUeEF2sU5ex5wO0klTGIbZxAn6PDNL601Bbm8JN5pikatX6k0AwNxKhsCxrtZYudowLQsAkC1WPZ0RhMDyya8sT50VMxcC9/U6aKdh2OeX8MaJaDcCSNNNAsdwHDMtE1kIAHBg14CFkCDKBIGfm1zIFDlF1b1utrstFvS5MQwqiuZzM1lJ8bqYXUOdhmktrmVdLNXb3pItVURZtXMTdMMocEKxika6gvlize9jKdbpYksAAIYiWYZGAIiiSlOkrKNMWdEtPBz0Ug4Hy9AMQ/t97sW13Eoq39YSLlYaLtYZ8nu4Go9h0OtiYmH/eq4syqpto9XqvIES5xaEqI8+OBLDkHFmpl7hTWQZNEUiAAzDeocAiZLmIAmSwDTdRAB0JqMulq7Vm5aFdMNoCBLflFtiActCpy/ORoNet4up80KjKTFOykER+VItHPT2dbYIotIU5HjYt5wqJCKBdK4cD4UsgJ+YKI91+WTV9FpI1432GAMAaAkzTopoykaZ11TFmFzlZQ1GgmydFxknBSHwsAxAyLTMowfGREk5c2lOktWhnuTF6RVRUgCEs8uZLQsWQmiY1sp6HoJYvpprj9C5ipWqWGuZIgCApUnTtOxd6HoseuujZ/tqXtQcDtxJk/aPqq4vrGadtMPvdVXrTV03TMtaz3GKpo/2t5uWtZTKc7Wmbpg97XECJyyE2hKRHYOdfR1xhnYQBDHW3wYACPo9Ba4x0J2YWOafO5MK+pilVKVYk0d7IgCA0Z4ghPDKbIFx4Osl4XuncwM9Sa7WZJ2U38u2JcIkgYuy2tOeiIX9btY5Ptzt87oUzWiJBFwMXWsIP+W72wZauTa1kJpJq//nQv31eWFqYd2+zOOiDMOSVWPbpN+kiN/yV9vfdTOOO3Z3vDaRqfEKAGC4t/X4gbFoOMgwTDIW8HvYuZWsYZqSrDaakt/DhoNewzRVzQgHPCGfu6c9ni1WNE3HcRwnCEnR3IxTklWSJOq8WK03Hzy+9ydnU7lStS3mcTlJXTMJAhvt8BmGqWn6qxO5Fyf5Q3vHl1PZUoVPRAKMk+psjQIIGSfdFKT1fPny9FIk6GFox7nJxXjEP9rfQTmIpijrhonZrurmdBRVr9abtUazKYiGaeI4hhA6sCMZ9Dl/eGLhBum+1wEIQPtU+6793dPL5WyJ97mZO/aPiCo6fW5iZnYuzwld7S1NQcyXaziO6YbZEKSmqOi6geGYYVi273phaml+JesgCZ/H5WKdqm6MDXZqmh70uaYW1nNF7vDe0XITm1qupPPVtTwfDzozJXFioTKxJldU3+hg3+XpxZVUfu9Yr9/DdrfFCJzAMExRlMW13Ilz09lSbT3PhQKecpXnBQkCgCyrwDW2+0BbGG0bdi0auHt/l6abJy6uw+uHO65jAkAAANBN6859nVxdml3h4hF/JBRaX5n6xUcPPvrwPaaYO3VhvrOjfW5p3TQt24E2LQvDsZ62WLUhqJo+v5oDACVjIUlR4xF/wOsSJXVqfi2ZCLtZJh4JcDX+4tWlZCyQbGmVLFbDPLkqUKEbUCFfIELg2IunLsqKdsfeETfrDAe9EGJctQEAMi1U5Boel7Nc5WVFK1caumGIslarNzXdPLCrf7SvnWXoUqVhIfTmiOqWTfjYnYNrufqlucINoq43CrkaJtoznHDS5JnJTGdrQhOKX/w3j++69zMX57l/94XPZy9+ZyGr4jhubx8WQtGQd89ojwVQucpztSaOYRZCPg8zPtyDYXBmcV2UlEjQ53ExdV5wsc6WaLAlFkznuWK5iizLMAzTtFRNl2U5my8XuVpfV3K0v51haJLAaMohSvJqupgrVkgCT0SD8yvZakPweRjdMGmKVFS9vyt520h3JOiNhvyHdg+1t4RnFtO6YV4TD7Np5fc4H7tz8MSl1Eqm/g7CHRt6biVT2zUQBwBIir6jlY56tK/8v3/8ze++sjdZ6Us4z85VIPYGxKKkLqzmJEW1LMtJkW6X07QQAFCUledenRYkhSTw4d42RY23t0QMw2SdtN/rak+E600pX6qWqw1JUR0EEfC5O5LReMTvIEkAAe0gDcO8PLuyuJpdSZcAALSDvPPgmKobbfGQ2+V00lS2wAmiqhtGplDxCBLLCKVKbddw7y89fuc3n3lpa8vfWnuEQGvMQznw1Wx9K1r09gCyx9wqd/f+rmiAkRRVs6hSeo7PpDiuvHLp2UrDMAEUpA1fH0Jgx4loB6kbZk97zLIQAkg3LF6Q7DxDr5uZWlibW87Ewn4XQw31tLpYhmWoaNAX8ntIkmg0BYamXCxTb4rNpqRqxmqmmC9WcuVapdYMBzwdychapoQAEGUVWcjnY1mG5mp8rlQDACys5ggcYxna52H7u5LZYqWns+XhO/f93Q9PbN+kbLXU3xHkRTVbbG5Ux75dgGxQl9I1BMBAV+jsVDld9b42VWkJuh851Fbk1DPzvKS5ypXa5g4JAUCt8ZBuGIVyvVzlO5IRVTNEueliaDu+19sZH+ppfe3i3M6hromZlR+fmhjqbUtlikGfi6FpF+vkBZFlnIqqpvMVxkn5POz5K0sfe+RILOLnm9LeXf0nzk4BAAgCxzGo6TpNO4pcvVSp23VUbtZpf0g6x1kWwjGMcdKxsL8tEV7PlbdIZDtPIz3RpXRN0YztxUVvHtj1AUIQgGpDXss19o22Kopcacg/vKhMrwvJCPvCFT7bdK2sF2RF20pSaEuEg363KCkYBqsNYXpxHccx1kkpqma//8ylBUhQbhdz7Pbdv/5LHzowPvinv/tr4YD3M//iCYwghvo7WJcLAfQrn3jE42KeeuKe3/7sx0f6Wv/db3y8LRmLRQIFrjE5u2Z/nqrpfq8LAljnxdZ4KOR3x8J+XpQbgtQUZASQrKjJWBDDMJahQ37PVrzVtmBCPqazxTcxV3gjDvsORAzDoGmhC1PZDx0f8LDUzGIqEQ2UG25rWYAQctW1ar1p+2gAgN72+Nhgh64bIZ/74vSKYRi6YVVqfMDrVlSddjg0zQAA/PiVC3xTaEqqy+W+OLXkZN2lmhAIeC0A7jy6v1QTAMQ++th9X/qLb1FOti4oS6ki5WTXc9zMwpqiblSc0Q4SAcjQVLXe7EhGilxdVjRV003TghAalgUACPrc5RpPEIRloXgkAKaXN9P1gYnAjv4oAGByvgAAuHHp1I0Asu88N5378D1D40PxV86v5YpVUHyj4G3Lyjh029D+Xf3lSr2mNYuVhiDKAIKI31upNxknTZJ4NOSTZNUwzUyuhAA4c3H60J7RcqXxvedONZviH//Ft1bT+S/9+TfnFte6O5MnzlxeSxeX1zIvpfOKqq2mslNzq3Yqul0jFg54JFnVdMPWgE1RFmV1qwoIAvChe/aN9HU4acowrdMXZkqVmp1qtDWp/WPJhVSlVBU3Y6LXHTfL7oBQkLSRnnB3a+CV82sYtuH+btpbACHU3hK5+/adqqbnipWr86nlVAHDoGlZAa9blFRF0zysk3FSkqwqqmabsOvZUiIWuTg5d/HKvGVZmXxZVfVcgdN0g3HSV+dWUplCvlSZmFrqaI3Lqnbq7BUCxwGECKFwwBsJ+CRFrTfFal0Y7m2tNyVBUnAMsyzk87D3H9una8ZaJm8gIuhzBTzMzFKmyNXtYzKEUEvE/bEHRv/xxdlUvnHTFKGbpAHboZIXzq4NdIa6kn5rMytr01RFAIDx4S4cg7kCN7+S46q8x+VkGRqDsLst6ve6kIUkWXUxdCToBQDYVUCCKH/rOz8iCFyUFFuLbVaPw5VU7sSZCQhhrsABAIrl6re/87x9BGZZFgAgEQk4HISq6RiEqqbXebG3Iw4AMC2LpshjB3aV8qnhDsfDxwbF8vyzL72O40RXa2xzvQEA4M59XYKknZ/K3kop8E0Asu8/N5UtVYQHD/dcQy6EQCzs7+1I2OmVuVKFIIiGINV5sSMZdTjIRlMUZEVWNYpydLfHAACxsJ8kcAdJiJJiGOb2+kprm3+wQVIAZEXVDcNBkjTlCPm9BIEnogECx1TNqDVEgsDXMqXVdJGmSABAb2drqZD6nd946Ff+9RePPPLrT//jd2/rhGcn5wkcIwjcblngZh1H93S8cn5NVo1byTC7CUB21aBpWs+eXDq4szURcVsWwrblyXcmIxDAhiDb58W8INl2Rr0pnjw/Q+C4ZaF6U8IgdLPOaMg31t9237H9u3cNb4X63+qlbzjiNoL3HNu3f3xwz47esN/tczMkQZQqdQyDsZCvxov2QRMAQDfBUAt+23D7b/3+n33lf/x1vVy8+0APtORStWkYJo5hAID7DvYQOPb8meWbqudbAmiLRC+dX6015MeO9YNNS2vrFLdcbfg8TDjoJUncnhiGYXYk30Kov6tFltVGUxQlpbcjMTGzfO/R3QGfGwDwoQeObZWRX/tZGAYA6GhvufPwXgDA6GD3vvHBi1fmutrikqJqhqEb5vhIV9DnBgDgGGY/QtNUkmLmL/14YfLEay//cPpHfyLwDYbCK3XBlkGvm3rwjr6fnFmpNmQcg7dS1HpzgGwSqZr53Rdmj+xu72sPWtYbcdxqrUkSOI7hfo9roDvZ35mgHIRlbWQlqZrudzMEgZUqjYYg+T0sAFilxrfEgolo8OF7DqHN5PjtGEEIbXXjYp0f/YVjAICh3tb5pRSEeGs8JEmqXfKbznFr2bI9c/tGVdUW82quLLdF3L1tfl6Gl+aKgopJsmRf8MTdwwiB778yd4v0udVaDVtHvHhubWm99tRDYxtHkZsQpHLlK/Nr7cnIQ3fuP7Jv5x17x8YGuzeWVDdSuXIk4F1eL5QrvGGYYwOdL544b6jyUG9rayIKAIhHw4yT3p60jxBqS8YBAH6vuyUWjIW9tWp1cmZ5/84+rsbXeGEtUwr5PZSDaDTFzTRt+/i7Xmqgb72Q3dPv3dfvfenC+uV1oFtYtsgBAHraAvce7Pn7H083BPUW6XOrAKFNffGNf5robw88ckffVkOIhiDNLadpByGr5sunz0uN1Gi3Oxkg9u8asr+82hB8HldPW2xhLdsUZb/XxdDki6cuETge8LnCQe8nn3woEgpsiZX92McfOtrX1TrQ0wYAcjmpv/rGM91tcc0wy9XG+atLbYmwx+2cX81vl3S7XmRhNZPh6VfnzB9NSCeX8KoIzk/OWRaAAHz60fHldPW5U4tvq4/FrdZq2ILG1WUHSXz43uGLM/lqQyZwTFI0n9c12NN26erME8d7fu8P/yLeMXL7rvazr7+uIIpvCqZplaoNlqG9LiZTqHS2Rge62zAMXppaum24cz1TvP/4/snppVg01J6MZ3LFJx+9Z2p2+XO//FihWB7pS84trk1Mrxy4baglGkznSlML6wSBUw7SznS5Ztj5d0Wu2hBUrq6UufpapmAL4MfuHzm4s+1Pv3GqxivvSTHL1pheKo8PJg7vanv5/KrdgoUiCYxwRFj5Vz98aDZn/eZ/+m+ffGRnbnliel1r8E27Xq7RlEzLkhStVGm4GCoa9EMcO31+qlCqHNwzSpJEayLc1902M7/yHz/38am5pacev+v7Pzq5spaZnl8b7uv0uJjpxfULV5fsqrFqXbheSZNtfCiqJsmKoukEgVkW2tEf/cxH9nzrh5OvX8ngb7N3xdsDyA6MTS+XHjrS25UM2G0nNF0nCbIz4Rpr0a6cf/Xr37vYy6Q5Ac6mpUZTsM1fDEJVN9ri4UK5nsqVSQK/bbg7Hg1yVf7CxKzAN90sHY/4CYLoSEbOXrhardYuTC52JGN7dwwghM5fWZiYWUUAtcZDXL15U/Vh2wd2OVs4wP7ev7zj8nzh689cvnHo510AyBa0pqitF/iPPzDCUMTEfNEuoiVIJw3kSIDVDQuHYCpjpYu8JCtw04kGADgc5NhgRybP5ctVTTdY2tHZGsVxLFuoLKdyi8vr5Urt8pWFpiCrqnH7nmHKQVbqzRPnpjMFDsNgd1sMQlCu8rdSEWeX/zkp4vc/c9Qw0R9+9aRhWO+grvdti5iNUa7crPHyUw/tMAxzdpUTJYWinNkaajQlv4eezlqZiprOla65V9N1UVKaotyaCKcypfUc53WzPe0Jn9c11NsWiwRCfk9Xe7yzLZ6IBnXDXFjNnJ2Y5wW5IxktlGuVOt8QZMuybjpLGx0cg7/7a3fEwu7Pf/mVGi/bLUTec4C2qkyX0zVNN3/x4THdMGdXuUqd1wyQKpsLWTldbGTyb9GdxLKQpKgAAF03etrjqqalsuUiV9c0nXKQAAKEkIVQuVLPFMrnJheWUwWaouKRwFqmaBgmhBuu3E2mhG+g8zu/erivM/zFr7yaytffQUuYn6nvy1abmkePD/zjn33kEw+Mvp0bN/4d8LlG+9sZJwUA8LmZtkSoNR5qiQZsxyoeCfS0x4nN1IsNSb05OhgAgKHJ//K549/+48cHOkO2qf2OZ/rOW1PYGM2ucrygfuKhsXjQdWk2b+ujm66Ufa+saJpmDHQnNU2XVb1Sa/KC1BRlDMNiYX805J1dzliWtXmQdfNnbvYScX3+M0dDfvaLX3l1MVX5GdsJ/cw8AtBCaN9o8l99bG+2xP/3b5/NlZvbu3TdYNiBN9pBRsM+F0PjOGbzsiHIqqrnS1W07RD5xmMLhfHB+L/++P4qL//J108VK8JGXfbPccBNI7s97v1vv33ft/7osTv3dW599E03je1X+L1sX2fimgW46cAg3Aon/eKDY9/5s4/+208epB2E/QHvygTfhYFjmGlZlAP/Fx/ade/B7nNXM//rnybttoc4Bi10o7Dm9pzZ7ajdlDjb2zMOdoU+/dh4IuL95g8mnz258C42M3vXephtkXz3cOJTj+z0u+kfnJj/4asLgqxvVJUDgG64zdpRppsbgQBA7I0wW9jPfuSeoWP7OmeWua9+92K60NgS/HdlXu9mF7wt1UM5iA8dG3j4jj5VN549ufjC6ysNQd3CEb2jXqO2XofgjY6esZDrvkM9d+7rEmXt6R9Pv3xudatf2LvYBu/d76O4RaVIgH3kaP+xPZ2abrw2mT5xITWfqmxH01YRaMP8f1Ofqo1NAFwDKI7Doa7wXfu7d4+0iJL63MnFH51ellX9vegR+F514txM9tgQgWN7O47e1hH0M+lC4+JMfnKhsJqtycrNe3BuH27G0ZX0jw/Fdw3EIwFXpsi/cHblxIU1SdHfC+K8twDZY3ujVQeJj/ZGDuxoHe6O+Nw0LyrpfGM1W88UG4WKWG+qkqJpumm3QcIx6CBxhiYDPiYWZNvivs4WXzzkYp2OSkOemC+cvrw+t7oR7niPGnC+HwBtvABCbFsrYNpBdCX9g13h3rZAMuL2emhbLnTd1I0Nk4XAMYKABI5jGDQMqy6o6UJjbpWbW+XWcvUtu+a9huZ9AmgTprdoJk3gmN/rDHqdfg/tZimGIgkCAwCouinJOi+qlbpUbcgNQX1z2QN6Hzolv58AXYMUBODGxtE1Y6sv+fvZavvnA9BPvRu+YUu/+TtsHDaPyH6On/nB+GB8MD4YH4wPxj/X8f8DTSMDyc+YQgEAAAAASUVORK5CYII=";

  // colors.js
  var COLOR_SYNONYMS = /* @__PURE__ */ new Map([
    ["grey", "gray"],
    ["crimson", "red"],
    ["scarlet", "red"],
    ["cobalt", "blue"],
    ["azure", "blue"],
    ["emerald", "green"],
    ["violet", "purple"],
    ["golden", "gold"],
    ["ebony", "black"],
    ["ivory", "white"],
    ["charcoal", "gray"]
  ]);
  function normalizeColor(value) {
    if (typeof value !== "string") return "";
    const norm = value.trim().toLowerCase().replace(/[\s_-]+/g, " ").trim();
    if (!norm) return "";
    return COLOR_SYNONYMS.get(norm) ?? norm;
  }

  // garment_data.js
  var GARMENT_CANON = { "boots": "boot", "boxing shoes": "boxing shoe", "bracers": "bracer", "greaves": "greave", "heels": "heel", "pauldrons": "pauldron", "sandals": "sandal", "shoes": "shoe", "slippers": "slipper", "sneakers": "sneaker", "stockings": "stocking", "trousers": "trouser" };

  // state.js
  function canonicalGarment(item) {
    if (typeof item !== "string") return "";
    const n = item.trim().toLowerCase();
    return GARMENT_CANON[n] ?? n;
  }
  function unwrapV2(obj) {
    if (!obj || typeof obj !== "object") return obj;
    if (!("changed" in obj)) return obj;
    if (!obj.changed) return {};
    const d = obj.delta;
    return d && typeof d === "object" ? d : {};
  }
  var SPECIES_REVEAL_HUMAN = /* @__PURE__ */ new Set(["human", "humans", "person", "people"]);
  var SPECIES_REDUNDANT_HUMAN = /* @__PURE__ */ new Set([
    "man",
    "men",
    "woman",
    "women",
    "boy",
    "girl",
    "guy",
    "lady",
    "gentleman",
    "child",
    "adult",
    "teenager",
    "teen",
    "toddler",
    "infant"
  ]);
  var HUMAN_DEFAULT_SPECIES = /* @__PURE__ */ new Set([...SPECIES_REVEAL_HUMAN, ...SPECIES_REDUNDANT_HUMAN]);
  function isDefaultHuman(species) {
    if (typeof species !== "string") return species == null;
    const s = species.trim().toLowerCase();
    return s === "" || HUMAN_DEFAULT_SPECIES.has(s);
  }
  function shouldStripHumanSpecies(newSpecies, prevSpecies) {
    const n = typeof newSpecies === "string" ? newSpecies.trim().toLowerCase() : newSpecies == null ? "" : null;
    if (n === null) return false;
    if (SPECIES_REDUNDANT_HUMAN.has(n)) return true;
    if (n === "" || SPECIES_REVEAL_HUMAN.has(n)) {
      return isDefaultHuman(prevSpecies);
    }
    return false;
  }
  function foldMaterialIntoColor(item) {
    if (!item || typeof item !== "object" || Array.isArray(item) || !("material" in item)) return item;
    const { material, ...rest } = item;
    if (material && !rest.color) rest.color = material;
    return rest;
  }
  function foldSlotFieldMaterials(field, value) {
    if (field === "worn" && Array.isArray(value)) return value.map(foldMaterialIntoColor);
    if (field === "holding" && value && typeof value === "object" && !Array.isArray(value)) {
      return foldMaterialIntoColor(value);
    }
    return value;
  }
  function sameGarment(a, b) {
    return typeof a === "string" && typeof b === "string" && canonicalGarment(a) === canonicalGarment(b);
  }
  function mergeWorn(existing, incoming) {
    const out = Array.isArray(existing) ? existing.map((w) => ({ ...w })) : [];
    for (const raw of Array.isArray(incoming) ? incoming : []) {
      const inc = foldMaterialIntoColor(raw);
      if (!inc || typeof inc !== "object" || Array.isArray(inc)) continue;
      const i = typeof inc.item === "string" ? out.findIndex((w) => sameGarment(w.item, inc.item)) : -1;
      if (i >= 0) out[i] = { ...out[i], ...inc, item: out[i].item };
      else out.push(inc);
    }
    return out;
  }
  function removeWorn(existing, names) {
    if (!Array.isArray(existing)) return [];
    const drop = /* @__PURE__ */ new Set();
    for (const n of Array.isArray(names) ? names : []) {
      const s = typeof n === "string" ? n : n && typeof n.item === "string" ? n.item : null;
      if (s) drop.add(canonicalGarment(s));
    }
    return existing.filter((w) => !(drop.size && w && typeof w.item === "string" && drop.has(canonicalGarment(w.item)))).map((w) => ({ ...w }));
  }
  function sameWound(a, b) {
    return typeof a === "string" && typeof b === "string" && a.trim().toLowerCase() === b.trim().toLowerCase();
  }
  function mergeWounds(existing, incoming) {
    const out = Array.isArray(existing) ? existing.map((w) => ({ ...w })) : [];
    for (const inc of Array.isArray(incoming) ? incoming : []) {
      if (!inc || typeof inc !== "object" || Array.isArray(inc)) continue;
      const i = typeof inc.text === "string" ? out.findIndex((w) => sameWound(w.text, inc.text)) : -1;
      if (i >= 0) out[i] = { ...out[i], ...inc, text: out[i].text };
      else out.push(inc);
    }
    return out;
  }
  var MISSING_DEPENDENTS = {
    left_shoulder: ["left_arm"],
    right_shoulder: ["right_arm"],
    left_arm: ["left_hand"],
    right_arm: ["right_hand"],
    left_leg: ["left_foot"],
    right_leg: ["right_foot"],
    hind_left_leg: ["hind_left_foot"],
    hind_right_leg: ["hind_right_foot"]
  };
  function withDependentMissing(body) {
    if (!body || typeof body !== "object" || Array.isArray(body)) return body;
    const out = { ...body };
    let changed = true;
    while (changed) {
      changed = false;
      for (const [parent, children] of Object.entries(MISSING_DEPENDENTS)) {
        if (out[parent]?.missing !== true) continue;
        for (const child of children) {
          if (out[child]?.missing === true) continue;
          out[child] = { ...out[child] || {}, missing: true };
          changed = true;
        }
      }
    }
    return out;
  }
  function applyCharDelta(state, delta) {
    for (const [key, val] of Object.entries(delta)) {
      if (key === "body") {
        if (!val || typeof val !== "object" || Array.isArray(val)) continue;
        if (!state.body) state.body = {};
        for (const [slot, slotDelta] of Object.entries(val)) {
          if (!slotDelta || typeof slotDelta !== "object") continue;
          if (!state.body[slot]) state.body[slot] = {};
          const slotState = state.body[slot];
          for (const [sf, sv] of Object.entries(slotDelta)) {
            if (sf === "worn_remove") continue;
            const isEmptyArray = Array.isArray(sv) && sv.length === 0;
            const isEmptyString = sv === "";
            const isEmptyObject = sv !== null && typeof sv === "object" && !Array.isArray(sv) && Object.keys(sv).length === 0;
            if (isEmptyArray || isEmptyString || isEmptyObject) {
              delete slotState[sf];
            } else if (sf === "worn") {
              slotState.worn = mergeWorn(slotState.worn, sv);
            } else if (sf === "wounds") {
              slotState.wounds = mergeWounds(slotState.wounds, sv);
            } else {
              slotState[sf] = foldSlotFieldMaterials(sf, sv);
            }
          }
          if ("worn_remove" in slotDelta) {
            slotState.worn = removeWorn(slotState.worn, slotDelta.worn_remove);
          }
          if (slotDelta.bare === true) {
            slotState.worn = [];
          } else if (Array.isArray(slotDelta.worn) && slotDelta.worn.length > 0 && slotState.bare === true) {
            delete slotState.bare;
          }
          if (Array.isArray(slotState.worn) && slotState.worn.length === 0) {
            delete slotState.worn;
          }
          if (Object.keys(slotState).length === 0) {
            delete state.body[slot];
          }
        }
        if (Object.keys(state.body).length === 0) {
          delete state.body;
        }
      } else {
        if (key === "species" && shouldStripHumanSpecies(val, state.species)) {
          continue;
        }
        if (val === "") {
          delete state[key];
        } else {
          state[key] = val;
        }
      }
    }
    return state;
  }
  function applyDelta(prevState, delta) {
    delta = unwrapV2(delta);
    const next = JSON.parse(JSON.stringify(prevState || {}));
    if (!delta || Object.keys(delta).length === 0) return next;
    for (const [char, charDelta] of Object.entries(delta)) {
      if (!charDelta || typeof charDelta !== "object") continue;
      if (!next[char]) next[char] = {};
      applyCharDelta(next[char], charDelta);
      if (Object.keys(next[char]).length === 0) {
        delete next[char];
      }
    }
    return next;
  }
  function foldDeltaToChar(delta, name, exclude) {
    if (!delta || typeof delta !== "object") return {};
    const skip = new Set([...exclude || []].filter(Boolean).map((s) => String(s).toLowerCase()));
    let acc = {};
    for (const k of Object.keys(delta)) {
      if (skip.has(k.toLowerCase())) continue;
      if (delta[k] && typeof delta[k] === "object") {
        acc = applyDelta(acc, { [name]: delta[k] });
      }
    }
    return acc;
  }
  function renameChar(state, from, to) {
    if (!state || !(from in state) || from === to) return state;
    const next = {};
    for (const [k, v] of Object.entries(state)) {
      next[k === from ? to : k] = v;
    }
    return next;
  }
  function buildAliasLookup(...books) {
    const map = {};
    for (const book of books) {
      if (!book || typeof book !== "object") continue;
      for (const [canonical, variants] of Object.entries(book)) {
        if (!canonical) continue;
        map[canonical.trim().toLowerCase()] = canonical;
        for (const v of Array.isArray(variants) ? variants : []) {
          if (v && String(v).trim()) map[String(v).trim().toLowerCase()] = canonical;
        }
      }
    }
    return map;
  }
  function resolveAliases(obj, lookup) {
    if (!obj || typeof obj !== "object" || !lookup) return obj;
    const keys = Object.keys(obj);
    if (keys.length === 0) return obj;
    let changed = false;
    const out = {};
    for (const k of keys) {
      const canonical = lookup[k.trim().toLowerCase()] || k;
      if (canonical !== k) changed = true;
      if (Object.prototype.hasOwnProperty.call(out, canonical)) {
        out[canonical] = applyDelta({ x: out[canonical] }, { x: obj[k] }).x;
        changed = true;
      } else {
        out[canonical] = obj[k];
      }
    }
    return changed ? out : obj;
  }
  function dropHidden(obj, hidden) {
    if (!obj || typeof obj !== "object") return obj;
    const h = hidden instanceof Set ? hidden : new Set(Array.isArray(hidden) ? hidden : []);
    if (h.size === 0) return obj;
    const keys = Object.keys(obj);
    if (!keys.some((k) => h.has(k))) return obj;
    const out = {};
    for (const k of keys) if (!h.has(k)) out[k] = obj[k];
    return out;
  }
  function orderChars(names, order, personaName2) {
    const present = new Set(names);
    const seen = /* @__PURE__ */ new Set();
    const result = [];
    for (const n of Array.isArray(order) ? order : []) {
      if (present.has(n) && !seen.has(n)) {
        result.push(n);
        seen.add(n);
      }
    }
    const isPersona = (n) => n === personaName2 || n === "self";
    const rest = names.filter((n) => !seen.has(n));
    rest.sort((a, b) => (isPersona(a) ? 0 : 1) - (isPersona(b) ? 0 : 1));
    for (const n of rest) result.push(n);
    return result;
  }
  var lockKey = (char, slot) => JSON.stringify([char, slot]);
  function lockSet(locks) {
    if (locks instanceof Set) return locks;
    return new Set(Array.isArray(locks) ? locks : []);
  }
  function applyUserEdit(prevState, char, slot, slotState) {
    const next = JSON.parse(JSON.stringify(prevState || {}));
    const hasValue = slotState && typeof slotState === "object" && Object.keys(slotState).length > 0;
    if (hasValue) {
      if (!next[char]) next[char] = {};
      if (!next[char].body) next[char].body = {};
      const folded = {};
      for (const [f, v] of Object.entries(slotState)) folded[f] = foldSlotFieldMaterials(f, v);
      next[char].body[slot] = folded;
    } else {
      if (next[char] && next[char].body) {
        delete next[char].body[slot];
        if (Object.keys(next[char].body).length === 0) {
          delete next[char].body;
        }
      }
      if (next[char] && Object.keys(next[char]).length === 0) {
        delete next[char];
      }
    }
    return next;
  }
  function graftUserEdits(base, current, editedKeys) {
    if (!Array.isArray(editedKeys) || !editedKeys.length) return base;
    const out = JSON.parse(JSON.stringify(base || {}));
    for (const key of editedKeys) {
      let char, slot;
      try {
        [char, slot] = JSON.parse(key);
      } catch {
        continue;
      }
      const cur = current?.[char]?.body?.[slot];
      if (cur === void 0) {
        if (out[char]?.body && slot in out[char].body) {
          delete out[char].body[slot];
          if (Object.keys(out[char].body).length === 0) delete out[char].body;
          if (Object.keys(out[char]).length === 0) delete out[char];
        }
        continue;
      }
      out[char] = out[char] || {};
      out[char].body = out[char].body || {};
      out[char].body[slot] = JSON.parse(JSON.stringify(cur));
    }
    return out;
  }
  function isSlotLocked(locks, char, slot) {
    return lockSet(locks).has(lockKey(char, slot));
  }
  function setSlotLock(locks, char, slot, on) {
    const set = new Set(lockSet(locks));
    if (on) set.add(lockKey(char, slot));
    else set.delete(lockKey(char, slot));
    return Array.from(set);
  }
  function filterLockedFromDelta(delta, locks) {
    const inner = unwrapV2(delta);
    const set = lockSet(locks);
    if (!inner || typeof inner !== "object" || Array.isArray(inner) || set.size === 0) {
      return Array.isArray(inner) ? {} : JSON.parse(JSON.stringify(inner || {}));
    }
    const out = JSON.parse(JSON.stringify(inner));
    for (const [char, charDelta] of Object.entries(out)) {
      if (!charDelta || typeof charDelta !== "object") continue;
      const body = charDelta.body;
      if (body && typeof body === "object") {
        for (const slot of Object.keys(body)) {
          if (set.has(lockKey(char, slot))) {
            delete body[slot];
          }
        }
        if (Object.keys(body).length === 0) {
          delete charDelta.body;
        }
      }
      if (Object.keys(charDelta).length === 0) {
        delete out[char];
      }
    }
    return out;
  }

  // paperdoll.js
  var DAMAGE_TIER = {
    pristine: { class: "bh-tier-0", label: "pristine", tier: 0 },
    damaged: { class: "bh-tier-2", label: "damaged", tier: 2 },
    broken: { class: "bh-tier-4", label: "broken", tier: 4 },
    // Legacy coercion: pre-D22 saved chats may carry 'cracked'; map it onto the
    // nearest current tier (renders as 'damaged') so old state still displays.
    cracked: { class: "bh-tier-2", label: "damaged", tier: 2 }
  };
  function tierOf(damageStr) {
    return DAMAGE_TIER[String(damageStr ?? "").toLowerCase()]?.tier ?? 0;
  }
  function woundSeverity(w) {
    if (w && typeof w === "object" && w.severity) {
      const s = String(w.severity).toLowerCase();
      if (s === "minor") return 1;
      if (s === "serious") return 2;
      if (s === "critical") return 3;
    }
    const text = String(typeof w === "string" ? w : w?.text ?? "").toLowerCase();
    if (/\b(minor|light|small|superficial|tiny|faint|mild)\b/.test(text)) return 1;
    if (/\b(deep|severe|heavy|grave|mortal|fatal|massive|critical)\b/.test(text)) return 3;
    if (/\b(stab|impal|gunshot|arrow wound|hemorrhag|gushing|spurt|shattered|crushed|broken|fracture|sever(ed|al)?|amputat|disembowel)\b/.test(text)) return 3;
    if (/\b(bruis|scratch|scrape|abrasion|graze|scuff|blister|chafe|red mark|faint mark|nick)\b/.test(text)) return 1;
    return 2;
  }
  function woundText(w) {
    return typeof w === "string" ? w : w?.text ?? "";
  }
  var SLOT_SIDE = {
    head: "center",
    face: "center",
    neck: "center",
    chest: "center",
    back: "center",
    waist: "center",
    mouth: "center",
    left_eye: "left",
    left_ear: "left",
    left_shoulder: "left",
    left_arm: "left",
    left_hand: "left",
    left_leg: "left",
    left_foot: "left",
    right_eye: "right",
    right_ear: "right",
    right_shoulder: "right",
    right_arm: "right",
    right_hand: "right",
    right_leg: "right",
    right_foot: "right",
    // Species-conditional slots (tail + centaur hind pair)
    tail: "center",
    hind_left_leg: "left",
    hind_left_foot: "left",
    hind_right_leg: "right",
    hind_right_foot: "right"
  };
  var SLOT_Y = {
    head: 6,
    left_eye: 8,
    right_eye: 8,
    left_ear: 9,
    right_ear: 9,
    face: 12,
    mouth: 14,
    neck: 20,
    left_shoulder: 25,
    right_shoulder: 25,
    chest: 38,
    back: 38,
    left_arm: 42,
    right_arm: 42,
    waist: 56,
    left_hand: 60,
    right_hand: 60,
    left_leg: 74,
    right_leg: 74,
    left_foot: 94,
    right_foot: 94,
    // Quadruped hind pair (centaurs etc.) — visually behind the front legs
    hind_left_leg: 78,
    hind_right_leg: 78,
    hind_left_foot: 96,
    hind_right_foot: 96,
    tail: 88
    // generally below the waist, varies by family
  };
  var SLOT_LABEL = {
    head: "head",
    face: "face",
    neck: "neck",
    chest: "chest",
    back: "back",
    waist: "waist",
    mouth: "mouth",
    left_eye: "L. eye",
    right_eye: "R. eye",
    left_ear: "L. ear",
    right_ear: "R. ear",
    left_shoulder: "L. shoulder",
    right_shoulder: "R. shoulder",
    left_arm: "L. arm",
    right_arm: "R. arm",
    left_hand: "L. hand",
    right_hand: "R. hand",
    left_leg: "L. leg",
    right_leg: "R. leg",
    left_foot: "L. foot",
    right_foot: "R. foot",
    // Species-conditional slots
    tail: "tail",
    hind_left_leg: "L. hind leg",
    hind_right_leg: "R. hind leg",
    hind_left_foot: "L. hind foot",
    hind_right_foot: "R. hind foot"
  };
  var FAMILY_LABEL_OVERRIDES = {
    digitigrade: {
      left_foot: "L. paw",
      right_foot: "R. paw"
    },
    centauroid: {
      left_leg: "L. fore-leg",
      right_leg: "R. fore-leg",
      left_foot: "L. fore-hoof",
      right_foot: "R. fore-hoof",
      hind_left_leg: "L. hind-leg",
      hind_right_leg: "R. hind-leg",
      hind_left_foot: "L. hind-hoof",
      hind_right_foot: "R. hind-hoof"
    }
  };
  function labelOf(slot, family) {
    const override = FAMILY_LABEL_OVERRIDES[family];
    if (override && override[slot]) return override[slot];
    return SLOT_LABEL[slot] || slot;
  }
  var PROPOSED_SLOTS = /* @__PURE__ */ new Set([
    "tail",
    "hind_left_leg",
    "hind_right_leg",
    "hind_left_foot",
    "hind_right_foot"
  ]);
  var FAMILY_ALWAYS_SLOTS = {
    centauroid: /* @__PURE__ */ new Set(["hind_left_leg", "hind_right_leg", "hind_left_foot", "hind_right_foot", "tail"]),
    serpentine: /* @__PURE__ */ new Set(["tail"]),
    digitigrade: /* @__PURE__ */ new Set(["tail"])
    // cats, foxes, wolves all have tails
    // humanoid doesn't auto-add — tail (rare for humans) appears only when populated
  };
  var currentLayout = "paired";
  function setDollLayout(mode) {
    currentLayout = ["paired", "columns", "list"].includes(mode) ? mode : "paired";
    return currentLayout;
  }
  var LAYOUT_PAIRS = [
    ["left_eye", "right_eye"],
    ["left_ear", "right_ear"],
    ["left_shoulder", "right_shoulder"],
    ["left_arm", "right_arm"],
    ["left_hand", "right_hand"],
    ["left_leg", "right_leg"],
    ["hind_left_leg", "hind_right_leg"],
    ["left_foot", "right_foot"],
    ["hind_left_foot", "hind_right_foot"]
  ];
  var PAIR_OF = (() => {
    const m = {};
    for (const [l, r] of LAYOUT_PAIRS) {
      m[l] = r;
      m[r] = l;
    }
    return m;
  })();
  var LAYOUT_SLOT_ORDER = [
    "head",
    "left_eye",
    "right_eye",
    "left_ear",
    "right_ear",
    "face",
    "mouth",
    "neck",
    "left_shoulder",
    "right_shoulder",
    "chest",
    "back",
    "left_arm",
    "right_arm",
    "waist",
    "left_hand",
    "right_hand",
    "left_leg",
    "right_leg",
    "hind_left_leg",
    "hind_right_leg",
    "tail",
    "left_foot",
    "right_foot",
    "hind_left_foot",
    "hind_right_foot"
  ];
  function layoutSwitchHtml() {
    const opt = (mode, icon, title, label) => `<button class="bh-ls-opt${mode === currentLayout ? " bh-ls-active" : ""}" data-layout="${mode}" title="${title}" aria-label="${label}"><i class="fa-solid ${icon}"></i></button>`;
    return `<div class="bh-layout-switch" role="group" aria-label="Panel layout">
        ${opt("paired", "fa-grip-lines", "Paired rows \u2014 L/R aligned, every box coupled to the body", "Paired rows")}
        ${opt("columns", "fa-table-columns", "Columns \u2014 packed two-column layout", "Columns")}
        ${opt("list", "fa-list", "Compact list \u2014 no silhouette, saves space", "Compact list")}
    </div>`;
  }
  var SPECIES_FAMILIES = {
    humanoid: [
      "human",
      "elf",
      "half-elf",
      "dwarf",
      "gnome",
      "halfling",
      "orc",
      "tiefling",
      "aasimar",
      "genasi",
      "goliath",
      "firbolg",
      "minotaur"
    ],
    digitigrade: [
      "catfolk",
      "felid",
      "cat",
      "tabaxi",
      "leonin",
      "wolffolk",
      "wolf",
      "lupine",
      "canid",
      "gnoll",
      "jackal",
      "foxfolk",
      "fox",
      "vulpine",
      "kitsune",
      "mousegirl",
      "mousefolk",
      "rodent",
      "ratfolk",
      "rabbitfolk",
      "harengon",
      "lagomorph",
      "goat",
      "satyr",
      "caprine"
    ],
    serpentine: [
      "lamia",
      "naga",
      "merfolk",
      "echidna",
      "serpent",
      "snake",
      "yuan-ti",
      "medusa"
    ],
    centauroid: [
      "centaur",
      "driderkin"
    ]
    // Winged families (avian / draconic) and the wings slot are not yet drawn.
    // Unmapped winged species fall back to humanoid until then.
  };
  function familyOf(species) {
    const s = String(species || "").toLowerCase().trim();
    if (!s) return "humanoid";
    for (const [family, members] of Object.entries(SPECIES_FAMILIES)) {
      if (members.includes(s)) return family;
    }
    return "humanoid";
  }
  var OFF_BODY_SLOTS = {
    humanoid: /* @__PURE__ */ new Set(),
    digitigrade: /* @__PURE__ */ new Set(),
    serpentine: /* @__PURE__ */ new Set(["left_leg", "right_leg", "left_foot", "right_foot"]),
    centauroid: /* @__PURE__ */ new Set()
  };
  function normalizeHolding(h) {
    if (!h) return null;
    if (typeof h === "string") return { item: h, damage: null, color: null };
    if (typeof h === "object" && h.item) {
      return { item: h.item, damage: h.damage || null, color: h.color || null };
    }
    return null;
  }
  function escapeHtml(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }
  function damageMeta(d) {
    const key = String(d ?? "").toLowerCase();
    return DAMAGE_TIER[key] || { class: "bh-tier-0", label: key || "" };
  }
  function computeSlotStates(state) {
    const body = withDependentMissing(state.body || {});
    const out = {};
    for (const [slot, sd] of Object.entries(body)) {
      const s = {
        tier: 0,
        wornCount: 0,
        wounds: 0,
        maxWoundSev: 0,
        hasHolding: false,
        missing: sd?.missing === true,
        bare: sd?.bare === true
      };
      if (sd.worn?.length) {
        s.wornCount = sd.worn.length;
        for (const w of sd.worn) {
          const t = tierOf(w.damage);
          if (t > s.tier) s.tier = t;
        }
      }
      if (sd.wounds?.length) {
        s.wounds = sd.wounds.length;
        for (const w of sd.wounds) {
          const sev = woundSeverity(w);
          if (sev > s.maxWoundSev) s.maxWoundSev = sev;
        }
      }
      if (sd.holding) s.hasHolding = true;
      out[slot] = s;
    }
    return out;
  }
  function torsoState(perSlot, view) {
    const slot = view === "back" ? "back" : "chest";
    const p = perSlot[slot];
    if (!p) return { tier: 0, wounds: 0, maxWoundSev: 0, hasHolding: false };
    return {
      tier: p.tier || 0,
      wounds: p.wounds || 0,
      maxWoundSev: p.maxWoundSev || 0,
      hasHolding: !!p.hasHolding
    };
  }
  var COVERABLE_MISSING_SLOTS = /* @__PURE__ */ new Set(["left_eye", "right_eye", "left_ear", "right_ear", "mouth"]);
  function partClasses(slotState) {
    const cls = ["bh-body-fill"];
    if (!slotState) return cls.join(" ");
    if (slotState.missing && !(slotState.wornCount > 0)) {
      cls.push("bh-part-missing");
      return cls.join(" ");
    }
    if (slotState.tier >= 2) cls.push(`bh-part-tier-${slotState.tier}`);
    if (slotState.maxWoundSev > 0) cls.push(`bh-part-wound-${slotState.maxWoundSev}`);
    return cls.join(" ");
  }
  function partTitle(slotKey, slotState, family) {
    const label = labelOf(slotKey, family);
    const bits = [label];
    if (slotState?.tier >= 2) {
      const tierName = ["pristine", "light wear", "damaged", "torn", "ruined"][slotState.tier];
      bits.push(`armor: ${tierName}`);
    }
    if (slotState?.wounds > 0) bits.push(`wounds: ${slotState.wounds}`);
    return bits.join(" \xB7 ");
  }
  var HEAD = "M 70 5 C 80.5 5, 87.5 13, 87.5 25 C 87.5 35.5, 80 45.5, 70 47.5 C 60 45.5, 52.5 35.5, 52.5 25 C 52.5 13, 59.5 5, 70 5 Z";
  var NECK = "M 63.5 44 C 64.5 50, 64 56, 61 61 C 66.5 63.5, 73.5 63.5, 79 61 C 76 56, 75.5 50, 76.5 44 C 72.5 46.5, 67.5 46.5, 63.5 44 Z";
  var TORSO_PATH = "M 40 66 C 39 86, 42 112, 46 130 C 47.5 142, 48.5 150, 48.5 152 L 91.5 152 C 91.5 150, 92.5 142, 94 130 C 98 112, 101 86, 100 66 C 80 61, 60 61, 40 66 Z";
  var SHOULDER_L = "M 53 64 C 43 61, 33 64, 28.5 72 C 26 77, 25.5 83, 27 88 C 32.5 82, 39 78.5, 46.5 77.5 C 49.5 73, 51.5 68.5, 53 64 Z";
  var ARM_L = "M 27 86 C 24.5 102, 23.5 118, 24 132 C 22.5 150, 22 168, 23.5 186 L 31.5 188 C 33.5 170, 34.5 152, 34 134 C 36 118, 37.5 100, 38 88 C 34 84.5, 30.5 84, 27 86 Z";
  var HAND_L = "M 23.5 188 C 19.5 193, 18 200, 19 207 C 20 214, 23.5 219, 27.5 219.5 C 31.5 219, 34.5 214, 35 207 C 35.5 200, 34 193, 31.5 188 C 29 190, 26 190, 23.5 188 Z";
  var PELVIS_BIPED = "M 48.5 152 C 48 162, 46 172, 44 182 C 42.5 192, 44 202, 49 208 C 55 212, 62 213.5, 68 206 L 70 202 L 72 206 C 78 213.5, 85 212, 91 208 C 96 202, 97.5 192, 96 182 C 94 172, 92 162, 91.5 152 Z";
  var PELVIS_SERPENT = "M 48.5 152 C 48 162, 46 172, 44 182 C 42.5 192, 44 200, 47 206 C 62 201, 78 201, 93 207 C 96 200, 97.5 192, 96 182 C 94 172, 92 162, 91.5 152 Z";
  var PELVIS_CENTAUR = "M 48.5 152 C 47 165, 44 180, 40 196 C 50 191, 60 189, 70 189 C 80 189, 90 191, 100 196 C 96 180, 93 165, 91.5 152 Z";
  var LEG_HUM_L = "M 46 198 C 45 235, 48 270, 51.5 298 C 49.5 318, 50 324, 51 332 C 52.5 352, 54 368, 55 380 L 62.5 380 C 63.5 364, 64.5 345, 64.8 326 C 65 318, 64.5 310, 63.8 300 C 66 268, 67.5 232, 68.5 204 C 61 197, 53 196, 46 198 Z";
  var FOOT_HUM_L = "M 54.5 378 C 53 388, 51 394, 46 397 C 41 400, 38.5 404, 41 407 C 45 409.5, 54 409, 60 407 C 63 405, 64 400, 63.5 393 L 63 380 Z";
  var LEG_DIGI_L = "M 45 198 C 43 235, 46 268, 50 295 C 47 315, 48.5 330, 53 345 C 50 360, 49 372, 50.5 382 L 60 382 C 61.5 370, 62 358, 60.5 346 C 64.5 332, 65 315, 63 298 C 65.5 268, 67 234, 68 204 C 60 196.5, 52 196.5, 45 198 Z";
  var FOOT_DIGI_L = "M 49 380 C 45 384, 42.5 390, 43 396 C 43.5 401, 47 404, 51.5 404.5 C 53.5 404.8, 54.5 403.2, 55.5 404.2 C 57.5 405.4, 59.5 404.8, 61 402.5 C 63 398.5, 63 390.5, 61.5 382 Z";
  var TAIL_DIGI_FRONT = "M 95 205 C 113 213, 124 232, 122 256 C 120.5 272, 112 283, 103 283.5 C 97.5 283.5, 95.5 277.5, 99.5 274 C 106 271, 111 264, 110 252 C 109 238, 102 222, 93 213 Z";
  var TAIL_DIGI_BACK = "M 62 205 C 80 213, 91 232, 89 256 C 87.5 272, 79 283, 70 283.5 C 64.5 283.5, 62.5 277.5, 66.5 274 C 73 271, 78 264, 77 252 C 76 238, 69 222, 60 213 Z";
  var TAIL_HUM = "M 96 210 C 116 220, 122 246, 110 268 C 102 276, 98 268, 102 260 C 110 244, 108 230, 100 220 Z";
  var TAIL_SERPENT = `M 45 206
    C 46 232, 48 246, 52 260
    C 57 286, 60 300, 62 315
    C 65 336, 67 350, 68 362
    C 68 380, 67 392, 68 401
    C 68 414, 67 421, 70 428
    C 71 431, 73 431, 74 427
    C 77 415, 81 407, 85 400
    C 91 387, 96 374, 96 360
    C 99 341, 102 329, 102 315
    C 101 290, 100 274, 100 260
    C 99 240, 97 221, 95 206 Z`;
  var BARREL_FRONT = "M 36 202 C 22 214, 16 238, 19 262 C 22 282, 34 294, 52 297 L 88 297 C 106 294, 118 282, 121 262 C 124 238, 118 214, 104 202 C 82 194, 58 194, 36 202 Z";
  var BARREL_BACK = "M 36 202 C 22 214, 15 240, 19 266 C 23 286, 36 297, 54 299 L 86 299 C 104 297, 117 286, 121 266 C 125 240, 118 214, 104 202 C 82 194, 58 194, 36 202 Z";
  function horseLegPath(x) {
    return `M ${x} 290 C ${x - 2} 312, ${x - 1} 330, ${x + 2} 344 C ${x + 1} 350, ${x + 1} 354, ${x + 2} 358 C ${x + 2.5} 374, ${x + 3} 390, ${x + 3.5} 402 L ${x + 13} 402 C ${x + 13.5} 390, ${x + 14} 374, ${x + 14.5} 358 C ${x + 15.5} 354, ${x + 15.5} 350, ${x + 14.5} 344 C ${x + 17} 330, ${x + 17.5} 312, ${x + 16} 292 Z`;
  }
  function hoofPath(cx) {
    return `M ${cx - 7.5} 404 L ${cx + 6.5} 404 C ${cx + 8} 410, ${cx + 8.5} 416, ${cx + 7.5} 419 L ${cx - 8.5} 419 C ${cx - 9.5} 416, ${cx - 9} 410, ${cx - 7.5} 404 Z`;
  }
  var TAIL_HORSE = "M 64 203 C 58 240, 56 290, 62 330 C 65 346, 76 348, 80 336 C 86 296, 84 240, 78 205 Z";
  function mirrorPath(d) {
    return d.replace(/([MLC])([^MLCZz]+)/g, (_, cmd, args) => {
      const nums = args.trim().split(/[\s,]+/).map(Number);
      const out = [];
      for (let i = 0; i < nums.length; i += 2) {
        out.push(`${+(140 - nums[i]).toFixed(2)} ${nums[i + 1]}`);
      }
      return cmd + " " + out.join(", ");
    });
  }
  var ARM_R = mirrorPath(ARM_L);
  var HAND_R = mirrorPath(HAND_L);
  var SHOULDER_R = mirrorPath(SHOULDER_L);
  var LEG_HUM_R = mirrorPath(LEG_HUM_L);
  var FOOT_HUM_R = mirrorPath(FOOT_HUM_L);
  var LEG_DIGI_R = mirrorPath(LEG_DIGI_L);
  var FOOT_DIGI_R = mirrorPath(FOOT_DIGI_L);
  var FACE_FEATURES = {
    left_eye: '<ellipse cx="62" cy="24.5" rx="3.1" ry="2.2"',
    right_eye: '<ellipse cx="78" cy="24.5" rx="3.1" ry="2.2"',
    left_ear: '<ellipse cx="52" cy="27" rx="2.4" ry="4.5"',
    right_ear: '<ellipse cx="88" cy="27" rx="2.4" ry="4.5"',
    mouth: '<ellipse cx="70" cy="38.5" rx="5.2" ry="1.7"'
  };
  var FACE_OVAL = '<ellipse cx="70" cy="39" rx="9.5" ry="8.5"';
  function silhouetteSvg(perSlot, view, holding, family) {
    family = family || "humanoid";
    const part = (slotKey) => partClasses(perSlot[slotKey]);
    const title = (slotKey) => `<title>${escapeHtml(partTitle(slotKey, perSlot[slotKey], family))}</title>`;
    const torsoSlot = view === "back" ? "back" : "chest";
    const torsoClass = partClasses(torsoState(perSlot, view));
    const torsoTip = `<title>${escapeHtml(partTitle(torsoSlot, torsoState(perSlot, view), family))}</title>`;
    const holdMarkers = holding.map(({ slot, item, damage }) => {
      const pos = HAND_POSITIONS[slot];
      if (!pos) return "";
      const handSide = slot === "left_hand" ? "left" : "right";
      const tip = damage ? `Held in ${handSide} hand (character's POV) \u2014 ${item} (${damage})` : `Held in ${handSide} hand (character's POV) \u2014 ${item}`;
      return `<g class="bh-hold-marker" transform="translate(${pos.x},${pos.y})">
            <title>${escapeHtml(tip)}</title>
            <text y="2" text-anchor="middle" class="bh-hold-icon">\u2726</text>
        </g>`;
    }).join("");
    const spineHint = view === "back" ? `<line x1="70" y1="66" x2="70" y2="150" class="bh-spine-line"/>
           <line x1="70" y1="156" x2="70" y2="198" class="bh-spine-line"/>` : "";
    const lowerBody = lowerBodyParts(perSlot, family, part, title, view);
    const faceFeature = (s, shape) => {
      const hidden = view === "back" && (s.endsWith("eye") || s === "mouth");
      if (hidden) return "";
      if (perSlot[s]) {
        return `<g class="bh-part" data-slot="${s}">${title(s)}${shape} class="${part(s)}"/></g>`;
      }
      return `<g class="bh-part bh-face-idle-part" data-slot="${s}"><title>${escapeHtml(labelOf(s, family))} \u2014 nothing tracked</title>${shape} class="bh-body-fill bh-face-idle"/></g>`;
    };
    const featureOverlay = Object.keys(FACE_FEATURES).map((s) => faceFeature(s, FACE_FEATURES[s])).join("");
    const faceRegion = view === "back" ? "" : (() => {
      if (perSlot.face) {
        return `<g class="bh-part" data-slot="face">${title("face")}${FACE_OVAL} class="${part("face")}"/></g>`;
      }
      return `<g class="bh-part bh-face-idle-part" data-slot="face"><title>face \u2014 nothing tracked</title>${FACE_OVAL} class="bh-body-fill bh-face-idle"/></g>`;
    })();
    const mirror = view === "front" ? 'transform="scale(-1, 1) translate(-140, 0)"' : "";
    return `<svg class="bh-silhouette" viewBox="0 0 140 440" data-view="${view}" data-family="${family}" aria-hidden="true">
        <defs>
            <pattern id="bh-missing-pattern" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke="#888" stroke-width="1.2" stroke-opacity="0.6"/>
            </pattern>
        </defs>
        <g class="bh-body-group" ${mirror}>
            <g class="bh-part" data-slot="head">${title("head")}<path d="${HEAD}" class="${part("head")}"/></g>
            ${faceRegion}
            ${featureOverlay}
            <g class="bh-part" data-slot="neck">${title("neck")}<path d="${NECK}" class="${part("neck")}"/></g>
            <g class="bh-part" data-slot="${torsoSlot}">${torsoTip}<path d="${TORSO_PATH}" class="${torsoClass}"/></g>
            ${pelvisHtml(perSlot, family, part, title)}
            <g class="bh-part" data-slot="left_arm">${title("left_arm")}<path d="${ARM_L}" class="${part("left_arm")}"/></g>
            <g class="bh-part" data-slot="right_arm">${title("right_arm")}<path d="${ARM_R}" class="${part("right_arm")}"/></g>
            <g class="bh-part" data-slot="left_hand">${title("left_hand")}<path d="${HAND_L}" class="${part("left_hand")}"/></g>
            <g class="bh-part" data-slot="right_hand">${title("right_hand")}<path d="${HAND_R}" class="${part("right_hand")}"/></g>
            <g class="bh-part bh-shoulder" data-slot="left_shoulder">${title("left_shoulder")}<path d="${SHOULDER_L}" class="${part("left_shoulder")}"/></g>
            <g class="bh-part bh-shoulder" data-slot="right_shoulder">${title("right_shoulder")}<path d="${SHOULDER_R}" class="${part("right_shoulder")}"/></g>
            ${lowerBody}

            ${spineHint}
            ${holdMarkers}
        </g>
    </svg>`;
  }
  function pelvisHtml(perSlot, family, part, title) {
    let pelvis;
    if (family === "centauroid") pelvis = PELVIS_CENTAUR;
    else if (family === "serpentine") pelvis = PELVIS_SERPENT;
    else pelvis = PELVIS_BIPED;
    return `<g class="bh-part" data-slot="waist">${title("waist")}<path d="${pelvis}" class="${part("waist")}"/></g>`;
  }
  function lowerBodyParts(perSlot, family, part, title, view) {
    view = view === "back" ? "back" : "front";
    const pathPart = (slot, d, extra) => `<g class="bh-part" data-slot="${slot}">${title(slot)}<path d="${d}" class="${part(slot)}${extra ? " " + extra : ""}"/></g>`;
    if (family === "serpentine") {
      return pathPart("tail", TAIL_SERPENT, "bh-tail");
    }
    if (family === "centauroid") {
      const fore = view !== "back";
      const legL = fore ? "left_leg" : "hind_left_leg";
      const legR = fore ? "right_leg" : "hind_right_leg";
      const footL = fore ? "left_foot" : "hind_left_foot";
      const footR = fore ? "right_foot" : "hind_right_foot";
      const barrel = view === "back" ? BARREL_BACK : BARREL_FRONT;
      const barrelHtml = pathPart("waist", barrel);
      const tail = view === "back" ? pathPart("tail", TAIL_HORSE, "bh-tail") : "";
      return [
        barrelHtml,
        tail,
        pathPart(legL, horseLegPath(41)),
        pathPart(legR, horseLegPath(83)),
        pathPart(footL, hoofPath(49.5)),
        pathPart(footR, hoofPath(91.5))
      ].join("");
    }
    if (family === "digitigrade") {
      const tailD = view === "back" ? TAIL_DIGI_BACK : TAIL_DIGI_FRONT;
      return [
        pathPart("left_leg", LEG_DIGI_L),
        pathPart("right_leg", LEG_DIGI_R),
        pathPart("left_foot", FOOT_DIGI_L),
        pathPart("right_foot", FOOT_DIGI_R),
        pathPart("tail", tailD, "bh-tail")
      ].join("");
    }
    const familyAlwaysHasTail = (FAMILY_ALWAYS_SLOTS[family] || /* @__PURE__ */ new Set()).has("tail");
    const optionalTail = perSlot.tail || familyAlwaysHasTail ? pathPart("tail", TAIL_HUM, "bh-tail") : "";
    return [
      pathPart("left_leg", LEG_HUM_L),
      pathPart("right_leg", LEG_HUM_R),
      pathPart("left_foot", FOOT_HUM_L),
      pathPart("right_foot", FOOT_HUM_R),
      optionalTail
    ].join("");
  }
  var HAND_POSITIONS = {
    left_hand: { x: 27, y: 205 },
    right_hand: { x: 113, y: 205 }
  };
  function collectSlotRows(state) {
    const body = state.body || {};
    const wornGroups = /* @__PURE__ */ new Map();
    for (const [slot, sd] of Object.entries(body)) {
      if (!sd.worn?.length) continue;
      for (const w of sd.worn) {
        const item = w.item || "?";
        const dmg = w.damage || "";
        const color = w.color || "";
        const key = `${canonicalGarment(item)}|${dmg.toLowerCase()}|${normalizeColor(color)}`;
        if (!wornGroups.has(key)) {
          wornGroups.set(key, { kind: "worn", item, damage: dmg, color, slots: [] });
        }
        wornGroups.get(key).slots.push(slot);
      }
    }
    const holdRows = [];
    for (const [slot, sd] of Object.entries(body)) {
      const h = normalizeHolding(sd.holding);
      if (h) {
        holdRows.push({
          kind: "holding",
          item: h.item,
          damage: h.damage,
          color: h.color,
          slots: [slot]
        });
      }
    }
    const woundRows = [];
    for (const [slot, sd] of Object.entries(body)) {
      if (!sd.wounds?.length) continue;
      for (const w of sd.wounds) {
        const bleeding = typeof w === "object" && w !== null && w.bleeding === true;
        woundRows.push({
          kind: "wound",
          item: woundText(w),
          severity: woundSeverity(w),
          bleeding,
          slots: [slot]
        });
      }
    }
    return [...wornGroups.values(), ...holdRows, ...woundRows];
  }
  function renderCharacterDoll(name, state, view, opts = {}) {
    state = state || {};
    view = view === "back" ? "back" : "front";
    const placeholder = opts.placeholder === true;
    const body = state.body || {};
    const family = familyOf(state.species);
    const offBodySlots = OFF_BODY_SLOTS[family] || OFF_BODY_SLOTS.humanoid;
    const perSlot = computeSlotStates(state);
    const holding = [];
    for (const [slot, sd] of Object.entries(body)) {
      const h = normalizeHolding(sd.holding);
      if (h) holding.push({ slot, item: h.item, damage: h.damage });
    }
    const realRows = collectSlotRows(state);
    const rowsBySlot = /* @__PURE__ */ new Map();
    for (const row of realRows) {
      for (const s of row.slots) {
        if (!rowsBySlot.has(s)) rowsBySlot.set(s, []);
        rowsBySlot.get(s).push(row);
      }
    }
    const alwaysSlots = FAMILY_ALWAYS_SLOTS[family] || /* @__PURE__ */ new Set();
    const allSlotKeys = Object.keys(SLOT_Y).filter((s) => {
      if (offBodySlots.has(s)) return false;
      if (PROPOSED_SLOTS.has(s) && !rowsBySlot.has(s) && !perSlot[s] && !alwaysSlots.has(s)) return false;
      return true;
    });
    const slotCards = allSlotKeys.map((slot) => ({ slot, items: rowsBySlot.get(slot) || [] })).sort((a, b) => (SLOT_Y[a.slot] ?? 50) - (SLOT_Y[b.slot] ?? 50));
    const paired = currentLayout === "paired";
    const cols = { left: [], right: [] };
    let figureSpan = "";
    if (paired) {
      const bySlot = new Map(slotCards.map((sc) => [sc.slot, sc]));
      for (const sc of slotCards) {
        const mate = PAIR_OF[sc.slot];
        if (mate && !bySlot.has(mate) && !offBodySlots.has(mate)) {
          bySlot.set(mate, { slot: mate, items: [], ghost: true });
        }
      }
      const place = (entry, col, r) => {
        entry.style = `grid-column:${col};grid-row:${r}`;
        (col === 1 ? cols.left : cols.right).push(entry);
      };
      let row = 0;
      let pendingCenterCol = 0;
      const seen = /* @__PURE__ */ new Set();
      for (const slot of LAYOUT_SLOT_ORDER) {
        const entry = bySlot.get(slot);
        if (!entry || seen.has(slot)) continue;
        const mate = PAIR_OF[slot];
        if (mate && bySlot.has(mate)) {
          row += 1;
          const isLeft = slot.startsWith("left") || slot.startsWith("hind_left");
          place(entry, isLeft ? 1 : 3, row);
          place(bySlot.get(mate), isLeft ? 3 : 1, row);
          seen.add(slot);
          seen.add(mate);
          pendingCenterCol = 0;
        } else {
          if (pendingCenterCol === 3) {
            place(entry, 3, row);
            pendingCenterCol = 0;
          } else {
            row += 1;
            place(entry, 1, row);
            pendingCenterCol = 3;
          }
          seen.add(slot);
        }
      }
      figureSpan = `grid-column:2;grid-row:1 / ${row + 2}`;
    } else {
      for (const sc of slotCards) {
        const side = SLOT_SIDE[sc.slot] || "center";
        if (side === "left") cols.left.push(sc);
        else if (side === "right") cols.right.push(sc);
        else {
          (cols.left.length <= cols.right.length ? cols.left : cols.right).push(sc);
        }
      }
    }
    const PALETTE = /* @__PURE__ */ new Set([
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "purple",
      "pink",
      "brown",
      "black",
      "white",
      "gray",
      "beige",
      "gold",
      "silver",
      "navy",
      "tan"
    ]);
    const colorClass = (color) => {
      if (!color) return "";
      const c = String(color).trim().toLowerCase();
      if (!c) return "";
      return PALETTE.has(c) ? `bh-c-${c}` : "bh-c-other";
    };
    const colorSwatch = (row) => {
      if (!row.color) return "";
      const cls = colorClass(row.color);
      return `<span class="bh-chip-swatch ${cls}" title="color: ${escapeHtml(row.color)}"></span>`;
    };
    const colorTitle = (row) => row.color ? ` \xB7 color: ${row.color}` : "";
    const multiSlot = (row) => {
      if (!row.slots || row.slots.length <= 1) return "";
      const list = row.slots.map((s) => labelOf(s, family)).join(", ");
      return `<span class="bh-chip-multi" title="also on: ${escapeHtml(list)}">\u2316${row.slots.length}</span>`;
    };
    const verboseRow = (parts) => {
      const labels = parts.filter(Boolean).join("");
      if (!labels) return "";
      return `<span class="bh-chip-verbose-row">${labels}</span>`;
    };
    const dmgLabel = (damage) => {
      if (!damage) return "";
      const label = damageMeta(damage).label;
      return `<span class="bh-chip-verbose bh-chip-verbose-dmg">${escapeHtml(label)}</span>`;
    };
    const colorLabel = (row) => {
      if (!row?.color) return "";
      return `<span class="bh-chip-verbose bh-chip-verbose-color">${escapeHtml(row.color)}</span>`;
    };
    const sevLabel = (sev) => {
      const label = ["", "minor", "serious", "critical"][sev || 2];
      return `<span class="bh-chip-verbose bh-chip-verbose-sev">${label}</span>`;
    };
    const bleedLabel = (bleed) => bleed ? `<span class="bh-chip-verbose bh-chip-verbose-bleed">bleeding</span>` : "";
    const renderChip = (row) => {
      if (row.kind === "wound") {
        const sev = row.severity || 2;
        const sevText = ["", "minor", "serious", "critical"][sev];
        const bleed = row.bleeding === true;
        const bleedTitle = bleed ? " \xB7 bleeding" : "";
        return `<span class="bh-chip bh-chip-wound bh-chip-wound-${sev} ${bleed ? "bh-chip-bleeding" : ""}" title="wound \xB7 ${sevText}${bleedTitle}">
                <span class="bh-chip-head"><span class="bh-chip-glyph">\u271A</span><span class="bh-chip-text">${escapeHtml(row.item)}</span>${multiSlot(row)}</span>${verboseRow([sevLabel(sev), bleedLabel(bleed)])}
            </span>`;
      }
      if (row.kind === "holding") {
        const meta2 = damageMeta(row.damage);
        const dmgTitle2 = row.damage ? ` \xB7 ${meta2.label}` : "";
        return `<span class="bh-chip bh-chip-hold ${meta2.class}" title="held${dmgTitle2}${colorTitle(row)}">
                <span class="bh-chip-head"><span class="bh-chip-dot"></span><span class="bh-chip-glyph">\u2726</span>${colorSwatch(row)}<span class="bh-chip-text">${escapeHtml(row.item)}</span>${multiSlot(row)}</span>${verboseRow([dmgLabel(row.damage), colorLabel(row)])}
            </span>`;
      }
      const meta = damageMeta(row.damage);
      const dmgTitle = row.damage ? ` \xB7 ${meta.label}` : "";
      return `<span class="bh-chip ${meta.class}" title="worn${dmgTitle}${colorTitle(row)}">
            <span class="bh-chip-head"><span class="bh-chip-dot"></span>${colorSwatch(row)}<span class="bh-chip-text">${escapeHtml(row.item)}</span>${multiSlot(row)}</span>${verboseRow([dmgLabel(row.damage), colorLabel(row)])}
        </span>`;
    };
    const renderSlotCard = ({ slot, items, style }) => {
      const slotLabel = labelOf(slot, family);
      const slotState = perSlot[slot];
      const styleAttr = style ? ` style="${style}"` : "";
      const coveredLoss = COVERABLE_MISSING_SLOTS.has(slot) && slotState?.wornCount > 0;
      if (slotState?.missing && !coveredLoss) {
        return `<div class="bh-slot-card bh-slot-missing" data-slot="${slot}" data-slots="${slot}"${styleAttr} title="${escapeHtml(slotLabel)} \u2014 missing / lost">
                <span class="bh-slot-name">${escapeHtml(slotLabel)}</span>
                <span class="bh-slot-missing-tag">missing</span>
            </div>`;
      }
      if (slotState?.bare && items.length === 0) {
        return `<div class="bh-slot-card bh-slot-bare" data-slot="${slot}" data-slots="${slot}"${styleAttr} title="${escapeHtml(slotLabel)} \u2014 bare (narration confirmed uncovered)">
                <span class="bh-slot-name">${escapeHtml(slotLabel)}</span>
                <span class="bh-slot-bare-tag">bare</span>
            </div>`;
      }
      if (items.length === 0) {
        return `<div class="bh-slot-card bh-slot-empty" data-slot="${slot}" data-slots="${slot}"${styleAttr}>
                <span class="bh-slot-name">${escapeHtml(slotLabel)}</span>
            </div>`;
      }
      const wornItems = items.filter((i) => i.kind === "worn");
      const heldItems = items.filter((i) => i.kind === "holding");
      const ordered = [
        ...wornItems,
        ...heldItems,
        ...items.filter((i) => i.kind === "wound")
      ];
      const woundChips = ordered.filter((i) => i.kind === "wound");
      const woundCount = woundChips.length;
      const cardClasses = [
        "bh-slot-card",
        wornItems.length > 1 ? "bh-slot-worn-stacked" : ""
        // drives the per-chip 1/N indices
      ].filter(Boolean).join(" ");
      const wornStacked = wornItems.length > 1;
      let wornIdx = 0;
      const itemChips = ordered.filter((row) => row.kind !== "wound").map((row) => {
        if (row.kind === "worn" && wornStacked) {
          wornIdx += 1;
          const role = wornIdx === 1 ? "outermost" : wornIdx === wornItems.length ? "innermost" : `layer ${wornIdx}`;
          const meta = damageMeta(row.damage);
          return `<div class="bh-chip-layered ${meta.class}" data-layer="${wornIdx}" title="${role}">
                        <span class="bh-chip-layer-idx">${wornIdx}</span>
                        ${renderChip(row)}
                    </div>`;
        }
        return renderChip(row);
      }).join("");
      const woundChipsHtml = woundCount ? `<div class="bh-slot-wounds">${woundChips.map(renderChip).join("")}</div>` : "";
      return `<div class="${cardClasses}" data-slot="${slot}" data-slots="${slot}"${styleAttr}>
            <div class="bh-slot-card-head">
                <span class="bh-slot-name">${escapeHtml(slotLabel)}</span>
            </div>
            <div class="bh-slot-chips">${itemChips}${woundChipsHtml}</div>
        </div>`;
    };
    const ghostCard = (slot, style) => {
      const styleAttr = style ? ` style="${style}"` : "";
      return `<div class="bh-slot-card bh-slot-empty bh-slot-ghosted" data-slot="${slot}" data-slots="${slot}"${styleAttr}>
            <span class="bh-slot-name">${escapeHtml(labelOf(slot, family))}</span>
        </div>`;
    };
    const renderColCard = (entry) => entry.ghost ? ghostCard(entry.slot, entry.style) : renderSlotCard(entry);
    const leftCol = cols.left.map(renderColCard).join("");
    const rightCol = cols.right.map(renderColCard).join("");
    const isEmpty = realRows.length === 0 && holding.length === 0;
    const sp = state.species ? String(state.species).trim() : "";
    const speciesTag = sp ? `<span class="bh-char-species">${escapeHtml(sp)}</span>` : "";
    const digestHtml = isEmpty ? placeholder ? `<div class="bh-digest"><div class="bh-digest-toolbar"><div class="bh-layout-switch-row">${layoutSwitchHtml()}</div></div></div>` : "" : (() => {
      const slotLabelOf = (s) => labelOf(s, family);
      const wounds = realRows.filter((r) => r.kind === "wound").map((r) => ({ row: r, slot: r.slots[0] })).sort((a, b) => {
        const sevDiff = (b.row.severity || 2) - (a.row.severity || 2);
        if (sevDiff !== 0) return sevDiff;
        const bleedDiff = (b.row.bleeding ? 1 : 0) - (a.row.bleeding ? 1 : 0);
        if (bleedDiff !== 0) return bleedDiff;
        return (SLOT_Y[a.slot] ?? 50) - (SLOT_Y[b.slot] ?? 50);
      });
      const held = holding.slice().sort((a, b) => (SLOT_Y[a.slot] ?? 50) - (SLOT_Y[b.slot] ?? 50));
      const wornBySlot = /* @__PURE__ */ new Map();
      for (const row of realRows.filter((r) => r.kind === "worn")) {
        const topSlot = [...row.slots].sort((a, b) => (SLOT_Y[a] ?? 50) - (SLOT_Y[b] ?? 50))[0];
        if (!wornBySlot.has(topSlot)) wornBySlot.set(topSlot, []);
        wornBySlot.get(topSlot).push(row);
      }
      const REGIONS = [
        {
          key: "head",
          label: "Head & Face",
          slots: ["head", "face", "left_eye", "right_eye", "left_ear", "right_ear", "mouth", "neck"]
        },
        {
          key: "torso",
          label: "Torso",
          slots: ["left_shoulder", "right_shoulder", "chest", "back", "waist"]
        },
        {
          key: "arms",
          label: "Arms & Hands",
          slots: ["left_arm", "right_arm", "left_hand", "right_hand"]
        },
        {
          key: "legs",
          label: "Legs & Feet",
          slots: ["left_leg", "right_leg", "left_foot", "right_foot"]
        }
      ];
      const regionOf = (slot) => {
        for (const r of REGIONS) if (r.slots.includes(slot)) return r.key;
        return "other";
      };
      const wornByRegion = new Map(REGIONS.map((r) => [r.key, []]));
      wornByRegion.set("other", []);
      for (const [slot, rows] of [...wornBySlot.entries()].sort((a, b) => (SLOT_Y[a[0]] ?? 50) - (SLOT_Y[b[0]] ?? 50))) {
        const region = regionOf(slot);
        rows.forEach((row, i) => {
          wornByRegion.get(region).push({
            row,
            slot,
            layerIdx: rows.length > 1 ? i + 1 : 0,
            layerTotal: rows.length
          });
        });
      }
      const wornTotalCount = [...wornByRegion.values()].reduce((n, group) => n + group.length, 0);
      const missingSlots = [], bareSlots = [];
      for (const [s, st] of Object.entries(perSlot)) {
        const coveredLoss = COVERABLE_MISSING_SLOTS.has(s) && st?.wornCount > 0;
        if (st?.missing && !coveredLoss) missingSlots.push(s);
        else if (st?.bare) bareSlots.push(s);
      }
      const slotTag = (slot, layerIdx, layerTotal) => {
        const layer = layerTotal > 1 ? `<span class="bh-digest-layer">${layerIdx}/${layerTotal}</span>` : "";
        return `<span class="bh-digest-slot">${escapeHtml(slotLabelOf(slot))}</span>${layer}`;
      };
      const digestRow = ({ row, slot, layerIdx, layerTotal }) => `
            <li class="bh-digest-row">
                ${renderChip(row)}
                ${slotTag(slot, layerIdx || 0, layerTotal || 0)}
            </li>`;
      const section = (key, label, count, items) => {
        if (!items.length) return "";
        return `<section class="bh-digest-section bh-digest-section-${key}" data-section="${key}">
                <h4 class="bh-digest-heading">${escapeHtml(label)}<span class="bh-digest-count">${count}</span></h4>
                <ul class="bh-digest-list">${items.join("")}</ul>
            </section>`;
      };
      const woundItems = wounds.map(({ row, slot }) => digestRow({ row, slot, layerIdx: 0, layerTotal: 0 }));
      const heldItems = held.map(({ slot, item, damage }) => {
        const row = realRows.find((r) => r.kind === "holding" && r.slots[0] === slot) || { kind: "holding", item, damage, slots: [slot] };
        return digestRow({ row, slot, layerIdx: 0, layerTotal: 0 });
      });
      const wornGroupedHtml = REGIONS.map((r) => {
        const rows = wornByRegion.get(r.key) || [];
        if (!rows.length) return "";
        return `<li class="bh-digest-group">
                <h5 class="bh-digest-subhead">${escapeHtml(r.label)}</h5>
                <ul class="bh-digest-group-list">${rows.map(digestRow).join("")}</ul>
            </li>`;
      }).join("") + (wornByRegion.get("other").length ? `<li class="bh-digest-group">
                <h5 class="bh-digest-subhead">Other</h5>
                <ul class="bh-digest-group-list">${wornByRegion.get("other").map(digestRow).join("")}</ul>
            </li>` : "");
      const flagItems = [];
      for (const s of missingSlots) flagItems.push(
        `<li class="bh-digest-row bh-digest-row-flag">
                <span class="bh-digest-flag bh-digest-flag-missing">missing</span>
                ${slotTag(s, 0, 0)}
            </li>`
      );
      for (const s of bareSlots) flagItems.push(
        `<li class="bh-digest-row bh-digest-row-flag">
                <span class="bh-digest-flag bh-digest-flag-bare">bare</span>
                ${slotTag(s, 0, 0)}
            </li>`
      );
      const wornSectionHtml = wornTotalCount ? `<section class="bh-digest-section bh-digest-section-worn" data-section="worn">
                <h4 class="bh-digest-heading">Worn<span class="bh-digest-count">${wornTotalCount}</span></h4>
                <ul class="bh-digest-list bh-digest-list-grouped">${wornGroupedHtml}</ul>
            </section>` : "";
      const toolbar = `<div class="bh-digest-toolbar">
            <button class="bh-digest-edit"><i class="fa-solid fa-pen"></i> Edit slots</button>
            <div class="bh-layout-switch-row">${layoutSwitchHtml()}</div>
        </div>`;
      return `<div class="bh-digest">
            ${toolbar}
            ${section("wounds", "Wounds", wounds.length, woundItems)}
            ${section("held", "Held", held.length, heldItems)}
            ${wornSectionHtml}
            ${section("state", "State", flagItems.length, flagItems)}
        </div>`;
    })();
    const gridClass = paired ? "bh-doll-grid bh-paired" : "bh-doll-grid";
    const figureStyle = figureSpan ? ` style="${figureSpan}"` : "";
    return `<section class="bh-char-doll" data-char="${escapeHtml(name)}">
        <header class="bh-char-head">
            <span class="bh-char-name">${escapeHtml(name)}</span>
            ${speciesTag}
        </header>
        ${isEmpty && !placeholder ? `<div class="bh-doll-empty">
                ${silhouetteSvg(perSlot, view, [], family)}
                <p class="bh-empty-text">No tracked state.</p>
            </div>` : `<div class="${gridClass}">
                <div class="bh-col bh-col-left">${leftCol}</div>
                <div class="bh-figure"${figureStyle}>
                    ${silhouetteSvg(perSlot, view, holding, family)}
                    <div class="bh-figure-controls">
                        <button class="bh-view-toggle ${view === "back" ? "bh-view-back" : ""}" data-char="${escapeHtml(name)}" data-view="${view}" title="Switch to ${view === "back" ? "front" : "back"} view (for back wounds)">
                            <span class="bh-view-front-label ${view === "front" ? "bh-view-active" : ""}">Front</span>
                            <span class="bh-view-sep">\u21C4</span>
                            <span class="bh-view-back-label ${view === "back" ? "bh-view-active" : ""}">Back</span>
                        </button>
                    </div>
                    <div class="bh-pov-hint" title="${view === "back" ? "Back view \u2014 figure faces away. Your left = character's left." : "Front view \u2014 figure faces you. Your left = character's right."}">
                        ${view === "back" ? '<span>L</span><span class="bh-pov-axis">\xB7</span><span>R</span>' : '<span>R</span><span class="bh-pov-axis">\xB7</span><span>L</span>'}
                    </div>
                    ${layoutSwitchHtml()}
                </div>
                <div class="bh-col bh-col-right">${rightCol}</div>
            </div>${digestHtml}`}
    </section>`;
  }
  function renderDollPanel(state, activeName, updatedNames, view) {
    const updated = updatedNames || /* @__PURE__ */ new Set();
    view = view === "back" ? "back" : "front";
    const names = Object.keys(state || {});
    if (!names.length) {
      const doll2 = renderCharacterDoll("\u2014", {}, view, { placeholder: true });
      return {
        html: `${doll2}<p class="bh-placeholder-note">Showing a <b>default human</b> \u2014 nothing's tracked yet. It fills in as the scene plays out.</p>`,
        activeName: null
      };
    }
    const presentNames = names.filter((n) => state[n]?.present !== false);
    const active = activeName && names.includes(activeName) ? activeName : presentNames[0] || names[0];
    const tabs = names.length > 1 ? `<nav class="bh-tabs" aria-label="${escapeHtml(names.length)} characters tracked">
            ${names.map((n) => {
      const absent = state[n]?.present === false;
      const classes = [
        "bh-tab",
        n === active ? "bh-tab-active" : "",
        updated.has(n) && n !== active ? "bh-tab-updated" : "",
        absent ? "bh-tab-absent" : ""
      ].filter(Boolean).join(" ");
      const label = updated.has(n) && n !== active ? `${escapeHtml(n)} <span class="bh-tab-pulse" aria-label="updated">\u25CF</span>` : escapeHtml(n);
      return `<button class="${classes}" data-char="${escapeHtml(n)}" aria-label="${escapeHtml(n)}${absent ? " (not in scene)" : ""}">${label}</button>`;
    }).join("")}
        </nav>` : "";
    const doll = renderCharacterDoll(active, state[active] || {}, view);
    return {
      html: `${tabs}<div class="bh-doll-host">${doll}</div>`,
      activeName: active
    };
  }

  // st-shim.js
  if (typeof window !== "undefined") {
    window.$ = window.jQuery = jquery_module_default;
  }
  var GENERAL_PROMPT = `You track characters' physical state in roleplay. Read the new message and output JSON only \u2014 no prose, no commentary, no markdown.
OUTPUT: always emit {"changed": <bool>}. Add a "delta" object ONLY when changed=true. If a 'Current state' is given, set changed=true only when a character's physical state actually changes in this message, and put ONLY the changed characters and fields under delta; if nothing changes output exactly {"changed": false} (when unsure, false). If NO current state is given (snapshot), set changed=true and put each character's FULL current state in delta. If a 'Persona: <name>' line is given, that character maps to the key "self"; otherwise first-person I/me = "self".
SCHEMA (per character): {"<char>": {"body": {"<slot>": {"worn": [{"item": str, "material"?: str, "color"?: str, "damage": "pristine|damaged|cracked|broken"}], "holding": {"item": str, "damage": str}, "wounds": [{"text": str, "severity": "minor|serious|critical", "bleeding": bool}], "bare": bool, "missing": bool}}, "species"?: str}}.
SLOTS: head, face, neck, chest, back, waist, left_shoulder, right_shoulder, left_arm, right_arm, left_hand, right_hand, left_leg, right_leg, left_foot, right_foot, left_eye, right_eye, left_ear, right_ear, mouth; plus tail and hind_left_leg/hind_right_leg/hind_left_foot/hind_right_foot for non-human species. holding is only on hands. 'damage' is required on every worn AND held item (default pristine). Include 'species' ONLY when non-human. item/material/color/damage/species/text/severity are plain strings; bare/missing/bleeding are plain bools. Emit color/material ONLY when the prose states them, each in its OWN field, never inside item ({"item":"cloak","color":"red"}, not "red cloak"). A garment covering several slots is emitted on EACH slot it covers.
RULES:
- NEVER-STATE: a noun in the prose is NOT enough. Emit only what a character actually WEARS, HOLDS, or is WOUNDED BY. Do NOT emit scenery/background items, another character's items, briefly-handled tools (a whetstone, a cup set back down), or the character's own anatomy/appearance (scars, ponytails, calloused hands, bare skin).
- ATTRIBUTION: an action affects the ACTOR's slots, not a partner's. Read the subject of each verb ('Tim kicks his pants off' clears Tim's legs, not Kheza's).
- DELTA: emit ONLY what changed from prev; never re-emit an unchanged value. When an item moves slots (sword sheathed -> waist), record BOTH the source clear (right_hand.holding={}) and the destination add. Use "worn": [] to clear a slot; holding:{} to empty a hand.
- ACTIONS: side-effects are not state ('steps into the shower' does not undress). Averted events did NOT happen ('the blow missed' -> no wound). Direct verbs ARE state (removes/puts on/sheathes/drops).
- WOUNDS: emit EVERY directly-described injury (under-reporting is the common error). Severity from the prose's words, not the injury type: default MINOR (cut/graze/scratch/bruise); SERIOUS on escalators (deep, gash, gushing, soaking, burn); CRITICAL on catastrophe (stab, shatter, broken bone, unconscious, amputation). Blood alone is NOT serious. bleeding=true only for fresh open/penetrating injuries. Armor/clothing damage is worn[].damage, NOT a wound.
- SPECIES: assign ONLY from an explicit statement ('the catfolk woman') or visible distinctive anatomy (fur, scales, a tail). Never infer from nearby creatures.
- BARE: true ONLY when a slot is explicitly uncovered (naked/bare/exposed); absent != bare. MISSING: true ONLY for explicit acquired loss (amputation, lost eye). bare and worn are mutually exclusive on a slot; missing excludes worn/wounds/holding/bare.
Roleplay may include mature content; extract normally without refusing.`;
  var HOST_CSS = `
.beholder-panel{
  --SmartThemeBlurTintColor: var(--card, rgba(20,20,24,.92));
  --SmartThemeBodyColor: var(--foreground, #e0e0e0);
  --SmartThemeBorderColor: var(--border, rgba(255,255,255,.15));
  --SmartThemeQuoteColor: var(--primary, #ffb3d9);
  --bh-accent-pref: var(--primary, #ffb3d9);
  --bh-font-display: var(--font-sans, inherit);
  display:flex !important; position:fixed !important; top:var(--bh-dock-top,0px) !important; right:0 !important; left:auto !important; bottom:auto !important;
  height:calc(100vh - var(--bh-dock-top,0px)) !important; max-height:calc(100vh - var(--bh-dock-top,0px)) !important; width:min(500px,94vw) !important; min-width:0 !important;
  border-radius:0 !important; transform:translateX(calc(-1 * var(--bh-dock-right,0px))); transition:transform .22s ease; }
/* Collapsed: slide fully off the viewport's right edge \u2014 independent of the open-state
   offset, so it never parks on top of an ME right panel. */
.beholder-panel.bh-collapsed{ transform:translateX(103%) !important; }
/* floating-only chrome doesn't apply to a docked side-tab */
.beholder-panel .beholder-close, .beholder-panel .beholder-resize-handle{ display:none !important; }
@media (max-width:767px){
  .beholder-panel{ top:auto !important; bottom:0 !important; right:0 !important; left:0 !important;
    width:100% !important; height:auto !important; max-height:72vh !important; border-radius:14px 14px 0 0 !important; transform:translateY(0); }
  .beholder-panel.bh-collapsed{ transform:translateY(103%); }
}
/* Native reflow: ME shifts the chat + composer to avoid a right-side panel via
   --tracker-chat-avoid-right (AppShell sets it inline; !important beats React's inline
   value). So opening the Beholder dock makes the RP view make room, not get covered. */
body.bh-dock-open .mari-app-background-paint{ --tracker-chat-avoid-right: min(500px,94vw) !important; --tracker-panel-hud-clear-right: min(500px,94vw) !important; }
.bh-hud-toggle{ display:inline-flex;align-items:center;justify-content:center;cursor:pointer;
  background:rgba(201,165,90,.22) !important; border:1px solid rgba(201,165,90,.55) !important;
  box-shadow:0 0 0 1px rgba(201,165,90,.12) inset !important; }
.bh-hud-toggle:hover{ background:rgba(201,165,90,.40) !important; border-color:rgba(233,205,119,.85) !important; }
.bh-hud-toggle:hover img{ filter:brightness(1.12) }
/* FontAwesome glyphs are provided by the embedded subset font \u2014 see fa-embed.css (injected below). */

#bh-extractor-modal .bh-ex-card{background:var(--card,#141414);color:var(--foreground,#eee);border:1px solid var(--border,#d4adfc33);border-radius:12px;padding:14px;width:min(460px,92vw);max-height:86vh;overflow:auto;font-family:var(--font-sans,inherit)}
#bh-extractor-modal .bh-ex-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
#bh-extractor-modal .bh-ex-opt{border:1px solid var(--border,#d4adfc33);border-radius:8px;padding:10px;margin-bottom:10px}
#bh-extractor-modal .bh-ex-disabled{opacity:.55}
#bh-extractor-modal .bh-ex-title{font-weight:700;margin-bottom:2px}
#bh-extractor-modal .bh-ex-sub{font-size:12px;opacity:.8;margin-bottom:8px}
#bh-extractor-modal .bh-ex-tag{font-size:11px;border:1px solid var(--border,#d4adfc33);border-radius:6px;padding:1px 6px;margin-left:6px;opacity:.85}
#bh-extractor-modal .bh-ex-warn{color:var(--primary,#ffb3d9);border-color:var(--primary,#ffb3d9)}
#bh-extractor-modal .bh-ex-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
#bh-extractor-modal .bh-ex-url,#bh-extractor-modal .bh-ex-conn{flex:1;min-width:0;background:var(--input,#1a1a2e);color:inherit;border:1px solid var(--border,#d4adfc33);border-radius:6px;padding:5px 7px;font-size:12px;margin-bottom:6px}
#bh-extractor-modal button{cursor:pointer;background:var(--primary,#ffb3d9);color:var(--primary-foreground,#0a0a0a);border:0;border-radius:6px;padding:5px 12px;font-size:12px;font-weight:600}
#bh-extractor-modal .bh-ex-x{background:transparent;color:inherit;font-size:15px;padding:0 4px}
#bh-extractor-modal .bh-ex-link{font-size:12px;color:var(--primary,#ffb3d9);text-decoration:underline}

/* \u2500\u2500 ME theming: track the SELECTED ME theme (surfaces, text, accent, borders). \u2500\u2500\u2500\u2500\u2500\u2500
   Beholder ships a brand-gold accent; here we remap its accent + the ST theme seams onto
   ME's shadcn theme vars (--background/--card/--foreground/--primary/--border/--input) so
   the panel matches whatever theme the user picked \u2014 light or dark. The remap is applied
   to the panel AND to every Beholder surface that mounts on <body> (tools menu, edit sheet,
   note box) so they inherit the same palette. Semantic colors (damage tiers, the literal
   "gold" color swatch, wound red) are intentionally left untouched. */
.beholder-panel, .beholder-tools-menu, .bh-edit-sheet, .bh-edit-popover, .bh-sheet-backdrop, .beholder-notebox{
  --SmartThemeBlurTintColor: var(--card); --SmartThemeBodyColor: var(--foreground);
  --SmartThemeBorderColor: var(--border); --SmartThemeQuoteColor: var(--primary); --SmartThemeEmColor: var(--primary);
  --bh-gold: var(--primary) !important; --bh-gold-deep: var(--primary) !important;
  --bh-accent: var(--primary) !important; --bh-accent-pref: var(--primary) !important; --bh-holding: var(--primary) !important; }
.beholder-panel{ background:var(--background) !important; color:var(--foreground) !important;
  backdrop-filter:none !important; -webkit-backdrop-filter:none !important; font-family:var(--font-sans,inherit) !important;
  border-left:1px solid var(--border) !important; box-shadow:-12px 0 34px rgba(0,0,0,.38) !important; }
.beholder-panel .bh-view, .beholder-panel .bh-view-head, .beholder-panel .beholder-panel-body, .beholder-panel .beholder-backfill-status{ background:var(--background) !important; color:var(--foreground) !important; }
.beholder-panel .beholder-panel-header{ background:var(--card) !important; border-bottom:1px solid var(--border) !important; }
.beholder-panel .bh-vsection, .beholder-panel .bh-conn-opt, .beholder-panel details.bh-vsection, .beholder-tools-menu{ background:var(--card) !important; border-color:var(--border) !important; }
.beholder-panel input, .beholder-panel select, .beholder-panel textarea{ background:var(--input) !important; border:1px solid var(--border) !important; color:var(--foreground) !important; }
.beholder-panel .bh-conn-tag-warn{ color:var(--primary) !important; border-color:var(--primary) !important; }
.beholder-panel .bh-conn-hint{ font-size:12px; opacity:.8; margin:0 0 8px; }
/* The docked panel is wide \u2014 show every tool inline; drop ST's narrow-mode \u22EF overflow. */
.beholder-panel .beholder-tools-more{ display:none !important; }
.beholder-panel .beholder-tool-btn{ display:inline-flex !important; align-items:center; justify-content:center; }
/* In-browser model is permanently shelved for ME \u2014 hide its card + "Active now" line. */
.beholder-panel #bhp-opt-browser, .beholder-panel .bh-localmodel-card, .beholder-panel .bh-conn-active{ display:none !important; }
/* Remaining hardcoded golds the var-remap can't reach (literal rgba / hex). */
.beholder-panel .bh-placeholder-note{ color:var(--primary) !important; background:color-mix(in srgb, var(--primary) 12%, transparent) !important; border-color:color-mix(in srgb, var(--primary) 42%, transparent) !important; }
.beholder-panel .bh-placeholder-note b{ color:var(--primary) !important; }
.beholder-panel .bh-slot-card.bh-hover-link, .beholder-panel .bh-chip-spanning.bh-hover-link{ background:color-mix(in srgb, var(--primary) 12%, transparent) !important; border-color:color-mix(in srgb, var(--primary) 55%, transparent) !important; }
/* No-model banner (warn/loading): swap the gold tint for the ME accent. */
.beholder-panel .bh-no-model-banner.bh-banner-warn, .beholder-panel .bh-no-model-banner.bh-banner-loading{ background:color-mix(in srgb, var(--primary) 12%, transparent) !important; border-bottom-color:color-mix(in srgb, var(--primary) 40%, transparent) !important; }
.beholder-panel .bh-no-model-banner .bh-banner-copy b{ color:var(--primary) !important; }
.beholder-panel .bh-no-model-banner.bh-banner-warn .bh-banner-icon{ color:var(--primary) !important; text-shadow:none !important; }
/* Slot editor CTA (Apply) + active lock: style.css hardcodes LITERAL gold (rgba(201,165,90) /
   rgba(255,234,167)) NOT via the remappable --bh-* vars, and the editor renders in the edit
   SHEET (mobile) / POPOVER (desktop), which sit OUTSIDE .beholder-panel \u2014 so the panel-scoped
   overrides never reached them and they stayed gold. Map them to the theme accent here. */
.beholder-panel .bh-btn-primary, .bh-edit-sheet .bh-btn-primary, .bh-edit-popover .bh-btn-primary{
  background:color-mix(in srgb, var(--primary) 20%, transparent) !important;
  border-color:color-mix(in srgb, var(--primary) 55%, transparent) !important;
  color:var(--primary) !important; }
.beholder-panel .bh-btn-primary:hover, .bh-edit-sheet .bh-btn-primary:hover, .bh-edit-popover .bh-btn-primary:hover{
  box-shadow:0 4px 18px color-mix(in srgb, var(--primary) 22%, transparent) !important; border-color:var(--primary) !important; }
.beholder-panel .bh-lock-toggle.bh-locked-on, .bh-edit-sheet .bh-lock-toggle.bh-locked-on, .bh-edit-popover .bh-lock-toggle.bh-locked-on{
  color:var(--primary) !important; border-color:color-mix(in srgb, var(--primary) 50%, transparent) !important;
  text-shadow:0 0 8px color-mix(in srgb, var(--primary) 40%, transparent) !important; }
.bh-edit-sheet::before{ background:linear-gradient(90deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 40%, transparent) 22%, transparent 60%) !important; }
/* Drop the \u25C9 brand dot + sub-view crumb; hide ST's collapsed "Advanced: custom endpoint". */
.beholder-panel .beholder-panel-title::before{ content:none !important; }
.beholder-panel .bh-view-crumb{ display:none !important; }
.beholder-panel .bh-adv-endpoint{ display:none !important; }
/* Back arrow points toward the docked (right) edge. */
.beholder-panel .bh-view-back, .beholder-panel .bh-sheet-back{ transform:scaleX(-1); }
/* Close button, top-left of the header \u2014 keeps the title clustered on the left. */
.beholder-panel .beholder-panel-title{ margin-right:auto; }
.beholder-panel .bh-dock-close{ cursor:pointer; font-size:15px; line-height:1; opacity:.6; padding:0 12px 0 2px; color:var(--foreground); }
.beholder-panel .bh-dock-close:hover{ opacity:1; color:var(--primary); }
/* Note box (one-shot state directive) above ME's composer \u2014 styled like an ME input. */
.beholder-notebox{ display:flex; gap:8px; align-items:center; margin:0 auto 8px; max-width:986px; width:100%; box-sizing:border-box; padding:0 12px; pointer-events:auto; }
.beholder-notebox-input{ flex:1; min-width:0; background:var(--input) !important; color:var(--foreground) !important; border:1px solid var(--border) !important; border-radius:12px !important; padding:9px 13px !important; font-size:13px; font-family:var(--font-sans,inherit); }
.beholder-notebox-btn{ background:var(--primary) !important; color:var(--primary-foreground) !important; border:0 !important; border-radius:12px !important; padding:9px 14px !important; cursor:pointer; }
/* Connection chooser (Settings \u2192 CONNECTION): status/warning + local endpoint + ME connection. */
.beholder-panel .bh-conn2{ display:flex; flex-direction:column; gap:10px; margin:2px 0 12px; }
.beholder-panel .bh-conn2-status{ font-size:12.5px; padding:8px 10px; border-radius:8px; border:1px solid var(--border); background:var(--card); }
.beholder-panel .bh-conn2-status.warn{ color:var(--primary) !important; border-color:var(--primary) !important; }
.beholder-panel .bh-conn2-status code{ font-size:11px; opacity:.85; }
.beholder-panel .bh-conn2-opt{ background:var(--card) !important; border:1px solid var(--border); border-radius:10px; padding:10px; }
.beholder-panel .bh-conn2-h{ display:flex; align-items:center; gap:8px; font-weight:700; font-size:13px; margin-bottom:3px; }
.beholder-panel .bh-conn2-rec{ font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.6px; color:var(--primary-foreground); background:var(--primary); border-radius:5px; padding:1px 6px; }
.beholder-panel .bh-conn2-hint{ font-size:11.5px; opacity:.82; margin-bottom:8px; line-height:1.45; }
.beholder-panel .bh-conn2-hint a{ color:var(--primary); }
.beholder-panel .bh-conn2-row{ display:flex; gap:6px; align-items:center; }
.beholder-panel .bh-conn2-row input, .beholder-panel .bh-conn2-row select{ flex:1; min-width:0; }
.beholder-panel .bh-conn2 .bh-btn{ background:var(--primary) !important; color:var(--primary-foreground) !important; border:0; border-radius:8px; padding:7px 13px; font-size:12px; font-weight:600; cursor:pointer; white-space:nowrap; }
.beholder-panel .bh-conn2 .bh-btn:hover{ filter:brightness(1.08); }
.beholder-panel .bh-linklike{ background:none; border:0; color:var(--primary); font-size:11px; cursor:pointer; padding:0; text-decoration:underline; }
.beholder-panel .bh-linklike:hover{ filter:brightness(1.15); }
/* Optional (Beholder Settings): drop Marinara's fade on roleplay avatars. The bottom fade is a
   mask on the panel STACK + the img, so strip those. The rpg-avatar-panel-tail is a BLURRED
   duplicate (blur 14px) that ME masks down to a thin sliver as a soft reflection \u2014 unmasking it
   reveals the whole blur ("vague from the middle out"), so HIDE the tail instead. */
body.bh-no-avatar-fade .rpg-avatar-panel-stack,
body.bh-no-avatar-fade .rpg-avatar-panel-media img,
body.bh-no-avatar-fade .rpg-avatar-panel img{ -webkit-mask-image:none !important; mask-image:none !important; }
body.bh-no-avatar-fade .rpg-avatar-panel-tail{ display:none !important; }
body.bh-no-avatar-fade .rpg-avatar-panel::after{ display:none !important; }
/* Optional (Beholder Settings): SHOW FULL PORTRAIT. ME crops the avatar to a fixed 11rem*scale box
   (object-cover object-top) so only the top shows. Put the stack/media/img back in flow with a
   natural (auto) height + object-contain so the WHOLE image shows and drives its own height; the
   rail's overflow is opened and the outer flex is items-stretch, so a short message just grows the
   bubble with empty space beneath the text (per user). Tail/glow hidden in this mode. */
body.bh-full-portrait .mari-roleplay-avatar-panel-rail{ overflow:visible !important; align-items:stretch !important; }
body.bh-full-portrait .rpg-avatar-panel-stack{ position:relative !important; height:auto !important; top:auto !important; left:auto !important; }
body.bh-full-portrait .rpg-avatar-panel-media{ position:relative !important; height:auto !important; inset:auto !important; }
body.bh-full-portrait .rpg-avatar-panel-media img{ position:relative !important; inset:auto !important; height:auto !important; width:100% !important; object-fit:contain !important; }
body.bh-full-portrait .rpg-avatar-panel-tail{ display:none !important; }
body.bh-full-portrait .rpg-avatar-panel::after{ display:none !important; }
/* Widescreen chat \u2014 on a wide monitor ME centres the roleplay column at 58rem and lets 1fr
   grid spacers eat the rest, so text bunches in a narrow strip. The column width comes from
   one var (--mari-roleplay-message-column-width) used by the grid track AND the body width;
   bump it to fill the viewport. Texting mode caps bubbles at max-w-[72%] instead \u2014 widen that too. */
body.bh-wide-chat [data-chat-mode="roleplay"]{ --mari-roleplay-message-column-width: 92vw !important; }
body.bh-wide-chat [class*="max-w-[72%]"]{ max-width: 92% !important; }
/* Widen Beholder's own note box to match the widened chat column (it has its own 986px cap
   rather than following ME's column var). */
body.bh-wide-chat .beholder-notebox{ max-width: 92vw !important; }
/* Color quoted dialogue (mellow orange default; --bh-quote-color left as a var for a future
   picker). ME renders dialogue as <strong class="text-black dark:text-white"> when no persona
   dialogue-colour is set \u2014 target that so only quotes recolour, not all bold. */
body.bh-quote-color .mari-message strong.text-black,
body.bh-quote-color .mari-roleplay-message-body strong.text-black{ color: var(--bh-quote-color, #e0a566) !important; }
/* Optional (Beholder Settings): BIGGER roleplay portraits. Widening only the rail changes
   the panel's aspect and crops a tall portrait ("cut in half"), so instead boost the avatar
   scale proportionally (beyond ME's 2.5\xD7 cap) \u2014 the whole cropped avatar just gets larger
   (wider AND taller), no extra cropping. */
body.bh-big-portraits .mari-message{ --roleplay-avatar-scale: var(--bh-portrait-scale, 3) !important; }
`;
  function mountBaseline() {
    try {
      marinara.addStyle(style_default);
      marinara.addStyle(HOST_CSS);
      marinara.addStyle(fa_embed_default);
    } catch {
    }
    applyMobileLayout();
  }
  var MODULE_NAME = "beholder";
  var LS_SETTINGS = "beholder:settings";
  var LS_CHAT = (id) => `beholder:chat:${id}`;
  var LS_ACTIVE = "marinara-active-chat-id";
  var activeChatId = () => localStorage.getItem(LS_ACTIVE) || "";
  var extension_settings = (() => {
    try {
      return JSON.parse(localStorage.getItem(LS_SETTINGS) || "{}");
    } catch {
      return {};
    }
  })();
  var settingsTimer = null;
  function saveSettingsDebounced() {
    clearTimeout(settingsTimer);
    settingsTimer = setTimeout(() => {
      try {
        localStorage.setItem(LS_SETTINGS, JSON.stringify(extension_settings));
      } catch {
      }
    }, 250);
  }
  {
    const s = extension_settings[MODULE_NAME] = extension_settings[MODULE_NAME] || {};
    s.panel = { visible: true, collapsed: false, pos: null, ...s.panel || {}, onboarded: true };
  }
  var chat_metadata = {};
  function loadChatMeta(id) {
    for (const k of Object.keys(chat_metadata)) delete chat_metadata[k];
    if (!id) return;
    try {
      Object.assign(chat_metadata, JSON.parse(localStorage.getItem(LS_CHAT(id)) || "{}"));
    } catch {
    }
  }
  var metaTimer = null;
  function saveMetadataDebounced() {
    clearTimeout(metaTimer);
    metaTimer = setTimeout(() => {
      const id = activeChatId();
      if (!id) return;
      try {
        localStorage.setItem(LS_CHAT(id), JSON.stringify(chat_metadata));
      } catch {
      }
    }, 250);
  }
  var extension_prompt_types = { IN_PROMPT: "in_prompt", IN_CHAT: "in_chat", BEFORE_PROMPT: "before_prompt", NONE: "none" };
  var extension_prompt_roles = { SYSTEM: "system", USER: "user", ASSISTANT: "assistant" };
  var event_types = {
    MESSAGE_RECEIVED: "message_received",
    MESSAGE_SENT: "message_sent",
    CHAT_CHANGED: "chat_changed",
    GENERATION_STARTED: "generation_started",
    MESSAGE_SWIPED: "message_swiped",
    MESSAGE_DELETED: "message_deleted",
    MESSAGE_UPDATED: "message_updated"
  };
  var listeners = /* @__PURE__ */ new Map();
  var eventSource = {
    on(type, fn) {
      if (!listeners.has(type)) listeners.set(type, []);
      listeners.get(type).push(fn);
    },
    off(type, fn) {
      const a = listeners.get(type);
      if (a) listeners.set(type, a.filter((f) => f !== fn));
    },
    once(type, fn) {
      const w = (...args) => {
        eventSource.off(type, w);
        return fn(...args);
      };
      eventSource.on(type, w);
    },
    async emit(type, ...args) {
      for (const fn of listeners.get(type) || []) {
        try {
          await fn(...args);
        } catch (e) {
          console.warn("[beholder-shim] listener error", type, e);
        }
      }
    }
  };
  var chatCache = [];
  var charsCache = [];
  var personaName = "";
  var personaDesc = "";
  var currentMode = null;
  function getContext() {
    return {
      chat: chatCache,
      name1: personaName,
      name2: charsCache[0]?.name || "",
      // ST power-user persona seam: index.js getCardSeedSource() reads the persona
      // description from powerUserSettings.persona_description to seed the "self" card.
      powerUserSettings: { persona_description: personaDesc },
      characters: charsCache,
      characterId: charsCache.length ? 0 : void 0,
      this_chid: charsCache.length ? 0 : void 0,
      setExtensionPrompt,
      // Best-effort no-ops for ST helpers seedFromCards / others may call.
      substituteParams: (t) => t
    };
  }
  var LS_LB = (id) => `beholder:lb:${id}`;
  var asList = (r) => Array.isArray(r) ? r : r && (r.data || r.entries || r.items) || [];
  var lbChatId = "";
  var lbReady = null;
  var injectChain = Promise.resolve();
  async function ensureLbEntry(chatId) {
    if (lbReady && lbChatId === chatId) return lbReady;
    lbChatId = chatId;
    lbReady = (async () => {
      let lorebookId = "", entryId = "";
      try {
        const c = JSON.parse(localStorage.getItem(LS_LB(chatId)) || "{}");
        lorebookId = c.lorebookId || "";
        entryId = c.entryId || "";
      } catch {
      }
      if (!lorebookId) {
        let mine = [];
        try {
          mine = asList(await marinara.apiFetch("/lorebooks")).filter((l) => l && l.chatId === chatId && /Beholder/.test(l.name || ""));
        } catch {
        }
        if (mine.length) {
          lorebookId = mine[0].id;
          for (const extra of mine.slice(1)) marinara.apiFetch(`/lorebooks/${extra.id}`, { method: "DELETE" }).catch(() => {
          });
        }
      }
      if (!lorebookId) {
        try {
          const res = await marinara.apiFetch("/lorebooks", { method: "POST", body: JSON.stringify({ name: "Beholder \u2014 Physical State", chatId }) });
          lorebookId = res?.id ?? res?.data?.id ?? "";
        } catch {
        }
      }
      if (lorebookId && !entryId) {
        let entries = [];
        try {
          entries = asList(await marinara.apiFetch(`/lorebooks/${lorebookId}/entries`));
        } catch {
        }
        if (entries.length) {
          entryId = entries[0].id;
          for (const extra of entries.slice(1)) {
            try {
              await marinara.apiFetch(`/lorebooks/${lorebookId}/entries/${extra.id}`, { method: "DELETE" });
            } catch {
            }
          }
        }
      }
      try {
        localStorage.setItem(LS_LB(chatId), JSON.stringify({ lorebookId, entryId }));
      } catch {
      }
      return { lorebookId, entryId };
    })();
    return lbReady;
  }
  async function setExtensionPromptImpl(_key, text, type, depth, _scan, _role) {
    const chatId = activeChatId();
    if (!chatId) return;
    const clear = type === "none" || !text;
    const ids = await ensureLbEntry(chatId);
    if (!ids.lorebookId) return;
    const entry = { lorebookId: ids.lorebookId, name: "Beholder state", content: clear ? "" : String(text), constant: true, position: 2, depth: Number(depth) || 1, role: "system", enabled: !clear };
    try {
      if (!ids.entryId) {
        const created = await marinara.apiFetch(`/lorebooks/${ids.lorebookId}/entries`, { method: "POST", body: JSON.stringify(entry) });
        ids.entryId = created?.id ?? created?.data?.id ?? "";
        try {
          localStorage.setItem(LS_LB(chatId), JSON.stringify(ids));
        } catch {
        }
      } else {
        await marinara.apiFetch(`/lorebooks/${ids.lorebookId}/entries/${ids.entryId}`, { method: "PATCH", body: JSON.stringify(entry) });
      }
    } catch (e) {
      console.warn("[beholder-shim] injection failed:", e?.message || e);
    }
  }
  function setExtensionPrompt(...a) {
    injectChain = injectChain.then(() => setExtensionPromptImpl(...a)).catch(() => {
    });
  }
  async function refreshChat() {
    const id = activeChatId();
    if (!id) {
      chatCache = [];
      return;
    }
    const msgs = await marinara.apiFetch(`/chats/${id}/messages`).catch(() => []);
    chatCache = (Array.isArray(msgs) ? msgs : []).map((m) => ({ mes: m.content || "", is_user: m.role === "user", _id: m.id }));
  }
  async function refreshChars() {
    const id = activeChatId();
    charsCache = [];
    personaName = "";
    personaDesc = "";
    if (!id) return;
    const chat = await marinara.apiFetch(`/chats/${id}`).catch(() => null);
    currentMode = chat?.mode ?? null;
    try {
      const pid = chat?.personaId;
      const p = pid ? await marinara.apiFetch(`/characters/personas/${pid}`) : null;
      if (p && typeof p === "object") {
        personaName = p.name || "";
        personaDesc = [p.description, p.appearance].filter((x) => x && String(x).trim()).join("\n\n");
      }
    } catch {
    }
    let ids = [];
    try {
      ids = JSON.parse(chat?.characterIds || "[]");
    } catch {
    }
    for (const cid of ids) {
      const c = await marinara.apiFetch(`/characters/${cid}`).catch(() => null);
      if (!c) continue;
      try {
        const d = typeof c.data === "string" ? JSON.parse(c.data) : c.data || c;
        charsCache.push({ ...d, avatar: cid });
      } catch {
      }
    }
  }
  var prevSig = null;
  var sigOf = (arr) => arr.map((m) => ({ u: m.is_user, h: hashText(m.mes) }));
  function hashText(t) {
    let h = 0;
    const s = String(t || "");
    for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) | 0;
    return `${h}:${s.length}`;
  }
  async function pump(initial = false) {
    await refreshChat();
    const sig = sigOf(chatCache);
    if (currentMode !== "roleplay") {
      prevSig = sig;
      return;
    }
    if (initial || prevSig === null) {
      prevSig = sig;
      return;
    }
    if (sig.length < prevSig.length) {
      prevSig = sig;
      await eventSource.emit(event_types.MESSAGE_DELETED, sig.length);
      return;
    }
    let firstChanged = -1;
    for (let i = 0; i < sig.length; i++) {
      const p = prevSig[i];
      if (!p || p.u !== sig[i].u || p.h !== sig[i].h) {
        firstChanged = i;
        break;
      }
    }
    prevSig = sig;
    if (firstChanged === -1) return;
    for (let i = firstChanged; i < sig.length; i++) {
      if (i < origPrevLen) {
        await eventSource.emit(event_types.MESSAGE_UPDATED, i);
      } else if (sig[i].u) {
        await eventSource.emit(event_types.MESSAGE_SENT, i);
      } else {
        await eventSource.emit(event_types.MESSAGE_RECEIVED, i);
      }
    }
  }
  var origPrevLen = 0;
  async function drivePump(initial = false) {
    origPrevLen = prevSig ? prevSig.length : 0;
    await pump(initial);
  }
  var seenChat = "";
  function parseMeta(m) {
    if (!m) return {};
    if (typeof m === "object") return m;
    try {
      return JSON.parse(m) || {};
    } catch {
      return {};
    }
  }
  var sceneSyncBusy = "";
  async function maybeSyncScene(chatId) {
    const s = extension_settings[MODULE_NAME] || {};
    if (!chatId || sceneSyncBusy === chatId) return;
    sceneSyncBusy = chatId;
    try {
      let chat;
      try {
        chat = await marinara.apiFetch(`/chats/${chatId}`);
      } catch {
        return;
      }
      if (!chat || !chat.id) return;
      const meta = parseMeta(chat.metadata);
      if (s.nukeScene) {
        if (meta.sceneStatus === "active" && !meta.beholderSceneNuked) {
          let originPreset = null;
          if (meta.sceneOriginChatId) {
            try {
              const o = await marinara.apiFetch(`/chats/${meta.sceneOriginChatId}`);
              originPreset = o && o.promptPresetId || null;
            } catch {
            }
          }
          await marinara.apiFetch(`/chats/${chatId}/metadata`, { method: "PATCH", body: JSON.stringify({
            sceneStatus: "concluded",
            // turns off the hardcoded scene scaffold
            beholderSceneNuked: true,
            beholderPrevSceneStatus: meta.sceneStatus,
            beholderPrevPresetId: chat.promptPresetId ?? null
          }) });
          if (originPreset) {
            await marinara.apiFetch(`/chats/${chatId}`, { method: "PATCH", body: JSON.stringify({ promptPresetId: originPreset }) });
          }
          banner(originPreset ? "Beholder: Scene scaffold off \u2014 using your preset" : "Beholder: Scene scaffold off (no origin preset found)");
        }
      } else if (meta.beholderSceneNuked) {
        await marinara.apiFetch(`/chats/${chatId}/metadata`, { method: "PATCH", body: JSON.stringify({
          sceneStatus: meta.beholderPrevSceneStatus || "active",
          beholderSceneNuked: false
        }) });
        await marinara.apiFetch(`/chats/${chatId}`, { method: "PATCH", body: JSON.stringify({ promptPresetId: meta.beholderPrevPresetId ?? null }) });
        banner("Beholder: Scene scaffold restored");
      }
    } finally {
      sceneSyncBusy = "";
    }
  }
  async function onChatMaybeChanged() {
    const id = activeChatId();
    if (id === seenChat) return;
    seenChat = id;
    lbReady = null;
    lbChatId = "";
    loadChatMeta(id);
    prevSig = null;
    void maybeSyncScene(id);
    await refreshChars();
    await drivePump(true);
    await eventSource.emit(event_types.CHAT_CHANGED);
    applyModeVisibility();
    mountExtractorButton();
    mountHudToggle();
  }
  function applyModeVisibility() {
    const rp = currentMode === "roleplay";
    const panel = document.getElementById("beholder_panel");
    if (panel && !rp) panel.classList.add("bh-collapsed");
    if (!rp) {
      document.body.classList.remove("bh-dock-open");
      document.querySelector(".beholder-notebox")?.remove();
    } else {
      window.__beholderMountNoteBox?.();
    }
    document.querySelectorAll(".bh-hud-toggle").forEach((b) => b.style.display = rp ? "" : "none");
  }
  var dockInit = false;
  function ensureDockInit() {
    const panel = document.getElementById("beholder_panel");
    if (panel && !dockInit) {
      panel.classList.add("bh-collapsed");
      document.body.classList.remove("bh-dock-open");
      dockInit = true;
    }
  }
  function toggleDock() {
    if (currentMode !== "roleplay") return;
    const panel = document.getElementById("beholder_panel");
    if (!panel) return;
    panel.classList.toggle("bh-collapsed");
    document.body.classList.toggle("bh-dock-open", !panel.classList.contains("bh-collapsed"));
    syncDockOffset();
  }
  function closeDock() {
    const panel = document.getElementById("beholder_panel");
    if (panel) panel.classList.add("bh-collapsed");
    document.body.classList.remove("bh-dock-open");
  }
  function syncDockOffset() {
    const panel = document.getElementById("beholder_panel");
    const main = document.querySelector(".mari-main");
    if (!panel || !main) return;
    const off = Math.max(0, Math.round(window.innerWidth - main.getBoundingClientRect().right));
    panel.style.setProperty("--bh-dock-right", off + "px");
    const topbar = document.querySelector("header.mari-topbar");
    const top = topbar ? Math.round(topbar.getBoundingClientRect().bottom) : 0;
    panel.style.setProperty("--bh-dock-top", top + "px");
  }
  function applyDisplayTweaks() {
    if (typeof document === "undefined") return;
    const s = extension_settings[MODULE_NAME] || {};
    document.body.classList.toggle("bh-no-avatar-fade", !!s.noAvatarFade);
    document.body.classList.toggle("bh-full-portrait", !!s.fullPortrait);
    document.body.classList.toggle("bh-wide-chat", !!s.wideChat);
    document.body.classList.toggle("bh-quote-color", !!s.quoteColor);
    const sz = (s.portraitScale || "").trim();
    document.body.classList.toggle("bh-big-portraits", !!sz);
    if (sz) document.body.style.setProperty("--bh-portrait-scale", sz);
    else document.body.style.removeProperty("--bh-portrait-scale");
  }
  function mountPanelClose() {
    const header = document.querySelector("#beholder_panel .beholder-panel-header");
    if (!header || header.querySelector(".bh-dock-close")) return;
    const btn = document.createElement("span");
    btn.className = "bh-dock-close fa-solid fa-xmark";
    btn.setAttribute("role", "button");
    btn.setAttribute("tabindex", "0");
    btn.title = "Close Beholder";
    header.insertBefore(btn, header.firstChild);
    btn.addEventListener("mousedown", (e) => e.stopPropagation());
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeDock();
    });
  }
  function mountHudToggle() {
    if (currentMode !== "roleplay") return;
    const sibling = document.querySelector(".marinara-chat-toolbar-button");
    if (!sibling) return;
    if (document.querySelector(".bh-hud-toggle")) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = sibling.className + " bh-hud-toggle";
    btn.title = "Beholder \u2014 physical state";
    btn.setAttribute("aria-label", "Beholder");
    btn.innerHTML = `<img src="${bh_logo_default}" alt="" style="width:18px;height:18px;border-radius:50%;display:block">`;
    const wrapper = sibling.parentElement && sibling.parentElement.children.length === 1 ? sibling.parentElement : sibling;
    wrapper.after(btn);
    btn.addEventListener("click", toggleDock);
  }
  function applyMobileLayout() {
    const mobile = typeof window !== "undefined" && window.innerWidth < 768;
    try {
      setDollLayout(mobile ? "list" : extension_settings[MODULE_NAME]?.layout || "paired");
    } catch {
    }
  }
  var GGUF_URL = "https://huggingface.co/GetBeholder/Beholder-GGUF";
  function escapeHtmlLite(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  }
  function setEndpoint(url) {
    const s = extension_settings[MODULE_NAME] = extension_settings[MODULE_NAME] || {};
    s.endpoint = (url || "").trim();
    if (s.endpoint) {
      delete s.meConnectionId;
      delete s.meConnName;
    }
    if (s.systemPrompt === GENERAL_PROMPT) {
      s.systemPrompt = "";
      delete s.systemPromptTag;
    }
    saveSettingsDebounced();
  }
  function useConnection(id, name, keyless, baseUrl) {
    const s = extension_settings[MODULE_NAME] = extension_settings[MODULE_NAME] || {};
    s.systemPrompt = GENERAL_PROMPT;
    s.systemPromptTag = "general-4k";
    if (keyless && baseUrl) {
      s.endpoint = baseUrl;
      delete s.meConnectionId;
      delete s.meConnName;
    } else {
      s.meConnectionId = id;
      s.meConnName = name || id;
      s.endpoint = "";
    }
    saveSettingsDebounced();
  }
  function makeMeConnTransport(connId) {
    return {
      async chatCompletion({ system, user, signal }) {
        const data = await marinara.apiFetch("/agents/suite/rewrite", {
          method: "POST",
          body: JSON.stringify({
            connectionId: connId,
            instruction: String(system || "Extract the physical state.").slice(0, 3990),
            selectedText: String(user || "").slice(0, 49990),
            agentName: "Beholder"
          }),
          signal
        });
        return (data && data.rewrittenText ? String(data.rewrittenText) : "").trim();
      },
      status() {
        return { state: "ready", backend: "me-connection" };
      }
    };
  }
  if (typeof window !== "undefined") window.__bhMakeMeTransport = (id) => makeMeConnTransport(id);
  function banner(msg) {
    const t = marinara.addElement(document.body, "div", { textContent: msg });
    if (!t) return;
    t.style.cssText = "position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:9300;background:var(--card,#141414);color:var(--foreground,#eee);border:1px solid var(--border,#d4adfc33);border-radius:8px;padding:8px 14px;font-size:13px";
    marinara.setTimeout(() => t.remove(), 2600);
  }
  var connCache = null;
  function renderConnStatus(el) {
    if (!el) return;
    const s = extension_settings[MODULE_NAME] || {};
    const ep = (s.endpoint || "").trim();
    const general = s.systemPrompt === GENERAL_PROMPT;
    if (s.meConnectionId) {
      el.className = "bh-conn2-status ok";
      el.innerHTML = `<b>\u2713 Extractor set</b> \u2014 Marinara connection <code>${escapeHtmlLite(s.meConnName || s.meConnectionId)}</code> \xB7 via Marinara \xB7 general model`;
    } else if (ep) {
      el.className = "bh-conn2-status ok";
      el.innerHTML = general ? `<b>\u2713 Extractor set</b> \u2014 general model at <code>${escapeHtmlLite(ep)}</code>` : `<b>\u2713 Extractor set</b> \u2014 Beholder model at <code>${escapeHtmlLite(ep)}</code>`;
    } else {
      el.className = "bh-conn2-status warn";
      el.innerHTML = `<b>\u26A0 No extractor configured.</b> Beholder can't track state yet \u2014 choose one below.`;
    }
  }
  async function injectConnCardIntoSettings() {
    const view = document.querySelector('#beholder_panel .bh-view[data-view="settings"]');
    if (!view || view.querySelector("#bh-conn2")) return;
    const epInput = view.querySelector("#bhp-endpoint");
    const section = epInput && epInput.closest(".bh-vsection") || view.querySelector(".bh-vsection");
    if (!section) return;
    const body = section.querySelector(".bh-vsection-body") || section;
    const advanced = epInput && epInput.closest("details");
    if (advanced) advanced.style.setProperty("display", "none", "important");
    const s = extension_settings[MODULE_NAME] || {};
    const card = document.createElement("div");
    card.id = "bh-conn2";
    card.className = "bh-conn2";
    card.innerHTML = `
    <div class="bh-conn2-status"></div>
    <div class="bh-conn2-opt">
      <div class="bh-conn2-h"><span class="bh-conn2-t">Local endpoint</span><span class="bh-conn2-rec">recommended</span></div>
      <div class="bh-conn2-hint">Run the Beholder model in llama.cpp / KoboldCpp / LM Studio and paste its URL. <a href="${GGUF_URL}" target="_blank" rel="noopener">Get the model \u2197</a></div>
      <div class="bh-conn2-row"><input id="bh-conn2-url" type="text" placeholder="http://127.0.0.1:8080/v1" value="${escapeHtmlLite(s.endpoint || "")}"><button class="bh-btn" id="bh-conn2-url-use">Use</button></div>
    </div>
    <div class="bh-conn2-opt">
      <div class="bh-conn2-h"><span class="bh-conn2-t">A Marinara connection</span><span class="bh-conn-tag bh-conn-tag-warn">unsupported</span></div>
      <div class="bh-conn2-hint">Uses a connection from Marinara's Connections panel \u2014 keyed ones run <b>through Marinara</b>, so your key never leaves it. Note: this uses a general model, not the trained Beholder model, so accuracy varies (GPT-5.5+ suggested).</div>
      <div class="bh-conn2-row"><select id="bh-conn2-sel"><option value="">Loading\u2026</option></select><button class="bh-btn" id="bh-conn2-conn-use">Use</button></div>
    </div>`;
    body.insertBefore(card, body.firstChild);
    const statusEl = card.querySelector(".bh-conn2-status");
    renderConnStatus(statusEl);
    if (!view.querySelector("#bh-display-extra")) {
      const S = extension_settings[MODULE_NAME] || {};
      const psize = S.portraitScale || "";
      const chk = (k) => S[k] ? " checked" : "";
      const disp = document.createElement("details");
      disp.className = "bh-vsection";
      disp.id = "bh-display-extra";
      disp.open = true;
      disp.innerHTML = `
      <summary><i class="fa-solid fa-eye"></i> Display</summary>
      <div class="bh-vsection-body">
        <label class="bh-check">
          <input type="checkbox" id="bh-nofade"${chk("noAvatarFade")}>
          <span>Remove avatar fade
            <small>Strips Marinara's soft fade at the bottom of roleplay portraits so a full-body avatar shows crisp to the feet.</small></span>
        </label>
        <label class="bh-check" style="margin-top:8px">
          <input type="checkbox" id="bh-fullportrait"${chk("fullPortrait")}>
          <span>Show full portrait
            <small>Always shows the whole avatar (no top-crop). If a message is short the bubble just grows taller with empty space beneath the text.</small></span>
        </label>
        <label class="bh-check" style="margin-top:8px">
          <input type="checkbox" id="bh-widechat"${chk("wideChat")}>
          <span>Widescreen chat
            <small>Uses the full window width for messages instead of Marinara's narrow centered column \u2014 pairs with bigger portraits.</small></span>
        </label>
        <label class="bh-check" style="margin-top:8px">
          <input type="checkbox" id="bh-quotecolor"${chk("quoteColor")}>
          <span>Colour quoted text
            <small>Tints "dialogue" a mellow orange.</small></span>
        </label>
        <hr style="border:0;border-top:1px solid var(--border);margin:12px 0 10px;opacity:.55">
        <label class="bh-check">
          <input type="checkbox" id="bh-nukescene"${chk("nukeScene")}>
          <span>Bypass Marinara Scene scaffolding
            <small>Marinara "Scene" chats ignore your prompt preset and inject their own hardcoded rubric. When on, Beholder turns any Scene you open into a normal preset-driven chat \u2014 the scaffold is disabled and the preset from the chat the Scene was launched from is restored. Reversible: turn this off to put the Scene back.</small></span>
        </label>
        <div style="margin-top:12px">
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px">
            <span style="font-size:12px;font-weight:600">Portrait size <span id="bh-psize-val" style="opacity:.7;font-weight:400">${psize ? psize + "\xD7" : "off"}</span></span>
            <button type="button" id="bh-psize-off" class="bh-linklike">reset</button>
          </div>
          <input type="range" id="bh-psize" min="1" max="6" step="0.25" value="${psize || "2.5"}" style="width:100%">
          <small style="display:block;opacity:.72;font-size:11px;margin-top:4px">Scales the whole portrait up proportionally (past Marinara's 2.5\xD7 cap) \u2014 bigger BOTH ways, so a tall avatar isn't cropped. "reset" hands size back to Marinara's own slider.</small>
        </div>
      </div>`;
      section.after(disp);
      const bind = (id, key) => disp.querySelector(id).addEventListener("change", function() {
        const st = extension_settings[MODULE_NAME] = extension_settings[MODULE_NAME] || {};
        st[key] = this.checked;
        saveSettingsDebounced();
        applyDisplayTweaks();
      });
      bind("#bh-nofade", "noAvatarFade");
      bind("#bh-fullportrait", "fullPortrait");
      bind("#bh-widechat", "wideChat");
      bind("#bh-quotecolor", "quoteColor");
      disp.querySelector("#bh-nukescene").addEventListener("change", function() {
        const st = extension_settings[MODULE_NAME] = extension_settings[MODULE_NAME] || {};
        st.nukeScene = this.checked;
        saveSettingsDebounced();
        void maybeSyncScene(activeChatId());
      });
      const psizeInput = disp.querySelector("#bh-psize");
      const psizeVal = disp.querySelector("#bh-psize-val");
      psizeInput.addEventListener("input", function() {
        const st = extension_settings[MODULE_NAME] = extension_settings[MODULE_NAME] || {};
        st.portraitScale = this.value;
        psizeVal.textContent = this.value + "\xD7";
        saveSettingsDebounced();
        applyDisplayTweaks();
      });
      disp.querySelector("#bh-psize-off").addEventListener("click", function() {
        const st = extension_settings[MODULE_NAME] = extension_settings[MODULE_NAME] || {};
        st.portraitScale = "";
        psizeVal.textContent = "off";
        psizeInput.value = "2.5";
        saveSettingsDebounced();
        applyDisplayTweaks();
      });
    }
    card.querySelector("#bh-conn2-url-use").addEventListener("click", () => {
      const url = card.querySelector("#bh-conn2-url").value.trim();
      if (!url) return;
      setEndpoint(url);
      renderConnStatus(statusEl);
      banner("Beholder extractor set to the local endpoint");
    });
    const sel = card.querySelector("#bh-conn2-sel");
    const truthy = (v) => v === true || v === "true";
    const NON_TEXT = /* @__PURE__ */ new Set(["image_generation", "video_generation"]);
    const isTextConn = (c) => c && !NON_TEXT.has(c.provider) && !c.comfyuiWorkflow && !c.imageService && !c.imageEndpointId && !c.imageGenerationSource;
    const fillConns = (conns) => {
      const usable = (conns || []).filter(isTextConn);
      if (!usable.length) {
        sel.innerHTML = `<option value="">No text/LLM connections \u2014 add one in Marinara \u2192 Connections</option>`;
        return;
      }
      sel.innerHTML = `<option value="">Pick a connection\u2026</option>` + usable.map((c) => {
        const keyless = !!c.baseUrl && (c.apiKeyEncrypted === "" || c.apiKeyEncrypted == null);
        const tags = [];
        if (truthy(c.isDefault)) tags.push("main");
        if (truthy(c.defaultForAgents)) tags.push("agent");
        const label = `${c.name}${tags.length ? " [" + tags.join(", ") + "]" : ""}${keyless ? "" : " \xB7 keyed"}`;
        return `<option value="${escapeHtmlLite(c.id)}" data-keyless="${keyless ? 1 : 0}" data-baseurl="${escapeHtmlLite(c.baseUrl || "")}" data-name="${escapeHtmlLite(c.name)}">${escapeHtmlLite(label)}</option>`;
      }).join("");
      if (s.meConnectionId) sel.value = s.meConnectionId;
    };
    if (connCache) {
      fillConns(connCache);
    } else {
      try {
        const r = await marinara.apiFetch("/connections");
        connCache = Array.isArray(r) ? r : [];
      } catch {
        connCache = [];
      }
      fillConns(connCache);
    }
    card.querySelector("#bh-conn2-conn-use").addEventListener("click", () => {
      const opt = sel.selectedOptions && sel.selectedOptions[0];
      if (!opt || !opt.value) return;
      const keyless = opt.dataset.keyless === "1" && !!opt.dataset.baseurl;
      useConnection(opt.value, opt.dataset.name, keyless, opt.dataset.baseurl);
      banner(`Beholder extractor set to ${opt.dataset.name}${keyless ? " (direct)" : " (via Marinara)"}`);
      renderConnStatus(statusEl);
    });
  }
  function rebrandStText() {
    const scope = document.getElementById("beholder_panel");
    if (!scope) return;
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    const hits = [];
    let n;
    while (n = walker.nextNode()) if (/SillyTavern/i.test(n.nodeValue)) hits.push(n);
    for (const t of hits) t.nodeValue = t.nodeValue.replace(/SILLYTAVERN/g, "MARINARA").replace(/SillyTavern/g, "Marinara");
    const w2 = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    let m;
    while (m = w2.nextNode()) if (/\bST theme\b/.test(m.nodeValue)) m.nodeValue = m.nodeValue.replace(/\bST theme\b/g, "Marinara theme");
  }
  function startDriver() {
    jquery_module_default(() => {
      mountBaseline();
      setTimeout(async () => {
        seenChat = activeChatId();
        loadChatMeta(seenChat);
        void maybeSyncScene(seenChat);
        marinara.apiFetch("/connections").then((r) => {
          connCache = Array.isArray(r) ? r : [];
        }).catch(() => {
        });
        await refreshChars();
        await drivePump(true);
        await eventSource.emit(event_types.CHAT_CHANGED);
        ensureDockInit();
        applyModeVisibility();
        rebrandStText();
        mountHudToggle();
        mountPanelClose();
        applyDisplayTweaks();
        marinara.on(window, "resize", applyMobileLayout);
        syncDockOffset();
        marinara.on(window, "resize", syncDockOffset);
        const _mainEl = document.querySelector(".mari-main");
        if (_mainEl && typeof ResizeObserver !== "undefined") {
          try {
            new ResizeObserver(syncDockOffset).observe(_mainEl);
          } catch {
          }
        }
        if (typeof MutationObserver !== "undefined") {
          let keeperPending = false;
          try {
            new MutationObserver(() => {
              if (keeperPending) return;
              keeperPending = true;
              requestAnimationFrame(() => {
                keeperPending = false;
                if (currentMode === "roleplay" && !document.querySelector(".bh-hud-toggle")) mountHudToggle();
              });
            }).observe(document.body, { childList: true, subtree: true });
          } catch {
          }
        }
        document.body.addEventListener("click", (e) => {
          const t = e.target;
          if (!(t && t.closest && t.closest("#beholder_panel .beholder-tool-btn[data-view]"))) return;
          let tries = 0;
          const tick = () => {
            void injectConnCardIntoSettings();
            rebrandStText();
            if (++tries < 16 && !document.querySelector("#bh-conn2")) marinara.setTimeout(tick, 20);
          };
          tick();
        }, true);
        marinara.on(window, "marinara:generation-complete", () => void drivePump());
        let bhNearBottom = true;
        const bhScroller = () => document.querySelector(".mari-messages-scroll, .rpg-chat-messages-mobile");
        const bhIsScroller = (el) => !!(el && el.classList && (el.classList.contains("mari-messages-scroll") || el.classList.contains("rpg-chat-messages-mobile")));
        document.addEventListener("scroll", (e) => {
          const el = e.target;
          if (!bhIsScroller(el)) return;
          bhNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 200;
        }, true);
        marinara.on(window, "marinara:generation-complete", () => {
          if (currentMode !== "roleplay" || !bhNearBottom) return;
          const pin = () => {
            const el = bhScroller();
            if (el) el.scrollTop = el.scrollHeight;
          };
          requestAnimationFrame(() => requestAnimationFrame(pin));
          marinara.setTimeout(pin, 140);
          marinara.setTimeout(pin, 400);
        });
        let moTimer = null;
        marinara.observe(
          document.body,
          () => {
            if (moTimer) return;
            moTimer = marinara.setTimeout(() => {
              moTimer = null;
              ensureDockInit();
              mountHudToggle();
              mountPanelClose();
              syncDockOffset();
              if (currentMode === "roleplay") window.__beholderMountNoteBox?.();
              void injectConnCardIntoSettings();
              rebrandStText();
              void drivePump();
            }, 1e3);
          },
          { childList: true, subtree: true }
        );
        marinara.setInterval(() => void onChatMaybeChanged(), 1200);
      }, 800);
    });
  }
  startDriver();

  // normalizer.js
  var TONE_ADVERB = {
    quiet: "quietly",
    dry: "drily",
    tired: "tiredly",
    cold: "coldly",
    soft: "softly",
    sharp: "sharply",
    flat: "flatly",
    grim: "grimly",
    warm: "warmly",
    calm: "calmly",
    firm: "firmly",
    gentle: "gently",
    harsh: "harshly",
    bitter: "bitterly",
    weary: "wearily",
    sad: "sadly",
    angry: "angrily",
    nervous: "nervously",
    cheerful: "cheerfully",
    breathless: "breathlessly",
    hoarse: "hoarsely",
    amused: "with amusement"
  };
  function toneToAdverb(tone) {
    return TONE_ADVERB[(tone || "").trim().toLowerCase()] || "";
  }
  function titleCase(s) {
    return (s || "").trim().toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase());
  }
  function decodeEntities(s) {
    return s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  }
  function attributeDialogue(speech, name, adverb) {
    speech = (speech || "").trim().replace(/^"+|"+$/g, "").trim();
    const said = `${name} said${adverb ? " " + adverb : ""}`;
    const last = speech.slice(-1);
    if (last === ".") return `"${speech.slice(0, -1)}," ${said}.`;
    if (last === "?" || last === "!") return `"${speech}" ${said}.`;
    return `"${speech}," ${said}.`;
  }
  function normalize(message, personaName2 = null) {
    let text = message || "";
    text = text.replace(/[(\[]+\s*OOC:[^)\]]*[)\]]+/gi, "");
    text = text.replace(
      /^([A-Z][A-Za-z'\- ]+?)\s*\(([^)]+)\):\s*"([^"]+)"\s*$/gm,
      (_m, name, tone, speech) => attributeDialogue(speech, name.trim(), toneToAdverb(tone))
    );
    text = text.replace(
      /^([A-Z][A-Z'\- ]+?)\s*\(([^)]+)\):\s*(.+?)\s*$/gm,
      (_m, name, tone, speech) => attributeDialogue(speech, titleCase(name), toneToAdverb(tone))
    );
    text = text.replace(/^\s*\[([^\]]+)\]\s*$/gm, (_m, inner) => {
      let s = inner.trim();
      if (s && !/[.!?]$/.test(s)) s += ".";
      return s;
    });
    text = text.replace(/\[\/?[a-z][a-z0-9=#:_,\- ]*\]/gi, "");
    text = text.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n\n").replace(/<[^>]+>/g, "");
    text = decodeEntities(text);
    text = text.replace(/\*\*([^*]+?)\*\*/g, "$1").replace(/__([^_]+?)__/g, "$1").replace(/~~([^~]+?)~~/g, "$1").replace(/(?<![A-Za-z0-9])_([^_\n]+?)_(?![A-Za-z0-9])/g, "$1");
    text = text.replace(/```[a-zA-Z]*\n?/g, "").replace(/^\s{0,3}#{1,6}\s+/gm, "").replace(/^\s{0,3}>\s?/gm, "").replace(/^\s{0,3}[-*+]\s+/gm, "");
    text = text.replace(/\*([^*]+?)\*/g, (_m, inner) => {
      let s = inner.trim();
      if (s && !/[.!?]$/.test(s)) s += ".";
      return s;
    });
    text = text.replace(/[ \t]*\n[ \t]*/g, "\n").replace(/\n{2,}/g, " ").replace(/\n/g, " ").replace(/[ \t]{2,}/g, " ").trim();
    return text;
  }

  // short_pass_prompts.js
  var SHORT_PASS_PROMPTS = {
    worn: `You extract ONLY worn clothing/items. From THIS turn's prose, emit what changed about characters' WORN items.
Track only the persona (output as "self") and characters with a proper name. Use only valid body slots.
- item = simplest singular noun; material/color/damage go in their own fields ("leather jacket" -> {"item":"jacket","material":"leather"}).
- Multi-slot garments cover EVERY slot they occupy (a dress -> chest+back+waist+both legs+both shoulders; pants -> waist+both legs; gloves -> both hands; boots -> both feet).
- Descriptive establishment ("she wears X", "dressed in Y", "an outfit of Z") IS a change.
- When a character REMOVES / takes off a specific garment (or changes OUT of it), emit "worn_remove": ["<item>"] on each slot it occupied \u2014 name the garment. Only remove what the prose SHOWS coming off; garments not mentioned as removed STAY on.
- Bind each garment to its OWNER: "his/her/their X" routes to that clause's subject/possessor, NOT the nearest name or the persona; on ambiguity prefer a NAMED character over self.
- Items shown only in a portrait/photo/screen/mirror, or worn by a mount or vehicle (barding, a mech's canopy), belong to NO real character \u2014 omit them.
- Do NOT invent items the prose doesn't state; do NOT re-emit unchanged items already in the state.
- damage is structural only (torn/cracked/broken), never dirt or blood: pristine|damaged|broken.
Output JSON only, exactly one of:
{"changed": false}
{"changed": true, "delta": {"<char>": {"body": {"<slot>": {"worn": [{"item": "<noun>", "material": "<opt>", "color": "<opt>", "damage": "pristine"}], "worn_remove": ["<item>"]}}}}}
Use "worn": [] to clear a slot entirely (fully bare).`,
    wounds: `You extract ONLY wounds/injuries. From THIS turn's prose, emit what changed about characters' injuries.
Track only the persona (output as "self") and named characters. Use only valid body slots.
- Emit a wound for ANY injury evident this turn: newly inflicted OR already-sustained/described (a character shown bleeding, an old wound reopening), and on ANY named character \u2014 not just live on-screen hits to the persona.
- The subject of a perception verb (sees/notices/watches/observes) is the OBSERVER, not the owner \u2014 bind a perceived wound to the party it is ON, never the observer/self. Keep counts as stated ("two cuts" = two). An old scar merely recalled, not freshly wounded, is not a change.
- text = short injury phrase ("gash", "burn", "stab", "fracture").
- severity: minor | serious | critical.  bleeding: true | false.
Output JSON only, exactly one of:
{"changed": false}
{"changed": true, "delta": {"<char>": {"body": {"<slot>": {"wounds": [{"text": "<phrase>", "severity": "minor", "bleeding": false}]}}}}}`,
    holding: `You extract ONLY items HELD in a hand. From THIS turn's prose, emit what changed about what characters hold.
Track only the persona (output as "self") and named characters. Only left_hand / right_hand.
- Held = grasped/wielded right now (sword in hand, a cup, a phone). NOT worn \u2014 a sheathed sword is worn at the waist, not held.
- Picking up = set holding; setting down / sheathing / putting on = clear holding ({}).
Output JSON only, exactly one of:
{"changed": false}
{"changed": true, "delta": {"<char>": {"body": {"right_hand": {"holding": {"item": "<noun>"}}}}}}
Use "holding": {} to clear a hand.`,
    species: `You extract ONLY species. From THIS turn's prose, emit a character's species when it is first established or changes.
Track only the persona (output as "self") and named characters.
- Assign a species ONLY from a creature-kind predicated of THIS character's OWN body (a living gargoyle/android/lamia that IS the character). NEVER from a statue/carving, a species named only as a topic/faction/blood-status, or a scenery creature \u2014 omit those.
- For non-human species with extra anatomy, also emit empty exotic-slot stubs as {}: tail, hind_left_leg, hind_right_leg, hind_left_foot, hind_right_foot.
Output JSON only, exactly one of:
{"changed": false}
{"changed": true, "delta": {"<char>": {"species": "<species>", "body": {"tail": {}}}}}`,
    flags: `You extract ONLY bare and missing flags. From THIS turn's prose, emit what changed.
Track only the persona (output as "self") and named characters. Use only valid body slots.
- bare = true when a slot becomes exposed/naked (clothing removed and nothing underneath).
- missing = true when a body part is severed/amputated/absent.
Output JSON only, exactly one of:
{"changed": false}
{"changed": true, "delta": {"<char>": {"body": {"<slot>": {"bare": true, "missing": false}}}}}`
  };
  var LANE_ORDER = ["worn", "wounds", "holding", "species", "flags"];
  var SHORT_PASS_TAG = "xattr_v1";

  // extractor.js
  var EXTRACTION_SYSTEM_V2_SHORT = `You track character physical state in roleplay. Given the prior state (if any) and the new message, output
ONLY a JSON delta of what CHANGED \u2014 clothing put on / removed / damaged, new wounds, items held, limbs lost.
Emit nothing for unchanged state. No change -> {"changed": false}.

Shape (emit only the fields the prose shows):
{"changed": true, "delta": {"<Name>": {"body": {"<slot>": {
  "worn":   [{"item": "...", "color": "...", "material": "...", "damage": "pristine|damaged|broken"}],
  "wounds": [{"text": "...", "severity": "minor|serious|critical", "bleeding": true|false}],
  "holding":{"item": "..."},
  "missing": true, "bare": true }}}}}

slots: head face neck chest back waist {left,right}_{shoulder,arm,hand,leg,foot,eye,ear} mouth tail
       hind_{left,right}_{leg,foot}
A garment goes on EVERY slot it physically covers (a coat -> chest, back, both shoulders, both arms).

Example -- message: "She tugs her grey wool coat tighter and grips the lantern."
{"changed": true, "delta": {"Mara": {"body": {
  "chest":{"worn":[{"item":"coat","color":"grey","material":"wool","damage":"pristine"}]},
  "back":{"worn":[{"item":"coat","color":"grey","material":"wool","damage":"pristine"}]},
  "left_shoulder":{"worn":[{"item":"coat","color":"grey","material":"wool","damage":"pristine"}]},
  "right_shoulder":{"worn":[{"item":"coat","color":"grey","material":"wool","damage":"pristine"}]},
  "left_arm":{"worn":[{"item":"coat","color":"grey","material":"wool","damage":"pristine"}]},
  "right_arm":{"worn":[{"item":"coat","color":"grey","material":"wool","damage":"pristine"}]},
  "right_hand":{"holding":{"item":"lantern"}}}}}}

Example -- message: "He just nods, saying nothing."
{"changed": false}`;
  function buildUserMessage(canonical, prevState, personaName2 = null) {
    const parts = [];
    if (personaName2) parts.push(`Persona: ${personaName2}`);
    if (prevState && Object.keys(prevState).length > 0) {
      parts.push(`Current state:
${JSON.stringify(prevState)}
`);
    }
    parts.push(`Narration:
${canonical}`);
    return parts.join("\n");
  }
  function extractJson(text) {
    let s = (text || "").trim();
    if (s.startsWith("```")) {
      s = s.replace(/^```[a-zA-Z]*\n?/, "").replace(/\n?```$/, "").trim();
    }
    const start = s.indexOf("{");
    if (start < 0) return null;
    const stack = [];
    let inStr = false, esc2 = false;
    for (let i = start; i < s.length; i++) {
      const c = s[i];
      if (inStr) {
        if (esc2) esc2 = false;
        else if (c === "\\") esc2 = true;
        else if (c === '"') inStr = false;
        continue;
      }
      if (c === '"') {
        inStr = true;
        continue;
      }
      if (c === "{" || c === "[") stack.push(c);
      else if (c === "}" || c === "]") {
        stack.pop();
        if (stack.length === 0) {
          try {
            return JSON.parse(s.slice(start, i + 1));
          } catch {
            return null;
          }
        }
      }
    }
    if (stack.length > 0) {
      let repaired = s.slice(start).replace(/,\s*$/, "");
      for (let j = stack.length - 1; j >= 0; j--) {
        repaired += stack[j] === "{" ? "}" : "]";
      }
      try {
        return JSON.parse(repaired);
      } catch {
        return null;
      }
    }
    return null;
  }
  function _sleepBackoff(attempt, signal) {
    const base = Math.min(300 * 2 ** attempt, 2e3);
    const delay = base + Math.random() * 200;
    return new Promise((resolve, reject) => {
      const t = setTimeout(resolve, delay);
      if (signal) {
        if (signal.aborted) {
          clearTimeout(t);
          reject(new DOMException("Aborted", "AbortError"));
          return;
        }
        signal.addEventListener("abort", () => {
          clearTimeout(t);
          reject(new DOMException("Aborted", "AbortError"));
        }, { once: true });
      }
    });
  }
  var _TRANSIENT_STATUS = /* @__PURE__ */ new Set([429, 502, 503, 504]);
  var _maxConcurrency = 1;
  var _inflight = 0;
  var _pending = [];
  function setExtractConcurrency(n) {
    _maxConcurrency = Math.max(1, Math.min(64, Math.floor(Number(n)) || 1));
  }
  function _acquireSlot() {
    return new Promise((resolve) => {
      if (_inflight < _maxConcurrency) {
        _inflight++;
        resolve();
      } else _pending.push(resolve);
    });
  }
  function _releaseSlot() {
    _inflight--;
    if (_pending.length > 0 && _inflight < _maxConcurrency) {
      _inflight++;
      _pending.shift()();
    }
  }
  async function callChatCompletions({
    endpoint,
    model,
    system,
    user,
    apiKey = "",
    temperature = 0,
    maxTokens = 512,
    signal,
    maxRetries = 4
  }) {
    const url = endpoint.replace(/\/+$/, "") + "/chat/completions";
    const headers = { "Content-Type": "application/json" };
    if (apiKey) headers["Authorization"] = "Bearer " + apiKey;
    const payload = {
      model,
      temperature,
      max_tokens: maxTokens,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ]
    };
    await _acquireSlot();
    try {
      for (let attempt = 0; ; attempt++) {
        let resp;
        try {
          resp = await fetch(url, { method: "POST", headers, body: JSON.stringify(payload), signal });
        } catch (err2) {
          if (err2?.name === "AbortError" || attempt >= maxRetries) throw err2;
          await _sleepBackoff(attempt, signal);
          continue;
        }
        if (resp.ok) {
          const data = await resp.json();
          return data?.choices?.[0]?.message?.content ?? "";
        }
        const body = await resp.text().catch(() => "");
        if (_TRANSIENT_STATUS.has(resp.status) && attempt < maxRetries) {
          await _sleepBackoff(attempt, signal);
          continue;
        }
        throw new Error(`extractor endpoint ${resp.status}: ${body.slice(0, 200)}`);
      }
    } finally {
      _releaseSlot();
    }
  }
  var EXTRACT_TEMPERATURE = 0;
  var EXTRACT_MAX_TOKENS = 4096;
  function deepMergeDelta(dst, src) {
    for (const [k, v] of Object.entries(src || {})) {
      if (v && typeof v === "object" && !Array.isArray(v) && dst[k] && typeof dst[k] === "object" && !Array.isArray(dst[k])) {
        deepMergeDelta(dst[k], v);
      } else {
        dst[k] = v;
      }
    }
    return dst;
  }
  async function extract({ canonical, prevState, personaName: personaName2, cfg, signal, transport, maxTokens = EXTRACT_MAX_TOKENS }) {
    const user = buildUserMessage(canonical, prevState, personaName2);
    const callOne = async (system) => {
      const raw2 = transport ? await transport.chatCompletion({ system, user, temperature: EXTRACT_TEMPERATURE, maxTokens, signal }) : await callChatCompletions({
        endpoint: cfg.endpoint,
        model: cfg.model,
        apiKey: cfg.apiKey,
        system,
        user,
        temperature: EXTRACT_TEMPERATURE,
        maxTokens,
        signal
      });
      const parsed2 = extractJson(raw2);
      return {
        raw: raw2,
        parsed: parsed2,
        delta: unwrapV2(parsed2) || {},
        parseFailed: parsed2 == null && typeof raw2 === "string" && raw2.trim() !== ""
      };
    };
    if (cfg.systemPrompt) {
      return callOne(cfg.systemPrompt);
    }
    const results = await Promise.all(LANE_ORDER.map((lane) => callOne(SHORT_PASS_PROMPTS[lane])));
    let delta = {};
    for (const r of results) delta = deepMergeDelta(delta, r.delta);
    const parseFailed = results.some((r) => r.parseFailed);
    const raw = LANE_ORDER.map((lane, i) => `[${lane}] ${results[i].raw ?? ""}`).join("\n");
    const parsed = Object.fromEntries(LANE_ORDER.map((lane, i) => [lane, results[i].parsed]));
    return { raw, parsed, delta, parseFailed };
  }

  // validator_data.js
  var VALID_SLOTS = ["back", "chest", "face", "head", "hind_left_foot", "hind_left_leg", "hind_right_foot", "hind_right_leg", "left_arm", "left_ear", "left_eye", "left_foot", "left_hand", "left_leg", "left_shoulder", "mouth", "neck", "right_arm", "right_ear", "right_eye", "right_foot", "right_hand", "right_leg", "right_shoulder", "tail", "waist"];
  var PROXIMAL_OF = { "left_arm": ["left_shoulder"], "left_hand": ["left_shoulder", "left_arm"], "right_arm": ["right_shoulder"], "right_hand": ["right_shoulder", "right_arm"], "left_foot": ["left_leg"], "right_foot": ["right_leg"], "hind_left_foot": ["hind_left_leg"], "hind_right_foot": ["hind_right_leg"] };
  var PASS_BY_BODY_FIELD = { "worn": "worn", "wounds": "wounds", "holding": "holding", "bare": "flags", "missing": "flags" };
  var SPECIES_NO_LEGS = ["lamia", "merfolk", "mermaid", "merman", "naga", "selkie", "siren", "slime", "tritonkin"];
  var STANDARD_LEG_SLOTS = ["left_foot", "left_leg", "right_foot", "right_leg"];
  var SPECIES_QUADRUPED = ["arachne", "centaur", "colt", "dragon", "dragoness", "drake", "drider", "driderkin", "equine", "filly", "foal", "hivewing", "horse", "icewing", "lamia-taur", "leafwing", "mare", "mudwing", "mustang", "nightwing", "palomino", "pony", "rainwing", "sandwing", "seawing", "silkwing", "skywing", "stallion", "taur", "wyrm", "wyrmling"];
  var HIND_LEG_SLOTS = ["hind_left_foot", "hind_left_leg", "hind_right_foot", "hind_right_leg"];
  var MULTI_SLOT_TABLE = { "boots": ["left_foot", "right_foot"], "shoes": ["left_foot", "right_foot"], "sandals": ["left_foot", "right_foot"], "heels": ["left_foot", "right_foot"], "sneakers": ["left_foot", "right_foot"], "slippers": ["left_foot", "right_foot"], "loafers": ["left_foot", "right_foot"], "oxfords": ["left_foot", "right_foot"], "stilettos": ["left_foot", "right_foot"], "flats": ["left_foot", "right_foot"], "platforms": ["left_foot", "right_foot"], "wedges": ["left_foot", "right_foot"], "pumps": ["left_foot", "right_foot"], "trainers": ["left_foot", "right_foot"], "cleats": ["left_foot", "right_foot"], "flip-flops": ["left_foot", "right_foot"], "flip flops": ["left_foot", "right_foot"], "galoshes": ["left_foot", "right_foot"], "waders": ["left_foot", "right_foot"], "snow boots": ["left_foot", "right_foot"], "geta": ["left_foot", "right_foot"], "zori": ["left_foot", "right_foot"], "tabi": ["left_foot", "right_foot"], "moccasins": ["left_foot", "right_foot"], "combat boots": ["left_foot", "right_foot"], "magnetic boots": ["left_foot", "right_foot"], "gloves": ["left_hand", "right_hand"], "mittens": ["left_hand", "right_hand"], "gauntlets": ["left_hand", "right_hand"], "wraps": ["left_hand", "right_hand"], "boxing gloves": ["left_hand", "right_hand"], "oven mitts": ["left_hand", "right_hand"], "vambraces": ["left_arm", "right_arm"], "bracers": ["left_arm", "right_arm"], "armguards": ["left_arm", "right_arm"], "arm guards": ["left_arm", "right_arm"], "forearm guards": ["left_arm", "right_arm"], "pauldrons": ["left_shoulder", "right_shoulder"], "spaulders": ["left_shoulder", "right_shoulder"], "shoulder guards": ["left_shoulder", "right_shoulder"], "shoulder pads": ["left_shoulder", "right_shoulder"], "greaves": ["left_leg", "right_leg"], "shin guards": ["left_leg", "right_leg"], "shin pads": ["left_leg", "right_leg"], "sabatons": ["left_foot", "right_foot"], "glasses": ["left_eye", "right_eye"], "spectacles": ["left_eye", "right_eye"], "eyeglasses": ["left_eye", "right_eye"], "sunglasses": ["left_eye", "right_eye"], "shades": ["left_eye", "right_eye"], "goggles": ["left_eye", "right_eye"], "reading glasses": ["left_eye", "right_eye"], "bifocals": ["left_eye", "right_eye"], "earrings": ["left_ear", "right_ear"], "ear cuffs": ["left_ear", "right_ear"], "ear studs": ["left_ear", "right_ear"], "hoop earrings": ["left_ear", "right_ear"], "ear plugs": ["left_ear", "right_ear"], "ear gauges": ["left_ear", "right_ear"], "pants": ["left_leg", "right_leg", "waist"], "trousers": ["left_leg", "right_leg", "waist"], "leggings": ["left_leg", "right_leg", "waist"], "breeches": ["left_leg", "right_leg", "waist"], "sweatpants": ["left_leg", "right_leg", "waist"], "jeans": ["left_leg", "right_leg", "waist"], "slacks": ["left_leg", "right_leg", "waist"], "cargo pants": ["left_leg", "right_leg", "waist"], "khakis": ["left_leg", "right_leg", "waist"], "chinos": ["left_leg", "right_leg", "waist"], "joggers": ["left_leg", "right_leg", "waist"], "shorts": ["left_leg", "right_leg", "waist"], "capris": ["left_leg", "right_leg", "waist"], "culottes": ["left_leg", "right_leg", "waist"], "hakama": ["left_leg", "right_leg", "waist"], "dhoti": ["left_leg", "right_leg", "waist"], "harem pants": ["left_leg", "right_leg", "waist"], "tights": ["left_leg", "right_leg", "waist"], "skirt": ["left_leg", "right_leg", "waist"], "miniskirt": ["left_leg", "right_leg", "waist"], "kilt": ["left_leg", "right_leg", "waist"], "sarong": ["left_leg", "right_leg", "waist"], "lungi": ["left_leg", "right_leg", "waist"], "wrap skirt": ["left_leg", "right_leg", "waist"], "robe": ["back", "chest", "left_leg", "right_leg", "waist"], "kimono": ["back", "chest", "left_leg", "left_shoulder", "right_leg", "right_shoulder", "waist"], "yukata": ["back", "chest", "left_leg", "left_shoulder", "right_leg", "right_shoulder", "waist"], "habit": ["back", "chest", "left_leg", "left_shoulder", "right_leg", "right_shoulder", "waist"], "cassock": ["back", "chest", "left_leg", "left_shoulder", "right_leg", "right_shoulder", "waist"], "overalls": ["back", "chest", "left_leg", "left_shoulder", "right_leg", "right_shoulder", "waist"], "coveralls": ["back", "chest", "left_leg", "left_shoulder", "right_leg", "right_shoulder", "waist"], "hose": ["left_leg", "right_leg", "waist"], "stockings": ["left_leg", "right_leg"], "socks": ["left_foot", "right_foot"], "tabi socks": ["left_foot", "right_foot"] };
  var COLOR_WORDS_FOR_ITEM_CHECK = ["amber", "apricot", "aqua", "aquamarine", "ash", "azure", "beige", "black", "blood red", "blood-red", "blue", "bone white", "bone-white", "brown", "burgundy", "cerulean", "charcoal", "chartreuse", "cobalt", "cream", "crimson", "cyan", "dark blue", "dark green", "dark red", "dark-blue", "dark-red", "deep blue", "deep red", "deep-blue", "deep-red", "emerald", "forest green", "forest-green", "fuchsia", "gold", "golden", "gray", "green", "grey", "indigo", "ivory", "jet black", "jet-black", "khaki", "khaki green", "khaki-green", "lavender", "light blue", "light green", "light-blue", "lilac", "lime", "magenta", "maroon", "mauve", "midnight blue", "midnight-blue", "mint", "mustard", "navy", "ocher", "ochre", "off-white", "olive", "orange", "pale blue", "pale pink", "peach", "pink", "pitch black", "pitch-black", "plum", "purple", "red", "rose", "royal blue", "rust", "saffron", "sapphire", "scarlet", "sea green", "sea-green", "sepia", "sienna", "sky blue", "sky-blue", "slate", "snow white", "snow-white", "tan", "taupe", "teal", "turquoise", "umber", "vermilion", "vermillion", "violet", "white", "wine red", "wine-red", "yellow"];
  var ITEM_CATEGORIES = { "bag": { "items": ["backpack", "bag", "belt bag", "briefcase", "bum bag", "clutch", "duffel", "duffel bag", "duffle", "duffle bag", "fanny pack", "go-bag", "handbag", "haversack", "hip pack", "kit bag", "knapsack", "messenger bag", "pouch", "purse", "rucksack", "saddlebag", "satchel", "shoulder bag", "sling", "sling bag", "tactical bag", "tote", "tote bag"], "allowed_slots": ["back", "left_shoulder", "right_shoulder", "waist"], "paired_slots": [], "severity": "warning", "fix_hint": "Bags are HELD (move to holding pass) OR strapped over a shoulder/back/waist. NEVER on chest, face, head, eye, etc. Most casual bags belong in holding; over-the-shoulder bags go on left_shoulder/right_shoulder; backpacks/rucksacks on back." }, "wristwear": { "items": ["apple watch", "arm band", "armband", "armlet", "bangle", "bracelet", "cuff", "fitbit", "fitness tracker", "smartwatch", "watch", "wrist cuff", "wristband", "wristwatch"], "allowed_slots": ["left_arm", "right_arm"], "paired_slots": [], "severity": "warning", "fix_hint": "Wrist/arm items conventionally go on left_arm or right_arm (the schema places the wrist on the arm slot). Hand-mounted devices (sci-fi/cyber) are legitimate; verify against prose." }, "eyewear_paired": { "items": ["bifocals", "eyeglasses", "glasses", "goggles", "lorgnette", "pince-nez", "reading glasses", "shades", "ski goggles", "spectacles", "sunglasses", "swim goggles", "vr goggles"], "allowed_slots": ["face", "head", "left_eye", "right_eye"], "paired_slots": [["left_eye", "right_eye"]], "severity": "warning", "fix_hint": "Glasses/goggles conventionally cover BOTH eyes \u2014 emit on left_eye AND right_eye (frame may also rest on 'face' or 'head'). Single-eye cybernetic implants / magical lenses exist; verify against prose." }, "eyewear_single": { "items": ["eye patch", "eyepatch", "monocle"], "allowed_slots": ["left_eye", "right_eye"], "paired_slots": [], "severity": "warning", "fix_hint": "Monocles/eyepatches conventionally go on one eye slot." }, "rings": { "items": ["engagement ring", "knuckle ring", "promise ring", "ring", "signet ring", "thumb ring", "wedding ring"], "allowed_slots": ["left_hand", "right_hand"], "paired_slots": [], "severity": "warning", "fix_hint": "Rings conventionally go on left_hand or right_hand. Ring-on-chain (worn around the neck) is legitimate \u2014 keep on neck slot with item='ring on chain' or similar." }, "neckwear": { "items": ["amulet", "ascot", "bandanna around neck", "bow tie", "bowtie", "chain", "choker", "collar", "cravat", "locket", "muffler", "neckerchief", "necklace", "necktie", "pendant", "scapular", "scarf", "tie", "torc", "torque"], "allowed_slots": ["neck"], "paired_slots": [], "severity": "warning", "fix_hint": "Necklaces, pendants, ties, scarves conventionally go on the 'neck' slot. A very long pendant resting on chest is legitimate \u2014 verify against prose before changing." }, "earwear": { "items": ["ear cuff", "ear cuffs", "ear gauge", "ear gauges", "ear hoop", "ear hoops", "ear plug", "ear plugs", "ear stud", "ear studs", "earring", "earrings", "hoop earring", "hoop earrings", "stud earring"], "allowed_slots": ["left_ear", "right_ear"], "paired_slots": [["left_ear", "right_ear"]], "severity": "warning", "fix_hint": "Earrings conventionally go on left_ear/right_ear. Earrings worn as a PAIR (plural in prose) usually appear on BOTH ears." }, "headwear": { "items": ["ballcap", "bandana", "bandanna", "baseball cap", "beanie", "boater", "bowler", "cap", "circlet", "crown", "diadem", "fedora", "fez", "hat", "head band", "headband", "helm", "helmet", "hood", "kerchief", "kippah", "kufi", "panama hat", "tam", "tam-o-shanter", "tiara", "top hat", "tophat", "toque", "trilby", "turban", "ushanka", "yarmulke"], "allowed_slots": ["head"], "paired_slots": [], "severity": "warning", "fix_hint": "Hats, helmets, hoods, headbands conventionally go on the 'head' slot. Symbolic gestures (hat held to chest in mourning) belong in the holding pass, not worn." }, "headwear_face_overlap": { "items": ["balaclava", "executioner's hood", "ski mask", "veil"], "allowed_slots": ["face", "head"], "paired_slots": [], "severity": "warning", "fix_hint": "Veils/balaclavas cover head AND face \u2014 emit on both slots if the prose describes full coverage; head OR face alone is acceptable for partial coverage." }, "gloves": { "items": ["boxing glove", "boxing gloves", "fingerless glove", "fingerless gloves", "gauntlet", "gauntlets", "glove", "gloves", "mitt", "mitten", "mittens", "mitts", "tactical glove", "tactical gloves"], "allowed_slots": ["left_hand", "right_hand"], "paired_slots": [["left_hand", "right_hand"]], "severity": "warning", "fix_hint": "Gloves/mittens/gauntlets conventionally go on left_hand AND right_hand. One-handed (e.g. magic-using hand, one-armed character, single fingerless glove) is legitimate \u2014 verify against prose." }, "footwear": { "items": ["ankle boot", "ankle boots", "boot", "boots", "combat boot", "combat boots", "flip-flop", "flip-flops", "flipflops", "geta", "heel", "heels", "high heel", "high heels", "knee-high boot", "knee-high boots", "loafer", "loafers", "moccasin", "moccasins", "pump", "pumps", "sandal", "sandals", "shoe", "shoes", "slipper", "slippers", "sneaker", "sneakers", "sock", "socks", "stocking", "stockings", "tabi", "thigh-high boot", "thigh-high boots", "trainer", "trainers", "work boot", "work boots", "zori"], "allowed_slots": ["hind_left_foot", "hind_right_foot", "left_foot", "right_foot"], "paired_slots": [["left_foot", "right_foot"]], "severity": "warning", "fix_hint": "Footwear conventionally goes on left_foot AND right_foot. Single-foot wear (lost boot, prosthetic) is legitimate \u2014 verify." }, "legwear_lower": { "items": ["breeches", "culottes", "dhoti", "hakama", "jeans", "joggers", "khakis", "kilt", "leggings", "lungi", "maxi skirt", "midi skirt", "miniskirt", "pantaloons", "pants", "sarong", "shorts", "skirt", "skort", "slacks", "sweatpants", "tights", "tracksuit bottoms", "trousers"], "allowed_slots": ["hind_left_leg", "hind_right_leg", "left_leg", "right_leg", "waist"], "paired_slots": [["left_leg", "right_leg"]], "severity": "warning", "fix_hint": "Pants/skirts/trousers conventionally cover both legs (and anchor at the waist). Emit on left_leg AND right_leg, plus 'waist' if the prose emphasizes the waistband. Asymmetric garments (single pant-leg, harem-style) are legitimate \u2014 verify." }, "waistwear": { "items": ["belt", "cummerbund", "garter belt", "girdle", "money belt", "obi", "sash", "sword belt", "tool belt", "utility belt", "weapon belt"], "allowed_slots": ["waist"], "paired_slots": [], "severity": "warning", "fix_hint": "Belts/sashes conventionally go on the 'waist' slot. Baldrics (strap-across-chest weapon belts) are legitimate on chest/back \u2014 verify against prose." }, "vambraces": { "items": ["arm guard", "arm guards", "armguard", "armguards", "bracer", "bracers", "forearm guard", "forearm guards", "vambrace", "vambraces"], "allowed_slots": ["left_arm", "right_arm"], "paired_slots": [["left_arm", "right_arm"]], "severity": "error", "fix_hint": "Vambraces/bracers are forearm armor: left_arm AND right_arm." }, "pauldrons": { "items": ["pauldron", "pauldrons", "shoulder armor", "shoulder armour", "shoulder guard", "shoulder guards", "shoulder pad", "shoulder pads", "spaulder", "spaulders"], "allowed_slots": ["left_shoulder", "right_shoulder"], "paired_slots": [["left_shoulder", "right_shoulder"]], "severity": "error", "fix_hint": "Pauldrons/spaulders/shoulder guards go on left_shoulder AND right_shoulder." }, "greaves": { "items": ["greave", "greaves", "shin armor", "shin armour", "shin guard", "shin guards", "shin pad", "shin pads"], "allowed_slots": ["hind_left_leg", "hind_right_leg", "left_leg", "right_leg"], "paired_slots": [["left_leg", "right_leg"]], "severity": "error", "fix_hint": "Greaves/shin guards go on left_leg AND right_leg." }, "sabatons": { "items": ["armored boot", "armored boots", "foot armor", "foot armour", "metal boot", "metal boots", "sabaton", "sabatons"], "allowed_slots": ["hind_left_foot", "hind_right_foot", "left_foot", "right_foot"], "paired_slots": [["left_foot", "right_foot"]], "severity": "error", "fix_hint": "Sabatons/foot armor go on left_foot AND right_foot." }, "masks": { "items": ["carnival mask", "domino mask", "face mask", "gas mask", "mask", "n95", "oxygen mask", "respirator", "ski mask", "surgical mask"], "allowed_slots": ["face"], "paired_slots": [], "severity": "warning", "fix_hint": "Masks/respirators conventionally go on the 'face' slot. Pushed up onto the head between uses \u2192 head; held in hand \u2192 holding." }, "mouthwear": { "items": ["gag", "lip stud", "muzzle", "tongue piercing", "tongue ring"], "allowed_slots": ["face", "mouth"], "paired_slots": [], "severity": "warning", "fix_hint": "Mouth/lip items conventionally go on 'mouth' (or 'face' for muzzles)." } };
  var MINOR_DEFAULT_INJURY_NOUNS = ["abrasion", "bloody nose", "bruise", "cut", "graze", "light bruise", "light scratch", "minor cut", "nick", "nosebleed", "rope burn", "rope-burn", "scrape", "scratch", "shallow cut", "shallow graze", "shallow scratch", "skinned knee", "small bruise", "small cut", "small graze", "split lip", "thin cut"];
  var SEVERITY_ESCALATORS_PROSE = ["agonizing", "agony", "blackness", "blackout", "blinding", "blinding pain", "broken", "can not move", "can not stand", "can't move", "can't stand", "concussed", "concussion", "crunch", "crunching", "deep", "deeper", "deeply", "dislocated", "dislocation", "eyes rolling", "fracture", "fractured", "fracturing", "gushing", "intestines", "knocked out", "limb severed", "pouring", "rolling back", "searing", "severed", "shatter", "shattered", "shattering", "skull fracture", "snap", "snapped", "soaking", "spine", "streaming", "unconscious", "vision blurred", "vision narrowing", "vision swimming", "white-hot", "whitehot"];
  var STRUCTURAL_DAMAGE_CUES = ["barely any soles", "barely even holding onto", "barely holding onto", "barely holding together", "bent", "blunted", "blunting", "break", "breaking", "breaks", "broken", "buckle snapped", "buckled", "buckles", "buckling", "burned", "burnt", "caved in", "charred", "chip", "chipped", "chips", "crack", "cracked", "cracking", "cracks", "crushed", "cut", "cuts", "dent", "dented", "dents", "dulled", "falling apart", "fell apart", "fray", "frayed", "fraying", "fraying seam", "gouge", "gouged", "gouges", "holes", "loose stitching", "melt", "melted", "melting", "melts", "missing buckle", "patched", "patchwork", "patchwork of repairs", "perforated", "pierce", "pierced", "pierces", "piercing", "puncture", "punctured", "punctures", "repaired", "repairs", "rip", "ripped", "ripping", "rips", "scorched", "score marks", "scored", "scratch", "scratched", "scratches", "scratching", "scuff", "scuffed", "scuffs", "shatter", "shattered", "shattering", "shatters", "shred", "shredded", "shreds", "singed", "slash", "slashed", "slice", "sliced", "snap", "snapped", "snapping", "snaps", "sole flapping", "sole left", "soles left", "splintered", "split", "splits", "splitting", "strap snapped", "strap torn", "tattered", "tear", "tearing", "tears", "thin as your boots", "thin boots", "threadbare", "torn", "unraveled", "unraveling", "unravelled", "unravelling", "warp", "warped", "warping", "warps", "worn through"];
  var SOILING_ONLY_CUES = ["blood soaked", "blood-soaked", "blood-streaked", "bloodied", "bloody", "damp", "dirtied", "dirty", "dust caked", "dust-caked", "dusty", "grass-stained", "grease-stained", "grime", "grimy", "mud caked", "mud-caked", "muddy", "oil-stained", "paint-stained", "smeared", "smudged", "soaked", "soot", "sooty", "stained", "sweat soaked", "sweat-soaked", "sweaty", "vomit", "waterlogged", "wet", "wine-stained"];
  var ARMOR_FORM_PROSE_QUALIFIERS = ["ablative", "ballistic", "breastplate", "brigandine", "ceramic", "chain", "chainmail", "cuirass", "exosuit", "gauntlet", "gauntlets", "gorget", "greave", "greaves", "gunmetal", "hardsuit", "hauberk", "helm", "helmet", "kevlar", "lamellar", "laminar", "mail", "pauldron", "pauldrons", "plate", "power armor", "ringed", "ringmail", "sabatons", "scale", "scaled", "segmented", "splint", "splinted", "studded", "tactical", "vambrace", "vambraces", "visor"];
  var CRITICAL_ESCALATORS = ["severed", "amputat", "bone exposed", "exposed bone", "bone protrud", "compound fracture", "arterial", "spurting", "gushing blood", "blood gushed", "gush of blood", "eviscerat", "disembowel", "bleeding out", "bled out", "near-fatal", "life-threatening", "torn off"];
  var SLOT_CATEGORY_STRIP = { "left_hand": ["earwear", "eyewear_paired", "eyewear_single", "footwear", "headwear", "headwear_face_overlap", "masks", "mouthwear"], "right_hand": ["earwear", "eyewear_paired", "eyewear_single", "footwear", "headwear", "headwear_face_overlap", "masks", "mouthwear"], "left_eye": ["bag", "footwear", "legwear_lower"], "right_eye": ["bag", "footwear", "legwear_lower"], "left_ear": ["bag", "footwear", "legwear_lower"], "right_ear": ["bag", "footwear", "legwear_lower"], "mouth": ["bag", "footwear", "legwear_lower"] };
  var WOUND_SLOT_ANATOMY = { "concussion": ["head"], "black eye": ["face", "left_eye", "right_eye"], "split lip": ["face", "mouth"], "busted lip": ["face", "mouth"], "bloody nose": ["face"], "nosebleed": ["face"], "sprained ankle": ["left_foot", "left_leg", "right_foot", "right_leg"], "twisted ankle": ["left_foot", "left_leg", "right_foot", "right_leg"], "stubbed toe": ["left_foot", "right_foot"] };
  var SPECIES_REJECT_DESCRIPTORS = ["admiral", "captain", "colonel", "corporal", "detective", "general", "inspector", "lieutenant", "marshal", "mudblood", "muggle", "officer", "professor", "pureblood", "sergeant"];
  var HOLDING_ADD_CUES = ["closed around", "closes around", "clutched", "clutches", "drawn", "draws", "draws out", "drew", "grabbed", "grabs", "gripped", "grips", "picked up", "picks up", "pulled out", "pulls out", "scooped up", "scoops up", "seized", "seizes", "snatched", "snatches", "takes hold", "takes up", "took hold", "took up", "unsheathed", "unsheathes", "yanked free"];
  var WORN_DON_CUES = ["buttoned up", "buttons up", "changes into", "donned", "donning", "dons", "draws on", "dressed in", "dresses in", "drew on", "fastened", "fastens", "fits", "fitted", "laced up", "laces up", "lowered the hood", "lowers the hood", "pulled on", "pulled over her head", "pulled over his head", "pulled up over", "pulling on", "pulls on", "pulls over her head", "pulls over his head", "put it on", "put on", "puts it on", "puts on", "putting on", "raised the hood", "raises the hood", "slipped into", "slipped on", "slips into", "slips on", "snapped on", "snaps on", "steps into", "swapped for", "swaps for", "switches to", "threw on", "throws it on", "throws on", "tied on", "ties on", "wears a fresh", "wears a new", "wrapped a", "wrapped the", "wraps a", "wraps the", "zipped up", "zips up"];
  var HAND_WORN_STAPLES = ["bandage", "bandages", "brace", "cast", "mitt", "mitts", "sling", "tape", "wrap", "wraps"];
  var INTERACTION_CUE_PHRASES = ["fiddled with", "fiddles with", "fiddling with", "finger along", "finger brushes", "finger traces", "reached for", "reaches for", "reaches toward", "reaching for", "reaching toward", "rested a hand on", "rests a hand on", "rests her hand on", "rests his hand on", "thumb along", "thumb brushes", "thumb finds", "thumb traces"];
  var MUTEX_GARMENT_CLASSES = { "body_armor": ["aketon", "ballistic vest", "banded mail", "body armor", "body armour", "breastplate", "brigandine", "bulletproof vest", "chain mail", "chainmail", "combat armor", "corselet", "cuirass", "flak jacket", "full plate", "gambeson", "half plate", "half-plate", "hauberk", "kevlar vest", "lamellar", "leather armor", "leather armour", "plackart", "plate armor", "plate armour", "plate carrier", "plate mail", "power armor", "power armour", "ring mail", "riot armor", "scale armor", "scale armour", "scale mail", "splint mail", "studded leather"] };

  // validator.js
  var escapeRe = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  function proseHasPhrase(proseLower, cue) {
    if (cue.includes(" ") || cue.includes("-")) return proseLower.includes(cue);
    return new RegExp(`\\b${escapeRe(cue)}\\b`).test(proseLower);
  }
  function armorFormForItem(proseLower, item) {
    const itemName = String(item.item || "").toLowerCase().trim();
    if (itemName !== "armor") return null;
    const material = String(item.material || "").toLowerCase().trim();
    const haystack = [itemName, material].filter(Boolean).join(" ");
    for (const q of [...ARMOR_FORM_PROSE_QUALIFIERS].sort((a, b) => b.length - a.length)) {
      const qe = escapeRe(q);
      const re = new RegExp(`\\b${qe}\\b(?:\\W+\\w+){0,2}\\W+armor\\b|\\barmor\\W+(?:\\w+\\W+){0,2}${qe}\\b`);
      if (re.test(proseLower) && !haystack.includes(q)) return q;
    }
    return null;
  }
  var S_NO_LEGS = new Set(SPECIES_NO_LEGS);
  var S_STD_LEG = new Set(STANDARD_LEG_SLOTS);
  var S_QUAD = new Set(SPECIES_QUADRUPED);
  var S_HIND = new Set(HIND_LEG_SLOTS);
  var S_VALID_SLOTS = new Set(VALID_SLOTS);
  var COVERABLE_MISSING_SLOTS2 = /* @__PURE__ */ new Set(["left_eye", "right_eye", "left_ear", "right_ear", "mouth"]);
  var MULTI_SLOT = Object.fromEntries(Object.entries(MULTI_SLOT_TABLE).map(([k, v]) => [k, new Set(v)]));
  var canonGarment = (s) => {
    const n = String(s ?? "").trim().toLowerCase();
    return GARMENT_CANON[n] ?? n;
  };
  var MULTI_SLOT_CANON = Object.fromEntries(
    Object.entries(MULTI_SLOT).map(([k, v]) => [canonGarment(k), v])
  );
  var ITEM_TO_CATEGORY = /* @__PURE__ */ new Map();
  for (const [catName, cat] of Object.entries(ITEM_CATEGORIES)) {
    for (const it of cat.items) ITEM_TO_CATEGORY.set(it.toLowerCase(), catName);
  }
  var ITEM_KEYS_SORTED = [...ITEM_TO_CATEGORY.keys()].sort((a, b) => b.length - a.length);
  var SLOT_CAT_STRIP = Object.fromEntries(
    Object.entries(SLOT_CATEGORY_STRIP).map(([slot, cats]) => [slot, new Set(cats)])
  );
  var WOUND_SLOT_ENTRIES = Object.entries(WOUND_SLOT_ANATOMY).map(([k, v]) => [k, new Set(v)]);
  var SPECIES_REJECT = new Set(SPECIES_REJECT_DESCRIPTORS);
  var S_HIND_SET = new Set(HIND_LEG_SLOTS);
  var MUTEX_CLASSES = Object.entries(MUTEX_GARMENT_CLASSES).map(([cls, members]) => [cls, new Set(members)]);
  function mutexGarmentClass(itemName) {
    if (typeof itemName !== "string") return null;
    const n = itemName.toLowerCase().trim();
    if (!n) return null;
    for (const [cls, members] of MUTEX_CLASSES) {
      if (members.has(n)) return cls;
      for (const m of members) {
        if (m.includes(" ") && n.includes(m)) return cls;
      }
      for (const tok of n.split(/[\s-]+/)) {
        if (members.has(tok)) return cls;
      }
    }
    return null;
  }
  function classifyItem(itemName) {
    if (typeof itemName !== "string") return null;
    const norm = itemName.toLowerCase().trim();
    if (!norm) return null;
    if (ITEM_TO_CATEGORY.has(norm)) return ITEM_TO_CATEGORY.get(norm);
    for (const key of ITEM_KEYS_SORTED) {
      if (key.includes(" ") && norm.includes(key)) return ITEM_TO_CATEGORY.get(key);
    }
    for (const tok of norm.split(/[\s-]+/)) {
      if (ITEM_TO_CATEGORY.has(tok)) return ITEM_TO_CATEGORY.get(tok);
    }
    return null;
  }
  var err = (rule_id, path, severity = "error", pass_name = null) => ({ rule_id, path, severity, pass_name });
  var pyTruthy = (v) => {
    if (v === null || v === void 0 || v === false || v === "" || v === 0) return false;
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === "object") return Object.keys(v).length > 0;
    return true;
  };
  var isPresentField = (v) => {
    if (v === null || v === void 0 || v === false) return false;
    if (Array.isArray(v)) return v.length > 0;
    if (v && typeof v === "object") return Object.keys(v).length > 0;
    return true;
  };
  var holdingPresent = (h) => !(h === null || h === void 0 || h === "" || typeof h === "object" && !Array.isArray(h) && Object.keys(h).length === 0);
  var isObj = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
  function validateWrapperShape(parsed) {
    if (parsed === null || parsed === void 0) return [];
    if (!isObj(parsed)) return [err("WRAPPER-NOT-OBJECT", "root")];
    const out = [];
    const changed = parsed.changed;
    if (typeof changed !== "boolean") {
      out.push(err("CHANGED-NOT-BOOL", "changed"));
      return out;
    }
    const hasDelta = "delta" in parsed;
    const delta = parsed.delta;
    if (changed === false && hasDelta && pyTruthy(delta)) {
      out.push(err("FALSE-HAS-DELTA", "delta"));
    } else if (changed === true) {
      if (!isObj(delta) || Object.keys(delta).length === 0) {
        out.push(err("TRUE-MISSING-DELTA", "delta"));
      }
    }
    return out;
  }
  function validateMergedDelta(merged, { persona = null, prevState = {}, prose = null } = {}) {
    let errors = validateWrapperShape(merged);
    if (errors.some((e) => e.severity === "error")) return errors;
    if (!isObj(merged)) return errors;
    if (!merged.changed) {
      if (typeof prose === "string" && prose.trim()) {
        errors = errors.concat(proseAwareChecks(merged, prose, prevState || {}));
      }
      return errors;
    }
    const delta = merged.delta;
    if (!isObj(delta)) return errors;
    prevState = prevState || {};
    for (const [char, charData] of Object.entries(delta)) {
      if (!isObj(charData)) continue;
      if ("stamina" in charData) {
        errors.push(err("STAMINA-DROPPED", `delta.${char}.stamina`));
      }
      const prevChar = (isObj(prevState[char]) ? prevState[char] : null) || {};
      const speciesRaw = charData.species || prevChar.species;
      const speciesNorm = typeof speciesRaw === "string" ? speciesRaw.toLowerCase().trim() : null;
      const body = charData.body || {};
      if (!isObj(body)) continue;
      if (typeof charData.species === "string") {
        const nsNorm = charData.species.trim().toLowerCase().replace(/\s+/g, " ");
        if (SPECIES_REJECT.has(nsNorm)) {
          const tail = body.tail;
          const hasAnatomySignal = isObj(tail) && Object.keys(tail).length > 0 || Object.keys(body).some((s) => S_HIND_SET.has(s));
          if (!hasAnatomySignal) {
            errors.push(err("SPECIES-IS-SOCIAL-DESCRIPTOR", `delta.${char}.species`, "error", "species"));
          }
        }
      }
      const itemsBySlot = /* @__PURE__ */ new Map();
      for (const [slot, slotData] of Object.entries(body)) {
        if (!isObj(slotData)) continue;
        if (!S_VALID_SLOTS.has(slot)) {
          errors.push(err("SLOT-NOT-IN-SCHEMA", `delta.${char}.body.${slot}`, "error", null));
          continue;
        }
        if (slotData.holding === "") {
          errors.push(err("HOLDING-CLEAR-LEGACY-SENTINEL", `delta.${char}.body.${slot}.holding`, "error", "holding"));
        }
        if (speciesNorm && S_NO_LEGS.has(speciesNorm) && S_STD_LEG.has(slot)) {
          let ownerPass = "species";
          for (const f of Object.keys(slotData)) {
            ownerPass = PASS_BY_BODY_FIELD[f] || ownerPass;
            if (ownerPass !== "species") break;
          }
          errors.push(err("SPECIES-LEG-OMISSION", `delta.${char}.body.${slot}`, "error", ownerPass));
        }
        if (S_HIND.has(slot) && !S_QUAD.has(speciesNorm || "human")) {
          errors.push(err("HIND-ON-NON-QUADRUPED", `delta.${char}.body.${slot}`, "suggestion", "species"));
        }
        if (slotData.missing === true) {
          for (const conflict of ["worn", "wounds", "holding", "bare"]) {
            if (conflict === "worn" && COVERABLE_MISSING_SLOTS2.has(slot)) continue;
            if (isPresentField(slotData[conflict])) {
              errors.push(err("MISSING-DOMINANCE", `delta.${char}.body.${slot}.${conflict}`, "error", PASS_BY_BODY_FIELD[conflict] || null));
            }
          }
        }
        if (slotData.missing !== true) {
          const hasState = pyTruthy(slotData.worn) || pyTruthy(slotData.wounds) || holdingPresent(slotData.holding) || slotData.bare === true;
          if (hasState) {
            const prevBody = (isObj(prevChar.body) ? prevChar.body : null) || {};
            for (const anc of PROXIMAL_OF[slot] || []) {
              const inDelta = isObj(body[anc]) && body[anc].missing === true;
              const inPrev = isObj(prevBody[anc]) && prevBody[anc].missing === true;
              if (inDelta || inPrev) {
                errors.push(err("MISSING-CASCADE", `delta.${char}.body.${slot}`, "error", null));
                break;
              }
            }
          }
        }
        if (slotData.bare === true && Array.isArray(slotData.worn) && slotData.worn.length > 0) {
          errors.push(err("BARE-WORN-MUTEX", `delta.${char}.body.${slot}.bare`, "error", "flags"));
        }
        if (Array.isArray(slotData.worn)) {
          slotData.worn.forEach((w, i) => {
            if (!isObj(w)) return;
            const itemName = w.item;
            if (typeof itemName !== "string") return;
            const norm = canonGarment(itemName);
            if (!itemsBySlot.has(norm)) itemsBySlot.set(norm, []);
            itemsBySlot.get(norm).push(slot);
            const category = classifyItem(itemName);
            if (category) {
              const catRules = ITEM_CATEGORIES[category];
              if (!catRules.allowed_slots.includes(slot)) {
                const severity = SLOT_CAT_STRIP[slot] && SLOT_CAT_STRIP[slot].has(category) ? "error" : catRules.severity || "warning";
                errors.push(err(
                  `ITEM-WRONG-SLOT-${category.toUpperCase()}`,
                  `delta.${char}.body.${slot}.worn[${i}]`,
                  severity,
                  "worn"
                ));
              }
            }
          });
        }
        if (Array.isArray(slotData.worn)) {
          const seenMutex = /* @__PURE__ */ new Map();
          slotData.worn.forEach((w, i) => {
            if (!isObj(w)) return;
            const cls = mutexGarmentClass(w.item);
            if (cls === null) return;
            if (seenMutex.has(cls)) {
              errors.push(err("CONFLICTING-WORN", `delta.${char}.body.${slot}.worn[${i}]`, "error", "worn"));
            } else {
              seenMutex.set(cls, i);
            }
          });
        }
        if (Array.isArray(slotData.wounds)) {
          slotData.wounds.forEach((wnd, i) => {
            if (!isObj(wnd)) return;
            const wtext = wnd.text;
            if (typeof wtext !== "string") return;
            const wtextNorm = wtext.toLowerCase();
            for (const [woundKey, okSlots] of WOUND_SLOT_ENTRIES) {
              if (wtextNorm.includes(woundKey) && !okSlots.has(slot)) {
                if (S_NO_LEGS.has(speciesNorm) && [...okSlots].every((s) => S_STD_LEG.has(s))) break;
                errors.push(err("WOUND-WRONG-SLOT", `delta.${char}.body.${slot}.wounds[${i}]`, "error", "wounds"));
                break;
              }
            }
          });
        }
      }
      for (const [itemNorm, slotsSeen] of itemsBySlot) {
        const required = MULTI_SLOT_CANON[itemNorm];
        if (!required) continue;
        const seen = new Set(slotsSeen);
        const missing = [...required].filter((s) => !seen.has(s));
        if (!missing.length) continue;
        const prevBody = (isObj(prevChar.body) ? prevChar.body : null) || {};
        const stillMissing = [];
        for (const mSlot of missing) {
          const prevWorn = isObj(prevBody[mSlot]) && Array.isArray(prevBody[mSlot].worn) ? prevBody[mSlot].worn : [];
          const foundInPrev = prevWorn.some((p) => isObj(p) && canonGarment(p.item) === itemNorm);
          if (!foundInPrev) stillMissing.push(mSlot);
        }
        if (stillMissing.length) {
          const seenPath = [...slotsSeen].sort().join("/");
          errors.push(err("MULTI-SLOT-INCOMPLETE", `delta.${char}.body.${seenPath}.worn[item=${itemNorm}]`, "warning", "worn"));
        }
      }
      if ("tail" in body && speciesNorm === null) {
        const tailData = isObj(body.tail) ? body.tail : {};
        const meaningful = ["worn", "wounds", "holding", "bare", "missing"].some((k) => pyTruthy(tailData[k]));
        if (meaningful) errors.push(err("ORPHAN-TAIL", `delta.${char}.body.tail`, "warning", "species"));
      }
    }
    if (typeof prose === "string" && prose.trim()) {
      errors = errors.concat(proseAwareChecks(merged, prose, prevState));
    }
    return errors;
  }
  function proseAwareChecks(merged, prose, prevState) {
    const out = [];
    const delta = merged && merged.delta || {};
    if (!isObj(delta)) return out;
    const proseLower = prose.toLowerCase();
    const hasEscalator = SEVERITY_ESCALATORS_PROSE.some((esc2) => proseLower.includes(esc2));
    const hasStructuralDamageCue = STRUCTURAL_DAMAGE_CUES.some((cue) => proseHasPhrase(proseLower, cue));
    const hasSoilingOnlyCue = SOILING_ONLY_CUES.some((cue) => proseHasPhrase(proseLower, cue));
    const hasHoldingAddCue = HOLDING_ADD_CUES.some((c) => proseHasPhrase(proseLower, c));
    const hasInteractionCue = INTERACTION_CUE_PHRASES.some((c) => proseHasPhrase(proseLower, c));
    const hasHandInteraction = hasHoldingAddCue || hasInteractionCue;
    const hasDonCue = WORN_DON_CUES.some((c) => proseHasPhrase(proseLower, c));
    for (const [char, charData] of Object.entries(delta)) {
      if (!isObj(charData)) continue;
      const body = charData.body;
      if (!isObj(body)) continue;
      const prevCharBody = (isObj(prevState[char]) ? prevState[char] : {}).body || {};
      for (const [slot, slotData] of Object.entries(body)) {
        if (!isObj(slotData)) continue;
        const worn = Array.isArray(slotData.worn) ? slotData.worn : [];
        if ((slot === "left_hand" || slot === "right_hand") && hasHandInteraction && !hasDonCue) {
          const prevWorn = isObj(prevCharBody[slot]) && Array.isArray(prevCharBody[slot].worn) ? prevCharBody[slot].worn : [];
          const prevItems = new Set(prevWorn.filter(isObj).map((w) => canonGarment(w.item)));
          worn.forEach((w, i) => {
            if (!isObj(w) || typeof w.item !== "string") return;
            if (prevItems.has(canonGarment(w.item))) return;
            if (classifyItem(w.item) !== null) return;
            const il = w.item.trim().toLowerCase();
            if (!il || !proseLower.includes(il)) return;
            if (HAND_WORN_STAPLES.some((staple) => il.includes(staple))) return;
            out.push(err("WORN-ON-HAND-INTERACTION", `delta.${char}.body.${slot}.worn[${i}]`, "warning", "worn"));
          });
        }
        (Array.isArray(slotData.wounds) ? slotData.wounds : []).forEach((wound, i) => {
          if (!isObj(wound)) return;
          const text = String(wound.text || "").toLowerCase().trim();
          const severity = String(wound.severity || "").toLowerCase().trim();
          if (severity !== "serious" && severity !== "critical") return;
          if (MINOR_DEFAULT_INJURY_NOUNS.some((n) => text.includes(n)) && !hasEscalator) {
            out.push(err("SEVERITY-INFLATION", `delta.${char}.body.${slot}.wounds[${i}].severity`, "warning", "wounds"));
          }
        });
        worn.forEach((w, i) => {
          if (!isObj(w) || typeof w.item !== "string") return;
          const itemLower = w.item.toLowerCase().trim();
          let colorFound = null;
          for (const color of COLOR_WORDS_FOR_ITEM_CHECK) {
            if (color.includes(" ") || color.includes("-")) {
              if (itemLower.includes(color)) {
                colorFound = color;
                break;
              }
            } else if (new RegExp(`\\b${escapeRe(color)}\\b`).test(itemLower)) {
              colorFound = color;
              break;
            }
          }
          if (colorFound) out.push(err("COLOR-IN-ITEM", `delta.${char}.body.${slot}.worn[${i}].item`, "error", "worn"));
        });
        worn.forEach((w, i) => {
          if (isObj(w) && armorFormForItem(proseLower, w)) {
            out.push(err("X3-GENERIC-ARMOR-PROSE-HAS-FORM", `delta.${char}.body.${slot}.worn[${i}].item`, "warning", "worn"));
          }
        });
        const damageEntries = [
          ["worn", worn],
          ["holding", isObj(slotData.holding) ? [slotData.holding] : []]
        ];
        for (const [fieldName, entries] of damageEntries) {
          entries.forEach((item, i) => {
            if (!isObj(item)) return;
            const damage = String(item.damage || "").toLowerCase().trim();
            if (damage !== "damaged" && damage !== "broken") return;
            const owner = fieldName === "holding" ? "holding" : "worn";
            const idx = fieldName === "holding" ? "" : `[${i}]`;
            const path = `delta.${char}.body.${slot}.${fieldName}${idx}.damage`;
            if (!hasStructuralDamageCue) {
              out.push(err("X5-DAMAGE-NO-STRUCTURAL-CUE", path, "warning", owner));
            } else if (hasSoilingOnlyCue) {
              out.push(err("SOILING-WITH-DAMAGE-CHECK", path, "suggestion", owner));
            }
          });
        }
        const wnds = (Array.isArray(slotData.wounds) ? slotData.wounds : []).filter(isObj);
        if (wnds.length && wnds.every((w) => String(w.severity || "") !== "critical")) {
          const phrase = slot.replace(/_/g, " ");
          const at = proseLower.indexOf(phrase);
          if (at >= 0) {
            const win = proseLower.slice(Math.max(0, at - 50), at + phrase.length + 50);
            if (CRITICAL_ESCALATORS.some((esc2) => win.includes(esc2))) {
              out.push(err("SEVERITY-DEFLATION-SUSPECTED", `delta.${char}.body.${slot}.wounds`, "suggestion", "wounds"));
            }
          }
        }
      }
    }
    return out;
  }
  function removePath(obj, path) {
    if (!path.startsWith("delta")) return;
    let rest = path.slice("delta".length);
    if (rest.startsWith(".")) rest = rest.slice(1);
    const tokens = [];
    let i = 0, cur = "";
    while (i < rest.length) {
      const c = rest[i];
      if (c === ".") {
        if (cur) {
          tokens.push(["key", cur]);
          cur = "";
        }
        i += 1;
      } else if (c === "[") {
        if (cur) {
          tokens.push(["key", cur]);
          cur = "";
        }
        const j = rest.indexOf("]", i);
        tokens.push(["idx", rest.slice(i + 1, j)]);
        i = j + 1;
      } else {
        cur += c;
        i += 1;
      }
    }
    if (cur) tokens.push(["key", cur]);
    if (!tokens.length) return;
    const delta = obj.delta;
    if (!isObj(delta)) return;
    let parent = delta;
    for (const [kind, val] of tokens.slice(0, -1)) {
      if (kind === "key") {
        if (!isObj(parent) || !(val in parent)) return;
        parent = parent[val];
      } else {
        const idx = parseInt(val, 10);
        if (!Array.isArray(parent) || Number.isNaN(idx) || idx >= parent.length) return;
        parent = parent[idx];
      }
    }
    const [lastKind, lastVal] = tokens[tokens.length - 1];
    if (lastKind === "key") {
      if (isObj(parent) && lastVal in parent) delete parent[lastVal];
    } else {
      const idx = parseInt(lastVal, 10);
      if (Array.isArray(parent) && idx >= 0 && idx < parent.length) parent.splice(idx, 1);
    }
  }
  function keepOriginallyEmpty(parsed) {
    const keep = /* @__PURE__ */ new Set();
    const delta = parsed && parsed.delta;
    if (!isObj(delta)) return keep;
    for (const char of Object.keys(delta)) {
      const body = isObj(delta[char]) ? delta[char].body : null;
      if (!isObj(body)) continue;
      for (const slot of Object.keys(body)) {
        const sd = body[slot];
        if (!isObj(sd)) continue;
        for (const lf of ["worn", "wounds"]) {
          if (Array.isArray(sd[lf]) && sd[lf].length === 0) keep.add(`${char}.${slot}.${lf}`);
        }
      }
    }
    return keep;
  }
  function pruneEmpties(parsed, keep) {
    const delta = parsed.delta;
    if (!isObj(delta)) return;
    for (const char of Object.keys(delta)) {
      const cd = delta[char];
      if (!isObj(cd)) continue;
      const body = cd.body;
      if (isObj(body)) {
        for (const slot of Object.keys(body)) {
          const sd = body[slot];
          if (isObj(sd)) {
            for (const lf of ["worn", "wounds"]) {
              if (lf in sd && Array.isArray(sd[lf]) && sd[lf].length === 0) {
                if (keep && keep.has(`${char}.${slot}.${lf}`)) continue;
                delete sd[lf];
              }
            }
            if (Object.keys(sd).length === 0) delete body[slot];
          } else if (sd === null || sd === void 0 || sd === "" || Array.isArray(sd) && sd.length === 0 || isObj(sd) && Object.keys(sd).length === 0) {
            delete body[slot];
          }
        }
        if (Object.keys(body).length === 0) delete cd.body;
      }
      if (Object.keys(cd).length === 0) delete delta[char];
    }
    if (Object.keys(delta).length === 0) {
      parsed.changed = false;
      delete parsed.delta;
    }
  }
  function lastListIndex(path) {
    const m = path.match(/\[(\d+)\]/g);
    return m ? parseInt(m[m.length - 1].slice(1, -1), 10) : -1;
  }
  function stripInvalidFields(parsed, errors) {
    if (!parsed) return parsed;
    const result = JSON.parse(JSON.stringify(parsed));
    const fatal = errors.filter((e) => e.severity === "error");
    const depth = (p) => p.split(".").length - 1;
    fatal.sort((a, b) => depth(b.path) - depth(a.path) || lastListIndex(b.path) - lastListIndex(a.path));
    const keep = keepOriginallyEmpty(parsed);
    for (const e of fatal) removePath(result, e.path);
    pruneEmpties(result, keep);
    return result;
  }
  function applyValidator(merged, opts = {}) {
    const findings = validateMergedDelta(merged, opts);
    const stripped = stripInvalidFields(merged, findings);
    return { findings, stripped };
  }
  function sweepState(state, { persona = null, isSlotLocked: isSlotLocked2 = () => false } = {}) {
    if (!isObj(state) || Object.keys(state).length === 0) {
      return { cleaned: state, findings: [], removed: [], changed: false };
    }
    const wrapped = { changed: true, delta: state };
    const findings = validateMergedDelta(wrapped, { persona, prevState: {}, prose: null });
    const removed = findings.filter((f) => {
      if (f.severity !== "error") return false;
      const m = /^delta\.(.+?)\.body\.([^.[]+)/.exec(f.path);
      if (m && isSlotLocked2(m[1], m[2])) return false;
      return true;
    });
    const out = stripInvalidFields(wrapped, removed);
    const cleaned = out && out.changed && isObj(out.delta) ? out.delta : {};
    const changed = JSON.stringify(cleaned) !== JSON.stringify(state);
    return { cleaned, findings, removed, changed };
  }

  // views.js
  var DAMAGE_VALUES = ["pristine", "damaged", "broken"];
  var SEVERITY_VALUES = ["minor", "serious", "critical"];
  var COLOR_VALUES = [
    "",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
    "brown",
    "black",
    "white",
    "gray",
    "beige",
    "gold",
    "silver",
    "navy",
    "tan"
  ];
  var HAND_SLOTS = /* @__PURE__ */ new Set(["left_hand", "right_hand"]);
  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }
  var toastTimer = null;
  function toast(msg, ms = 2600) {
    let el = document.querySelector(".bh-toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "bh-toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    requestAnimationFrame(() => el.classList.add("bh-toast-in"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("bh-toast-in"), ms);
  }
  async function copyText(text, okMsg) {
    try {
      await navigator.clipboard.writeText(text);
      toast(okMsg || "Copied to clipboard");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      toast(okMsg || "Copied to clipboard");
    }
  }
  async function sha12(text) {
    try {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 12);
    } catch {
      return "(sha unavailable)";
    }
  }
  function commaNum(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  var ctx = null;
  function installViews(options) {
    ctx = options;
    const $panel = $("#beholder_panel");
    if (!$panel.length) return;
    ensureNoModelBanner($panel);
    onPanelRendered();
  }
  function locksHas(key) {
    const locks = ctx?.getLocks?.() || [];
    return Array.isArray(locks) ? locks.includes(key) : !!(locks.has && locks.has(key));
  }
  function editedHas(key) {
    const edited = ctx?.getUserEdited?.() || [];
    return Array.isArray(edited) ? edited.includes(key) : !!(edited.has && edited.has(key));
  }
  var VIEW_BUILDERS = {
    settings: buildSettingsView,
    characters: buildCharactersView,
    doctor: buildDoctorView,
    inspector: buildInspectorView,
    help: buildHelpView
  };
  var VIEW_TITLES = {
    settings: "Settings",
    characters: "Characters",
    doctor: "Doctor",
    inspector: "Inspector",
    help: "Help"
  };
  function openView(name, opts) {
    const $panel = $("#beholder_panel");
    closeView();
    closeEditor();
    const $view = $(`
        <div class="bh-view" data-view="${name}">
            <div class="bh-view-head">
                <span class="bh-view-back fa-solid fa-arrow-left" title="Back to the panel"></span>
                <span class="bh-view-title"><span class="bh-view-crumb">\u25C9</span>${VIEW_TITLES[name]}</span>
            </div>
            <div class="bh-view-body"></div>
        </div>
    `);
    VIEW_BUILDERS[name]($view.find(".bh-view-body"));
    $panel.append($view);
    $view.find(".bh-view-back").on("click", closeView);
    $view.on("mousedown", (e) => {
      if (!$(e.target).closest(".bh-view-head").length) e.stopPropagation();
    });
    $(document).on("keydown.bhView", (e) => {
      if (e.key === "Escape") closeView();
    });
    if (name === "settings" && opts?.focus === "endpoint") {
      const $adv = $view.find(".bh-adv-endpoint");
      $adv.prop("open", true);
      const $ep = $view.find("#bhp-endpoint");
      setTimeout(() => {
        $ep.length && $ep[0].scrollIntoView({ block: "center", behavior: "smooth" });
        $ep.trigger("focus");
      }, 60);
    }
    if (name === "settings" && opts?.focus === "model") {
      setTimeout(() => {
        const $card = $view.find("#bhp-lmcard");
        $card.length && $card[0].scrollIntoView({ block: "center", behavior: "smooth" });
        if (opts.startDownload) {
          const $dl = $card.find('.bh-lm-btn[data-action="download"]');
          if ($dl.length) $dl.trigger("click");
        }
      }, 80);
    }
  }
  function closeView() {
    $("#beholder_panel .bh-view").remove();
    $(document).off("keydown.bhView");
  }
  function buildCharactersView($body) {
    const refresh = () => buildCharactersView($body);
    const d = ctx?.getCharacters?.() || { persona: null, visible: [], hidden: [], aliasesChat: {}, aliasesGlobal: {} };
    const variantsOf = (name) => {
      const out = [];
      for (const [scope, book] of [["chat", d.aliasesChat], ["global", d.aliasesGlobal]]) {
        for (const v of book?.[name] || []) out.push({ v, scope });
      }
      return out;
    };
    const row = (name) => {
      const you = name === d.persona;
      const chips = variantsOf(name).map(({ v, scope }) => `<span class="bh-ch-alias" data-variant="${esc(v)}" data-scope="${scope}">${esc(v)}<i class="fa-solid fa-xmark" title="Unmerge"></i></span>`).join("");
      return `<li class="bh-ch${you ? " bh-ch-you" : ""}" draggable="true" data-name="${esc(name)}">
            <i class="bh-ch-grip fa-solid fa-grip-vertical" title="Drag to reorder"></i>
            <span class="bh-ch-main">
                <span class="bh-ch-name">${you ? '<i class="fa-solid fa-star bh-ch-star" title="You"></i> ' : ""}${esc(name)}</span>
                ${chips ? `<span class="bh-ch-aliases">${chips}</span>` : ""}
            </span>
            <span class="bh-ch-tools">
                <i class="bh-ch-merge fa-solid fa-link" title="Same as another character"></i>
                <i class="bh-ch-hide fa-solid fa-eye" title="Hide"></i>
            </span>
        </li>`;
    };
    const hiddenRow = (name) => `<li class="bh-ch bh-ch-hidden" data-name="${esc(name)}">
            <span class="bh-ch-main"><span class="bh-ch-name">${esc(name)}</span></span>
            <span class="bh-ch-tools"><i class="bh-ch-unhide fa-solid fa-eye-slash" title="Show"></i></span>
        </li>`;
    $body.html(`
        <ul class="bh-ch-list">${d.visible.map(row).join("") || '<li class="bh-ch-empty">No one tracked yet.</li>'}</ul>
        ${d.hidden.length ? `<div class="bh-ch-tray"><span class="bh-ch-tray-cap">Hidden</span>
            <ul class="bh-ch-list">${d.hidden.map(hiddenRow).join("")}</ul></div>` : ""}
    `);
    $body.find(".bh-ch-hide").on("click", function(e) {
      e.stopPropagation();
      ctx?.setCharHidden?.(String($(this).closest(".bh-ch").data("name")), true);
      refresh();
    });
    $body.find(".bh-ch-unhide").on("click", function(e) {
      e.stopPropagation();
      ctx?.setCharHidden?.(String($(this).closest(".bh-ch").data("name")), false);
      refresh();
    });
    $body.find(".bh-ch-alias .fa-xmark").on("click", function(e) {
      e.stopPropagation();
      const $a = $(this).closest(".bh-ch-alias");
      const canonical = String($(this).closest(".bh-ch").data("name"));
      ctx?.removeAlias?.(String($a.data("variant")), canonical, { global: $a.data("scope") === "global" });
      refresh();
    });
    $body.find(".bh-ch-merge").on("click", function(e) {
      e.stopPropagation();
      const $r = $(this).closest(".bh-ch");
      if ($r.find(".bh-ch-pick").length) {
        $r.find(".bh-ch-pick").remove();
        return;
      }
      const name = String($r.data("name"));
      const pills = d.visible.filter((n) => n !== name).map((n) => `<button class="bh-ch-pill" type="button" data-target="${esc(n)}">${esc(n)}</button>`).join("");
      const $pick = $(`<div class="bh-ch-pick">
            <span class="bh-ch-pick-lead">is</span>${pills}
            <input class="bh-ch-pick-input" placeholder="someone else\u2026" />
        </div>`);
      $r.append($pick);
      const merge = (target) => {
        target = String(target || "").trim();
        if (target && target.toLowerCase() !== name.toLowerCase()) ctx?.addAlias?.(name, target, { global: true });
        refresh();
      };
      $pick.find(".bh-ch-pill").on("click", function() {
        merge($(this).data("target"));
      });
      const $inp = $pick.find(".bh-ch-pick-input");
      $inp.on("keydown", (ev) => {
        if (ev.key === "Enter") merge($inp.val());
        else if (ev.key === "Escape") $pick.remove();
      });
      setTimeout(() => $inp.trigger("focus"), 0);
    });
    wireCharDrag($body);
  }
  function wireCharDrag($body) {
    const $list = $body.find(".bh-ch-list").first();
    let dragName = null;
    $list.find('.bh-ch[draggable="true"]').each(function() {
      this.addEventListener("dragstart", (e) => {
        dragName = String($(this).data("name"));
        this.classList.add("bh-ch-dragging");
        try {
          e.dataTransfer.effectAllowed = "move";
        } catch {
        }
      });
      this.addEventListener("dragend", () => {
        this.classList.remove("bh-ch-dragging");
        $list.find(".bh-ch-dropzone").removeClass("bh-ch-dropzone");
      });
      this.addEventListener("dragover", (e) => {
        e.preventDefault();
        $(this).addClass("bh-ch-dropzone");
      });
      this.addEventListener("dragleave", () => $(this).removeClass("bh-ch-dropzone"));
      this.addEventListener("drop", (e) => {
        e.preventDefault();
        $(this).removeClass("bh-ch-dropzone");
        const targetName = String($(this).data("name"));
        if (!dragName || dragName === targetName) return;
        const $drag = $list.find(".bh-ch").filter((i, el) => String($(el).data("name")) === dragName).first();
        $(this).before($drag);
        const order = $list.find(".bh-ch").map(function() {
          return String($(this).data("name"));
        }).get();
        ctx?.setCharOrder?.(order);
      });
    });
  }
  function buildSettingsView($body) {
    const s = ctx?.getSettings?.() || {};
    $body.html(`
        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-plug"></i> Connection</summary>
            <div class="bh-vsection-body">
                <div class="bh-localmodel-card" id="bhp-lmcard"></div>

                <details class="bh-adv-endpoint">
                    <summary><i class="fa-solid fa-sliders"></i> Advanced: custom endpoint
                        <small style="opacity:.6;">(overrides the browser model)</small></summary>
                    <div class="bh-adv-endpoint-body">
                        <p class="bh-help" style="opacity:.6; font-size:.85em; margin:2px 0 8px;">
                            Point Beholder at any OpenAI-compatible extractor server. Easiest local option: run the
                            <a href="https://huggingface.co/GetBeholder/Beholder-GGUF" target="_blank" rel="noopener">Beholder&nbsp;GGUF</a>
                            in llama.cpp / LM&nbsp;Studio / Ollama and paste its URL (e.g. <code>http://localhost:8080/v1</code>),
                            or use any remote server. Leave blank to use the in-browser model above \u2014 a custom endpoint always wins.</p>
                        <div class="bh-field">
                            <label for="bhp-endpoint">Extractor endpoint</label>
                            <input id="bhp-endpoint" class="bh-input" type="text" value="${esc(s.endpoint)}" placeholder="http://localhost:8080/v1  \xB7  blank = use browser model">
                        </div>
                        <div class="bh-field">
                            <label for="bhp-model">Model name</label>
                            <input id="bhp-model" class="bh-input" type="text" value="${esc(s.model)}" placeholder="ChatML">
                        </div>
                        <div class="bh-field">
                            <label for="bhp-key">API key <i style="opacity:.5">(optional)</i></label>
                            <input id="bhp-key" class="bh-input" type="password" value="${esc(s.apiKey)}" placeholder="blank for local servers">
                        </div>
                        <div class="bh-row-actions">
                            <button class="bh-btn bh-btn-primary" id="bhp-test"><i class="fa-solid fa-bolt"></i> Test connection</button>
                            <span class="bh-conn-status" id="bhp-conn"><span class="bh-dot"></span><span>not tested</span></span>
                        </div>
                    </div>
                </details>
            </div>
        </details>

        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-wand-magic-sparkles"></i> Extraction &amp; prompt</summary>
            <div class="bh-vsection-body">
                <label class="bh-check">
                    <input type="checkbox" id="bhp-inferred" ${s.inferredColors ? "checked" : ""}>
                    <span>Show inferred colors
                        <small>When the model guesses a plausible color ("leather belt" \u2192 brown) instead of reading one from the prose. Off = explicit colors only.</small></span>
                </label>
                <label class="bh-check">
                    <input type="checkbox" id="bhp-validator" ${s.validator?.enabled !== false ? "checked" : ""}>
                    <span>Validator
                        <small>Strips structurally-unlikely model output (e.g. an eyepatch worn on a hand) before it reaches the doll. Turn OFF to apply raw model output (A/B). Per-turn findings appear in the Inspector tab. Takes effect on the next message.</small></span>
                </label>
                <div class="bh-field">
                    <label for="bhp-inject">Inject state into prompt as</label>
                    <select id="bhp-inject" class="bh-select">
                        <!-- Front-of-context positions (BEFORE_PROMPT / IN_PROMPT) are
                             deliberately NOT offered: a state block that changes each turn
                             at the front re-prefills the WHOLE context every time (a full
                             50k+ reprocess on a large-context / SWA local model). State is
                             always injected near generation. -->
                        <option value="IN_CHAT" ${s.injectionPosition === "IN_CHAT" ? "selected" : ""}>In-chat at depth (recommended)</option>
                        <option value="NONE" ${s.injectionPosition === "NONE" ? "selected" : ""}>Don't inject (track only)</option>
                    </select>
                </div>
                <div class="bh-field">
                    <label for="bhp-depth">Injection depth (in-chat only; 0 = after last msg, 1 = before it)</label>
                    <input id="bhp-depth" class="bh-input" type="number" min="0" max="100" step="1" value="${esc(s.injectionDepth)}">
                </div>
                <div class="bh-field">
                    <label for="bhp-concurrency">Endpoint concurrency (max parallel requests)</label>
                    <input id="bhp-concurrency" class="bh-input" type="number" min="1" max="64" step="1" value="${esc(s.concurrency ?? 1)}">
                    <small style="opacity:.6">Keep at <b>1</b> for a single-slot local server (KoboldCpp / llama.cpp) \u2014 it processes one at a time, so higher only risks "server busy" 503s. Raise it only for endpoints that truly parallelise (vLLM / multi-slot).</small>
                </div>
            </div>
        </details>

    `);
    const save = (patch) => ctx?.saveSettings?.(patch);
    $body.find("#bhp-endpoint").on("change", function() {
      save({ endpoint: this.value.trim() });
      ctx.probeEndpoint?.();
    });
    $body.find("#bhp-model").on("change", function() {
      save({ model: this.value.trim() });
    });
    $body.find("#bhp-key").on("change", function() {
      save({ apiKey: this.value });
    });
    $body.find("#bhp-inferred").on("change", function() {
      save({ inferredColors: this.checked });
    });
    $body.find("#bhp-validator").on("change", function() {
      save({ validator: { enabled: this.checked } });
      toast(this.checked ? "Validator ON (next message)" : "Validator OFF \u2014 raw model output (next message)");
    });
    $body.find("#bhp-inject").on("change", function() {
      save({ injectionPosition: this.value });
    });
    $body.find("#bhp-depth").on("change", function() {
      save({ injectionDepth: parseInt(this.value, 10) || 0 });
    });
    $body.find("#bhp-concurrency").on("change", function() {
      const n = Math.max(1, Math.min(64, parseInt(this.value, 10) || 1));
      this.value = n;
      save({ concurrency: n });
    });
    $body.find("#bhp-test").on("click", async function() {
      const $st = $body.find("#bhp-conn");
      $st.html('<span class="bh-dot bh-dot-busy"></span><span>probing /v1/models\u2026</span>');
      try {
        const r = await ctx.probeEndpoint();
        if (r?.ok) {
          $st.html(`<span class="bh-dot bh-dot-ok"></span><span>${esc(r.servedModel || "reachable")} \xB7 ${r.ms} ms</span>`);
          toast("Connection OK \u2014 endpoint reachable");
        } else {
          $st.html(`<span class="bh-dot bh-dot-bad"></span><span>${esc(r?.error || "unreachable")}</span>`);
          toast("Connection failed \u2014 check the endpoint URL");
        }
      } catch (e) {
        $st.html(`<span class="bh-dot bh-dot-bad"></span><span>${esc(e?.message || "error")}</span>`);
        toast("Connection failed");
      }
    });
    $body.find("#bhp-accent").on("change", function() {
      save({ matchThemeAccent: this.checked });
      const panel = document.getElementById("beholder_panel");
      if (this.checked) {
        panel.style.setProperty("--bh-accent-pref", "var(--SmartThemeQuoteColor, #88aaff)");
        toast("Accent now follows the Marinara theme");
      } else {
        panel.style.removeProperty("--bh-accent-pref");
        toast("Accent: Beholder gold");
      }
    });
    renderBrowserCard($body.find("#bhp-lmcard"));
  }
  var LM_STATES = {
    unconfigured: {
      cls: "bh-lm-unconfigured",
      dot: "warn",
      head: "Browser model \u2014 coming soon",
      body: "The in-browser model isn't published yet. Point Beholder at any OpenAI-compatible endpoint to start tracking now \u2014 run the Beholder GGUF locally, or use a remote server.",
      btn: { id: "endpoint", kind: "primary", icon: "fa-plug", label: "Set up an endpoint" }
    },
    unsupported: {
      cls: "bh-lm-unsupported",
      dot: "bad",
      head: "Browser model \u2014 not supported here",
      body: "This device can't run the model in your browser (it needs WebGPU with fp16 support). You can still track by pointing Beholder at any OpenAI-compatible endpoint \u2014 run the Beholder GGUF locally, or use a remote server.",
      btn: { id: "endpoint", kind: "primary", icon: "fa-plug", label: "Set up an endpoint" }
    },
    "not-downloaded": {
      cls: "bh-lm-not-downloaded",
      dot: "warn",
      head: "Browser model \u2014 ready to download",
      body: "Runs entirely in your browser on the GPU. Downloaded once, then cached on disk; no prose ever leaves your machine.",
      btn: { id: "download", kind: "primary", icon: "fa-download", label: "Download model" }
    },
    downloading: {
      cls: "bh-lm-downloading",
      dot: "busy",
      head: "Browser model \u2014 downloading\u2026",
      body: "Streaming weights and compiling GPU kernels. Already-downloaded parts resume for free if the connection drops.",
      btn: { id: "cancel", kind: "", icon: "fa-xmark", label: "Cancel" }
    },
    "ready-disabled": {
      cls: "bh-lm-ready-disabled",
      dot: "ok",
      head: "Browser model \u2014 downloaded",
      body: "Cached on disk and ready. Enabling loads it onto the GPU so Beholder can run extractions locally.",
      btn: { id: "enable", kind: "primary", icon: "fa-bolt", label: "Enable" }
    },
    "ready-enabled": {
      cls: "bh-lm-ready-enabled",
      dot: "ok",
      head: "Browser model \u2014 active",
      body: "Running locally on your GPU. Disabling frees the GPU memory; the weights stay cached on disk for an instant re-enable.",
      btn: { id: "disable", kind: "", icon: "fa-power-off", label: "Disable" }
    },
    error: {
      cls: "bh-lm-error",
      dot: "bad",
      head: "Browser model \u2014 error",
      body: "The browser model couldn't load. Retry, or keep tracking by pointing Beholder at any OpenAI-compatible endpoint instead (run the Beholder GGUF locally, or a remote server).",
      btn: { id: "retry", kind: "primary", icon: "fa-rotate-right", label: "Retry" },
      btn2: { id: "endpoint", kind: "", icon: "fa-plug", label: "Use an endpoint" }
    }
  };
  function readinessRowsHtml(r) {
    const rows = [];
    const gpu = r?.gpu || {};
    if (gpu.ok) {
      const bits = [gpu.vendor || "WebGPU", gpu.architecture || ""].filter(Boolean).join(" ");
      const ssbo = gpu.maxStorageBufferBindingSize ? ` \xB7 ${(gpu.maxStorageBufferBindingSize / (1024 * 1024)).toFixed(0)} MB SSBO` : "";
      rows.push({ dot: "ok", label: "GPU", value: `${esc(bits)}${ssbo}` });
    } else {
      const gpuVal = esc(gpu.reason || "no WebGPU \u2014 required to run locally") + (gpu.hint ? `<br><span class="bh-lm-hint">${esc(gpu.hint)}</span>` : "");
      rows.push({ dot: "bad", label: "GPU", value: gpuVal });
    }
    const disk = r?.disk || {};
    if (disk.error) {
      rows.push({ dot: "warn", label: "Storage", value: "unknown (browser does not report)" });
    } else if (typeof disk.freeBytes === "number") {
      const freeGb = (disk.freeBytes / 1e9).toFixed(1);
      rows.push({
        dot: disk.ok ? "ok" : "warn",
        label: "Storage",
        value: `~${freeGb} GB available${disk.ok ? "" : " \u2014 may be tight"} \xB7 browser quota${disk.persisted ? ", persisted" : ""}`
      });
    } else {
      rows.push({ dot: "warn", label: "Storage", value: "unknown" });
    }
    const ram = r?.ram || {};
    rows.push(ram.known ? { dot: "ok", label: "RAM", value: `~${ram.gb} GB (total, hint only)` } : { dot: "warn", label: "RAM", value: "unknown (browser does not expose it)" });
    return rows.map((x) => `
        <div class="bh-lm-readiness-row">
            <span class="bh-dot bh-dot-${x.dot}"></span>
            <span class="bh-lm-readiness-label">${esc(x.label)}</span>
            <span class="bh-lm-readiness-value">${x.value}</span>
        </div>`).join("");
  }
  var lmDownloadActive = false;
  var lmDownloadPct = 0;
  var lmDownloadText = "";
  function approxSizeLabel() {
    const mb = ctx?.getModelInfo?.()?.approxDownloadMB;
    if (!mb || !Number.isFinite(mb)) return "";
    return mb >= 1024 ? `~${(mb / 1024).toFixed(1)} GB` : `~${Math.round(mb)} MB`;
  }
  function renderBrowserCard($card) {
    if (!$card || !$card.length) return;
    const state = ctx?.getBrowserModelState?.() || "unconfigured";
    const spec = LM_STATES[state] || LM_STATES.unconfigured;
    const readiness = ctx?.getReadiness?.() || {};
    const info = ctx?.getModelInfo?.() || {};
    const configured = !!ctx?.isModelConfigured?.();
    const showReadiness = state !== "unconfigured";
    let btn = spec.btn;
    if (btn && btn.id === "download") {
      const sz = approxSizeLabel();
      btn = { ...btn, label: sz ? `${btn.label} \xB7 ${sz}` : btn.label };
    }
    const btn2 = spec.btn2;
    const downloading = state === "downloading" || lmDownloadActive;
    const pct = Math.max(0, Math.min(100, Math.round(lmDownloadPct)));
    const indet = downloading && pct <= 0;
    const idLine = configured && info.modelId ? `<code>${esc(info.modelId)}</code>${info.version ? ` \xB7 ${esc(info.version)}` : ""} \xB7 q4f16` : "model id pending";
    const update = ctx?.getUpdateInfo?.() || {};
    $card.attr("class", `bh-localmodel-card ${spec.cls}`);
    $card.html(`
        <div class="bh-lm-head">
            <span class="bh-dot bh-dot-${spec.dot}"></span>
            <span class="bh-lm-title">${esc(spec.head)}</span>
        </div>
        <p class="bh-lm-copy">${esc(spec.body)}</p>
        <div class="bh-lm-modelid">${idLine}</div>
        ${update.available && !downloading ? `
        <div class="bh-lm-update">
            <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>
            <span>Update available \u2014 <b>${esc(update.to)}</b></span>
            <button class="bh-btn bh-btn-primary bh-lm-btn" data-action="update"><i class="fa-solid fa-download"></i> Update</button>
        </div>` : ""}
        ${showReadiness ? `<div class="bh-lm-readiness">${readinessRowsHtml(readiness)}</div>` : ""}
        ${downloading ? `
        <div class="bh-lm-progress">
            <div class="bh-lm-progress-label">
                <span>${esc(lmDownloadText || "preparing\u2026")}</span>
                <span class="bh-lm-progress-pct">${indet ? "" : pct + "%"}</span>
            </div>
            <div class="bh-lm-progress-bar${indet ? " bh-lm-indeterminate" : ""}" role="progressbar" aria-valuemin="0" aria-valuemax="100"${indet ? "" : ` aria-valuenow="${pct}"`}>
                <span class="bh-lm-progress-fill"${indet ? "" : ` style="width:${pct}%"`}></span>
            </div>
        </div>` : ""}
        <div class="bh-lm-action">
            ${btn && !downloading ? `
            <button class="bh-btn ${btn.kind === "primary" ? "bh-btn-primary" : ""} bh-lm-btn" data-action="${btn.id}">
                <i class="fa-solid ${btn.icon}"></i> ${esc(btn.label)}
            </button>` : ""}
            ${btn2 && !downloading ? `
            <button class="bh-btn ${btn2.kind === "primary" ? "bh-btn-primary" : ""} bh-lm-btn" data-action="${btn2.id}">
                <i class="fa-solid ${btn2.icon}"></i> ${esc(btn2.label)}
            </button>` : ""}
            ${downloading ? `
            <button class="bh-btn bh-lm-btn" data-action="cancel">
                <i class="fa-solid fa-xmark"></i> Cancel
            </button>` : ""}
        </div>
    `);
    $card.find(".bh-lm-btn").off("click").on("click", function() {
      const action = $(this).data("action");
      handleBrowserCardAction(action, $card);
    });
  }
  async function handleBrowserCardAction(action, $card) {
    try {
      if (action === "download" || action === "retry" || action === "update") {
        const isUpdate = action === "update";
        lmDownloadActive = true;
        lmDownloadPct = 0;
        lmDownloadText = isUpdate ? "updating\u2026" : "starting\u2026";
        renderBrowserCard($card);
        const run = isUpdate ? ctx?.onUpdateModel : ctx?.onDownloadModel;
        await run?.((p) => {
          lmDownloadPct = typeof p?.pct === "number" ? p.pct : lmDownloadPct;
          lmDownloadText = p?.text || lmDownloadText;
          const pct = Math.max(0, Math.min(100, Math.round(lmDownloadPct)));
          const indet = pct <= 0;
          $card.find(".bh-lm-progress-bar").toggleClass("bh-lm-indeterminate", indet).attr("aria-valuenow", indet ? null : pct);
          $card.find(".bh-lm-progress-fill").css("width", indet ? "" : `${pct}%`);
          $card.find(".bh-lm-progress-pct").text(indet ? "" : `${pct}%`);
          $card.find(".bh-lm-progress-label > span").first().text(lmDownloadText || "preparing\u2026");
        });
        lmDownloadActive = false;
        toast(isUpdate ? "Updated \u2014 new browser model loaded" : "Browser model ready \u2014 running locally on your GPU");
      } else if (action === "enable") {
        await ctx?.onEnableBrowserModel?.();
        toast("Browser model enabled");
      } else if (action === "disable") {
        await ctx?.onDisableBrowserModel?.();
        toast("Browser model disabled \u2014 GPU memory freed, weights stay cached");
      } else if (action === "cancel") {
        lmDownloadActive = false;
        await ctx?.onDisableBrowserModel?.();
        toast("Download cancelled");
      } else if (action === "endpoint") {
        const $view = $card.closest(".bh-view");
        $view.find(".bh-adv-endpoint").prop("open", true);
        const $ep = $view.find("#bhp-endpoint");
        setTimeout(() => {
          $ep.length && $ep[0].scrollIntoView({ block: "center", behavior: "smooth" });
          $ep.trigger("focus");
        }, 60);
        return;
      }
    } catch (err2) {
      lmDownloadActive = false;
      toast(`Browser model: ${err2?.message || "action failed"}`);
    }
    refreshBrowserCard();
  }
  function refreshBrowserCard() {
    const $card = $("#beholder_panel #bhp-lmcard");
    if ($card.length) renderBrowserCard($card);
  }
  var BANNER_DEFAULTS = {
    "never-setup": {
      variant: "warn",
      copy: "No extractor configured \u2014 Beholder isn't tracking. Point it at a local endpoint (recommended) or a Marinara connection in Settings.",
      actions: [
        { id: "endpoint", label: "Open Settings" }
      ]
    },
    unsupported: {
      variant: "warn",
      copy: "No extractor configured \u2014 point Beholder at an endpoint in Settings to keep tracking.",
      actions: [
        { id: "endpoint", label: "Set up an extractor" }
      ]
    },
    "endpoint-unreachable": {
      variant: "warn",
      copy: "Your extractor isn't responding \u2014 tracking paused. Recheck it in Settings.",
      actions: [
        { id: "endpoint", label: "Fix it in Settings" }
      ]
    },
    disabled: {
      variant: "calm",
      copy: "Tracking paused \u2014 set an extractor in Settings.",
      actions: [
        { id: "endpoint", label: "Open Settings" }
      ]
    },
    loading: {
      variant: "loading",
      copy: "Connecting to the extractor\u2026 tracking starts automatically.",
      actions: []
    }
  };
  function ensureNoModelBanner($panel) {
    if ($panel.find(".bh-no-model-banner").length) return;
    const $strip = $('<div class="bh-no-model-banner" hidden role="status" aria-live="polite"></div>');
    const $after = $panel.find(".beholder-backfill-status");
    if ($after.length) $after.after($strip);
    else $panel.find(".beholder-panel-header").after($strip);
  }
  function setNoModelBanner(info) {
    const $panel = $("#beholder_panel");
    if (!$panel.length) return;
    ensureNoModelBanner($panel);
    const $banner = $panel.find(".bh-no-model-banner");
    if (!info) {
      $banner.prop("hidden", true).empty().removeClass("bh-banner-warn bh-banner-calm bh-banner-loading");
      return;
    }
    const cause = info.cause || "never-setup";
    const def = BANNER_DEFAULTS[cause] || BANNER_DEFAULTS["never-setup"];
    const copy = info.copy || def.copy;
    const actions = Array.isArray(info.actions) && info.actions.length ? info.actions : def.actions;
    const variant = def.variant === "calm" ? "bh-banner-calm" : def.variant === "loading" ? "bh-banner-loading" : "bh-banner-warn";
    const spinner = def.variant === "loading" ? '<i class="fa-solid fa-spinner fa-spin bh-banner-spin" aria-hidden="true"></i> ' : "";
    const actionsHtml = actions.length ? `<span class="bh-banner-actions">${actions.map((a) => `
                    <button class="bh-btn bh-banner-btn ${a.id === "enable" ? "bh-btn-primary" : ""}" data-action="${esc(a.id)}">
                        ${esc(a.label)}
                    </button>`).join("")}</span>` : "";
    $banner.removeClass("bh-banner-warn bh-banner-calm bh-banner-loading").addClass(variant).prop("hidden", false).html(`
            <span class="bh-banner-copy">${spinner}${esc(copy)}</span>
            ${actionsHtml}
        `);
    $banner.find(".bh-banner-btn").off("click").on("click", function() {
      ctx?.onBannerAction?.($(this).data("action"));
    });
  }
  var updateDialogShownFor = null;
  function showUpdateDialog(info) {
    if (!info || !info.to) return;
    if (updateDialogShownFor === info.to) return;
    updateDialogShownFor = info.to;
    const $panel = $("#beholder_panel");
    if (!$panel.length) return;
    closeUpdateDialog();
    const gguf = info.ggufUrl || "https://huggingface.co/GetBeholder/Beholder-GGUF";
    const $strip = $(`
        <div class="bh-update-banner" role="status" aria-live="polite">
            <span class="bh-update-banner-copy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i> New model \u2014 <b>${esc(info.from || "?")}</b> \u2192 <b>${esc(info.to)}</b>. Update the browser model, or grab the GGUF.</span>
            <span class="bh-update-banner-actions">
                <button class="bh-btn bh-btn-primary bh-update-now"><i class="fa-solid fa-download"></i> Update</button>
                <a class="bh-btn bh-update-gguf" href="${esc(gguf)}" target="_blank" rel="noopener noreferrer" title="Native GGUF build"><i class="fa-solid fa-arrow-up-right-from-square"></i> GGUF</a>
                <button class="bh-btn bh-update-later" title="Dismiss" aria-label="Dismiss"><i class="fa-solid fa-xmark"></i></button>
            </span>
        </div>
    `);
    const $bf = $panel.find(".beholder-backfill-status");
    if ($bf.length) $bf.after($strip);
    else $panel.find(".beholder-panel-header").after($strip);
    $strip.find(".bh-update-later").on("click", closeUpdateDialog);
    $strip.find(".bh-update-now").on("click", async function() {
      const $b = $(this);
      $b.prop("disabled", true).html('<i class="fa-solid fa-spinner fa-spin"></i> 0%');
      try {
        await ctx?.onUpdateModel?.((p) => {
          const pct = typeof p?.pct === "number" ? p.pct : 0;
          $b.html(`<i class="fa-solid fa-spinner fa-spin"></i> ${pct}%`);
        });
      } catch (e) {
        toast(`Update failed: ${e?.message || "error"}`);
        $b.prop("disabled", false).html('<i class="fa-solid fa-download"></i> Update');
        return;
      }
      toast("Updated \u2014 new browser model loaded");
      closeUpdateDialog();
      refreshBrowserCard();
    });
  }
  function closeUpdateDialog() {
    $("#beholder_panel .bh-update-banner").remove();
  }
  function vitalRowHtml(x) {
    return `
        <div class="bh-vital">
            <span class="bh-dot bh-dot-${x.dot}"></span>
            <span class="bh-vital-label">${esc(x.label)}</span>
            <span class="bh-vital-value">${x.value}</span>
        </div>`;
  }
  function recentTurns() {
    const cap = ctx?.getCapture?.() || [];
    return cap.slice(-3).reverse().map((e) => {
      const slots = Object.values(e.delta || {}).reduce(
        (n, c) => n + Object.keys(c?.body || {}).length,
        0
      );
      const errs = (e.validatorLog || []).filter((v) => v.sev === "error").length;
      const warns = (e.validatorLog || []).filter((v) => v.sev === "warn").length;
      return {
        msg: `#${e.msgId}`,
        latency: e.latencyMs != null ? `${(e.latencyMs / 1e3).toFixed(1)} s` : "\u2014",
        // A parse failure applies nothing, so "no change" would be a lie — call it out.
        delta: e.parseFailed ? "\u26A0 output did not parse" : slots ? `${slots} slot${slots > 1 ? "s" : ""}` : "no change",
        validator: (e.validatorLog || []).length ? `${errs} err \xB7 ${warns} warn` : "\u2014"
      };
    });
  }
  function clip(str, max = 1200) {
    const s = String(str ?? "");
    return s.length > max ? `${s.slice(0, max)} \u2026[+${s.length - max} chars]` : s;
  }
  function reportTurns(cap, includeProse) {
    if (!cap.length) return ["- (no extractions captured yet)"];
    return cap.slice(-5).reverse().flatMap((e) => {
      const lat = e.latencyMs != null ? `${(e.latencyMs / 1e3).toFixed(1)}s` : "\u2014";
      const raw = typeof e.raw === "string" ? e.raw : JSON.stringify(e.raw ?? {});
      const errs = (e.validatorLog || []).filter((v) => v.sev === "error").length;
      const warns = (e.validatorLog || []).filter((v) => v.sev === "warn").length;
      const val = (e.validatorLog || []).length ? ` \xB7 validator ${errs} err/${warns} warn` : "";
      const fail = e.parseFailed ? " \xB7 \u26A0 OUTPUT DID NOT PARSE (truncated/runaway \u2014 nothing applied)" : "";
      const lines = [
        `- msg #${e.msgId} \xB7 ${lat}${val}${fail}`,
        // raw model output + applied delta are the whole point of the report —
        // keep them essentially full (a very high cap only guards a runaway model).
        `    raw:     ${clip(raw.replace(/\s+/g, " "), 24e3)}`,
        `    applied: ${clip(JSON.stringify(e.delta ?? {}), 24e3)}`
      ];
      if (includeProse) lines.push(`    input:   ${JSON.stringify(e.user ?? "")}`);
      return lines;
    });
  }
  function buildDiagnosticReport(includeProse) {
    const vitals = (ctx?.getDoctorVitals?.() || []).map((x) => `- ${x.label}: ${String(x.value).replace(/<[^>]+>/g, "")}${x.dot === "warn" ? "  [!]" : ""}`).join("\n");
    const s = ctx?.getSettings?.() || {};
    const state = ctx?.getState?.() || {};
    const cap = ctx?.getCapture?.() || [];
    return [
      "```",
      "BEHOLDER DIAGNOSTIC REPORT",
      `generated: ${(/* @__PURE__ */ new Date()).toISOString()}`,
      "",
      // Character NAMES are intentionally included (state + turns below): attribution,
      // color, and slot bugs are impossible to diagnose without them. The endpoint URL
      // + API key are still stripped — the VITALS "Endpoint" row reports only a
      // paste-safe kind (localhost / LAN IP / remote host). RP prose stays opt-in.
      "PRIVACY: API key + endpoint URL stripped. Character names ARE included (needed",
      "         to debug). RP narration (prose) is excluded unless opted in below.",
      "",
      "VITALS",
      vitals || "- (none)",
      "",
      "SETTINGS",
      `- model: ${s.model || ""}`,
      `- inject: ${s.injectionPosition} (depth ${s.injectionDepth})`,
      `- inferredColors: ${s.inferredColors}`,
      "",
      "CURRENT STATE",
      clip(JSON.stringify(state, null, 2), 24e3),
      "",
      "RECENT EXTRACTION TURNS (newest first \u2014 raw model output + applied delta)",
      ...reportTurns(cap, includeProse),
      "",
      includeProse ? "RP PROSE: INCLUDED above as each turn's `input` (explicit opt-in)" : "RP PROSE: excluded (the model input / narration is withheld \u2014 toggle to include)",
      "```"
    ].join("\n");
  }
  function buildDoctorView($body) {
    const s = ctx?.getSettings?.() || {};
    const vitals = (ctx?.getDoctorVitals?.() || []).map(vitalRowHtml).join("");
    const turns = recentTurns().map((t) => `
        <tr><td>${t.msg}</td><td>${t.latency}</td><td>${t.delta}</td><td>${t.validator}</td></tr>`).join("") || '<tr><td colspan="4" style="opacity:.5;">No extractions captured yet.</td></tr>';
    $body.html(`
        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-heart-pulse"></i> Vitals</summary>
            <div class="bh-vsection-body">
                <div class="bh-vitals">${vitals}</div>
            </div>
        </details>

        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-clock-rotate-left"></i> Recent extractions</summary>
            <div class="bh-vsection-body">
                <table class="bh-turns">
                    <thead><tr><th>msg</th><th>latency</th><th>delta</th><th>validator</th></tr></thead>
                    <tbody>${turns}</tbody>
                </table>
            </div>
        </details>

        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-file-medical"></i> Diagnostic report</summary>
            <div class="bh-vsection-body">
                <p>One block to paste into a bug report \u2014 it includes the <b>current state</b> and the
                   last few extractions (raw model output + applied delta). <b>Character names are
                   included</b>: attribution / color / slot bugs can't be diagnosed without them. Your
                   endpoint URL + API key are stripped, and RP prose is excluded unless you opt in.</p>
                <label class="bh-check">
                    <input type="checkbox" id="bhp-prose">
                    <span>Include RP prose (the model input) from the last 5 turns
                        <small>Off by default \u2014 your narration is private. State, deltas + names are included either way.</small></span>
                </label>
                <div class="bh-row-actions">
                    <button class="bh-btn bh-btn-primary" id="bhp-copyreport"><i class="fa-solid fa-copy"></i> Copy diagnostic report</button>
                    <button class="bh-btn" id="bhp-logstate"><i class="fa-solid fa-copy"></i> Copy current state (JSON)</button>
                </div>
                <details>
                    <summary style="cursor:pointer; opacity:.6; font-size:.9em;">Preview the report</summary>
                    <pre class="bh-code" id="bhp-reportpreview"></pre>
                </details>
            </div>
        </details>

        <details class="bh-vsection">
            <summary><i class="fa-solid fa-shield-halved"></i> Privacy &amp; debug</summary>
            <div class="bh-vsection-body">
                <p>Everything runs against <b>your</b> endpoint. Nothing leaves your machine except a
                   diagnostic report you copy yourself (and prose only if you opt in above).</p>
                <label class="bh-check">
                    <input type="checkbox" id="bhp-debug" ${s.debug ? "checked" : ""}>
                    <span>Verbose console logging
                        <small>Logs each extraction (input \xB7 raw output \xB7 applied delta) to the browser console (F12).</small></span>
                </label>
                <div class="bh-row-actions">
                    <button class="bh-btn" id="bhp-sweep"><i class="fa-solid fa-wand-magic-sparkles"></i> Clean impossible state</button>
                    <button class="bh-btn bh-btn-danger" id="bhp-clear"><i class="fa-solid fa-eraser"></i> Clear chat state</button>
                </div>
                <p class="bh-help" style="opacity:.6; font-size:.85em; margin:6px 0 0;">
                    <b>Clean impossible state</b> re-checks the stored state and removes only
                    anatomically-impossible entries (an eyepatch worn on a hand, a concussion on
                    the back, a rank/status word used as a species). User-locked slots are never
                    touched.</p>
            </div>
        </details>
    `);
    const refreshPreview = () => {
      $body.find("#bhp-reportpreview").text(
        buildDiagnosticReport($body.find("#bhp-prose").prop("checked"))
      );
    };
    refreshPreview();
    $body.find("#bhp-prose").on("change", refreshPreview);
    $body.find("#bhp-copyreport").on("click", () => {
      copyText(
        buildDiagnosticReport($body.find("#bhp-prose").prop("checked")),
        "Diagnostic report copied \u2014 paste it into the bug template"
      );
    });
    $body.find("#bhp-logstate").on("click", () => {
      const json = JSON.stringify(ctx?.getState?.() || {}, null, 2);
      console.log("[Beholder] current chat state:\n" + json);
      copyText(json, "Current state copied as JSON (also logged to console)");
    });
    $body.find("#bhp-debug").on("change", function() {
      ctx?.saveSettings?.({ debug: this.checked });
    });
    $body.find("#bhp-clear").on("click", () => {
      ctx?.clearChatState?.();
      toast("Chat state cleared for this chat");
    });
    $body.find("#bhp-sweep").on("click", () => {
      const res = ctx?.sweepChatState?.();
      if (!res) return;
      if (res.changed) {
        toast(`Cleaned ${res.removed} impossible ${res.removed === 1 ? "entry" : "entries"} from stored state`);
      } else {
        toast("State is already clean \u2014 nothing impossible found");
      }
    });
    if (ctx?.probeEndpoint) {
      ctx.probeEndpoint().then(() => {
        $body.find(".bh-vitals").html((ctx?.getDoctorVitals?.() || []).map(vitalRowHtml).join(""));
      }).catch(() => {
      });
    }
  }
  function buildInspectorView($body) {
    const cap = ctx?.getCapture?.() || [];
    const entry = cap[cap.length - 1] || null;
    if (!entry) {
      $body.html(`
            <p style="opacity:.7;">No extraction has run yet in this chat. Send a message (or build
            history) and the most recent round-trip will appear here.</p>`);
      return;
    }
    const system = entry.system || "";
    const promptChars = commaNum(system.length);
    const rawOut = typeof entry.raw === "string" ? entry.raw : JSON.stringify(entry.raw ?? {}, null, 1);
    const mergedDelta = JSON.stringify(entry.delta ?? {}, null, 1);
    const latency = entry.latencyMs != null ? `${(entry.latencyMs / 1e3).toFixed(1)} s` : "\u2014";
    const injected = (ctx?.getInjectedText?.() || "").trim();
    const isDirective = entry.kind === "directive";
    const vlog = (entry.validatorLog || []).length ? entry.validatorLog.map((v) => `
            <div class="bh-vlog-row bh-vlog-${v.sev === "ok" ? "ok" : v.sev}">
                <b>${esc(v.rule)}</b><span>${esc(v.text)}</span>
            </div>`).join("") : `<div class="bh-vlog-row bh-vlog-${entry.validatorActive || isDirective ? "ok" : "warn"}">
                <b>VALIDATOR</b><span>${entry.validatorActive ? "Active (parity with datagen) \u2014 no findings on this turn." : isDirective ? "Not applied \u2014 this turn was a manual directive (you set the state directly), so the validator is skipped by design." : "Off \u2014 model output applied as received."}</span>
           </div>`;
    $body.html(`
        <p style="margin:0 0 10px; opacity:.7;">The full round-trip for the most recent message \u2014
        exactly what the model saw and answered. <b>Copy all</b> grabs a shareable reproducer.</p>
        ${entry.parseFailed ? `<div class="bh-vlog-row bh-vlog-error" style="margin:0 0 10px;">
            <b>OUTPUT DID NOT PARSE</b><span>The model produced ${typeof entry.raw === "string" ? entry.raw.length : 0} chars
            that couldn't be parsed or repaired into JSON \u2014 a truncated or runaway generation. Nothing was
            applied this turn. Check the raw output below.</span></div>` : ""}

        <details class="bh-vsection">
            <summary><i class="fa-solid fa-scroll"></i> System prompt
                <span class="bh-pane-meta" id="bhp-sysmeta">${promptChars} chars</span></summary>
            <div class="bh-vsection-body">
                <pre class="bh-code">${esc(system)}</pre>
            </div>
        </details>

        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-feather-pointed"></i> Model input
                <span class="bh-pane-meta">prose + previous state</span></summary>
            <div class="bh-vsection-body">
                <pre class="bh-code">${esc(entry.user || "")}</pre>
            </div>
        </details>

        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-robot"></i> Raw model output
                <span class="bh-pane-meta">${latency}</span></summary>
            <div class="bh-vsection-body">
                <pre class="bh-code">${esc(rawOut)}</pre>
            </div>
        </details>

        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-syringe"></i> Injected into the RP model
                <span class="bh-pane-meta">current state \xB7 ${commaNum(injected.length)} chars</span></summary>
            <div class="bh-vsection-body">
                <pre class="bh-code">${injected ? esc(injected) : "(nothing injected \u2014 state is empty)"}</pre>
            </div>
        </details>

        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-list-check"></i> Validator</summary>
            <div class="bh-vsection-body">
                <div class="bh-vlog">${vlog}</div>
            </div>
        </details>

        <details class="bh-vsection">
            <summary><i class="fa-solid fa-code-merge"></i> Merged delta \u2192 applied</summary>
            <div class="bh-vsection-body">
                <pre class="bh-code">${esc(mergedDelta)}</pre>
            </div>
        </details>

        <div class="bh-row-actions" style="margin-top:4px;">
            <button class="bh-btn bh-btn-primary" id="bhp-copyall"><i class="fa-solid fa-copy"></i> Copy all (markdown)</button>
        </div>
    `);
    sha12(system).then((sha) => {
      $body.find("#bhp-sysmeta").text(`sha ${sha} \xB7 ${promptChars} chars`);
    });
    $body.find("#bhp-copyall").on("click", async () => {
      const sha = await sha12(system);
      const md = [
        "### Beholder extraction reproducer",
        `**system prompt:** sha \`${sha}\` \xB7 ${promptChars} chars`,
        "",
        "**input:**",
        "```",
        entry.user || "",
        "```",
        "",
        "**raw output:**",
        "```json",
        rawOut,
        "```",
        "",
        "**validator:**",
        ...(entry.validatorLog || []).length ? entry.validatorLog.map((v) => `- [${v.sev}] ${v.rule}: ${v.text}`) : [entry.validatorActive ? "- validator active \u2014 no findings" : "- validator off"],
        "",
        "**merged delta:**",
        "```json",
        mergedDelta,
        "```"
      ].join("\n");
      copyText(md, "Reproducer copied \u2014 paste anywhere");
    });
  }
  function buildHelpView($body) {
    $body.html(`
        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-palette"></i> Reading the panel</summary>
            <div class="bh-vsection-body">
                <div class="bh-legend-row"><span class="bh-legend-bar bh-tier-0"></span>pristine</div>
                <div class="bh-legend-row"><span class="bh-legend-bar bh-tier-2"></span>damaged</div>
                <div class="bh-legend-row"><span class="bh-legend-bar bh-tier-4"></span>broken</div>
                <div class="bh-legend-row"><span class="bh-legend-bar bh-tier-holding"></span>held item \xB7 \u2726</div>
                <div class="bh-legend-row"><span class="bh-legend-dot"></span>wound \u2014 fill tint on the silhouette, \u271A chip in the slot</div>
                <p style="margin-top:8px;">Ring around a body part = armor damage. Fill inside it = the body itself.
                   Tap any slot card to <b>edit or lock</b> it.</p>
            </div>
        </details>

        <details class="bh-vsection" open>
            <summary><i class="fa-solid fa-pen-nib"></i> Writing for the extractor</summary>
            <div class="bh-vsection-body">
                <ul class="bh-tips">
                    <li><b>Narrate state changes</b> \u2014 "she shrugs the cloak off" beats "(takes off cloak)" in dialogue.</li>
                    <li><b>Name items specifically</b> \u2014 "gunmetal vambrace" tracks better than "the armor".</li>
                    <li><b>Be explicit about loss</b> \u2014 "the glass slipped from her grip", not "her hand was empty".</li>
                    <li><b>Possessives are fine</b> ("his guard") when it's clear whose \u2014 avoid them in same-gender scenes.</li>
                </ul>
            </div>
        </details>

        <div class="bh-orn" aria-hidden="true"><span></span>\u25C9<span></span></div>
        <p style="text-align:center; font-family: var(--bh-font-display); font-size:1.08em; opacity:.8; margin:0 0 6px;">
            Out of sight, out of prompt. <span style="color:var(--bh-gold,#ffeaa7);">Beholder doesn't blink.</span></p>
    `);
  }
  function activeCharName() {
    return $("#beholder_panel .bh-char-doll").data("char") || null;
  }
  function wireSlotEditing($panel) {
    $panel.find(".beholder-panel-body").off("click.bhEdit").on("click.bhEdit", ".bh-slot-card", function(e) {
      if ($(e.target).closest(".bh-editor").length) return;
      e.stopPropagation();
      openEditor($(this));
    });
  }
  function closeEditor() {
    $("#beholder_panel .bh-editor").remove();
    $(document).off("click.bhEditor keydown.bhEditor");
  }
  function selectHtml(cls, values, current, labels) {
    const opts = values.map((v) => `<option value="${esc(v)}" ${v === (current ?? "") ? "selected" : ""}>${esc(labels?.[v] ?? (v || "\u2014 color \u2014"))}</option>`).join("");
    return `<select class="bh-select ${cls}">${opts}</select>`;
  }
  function wornRowHtml(w = {}) {
    return `<div class="bh-editor-row bh-editor-row-worn">
        <input class="bh-input bhe-item" type="text" placeholder="item" value="${esc(w.item || "")}">
        ${selectHtml("bhe-damage", DAMAGE_VALUES, w.damage || "pristine")}
        ${selectHtml("bhe-color", COLOR_VALUES, (w.color || "").toLowerCase())}
        <button class="bh-editor-remove fa-solid fa-xmark" title="Remove"></button>
    </div>`;
  }
  function woundRowHtml(w = {}) {
    const text = typeof w === "string" ? w : w.text || "";
    const sev = typeof w === "object" && w.severity ? String(w.severity) : "serious";
    const bleeding = typeof w === "object" && w.bleeding === true;
    return `<div class="bh-editor-row bh-editor-row-wound">
        <input class="bh-input bhe-wtext" type="text" placeholder="wound" value="${esc(text)}">
        ${selectHtml("bhe-wsev", SEVERITY_VALUES, sev)}
        <label class="bh-bleed-check" title="bleeding"><input type="checkbox" class="bhe-wbleed" ${bleeding ? "checked" : ""}>\u{1FA78}</label>
        <button class="bh-editor-remove fa-solid fa-xmark" title="Remove"></button>
    </div>`;
  }
  function editorFormHtml(slotState, isHand) {
    const holding = slotState.holding ? typeof slotState.holding === "string" ? { item: slotState.holding } : slotState.holding : null;
    return `
        <div class="bh-editor-group-label">worn <span style="opacity:.5; letter-spacing:0; text-transform:none;">(outer \u2192 inner)</span></div>
        <div class="bhe-worn-list">${(slotState.worn || []).map(wornRowHtml).join("")}</div>
        <button class="bh-editor-add bhe-add-worn"><i class="fa-solid fa-plus"></i> add worn item</button>
        ${isHand ? `
        <div class="bh-editor-group-label">holding</div>
        <div class="bh-editor-row bhe-holding-row">
            <input class="bh-input bhe-hitem" type="text" placeholder="nothing held" value="${esc(holding?.item || "")}">
            ${selectHtml("bhe-hdamage", DAMAGE_VALUES, holding?.damage || "pristine")}
            ${selectHtml("bhe-hcolor", COLOR_VALUES, (holding?.color || "").toLowerCase())}
            <button class="bh-editor-remove bhe-drop fa-solid fa-hand-holding" title="Drop item"></button>
        </div>` : ""}
        <div class="bh-editor-group-label">wounds</div>
        <div class="bhe-wound-list">${(slotState.wounds || []).map(woundRowHtml).join("")}</div>
        <button class="bh-editor-add bhe-add-wound"><i class="fa-solid fa-plus"></i> add wound</button>
        <div class="bh-editor-group-label">flags</div>
        <div class="bh-row-actions">
            <label class="bh-check"><input type="checkbox" class="bhe-bare" ${slotState.bare ? "checked" : ""}>
                <span>bare <small>confirmed uncovered \u2014 clears worn on apply</small></span></label>
            <label class="bh-check"><input type="checkbox" class="bhe-missing" ${slotState.missing ? "checked" : ""}>
                <span>missing <small>lost limb / feature \u2014 overrides everything</small></span></label>
        </div>`;
  }
  function wireEditorForm($scope) {
    $scope.find(".bhe-add-worn").on("click", () => $scope.find(".bhe-worn-list").append(wornRowHtml()));
    $scope.find(".bhe-add-wound").on("click", () => $scope.find(".bhe-wound-list").append(woundRowHtml()));
    $scope.on("click", ".bh-editor-remove:not(.bhe-drop)", function(e) {
      e.stopPropagation();
      $(this).closest(".bh-editor-row").remove();
    });
    $scope.find(".bhe-drop").on("click", () => {
      $scope.find(".bhe-hitem").val("");
      toast("Item will be dropped on apply");
    });
    $scope.find(".bhe-missing").on("change", function() {
      $(this).closest(".bh-editor-body").toggleClass("bhe-missing-mode", this.checked);
    });
  }
  function collectEditorForm($scope, isHand) {
    const next = {};
    if ($scope.find(".bhe-missing").prop("checked")) {
      next.missing = true;
      return next;
    }
    const worn = [];
    $scope.find(".bhe-worn-list .bh-editor-row").each(function() {
      const item = $(this).find(".bhe-item").val().trim();
      if (!item) return;
      const w = { item, damage: $(this).find(".bhe-damage").val() };
      const color = $(this).find(".bhe-color").val();
      if (color) w.color = color;
      worn.push(w);
    });
    const bare = $scope.find(".bhe-bare").prop("checked");
    if (bare) next.bare = true;
    else if (worn.length) next.worn = worn;
    if (isHand) {
      const hitem = $scope.find(".bhe-hitem").val().trim();
      if (hitem) {
        next.holding = { item: hitem, damage: $scope.find(".bhe-hdamage").val() };
        const hc = $scope.find(".bhe-hcolor").val();
        if (hc) next.holding.color = hc;
      }
    }
    const wounds = [];
    $scope.find(".bhe-wound-list .bh-editor-row").each(function() {
      const text = $(this).find(".bhe-wtext").val().trim();
      if (!text) return;
      wounds.push({ text, severity: $(this).find(".bhe-wsev").val(), bleeding: $(this).find(".bhe-wbleed").prop("checked") });
    });
    if (wounds.length) next.wounds = wounds;
    return next;
  }
  function applySlotEdit(char, slot, next) {
    ctx?.applyUserEdit?.(char, slot, next);
  }
  function lockToggleHtml(key) {
    const on = locksHas(key);
    return `<span class="bh-lock-toggle ${on ? "bh-locked-on" : ""}" title="Locked slots ignore model updates \u2014 your value wins until you unlock.">
        <i class="fa-solid ${on ? "fa-lock" : "fa-lock-open"}"></i><span>${on ? "locked" : "lock"}</span></span>`;
  }
  function wireLockToggle($toggle, char, slot, label) {
    const key = lockKey(char, slot);
    $toggle.on("click", function() {
      const on = !locksHas(key);
      ctx?.setLock?.(char, slot, on);
      $(this).toggleClass("bh-locked-on", on).find("i").attr("class", `fa-solid ${on ? "fa-lock" : "fa-lock-open"}`);
      $(this).find("span").text(on ? "locked" : "lock");
      decorateCards();
      toast(on ? `\u{1F512} ${char} \xB7 ${label} locked \u2014 model updates ignored` : `${char} \xB7 ${label} unlocked`);
    });
  }
  function openEditor($card) {
    closeEditor();
    const $panel = $("#beholder_panel");
    const slot = $card.data("slot");
    const char = activeCharName();
    if (!slot || !char) return;
    const state = ctx?.getState?.() || {};
    const slotState = state[char]?.body?.[slot] || {};
    const slotLabel = $card.find(".bh-slot-name").first().text() || slot;
    const isHand = HAND_SLOTS.has(slot);
    const $ed = $(`
        <div class="bh-editor" role="dialog" aria-label="Edit ${esc(slotLabel)}">
            <div class="bh-editor-head">
                <span class="bh-editor-title">${esc(char)}</span>
                <span class="bh-editor-slot">\xB7 ${esc(slotLabel)}</span>
                ${lockToggleHtml(lockKey(char, slot))}
                <span class="bh-editor-close fa-solid fa-xmark" title="Close"></span>
            </div>
            <div class="bh-editor-body">${editorFormHtml(slotState, isHand)}</div>
            <div class="bh-editor-foot">
                <button class="bh-btn bhe-cancel">Cancel</button>
                <button class="bh-btn bh-btn-primary bhe-apply"><i class="fa-solid fa-check"></i> Apply</button>
            </div>
        </div>
    `);
    $panel.append($ed);
    const panelRect = $panel[0].getBoundingClientRect();
    const cardRect = $card[0].getBoundingClientRect();
    const edW = Math.min(330, panelRect.width - 16);
    $ed.css({ width: `${edW}px` });
    let left = cardRect.left - panelRect.left;
    left = Math.max(8, Math.min(left, panelRect.width - edW - 8));
    let top = cardRect.bottom - panelRect.top + 6;
    const edH = $ed.outerHeight() || 320;
    if (top + edH > panelRect.height - 8) {
      top = Math.max(44, cardRect.top - panelRect.top - edH - 6);
    }
    $ed.css({ left: `${left}px`, top: `${top}px` });
    $ed.on("mousedown", (e) => e.stopPropagation());
    $ed.find(".bh-editor-close, .bhe-cancel").on("click", closeEditor);
    wireEditorForm($ed);
    wireLockToggle($ed.find(".bh-lock-toggle"), char, slot, slotLabel);
    if (slotState.missing) $ed.find(".bh-editor-body").addClass("bhe-missing-mode");
    $ed.find(".bhe-apply").on("click", () => {
      applySlotEdit(char, slot, collectEditorForm($ed, isHand));
      closeEditor();
      toast(`\u270E ${char} \xB7 ${slotLabel} updated \u2014 user edits persist until you change them`);
    });
    setTimeout(() => {
      $(document).on("click.bhEditor", (e) => {
        if (e.target && e.target.isConnected === false) return;
        if (!$(e.target).closest(".bh-editor,.bh-slot-card").length) closeEditor();
      });
      $(document).on("keydown.bhEditor", (e) => {
        if (e.key === "Escape") closeEditor();
      });
    }, 0);
  }
  var PICKER_REGIONS = [
    { label: "Head & Face", slots: ["head", "face", "left_eye", "right_eye", "left_ear", "right_ear", "mouth", "neck"] },
    { label: "Torso", slots: ["left_shoulder", "right_shoulder", "chest", "back", "waist"] },
    { label: "Arms & Hands", slots: ["left_arm", "right_arm", "left_hand", "right_hand"] },
    { label: "Legs & Feet", slots: ["left_leg", "right_leg", "left_foot", "right_foot"] },
    { label: "Species", slots: ["tail", "hind_left_leg", "hind_right_leg", "hind_left_foot", "hind_right_foot"] }
  ];
  var SPECIES_CONDITIONAL = /* @__PURE__ */ new Set(["tail", "hind_left_leg", "hind_right_leg", "hind_left_foot", "hind_right_foot"]);
  var FAMILY_EXTRA = {
    centauroid: /* @__PURE__ */ new Set(["tail", "hind_left_leg", "hind_right_leg", "hind_left_foot", "hind_right_foot"]),
    serpentine: /* @__PURE__ */ new Set(["tail"]),
    digitigrade: /* @__PURE__ */ new Set(["tail"])
  };
  var SLOT_LABELS = {
    head: "head",
    face: "face",
    neck: "neck",
    chest: "chest",
    back: "back",
    waist: "waist",
    mouth: "mouth",
    tail: "tail",
    left_eye: "L. eye",
    right_eye: "R. eye",
    left_ear: "L. ear",
    right_ear: "R. ear",
    left_shoulder: "L. shoulder",
    right_shoulder: "R. shoulder",
    left_arm: "L. arm",
    right_arm: "R. arm",
    left_hand: "L. hand",
    right_hand: "R. hand",
    left_leg: "L. leg",
    right_leg: "R. leg",
    left_foot: "L. foot",
    right_foot: "R. foot",
    hind_left_leg: "L. hind leg",
    hind_right_leg: "R. hind leg",
    hind_left_foot: "L. hind foot",
    hind_right_foot: "R. hind foot"
  };
  function slotSummary(sd) {
    if (!sd) return { text: "empty", cls: "bh-pick-empty" };
    if (sd.missing) return { text: "missing", cls: "bh-pick-missing" };
    const parts = (sd.worn || []).map((w) => w.item).filter(Boolean);
    if (sd.holding) parts.push("\u2726 " + (typeof sd.holding === "string" ? sd.holding : sd.holding.item));
    const nw = (sd.wounds || []).length;
    let text = parts.join(", ");
    if (nw) text += (text ? " \xB7 " : "") + `${nw} wound${nw > 1 ? "s" : ""}`;
    if (!text) return sd.bare ? { text: "bare", cls: "bh-pick-bare" } : { text: "empty", cls: "bh-pick-empty" };
    return { text, cls: "" };
  }
  function closeEditSheet() {
    $("#beholder_panel .bh-edit-sheet, #beholder_panel .bh-sheet-backdrop").remove();
    $(document).off("keydown.bhSheet");
  }
  function openEditSheet() {
    closeEditor();
    closeEditSheet();
    const $panel = $("#beholder_panel");
    const $backdrop = $('<div class="bh-sheet-backdrop"></div>');
    const $sheet = $(`
        <div class="bh-edit-sheet" role="dialog" aria-label="Edit slots">
            <div class="bh-sheet-head">
                <span class="bh-sheet-back fa-solid fa-arrow-left" title="Back to slots" hidden></span>
                <span class="bh-sheet-title">Edit a slot</span>
                <span class="bh-sheet-close fa-solid fa-xmark" title="Close"></span>
            </div>
            <div class="bh-sheet-body"></div>
        </div>`);
    $panel.append($backdrop).append($sheet);
    $sheet.on("mousedown", (e) => e.stopPropagation());
    $backdrop.on("click", closeEditSheet);
    $sheet.find(".bh-sheet-close").on("click", closeEditSheet);
    $(document).on("keydown.bhSheet", (e) => {
      if (e.key === "Escape") closeEditSheet();
    });
    showSlotPicker($sheet);
  }
  function showSlotPicker($sheet) {
    const char = activeCharName();
    if (!char) {
      closeEditSheet();
      return;
    }
    const state = ctx?.getState?.() || {};
    const body = state[char]?.body || {};
    const family = familyOf(state[char]?.species);
    const offBody = OFF_BODY_SLOTS[family] || /* @__PURE__ */ new Set();
    const groups = PICKER_REGIONS.map((region) => {
      const slots = region.slots.filter((s) => {
        if (offBody.has(s)) return false;
        if (SPECIES_CONDITIONAL.has(s)) return FAMILY_EXTRA[family]?.has(s) || body[s] != null;
        return true;
      });
      if (!slots.length) return "";
      const rows = slots.map((s) => {
        const sum = slotSummary(body[s]);
        const key = lockKey(char, s);
        const marks = (locksHas(key) ? '<i class="fa-solid fa-lock bh-pick-mark bh-pick-lock"></i>' : "") + (editedHas(key) ? '<span class="bh-pick-mark bh-pick-edited">\u270E</span>' : "");
        return `<button class="bh-pick-slot" data-slot="${s}">
                <span class="bh-pick-label">${SLOT_LABELS[s] || s}</span>
                <span class="bh-pick-summary ${sum.cls}">${esc(sum.text)}</span>
                ${marks}
                <i class="fa-solid fa-chevron-right bh-pick-arrow"></i>
            </button>`;
      }).join("");
      return `<div class="bh-pick-region"><div class="bh-pick-region-head">${region.label}</div>${rows}</div>`;
    }).join("");
    $sheet.find(".bh-sheet-back").prop("hidden", true).off("click");
    $sheet.find(".bh-sheet-title").text(`${char} \u2014 edit a slot`);
    $sheet.find(".bh-sheet-body").scrollTop(0).html(`<div class="bh-slot-picker">${groups}</div>`);
    $sheet.find(".bh-pick-slot").on("click", function() {
      showSlotEditorScreen($sheet, $(this).data("slot"));
    });
  }
  function showSlotEditorScreen($sheet, slot) {
    const char = activeCharName();
    if (!char || !slot) return;
    const state = ctx?.getState?.() || {};
    const slotState = state[char]?.body?.[slot] || {};
    const isHand = HAND_SLOTS.has(slot);
    const label = SLOT_LABELS[slot] || slot;
    $sheet.find(".bh-sheet-back").prop("hidden", false).off("click").on("click", () => showSlotPicker($sheet));
    $sheet.find(".bh-sheet-title").html(`${esc(char)} <span style="opacity:.55">\xB7 ${esc(label)}</span>`);
    $sheet.find(".bh-sheet-body").scrollTop(0).html(`
        <div class="bh-sheet-lockrow">${lockToggleHtml(lockKey(char, slot))}</div>
        <div class="bh-editor-body">${editorFormHtml(slotState, isHand)}</div>
        <div class="bh-editor-foot">
            <button class="bh-btn bhe-cancel2">Back</button>
            <button class="bh-btn bh-btn-primary bhe-apply"><i class="fa-solid fa-check"></i> Apply</button>
        </div>`);
    const $scope = $sheet.find(".bh-sheet-body");
    wireEditorForm($scope);
    wireLockToggle($scope.find(".bh-lock-toggle"), char, slot, label);
    if (slotState.missing) $scope.find(".bh-editor-body").addClass("bhe-missing-mode");
    $scope.find(".bhe-cancel2").on("click", () => showSlotPicker($sheet));
    $scope.find(".bhe-apply").on("click", () => {
      applySlotEdit(char, slot, collectEditorForm($scope, isHand));
      toast(`\u270E ${char} \xB7 ${label} updated`);
      showSlotPicker($sheet);
    });
  }
  function decorateCards() {
    const char = activeCharName();
    if (!char) return;
    $("#beholder_panel .bh-slot-card").each(function() {
      const $c = $(this);
      const key = lockKey(char, $c.data("slot"));
      const locked = locksHas(key);
      $c.toggleClass("bh-slot-locked", locked);
      $c.toggleClass("bh-slot-user-edited", editedHas(key));
      const hasGlyph = $c.find(".bh-slot-lock-glyph").length > 0;
      if (locked && !hasGlyph) {
        $c.find(".bh-slot-name").first().after('<span class="bh-slot-lock-glyph fa-solid fa-lock" title="locked \u2014 model updates ignored"></span>');
      } else if (!locked && hasGlyph) {
        $c.find(".bh-slot-lock-glyph").remove();
      }
    });
  }
  function setPanelLayout(mode) {
    const layout = ["paired", "columns", "list"].includes(mode) ? mode : "paired";
    const $panel = $("#beholder_panel");
    ctx?.saveSettings?.({ layout });
    $panel.toggleClass("bh-layout-compact", layout === "list");
    ctx?.setDollLayout?.(layout);
    ctx?.rerender?.();
  }
  function currentLayout2() {
    const s = ctx?.getSettings?.() || {};
    return ["paired", "columns", "list"].includes(s.layout) ? s.layout : "paired";
  }
  function markLayoutSwitches($panel) {
    const layout = currentLayout2();
    $panel.find(".bh-layout-switch .bh-ls-opt").each(function() {
      this.classList.toggle("bh-ls-active", this.dataset.layout === layout);
    });
  }
  function onPanelRendered() {
    const $panel = $("#beholder_panel");
    if (!$panel.length) return;
    wireSlotEditing($panel);
    decorateCards();
    $panel.find(".bh-layout-switch .bh-ls-opt").off("click.bhLs").on("click.bhLs", function(e) {
      e.stopPropagation();
      setPanelLayout($(this).data("layout"));
    });
    $panel.find(".bh-digest-edit").off("click.bhEditSheet").on("click.bhEditSheet", function(e) {
      e.stopPropagation();
      openEditSheet();
    });
    markLayoutSwitches($panel);
  }
  function wireNoteBox({ input, button, onDirective }) {
    const fire = () => {
      const text = input.value.trim();
      if (!text) {
        toast('Type an intent first \u2014 e.g. "set my sword to broken"');
        return;
      }
      input.value = "";
      onDirective?.(text);
      toast(`\u2726 Applied now: "${text}" \u2014 your edit wins (and is in the prompt for the next reply)`);
    };
    button.addEventListener("click", fire);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") fire();
    });
  }

  // panel.js
  var PANEL_ID = "beholder_panel";
  function ensurePanelDom() {
    let $panel = $(`#${PANEL_ID}`);
    if ($panel.length) return $panel;
    $panel = $(`
        <div id="${PANEL_ID}" class="beholder-panel" data-empty="true">
            <div class="beholder-panel-header">
                <span class="beholder-panel-title">Beholder</span>
                <span class="beholder-panel-controls">
                    <span class="beholder-backfill-group" role="group" aria-label="Build state from history">
                        <span class="beholder-backfill-btn fa-solid fa-clock-rotate-left" title="Build state from chat history (incremental \u2014 adds the card seed + walks unprocessed messages)"></span>
                        <span class="beholder-backfill-more fa-solid fa-caret-down" title="More build options"></span>
                    </span>
                    <span class="bh-header-sep" aria-hidden="true"></span>
                    <span class="beholder-tool-btn fa-solid fa-gear" data-view="settings" role="button" tabindex="0" title="Settings \u2014 connection, display, extraction" aria-label="Settings \u2014 connection, display, extraction"></span>
                    <span class="beholder-tool-btn fa-solid fa-users" data-view="characters" role="button" tabindex="0" title="Characters \u2014 aliases, hide, reorder" aria-label="Characters \u2014 aliases, hide, reorder"></span>
                    <span class="beholder-tool-btn fa-solid fa-stethoscope" data-view="doctor" role="button" tabindex="0" title="Doctor \u2014 health checks + diagnostic report" aria-label="Doctor \u2014 health checks + diagnostic report"></span>
                    <span class="beholder-tool-btn fa-solid fa-magnifying-glass" data-view="inspector" role="button" tabindex="0" title="Inspector \u2014 the last extraction, end to end" aria-label="Inspector \u2014 the last extraction, end to end"></span>
                    <span class="beholder-tool-btn fa-solid fa-circle-question" data-view="help" role="button" tabindex="0" title="Help \u2014 legend + writing tips" aria-label="Help \u2014 legend + writing tips"></span>
                    <span class="beholder-tools-more fa-solid fa-ellipsis-vertical" role="button" tabindex="0" title="Beholder tools" aria-label="Beholder tools"></span>
                    <span class="bh-header-sep" aria-hidden="true"></span>
                    <span class="beholder-close fa-solid fa-xmark" title="Hide (re-enable from settings)"></span>
                </span>
            </div>
            <div class="beholder-backfill-status" hidden></div>
            <div class="beholder-layer-bar" role="group" aria-label="Detail layers">
                <label class="bh-layer-cell" data-layer="color" title="Color word annotation on chips"><input type="checkbox" name="bh-view-layer" value="color"><span>Color</span></label>
                <label class="bh-layer-cell" data-layer="damage" title="Damage-tier visuals + damage word"><input type="checkbox" name="bh-view-layer" value="damage"><span>Damage</span></label>
                <label class="bh-layer-cell" data-layer="wounds" title="Wounds, bleeding, severity"><input type="checkbox" name="bh-view-layer" value="wounds"><span>Wounds</span></label>
            </div>
            <div class="beholder-panel-body"></div>
            <div class="beholder-resize-handle" title="Drag to resize height"></div>
        </div>
    `);
    $("body").append($panel);
    return $panel;
  }
  function applyPosition($panel, pos) {
    if (pos && typeof pos.left === "number" && typeof pos.top === "number") {
      $panel.css({ left: pos.left + "px", top: pos.top + "px", right: "auto", bottom: "auto" });
    } else {
      $panel.css({ right: "20px", bottom: "20px", left: "auto", top: "auto" });
    }
  }
  function clampToViewport(left, top, w, h) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
      left: Math.max(0, Math.min(left, vw - Math.min(w, vw))),
      top: Math.max(0, Math.min(top, vh - 40))
    };
  }
  function wireResize($panel, settings, save) {
    const $handle = $panel.find(".beholder-resize-handle");
    let resizeStart = null;
    $handle.on("mousedown", (e) => {
      const rect = $panel[0].getBoundingClientRect();
      resizeStart = { my: e.clientY, h: rect.height };
      $panel.addClass("beholder-resizing");
      e.preventDefault();
      e.stopPropagation();
    });
    $(document).on("mousemove.beholderResize", (e) => {
      if (!resizeStart) return;
      const h = Math.max(200, resizeStart.h + (e.clientY - resizeStart.my));
      $panel.css({ height: h + "px" });
      $panel.attr("data-resized", "true");
    });
    $(document).on("mouseup.beholderResize", () => {
      if (!resizeStart) return;
      $panel.removeClass("beholder-resizing");
      const rect = $panel[0].getBoundingClientRect();
      settings.panel = settings.panel || {};
      settings.panel.height = Math.round(rect.height);
      save();
      resizeStart = null;
    });
  }
  function wireDrag($panel, settings, save) {
    let dragStart = null;
    const DRAG_HANDLE = ".beholder-panel-header,.bh-view-head";
    const NO_DRAG = ".beholder-close,.beholder-backfill-group,.beholder-bf-menu,.bh-layer-cell,.beholder-tool-btn,.beholder-tools-more,.beholder-tools-menu,.bh-view-back,.bh-editor,.bh-edit-sheet,.bh-sheet-backdrop";
    $panel.on("mousedown", DRAG_HANDLE, (e) => {
      if ($(e.target).closest(NO_DRAG).length) return;
      const rect = $panel[0].getBoundingClientRect();
      dragStart = { mx: e.clientX, my: e.clientY, left: rect.left, top: rect.top, w: rect.width, h: rect.height };
      $panel.addClass("beholder-dragging");
      e.preventDefault();
    });
    $(document).on("mousemove.beholder", (e) => {
      if (!dragStart) return;
      const dx = e.clientX - dragStart.mx;
      const dy = e.clientY - dragStart.my;
      const clamped = clampToViewport(dragStart.left + dx, dragStart.top + dy, dragStart.w, dragStart.h);
      $panel.css({ left: clamped.left + "px", top: clamped.top + "px", right: "auto", bottom: "auto" });
    });
    $(document).on("mouseup.beholder", () => {
      if (!dragStart) return;
      $panel.removeClass("beholder-dragging");
      const rect = $panel[0].getBoundingClientRect();
      settings.panel = settings.panel || {};
      settings.panel.pos = { left: rect.left, top: rect.top };
      save();
      dragStart = null;
    });
  }
  var HEADER_TOOLS = [
    { view: "settings", icon: "fa-gear", label: "Settings" },
    { view: "characters", icon: "fa-users", label: "Characters" },
    { view: "doctor", icon: "fa-stethoscope", label: "Doctor" },
    { view: "inspector", icon: "fa-magnifying-glass", label: "Inspector" },
    { view: "help", icon: "fa-circle-question", label: "Help" }
  ];
  function closeToolsMenu($panel) {
    $panel.find(".beholder-tools-menu").remove();
    $panel.find(".beholder-tools-more").removeClass("bh-more-open");
    $(document).off("click.bhTools keydown.bhTools");
  }
  function toggleToolsMenu($panel) {
    if ($panel.find(".beholder-tools-menu").length) {
      closeToolsMenu($panel);
      return;
    }
    const items = HEADER_TOOLS.map(
      (t) => `<button class="beholder-tools-item" data-view="${t.view}" role="menuitem">
            <i class="fa-solid ${t.icon}"></i><span>${t.label}</span>
        </button>`
    ).join("");
    const $menu = $(`<div class="beholder-tools-menu" role="menu">${items}</div>`);
    $panel.find(".beholder-tools-more").addClass("bh-more-open");
    $panel.find(".beholder-panel-header").append($menu);
    $menu.on("mousedown", (e) => e.stopPropagation());
    $menu.find(".beholder-tools-item").on("click", function(e) {
      e.stopPropagation();
      const view = $(this).data("view");
      closeToolsMenu($panel);
      openView(view);
    });
    setTimeout(() => {
      $(document).on("click.bhTools", (e) => {
        if (!$(e.target).closest(".beholder-tools-menu, .beholder-tools-more").length) closeToolsMenu($panel);
      });
      $(document).on("keydown.bhTools", (e) => {
        if (e.key === "Escape") closeToolsMenu($panel);
      });
    }, 0);
  }
  function wireControls($panel, settings, save, onClose) {
    $panel.find(".beholder-close").on("click", () => {
      $panel.hide();
      settings.panel = settings.panel || {};
      settings.panel.visible = false;
      save();
      onClose?.();
    });
    $panel.find(".beholder-tool-btn").on("mousedown", (e) => e.stopPropagation()).on("click", function(e) {
      e.stopPropagation();
      openView($(this).data("view"));
    }).on("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openView($(this).data("view"));
      }
    });
    $panel.find(".beholder-tools-more").on("mousedown", (e) => e.stopPropagation()).on("click", (e) => {
      e.stopPropagation();
      toggleToolsMenu($panel);
    }).on("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleToolsMenu($panel);
      }
    });
    const LAYER_KEYS = ["color", "damage", "wounds"];
    settings.panel = settings.panel || {};
    if (!settings.panel.viewLayers || typeof settings.panel.viewLayers !== "object") {
      const lvl = Number(settings.panel.viewLevel);
      const fromLvl = Number.isFinite(lvl) && lvl >= 1 && lvl <= 5 ? { color: lvl >= 2, damage: lvl >= 3, wounds: lvl >= 4 } : { color: true, damage: true, wounds: true };
      settings.panel.viewLayers = fromLvl;
      delete settings.panel.viewLevel;
    }
    if ("meta" in settings.panel.viewLayers) delete settings.panel.viewLayers.meta;
    const applyView = () => {
      const layers = settings.panel.viewLayers;
      for (const k of LAYER_KEYS) $panel.toggleClass(`bh-hide-${k}`, !layers[k]);
    };
    for (const k of LAYER_KEYS) {
      $panel.find(`input[name="bh-view-layer"][value="${k}"]`).prop("checked", !!settings.panel.viewLayers[k]);
    }
    applyView();
    $panel.find('input[name="bh-view-layer"]').on("change", function() {
      settings.panel.viewLayers[this.value] = this.checked;
      save();
      applyView();
    });
  }
  var lastState = null;
  var getSettingsFn = null;
  var activeCharName2 = null;
  var unviewedUpdates = /* @__PURE__ */ new Set();
  var viewByChar = /* @__PURE__ */ new Map();
  function wireTabs($panel) {
    $panel.find(".bh-tabs").off("click").on("click", ".bh-tab", function() {
      activeCharName2 = $(this).data("char");
      unviewedUpdates.delete(activeCharName2);
      if (lastState) renderPanel(lastState);
    });
    $panel.find(".bh-figure-controls").off("click").on("click", ".bh-view-toggle", function() {
      const char = $(this).data("char");
      const cur = viewByChar.get(char) || "front";
      viewByChar.set(char, cur === "front" ? "back" : "front");
      if (lastState) renderPanel(lastState);
    });
  }
  function wireHoverLink($panel) {
    const $body = $panel.find(".beholder-panel-body");
    const clearAll = () => {
      $body.find(".bh-part.bh-hover-link").removeClass("bh-hover-link");
      $body.find(".bh-slot-card.bh-hover-link").removeClass("bh-hover-link");
    };
    $body.off("mouseenter.bhhover mouseleave.bhhover").on("mouseenter.bhhover", ".bh-part", function() {
      const slot = $(this).attr("data-slot");
      if (!slot) return;
      $(this).addClass("bh-hover-link");
      $body.find(`.bh-slot-card[data-slots~="${slot}"]`).addClass("bh-hover-link");
    }).on("mouseleave.bhhover", ".bh-part", clearAll).on("mouseenter.bhhover", ".bh-slot-card", function() {
      const slots = ($(this).attr("data-slots") || "").split(/\s+/).filter(Boolean);
      $(this).addClass("bh-hover-link");
      for (const s of slots) {
        $body.find(`.bh-part[data-slot="${s}"]`).addClass("bh-hover-link");
      }
    }).on("mouseleave.bhhover", ".bh-slot-card", clearAll);
  }
  function escapeHtml2(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }
  function wireBackfillButton($panel, onBackfillRun) {
    const dispatch = (mode) => {
      if (typeof onBackfillRun === "function") onBackfillRun(mode);
    };
    $panel.find(".beholder-backfill-btn").off("click").on("click", (e) => {
      e.stopPropagation();
      closeMenu($panel);
      dispatch("build");
    });
    $panel.find(".beholder-backfill-more").off("click").on("click", (e) => {
      e.stopPropagation();
      toggleMenu($panel, dispatch);
    });
  }
  function closeMenu($panel) {
    $(".beholder-bf-menu").remove();
    $panel.find(".beholder-backfill-group").removeClass("bh-menu-open");
    $(document).off("click.bhBfMenu keydown.bhBfMenu");
    $(window).off("scroll.bhBfMenu resize.bhBfMenu");
  }
  function toggleMenu($panel, dispatch) {
    if ($(".beholder-bf-menu").length) {
      closeMenu($panel);
      return;
    }
    const $group = $panel.find(".beholder-backfill-group").addClass("bh-menu-open");
    const $menu = $(`
        <div class="beholder-bf-menu" role="menu">
            <button class="bh-bf-mode" data-mode="build" role="menuitem">
                <i class="fa-solid fa-clock-rotate-left" aria-hidden="true"></i>
                <span class="bh-bf-mode-text">
                    <span class="bh-bf-mode-title">Build from history</span>
                    <span class="bh-bf-mode-sub">add card seed if missing, walk un-processed messages</span>
                </span>
            </button>
            <button class="bh-bf-mode" data-mode="seed" role="menuitem">
                <i class="fa-solid fa-id-badge" aria-hidden="true"></i>
                <span class="bh-bf-mode-text">
                    <span class="bh-bf-mode-title">Re-seed from card</span>
                    <span class="bh-bf-mode-sub">re-extract initial state from character + persona description only</span>
                </span>
            </button>
            <button class="bh-bf-mode bh-bf-mode-danger" data-mode="rebuild" role="menuitem">
                <i class="fa-solid fa-arrows-rotate" aria-hidden="true"></i>
                <span class="bh-bf-mode-text">
                    <span class="bh-bf-mode-title">Rebuild from scratch</span>
                    <span class="bh-bf-mode-sub">clear all deltas, re-seed from card, re-process every AI message</span>
                </span>
            </button>
        </div>
    `);
    $("body").append($menu);
    const anchor = $group[0] || $panel.find(".beholder-backfill-more")[0];
    const r = anchor.getBoundingClientRect();
    const pr = $panel[0].getBoundingClientRect();
    const mw = $menu.outerWidth();
    const mh = $menu.outerHeight();
    let left = pr.left + (pr.width - mw) / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - mw - 8));
    let top = r.bottom + 6;
    if (top + mh > window.innerHeight - 8) top = Math.max(8, r.top - 6 - mh);
    $menu.css({ top: `${top}px`, left: `${left}px` });
    $menu.find(".bh-bf-mode").on("click", function(e) {
      e.stopPropagation();
      const mode = $(this).attr("data-mode");
      closeMenu($panel);
      dispatch(mode);
    });
    setTimeout(() => {
      $(document).on("click.bhBfMenu", (e) => {
        if (!$(e.target).closest(".beholder-bf-menu,.beholder-backfill-group").length) {
          closeMenu($panel);
        }
      });
      $(document).on("keydown.bhBfMenu", (e) => {
        if (e.key === "Escape") closeMenu($panel);
      });
      $(window).on("scroll.bhBfMenu resize.bhBfMenu", () => closeMenu($panel));
    }, 0);
  }
  function makeBackfillApi($panel) {
    const $status = $panel.find(".beholder-backfill-status");
    const setProgress = ({ done, total, inFlight, onCancel }) => {
      const pct = total > 0 ? Math.round(done / total * 100) : 0;
      const label = inFlight ? `<i class="fa-solid fa-spinner fa-spin"></i> Building history \u2014 extracting <b>${escapeHtml2(Math.min(done + 1, total))}</b> / ${escapeHtml2(total)}\u2026` : `Building history: <b>${escapeHtml2(done)}</b> / ${escapeHtml2(total)}`;
      $status.html(`
            <div class="bh-bf-progress" role="status" aria-live="polite">
                <span class="bh-bf-text">${label}</span>
                <span class="bh-bf-bar"><span class="bh-bf-bar-fill" style="width:${pct}%"></span></span>
                <button class="bh-btn bh-bf-cancel">Cancel</button>
            </div>
        `).prop("hidden", false);
      $status.find(".bh-bf-cancel").off("click").on("click", () => {
        try {
          onCancel?.();
        } catch {
        }
      });
    };
    const clearStatus = () => {
      $status.empty().prop("hidden", true);
    };
    return {
      setBackfillProgress: setProgress,
      clearBackfillStatus: clearStatus
    };
  }
  function mountPanel({
    settings,
    save,
    onClose,
    onBackfillRun,
    getState,
    getCapture: getCapture2,
    getSettings: getSettings2,
    saveSettings,
    probeEndpoint: probeEndpoint2,
    getDoctorVitals: getDoctorVitals2,
    clearChatState,
    getLocks: getLocks2,
    setLock: setLock2,
    getUserEdited: getUserEdited2,
    markUserEdited: markUserEdited2,
    applyUserEdit: applyUserEdit2,
    getCharacters,
    addAlias: addAlias2,
    removeAlias: removeAlias2,
    setCharHidden: setCharHidden2,
    setCharOrder: setCharOrder2,
    // ── Browser-model (local WebLLM) lifecycle bindings, supplied by index.js ──
    // The host owns ALL transport/engine state; views.js is a pure consumer that
    // reads + drives it through these callbacks. panel.js only forwards them.
    getBrowserModelState: getBrowserModelState2,
    getReadiness: getReadiness2,
    isModelConfigured: isModelConfigured2,
    getModelInfo: getModelInfo2,
    onDownloadModel: onDownloadModel2,
    onEnableBrowserModel: onEnableBrowserModel2,
    onDisableBrowserModel: onDisableBrowserModel2,
    getUpdateInfo: getUpdateInfo2,
    onCheckUpdate,
    onUpdateModel,
    refreshBrowserCard: refreshBrowserCardCb,
    onBannerAction: onBannerAction2
  }) {
    const $panel = ensurePanelDom();
    settings.panel = settings.panel || { visible: true, collapsed: false, pos: null };
    if (typeof settings.panel.height === "number" && settings.panel.height >= 200) {
      $panel.css({ height: settings.panel.height + "px" });
      $panel.attr("data-resized", "true");
    }
    applyPosition($panel, settings.panel.pos);
    $panel.toggleClass("beholder-collapsed", !!settings.panel.collapsed);
    $panel.toggle(settings.panel.visible !== false);
    wireDrag($panel, settings, save);
    wireResize($panel, settings, save);
    wireControls($panel, settings, save, onClose);
    wireBackfillButton($panel, onBackfillRun);
    getSettingsFn = getSettings2 || null;
    {
      const accentPref = getSettings2?.()?.matchThemeAccent;
      if (accentPref) {
        $panel[0].style.setProperty("--bh-accent-pref", "var(--SmartThemeQuoteColor, #88aaff)");
      } else {
        $panel[0].style.removeProperty("--bh-accent-pref");
      }
    }
    installViews({
      getState: getState || (() => lastState),
      rerender: () => renderPanel(lastState),
      getSettings: getSettings2,
      saveSettings,
      getCapture: getCapture2,
      probeEndpoint: probeEndpoint2,
      getDoctorVitals: getDoctorVitals2,
      clearChatState,
      getLocks: getLocks2,
      setLock: setLock2,
      getUserEdited: getUserEdited2,
      markUserEdited: markUserEdited2,
      applyUserEdit: applyUserEdit2,
      getCharacters,
      addAlias: addAlias2,
      removeAlias: removeAlias2,
      setCharHidden: setCharHidden2,
      setCharOrder: setCharOrder2,
      setDollLayout,
      // ── Browser-model lifecycle (forwarded straight through) ──
      // views.js wires the Local-model card's primary button + the no-model
      // banner's action buttons to these. All transport access is host-side;
      // views.js never imports engine/*.
      getBrowserModelState: getBrowserModelState2,
      getReadiness: getReadiness2,
      isModelConfigured: isModelConfigured2,
      getModelInfo: getModelInfo2,
      onDownloadModel: onDownloadModel2,
      onEnableBrowserModel: onEnableBrowserModel2,
      onDisableBrowserModel: onDisableBrowserModel2,
      getUpdateInfo: getUpdateInfo2,
      onCheckUpdate,
      onUpdateModel,
      onBannerAction: onBannerAction2
    });
    renderPanel(getState ? getState() : lastState || {});
    if (!settings.panel.onboarded && settings.panel.visible !== false) {
      setTimeout(() => showOnboardingPopover(settings, save), 800);
    }
    void refreshBrowserCardCb;
    return {
      ...makeBackfillApi($panel),
      setNoModelBanner,
      refreshBrowserCard,
      showUpdateDialog,
      // Deep-linkable Settings opener (focus: 'endpoint' | 'model', startDownload).
      openSettings: (opts) => openView("settings", opts)
    };
  }
  function showOnboardingPopover(settings, save) {
    if (settings.panel.onboarded) return;
    const $panel = $(`#${PANEL_ID}`);
    if (!$panel.length || !$panel.is(":visible")) return;
    const rect = $panel[0].getBoundingClientRect();
    const $tip = $(`
        <div id="beholder_onboard" class="beholder-onboard">
            <div class="bh-onboard-arrow"></div>
            <div class="bh-onboard-head">
                <span class="bh-onboard-title">\u25C9 Beholder</span>
                <span class="bh-onboard-close fa-solid fa-xmark" title="Dismiss"></span>
            </div>
            <div class="bh-onboard-body">
                Tracks what each character is <b>wearing</b>, <b>holding</b>, and
                their <b>wounds</b>. Updates after every AI message; the
                silhouette colors tell you what's damaged where.
                <ul class="bh-onboard-tips">
                    <li><b>Drag</b> the title bar to move.</li>
                    <li><b>Front \u21C4 Back</b> button flips the view (back wounds).</li>
                    <li><b>Tap a slot</b> to edit or lock it.</li>
                    <li>Multi-char chats add tabs at the top.</li>
                </ul>
            </div>
            <div class="bh-onboard-foot">
                <button class="bh-onboard-dismiss menu_button">Got it</button>
            </div>
        </div>
    `);
    const tipW = 320;
    const placeLeft = rect.left >= tipW + 20;
    $tip.css({
      position: "fixed",
      zIndex: 9100,
      top: Math.max(20, rect.top) + "px",
      [placeLeft ? "right" : "left"]: (placeLeft ? window.innerWidth - rect.left + 12 : rect.right + 12) + "px",
      width: tipW + "px"
    });
    $tip.attr("data-side", placeLeft ? "right" : "left");
    $("body").append($tip);
    const dismiss = () => {
      $tip.remove();
      settings.panel.onboarded = true;
      save();
    };
    $tip.find(".bh-onboard-close, .bh-onboard-dismiss").on("click", dismiss);
  }
  function renderPanel(state) {
    const next = state || {};
    if (lastState) {
      for (const [name, st] of Object.entries(next)) {
        if (lastState[name] !== st) unviewedUpdates.add(name);
      }
      for (const name of [...unviewedUpdates]) {
        if (!(name in next)) unviewedUpdates.delete(name);
      }
    }
    lastState = next;
    const $panel = $(`#${PANEL_ID}`);
    const $body = $panel.find(".beholder-panel-body");
    if (!$body.length) return;
    const isEmpty = Object.keys(next).length === 0;
    $panel.attr("data-empty", isEmpty ? "true" : "false");
    if (isEmpty) unviewedUpdates.clear();
    const layout = ["paired", "columns", "list"].includes(getSettingsFn?.()?.layout) ? getSettingsFn().layout : "paired";
    setDollLayout(layout);
    $panel.toggleClass("bh-layout-compact", layout === "list");
    const unviewedForRender = new Set(unviewedUpdates);
    if (activeCharName2) unviewedForRender.delete(activeCharName2);
    const view = activeCharName2 ? viewByChar.get(activeCharName2) || "front" : "front";
    const { html, activeName } = renderDollPanel(next, activeCharName2, unviewedForRender, view);
    activeCharName2 = activeName;
    unviewedUpdates.delete(activeName);
    $body.html(html);
    wireTabs($panel);
    wireHoverLink($panel);
    onPanelRendered();
  }

  // engine/engine.js
  function characterNamedIn(text, name) {
    const esc2 = String(name).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    try {
      return new RegExp(`\\b${esc2}\\b`, "i").test(text || "");
    } catch {
      return true;
    }
  }
  function dropHallucinatedCharacters(delta, canonical, personaName2, knownNames = []) {
    if (!delta || typeof delta !== "object") return { delta: {}, dropped: [] };
    const known = new Set(knownNames);
    const kept = {};
    const dropped = [];
    for (const name of Object.keys(delta)) {
      if (name === "self" || personaName2 && name === personaName2 || known.has(name) || characterNamedIn(canonical, name)) {
        kept[name] = delta[name];
      } else {
        dropped.push(name);
      }
    }
    return { delta: kept, dropped };
  }
  var BeholderEngine = class {
    /**
     * @param {{ transport: import('./transport.js').InferenceTransport,
     *           host: import('./host.js').HostAdapter }} deps
     */
    constructor({ transport, host }) {
      if (!transport) throw new Error("BeholderEngine: a transport is required");
      if (!host) throw new Error("BeholderEngine: a host adapter is required");
      this.transport = transport;
      this.host = host;
    }
    /**
     * Process one inbound message: normalize → extract → merge → inject → render.
     * Returns the new running state (or the unchanged state if disabled / failed).
     * Frontend-specific side effects (capture buffer, per-message deltas, badges)
     * are delegated to the host via `onExtraction` / `render`.
     *
     * @param {string} rawMessage
     * @param {string|null} personaName  the user's persona (mapped to `self`)
     * @param {{ signal?: AbortSignal, messageId?: any }} [opts]
     */
    async processMessage(rawMessage, personaName2, { signal, messageId } = {}) {
      const host = this.host;
      const cfg = host.getSettings();
      if (!cfg.enabled) return host.loadState();
      const canonical = normalize(rawMessage, personaName2);
      const prevState = host.loadState() || {};
      const prevForExtractor = renameChar(prevState, personaName2, "self");
      const t0 = Date.now();
      let result;
      try {
        result = await extract({
          canonical,
          prevState: prevForExtractor,
          personaName: personaName2,
          cfg,
          signal,
          transport: this.transport
        });
      } catch (err2) {
        host.onError?.(err2);
        return prevState;
      }
      const latencyMs = Date.now() - t0;
      if (result.parseFailed) {
        host.onWarn?.(
          `extraction output did not parse \u2014 likely truncated or a runaway generation (${(result.raw || "").length} chars); turn left unchanged`,
          { messageId, parseFailed: true }
        );
      }
      const { delta: cleanDelta, dropped } = dropHallucinatedCharacters(result.delta, canonical, personaName2, Object.keys(prevState));
      if (dropped.length) {
        host.onWarn?.(
          `ignored character(s) not named in the message (likely hallucinated): ${dropped.join(", ")}`,
          { messageId, dropped }
        );
      }
      const named = personaName2 ? renameChar(cleanDelta, "self", personaName2) : cleanDelta;
      const mapped = host.mapCharacters ? host.mapCharacters(named) : named;
      const safeDelta = filterLockedFromDelta(mapped, host.getLocks?.() || []);
      const rawDelta = safeDelta;
      const validatorOn = cfg.validator?.enabled !== false;
      let appliedDelta = safeDelta;
      let validatorLog = [];
      if (validatorOn && safeDelta && Object.keys(safeDelta).length) {
        const { findings, stripped } = applyValidator(
          { changed: true, delta: safeDelta },
          { persona: personaName2, prevState, prose: canonical }
        );
        validatorLog = findings;
        appliedDelta = stripped && stripped.changed && stripped.delta ? stripped.delta : {};
      }
      const newState = applyDelta(prevState, appliedDelta);
      host.saveState(newState);
      const turn = {
        messageId,
        canonical,
        system: cfg.systemPrompt || EXTRACTION_SYSTEM_V2_SHORT,
        user: buildUserMessage(canonical, prevForExtractor, personaName2),
        raw: result.raw,
        parsed: result.parsed,
        delta: appliedDelta,
        // the delta actually applied (post-validator)
        rawDelta,
        // snapshot: pre-validator delta (validators OFF)
        validatorLog,
        // parity-shape findings {rule_id, path, severity}
        validatorActive: validatorOn,
        parseFailed: result.parseFailed === true,
        latencyMs
      };
      host.onExtraction?.(turn);
      host.injectState(newState);
      host.render(newState, appliedDelta, turn);
      return newState;
    }
    /**
     * Apply a free-text user directive immediately (the note / intent bar).
     * Snapshot extraction (prev = {}); each touched slot is written via the
     * user-edit path so it wins over the model and persists. Host-agnostic.
     *
     * @param {string} text
     * @param {string|null} personaName
     * @param {{ signal?: AbortSignal }} [opts]
     */
    async applyDirective(text, personaName2, { signal } = {}) {
      const host = this.host;
      const cfg = host.getSettings();
      const trimmed = (text || "").trim();
      if (!cfg.enabled || !trimmed) return host.loadState();
      const canonical = normalize(trimmed, personaName2);
      const current = host.loadState() || {};
      const prevForExtractor = renameChar(current, personaName2, "self");
      const t0 = Date.now();
      let result;
      try {
        result = await extract({
          canonical,
          prevState: prevForExtractor,
          personaName: personaName2,
          cfg,
          signal,
          transport: this.transport
        });
      } catch (err2) {
        host.onError?.(err2);
        return host.loadState();
      }
      if (result.parseFailed) {
        host.onWarn?.(
          `directive output did not parse \u2014 likely truncated or a runaway generation (${(result.raw || "").length} chars); nothing applied`,
          { parseFailed: true }
        );
      }
      const delta = result.delta || {};
      const { delta: cleanDelta, dropped } = dropHallucinatedCharacters(delta, canonical, personaName2, Object.keys(current));
      if (dropped.length) {
        host.onWarn?.(`directive: ignored character(s) not in state or the text: ${dropped.join(", ")}`, { dropped });
      }
      const named = personaName2 ? renameChar(cleanDelta, "self", personaName2) : cleanDelta;
      const next = applyDelta(current, named);
      for (const [char, cd] of Object.entries(named)) {
        if (!cd || typeof cd !== "object") continue;
        const body = cd.body;
        if (body && typeof body === "object" && !Array.isArray(body)) {
          for (const slot of Object.keys(body)) host.markUserEdited?.(char, slot);
        }
      }
      host.onExtraction?.({
        messageId: "note",
        canonical,
        system: cfg.systemPrompt || EXTRACTION_SYSTEM_V2_SHORT,
        user: buildUserMessage(canonical, prevForExtractor, personaName2),
        raw: result.raw,
        parsed: result.parsed,
        delta: named,
        latencyMs: Date.now() - t0,
        kind: "directive",
        parseFailed: result.parseFailed === true
      });
      host.saveState(next);
      host.injectState(next);
      host.render(next, named, { directive: trimmed });
      return next;
    }
  };

  // engine/transport.js
  var RemoteOpenAITransport = class {
    constructor({ endpoint, model, apiKey } = {}) {
      this.endpoint = endpoint;
      this.model = model;
      this.apiKey = apiKey || "";
    }
    // A remote endpoint is assumed reachable on demand; an explicit reachability
    // probe lives in the Doctor view, not on the hot path.
    async ready() {
    }
    async chatCompletion({ system, user, temperature = 0, maxTokens = 512, signal }) {
      return callChatCompletions({
        endpoint: this.endpoint,
        model: this.model,
        apiKey: this.apiKey,
        system,
        user,
        temperature,
        maxTokens,
        signal
      });
    }
    status() {
      return {
        state: this.endpoint ? "ready" : "unconfigured",
        modelId: this.model,
        backend: "remote-openai"
      };
    }
  };

  // webllm-stub:webllm-transport
  var WebLLMTransport = class {
    constructor() {
    }
    async ready() {
      throw new Error("In-browser model is shelved in the Marinara build \u2014 use a custom endpoint.");
    }
    async load() {
      throw new Error("In-browser model is shelved in the Marinara build \u2014 use a custom endpoint.");
    }
    async chatCompletion() {
      throw new Error("In-browser model is shelved in the Marinara build.");
    }
    status() {
      return { state: "unconfigured", backend: "webllm" };
    }
    async unload() {
    }
    async hasInCache() {
      return false;
    }
  };

  // mc-stub:model-config
  var MODEL_CONFIG = { modelVersion: null, modelId: null, modelUrl: null, modelLib: null, versionUrl: null, vramRequiredMB: null, approxDownloadMB: null };
  function isModelConfigured() {
    return false;
  }
  function toModelRecord() {
    throw new Error("In-browser model is shelved in the Marinara build.");
  }

  // engine/readiness.js
  var DEFAULT_NEED_BYTES = 13e8;
  async function detectWebGpu() {
    try {
      if (typeof navigator === "undefined" || !navigator.gpu) {
        return { ok: false, reason: "WebGPU unavailable (no navigator.gpu)", hint: webGpuHint() };
      }
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        return { ok: false, reason: "No WebGPU adapter (blocklisted or unavailable)", hint: webGpuHint() };
      }
      if (!adapter.features || !adapter.features.has("shader-f16")) {
        return {
          ok: false,
          reason: "Your GPU lacks fp16 (WebGPU shader-f16) \u2014 required to run this model in-browser",
          hint: "This device can still track via a custom endpoint \u2014 set one up below."
        };
      }
      const info = adapter.info && typeof adapter.info === "object" ? adapter.info : {};
      const limits = adapter.limits || {};
      return {
        ok: true,
        vendor: info.vendor || void 0,
        architecture: info.architecture || void 0,
        maxBufferSize: typeof limits.maxBufferSize === "number" ? limits.maxBufferSize : void 0,
        maxStorageBufferBindingSize: typeof limits.maxStorageBufferBindingSize === "number" ? limits.maxStorageBufferBindingSize : void 0
      };
    } catch (err2) {
      return { ok: false, reason: `WebGPU probe failed: ${err2?.message || err2}`, hint: webGpuHint() };
    }
  }
  function webGpuHint() {
    try {
      if (typeof window !== "undefined" && window.isSecureContext === false) {
        return "WebGPU is off on insecure pages \u2014 open Beholder over https:// or http://localhost (not a LAN IP), then reload.";
      }
      const ua = typeof navigator !== "undefined" && navigator.userAgent || "";
      if (/Firefox\//.test(ua)) {
        return "Firefox: open about:config, set dom.webgpu.enabled = true, then reload.";
      }
      if (/Edg\/|Chrome\/|Chromium\/|Brave\//.test(ua)) {
        return "Chrome/Edge: visit chrome://gpu (WebGPU should read 'Hardware accelerated'); if not, enable chrome://flags/#enable-unsafe-webgpu and restart.";
      }
      if (/Safari\//.test(ua) && !/Chrome|Chromium/.test(ua)) {
        return "Safari 17+: Settings \u2192 Advanced \u2192 'Show features for web developers', then Develop \u2192 Feature Flags \u2192 WebGPU.";
      }
      return "WebGPU needs a recent Chrome, Edge, Firefox (about:config \u2192 dom.webgpu.enabled), or Safari 17+.";
    } catch {
      return "WebGPU needs a recent Chrome, Edge, Firefox, or Safari 17+ over https/localhost.";
    }
  }
  async function probeDisk(needBytes = DEFAULT_NEED_BYTES) {
    const base = { ok: false, quota: 0, usage: 0, freeBytes: 0, persisted: false };
    try {
      if (typeof navigator === "undefined" || !navigator.storage || !navigator.storage.estimate) {
        return { ...base, error: "Storage API unavailable" };
      }
      const est = await navigator.storage.estimate();
      const quota = typeof est.quota === "number" ? est.quota : 0;
      const usage = typeof est.usage === "number" ? est.usage : 0;
      const freeBytes = Math.max(0, quota - usage);
      let persisted = false;
      try {
        persisted = navigator.storage.persisted ? await navigator.storage.persisted() : false;
      } catch {
      }
      return { ok: freeBytes >= needBytes, quota, usage, freeBytes, persisted };
    } catch (err2) {
      return { ...base, error: err2?.message || String(err2) };
    }
  }
  function probeRam() {
    try {
      if (typeof navigator === "undefined" || typeof navigator.deviceMemory !== "number") {
        return { gb: null, known: false };
      }
      return { gb: navigator.deviceMemory, known: true };
    } catch {
      return { gb: null, known: false };
    }
  }
  function probeCpu() {
    try {
      if (typeof navigator === "undefined" || typeof navigator.hardwareConcurrency !== "number") {
        return { threads: null };
      }
      return { threads: navigator.hardwareConcurrency };
    } catch {
      return { threads: null };
    }
  }
  async function probeReadiness({ needBytes } = {}) {
    const need = typeof needBytes === "number" ? needBytes : MODEL_CONFIG.approxDownloadMB ? MODEL_CONFIG.approxDownloadMB * 1e6 : DEFAULT_NEED_BYTES;
    const [gpu, disk] = await Promise.all([detectWebGpu(), probeDisk(need)]);
    return { gpu, disk, ram: probeRam(), cpu: probeCpu() };
  }

  // index.js
  var MODULE_NAME2 = "beholder";
  var MODULE_NAME_FANCY = "Beholder";
  var LOG = `[${MODULE_NAME_FANCY}]`;
  var EXTENSION_VERSION = "0.5.0";
  var DEFAULT_SETTINGS = {
    enabled: true,
    // Empty endpoint = use the in-browser model (the default path); a non-empty
    // endpoint is a custom OpenAI-compatible override that ALWAYS wins (see
    // getActiveTransport). The legacy literal localhost default is migrated to ''
    // once, in getSettings (D-BE-1) — a fresh install starts empty.
    endpoint: "",
    // '' = browser model; URL = override
    model: "ChatML",
    // `model` field sent to a custom endpoint; operator default
    apiKey: "",
    // In-browser WebLLM model toggle. `enabled` is flipped on by a successful
    // Download / Enable in the Local-model card and off by Disable.
    // `fallbackToBrowser` is the §9.4 advanced "fall back to the browser model if
    // the custom endpoint is unreachable" option — stored + wired in the UI, but
    // the strict-by-default path (no silent fallback) is the only implemented
    // behavior in this scope; honoring the flag is a follow-up.
    browserModel: { enabled: false, fallbackToBrowser: false },
    // Private one-shot migration flag for the endpoint default change (D-BE-1).
    // Not surfaced in the UI.
    _endpointMigrated: false,
    // Private one-shot migration flag: rewrite a persisted BEFORE_PROMPT/IN_PROMPT
    // injection (block at the START of the context → full re-prefill every state change)
    // to IN_CHAT depth 1. Not surfaced in the UI.
    _injectMigrated: false,
    // Prompt-injection position. ONLY 'IN_CHAT' (honors `depth`) or 'NONE' are offered:
    // the front-of-context positions IN_PROMPT/BEFORE_PROMPT put a changing block at the
    // start and re-prefill the WHOLE context every state change (a full 50k+ reprocess on
    // a large-context / SWA local model). Inject at shallow depth (1 = one before the last
    // message) so it sits next to generation and small RP models still attend to it.
    injectionPosition: "IN_CHAT",
    injectionDepth: 1,
    // 1 = just before the last message (near generation); operator: "depth 1 or 2 at most"
    // Verbose console logging — useful while debugging the extractor wiring.
    debug: false,
    // Floating panel state (mounted at boot; user can drag/collapse/close).
    panel: { visible: true, collapsed: false, pos: null },
    // ─── UI / display preferences (panel views read these via getSettings) ──
    // Paper-doll layout mode. 'paired' = anatomical left/right grid (default),
    // 'columns' = two flat columns, 'list' = the compact digest. Persisted so
    // the panel restores the user's chosen layout across reloads.
    layout: "paired",
    // Accent color source. false (default) = the extension's own gold accent;
    // true = inherit the active SillyTavern theme's quote color. The Settings
    // view toggles this; the panel applies it as an inline --bh-accent-pref.
    matchThemeAccent: false,
    // Global alias book — { canonicalName: [variantSpelling, ...] }. Collapses the
    // name variants the model emits (Katya / Yekaterina Sokolova → Yekaterina)
    // across ALL chats; per-chat overrides live in chat_metadata.characters.aliases.
    aliasBook: {},
    // Show colors the model inferred (vs. only colors stated verbatim in prose).
    // Display-only hint consumed by the panel's slot decoration.
    inferredColors: true,
    // Client-side validator (validator.js) — a parity mirror of the datagen
    // phase_e_validators (detect + strip invalid emissions before merge). ON by
    // default; the Doctor's Inspector shows per-turn findings.
    validator: { enabled: true },
    // Max in-flight extraction requests. DEFAULT 1: a single-slot local endpoint
    // (KoboldCpp/llama.cpp) processes one at a time, so parallelism only risks a 503
    // "server busy" with zero speed gain. Raise it ONLY for endpoints that truly
    // parallelise (vLLM / multi-slot). Applied to the extractor's global semaphore.
    concurrency: 1
  };
  var OLD_DEFAULT_ENDPOINT = "http://localhost:8000/v1";
  function getSettings() {
    if (!extension_settings[MODULE_NAME2]) {
      extension_settings[MODULE_NAME2] = structuredClone(DEFAULT_SETTINGS);
      saveSettingsDebounced();
    }
    const s = extension_settings[MODULE_NAME2];
    for (const [k, v] of Object.entries(DEFAULT_SETTINGS)) {
      if (!(k in s)) {
        s[k] = v && typeof v === "object" ? structuredClone(v) : v;
      }
    }
    if (!s._endpointMigrated) {
      if (s.endpoint === OLD_DEFAULT_ENDPOINT) s.endpoint = "";
      s._endpointMigrated = true;
      saveSettingsDebounced();
    }
    if (!s._injectMigrated) {
      if (s.injectionPosition === "BEFORE_PROMPT" || s.injectionPosition === "IN_PROMPT") {
        s.injectionPosition = "IN_CHAT";
        if (!(Number(s.injectionDepth) >= 1)) s.injectionDepth = 1;
      }
      s._injectMigrated = true;
      saveSettingsDebounced();
    }
    return s;
  }
  function getChatState() {
    if (!chat_metadata[MODULE_NAME2]) {
      chat_metadata[MODULE_NAME2] = {
        state: {},
        lastMessageHash: null,
        deltasByMsg: {},
        // Per-slot user overrides. `locks` holds per-(char, slot) keys whose
        // value the model may NOT overwrite (the user's value wins until
        // they unlock). `userEdited` tracks slots the user has hand-edited
        // (purely a display badge — does NOT block model updates on its own).
        // Both persist in chat_metadata so they survive reload, and are
        // stored as JSON arrays (not Sets) so they serialize.
        locks: [],
        userEdited: [],
        // Inspector capture ring — persisted per-chat so a missed/odd extraction
        // is still inspectable after a reload or chat switch (it used to be an
        // in-memory global that vanished, and mixed across chats).
        capture: []
      };
      saveMetadataDebounced();
    }
    const cs = chat_metadata[MODULE_NAME2];
    if (!cs.deltasByMsg) cs.deltasByMsg = {};
    if (!Array.isArray(cs.locks)) cs.locks = [];
    if (!Array.isArray(cs.userEdited)) cs.userEdited = [];
    if (!Array.isArray(cs.capture)) cs.capture = [];
    return cs;
  }
  function setChatState(state) {
    getChatState().state = state;
    saveMetadataDebounced();
  }
  function setMessageDelta(messageId, delta) {
    if (messageId == null) return;
    const cs = getChatState();
    cs.deltasByMsg[messageId] = delta;
    saveMetadataDebounced();
  }
  function clearAllMessageDeltas() {
    getChatState().deltasByMsg = {};
    saveMetadataDebounced();
  }
  function getLocks() {
    return getChatState().locks;
  }
  function setLock(char, slot, on) {
    const cs = getChatState();
    cs.locks = setSlotLock(cs.locks, char, slot, on);
    saveMetadataDebounced();
  }
  function getCharOverrides() {
    const cs = getChatState();
    if (!cs.characters || typeof cs.characters !== "object") cs.characters = {};
    const c = cs.characters;
    if (!c.aliases || typeof c.aliases !== "object") c.aliases = {};
    if (!Array.isArray(c.hidden)) c.hidden = [];
    if (!Array.isArray(c.order)) c.order = [];
    return c;
  }
  function getAliasLookup() {
    return buildAliasLookup(getSettings().aliasBook, getCharOverrides().aliases);
  }
  function stripModelMissing(delta) {
    for (const char of Object.keys(delta || {})) {
      const body = delta[char] && delta[char].body;
      if (!body || typeof body !== "object") continue;
      for (const slot of Object.keys(body)) {
        const sd = body[slot];
        if (!sd || typeof sd !== "object") continue;
        delete sd.missing;
        if (Object.keys(sd).length === 0) delete body[slot];
      }
    }
    return delta;
  }
  var ANATOMY_NOT_WORN = /* @__PURE__ */ new Set([
    "wing",
    "wings",
    "tail",
    "tails",
    "horn",
    "horns",
    "claw",
    "claws",
    "talon",
    "talons",
    "fang",
    "fangs",
    "hoof",
    "hooves",
    "paw",
    "paws",
    "snout",
    "muzzle",
    "mane",
    "gill",
    "gills",
    "fin",
    "fins",
    "tentacle",
    "tentacles",
    "antenna",
    "antennae",
    "scale",
    "scales",
    "feather",
    "feathers",
    "fur"
  ]);
  function stripAnatomyWorn(delta) {
    for (const char of Object.keys(delta || {})) {
      const body = delta[char] && delta[char].body;
      if (!body || typeof body !== "object") continue;
      for (const slot of Object.keys(body)) {
        const sd = body[slot];
        if (sd && Array.isArray(sd.worn)) {
          sd.worn = sd.worn.filter((w) => !(w && typeof w.item === "string" && ANATOMY_NOT_WORN.has(w.item.toLowerCase().trim())));
        }
      }
    }
    return delta;
  }
  function mapCharacters(delta) {
    return stripAnatomyWorn(stripModelMissing(dropHidden(resolveAliases(delta, getAliasLookup()), getCharOverrides().hidden)));
  }
  function applyCharView(state) {
    const ov = getCharOverrides();
    const personaName2 = getContext()?.name1 || null;
    const visible = dropHidden(state, ov.hidden);
    const out = {};
    for (const n of orderChars(Object.keys(visible), ov.order, personaName2)) out[n] = visible[n];
    return out;
  }
  function renderPanel2(state) {
    renderPanel(applyCharView(withSleeveCoverageState(state)));
  }
  function canonicalizeState() {
    const cs = getChatState();
    let next = resolveAliases(cs.state, getAliasLookup());
    next = dropHidden(next, getCharOverrides().hidden);
    if (next !== cs.state) {
      cs.state = next;
      saveMetadataDebounced();
    }
    injectStateIntoPrompt(cs.state);
    renderPanel2(cs.state);
  }
  function addAlias(variant, canonical, { global = false } = {}) {
    variant = (variant || "").trim();
    canonical = (canonical || "").trim();
    if (!variant || !canonical || variant.toLowerCase() === canonical.toLowerCase()) return;
    const book = global ? getSettings().aliasBook ||= {} : getCharOverrides().aliases;
    if (!Array.isArray(book[canonical])) book[canonical] = [];
    if (!book[canonical].some((v) => v.toLowerCase() === variant.toLowerCase())) {
      book[canonical].push(variant);
    }
    if (global) saveSettingsDebounced();
    else saveMetadataDebounced();
    canonicalizeState();
  }
  function removeAlias(variant, canonical, { global = false } = {}) {
    const book = global ? getSettings().aliasBook || {} : getCharOverrides().aliases;
    const arr = book[canonical];
    if (!Array.isArray(arr)) return;
    const i = arr.findIndex((v) => v.toLowerCase() === (variant || "").toLowerCase());
    if (i >= 0) arr.splice(i, 1);
    if (arr.length === 0) delete book[canonical];
    if (global) saveSettingsDebounced();
    else saveMetadataDebounced();
    renderPanel2(getChatState().state);
  }
  function setCharHidden(name, on) {
    const ov = getCharOverrides();
    const i = ov.hidden.indexOf(name);
    if (on && i < 0) ov.hidden.push(name);
    else if (!on && i >= 0) ov.hidden.splice(i, 1);
    saveMetadataDebounced();
    canonicalizeState();
  }
  function setCharOrder(order) {
    getCharOverrides().order = Array.isArray(order) ? order.slice() : [];
    saveMetadataDebounced();
    renderPanel2(getChatState().state);
  }
  function getCharacterManagerData() {
    const ov = getCharOverrides();
    const state = getChatState().state || {};
    const personaName2 = getContext()?.name1 || null;
    const visible = orderChars(Object.keys(dropHidden(state, ov.hidden)), ov.order, personaName2);
    return {
      persona: personaName2,
      visible,
      hidden: ov.hidden.slice(),
      aliasesChat: JSON.parse(JSON.stringify(ov.aliases || {})),
      aliasesGlobal: JSON.parse(JSON.stringify(getSettings().aliasBook || {}))
    };
  }
  function getUserEdited() {
    return getChatState().userEdited;
  }
  function markUserEdited(char, slot) {
    const cs = getChatState();
    const key = lockKey(char, slot);
    if (!cs.userEdited.includes(key)) {
      cs.userEdited.push(key);
      saveMetadataDebounced();
    }
  }
  function applyUserSlotEdit(char, slot, slotState) {
    const cs = getChatState();
    const newState = applyUserEdit(cs.state, char, slot, slotState);
    setChatState(newState);
    markUserEdited(char, slot);
    injectStateIntoPrompt(newState);
    renderPanel2(newState);
    return newState;
  }
  var CAPTURE_LIMIT = 20;
  var CAPTURE_FIELD_MAX = 16e3;
  var clipField = (v) => typeof v === "string" && v.length > CAPTURE_FIELD_MAX ? `${v.slice(0, CAPTURE_FIELD_MAX)} \u2026[+${v.length - CAPTURE_FIELD_MAX} chars]` : v;
  function pushCapture(entry) {
    const cs = getChatState();
    cs.capture.push({ ...entry, user: clipField(entry.user), raw: clipField(entry.raw) });
    while (cs.capture.length > CAPTURE_LIMIT) cs.capture.shift();
    saveMetadataDebounced();
  }
  function getCapture() {
    return getChatState().capture;
  }
  function debugLog(...args) {
    if (getSettings().debug) console.log(LOG, ...args);
  }
  var webllmTransport = null;
  var lastReadiness = null;
  var VITALS_TURNS_LIMIT = 10;
  var vitalsTurns = [];
  function recordVitalsTurn(turn) {
    const ttftMs = turn?.ttftMs ?? null;
    if (ttftMs == null) return;
    const tps = webllmTransport && getActiveTransport() === webllmTransport ? webllmTransport.status()?.tokensPerSec ?? null : null;
    vitalsTurns.push({ ttftMs, tokensPerSec: tps });
    if (vitalsTurns.length > VITALS_TURNS_LIMIT) vitalsTurns.shift();
  }
  function getActiveTransport() {
    const settings = getSettings();
    const ep = (settings.endpoint || "").trim();
    const browserReady = !!(settings.browserModel?.enabled && webllmTransport && webllmTransport.status()?.state === "ready");
    if (ep !== "" && !(endpointConn === "down" && browserReady)) {
      return new RemoteOpenAITransport({
        endpoint: ep,
        model: settings.model || "ChatML",
        // default when the field's left blank
        apiKey: settings.apiKey
      });
    }
    if (settings.meConnectionId && typeof window !== "undefined" && typeof window.__bhMakeMeTransport === "function") {
      const meT = window.__bhMakeMeTransport(settings.meConnectionId);
      if (meT) return meT;
    }
    if (browserReady) return webllmTransport;
    return null;
  }
  var hostAdapter = {
    getSettings: () => getSettings(),
    loadState: () => getChatState().state,
    saveState: (s) => setChatState(s),
    getLocks: () => getLocks(),
    mapCharacters: (delta) => mapCharacters(delta),
    injectState: (s) => injectStateIntoPrompt(s),
    render: (state, delta, turn) => {
      renderPanel2(state);
      if (turn && turn.messageId != null && !turn.directive) {
        setMessageDelta(turn.messageId, turn.delta);
        renderBadgesForMessage(turn.messageId, turn.delta);
      }
    },
    onExtraction: (turn) => {
      const ttftMs = webllmTransport && getActiveTransport() === webllmTransport ? webllmTransport.status()?.ttftMs ?? null : null;
      pushCapture({
        msgId: turn.messageId,
        kind: turn.kind || "message",
        ts: Date.now(),
        system: turn.system,
        user: turn.user,
        raw: turn.raw,
        parsed: turn.parsed,
        delta: turn.delta,
        rawDelta: turn.rawDelta,
        latencyMs: turn.latencyMs,
        ttftMs,
        // Map the engine's parity-shape findings ({rule_id, path, severity}) to
        // the Inspector's display shape ({sev, rule, text}). 'error' → error,
        // everything else (warning/suggestion) → warn for the badge counts.
        validatorLog: (turn.validatorLog || []).map((f) => ({
          sev: f.severity === "error" ? "error" : "warn",
          rule: f.rule_id,
          text: f.path
        })),
        validatorActive: turn.validatorActive === true,
        parseFailed: turn.parseFailed === true
      });
      recordVitalsTurn({ ...turn, ttftMs });
      debugLog(
        `extraction #${turn.messageId} (${turn.latencyMs ?? "?"}ms)`,
        "\n  input:  ",
        turn.user,
        "\n  raw:    ",
        turn.raw,
        "\n  applied:",
        JSON.stringify(turn.delta)
      );
    },
    markUserEdited: (char, slot) => markUserEdited(char, slot),
    onError: (err2) => console.warn(LOG, "extraction failed; state unchanged:", err2?.message),
    // A parse failure (truncated/runaway output) is a real, actionable problem —
    // ALWAYS console.warn it. A hallucinated-character drop self-corrects, so it
    // stays quiet (verbose-only).
    onWarn: (msg, meta) => {
      if (meta?.parseFailed) console.warn(LOG, msg, meta);
      else debugLog("guard:", msg, meta || "");
    }
  };
  function getActiveEngine() {
    const transport = getActiveTransport();
    if (!transport) return null;
    return new BeholderEngine({ transport, host: hostAdapter });
  }
  function renderStateProse(state) {
    if (!state || typeof state !== "object") return "";
    const SLOT_LABEL2 = {
      head: "head",
      face: "face",
      neck: "neck",
      chest: "chest",
      back: "back",
      waist: "waist",
      mouth: "mouth",
      tail: "tail",
      left_shoulder: "left shoulder",
      right_shoulder: "right shoulder",
      left_arm: "left arm",
      right_arm: "right arm",
      left_hand: "left hand",
      right_hand: "right hand",
      left_leg: "left leg",
      right_leg: "right leg",
      left_foot: "left foot",
      right_foot: "right foot",
      left_eye: "left eye",
      right_eye: "right eye",
      left_ear: "left ear",
      right_ear: "right ear"
    };
    const label = (s) => SLOT_LABEL2[s] || String(s).replace(/_/g, " ");
    const PLURALIA = /^(trousers|pants|jeans|shorts|leggings|tights|gloves|mittens|boots|shoes|sandals|sneakers|slippers|glasses|spectacles|goggles|briefs|panties|underwear|overalls|socks|stockings)$/i;
    const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
    const startsVowel = (s) => /^[aeiou]/i.test(String(s).trim());
    const article = (phrase, item) => PLURALIA.test(item) ? phrase : (startsVowel(phrase) ? "an " : "a ") + phrase;
    const listJoin = (arr) => {
      arr = arr.filter(Boolean);
      if (arr.length === 0) return "";
      if (arr.length === 1) return arr[0];
      if (arr.length === 2) return arr[0] + " and " + arr[1];
      return arr.slice(0, -1).join(", ") + " and " + arr[arr.length - 1];
    };
    const pluralPart = (p) => {
      if (/foot$/.test(p)) return p.replace(/foot$/, "feet");
      if (/(arm|hand|leg|eye|ear|shoulder)$/.test(p)) return p + "s";
      return p;
    };
    const bodyPartList = (slots, posLow) => {
      const set = new Set(slots);
      const bySide = { left: [], right: [] };
      const none = [];
      const both = [];
      const consumed = /* @__PURE__ */ new Set();
      for (const s of slots) {
        if (consumed.has(s)) continue;
        const m = /^(left|right)_(.+)$/.exec(s);
        if (m) {
          const part = m[2].replace(/_/g, " ");
          const other = (m[1] === "left" ? "right" : "left") + "_" + m[2];
          if (set.has(other)) {
            consumed.add(s);
            consumed.add(other);
            both.push(part);
            continue;
          }
          consumed.add(s);
          bySide[m[1]].push(part);
        } else {
          consumed.add(s);
          none.push(label(s));
        }
      }
      const phrases = [];
      let plural = false;
      for (const p of both) {
        phrases.push("both " + posLow + " " + pluralPart(p));
        plural = true;
      }
      for (const side of ["left", "right"]) {
        const parts = bySide[side];
        if (parts.length === 1) phrases.push(posLow + " " + side + " " + parts[0]);
        else if (parts.length > 1) {
          phrases.push(posLow + " " + side + " " + listJoin(parts));
          plural = true;
        }
      }
      for (const p of none) phrases.push(posLow + " " + p);
      if (phrases.length > 1) plural = true;
      return { text: listJoin(phrases), plural };
    };
    const damageWord = (d) => !d || d === "pristine" ? "" : d === "broken" ? "broken" : "torn";
    const PAIRED = /^(boot|shoe|sandal|sneaker|slipper|heel|pump|loafer|clog|flat|glove|mitten|gauntlet|sock|stocking)$/i;
    const pluralizeItem = (it) => {
      if (/s$/i.test(it)) return it;
      if (/(sh|ch|x|z|ss)$/i.test(it)) return it + "es";
      if (/[^aeiou]y$/i.test(it)) return it.replace(/y$/i, "ies");
      return it + "s";
    };
    const wornPhrase = (g) => {
      const w = g.w;
      const parts = [];
      const dmg = damageWord(w.damage);
      if (dmg) parts.push(dmg);
      if (w.color) parts.push(w.color);
      if (w.material) parts.push(w.material);
      const pair = g.slots.length >= 2 && PAIRED.test(w.item);
      parts.push(pair ? pluralizeItem(w.item) : w.item);
      return pair ? parts.join(" ") : article(parts.join(" "), w.item);
    };
    const woundSuffix = (wd) => {
      const bits = [];
      if (wd.severity) bits.push(wd.severity);
      if (wd.bleeding) bits.push("bleeding");
      return bits.length ? " (" + bits.join(", ") + ")" : "";
    };
    const out = [];
    for (const key of Object.keys(state)) {
      const entry = state[key];
      const isSelf = key === "self";
      const Subj = isSelf ? "You" : key;
      const subjPron = isSelf ? "you" : "they";
      const posLow = isSelf ? "your" : "their";
      const verbWear = isSelf ? "are wearing" : "is wearing";
      const verbHold = isSelf ? "are holding" : "is holding";
      const body = entry && entry.body || {};
      const wornGroups = /* @__PURE__ */ new Map();
      const wounds = [];
      const holdings = [];
      const missing = [];
      const bare = [];
      for (const slot of Object.keys(body)) {
        const cell = body[slot] || {};
        if (Array.isArray(cell.worn)) {
          for (const w of cell.worn) {
            if (!w || !w.item) continue;
            const id = [w.item, w.color || "", w.material || "", w.damage || "pristine"].join("");
            const g = wornGroups.get(id);
            if (g) g.slots.push(slot);
            else wornGroups.set(id, { w, slots: [slot] });
          }
        }
        if (Array.isArray(cell.wounds)) {
          for (const wd of cell.wounds) {
            if (wd && wd.text) wounds.push({ slot, wd });
          }
        }
        if (cell.holding && cell.holding.item) holdings.push(cell.holding.item);
        if (cell.missing === true) missing.push(slot);
        if (cell.bare === true) bare.push(slot);
      }
      const clauses = [];
      if (wornGroups.size) {
        clauses.push({ kind: "subject", text: verbWear + " " + listJoin([...wornGroups.values()].map(wornPhrase)) });
      }
      for (const { slot, wd } of wounds) {
        clauses.push({ kind: "plain", text: posLow + " " + label(slot) + " has " + wd.text + woundSuffix(wd) });
      }
      if (holdings.length) {
        const items = holdings.map((i) => article(i, i));
        clauses.push({ kind: "subject", text: verbHold + " " + listJoin(items) });
      }
      if (missing.length) {
        const r = bodyPartList(missing, posLow);
        clauses.push({ kind: "plain", text: r.text + " " + (r.plural ? "are" : "is") + " gone" });
      }
      if (bare.length) {
        const r = bodyPartList(bare, posLow);
        clauses.push({ kind: "plain", text: r.text + " " + (r.plural ? "are" : "is") + " bare" });
      }
      const sp = entry && typeof entry.species === "string" ? entry.species.trim() : "";
      const showSpecies = sp && !/^(humans?|persons?|people|man|woman|men|women|boys?|girls?|guys?|lady|male|female)$/i.test(sp);
      if (!clauses.length && !showSpecies) continue;
      const rendered = clauses.map((c, i) => {
        if (c.kind === "plain") return i === 0 ? cap(c.text) : c.text;
        return i === 0 ? Subj + " " + c.text : subjPron + " " + c.text;
      });
      const speciesSentence = showSpecies ? `${Subj} ${isSelf ? "are" : "is"} a ${sp}.` : "";
      const bodySentence = rendered.length ? rendered.join("; ") + "." : "";
      out.push([speciesSentence, bodySentence].filter(Boolean).join(" "));
    }
    return out.join(" ").trim();
  }
  var SLEEVED_TORSO = /* @__PURE__ */ new Set([
    "jacket",
    "coat",
    "blazer",
    "sweater",
    "hoodie",
    "cardigan",
    "pullover",
    "jumper",
    "sweatshirt",
    "turtleneck",
    "trenchcoat",
    "trench coat",
    "windbreaker",
    "parka",
    "peacoat",
    "pea coat",
    "overcoat",
    "robe"
  ]);
  var SLEEVE_TORSO_SLOTS = ["chest", "back", "left_shoulder", "right_shoulder"];
  var wornId = (w) => [w.item, w.color || "", w.material || "", w.damage || ""].join("|").toLowerCase();
  function withSleeveCoverage(body) {
    if (!body || typeof body !== "object") return body;
    const sleeved = /* @__PURE__ */ new Map();
    for (const slot of SLEEVE_TORSO_SLOTS) {
      const worn = body[slot] && body[slot].worn;
      if (!Array.isArray(worn)) continue;
      for (const w of worn) {
        if (w && w.item && SLEEVED_TORSO.has(String(w.item).toLowerCase().trim()) && !sleeved.has(wornId(w))) {
          sleeved.set(wornId(w), w);
        }
      }
    }
    if (!sleeved.size) return body;
    const out = { ...body };
    for (const arm of ["left_arm", "right_arm"]) {
      const cell = out[arm] ? { ...out[arm] } : {};
      if (cell.missing === true) continue;
      const worn = Array.isArray(cell.worn) ? cell.worn.slice() : [];
      const present = new Set(worn.filter((w) => w && w.item).map(wornId));
      let added = false;
      for (const [id, w] of sleeved) {
        if (!present.has(id)) {
          worn.push({ ...w });
          added = true;
        }
      }
      if (added) {
        cell.worn = worn;
        if (cell.bare === true) cell.bare = false;
        out[arm] = cell;
      }
    }
    return out;
  }
  function withSleeveCoverageState(state) {
    if (!state || typeof state !== "object") return state;
    const out = {};
    for (const [name, cs] of Object.entries(state)) {
      out[name] = cs && cs.body ? { ...cs, body: withSleeveCoverage(cs.body) } : cs;
    }
    return out;
  }
  function serializeStateForPrompt(state) {
    if (!state || Object.keys(state).length === 0) return "";
    const derived = {};
    for (const [name, cs] of Object.entries(state)) {
      derived[name] = cs?.body ? { ...cs, body: withSleeveCoverage(withDependentMissing(cs.body)) } : cs;
    }
    const prose = renderStateProse(derived);
    return prose ? `Current physical state: ${prose}` : "";
  }
  function injectStateIntoPrompt(state) {
    const settings = getSettings();
    const ctx2 = getContext();
    const text = serializeStateForPrompt(state);
    ctx2.setExtensionPrompt(
      MODULE_NAME2,
      text,
      extension_prompt_types[settings.injectionPosition] ?? extension_prompt_types.IN_CHAT,
      settings.injectionDepth ?? 1,
      false,
      extension_prompt_roles.SYSTEM
    );
  }
  var lastProbe = null;
  async function probeEndpoint() {
    const settings = getSettings();
    const base = (settings.endpoint || "").replace(/\/+$/, "");
    if (!base) {
      setEndpointConn("unknown");
      lastProbe = null;
      return { ok: false, ms: 0, servedModel: null, error: "no endpoint configured" };
    }
    const url = base + "/models";
    const headers = {};
    if (settings.apiKey) headers["Authorization"] = "Bearer " + settings.apiKey;
    const t0 = Date.now();
    try {
      const resp = await fetch(url, { method: "GET", headers });
      const ms = Date.now() - t0;
      let servedModel = null;
      try {
        const data = await resp.json();
        servedModel = data?.data?.[0]?.id ?? null;
      } catch {
      }
      setEndpointConn("ok");
      const r = { ok: true, ms, servedModel, error: resp.ok ? void 0 : `reachable (HTTP ${resp.status} on /models)` };
      lastProbe = { ...r, at: Date.now() };
      return r;
    } catch (err2) {
      setEndpointConn("down");
      const r = { ok: false, ms: Date.now() - t0, servedModel: null, error: err2.message };
      lastProbe = { ...r, at: Date.now() };
      return r;
    }
  }
  function classifyEndpoint(endpoint) {
    const raw = (endpoint || "").trim();
    if (!raw) return "(none)";
    let host;
    try {
      host = new URL(raw).hostname;
    } catch {
      return "configured (unparsed)";
    }
    const h = host.toLowerCase();
    if (h === "localhost" || h === "127.0.0.1" || h === "::1" || h === "[::1]") {
      return "localhost";
    }
    if (/^10\./.test(h) || /^192\.168\./.test(h) || /^172\.(1[6-9]|2\d|3[01])\./.test(h) || /^169\.254\./.test(h) || /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./.test(h)) {
      return "LAN IP";
    }
    return "remote host";
  }
  function getDoctorVitals() {
    const settings = getSettings();
    const esc2 = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
    const ua = (navigator.userAgent.match(/(Firefox|Chrom(e|ium)|Safari)\/[\d.]+/) || ["unknown"])[0];
    const os = (navigator.userAgent.match(/\(([^);]+)/) || [, "unknown"])[1];
    let stVersion = "Marinara Engine";
    try {
      stVersion = getContext()?.version || stVersion;
    } catch {
    }
    const transport = getActiveTransport();
    const browserActive = transport && transport === webllmTransport;
    const transportKind = transport ? browserActive ? "Browser model (WebLLM)" : "Custom endpoint" : "inactive";
    const transportRow = {
      dot: transport ? "ok" : "warn",
      label: "Active transport",
      value: transportKind
    };
    const r = lastReadiness || {};
    const gpu = r.gpu || {};
    const ram = r.ram || {};
    const cpu = r.cpu || {};
    const gpuValue = gpu.ok ? `${esc2(gpu.vendor || "WebGPU")} ${esc2(gpu.architecture || "")}`.trim() + (gpu.maxStorageBufferBindingSize ? ` \xB7 SSBO ${Math.round(gpu.maxStorageBufferBindingSize / (1024 * 1024))} MB` : "") : "no WebGPU" + (gpu.hint ? ` \u2014 ${esc2(gpu.hint)}` : "");
    const gpuRow = { dot: gpu.ok ? "ok" : "warn", label: "Device \xB7 GPU", value: gpuValue };
    const ramRow = {
      dot: ram.known ? "ok" : "warn",
      label: "Device \xB7 memory",
      value: ram.known ? `~${esc2(ram.gb)} GB (total, hint)` : "unknown (browser does not report)"
    };
    const cpuRow = { dot: "ok", label: "Device \xB7 CPU", value: `${esc2(cpu.threads || "?")} threads` };
    const configured = isModelConfigured();
    const modelId = MODEL_CONFIG?.modelId || null;
    const probedModel = lastProbe?.servedModel || null;
    const modelRow = browserActive ? {
      dot: configured ? "ok" : "warn",
      label: "Model",
      value: configured ? `<code>${esc2(modelId)}</code> \xB7 in-browser` : "not downloaded yet"
    } : settings.meConnectionId ? {
      dot: "ok",
      label: "Model",
      value: `via Marinara connection <code>${esc2(settings.meConnName || settings.meConnectionId)}</code>`
    } : probedModel ? {
      dot: "ok",
      label: "Model",
      value: `<code>${esc2(probedModel)}</code> \xB7 served${settings.model && settings.model !== probedModel ? ` \xB7 sent as <code>${esc2(settings.model)}</code>` : ""}`
    } : {
      dot: settings.model ? "ok" : "warn",
      label: "Model",
      value: settings.model ? `<code>${esc2(settings.model)}</code> \xB7 configured \xB7 run Test connection to read the served model` : "set one in Settings"
    };
    let endpointRow;
    if (settings.meConnectionId) {
      endpointRow = { dot: "ok", label: "Endpoint", value: "Marinara connection \xB7 routed via Marinara proxy" };
    } else {
      const ep = (settings.endpoint || "").trim();
      if (!ep) {
        endpointRow = { dot: "warn", label: "Endpoint", value: "not set \u2014 add a local endpoint or Marinara connection in Settings" };
      } else {
        let port = "";
        try {
          const u = new URL(ep);
          port = u.port ? ":" + u.port : "";
        } catch {
        }
        const reach = endpointConn === "ok" ? "\u2713 reachable" : endpointConn === "down" ? "\u2717 not responding" : "not probed yet";
        const lat = endpointConn === "ok" && lastProbe?.ms != null ? ` \xB7 ${lastProbe.ms}ms` : "";
        endpointRow = {
          dot: endpointConn === "down" ? "warn" : "ok",
          label: "Endpoint",
          value: `<code>${esc2(classifyEndpoint(ep) + port)}</code> \xB7 ${reach}${lat}`
        };
      }
    }
    let perfValue;
    if (!browserActive) {
      perfValue = transport ? "n/a (custom endpoint)" : "n/a (no browser model active)";
    } else if (vitalsTurns.length === 0) {
      perfValue = "no browser-model turns yet";
    } else {
      const ttfts = vitalsTurns.map((v) => v.ttftMs).filter((x) => x != null).sort((a, b) => a - b);
      const tpsArr = vitalsTurns.map((v) => v.tokensPerSec).filter((x) => x != null).sort((a, b) => a - b);
      const med = (arr) => arr.length ? arr[Math.floor((arr.length - 1) / 2)] : null;
      const ttftMed = med(ttfts);
      const tpsMed = med(tpsArr);
      perfValue = ttftMed != null ? `TTFT ${(ttftMed / 1e3).toFixed(1)}s \xB7 ${tpsMed != null ? tpsMed.toFixed(1) + " tok/s" : "\u2014"} (median of last ${vitalsTurns.length})` : "no browser-model turns yet";
    }
    const perfRow = { dot: browserActive ? "ok" : "warn", label: "Performance", value: perfValue };
    const customPrompt = !!(settings.systemPrompt && String(settings.systemPrompt).trim());
    const usingEndpoint = transport && !browserActive;
    const rows = [
      transportRow,
      modelRow,
      endpointRow,
      settings.validator?.enabled !== false ? { dot: "ok", label: "Validator", value: "Active" } : { dot: "warn", label: "Validator", value: "Off" },
      // Name the actual prompt in use, not a vague "default": the 5-pass trained-model
      // prompts carry the lineage tag (xattr_v1); a mono prompt is either the bundled
      // general prompt (tagged by the shim) or a genuinely user-supplied one.
      (() => {
        const tag = customPrompt ? settings.systemPromptTag || "custom" : SHORT_PASS_TAG;
        const mode = customPrompt ? "mono" : "5-pass";
        const isCustom = customPrompt && !settings.systemPromptTag;
        return {
          dot: isCustom ? "warn" : "ok",
          label: "System prompt",
          value: `<code>${esc2(tag)}</code> \xB7 ${mode}`
        };
      })(),
      { dot: "ok", label: "Extension", value: `<code>${esc2(EXTENSION_VERSION)}</code>` },
      { dot: "ok", label: "Host", value: `<code>${esc2(stVersion)}</code>` },
      { dot: "ok", label: "Browser / OS", value: `<code>${esc2(ua)}</code> \xB7 ${esc2(os)}` }
    ];
    if (!usingEndpoint) rows.push(perfRow, gpuRow, ramRow, cpuRow);
    return rows;
  }
  async function processMessage(rawMessage, personaName2, messageId, signal) {
    const settings = getSettings();
    if (!settings.enabled) return getChatState().state;
    const engine = getActiveEngine();
    if (!engine) {
      refreshNoModelBanner();
      return getChatState().state;
    }
    return engine.processMessage(rawMessage, personaName2, { signal, messageId });
  }
  var SEED_KEY = "__seed__";
  var SEED_CHUNK_MAX = 2e3;
  var APPEARANCE_RE = /\b(wear|wears|wearing|worn|dress|dressed|clad|clothe|clothing|clothes|outfit|attire|garb|robe|robes|shirt|blouse|tunic|trouser|trousers|pants|jeans|leggings|skirt|gown|coat|cloak|jacket|blazer|vest|hoodie|sweater|boot|boots|shoe|shoes|sandal|heel|heels|sock|glove|gloves|gauntlet|belt|sash|holster|hat|cap|hood|helmet|scarf|tie|collar|sleeve|sleeves|armor|armour|corset|bra|underwear|lingerie|barefoot|shirtless|topless|naked|nude|eyepatch|patch|monocle|glasses|goggles|earring|necklace|scar|scars|missing|stump|amput|prosthetic|bare|species|humanoid|anthro|creature|monster|beast|demon|demonic|angel|angelic|vampire|werewolf|lycan|lamia|naga|mermaid|merfolk|siren|succubus|incubus|elf|elven|elvish|orc|orcish|goblin|dwarf|dwarven|fae|fairy|fairies|nymph|kitsune|neko|catgirl|catboy|kobold|dragon|dragonborn|draconic|drake|wyvern|gargoyle|golem|android|robot|cyborg|automaton|undead|zombie|skeleton|ghost|wraith|spirit|slime|tail|tails|horn|horns|wing|wings|fang|fangs|claw|claws|talon|talons|scale|scales|scaly|fur|furry|hoof|hooves|paw|paws|snout|muzzle|mane|feather|feathers|gill|gills|fin|fins|tentacle|tentacles|antenna|antennae|pointed ears|pointy ears)\b/i;
  function appearanceChunks(text, maxChars = SEED_CHUNK_MAX) {
    const t = (text || "").trim();
    if (!t) return [];
    if (t.length <= maxChars) return [t];
    const paras = t.split(/\r?\n\s*\r?\n/).map((p) => p.trim()).filter(Boolean);
    let relevant = paras.filter((p) => APPEARANCE_RE.test(p));
    if (!relevant.length) relevant = [paras[0] || t.slice(0, maxChars)];
    const chunks = [];
    let cur = "";
    for (const p of relevant) {
      if (p.length > maxChars) {
        if (cur) {
          chunks.push(cur);
          cur = "";
        }
        for (let i = 0; i < p.length; i += maxChars) chunks.push(p.slice(i, i + maxChars));
        continue;
      }
      if (cur && cur.length + 2 + p.length > maxChars) {
        chunks.push(cur);
        cur = p;
      } else cur = cur ? `${cur}

${p}` : p;
    }
    if (cur) chunks.push(cur);
    return chunks;
  }
  function getCardSeedSource(ctx2) {
    if (ctx2.groupId) return { ok: false, reason: "group_chat" };
    const charId = ctx2.characterId;
    if (charId == null || !ctx2.characters || !ctx2.characters[charId]) {
      return { ok: false, reason: "no_character" };
    }
    const ch = ctx2.characters[charId];
    const personaName2 = ctx2.name1 || null;
    const pu = ctx2.powerUserSettings || ctx2.power_user || {};
    const avatar = ctx2.userAvatar || pu.default_persona || null;
    let personaDesc2 = "";
    let personaSrc = "none";
    if (typeof pu.persona_description === "string" && pu.persona_description.trim()) {
      personaDesc2 = pu.persona_description;
      personaSrc = "powerUserSettings.persona_description";
    } else if (avatar && pu.persona_descriptions?.[avatar]?.description) {
      personaDesc2 = pu.persona_descriptions[avatar].description;
      personaSrc = "powerUserSettings.persona_descriptions[avatar]";
    } else if (personaName2 && extension_settings?.persona_descriptions?.[personaName2]?.description) {
      personaDesc2 = extension_settings.persona_descriptions[personaName2].description;
      personaSrc = "extension_settings(legacy)";
    }
    const desc = (ch.description || ch.data?.description || "").trim();
    const personality = (ch.personality || ch.data?.personality || "").trim();
    const scenario = (ch.scenario || ch.data?.scenario || "").trim();
    const personaDescTrim = (personaDesc2 || "").trim();
    const charName = ch.name || ctx2.name2 || "Character";
    const _debug = {
      personaName: personaName2,
      charName,
      personaSrc,
      descLen: desc.length,
      personalityLen: personality.length,
      scenarioLen: scenario.length,
      personaDescLen: personaDescTrim.length,
      hasPowerUserSettings: !!ctx2.powerUserSettings,
      hasPowerUser: !!ctx2.power_user
    };
    if (!desc && !personality && !scenario && !personaDescTrim) {
      return { ok: false, reason: "no_content", _debug };
    }
    const sub = (s) => (s || "").replace(/\{\{user\}\}/gi, personaName2 || "the user").replace(/\{\{char\}\}/gi, charName);
    const personaNarration = personaDescTrim ? `PERSONA DESCRIPTION (${personaName2 || "the user"}):
${sub(personaDescTrim)}` : "";
    const chParts = [desc, personality, scenario].map(sub).filter(Boolean);
    const charNarration = chParts.length ? `CHARACTER DESCRIPTION (${charName}):
${chParts.join("\n\n")}` : "";
    return {
      ok: true,
      personaName: personaName2,
      charName,
      personaNarration,
      charNarration,
      _debug
    };
  }
  async function seedFromCards({ force = false } = {}) {
    const settings = getSettings();
    if (!settings.enabled) return { seeded: false, reason: "disabled" };
    const cs = getChatState();
    if (!force && cs.deltasByMsg && cs.deltasByMsg[SEED_KEY] != null) {
      return { seeded: false, reason: "already_seeded" };
    }
    const transport = getActiveTransport();
    if (!transport) {
      refreshNoModelBanner();
      return { seeded: false, reason: "no_model_active" };
    }
    const ctx2 = getContext();
    const src = getCardSeedSource(ctx2);
    console.log(LOG, "seedFromCards source:", { ok: src.ok, reason: src.reason, ...src._debug || {} });
    if (!src.ok) return { seeded: false, reason: src.reason };
    const callExtract = async (narration, label, foldTo, excludeFold) => {
      if (!narration) return { delta: {}, failed: false };
      const chunks = appearanceChunks(narration);
      let merged = {};
      let anyOk = false, anyFail = false;
      for (const chunk of chunks) {
        try {
          const named = foldTo ? `${foldTo}'s appearance and clothing:
${chunk}` : chunk;
          const canonical = normalize(named, src.personaName);
          const result = await extract({
            canonical,
            prevState: {},
            personaName: src.personaName,
            cfg: settings,
            transport
          });
          merged = applyDelta(merged, result.delta || {});
          anyOk = true;
        } catch (err2) {
          anyFail = true;
          console.warn(LOG, `seedFromCards ${label}: extractor call failed:`, err2.message);
        }
      }
      debugLog(`seedFromCards ${label}`, { chunks: chunks.length, chars: narration.length, merged });
      return { delta: foldTo ? foldDeltaToChar(merged, foldTo, excludeFold) : merged, failed: !anyOk && anyFail };
    };
    const personaRes = await callExtract(src.personaNarration, "persona", src.personaName, [src.charName]);
    const charRes = await callExtract(src.charNarration, "char", src.charName, [src.personaName, "self"]);
    const personaDelta = personaRes.delta, charDelta = charRes.delta;
    const seedFailed = personaRes.failed || charRes.failed;
    const delta = stripBareFromSeed({ ...personaDelta, ...charDelta });
    const mapped = mapCharacters(delta);
    const safeDelta = filterLockedFromDelta(mapped, getLocks());
    let seedDelta = safeDelta;
    if (settings.validator?.enabled !== false && Object.keys(safeDelta).length) {
      const { stripped } = applyValidator(
        { changed: true, delta: safeDelta },
        { persona: src.personaName, prevState: cs.state || {}, prose: null }
      );
      seedDelta = stripped && stripped.changed && stripped.delta ? stripped.delta : {};
    }
    const newState = applyDelta(cs.state || {}, seedDelta);
    setChatState(newState);
    if (!seedFailed) {
      cs.deltasByMsg[SEED_KEY] = seedDelta;
    }
    saveMetadataDebounced();
    injectStateIntoPrompt(newState);
    renderPanel2(newState);
    console.log(LOG, "seedFromCards applied:", {
      chars: Object.keys(seedDelta),
      personaKeyed: Object.keys(personaDelta),
      charKeyed: Object.keys(charDelta),
      seedFailed
    });
    return { seeded: true, delta: seedDelta, retryable: seedFailed };
  }
  function stripBareFromSeed(delta) {
    for (const char of Object.keys(delta || {})) {
      const body = delta[char] && delta[char].body;
      if (!body || typeof body !== "object") continue;
      for (const slot of Object.keys(body)) {
        const sd = body[slot];
        if (!sd || typeof sd !== "object") continue;
        delete sd.bare;
        if (Object.keys(sd).length === 0) delete body[slot];
      }
      if (Object.keys(body).length === 0) delete delta[char].body;
      if (delta[char] && Object.keys(delta[char]).length === 0) delete delta[char];
    }
    return delta;
  }
  var backfillInProgress = false;
  var suspendLiveProcessing = false;
  var backfillAbort = null;
  async function buildHistoryFromChat(onProgress, signal, { rebuild = false } = {}) {
    if (backfillInProgress) {
      return { done: 0, total: 0, aborted: false };
    }
    backfillInProgress = true;
    suspendLiveProcessing = true;
    try {
      const cs = getChatState();
      if (rebuild) {
        cs.state = {};
        cs.deltasByMsg = {};
        cs.capture = [];
        saveMetadataDebounced();
        $("#chat .beholder-msg-badges").remove();
        injectStateIntoPrompt({});
        renderPanel2({});
      }
      try {
        await seedFromCards({ force: false });
      } catch (err2) {
        console.warn(LOG, "seedFromCards failed during backfill (continuing):", err2);
      }
      const ctx2 = getContext();
      const chat = ctx2.chat || [];
      const personaName2 = ctx2.name1 || null;
      const targets = [];
      for (let i = 0; i < chat.length; i++) {
        const m = chat[i];
        if (!m) continue;
        if (cs.deltasByMsg && cs.deltasByMsg[i] != null) continue;
        targets.push(i);
      }
      const total = targets.length;
      let done = 0;
      let aborted = false;
      for (const i of targets) {
        if (signal?.aborted) {
          aborted = true;
          break;
        }
        try {
          onProgress?.({ done, total, current: i, inFlight: true });
        } catch {
        }
        await new Promise((r) => requestAnimationFrame(() => r()));
        try {
          await processMessage(chat[i].mes || "", personaName2, i);
        } catch (err2) {
          console.warn(LOG, `backfill: processMessage failed at msg ${i}:`, err2);
        }
        done++;
        try {
          onProgress?.({ done, total, current: i });
        } catch {
        }
      }
      debugLog("backfill complete", { done, total, aborted });
      return { done, total, aborted };
    } finally {
      backfillInProgress = false;
      suspendLiveProcessing = false;
      backfillAbort = null;
    }
  }
  function countUnprocessedMessages() {
    const ctx2 = getContext();
    const chat = ctx2.chat || [];
    const cs = getChatState();
    let n = 0;
    for (let i = 0; i < chat.length; i++) {
      const m = chat[i];
      if (!m) continue;
      if (cs.deltasByMsg && cs.deltasByMsg[i] != null) continue;
      n++;
    }
    return n;
  }
  async function runBackfillFromUi(mode = "build") {
    if (mode === "seed") {
      const result2 = await seedFromCards({ force: true });
      if (result2.seeded) {
        toastr?.success?.("Beholder: re-seeded state from character + persona card");
      } else {
        const reasons = {
          already_seeded: "card seed already exists (use Rebuild to redo from scratch)",
          no_content: "character + persona cards have no description/personality/scenario text",
          no_character: "no character selected for this chat",
          group_chat: "group chats are not supported by the card seed yet",
          extractor_failed: "extractor call failed (see console)",
          disabled: "Beholder is disabled in settings",
          no_model_active: "no model active \u2014 enable the browser model or set a custom endpoint"
        };
        toastr?.info?.(`Beholder: ${reasons[result2.reason] || result2.reason}`);
      }
      return;
    }
    const rebuild = mode === "rebuild";
    const ctx2 = getContext();
    const msgCount = (ctx2.chat || []).filter(Boolean).length;
    const total = rebuild ? msgCount : countUnprocessedMessages();
    if (total === 0 && !rebuild) {
      toastr?.info?.("Beholder: no un-processed messages to backfill");
      return;
    }
    const controller = new AbortController();
    backfillAbort = controller;
    setPanelBackfillProgress({ done: 0, total, onCancel: () => controller.abort() });
    const result = await buildHistoryFromChat(
      ({ done, inFlight }) => setPanelBackfillProgress({ done, total, inFlight, onCancel: () => controller.abort() }),
      controller.signal,
      { rebuild }
    );
    clearPanelBackfillStatus();
    const verb = rebuild ? "rebuild" : "backfill";
    const past = rebuild ? "rebuilt" : "backfilled";
    if (result.aborted) {
      toastr?.warning?.(`Beholder: ${verb} cancelled at ${result.done}/${result.total}`);
    } else {
      toastr?.success?.(`Beholder: ${past} ${result.done} message${result.done === 1 ? "" : "s"}`);
    }
  }
  async function applyNoteBoxDirective(text) {
    const settings = getSettings();
    if (!settings.enabled) return getChatState().state;
    const trimmed = (text || "").trim();
    if (!trimmed) return getChatState().state;
    const engine = getActiveEngine();
    if (!engine) {
      refreshNoModelBanner();
      return getChatState().state;
    }
    const ctx2 = getContext();
    const personaName2 = ctx2.name1 || null;
    const newState = await engine.applyDirective(trimmed, personaName2);
    debugLog("note-box directive applied");
    return newState;
  }
  var modelCachedFlag = false;
  var webllmProgressSink = null;
  function ensureWebllmTransport(onProgress) {
    webllmProgressSink = typeof onProgress === "function" ? onProgress : null;
    if (!webllmTransport) {
      webllmTransport = new WebLLMTransport({
        modelConfig: MODEL_CONFIG,
        onProgress: (report) => {
          try {
            webllmProgressSink?.({
              pct: Math.round((report?.progress ?? 0) * 100),
              text: report?.text || ""
            });
          } catch {
          }
        }
      });
    }
    return webllmTransport;
  }
  async function refreshModelCache() {
    modelCachedFlag = false;
    if (!isModelConfigured()) return false;
    try {
      const webllm = await import("https://esm.run/@mlc-ai/web-llm@0.2.84");
      const appConfig = { model_list: [toModelRecordSafe()].filter(Boolean) };
      if (typeof webllm.hasModelInCache === "function" && MODEL_CONFIG.modelId) {
        modelCachedFlag = await webllm.hasModelInCache(MODEL_CONFIG.modelId, appConfig);
      }
    } catch (err2) {
      debugLog("refreshModelCache failed (treating as not cached):", err2?.message);
      modelCachedFlag = false;
    }
    return modelCachedFlag;
  }
  function toModelRecordSafe() {
    try {
      return toModelRecord();
    } catch {
      return null;
    }
  }
  function getBrowserModelState() {
    if (!isModelConfigured()) return "unconfigured";
    const gpuOk = lastReadiness?.gpu ? lastReadiness.gpu.ok : typeof navigator !== "undefined" && !!navigator.gpu;
    if (!gpuOk) return "unsupported";
    const status = webllmTransport?.status?.();
    const state = status?.state;
    if (state === "error") return "error";
    if (state === "loading") return "downloading";
    const settings = getSettings();
    const enabled = !!settings.browserModel?.enabled;
    const cached = modelCachedFlag || state === "ready";
    if (state === "ready") {
      return enabled ? "ready-enabled" : "ready-disabled";
    }
    if (cached) {
      return "ready-disabled";
    }
    return "not-downloaded";
  }
  function getReadiness() {
    return lastReadiness || { gpu: {}, disk: {}, ram: {}, cpu: {} };
  }
  function getModelInfo() {
    return {
      modelId: MODEL_CONFIG?.modelId || null,
      version: MODEL_CONFIG?.modelVersion || null,
      approxDownloadMB: MODEL_CONFIG?.approxDownloadMB || null
    };
  }
  async function runReadinessProbe() {
    try {
      const needBytes = MODEL_CONFIG?.approxDownloadMB ? MODEL_CONFIG.approxDownloadMB * 1024 * 1024 : void 0;
      lastReadiness = await probeReadiness(needBytes != null ? { needBytes } : {});
    } catch (err2) {
      debugLog("probeReadiness failed:", err2?.message);
      lastReadiness = { gpu: { ok: false, reason: err2?.message }, disk: {}, ram: { known: false }, cpu: {} };
    }
    refreshBrowserCard2();
    refreshNoModelBanner();
    return lastReadiness;
  }
  async function onDownloadModel(onProgress) {
    const transport = ensureWebllmTransport(onProgress);
    try {
      const loading = transport.load();
      refreshBrowserCard2();
      refreshNoModelBanner();
      await loading;
      await refreshModelCache();
      getSettings().browserModel.enabled = true;
      saveSettingsDebounced();
    } catch (err2) {
      console.warn(LOG, "browser model download failed:", err2?.message);
      refreshBrowserCard2();
      refreshNoModelBanner();
      throw err2;
    }
    refreshBrowserCard2();
    refreshNoModelBanner();
  }
  async function onEnableBrowserModel() {
    const transport = ensureWebllmTransport();
    try {
      const loading = transport.ready();
      refreshBrowserCard2();
      refreshNoModelBanner();
      await loading;
      getSettings().browserModel.enabled = true;
      saveSettingsDebounced();
    } catch (err2) {
      console.warn(LOG, "browser model enable failed:", err2?.message);
      refreshBrowserCard2();
      refreshNoModelBanner();
      throw err2;
    }
    refreshBrowserCard2();
    refreshNoModelBanner();
  }
  async function onDisableBrowserModel() {
    try {
      await webllmTransport?.unload?.();
    } catch (err2) {
      debugLog("browser model unload error (continuing):", err2?.message);
    }
    getSettings().browserModel.enabled = false;
    saveSettingsDebounced();
    refreshBrowserCard2();
    refreshNoModelBanner();
  }
  async function onWipeModelCache() {
    try {
      await onDisableBrowserModel();
    } catch (err2) {
      debugLog("wipe: unload failed (continuing):", err2?.message);
    }
    let cleared = false;
    try {
      const webllm = await import("https://esm.run/@mlc-ai/web-llm@0.2.84");
      const appConfig = { model_list: [toModelRecordSafe()].filter(Boolean) };
      if (MODEL_CONFIG.modelId && typeof webllm.deleteModelAllInfoInCache === "function") {
        await webllm.deleteModelAllInfoInCache(MODEL_CONFIG.modelId, appConfig);
        cleared = true;
      } else {
        debugLog("wipe: deleteModelAllInfoInCache unavailable, or no modelId configured");
      }
    } catch (err2) {
      console.warn(LOG, "wipe model cache failed:", err2?.message);
      throw err2;
    }
    try {
      await refreshModelCache();
    } catch (err2) {
      debugLog("wipe: cache re-probe failed:", err2?.message);
    }
    refreshBrowserCard2();
    refreshNoModelBanner();
    return cleared;
  }
  var GGUF_REPO_URL = "https://huggingface.co/GetBeholder/Beholder-GGUF";
  var updateAvailable = null;
  function applyAdoptedModel() {
    const a = getSettings()?.browserModel?.adopted;
    if (a && a.modelId && a.modelLib) {
      Object.assign(MODEL_CONFIG, {
        modelVersion: a.modelVersion ?? MODEL_CONFIG.modelVersion,
        modelId: a.modelId,
        modelUrl: a.modelUrl ?? MODEL_CONFIG.modelUrl,
        modelLib: a.modelLib,
        vramRequiredMB: a.vramRequiredMB ?? MODEL_CONFIG.vramRequiredMB,
        approxDownloadMB: a.approxDownloadMB ?? MODEL_CONFIG.approxDownloadMB
      });
      debugLog("applied adopted model", a.modelVersion, a.modelId);
    }
  }
  async function checkForUpdate() {
    updateAvailable = null;
    const url = MODEL_CONFIG?.versionUrl;
    if (!url || !isModelConfigured()) return null;
    try {
      const resp = await fetch(url, { cache: "no-store" });
      if (!resp.ok) return null;
      const v = await resp.json();
      if (v?.version && v?.modelId && v?.modelLib && v.version !== MODEL_CONFIG.modelVersion) {
        updateAvailable = v;
        showUpdateDialogFn({
          from: MODEL_CONFIG.modelVersion || null,
          to: v.version,
          ggufUrl: v.ggufUrl || GGUF_REPO_URL,
          notes: v.notes || ""
        });
      }
    } catch (err2) {
      debugLog("checkForUpdate failed:", err2?.message);
    }
    refreshBrowserCard2();
    return updateAvailable;
  }
  async function applyUpdate(onProgress) {
    const v = updateAvailable;
    if (!v) return;
    const adopted = {
      modelVersion: v.version,
      modelId: v.modelId,
      modelUrl: v.modelUrl ?? MODEL_CONFIG.modelUrl,
      modelLib: v.modelLib,
      vramRequiredMB: v.vramRequiredMB ?? null,
      approxDownloadMB: v.approxDownloadMB ?? null
    };
    const s = getSettings();
    s.browserModel = s.browserModel || {};
    s.browserModel.adopted = adopted;
    saveSettingsDebounced();
    Object.assign(MODEL_CONFIG, adopted);
    try {
      await webllmTransport?.unload?.();
    } catch {
    }
    webllmTransport = null;
    updateAvailable = null;
    await onDownloadModel(onProgress);
  }
  function getUpdateInfo() {
    return updateAvailable ? {
      available: true,
      from: MODEL_CONFIG?.modelVersion || null,
      to: updateAvailable.version,
      ggufUrl: updateAvailable.ggufUrl || GGUF_REPO_URL
    } : { available: false };
  }
  function maybeAutoLoadBrowserModel() {
    try {
      const settings = getSettings();
      if (!isModelConfigured()) return;
      if (!settings.browserModel?.enabled) return;
      if ((settings.endpoint || "").trim() !== "") return;
      if (!modelCachedFlag) return;
      const gpuOk = lastReadiness?.gpu ? lastReadiness.gpu.ok : typeof navigator !== "undefined" && !!navigator.gpu;
      if (!gpuOk) return;
      const st = webllmTransport?.status?.().state;
      if (st === "ready" || st === "loading") return;
      const transport = ensureWebllmTransport();
      const loading = transport.ready();
      refreshBrowserCard2();
      refreshNoModelBanner();
      Promise.resolve(loading).then(() => {
        refreshBrowserCard2();
        refreshNoModelBanner();
      }).catch((err2) => debugLog("boot browser-model auto-load skipped:", err2?.message));
    } catch (err2) {
      debugLog("maybeAutoLoadBrowserModel guard error (ignored):", err2?.message);
    }
  }
  var setNoModelBannerFn = () => {
  };
  var refreshBrowserCardFn = () => {
  };
  var showUpdateDialogFn = () => {
  };
  var endpointConn = "unknown";
  function setEndpointConn(next) {
    if (endpointConn === next) return;
    endpointConn = next;
    refreshNoModelBanner();
  }
  function noteEndpointExtraction(ok) {
    const t = getActiveTransport();
    if (!t || t === webllmTransport) return;
    if (ok) setEndpointConn("ok");
    else probeEndpoint().catch(() => {
    });
  }
  function hasUsableExtractor() {
    const t = getActiveTransport();
    if (!t) return false;
    if (t !== webllmTransport && endpointConn === "down") return false;
    return true;
  }
  function refreshBrowserCard2() {
    try {
      refreshBrowserCardFn();
    } catch {
    }
  }
  function refreshNoModelBanner() {
    if (hasUsableExtractor()) {
      setNoModelBannerFn(null);
      return;
    }
    const settings = getSettings();
    const ep = (settings.endpoint || "").trim();
    if (ep !== "") {
      setNoModelBannerFn(endpointConn === "down" ? { cause: "endpoint-unreachable" } : null);
      return;
    }
    const enabledFlag = !!settings.browserModel?.enabled;
    const bmState = getBrowserModelState();
    if (bmState === "downloading") {
      setNoModelBannerFn({ cause: "loading" });
      return;
    }
    const cause = "never-setup";
    const copy = "No extractor configured \u2014 Beholder isn't tracking. Point it at a local endpoint (recommended) or a Marinara connection in Settings.";
    const actions = [{ id: "endpoint", label: "Open Settings" }];
    setNoModelBannerFn({ cause, copy, actions });
  }
  function onBannerAction(id) {
    const opts = id === "enable" ? { focus: "model", startDownload: getBrowserModelState() === "not-downloaded" } : { focus: "endpoint" };
    try {
      if (typeof openSettingsView === "function" && openSettingsView !== NOOP) {
        openSettingsView(opts);
      } else {
        const $btn = $('#beholder_panel .beholder-tool-btn[data-view="settings"]');
        if ($btn.length) $btn.trigger("click");
      }
    } catch (err2) {
      debugLog("banner action (open settings) failed:", err2?.message);
    }
  }
  var NOOP = () => {
  };
  var openSettingsView = NOOP;
  var setPanelBackfillProgress = () => {
  };
  var clearPanelBackfillStatus = () => {
  };
  function summarizeDelta(delta) {
    const items = [];
    if (!delta || typeof delta !== "object") return items;
    const fmtWorn = (w) => {
      if (!w || typeof w !== "object") return String(w ?? "?");
      const bits = [w.item || "?"];
      if (w.color) bits.push(w.color);
      if (w.damage) bits.push(w.damage);
      return bits.join(" \xB7 ");
    };
    const fmtHolding = (h) => {
      if (typeof h === "string") return h;
      if (!h || typeof h !== "object") return "?";
      const bits = [h.item || "?"];
      if (h.color) bits.push(h.color);
      if (h.damage) bits.push(h.damage);
      return bits.join(" \xB7 ");
    };
    const fmtWound = (w) => {
      if (typeof w === "string") return w;
      if (!w || typeof w !== "object") return "?";
      const sev = w.severity ? `[${w.severity}]` : "";
      const bleed = w.bleeding ? " \u271A" : "";
      return `${w.text || "?"}${sev ? " " + sev : ""}${bleed}`;
    };
    const isHoldingClear = (h) => h === "" || h === null || h && typeof h === "object" && !Array.isArray(h) && Object.keys(h).length === 0;
    for (const [char, cd] of Object.entries(delta)) {
      if (!cd || typeof cd !== "object") continue;
      const body = cd.body || {};
      for (const [slot, sd] of Object.entries(body)) {
        if (!sd) continue;
        if (Array.isArray(sd.worn)) {
          if (sd.worn.length === 0) {
            items.push({ char, kind: "clear", text: `cleared worn (${slot})` });
          } else {
            for (const w of sd.worn) {
              items.push({ char, kind: "add", text: `+ ${fmtWorn(w)} (${slot})` });
            }
          }
        }
        if ("holding" in sd) {
          if (isHoldingClear(sd.holding)) {
            items.push({ char, kind: "clear", text: `dropped (${slot})` });
          } else {
            items.push({ char, kind: "hold", text: `\u2726 ${fmtHolding(sd.holding)} (${slot})` });
          }
        }
        if (Array.isArray(sd.wounds)) {
          if (sd.wounds.length === 0) {
            items.push({ char, kind: "heal", text: `healed (${slot})` });
          } else {
            for (const w of sd.wounds) {
              items.push({ char, kind: "wound", text: `wound: ${fmtWound(w)} (${slot})` });
            }
          }
        }
        if ("bare" in sd) {
          items.push({
            char,
            kind: sd.bare ? "mod" : "clear",
            text: sd.bare ? `bare (${slot})` : `covered (${slot})`
          });
        }
        if ("missing" in sd) {
          items.push({
            char,
            kind: sd.missing ? "mod" : "clear",
            text: sd.missing ? `missing (${slot})` : `restored (${slot})`
          });
        }
      }
      if ("species" in cd) items.push({ char, kind: "mod", text: `species: ${cd.species}` });
    }
    return items;
  }
  function escapeBadge(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }
  function renderBadgesForMessage(messageId, delta) {
    const $msg = $(`#chat .mes[mesid="${messageId}"]`);
    if (!$msg.length) return;
    $msg.find(".beholder-msg-badges").remove();
    const items = summarizeDelta(delta);
    if (!items.length) {
      const $empty = $('<div class="beholder-msg-badges beholder-msg-noop">no state change</div>');
      $msg.find(".mes_text").first().after($empty);
      return;
    }
    const $badges = $('<div class="beholder-msg-badges"></div>');
    const byChar = {};
    for (const it of items) (byChar[it.char] = byChar[it.char] || []).push(it);
    for (const [char, list] of Object.entries(byChar)) {
      const charLabel = `<span class="bh-msg-char">${escapeBadge(char)}</span>`;
      for (const it of list) {
        $badges.append(`<span class="bh-msg-badge bh-msg-${it.kind}">${charLabel}<span class="bh-msg-text">${escapeBadge(it.text)}</span></span>`);
      }
    }
    $msg.find(".mes_text").first().after($badges);
  }
  function renderBadgesForAllMessages() {
    const cs = getChatState();
    if (!cs.deltasByMsg) return;
    for (const [msgId, delta] of Object.entries(cs.deltasByMsg)) {
      renderBadgesForMessage(msgId, delta);
    }
  }
  function onMessageReceived(messageId) {
    if (suspendLiveProcessing) {
      return;
    }
    const ctx2 = getContext();
    const chat = ctx2.chat;
    if (!chat || messageId == null || messageId >= chat.length) return;
    const message = chat[messageId];
    if (!message || message.is_user) return;
    const personaName2 = ctx2.name1 || null;
    processMessage(message.mes || "", personaName2, messageId).then(
      () => noteEndpointExtraction(true),
      (err2) => {
        console.warn(LOG, "processMessage error:", err2);
        noteEndpointExtraction(false);
      }
    );
  }
  function onMessageSent(messageId) {
    if (suspendLiveProcessing) return;
    const ctx2 = getContext();
    const chat = ctx2.chat;
    if (!chat) return;
    let idx = messageId;
    if (idx == null || idx >= chat.length) idx = chat.length - 1;
    const message = chat[idx];
    if (!message || !message.is_user) return;
    const personaName2 = ctx2.name1 || null;
    processMessage(message.mes || "", personaName2, idx).then(
      () => noteEndpointExtraction(true),
      (err2) => {
        console.warn(LOG, "processMessage (user) error:", err2);
        noteEndpointExtraction(false);
      }
    );
  }
  function onChatChanged() {
    const state = getChatState().state;
    injectStateIntoPrompt(state);
    renderPanel2(state);
    setTimeout(renderBadgesForAllMessages, 100);
    refreshNoModelBanner();
    setTimeout(() => {
      seedFromCards({ force: false }).then((r) => {
        if (r?.seeded) debugLog("auto-seeded state from cards on chat load", r.delta);
      }).catch((err2) => console.warn(LOG, "auto-seed on chat load failed (non-fatal):", err2?.message));
    }, 400);
    debugLog("chat changed, re-injected state + badges");
  }
  function recomputeStateBefore(messageId) {
    const cs = getChatState();
    const dbm = cs.deltasByMsg || {};
    const mid = Number(messageId);
    let state = {};
    if (dbm[SEED_KEY] != null) state = applyDelta(state, dbm[SEED_KEY]);
    const priorIds = Object.keys(dbm).filter((k) => k !== SEED_KEY).map(Number).filter((n) => Number.isInteger(n) && n < mid).sort((a, b) => a - b);
    for (const id of priorIds) state = applyDelta(state, dbm[id]);
    return state;
  }
  function onMessageSwiped(messageId) {
    const cs = getChatState();
    if (cs.deltasByMsg) delete cs.deltasByMsg[messageId];
    $(`#chat .mes[mesid="${messageId}"] .beholder-msg-badges`).remove();
    const ctx2 = getContext();
    const chat = ctx2.chat;
    if (!chat || messageId == null || messageId >= chat.length) return;
    const message = chat[messageId];
    if (!message || message.is_user) return;
    const personaName2 = ctx2.name1 || null;
    const base = graftUserEdits(recomputeStateBefore(messageId), cs.state, getUserEdited());
    setChatState(base);
    injectStateIntoPrompt(base);
    renderPanel2(base);
    processMessage(message.mes || "", personaName2, messageId).then(
      () => noteEndpointExtraction(true),
      (err2) => {
        console.warn(LOG, "processMessage (swipe) error:", err2);
        noteEndpointExtraction(false);
      }
    );
  }
  function onMessageDeleted(newChatLength) {
    const cs = getChatState();
    const len = Number(newChatLength);
    if (!cs.deltasByMsg || !Number.isInteger(len)) return;
    for (const k of Object.keys(cs.deltasByMsg)) {
      if (k === SEED_KEY) continue;
      const n = Number(k);
      if (Number.isInteger(n) && n >= len) delete cs.deltasByMsg[k];
    }
    const state = graftUserEdits(recomputeStateBefore(Infinity), cs.state, getUserEdited());
    setChatState(state);
    saveMetadataDebounced();
    injectStateIntoPrompt(state);
    renderPanel2(state);
    setTimeout(renderBadgesForAllMessages, 50);
  }
  async function onMessageEdited(messageId) {
    const cs = getChatState();
    const ctx2 = getContext();
    const chat = ctx2.chat;
    const mid = Number(messageId);
    if (!chat || !Number.isInteger(mid) || mid < 0 || mid >= chat.length) return;
    const message = chat[mid];
    if (!message) return;
    if (cs.deltasByMsg) delete cs.deltasByMsg[mid];
    $(`#chat .mes[mesid="${mid}"] .beholder-msg-badges`).remove();
    const personaName2 = ctx2.name1 || null;
    const base = graftUserEdits(recomputeStateBefore(mid), cs.state, getUserEdited());
    setChatState(base);
    try {
      await processMessage(message.mes || "", personaName2, mid);
      noteEndpointExtraction(true);
    } catch (err2) {
      console.warn(LOG, "processMessage (edit) error:", err2);
      noteEndpointExtraction(false);
    }
    const dbm = getChatState().deltasByMsg || {};
    const laterIds = Object.keys(dbm).filter((k) => k !== SEED_KEY).map(Number).filter((n) => Number.isInteger(n) && n > mid).sort((a, b) => a - b);
    if (laterIds.length) {
      let state = getChatState().state;
      for (const id of laterIds) state = applyDelta(state, dbm[id]);
      setChatState(state);
    }
    const finalState = getChatState().state;
    injectStateIntoPrompt(finalState);
    renderPanel2(finalState);
    setTimeout(renderBadgesForAllMessages, 50);
  }
  function onGenerationStarted() {
    injectStateIntoPrompt(getChatState().state);
  }
  function mountNoteBox() {
    if (document.querySelector(".beholder-notebox")) return;
    const anchor = document.querySelector("#send_form") || document.querySelector("#nonQRFormItems") || document.querySelector("#form_sheld") || document.querySelector(".mari-roleplay-input-column") || document.querySelector(".mari-chat-input");
    if (!anchor) {
      debugLog("note box: no chat-input anchor found \u2014 skipping mount (untested path)");
      return;
    }
    const wrap = document.createElement("div");
    wrap.className = "beholder-notebox";
    wrap.innerHTML = `
        <input type="text" class="beholder-notebox-input text_pole"
               placeholder='Beholder: set state now \u2014 e.g. "set my sword to broken"' />
        <button type="button" class="beholder-notebox-btn menu_button" title="Apply now">
            <i class="fa-solid fa-paper-plane"></i>
        </button>`;
    anchor.parentNode.insertBefore(wrap, anchor);
    const input = wrap.querySelector(".beholder-notebox-input");
    const button = wrap.querySelector(".beholder-notebox-btn");
    wireNoteBox({
      input,
      button,
      onDirective: (text) => {
        applyNoteBoxDirective(text).catch((err2) => {
          console.warn(LOG, "note-box directive failed:", err2?.message);
        });
      }
    });
    debugLog("note box mounted above chat input (untested against live ST)");
  }
  if (typeof window !== "undefined") window.__beholderMountNoteBox = mountNoteBox;
  jQuery(async () => {
    getSettings();
    setExtractConcurrency(getSettings().concurrency);
    const panelApi = mountPanel({
      settings: getSettings(),
      save: () => saveSettingsDebounced(),
      onClose: () => $("#beholder_show_panel").prop("checked", false),
      onBackfillRun: (mode) => runBackfillFromUi(mode),
      // ── Panel-view bindings (Settings / Doctor / Inspector / editor) ──
      // panel.js forwards these into views.js installViews() so the views
      // read real settings, the real capture buffer, and probe the real
      // endpoint instead of placeholder data.
      getState: () => getChatState().state,
      // The exact block injected into the RP model each turn (what the model actually sees),
      // so the Inspector can show it. Same serializer injectStateIntoPrompt uses.
      getInjectedText: () => serializeStateForPrompt(getChatState().state),
      getCapture,
      getSettings,
      saveSettings: (patch) => {
        Object.assign(getSettings(), patch || {});
        saveSettingsDebounced();
        setExtractConcurrency(getSettings().concurrency);
        refreshNoModelBanner();
        refreshBrowserCard2();
      },
      probeEndpoint,
      getDoctorVitals,
      clearChatState: () => {
        setChatState({});
        clearAllMessageDeltas();
        getChatState().capture = [];
        injectStateIntoPrompt({});
        renderPanel2({});
        $("#chat .beholder-msg-badges").remove();
      },
      // H2 — one-shot sweep: run the validator over the ALREADY-PERSISTED state and
      // strip impossible phantoms (eyepatch-on-hand, concussion-on-back, "pureblood"
      // species) minted before the seed/live validator shipped. Never touches a
      // user-locked slot. Returns { changed, removed, findings } for the Doctor to show.
      sweepChatState: () => {
        const cs = getChatState();
        const locks = getLocks();
        const { cleaned, findings, removed, changed } = sweepState(cs.state || {}, {
          persona: getContext()?.name1 || null,
          isSlotLocked: (char, slot) => isSlotLocked(locks, char, slot)
        });
        if (changed) {
          setChatState(cleaned);
          saveMetadataDebounced();
          injectStateIntoPrompt(cleaned);
          renderPanel2(cleaned);
        }
        console.log(LOG, "sweepChatState:", { changed, removed: removed.length, findings: findings.length });
        return { changed, removed: removed.length, findings };
      },
      // ── Lock + user-edit persistence (canonical store lives here) ──
      getLocks,
      setLock,
      getUserEdited,
      markUserEdited,
      applyUserEdit: applyUserSlotEdit,
      // ── Character manager (aliases / hide / reorder) ──
      getCharacters: getCharacterManagerData,
      addAlias,
      removeAlias,
      setCharHidden,
      setCharOrder,
      // ── Browser-model (Local-model card) callbacks ──
      // [host] owns all transport/engine state; the card is a pure consumer
      // that renders getBrowserModelState() and calls these handlers. The
      // transport is NEVER touched directly by the UI.
      getBrowserModelState,
      getReadiness,
      isModelConfigured,
      getModelInfo,
      onDownloadModel,
      onEnableBrowserModel,
      onDisableBrowserModel,
      onWipeModelCache,
      refreshBrowserCard: () => refreshBrowserCard2(),
      // Model auto-update: the card + dialog read getUpdateInfo() / call these.
      getUpdateInfo,
      onCheckUpdate: () => checkForUpdate(),
      onUpdateModel: (onProgress) => applyUpdate(onProgress),
      // No-model banner: the UI renders it, [host] drives cause/copy/actions.
      onBannerAction
    });
    setPanelBackfillProgress = panelApi?.setBackfillProgress || (() => {
    });
    clearPanelBackfillStatus = panelApi?.clearBackfillStatus || (() => {
    });
    setNoModelBannerFn = panelApi?.setNoModelBanner || (() => {
    });
    refreshBrowserCardFn = panelApi?.refreshBrowserCard || (() => {
    });
    showUpdateDialogFn = panelApi?.showUpdateDialog || (() => {
    });
    openSettingsView = panelApi?.openSettings || NOOP;
    applyAdoptedModel();
    renderPanel2(getChatState().state);
    runReadinessProbe().catch((err2) => debugLog("boot readiness probe failed:", err2?.message));
    refreshModelCache().then(() => {
      refreshBrowserCard2();
      refreshNoModelBanner();
      maybeAutoLoadBrowserModel();
      checkForUpdate().catch(() => {
      });
    }).catch((err2) => debugLog("boot model-cache probe failed:", err2?.message));
    refreshNoModelBanner();
    if ((getSettings().endpoint || "").trim() !== "") {
      probeEndpoint().catch((err2) => debugLog("boot endpoint probe failed:", err2?.message));
    }
    try {
      mountNoteBox();
    } catch (err2) {
      debugLog("note box mount skipped:", err2?.message);
    }
    eventSource.on(event_types.MESSAGE_RECEIVED, onMessageReceived);
    if (event_types.MESSAGE_SENT) eventSource.on(event_types.MESSAGE_SENT, onMessageSent);
    eventSource.on(event_types.CHAT_CHANGED, onChatChanged);
    eventSource.on(event_types.GENERATION_STARTED, onGenerationStarted);
    if (event_types.MESSAGE_SWIPED) eventSource.on(event_types.MESSAGE_SWIPED, onMessageSwiped);
    if (event_types.MESSAGE_DELETED) eventSource.on(event_types.MESSAGE_DELETED, onMessageDeleted);
    if (event_types.MESSAGE_UPDATED) eventSource.on(event_types.MESSAGE_UPDATED, onMessageEdited);
    setTimeout(renderBadgesForAllMessages, 500);
    console.log(LOG, "loaded (normalizer + extractor + state-merge + injection + UI + panel + msg badges wired).");
  });
})();
