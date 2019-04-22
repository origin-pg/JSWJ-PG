
cc.Class({
    extends: cc.Component,

    properties: {
    },

    delete_self(){
        this.node.destroy();
    },

    onLoad () {
    },

    start () {},

    update (dt) {
        // this.score_max=cc.sys.localStorage.getItem("f_max");// 获取到最大分数
        // console.log(this.score_max);
        // this.string= 'Score: ';
    },
});
