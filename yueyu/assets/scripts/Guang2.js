

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        this.jishu=0;
        // this.gameOver=false;

        this.Rot=-Math.random()*30;// 随机初始角度
        // console.log(this.Rot);
        this.node.rotation=this.Rot;

        // 调整难度
        this.score=Number(cc.sys.localStorage.getItem("f_new")); //读取分数
        if(this.score>=30){
            this.score=30;
        }
        this.hard=this.score*0.05;// 困难度

        this.Time=2.2 + Math.random()*3.5-this.hard;// 随机旋转时间
        this.Dtime=0.4+Math.random()*0.8;// 随机停顿时间
        
        var rto1=cc.rotateTo(this.Time,-180-this.Rot);
        var dt1=cc.delayTime(this.Dtime);
        var rto2=cc.rotateTo(this.Time,this.Rot);  
        var dt2=cc.delayTime(this.Dtime);
        var seq=cc.sequence([rto1,dt1,rto2,dt2]);
        var rf=cc.repeatForever(seq);
        this.node.runAction(rf);
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
                // 游戏结束 光指向玩家
                this.exposure_player();
                this.jishu=1;// 只执行一次此函数
            }
    },

    // onCollisionStay
    onCollisionEnter(other, self){
        // 照到玩家
        if(other.node.group=="player"){
            this.game.zhuadaole();
        }
    },

    // 光指向玩家
    exposure_player(){
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
          var len=dir.mag();
          
        // 指向玩家
        // if(this.node.y>=0){
        //     this.node.setRotation(Rot+90);
        // }
        // else{
        //     this.node.setRotation(-Rot+90);
        // };
        // 设置灯光的长度(大小)
        // this.node.setScale(len/this.node.height);

        // 设置灯光动作
        if(this.node.y>=0){
            var rto_die=cc.rotateTo(this.game.guang_find_time, Rot+90);
            var sto_die=cc.scaleTo(this.game.guang_find_time, len/this.game.guang_find_len);
            // var fto_die=cc.fadeTo(this.game.guang_find_time, this.game.guang_find_opacity);
            var spa_die=cc.spawn([rto_die,sto_die]);//,fto_die]);
            this.node.runAction(spa_die);
        }
        else{
            var rto_die=cc.rotateTo(this.game.guang_find_time,-Rot+90);
            var sto_die=cc.scaleTo(this.game.guang_find_time,len/this.game.guang_find_len);
            // var fto_die=cc.fadeTo(this.game.guang_find_time, this.game.guang_find_opacity);
            var spa_die=cc.spawn([rto_die,sto_die]);//,fto_die]);
            this.node.runAction(spa_die);
        };
    },
});
