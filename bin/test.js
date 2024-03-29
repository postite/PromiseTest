var HxOverrides = function() { }
HxOverrides.__name__ = true;
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var IntIter = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIter.__name__ = true;
IntIter.prototype = {
	next: function() {
		return this.min++;
	}
	,hasNext: function() {
		return this.min < this.max;
	}
	,__class__: IntIter
}
var Lambda = function() { }
Lambda.__name__ = true;
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) return true;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) return true;
		}
	}
	return false;
}
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
}
Lambda.foreach = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
}
Lambda.iter = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
}
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
Lambda.empty = function(it) {
	return !$iterator(it)().hasNext();
}
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = $iterator(a)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = $iterator(b)();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		l.add(x);
	}
	return l;
}
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else s.b += Std.string(sep);
			s.b += Std.string(l[0]);
			l = l[1];
		}
		return s.b;
	}
	,toString: function() {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		s.b += Std.string("{");
		while(l != null) {
			if(first) first = false; else s.b += Std.string(", ");
			s.b += Std.string(Std.string(l[0]));
			l = l[1];
		}
		s.b += Std.string("}");
		return s.b;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,last: function() {
		return this.q == null?null:this.q[0];
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
}
var Std = function() { }
Std.__name__ = true;
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
StringBuf.prototype = {
	toString: function() {
		return this.b;
	}
	,addSub: function(s,pos,len) {
		this.b += HxOverrides.substr(s,pos,len);
	}
	,addChar: function(c) {
		this.b += String.fromCharCode(c);
	}
	,add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
}
var Test = function() { }
Test.__name__ = true;
Test.main = function() {
	var p1 = new promhx.Promise();
	p1.then(function(x) {
		console.log("delivered " + x);
	});
	var p2 = new promhx.Promise();
	((function($this) {
		var $r;
		var parr = [p1,p2];
		var p = new promhx.Promise();
		$r = { then : function(f) {
			var cthen = function(v) {
				if(promhx.Promise.allSet(parr)) try {
					p.resolve(f(p1._val,p2._val));
				} catch( e ) {
					p.handleError(e);
				}
			};
			if(promhx.Promise.allSet(parr)) cthen(null); else {
				var _g = 0;
				while(_g < parr.length) {
					var p3 = parr[_g];
					++_g;
					p3.then(cthen);
				}
			}
			return p;
		}};
		return $r;
	}(this))).then(function(x,y) {
		console.log(x + y);
	});
	var k = new Array();
	k.push(p1);
	k.push(p2);
	((function($this) {
		var $r;
		var parr = k;
		var p = new promhx.Promise();
		$r = { then : function(f) {
			var cthen = function(v) {
				if(promhx.Promise.allSet(parr)) try {
					p.resolve((function($this) {
						var $r;
						var arr = [];
						{
							var _g = 0;
							while(_g < k.length) {
								var a = k[_g];
								++_g;
								arr.push(a._val);
							}
						}
						$r = f(arr);
						return $r;
					}(this)));
				} catch( e ) {
					p.handleError(e);
				}
			};
			if(promhx.Promise.allSet(parr)) cthen(null); else {
				var _g = 0;
				while(_g < parr.length) {
					var p3 = parr[_g];
					++_g;
					p3.then(cthen);
				}
			}
			return p;
		}};
		return $r;
	}(this))).then(function(x) {
		console.log("passed as Iterable instance: " + Std.string(x));
	});
	((function($this) {
		var $r;
		var parr = [p1,p2];
		var p = new promhx.Promise();
		$r = { then : function(f) {
			var cthen = function(v) {
				if(promhx.Promise.allSet(parr)) try {
					p.resolve(f(p1._val,p2._val));
				} catch( e ) {
					p.handleError(e);
				}
			};
			if(promhx.Promise.allSet(parr)) cthen(null); else {
				var _g = 0;
				while(_g < parr.length) {
					var p3 = parr[_g];
					++_g;
					p3.then(cthen);
				}
			}
			return p;
		}};
		return $r;
	}(this))).then(function(x,y) {
		console.log("passed as array literal: " + x + "," + y);
	});
	((function($this) {
		var $r;
		var parr = [p1,p2];
		var p = new promhx.Promise();
		$r = { then : function(f) {
			var cthen = function(v) {
				if(promhx.Promise.allSet(parr)) try {
					p.resolve(f(p1._val,p2._val));
				} catch( e ) {
					p.handleError(e);
				}
			};
			if(promhx.Promise.allSet(parr)) cthen(null); else {
				var _g = 0;
				while(_g < parr.length) {
					var p3 = parr[_g];
					++_g;
					p3.then(cthen);
				}
			}
			return p;
		}};
		return $r;
	}(this))).then(function(x,y) {
		return x + y;
	}).then(function(x) {
		console.log(x + 1);
	});
	var p3 = new promhx.Promise();
	((function($this) {
		var $r;
		var parr = [p1,p2];
		var p = new promhx.Promise();
		$r = { then : function(f) {
			var cthen = function(v) {
				if(promhx.Promise.allSet(parr)) try {
					p.resolve(f(p1._val,p2._val));
				} catch( e ) {
					p.handleError(e);
				}
			};
			if(promhx.Promise.allSet(parr)) cthen(null); else {
				var _g = 0;
				while(_g < parr.length) {
					var p4 = parr[_g];
					++_g;
					p4.then(cthen);
				}
			}
			return p;
		}};
		return $r;
	}(this))).then(function(x,y) {
		return x + y;
	}).pipe(function(x) {
		return p3;
	}).then(function(x) {
		console.log(x);
	});
	((function($this) {
		var $r;
		var parr = [p1,p2];
		var p = new promhx.Promise();
		$r = { then : function(f) {
			var cthen = function(v) {
				if(promhx.Promise.allSet(parr)) try {
					p.resolve(f(p1._val,p2._val));
				} catch( e ) {
					p.handleError(e);
				}
			};
			if(promhx.Promise.allSet(parr)) cthen(null); else {
				var _g = 0;
				while(_g < parr.length) {
					var p4 = parr[_g];
					++_g;
					p4.then(cthen);
				}
			}
			return p;
		}};
		return $r;
	}(this))).then(function(x,y) {
		throw "an error";
	}).error(function(x) {
		console.log(x);
	});
	((function($this) {
		var $r;
		var parr = [p1,p2];
		var p = new promhx.Promise();
		$r = { then : function(f) {
			var cthen = function(v) {
				if(promhx.Promise.allSet(parr)) try {
					p.resolve(f(p1._val,p2._val));
				} catch( e ) {
					p.handleError(e);
				}
			};
			if(promhx.Promise.allSet(parr)) cthen(null); else {
				var _g = 0;
				while(_g < parr.length) {
					var p4 = parr[_g];
					++_g;
					p4.then(cthen);
				}
			}
			return p;
		}};
		return $r;
	}(this))).then(function(x,y) {
		throw "an error";
	}).then(function(x) {
		return "a value";
	}).error(function(x) {
		try {
			throw x;
		} catch( $e0 ) {
			if( js.Boot.__instanceof($e0,String) ) {
				var e = $e0;
				console.log("caught a string: " + e);
			} else {
			var e = $e0;
			console.log("caught something unknown:" + Std.string(e));
			}
		}
	});
	p2.resolve(2);
	p1.resolve(1);
	p3.resolve("hi");
	((function($this) {
		var $r;
		var parr = [p1,p2];
		var p = new promhx.Promise();
		$r = { then : function(f) {
			var cthen = function(v) {
				if(promhx.Promise.allSet(parr)) try {
					p.resolve(f(p1._val,p2._val));
				} catch( e ) {
					p.handleError(e);
				}
			};
			if(promhx.Promise.allSet(parr)) cthen(null); else {
				var _g = 0;
				while(_g < parr.length) {
					var p4 = parr[_g];
					++_g;
					p4.then(cthen);
				}
			}
			return p;
		}};
		return $r;
	}(this))).then(function(x,y) {
		console.log(x + ", " + y);
	});
}
var js = js || {}
js.Boot = function() { }
js.Boot.__name__ = true;
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.isClass = function(o) {
	return o.__name__;
}
js.Boot.isEnum = function(e) {
	return e.__ename__;
}
js.Boot.getClass = function(o) {
	return o.__class__;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		if(cl == Class && o.__name__ != null) return true; else null;
		if(cl == Enum && o.__ename__ != null) return true; else null;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
var promhx = promhx || {}
promhx.Promise = function(errorf) {
	this._set = false;
	this._update = new Array();
	this._error = new Array();
	if(errorf != null) this._error.push(errorf);
};
promhx.Promise.__name__ = true;
promhx.Promise.allSet = function($as) {
	var $it0 = $iterator($as)();
	while( $it0.hasNext() ) {
		var a = $it0.next();
		if(!a._set) return false;
	}
	return true;
}
promhx.Promise.promise = function(_val,errorf) {
	var ret = new promhx.Promise(errorf);
	ret.resolve(_val);
	return ret;
}
promhx.Promise.prototype = {
	reject: function(e) {
		this._update = new Array();
		this.handleError(e);
	}
	,pipe: function(f) {
		if(this._set) return f(this._val); else {
			var ret = new promhx.Promise();
			var this_update = function(x) {
				var fret = f(x);
				fret._update.push($bind(ret,ret.resolve));
				fret._error.push($bind(ret,ret.handleError));
			};
			this._update.push(this_update);
			this._error.push($bind(ret,ret.handleError));
			return ret;
		}
	}
	,then: function(f) {
		var ret = new promhx.Promise();
		if(this._set) try {
			f(this._val);
		} catch( e ) {
			this.handleError(e);
		} else {
			this._update.push(f);
			this._error.push($bind(ret,ret.handleError));
		}
		return ret;
	}
	,handleError: function(d) {
		if(this._errorf != null) this._errorf(d); else if(this._error.length == 0) throw d; else {
			var _g = 0, _g1 = this._error;
			while(_g < _g1.length) {
				var ef = _g1[_g];
				++_g;
				ef(d);
			}
		}
		return null;
	}
	,resolve: function(val) {
		if(this._set) throw "Promise has already been resolved";
		this._set = true;
		this._val = val;
		var _g = 0, _g1 = this._update;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			try {
				f(this._val);
			} catch( e ) {
				this.handleError(e);
			}
		}
		this._update = new Array();
	}
	,error: function(f) {
		this._errorf = f;
		return this;
	}
	,__class__: promhx.Promise
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
}; else null;
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.prototype.__class__ = Array;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var Void = { __ename__ : ["Void"]};
Test.main();
