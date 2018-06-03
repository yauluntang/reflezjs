
var HeaderLayer = cc.Layer.extend({

    ctor:function () {

        this._super();
        var size = cc.winSize;




        this.helloLabel = new cc.LabelTTF("Sum Fun", gameFont, size.width/20, cc.size(size.width-20,40), cc.TEXT_ALIGNMENT_LEFT);
        //this.helloLabel.setHorizontalAlignment( cc.TEXT_ALIGNMENT_LEFT );
        this.helloLabel.x = size.width / 2;
        this.helloLabel.y = size.height - 20;
        //this.helloLabel.setContentSize( size.width, 40 );
        this.helloLabel.color = cc.color(0,0,0,255);
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 200);

        this.drawNode = cc.DrawNode.create();
        this.addChild(this.drawNode,100);

        this.drawNode.clear();
        var color = Util.hexToColor('#febc12');
        this.drawNode.drawRect(cc.p(0,size.height-35), cc.p(size.width,size.height), color, 1 ,color );
        return true;
    },

});

