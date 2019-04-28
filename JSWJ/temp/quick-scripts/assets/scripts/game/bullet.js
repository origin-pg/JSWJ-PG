(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game/bullet.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '02b95FykCpKSKyWd2bPEyXl', 'bullet', __filename);
// scripts/game/bullet.js

"use strict";

// *-*-*-*-*-*-*-* 子弹(预制体)节点 *-*-*-*-*-*-*-*-*

cc.Class({
    extends: cc.Component,

    properties: {
        bullet_range: 500, // 射程
        bullet_speed: 0.2 // 射速
    },

    onLoad: function onLoad() {
        // 根据枪的种类 改变子弹的种类

        this.rocker = cc.find("Canvas/rocker").getComponent("rocker");
        // 射程分解
        this.end_x = this.bullet_range * Math.cos(this.rocker.radius);
        this.end_y = this.bullet_range * Math.sin(this.rocker.radius);
    },
    start: function start() {
        // 子弹轨迹
        var mob = cc.moveBy(this.bullet_speed, this.end_x, this.end_y);
        var call_func = cc.callFunc(function () {
            this.node.destroy();
        }.bind(this));
        this.node.runAction(cc.sequence([mob, call_func]));
    }
}

// update (dt) {},
);

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
        //# sourceMappingURL=bullet.js.map
        