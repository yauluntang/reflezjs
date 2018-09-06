
var HeaderLayer = cc.Layer.extend({

    ctor:function () {

        this._super();
        var size = cc.winSize;


        this.helloLabel = new cc.LabelBMFont("", res.nocontinue_fnt);


        this.helloLabel.x = 10;
        this.helloLabel.y = 5;

        this.helloLabel.setScale(2);
        this.helloLabel.setAnchorPoint(0,0);
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 200);


        this.scoreLabel = new cc.LabelBMFont("", res.nocontinue_fnt);

        this.scoreLabel.setScale(2);
        this.scoreLabel.setAnchorPoint(1,0);
        this.scoreLabel.setPosition(size.width-10,5);

        // add the label as a child to this layer
        this.addChild(this.scoreLabel, 200);



        this.drawNode = cc.DrawNode.create();
        this.addChild(this.drawNode,100);

        this.drawNode.clear();
        var color = Util.hexToColor('#febc12');
        this.drawNode.drawRect(cc.p(0,0), cc.p(size.width,60), color, 1 ,color );
        return true;
    },
    setTitle: function( text ){
        this.helloLabel.setString( text );
    },

    setScore: function( text ){
        this.scoreLabel.setString( text );
    }

});
