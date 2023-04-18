(function(){

  var SCROLL_WIDTH = 24;

  var btn_popup = document.getElementById("btn_popup");
  var popup = document.getElementById("popup");
  var popup_bar = document.getElementById("popup_bar");
  var btn_close = document.getElementById("btn_close");
  var smoke = document.getElementById("smoke");

  //-- let the popup make draggable & movable.
  var offset = { x: 0, y: 0 };

  popup_bar.addEventListener('mousedown', mouseDown, false);
  window.addEventListener('mouseup', mouseUp, false);

  function mouseUp()
  {
    window.removeEventListener('mousemove', popupMove, true);
  }

  function mouseDown(e){
    offset.x = e.clientX - popup.offsetLeft;
    offset.y = e.clientY - popup.offsetTop;
    window.addEventListener('mousemove', popupMove, true);
  }

  function popupMove(e){
    popup.style.position = 'absolute';
    var top = e.clientY - offset.y;
    var left = e.clientX - offset.x;
    popup.style.top = top + 'px';
    popup.style.left = left + 'px';
  }
  //-- / let the popup make draggable & movable.

  window.onkeydown = function(e){
    if(e.keyCode == 27){ // if ESC key pressed
      btn_close.click(e);
    }
  }

  btn_popup.onclick = function(e){
    // smoke
    spreadSmoke(true);
    // reset div position
    popup.style.top = "4px";
    popup.style.left = "4px";
    popup.style.width = window.innerWidth - SCROLL_WIDTH + "px";
    popup.style.height = window.innerHeight - SCROLL_WIDTH + "px";
    popup.style.display = "block";
  }

  btn_close.onclick = function(e){
    popup.style.display = "none";
    smoke.style.display = "none";
  }

  window.onresize = function(e){
    spreadSmoke();
  }
  
  function spreadSmoke(flg){
    smoke.style.width = window.outerWidth + 100 + "px";
    smoke.style.height = window.outerHeight + 100 + "px";
    if (flg != undefined && flg == true) smoke.style.display = "block";
  }

}());