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
        if (num == 0)
            _this.graphics.beginFill(0xFF8C00);
        else if (num == 1)
            _this.graphics.beginFill(0x8B7D7B);
        _this.graphics.drawRect(5, 5, 10, 10);
        _this.graphics.endFill();
        _this.cacheAsBitmap = true;
        return _this;
    }
    return MapItem;
}(egret.Shape));
__reflect(MapItem.prototype, "MapItem");
//# sourceMappingURL=MapItem.js.map