import { useEffect, useRef } from 'react';
import futureIsNow from './futureIsNow';
import { useState } from 'react';
import './threeCanvas.css';
export const ThreeCanvas = () => {
  const rendered = useRef(false);
  useEffect(() => {
    if(rendered.current) return;
    rendered.current = true;
    futureIsNow();
    window.addEventListener('resize',()=>{
        resize_canvas();
    });
    resize_canvas();
  }, []);
  return <div style={{position:'absolute', overflow:'hidden', width:'100%', height:'100%'}}><div id="magic"></div></div>;
};

function resize_canvas() {
  const ratio = window.innerWidth/window.innerHeight;
  const scale = Math.min(1.2, ratio*1);
  document.getElementById('magic').style.transform = `scale(${scale})`
}

