
var CalcLayer = cc.Layer.extend({

    sumNumber: null,
    calcBlock: 0,
    calcSum: 0,

    addBlock: function( blockWidth, width,  number ){
        var size = cc.winSize;
        var block = new MovingBlock(blockWidth,blockWidth,number,'#FF0000','#FF0000');
        this.addChild( block, 200 );
        block.setPosition( width/2 + this.bx,  50);

        this.bx += width;
        this.calcBlock ++;
        this.calcSum += number;
        this.blocks.push( block );
    },
    clearBlocks: function(){
        for ( var i =0; i < this.blocks.length; i++ ){
            var j = this.blocks[i];
            j.removeFromParent(true);
        }
        this.blocks.length = 0;
        this.calcBlock = 0;
        this.calcSum = 0;
        this.bx = 0;
    },
    setSumnum: function( text ){

        this.sumNumber = text;
        this.helloLabel.setString( text );

    },
    popCheck: function( checked ){
        var size = cc.winSize;

        var check;
        if ( checked )
            check = new cc.Sprite(res.check_png);
        else
            check = new cc.Sprite(res.x_png);
        check.setScale(0.5);
        this.addChild(check,300);
        check.setPosition(size.width/2, 50);

        var fade = new cc.FadeOut(1);
        var scaleby = new cc.ScaleBy(1,1.5);

        var spawn = new cc.Spawn(fade, scaleby);
        var remove = new cc.RemoveSelf();
        var seq = new cc.Sequence( spawn, remove );
        check.runAction(seq);

    },
    ctor:function () {

        this._super();
        this.blocks = [];
        this.bx = 0;
        var size = cc.winSize;



        this.helloLabel = new cc.LabelTTF("", gameFont, size.width/8, cc.size(size.width - 20, 100), cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

        this.helloLabel.x = size.width / 2;
        this.helloLabel.y = 50;
        this.helloLabel.color = cc.color(0,0,0,255);
        this.addChild(this.helloLabel,300);

        this.drawNode = cc.DrawNode.create();
        this.addChild(this.drawNode,100);
        this.drawNode.clear();
        var color = Util.hexToColor('#ffffff', 220);
        this.drawNode.drawRect(cc.p(0,0), cc.p(size.width,100), color, 1 ,color );
        return true;
    },

});

