var Util = {}
Util.hexToColor = (hex) =>{
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
        cc.color(parseInt(result[1], 16),parseInt(result[2], 16),parseInt(result[3], 16),parseInt(result[4], 16))
     : null;
}