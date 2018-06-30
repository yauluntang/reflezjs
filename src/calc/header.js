
var HeaderLayer = cc.Layer.extend({

    ctor:function () {

        this._super();
        var size = cc.winSize;




        this.helloLabel = new cc.LabelTTF("Sum Fun", gameFont, size.width/10, cc.size(size.width * 2 - 20, 80), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        //this.helloLabel.setHorizontalAlignment( cc.TEXT_ALIGNMENT_LEFT );
        this.helloLabel.x = size.width / 2;
        this.helloLabel.y = 20;
        //this.helloLabel.setContentSize( size.width, 40 );
        this.helloLabel.color = cc.color(0,0,0,255);
        this.helloLabel.setScale(0.5);
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 200);

        this.drawNode = cc.DrawNode.create();
        this.addChild(this.drawNode,100);

        this.drawNode.clear();
        var color = Util.hexToColor('#febc12');
        this.drawNode.drawRect(cc.p(0,0), cc.p(size.width,40), color, 1 ,color );
        return true;
    },

});
