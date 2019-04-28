(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game/main.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ade315w8BBPa7079JrLDI08', 'main', __filename);
// scripts/game/main.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        // 开启物理碰撞
        cc.director.getCollisionManager().enabled = true;
        // 显示碰撞检测区域
        cc.director.getCollisionManager().enabledDebugDraw = true;
        // 启用物理引擎相关功能  
        cc.director.getPhysicsManager().enabled = true;
        // 开启 debug 绘制
        cc.director.getPhysicsManager().debugDrawFlags = true;
        // 如果希望重力加速度为0, 可以这样设置:
        cc.director.getPhysicsManager().gravity = cc.v2();

        // let physicsManager = cc.director.getPhysicsManager();
        // physicsManager.debugDrawFlags = 
        //     // 0;
        //     // cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit
        //     ;
        //     //开启物理引擎和碰撞绘制
    }
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
        //# sourceMappingURL=main.js.map
        