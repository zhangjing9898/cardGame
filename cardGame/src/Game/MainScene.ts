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
	public toggleBtn(btn: eui.ToggleButton | number) {

		// first set all btn to not selected
		if (btn === 0) {
			return;
		}
		for (let i = 0; i < this.Group_mbtn.numChildren; i++) {
			let theBtn = <eui.ToggleButton>this.Group_mbtn.getChildAt(i);
			theBtn.selected = false;
		}
		// 把传进来的btn设置为选中状态
		btn = <eui.ToggleButton>btn;
		btn.selected = true

		// 获取当前点击的按钮的下标, 用来实现不同按钮对应的功能
		// 0 1 2 3 对应 玩家, 英雄, 物品, 关于
		let index = this.Group_mbtn.getChildIndex(<eui.ToggleButton>btn);

		switch(index) {
			case 0:
				SceneManager.toPlayerScene();
				this.setChildIndex(this.Group_mbtn, this.numChildren);
			break;
			case 1:
				SceneManager.toHeroScene();
				this.setChildIndex(this.Group_mbtn, this.numChildren);
			break;
			case 2:
				SceneManager.toGoodsScene();
				this.setChildIndex(this.Group_mbtn, this.numChildren);
			break;
			case 3:
				SceneManager.toAboutScene();
				this.setChildIndex(this.Group_mbtn, this.numChildren);
			break;
			default:
			break;
		}

	}
}