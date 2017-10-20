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


/*** Current Time & Duration
 ****************************/


function playPause(){
    if(vid.paused){
        playPauseBtn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
        vid.play();
    }else{
        playPauseBtn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
        vid.pause();
    }
}

function duration(){
    
    var secDuration     = Math.floor(vid.duration %60 %60),
        minDuration     = Math.floor(vid.duration / 60 %60),
        hourDuration    = Math.floor(vid.duration /60 /60);
    
    
    dur.innerHTML = "";
    
    if(hourDuration != 0){
        
        if(hourDuration < 10){
            dur.innerHTML += "0" + hourDuration;
        }
        if(hourDuration < 60 & hourDuration > 9){
            dur.innerHTML += hourDuration;
        }
        
        if(minDuration < 10){
            dur.innerHTML += ":0" + minDuration;
        }
        if(minDuration < 60 & minDuration > 9){
           dur.innerHTML += ":" + minDuration;
        }

    }else{
        
        if(minDuration < 10){
            dur.innerHTML += "0" + minDuration;
        }
        if(minDuration < 60 & minDuration > 9){
           dur.innerHTML += minDuration;
        }
        
    }
    
    if(secDuration < 10){
       dur.innerHTML += ":0" + secDuration;
    }
    if(secDuration < 60 & secDuration > 9){
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
        
        if(hourCurTime < 10){
            cur.innerHTML += "0" + hourCurTime;
        }
        if(hourCurTime < 60 & hourCurTime > 9){
            cur.innerHTML += hourCurTime;
        }

        if(minCurTime < 10){
            cur.innerHTML += ":0" + minCurTime;
        }
        if(minCurTime < 60 & minCurTime > 9){
           cur.innerHTML += ":" + minCurTime;
        }
       
    }else{

        if(minCurTime < 10){
            cur.innerHTML += "0" + minCurTime;
        }
        if(minCurTime < 60 & minCurTime > 9){
           cur.innerHTML += minCurTime;
        }
    }
    
    
    if(secCurTime < 10){
       cur.innerHTML += ":0" + secCurTime;
    }
    if(secCurTime < 60 & secCurTime > 9){
       cur.innerHTML += ":" + secCurTime;
    }
    
      
    
}

function progBuffer(){
    if (vid.duration > 0) {
        buffer.style.width = ((vid.buffered.end(vid.buffered.length - 1) / vid.duration)*100) + "%";
    }
}

function SeekBuffer(){
    
    var inc = progressBar.width / vid.duration;
        
    for (i = 0; i < vid.buffered.length; i++) {

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
    
    if (vid.duration > 0) {
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

        if(hourcurSeek < 10){
            curSeek.innerHTML += "0" + hourcurSeek;
        }
        if(hourcurSeek < 60 & hourcurSeek > 9){
            curSeek.innerHTML += hourcurSeek;
        }

        if(mincurSeek < 10){
            curSeek.innerHTML += ":0" + mincurSeek;
        }
        if(mincurSeek < 60 & mincurSeek > 9){
           curSeek.innerHTML += ":" + mincurSeek;
        }

    }
    else{

        if(mincurSeek < 10){
            curSeek.innerHTML += "0" + mincurSeek;
        }
        if(mincurSeek < 60 & mincurSeek > 9){
           curSeek.innerHTML += mincurSeek;
        }

    }


    if(seccurSeek < 10){
        curSeek.innerHTML += ":0" + seccurSeek;
    }
    if(seccurSeek < 60 & seccurSeek > 9){
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
        volumeBtn.innerHTML = '<i class="fa fa-volume-off" aria-hidden="true"></i>';
        vid.volume = 0;
    }else{
        volumeBtn.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true"></i>';
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