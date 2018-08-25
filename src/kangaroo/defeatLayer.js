
var DefeatLayer = cc.Layer.extend({

    onMenuCallback: function () {
        cc.director.runScene(new KangarooScene());
    },

    ctor:function ( score, record ) {

        var width = 50;
        var height = 50;
        this._super();
        var size = cc.director.getWinSize();

        var color = Util.hexToColor('#000000',128);
        this.bg = new cc.Layer(color);
        this.addChild(this.bg);
        this.bg.setContentSize(size.width,size.height);

        this.drawNode = cc.DrawNode.create();
        this.addChild(this.drawNode,-1);

        this.drawNode.clear();
        var color = Util.hexToColor('#000000',128);
        this.drawNode.drawRect(cc.p(0,0), cc.p(size.width,size.height), color, 1 ,color );




        this.cross = new cc.Sprite(res.cross_png);
        this.cross.texture.setAliasTexParameters();

        this.cross.setScale(3);


        this.addChild( this.cross );
        this.cross.setPosition(size.width / 2, size.height / 3 * 2);

        this.playbutton = new PlayButton();
        this.playbutton.setPosition( cc.p( size.width / 2, size.height * 2 / 3 - 250 ) );
        this.addChild(this.playbutton);


        this.helloLabel = new cc.LabelBMFont( "Record "+record, res.nocontinue_fnt, cc.size(size.width * 2 - 20, 80), cc.TEXT_ALIGNMENT_LEFT);
        this.addChild( this.helloLabel );

        //this.helloLabel.texture.setAliasTexParameters();
        this.helloLabel.setScale(2);
        this.helloLabel.setAnchorPoint(0.5,0.5);
        this.helloLabel.setPosition(cc.p( size.width / 2, size.height * 2 / 3 - 130 ) )



        this.helloLabel2 = new cc.LabelBMFont( "Score "+score, res.nocontinue_fnt, cc.size(size.width * 2 - 20, 80), cc.TEXT_ALIGNMENT_LEFT);
        this.addChild( this.helloLabel2 );
        //this.helloLabel2.texture.setAliasTexParameters();
        this.helloLabel2.setScale(2);
        this.helloLabel2.setAnchorPoint(0.5,0.5);
        this.helloLabel2.setPosition(cc.p( size.width / 2, size.height * 2 / 3 - 170 ) )





        //this.setColor(color);
        return true;
    }
});
