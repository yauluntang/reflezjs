

var TitleLayer = cc.Layer.extend({


    ctor:function () {
        this._super();
        var size = cc.winSize;
        this.bglayer = new BGLayer();
        this.addChild(this.bglayer);

        setTimeout(function(){cc.audioEngine.playMusic(res.bunny_mp3, true)},2000);

        this.title = new cc.Sprite(res.title_png);
        this.addChild(this.title);
        this.title.setPosition( cc.p( size.width / 2, size.height * 2 / 3 ) );
        this.title.texture.setAliasTexParameters();
        this.title.setScale(3);


        this.playbutton = new PlayButton();
        this.playbutton.setPosition( cc.p( size.width / 2, size.height * 2 / 3 - 250 ) );


        var record = cc.sys.localStorage.getItem("Record");

        if ( record !== null && record !== "" ){
            this.helloLabel = new cc.LabelBMFont( "Record "+record, res.nocontinue_fnt);


            this.helloLabel.setScale(2);

            //this.helloLabel.texture.setAliasTexParameters();
            this.helloLabel.setAnchorPoint(0.5,0.5);
            this.helloLabel.setPosition(cc.p( size.width / 2, size.height * 2 / 3 - 150 ) )

            this.addChild( this.helloLabel );
        }

        if ( haveAds && typeof sdkbox !== 'undefined' ){
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

        this.addChild( this.playbutton);
    }
});

var TitleScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new TitleLayer();
        this.addChild(layer);


        if ( haveAds && typeof sdkbox !== 'undefined' ){
            sdkbox.PluginAdMob.cache("home");
        }

    }
});
