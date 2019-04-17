class TestMan extends egret.Sprite{
	public constructor() {
		super();
		this.graphics.beginFill( 0xff0000 ,0.8);
        // this.graphics.drawRect(-5,-5,200,200);
		this.graphics.drawCircle(5,5,5)
        this.graphics.endFill();
	}
}