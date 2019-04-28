(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game/Hero/clothes.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '983fcdzb8lBaZyXEI4RgqM+', 'clothes', __filename);
// scripts/game/hero/clothes.js

"use strict";

var rocker = require("rocker"); // 将摇杆这个类拿过来用

// *-*-*-*-*-*-*-* 皮肤节点 *-*-*-*-*-*-*-*-*

cc.Class({
    extends: cc.Component,

    properties: {
        // 摇杆对象
        rocker: {
            type: rocker,
            default: null
        }
    },

    onLoad: function onLoad() {
        this.hero_spriteFrame = this.node.getComponent(cc.Sprite);
    },
    start: function start() {},
    update: function update(dt) {
        if (this.rocker.dir === -1) {
            return; // 如果摇杆dir为-1 说明摇杆没有触摸
        }
        this.num = this.rocker.dir; // 获取摇杆角度
        this.str = 'game/3-clothes/s1/s' + this.num; // 拼接字符串
        // 本地加载图片
        cc.loader.loadRes(this.str, cc.SpriteFrame, function (err, url) {
            this.hero_spriteFrame.spriteFrame = url; // 切换精灵帧
        }.bind(this));
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
        //# sourceMappingURL=clothes.js.map
        