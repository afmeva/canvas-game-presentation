var Slice = function(_x, _y, _alpha, _canvas) {
  'use strict';

  var
    image,
    x,
    y,

    currentState,
    states,
    index,
    ticks,
    nameStates,
    steps,
    canvas,
    speed,
    alpha,
    isVisible
    ;

  states = {};
  nameStates = [];
  steps = [];
  ticks = 0;
  speed = 5;
  index = 0;
  x = _x;
  y = _y;
  alpha = typeof _alpha === 'number' ? _alpha : 1;
  isVisible = true;

  canvas = _canvas;

  steps = nameStates;
  function getState(_name) {
    return states[_name];
  }

  function addState(_name, _state) {
    nameStates.push(_name);
    states[_name] = _state;
    currentState = currentState || states[_name];
  };

  function addSprite(_name, _baseState, _frames) {
     for (var i = 0; i < _frames; i++) {
       var name = _name + i;
       var state = {
         x: _baseState.x,
         y: _baseState.y,
         image: displayObject({
           image: _baseState.image.image,
           sWidth: _baseState.image.sWidth,
           sHeight: _baseState.image.sHeight,
           sX: _baseState.image.sWidth * i,
           sY: _baseState.image.Sy
         })
       };

       nameStates.push(name);
       states[name] = state;
       currentState = currentState || states[name];
     }
  };


  function setState(_state) {
    steps = _state.steps || nameStates;
    speed = _state.speed || speed;
    isVisible = _state.visible != false;
  };

  function removeState() {
    states[_name] = null;
  };

  function setTick(_tick) {
    speed = _tick
  };

  function setSteps(_steps, _speed) {
    steps = _steps || nameStates;
    speed = _speed || speed;
  }

  function update() {
    if (!isVisible) {
      return;
    }
    ticks++;
    if(ticks < speed) {
      return;
    }
    ticks = 0;

    index++;
    if (index >= steps.length) {
      index = 0;
      if (this.onFinish) {
        this.onFinish();
        this.onFinish = null;
      }
    }
    currentState = getState(steps[index]);
  };

  function draw(_originX, _originY) {
    if (!isVisible) {
      return;
    }
    _originX = _originX || 0;
    _originY = _originY || 0;
    if(currentState == null) {
      return;
    }
    canvas.drawSlice(
      {
        image: currentState.image.image,
        swidth: currentState.image.width,
        sheight: currentState.image.height,
        x: _originX + (x || currentState.x),
        y: _originY + (y || currentState.y),
        sx: currentState.image.sX,
        alpha: alpha,
        sy: currentState.image.sY,
      }
    );
  };

  function visible(_visible) {
    isVisible = _visible;
  }

  function addEvent() {}

  return {
    set x(_x) {
       x = _x;
    },
    get x() {
      return x;
    },
    set y(_y) {
       y = _y;
    },
    get y() {
      return y;
    },
    set alpha(_alpha) {
       alpha = _alpha;
    },
    get alpha() {
      return alpha;
    },
    addEvent: addEvent,
    isVisible: isVisible,
    draw: draw,
    update: update,
    addState: addState,
    setState: setState,
    getState: getState,
    setSteps: setSteps,
    addSprite: addSprite,
    removeState: removeState,
    setTick: setTick,
    visible: visible
  };
};
