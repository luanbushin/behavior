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
var MapItem = (function (_super) {
    __extends(MapItem, _super);
    function MapItem(num) {
        var _this = _super.call(this) || this;
        _this.bitmap = new egret.Bitmap();
        _this.bitmap.x = 5;
        _this.bitmap.y = 5;
        _this.addChild(_this.bitmap);
        _this.type = num;
        if (num == 0) {
            _this.bitmap.texture = RES.getRes("MapItemBg_png");
        }
        else if (num == 9) {
            // console.log("终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点");
            _this.bitmap.texture = RES.getRes("end_png");
        }
        else {
            _this.bitmap.texture = null;
        }
        _this.bitmap.width = 10;
        _this.bitmap.height = 10;
        return _this;
        // this.cacheAsBitmap=true;
    }
    MapItem.prototype.removeRoute = function () {
        this.bitmap.x = 5;
        this.bitmap.y = 5;
        this.bitmap.width = 10;
        this.bitmap.height = 10;
        if (this.type == 0) {
            this.bitmap.texture = RES.getRes("MapItemBg_png");
        }
        else if (this.type == 9) {
            // console.log("终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点");
            this.bitmap.texture = RES.getRes("end_png");
        }
        else {
            this.bitmap.texture = null;
        }
    };
    MapItem.prototype.setRoute = function () {
        this.bitmap.texture = RES.getRes("route_png");
        this.bitmap.x = 6;
        this.bitmap.y = 6;
        this.bitmap.width = 8;
        this.bitmap.height = 8;
    };
    MapItem.prototype.setRouteing = function () {
        this.bitmap.texture = RES.getRes("red_png");
    };
    return MapItem;
}(egret.Sprite));
__reflect(MapItem.prototype, "MapItem");
//# sourceMappingURL=MapItem.js.map