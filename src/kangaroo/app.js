
const platformHeight = 140;

var KangarooLayer = cc.Layer.extend({
    sprite:null,


    addPlatform: function(x, y, type, easeIn){
      var platform = new Platform(type, y);

      if ( easeIn ){
        platform.setPosition(x,-100);
        //var moveTo = cc.moveTo(1, cc.p(x,10)).easing(cc.easeBackIn());
      //var ease = new cc.EaseInOut(moveBy);
        //platform.runAction(moveTo);
      }
      else {
        platform.setPosition(x,y);
      }
      platform.setScale(3);
      this.layer.addChild ( platform , -1);
      this.platforms.push( platform );
    },
    ctor:function () {
        this._super();
        var size = cc.winSize;
        this.scheduleUpdate();
        this.status = 'running';
        this.platforms = [];


        if ( typeof sdkbox !== 'undefined' ){
            sdkbox.PluginAdMob.init();
            sdkbox.PluginAdMob.setListener({
                   adViewDidReceiveAd : function(name) {
                   cc.log("AdMob adViewDidReceiveAd " + name);
                        if ( name === 'home' ){
                            sdkbox.PluginAdMob.show(name);
                        }
                   },
                   adViewDidFailToReceiveAdWithError : function(name, msg) {
                   cc.log("AdMob adViewDidFailToReceiveAdWithError " + name +":" + msg);
                   },
                   adViewWillPresentScreen : function(name) {
                   cc.log("AdMob adViewWillPresentScreen " + name);
                   },
                   adViewDidDismissScreen : function(name) { },
                   adViewWillDismissScreen : function(name) { },
                   adViewWillLeaveApplication : function(name) { },
                   reward: function(name, currency, amount){

                   }
                   });
            }


                                    /*
        sdkbox.PluginSdkboxAds.init();
        sdkbox.PluginSdkboxAds.setListener({
           onAdAction : function(ad_unit_id, zone_location_place_you_name_it, action_type) {
           cc.log("onAdAction, ad_unit_id: " + String(ad_unit_id) + ", zone_location_place_you_name_it: " + String(zone_location_place_you_name_it) + ", action_type: " + String(action_type));
           },
           onRewardAction : function(ad_unit_id, zone_id, reward_amount, reward_succeed) {
           cc.log("onRewardAction, ad_unit_id: " + String(ad_unit_id) + ", zone_id: " + String(zone_id) + ", reward_amount: " + String(reward_amount) + ", reward_succeed: " + String(reward_succeed));
           }
           });*/


        this.header = new HeaderLayer();
        this.addChild( this.header, 100 );

        this.header.setPosition(0,size.height - 40);
        this.header.setContentSize(size.width, 40);


        this.jump = {};

        this.bglayer = cc.Layer.create();

        this.bg = cc.Sprite.create(res.bg_png);
        this.bg.setScale(3);
        this.bg.texture.setAliasTexParameters();
        this.bg.setAnchorPoint(cc.p(0,0));
        this.bg.setPosition(cc.p(1440,0));
        this.bglayer.addChild(this.bg);


        this.bg2 = cc.Sprite.create(res.bg_png);
        this.bg2.setPosition(cc.p(0,0));
        this.bg2.texture.setAliasTexParameters();
        this.bg2.setAnchorPoint(cc.p(0,0));
        this.bg2.setScale(3);
        this.bglayer.addChild(this.bg2);

        this.bgscroll = 0;


        this.addChild(this.bglayer);

        this.layer = cc.Layer.create();


        this.addChild ( this.layer );






/*
        this.platform = new Platform();
        this.platform.setPosition(140,140);
        this.platform.setScale(3);
        this.layer.addChild ( this.platform );
*/

        this.jump.platformX = 100;

        this.addPlatform( 100, platformHeight, 0 );
        this.pressed = false;
        this.pressedDuration = 0;






        //var action = cc.MoveBy.create(2,cc.p(-100,0));
        //this.layer.runAction(action);






        this.kangaroo = new Kangaroo();
        this.kangaroo.setPosition(this.jump.platformX, 330);

        this.layer.addChild( this.kangaroo );
        this.jump.currentPlatform = 0;

        //var action = cc.MoveBy.create(2,cc.p(100,0));
        //this.kangaroo.runAction(action);

        this.kangaroo.setFrame(2);


        this.jump.pos = {x: this.jump.platformX, y: 230};
        this.jump.accel = {x: 0, y: 0};
        this.jump.static = true;


        //var action = cc.MoveBy.create(50,cc.p(-1000,0));
        //this.layer.runAction(action);
/*

        var kanaction = cc.MoveBy.create(2,cc.p(0,100));
        this.kangaroo.runAction(kanaction);
*/


        var that = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(){
              console.log(that);
              cc.log('Down');
              that.pressed = true;
              that.pressedDuration = 0;
              return true;
            },
            onTouchMoved: function(){

            },
            onTouchEnded: function(){
              console.log(that);
              cc.log('Up');
              that.pressed = false;
              that.jump.power = that.pressedDuration;

              that.jump.accel.y = that.jump.power * 3000;
              that.jump.accel.x = 500;
              that.kangaroo.runAnimate();
              that.addSmoke(that.kangaroo.x, that.kangaroo.y, 20);
              that.pressedDuration = 0;
              return true;
            }
        }, that);



                                    /*
        cc.eventManager.addListener( cc.EventListener.create({
                 event: cc.EventListener.TOUCH_ONE_BY_ONE,
                 swallowTouches: false,
                 onTouchBegan: function(touch, event) {
                   cc.log('touch down');
                   return handleDown.call (that );
                 },
                 onTouchMoved: function(touch, event) {
                   return handleDown.call( that );
                 },
                 onTouchEnded: function(touch, event)  {
                   cc.log('touch up');
                   return handleUp.call( that );
                 }

                 }), that );*/
/*
        cc.eventManager.addListener( cc.EventListener.create({
          event:cc.EventListener.MOUSE,
          onMouseDown: function (event){
            cc.log('mouse down');
            return handleDown.call( that );
          },
          onMouseUp: function (event){
            cc.log('mouse up');
            return handleUp.call( that );
          }
        }), this);*/


        return true;
    },



    update: function(dt){
        var size = cc.winSize;
        this.header.setScore( this.jump.currentPlatform );
        if ( this.pressed ){
          this.pressedDuration += dt;
          if ( this.pressedDuration > 1 ){
            this.pressedDuration = 1;
          }
        }
        else {
          this.pressedDuration=0;
        }

        var layerX = this.layer.x - dt * 50;
        var layerY = this.layer.y;
        this.layer.setPosition(cc.p(layerX,layerY));

        var bglayerX = this.bglayer.x - dt * 20;
        var bglayerY = this.bglayer.y;
        this.bglayer.setPosition(cc.p(bglayerX,bglayerY));

        this.bgscroll += dt * 20;

        if ( this.bgscroll > 1440 ){
          this.bgscroll -= 1440;
          this.bg.setPosition(cc.p(this.bg.x+1440,this.bg.y));
          this.bg2.setPosition(cc.p(this.bg2.x+1440,this.bg2.y));
        }


        //cc.log(this.pressedDuration);

        var x = this.platforms[this.jump.currentPlatform ].x;
        var y = this.platforms[this.jump.currentPlatform ].y;

        if ( this.pressed ){
          y-= dt * 100;
        }


        this.platforms[ this.jump.currentPlatform ].setPosition(cc.p(x,y));




        //this.kangaroo.setPosition(50,230-this.pressedDuration);

        this.jump.static = false;

        this.jump.pos.x += this.jump.accel.x * dt;
        this.jump.pos.y += this.jump.accel.y * dt;

        for ( var i = 0; i < this.platforms.length; i ++ ){
          var platform = this.platforms[i];

          if ( this.jump.pos.x > platform.x - platform.width && this.jump.pos.x < platform.x + platform.width && this.jump.pos.y > platform.y + 10 && this.jump.pos.y < platform.y + 40 ){
            this.jump.static = true;
            this.jump.pos.y = platform.y + 40;
            this.jump.currentPlatform = i;
          }

          if ( ( i !== this.jump.currentPlatform || !this.pressed ) && platform.y < platform.platformHeight && platform.x + this.layer.x < 500 ){
            var x = platform.x;
            var y = platform.y + 500 * dt;
            platform.setPosition( cc.p(x,y));
          }
        }

        if ( this.jump.static ){
          this.jump.accel.y = 0;
          this.jump.accel.x = 0;
        }
        else {
          this.jump.accel.y -= 5000 * dt;
        }
        this.kangaroo.setPosition(cc.p(this.jump.pos.x,this.jump.pos.y));


        /*
        if ( this.kangaroo.x > this.platform.x - 50 && this.kangaroo.x < this.platform.x + 50 && this.kangaroo.y > this.platform.y && this.kangaroo.y < this.platform.y + 50 ){
          this.jump.accely = 0;
        }
        else {
          this.jump.accely += 1;
        }

        this.kangaroo.position.x;*/


        if ( this.jump.platformX + this.layer.x < 350 ){
          this.jump.platformX += Util.randomInt( 120,400 );

          let height = Util.randomInt( 140,240 );


          let type = Util.randomInt( 0,1 );
          this.addPlatform( this.jump.platformX, height, type, true );
        }

        if ( this.status === 'running' && this.kangaroo.y < - 100 ){
          this.status = 'defeat';
          var defeatLayer = new DefeatLayer();
          this.addChild(defeatLayer);
        }

    },
    addSmoke: function(x, y, count){

      for ( let i = 0; i < count; i ++ ){
        console.log('adding smoke')
        let smoke = new cc.Sprite( res.smoke_png );
        let moveBy = cc.moveBy( 1, Util.randomCircle(30,-50,0) );
        let moveFade = cc.spawn( moveBy, cc.fadeOut(1) ).easing(cc.easeExponentialOut());
        let seq = cc.sequence( moveFade, cc.removeSelf() );
        smoke.setScale(3);
        smoke.runAction(seq);
        smoke.setPosition( cc.p(x,y));
        this.layer.addChild( smoke );
      }
    }
});

var KangarooScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new KangarooLayer();
        this.addChild(layer);
        if ( typeof sdkbox !== 'undefined' ){
                sdkbox.PluginAdMob.cache("home");
                                    }
        //sdkbox.PluginAdMob.show("gameover");
                                    /*
                                    sdkbox.PluginSdkboxAds.placement("banners");
                                    sdkbox.PluginSdkboxAds.playAd("AdMob", "home");
                                    sdkbox.PluginSdkboxAds.playAd("AdMob", "gameover");*/
    }
});
