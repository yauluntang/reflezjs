
var MazeLayer = cc.Layer.extend({
    sprite:null,


    ctor:function () {
        this._super();
        var size = cc.winSize;
        this.scheduleUpdate();
        this.status = 'running';


        return true;
    },



    update: function(dt){
        var size = cc.winSize;


    }
});

var MazeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MazeLayer();
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
