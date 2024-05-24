import "./hero.css";
import { useRef, useEffect } from "react";
import { ThreeCanvas } from "../../three/threeCanvas";
import { Application, Container, Graphics, Sprite, Texture, Ticker } from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js";

const app = new Application();

const stars: Star[] = [];
const toRemove: number[] = [];

const maxStarPos = 4000;

const mousePosObj = {
  x: 1,
  y: 1,
};

const desiredPosObj = {
  x: 1,
  y: 1,
};

const STAR_FRAME_FRACTION = 30;

class Star extends Sprite {
  public speed = 0;
  constructor(x: number, y: number) {
    super(Texture.WHITE);
    this.speed = Math.random() * 0.2;
    this.init(x, y);
  }
  private init(x = 0, y = 0) {
    const rndScale = Math.random() * 2.6 + 0.6;
    const alphaDecider = Math.random();
    const rndAlpha = alphaDecider > 0.5 ? Math.random() * 0.2 + 0.2 : 1;
    const rndAngle = 45;
    this.position.set(x, y);
    this.scale.set(rndScale, rndScale);
    this.angle = rndAngle;
    this.alpha = rndAlpha;

    app.stage.addChild(this);
  }
}
function createStar(x?: number, y?: number) {
  if (x && y) {
    const star = new Star(x, y);
    stars.push(star);
  } else {
    const halfWidth = window.innerWidth * 0.5;
    const halfHeight = window.innerHeight * 0.5;

    for (let i = 0; i < 1; i++) {
      const rndX = Math.random() * maxStarPos - maxStarPos * 0.5 + halfWidth;
      const rndY = Math.random() * maxStarPos - maxStarPos * 0.5 + halfHeight;
      const star = new Star(rndX, rndY);
      stars.push(star);
    }
  }
}

let tweenProgress = 0;

function mousePos(e) {
  tweenProgress = 0;
  const windowCenterX = window.innerWidth * 0.5;
  const windowCenterY = window.innerHeight * 0.5;
  const vectorX = e.x - windowCenterX;
  const vectorY = e.y - windowCenterY;
  const vectorLength = Math.sqrt(vectorX * vectorX + vectorY * vectorY);

  desiredPosObj.x = vectorX / vectorLength;
  desiredPosObj.y = vectorY / vectorLength;
}

function quadraticOut(t) {
  return t * (2 - t);
}

function updateStarMovementObject() {
  if (tweenProgress < 1) {
    // Increase progress
    tweenProgress += 1 / STAR_FRAME_FRACTION;

    // Calculate eased progress
    const easedProgress = quadraticOut(tweenProgress);

    const diffX = (desiredPosObj.x - mousePosObj.x) * easedProgress;
    const diffY = (desiredPosObj.y - mousePosObj.y) * easedProgress;

    mousePosObj.x += diffX;
    mousePosObj.y += diffY;
  } else {
    mousePosObj.x = desiredPosObj.x;
    mousePosObj.y = desiredPosObj.y;
  }
}

function animateStars({ deltaTime }) {
  updateStarMovementObject();

  toRemove.forEach((index) => {
    const star = stars.splice(index, 1);
    if (star.length === 0) return;
    const x = star[0].position.x - maxStarPos;
    const y = star[0].position.y - maxStarPos;
    //createStar(0, 0);
    star[0].destroy();
  });

  const halfWidth = window.innerWidth * 0.5;
  const halfHeight = window.innerHeight * 0.5;

  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];
    const directionY = mousePosObj.x;
    const directionX = mousePosObj.y;

    star.y += star.speed * directionX;
    star.x += star.speed * directionY;
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

export const Hero = () => {
  const rendered = useRef(false);
  const canvas = useRef();
  useEffect(() => {
    if (rendered.current) return;
    rendered.current = true;

    app.init({ width: window.innerWidth, height: window.innerHeight, resizeTo: window, canvas: canvas.current, backgroundAlpha: 0 }).then(() => {
      for (let i = 0; i < 1200; i++) {
        createStar();
      }

      window.addEventListener("pointermove", mousePos);
      Ticker.shared.add(animateStars);
    });
  }, []);

  return (
    <div id="hero">
      <div className="main-title">
        <div className="title-div">
          <h3 className="pill font-size-14 pinkurple font-alt">ORR BENZION * PRODUCT * DESIGNER</h3>
          <h1 className="main-title-font font-main">A DIFFERENT KIND OF DESIGNER</h1>
        </div>
        <button className="hero-unmute-button">UNMUTE</button>
      </div>
      <canvas ref={canvas} id="heroCanvas"></canvas>
      <ThreeCanvas />
    </div>
  );
};
