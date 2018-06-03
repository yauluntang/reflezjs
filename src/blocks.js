
var MovingBlock = cc.Node.extend({

    onTouchDown: function( callback ){
        this.touchDownCallback = callback;
    },

    onTouchUp: function( callback ){
        this.touchUpCallback = callback;
    },
    drawBox:function ( dark ){
        this.drawNode.clear();

        let color = null;
        let width = this.width;
        let height= this.height;
        if ( dark ){
            color = Util.hexToColor( this.boxcolor, 180 );
        }
        else {
            color = Util.hexToColor( this.boxcolor, 255 );
        }
        this.drawNode.drawRect(cc.p( -width , -height ), cc.p( width, height ), color, 1 , color );
    },
    fadeRemove: function(){


        let fade = new cc.FadeOut(1);
        let remove = new cc.RemoveSelf();
        let seq = new cc.Sequence( fade, remove );

        let fade2 = new cc.FadeOut(1);
        let remove2 = new cc.RemoveSelf();
        let seq2 = new cc.Sequence( fade2, remove2 );

        this.helloLabel.runAction(seq);
        this.drawNode.runAction(seq2);
    },
    ctor:function ( width, height, number, color, color2 ) {



        this._super();

        this.boxcolor = color;
        this.boxcolor2 = color2;
        this.touchDownCallback = null;
        this.touchUpCallback = null;
        this.width = width;
        this.height = height;
        this.drawNode = cc.DrawNode.create();
        this.addChild(this.drawNode,100);

        this.helloLabel = new cc.LabelTTF(""+number, gameFont, width);
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
          let handleTouch = (touch, event, move) =>{
            let target = event.getCurrentTarget();
            let locationInNode = target.convertToNodeSpace(touch.getLocation());
            let rect = cc.rect(-width, -height, width * 2, height * 2);

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
          let handleTouchOut = (touch, event) =>{
            this.drawBox( false );
            if ( this.touchUpCallback ) {
                this.touchUpCallback( touch, event );
            }

            return false;
          }

          cc.eventManager.addListener( cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
              swallowTouches: true,
              onTouchBegan: (touch, event)=> {
                return handleTouch( touch, event );
              },
              onTouchMoved: (touch, event) => {
                return handleTouch( touch, event, true );
              },
              onTouchEnded: (touch, event) => {
                return handleTouchOut( touch, event );
              }

            }), this );
        return true;
    },
    printInfo: function( ){
        console.log('test');
    }
});

