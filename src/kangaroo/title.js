

var TitleLayer = cc.Layer.extend({

    onMenuCallback: function(){
        cc.director.runScene(new KangarooScene());
    },
    ctor:function () {
        this._super();
        var size = cc.winSize;
        this.bglayer = new BGLayer();
        this.addChild(this.bglayer);

        cc.audioEngine.playMusic(res.bunny_mp3, true);

        this.title = new cc.Sprite(res.title_png);
        this.addChild(this.title);
        this.title.setPosition( cc.p( size.width / 2, size.height * 2 / 3 ) );
        this.title.texture.setAliasTexParameters();
        this.title.setScale(3);


        this.playbutton = new PlayButton();
        this.playbutton.setPosition( cc.p( size.width / 2, size.height * 2 / 3 - 250 ) );


        var record = cc.sys.localStorage.getItem("Record");

        if ( record !== null && record !== "" ){
            this.helloLabel = new cc.LabelBMFont( "Record "+record, res.nocontinue_fnt, cc.size(size.width * 2 - 20, 80), cc.TEXT_ALIGNMENT_LEFT);
            this.addChild( this.helloLabel );
            this.helloLabel.texture.setAliasTexParameters();
            this.helloLabel.setScale(2);
            this.helloLabel.setAnchorPoint(0.5,0.5);
            this.helloLabel.setPosition(cc.p( size.width / 2, size.height * 2 / 3 - 150 ) )
        }

        this.addChild( this.playbutton);
    }
});

var TitleScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new TitleLayer();
        this.addChild(layer);
        if ( typeof sdkbox !== 'undefined' ){
            sdkbox.PluginAdMob.cache("home");
        }

    }
});
