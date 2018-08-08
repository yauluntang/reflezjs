/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var res = {
    one_png : "res/FFFFFF-1.png",
    click_wav: "res/click.wav",
    ding_wav: "res/ding.wav",
    error_wav: "res/error.wav",
    check_png: "res/checkmark-256.png",
    x_png: "res/x-mark-256.png",
    mariokart_mp3: "res/mariokart.mp3",
    ground_png: "res/ground.png",
    rabbit_png: "res/rabbit.png",
    bg_png: "res/bg.png"
};

var g_resources = [{name:"Josefin Sans", srcs:["res/JosefinSans-Regular.eot","res/JosefinSans-Regular.ttf"], type:"font"}];
for (var i in res) {
    g_resources.push(res[i]);
}
