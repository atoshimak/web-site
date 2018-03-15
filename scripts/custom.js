!function(a)
{
    var b="waitForImages";
    a.waitForImages=
        {
            hasImageProperties:["backgroundImage","listStyleImage","borderImage","borderCornerImage","cursor"],hasImageAttributes:["srcset"]
        }
        ,a.expr[":"].uncached=function(b)
    {
        if(!a(b).is('img[src][src!=""]'))return!1;
        var c=new Image;
        return c.src=b.src,!c.complete
    }
        ,a.fn.waitForImages=function()
    {
        var c,d,e,f=0,g=0,h=a.Deferred();
        if(a.isPlainObject(arguments[0])?(e=arguments[0].waitForAll,d=arguments[0].each,c=arguments[0].finished):1===arguments.length&&"boolean"===a.type(arguments[0])?e=arguments[0]:(c=arguments[0],d=arguments[1],e=arguments[2]),c=c||a.noop,d=d||a.noop,e=!!e,!a.isFunction(c)||!a.isFunction(d))throw new TypeError("An invalid callback was supplied.");
        return this.each(function()
            {
                var i=a(this),j=[],k=a.waitForImages.hasImageProperties||[],l=a.waitForImages.hasImageAttributes||[],m=/url\(\s*(['"]?)(.*?)\1\s*\)/g;
                e?i.find("*").addBack().each(function()
                    {
                        var b=a(this);
                        b.is("img:uncached")&&j.push(
                            {
                                src:b.attr("src"),element:b[0]
                            }
                        ),a.each(k,function(a,c)
                            {
                                var d,e=b.css(c);
                                if(!e)return!0;
                                for(;
                                    d=m.exec(e);
                                )j.push(
                                    {
                                        src:d[2],element:b[0]
                                    }
                                )
                            }
                        ),a.each(l,function(c,d)
                            {
                                var e,f=b.attr(d);
                                return f?(e=f.split(","),void a.each(e,function(c,d)
                                    {
                                        d=a.trim(d).split(" ")[0],j.push(
                                            {
                                                src:d,element:b[0]
                                            }
                                        )
                                    }
                                )):!0
                            }
                        )
                    }
                ):i.find("img:uncached").each(function()
                    {
                        j.push(
                            {
                                src:this.src,element:this
                            }
                        )
                    }
                ),f=j.length,g=0,0===f&&(c.call(i[0]),h.resolveWith(i[0])),a.each(j,function(e,j)
                    {
                        var k=new Image,l="load."+b+" error."+b;
                        a(k).one(l,function m(b)
                            {
                                var e=[g,f,"load"==b.type];
                                return g++,d.apply(j.element,e),h.notifyWith(j.element,e),a(this).off(l,m),g==f?(c.call(i[0]),h.resolveWith(i[0]),!1):void 0
                            }
                        ),k.src=j.src
                    }
                )
            }
        ),h.promise()
    }
}
(jQuery);
var theWindow=jQuery(window),theBody=jQuery('body'),contentContainer=jQuery('#contentContainer'),contentCover=jQuery('#contentCover'),headerImages=jQuery('#headerImages'),headerImage=headerImages.children(),footer=jQuery('#footerContainer'),audioPlayer=jQuery("#audioPlayer"),audioControl=jQuery('#audioControl'),audioSpan=jQuery('#audioControl span'),menuControl=jQuery('#menu-control'),sidebar=jQuery('#sidebar'),sidebarWidgets=jQuery('#sidebar-widgets'),loadingPage=jQuery('#loading-page'),fullSearch=jQuery('#full-search'),bigInput=jQuery('#big-input'),reviewinterval='',headerinterval='';
function runReviews()
{
    if(jQuery('.review').length>1)
    {
        clearInterval(reviewinterval);
        reviewinterval=setInterval(function()
            {
                reviewsSlideshow()
            }
            ,8000)
    }
    else
    {
        clearInterval(reviewinterval)
    }
}
function runHeader()
{
    if(headerImage.length>1&&!theBody.hasClass('stopSlideshow'))
    {
        clearInterval(headerinterval);
        headerinterval=setInterval(function()
            {
                imageSlideshow()
            }
            ,8000)
    }
    else
    {
        clearInterval(headerinterval)
    }
}
jQuery(document).ajaxComplete(function()
    {
        bodyCheck();
        runReviews();
        runHeader()
    }
);
if(!headerImage.length>=1)
{
    headerImages.background(
        {
            source:
                {
                    poster:"images/bridge.jpg",mp4:"videos/magic-cloth.mp4"
                }
        }
    )
}
var opts=
    {
        lines:13,length:8,width:3,radius:15,corners:1,rotate:0,direction:1,color:'#fff',speed:1,trail:100,shadow:false,hwaccel:false,className:'spinner',zIndex:2e9,top:'50%',left:'50%'
    };
var target=document.getElementById('loading-page');
var spinner=new Spinner(opts).spin(target);
function loadingBg()
{
    var activeBgUrl=jQuery('.activeBg').children('img').attr('src'),videoBgUrl=jQuery('.video-image-container').children('img').attr('src'),galleryBgUrl=jQuery('.activeImg').children('img').attr('src'),pageBgUrl=jQuery('.page-image-container').children('img').attr('src');
    if(typeof pageBgUrl!='undefined')loadingPage.add(fullSearch).css(
        {
            backgroundImage:'url('+pageBgUrl+')'
        }
    );
    else if(typeof galleryBgUrl!='undefined')loadingPage.add(fullSearch).css(
        {
            backgroundImage:'url('+galleryBgUrl+')'
        }
    );
    else if(typeof videoBgUrl!='undefined')loadingPage.add(fullSearch).css(
        {
            backgroundImage:'url('+videoBgUrl+')'
        }
    );
    else if(typeof activeBgUrl!='undefined')loadingPage.add(fullSearch).css(
        {
            backgroundImage:'url('+activeBgUrl+')'
        }
    );
    else loadingPage.add(fullSearch).css(
            {
                backgroundImage:'none'
            }
        )
}
jQuery(document).keyup(function(e)
    {
        if(e.keyCode==27)
        {
            if(theBody.hasClass('search-open'))closeSearch();
            if(theBody.hasClass('full-screen-video'))closeVideo();
            if(theBody.hasClass('open-sidebar'))sideClose()
        }
    }
);
function widgetPos()
{
    sidebarWidgets.css(
        {
            marginTop:"0px"
        }
    );
    var sidebarH=sidebar.outerHeight(),widgetTop=sidebarWidgets.offset().top,widgetH=sidebarWidgets.outerHeight(),extraSpace=(sidebarH-(widgetTop+widgetH));
    if(extraSpace>0)sidebarWidgets.css(
        {
            marginTop:extraSpace+"px"
        }
    )
}
function bodyCheck()
{
    var newClass=jQuery('#page-info').attr('class');
    theBody.removeClass().addClass(newClass);
    mobileCheck();
    osCheck();
    if(jQuery('.page-image-container').length>0||theBody.hasClass('page-template-page-videos')||theBody.hasClass('page-template-page-gallery'))
    {
        theBody.addClass('stopSlideshow');
        pauseBgVideo()
    }
    else
    {
        playBgVideo()
    }
}
jQuery(document).on('click','#load-more',function()
    {
        if(!jQuery('#load-more').hasClass(".loading"))
        {
            var thisLink=jQuery('#load-more a'),url=thisLink.attr('href');
            thisLink.parent().addClass('loading');
            jQuery('.scroll-this').append('<div id="newStuff"></div>');
            var newStuff=jQuery('#newStuff');
            newStuff.hide().load(url+" .scroll-this > div",function()
                {
                    newStuff.waitForImages(function()
                        {
                            jQuery('.loading').remove();
                            jQuery('#newStuff > div').unwrap().hide().fadeIn(300);
                            postsCenter();
                            postOverflowCheck();
                            letMyPeopleScroll();
                            scrollOnce()
                        }
                    )
                }
            )
        }
        return false
    }
);
jQuery(document).on('submit',"#full-search",function()
    {
        if(theBody.hasClass('ajax-on'))
        {
            var searchVal=bigInput.val(),adjustedVal=encodeURIComponent(searchVal),url=siteUrl+'?s='+adjustedVal;
            if(jQuery.trim(bigInput.val()).length>0)
            {
                bigInput.blur();
                jQuery("html,body").stop().animate(
                    {
                        scrollTop:0
                    }
                    ,1500);
                loadingBg();
                loadingPage.stop(true,true).fadeIn(500,function()
                    {
                        pauseBgVideo();
                        closeSearch();
                        if(url!=window.location&&history.pushState)window.history.pushState(
                            {
                                path:url
                            }
                            ,'',url);
                        jQuery("#ajax-content").remove();
                        contentContainer.append('<div id="load-here"></div>');
                        var loadHere=jQuery('#load-here');
                        loadHere.load(url+" #ajax-content",null,function()
                            {
                                document.title=jQuery('#page-info').data('page-title');
                                playBgVideo();
                                if(loadHere.html().length>0)
                                {
                                    loadHere.waitForImages(function()
                                        {
                                            loadHere.replaceWith(loadHere.html());
                                            jQuery('.scroll-wrapper').scrollLeft(0);
                                            jQuery('.scroll-this > div').scrollTop(0);
                                            loadingPage.stop().fadeOut(800,function()
                                                {
                                                    loadingBg()
                                                }
                                            );
                                            jQuery('.current-menu-item').removeClass('current-menu-item');
                                            pageCenter();
                                            postsCenter();
                                            galleryCheck();
                                            postOverflowCheck();
                                            letMyPeopleScroll();
                                            scrollOnce()
                                        }
                                    )
                                }
                                else
                                {
                                    loadingPage.stop().fadeOut(800);
                                    alert('Nothing found.')
                                }
                            }
                        )
                    }
                );
                return false
            }
            else
            {
                alert('Search field is empty.');
                return false
            }
        }
    }
);
jQuery(document).on('click',"a",function()
    {
        var thisLink=jQuery(this),thisParent=thisLink.parent().attr('id'),url=thisLink.attr('href');
        if(thisLink.attr('id')!='link-rss'&&url.indexOf(siteUrl)==0&&thisParent!="load-more"&&url.indexOf("#")==-1&&url.indexOf("wp-admin")==-1&&url.indexOf(".jpeg")==-1&&url.indexOf(".png")==-1&&url.indexOf(".gif")==-1&&url.indexOf(".jpg")==-1&&url.indexOf(".pdf")==-1&&url.indexOf("mailto")==-1&&theBody.hasClass('ajax-on'))
        {
            sideClose();
            loadingBg();
            loadingPage.stop(true,true).fadeIn(500,function()
                {
                    pauseBgVideo();
                    closeSearch();
                    if(url!=window.location&&history.pushState)window.history.pushState(
                        {
                            path:url
                        }
                        ,'',url);
                    jQuery("#ajax-content").remove();
                    contentContainer.append('<div id="load-here"></div>');
                    var loadHere=jQuery('#load-here');
                    loadHere.load(url+" #ajax-content",null,function()
                        {
                            document.title=jQuery('#page-info').data('page-title');
                            playBgVideo();
                            if(loadHere.html().length>0)
                            {
                                loadHere.waitForImages(function()
                                    {
                                        loadHere.replaceWith(loadHere.html());
                                        jQuery('.scroll-wrapper').scrollLeft(0);
                                        jQuery('.scroll-this > div').scrollTop(0);
                                        loadingPage.stop().fadeOut(800,function()
                                            {
                                                loadingBg()
                                            }
                                        );
                                        if(!thisLink.hasClass('pagenav'))
                                        {
                                            jQuery('.current-menu-item').removeClass('current-menu-item');
                                            jQuery('#dropmenu a').each(function()
                                                {
                                                    if(jQuery(this).attr('href')==url)
                                                    {
                                                        jQuery(this).parent().addClass('current-menu-item')
                                                    }
                                                }
                                            )
                                        }
                                        pageCenter();
                                        postsCenter();
                                        galleryCheck();
                                        postOverflowCheck();
                                        letMyPeopleScroll();
                                        scrollOnce()
                                    }
                                )
                            }
                            else
                            {
                                loadingPage.stop().fadeOut(800);
                                alert('Nothing found.')
                            }
                        }
                    )
                }
            );
            return false
        }
    }
);
theWindow.on("popstate",function(e)
    {
        var thisLink=location.href,url=location.href;
        if(url.indexOf(siteUrl)==0&&url.indexOf("#")==-1&&url.indexOf("wp-admin")==-1&&url.indexOf(".jpeg")==-1&&url.indexOf(".png")==-1&&url.indexOf(".gif")==-1&&url.indexOf(".jpg")==-1&&url.indexOf(".pdf")==-1&&url.indexOf("mailto")==-1&&theBody.hasClass('ajax-on'))
        {
            sideClose();
            loadingBg();
            loadingPage.stop(true,true).fadeIn(500,function()
                {
                    pauseBgVideo();
                    closeSearch();
                    if(url!=window.location&&history.pushState)window.history.pushState(
                        {
                            path:url
                        }
                        ,'',url);
                    jQuery("#ajax-content").remove();
                    contentContainer.append('<div id="load-here"></div>');
                    var loadHere=jQuery('#load-here');
                    loadHere.load(url+" #ajax-content",null,function()
                        {
                            document.title=jQuery('#page-info').data('page-title');
                            playBgVideo();
                            if(loadHere.html().length>0)
                            {
                                loadHere.waitForImages(function()
                                    {
                                        loadHere.replaceWith(loadHere.html());
                                        jQuery('.scroll-wrapper').scrollLeft(0);
                                        jQuery('.scroll-this > div').scrollTop(0);
                                        loadingPage.stop().fadeOut(800,function()
                                            {
                                                loadingBg()
                                            }
                                        );
                                        jQuery('.current-menu-item').removeClass('current-menu-item');
                                        jQuery('#dropmenu a').each(function()
                                            {
                                                if(jQuery(this).attr('href')==url)
                                                {
                                                    jQuery(this).parent().addClass('current-menu-item')
                                                }
                                            }
                                        );
                                        pageCenter();
                                        postsCenter();
                                        galleryCheck();
                                        postOverflowCheck();
                                        letMyPeopleScroll();
                                        scrollOnce()
                                    }
                                )
                            }
                            else
                            {
                                loadingPage.stop().fadeOut(800);
                                alert('Nothing found.')
                            }
                        }
                    )
                }
            );
            return false
        }
    }
);
function closeSearch()
{
    fullSearch.stop(true,true).fadeOut(350);
    bigInput.blur();
    theBody.removeClass('search-open')
}
jQuery(document).on('click','#link-search',function()
    {
        if(theBody.hasClass('search-open'))
        {
            closeSearch()
        }
        else
        {
            loadingBg();
            fullSearch.stop(true,true).fadeIn(350);
            bigInput.val('').focus();
            theBody.addClass('search-open');
            if(!theBody.hasClass('mobile-device'))jQuery("html,body").stop().animate(
                {
                    scrollTop:0
                }
                ,1500)
        }
        return false
    }
);
jQuery(document).on('click','#full-search',function(e)
    {
        if(!jQuery(e.target).is("#big-input"))closeSearch()
    }
);
jQuery(document).on('click','#slide-right',function()
    {
        var scrollAmt=theWindow.width()*.37;
        clearInterval(rightScroll);
        jQuery('.scroll-wrapper').stop().animate(
            {
                scrollLeft:'+='+scrollAmt+'px'
            }
            ,800)
    }
);
jQuery(document).on('click','#slide-left',function()
    {
        var scrollAmt=theWindow.width()*.37;
        clearInterval(leftScroll);
        jQuery('.scroll-wrapper').stop().animate(
            {
                scrollLeft:'-='+scrollAmt+'px'
            }
            ,800)
    }
);
jQuery(document).on('mouseenter','#slide-right',function()
    {
        rightScroll=setInterval(function()
            {
                jQuery('.scroll-wrapper').stop().animate(
                    {
                        scrollLeft:'+=150px'
                    }
                    ,350,'linear')
            }
            ,350)
    }
);
jQuery(document).on('mouseleave','#slide-right',function()
    {
        jQuery('.scroll-wrapper').stop();
        clearInterval(rightScroll)
    }
);
jQuery(document).on('mouseenter','#slide-left',function()
    {
        leftScroll=setInterval(function()
            {
                jQuery('.scroll-wrapper').stop().animate(
                    {
                        scrollLeft:'-=150px'
                    }
                    ,350,'linear')
            }
            ,350)
    }
);
jQuery(document).on('mouseleave','#slide-left',function()
    {
        jQuery('.scroll-wrapper').stop();
        clearInterval(leftScroll)
    }
);
function postOverflowCheck()
{
    var posts=jQuery('.posts-container .post, .posts-container .page');
    jQuery('.scroll-notice').remove();
    posts.removeClass('overflowin');
    posts.each(function()
        {
            var thisPost=jQuery(this);
            if(thisPost.get(0).scrollHeight>(thisPost.height()+3)&&!thisPost.hasClass('scrolled'))
            {
                thisPost.addClass('overflowin').append('<div class="scroll-notice">+</div>')
            }
        }
    )
}
jQuery(document).on('click','.scroll-notice',function()
    {
        var thisNotice=jQuery(this),thisPost=thisNotice.parent(),thisPostH=thisPost.height()*.6;
        thisNotice.stop(true,true).fadeOut(500);
        thisPost.stop(true,true).animate(
            {
                scrollTop:'+='+thisPostH+'px'
            }
            ,500)
    }
);
function scrollOnce()
{
    jQuery(".posts-container .post, .posts-container .page").one('scroll',function()
        {
            var thisPost=jQuery(this),thisNotice=thisPost.children('.scroll-notice');
            thisPost.addClass('scrolled');
            thisNotice.stop().fadeOut(500)
        }
    )
}
function letMyPeopleScroll()
{
    if(jQuery('.scroll-this').width()>theWindow.width())
    {
        jQuery('.slide-nav').stop(true,true).fadeIn(300)
    }
    else
    {
        jQuery('.slide-nav').stop(true,true).fadeOut(300)
    }
}
function galleryCheck()
{
    galleryImg=jQuery('.gallery-image');
    if(galleryImg.length>0)
    {
        nextImg=jQuery('#nextImg');
        prevImg=jQuery('#prevImg');
        firstImg=galleryImg.first();
        lastImg=galleryImg.last();
        imageInfo=jQuery('#imgInfo');
        numberItems=galleryImg.length;
        firstImg.addClass('activeImg');
        galleryImg.not('.activeImg').hide();
        var imgTitle=firstImg.data('imgtitle'),imgCaption=firstImg.data('caption'),itemNumber=firstImg.index()+1;
        if(imgTitle.length>0&&imgCaption.length>0)
        {
            imageInfo.html("<small>"+itemNumber+" / "+numberItems+"</small><h2>"+imgTitle+"</h2><p>"+imgCaption+"</p>").fadeIn(150)
        }
        else if(imgTitle.length>0)
        {
            imageInfo.html("<small>"+itemNumber+" / "+numberItems+"</small><h2>"+imgTitle+"</h2>")
        }
    }
}
jQuery(document).on('click','#nextImg',function()
    {
        var activeImg=jQuery('.activeImg'),nextLi=activeImg.next();
        if(nextLi.length>0)
        {
            activeImg.removeClass('activeImg');
            nextLi.addClass('activeImg').stop(true,true).fadeIn(800,function()
                {
                    activeImg.hide()
                }
            );
            var imgTitle=nextLi.data('imgtitle'),imgCaption=nextLi.data('caption'),itemNumber=nextLi.index()+1
        }
        else
        {
            activeImg.removeClass('activeImg');
            firstImg.addClass('activeImg').stop(true,true).fadeIn(800,function()
                {
                    activeImg.hide()
                }
            );
            var imgTitle=firstImg.data('imgtitle'),imgCaption=firstImg.data('caption'),itemNumber=firstImg.index()+1
        }
        if(imgTitle.length>0&&imgCaption.length>0)
        {
            imageInfo.html("<small>"+itemNumber+" / "+numberItems+"</small><h2>"+imgTitle+"</h2><p>"+imgCaption+"</p>")
        }
        else if(imgTitle.length>0)
        {
            imageInfo.html("<small>"+itemNumber+" / "+numberItems+"</small><h2>"+imgTitle+"</h2>")
        }
    }
);
jQuery(document).on('click','#prevImg',function()
    {
        var activeImg=jQuery('.activeImg'),prevLi=activeImg.prev();
        if(prevLi.length>0)
        {
            activeImg.removeClass('activeImg');
            prevLi.addClass('activeImg').stop(true,true).fadeIn(800,function()
                {
                    activeImg.hide()
                }
            );
            var imgTitle=prevLi.data('imgtitle'),imgCaption=prevLi.data('caption'),itemNumber=prevLi.index()+1
        }
        else
        {
            activeImg.removeClass('activeImg');
            lastImg.addClass('activeImg').stop(true,true).fadeIn(800,function()
                {
                    activeImg.hide()
                }
            );
            var imgTitle=lastImg.data('imgtitle'),imgCaption=lastImg.data('caption'),itemNumber=lastImg.index()+1
        }
        if(imgTitle.length>0&&imgCaption.length>0)
        {
            imageInfo.html("<small>"+itemNumber+" / "+numberItems+"</small><h2>"+imgTitle+"</h2><p>"+imgCaption+"</p>")
        }
        else if(imgTitle.length>0)
        {
            imageInfo.html("<small>"+itemNumber+" / "+numberItems+"</small><h2>"+imgTitle+"</h2>")
        }
    }
);
var sidebarSpeed=350,sidebarWidth=300;
function sideOpen()
{
    theBody.addClass('open-sidebar');
    contentCover.stop().fadeIn(sidebarSpeed);
    contentContainer.stop().animate(
        {
            right:sidebarWidth+'px'
        }
        ,sidebarSpeed)
}
function sideClose()
{
    menuControl.stop().fadeIn(sidebarSpeed);
    contentCover.stop().fadeOut(sidebarSpeed);
    contentContainer.stop().animate(
        {
            right:0
        }
        ,sidebarSpeed,function()
        {
            theBody.removeClass('open-sidebar')
        }
    );
    jQuery("html,body").stop().animate(
        {
            scrollTop:0
        }
        ,1500)
}
jQuery(document).on('click','#menu-control',function()
    {
        if(theBody.hasClass('open-sidebar'))sideClose();
        else sideOpen()
    }
);
jQuery(document).on('click','#contentCover',function()
    {
        sideClose();
        return false
    }
);
function playAudio()
{
    // audioPlayer[0].play();
    // audioPlayer.animate(
    //     {
    //         volume:.35
    //     }
    //     ,1000);
    // audioControl.removeClass('paused').addClass('playing');
    // audioSpan.each(function(i)
    //     {
    //         playingBar(jQuery(this))
    //     }
    // )
}
function pauseAudio()
{
    audioPlayer.animate(
        {
            volume:0
        }
        ,1000,function()
        {
            audioPlayer[0].pause();
            audioControl.removeClass('playing').addClass('paused')
        }
    );
    pauseBar()
}
audioControl.click(function()
    {
        if(audioControl.hasClass('playing'))pauseAudio();
        else playAudio()
    }
);
audioControl.hover(function()
    {
        if(audioControl.hasClass('paused'))
        {
            audioSpan.each(function(i)
                {
                    hoverBar(jQuery(this))
                }
            )
        }
    }
    ,function()
    {
        if(audioControl.hasClass('paused'))pauseBar()
    }
);
if(audioPlayer.length>0)
{
    audioPlayer[0].loop=true
}
function playingBar(bar)
{
    var height=Math.random()*20+3;
    var timing=height*10;
    bar.animate(
        {
            height:height
        }
        ,timing,function()
        {
            playingBar(jQuery(this))
        }
    )
}
function pauseBar()
{
    audioSpan.stop(true,false).animate(
        {
            height:'8px'
        }
        ,500)
}
function hoverBar(bar)
{
    var height=Math.random()*20+3;
    var timing=height*10;
    bar.stop(true,true).animate(
        {
            height:height
        }
        ,timing)
}
function pauseIfPlaying()
{
    if(audioControl.hasClass('playing'))
    {
        pauseAudio();
        audioControl.addClass('holding')
    }
}
function pauseBgVideo()
{
    if(headerImages.hasClass('wallpaper'))headerImages.wallpaper("stop")
}
function playBgVideo()
{
    if(headerImages.hasClass('wallpaper'))headerImages.wallpaper("play")
}
jQuery(document).on('click','.post-video',function()
    {
        var thisVideo=jQuery(this),videoType=thisVideo.data('vidtype'),videoId=thisVideo.data('vidid'),videoContainer=jQuery('.videoContainer');
        jQuery("html,body").stop().animate(
            {
                scrollTop:0
            }
            ,1500);
        if(videoType=='self-video')
        {
            videoContainer.append('<video class="postVideo selfVid" width="320" height="240" controls autoplay><source src="'+videoId+'" type="video/mp4">Your browser does not support the video tag.</video> ')
        }
        else if(videoType=='youtube-video')
        {
            videoContainer.append('<iframe class="postVideo youTubeVid" src="https://www.youtube.com/embed/'+videoId+'?rel=0&amp;showinfo=0&amp;controls=1&amp;autoplay=1" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
        }
        else if(videoType=='vimeo-video')
        {
            videoContainer.append('<iframe class="postVideo vimeoVid" src="//player.vimeo.com/video/'+videoId+'?autoplay=1&color=ffffff&title=0&byline=0&portrait=0&badge=0" width="500" height="209" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
        }
        videoContainer.stop(true,true).fadeIn(300,function()
            {
                pauseBgVideo()
            }
        );
        pauseIfPlaying();
        theBody.addClass('full-screen-video');
        if(videoType=='self-video')
        {
            var videoTag=document.getElementsByTagName('video')[0];
            videoTag.onended=function(e)
            {
                closeVideo()
            }
        }
        return false
    }
);
jQuery(document).on('click','.videoLink',function()
    {
        var linkId=jQuery(this).attr('id'),videoContainer=jQuery('.videoContainer'),videoId=videoContainer.data('vidid');
        jQuery("html,body").stop().animate(
            {
                scrollTop:0
            }
            ,1500);
        if(videoContainer.hasClass('self-video'))
        {
            videoContainer.append('<video class="postVideo selfVid" width="320" height="240" controls autoplay><source src="'+videoId+'" type="video/mp4">Your browser does not support the video tag.</video> ')
        }
        else if(videoContainer.hasClass('youtube-video'))
        {
            videoContainer.append('<iframe class="postVideo youTubeVid" src="https://www.youtube.com/embed/'+videoId+'?rel=0&amp;showinfo=0&amp;controls=1&amp;autoplay=1" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
        }
        else if(videoContainer.hasClass('vimeo-video'))
        {
            videoContainer.append('<iframe class="postVideo vimeoVid" src="//player.vimeo.com/video/'+videoId+'?autoplay=1&color=ffffff&title=0&byline=0&portrait=0&badge=0" width="500" height="209" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
        }
        videoContainer.stop(true,true).fadeIn(300,function()
            {
                pauseBgVideo()
            }
        );
        pauseIfPlaying();
        theBody.addClass('full-screen-video');
        if(videoContainer.hasClass('self-video'))
        {
            var videoTag=document.getElementsByTagName('video')[0];
            videoTag.onended=function(e)
            {
                closeVideo()
            }
        }
        return false
    }
);
function closeVideo()
{
    var videoContainer=jQuery('.videoContainer');
    playBgVideo();
    videoContainer.stop(true,true).fadeOut(300,function()
        {
            jQuery('.postVideo').remove()
        }
    );
    if(audioControl.hasClass('holding'))
    {
        playAudio();
        audioControl.removeClass('holding')
    }
    theBody.removeClass('full-screen-video')
}
jQuery(document).on('click','.closeVideo',function()
    {
        closeVideo()
    }
);
function mobileCheck()
{
    var mobile=(/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
    if(mobile)theBody.addClass('mobile-device')
}
mobileCheck();
function osCheck()
{
    if(navigator.appVersion.indexOf("Win")!=-1)theBody.addClass("windowsOs");
    else if(navigator.appVersion.indexOf("Mac")!=-1)theBody.addClass("macOs");
    else if(navigator.appVersion.indexOf("X11")!=-1)theBody.addClass("unixOs");
    else if(navigator.appVersion.indexOf("Linux")!=-1)theBody.addClass("linuxOs")
}
osCheck();
function footerHeight()
{
    var footerHeight=footer.outerHeight();
    if(!theBody.hasClass('mobile-device'))theBody.css(
        {
            paddingBottom:footerHeight+"px"
        }
    )
}
function imageSlideshow()
{
    var firstBg=headerImage.first();
    activeBg=jQuery('.activeBg');
    if(!activeBg.length>0)
    {
        firstBg.addClass('activeBg');
        var activeBg=firstBg
    }
    var nextBg=activeBg.next();
    if(nextBg.length>0)
    {
        activeBg.removeClass('activeBg');
        nextBg.addClass('activeBg').stop(true,true).fadeIn(3000,function()
            {
                activeBg.hide()
            }
        )
    }
    else
    {
        activeBg.removeClass('activeBg');
        firstBg.addClass('activeBg').stop(true,true).fadeIn(3000,function()
            {
                activeBg.hide()
            }
        )
    }
};
function reviewsSlideshow()
{
    var firstReview=jQuery('.review').first();
    activeReview=jQuery('.activeReview');
    if(!activeReview.length>0)
    {
        firstReview.addClass('activeReview');
        var activeReview=firstReview
    }
    var nextReview=activeReview.next();
    if(nextReview.length>0)
    {
        activeReview.removeClass('activeReview').stop(true,true).fadeOut(1500,function()
            {
                nextReview.addClass('activeReview').stop(true,true).fadeIn(1500)
            }
        )
    }
    else
    {
        activeReview.removeClass('activeReview').stop(true,true).fadeOut(1500,function()
            {
                firstReview.addClass('activeReview').stop(true,true).fadeIn(1500)
            }
        )
    }
};
function containerHeight()
{
    var winHeight=jQuery(window).height();
    contentContainer.css(
        {
            height:winHeight+'px'
        }
    )
}
containerHeight();
function pageCenter()
{
    var pageContent=jQuery('#pageContent');
    if(pageContent.length>0)
    {
        var pageTop='-'+(pageContent.outerHeight()/2)+'px',pageHeight=pageContent[0].scrollHeight;
        pageContent.css(
            {
                marginTop:pageTop
            }
        );
        if(pageHeight>420)
        {
            pageContent.addClass('with-scrollbar')
        }
        else
        {
            pageContent.removeClass('with-scrollbar')
        }
    }
}
pageCenter();
function postsCenter()
{
    var postContent=jQuery('.posts-container');
    if(postContent.length>0)
    {
        var postTop='-'+(postContent.outerHeight()/2)+'px';
        postContent.css(
            {
                marginTop:postTop
            }
        )
    }
}
postsCenter();


theWindow.resize(function()
    {
        containerHeight();
        footerHeight();
        pageCenter();
        postsCenter();
        postOverflowCheck();
        letMyPeopleScroll();
        widgetPos()
    }
).load(function()
    {
        jQuery('.scroll-wrapper').scrollLeft(0);
        jQuery('.scroll-this > div').scrollTop(0);
        loadingPage.stop(true,true).fadeOut(800,function()
            {
                loadingBg()
            }
        );
        footerHeight();
        pageCenter();
        postsCenter();
        galleryCheck();
        postOverflowCheck();
        scrollOnce();
        letMyPeopleScroll();
        widgetPos();
        bodyCheck();
        runHeader();
        runReviews();

        //if(!jQuery('body').hasClass('mobile-device'))playAudio()
    }
);



jQuery(function(){
    new jQuery.Zebra_Tooltips(jQuery('.tooltips'));
});

var elements = jQuery('.modal-overlay, .modal');

jQuery('.contributeBTN').click(function(){
    elements.addClass('active');
});

jQuery('.close-modal').click(function(){
    elements.removeClass('active');
});

$ = jQuery;

$(function() {
    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        // Variables privadas
        var links = this.el.find('.link');
        // Evento
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    };

    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el;
        $this = $(this),
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        };
    };

    var accordion = new Accordion($('#accordion'), false);
});

jQuery(function(){
    contract.update();
});