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

class Main extends eui.Scroller {
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

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
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
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
    }
    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }
    private createScene() {
          this.startCreateScene();
        // if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
        //     this.startCreateScene();
        // }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }


    
    private onSocketOpen():void {   
        console.log("连接成功");    

    }
    private onReceiveMessage(e:egret.Event):void {   
        var msg = Main.webSocket.readUTF(); 

        this.onmessage(msg);   
    }

    private view:EngineMain;
    public static webSocket:egret.WebSocket;

    public scroller:eui.Scroller;
    public group:eui.Group;
    protected startCreateScene(): void {
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
    }
    // private textfield: egret.TextField;
    private chooseRoomPanel:egret.Sprite;
     private initchooseRoomPanel():void{
        this.chooseRoomPanel = new egret.Sprite;
        let textfield = new egret.TextField();
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


        let button = new eui.Button();
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


    }

    private onButtonClick(e: egret.TouchEvent) {
        //var cmd = this.textfield.text + "," + mapManager.getInstance().getMapData()+","+"1;1"+","+ mapManager.getInstance().endPoint; 
             this.startgame();
        //  this.view.initmap( mapManager.getInstance().getMapData(),mapManager.getInstance().endPoint);
        // console.log("=========================================="+mapManager.getInstance().endPoint);  
        //Main.webSocket.writeUTF("creatroom,"+cmd);
       // this.textfield.text = "";
    }

    private onButtonClick1(e: egret.TouchEvent) {
        var cmd = this.textfield.text;   
        Main.webSocket.writeUTF("jionroom,"+cmd);
       // this.textfield.text = "";
    }

    private startgame():void{

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

        this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this)

        // this._timer = new egret.Timer(500);
        // this.addEventListener(egret.TimerEvent.TIMER,this.timeHandle,this)
        this.addEventListener(egret.Event.ENTER_FRAME,this.timeHandle,this)

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchbegin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchmove,this);
    }

    private clickx:number;
    private clicky:number;
    private touchbegin(e: egret.TouchEvent):void{
        this.clickx = e.$stageX;
        this.clicky = e.$stageY;
              this.moveCd =0;
       // console.log(this.clickx,this.clicky);
    }

    private touchmove(e: egret.TouchEvent):void{
        //        console.log("move"+this.clickx,this.clicky);
        if(Math.abs(e.$stageX - this.clickx) > Math.abs(e.$stageY - this.clicky)){
            if(e.$stageX > this.clickx){
        this.fangxiang = 4;
            }else{
        this.fangxiang = 3;
            }
        }else{
            if(e.$stageY > this.clicky){
        this.fangxiang = 2;
            }else{
                this.fangxiang = 1;
            }
        }
                this.clickx = e.$stageX;
        this.clicky = e.$stageY;
    }

    private touchEnd(e:egret.TouchEvent):void{
        // this._timer.stop();
        this.fangxiang = 0;

    }

    private startFarme():void{


    }
    private timeHandle(e:egret.Event):void{
        // console.log(this.fangxiang);
        if(this.moveCd < 0){
            if(this.fangxiang == 1){
                if(this.view.getTargetCanGo(this.curX,this.curY-1))
                    Main.webSocket.writeUTF("week,"+this.roomId+","+ this.curX +","+(this.curY-1));
            }else if(this.fangxiang == 2){
                if(this.view.getTargetCanGo(this.curX,this.curY+1))
                    Main.webSocket.writeUTF("week,"+this.roomId+","+ this.curX +","+(this.curY+1));
            }else if(this.fangxiang == 3){
                if(this.view.getTargetCanGo(this.curX-1,this.curY))
                    Main.webSocket.writeUTF("week,"+this.roomId+","+(this.curX-1)+","+ this.curY)
            }else if(this.fangxiang == 4){
                if(this.view.getTargetCanGo(this.curX+1,this.curY))
                    Main.webSocket.writeUTF("week,"+this.roomId+","+(this.curX+1)+","+ this.curY)
            }
            this.moveCd = 3;
        }
        this.moveCd --;
    }
    // private _timer:egret.Timer;
    private fangxiang:number = 0;
    private moveCd:number;

    private onup(e:egret.TouchEvent):void{
        this.fangxiang = 1;
        this.moveCd =0;
        // this.timeHandle(null);
        // this._timer.start();
    }

    private ondown(e:egret.TouchEvent):void{
        this.fangxiang = 2;
        // this._timer.start();
        // this.timeHandle(null);
              this.moveCd =0;
    }

    private onleft(e:egret.TouchEvent):void{
        this.fangxiang = 3;
        // this._timer.start();
        // this.timeHandle(null);
              this.moveCd =0;
    }

    private onright(e:egret.TouchEvent):void{
        this.fangxiang = 4;
        // this._timer.start();
        // this.timeHandle(null);
              this.moveCd =0;
    }




    private tishitxt:eui.Label;
    private tishi(str:string):void{
        if(this.tishitxt == null){
            this.tishitxt = new eui.Label();
            this.addChild(this.tishitxt);
        }
        this.tishitxt.y = 500;
        this.tishitxt.width = 640;
        this.tishitxt.text = str;
        this.tishitxt.textAlign = "centre";
        var tw = egret.Tween.get( this.tishitxt);
        tw.to( {y:-200}, 600 );
    }




    private curX:number =1;
    private curY:number =1;
    private roomId:string;

    private manList:Array<TestMan>;

    private playerIndex:number; 
    private onmessage(str:string){
        var messageArr:string[] = str.split(",");
    //    console.log(str);
        switch(messageArr[0]){
            case "mapdata":
             console.log(str);
                this.startgame();
                this.roomId = messageArr[1];
                this.view.initmap(messageArr[2],messageArr[4]);
                this.view
                var man:TestMan = new TestMan();
                man.x = this.curX *10;
                man.y = this.curY *10;
                this.addChild(man);
                this.manList.push(man);
                this.playerIndex = 0;
            break;
            case "weekto":
                if(parseInt(messageArr[1]) == this.playerIndex){
                    this.curX = parseInt(messageArr[2]);
                    this.curY = parseInt(messageArr[3]);
                }
                this.manList[parseInt(messageArr[1])].x = parseInt(messageArr[2])*10;
                this.manList[parseInt(messageArr[1])].y = parseInt(messageArr[3])*10;
            break;
            case "selfjoinroomsuccess":
                this.startgame();
                this.roomId = messageArr[1];
                this.view.initmap(messageArr[2],messageArr[5]);
                this.playerIndex = parseInt(messageArr[3]);
                for(var i:number = 0;i<=this.playerIndex;i++){
                    var man:TestMan = new TestMan();
                    man.x = 1 *10;
                    man.y = 1 *10;
                    this.addChild(man);
                    this.manList.push(man);
                }
            break;
            case "otherjoinroomsuccess":
                var man:TestMan = new TestMan();
                man.x = 1 *10;
                man.y = 1 *10;
                this.addChild(man);
                this.manList.push(man);
            break;
            default:
                this.tishi(str);
            break;
        }
    }




    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private removeTargetStage(dis:egret.Sprite):void{
        if(dis){
            if(dis.parent)
                dis.parent.removeChild(dis);
        }
    }

    private textfield: egret.TextField;
    private startAnimation(result: Array<any>): void {


        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }



}
