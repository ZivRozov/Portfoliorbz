import { useState, useEffect, useRef } from 'react'
import { Application, Container, Graphics, Sprite, Texture, Ticker } from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js'
import './App.css'
import { UilFileAlt } from '@iconscout/react-unicons';

const app = new Application();

const stars:Star[] = [];
const toRemove:number[] = [];

const maxStarPos = 4000;

const mousePosObj = {
  x:1,
  y:1
};

class Star extends Sprite {
  public speed = 0;
  constructor(x:number, y:number) {
    super(Texture.WHITE);
    this.speed = Math.random()*0.2;
    this.init(x, y);
  }
  private init(x=0,y=0) {

  const rndScale = Math.random()*2.6+0.6;
  const alphaDecider = Math.random();
  const rndAlpha = alphaDecider>0.5?Math.random()*0.2+0.2:1;
  const rndAngle = 45;
  this.position.set(x, y);
  this.scale.set(rndScale,rndScale);
  this.angle = rndAngle;
  this.alpha=rndAlpha;
  
  app.stage.addChild(this);
  }
}
function createStar(x?:number, y?:number) {
  if(x&&y) {
    const star = new Star(x, y);
    stars.push(star);
  } else {
    const halfWidth = window.innerWidth*0.5;
    const halfHeight = window.innerHeight*0.5;

    for(let i=0;i<1;i++) {
      const rndX =Math.random()*maxStarPos-maxStarPos*0.5+halfWidth;
      const rndY = Math.random()*maxStarPos-maxStarPos*0.5+halfHeight;
      const star = new Star(rndX, rndY);
      stars.push(star);
    }
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
  tween = new TWEEN.Tween(mousePosObj).duration(100).to({x:vectorX / vectorLength, y:vectorY/ vectorLength}).easing(TWEEN.Easing.Quadratic.InOut).start();
}

function animateStars({deltaTime}) {

  tween.update();

  toRemove.forEach(index=>{
    const star = stars.splice(index,1);
    if(star.length===0) return;
    const x = star[0].position.x-maxStarPos;
    const y = star[0].position.y-maxStarPos;
    //createStar(0, 0);
    star[0].destroy();
  })

  const halfWidth = window.innerWidth*0.5;
  const halfHeight = window.innerHeight*0.5;

  for(let i=0;i<stars.length;i++) {
    const star = stars[i];
    const directionY = mousePosObj.x;
    const directionX = mousePosObj.y;

    star.y+=star.speed*directionX;
    star.x+=star.speed*directionY;
    /*
    if(star.y<maxStarPos*0.5 - halfHeight||star.y>maxStarPos*0.5 + halfHeight) {  
      toRemove.push(i);
      console.log('removing star at ' +star.position.y);
    } else if(star.x<-maxStarPos*0.5 ||star.x>maxStarPos*0.5) {
     // toRemove.push(i);
     // console.log('removing star at ' +star.x);
    }*/
  }
}

function App() {
  let pixiRendered = false;
  const canvas = useRef();
  useEffect(()=>{
    if(pixiRendered) return;
    pixiRendered = true;

    app.init({ width: window.innerWidth, height: window.innerHeight, resizeTo:window, canvas:canvas.current }).then(()=>{
      for(let i=0;i<1200;i++) {
        createStar();
      }

      tween = new TWEEN.Tween(mousePosObj).duration(100).to({x:1, y:1}).easing(TWEEN.Easing.Quadratic.InOut).start();
      window.addEventListener('pointermove',mousePos);
      Ticker.shared.add(animateStars);

    })
  },[])
  return (
    <>
    <nav className='nav'>
    <div className='gummy-bear'></div>
    <div className='nav-backdrop'></div>
      <div className='container'>
        <div className='nav-flex'>
          <img width={'66px'} height={'66px'} src="./logo_white_static.png"/>
        <ul className='nav-inner font-main'>
          <li><a href=''>ABOUT</a></li>
          <li><a href=''>PROJECTS</a></li>
          <li><a href=''>CONTACT</a></li>
        </ul>
        <button className='primary-cta cta-border-white cta-with-icon font-main'><UilFileAlt size="24" color="#ffffff" />READ MY CV</button>
        </div>
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
