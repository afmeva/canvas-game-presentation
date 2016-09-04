var Vector = (function(window) {
  'use strict';

  function Vector(_x, _y) {
    this.x = _x || 0;
    this.y = _y || 0;
  }

  var p = Vector.prototype;

  p.add = function (_vector) {
    this.x += _vector.x;
    this.y += _vector.y;
    return this;
  };

  p.sub = function (_vector) {
    this.x -= _vector.x;
    this.y -= _vector.y;
    return this;
  };

  p.mult = function (_scalar) {
    this.x *= _scalar;
    this.y *= _scalar;
    return this;
  };

  p.limit = function(_scalar) {
    var angle;
    if(this.mag() > _scalar) {
      angle = this.angle();
      this.set(_scalar * Math.sin(angle), _scalar * Math.cos(angle))
    }
    return this;
  };

  p.set = function (_x, _y) {
    this.x = _x;
    this.y = _y;
  };

  p.angle = function () {
    return Math.atan2(this.x, this.y);
  };

  p.mag = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };

  p.distance = function(_vector) {
    return this
      .copy()
      .sub(_vector)
      .mag();
  };

  p.copy = function() {
    return new Vector(this.x, this.y);
  };

  return Vector;
})(window);
