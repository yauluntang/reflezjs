
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
        if ( dark ){
            color = cc.color(255,255,255,255);
        }
        else {
            color = cc.color(255,255,255,128);
        }
        this.drawNode.drawRect(cc.p( -width , -width ), cc.p( width, width ), color, 1 , color );
    },
    ctor:function ( width ) {
        this._super();
        this.touchDownCallback = null;
        this.touchUpCallback = null;
        this.width = width;
        this.drawNode = cc.DrawNode.create();
        this.addChild(this.drawNode,100);
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
            let rect = cc.rect(-width, -width, width * 2, width * 2);

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
