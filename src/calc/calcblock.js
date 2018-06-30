var CalcBlock = cc.Node.extend({
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
  ctor:function ( result, operand, numbers ) {
      this._super();

      var blockWidth = 80;
      var rows = 5;
      this.blocks = [];
      this.operand = operand;
      var size = cc.winSize;

      var resultblock = new MovingBlock(size.width - 20 ,blockWidth,result,'#0000FF','#0000FF');
      resultblock.setPosition(cc.p( size.width/2, size.width / 10));
      this.addChild(resultblock, 1);


      for ( var x = 0; x < rows; x ++ ){
        var number = numbers[x];

        var block = new MovingBlock(blockWidth,blockWidth,number,'#FF0000','#FF0000');
        block.selected = false;
        var touchDownFunc = function touchDownFunc( block ) {
            var actions = false;
            //block.fadeRemove();

            if ( !block.selected ){
              block.fadeToColor('#00FF00');
            }
            else {
              block.fadeToColor('#FF0000');
            }

            block.selected = !block.selected;

            var selectedBlock = [];
            for ( var i = 0; i < this.blocks.length; i ++ ){
               if ( this.blocks[i].selected ){
                  selectedBlock.push(this.blocks[i].getNumber());
               }
            }

            var current = 0;

            if ( this.operand === '+' ){
                current = Util.sum( selectedBlock );
            }
            else if ( this.operand === '*' ){
                current = Util.prod( selectedBlock );
            }

            if ( current == result ){
                this.popCheck(true);
            }


            if ( !actions )
                cc.audioEngine.playEffect(res.click_wav);
        }

        var that = this;
        block.onTouchDown( function( touch, event, thisblock ){ touchDownFunc.call(that, thisblock) } );
        block.setPosition(cc.p( (x+1) * size.width / rows - size.width / rows / 2, -size.width / 10));
        this.addChild(block, 1);
        this.blocks.push(block);
      }

  }
});
