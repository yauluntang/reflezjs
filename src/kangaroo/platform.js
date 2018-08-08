
var Platform = cc.Node.extend({


    ctor:function ( ) {

        var width = 50;
        var height = 50;
        this._super();

        this.sprite = new cc.Sprite(res.ground_png);
        //this.sprite.setScale(width,height);
        this.sprite.texture.setAliasTexParameters();

        //var color = Util.hexToColor( '#00ff00', 255 );
        //this.sprite.setColor(color);
        this.addChild(this.sprite, 0);


        return true;
    }
});
