class MapItem extends egret.Sprite{

	private bitmap:egret.Bitmap;

	public constructor(num:number) {
		super();

		this.bitmap=new egret.Bitmap();
		this.bitmap.x=5;
		this.bitmap.y=5;
		this.addChild(this.bitmap);
		
		this.type = num;

		if(num == 0){
			this.bitmap.texture=RES.getRes("MapItemBg_png");
		}else if(num == 9){
			// console.log("终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点");
			this.bitmap.texture=RES.getRes("end_png");
		}
		else{
			this.bitmap.texture=null;

		}
		this.bitmap.width=10;
		this.bitmap.height=10;


		// this.cacheAsBitmap=true;
	}

	private type:number;

	public removeRoute():void{
		this.bitmap.x = 5;
		this.bitmap.y = 5;
		this.bitmap.width=10;
		this.bitmap.height=10;
		if(this.type == 0){
			this.bitmap.texture=RES.getRes("MapItemBg_png");
		}else if(this.type == 9){
			// console.log("终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点终点");
			this.bitmap.texture=RES.getRes("end_png");
		}
		else{
			this.bitmap.texture=null;
		}
	}

	public setRoute():void{
		this.bitmap.texture=RES.getRes("route_png");
		this.bitmap.x = 6;
		this.bitmap.y = 6;
		this.bitmap.width=8;
		this.bitmap.height=8;
	}
	public setRouteing():void{
		this.bitmap.texture=RES.getRes("red_png");
	}
}