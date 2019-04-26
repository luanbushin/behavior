var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EngineMain = (function () {
    function EngineMain() {
        // super();
        this.desStr = ["AStar", "AStar过程", "点击查看道路", "规划寻路", "添加障碍"];
        // mapManager.getInstance().creatMap();
        // var item:MapItem 
        // for(var i:number = 0;i<mapManager.getInstance().maplist.length;i++){
        // 	for(var j:number = 0;j<mapManager.getInstance().maplist[i].length;j++){
        // 		//console.log(mapManager.getInstance().maplist[i][j]);
        // 		item = new MapItem(mapManager.getInstance().maplist[i][j]);
        // 		item.x = 20*i;
        // 		item.y = 20*j;
        // 		this.addChild(item);
        // 	}
        // }
        // 	var button = new eui.Button();
        //     button.label = "上";
        //     button.x = 320;
        //     button.y = 800;
        //     this.addChild(button);
        //    button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onup, this);
    }
    EngineMain.prototype.init = function (st) {
        this._stage = st;
        this.player = new Player;
        this.player.x = 15;
        this.player.y = 15;
        // this._stage.addChild(this.player);
        this._stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.socketConnector = new SocketConnector("127.0.0.1", 4788);
    };
    EngineMain.prototype.onClick = function (e) {
        if (e.stageY < 15) {
            var click = false;
            for (var i = 0; i < 6; i++) {
                if (e.stageX >= i * 30 + 20 && e.stageX <= i * 30 + 20 + 15) {
                    this.tabArr[i].choose(true);
                    this.gametype = i + 1;
                    click = true;
                    console.log(this.desStr[i]);
                }
                else {
                    this.tabArr[i].choose(false);
                }
            }
            if (!click)
                this.tabArr[this.gametype - 1].choose(true);
            return;
        }
        var px = Math.floor((this.player.x - 5) / 10);
        var py = Math.floor((this.player.y - 5) / 10);
        var x = Math.floor((e.stageX - 5) / 10);
        var y = Math.floor((e.stageY - 5) / 10);
        if (this.gametype < 5) {
            if (MapManager.instance.nodeList[x][y].type == 0)
                return;
        }
        else if (this.gametype == 5) {
            MapManager.instance.changeWay(x, y, 0);
            this.changeMapItem(x, y, 0);
        }
        else if (this.gametype == 6) {
            MapManager.instance.changeWay(x, y, 1);
            this.changeMapItem(x, y, 1);
        }
        this.resetRoute();
        this.tragetx = x;
        this.tragety = y;
        if (this.gametype < 3)
            MapManager.instance.Astar(px, py, x, y);
        else if (this.gametype == 4)
            MapManager.instance.findThcWay(px, py, x, y);
        else if (this.gametype == 3) {
            var ways = MapManager.instance.displayWay(x, y);
            console.log(ways);
            for (var i = 0; i < ways.length; i++) {
                for (var j = 0; j < ways[i].list.length; j++) {
                    this.mapItemlist[ways[i].list[j].x][ways[i].list[j].y].setRoute();
                }
            }
        }
    };
    EngineMain.prototype.disWayRoute = function (ways) {
        for (var i = 0; i < ways.length; i++) {
            for (var j = 0; j < ways[i].length; j++) {
                for (var m = 0; m < ways[i][j].list.length; m++) {
                    this.mapItemlist[ways[i][j].list[m].x][ways[i][j].list[m].y].setRoute();
                }
            }
        }
    };
    EngineMain.prototype.getTargetCanGo = function (x, y) {
        if (this.maplist[x][y] == 1) {
            return true;
        }
        return false;
    };
    EngineMain.prototype.initmap = function (str, strend) {
        var arr = str.split("。");
        //console.log("收到数据：" +str + ""+ arr.length);
        this.maplist = new Array(arr.length - 1);
        var maplist = this.maplist;
        for (var i = 0; i < arr.length - 1; i++) {
            var arr1 = arr[i].split(";");
            if (maplist[i] == null) {
                maplist[i] = new Array(arr1.length - 1);
            }
            for (var j = 0; j < arr1.length - 1; j++) {
                maplist[i][j] = parseInt(arr1[j]);
            }
        }
        //var endarr:Array<string> =  strend.split(";");
        //maplist[endarr[0]][endarr[1]] = 9;
        //	console.log(strend+"终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点"+endarr[0] +"===============" +endarr[1]);
        MapManager.instance.initNodes(maplist);
        this.mapItemlist = new Array();
        var item;
        for (var i = 0; i < maplist.length; i++) {
            if (this.mapItemlist[i] == null)
                this.mapItemlist[i] = new Array();
            for (var j = 0; j < maplist[i].length; j++) {
                item = new MapItem(maplist[i][j]);
                item.x = 10 * i;
                item.y = 10 * j;
                this._stage.addChild(item);
                this.mapItemlist[i][j] = item;
            }
        }
        this._stage.addChild(this.player);
        this.tabArr = [];
        for (var i = 0; i < 6; i++) {
            var tab = new TabItem;
            tab.x = i * 30 + 20;
            this._stage.addChild(tab);
            this.tabArr.push(tab);
        }
        this.tabArr[0].choose(true);
        this.gametype = 1;
    };
    EngineMain.prototype.changeMapItem = function (x, y, type) {
        this.mapItemlist[x][y].removeRoute(type);
    };
    EngineMain.prototype.resetRoute = function () {
        for (var i = 0; i < this.mapItemlist.length; i++) {
            for (var j = 0; j < this.mapItemlist[i].length; j++) {
                this.mapItemlist[i][j].removeRoute();
            }
        }
    };
    EngineMain.prototype.disRoute = function (arr) {
        this.routeArr = arr;
        // if(arr.length)
        this.resetRoute();
        for (var i = 0; i < arr.length; i++) {
            this.mapItemlist[arr[i].x][arr[i].y].setRoute();
        }
        // this.player.x = 5 + 10*this.tragetx;
        // this.player.y = 5 + 10*this.tragety;
        //this.timeindex = setInterval(this.nextround.bind(this),20);
    };
    EngineMain.prototype.nextround = function () {
        this.player.x = 5 + 10 * this.routeArr[0].x;
        this.player.y = 5 + 10 * this.routeArr[0].y;
        this.routeArr.shift();
        if (this.routeArr.length == 0) {
            clearInterval(this.timeindex);
        }
    };
    EngineMain.prototype.disroutepoint = function (xpoint) {
        this.mapItemlist[xpoint.x][xpoint.y].setRouteing();
    };
    Object.defineProperty(EngineMain, "instance", {
        get: function () {
            if (this._instance == null)
                this._instance = new EngineMain;
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return EngineMain;
}());
__reflect(EngineMain.prototype, "EngineMain");
//# sourceMappingURL=EngineMain.js.map