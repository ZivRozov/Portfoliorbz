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
  return <div id="magic"></div>;
};

function resize_canvas() {
  const ratio = window.innerWidth/window.innerHeight;
  const scale = Math.min(1.2, ratio*1);
  document.getElementById('magic').style.transform = `translate(0%, 0%) scale(${scale})`
}

