
cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        },
        qianshui: {
            default: null,
            type: cc.Node
        },

        ground1: {
            default: null,
            type: cc.Node
        },
        ground2: {
            default: null,
            type: cc.Node
        },

        hong: {
            default: null,
            type: cc.Node
        },

        // 氧气预制体
        o2: {
            default: null,
            type: cc.Prefab
        },

        // 预制体
        // 这个属性引用了手电光预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },

        starPrefab2: {
            default: null,
            type: cc.Prefab
        },
        // 这个属性引用了警察预制资源
        policePrefab: {
            default: null,
            type: cc.Prefab
        },
        policePrefab2: {
            default: null,
            type: cc.Prefab
        },
        // 这个属性引用了巡逻警察预制资源
        policePrefab3: {
            default: null,
            type: cc.Prefab
        },
        // 这个属性引用了木头预制资源
        policeLaser: {
            default: null,
            type: cc.Prefab
        },
        // 这个属性引用了水鸟预制资源
        policeBird: {
            default: null,
            type: cc.Prefab
        },

        // 分数score label 的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        // 最高分预制体
        max: {
            default: null,
            type: cc.Prefab
        },
        // 金币
        all_gold: {
            default: null,
            type: cc.Label
        },

        // 结束节点
        over: {
            default: null,
            type: cc.Node
        },

        // 排行榜分享按钮
        fenxiang_button: {
            default: null,
            type: cc.Node
        },
        // 排行榜刷新按钮
        updata_button: {
            default: null,
            type: cc.Node
        },

        wxSubContextView: cc.Node,

        /* 音效 */
        // audio_soures_bg:cc.AudioSource,
        // audio_soures_wood:cc.AudioSource,
        audio_soures_qianshui:cc.Node,
        audio_soures_chushui:cc.Node,
        audio_soures_zhuadaole:cc.AudioSource,

        // 地图下移速度
        speed:3,
        guang_find_time:0.1,// 抓到时灯光动作速度
        guang_find_len:320,// 抓到时灯光放大尺寸
        guang_find_opacity:255,// 抓到时灯光透明度
    },

    // 按住屏幕
    func_touch(){
        this.palyer_onshow=false;
        // 如果活着按下屏幕才会隐藏人物
        if(this.player_live==true){
            this.run=false;// 地图停止
            this.palyer_onshow=false;// 人物显示为false
            // this.node.getComponent(cc.Animation).pause(0);// 暂停动画

            this.audio_soures_sl.pause();// 停止水流声
            this.audio_soures_qianshui.getComponent(cc.AudioSource).play();// 播放潜水声
            this.audio_soures_chushui.getComponent(cc.AudioSource).stop();// 停止呼吸声

            // 创建O2进度
            if(this.in_w==true){
                this.in_w=false;
                this.spawnNew_o2()
            }

            var fto_qs1 = cc.fadeTo(0.07,255);// 潜水动作
            var sto_qs1=cc.scaleTo(0.07,1);
            var spa_qs1=cc.spawn([fto_qs1,sto_qs1]);

            this.qianshui.runAction(spa_qs1);

            this.player.getComponent("Player").func_hide();
        }
    },
    // 离开屏幕
    func_touch_end(){
        this.palyer_onshow=true;
        // 如果活着离开屏幕才会移动
        if(this.player_live==true){
            this.run=true;
            this.palyer_onshow=true;
            // this.node.getComponent(cc.Animation).resume(0);// 继续动画

            this.audio_soures_qianshui.getComponent(cc.AudioSource).stop();// 停止潜水声
            this.a1=cc.callFunc(function(){
                this.audio_soures_chushui.getComponent(cc.AudioSource).play();// 播放呼吸声
            }.bind(this));
            this.a2=cc.callFunc(function(){
                this.audio_soures_sl.resume();// 继续水流声
            }.bind(this));
            this.seq1=cc.sequence([this.a1,cc.delayTime(0.6),this.a2]);
            this.node.runAction(this.seq1);
            

            // 删除O2进度
            if(this.in_w==false){
                this.newO2.getComponent("bar").delete_myself();
                this.newO2=null;

                this.in_w=true;
            }

            var fto_qs2 = cc.fadeTo(0.07,0);
            var sto_qs2=cc.scaleTo(0.07,0.5);
            var spa_qs2=cc.spawn([fto_qs2,sto_qs2]);

            this.qianshui.runAction(spa_qs2);

            this.player.getComponent("Player").func_show();
        }
    },

    onLoad () {
        // *-*-*-*-* 数据初始化 *-*-*-*-*
        cc.director.getCollisionManager().enabled=true; // 开启碰撞检测

        this.wxSubContextView.getComponent(cc.WXSubContextView).enabled = false;// 初始化关闭排行榜刷新

        this.hong.opacity=0;// 红灯透明度为0
        this.qianshui.opacity=0;// 潜水透明度为0
        this.qianshui.scale=0.5;
        var fout2_qianshui = cc.fadeOut(0.1);
        this.qianshui.runAction(fout2_qianshui);

        this.run=true;// 地图移动
        this.palyer_onshow=true;// 人物显示为true
        // 初始化计分
        this.score = 0;
        cc.sys.localStorage.setItem("f_new", this.score); //存储数据初始化
        // cc.sys.localStorage.setItem("f_max", 0);// 重置最大分「测试用」
        this.dt_fenshu=0;
        // 金币初始化
        this.initialize_gold();
        // 初始化玩家
        this.player_live=true;

        // 初始化视频广告
        this.bottle = cc.find("Canvas/bottle");
        this.guanggao = cc.find("Canvas/guanggao");
        this.guanggao.active=false;
        // this._revival = true;// 复活限制
        this.addBannerAd_1(); //GG

        this.newO2=null;
        this.in_w=true;// 初始化是否已经潜水

        // *-*-*-*-* 节点初始化 *-*-*-*-*
        this.clothes_node = cc.find("Canvas/clothes");
        this.hezi = cc.find("Canvas/hezi");
        this.heziopen = cc.find("Canvas/heziopen");
        this.add_gold = cc.find("Canvas/over/goldsp/gold");
        this.signin = cc.find("Canvas/signin");
        this.double = cc.find("Canvas/double");
        this.biti1 = cc.find("Canvas/player/biti1");
        this.biti2 = cc.find("Canvas/player/biti2");
        this.wfsm = cc.find("Canvas/wfsm");

        this.node.on(cc.Node.EventType.TOUCH_START,this.func_touch,this);
        // this.node.on(cc.Node.EventType.TOUCH_MOVE,this.func_touch,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.func_touch_end,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.func_touch_end,this);


        // *-*-*-*-* 背景音 *-*-*-*-*
        this.audio_soures_bg=this.node.getChildByName("ground1").getComponent(cc.AudioSource);
        this.audio_soures_bg.loop=true;// 循环播放
        this.audio_soures_bg.volume=0.0;
        // this.audio_soures_bg.play();// 播放声音

        this.audio_soures_sl=this.node.getChildByName("ground2").getComponent(cc.AudioSource);
        this.audio_soures_sl.loop=true;// 循环播放
        this.audio_soures_sl.volume=0.5;
        this.audio_soures_sl.play();// 播放声音

        this.audio_soures_qianshui=this.qianshui.getComponent(cc.AudioSource);
        this.audio_soures_chushui=this.player.getComponent(cc.AudioSource);


        // *-*-*-*-* 预制体第一次生成计时 *-*-*-*-*
        // 🐊
        this.spawnNew_time=0;
        this.dt_s=0;// 计时
        this.spawnNew_time2=3;
        this.dt_s2=0;// 计时
        // 🦀
        this.police_spawnNew_time=Math.random()*4+16;
        this.dt_p_s=0;// 计时
        this.police_spawnNew_time2=Math.random()*4+8;
        this.dt_p_s2=0;// 计时
        // 🐟
        this.police_spawnNew_time3=35;// Math.random()*3+4;
        this.dt_p_s3=0;// 计时
        // 木头
        this.laser_spawnNew_time=30;// Math.random()*2+3;
        this.dt_l_s=0;// 计时
        // 水鸟
        this.brid_spawnNew_time=Math.random()*3+3;
        this.dt_b_s=0;// 计时

        this.over_jishu=0;
        // this.over.setPosition(cc.v2(-800,0));


        // *-*-*-*-* 层次设置 *-*-*-*-*
        this.bottle.zIndex=20;
        this.node.getChildByName("scorebg").zIndex=98;
        this.scoreDisplay.zIndex=99;
        this.node.getChildByName("goldbg").zIndex=98;
        this.all_gold.zIndex=99;
        this.over.zIndex=100;
        this.wxSubContextView.zIndex=110;
        this.wfsm.zIndex=111;
        this.guanggao.zIndex=120;
        this.clothes_node.zIndex=130;
        this.signin.zIndex=131;
        this.double.zIndex=132;
        this.heziopen.zIndex=140;
        this.hezi.zIndex=141;

        // *-*-*-*-* 当前人物初始化 *-*-*-*-*
        this.clothes = cc.find("Canvas/clothes").getComponent("clothes");
        if (cc.sys.localStorage.getItem("player")==null || cc.sys.localStorage.getItem("player")==1) {
            console.log(cc.sys.localStorage.getItem("player"));
            this.clothes.now_player = 1;// 麦克
        }
        else if(cc.sys.localStorage.getItem("player")==2){
            console.log(cc.sys.localStorage.getItem("player"));
            this.clothes.now_player = 2;// 阿非
        }
        else if(cc.sys.localStorage.getItem("player")==3){
            console.log(cc.sys.localStorage.getItem("player"));
            this.clothes.now_player = 3;// 小蕊
        }
        else if(cc.sys.localStorage.getItem("player")==4){
            console.log(cc.sys.localStorage.getItem("player"));
            this.clothes.now_player = 4;// 阿宅
        }
        else if(cc.sys.localStorage.getItem("player")==5){
            console.log(cc.sys.localStorage.getItem("player"));
            this.clothes.now_player = 5;// 凯丽
        }
        else if(cc.sys.localStorage.getItem("player")==6){
            console.log(cc.sys.localStorage.getItem("player"));
            this.clothes.now_player = 6;// 詹姆斯
        }
        // else{
        //     // console.log(cc.sys.localStorage.getItem("player"));
        //     this.clothes.now_player = cc.sys.localStorage.getItem("player");
        // }

        // 在封面场景记录是否由封面场景跳进游戏 是的话弹出
        if (cc.sys.localStorage.getItem("cover")==1) {
            cc.sys.localStorage.setItem("cover", 2);
            this.once_cover=true;
            this.run = false;// 停止游泳
            if (cc.sys.localStorage.getItem("once_game")!=1) {
                this.wfsm.active=true;
            }
            this.button_change();// 弹出换衣界面
            // 时间判断
            this.myDate=new Date();
            if (this.myDate.getMonth()<10) {
                if (this.myDate.getDate()<10) {
                    this.now_time = "0" + this.myDate.getFullYear() + "0" + this.myDate.getMonth() + "0" + this.myDate.getDate();
                }
                else{
                    this.now_time = "0" + this.myDate.getFullYear() + "0" + this.myDate.getMonth() + this.myDate.getDate();
                }
            }
            else{
                if (this.myDate.getDate()<10) {
                    this.now_time = "0" + this.myDate.getFullYear() + this.myDate.getMonth() + "0" + this.myDate.getDate();
                }
                else{
                    this.now_time = "0" + this.myDate.getFullYear() + this.myDate.getMonth() + this.myDate.getDate();
                }
            }
            // console.log(this.now_time);// 现在的时间(字符串)
            this.new_world_time=Number(this.now_time);
            this.old_world_time=Number(cc.sys.localStorage.getItem("old_day"));
            if (this.new_world_time > this.old_world_time) {
                this.signin.active=true;// 弹出签到
            }
            // cc.sys.localStorage.setItem("world_time",this.new_world_time);
        }
    },

    start () {
        this.initAction();// 初始化按钮动作

        this.over.setPosition(-800,0);
        this.over_jishu=0;

        this.change_player();// 检测更换人物动画

        if (typeof wx === 'undefined') {
            return;
        }
    },

    change_player(){
        console.log(this.clothes.now_player);
        if(this.clothes.now_player == null || this.clothes.now_player == 1){
            // 播放麦克动画
            this.biti1.opacity = 0;
            this.biti2.opacity = 0;
            this.node.getComponent(cc.Animation).play();
            this.node.getComponent(cc.Animation).play("run");
        }
        else if (this.clothes.now_player == 2) {
            this.biti2.opacity = 0;
            this.node.getComponent(cc.Animation).play("run_afei");
        }
        else if (this.clothes.now_player == 3) {
            this.biti1.opacity = 0;
            this.node.getComponent(cc.Animation).play("run_xrui");
        }
        else if (this.clothes.now_player == 4) {
            this.biti1.opacity = 0;
            this.biti2.opacity = 0;
            this.node.getComponent(cc.Animation).play("run_azhai");
        }
        else if (this.clothes.now_player == 5) {
            this.biti1.opacity = 0;
            this.biti2.opacity = 0;
            this.node.getComponent(cc.Animation).play("run_kaili");
        }
        else if (this.clothes.now_player == 6) {
            this.biti1.opacity = 0;
            this.biti2.opacity = 0;
            this.node.getComponent(cc.Animation).play("run_james");
        }
    },

    update (dt) {
        // 地图向下移动
        if (this.run) {
            this.ground1.y-=this.speed;
            if(this.ground1.y<=-1480){
               this.ground1.y=1480;
            }
            this.ground2.y-=this.speed;
            if(this.ground2.y<=-1480){
               this.ground2.y=1480;
            }

            // this.player.x-=0.2;// 人物左右移动
            
            // *-*-*-*-* 生成预制体 *-*-*-*-*
            // 地图移动才会产生手电光
            this.dt_s++;
            if (this.dt_s>=this.spawnNew_time*60) {
                this.dt_s=0;// 重置计时
                this.spawnNew_guang();// 生成一个🐊左
                this.spawnNew_time=Math.random()*2+4;// 重置随机数
            }
            this.dt_s2++;
            if (this.dt_s2>=this.spawnNew_time2*60) {
                this.dt_s2=0;// 重置计时
                this.spawnNew_guang2();// 生成一个🐊右
                this.spawnNew_time2=Math.random()*2+4;// 重置随机数
            }
            this.dt_p_s++;
            if (this.dt_p_s>=this.police_spawnNew_time*60) {
                this.dt_p_s=0;// 重置计时
                this.spawnNew_police();// 生成一个🦀左
                this.police_spawnNew_time=Math.random()*4+6.5;// 重置随机数
            }
            this.dt_p_s2++;
            if (this.dt_p_s2>=this.police_spawnNew_time2*60) {
                this.dt_p_s2=0;// 重置计时
                this.spawnNew_police2();// 生成一个🦀右
                this.police_spawnNew_time2=Math.random()*4+6.5;// 重置随机数
            }
            this.dt_p_s3++;
            if (this.dt_p_s3>=this.police_spawnNew_time3*60) {
                this.dt_p_s3=0;// 重置计时
                this.spawnNew_police3();// 生成一个🐟
                this.police_spawnNew_time3=Math.random()*5+18;// 重置随机数
            }
            this.dt_l_s++;
            if (this.dt_l_s>=this.laser_spawnNew_time*60) {
                this.dt_l_s=0;// 重置计时
                this.spawnNew_laser();// 生成一个🌲
                this.laser_spawnNew_time=Math.random()*5+13;// 重置随机数
            }
            this.dt_b_s++;
            if (this.dt_b_s>=this.brid_spawnNew_time*60) {
                this.dt_b_s=0;// 重置计时
                this.spawnNew_brid();// 生成一个🦅
                this.brid_spawnNew_time=Math.random()*4+5;// 重置随机数
            }


            // 如果玩家活着分数增加
            if(this.player_live){
                this.dt_fenshu++;
                if(this.dt_fenshu>=60){
                    this.dt_fenshu=0;
                    this.score++;// 分数++
                    this.addScore();
                }
            }
        }
    },

    // 生成一个o2
    spawnNew_o2(){
        // 使用给定的模板在场景中生成一个新节点
        this.newO2 = cc.instantiate(this.o2);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(this.newO2,90);
        // 为手电光设置一个随机位置
        this.newO2.setPosition(0,-380);
        // 在手电光组件上暂存 Game 对象的引用
        this.newO2.getComponent('bar').game = this;
    },
    // 生成一个🐊左
    spawnNew_guang(){
        // 使用给定的模板在场景中生成一个新节点
        var newGuang = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        // this.node.addChild(newGuang,Math.random()*10+80);
        this.bottle.addChild(newGuang,Math.random()*10+20);
        // 为鳄鱼设置一个随机位置
        newGuang.setPosition(-320,900);
        // 在鳄鱼组件上暂存 Game 对象的引用
        newGuang.getComponent('Guang').game = this;
    },
    // 生成一个🐊右
    spawnNew_guang2(){
        // 使用给定的模板在场景中生成一个新节点
        var newGuang2 = cc.instantiate(this.starPrefab2);
        // 将新增的节点添加到 Canvas 节点下面
        // this.node.addChild(newGuang2,Math.random()*10+80);
        this.bottle.addChild(newGuang2,Math.random()*10+20);
        // 为鳄鱼设置一个随机位置
        newGuang2.setPosition(320,900);
        // 在鳄鱼组件上暂存 Game 对象的引用
        newGuang2.getComponent('Guang2').game = this;
    },
    // 生成一个🦀左
    spawnNew_police(){
        // 使用给定的模板在场景中生成一个新节点
        var newPolice = cc.instantiate(this.policePrefab);
        // 将新增的节点添加到 Canvas 节点下面
        // this.node.addChild(newPolice,Math.random()*70);
        this.bottle.addChild(newPolice,Math.random()*10+10);
        // 为螃蟹设置一个随机位置
        newPolice.setPosition(-250,720);
        // 在螃蟹组件上暂存 Game 对象的引用
        newPolice.getComponent("Police").game = this;
    },
    // 生成一个🦀右
    spawnNew_police2(){
        // 使用给定的模板在场景中生成一个新节点
        var newPolice2 = cc.instantiate(this.policePrefab2);
        // 将新增的节点添加到 Canvas 节点下面
        // this.node.addChild(newPolice2,Math.random()*70);
        this.bottle.addChild(newPolice2,Math.random()*10+10);
        // 为螃蟹设置一个随机位置
        newPolice2.setPosition(250,720);
        // 在螃蟹组件上暂存 Game 对象的引用
        newPolice2.getComponent("Police2").game = this;
    },
    // 生成一个食人鱼🐟
    spawnNew_police3(){
        // 使用给定的模板在场景中生成一个新节点
        var newPolice3 = cc.instantiate(this.policePrefab3);
        // 将新增的节点添加到 Canvas 节点下面
        // this.node.addChild(newPolice3,Math.random()*10+60);
        this.bottle.addChild(newPolice3,Math.random()*10);
        // 为食人鱼设置一个随机位置
        newPolice3.setPosition(150,720);
        // 在食人鱼组件上暂存 Game 对象的引用
        newPolice3.getComponent("Police3").game = this;
    },
    // 生成一个木头🌲
    spawnNew_laser(){
        // 使用给定的模板在场景中生成一个新节点
        var newLaser = cc.instantiate(this.policeLaser);
        // 将新增的节点添加到 Canvas 节点下面
        // this.node.addChild(newLaser,89);
        this.bottle.addChild(newLaser,30);
        // 为木头设置一个随机位置
        newLaser.setPosition(0,720);
        // 在木头组件上暂存 Game 对象的引用
        newLaser.getComponent("Laser").game = this;
    },
    // 生成一个水鸟🦅
    spawnNew_brid(){
        // 使用给定的模板在场景中生成一个新节点
        var newBrid = cc.instantiate(this.policeBird);
        // 将新增的节点添加到 Canvas 节点下面
        // this.node.addChild(newBrid,108);
        this.node.addChild(newBrid,108);
        // 在水鸟组件上暂存 Game 对象的引用
        newBrid.getComponent("Brid").game = this;
    },

    // 更新分数
    addScore(){
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score;
        cc.sys.localStorage.setItem("f_new", this.score); //存储数据
    },

    // 生成一个最高分预制体
    spawnNew_max(){
        // 使用给定的模板在场景中生成一个新节点
        this.new_Max = cc.instantiate(this.max);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(this.new_Max,101);
        // 为最高分设置一个随机位置
        this.new_Max.setPosition(0,25);
        // 在最高分组件上暂存 Game 对象的引用
        // new_Max.getComponent("Max").game = this;
        // 设置最高分数
        this.new_Max.getComponent(cc.Label).string = 'Best: ' + this.score_max;// \n 字符串换行

        var fens_dt=cc.delayTime(1.0);
        var fens_sto=cc.scaleTo(0.3,1.5,1.5);
        var fens_seq=cc.sequence([fens_dt,fens_sto]);
        this.new_Max.runAction(fens_seq);
        
        // ******************** 分数上传微信 **********************
        {
        var score=String(this.score_max);
        console.log(score);

        // 最高分数上传微信
        wx.setUserCloudStorage({
            KVDataList: [{key:'score', value: score }],

            success: res => {
                console.log(res);
                console.log("上传成功！！！");
                // var openDataContext = wx.getOpenDataContext();
                // openDataContext.postMessage({
                //     text:"updateWXData",// 自定义字符串
                // });
                this.shuaxin();// 刷新排行榜
            },
            fail: res => {
                console.log(res);
                console.log("上传失败！！！");
            },
        });
        }
        // ******************************************************
        
        // console.log("继续");
    },

    // 初始化金币金币
    initialize_gold(){
        if (cc.sys.localStorage.getItem("my_gold")==null || cc.sys.localStorage.getItem("my_gold")==0) {
            this.all_gold.string = 0;
            cc.sys.localStorage.setItem("my_gold", 0);
        }
        else{
            this.all_gold.string = cc.sys.localStorage.getItem("my_gold");
        }
    },

    // 增加金币
    update_gold(){
        // 增加金币
        this.add_gold.getComponent(cc.Label).string = '+ ' + this.score;
        this.old_gold = Number(cc.sys.localStorage.getItem("my_gold"));
        this.old_gold += this.score;
        cc.sys.localStorage.setItem("my_gold", this.old_gold); //存储数据
        this.initialize_gold();
    },

    gameOver() {
            cc.director.preloadScene('game_scenes');// 预加载场景
            this.delete_addBannerAd_1();//GG

            // *-*-*-*-* 停止声音 *-*-*-*-*
            this.audio_soures_sl.pause();// 停止水流声
            this.audio_soures_qianshui.getComponent(cc.AudioSource).stop();// 停止潜水声
            this.audio_soures_chushui.getComponent(cc.AudioSource).stop();// 停止呼吸声
            
            // 如果O2存在 删除O2
            if(this.in_w==false && this.newO2 !=null){
                this.newO2.getComponent("bar").delete_myself();
            }

            // if (this._revival==true) {
                // 没复活过
                // 弹出视频广告界面
                this.node.runAction(cc.sequence(
                    cc.delayTime(1),
                    cc.callFunc(function(){
                        this.guanggao.active=true;
                        }.bind(this)),
                    )
                )
            // }
            // else{
            //     // 复活过
            //     // 直接结束
            //     this.bufuhuo();
            // }
    },
    
    // 看视频复活
    shipin_fuhuo(){
        this.addRewardedVideoAd();// 播放视频 //GG
        // this.fuhuo();
    },

    // 复活
    fuhuo(){
        console.log("复活");
        this.audio_soures_sl.resume();// 播放水流声
        // this._revival=false;
        this.guanggao.active=false;
        // 清除鳄鱼 // 清除木桩 // 清除食人鱼 // 清除螃蟹

        // 初始化
        this.player_live=true;
        this.in_w=true;// O2初始化恢复
        this.run=true;// 地图恢复移动
        this.bottle.removeAllChildren(false);

        var fin = cc.fadeIn(0.05);
        this.player.runAction(fin);

        var fto_qs1 = cc.fadeTo(0.07,0);// 潜水动作
        var sto_qs1=cc.scaleTo(0.07,0);
        var spa_qs1=cc.spawn([fto_qs1,sto_qs1]);

        this.qianshui.runAction(spa_qs1);
    },

    // 不复活
    bufuhuo(){
        console.log("不复活");
        this.guanggao.active=false;

        if(this.over_jishu==0){
            this.over_jishu++;// 死亡只进来一次

            var fto1 = cc.fadeTo(0.3, 128);
            var fto2 = cc.fadeTo(0.3, 0);
            var actionH=cc.sequence([fto1,fto2]);
            var repH=cc.repeatForever(actionH);
            this.hong.runAction(repH);

            // 分数保存 (数据获取为字符 需要转成字符串)
            this.score_new=Number(cc.sys.localStorage.getItem("f_new")); //读取新数据
            this.score_max=Number(cc.sys.localStorage.getItem("f_max")); //读取旧数据

            if( this.score_new >= this.score_max ){// 如果新的大于旧的
                cc.sys.localStorage.setItem("f_max", this.score_new);// 更新旧的最大
                this.score_max=cc.sys.localStorage.getItem("f_max"); // 读取最大
            }
            else{
                this.score_max=cc.sys.localStorage.getItem("f_max"); // 直接读取最大
            };
            console.log("历史最大分数："+this.score_max);

            if (this.score_max>=100) {//**************修改碰撞检测机制 */
                // 分数大于100 解锁凯丽
                cc.sys.localStorage.setItem("jie_suo_kaili", 1);// 解锁
            }

            // over死亡结束动画
            // 延时1秒
            var over_dt=cc.delayTime(1.0);
            // over运动到屏幕中心
            var over_mTo=cc.moveTo(0.3,0,0);
            // 出现排行榜
            var call_func_p =cc.callFunc(function(){
                this.button_paihangbang();
                this.over.active=false;
                
            }.bind(this))

            var over_seq=cc.sequence([over_dt,over_mTo,call_func_p]);
            this.over.runAction(over_seq);

            // 更新金币
            this.update_gold();

            // 创建最高分数预制体
            this.spawnNew_max();
        }
    },

    // Banner广告(排行榜下方)
    addBannerAd(){
        this.delete_addBannerAd();
        console.log("添加排行榜广告了");
        this._bannerAd = wx.createBannerAd({
            adUnitId: 'adunit-db02fadfef49d120',
            style: {
              left: 0,
              top: 0,
              width: 1280,
              height: 720
            }
        })
        this._bannerAd.onResize(res => {
            var phone = wx.getSystemInfoSync();
            var w = phone.screenWidth / 2;
            var h = phone.screenHeight;

            this._bannerAd.style.left = w - this._bannerAd.style.realWidth/2;//+0.1;
            this._bannerAd.style.top = h - this._bannerAd.style.realHeight;//+0.1;
            this._bannerAd.style.width = w*0.8;
            this._bannerAd.style.height = w*0.8;
            // console.log("bannerAd加载成功");
        });
        this._bannerAd.onLoad(() => {
            // console.log('banner 广告加载成功')
        })
        this._bannerAd.onError(err => {
            // console.log('banner 广告加载失败');
            console.log(err)
        })
        this._bannerAd.show();
    },
    delete_addBannerAd(){
        if (this._bannerAd!=null) {
            this._bannerAd.destroy();
            this._bannerAd=null;
            console.log("删除排行榜广告了");
        }
    },
    // Banner广告(屏幕下方广告)
    addBannerAd_1(){
        this.delete_addBannerAd_1();
        console.log("添加下方广告 1 了");
        this._bannerAd_1 = wx.createBannerAd({
            adUnitId: 'adunit-249b9e98791ff358',
            style: {
              left: 0,
              top: 0,
              width: 1280,
              height: 720
            }
        })
        this._bannerAd_1.onResize(res => {
            var phone = wx.getSystemInfoSync();
            var w = phone.screenWidth / 2;
            var h = phone.screenHeight;
            this._bannerAd_1.style.left = w - this._bannerAd_1.style.realWidth/2;//+0.1;
            this._bannerAd_1.style.top = h - this._bannerAd_1.style.realHeight;//+0.1;
            this._bannerAd_1.style.width = w*0.6;
            this._bannerAd_1.style.height = w*0.6;
        });
        this._bannerAd_1.onLoad(() => {
        })
        this._bannerAd_1.onError(err => {
            console.log(err)
        })
        this._bannerAd_1.show();
    },
    delete_addBannerAd_1(){
        if (this._bannerAd_1!=null) {
            this._bannerAd_1.destroy();
            this._bannerAd_1=null;
            console.log("删除下方广告 1 了");
        }
    },
    addBannerAd_2(){
        this.delete_addBannerAd_2();
        console.log("添加下方广告 2 了");
        this._bannerAd_2 = wx.createBannerAd({
            adUnitId: 'adunit-57a3de3c679f8b96',
            style: {
              left: 0,
              top: 0,
              width: 1280,
              height: 720
            }
        })
        this._bannerAd_2.onResize(res => {
            var phone = wx.getSystemInfoSync();
            var w = phone.screenWidth / 2;
            var h = phone.screenHeight;
            this._bannerAd_2.style.left = w - this._bannerAd_2.style.realWidth/2;//+0.1;
            this._bannerAd_2.style.top = h - this._bannerAd_2.style.realHeight;//+0.1;
            this._bannerAd_2.style.width = w*0.6;
            this._bannerAd_2.style.height = w*0.6;
        });
        this._bannerAd_2.onLoad(() => {
        })
        this._bannerAd_2.onError(err => {
            console.log(err)
        })
        this._bannerAd_2.show();
    },
    delete_addBannerAd_2(){
        if (this._bannerAd_2!=null) {
            this._bannerAd_2.destroy();
            this._bannerAd_2=null;
            console.log("删除下方广告 2 了");
        }
    },
    addBannerAd_3(){
        this.delete_addBannerAd_3();
        console.log("添加下方广告 3 了");
        this._bannerAd_3 = wx.createBannerAd({
            adUnitId: 'adunit-4f91dd2e5f9066e7',
            style: {
              left: 0,
              top: 0,
              width: 1280,
              height: 720
            }
        })
        this._bannerAd_3.onResize(res => {
            var phone = wx.getSystemInfoSync();
            var w = phone.screenWidth / 2;
            var h = phone.screenHeight;
            this._bannerAd_3.style.left = w - this._bannerAd_3.style.realWidth/2;//+0.1;
            this._bannerAd_3.style.top = h - this._bannerAd_3.style.realHeight;//+0.1;
            this._bannerAd_3.style.width = w*0.6;
            this._bannerAd_3.style.height = w*0.6;
        });
        this._bannerAd_3.onLoad(() => {
        })
        this._bannerAd_3.onError(err => {
            console.log(err)
        })
        this._bannerAd_3.show();
    },
    delete_addBannerAd_3(){
        if (this._bannerAd_3!=null) {
            this._bannerAd_3.destroy();
            this._bannerAd_3=null;
            console.log("删除下方广告 3 了");
        }
    },
    // 激励视频广告
    addRewardedVideoAd(){
        console.log("添加激励视频广告");
        this.rewardedVideoAd = wx.createRewardedVideoAd({adUnitId: 'adunit-be4941339fb24741'});// 初始化组件

        this.rewardedVideoAd.onLoad(() => {
            console.log('激励视频 广告加载成功')
        })
        this.rewardedVideoAd.onError(err => {
            console.log('激励视频 广告加载失败')
            console.log(err)
        })

        // this.rewardedVideoAd.show().catch(err => {
        //     this.rewardedVideoAd.load()
        //       .then(() => this.rewardedVideoAd.show())
        // })

        this.rewardedVideoAd.load()
        .then(() => this.rewardedVideoAd.show())
        .catch(err => console.log(err.errMsg))

        this.rewardedVideoAd.onClose(res => {
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
              // 正常播放结束，可以下发游戏奖励
                console.log("发放奖励");
                this.fuhuo();
            } else {
              // 播放中途退出，不下发游戏奖励
                console.log("中途退出");
            }
        })
    },

    // 返回主页
    gameOver_back(){
        var over_mto2=cc.moveTo(0.3,800,0);
        var over_func_back=cc.callFunc(function(){
            this.new_Max.getComponent("Max").delete_self();
            cc.director.loadScene('start_scenes');
        }.bind(this));
        var over_seq_back=cc.sequence([over_mto2,over_func_back]);
        this.over.runAction(over_seq_back);
    },

    // 再来一次
    gameOver_again(){
        this.delete_addBannerAd_2();//GG
        cc.find("Canvas/goldbg/gold").getComponent(cc.Label).string = cc.sys.localStorage.getItem("my_gold");
        var over_mto2=cc.moveTo(0.3,800,0);
        var over_func_again=cc.callFunc(function(){
            this.new_Max.getComponent("Max").delete_self();
            cc.director.loadScene('game_scenes');
        }.bind(this));
        var over_seq_again=cc.sequence([over_mto2,over_func_again]);
        this.over.runAction(over_seq_again);
    },

    zhuadaole(){
        // 抓到玩家
        // 如果人物显示为true
        if (this.palyer_onshow==true) {
            this.audio_soures_zhuadaole.getComponent(cc.AudioSource).play();
            console.log("被抓了");
            // this.audio_soures_wood.play();
            this.run=false;// 地图停止移动
            this.player_live=false;// gameOver
            this.gameOver();
        }
    },

    shirenyu(){
        // 抓到玩家
        this.audio_soures_zhuadaole.getComponent(cc.AudioSource).play();
        console.log("被抓了");
        // this.audio_soures_wood.play();
        this.run=false;// 地图停止移动
        this.player_live=false;// gameOver
        this.gameOver();
    },

    zhuangle(){
        // 抓到玩家
        // 如果人物显示为true
        if (this.palyer_onshow==true) {
            console.log("被抓了");
            // this.audio_soures_wood.play();
            this.run=false;// 地图停止移动
            this.player_live=false;// gameOver
            this.gameOver();
        }
    },

    biesile(){
        this.player_live=false;// gameOver

        this.player.opacity=255;
        this.qianshui.opacity=0;

        this.gameOver();
    },

    /* 设置按钮 */
    button_shezhi(){},

    /* 分享按钮 */
    button_fenxiang(){
        console.log("点击分享了");
        cc.loader.loadRes("res/share",function(err,data){
            console.log("进入加载了");
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
    },
    
    // 初始排行榜动作
    initAction () {
        // 初始
        // this._isShow = false;

        // 显示动作
        this._showAction = cc.callFunc(function(){
            this.fenxiang_button.active=true;
            this.updata_button.active=true;
            this.wxSubContextView.getComponent(cc.WXSubContextView).enabled = true;
            this.wxSubContextView.opacity=255;this.over.active=false;}.bind(this));
        
        // 隐藏动作
        this._hideAction=cc.callFunc(function(){
            this.fenxiang_button.active=false;
            this.updata_button.active=false;
            this.wxSubContextView.getComponent(cc.WXSubContextView).enabled = false;
            this.over.active=true;this.wxSubContextView.opacity=0;}.bind(this));
    },

    /* 排行榜按钮 */
    button_paihangbang(){
        this.wxSubContextView.runAction(this._showAction);// 显示
        this.addBannerAd();//GG
        // this._isShow = !this._isShow;
        // if (this._isShow) {
        // }
        // else {
        // }
    },

    /* 关闭排行榜按钮 */
    button_guanbi_paihangbang(){
        this.delete_addBannerAd();//GG
        this.addBannerAd_2();//GG
        this.wxSubContextView.runAction(this._hideAction);// 隐藏
        // 游戏盒子
        this.heziopen.active=true;
    },

    // 刷新按钮
    shuaxin(){
        this.wxSubContextView.getComponent(cc.WXSubContextView).enabled = true;
        // 主域向子域发送消息
        // 让子域更新当前用户的最高分，因为主域无法得到getUserCloadStorage;
        var openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage({
            text:"updateWXData",// 自定义字符串
        });
    },

    // 游戏盒子按钮
    button_heziopen(){
        this.hezi.active=true;
    },

    // 换装按钮
    button_change(){
        this.run = false;
        this.hezi.active=false;

        this.delete_addBannerAd_2();//GG
        this.addBannerAd_3();//GG

        this.clothes_node.getComponent("clothes").suo();
        cc.find("Canvas/clothes").active=true;
        cc.find("Canvas/clothes/goldsp2/gold2").getComponent(cc.Label).string = cc.sys.localStorage.getItem("my_gold");
    },

    button_wfsm(){
        cc.sys.localStorage.setItem("once_game", 1);
        this.run=true;
        this.wfsm.active=false;
    },
});
