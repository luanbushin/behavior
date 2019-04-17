var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EngineMain = (function (_super) {
    __extends(EngineMain, _super);
    function EngineMain() {
        return _super.call(this) || this;
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
        // var button = new eui.Button();
        // button.label = "上";
        // button.x = 320;
        // button.y = 800;
        // this.addChild(button);
        //  button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onup, this);
    }
    EngineMain.prototype.getTargetCanGo = function (x, y) {
        if (this.maplist[x][y] == 1) {
            return true;
        }
        return false;
    };
    EngineMain.prototype.initmap = function (str) {
        var arr = str.split("。");
        //console.log("收到数据：" +str + ""+ arr.length);
        this.maplist = new Array(arr.length - 1);
        ;
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
        var item;
        for (var i = 0; i < maplist.length; i++) {
            for (var j = 0; j < maplist[i].length; j++) {
                item = new MapItem(maplist[i][j]);
                item.x = 10 * i;
                item.y = 10 * j;
                this.addChild(item);
            }
        }
    };
    return EngineMain;
}(egret.Sprite));
__reflect(EngineMain.prototype, "EngineMain");
//# sourceMappingURL=EngineMain.js.map