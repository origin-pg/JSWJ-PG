

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.signin = cc.find("Canvas/signin");
    },

    // start () {},
    // update (dt) {},

    button_ksp(){
        console.log("添加激励视频广告");
        this.rewardedVideoAd = wx.createRewardedVideoAd({adUnitId: 'adunit-be4941339fb24741'});// 初始化组件

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
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
                console.log("发放奖励");
                this.signin_reward = this.signin.getComponent("signin").reward;
                this.signin_reward = this.signin_reward * 2;

                this.old_gold = Number(cc.sys.localStorage.getItem("my_gold"));
                this.old_gold += this.signin_reward;
                cc.sys.localStorage.setItem("my_gold", this.old_gold); //存储数据

                cc.find("Canvas/clothes/goldsp2/gold2").getComponent(cc.Label).string = cc.sys.localStorage.getItem("my_gold");
                this.node.active=false;
                this.signin.active=false;
            } else {
                console.log("中途退出");
            }
        })
    },

    button_bxx(){
        this.signin_reward = this.signin.getComponent("signin").reward;

        this.old_gold = Number(cc.sys.localStorage.getItem("my_gold"));
        this.old_gold += this.signin_reward;
        cc.sys.localStorage.setItem("my_gold", this.old_gold); //存储数据

        cc.find("Canvas/clothes/goldsp2/gold2").getComponent(cc.Label).string = cc.sys.localStorage.getItem("my_gold");
        this.node.active=false;
        this.signin.active=false;
    },
});
