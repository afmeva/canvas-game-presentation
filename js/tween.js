var Airheads = Airheads || {};

Airheads.Tween = (function(window){
  'use strict';

  var raf =  window.requestAnimationFrame;

  function Tween (_target, _props, _duration, _ease, _onComplete) {
    var
      from = {},
      start,
      delta= {};

      for(var prop in _props) {
        from[prop] = _target[prop]
        delta[prop] = _props[prop] - from[prop];
      }
      raf(loop);

      function loop(_timestamp) {
        var time;

        start = start || _timestamp;
        time = _timestamp - start;

        for(var prop in _props) {
          step(prop, eases[_ease](time, from[prop], delta[prop], _duration));
        }

        if (time >= _duration) {
          for(var prop in _props) {
            step(prop, _props[prop]);
          }
          _onComplete && _onComplete();
          return;
        }
        raf(loop);
      }

      function step(_prop, _pos) {
        _target[_prop] = _pos;
      }
  }

  var eases = {};
  //_currentTime, _from, _delta, _duration
  //t, b, c, d

  eases.linear = function(_currentTime, _from, _delta, _duration) {
    return _delta * _currentTime / _duration + _from;
  };


  eases.inCubic = function(_currentTime, _from, _delta, _duration) {
    return  _delta * (_currentTime /= _duration) * _currentTime * _currentTime + _from;
  };

  eases.inBounce = function(t, b, c, d) {
    return c - eases.OutBounce(d - t, 0, c, d) + b;
  };

  eases.outBounce = function(t, b, c, d) {
    if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
    } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
    } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
    } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
    }
  };

  eases.inBack = function(t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  };

  eases.outBack = function(t, b, c, d, s) {
       if (s == undefined) s = 1.70158;
       return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
   };

  return Tween;
})(window);
