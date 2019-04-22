cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        // Math.random()

        // 随机初始位置
        this.s1=Math.random();
        this.s2=Math.random();

        if (this.s1<=0.5) {
            this.node.x=720;
            this.y_random();
        }
        else{
            this.node.x=-720;
            this.y_random();
        }

        this.speed=Math.random()*2+0.5;

        // console.log(this.node.y);
        var mto=cc.moveTo(this.speed,cc.v2(-this.node.x,-this.node.y));// 鸟飞翔
        var func_sound=cc.callFunc(function(){
            this.node.getComponent(cc.AudioSource).play();// 播放鸟飞声
        }.bind(this));
        var seq1=cc.sequence([cc.delayTime(0.4),func_sound]);
        var spa=cc.spawn([mto,seq1]);


        var func=cc.callFunc(function(){
            this.node.destroy();
        }.bind(this));

        var seq2=cc.sequence([spa,cc.delayTime(1),func]);
        this.node.runAction(seq2);
    },

    y_random(){
        if (this.s2<=0.5) {
            this.node.y=Math.random()*1000;

            var o=cc.v2(0,0);
            var brid=this.node.getPosition();
            var dir=o.sub(brid);
            var xxx=cc.v2(1,0);
            var Rot=(180/Math.PI)*dir.angle(xxx);// 角度(顺时针)
            // console.log(Rot);

            this.node.rotation=Rot;
        }
        else{
            this.node.y=-Math.random()*1000;

            var o=cc.v2(0,0);
            var brid=this.node.getPosition();
            var dir=o.sub(brid);
            var xxx=cc.v2(1,0);
            var Rot=-(180/Math.PI)*dir.angle(xxx);// 角度(顺时针)
            // console.log(Rot);

            this.node.rotation=Rot;
        }
    },

    start () {},

    update (dt) {},
});
