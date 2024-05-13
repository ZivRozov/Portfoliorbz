import { useState, useEffect, useRef } from 'react'
import { Application, Container, Graphics, Ticker } from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js'
import './App.css'
const app = new Application();

const stars:Star[] = [];
const toRemove:Star[] = [];

const mousePosObj = {
  x:1,
  y:1
};

class Star extends Graphics {
  public speed = 0;
  constructor(x:number, y:number) {
    super();
    this.speed = Math.random()*0.2;
    this.init(x, y);
  }
  private init(x=0,y=0) {


  const rndScale = Math.random()*1.3+0.3;
  const alphaDecider = Math.random();
  const rndAlpha = alphaDecider>0.5?Math.random()*0.2+0.2:1;
  this.circle(x,y,rndScale);
  this.fill({color:0xffffff});
  this.alpha=rndAlpha;

  app.stage.addChild(this);

  window.addEventListener('pointermove',mousePos);
  }
}
function createStar(respawn=true) {
  const ampX = 6400;
  const ampY = 3000;
  for(let i=0;i<6;i++) {
    const rndX =Math.random()*ampX-ampX*0.5;
    const rndY = respawn?window.innerHeight:Math.random()*ampY-ampY*0.5;
    const star = new Star(rndX, rndY);
    stars.push(star);
  }
}

let tween;

function mousePos(e) {
  const windowCenterX = window.innerWidth * 0.5;
  const windowCenterY = window.innerHeight * 0.5;
  const vectorX = e.x - windowCenterX;
  const vectorY = e.y - windowCenterY;
  const vectorLength = Math.sqrt ( vectorX * vectorX + vectorY * vectorY);
  if(tween) {
    tween.stop();
  }
  //mousePosObj.x = vectorX / vectorLength;
  //mousePosObj.y = vectorY / vectorLength;
  tween = new TWEEN.Tween(mousePosObj).duration(100).to({x:vectorX / vectorLength, y:vectorY/ vectorLength}).easing(TWEEN.Easing.Quadratic.InOut).start();
}

let starSpawnCounter = 0;
const spawnCounterAmount = 100;
function animateStars() {
  tween?.update();
  starSpawnCounter++;
  if(starSpawnCounter > spawnCounterAmount) {
    starSpawnCounter = 0;
    //createStar();
  }
  toRemove.forEach(star=>{
    star.destroy();
  })
  for(let i=0;i<stars.length;i++) {
    const star = stars[i];
    const directionY = mousePosObj.x;
    const directionX = mousePosObj.y;

    star.y+=star.speed*directionX;
    star.x+=star.speed*directionY;
    if(star.y<-2000) {  
      const starToRemove = stars.splice(i,1);
      toRemove.push(starToRemove[0]);
    }
  }
}

function App() {
  let pixiRendered = false;
  const canvas = useRef();
  useEffect(()=>{
    if(pixiRendered) return;
    pixiRendered = true;

    app.init({ width: window.innerWidth, height: window.innerHeight, resizeTo:window, canvas:canvas.current }).then(()=>{
      createStar();
      for(let i=0;i<240;i++) {
        createStar(false);
      }
    })
    Ticker.shared.add(animateStars);

  },[])
  return (
    <>
    <nav className='nav'>
    <div className='gummy-bear'></div>
    <div className='nav-backdrop'></div>
      <div className='container'>
        <ul className='nav-inner font-main'>
          <li><a href=''>ABOUT</a></li>
          <li><a href=''>PROJECTS</a></li>
          <li><a href=''>CONTACT</a></li>
        </ul>
      </div>
    </nav>
    <div id='hero'>
      <div className='main-title'>
        <div className='title-div'>
          <h3 className='pill pinkurple font-alt'>ORR BENZION * PRODUCT * DESIGNER</h3>
          <h1 className='main-title-font font-main'>A DIFFERENT KIND OF DESIGNER</h1>
        </div>
        <button className='hero-unmute-button'>UNMUTE</button>
      </div>
      <canvas ref={canvas} id='heroCanvas'></canvas>
    </div>
    </>
  )
}

export default App
