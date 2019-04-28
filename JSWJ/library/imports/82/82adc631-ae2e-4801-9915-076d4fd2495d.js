"use strict";
cc._RF.push(module, '82adcYxri5IAZkVB21P0kld', 'rocker');
// scripts/game/rocker.js

"use strict";

// *-*-*-*-*-*-*-* 摇杆 *-*-*-*-*-*-*-*-*

cc.Class({
    extends: cc.Component,

    properties: {
        // 摇杆把
        rocker_bar: {
            type: cc.Node,
            default: null
        },
        max_r: 120, // 摇杆最大偏移量
        min_r: 0 // 摇杆最小偏移量
    },

    onLoad: function onLoad() {
        this.dir = -1; // 默认为1
        this.radius = 0; // 角度为0

        // event 当手指在屏幕上移动时
        this.rocker_bar.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            var touch_pos = e.getLocation(); // 触摸点坐标
            var pos = this.node.convertToNodeSpaceAR(touch_pos); // 触摸点坐标转化局部坐标
            var len = pos.mag(); // 返回该向量的长度

            // 如果触摸点到原点的距离大于最大偏移量(限制摇杆按钮范围)
            if (len > this.max_r) {
                pos.x = pos.x * this.max_r / len;
                pos.y = pos.y * this.max_r / len;
            }
            this.rocker_bar.setPosition(pos);
            // 如果触摸点到原点的距离小于最小偏移量(不作处理)
            if (len < this.min_r) {
                return;
            }

            /*
            x=Math.atan2(1,1);//返回从x轴到点(x,y)的弧度(介于 -PI 与 PI 弧度之间
            x=180*x/Math.PI;//转换为角度值
            trace(x);//输出:45
            */

            this.dir = -1;
            var r = Math.atan2(pos.y, pos.x); // 返回从x轴到点(x,y)的角度(介于 -PI 与 PI 弧度之间)
            // console.log(r);// -π ~ π

            // 打印测试(方向判断)
            if (r >= -8 * Math.PI / 8 && r < -7 * Math.PI / 8) {
                this.dir = 7;
                r = -8 * Math.PI / 8; // 限制只能8个方向
            } else if (r >= -7 * Math.PI / 8 && r < -5 * Math.PI / 8) {
                this.dir = 6;
                r = -6 * Math.PI / 8;
            } else if (r >= -5 * Math.PI / 8 && r < -3 * Math.PI / 8) {
                this.dir = 5;
                r = -4 * Math.PI / 8;
            } else if (r >= -3 * Math.PI / 8 && r < -1 * Math.PI / 8) {
                this.dir = 4;
                r = -2 * Math.PI / 8;
            } else if (r >= -1 * Math.PI / 8 && r < 1 * Math.PI / 8) {
                this.dir = 3;
                r = 0 * Math.PI / 8;
            } else if (r >= 1 * Math.PI / 8 && r < 3 * Math.PI / 8) {
                this.dir = 2;
                r = 2 * Math.PI / 8;
            } else if (r >= 3 * Math.PI / 8 && r < 5 * Math.PI / 8) {
                this.dir = 1;
                r = 4 * Math.PI / 8;
            } else if (r >= 5 * Math.PI / 8 && r < 7 * Math.PI / 8) {
                this.dir = 8;
                r = 6 * Math.PI / 8;
            } else if (r >= 7 * Math.PI / 8 && r <= 8 * Math.PI / 8) {
                this.dir = 7;
                r = -8 * Math.PI / 8;
            }

            this.radius = r; // 摇杆当前的弧度
            // console.log(this.radius);
        }.bind(this), this);

        // 停止触摸 初始摇杆位置
        this.rocker_bar.on(cc.Node.EventType.TOUCH_END, function (e) {
            this.rocker_bar.setPosition(cc.v2(0, 0));
            this.dir = -1;
        }.bind(this), this);

        this.rocker_bar.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            this.rocker_bar.setPosition(cc.v2(0, 0));
            this.dir = -1;
        }.bind(this), this);
    },
    start: function start() {},
    update: function update(dt) {}
});

cc._RF.pop();