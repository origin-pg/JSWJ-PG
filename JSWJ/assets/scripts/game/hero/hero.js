var rocker = require("rocker");// 将摇杆这个类拿过来用

// *-*-*-*-*-*-*-* 英雄节点 *-*-*-*-*-*-*-*-*

cc.Class({
    extends: cc.Component,

    properties: {
        // 摇杆对象
        rocker:{
            type: rocker,
            default: null,
        },

        hero_speed:300,// 英雄速度
    },

    // *-*-*-*-*-*-*-*-* onLoad() *-*-*-*-*-*-*-*-*
    onLoad () {
        this.NOW_FIXED_TIME=0;// 当前过去时间为0
        this.FIXED_TIME=0.03;// 固定每隔0.03s调用一次fixed_update函数

        // 变量初始化
        this.hero=this.node;
        this.tiledmap=cc.find("Canvas/tiledmap");
        this.tiledmap_x=this.tiledmap.x;
        this.tiledmap_y=this.tiledmap.y;
        this.tiledmap_width=this.tiledmap.width;
        this.tiledmap_height=this.tiledmap.height;

        this.win_size = cc.director.getWinSize();
    },
    
    // *-*-*-*-*-*-*-* start()  *-*-*-*-*-*-*-*-*-*
    start () {
        console.log(this.tiledmap.getBoundingBox());
        // console.log(this.node.getBoundingBox());
    },

    // *-*-*-*-*-*-*-* update(dt) *-*-*-*-*-*-*-*-*
    /*
    // 自己加的机制
    // FPS不是完全固定的，是参考值，会根据CPU上下浮动，维持在一个水平范围内
    // dt 会小范围上下浮动
    // update 要求时间是固定的 否为影响相对位置
    // FlxedUpdate 固定时间间隔
    */
    update (dt) {
        this.NOW_FIXED_TIME+=dt;
        while(this.NOW_FIXED_TIME > this.FIXED_TIME){
            this.FIXED_update(this.FIXED_TIME);
            this.NOW_FIXED_TIME-=this.FIXED_TIME;
        }// 来固定时间dt
    },
    FIXED_update(dt){
        if(this.rocker.dir===-1){
            return;// 如果摇杆dir为-1 说明摇杆没有触摸
        }

        /**
         * @description 地图反方向运动
         */
        this.s=this.hero_speed*dt;// 路程分解
        this.s_x=this.s*Math.cos(this.rocker.radius);
        this.s_y=this.s*Math.sin(this.rocker.radius);

        // 更新英雄的位置
        // this.camera.position=this.hero.position;
        // this.node.x+=this.s_x;
        // this.node.y+=this.s_y;
        // 地图反方向移动
        this.tiledmap.x-=this.s_x;
        this.tiledmap.y-=this.s_y;
        // 更新英雄的角度
        // this.hero_rot = 180 * this.rocker.radius / Math.PI;//转换为角度值
        // this.node.rotation = 90 - this.hero_rot;

        /** 
         * @description 限制人物不出范围(地图)
        */
        this.tiledmap_Rect = this.tiledmap.getBoundingBox();// 地图区域
        this.hero_Rect = this.hero.getBoundingBox();// 人物区域
        if (this.hero_Rect.xMin < this.tiledmap_Rect.xMin)
		{
			this.hero.x = this.tiledmap_Rect.xMin + this.hero_Rect.width / 2;
		}
		if (this.hero_Rect.xMax > this.tiledmap_Rect.xMax)
		{
			this.hero.x = this.tiledmap_Rect.xMax - this.hero_Rect.width / 2;;
		}
		if (this.hero_Rect.yMin < this.tiledmap_Rect.yMin)
		{
			this.hero.y = this.tiledmap_Rect.yMin + this.hero_Rect.height / 2;;
		}
		if (this.hero_Rect.yMax > this.tiledmap_Rect.yMax)
		{
			this.hero.y = this.tiledmap_Rect.yMax - this.hero_Rect.height / 2;;
        }

        // this.map_move=cc.v2( this.tiledmap.x , this.tiledmap.y );// 地图移动量
        // console.log(this.map_move);
        
        /** 
         * @description 人物回到中心点
        */
        this.hero_dtPoint=this.hero.position;// 人物偏移量
        this.isToCenter=this.hero_dtPoint.mag();// 返回该向量的长度
        if (!this.isToCenter) {
            // 人物没有偏离中心时 地图反方向移动
            
        }
        else{
            // 人物偏离中心时
            console.log("xxxxxx");
            if (this.s_x<0) {// 说明左移
                console.log("zuo");
                
            }
            else{// 右移
                console.log("you");
            }
            if (this.s_y<0) {// 说明下移
                console.log("xia");
            }
            else{// 上移
                console.log("shang");
            }
        }


    },
});
