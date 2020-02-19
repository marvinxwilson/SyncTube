// Generated by Haxe 4.0.5
(function ($global) { "use strict";
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Client = function(ws,name,isLeader) {
	if(isLeader == null) {
		isLeader = false;
	}
	this.ws = ws;
	this.name = name;
	this.isLeader = isLeader;
};
Client.__name__ = true;
Client.prototype = {
	getData: function() {
		return { name : this.name, isLeader : this.isLeader};
	}
};
var ClientTools = function() { };
ClientTools.__name__ = true;
ClientTools.setLeader = function(clients,name) {
	var _g = 0;
	while(_g < clients.length) {
		var client = clients[_g];
		++_g;
		if(client.name == name) {
			client.isLeader = true;
		} else if(client.isLeader) {
			client.isLeader = false;
		}
	}
};
ClientTools.hasLeader = function(clients) {
	var _g = 0;
	while(_g < clients.length) if(clients[_g++].isLeader) {
		return true;
	}
	return false;
};
ClientTools.getByName = function(clients,name) {
	var _g = 0;
	while(_g < clients.length) {
		var client = clients[_g];
		++_g;
		if(client.name == name) {
			return client;
		}
	}
	return null;
};
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw new js__$Boot_HaxeError("EReg::matched");
		}
	}
	,matchedPos: function() {
		if(this.r.m == null) {
			throw new js__$Boot_HaxeError("No string matched");
		}
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) {
			len = -1;
		}
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0 ? s : HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) {
				this.r.s = s;
			}
			return b;
		} else {
			var b1 = this.match(len < 0 ? HxOverrides.substr(s,pos,null) : HxOverrides.substr(s,pos,len));
			if(b1) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b1;
		}
	}
	,map: function(s,f) {
		var offset = 0;
		var buf_b = "";
		while(true) {
			if(offset >= s.length) {
				break;
			} else if(!this.matchSub(s,offset)) {
				buf_b += Std.string(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf_b += Std.string(HxOverrides.substr(s,offset,p.pos - offset));
			buf_b += Std.string(f(this));
			if(p.len == 0) {
				buf_b += Std.string(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else {
				offset = p.pos + p.len;
			}
			if(!this.r.global) {
				break;
			}
		}
		if(!this.r.global && offset > 0 && offset < s.length) {
			buf_b += Std.string(HxOverrides.substr(s,offset,null));
		}
		return buf_b;
	}
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.find = function(it,f) {
	var v = $getIterator(it);
	while(v.hasNext()) {
		var v1 = v.next();
		if(f(v1)) {
			return v1;
		}
	}
	return null;
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.prototype = {
	setReserved: function(key,value) {
		if(this.rh == null) {
			this.rh = { };
		}
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) {
			return null;
		} else {
			return this.rh["$" + key];
		}
	}
};
var Lang = function() { };
Lang.__name__ = true;
Lang.request = function(path,callback) {
	callback(js_node_Fs.readFileSync(path,{ encoding : "utf8"}));
};
Lang.init = function(folderPath,callback) {
	var _this = Lang.langs;
	_this.h = { };
	_this.rh = null;
	var count = 0;
	var _g = 0;
	var _g1 = Lang.ids;
	while(_g < _g1.length) {
		var name = [_g1[_g]];
		++_g;
		Lang.request("" + folderPath + "/" + name[0] + ".json",(function(name1) {
			return function(data) {
				var data1 = JSON.parse(data);
				var lang = new haxe_ds_StringMap();
				var _g2 = 0;
				var _g11 = Reflect.fields(data1);
				while(_g2 < _g11.length) {
					var key = _g11[_g2];
					++_g2;
					var v = Reflect.field(data1,key);
					if(__map_reserved[key] != null) {
						lang.setReserved(key,v);
					} else {
						lang.h[key] = v;
					}
				}
				var id = haxe_io_Path.withoutExtension(name1[0]);
				var _this1 = Lang.langs;
				if(__map_reserved[id] != null) {
					_this1.setReserved(id,lang);
				} else {
					_this1.h[id] = lang;
				}
				count += 1;
				if(count == Lang.ids.length && callback != null) {
					callback();
				}
				return;
			};
		})(name));
	}
};
Lang.get = function(lang,key) {
	var _this = Lang.langs;
	if((__map_reserved[lang] != null ? _this.getReserved(lang) : _this.h[lang]) == null) {
		lang = "en";
	}
	var _this1 = Lang.langs;
	var _this2 = __map_reserved[lang] != null ? _this1.getReserved(lang) : _this1.h[lang];
	var text = __map_reserved[key] != null ? _this2.getReserved(key) : _this2.h[key];
	if(text == null) {
		return key;
	} else {
		return text;
	}
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return s.lastIndexOf(start,0) == 0;
	} else {
		return false;
	}
};
var haxe_Log = function() { };
haxe_Log.__name__ = true;
haxe_Log.formatOutput = function(v,infos) {
	var str = Std.string(v);
	if(infos == null) {
		return str;
	}
	var pstr = infos.fileName + ":" + infos.lineNumber;
	if(infos.customParams != null) {
		var _g = 0;
		var _g1 = infos.customParams;
		while(_g < _g1.length) str += ", " + Std.string(_g1[_g++]);
	}
	return pstr + ": " + str;
};
haxe_Log.trace = function(v,infos) {
	var str = haxe_Log.formatOutput(v,infos);
	if(typeof(console) != "undefined" && console.log != null) {
		console.log(str);
	}
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = true;
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
var haxe_io_Path = function(path) {
	switch(path) {
	case ".":case "..":
		this.dir = path;
		this.file = "";
		return;
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else {
		this.dir = null;
	}
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
haxe_io_Path.__name__ = true;
haxe_io_Path.withoutExtension = function(path) {
	var s = new haxe_io_Path(path);
	s.ext = null;
	return s.toString();
};
haxe_io_Path.extension = function(path) {
	var s = new haxe_io_Path(path);
	if(s.ext == null) {
		return "";
	}
	return s.ext;
};
haxe_io_Path.prototype = {
	toString: function() {
		return (this.dir == null ? "" : this.dir + (this.backslash ? "\\" : "/")) + this.file + (this.ext == null ? "" : "." + this.ext);
	}
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g3 = 0;
			var _g11 = o.length;
			while(_g3 < _g11) {
				var i = _g3++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e1 ) {
			var e2 = ((e1) instanceof js__$Boot_HaxeError) ? e1.val : e1;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str1 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str1.length != 2) {
			str1 += ", \n";
		}
		str1 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str1 += "\n" + s + "}";
		return str1;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_node_Fs = require("fs");
var js_node_Http = require("http");
var js_node_Os = require("os");
var js_node_Path = require("path");
var js_npm_ws_Server = require("ws").Server;
var server_HttpServer = function() { };
server_HttpServer.__name__ = true;
server_HttpServer.init = function(directory) {
	server_HttpServer.dir = directory;
};
server_HttpServer.serveFiles = function(req,res) {
	var filePath = server_HttpServer.dir + req.url;
	if(req.url == "/") {
		filePath = "" + server_HttpServer.dir + "/index.html";
	}
	var extension = haxe_io_Path.extension(filePath).toLowerCase();
	var contentType = server_HttpServer.getMimeType(extension);
	if(!server_HttpServer.isChildOf(server_HttpServer.dir,filePath)) {
		res.statusCode = 500;
		var tmp = "Error getting the file: No access to " + js_node_Path.relative(server_HttpServer.dir,filePath) + ".";
		res.end(tmp);
		return;
	}
	if(filePath == "" + server_HttpServer.dir + "/client.js") {
		filePath = "" + __dirname + "/client.js";
	}
	js_node_Fs.readFile(filePath,function(err,data) {
		if(err != null) {
			if(err.code == "ENOENT") {
				res.statusCode = 404;
				var tmp1 = "File " + js_node_Path.relative(server_HttpServer.dir,filePath) + " not found.";
				res.end(tmp1);
			} else {
				res.statusCode = 500;
				res.end("Error getting the file: " + Std.string(err) + ".");
			}
			return;
		}
		res.setHeader("Content-Type",contentType);
		if(extension == "html") {
			data = server_HttpServer.localizeHtml(data.toString(),req.headers["accept-language"]);
		}
		res.end(data);
	});
};
server_HttpServer.localizeHtml = function(data,lang) {
	if(lang != null && server_HttpServer.matchLang.match(lang)) {
		lang = server_HttpServer.matchLang.matched(0);
	} else {
		lang = "en";
	}
	data = new EReg("\\${([A-z_]+)}","g").map(data,function(regExp) {
		var key = regExp.matched(1);
		return Lang.get(lang,key);
	});
	return data;
};
server_HttpServer.isChildOf = function(parent,child) {
	var relative = js_node_Path.relative(parent,child);
	if(relative.length > 0 && !StringTools.startsWith(relative,"..")) {
		return !js_node_Path.isAbsolute(relative);
	} else {
		return false;
	}
};
server_HttpServer.getMimeType = function(ext) {
	var _this = server_HttpServer.mimeTypes;
	var contentType = __map_reserved[ext] != null ? _this.getReserved(ext) : _this.h[ext];
	if(contentType == null) {
		contentType = "application/octet-stream";
	}
	return contentType;
};
var server_Main = function(port,wsPort) {
	if(wsPort == null) {
		wsPort = 4201;
	}
	if(port == null) {
		port = 4200;
	}
	this.loadedClientsCount = 0;
	this.messages = [];
	this.videoTimer = new server_VideoTimer();
	this.videoList = [];
	this.clients = [];
	this.rootDir = "" + __dirname + "/..";
	this.config = this.getUserConfig();
	this.wss = new js_npm_ws_Server({ port : wsPort});
	this.wss.on("connection",$bind(this,this.onConnect));
	var exit = function() {
		process.exit();
	};
	process.on("exit",exit);
	process.on("SIGINT",exit);
	process.on("uncaughtException",function(log) {
		haxe_Log.trace(log,{ fileName : "src/server/Main.hx", lineNumber : 40, className : "server.Main", methodName : "new"});
		return;
	});
	process.on("unhandledRejection",function(reason,promise) {
		haxe_Log.trace("Unhandled Rejection at:",{ fileName : "src/server/Main.hx", lineNumber : 43, className : "server.Main", methodName : "new", customParams : [reason]});
		return;
	});
	server_Utils.getGlobalIp(function(ip) {
		haxe_Log.trace("Local: http://" + server_Utils.getLocalIp() + ":" + port,{ fileName : "src/server/Main.hx", lineNumber : 48, className : "server.Main", methodName : "new"});
		haxe_Log.trace("Global: http://" + ip + ":" + port,{ fileName : "src/server/Main.hx", lineNumber : 49, className : "server.Main", methodName : "new"});
		return;
	});
	var dir = "" + this.rootDir + "/res";
	server_HttpServer.init(dir);
	Lang.init("" + dir + "/langs");
	js_node_Http.createServer(function(req,res) {
		server_HttpServer.serveFiles(req,res);
		return;
	}).listen(port);
};
server_Main.__name__ = true;
server_Main.main = function() {
	new server_Main();
};
server_Main.prototype = {
	getUserConfig: function() {
		var config = JSON.parse(js_node_Fs.readFileSync("" + this.rootDir + "/default-config.json",{ encoding : "utf8"}));
		var customPath = "" + this.rootDir + "/config.json";
		if(!sys_FileSystem.exists(customPath)) {
			return config;
		}
		var customConfig = JSON.parse(js_node_Fs.readFileSync(customPath,{ encoding : "utf8"}));
		var _g = 0;
		var _g1 = Reflect.fields(customConfig);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			if(Reflect.field(config,field) == null) {
				haxe_Log.trace("Warning: config field \"" + field + "\" is unknown",{ fileName : "src/server/Main.hx", lineNumber : 67, className : "server.Main", methodName : "getUserConfig"});
			}
			config[field] = Reflect.field(customConfig,field);
		}
		return config;
	}
	,onConnect: function(ws,req) {
		var _gthis = this;
		haxe_Log.trace("Client connected (" + req.connection.remoteAddress + ")",{ fileName : "src/server/Main.hx", lineNumber : 75, className : "server.Main", methodName : "onConnect"});
		var client = new Client(ws,"Unknown",false);
		this.clients.push(client);
		var tmp = this.config;
		var tmp1 = this.messages;
		var client1 = client.name;
		var _g = [];
		var _g1 = 0;
		var _g2 = this.clients;
		while(_g1 < _g2.length) _g.push(_g2[_g1++].getData());
		this.send(client,{ type : "Connected", connected : { config : tmp, history : tmp1, isUnknownClient : true, clientName : client1, clients : _g, videoList : this.videoList}});
		this.sendClientList();
		ws.on("message",function(data) {
			var tmp2 = JSON.parse(data);
			_gthis.onMessage(client,tmp2);
			return;
		});
		ws.on("close",function(err) {
			haxe_Log.trace("Client " + client.name + " disconnected",{ fileName : "src/server/Main.hx", lineNumber : 98, className : "server.Main", methodName : "onConnect"});
			HxOverrides.remove(_gthis.clients,client);
			_gthis.sendClientList();
			if(client.isLeader) {
				if(_gthis.videoTimer.isPaused()) {
					_gthis.videoTimer.play();
				}
			}
			return;
		});
	}
	,onMessage: function(client,data) {
		switch(data.type) {
		case "AddVideo":
			this.videoList.push(data.addVideo.item);
			this.broadcast(data);
			if(this.videoList.length == 1) {
				this.waitVideoStart = haxe_Timer.delay($bind(this,this.startVideoPlayback),3000);
			}
			break;
		case "Connected":
			break;
		case "GetTime":
			if(this.videoList.length == 0) {
				return;
			}
			if(this.videoTimer.getTime() > this.videoList[0].duration) {
				this.videoTimer.stop();
				this.onMessage(client,{ type : "RemoveVideo", removeVideo : { url : this.videoList[0].url}});
				return;
			}
			this.send(client,{ type : "GetTime", getTime : { time : this.videoTimer.getTime(), paused : this.videoTimer.isPaused()}});
			break;
		case "Login":
			var name = data.login.clientName;
			if(name.length == 0 || name.length > this.config.maxLoginLength || ClientTools.getByName(this.clients,name) != null) {
				this.send(client,{ type : "LoginError"});
				return;
			}
			client.name = data.login.clientName;
			this.send(client,{ type : data.type, login : { isUnknownClient : true, clientName : client.name, clients : this.clientList()}});
			this.sendClientList();
			break;
		case "LoginError":
			break;
		case "Logout":
			var oldName = client.name;
			client.name = "Unknown";
			this.send(client,{ type : data.type, logout : { clientName : oldName, clients : this.clientList()}});
			this.sendClientList();
			break;
		case "Message":
			var text = data.message.text;
			if(text.length == 0) {
				return;
			}
			if(text.length > this.config.maxMessageLength) {
				text = HxOverrides.substr(text,0,this.config.maxMessageLength);
			}
			data.message.text = text;
			data.message.clientName = client.name;
			var time = "[" + new Date().toTimeString().split(" ")[0] + "] ";
			this.messages.push({ text : text, name : client.name, time : time});
			if(this.messages.length > this.config.serverChatHistory) {
				this.messages.pop();
			}
			this.broadcast(data);
			break;
		case "Pause":
			if(this.videoList.length == 0) {
				return;
			}
			if(!client.isLeader) {
				return;
			}
			this.videoTimer.pause();
			this.broadcast(data);
			break;
		case "Play":
			if(this.videoList.length == 0) {
				return;
			}
			if(!client.isLeader) {
				return;
			}
			this.videoTimer.play();
			this.broadcast(data);
			break;
		case "RemoveVideo":
			if(this.videoList.length == 0) {
				return;
			}
			var url = data.removeVideo.url;
			if(this.videoList[0].url == url) {
				this.videoTimer.stop();
			}
			HxOverrides.remove(this.videoList,Lambda.find(this.videoList,function(item) {
				return item.url == url;
			}));
			this.broadcast(data);
			break;
		case "SetLeader":
			ClientTools.setLeader(this.clients,data.setLeader.clientName);
			this.sendClientList();
			if(this.videoList.length == 0) {
				return;
			}
			if(!ClientTools.hasLeader(this.clients)) {
				if(this.videoTimer.isPaused()) {
					this.videoTimer.play();
				}
				this.broadcast({ type : "Play", play : { time : this.videoTimer.getTime()}});
			}
			break;
		case "SetTime":
			if(this.videoList.length == 0) {
				return;
			}
			if(!client.isLeader) {
				return;
			}
			this.videoTimer.setTime(data.setTime.time);
			this.broadcastExcept(client,data);
			break;
		case "UpdateClients":
			this.sendClientList();
			break;
		case "VideoLoaded":
			this.prepareVideoPlayback();
			break;
		}
	}
	,clientList: function() {
		var _g = [];
		var _g1 = 0;
		var _g2 = this.clients;
		while(_g1 < _g2.length) _g.push(_g2[_g1++].getData());
		return _g;
	}
	,sendClientList: function() {
		this.broadcast({ type : "UpdateClients", updateClients : { clients : this.clientList()}});
	}
	,send: function(client,data) {
		client.ws.send(JSON.stringify(data),null);
	}
	,broadcast: function(data) {
		var json = JSON.stringify(data);
		var _g = 0;
		var _g1 = this.clients;
		while(_g < _g1.length) _g1[_g++].ws.send(json,null);
	}
	,broadcastExcept: function(skipped,data) {
		var json = JSON.stringify(data);
		var _g = 0;
		var _g1 = this.clients;
		while(_g < _g1.length) {
			var client = _g1[_g];
			++_g;
			if(client == skipped) {
				continue;
			}
			client.ws.send(json,null);
		}
	}
	,prepareVideoPlayback: function() {
		if(this.videoTimer.isStarted) {
			return;
		}
		this.loadedClientsCount++;
		if(this.loadedClientsCount == 1) {
			this.waitVideoStart = haxe_Timer.delay($bind(this,this.startVideoPlayback),3000);
		}
		if(this.loadedClientsCount >= this.clients.length) {
			this.startVideoPlayback();
		}
	}
	,startVideoPlayback: function() {
		if(this.waitVideoStart != null) {
			this.waitVideoStart.stop();
		}
		this.loadedClientsCount = 0;
		this.broadcast({ type : "VideoLoaded"});
		this.videoTimer.start();
	}
};
var server_Utils = function() { };
server_Utils.__name__ = true;
server_Utils.getGlobalIp = function(callback) {
	js_node_Http.get("http://myexternalip.com/raw",function(r) {
		r.setEncoding("utf8");
		return r.on("data",callback);
	});
};
server_Utils.getLocalIp = function() {
	var ifaces = js_node_Os.networkInterfaces();
	var _g = 0;
	var _g1 = Reflect.fields(ifaces);
	while(_g < _g1.length) {
		var type = Reflect.field(ifaces,_g1[_g++]);
		var _g2 = 0;
		var _g11 = Reflect.fields(type);
		while(_g2 < _g11.length) {
			var iface = Reflect.field(type,_g11[_g2++]);
			if("IPv4" != iface.family || iface.internal != false) {
				continue;
			}
			return iface.address;
		}
	}
	return "127.0.0.1";
};
var server_VideoTimer = function() {
	this.pauseStartTime = 0.0;
	this.startTime = 0.0;
	this.isStarted = false;
};
server_VideoTimer.__name__ = true;
server_VideoTimer.prototype = {
	start: function() {
		this.isStarted = true;
		this.startTime = Date.now() / 1000;
		this.pauseStartTime = 0;
	}
	,stop: function() {
		this.isStarted = false;
		this.startTime = 0.0;
		this.pauseStartTime = 0.0;
	}
	,pause: function() {
		this.pauseStartTime = Date.now() / 1000;
	}
	,play: function() {
		if(!this.isStarted) {
			this.start();
		}
		this.startTime += this.pauseTime();
		this.pauseStartTime = 0;
	}
	,getTime: function() {
		if(this.startTime == 0) {
			return 0;
		}
		return Date.now() / 1000 - this.startTime - this.pauseTime();
	}
	,setTime: function(secs) {
		this.startTime = Date.now() / 1000 - secs;
		if(this.isPaused()) {
			this.pause();
		}
	}
	,isPaused: function() {
		return this.pauseStartTime != 0;
	}
	,pauseTime: function() {
		if(!this.isPaused()) {
			return 0;
		}
		return Date.now() / 1000 - this.pauseStartTime;
	}
};
var sys_FileSystem = function() { };
sys_FileSystem.__name__ = true;
sys_FileSystem.exists = function(path) {
	try {
		js_node_Fs.accessSync(path);
		return true;
	} catch( _ ) {
		return false;
	}
};
function $getIterator(o) { if( o instanceof Array ) return HxOverrides.iter(o); else return o.iterator(); }
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
var __map_reserved = {};
String.__name__ = true;
Array.__name__ = true;
Object.defineProperty(js__$Boot_HaxeError.prototype,"message",{ get : function() {
	return String(this.val);
}});
js_Boot.__toStr = ({ }).toString;
Lang.ids = ["en","ru"];
Lang.langs = new haxe_ds_StringMap();
server_HttpServer.mimeTypes = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	if(__map_reserved["html"] != null) {
		_g.setReserved("html","text/html");
	} else {
		_g.h["html"] = "text/html";
	}
	if(__map_reserved["js"] != null) {
		_g.setReserved("js","text/javascript");
	} else {
		_g.h["js"] = "text/javascript";
	}
	if(__map_reserved["css"] != null) {
		_g.setReserved("css","text/css");
	} else {
		_g.h["css"] = "text/css";
	}
	if(__map_reserved["json"] != null) {
		_g.setReserved("json","application/json");
	} else {
		_g.h["json"] = "application/json";
	}
	if(__map_reserved["png"] != null) {
		_g.setReserved("png","image/png");
	} else {
		_g.h["png"] = "image/png";
	}
	if(__map_reserved["jpg"] != null) {
		_g.setReserved("jpg","image/jpg");
	} else {
		_g.h["jpg"] = "image/jpg";
	}
	if(__map_reserved["gif"] != null) {
		_g.setReserved("gif","image/gif");
	} else {
		_g.h["gif"] = "image/gif";
	}
	if(__map_reserved["svg"] != null) {
		_g.setReserved("svg","image/svg+xml");
	} else {
		_g.h["svg"] = "image/svg+xml";
	}
	if(__map_reserved["ico"] != null) {
		_g.setReserved("ico","image/x-icon");
	} else {
		_g.h["ico"] = "image/x-icon";
	}
	if(__map_reserved["wav"] != null) {
		_g.setReserved("wav","audio/wav");
	} else {
		_g.h["wav"] = "audio/wav";
	}
	if(__map_reserved["mp3"] != null) {
		_g.setReserved("mp3","audio/mpeg");
	} else {
		_g.h["mp3"] = "audio/mpeg";
	}
	if(__map_reserved["mp4"] != null) {
		_g.setReserved("mp4","video/mp4");
	} else {
		_g.h["mp4"] = "video/mp4";
	}
	if(__map_reserved["woff"] != null) {
		_g.setReserved("woff","application/font-woff");
	} else {
		_g.h["woff"] = "application/font-woff";
	}
	if(__map_reserved["ttf"] != null) {
		_g.setReserved("ttf","application/font-ttf");
	} else {
		_g.h["ttf"] = "application/font-ttf";
	}
	if(__map_reserved["eot"] != null) {
		_g.setReserved("eot","application/vnd.ms-fontobject");
	} else {
		_g.h["eot"] = "application/vnd.ms-fontobject";
	}
	if(__map_reserved["otf"] != null) {
		_g.setReserved("otf","application/font-otf");
	} else {
		_g.h["otf"] = "application/font-otf";
	}
	if(__map_reserved["wasm"] != null) {
		_g.setReserved("wasm","application/wasm");
	} else {
		_g.h["wasm"] = "application/wasm";
	}
	$r = _g;
	return $r;
}(this));
server_HttpServer.matchLang = new EReg("^[A-z]+","");
server_Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
