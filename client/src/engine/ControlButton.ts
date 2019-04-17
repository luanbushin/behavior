class ControlButton extends egret.Sprite{
	public constructor() {
		super();
		this.graphics.beginFill( 0xffffff ,0.8);
       // this.graphics.drawRect(-100,-100,200,200);
		this.graphics.drawCircle(-75,-75,75)
        this.graphics.endFill();
	}
}