var color = ["pink", "green", "yellow", "orange", "blue", "red"];
var greyRandomNum = Math.floor(Math.random() * 25);

var images = document.querySelectorAll(".img");
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
        var prev_pos = images[grey_pos - 5].getAttribute("src");
          images[grey_pos - 5].setAttribute("src", "images/grey.jpeg");
          images[grey_pos].setAttribute("src", prev_pos);
          grey_pos -= 5;
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
