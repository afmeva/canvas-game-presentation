function buildSkeleton() {
  var tail = Slice(0,0,1,canvas);
  var eyes = Slice(0,0,1,canvas);
  var body = Slice(0,0,1,canvas);
  var nose = Slice(0,0,1,canvas);
  var mouth = Slice(0,0,1,canvas);
  var explosiveBody = Slice(0,0,1,canvas);


  tail.addState('left', {
    x: -3,
    y: 46,
    image: displayObject({
      image:spritesheet,
      sWidth: 24,
      sHeight: 17,
      sX: 64,
      sY: 78
    })
  });

  tail.addState('down', {
    x: 0,
    y: 45,
    image: displayObject({
      image:spritesheet,
      sWidth: 17,
      sHeight: 14,
      sX: 69,
      sY: 24
    })
  });

  eyes.addState('open', {
    x: 13,
    y: -20,
    image: displayObject({
      image:spritesheet,
      sWidth: 14,
      sHeight: 10,
      sX: 68,
      sY: 59
    })
  });

  eyes.addState('closed', {
    x: 13,
    y: -18,
    image: displayObject({
      image:spritesheet,
      sWidth: 14,
      sHeight: 6,
      sX: 68,
      sY: 53
    })
  });

  body.addState('body', {
    x: 0,
    y: 0,
    image: displayObject({
      image:spritesheet,
      sWidth: 68,
      sHeight: 77,
      sX: 0,
      sY: 0,
    })
  });

  nose.addState('normal', {
    x: 16,
    y: -8,
    image: displayObject({
      image:spritesheet,
        sWidth: 17,
        sHeight: 14,
        sX: 69,
        sY: 38
    })
  });

  mouth.addState('closed', {
    x: 8,
    y: 3,
    image: displayObject({
      image:spritesheet,
      sWidth: 30,
      sHeight: 17,
      sX: 34,
      sY: 78
    })
  });

  mouth.addState('open', {
    x: 8,
    y: 5,
    image: displayObject({
      image:spritesheet,
      sWidth: 30,
      sHeight: 24,
      sX: 68,
      sY: 0
    })
  });

  mouth.addState('sad', {
    x: 10,
    y: 8,
    image: displayObject({
      image:spritesheet,
      sWidth: 34,
      sHeight: 17,
      sX: 0,
      sY: 78
    })
  });



  skeleton.addSlice('body', body);
  skeleton.addSlice('tail', tail);
  skeleton.addSlice('eyes', eyes);
  skeleton.addSlice('nose',  nose);
  skeleton.addSlice('mouth', mouth);

  skeleton.addAction('move', {
    tail: {
      steps: ['down', 'left'],
      speed: 10
    },
    eyes: {
      steps: ['open', 'closed'],
      speed: 15
    },
    mouth: {
      steps: ['closed'],
      speed: 10
    }
  });

  skeleton.addAction('eat', {
    mouth: {
      steps: ['open', 'open'],
      speed: 5
    }
  });


  skeleton.doAction('move');

}
