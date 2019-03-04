// 采用单例模式
// 使用这个class的时候，不需要new xxx，而是xxx.instance来获得实例
// 这样可以保证场景管理类有且只有一个实例，便于操作和管理
class SceneManager {
    // 设置所有场景所在的舞台
    private _stage: egret.DisplayObjectContainer;
    // 主场景
    public mainScene: MainScene;
    // 玩家场景
    public playerScene: PlayerScene;
    public heroScene: HeroScene;
    public goodsScene: GoodsScene;
    public aboutScene: AboutScene;

    constructor() {
        this.mainScene = new MainScene();
        this.playerScene = new PlayerScene();
        this.heroScene = new HeroScene();
        this.goodsScene = new GoodsScene();
        this.aboutScene = new AboutScene();
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

    // 删除多余的场景
    private removeOther(scene) {
        let arr = [this.playerScene, this.heroScene];
        arr.forEach((item)=> {
            if(scene === item) {
                return;
            } else if(item.parent) {
                this.mainScene.removeChild(item);
            }
        })
    }

    static showInfo(arr: string[], time: number) {
        let text: string = '您选择了：';
        if (arr.length === 0) {
            text = '什么都没选~';
        } else {
            text +=arr.toString();
        }

        let img: egret.Bitmap = new egret.Bitmap();
        img.texture = RES.getRes('toast-bg_png');
        SceneManager.instance.mainScene.addChild(img);
        img.x = SceneManager.instance.mainScene.width / 2 - img.width / 2;
        img.y = 500;
        img.height = 40;

        let label: egret.TextField = new egret.TextField();
        label.text = text;
        label.size = 20;
        SceneManager.instance.mainScene.addChild(label);
        label.x = SceneManager.instance.mainScene.width / 2 - label.width / 2;
        label.y = 510;
        label.height = 40;

        let timer: egret.Timer = new egret.Timer(time, 1);
        timer.start();
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,(e)=>{
            SceneManager.instance.mainScene.removeChild(label);
            SceneManager.instance.mainScene.removeChild(img);
        }, this);
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

        SceneManager.instance.removeOther(SceneManager.instance.mainScene);
    }

    // 玩家场景
    static toPlayerScene() {
        this.instance.removeOther(this.instance.playerScene);
        // 把玩家场景添加到主场景
        this.instance.mainScene.addChild(this.instance.playerScene);
    }

    // 英雄场景
    static toHeroScene() {
        this.instance.removeOther(this.instance.heroScene);
        this.instance.mainScene.addChild(this.instance.heroScene);
    }

    static toGoodsScene() {
        this.instance.removeOther(this.instance.goodsScene);
        this.instance.mainScene.addChild(this.instance.goodsScene);
    }

    static toAboutScene() {
        this.instance.removeOther(this.instance.aboutScene);
        this.instance.mainScene.addChild(this.instance.aboutScene);
    }
}