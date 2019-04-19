//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isThemeLoadEnd = false;
        _this.isResourceLoadEnd = false;
        // private _timer:egret.Timer;
        _this.fangxiang = 0;
        _this.curX = 1;
        _this.curY = 1;
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        // let assetAdapter = new AssetAdapter();
        // egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        // egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        // let theme = new eui.Theme("resource/default.thm.json", this.stage);
        // theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the
     */
    Main.prototype.onThemeLoadComplete = function () {
        this.isThemeLoadEnd = true;
        this.createScene();
    };
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    };
    Main.prototype.createScene = function () {
        this.startCreateScene();
        // if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
        //     this.startCreateScene();
        // }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    Main.prototype.onSocketOpen = function () {
        console.log("连接成功");
    };
    Main.prototype.onReceiveMessage = function (e) {
        var msg = Main.webSocket.readUTF();
        this.onmessage(msg);
    };
    Main.prototype.startCreateScene = function () {
        //         this.group = new eui.Group;
        //         this.scroller = new eui.Scroller;
        //         this.scroller.width = 200;
        //         this.scroller.height = 300;
        //         this.scroller.viewport = this.group;
        //         this.addChild(this.scroller);
        // this.group.width = 2000;
        // this.group.height = 2000;
        EngineMain.instance.init(this);
        //     Main.webSocket = new egret.WebSocket();        
        //     Main.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);                            
        //     Main.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);    
        //     Main.webSocket.connect("39.105.5.178",4788);
        //   this.initchooseRoomPanel();
    };
    Main.prototype.initchooseRoomPanel = function () {
        this.chooseRoomPanel = new egret.Sprite;
        var textfield = new egret.TextField();
        textfield.text = "在下面输入房间号";
        this.chooseRoomPanel.addChild(textfield);
        textfield.width = 500;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 0;
        textfield.y = 30;
        textfield = new egret.TextField();
        textfield.text = "";
        this.chooseRoomPanel.addChild(textfield);
        textfield.type = egret.TextFieldType.INPUT;
        textfield.width = 500;
        textfield.size = 24;
        textfield.textColor = 0x000000;
        textfield.background = true;
        textfield.x = 0;
        textfield.y = 80;
        this.textfield = textfield;
        var button = new eui.Button();
        button.label = "创建房间";
        button.x = 200;
        button.y = 150;
        this.chooseRoomPanel.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        button = new eui.Button();
        button.label = "加入房间";
        button.x = 400;
        button.y = 150;
        this.chooseRoomPanel.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick1, this);
        this.addChild(this.chooseRoomPanel);
    };
    Main.prototype.onButtonClick = function (e) {
        //var cmd = this.textfield.text + "," + mapManager.getInstance().getMapData()+","+"1;1"+","+ mapManager.getInstance().endPoint; 
        this.startgame();
        //  this.view.initmap( mapManager.getInstance().getMapData(),mapManager.getInstance().endPoint);
        // console.log("=========================================="+mapManager.getInstance().endPoint);  
        //Main.webSocket.writeUTF("creatroom,"+cmd);
        // this.textfield.text = "";
    };
    Main.prototype.onButtonClick1 = function (e) {
        var cmd = this.textfield.text;
        Main.webSocket.writeUTF("jionroom," + cmd);
        // this.textfield.text = "";
    };
    Main.prototype.startgame = function () {
        // this.chooseRoomPanel.visible = false;
        // Main.webSocket.writeUTF("creatroom,"+46545);
        // this.manList = new Array<TestMan>();
        // this.view  = new EngineMain();
        // this.addChild(this.view);
        // var button = new eui.Button();
        // button.label = "上";
        // button.x = 450;
        // button.y = 900;
        // this.addChild(button);
        // button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onup, this);
        // button = new eui.Button();
        // button.label = "下";
        // button.x =  450;
        // button.y = 1100;
        // this.addChild(button);
        // button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ondown, this);
        // button = new eui.Button();
        // button.label = "左";
        // button.x = 300;
        // button.y = 1000;
        // this.addChild(button);
        // button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onleft, this);
        // button = new eui.Button();
        // button.label = "右";
        // button.x = 600;
        // button.y = 1000;
        // this.addChild(button);
        // button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onright, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        // this._timer = new egret.Timer(500);
        // this.addEventListener(egret.TimerEvent.TIMER,this.timeHandle,this)
        this.addEventListener(egret.Event.ENTER_FRAME, this.timeHandle, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchbegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchmove, this);
    };
    Main.prototype.touchbegin = function (e) {
        this.clickx = e.$stageX;
        this.clicky = e.$stageY;
        this.moveCd = 0;
        // console.log(this.clickx,this.clicky);
    };
    Main.prototype.touchmove = function (e) {
        //        console.log("move"+this.clickx,this.clicky);
        if (Math.abs(e.$stageX - this.clickx) > Math.abs(e.$stageY - this.clicky)) {
            if (e.$stageX > this.clickx) {
                this.fangxiang = 4;
            }
            else {
                this.fangxiang = 3;
            }
        }
        else {
            if (e.$stageY > this.clicky) {
                this.fangxiang = 2;
            }
            else {
                this.fangxiang = 1;
            }
        }
        this.clickx = e.$stageX;
        this.clicky = e.$stageY;
    };
    Main.prototype.touchEnd = function (e) {
        // this._timer.stop();
        this.fangxiang = 0;
    };
    Main.prototype.startFarme = function () {
    };
    Main.prototype.timeHandle = function (e) {
        // console.log(this.fangxiang);
        if (this.moveCd < 0) {
            if (this.fangxiang == 1) {
                if (this.view.getTargetCanGo(this.curX, this.curY - 1))
                    Main.webSocket.writeUTF("week," + this.roomId + "," + this.curX + "," + (this.curY - 1));
            }
            else if (this.fangxiang == 2) {
                if (this.view.getTargetCanGo(this.curX, this.curY + 1))
                    Main.webSocket.writeUTF("week," + this.roomId + "," + this.curX + "," + (this.curY + 1));
            }
            else if (this.fangxiang == 3) {
                if (this.view.getTargetCanGo(this.curX - 1, this.curY))
                    Main.webSocket.writeUTF("week," + this.roomId + "," + (this.curX - 1) + "," + this.curY);
            }
            else if (this.fangxiang == 4) {
                if (this.view.getTargetCanGo(this.curX + 1, this.curY))
                    Main.webSocket.writeUTF("week," + this.roomId + "," + (this.curX + 1) + "," + this.curY);
            }
            this.moveCd = 3;
        }
        this.moveCd--;
    };
    Main.prototype.onup = function (e) {
        this.fangxiang = 1;
        this.moveCd = 0;
        // this.timeHandle(null);
        // this._timer.start();
    };
    Main.prototype.ondown = function (e) {
        this.fangxiang = 2;
        // this._timer.start();
        // this.timeHandle(null);
        this.moveCd = 0;
    };
    Main.prototype.onleft = function (e) {
        this.fangxiang = 3;
        // this._timer.start();
        // this.timeHandle(null);
        this.moveCd = 0;
    };
    Main.prototype.onright = function (e) {
        this.fangxiang = 4;
        // this._timer.start();
        // this.timeHandle(null);
        this.moveCd = 0;
    };
    Main.prototype.tishi = function (str) {
        if (this.tishitxt == null) {
            this.tishitxt = new eui.Label();
            this.addChild(this.tishitxt);
        }
        this.tishitxt.y = 500;
        this.tishitxt.width = 640;
        this.tishitxt.text = str;
        this.tishitxt.textAlign = "centre";
        var tw = egret.Tween.get(this.tishitxt);
        tw.to({ y: -200 }, 600);
    };
    Main.prototype.onmessage = function (str) {
        var messageArr = str.split(",");
        //    console.log(str);
        switch (messageArr[0]) {
            case "mapdata":
                console.log(str);
                this.startgame();
                this.roomId = messageArr[1];
                this.view.initmap(messageArr[2], messageArr[4]);
                this.view;
                var man = new TestMan();
                man.x = this.curX * 10;
                man.y = this.curY * 10;
                this.addChild(man);
                this.manList.push(man);
                this.playerIndex = 0;
                break;
            case "weekto":
                if (parseInt(messageArr[1]) == this.playerIndex) {
                    this.curX = parseInt(messageArr[2]);
                    this.curY = parseInt(messageArr[3]);
                }
                this.manList[parseInt(messageArr[1])].x = parseInt(messageArr[2]) * 10;
                this.manList[parseInt(messageArr[1])].y = parseInt(messageArr[3]) * 10;
                break;
            case "selfjoinroomsuccess":
                this.startgame();
                this.roomId = messageArr[1];
                this.view.initmap(messageArr[2], messageArr[5]);
                this.playerIndex = parseInt(messageArr[3]);
                for (var i = 0; i <= this.playerIndex; i++) {
                    var man = new TestMan();
                    man.x = 1 * 10;
                    man.y = 1 * 10;
                    this.addChild(man);
                    this.manList.push(man);
                }
                break;
            case "otherjoinroomsuccess":
                var man = new TestMan();
                man.x = 1 * 10;
                man.y = 1 * 10;
                this.addChild(man);
                this.manList.push(man);
                break;
            default:
                this.tishi(str);
                break;
        }
    };
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Main.prototype.removeTargetStage = function (dis) {
        if (dis) {
            if (dis.parent)
                dis.parent.removeChild(dis);
        }
    };
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    return Main;
}(eui.Scroller));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map