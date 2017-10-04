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


export function normalize(value, min, max) {
  return (value - min) / (max - min);
}


export function clamp(value, min, max) {
  return value < min ? min : (value > max ? max : value);
}


(function () {
    if ( typeof NodeList.prototype.forEach === "function" ) return false;
    NodeList.prototype.forEach = Array.prototype.forEach;
})();
