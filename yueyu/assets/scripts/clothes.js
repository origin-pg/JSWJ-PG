


cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.board = cc.find("Canvas/clothes/mask/board");
        this.zuo = cc.find("Canvas/clothes/zuo");
        this.you = cc.find("Canvas/clothes/you");
        this.select = cc.find("Canvas/clothes/select");
        this.signin = cc.find("Canvas/signin");
        this.Canvas = cc.find("Canvas");
        this.game = cc.find("Canvas").getComponent("Game");
        this.gold = cc.find("Canvas/clothes/goldsp2/gold2");
        this.jbbz = cc.find("Canvas/clothes/jbbz");
        this.shuoming = cc.find("Canvas/clothes/shuoming");
        this.shoucang = cc.find("Canvas/clothes/shoucang");

        this.a_suo = cc.find("Canvas/clothes/mask/board/afei/a_suo");
        this.x_suo = cc.find("Canvas/clothes/mask/board/xrui/x_suo");
        this.az_suo = cc.find("Canvas/clothes/mask/board/azhai/az_suo");
        this.k_suo = cc.find("Canvas/clothes/mask/board/kaili/k_suo");
        this.j_suo = cc.find("Canvas/clothes/mask/board/james/j_suo");

        this.a_ksp = cc.find("Canvas/clothes/a_ksp");
        this.x_ksp = cc.find("Canvas/clothes/x_ksp");
        this.j_buy = cc.find("Canvas/clothes/j_buy");
        this.az_fx = cc.find("Canvas/clothes/az_fx");

        // 动作
        this.moby_zuo=cc.moveBy(0.2,cc.v2(-270,0));
        this.moby_you=cc.moveBy(0.2,cc.v2(270,0));
        this.call_func_ACT =cc.callFunc(function(){
            // console.log(cc.sys.localStorage.getItem("player"));

            if(this.now_player == 1 && this.board.x>=670 && this.board.x<=680){
                this.select.getComponent(cc.Button).interactable=false;
            }
            else if (this.now_player == 2 && this.board.x>=400 && this.board.x<=410) {
                this.select.getComponent(cc.Button).interactable=false;
            }
            else if(this.now_player == 3 && this.board.x>=130 && this.board.x<=140){
                this.select.getComponent(cc.Button).interactable=false;
            }
            else if(this.now_player == 4 && this.board.x>=-140 && this.board.x<=-130){
                this.select.getComponent(cc.Button).interactable=false;
            }
            else if(this.now_player == 5 && this.board.x>=-410 && this.board.x<=-400){
                this.select.getComponent(cc.Button).interactable=false;
            }
            else if(this.now_player == 6 && this.board.x>=-670 && this.board.x<=-680){
                this.select.getComponent(cc.Button).interactable=false;
            }
            else{
                this.a_ksp.active=false;
                this.j_buy.active=false;
                // console.log("按钮打开");
                this.select.getComponent(cc.Button).interactable=true;
            }

            this.initialize_button();// 按钮时候解锁初始化

            this.zuo.getComponent(cc.Button).interactable=true;
            this.you.getComponent(cc.Button).interactable=true;
        }.bind(this));

        this.a_jiesuo=false;// 阿非-锁
        this.a_suo_open=false;//******************* */

        this.x_jiesuo=false;// 小蕊-锁
        this.x_suo_open=false;//******************* */

        this.az_jiesuo=false;// 阿宅-锁
        this.az_suo_open=false;//******************* */

        this.k_jiesuo=false;// 凯丽-锁
        this.k_suo_open=false;//******************* */

        this.j_jiesuo=false;// 詹姆斯-锁
        this.j_suo_open=false;//******************* */

        this.suo();// 是否解锁初始化

        if (Number(cc.sys.localStorage.getItem("yishoucang"))==1) {
            this.shoucang.active=false;
        }
        else{
            this.shoucang.active=true;
        }
    },

    start () {
        this.node.runAction(this.call_func_ACT);
    },

    initialize_button(){
        // 1.maike 2.afei 3.xrui 4.azhai 5.kaili 6.james
        if (this.board.x>=670 && this.board.x<=680) {
            console.log("111");
            this.a_ksp.active=false;
            this.x_ksp.active=false;
            this.j_buy.active=false;
            this.az_fx.active=false;
        }
        else if (this.board.x>=400 && this.board.x<=410) {
            console.log("222");
            this.x_ksp.active=false;
            this.j_buy.active=false;
            this.az_fx.active=false;
            if (cc.sys.localStorage.getItem("jie_suo_afei")==1) {
                this.a_ksp.active=false;
            }
            else{
                this.a_ksp.active=true;
            }
        }
        else if (this.board.x>=130 && this.board.x<=140) {
            console.log("333");
            this.a_ksp.active=false;
            this.j_buy.active=false;
            this.az_fx.active=false;
            if (cc.sys.localStorage.getItem("jie_suo_xrui")==1) {
                this.x_ksp.active=false;
            }
            else{
                this.x_ksp.active=true;
            }
        }
        else if (this.board.x>=-140 && this.board.x<=-130) {
            console.log("444");
            this.a_ksp.active=false;
            this.x_ksp.active=false;
            this.j_buy.active=false;
            if (cc.sys.localStorage.getItem("jie_suo_azhai")==1) {
                this.az_fx.active=false;
            }
            else{
                this.az_fx.active=true;
            }
        }
        else if (this.board.x>=-410 && this.board.x<=-400) {
            console.log("555");
            this.a_ksp.active=false;
            this.x_ksp.active=false;
            this.j_buy.active=false;
            this.az_fx.active=false;
        }
        else if (this.board.x>=-680 && this.board.x<=-670) {
            console.log("666");
            this.a_ksp.active=false;
            this.x_ksp.active=false;
            this.az_fx.active=false;
            if (cc.sys.localStorage.getItem("jie_suo_james")==1) {
                this.j_buy.active=false;
            }
            else{
                this.j_buy.active=true;
            }
        }
    },

    update (dt) {},

    // 1.maike 2.afei 3.xrui 4.azhai 5.kaili 6.james
    button_select(){
        if (this.board.x>=670 && this.board.x<=680) {// 选择麦克
            // console.log("选择麦克");
            this.now_player = 1;
            cc.sys.localStorage.setItem("player", 1);
            // console.log(cc.sys.localStorage.getItem("player"));
            this.select.getComponent(cc.Button).interactable=false;
        }
        else if(this.board.x>=400 && this.board.x<=410){// 选择阿非
            if (this.a_suo_open==true) {// 解锁可点击//*************** */
                this.now_player = 2;
                cc.sys.localStorage.setItem("player", 2);
                this.select.getComponent(cc.Button).interactable=false;
            }//************** */
        }
        else if(this.board.x>=130 && this.board.x<=140){// 选择小蕊
            if (this.x_suo_open==true) {// 解锁可点击//*************** */
                this.now_player = 3;
                cc.sys.localStorage.setItem("player", 3);
                this.select.getComponent(cc.Button).interactable=false;
            }//************** */
        }
        else if(this.board.x>=-140 && this.board.x<=-130){// 选择阿宅
            if (this.az_suo_open==true) {// 解锁可点击//*************** */
                this.now_player = 4;
                cc.sys.localStorage.setItem("player", 4);
                this.select.getComponent(cc.Button).interactable=false;
            }//************** */
        }
        else if(this.board.x>=-410 && this.board.x<=-400){// 选择凯丽
            if (this.k_suo_open==true) {// 解锁可点击//*************** */
                this.now_player = 5;
                cc.sys.localStorage.setItem("player", 5);
                this.select.getComponent(cc.Button).interactable=false;
            }//************** */
        }
        else if(this.board.x>=-680 && this.board.x<=-670){// 选择詹姆斯
            // if (this.j_suo_open==true) {// 解锁可点击//*************** */
                this.now_player = 6;
                cc.sys.localStorage.setItem("player", 6);
                this.select.getComponent(cc.Button).interactable=false;
            // }//************** */
        }
    },

    suo(){
        // console.log(cc.sys.localStorage.getItem("jie_suo_kaili"));

        if (cc.sys.localStorage.getItem("jie_suo_afei")==1) {//*************** */
            if (this.node.active==true) {
                this.a_suo.opacity = 0;// 解锁阿非
            }//*************** */
            // 设置按钮状态
            this.a_suo_open=true;
        }

        if (cc.sys.localStorage.getItem("jie_suo_xrui")==1) {//*************** */
            if (this.node.active==true) {
                this.x_suo.opacity = 0;// 解锁小蕊
            }//*************** */
            // 设置按钮状态
            this.x_suo_open=true;
        }

        if (cc.sys.localStorage.getItem("jie_suo_azhai")==1) {//*************** */
            if (this.node.active==true) {
                this.az_suo.opacity = 0;// 解锁阿宅
            }//*************** */
            // 设置按钮状态
            this.az_suo_open=true;
        }

        if (cc.sys.localStorage.getItem("jie_suo_kaili")==1) {//*************** */
            if (this.node.active==true) {
                this.k_suo.opacity = 0;// 解锁凯丽
            }//*************** */
            this.k_suo_open=true;
        }

        if (cc.sys.localStorage.getItem("jie_suo_james")==1) {//*************** */
            if (this.node.active==true) {
                this.j_suo.opacity = 0;// 解锁詹姆斯
            }//*************** */
            this.j_suo_open=true;
        }
        
        // 刷新金币
        if (this.node.active==true) {
            this.gold.getComponent(cc.Label).string = cc.sys.localStorage.getItem("my_gold");
        }
    },

    button_a_ksp(){
        console.log("222");
        console.log("添加激励视频广告");
        this.rewardedVideoAd = wx.createRewardedVideoAd({adUnitId: 'adunit-c18af86670d57805'});// 初始化组件

        this.rewardedVideoAd.onLoad(() => {
            console.log('激励视频 广告加载成功')
        })
        this.rewardedVideoAd.onError(err => {
            console.log('激励视频 广告加载失败')
            console.log(err)
        })

        this.rewardedVideoAd.load()
        .then(() => this.rewardedVideoAd.show())
        .catch(err => console.log(err.errMsg))

        this.rewardedVideoAd.onClose(res => {
            if (res && res.isEnded || res === undefined) {
                console.log("发放奖励");
                cc.sys.localStorage.setItem("jie_suo_afei", 1);// 解锁
                this.suo();
                if (this.a_ksp.active==true) {
                    this.a_ksp.active=false;
                }
            } else {
                console.log("中途退出");
                this.a_ksp.active=true;
            }
          })
    },

    button_x_ksp(){
        console.log("333");
        console.log("添加激励视频广告");
        this.rewardedVideoAd = wx.createRewardedVideoAd({adUnitId: 'adunit-b420bed9a9c9f2d8'});// 初始化组件

        this.rewardedVideoAd.onLoad(() => {
        })
        this.rewardedVideoAd.onError(err => {
            console.log(err)
        })

        this.rewardedVideoAd.load()
        .then(() => this.rewardedVideoAd.show())
        .catch(err => console.log(err.errMsg))

        this.rewardedVideoAd.onClose(res => {
            if (res && res.isEnded || res === undefined) {
                console.log("发放奖励");
                cc.sys.localStorage.setItem("jie_suo_xrui", 1);// 解锁
                this.suo();
                if (this.x_ksp.active==true) {
                    this.x_ksp.active=false;
                }
            } else {
                this.a_ksp.active=true;
            }
          })
    },

    button_az_fx(){
        console.log("分享了");
        cc.loader.loadRes("res/share",function(err,data){
            wx.shareAppMessage({
                title: "你能超越我吗？快来试试吧！",
                imageUrl: data.url,
                success(res){
                    console.log("转发成功!!!")
                    
                },
                fail(res){
                    console.log("转发失败!!!")
                } 
            })
        });
        this.call_func_fx =cc.callFunc(function(){
            cc.sys.localStorage.setItem("jie_suo_azhai", 1);// 解锁
            this.suo();
            if (this.az_fx.active==true) {
                this.az_fx.active=false;
            }
        }.bind(this));
        this.node.runAction(cc.sequence([cc.delayTime(2.5),this.call_func_fx]));
    },

    button_j_buy(){
        // console.log("购买詹姆斯");
        this.old_gold = Number(cc.sys.localStorage.getItem("my_gold"));
        if (this.old_gold >= 500) {
            this.old_gold = Number(cc.sys.localStorage.getItem("my_gold"));
            this.old_gold -= 500;
            cc.sys.localStorage.setItem("my_gold", this.old_gold); //存储数据
            // 购买
            cc.sys.localStorage.setItem("jie_suo_james", 1);
            this.suo();
            if (this.j_buy.active==true) {
                this.j_buy.active=false;
            }
            /*
            this.now_player = 4;
            cc.sys.localStorage.setItem("player", 4);
            this.select.getComponent(cc.Button).interactable=false;
            */
        }
        else{
            // 金币不足 无法购买
            this.j_buy.active=true;
            console.log("金币不足");
            this.gold_buzu();
        }
    },

    gold_buzu(){
        this.jbbz.runAction(cc.sequence([cc.fadeIn(0.8),cc.delayTime(0.8),cc.fadeOut(0.5)]));
    },






















    button_you(){
        if (this.board.x>=-670) {
            this.jbbz.opacity=0;
            this.zuo.getComponent(cc.Button).interactable=false;
            this.you.getComponent(cc.Button).interactable=false;
            this.board.runAction(cc.sequence([this.moby_zuo,this.call_func_ACT]));
        }
    },
    button_zuo(){
        if (this.board.x<=670) {
            this.jbbz.opacity=0;
            this.zuo.getComponent(cc.Button).interactable=false;
            this.you.getComponent(cc.Button).interactable=false;    
            this.board.runAction(cc.sequence([this.moby_you,this.call_func_ACT]));
        }
    },
    button_start(){
        console.log("点到了");
        this.game.delete_addBannerAd_3();//GG
        
        cc.find("Canvas/goldbg/gold").getComponent(cc.Label).string = cc.sys.localStorage.getItem("my_gold");
        this.game.change_player();
        if (this.game.once_cover) {
            this.game.once_cover=false;
            if (cc.sys.localStorage.getItem("once_game")==1) {
                this.game.run = true;
            }
        }
        this.node.active=false;
    },





















    // 收藏node
    button_shoucang(){
        this.shuoming.active=true;
    },
    button_sc_lingqu(){
        console.log("aaaa");
        this.sc=wx.getLaunchOptionsSync().scene
        console.log(this.sc);
        if (this.sc == 1104) {
            // console.log("xxxx");
            this.old_gold = Number(cc.sys.localStorage.getItem("my_gold"));
            this.old_gold += 50;
            cc.sys.localStorage.setItem("my_gold", this.old_gold); //存储数据

            cc.sys.localStorage.setItem("yishoucang", 1);
            this.shuoming.active=false;
            this.shoucang.active=false;
        }
    },
    button_sc_close(){
        this.shuoming.active=false;
    },
    button_signin(){// 签到按钮
        this.signin.active=true;
    },
});
