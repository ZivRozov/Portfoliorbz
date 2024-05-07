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


  if(!respawn) return;

  setTimeout(() => {
    createStar();
  }, 640);
}


function mousePos(e) {
  const normalizedX = e.x/window.innerWidth - 0.5;
  const normalizedY = e.y/window.innerHeight - 0.5;
  mousePosObj.x = normalizedX;
  mousePosObj.y = normalizedY;

}

function animateStars() {
  toRemove.forEach(star=>{
    star.destroy();
  })
  for(let i=0;i<stars.length;i++) {
    const directionY = mousePosObj.y < 0 ? -1:1;
    const directionX = mousePosObj.x < 0 ? 1:-1;
    stars[i].y+=stars[i].speed*directionY;
    stars[i].x-=stars[i].speed*directionX;
    if(stars[i].y<-2000) {  
      const star = stars.splice(i,1);
      toRemove.push(star[0]);
    }
  }
}

function App() {
  let pixiRendered = false;
  const canvas = useRef();
  useEffect(()=>{
    if(pixiRendered) return;
    window.addEventListener('pointermove',mousePos);
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
      <canvas ref={canvas} id='heroCanvas'></canvas>
    </div>
    </>
  )
}

export default App
