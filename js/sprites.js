var Game = Game || {};

Game.Sprite = (function(window){
  'use strict';

  var p;

  function Sprite(_obj) {
    this.image = _obj.image;
    this.frames = _obj.frames;
    this.width = this.image.width / this.frames;
    this.height = this.image.height;
    this.isAnimated = _obj.isAnimated !== false;
    this.index = _obj.index || 0;
    this.ticks = 0;
    this.speed = _obj.speed || 5;

    this.currenState = _obj.initialState || '';
    this.states = _obj.states || {};

    this.setState(this.currenState);
  }

  p = Sprite.prototype;

  p.setState = function(_state) {
    this.controlFrame = this.states[_state] || [0, this.frames];
  };

  p.update = function() {
    if(!this.isAnimated) {
      return;
    }

    this.ticks++;
    if (this.ticks <= this.speed) return;
    this.ticks = 0;

    this.index++;
    if(this.index === this.controlFrame[1] ) {
      this.index = this.controlFrame[0];
    }
  };

  return Sprite;
})(window)
