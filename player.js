/*** Defined variables 
 *********************/
var player          = document.querySelector("#player"),
    vid             = document.querySelector("#video"),
    playPauseBtn    = document.querySelector(".playpause-btn"),
    cur             = document.querySelector(".currenttime"),
    dur             = document.querySelector(".duration"),
    progressBar     = document.querySelector(".progress-bar"),
    progress        = document.querySelector(".progress"),
    controls        = document.querySelector("#controls"),
    curSeek         = document.querySelector(".current-seek span"),
    buffer          = document.querySelector(".buffer"),
    volumeBtn       = document.querySelector(".volume-btn"),
    volumeBar       = document.querySelector(".volume-bar"),
    progressVol     = document.querySelector(".progress-vol"),
    buffer          = document.querySelector(".buffer"),curTime,seekTime;
/*** Event listeners
 ********************/
playPauseBtn.addEventListener("click", playPause, false);
vid.addEventListener("click", playPause, false);
vid.addEventListener("playing", duration, false);
vid.addEventListener("timeupdate", current, false);
progressBar.addEventListener("click", seekAble, false);
progressBar.addEventListener("mousemove", seekTimeTxt, false);
progressBar.addEventListener("mouseout", seekTimeTxtHide, false);
vid.addEventListener('progress', progBuffer, false);
vid.addEventListener('seeked', SeekBuffer, false);
vid.addEventListener("timeupdate", seekUpdate, false);
volumeBtn.addEventListener("click", mutedVol, false);
volumeBar.addEventListener("click", seekVol, false);
volumeBar.addEventListener("click", volUpdate, false);
/*** Current Time &amp; Duration
 ****************************/
