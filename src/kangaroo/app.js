
var platformHeight = 140;

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
    showDefeatAd: function(){
        adsNext --;
        if ( haveAds && typeof sdkbox !== 'undefined' && adsNext <= 0 ){
            sdkbox.PluginAdMob.show('gameover');
            adsNext = 3;
        }
    },
    ctor:function () {
        this._super();
        var size = cc.winSize;
        this.scheduleUpdate();
        this.status = 'running';
        this.platforms = [];


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

        this.header.setPosition(0,size.height - 50);
        this.header.setContentSize(size.width, 50);


        this.jump = {};
        this.jump.record = 0;
        this.bglayer = new BGLayer();


        this.addChild(this.bglayer);

        this.layer = cc.Layer.create();


        this.addChild ( this.layer );


        var record = cc.sys.localStorage.getItem("Record");
        if ( record !== null && record !== "" ){
            this.jump.record = parseInt(record);
        }



        this.jump.platformX = 400;

        this.addPlatform( this.jump.platformX, platformHeight, 0 );
        this.pressed = false;
        this.pressedDuration = 0;





        this.kangaroo = new Kangaroo();
        this.kangaroo.setPosition(this.jump.platformX, 330);

        this.layer.addChild( this.kangaroo );
        this.jump.currentPlatform = null;


        this.kangaroo.setFrame(2);


        this.jump.pos = {x: this.jump.platformX, y: 330};
        this.jump.prepos = {x: this.jump.platformX, y: 330};

        this.jump.score = 0;
        this.jump.accel = {x: 0, y: 0};
        this.jump.static = false;



        var that = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(){
              if ( that.jump.static ) {
                  that.pressed = true;
                  that.pressedDuration = 0;
                  return true;
              }
              else {
                  return false;
              }
            },
            onTouchMoved: function(){

            },
            onTouchEnded: function(){
              console.log(that);
              cc.log('Up');
              if ( that.pressed ) {
                  that.pressed = false;
                  that.jump.power = that.pressedDuration;
                  that.jump.static = false;
                  that.jump.accel.y = that.jump.power * 3000;
                  that.jump.accel.x = 500;
                  that.jump.currentPlatform = null

                  that.kangaroo.runAnimate();
                  that.addSmoke(that.kangaroo.x, that.kangaroo.y, 20);
                  that.pressedDuration = 0;

                  cc.audioEngine.playEffect(res.jump_wav);
                  return true;
              }
              else {
                  return false;
              }
            }
        }, that);


        return true;
    },



    update: function(dt){
        var size = cc.winSize;
        this.header.setScore( this.jump.score );
        if ( this.pressed ){
          this.pressedDuration += dt;
          if ( this.pressedDuration > 1 ){
            this.pressedDuration = 1;
          }
        }
        else {
          this.pressedDuration=0;
        }

        // Moving Layer
        var layerX = this.layer.x - dt * 100;
        var layerY = this.layer.y;
        this.layer.setPosition(cc.p(layerX,layerY));






        // Platform Pressing
        if ( this.status === 'running' && this.jump.currentPlatform ) {
            var platform = this.jump.currentPlatform;
            if ( platform ) {
                var x = platform.x;
                var y = platform.y;

                if (this.pressed) {
                    y -= dt * 100;
                }
                platform.setPosition(cc.p(x, y));
            }
        }








        if ( this.status === 'running' ) {

            this.jump.prepos.x = this.jump.pos.x;
            this.jump.prepos.y = this.jump.pos.y;

            this.jump.pos.x += this.jump.accel.x * dt;
            this.jump.pos.y += this.jump.accel.y * dt;
            /*
            if ( this.jump.accel.y < -60 / dt ){
                this.jump.accel.y = -60 / dt;
            }*/


            if ( this.jump.static ){
                if ( this.jump.currentPlatform ) {
                    var platform = this.jump.currentPlatform;
                    if ( platform ) {
                        this.jump.pos.y = platform.y + 35;
                        this.jump.accel.y = 0;
                        this.jump.accel.x = 0;
                    }
                }
            }
            else {
                this.jump.accel.y -= 5000 * dt;
            }

        }

        for ( var i = 0; i < this.platforms.length; i ++ ){
            var platform = this.platforms[i];

            // Check intersection


            var p1s = cc.p( this.jump.prepos.x, this.jump.prepos.y );
            var p1e = cc.p( this.jump.pos.x, this.jump.pos.y );

            var p2s = cc.p( platform.x - platform.width, platform.y + 35);
            var p2e = cc.p( platform.x + platform.width, platform.y + 35);

            var result = Util.checkLineIntersection(p1s, p1e, p2s, p2e );

            if ( result ){


                this.jump.static = true;
                this.jump.pos.x = result.x;
                this.jump.pos.y = result.y;
                this.jump.currentPlatform = platform;

                if ( !platform.used ) {
                    this.jump.score++;
                    platform.used = true;
                    cc.audioEngine.playEffect(res.ding_wav);
                    this.addHeart( this.kangaroo.x, this.kangaroo.y, 2);
                }
            }


            // Platform raising
            if ( ( this.jump.currentPlatform != platform || !this.pressed ) && platform.y < platform.platformHeight && platform.x + this.layer.x < 500 ){
                var x = platform.x;
                var y = platform.y + 500 * dt;
                platform.setPosition( cc.p(x,y));
            }


            // Platform disappearing
            if ( platform.x + this.layer.x < -200 ){
                this.platforms.splice(i,1);
                if ( this.jump.currentPlatform === platform ){
                    this.jump.currentPlatform = null;
                    this.jump.static = false;
                }
                i--;
                this.layer.removeChild(platform, true);
            }
        }

        this.kangaroo.setPosition(cc.p(this.jump.pos.x,this.jump.pos.y));


        // Adding Platform


        if ( this.jump.platformX + this.layer.x < 350 ){
          this.jump.platformX += Util.randomInt( 120,400 );
          var height = Util.randomInt( 140,240 );
          var type = Util.randomInt( 0,1 );
          this.addPlatform( this.jump.platformX, height, type, true );
        }

        // Check Defeat

        if ( this.status === 'running' && this.kangaroo.y < - 100 ){
          this.status = 'defeat';

            cc.audioEngine.playEffect(res.error_wav);
          if ( this.jump.score > this.jump.record ) {
              this.jump.record = this.jump.score;
              cc.sys.localStorage.setItem("Record", this.jump.score);
          }

          this.showDefeatAd();
          var defeatLayer = new DefeatLayer( this.jump.score, this.jump.record );
          this.addChild(defeatLayer);
        }

    },
    addSmoke: function(x, y, count){

      for ( var i = 0; i < count; i ++ ){
        var smoke = new cc.Sprite( res.smoke_png );
        var moveBy = cc.moveBy( 1, Util.randomCircle(30,-50,0) );
        var moveFade = cc.spawn( moveBy, cc.fadeOut(1) ).easing(cc.easeExponentialOut());
        var seq = cc.sequence( moveFade, cc.removeSelf() );
        smoke.setScale(3);
        smoke.texture.setAliasTexParameters();
        smoke.runAction(seq);
        smoke.setPosition( cc.p(x,y));
        this.layer.addChild( smoke );
      }
    },
    addHeart: function(x, y, count){

        for ( var i = 0; i < count; i ++ ){
            var smoke = new cc.Sprite( res.heart_png );
            var moveBy = cc.moveBy( 2, cc.p(0,20) );
            var moveFade = cc.spawn( moveBy, cc.fadeOut(2) ).easing(cc.easeExponentialOut());
            var seq = cc.sequence( moveFade, cc.removeSelf() );
            smoke.setScale(2);
            smoke.texture.setAliasTexParameters();
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
            sdkbox.PluginAdMob.cache("gameover");
        }
        //
                                    /*
                                    sdkbox.PluginSdkboxAds.placement("banners");
                                    sdkbox.PluginSdkboxAds.playAd("AdMob", "home");
                                    sdkbox.PluginSdkboxAds.playAd("AdMob", "gameover");*/
    }
});
