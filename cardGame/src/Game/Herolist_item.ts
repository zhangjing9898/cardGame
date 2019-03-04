class HeroList_item extends eui.ItemRenderer {
    // 选择框
    public ce_select: eui.CheckBox;

    public constructor() {
        super();
        // 把这个类和皮肤，联系起来
        this.skinName = 'resource/skins/skins_item/heroListItem.exml';
    }
    // 当数据改变的时候，更新视图
    protected dataChanged() {
        // isSeleted 是我们提供数据的某个字段
        this.ce_select.selected = this.data.isSelected;
    }
}