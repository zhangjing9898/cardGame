// 采用单例模式
// 使用这个class的时候，不需要new xxx，而是xxx.instance来获得实例
// 这样可以保证场景管理类有且只有一个实例，便于操作和管理
class SceneManager {
    // 设置所有场景所在的舞台
    private _stage: egret.DisplayObjectContainer;
    // 主场景
    private mainScene: MainScene;
    // 玩家场景
    private playerScene: PlayerScene;

    constructor() {
        this.mainScene = new MainScene;
        this.playerScene = new PlayerScene;
    }

    // 获取实例
    // static修饰的方法都是静态方法，简单来说就是：调用的时候不是通过实例调用，而是直接使用类名调用，xxx(类名).方法名
    static sceneManager: SceneManager;
    static get instance() {
        if (!this.sceneManager) {
            this.sceneManager = new SceneManager();
        }
        return this.sceneManager;
    }

    // 设置根场景
    public setStage(s: egret.DisplayObjectContainer) {
        this._stage = s;
    }

    // 主场景
    static toMainScene() {
        let stage: egret.DisplayObjectContainer = this.instance._stage;
        let mainScene = SceneManager.instance.mainScene;

        // 判断主场景是否有父级
        // 如果有，说明已经被添加到场景中
        if (!mainScene.parent) {
            // 未被添加到场景中
            // 把主场景添加到之前设置好的根舞台中
            stage.addChild(mainScene);
        }
    }
}