function playPause(){
    if(vid.paused){
        playPauseBtn.innerHTML = '<i class="fa fa-pause" aria-hidden="true" />';
        vid.play();
    }else{
        playPauseBtn.innerHTML = '<i class="fa fa-play" aria-hidden="true" />';
        vid.pause();
    }
}
function duration(){
    
    var secDuration     = Math.floor(vid.duration %60 %60),
        minDuration     = Math.floor(vid.duration / 60 %60),
        hourDuration    = Math.floor(vid.duration /60 /60);
    
    
    dur.innerHTML = "";
    
    if(hourDuration != 0){
        
        if(hourDuration &lt; 10){
            dur.innerHTML += "0" + hourDuration;
        }
        if(hourDuration &lt; 60 &amp; hourDuration &gt; 9){
            dur.innerHTML += hourDuration;
        }
        
        if(minDuration &lt; 10){
            dur.innerHTML += ":0" + minDuration;
        }
        if(minDuration &lt; 60 &amp; minDuration &gt; 9){
           dur.innerHTML += ":" + minDuration;
        }
    }else{
        
        if(minDuration &lt; 10){
            dur.innerHTML += "0" + minDuration;
        }
        if(minDuration &lt; 60 &amp; minDuration &gt; 9){
           dur.innerHTML += minDuration;
        }
        
    }
    
    if(secDuration &lt; 10){
       dur.innerHTML += ":0" + secDuration;
    }
    if(secDuration &lt; 60 &amp; secDuration &gt; 9){
       dur.innerHTML += ":" + secDuration;
    }
    
    
}
function current(){
    
    curTime         = vid.currentTime;
    secCurTime      = Math.floor(curTime %60);
    minCurTime      = Math.floor(curTime /60) %60;
    hourCurTime     = Math.floor(curTime /60 /60);
    
    cur.innerHTML = "";
    
    if(hourCurTime != 0){
        
        if(hourCurTime &lt; 10){
            cur.innerHTML += "0" + hourCurTime;
        }
        if(hourCurTime &lt; 60 &amp; hourCurTime &gt; 9){
            cur.innerHTML += hourCurTime;
        }
        if(minCurTime &lt; 10){
            cur.innerHTML += ":0" + minCurTime;
        }
        if(minCurTime &lt; 60 &amp; minCurTime &gt; 9){
           cur.innerHTML += ":" + minCurTime;
        }
       
    }else{
        if(minCurTime &lt; 10){
            cur.innerHTML += "0" + minCurTime;
        }
        if(minCurTime &lt; 60 &amp; minCurTime &gt; 9){
           cur.innerHTML += minCurTime;
        }
    }
    
    
    if(secCurTime &lt; 10){
       cur.innerHTML += ":0" + secCurTime;
    }
    if(secCurTime &lt; 60 &amp; secCurTime &gt; 9){
       cur.innerHTML += ":" + secCurTime;
    }
    
      
    
}
function progBuffer(){
    if (vid.duration &gt; 0) {
        buffer.style.width = ((vid.buffered.end(vid.buffered.length - 1) / vid.duration)*100) + "%";
    }
}
function SeekBuffer(){
    
    var inc = progressBar.width / vid.duration;
        
    for (i = 0; i &lt; vid.buffered.length; i++) {
        var startX = vid.buffered.start(i) * inc;
        var endX = vid.buffered.end(i) * inc;
        var width = endX - startX;
        buffer.style.width = width + "%";
    }
}
function seekAble(e){
    seekTime = vid.duration * ((e.pageX - progressBar.offsetLeft) / progressBar.offsetWidth);
    vid.currentTime = seekTime;
}
function seekUpdate(){
    
    if (vid.duration &gt; 0) {
      progress.style.width = ((vid.currentTime / vid.duration)*100) + "%";
    }
}
function seekTimeTxt(e){
    
    seccurSeek      = Math.floor(vid.duration * (e.pageX - progressBar.offsetLeft ) / progressBar.offsetWidth) %60;
    mincurSeek      = Math.floor((vid.duration * (e.pageX - progressBar.offsetLeft) / progressBar.offsetWidth) /60) %60;
    hourcurSeek     = Math.floor((vid.duration * (e.pageX  - progressBar.offsetLeft) / progressBar.offsetWidth) /60 /60);
    visibilityError = Math.sign(vid.duration * (e.pageX - progressBar.offsetLeft ) / progressBar.offsetWidth);
    curSeek.innerHTML = "";
    if(hourcurSeek != 0){
        if(hourcurSeek &lt; 10){
            curSeek.innerHTML += "0" + hourcurSeek;
        }
        if(hourcurSeek &lt; 60 &amp; hourcurSeek &gt; 9){
            curSeek.innerHTML += hourcurSeek;
        }
        if(mincurSeek &lt; 10){
            curSeek.innerHTML += ":0" + mincurSeek;
        }
        if(mincurSeek &lt; 60 &amp; mincurSeek &gt; 9){
           curSeek.innerHTML += ":" + mincurSeek;
        }
    }
    else{
        if(mincurSeek &lt; 10){
            curSeek.innerHTML += "0" + mincurSeek;
        }
        if(mincurSeek &lt; 60 &amp; mincurSeek &gt; 9){
           curSeek.innerHTML += mincurSeek;
        }
    }
    if(seccurSeek &lt; 10){
        curSeek.innerHTML += ":0" + seccurSeek;
    }
    if(seccurSeek &lt; 60 &amp; seccurSeek &gt; 9){
        curSeek.innerHTML += ":" + seccurSeek;
    }
    progressBar.addEventListener("mousemove", function(){
        if(visibilityError == -1){
            curSeek.innerHTML = "00:00";
            curSeek.style.visibility    = "hidden";
        }
    }, false);
    
    document.querySelector(".current-seek").style.left  = (e.pageX) - 17.4 + "px";
    curSeek.style.visibility    = "visible";
            
    
    
}
function seekTimeTxtHide(){
    curSeek.style.visibility    = "hidden";
}
function mutedVol(){
    
    if(vid.volume != 0){
        volumeBtn.innerHTML = '<i class="fa fa-volume-off" aria-hidden="true" />';
        vid.volume = 0;
    }else{
        volumeBtn.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true" />';
        vid.volume = 1;
    }
    
}
function seekVol(e){
    seekVol = (e.pageX - volumeBar.offsetLeft) / volumeBar.offsetWidth;
    vid.volume = seekVol;
}
function volUpdate(){
    progressVol.style.width = vid.volume * 100 + "%";
}
