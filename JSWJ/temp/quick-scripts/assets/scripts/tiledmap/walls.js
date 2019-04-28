(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/tiledmap/walls.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '06280xdEBtInbBTrEfVorGk', 'walls', __filename);
// scripts/tiledmap/walls.js

"use strict";

// *-*-*-*-*-*-*-* tiledmap walls对象层节点 *-*-*-*-*-*-*-*-*

cc.Class({
    extends: cc.Component,

    properties: {
        // 墙类(预制体)
        wall_Prefab: {
            default: null,
            type: cc.Prefab
        }
    },

    onLoad: function onLoad() {
        // console.log(this.node.position);// (0,0)
        this.node.scaleY = -1; // *-!-*-!-*- 对象层在tiledmap中的位置是延Y轴对折 -*-!-*-!-*

        var walls = this.node.getComponent(cc.TiledObjectGroup).getObjects(); // 获取对象层的对象数组
        // console.log(walls);

        // 遍历墙对象层的每个墙对象
        for (var i = 0; i < walls.length; i++) {
            // console.log(walls[i]);
            // 创建墙
            var wall = cc.instantiate(this.wall_Prefab);
            // 将新增的节点添加到 Canvas 节点下面
            this.node.addChild(wall);
            wall.anchorX = 0;
            wall.anchorY = 0;
            wall.width = walls[i].width;
            wall.height = walls[i].height;
            wall.setPosition(walls[i].offset.x - 1920, walls[i].offset.y - 1072);
            var boxCollider = wall.getComponent(cc.PhysicsBoxCollider);
            //设置偏移量
            boxCollider.offset.x = wall.width * 0.5;
            boxCollider.offset.y = wall.height * -0.5;
            //设置包围盒范围
            boxCollider.size.width = wall.width;
            boxCollider.size.height = wall.height;
            //重新init一下物理collider
            boxCollider.apply();
        }
    },
    start: function start() {},
    update: function update(dt) {}
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=walls.js.map
        