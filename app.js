'use strict';

!function(){
  var pendingTimeouts = {};
  var current = null;
  // Settings 
  var mouseoverDelay = 250;

  var video = document.getElementsByTagName('video')[0];
  var progressBar = document.getElementById('progress-bar');
  var allSteps = document.getElementsByClassName('step');

  var timeStamps = Array.prototype.map.call(allSteps, function(node){
    if (!node.hasAttribute('data-time'))
      console.log("Error: " + node + " is missing a 'data-time' attribute");
    return parseFloat(node.getAttribute('data-time'));
  });

  var setActive = function(node){
    //because current initially set to null, check for its existence first
    if ( current && current !== node ) 
      current.classList.remove("active");
    current = node;
    current.classList.add("active");
  }

  video.addEventListener('timeupdate',function(){
    progressBar.style.width = (video.currentTime / video.duration * 100)+'%';
    var i = 0;
    for(;i < timeStamps.length && timeStamps[i] <= video.currentTime;i++);
    setActive(allSteps[i-1]);
  });

  document.getElementById('vidtxt').addEventListener('mouseover',function(e){
    if ( e.target && e.target.hasAttribute('data-time') ){
      pendingTimeouts[e.target] = setTimeout(function(){
        video.currentTime = this.getAttribute('data-time');
      }.bind(e.target),mouseoverDelay);
    }
  });

  document.getElementById('vidtxt').addEventListener('mouseout',function(e){
    if ( e.target && e.target.hasAttribute('data-time') )
      clearTimeout(pendingTimeouts[e.target]);
  });

  document.getElementById('vid').addEventListener('click',function(e){
    if ( e.target && e.target.nodeName === 'VIDEO')
      video.paused ? video.play() : video.pause();
    if ( e.target && e.target.id === 'mute')
      video.muted = video.muted ? false : true;
  });
}();