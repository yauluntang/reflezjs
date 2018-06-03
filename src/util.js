var Util = {}
Util.hexToColor = (hex, alpha) =>{
    if ( alpha === undefined ){
        alpha = null;
    }
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
        cc.color(parseInt(result[1], 16),parseInt(result[2], 16),parseInt(result[3], 16), alpha != null ? alpha: 255 )
     : null;
}
Util.randomInt =(min,max) =>{
    return Math.floor(Math.random() * ( max - min + 1 ) + min);
}