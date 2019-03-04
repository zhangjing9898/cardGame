var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 采用单例模式
// 使用这个class的时候，不需要new xxx，而是xxx.instance来获得实例
// 这样可以保证场景管理类有且只有一个实例，便于操作和管理
var SceneManager = (function () {
    function SceneManager() {
        this.mainScene = new MainScene;
        this.playerScene = new PlayerScene;
        this.heroScene = new HeroScene;
    }
    Object.defineProperty(SceneManager, "instance", {
        get: function () {
            if (!this.sceneManager) {
                this.sceneManager = new SceneManager();
            }
            return this.sceneManager;
        },
        enumerable: true,
        configurable: true
    });
    // 设置根场景
    SceneManager.prototype.setStage = function (s) {
        this._stage = s;
    };
    // 删除多余的场景
    SceneManager.prototype.removeOther = function (scene) {
        var _this = this;
        var arr = [this.playerScene, this.heroScene];
        arr.forEach(function (item) {
            if (scene === item) {
                return;
            }
            else if (item.parent) {
                _this.mainScene.removeChild(item);
            }
        });
    };
    SceneManager.showInfo = function (arr, time) {
        var text = '您选择了：';
        if (arr.length === 0) {
            text = '什么都没选~';
        }
        else {
            text += arr.toString();
        }
        var img = new egret.Bitmap();
        img.texture = RES.getRes('toast-bg_png');
        SceneManager.instance.mainScene.addChild(img);
        img.x = SceneManager.instance.mainScene.width / 2 - img.width / 2;
        img.y = 500;
        img.height = 40;
        var label = new egret.TextField();
        label.text = text;
        label.size = 20;
        SceneManager.instance.mainScene.addChild(label);
        label.x = SceneManager.instance.mainScene.width / 2 - label.width / 2;
        label.y = 510;
        label.height = 40;
        var timer = new egret.Timer(time, 1);
        timer.start();
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (e) {
            SceneManager.instance.mainScene.removeChild(label);
            SceneManager.instance.mainScene.removeChild(img);
        }, this);
    };
    // 主场景
    SceneManager.toMainScene = function () {
        var stage = this.instance._stage;
        var mainScene = SceneManager.instance.mainScene;
        // 判断主场景是否有父级
        // 如果有，说明已经被添加到场景中
        if (!mainScene.parent) {
            // 未被添加到场景中
            // 把主场景添加到之前设置好的根舞台中
            stage.addChild(mainScene);
        }
        SceneManager.instance.removeOther(SceneManager.instance.mainScene);
    };
    // 玩家场景
    SceneManager.toPlayerScene = function () {
        this.instance.removeOther(this.instance.playerScene);
        // 把玩家场景添加到主场景
        this.instance.mainScene.addChild(this.instance.playerScene);
    };
    // 英雄场景
    SceneManager.toHeroScene = function () {
        this.instance.removeOther(this.instance.heroScene);
        this.instance.mainScene.addChild(this.instance.heroScene);
    };
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
