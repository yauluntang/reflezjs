
var BGLayer = cc.Layer.extend({


    ctor:function ( ) {
        this._super();
        this.scheduleUpdate();
        this.bglayer = cc.Layer.create();

        this.bg = cc.Sprite.create(res.bg_png);
        this.bg.setScale(3);
        this.bg.texture.setAliasTexParameters();
        this.bg.setAnchorPoint(cc.p(0,0));
        this.bg.setPosition(cc.p(1440,0));
        this.bglayer.addChild(this.bg);


        this.bg2 = cc.Sprite.create(res.bg_png);
        this.bg2.setPosition(cc.p(0,0));
        this.bg2.texture.setAliasTexParameters();
        this.bg2.setAnchorPoint(cc.p(0,0));
        this.bg2.setScale(3);
        this.bglayer.addChild(this.bg2);

        this.bgscroll = 0;
        this.moving = true;

        this.addChild(this.bglayer);


    },

    update: function(dt) {
        // Moving Background
        if ( this.moving ) {
            var bglayerX = this.bglayer.x - dt * 20;
            var bglayerY = this.bglayer.y;
            this.bglayer.setPosition(cc.p(bglayerX, bglayerY));
            this.bgscroll += dt * 20;
            if (this.bgscroll > 1440) {
                this.bgscroll -= 1440;
                this.bg.setPosition(cc.p(this.bg.x + 1440, this.bg.y));
                this.bg2.setPosition(cc.p(this.bg2.x + 1440, this.bg2.y));
            }
        }
    },

    stopMoving: function(){
         this.moving = false;
    }


});
