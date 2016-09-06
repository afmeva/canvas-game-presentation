var Skeleton = function(_setup) {
  'use strict';
  var
    alive,
    onOutOfWorld,

    actions,
    slices,
    slicesNames,
    currentSlice,
    nextAction,
    events,
    body;

  onOutOfWorld = _setup.onOutOfWorld;
  body = new Game.Body(_setup);

  actions = [];
  slicesNames = [];
  slices = {};
  alive = true;
  // events = Airheads.EventManager;

  function addSlice(_name, _slice) {
    slicesNames.push(_name)
    slices[_name] = _slice;
  }

  function removeSlice() {}

  function applyForce(_force) {
      body.applyForce(_force)
  }

  function update() {
    // outOfWorld();
    body.update();
    slicesNames.forEach(function(slice) {
      slices[slice].update();
    });
  }

  function draw() {
    slicesNames.forEach(function(slice) {
      slices[slice].draw(body.pos.x, body.pos.y);
    });
  }

  function doAction(_name, _next) {
    var action = actions[_name];
    nextAction = _next;
    for(var slice in action) {
      slices[slice].setState(action[slice]);

      if(nextAction) {
        slices[slice].onFinish = function() {
          doAction(nextAction)
        }
      }
    }
  }

  function addAction(_name, _action) {
    actions[_name] = _action;
  }

  function collide(_against, _callback) {
    _against.beings = _against.beings || [_against];

    _against.beings.forEach(function(_being) {
      if (_callback && body.collide(_being.body)) {
        _callback(this, _being);
      }
    }, this);
  }

  function outOfWorld() {
    if(body.isOutOfworld()) {
      // this.kill();
      onOutOfWorld && onOutOfWorld(this);
    }
  };

  function kill() {
    alive = false;
  };

  function isAlive() {
    return alive;
  }

  function reset (_x, _y) {
    quiet();
    body.pos.set(_x, _y);
    alive = true;
  };

  function quiet() {
    body.quiet();
  };

  function setStatic(_static) {
    body.static = _static;
  };

  // function addEvent(_type, _cb, _cbOut) {
  //   events.add(this, _type, _cb, _cbOut);
  // };
  // function removeEvents(_type, _cb) {
  //   events.removeAll(this, _type);
  // };

  function contains(_point) {
    return body.contains(_point);
  };


  return {
    set x(_x) {
       body.pos.x = _x;
    },
    get x() {
      return body.pos.x;
    },
    set y(_y) {
       body.pos.y = _y;
    },
    get y() {
      return body.pos.y;
    },
    draw: draw,
    kill: kill,
    quiet: quiet,
    reset: reset,
    update: update,
    collide: collide,
    isAlive: isAlive,
    contains: contains,
    // addEvent: addEvent,
    addSlice: addSlice,
    doAction: doAction,
    addAction: addAction,
    setStatic: setStatic,
    applyForce: applyForce,
    removeSlice: removeSlice,
    // removeEvents: removeEvents,
  };
};
