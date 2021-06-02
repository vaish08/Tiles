var color = ["pink", "green", "yellow", "orange", "blue", "red"];
var greyRandomNum = Math.floor(Math.random() * 25);

var images = document.querySelectorAll(".img");
var divs = document.querySelectorAll(".box");
var ans_images = document.querySelectorAll(".ans_img")
var win_images = document.querySelectorAll(".ans_img");
var disp = document.getElementById("count");
var grey_pos, count = 0;

// for(var i = 0; i < ans_images.length; i++){
//   if(i != greyRandomNum){
//     var randomNum = Math.floor(Math.random() * 6);
//     ans_images[i].setAttribute("src", "images/" + color[randomNum] + ".jpeg");
//   }
// }

for(var i = 0; i < images.length; i++){
  var image = images[i];
  var curr_img = image.getAttribute("src");
  if(curr_img == 'images/grey.jpeg'){
    grey_pos = i;
  }
}

//inputs the keypressed
document.addEventListener("keydown", function(event){
  var button = event.key;
  if(button == 'ArrowLeft' || button == 'ArrowRight' || button == 'ArrowUp' || button == 'ArrowDown'){
    startTimer();
    swap(button);
    disp.innerHTML = count;
    check_win();
  }
})


//controls the movement of the grey tile
function swap(key){
  switch(key){
    case 'ArrowLeft':
      if(grey_pos % 5 != 0){
        count++;
        var prev_pos = images[grey_pos - 1].getAttribute("src");
        images[grey_pos-1].setAttribute("src", "images/grey.jpeg");
        images[grey_pos].setAttribute("src", prev_pos);
        grey_pos -= 1;
      }
      break;


    case 'ArrowRight':
      if(grey_pos % 5 != 4){
        count++;
        var prev_pos = images[grey_pos + 1].getAttribute("src");
        images[grey_pos + 1].setAttribute("src", "images/grey.jpeg");
        images[grey_pos].setAttribute("src", prev_pos);
        grey_pos += 1;
      }
      break;


    case 'ArrowUp':
      if(grey_pos > 4){
        count++;
        //var prev_pos = images[grey_pos - 5].getAttribute("src");
          //move(138, 76, grey_pos, grey_pos - 5);
          //move(138, grey_pos);
          animate();
          //images[grey_pos - 5].setAttribute("src", "images/grey.jpeg");
          //images[grey_pos].setAttribute("src", prev_pos);
          //grey_pos -= 5;
      }
      break;



    case 'ArrowDown':
      if(grey_pos < 20){
        count++;
        var prev_pos = images[grey_pos + 5].getAttribute("src");
        images[grey_pos + 5].setAttribute("src", "images/grey.jpeg");
        images[grey_pos].setAttribute("src", prev_pos);
        grey_pos += 5;
      }
    break;
}
}

function animate() {
  var grey_pos = 14;
  var images = document.querySelectorAll(".img");
  var box1 = images[grey_pos];
  var box2 = images[grey_pos-5];
  box1.keyframes = [{
      transform: "translate3d(0px, -58px, 0px)"
  }];
  box1.animProps = {
      duration: 500,
  }
  box2.keyframes = [{
      transform: "translate3d(0px, 58px, 0px)"
  }];
  box2.animProps = {
      duration: 500,
  }
  var box1src = box1.getAttribute("src");
  var box2src = box2.getAttribute("src");
  var animationBox1 = box1.animate(box1.keyframes, box1.animProps).onfinish = function() {
    updateImage(box1, box2src);
  };
  var animationBox2 = box2.animate(box2.keyframes, box2.animProps).onfinish = function() {
    updateImage(box2, box1src);
  };
}

function updateImage(box, src) {
  box.setAttribute("src", src);
}
//checks for the win.
function check_win(){
  var x = 6;
  for(var i = 0; i < win_images.length; i++){
    if(i == 3){x += 2};
    if(i == 6){x += 2};
    if(images[x++].getAttribute("src") != win_images[i].getAttribute("src")){
      return;
    }
  }
  document.getElementById("message").style.display = "block";
  document.getElementsByTagName("button")[0].style.display = "block";
  stopTimer();
  return true;
}

//animation
var id = null;
function move(pos1, ele1){
  clearInterval(id);
  var x = pos1;
  var a = divs[ele1];
  id = setInterval(frame, 5);
  function frame(){
    if(x == 76){
      clearInterval(id);
    }
    else{
      x--;
      a.style.top = x + 'px';
    }
  }
}

//prevent scrolling
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


// creating timer
const timer = document.getElementById('stopwatch');

var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;

function startTimer() {
  if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}
function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
    if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }

    timer.innerHTML = "Timer: " + hr + ':' + min + ':' + sec;

    setTimeout("timerCycle()", 1000);
  }
}

function resetTimer() {
    timer.innerHTML = 'Timer: 00:00:00';
    stoptime = true;
    hr = 0;
    sec = 0;
    min = 0;
  }

// to refresh page
function refreshPage(){
  window.location.reload();
}
