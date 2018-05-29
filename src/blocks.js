
var MovingBlock = cc.Node.extend({
    ctor:function ( width ) {
        this._super();

        this.drawNode = cc.DrawNode.create();
        this.addChild(this.drawNode,100);
        this.drawNode.clear();
        this.drawNode.drawRect(cc.p( -width , -width ), cc.p( width, width ), cc.color(255,255,255,128), 1 , cc.color(255,255,255,128) );

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
          let handleTouch = (touch, event) =>{
            var target = event.getCurrentTarget();

          //Get the position of the current point relative to the button
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(-width, -width, width * 2, width * 2);

            //Check the click area
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

          }
          cc.eventManager.addListener( cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
              swallowTouches: true,
            //onTouchBegan event callback function
              onTouchBegan: (touch, event)=> {
              // event.getCurrentTarget() returns the *listener's* sceneGraphPriority node.
                return handleTouch( touch, event);
              },
            //Trigger when moving touch
              onTouchMoved: (touch, event) => {
                return handleTouch( touch, event);
              },
            //Process the touch end event
              onTouchEnded: (touch, event) => {
                return handleTouch( touch, event);
              }

            }), this );


        return true;
    },
    printInfo: function( ){
        console.log('test');
    }
});
