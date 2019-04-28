
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

  

    onLoad () {
        cc.director.getCollisionManager().enabled=true;//开启物理碰撞
        cc.director.getCollisionManager().enabledDebugDraw = true; //绘制碰撞区域
        
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        
        physicsManager.debugDrawFlags = 
            // 0;
            // cc.PhysicsManager.DrawBits.e_aabbBit |
            cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit
            ;
            //开启物理引擎和碰撞绘制
    },

  
});
