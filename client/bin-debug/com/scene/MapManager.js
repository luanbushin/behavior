var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapManager = (function () {
    function MapManager() {
        this.curStep = 0;
        this._width = 63;
        this._height = 33;
        this.thewayweeknum = 0;
        this.maxweeknum = 0;
        this.endPoint = "";
    }
    MapManager.prototype.initNodes = function (maplist) {
        this.nodeList = [];
        var node;
        for (var i = 0; i < maplist.length; i++) {
            if (this.nodeList[i] == null) {
                this.nodeList[i] = new Array(maplist[i].length);
            }
            for (var j = 0; j < maplist[i].length; j++) {
                node = new MapNode;
                // item = new MapItem(maplist[i][j]);
                node.type = maplist[i][j];
                node.x = i;
                node.y = j;
                this.nodeList[i][j] = node;
                // this._stage.addChild(item);
            }
        }
        // console.log(this.nodeList);.
        // this.sortWay();
        setInterval(this.sortWay.bind(this), 2000);
    };
    // private curway:Way;
    MapManager.prototype.sortWay = function () {
        this.waylist = [];
        this.findway(1, 1, this.creatWay(this.nodeList[1][1]), -1, -1);
        console.log(this.waylist);
    };
    MapManager.prototype.creatWay = function (node) {
        var obj = new Way;
        obj.startPoint = node;
        obj.list = [node];
        this.waylist.push(obj);
        return obj;
    };
    MapManager.prototype.findway = function (curx, cury, way, comx, comy) {
        var maybeNextWay = [];
        var node;
        console.log(comx, comy);
        if (curx > 0 && !(curx - 1 == comx && cury == comy)) {
            node = this.nodeList[curx - 1][cury];
            if (node.type != 0) {
                maybeNextWay.push(node);
            }
        }
        if (curx < this.nodeList.length && !(curx + 1 == comx && cury == comy)) {
            node = this.nodeList[curx + 1][cury];
            if (node.type != 0) {
                maybeNextWay.push(node);
            }
        }
        if (cury > 0 && !(curx == comx && cury - 1 == comy)) {
            node = this.nodeList[curx][cury - 1];
            if (node.type != 0) {
                maybeNextWay.push(node);
            }
        }
        if (cury < this.nodeList[curx].length && !(curx == comx && cury + 1 == comy)) {
            node = this.nodeList[curx][cury + 1];
            if (node.type != 0) {
                maybeNextWay.push(node);
            }
        }
        way.list.push(this.nodeList[curx][cury]);
        if (maybeNextWay.length == 1) {
            this.findway(maybeNextWay[0].x, maybeNextWay[0].y, way, curx, cury);
        }
        else if (maybeNextWay.length > 1) {
            way.endPoint = this.nodeList[curx][cury];
            for (var i = 0; i < maybeNextWay.length; i++) {
                this.findway(maybeNextWay[i].x, maybeNextWay[i].y, this.creatWay(this.nodeList[curx][cury]), curx, cury);
            }
        }
        else {
        }
    };
    MapManager.prototype.Astar = function (curx, cury, targetx, targety) {
        this.curStep = 0;
        this.routeArr = [];
        this.nextList = [];
        clearInterval(this.timeindex);
        this.findTaget(curx, cury, targetx, targety, [], -1, -1);
        // if(this.routeArr.length){
        // 	for(var i = 0;i<this.routeArr.length;i++){
        // 		EngineMain.instance.disRoute(this.routeArr[i]);
        // 	}
        // }
        this.timeindex = setInterval(this.nextround.bind(this), 20);
    };
    MapManager.prototype.displayRound = function () {
        // for(var i = 0;i<this.routeArr.length;i++){
        EngineMain.instance.disRoute(this.routeArr[0]);
        // }
    };
    MapManager.prototype.findTaget = function (curx, cury, targetx, targety, arr, comx, comy) {
        EngineMain.instance.disroutepoint(new egret.Point(curx, cury));
        // console.log(curx,cury,targetx,targety);
        var nextx;
        var nexty;
        arr.push(new egret.Point(curx, cury));
        if (curx > 0) {
            nextx = curx - 1;
            nexty = cury;
            this.weekto(curx, cury, targetx, targety, nextx, nexty, arr.concat(), comx, comy);
        }
        if (curx < this.nodeList.length) {
            nextx = curx + 1;
            nexty = cury;
            this.weekto(curx, cury, targetx, targety, nextx, nexty, arr.concat(), comx, comy);
        }
        if (cury > 0) {
            nexty = cury - 1;
            nextx = curx;
            this.weekto(curx, cury, targetx, targety, nextx, nexty, arr.concat(), comx, comy);
        }
        if (cury < this.nodeList[curx].length) {
            nexty = cury + 1;
            nextx = curx;
            this.weekto(curx, cury, targetx, targety, nextx, nexty, arr.concat(), comx, comy);
        }
        // console.log(nextx,nexty);
        // if(arr.length == this.curStep){
        // }
        // if(this.curStep < arr.length)
        // this.nextround();
    };
    MapManager.prototype.nextround = function () {
        // console.log(this.curStep);
        if (this.nextList == null) {
            clearInterval(this.timeindex);
            this.displayRound();
            // if(this.routeArr.length){
            // 	for(var i = 0;i<this.routeArr.length;i++){
            // 		EngineMain.instance.disRoute(this.routeArr[i]);
            // 	}
            // }
            return;
        }
        this.cannext();
        for (var i = 0; i < this.nextList.length; i++) {
            var obj = this.nextList[i];
            if (this.curStep + 1 == obj.arr.length) {
                this.nextList.splice(i, 1);
                this.findTaget(obj.nextx, obj.nexty, obj.targetx, obj.targety, obj.arr, obj.curx, obj.cury);
                i--;
                if (this.nextList == null)
                    return;
            }
        }
    };
    MapManager.prototype.cannext = function () {
        var bool = true;
        for (var i = 0; i < this.nextList.length; i++) {
            var obj = this.nextList[i];
            if (this.curStep + 1 == obj.arr.length) {
                return;
            }
        }
        this.curStep++;
    };
    MapManager.prototype.weekto = function (curx, cury, targetx, targety, nextx, nexty, arr, comx, comy) {
        if (comx == nextx && comy == nexty)
            return;
        if (this.nextList == null)
            return;
        if (this.nodeList[nextx][nexty].type != 0 && this.isweek(nextx, nexty, arr)) {
            if (nextx == targetx && nexty == targety) {
                console.log("完成" + arr.length);
                this.routeArr.push(arr);
                this.nextList = null;
            }
            else {
                var obj = new NextObject;
                obj.nextx = nextx;
                obj.nexty = nexty;
                obj.targetx = targetx;
                obj.targety = targety;
                obj.arr = arr;
                obj.curx = curx;
                obj.cury = cury;
                this.nextList.push(obj);
                // this.curStep = arr.length;
                // this.findTaget(nextx,nexty,targetx,targety,arr,curx,cury);	
            }
        }
    };
    MapManager.prototype.isweek = function (curx, cury, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].x == curx && arr[i].y == cury) {
                return false;
            }
        }
        return true;
    };
    MapManager.prototype.getMapData = function () {
        var mapStr = "";
        this.creatBaseMap(this._width, this._height);
        for (var i = 0; i < this._width * 2 + 1; i++) {
            for (var j = 0; j < this._height * 2 + 1; j++) {
                mapStr += this.maplist[i][j] + ";";
            }
            mapStr += "。";
        }
        return mapStr;
    };
    MapManager.prototype.creatBaseMap = function (w, h) {
        this.maplist = new Array(w * 2 + 1);
        this.disposeList = new Array(w * 2 + 1);
        this.weekList = new Array();
        // console.log(this.weekList.length);
        this.weekNumList = new Array();
        for (var i = 0; i < w * 2 + 1; i++) {
            if (this.maplist[i] == null) {
                this.maplist[i] = new Array(h * 2 + 1);
            }
            for (var j = 0; j < h * 2 + 1; j++) {
                if (i % 2 == 1 && j % 2 == 1) {
                    this.maplist[i][j] = 1;
                }
                else {
                    this.maplist[i][j] = 0;
                }
            }
        }
        this.randomDirection(1, 1);
        // this.gettargetpoint();
    };
    MapManager.prototype.gettargetpoint = function () {
        var num1 = Math.random();
        if (num1 < 0.25) {
            var num2 = Math.floor(Math.random() * (this._height * 2 + 1));
            this.maplist[0][num2] = 1;
        }
        else if (num1 < 0.5) {
            var num2 = Math.floor(Math.random() * (this._height * 2 + 1));
            this.maplist[this._width * 2][num2] = 1;
        }
        else if (num1 < 0.75) {
            var num2 = Math.floor(Math.random() * (this._width * 2 + 1));
            this.maplist[num2][0] = 1;
        }
        else {
            var num2 = Math.floor(Math.random() * (this._width * 2 + 1));
            this.maplist[num2][this._height * 2] = 1;
        }
    };
    MapManager.prototype.randomDirection = function (x, y) {
        var maybeList = this.maybeGoList(x, y);
        if (maybeList.length > 0) {
            this.thewayweeknum++;
            var random = Math.floor(Math.random() * maybeList.length);
            var toarr = maybeList[random];
            var tox = (toarr[0] - x) / 2 + x;
            var toy = (toarr[1] - y) / 2 + y;
            this.maplist[tox][toy] = 1;
            // 		console.log(toarr);
            // console.log(this.disposeList);
            if (this.disposeList[toarr[0]] == null) {
                this.disposeList[toarr[0]] = new Array(this._height * 2 + 1);
            }
            this.disposeList[toarr[0]][toarr[1]] = 1;
            if (maybeList.length > 1) {
                this.weekList.push(toarr);
                this.weekNumList.push(this.thewayweeknum);
            }
            // console.log("走过"+ this.weekList.length);
            this.randomDirection(toarr[0], toarr[1]);
        }
        else {
            if (this.thewayweeknum > this.maxweeknum) {
                this.maxweeknum = this.thewayweeknum;
                this.endPoint = x + ";" + y;
            }
            // console.log("一条路走到头 ，查看之前的岔道,这条路走了"+ this.thewayweeknum);
            for (var i = this.weekList.length - 1; i >= 0; i--) {
                if (this.maybeGoList(this.weekList[i][0], this.weekList[i][1]).length > 0) {
                    var wx = this.weekList[i][0];
                    var wy = this.weekList[i][1];
                    this.thewayweeknum = this.weekNumList[i];
                    if (this.maybeGoList(this.weekList[i][0], this.weekList[i][1]).length == 1) {
                        this.weekList.splice(i, 1);
                        this.weekNumList.splice(i, 1);
                    }
                    this.randomDirection(wx, wy);
                    return;
                }
            }
            //console.log("完成");
        }
    };
    MapManager.prototype.maybeGoList = function (x, y) {
        var maybeList = new Array();
        if (x - 2 > 0) {
            if (!this.disposeList[x - 2] || !this.disposeList[x - 2][y])
                maybeList.push(new Array(x - 2, y));
        }
        if (x + 2 < this._width * 2 + 1) {
            // console.log(this.disposeList[x+2]);
            if (!this.disposeList[x + 2] || !this.disposeList[x + 2][y])
                maybeList.push(new Array(x + 2, y));
        }
        if (y - 2 > 0) {
            if (!this.disposeList[x] || !this.disposeList[x][y - 2])
                maybeList.push(new Array(x, y - 2));
        }
        if (y + 2 < this._height * 2 + 1) {
            if (!this.disposeList[x] || !this.disposeList[x][y + 2])
                maybeList.push(new Array(x, y + 2));
        }
        return maybeList;
    };
    Object.defineProperty(MapManager, "instance", {
        get: function () {
            if (this._instance == null)
                this._instance = new MapManager;
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return MapManager;
}());
__reflect(MapManager.prototype, "MapManager");
var Way = (function () {
    function Way() {
    }
    return Way;
}());
__reflect(Way.prototype, "Way");
var NextObject = (function () {
    function NextObject() {
    }
    return NextObject;
}());
__reflect(NextObject.prototype, "NextObject");
//# sourceMappingURL=MapManager.js.map