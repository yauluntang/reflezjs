var KangarooLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        this.scheduleUpdate();

        this.header = new HeaderLayer();
        this.addChild( this.header, 100 );

        this.header.setPosition(0,size.height - 40);
        this.header.setContentSize(size.width, 40);


        return true;
    },



    update: function(dt){
        var size = cc.winSize;
    }
});

var KangarooScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new KangarooLayer();
        this.addChild(layer);
    }
});
