var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var HeroList_item = (function (_super) {
    __extends(HeroList_item, _super);
    function HeroList_item() {
        var _this = _super.call(this) || this;
        // 把这个类和皮肤，联系起来
        _this.skinName = 'resource/skins/skins_item/heroListItem.exml';
        // 组件创建完成的时候toggle
        _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.onComplete, _this);
        return _this;
    }
    HeroList_item.prototype.onComplete = function () {
        this.ce_select.addEventListener(eui.UIEvent.CHANGE, this.change, this);
    };
    HeroList_item.prototype.change = function (e) {
        this.data.isSelected = this.ce_select.selected;
    };
    // 当数据改变的时候，更新视图
    HeroList_item.prototype.dataChanged = function () {
        // isSeleted 是我们提供数据的某个字段
        this.ce_select.selected = this.data.isSelected;
    };
    return HeroList_item;
}(eui.ItemRenderer));
__reflect(HeroList_item.prototype, "HeroList_item");
