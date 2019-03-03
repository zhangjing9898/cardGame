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
    };
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
