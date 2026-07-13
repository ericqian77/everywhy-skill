/* stage-captions.js — layout-stable two-tier captions for a sticky stage.
 *
 * WHEN TO USE: any scroll-driven course with captions that change as the
 * reader progresses. Solves the most common stage defect: a longer caption
 * reflowing the layout and shoving the canvas mid-animation.
 *
 * REQUIRED CSS (sized for your longest caption — check at 360px width!):
 *   .play-cap{ min-height:1.5em; transition:opacity .25s ease; }
 *   .play-sub{ min-height:3.4em; transition:opacity .25s ease; }
 *   @media (prefers-reduced-motion: reduce){ .play-cap,.play-sub{ transition:none; } }
 * REQUIRED HTML: give the caption container aria-live="polite" so screen
 * readers hear stage changes.
 */

var capEl = document.getElementById('cap');   // display-face headline: the WHAT
var subEl = document.getElementById('sub');   // smaller detail line: the WHY / the number

/* One entry per teaching state. p = progress threshold (0..1) at which the
 * caption takes over. As many or as few stages as the concept needs. */
var stages = [
  { p: 0.00, cap: '…', sub: '…' },
  { p: 0.25, cap: '…', sub: '…' }
];

var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var lastIdx = -1;
var captionTimer = 0;

function setStage(p){
  var idx = 0;
  for (var i = 0; i < stages.length; i++){
    if (p >= stages[i].p - 0.0001) idx = i;
  }
  if (idx === lastIdx) return;
  lastIdx = idx;
  if (captionTimer){ clearTimeout(captionTimer); captionTimer = 0; }
  if (reduceMotion){
    capEl.textContent = stages[idx].cap;
    subEl.textContent = stages[idx].sub;
  } else {
    // brief fade-out, swap, fade-in — never a jump-cut mid-read
    capEl.style.opacity = 0; subEl.style.opacity = 0;
    captionTimer = setTimeout(function(){
      captionTimer = 0;
      capEl.textContent = stages[idx].cap;
      subEl.textContent = stages[idx].sub;
      capEl.style.opacity = 1; subEl.style.opacity = 1;
    }, 120);
  }
}

/* Wiring: call setStage(progress()) from the same scroll handler that drives
 * your canvas (see snippets/scroll-stages.js) so captions and drawing can
 * never disagree about which stage the reader is in. */
