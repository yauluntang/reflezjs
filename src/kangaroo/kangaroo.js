
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



        var repeat = Util.getRepeatAnimation(res.rabbit_png, rects, 0.1)

        this.sprite.runAction(repeat);
        this.addChild(this.sprite, 0);


        return true;
    }
});
