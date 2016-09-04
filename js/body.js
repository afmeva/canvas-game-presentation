var Game = Game || {};
Game.Body = (function(window, vector) {
  'use strict';

  var p;

  function Body(_setup) {
    this.pos = new Vector(_setup.x, _setup.y);
    this.vel = new Vector();
    this.acc = new Vector();
    this.radius = _setup.radius || 5;
    this.limitVel  = _setup.limitVel || 10;
    // this.size = { width: _setup.image.width / (_setup.frames || 1), height: _setup.image.height }
    this.static = _setup.static || false;
  }

  p = Body.prototype;

  p.applyForce = function(_force) {
    this.static || this.acc.add(_force);
  };

  p.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.limit(this.limitVel);
    this.acc.mult(0);
  };

  // p.quiet = function() {
  //   this.acc.mult(0);
  //   this.vel.mult(0);
  // };
  //
  // p.isOutOfworld = function(_callback) {
  //   var bounds = Airheads.world.getBounds();
  //
  //   return ((this.pos.x + this.radius < bounds.minX) ||
  //       (this.pos.x - this.radius > bounds.maxX) ||
  //       (this.pos.y + this.radius < bounds.minY) ||
  //       (this.pos.y - this.radius > bounds.maxY));
  // };

  p.collide = function(_against) {
    return this.pos.distance(_against.pos) < (this.radius + _against.radius);
  };

  // p.contains = function(_point) {
  //   return (
  //       (_point.x < this.pos.x + this.size.width/2) &&
  //       (_point.x > this.pos.x - this.size.width/2) &&
  //       (_point.y < this.pos.y + this.size.height/2) &&
  //       (_point.y > this.pos.y - this.size.height/2));
  // };

  return Body;

})(window, Vector);
