
var Platform = cc.Node.extend({

    addMush: function(x) {
      //var mush = new cc.Sprite(res.mushroomsm_png);
        var mush = new cc.Sprite(res.flower_png);
      //var x = Util.randomInt( -6,6 );
      var y = Util.randomInt( -2,0 );
      mush.setPosition(x,y);
      mush.setAnchorPoint(0.5,0);
      mush.texture.setAliasTexParameters();

      mush.setSkewX(5);

      var seq = cc.sequence([ cc.skewBy(1,-10,0).easing(cc.easeSineOut()) , cc.skewBy(1,10,0).easing(cc.easeSineOut()) ]);
      mush.runAction(cc.repeatForever(seq));

      this.addChild(mush);
    },
    ctor:function ( type, height ) {

        var width = 50;
        
        this.platformHeight = height;
        this._super();
        this.type = type;

        this.used = false;
        if ( type === 0 ){
          this.width = 50;
          this.sprite = new cc.Sprite(res.ground_png);
        }
        else {
          this.width = 35;
          this.sprite = new cc.Sprite(res.mushroom_png);
        }
        var a= Util.randomInt( 0,4 );
        var startx = Util.randomInt(-this.width / 4, this.width/4);
        for ( var i = 0; i < a; i++ ){
          if ( startx < this.width / 4 ) {
              this.addMush( startx );
          }
           startx += Util.randomInt( 5,40 );
        }


        this.sprite.setAnchorPoint(0.5,1);
        //this.sprite.setScale(width,height);
        this.sprite.texture.setAliasTexParameters();

        //var color = Util.hexToColor( '#00ff00', 255 );
        //this.sprite.setColor(color);
        this.addChild(this.sprite, 0);
        var seq = cc.sequence([ cc.moveBy(1,0,5).easing(cc.easeSineInOut()) , cc.moveBy(1,0,-5).easing(cc.easeSineInOut()) ]);

        this.carrot = new cc.Sprite(res.carrot_png);

        this.carrot.runAction(cc.repeatForever(seq));
        this.carrot.setAnchorPoint(0.5,0.5);
        this.carrot.setPosition(0,8);
        this.carrot.texture.setAliasTexParameters();


        this.addChild(this.carrot);


        //this.scoreLabel = new cc.LabelTTF("", gameFont, 10, 10, cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

        //this.addChild( this.scoreLabel );
        this.scheduleUpdate();

        return true;
    },
    update: function(dt){
      if ( this.used && this.carrot ){
         this.removeChild( this.carrot );
         this.carrot = null;
      }
    }
});
