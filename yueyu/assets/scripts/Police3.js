
cc.Class({
    extends: cc.Component,

    properties: {
        shuliu: {
            default: null,
            type: cc.Node
        },
    },

    onLoad () {
        var mby1=cc.moveBy(2,-350,0);// 向左走

        var dt_1=cc.delayTime(Math.random()*2);// 延时

        var sbt1=cc.scaleBy(0,-1,1);// 转身

        var mby2=cc.moveBy(2,350,0);// 向右走
        var dt_2=cc.delayTime(Math.random()*2);// 延时

        var func_h=cc.callFunc(function(){
            this.shuliu.active=false;
        }.bind(this));
        var func_s=cc.callFunc(function(){
            this.shuliu.active=true;
        }.bind(this));

        var action=cc.sequence([func_s,mby1,func_h,dt_1,sbt1,func_s,mby2,func_h,dt_2,sbt1]);
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
    },

    // zhuadaole(){
    //     if (this.game.palyer_onshow==true){
    //         this.node.stopAllActions();// 停止动作
    //         this.game.zhuangle();
    //     }
    // },

    faxian(){
        this.node.stopAllActions();// 停止动作

        this.game.run=false;// 地图停止移动
        this.game.player_live=false;// gameOver
        this.game.shirenyu();
        // this.game.gameOver();
    },

    onCollisionEnter(other, self){
        // 踩到玩家
        if(other.node.group=="player"){
            this.faxian();
        }
    },
});