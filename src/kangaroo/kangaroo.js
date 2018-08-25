
var Kangaroo = cc.Node.extend({


    ctor:function ( ) {

        var width = 50;
        var height = 50;
        this._super();

        this.sprite = new cc.Sprite();
        //this.sprite.setScale(width,height);
        this.sprite.setScale(3);



        var rects = [];
        for ( var i = 0; i < 3; i ++ ){
            rects.push(cc.rect(i*32+1,64+1,31,31));
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
        this.sprite.stopAction(this.animateObj.repeat);
        this.sprite.runAction(this.animateObj.repeat);
    },
      setFrame: function( frameId ){
            this.sprite.setSpriteFrame(this.animateObj.sframes[frameId]);
      }
});
