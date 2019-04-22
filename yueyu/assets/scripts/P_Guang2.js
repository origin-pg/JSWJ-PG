cc.Class({
    extends: cc.Component,

    properties: {
        police: {
            default: null,
            type: cc.Node
        },
    },

    onLoad () {},

    start () {},

    update (dt) {},

    onCollisionEnter(other, self){
        // 照到玩家
        if(other.node.group=="player"){
            this.police.getComponent("Police2").zhuadaole();
        }
    },
});