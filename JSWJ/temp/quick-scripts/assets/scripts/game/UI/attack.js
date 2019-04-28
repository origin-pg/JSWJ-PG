(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game/UI/attack.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '295e0xDVptBLKC/azf6GQHC', 'attack', __filename);
// scripts/game/UI/attack.js

"use strict";

// *-*-*-*-*-*-*-* 射击按钮 *-*-*-*-*-*-*-*-*

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        this.gun = cc.find("Canvas/hero/gun").getComponent("gun");
        this.fire = false;

        this.node.on(cc.Node.EventType.TOUCH_START, this.fire_start, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.fire_start, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.fire_end, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.fire_end, this);
    },
    fire_start: function fire_start() {
        this.fire = true;
    },
    fire_end: function fire_end() {
        this.fire = false;
    },


    // start () {},

    update: function update(dt) {
        if (this.fire == true) {
            this.gun.fire();
        }
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
        //# sourceMappingURL=attack.js.map
        