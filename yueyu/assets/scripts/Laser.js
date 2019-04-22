

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad () {
        this.jishu=0;
    },

    start () {},

    update (dt) {

        if(this.game.player_live==true){
            // 随地图向下移动
            if (this.game.run) {
                this.node.y-=(this.game.speed+2);
            }
            else{
                this.node.y-=(this.game.speed-1);
            }
        }
        if(this.node.y<=-480-this.node.height){
            // 销毁此节点节点
            this.node.destroy();
        }

        // 如果玩家死亡 并且jishu==0
        if(this.game.player_live==false && this.jishu==0)
        {   
            // // 游戏结束 光指向玩家
            // this.exposure_player();
            this.jishu=1;// 只执行一次此函数
        }

        // this.node.y-=4;
    },

    onCollisionEnter(other, self){
        // 照到玩家
        if(other.node.group=="player"){
            if(this.game.palyer_onshow==true){
                this.node.getComponent(cc.AudioSource).play();
            }
            this.game.zhuangle();
        }
    },
});
