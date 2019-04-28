"use strict";
cc._RF.push(module, '3c389tNd2dKDq2CVXnGBjcK', 'game');
// scripts/game/game.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        // cc.director.getCollisionManager().enabled=true; // 开启碰撞检测
        // cc.director.getCollisionManager().enabledDebugDraw=true; // 显示碰撞检测区域

        this.tiledmap = cc.find("Canvas/tiledmap");
        // 地图数据
        // console.log(this.tiledmap.position);// (0,0)
        // console.log(this.tiledmap.width);
        // console.log(this.tiledmap.height);
    },
    start: function start() {},
    update: function update(dt) {}
});

cc._RF.pop();