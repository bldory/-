/**
 * @author Bldory <bldory@naver.com>
 * @version 0.0.1
 * @file 버튼게임 라이브러리
 * @copyright Bldory 2022.08.31
 * @license CC-BY-NC-SA-4.0
 */

/**
 * 버튼의 갯수
 * @type {number}
 */
var btncount = 0;

/**
 * 스테이지 번호
 * @type {number}
 */
var stagenum = 1;

var whalf = window.innerWidth / 2 - 22.5;

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} hp 
 * @param {string} type 
 * @param {string} name 
 * @param {number} dir 
 * @param {number} dur 
 */

function drawButton(x, y, hp, type = 'defult', dir = 0, dur = 300, name = '버튼') {
  var btn = document.createElement('button');
  btncount += hp;
  btn.textContent = name;
  btn.style.position = 'absolute';
  btn.style.left = x + 'px';
  btn.style.top = y + 'px';
  btn.style.animationName = type + dir;
  btn.style.animationDuration = dur;
  btn.style.animationIterationCount = 'infinite';
  btn.style.animationTimingFunction = 'linear';
  btn.setAttribute('class', 'btn');
  btn.setAttribute('id', type);
  btn.style.animationDuration = dur + 'ms';
  document.body.appendChild(btn);
  var hit = 0;
  if(type == 'shield') {
    shield(hp, name);
  }
  btn.addEventListener('click', function() {
    btncount--;
    hit++;
    if(type != 'shield') {
      btn.style.backgroundColor = "#" + Math.round(16 - (16 / hp * hit)).toString(16) + Math.round(16 - (16 / hp * hit)).toString(16) + Math.round(16 - (16 / hp * hit)).toString(16);
      btn.style.color = "#" + Math.round(16 / hp * hit).toString(16) + Math.round(16 / hp * hit).toString(16) + Math.round(16 / hp * hit).toString(16);
    }
    else {
      this.remove();
      btncount -= hp - 1;
      console.log(btncount);
      if(btncount == 0) {
        next();
      }
    }
    if(hit >= hp) {
        this.remove();
        hit = 0;
      if(btncount == 0) {
        next();
      }
    }
    });
}

/**
 * 스테이지를 세팅하는 함수
 */
function setstage() {
  var til = document.querySelector('h1');
  til.textContent = '스테이지' + stagenum;
  switch(stagenum) {
    
    case 1:
      drawButton(whalf, 75, 1);
      break;

    case 2: 
      drawButton(whalf, 75, 8);
      break;

    case 3: 
      drawButton(whalf, 75, 8, 'shield');
      break;
      
    case 4: 
      drawButton(whalf, 125, 9, 'teleport');
      teleport();
      break;

    case 5:
      drawButton(whalf, 75, 1, 'vmove');
      break;
      
    default:
      alert('CLEAR!!!');
      location.href = "./index.html"
      break;
  }
}

/**
 * 다음 스테이지를 세팅하는 함수
 */
function next() {
  stagenum++;
  setstage();
}

function teleport() {
  var teleport = document.getElementById('teleport');
  teleport.addEventListener('click', function() {
    teleport.style.left = rand(0, window.innerWidth - 22.5) + 'px';
    teleport.style.top = rand(0, window.innerHeight - 22.5) + 'px';
  });
}

function shield(delay, ortext) {
  /**
   * @type HTMLButtonElement
   */
  var shield = document.getElementById('shield');
  shield.disabled = true;
  shield.textContent = '방패';
  var shieldinerval = setInterval(() => {
    shield.disabled = false;
    shield.textContent = ortext;
    setTimeout(() => {
      shield.disabled = true;
      shield.textContent = "방패";
    }, 175)
  }, delay * 400);
}

/**
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
