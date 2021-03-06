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
        this.sortWay();
        // setInterval(this.sortWay.bind(this),2000);
    };
    MapManager.prototype.displayWay = function (targetx, targety) {
        if (this.waylist[this.getWayKey(this.nodeList[targetx][targety])]) {
            return this.waylist[this.getWayKey(this.nodeList[targetx][targety])];
        }
        else {
            return [this.waysById[this.nodeList[targetx][targety].wayId]];
        }
    };
    // private curway:Way;
    // private findedNodes:{[key:string]:MapNode};
    MapManager.prototype.sortWay = function () {
        this.waylist = {};
        this.waysById = {};
        this.wayIndex = 0;
        // this.findedNodes = {};
        this.findway(1, 1, this.creatWay(this.nodeList[1][1]), -1, -1);
        // this.findedNodes = null;
        // console.log(this.waylist);
    };
    MapManager.prototype.creatWay = function (node) {
        var obj = new Way;
        obj.startPoint = node;
        obj.list = [node];
        obj.wayId = this.wayIndex;
        this.wayIndex++;
        return obj;
    };
    MapManager.prototype.finishWay = function (node, way) {
        way.endPoint = node;
        this.putWay(way);
        // if(!this.isExistTheWay(way))
        // {
        // 	this.putWay(way);
        // }
        // this.waylist[this.getWayKey(node)] = this.waylist[this.getWayKey(node)] = 
    };
    MapManager.prototype.isExistTheWay = function (startNode, nextNode) {
        // console.log(way,this.waylist);
        var list = this.waylist[this.getWayKey(startNode)];
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].endPoint == startNode) {
                    if (list[i].list.length > 1) {
                        if (list[i].list[list[i].list.length - 1] == nextNode)
                            return true;
                    }
                }
                else {
                    if (list[i].list.length > 1) {
                        if (list[i].list[1] == nextNode)
                            return true;
                    }
                }
            }
        }
        // 	for(var i = 0;i<list.length;i++){
        // 		if(list[i].startPoint == way.startPoint){
        // 			if(list[i].endPoint == way.endPoint){
        // 				return true;
        // 			}
        // 		}else if(list[i].startPoint = way.endPoint){
        // 				if(list[i].endPoint == way.startPoint){
        // 				return true;
        // 			}
        // 		}
        // 	}
        // }
        return false;
    };
    MapManager.prototype.getWayKey = function (node) {
        return node.x + "," + node.y;
    };
    MapManager.prototype.getWays = function (x, y) {
        if (this.waylist[this.getWayKey(this.nodeList[x][y])]) {
            return this.waylist[this.getWayKey(this.nodeList[x][y])];
        }
        return null;
    };
    MapManager.prototype.putWay = function (way) {
        var list = this.waylist[this.getWayKey(way.startPoint)];
        if (list == null) {
            list = this.waylist[this.getWayKey(way.startPoint)] = [];
        }
        if (list.indexOf(way) == -1)
            list.push(way);
        var list = this.waylist[this.getWayKey(way.endPoint)];
        if (list == null) {
            list = this.waylist[this.getWayKey(way.endPoint)] = [];
        }
        if (list.indexOf(way) == -1)
            list.push(way);
        this.waysById[way.wayId] = way;
    };
    MapManager.prototype.removeWay = function (str) {
        // console.log(str);
        delete this.waylist[str];
    };
    MapManager.prototype.changeWay = function (x, y, totype) {
        if (this.nodeList[x][y].type == totype)
            return;
        this.nodeList[x][y].type = totype;
        if (totype == 0) {
            var ways = this.getWays(x, y);
            console.log(ways);
            if (ways) {
                for (var i = 0; i < ways.length; i++) {
                    var way = ways[i];
                    if (way.startPoint == this.nodeList[x][y]) {
                        if (way.list.length > 1) {
                            way.startPoint = way.list[1];
                            way.list.shift();
                            this.putWay(way);
                        }
                        else {
                            ways.splice(i, 1);
                            i--;
                        }
                    }
                    else if (way.endPoint == this.nodeList[x][y]) {
                        if (way.list.length > 1) {
                            way.endPoint = way.list[way.list.length - 2];
                            way.list.pop();
                            this.putWay(way);
                        }
                        else {
                            ways.splice(i, 1);
                            i--;
                        }
                    }
                }
                this.removeWay(this.getWayKey(this.nodeList[x][y]));
            }
            else {
                var way = this.waysById[this.nodeList[x][y].wayId];
                var index = way.list.indexOf(this.nodeList[x][y]);
                // if(way.startPoint == this.nodeList[x][y]){
                this.removeWay(this.getWayKey(way.startPoint));
                if (index != 1) {
                    var newway = this.creatWay(way.startPoint);
                    newway.list = way.list.slice(0, index);
                    for (var i = 0; i < newway.list.length; i++) {
                        newway.list[i].wayId = newway.wayId;
                    }
                    newway.endPoint = newway.list[index - 1];
                    this.putWay(newway);
                }
                if (index != way.list.length - 2) {
                    way.startPoint = way.list[index + 1];
                    way.list.splice(0, index + 1);
                    this.putWay(way);
                }
                else {
                    delete this.waysById[way.wayId];
                    this.removeWay(this.getWayKey(way.endPoint));
                }
                // }else if(way.endPoint == this.nodeList[x][y]){
                // 	if(index != way.list.length - 2){
                // 		var newway:Way = this.creatWay(way.endPoint);
                // 		newway.list = way.list.slice(0,way.list.length - 1 - index);
                // 		newway.endPoint = newway.list[index + 1];
                // 		this.putWay(newway);
                // 	}
                // 	if(index != 1){
                // 		way.startPoint = way.list[index - 1];
                // 		way.list.splice(index,way.list.length - index);
                // 		this.putWay(way);
                // 	}else{
                // 		delete this.waysById[way.wayId];
                // 	}
                // 	this.removeWay(this.getWayKey(this.nodeList[x][y]));
                // }
                // console.log(way.list.slice(0,10));
            }
        }
        else if (totype != 0) {
            console.log("ddddddddd");
        }
    };
    MapManager.prototype.findway = function (curx, cury, way, comx, comy) {
        // console.log(this.nodeList[curx][cury]);
        if (this.nodeList[curx][cury].isfinded)
            return;
        var maybeNextNode = [];
        var node;
        // console.log(curx,cury);
        if (curx > 0 && !(curx - 1 == comx && cury == comy)) {
            node = this.nodeList[curx - 1][cury];
            if (node.type != 0) {
                maybeNextNode.push(node);
            }
        }
        if (curx < this.nodeList.length && !(curx + 1 == comx && cury == comy)) {
            node = this.nodeList[curx + 1][cury];
            if (node.type != 0) {
                maybeNextNode.push(node);
            }
        }
        if (cury > 0 && !(curx == comx && cury - 1 == comy)) {
            node = this.nodeList[curx][cury - 1];
            if (node.type != 0) {
                maybeNextNode.push(node);
            }
        }
        if (cury < this.nodeList[curx].length && !(curx == comx && cury + 1 == comy)) {
            node = this.nodeList[curx][cury + 1];
            if (node.type != 0) {
                maybeNextNode.push(node);
            }
        }
        this.nodeList[curx][cury].wayId = way.wayId;
        way.list.push(this.nodeList[curx][cury]);
        // this.findedNodes[curx + "," + cury] = 
        this.nodeList[curx][cury].isfinded = true;
        if (maybeNextNode.length == 1) {
            this.findway(maybeNextNode[0].x, maybeNextNode[0].y, way, curx, cury);
        }
        else if (maybeNextNode.length > 1) {
            // way.endPoint = this.nodeList[curx][cury];
            if (comx != -1 && comy != -1) {
                this.finishWay(this.nodeList[curx][cury], way);
            }
            for (var i = 0; i < maybeNextNode.length; i++) {
                if (!this.isExistTheWay(this.nodeList[curx][cury], maybeNextNode[i])) {
                    this.findway(maybeNextNode[i].x, maybeNextNode[i].y, this.creatWay(this.nodeList[curx][cury]), curx, cury);
                }
            }
        }
        else {
            this.finishWay(this.nodeList[curx][cury], way);
        }
    };
    MapManager.prototype.findThcWay = function (curx, cury, targetx, targety) {
        var startTime = new Date().getTime();
        if (this.waylist[this.getWayKey(this.nodeList[targetx][targety])]) {
            this.targetWay = this.waylist[this.getWayKey(this.nodeList[targetx][targety])];
        }
        else {
            this.targetWay = [this.waysById[this.nodeList[targetx][targety].wayId]];
        }
        this.canTranslateWays = [];
        this.findedWays = {};
        var maybeNextWay;
        if (this.waylist[this.getWayKey(this.nodeList[curx][cury])]) {
            maybeNextWay = this.waylist[this.getWayKey(this.nodeList[curx][cury])];
        }
        else {
            maybeNextWay = [this.waysById[this.nodeList[curx][cury].wayId]];
        }
        for (var i = 0; i < maybeNextWay.length; i++) {
            this.findNextWay(maybeNextWay[i], [], maybeNextWay[i].startPoint);
            this.findNextWay(maybeNextWay[i], [], maybeNextWay[i].endPoint);
        }
        EngineMain.instance.disWayRoute(this.canTranslateWays);
        console.log("规划消耗时间" + (new Date().getTime() - startTime));
        console.log(this.canTranslateWays);
    };
    MapManager.prototype.findNextWay = function (curway, ways, from) {
        if (this.findedWays[curway.wayId])
            return;
        var maybeNextWay = [];
        var com;
        if (from == curway.endPoint && this.waylist[this.getWayKey(curway.startPoint)]) {
            maybeNextWay = maybeNextWay.concat(this.waylist[this.getWayKey(curway.startPoint)]);
            com = curway.startPoint;
        }
        if (from == curway.startPoint && this.waylist[this.getWayKey(curway.endPoint)]) {
            maybeNextWay = maybeNextWay.concat(this.waylist[this.getWayKey(curway.endPoint)]);
            com = curway.endPoint;
        }
        ways.push(curway);
        this.findedWays[curway.wayId] = curway;
        if (this.isStayTarget(curway)) {
            this.canTranslateWays.push(ways);
            return;
        }
        if (maybeNextWay) {
            for (var i = 0; i < maybeNextWay.length; i++) {
                this.findNextWay(maybeNextWay[i], ways.concat(), com);
            }
        }
    };
    MapManager.prototype.isStayTarget = function (way) {
        for (var i = 0; i < this.targetWay.length; i++) {
            if (this.targetWay[i] == way)
                return true;
        }
        return false;
    };
    MapManager.prototype.Astar = function (curx, cury, targetx, targety) {
        var startTime = new Date().getTime();
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
        if (EngineMain.instance.gametype == 2)
            this.timeindex = setInterval(this.nextround.bind(this), 20);
        else
            console.log("Astar消耗时间" + (new Date().getTime() - startTime));
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
        if (EngineMain.instance.gametype == 1)
            this.nextround();
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
        this.joinRoom(6, 10, 10, 20, 1);
        for (var i = 0; i < this._width * 2 + 1; i++) {
            for (var j = 0; j < this._height * 2 + 1; j++) {
                mapStr += this.maplist[i][j] + ";";
            }
            mapStr += "。";
        }
        return mapStr;
    };
    MapManager.prototype.joinRoom = function (minw, maxw, minh, maxh, trynum) {
        var num = 0;
        while (num < trynum) {
            var w = Math.floor(Math.random() * (maxw - minw)) + minw;
            var h = Math.floor(Math.random() * (maxh - minh)) + minh;
            var x = Math.floor(Math.random() * (this._width * 2 - w));
            var y = Math.floor(Math.random() * (this._height * 2 - h));
            for (var i = 0; i <= w; i++) {
                for (var j = 0; j <= h; j++) {
                    if (i == 0 || j == 0 || i == w || j == h)
                        this.maplist[i + w][j + h] = 0;
                    else
                        this.maplist[i + w][j + h] = 1;
                }
            }
            num++;
        }
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