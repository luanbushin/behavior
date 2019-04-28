
class MapGenerate {

















    public getMapData():string{
		var 	mapStr = "";
		this.creatBaseMap(this._width,this._height);
		for(var  i:number = 0;i < this._width*2+1;i++){
			for(var  j:number = 0;j<this._height*2+1;j++){
				mapStr+=this.maplist[i][j]+";";
			}
			mapStr+="。";
		}
		return mapStr;
	}
	private _width:number = 63;
	private _height:number = 33;

	public maplist:Array<Array<number>>;
	public disposeList:Array<Array<number>>;
	public weekList:Array<Array<number>>;
	public weekNumList:Array<number>;
	private creatBaseMap(w:number,h:number):void{
		this.maplist = new Array<Array<number>>(w*2+1);
		this.disposeList = new Array<Array<number>>(w*2+1);
		this.weekList = new Array<Array<number>>();
		// console.log(this.weekList.length);
		this.weekNumList = new Array<number>();
		for(var i:number = 0;i<w*2+1;i++){
			if(this.maplist[i] == null){
				this.maplist[i] = new Array<number>(h*2+1);
			}
			for(var j:number = 0;j<h*2+1;j++){
				if(i%2 == 1&&j%2==1){
					this.maplist[i][j] = 1;
				}else{
					this.maplist[i][j] = 0;	
				}
			}
		}

		this.randomDirection(1,1);
		// this.gettargetpoint();
	}

	private gettargetpoint(){
		var num1:number = Math.random();
		if(num1<0.25){
			var num2:number = Math.floor(Math.random()*(this._height*2+1));
			this.maplist[0][num2] = 1;
		}else if(num1<0.5){
			var num2:number = Math.floor(Math.random()*(this._height*2+1));
			this.maplist[this._width*2][num2] = 1;
		}else if(num1<0.75){
			var num2:number = Math.floor(Math.random()*(this._width*2+1));
			this.maplist[num2][0] = 1;
		}else {
			var num2:number = Math.floor(Math.random()*(this._width*2+1));
			this.maplist[num2][this._height*2] = 1;
		}

	}

	private thewayweeknum:number = 0;

	private maxweeknum:number = 0;
	public endPoint:string  = "";
	private randomDirection(x:number,y:number):void{
		var maybeList:Array<Array<number>> = this.maybeGoList(x,y);
		if(maybeList.length>0){
			this.thewayweeknum++;

			var random:number = Math.floor(Math.random()*maybeList.length);
			var toarr:Array<number> = maybeList[random];
			var tox:number = (toarr[0] - x)/2 + x;
			var toy:number = (toarr[1] - y)/2 + y;
			this.maplist[tox][toy] = 1;
			// 		console.log(toarr);
			// console.log(this.disposeList);
			if(this.disposeList[toarr[0]] == null){
				this.disposeList[toarr[0]] = new Array<number>(this._height*2+1);
			}
			this.disposeList[toarr[0]][toarr[1]] = 1;
			if(maybeList.length>1){
				this.weekList.push(toarr);
				this.weekNumList.push(this.thewayweeknum);
			}
			// console.log("走过"+ this.weekList.length);
			this.randomDirection(toarr[0],toarr[1]);
		}else{
			if(this.thewayweeknum > this.maxweeknum){
				this.maxweeknum = this.thewayweeknum;
				this.endPoint = x+";"+y;
			}
			// console.log("一条路走到头 ，查看之前的岔道,这条路走了"+ this.thewayweeknum);
			for(var i = this.weekList.length-1;i>=0;i--){
				if(this.maybeGoList(this.weekList[i][0],this.weekList[i][1]).length>0){
					var wx:number = this.weekList[i][0];
					var wy:number = this.weekList[i][1];
					this.thewayweeknum =this.weekNumList[i];

					if(this.maybeGoList(this.weekList[i][0],this.weekList[i][1]).length==1){
						this.weekList.splice(i,1);
						this.weekNumList.splice(i,1);
					}

					this.randomDirection(wx,wy);
					return;
				}
			}
			//console.log("完成");
		}
	}
	private maybeGoList(x:number,y:number):Array<Array<number>>{
		var maybeList:Array<Array<number>> = new Array<Array<number>>();
		if(x - 2 > 0){
			if(!this.disposeList[x-2]||!this.disposeList[x-2][y])
				maybeList.push(new Array<number>(x-2,y));
		}
		if(x + 2 < this._width*2+1){
			// console.log(this.disposeList[x+2]);
			
			if(!this.disposeList[x+2]||!this.disposeList[x+2][y])
				maybeList.push(new Array<number>(x+2,y));
		}
		if(y- 2 > 0){
			if(!this.disposeList[x]||!this.disposeList[x][y-2])
				maybeList.push(new Array<number>(x,y-2));
		}
		if(y + 2 < this._height*2+1){
			if(!this.disposeList[x]||!this.disposeList[x][y+2])
				maybeList.push(new Array<number>(x,y+2));
		}
		return maybeList;
	}

	private static _instance:MapGenerate
	public static get instance():MapGenerate{
		if(this._instance == null)
			this._instance = new MapGenerate;
		return this._instance;
	}

}