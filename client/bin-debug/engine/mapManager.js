var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mapManager = (function () {
    function mapManager() {
        this._width = 47;
        this._height = 26;
    }
    mapManager.prototype.creatMap = function () {
        this.creatBaseMap(this._width, this._height);
    };
    mapManager.prototype.creatBaseMap = function (w, h) {
        this.maplist = new Array(w * 2 + 1);
        this.disposeList = new Array(w * 2 + 1);
        this.weekList = new Array();
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
        this.gettargetpoint();
    };
    mapManager.prototype.gettargetpoint = function () {
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
    mapManager.prototype.randomDirection = function (x, y) {
        var maybeList = this.maybeGoList(x, y);
        if (maybeList.length > 0) {
            var random = Math.floor(Math.random() * maybeList.length);
            var toarr = maybeList[random];
            var tox = (toarr[0] - x) / 2 + x;
            var toy = (toarr[1] - y) / 2 + y;
            this.maplist[tox][toy] = 1;
            if (this.disposeList[toarr[0]] == null) {
                this.disposeList[toarr[0]] = new Array(this._height * 2 + 1);
            }
            this.disposeList[toarr[0]][toarr[1]] = 1;
            this.weekList.push(toarr);
            //console.log("走过"+ this.weekList.length);
            this.randomDirection(toarr[0], toarr[1]);
        }
        else {
            //console.log("一条路走到头 ，查看之前的岔道"+ this.weekList.length);
            for (var i = this.weekList.length - 1; i >= 0; i--) {
                if (this.maybeGoList(this.weekList[i][0], this.weekList[i][1]).length > 0) {
                    this.randomDirection(this.weekList[i][0], this.weekList[i][1]);
                }
            }
            //console.log("完成");
        }
    };
    mapManager.prototype.maybeGoList = function (x, y) {
        var maybeList = new Array();
        if (x - 2 > 0) {
            if (!this.disposeList[x - 2] || !this.disposeList[x - 2][y])
                maybeList.push(new Array(x - 2, y));
        }
        if (x + 2 < this._width * 2 + 1) {
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
    mapManager.getInstance = function () {
        if (this.instance == null)
            this.instance = new mapManager;
        return this.instance;
    };
    return mapManager;
}());
__reflect(mapManager.prototype, "mapManager");
//# sourceMappingURL=mapManager.js.map