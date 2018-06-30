/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/



var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        this.scheduleUpdate();

        this.blockSpawn = 0;
        this.blocks = [];
        this.header = new HeaderLayer();
        this.addChild( this.header,100 );

        this.header.setPosition(0,size.height - 40);
        this.header.setContentSize(size.width, 40);

        //this.calclayer = new CalcLayer();
        //this.addChild( this.calclayer,100 );


        //this.calclayer.setPosition(0,size.height - 140);
        //this.calclayer.setContentSize(size.width, 100);


        //this.calclayer.setSumnum( Util.randomInt(10,30) );

        //cc.audioEngine.playMusic(res.mariokart_mp3, true);

        return true;
    },



    update: function(dt){

        var size = cc.winSize;


        var blockWidth = 80;
        var rows = 5;
        var width = size.width / rows;


        if ( this.blockSpawn <= 0 ) {
            this.blockSpawn = 4;
            var numbers = Util.randomIntMult(2,9,5);
            var count = Util.randomInt(2,4);
            var chosen = Util.chooseNum(numbers, count);
            var result = Util.sum(chosen);

            var calcblock = new CalcBlock(result,'+',numbers);
            this.addChild(calcblock);
            calcblock.setPosition(cc.p(0, -size.width / 2));
            this.blocks.push(calcblock);


/*



            var that = this;



            for ( var x = 1; x <= rows; x ++ ) {

                var number = Util.randomInt(1,10);
                var block = new MovingBlock(blockWidth,blockWidth,number,'#FF0000','#FF0000');

                var touchDownFunc = function touchDownFunc( block ) {
                    var actions = false;
                    block.fadeRemove();
                    var number = block.getNumber();
                    this.calclayer.addBlock(blockWidth, width, number);
                    if (this.calclayer.calcSum > this.calclayer.sumNumber) {
                        this.calclayer.setSumnum(Util.randomInt(10, 30));
                        this.calclayer.clearBlocks();
                        this.calclayer.popCheck();
                        cc.audioEngine.playEffect(res.error_wav);
                        actions = true;
                    }
                    if (this.calclayer.calcBlock >= 5 && this.calclayer.calcSum !== this.calclayer.sumNumber) {
                        this.calclayer.setSumnum(Util.randomInt(10, 30));
                        this.calclayer.clearBlocks();
                        this.calclayer.popCheck();
                        cc.audioEngine.playEffect(res.error_wav);
                        actions = true;
                    }

                    if (this.calclayer.calcSum === this.calclayer.sumNumber) {
                        this.calclayer.setSumnum(Util.randomInt(15, 30));
                        this.calclayer.clearBlocks();
                        this.calclayer.popCheck(true);
                        cc.audioEngine.playEffect(res.ding_wav);
                        actions = true;
                    }

                    if ( !actions )
                        cc.audioEngine.playEffect(res.click_wav);
                }


                block.onTouchDown( function( touch, event, thisblock ){ touchDownFunc.call(that, thisblock) } );
                block.setPosition(cc.p(x * size.width / rows - size.width / rows / 2, -size.width / 10));
                this.addChild(block, 1);
                this.blocks.push(block);

            }*/


        }

        this.blockSpawn -= dt;

        for ( var i = 0; i < this.blocks.length; i ++ ){
            var b = this.blocks[i];
            var y = b.getPosition().y;
            var x = b.getPosition().x;
            y += size.width/500;
            b.setPosition(cc.p(x,y))

            if ( y > size.height ){

                var remove = this.blocks.splice(i, 1);
                this.removeChild(remove[0],true);
                i--;
            }

        }






    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});
