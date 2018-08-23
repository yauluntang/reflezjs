
var Platform = cc.Node.extend({

    addMush: function() {
      let mush = new cc.Sprite(res.mushroomsm_png);
      let x = Util.randomInt( -6,6 );
      let y = Util.randomInt( -2,0 );
      mush.setPosition(x,y);
      mush.setAnchorPoint(0.5,0);
      mush.texture.setAliasTexParameters();
      this.addChild(mush);
    },
    ctor:function ( type, height ) {

        var width = 50;
        
        this.platformHeight = height;
        this._super();
        this.type = type;

        this.used = false;
        if ( type === 0 ){
          this.width = 55;
          this.sprite = new cc.Sprite(res.ground_png);
        }
        else {
          this.width = 45;
          this.sprite = new cc.Sprite(res.mushroom_png);
        }
        let a= Util.randomInt( 0,1 );
        for ( let i = 0; i < a; i++ ){
          this.addMush( );
        }


        this.sprite.setAnchorPoint(0.5,1);
        //this.sprite.setScale(width,height);
        this.sprite.texture.setAliasTexParameters();

        //var color = Util.hexToColor( '#00ff00', 255 );
        //this.sprite.setColor(color);
        this.addChild(this.sprite, 0);

        //this.scoreLabel = new cc.LabelTTF("", gameFont, 10, 10, cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

        //this.addChild( this.scoreLabel );
        this.scheduleUpdate();

        return true;
    },
    update: function(dt){
      //this.scoreLabel.setString( Math.round(this.y));
    }
});
