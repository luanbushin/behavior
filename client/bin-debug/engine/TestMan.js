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
var TestMan = (function (_super) {
    __extends(TestMan, _super);
    function TestMan() {
        var _this = _super.call(this) || this;
        _this.graphics.beginFill(0xff0000, 0.8);
        // this.graphics.drawRect(-5,-5,200,200);
        _this.graphics.drawCircle(5, 5, 5);
        _this.graphics.endFill();
        return _this;
    }
    return TestMan;
}(egret.Sprite));
__reflect(TestMan.prototype, "TestMan");
//# sourceMappingURL=TestMan.js.map