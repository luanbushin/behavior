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
var TabItem = (function (_super) {
    __extends(TabItem, _super);
    function TabItem() {
        var _this = _super.call(this) || this;
        _this.bitmap = new egret.Bitmap();
        _this.addChild(_this.bitmap);
        _this.bitmap.texture = RES.getRes("player_png");
        _this.bitmap.width = 15;
        _this.bitmap.height = 15;
        return _this;
    }
    TabItem.prototype.choose = function (bool) {
        if (bool) {
            this.bitmap.texture = RES.getRes("end_png");
        }
        else {
            this.bitmap.texture = RES.getRes("player_png");
        }
    };
    return TabItem;
}(egret.Sprite));
__reflect(TabItem.prototype, "TabItem");
//# sourceMappingURL=TabItem.js.map