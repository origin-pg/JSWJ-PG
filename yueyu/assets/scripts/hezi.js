



cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {},

    start () {},

    update (dt) {},

    button_close(){
        this.node.active=false;
    },

    // game.json
    // "navigateToMiniProgramAppIdList": ["wx2a5a1eebb75fb935","wxa62de7b57b335c69","wx9f037d2e1e3950da","wx029feb3f11fd8133"],
    button1()
    {
        wx.navigateToMiniProgram({
            appId: 'wx2a5a1eebb75fb935',
            // envVersion: 'develop',// 开发版
            success(res) {
                // 打开成功
                console.log("跳转成功");
            },
            fail(res){
                //加失败处理函数   弹窗或者其他
                console.log("跳转失败,原因：" + res);
            }
          })
    },

    button2()
    {
        wx.navigateToMiniProgram({
            appId: 'wxa62de7b57b335c69',
            // envVersion: 'develop',
            success(res) {
                // 打开成功
                console.log("跳转成功");
            },
            fail(res){
                //加失败处理函数   弹窗或者其他
                console.log("跳转失败,原因：" + res);
            }
          })
    },

    button3()
    {
        wx.navigateToMiniProgram({
            appId: 'wx9f037d2e1e3950da',
            // envVersion: 'develop',
            success(res) {
                // 打开成功
                console.log("跳转成功");
            },
            fail(res){
                //加失败处理函数   弹窗或者其他
                console.log("跳转失败,原因：" + res);
            }
          })
    },

    button4()
    {
        wx.navigateToMiniProgram({
            appId: 'wx029feb3f11fd8133',
            // envVersion: 'develop',
            success(res) {
                // 打开成功
                console.log("跳转成功");
            },
            fail(res){
                //加失败处理函数   弹窗或者其他
                console.log("跳转失败,原因：" + res);
            }
          })
    },
});
