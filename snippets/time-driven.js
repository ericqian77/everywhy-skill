/* time-driven.js — continuous animation loop with pause control.
 *
 * WHEN TO USE: continuously varying quantities (sweeping, growing, waving,
 * orbiting) where the phenomenon itself is the point and there is no natural
 * "step" for the reader to control.
 *
 * Outcome requirements this wiring satisfies:
 *  - reduced-motion: animation does NOT autostart; a meaningful static frame
 *    is drawn instead, and the play control is hidden;
 *  - offscreen: the loop pauses when the stage scrolls out of view (battery,
 *    and avoids "the animation already finished before I got there");
 *  - a visible pause/resume control keeps the reader in charge.
 */

var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var playing = false;
var rafId = 0;
var startT = 0;
var pausedAt = 0;

function loop(now){
  if (!playing) return;
  draw((now - startT) / 1000);   // draw(t): your render function, t in seconds
  rafId = requestAnimationFrame(loop);
}

function play(){
  if (reduceMotion || playing) return;
  playing = true;
  startT = performance.now() - pausedAt * 1000; // resume where we paused
  rafId = requestAnimationFrame(loop);
}

function pause(){
  if (!playing) return;
  playing = false;
  pausedAt = (performance.now() - startT) / 1000;
  cancelAnimationFrame(rafId);
}

/* Pause automatically when the stage leaves the viewport. */
function gateToViewport(stageEl){
  if (!('IntersectionObserver' in window)) return;
  new IntersectionObserver(function(entries){
    entries.forEach(function(e){ e.isIntersecting ? play() : pause(); });
  }, { threshold: 0.2 }).observe(stageEl);
}

/* Wiring:
 *   if (reduceMotion){ draw(0); playBtn.style.display = 'none'; }
 *   else { gateToViewport(stage); playBtn.addEventListener('click',
 *            function(){ playing ? pause() : play(); }); play(); }
 * If autostart feels wrong for your concept, start paused — your call.
 */
