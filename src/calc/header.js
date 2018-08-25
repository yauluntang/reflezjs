
var HeaderLayer = cc.Layer.extend({

    ctor:function () {

        this._super();
        var size = cc.winSize;




        //this.helloLabel = new cc.LabelTTF("Bunny Jump", gameFont, size.width/10, cc.size(size.width * 2 - 20, 80), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);


        this.helloLabel = new cc.LabelBMFont("Bunny", res.nocontinue_fnt, cc.size(size.width * 2 - 20, 80), cc.TEXT_ALIGNMENT_LEFT);

        //this.helloLabel.setHorizontalAlignment( cc.TEXT_ALIGNMENT_LEFT );
        this.helloLabel.x = 10;
        this.helloLabel.y = 5;
        //this.helloLabel.setContentSize( size.width, 40 );
        this.helloLabel.texture.setAliasTexParameters();
        this.helloLabel.setScale(2);
        this.helloLabel.setAnchorPoint(0,0);
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 200);


        this.scoreLabel = new cc.LabelBMFont("", res.nocontinue_fnt, cc.size(size.width * 2 - 20, 80), cc.TEXT_ALIGNMENT_RIGHT);
        //this.helloLabel.setHorizontalAlignment( cc.TEXT_ALIGNMENT_LEFT );

        //this.helloLabel.setContentSize( size.width, 40 );
        this.scoreLabel.texture.setAliasTexParameters();
        this.scoreLabel.setScale(2);
        this.scoreLabel.setAnchorPoint(1,0);
        this.scoreLabel.setPosition(size.width-10,5)
        // add the label as a child to this layer
        this.addChild(this.scoreLabel, 200);



        this.drawNode = cc.DrawNode.create();
        this.addChild(this.drawNode,100);

        this.drawNode.clear();
        var color = Util.hexToColor('#febc12');
        this.drawNode.drawRect(cc.p(0,0), cc.p(size.width,60), color, 1 ,color );
        return true;
    },

    setScore: function( text ){
        this.scoreLabel.setString( text );
    }

});
