/*
 * Yet-Another Rotator
 * Copyright (c) 2013 Rudyard Murdough (www.rudyardmurdough.com)
 * Licensed under the GPL (http://www.opensource.org/licenses/gpl-license.php) license.
 * 
 * Version 0.1.1
 *
 */
(function($) {
/*
 * 
 *
 * @name     yaRotator
 * @param    options { button_left, button_right, slide, indicator }
 * @author   Rudyard Murdough (www.rudyardmurdough.com)
 * @example  $("#rotator").yaRotator({ 'a.left', 'a.right', '.slide' });
 * @example  $("#rotator").yaRotator({ 'a.left', 'a.right', '.slide', '.navigation a.indicator' });
 *
 */
    $.fn.yaRotator = function(options)
    {	
        var settings = $.extend( {
        'button_left' : '',
        'button_right' : '',
        'slide' : '',
        'indicator' : ''
        }, options);
        
        var hovered = false;
        
        $(this).hover(function(){
            hovered = true;
        }, function(){
            hovered = false;
        });
        var container = $(this);
        
        var set_active_indicator = function(index){
            if(settings.indicator.length>0)
            {
                $(container).find(settings.indicator).removeClass('current-indicator');
                $(container).find(settings.indicator).each(function(idx, val){
                    if(index ==idx)
                    {
                        $(this).addClass('current-indicator');
                    }
                });
            }
        };
        var rotate = function()
        {
            if(!hovered)
            {
                $(container).find(settings.button_right).click();
            }
            //setTimeout('jQuery(\''+container_id+'\').rotate(\''+right+'\');', 6000);
            setTimeout( function() {
                rotate();
            }, 6000);
        };
        //setup
        setTimeout( function() {
          rotate();
        }, 6000);
        
        //setTimeout('jQuery(\''+container_id+'\').rotate(\''+settings.button_right+'\');', 6000);
        $(container).find(settings.slide+':first').show();
        $(container).find(settings.slide+':first').addClass('active');
        $(container).find(settings.indicator+':first').addClass('current-indicator');
        //events
        $(container).find(settings.button_left).click(function () {
            var current = $(container).find('.active');
            $(current).hide();
            $(current).removeClass('active');
            var prev = $(current).prev(settings.slide);
            if(prev.length == 0)
            {
                prev = $(container).find(settings.slide+':last');
            }
            $(prev).show();
            $(prev).addClass('active');
            set_active_indicator($(prev).index(settings.slide));
            return false;
        });
        $(container).find(settings.button_right).click(function () {
            var current = $(container).find('.active');
            $(current).hide();
            $(current).removeClass('active');
            var next = $(current).next(settings.slide);
            if(next.length == 0)
            {
                next = $(container).find(settings.slide+':first');
            }
            $(next).show();
            $(next).addClass('active');
            set_active_indicator($(next).index(settings.slide));
            return false;                
        });
        if(settings.indicator.length>0)
        {
            $(container).find(settings.indicator).each(function(){
                $(this).click(function(){
                    var link = this;
                    var current_slide = $(container).find('.active');
                    $(current_slide).hide();
                    $(current_slide).removeClass('active');
                    $(container).find(settings.slide).each(function(index, val){
                        if(index ==$(link).index())
                        {
                            $(this).show();
                            $(this).addClass('active');
                            set_active_indicator(index);
                        }
                    });                
                    return false;
                });
            });
        }
    };

})(jQuery);
