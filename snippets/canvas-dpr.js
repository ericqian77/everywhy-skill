/* canvas-dpr.js — crisp canvas on high-DPI screens, responsive to resize.
 *
 * WHEN TO USE: any <canvas>. Without this, drawings are blurry on retina
 * displays; without the clamp, 3x-DPR phones waste memory for no visible gain.
 *
 * CSS side: size the canvas with CSS (width:min(...px, ...vw); aspect-ratio),
 * and let this function own the pixel buffer.
 */

var DPR = Math.min(window.devicePixelRatio || 1, 2); // clamp: 2 is visually enough

function fitCanvas(canvas, ctx){
  var rect = canvas.getBoundingClientRect();
  var w = Math.max(1, rect.width);
  var h = Math.max(1, rect.height || w); // square fallback if CSS gives no height
  var pw = Math.round(w * DPR), ph = Math.round(h * DPR);
  if (canvas.width !== pw || canvas.height !== ph){
    canvas.width = pw; canvas.height = ph;
  }
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0); // draw in CSS pixels from here on
  return { w: w, h: h };
}

/* Wiring:
 *   var size = fitCanvas(cv, ctx);  // call at the top of every draw, or on resize
 *   window.addEventListener('resize', render);
 * Draw using size.w / size.h — never canvas.width/height (those are px buffers).
 */
