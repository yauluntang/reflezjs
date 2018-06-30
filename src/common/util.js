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
