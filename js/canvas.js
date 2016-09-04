var Game = Game || {};

Game.Canvas = (function(window){
  'use strict';
  var
  p,
  PI2 = 2 * Math.PI;

  function Canvas(_selector){
    this.canvas = document.querySelector(_selector);
    this.context = this.canvas.getContext('2d');

    this.offCanvas = document.createElement('canvas');
    this.offCanvas.width = this.canvas.width;
    this.offCanvas.height = this.canvas.height;
    this.offContext = this.offCanvas.getContext('2d');
  }

  p = Canvas.prototype;

  p.circle = function(_obj) {
    this.offContext.beginPath();
    this.offContext.arc(_obj.pos.x, _obj.pos.y, _obj.radius || 5, 0, PI2);
    this.offContext.fillStyle = "rgba(0, 255, 255, 1)";
    this.offContext.fill();
    this.offContext.closePath();
  };

  p.square = function(_obj) {
    this.offContext.rect(_obj.pos.x - 25, _obj.pos.y - 25, 50, 50);
    this.offContext.stroke();
  };

  p.draw = function(_obj) {
    this.offContext.drawImage(
      _obj.sprite.image,
      _obj.sprite.index * _obj.sprite.width, // source position-x from sprite
      0, // source position-y from sprite
      _obj.sprite.width,
      _obj.sprite.height,
      _obj.body.pos.x  - _obj.sprite.width / 2, // position-x it will be drawn
      _obj.body.pos.y - _obj.sprite.height / 2, // position-y it will be drawn
      _obj.sprite.width,
      _obj.sprite.height);
  };

  p.drawSlice = function(_obj) {
    this.offContext.save();
    this.offContext.globalAlpha = _obj.alpha;
    this.offContext.drawImage(
      _obj.image,
      _obj.sx, // source position-x from sprite
      _obj.sy, // source position-y from sprite
      _obj.swidth,
      _obj.sheight,
      _obj.x - _obj.swidth / 2, // position-x it will be drawn
      _obj.y - _obj.sheight / 2, // position-y it will be drawn
      _obj.swidth,
      _obj.sheight);
    this.offContext.restore();

  };

  p.pattern = function(_pattern) {

    if(_pattern.right) {
      this.offContext.drawImage(
        _pattern.pattern,
        -_pattern.offsetX,
        _pattern.y,
        _pattern.width,
        _pattern.height);

      this.offContext.drawImage(
        _pattern.pattern,
        _pattern.width - _pattern.offsetX,
        _pattern.y,
        _pattern.width,
        _pattern.height);

        return;
    }

    this.offContext.drawImage(
      _pattern.pattern,
      _pattern.offsetX,
      _pattern.y,
      _pattern.width,
      _pattern.height);

    this.offContext.drawImage(
      _pattern.pattern,
       _pattern.offsetX - _pattern.width,
      _pattern.y,
      _pattern.width,
      _pattern.height);
  };

  p.createPattern = function(_img, _type) {
    return _img;
  };

  p.DOM = function() {
    return this.canvas;
  };

  p.clear = function() {
    this.offContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  p.write = function(_text) {
    this.offContext.font = _text.font;
    this.offContext.fillText(_text.text, _text.x, _text.y);
  };

  p.render = function() {
    this.context.drawImage(this.offCanvas, 0, 0);
  };

  return Canvas;
})(window);
