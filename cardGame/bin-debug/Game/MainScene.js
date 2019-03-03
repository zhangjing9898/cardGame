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
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        return _super.call(this) || this;
    }
    MainScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MainScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // 让group可以点击
        this.Group_mbtn.touchEnabled = true;
        // 事件委托，让点击btn的时候可以触发事件
        this.Group_mbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandle, this);
    };
    MainScene.prototype.tapHandle = function (e) {
        var theBtn = e.target;
        // 在点击触发这个事件的时候，点击的那个btn应该变为了选中状态
        // 判断theBtn是否存在theBtn.selected属性 且= true
        if (theBtn.selected && theBtn.selected !== undefined) {
            this.toggleBtn(theBtn);
        }
        else {
            theBtn.selected = true;
        }
    };
    // switch button
    // @param btn 参数是eui.ToggleButton的时候切换按钮, 参数是0的时候设置为全部不选中
    MainScene.prototype.toggleBtn = function (btn) {
        console.log('切换');
        // first set all btn to not selected
        for (var i = 0; i < this.Group_mbtn.numChildren; i++) {
            var theBtn = this.Group_mbtn.getChildAt(i);
            theBtn.selected = false;
        }
        btn.selected = true;
    };
    return MainScene;
}(eui.Component));
__reflect(MainScene.prototype, "MainScene", ["eui.UIComponent", "egret.DisplayObject"]);
