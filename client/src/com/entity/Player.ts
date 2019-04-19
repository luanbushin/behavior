class Player extends egret.Sprite{

	private bitmap:egret.Bitmap;
	public constructor() {
		super();

		this.bitmap=new egret.Bitmap();
		this.addChild(this.bitmap);

		this.bitmap.texture=RES.getRes("player_png");
		this.bitmap.width=10;
		this.bitmap.height=10;
	}
}