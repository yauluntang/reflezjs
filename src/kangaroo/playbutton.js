var PlayButton = cc.Node.extend({

    onMenuCallback: function () {
        cc.director.runScene(new KangarooScene());
    },
    ctor: function (normalSprite, activeSprite, callback) {
        this._super();
        var play = new cc.Sprite(res.playbutton_png);
        var playactive = new cc.Sprite(res.playbutton_active_png);
        play.texture.setAliasTexParameters();
        playactive.texture.setAliasTexParameters();
        this.playbutton = new CurryButton(play, playactive, this.onMenuCallback);
        this.playbutton.setScale(3);

        this.addChild(this.playbutton);
    }
});