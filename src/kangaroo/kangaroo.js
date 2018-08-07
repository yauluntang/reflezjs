
var Kangaroo = cc.Node.extend({


    ctor:function ( ) {

        var width = 50;
        var height = 50;
        this._super();

        this.sprite = new cc.Sprite(res.one_png);
        this.sprite.setScale(width,height);

        var color = Util.hexToColor( '#ff0000', 255 );
        this.sprite.setColor(color);
        this.addChild(this.sprite, 0);


        return true;
    }
});
