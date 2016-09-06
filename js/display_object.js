var displayObject = function(_setup) {
  'use strict';
  return {
    image: _setup.image,
    width: _setup.width || _setup.sWidth,
    height: _setup.height || _setup.sHeight,
    sWidth: _setup.sWidth,
    sHeight: _setup.sHeight,
    globalAlpha: _setup.alpha || 1,
    sX: _setup.sX || 0,
    sY: _setup.sY || 0
  };
};
