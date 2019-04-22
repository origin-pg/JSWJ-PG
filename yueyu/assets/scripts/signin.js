
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.button1 = cc.find("Canvas/signin/button1");
        this.button1_mb = cc.find("Canvas/signin/button1/mb");
        this.button2 = cc.find("Canvas/signin/button2");
        this.button2_mb = cc.find("Canvas/signin/button2/mb");
        this.button3 = cc.find("Canvas/signin/button3");
        this.button3_mb = cc.find("Canvas/signin/button3/mb");
        this.button4 = cc.find("Canvas/signin/button4");
        this.button4_mb = cc.find("Canvas/signin/button4/mb");
        this.button5 = cc.find("Canvas/signin/button5");
        this.button5_mb = cc.find("Canvas/signin/button5/mb");
        this.button6 = cc.find("Canvas/signin/button6");
        this.button6_mb = cc.find("Canvas/signin/button6/mb");
        this.button7 = cc.find("Canvas/signin/button7");
        this.button7_mb = cc.find("Canvas/signin/button7/mb");
        this.button1_interactable = this.button1.getComponent(cc.Button).interactable;
        this.button2_interactable = this.button2.getComponent(cc.Button).interactable;
        this.button3_interactable = this.button3.getComponent(cc.Button).interactable;
        this.button4_interactable = this.button4.getComponent(cc.Button).interactable;
        this.button5_interactable = this.button5.getComponent(cc.Button).interactable;
        this.button6_interactable = this.button6.getComponent(cc.Button).interactable;
        this.button7_interactable = this.button7.getComponent(cc.Button).interactable;
        this.double = cc.find("Canvas/double");
        this.double_gold = cc.find("Canvas/double/goldsp/gold");wx7a4d8750559e345d
        this.close = cc.find("Canvas/signin/close");
        this.game = cc.find("Canvas").getComponent("Game");

        this.set_time();
        this.reset_signin();
        this.Initialize_button();
    },

    // start () {},
    // update (dt) {},

    // 更新存储时间
    set_time(){
        // this.myDate=new Date();
        // console.log(this.myDate.getFullYear());// 年
        // console.log(this.myDate.getMonth());// 月(0 ~ 11)
        // console.log(this.myDate.getDate());// 日(1 ~ 31)

        this.new_time_day = this.game.new_world_time;// 现在的日期
        this.old_time_day = this.game.old_world_time;// 上次的时间
        // console.log("newTime:" + this.new_time_day);
        // console.log("oldTime:" + this.old_time_day);
    },

    // 检测签到重置
    reset_signin(){
        this.bn1_can=cc.sys.localStorage.getItem("bn1_can");
        this.bn2_can=cc.sys.localStorage.getItem("bn2_can");
        this.bn3_can=cc.sys.localStorage.getItem("bn3_can");
        this.bn4_can=cc.sys.localStorage.getItem("bn4_can");
        this.bn5_can=cc.sys.localStorage.getItem("bn5_can");
        this.bn6_can=cc.sys.localStorage.getItem("bn6_can");
        this.bn7_can=cc.sys.localStorage.getItem("bn7_can");

        // if (this.new_time_day - this.old_time_day <= -28) {
        //     // 月底重置
        //     cc.sys.localStorage.setItem("bn1_can", 0);
        //     cc.sys.localStorage.setItem("bn2_can", 0);
        //     cc.sys.localStorage.setItem("bn3_can", 0);
        //     cc.sys.localStorage.setItem("bn4_can", 0);
        //     cc.sys.localStorage.setItem("bn5_can", 0);
        //     cc.sys.localStorage.setItem("bn6_can", 0);
        //     cc.sys.localStorage.setItem("bn7_can", 0);
        // }
        if (this.bn7_can==1 && this.new_time_day - this.old_time_day>=1) {
            // 七天重置
            cc.sys.localStorage.setItem("bn1_can", 0);
            cc.sys.localStorage.setItem("bn2_can", 0);
            cc.sys.localStorage.setItem("bn3_can", 0);
            cc.sys.localStorage.setItem("bn4_can", 0);
            cc.sys.localStorage.setItem("bn5_can", 0);
            cc.sys.localStorage.setItem("bn6_can", 0);
            cc.sys.localStorage.setItem("bn7_can", 0);
        }
    },

    // 初始化按钮状态
    Initialize_button(){
        if (this.bn1_can==1) {// 不可领取
            this.button1_interactable=false;
            this.button1_mb.opacity=255;
        }
        else{
            this.button1_interactable=true;
            this.button1_mb.opacity=0;
        }

        if (this.bn2_can==1) {
            this.button2_interactable=false;
            this.button2_mb.opacity=255;
        }
        else{
            this.button2_interactable=true;
            this.button2_mb.opacity=0;
        }

        if (this.bn3_can==1) {
            this.button3_interactable=false;
            this.button3_mb.opacity=255;
        }
        else{
            this.button3_interactable=true;
            this.button3_mb.opacity=0;
        }

        if (this.bn4_can==1) {
            this.button4_interactable=false;
            this.button4_mb.opacity=255;
        }
        else{
            this.button4_interactable=true;
            this.button4_mb.opacity=0;
        }

        if (this.bn5_can==1) {
            this.button5_interactable=false;
            this.button5_mb.opacity=255;
        }
        else{
            this.button5_interactable=true;
            this.button5_mb.opacity=0;
        }

        if (this.bn6_can==1) {
            this.button6_interactable=false;
            this.button6_mb.opacity=255;
        }
        else{
            this.button6_interactable=true;
            this.button6_mb.opacity=0;
        }
        
        if (this.bn7_can==1) {
            this.button7_interactable=false;
            this.button7_mb.opacity=255;
        }
        else{
            this.button7_interactable=true;
            this.button7_mb.opacity=0;
        }
    },

    b1(){
        // console.log("进来了");
        if (this.old_time_day==0 || this.new_time_day - this.old_time_day>=1) {
            // console.log("领取了");
            cc.sys.localStorage.setItem("old_day", this.new_time_day);// 更新旧的时间
            cc.sys.localStorage.setItem("bn1_can", 1);
            this.button1_mb.opacity=255;
            this.button1_interactable=false;
            this.set_time();
            // 弹出看视频界面
            // 看视频发放双倍金币
            // 不看发放正常金币
            this.reward=50;
            this.lingqu();
        }
    },
    b2(){
        if (this.bn1_can==1 && this.new_time_day - this.old_time_day>=1) {
            cc.sys.localStorage.setItem("old_day", this.new_time_day);
            cc.sys.localStorage.setItem("bn2_can", 1);
            this.button2_mb.opacity=255;
            this.button2.getComponent(cc.Button).interactable=false;
            this.set_time();
            this.reward=50;
            this.lingqu();
        }
    },
    b3(){
        if (this.bn2_can==1 && this.new_time_day - this.old_time_day>=1) {
            cc.sys.localStorage.setItem("old_day", this.new_time_day);
            cc.sys.localStorage.setItem("bn3_can", 1);
            this.button3_mb.opacity=255;
            this.button3.getComponent(cc.Button).interactable=false;
            this.set_time();
            this.reward=50;
            this.lingqu();
        }
    },
    b4(){
        if (this.bn3_can==1 && this.new_time_day - this.old_time_day>=1) {
            cc.sys.localStorage.setItem("old_day", this.new_time_day);
            cc.sys.localStorage.setItem("bn4_can", 1);
            this.button4_mb.opacity=255;
            this.button4.getComponent(cc.Button).interactable=false;
            this.set_time();
            this.reward=50;
            this.lingqu();
        }
    },
    b5(){
        if (this.bn4_can==1 && this.new_time_day - this.old_time_day>=1) {
            cc.sys.localStorage.setItem("old_day", this.new_time_day);
            cc.sys.localStorage.setItem("bn5_can", 1);
            this.button5_mb.opacity=255;
            this.button5.getComponent(cc.Button).interactable=false;
            this.set_time();
            this.reward=50;
            this.lingqu();
        }
    },
    b6(){
        if (this.bn5_can==1 && this.new_time_day - this.old_time_day>=1) {
            cc.sys.localStorage.setItem("old_day", this.new_time_day);
            cc.sys.localStorage.setItem("bn6_can", 1);
            this.button6_mb.opacity=255;
            this.button6.getComponent(cc.Button).interactable=false;
            this.set_time();
            this.reward=50;
            this.lingqu();
        }
    },
    b7(){
        if (this.bn6_can==1 && this.new_time_day - this.old_time_day>=1) {
            cc.sys.localStorage.setItem("old_day", this.new_time_day);
            cc.sys.localStorage.setItem("bn7_can", 1);
            this.button7_mb.opacity=255;
            this.button7.getComponent(cc.Button).interactable=false;
            this.set_time();
            this.reward=100;
            this.lingqu();
        }
    },

    lingqu(){
        this.double.active = true;
        this.close.active = false;
        this.double_gold.getComponent(cc.Label).string = this.reward;
    },





























    button_close(){
        this.node.active=false;
    },
});
