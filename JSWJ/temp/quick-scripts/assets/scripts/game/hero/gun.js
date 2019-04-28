(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game/Hero/gun.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6a043hpIiFEkYkxfvbT7XJ2', 'gun', __filename);
// scripts/game/hero/gun.js

"use strict";

var rocker = require("rocker"); // 将摇杆这个类拿过来用

// *-*-*-*-*-*-*-* 英雄节点 *-*-*-*-*-*-*-*-*

cc.Class({
    extends: cc.Component,

    properties: {
        // 摇杆对象
        rocker: {
            type: rocker,
            default: null
        },

        // 子弹
        bullet_Prefab: {
            default: null,
            type: cc.Prefab
        }
    },

    onLoad: function onLoad() {
        this.Canvas = cc.find("Canvas");
        this.hero = cc.find("Canvas/hero");
        this.arm_len = 50; // 手臂长度
    },
    start: function start() {},
    update: function update(dt) {
        if (this.rocker.dir === -1) {
            return; // 如果摇杆dir为-1 说明摇杆没有触摸
        }
        // 更新枪的角度
        this.rocker_rot = 180 * this.rocker.radius / Math.PI; // 获取摇杆的角度
        this.node.rotation = 90 - this.rocker_rot; // 设置枪的角度

        // 更新枪的位置
        this.update_gun_position();

        // 根据选择改变枪的精灵帧(换枪)
    },


    // 更新枪的位置(设置枪到手上)
    update_gun_position: function update_gun_position() {

        if (this.rocker.dir == 1 || this.rocker.dir == 5) {
            // 上下
            this.arm_len = 40;
            this.revise_x = 0; // 校正枪的位置
            this.revise_y = 0;
        } else if (this.rocker.dir == 2 || this.rocker.dir == 8) {
            // 上左右
            this.arm_len = 65;
            this.revise_x = 0;
            this.revise_y = -5;
        } else if (this.rocker.dir == 4 || this.rocker.dir == 6) {
            // 下左右
            this.arm_len = 60;
            this.revise_x = 0;
            this.revise_y = 30;
        } else {
            // 左右
            this.arm_len = 55;
            this.revise_x = 0;
            this.revise_y = 10;
        }

        // this.arm_len=5;// 手臂长度分解
        this.arm_len_x = this.arm_len * Math.cos(this.rocker.radius);
        this.arm_len_y = this.arm_len * Math.sin(this.rocker.radius);

        // 更新枪的位置
        this.node.x = this.arm_len_x + this.revise_x;
        this.node.y = this.arm_len_y + this.revise_y;
    },


    // 开火
    fire: function fire() {
        // 创建子弹
        var bullet = cc.instantiate(this.bullet_Prefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.Canvas.addChild(bullet);
        // console.log(this.node.parent.position);// 英雄位置
        // console.log(this.node.position);// 枪在父节点的位置
        this.parent_pos = this.node.parent.position;
        // 子弹Canvas坐标的位置
        this.bullet_pos = cc.v2(this.parent_pos.x + this.node.position.x, this.parent_pos.y + this.node.position.y);
        bullet.setPosition(this.bullet_pos);
        // 角度为枪的角度
        bullet.rotation = this.node.rotation;

        // newGuang.getComponent('Guang').game = this;
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
        //# sourceMappingURL=gun.js.map
        