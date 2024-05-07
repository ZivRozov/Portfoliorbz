import { useState, useEffect, useRef } from 'react'
import { Application, Container, Graphics, Ticker } from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js'
import './App.css'
const app = new Application();

function createStar(respawn=true) {
  const ampX = 6000;
  const ampY = 3000;
  for(let i=0;i<6;i++) {
    const rndX =Math.random()*ampX-ampX*0.5;
    const rndY = respawn?window.innerHeight*1.05:Math.random()*ampY-ampY*0.5;
    const rndScale = Math.random()*1.4+0.2;
    const rndTime = Math.random()*50000+100000;
    const alphaDecider = Math.random();
    const rndAlpha = alphaDecider>0.8?Math.random()*0.4+0.2:1;
    const circle = new Graphics();
    circle.circle(rndX,rndY,rndScale);
    circle.fill({color:0xffffff});
    circle.alpha=rndAlpha;

    const tween = new TWEEN.Tween(circle.position, false).to({x:0, y:rndY-4000}, rndTime).onComplete(()=>{
      circle.destroy();
    })


    Ticker.shared.add(()=>{
      tween.update();
    })
    tween.start();


    app.stage.addChild(circle);
  }

  if(!respawn) return;

  setTimeout(() => {
    createStar();
  }, 340);
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
