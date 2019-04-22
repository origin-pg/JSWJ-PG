

cc.Class({
    extends: cc.Component,

    properties: {
        Canvas: {
            default: null,
            type: cc.Node
        },
        shade: {
            default: null,
            type: cc.Node
        },
    },
    func_hide(){
        // this.sto1=cc.scaleTo(0.1,1,1);
        // this.shade.runAction(this.sto1);
        var fout = cc.fadeOut(0.05);
        this.node.runAction(fout);
    },
    func_show(){
        // this.sto2=cc.scaleTo(0.1,1,0);
        // this.shade.runAction(this.sto2);
        var fin = cc.fadeIn(0.05);
        this.node.runAction(fin);
    },

    onLoad () {
        this.shade.scaleY=0;
    },

    start () {

    },

    update (dt) {},
});
