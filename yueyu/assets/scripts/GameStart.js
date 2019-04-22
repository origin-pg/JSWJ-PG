
cc.Class({
    extends: cc.Component,

    properties: {
    },

    func_start(e){
        // 切换场景
        cc.director.loadScene('game_scenes');
    },

    onLoad () {
        cc.director.preloadScene('game_scenes');// 预加载场景
        cc.sys.localStorage.setItem("cover", 1);
        this.node.on(cc.Node.EventType.TOUCH_START,this.func_start,this); 
    },

    // start () {},
    
    // update (dt) {},
});
