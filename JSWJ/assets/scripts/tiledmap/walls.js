

// *-*-*-*-*-*-*-* tiledmap walls对象层节点 *-*-*-*-*-*-*-*-*

cc.Class({
    extends: cc.Component,

    properties: {
        // 墙类(预制体)
        wall_Prefab: {
            default: null,
            type: cc.Prefab
        },
    },

    onLoad () {
        // console.log(this.node.position);// (0,0)
        this.node.scaleY = -1;// *-!-*-!-*- 对象层在tiledmap中的位置是延Y轴对折 -*-!-*-!-*

        var walls=this.node.getComponent(cc.TiledObjectGroup).getObjects();// 获取对象层的对象数组
        // console.log(walls);

        // 遍历墙对象层的每个墙对象
        for (let i = 0; i < walls.length; i++) {
            // console.log(walls[i]);
            // 创建墙
            var wall = cc.instantiate(this.wall_Prefab);
            // 将新增的节点添加到 Canvas 节点下面
            this.node.addChild(wall);
            wall.anchorX = 0;
            wall.anchorY = 0;
            wall.width=walls[i].width;
            wall.height=walls[i].height;
            wall.setPosition(walls[i].offset.x-1920,walls[i].offset.y-1072);
        }
    },

    start () {},

    update (dt) {},
});
