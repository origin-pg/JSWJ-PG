

cc.Class({
    extends: cc.Component,

    properties: {
        Sprite:{// 编辑器绑定(在编辑器上拖动绑定)
            default: null,
            type: cc.Sprite,
        },

        action_time:3,
    },
    onLoad () {
        this.now_time=1;// 从1减少
        this.a=1;
    },

    delete_myself(){
        this.node.destroy();
    },

    start () {},

    update (dt) {
        this.now_time+=dt*1.1;
        var percent=1-this.now_time/this.action_time;// 时间百分比
        if(percent<0.5 && this.a==1){
            this.donghua();
        }
        if(percent<0){
            this.game.biesile();
            this.delete_myself();
            this.getComponent(cc.Animation).stop("O2");// 停止动画
            // percent=1;// 小于0重新开始
        }
        this.Sprite.fillRange=percent;
    },

    donghua(){
        this.a=2;
        this.getComponent(cc.Animation).play("O2");// 播放动画

        // 颜色变化到
        var tTo=cc.tintTo(5,255,55,55);
        this.node.getChildByName("bark").runAction(tTo);
    },
});
