
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        // cc.director.getCollisionManager().enabled=true; // 开启碰撞检测
        // cc.director.getCollisionManager().enabledDebugDraw=true; // 显示碰撞检测区域

        this.tiledmap=cc.find("Canvas/tiledmap");
        // 地图数据
        // console.log(this.tiledmap.position);// (0,0)
        // console.log(this.tiledmap.width);
        // console.log(this.tiledmap.height);
    },

    start () {},

    update (dt) {},
});