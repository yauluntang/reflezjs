
var Kangaroo = cc.Node.extend({


    ctor:function ( selectRabbit, direction ) {

        var width = 50;
        var height = 50;
        this._super();

        if ( typeof direction === 'undefined' || direction === null ){
            direction = 2;
        }
        if ( typeof selectRabbit === 'undefined' || selectRabbit === null ){
            selectRabbit = 0;
        }

        this.sprite = new cc.Sprite();
        //this.sprite.setScale(width,height);
        this.sprite.setScale(3);




        var x = selectRabbit % 4;
        var y = Math.floor( selectRabbit / 4 );

        cc.log( "Rabbit Choice "+ selectRabbit+","+ x+","+y);


        var rects = [];
        for ( var i = 0; i < 3; i ++ ){
            rects.push(cc.rect(i*32+1 + 32*3*x, 1 + 128*y + 32 * direction,31,31));
        }


        this.animateObj = Util.getRepeatAnimation(res.rabbit_png, rects, 0.1);
        this.animateObj.repeat.retain();
        //this.sprite.runAction(repeat);

        this.sprite.setSpriteFrame(this.animateObj.sframes[0]);
        this.addChild(this.sprite, 0);

        this.scheduleUpdate();
        this.nextTime = 0;
        return true;
    },
    runAnimate: function(){
        this.sprite.stopAllActions();

        this.sprite.runAction(this.animateObj.repeat);
    },
      setFrame: function( frameId ){
            this.sprite.setSpriteFrame(this.animateObj.sframes[frameId]);
      }
});
