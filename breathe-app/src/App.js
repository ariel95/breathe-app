import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [container, setContainer] = useState(document);
  const [text, setText] = useState(document);
  const [pointer, setPointer] = useState(document);
  const [breatheAnimationInterval, setBreatheAnimationInterval] = useState(0);
  const [holdInterval, setHoldInterval] = useState(0);
  const [breatheOutInterval, setBreathOutInterval] = useState(0);
  const [orientation, setOrientation] = useState(window.screen.orientation.angle);

  // De forma similar a componentDidMount y componentDidUpdate
  useEffect(() => {
    setOrientation(window.screen.orientation.angle);
    console.log(orientation);
    setContainer(document.querySelector('.container'));
    setText(document.querySelector('#text'));
    setPointer(document.querySelector('.pointer-container'));
  }, [orientation]);

  const totalTime = 7500;
  const breatheTime = (totalTime / 5) * 2;
  const holdTime = (totalTime / 5);


  const breatheOut = () => {
    text.innerText = 'Breathe Out!';
    container.className = 'container shrink';
  }

  const hold = () => {
    text.innerText = 'Hold';
    setBreathOutInterval(setTimeout(breatheOut, holdTime));
  }

  const breatheAnimation = () => {
    text.innerHTML = 'Breathe In!';
    container.className = 'container grow';
    pointer.className = 'pointer-container active'
    setHoldInterval(setTimeout(hold, breatheTime));
  }

  const stopBreatheAnimation = () => {
    clearInterval(breatheAnimationInterval);
    clearInterval(breatheOutInterval);
    clearInterval(holdInterval);
    text.innerHTML = 'Start';
    container.className = 'container';
    pointer.className = 'pointer-container'
  }

  const circleClick = () => {
    if (!pointer.classList.contains('active')) {
      breatheAnimation();
      setBreatheAnimationInterval(setInterval(breatheAnimation, totalTime));
    }
    else {
      stopBreatheAnimation();
    }

  }

  window.addEventListener("orientationchange", function () {
    setOrientation(window.screen.orientation.angle);
  });
  window.addEventListener("resize", function () {
    setOrientation(window.screen.orientation.angle);
  });

  const contentPage = () => {
    return (
      <div>
        <h1 className="title-app">Relaxer</h1>
        <div className="container">
          <div className="circle" onClick={() => {
            circleClick();
          }}></div>

          <p id="text" onClick={() => {
            circleClick();
          }}>Start</p>

          <div className="pointer-container">
            <div className="pointer"></div>
          </div>

          <div className="gradient-circle"></div>
        </div>
      </div>
    );
  }

  const orientationPage = () => {
    let comp = null;
    if (orientation === 90 || orientation === 270 ) {
      comp =
        <div className="App mobile-rotated">
          {contentPage()}
        </div>
    }
    else {
      comp =
        <div className="App">
          {contentPage()}
        </div>
    }

    return comp;


  }

  return (
    <div>{orientationPage()}</div>
  );
}

export default App;
