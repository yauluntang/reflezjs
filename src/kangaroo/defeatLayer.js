
var DefeatLayer = cc.Layer.extend({

    onMenuCallback: function () {
        cc.director.runScene(new KangarooScene());
    },

    ctor:function ( ) {

        var width = 50;
        var height = 50;
        this._super();
        var winSize = cc.director.getWinSize();

        var color = Util.hexToColor('#000000',128);
        this.bg = new cc.Layer(color);
        this.addChild(this.bg);
        this.bg.setContentSize(winSize.width,winSize.height);

        this.drawNode = cc.DrawNode.create();
        this.addChild(this.drawNode,-1);

        this.drawNode.clear();
        var color = Util.hexToColor('#000000',128);
        this.drawNode.drawRect(cc.p(0,0), cc.p(winSize.width,winSize.height), color, 1 ,color );



        this.restart = new cc.Sprite(res.restart_png);
        this.cross = new cc.Sprite(res.cross_png);
        this.cross.texture.setAliasTexParameters();

        this.cross.setScale(3);
        this.restart.setScale(3);


        this.addChild( this.cross );
        this.cross.setPosition(winSize.width / 2, winSize.height / 3 * 2);

        var item1 = new cc.MenuItemImage(res.restart_png, res.restart_png, this.onMenuCallback, this);


        var menu = new cc.Menu(item1);


        menu.tag = 1;
        menu.x = winSize.width / 2;
        menu.y = winSize.height / 2;

        this.addChild(menu, 0, 100 + i);

        //this.setColor(color);
        return true;
    }
});
