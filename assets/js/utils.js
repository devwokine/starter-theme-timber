export function onLoadedMetadata(e) {

  const video = $(e.target);
  let aspectRatio = video.data('aspectRatio');
  if (aspectRatio == undefined) {
      aspectRatio = video.width() / video.height();
      video.data('aspectRatio', aspectRatio);
  }
  resizeVideo(video);

}

export function resizeVideo(video) {

  let newWidth;
  let newHeight;
  let videoRatio = video.data('aspectRatio');
  if (videoRatio == undefined) videoRatio = 1.7777777;
  let parentWidth  = video.parent().width();
  let parentHeight = video.parent().height();
  let parentRatio = parentWidth / parentHeight;

  if (parentRatio > videoRatio && !video.hasClass('bgWidth')) {
    video.removeClass("bgHeight");
    video.addClass("bgWidth");
  }
  if (parentRatio <= videoRatio && !video.hasClass('bgHeight')) {
    video.removeClass("bgWidth");
    video.addClass("bgHeight");
  }

}

export function delay(ms){
    var ctr, rej, p = new Promise(function (resolve, reject) {
        ctr = setTimeout(resolve, ms);
        rej = reject;
    });
    p.cancel = function(){ clearTimeout(ctr); rej(Error("Cancelled"))};
    return p;
}

export function randomInt(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

export function normalize(value, min, max) {
  return (value - min) / (max - min);
}

export function clamp(value, min, max) {
  return value < min ? min : (value > max ? max : value);
}

export function simulateClick(elem) {

    var evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    });

    var canceled = !elem.dispatchEvent(evt);

};

export function mouseMovefn(e) {

  let xMouse = e.pageX - e.currentTarget.getBoundingClientRect().left - ( e.currentTarget.offsetWidth / 2 );
  let yMouse = e.pageY - window.pageYOffset - e.currentTarget.getBoundingClientRect().top - ( e.currentTarget.offsetHeight / 2 );
  const mouseElements = e.currentTarget.querySelectorAll('*[data-mouse-parallax]');
  mouseElements.forEach(elem => {
    var factor = elem.getAttribute('data-mouse-parallax');
    let xFinal = xMouse * factor;
    let yFinal = yMouse * factor;
    TweenMax.to(elem, 1.2, {x:xFinal, y:yFinal});
  });

}
