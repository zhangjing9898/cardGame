class MainScene extends eui.Component implements  eui.UIComponent {
	
	public Group_mbtn: eui.Group;
	public mbthPLayer: eui.ToggleButton;
	public mbtnHero: eui.ToggleButton;
	public mbtnGoods: eui.ToggleButton;
	public mbtnAbout: eui.ToggleButton;
	
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();

		// 让group可以点击
		this.Group_mbtn.touchEnabled = true;

		// 事件委托，让点击btn的时候可以触发事件
		this.Group_mbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandle, this);
	}

	private tapHandle(e:egret.Event) {
		let theBtn = <eui.ToggleButton>e.target
		// 在点击触发这个事件的时候，点击的那个btn应该变为了选中状态
		// 判断theBtn是否存在theBtn.selected属性 且= true
		if (theBtn.selected && theBtn.selected !== undefined) {
			this.toggleBtn(theBtn);
		} else {
			theBtn.selected = true;
		}
	}
	
	// switch button
	// @param btn 参数是eui.ToggleButton的时候切换按钮, 参数是0的时候设置为全部不选中
	public toggleBtn(btn: eui.ToggleButton) {
		console.log('切换')

		// first set all btn to not selected
		for (let i = 0; i < this.Group_mbtn.numChildren; i++) {
			let theBtn = <eui.ToggleButton>this.Group_mbtn.getChildAt(i);
			theBtn.selected = false;
		}
		btn.selected = true
	}
}