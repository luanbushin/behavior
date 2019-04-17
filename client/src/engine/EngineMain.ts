class EngineMain extends egret.Sprite{

	public constructor() {
		super();



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

	public getTargetCanGo(x:number,y:number):boolean{
		if(this.maplist[x][y] == 1){
			return true;
		}
		return false;
	}

	private maplist:Array<Array<number>>;
	public initmap(str:string):void{
		var arr:Array<string> = str.split("。");
		//console.log("收到数据：" +str + ""+ arr.length);
		this.maplist= new Array<Array<number>>(arr.length -1);;
		var maplist:Array<Array<number>>  = this.maplist;
		for(var i:number = 0;i<arr.length -1;i++){
			var arr1:Array<string> = arr[i].split(";");
			if(maplist[i] == null){
				maplist[i] = new Array<number>(arr1.length-1);
			}
			for(var j:number = 0;j<arr1.length-1;j++){
				maplist[i][j] = parseInt(arr1[j]);
			}
		}

		var item:MapItem;
		for(var i:number = 0;i<maplist.length;i++){

			for(var j:number = 0;j<maplist[i].length;j++){
				item = new MapItem(maplist[i][j]);
				item.x = 10*i;
				item.y = 10*j;
				this.addChild(item);
			}
		}
	}
}