class mapManager {
	public creatMap(){
		this.creatBaseMap(this._width,this._height);
	}
	private _width:number = 47;
	private _height:number = 26;

	public maplist:Array<Array<number>>;
	public disposeList:Array<Array<number>>;
	public weekList:Array<Array<number>>;
	private creatBaseMap(w:number,h:number):void{
		this.maplist = new Array<Array<number>>(w*2+1);
		this.disposeList = new Array<Array<number>>(w*2+1);
		this.weekList = new Array<Array<number>>();
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
		this.gettargetpoint();
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

	private randomDirection(x:number,y:number):void{
		var maybeList:Array<Array<number>> = this.maybeGoList(x,y);
		if(maybeList.length>0){
			var random:number = Math.floor(Math.random()*maybeList.length);
			var toarr:Array<number> = maybeList[random];
			var tox:number = (toarr[0] - x)/2 + x;
			var toy:number = (toarr[1] - y)/2 + y;
			this.maplist[tox][toy] = 1;
			if(this.disposeList[toarr[0]] == null){
				this.disposeList[toarr[0]] = new Array<number>(this._height*2+1);
			}
			this.disposeList[toarr[0]][toarr[1]] = 1;
			this.weekList.push(toarr);
			//console.log("走过"+ this.weekList.length);

			this.randomDirection(toarr[0],toarr[1]);
		}else{
			//console.log("一条路走到头 ，查看之前的岔道"+ this.weekList.length);
			for(var i = this.weekList.length-1;i>=0;i--){
				if(this.maybeGoList(this.weekList[i][0],this.weekList[i][1]).length>0){
					this.randomDirection(this.weekList[i][0],this.weekList[i][1]);
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


















	private static instance:mapManager
	public static getInstance():mapManager{
		if(this.instance == null)
			this.instance = new mapManager;
		return this.instance;
	}
	public constructor() {
	}
}