
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
        // var police_mby_x=cc.moveBy(1,0,-160);// 向下走
        // var police_mby_s=cc.moveBy(1,0,160);// 向上走
        // var police_rby=cc.rotateBy(1,-180);// 逆时针180
        // var police_rby2=cc.rotateBy(1,180);// 顺时针180
        // var police_rby3=cc.rotateBy(1,-90);// 逆时针90
        // var police_rby4=cc.rotateBy(1,90);// 顺时针90

        // var p_guang_scaleTo=cc.scaleBy(1,0.8);// 放大
        // var p_guang_scaleTo2=cc.scaleBy(1,0.4);// 缩小

        // this.Rot=Math.random()*30;// 随机角度

        // // var son_s=cc.spawn([police_mby_s,police_rby]);// 向上转身
        // // var son_x=cc.spawn([police_mby_x,police_rby2]);// 向下转身

        // var seq_run=cc.sequence([police_mby_x,police_rby,police_mby_s]);// 走动
        // var rep_fun=cc.repeat(seq_run, 1);// 走动次数

        // var police_rby_s1=cc.rotateTo(2,180-this.Rot);// 向下转
        // var son_s=cc.spawn([police_rby_s1,p_guang_scaleTo]);

        // var police_rby_s2=cc.rotateTo(2,this.Rot);// 向上转
        // var son_x=cc.spawn([police_rby_s2,p_guang_scaleTo2]);// 向上转身

        // var action=cc.sequence([rep_fun,son_s,police_rby_s2,police_rby_s1,son_x,police_rby]);// 总动作
        // this.node.runAction(action);

        // var rf=cc.repeatForever(action);
        // this.node.runAction(rf);
        // cc.repeat(动作, 次数);

        ///////////////////////////////////////////////////
        this.sj1=Math.random()*1;
        this.sj2=Math.random()*0.6+0.8;
        this.sj3=Math.random()*0.6+0.8;
        ///////////////////////////////////////////////////
        var run_x=cc.moveBy(1,0,-160);// 向下走
        var dt_1=cc.delayTime(this.sj1);// 延时
        var zhu_1=cc.rotateBy(1,-180);// 逆时针180
        var run_s=cc.moveBy(1,0,160);// 向上走

        this.Rot=Math.random()*30;// 随机角度

        var zhu_2=cc.rotateBy(0.6,180-this.Rot);// 顺时针随机
        var func_add=cc.callFunc(function(){
            var fd=cc.scaleTo(0.25,0.8);// 放大
            this.p_guang.runAction(fd);
        }.bind(this));
        var spa1=cc.spawn([zhu_2,func_add]);// 放大转动同步

        var zhu_3=cc.rotateBy(this.sj2,this.Rot*2-180);
        var zhu_4=cc.rotateBy(this.sj3,180-this.Rot*2);

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
        // 获取警察位置
        var vec_shoudian=this.node.getPosition();
        //  cc.v2(this.node.getPosition().x-45,this.node.getPosition().y);;
        console.log(vec_shoudian);
        // 灯光指向玩家向量
        var dir=vec_player.sub(vec_shoudian);
        console.log(dir);
        // 获取灯光到玩家的夹角
        var xxx=cc.v2(1,0);
        // dir.angle(xxx);// 弧度
        var Rot=(180/Math.PI)*dir.angle(xxx);// 角度(顺时针)
        console.log(Rot);
        // 获取该向量的长度
        var len=dir.mag()+10;

        // 设置灯光动作
        if(this.node.y>=0){
            var rto_die=cc.rotateTo(this.game.guang_find_time, Rot-90);

            var func1=cc.callFunc(function(){
                var sto_die=cc.scaleTo(this.game.guang_find_time, len/this.game.guang_find_len);
                this.node.getChildByName("p_guang").runAction(sto_die);
            }.bind(this));
            
            var func2=cc.callFunc(function(){
                var fto_die=cc.fadeTo(this.game.guang_find_time, this.game.guang_find_opacity);
                this.node.getChildByName("p_guang").runAction(fto_die);
            }.bind(this));
            
            var spa_die=cc.spawn([rto_die,func1,func2]);
            this.node.runAction(spa_die);
        }
        else{
            var rto_die=cc.rotateTo(this.game.guang_find_time,-Rot-90);

            var func1=cc.callFunc(function(){
                var sto_die=cc.scaleTo(this.game.guang_find_time, len/this.game.guang_find_len);
                this.node.getChildByName("p_guang").runAction(sto_die);
            }.bind(this));
            
            var func2=cc.callFunc(function(){
                var fto_die=cc.fadeTo(this.game.guang_find_time, this.game.guang_find_opacity);
                this.node.getChildByName("p_guang").runAction(fto_die);
            }.bind(this));
            
            var spa_die=cc.spawn([rto_die,func1,func2]);
            this.node.runAction(spa_die);
        };
    },
});
