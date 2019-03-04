class HeroScene extends eui.Component implements  eui.UIComponent {
	
	public btn_return: eui.Button;
	public btn_select: eui.Button;
	public src_hero: eui.Scroller;
	public list_hero: eui.List;
	
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

		// 原始数据
		let dataArr: any[] = [
			{image: 'resource/art/heros_goods/heros01.png', name: '亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false},
			{image: 'resource/art/heros_goods/heros02.png', name: '亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false},
			{image: 'resource/art/heros_goods/heros03.png', name: '亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: true},
			{image: 'resource/art/heros_goods/heros04.png', name: '亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false},
			{image: 'resource/art/heros_goods/heros05.png', name: '亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false},
			{image: 'resource/art/heros_goods/heros06.png', name: '亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false},
			{image: 'resource/art/heros_goods/heros07.png', name: '亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false}
		];

		// 将其转为eui数组
		let EUIArr: eui.ArrayCollection = new eui.ArrayCollection(dataArr);
		// 把list_hero数据源设置为euiArr
		this.list_hero.dataProvider = EUIArr;
		// 设置list_hero的项呈视器 (这里直接写类名,而不是写实例)
		this.list_hero.itemRenderer = HeroList_item;
	}
	
}