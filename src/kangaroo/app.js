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




        this.layer = cc.Layer.create();
        this.addChild ( this.layer );


        this.platform = new Platform();
        this.platform.setPosition(240,100);

        this.layer.addChild ( this.platform );


        var action = cc.MoveBy.create(2,cc.p(-100,0));
        this.layer.runAction(action);




        this.kangaroo = new Kangaroo();
        this.kangaroo.setPosition(40,50);

        this.layer.addChild( this.kangaroo );


        var action = cc.MoveBy.create(2,cc.p(100,0));
        this.kangaroo.runAction(action);

/*
        var action = cc.MoveBy.create(2,cc.p(0,-100));
        this.layer.runAction(action);


        var kanaction = cc.MoveBy.create(2,cc.p(0,100));
        this.kangaroo.runAction(kanaction);
*/

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
