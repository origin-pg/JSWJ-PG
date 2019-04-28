"use strict";
cc._RF.push(module, '295e0xDVptBLKC/azf6GQHC', 'attack');
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