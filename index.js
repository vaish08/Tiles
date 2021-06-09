  var color = ["pink", "green", "yellow", "orange", "blue", "red"];
var greyRandomNum = Math.floor(Math.random() * 25);
var is_animating = false;
var time, flag = false;
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
  }
})

//controls the movement of the grey tile
function swap(key){
  switch(key){
    case 'ArrowLeft':
      if(grey_pos % 5 != 0){
        if(is_animating) return;
        is_animating = true;
        animate(grey_pos, key);
        count++;
        grey_pos -= 1;

      }
      break;


    case 'ArrowRight':
      if(grey_pos % 5 != 4){
        if(is_animating) return;
        is_animating = true;
        animate(grey_pos, key);
        count++;
        grey_pos += 1;
      }
      break;


    case 'ArrowUp':
      if(grey_pos > 4){
        if(is_animating) return;
        is_animating = true;
        animate(grey_pos, key);
        count++;
          //check_win();
        grey_pos -= 5;
      }
      break;



    case 'ArrowDown':
      if(grey_pos < 20){
        if(is_animating) return;
        is_animating = true;
        animate(grey_pos, key);
        count++;
        grey_pos += 5;
      }
    break;
}
}

//animation
function animate(pos, key) {  //grey_position, key
  var grey_pos = pos;
  var images = document.querySelectorAll(".img");
  if(key == "ArrowUp"){
    var box1 = images[grey_pos];
    var box2 = images[grey_pos-5];
    var box1_pos_x = 0;
    var box2_pos_x = 0;
    var box1_pos_y = -58;
    var box2_pos_y = 58
  }

  if(key == "ArrowDown"){
    var box1 = images[grey_pos];
    var box2 = images[grey_pos+5];
    var box1_pos_x = 0;
    var box2_pos_x = 0;
    var box1_pos_y = 58;
    var box2_pos_y = -58
  }

  if(key == "ArrowLeft"){
    var box1 = images[grey_pos];
    var box2 = images[grey_pos-1];
    var box1_pos_x = -58;
    var box2_pos_x = 58;
    var box1_pos_y = 0;
    var box2_pos_y = 0
  }

  if(key == "ArrowRight"){
    var box1 = images[grey_pos];
    var box2 = images[grey_pos+1];
    var box1_pos_x = 58;
    var box2_pos_x = -58;
    var box1_pos_y = 0;
    var box2_pos_y = 0
  }

  box1.keyframes = [{
      transform: "translate3d(" + box1_pos_x + "px, " + box1_pos_y + "px, 0px)",
  }];
  box1.animProps = {
      duration: 250,
  }
  play_audio("audios/mixkit-short-transition-sweep-175.wav");
  box2.keyframes = [{
      transform: "translate3d(" + box2_pos_x + "px, " + box2_pos_y + "px, 0px)"
  }];
  box2.animProps = {
      duration: 250,
  }
  var box1src = box1.getAttribute("src");
  var box2src = box2.getAttribute("src");
  var animationBox1 = box1.animate(box1.keyframes, box1.animProps).onfinish = function() {
    updateImage(box1, box2src);
  };
  var animationBox2 = box2.animate(box2.keyframes, box2.animProps).onfinish = function() {
    updateImage(box2, box1src);
    check_win();
    is_animating = false;
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
  play_audio("audios/mixkit-retro-game-notification-212.wav");
  document.getElementById("message").style.display = "block";
  document.getElementsByTagName("button")[0].style.display = "inline-block";
  local_storage(count);
  stopTimer();
}

//local_storage
function local_storage(move){
  var moves = !!localStorage.getItem('rank') ? JSON.parse(localStorage.getItem('rank')) : [];
  for(var i = 0; i < moves.length; i++){
    if(moves[i] == move){
      flag = true;
      break;
    }
  }
  if(flag != true){
    moves.push(move);
    moves.sort(function(a, b){return a-b});
    localStorage.setItem("rank", JSON.stringify(moves));
    //print_moves(JSON.parse(localStorage.getItem("rank")));
  }
}

//to print the list_items
function print_moves(array){
  var x = document.getElementById("list_items");

  var ol = document.createElement('ol');

  for(var i = 0; i < array.length; i++){
    var li = document.createElement('li');
    li.innerHTML = array[i];
    ol.appendChild(li);
  }
  x.appendChild(ol);
}

// to-call always on refreshPage
//window.onload = print_moves(JSON.parse(localStorage.getItem("rank")));

//play audio
function play_audio(src){
  var audio = new Audio(src);
  audio.play();
}

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
print_moves(JSON.parse(localStorage.getItem("rank")));

//prevent scrolling
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
