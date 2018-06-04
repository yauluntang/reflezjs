
var MovingBlock = cc.Node.extend({

    onTouchDown: function( callback ){
        this.touchDownCallback = callback;
    },

    onTouchUp: function( callback ){
        this.touchUpCallback = callback;
    },
    drawBox:function ( dark ){
        //this.drawNode.clear();

        var color = null;
        var width = this.width;
        var height= this.height;
        if ( dark ){
            color = Util.hexToColor( this.boxcolor, 180 );
        }
        else {
            color = Util.hexToColor( this.boxcolor, 255 );
        }
        this.sprite.color = color;
        //this.drawNode.drawRect(cc.p( -width , -height ), cc.p( width, height ), color, 1 , color );
    },
    fadeRemove: function(){


        var fade = new cc.FadeOut(0.1);
        var remove = new cc.RemoveSelf();
        var seq = new cc.Sequence( fade, remove );

        var fade2 = new cc.FadeOut(0.1);
        var remove2 = new cc.RemoveSelf();
        var seq2 = new cc.Sequence( fade2, remove2 );

        this.helloLabel.runAction(seq);
        this.sprite.runAction(seq2);
        this.removed = true;
    },
    getNumber: function(){
        return this.number;
    },
    ctor:function ( width, height, number, color, color2 ) {



        this._super();

        this.removed = false;
        this.number = number;
        this.boxcolor = color;
        this.boxcolor2 = color2;
        this.touchDownCallback = null;
        this.touchUpCallback = null;
        this.width = width;
        this.height = height;
        //this.drawNode = cc.DrawNode.create();
        //this.addChild(this.drawNode,100);

        this.sprite =
        new cc.Sprite(res.one_png);
        this.sprite.setScale(width,height);
        this.addChild(this.sprite, 0);

        /*
        this.drawNode = cc.DrawNode.create();
        this.addChild(this.drawNode,100);
        this.drawNode.clear();
        this.drawNode.drawRect(cc.p(-width,-height), cc.p(width,height),
            cc.color(255,255,255,216), 1 , cc.color(255,255,255,216) );
        this.addChild(this.drawNode);
*/
        this.helloLabel = new cc.LabelTTF(""+number, gameFont, width*0.8, cc.size(width,height), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        // position the label on the center of the screen


        this.addChild(this.helloLabel, 200);

        this.drawBox(false);

/*
        cc.eventManager.addListener( cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseMove: (event) => {
              var target = event.getCurrentTarget();
              var locationInNode = target.convertToNodeSpace(event.getLocation());
              var s = target.getContentSize();
              var rect = cc.rect(-width, -width, width * 2, width * 2);

              if (cc.rectContainsPoint(rect, locationInNode)) {
                cc.log("It's hovering! x = " + locationInNode.x + ", y = " + locationInNode.y);
                this.drawNode.clear();
                this.drawNode.drawRect(cc.p( -width , -width ), cc.p( width, width ), cc.color(255,255,255,255), 1 , cc.color(255,255,255,255) );
                return true;
              } else {
                this.drawNode.clear();
                this.drawNode.drawRect(cc.p( -width , -width ), cc.p( width, width ), cc.color(255,255,255,128), 1 , cc.color(255,255,255,128) );
                return false;
              }
            },

          }), this );
*/

            var that = this;
          var handleTouch = function(touch, event, move){

              if ( this.removed ){
                  return false;
              }
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var rect = cc.rect(-width/2, -height/2, width, height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
              this.drawBox( true );
              if ( this.touchDownCallback && !move ) {
                  this.touchDownCallback(touch, event);
              }
              return true;
            } else {
              this.drawBox( false );
              return false;
            }
          }
          var handleTouchOut = function(touch, event){
              if ( this.removed ){
                  return false;
              }
            this.drawBox( false );
            if ( this.touchUpCallback ) {
                this.touchUpCallback( touch, event );
            }

            return false;
          }

          cc.eventManager.addListener( cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
              swallowTouches: true,
              onTouchBegan: function(touch, event) {
                return handleTouch.call (that, touch, event );
              },
              onTouchMoved: function(touch, event) {
                return handleTouch.call( that,touch, event, true );
              },
              onTouchEnded: function(touch, event)  {
                return handleTouchOut.call( that,touch, event );
              }

            }), this );
        return true;
    },
    printInfo: function( ){
        console.log('test');
    }
});

