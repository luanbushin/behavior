class MapItem extends egret.Shape{
	public constructor(num:number) {
		super();
		
		if(num == 0)
			this.graphics.beginFill( 0xFF8C00 );
		else if(num == 1)
			this.graphics.beginFill( 0x8B7D7B );

        this.graphics.drawRect(5,5,10,10);
        this.graphics.endFill();

		this.cacheAsBitmap=true;
	}
}