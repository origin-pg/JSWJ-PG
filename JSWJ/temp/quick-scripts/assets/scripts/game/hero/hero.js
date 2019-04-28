(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game/Hero/hero.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ee0faJRXXdCErkIJk4e+6tW', 'hero', __filename);
// scripts/game/Hero/hero.js

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

        // -> 主摄像机 <-
        mainCamera: {
            default: null,
            type: cc.Node
        },

        hero_speed: 300 // 英雄速度
    },

    // *-*-*-*-*-*-*-*-* onLoad() *-*-*-*-*-*-*-*-*
    onLoad: function onLoad() {
        // FIXED_UPDATE
        this.NOW_FIXED_TIME = 0; // 当前过去时间为0
        this.FIXED_TIME = 0.03; // 固定每隔0.03s调用一次fixed_update函数

        // 变量初始化
        this.hero = this.node;
        this.tiledmap = cc.find("Canvas/tiledmap");

        //获取刚体避免update多次索引
        this.body = this.getComponent(cc.RigidBody);

        this.win_size = cc.winSize;
        this.win_size_xMax = this.win_size.width / 2;
        this.win_size_yMax = this.win_size.height / 2;
    },


    // *-*-*-*-*-*-*-* start()  *-*-*-*-*-*-*-*-*-*
    start: function start() {
        // console.log(this.tiledmap.getBoundingBox());
    },


    // *-*-*-*-*-*-*-* update(dt) *-*-*-*-*-*-*-*-*
    /*
    // 自己加的机制
    // FPS不是完全固定的，是参考值，会根据CPU上下浮动，维持在一个水平范围内
    // dt 会小范围上下浮动
    // update 要求时间是固定的 否为影响相对位置
    // FlxedUpdate 固定时间间隔
    */
    update: function update(dt) {
        this.NOW_FIXED_TIME += dt;
        while (this.NOW_FIXED_TIME > this.FIXED_TIME) {
            this.FIXED_update(this.FIXED_TIME);
            this.NOW_FIXED_TIME -= this.FIXED_TIME;
        } // 来固定时间dt
    },
    FIXED_update: function FIXED_update(dt) {
        if (this.rocker.dir === -1) {
            //刚体通过线速度移动，不考虑惯性
            this.body.linearVelocity = cc.v2(0, 0);;
            return; // 如果摇杆dir为-1 说明摇杆没有触摸
        }
        this.tiledmap_Rect = this.tiledmap.getBoundingBox(); // 地图区域
        this.hero_Rect = this.hero.getBoundingBox(); // 人物区域

        /** 
         * @description 限制人物不出范围(地图)
        */
        {
            if (this.hero_Rect.xMin < this.tiledmap_Rect.xMin) {
                this.hero.x = this.tiledmap_Rect.xMin + this.hero_Rect.width / 2;
            }
            if (this.hero_Rect.xMax > this.tiledmap_Rect.xMax) {
                this.hero.x = this.tiledmap_Rect.xMax - this.hero_Rect.width / 2;;
            }
            if (this.hero_Rect.yMin < this.tiledmap_Rect.yMin) {
                this.hero.y = this.tiledmap_Rect.yMin + this.hero_Rect.height / 2;;
            }
            if (this.hero_Rect.yMax > this.tiledmap_Rect.yMax) {
                this.hero.y = this.tiledmap_Rect.yMax - this.hero_Rect.height / 2;;
            }
        }

        // 更新英雄的角度
        // this.hero_rot = 180 * this.rocker.radius / Math.PI;//转换为角度值
        // this.node.rotation = 90 - this.hero_rot;

        /**
         * @description 移动
         */
        this.s = this.hero_speed * dt; // 路程分解
        this.s_x = this.s * Math.cos(this.rocker.radius); // x轴移动量
        this.s_y = this.s * Math.sin(this.rocker.radius); // y轴移动量

        // 英雄正向移动
        //this.node.x+=this.s_x;
        //this.node.y+=this.s_y;
        // 地图反方向移动
        // this.tiledmap.x-=this.s_x;
        // this.tiledmap.y-=this.s_y;

        // -> 主摄像机跟随主角移动 <-
        // this.mainCamera.x = this.node.x;
        // this.mainCamera.y = this.node.y;

        // 刚体线性移动
        var vector = cc.v2(this.s_x * 50, this.s_y * 50);
        this.body.linearVelocity = vector;

        // this.map_move=cc.v2( this.tiledmap.x , this.tiledmap.y );// 地图移动量
        this.hero_dtPoint = this.hero.position; // 人物偏移中心量(的位置)
        // this.hero_ToCenter_len=this.hero_dtPoint.mag();// 返回该向量的长度

        /** 
         * @description 边界滚屏(自己的方法)
        */
        if (this.s_x < 0) {
            // 左移
            if (this.tiledmap_Rect.xMin + this.win_size_xMax >= this.node.x) {
                this.node.x += this.s_x;
            } else if (this.node.x >= this.tiledmap_Rect.xMax - this.win_size_xMax) {
                this.node.x += this.s_x;
            } else {
                this.node.x += this.s_x;
                this.mainCamera.x = this.node.x;
            }
        } else {
            // 右移
            if (this.tiledmap_Rect.xMax - this.win_size_xMax <= this.node.x) {
                this.node.x += this.s_x;
            } else if (this.node.x <= this.tiledmap_Rect.xMin + this.win_size_xMax) {
                this.node.x += this.s_x;
            } else {
                this.node.x += this.s_x;
                this.mainCamera.x = this.node.x;
            }
        }
        if (this.s_y < 0) {
            // 下移
            if (this.tiledmap_Rect.yMin + this.win_size_yMax >= this.node.y) {
                this.node.y += this.s_y;
            } else if (this.node.y >= this.tiledmap_Rect.yMax - this.win_size_yMax) {
                this.node.y += this.s_y;
            } else {
                this.node.y += this.s_y;
                this.mainCamera.y = this.node.y;
            }
        } else {
            // 上移
            if (this.tiledmap_Rect.yMax - this.win_size_yMax <= this.node.y) {
                this.node.y += this.s_y;
            } else if (this.node.y <= this.tiledmap_Rect.yMin + this.win_size_yMax) {
                this.node.y += this.s_y;
            } else {
                this.node.y += this.s_y;
                this.mainCamera.y = this.node.y;
            }
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
        //# sourceMappingURL=hero.js.map
        