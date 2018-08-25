var Util = {}
Util.hexToColor = function(hex, alpha){
    if ( alpha === undefined ){
        alpha = null;
    }
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
        cc.color(parseInt(result[1], 16),parseInt(result[2], 16),parseInt(result[3], 16), alpha != null ? alpha: 255 )
     : null;
}
Util.randomCircle = function( radius, dx, dy ){
  var angle = Math.random() * 2 * Math.PI;
    var dis = Math.random() * radius;
    var x = dis * Math.cos( angle ) + dx;
    var y = dis * Math.sin( angle ) + dy;
  return cc.p(x,y);
}
Util.randomInt = function(min,max) {
    return Math.floor(Math.random() * ( max - min + 1 ) + min);
}
Util.randomIntMult = function(min,max,count) {
    var chosen = [];
    while ( count > 0 ){
        var id = Util.randomInt(min,max);
        chosen.push(id);
        count --;
    }
    return chosen;
}
Util.chooseNum = function(arr,count) {
    var newarr = arr.slice(0);
    var chosen = [];
    while ( newarr.length > 0 && count > 0 ){
        var id = Util.randomInt(0,newarr.length-1);
        var spli = newarr.splice(id,1);
        chosen.push(spli[0]);
        count --;
    }
    return chosen;
}
Util.sum = function(arr){
    var sum = 0;
    for ( var i = 0; i < arr.length; i ++ ){
        sum += arr[i];
    }
    return sum;
}
Util.prod = function(arr){
    var prod = 1;
    for ( var i = 0; i < arr.length; i ++ ){
        prod *= arr[i];
    }
    return prod;
}

Util.getRepeatAnimation = function( file, frames, delay ) {
    var sframes = [];
    var texture = cc.textureCache.addImage(file);
    texture.setAliasTexParameters();
    for ( var i = 0; i < frames.length; i ++ ){
        var spriteframe = new cc.SpriteFrame(texture, frames[i] );
        sframes.push(spriteframe);
    }


    var animation1 = new cc.Animation(sframes, 0.2, 1);
    var action = cc.Animate.create(animation1);
    //var repeat = cc.RepeatForever.create(action);

    return {repeat:action, sframes: sframes};
}

Util.checkLineIntersection = function (p1s, p1e, p2s, p2e) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point

    var line1StartX = p1s.x;
    var line1StartY = p1s.y;

    var line1EndX = p1e.x;
    var line1EndY = p1e.y;

    var line2StartX = p2s.x;
    var line2StartY = p2s.y;

    var line2EndX = p2e.x;
    var line2EndY = p2e.y;

    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));

    if (denominator == 0) {
        return null;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));


    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true

    if ( result.onLine1 && result.onLine2 ){
        return cc.p(result.x, result.y);
    }
    return null;
};