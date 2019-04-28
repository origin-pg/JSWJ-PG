

// *-*-*-*-*-*-*-* 射击按钮 *-*-*-*-*-*-*-*-*

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.gun = cc.find("Canvas/hero/gun").getComponent("gun");
        this.fire=false;

        this.node.on(cc.Node.EventType.TOUCH_START,this.fire_start,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.fire_start,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.fire_end,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.fire_end,this);
    },

    fire_start(){
        this.fire=true;
    },
    fire_end(){
        this.fire=false;
    },

    // start () {},

    update (dt) {
        if (this.fire == true) {
            this.gun.fire();
        }
    },
});
