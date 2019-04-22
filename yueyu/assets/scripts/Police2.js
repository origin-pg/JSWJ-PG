
cc.Class({
    extends: cc.Component,

    properties: {
        p_guang: {
            default: null,
            type: cc.Node
        },
    },

    onLoad () {
        this.jishu=0;
        this.police_action();
    },

    // 警察行走动作
    police_action(){
        ///////////////////////////////////////////////////
        this.s1=Math.random()*1;
        this.s2=Math.random()*0.6+0.8;
        this.s3=Math.random()*0.6+0.8;
        ///////////////////////////////////////////////////
        var run_x=cc.moveBy(1,0,160);// 向上走
        var dt_1=cc.delayTime(this.s1);// 延时
        var zhu_1=cc.rotateBy(1,-180);// 逆时针180
        var run_s=cc.moveBy(1,0,-160);// 向下走

        this.Rot=Math.random()*30;// 随机角度

        var zhu_2=cc.rotateBy(0.6,180-this.Rot);// 顺时针随机
        var func_add=cc.callFunc(function(){
            var fd=cc.scaleTo(0.25,0.8);// 放大
            this.p_guang.runAction(fd);
        }.bind(this));
        var spa1=cc.spawn([zhu_2,func_add]);// 放大转动同步

        var zhu_3=cc.rotateBy(this.s2,this.Rot*2-180);
        var zhu_4=cc.rotateBy(this.s3,180-this.Rot*2);

        // var zhu_4=cc.rotateBy(1,180);// 顺时针180
        var func_sub=cc.callFunc(function(){
            var sx=cc.scaleTo(0.5,0.4);// 缩小
            this.p_guang.runAction(sx);
        }.bind(this));
        var spa2=cc.spawn([zhu_2,func_sub]);// 缩小转动同步

        var action=cc.sequence([run_x,dt_1,zhu_1,run_s,dt_1,spa1,zhu_3,dt_1,zhu_4,dt_1,zhu_3,dt_1,spa2]);// 总动作
        var rep=cc.repeatForever(action);
        this.node.runAction(rep);
    },

    start () {},

    update (dt) {
        // 随地图向下移动
        if (this.game.run) {
            this.node.y-=this.game.speed;
        }

        if(this.node.y<=-480-this.node.height){
            // 销毁此节点节点
            this.node.destroy();
        }

        // 如果玩家死亡 并且jishu==0
        if(this.game.player_live==false && this.jishu==0)
        {   
            this.node.stopAllActions();// 停止动作
            // 游戏结束 光指向玩家
            this.p_exposure_player();
            this.jishu=1;// 只执行一次此函数
        }
    },

    zhuadaole(){
            this.game.zhuadaole();
    },

    // 光指向玩家
    p_exposure_player(){
        this.node.stopAllActions();// 停止动作

        // 获取玩家位置
        var vec_player=this.game.player.getPosition();// V2(0,0);
        // 获取灯光位置
        var vec_guang=this.node.getPosition();
        // 灯光指向玩家向量
        var dir=vec_player.sub(vec_guang);
        // 获取灯光到玩家的夹角
        var xxx=cc.v2(1,0);
        // dir.angle(xxx);// 弧度
        var Rot=(180/Math.PI)*dir.angle(xxx);// 角度(顺时针)
          // 获取该向量的长度
          var len=dir.mag()+10;

        // 设置灯光动作
        if(this.node.y>=0){
            var rto_die=cc.rotateTo(this.game.guang_find_time, Rot-90);

            var func1=cc.callFunc(function(){
                var sto_die=cc.scaleTo(this.game.guang_find_time, len/this.game.guang_find_len);
                this.node.getChildByName("p_guang2").runAction(sto_die);
            }.bind(this));

            var func2=cc.callFunc(function(){
                var fto_die=cc.fadeTo(this.game.guang_find_time, this.game.guang_find_opacity);
                this.node.getChildByName("p_guang2").runAction(fto_die);
            }.bind(this));
            
            var spa_die=cc.spawn([rto_die,func1,func2]);
            this.node.runAction(spa_die);
        }
        else{
            var rto_die=cc.rotateTo(this.game.guang_find_time,-Rot-90);

            var func1=cc.callFunc(function(){
                var sto_die=cc.scaleTo(this.game.guang_find_time, len/this.game.guang_find_len);
                this.node.getChildByName("p_guang2").runAction(sto_die);
            }.bind(this));

            var func2=cc.callFunc(function(){
                var fto_die=cc.fadeTo(this.game.guang_find_time, this.game.guang_find_opacity);
                this.node.getChildByName("p_guang2").runAction(fto_die);
            }.bind(this));
            
            var spa_die=cc.spawn([rto_die,func1,func2]);
            this.node.runAction(spa_die);
        };
    },
});
