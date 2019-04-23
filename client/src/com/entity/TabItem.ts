class TabItem extends egret.Sprite{

	private bitmap:egret.Bitmap;
	public constructor() {
		super();

		this.bitmap=new egret.Bitmap();
		this.addChild(this.bitmap);

		this.bitmap.texture=RES.getRes("player_png");
		this.bitmap.width=15;
		this.bitmap.height=15;
	}

	public choose(bool):void{
		if(bool){
			this.bitmap.texture=RES.getRes("end_png");
		}else{
			this.bitmap.texture=RES.getRes("player_png");
		}
	}
}