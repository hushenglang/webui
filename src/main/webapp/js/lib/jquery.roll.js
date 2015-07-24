
(function (jQuery) {
        jQuery.fn.extend({
            marquee:function (o) {
                var it = this,
                        d = o.direction || 'left', //滾動方向 默認向左
                        s = o.speed || 30, //速度 默認30毫秒
                        mar = jQuery(it),
                        mp1 = jQuery(it).children(0).attr({id:"mp1"}),
                        marqueeFunc = getMarquee(d),
                        marRun = marqueeFunc ? setInterval(marqueeFunc, s) : function () {
                            return false;
                        };//開始滾動
                //鼠標懸停事件
                jQuery(it).hover(function () {
                    clearInterval(marRun);
                }, function () {
                    marRun = setInterval(marqueeFunc, s);
                });
                /*生成滾動函數
                 *1.判斷方向 *2.裝載CSS *3.判斷需不需要滾動 *4.構造函數
                 */
                function getMarquee(d) {
                    var marqueeFunc;
                    switch (d) {
                        //水平向左
                        case "left":
                            mar.addClass("plus-mar-left");
                            var liHeight = mar[0].offsetHeight;
                            if (mp1[0].offsetWidth < mar[0].offsetWidth) return false;
                            mp1.clone().attr({id:"mp2"}).appendTo(mar);
                            marqueeFunc = function () {
                                if (mar[0].scrollLeft >= mp1[0].scrollWidth) {
                                    mar[0].scrollLeft = 0;
                                } else {
                                    var l = mar[0].scrollLeft++;
                                    if(l == mar[0].scrollLeft ) mar[0].scrollLeft = 0; 
                                }
                            };
                            break;
                        default:
                        {
                            marqueeFunc = null;
                            alert("滾動插件：傳入的參數{direction}有誤！");
                        }
                    }
                    return marqueeFunc;
                }
            }
        });
    })(jQuery);