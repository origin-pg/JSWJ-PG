cc.Class({
    extends: cc.Component,

    properties: {
        police3: {
            default: null,
            type: cc.Node
        },
    },

    onLoad () {},

    start () {},

    update (dt) {},

    onCollisionEnter(other, self){
        // 踩到玩家
        if(other.node.group=="player"){
            this.police3.getComponent("Police3").zhuadaole();
        }
    },
});
