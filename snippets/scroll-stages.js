/* scroll-stages.js — scroll-driven sticky stage + N-stop autoplay.
 *
 * WHEN TO USE: discrete transformations, proofs, or any sequence with a
 * "step" feeling, where the reader should control the pace. The stage
 * count N is the course's choice — this recipe imposes none.
 *
 * Inline and adapt; do not link externally (courses are self-contained).
 *
 * HTML assumed:
 *   <section id="story" style="height:<N*100>vh">  <- tall scroll runway
 *     <div style="position:sticky;top:0">…stage…</div>
 *   </section>
 *   <button id="playBtn">▶ Autoplay</button>       <- hide under reduced-motion
 */

var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var story = document.getElementById('story');

/* 0..1 progress through the runway. Drive ALL stage rendering from this one
 * number so manual scroll and autoplay share the same code path. */
function progress(){
  if (reduceMotion) return 1; // degrade: show the completed state
  var start = story.offsetTop;
  var end = start + story.offsetHeight - window.innerHeight;
  var p = (window.scrollY - start) / Math.max(1, end - start);
  return Math.max(0, Math.min(1, p));
}

/* Map progress to a discrete stage index (for captions, chips, etc.). */
function stageIndex(p, stageCount){
  return Math.min(stageCount - 1, Math.floor(p * stageCount));
}

/* Autoplay: visit each stop (0..1 progress values) at a readable pace.
 * SPEC outcome requirements: every stop reachable, enough time to read,
 * final state fully rendered, replayable, manual scroll still works.
 *
 * HARD-WON FIX (this bug shipped twice before being understood): if your CSS
 * has `html{scroll-behavior:smooth}`, programmatic scrolling from a rAF loop
 * or rapid scrollTo calls will fight it and stutter. Disable it for the
 * duration of autoplay, restore afterwards. */
var autoTimer = 0;
var autoRunning = false;
var savedScrollBehavior = null;

function restoreScrollBehavior(){
  if (savedScrollBehavior === null) return;
  document.documentElement.style.scrollBehavior = savedScrollBehavior;
  savedScrollBehavior = null;
}

function autoplay(stops, dwellMs, onDone){
  if (reduceMotion || !Array.isArray(stops) || stops.length === 0) return;
  stopAutoplay();
  savedScrollBehavior = document.documentElement.style.scrollBehavior;
  autoRunning = true;
  var start = story.offsetTop;
  var travel = Math.max(1, story.offsetHeight - window.innerHeight);
  var i = 0;
  function advance(){
    var stop = Math.max(0, Math.min(1, stops[i]));
    window.scrollTo({ top: start + travel * stop, behavior: 'smooth' });
    i += 1;
    if (i < stops.length){
      autoTimer = setTimeout(advance, dwellMs);
    } else {
      autoTimer = setTimeout(function(){
        autoTimer = 0;
        autoRunning = false;
        restoreScrollBehavior();
        if (onDone) onDone();
      }, dwellMs); // let the last stop finish rendering before declaring done
    }
  }
  document.documentElement.style.scrollBehavior = 'auto';
  advance();
}
function stopAutoplay(){
  if (autoTimer){ clearTimeout(autoTimer); autoTimer = 0; }
  if (autoRunning){
    autoRunning = false;
    // Cancel an in-flight smooth scroll at its current position.
    window.scrollTo({ top: window.scrollY, behavior: 'auto' });
  }
  restoreScrollBehavior();
}

/* Manual navigation always wins over autoplay. A plain `scroll` listener
 * cannot distinguish user scrolls from scrollTo(), so listen for intent. */
['wheel', 'touchstart', 'pointerdown'].forEach(function(type){
  window.addEventListener(type, function(){ if (autoRunning) stopAutoplay(); }, { passive: true });
});
window.addEventListener('keydown', function(e){
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].indexOf(e.key) >= 0 && autoRunning){
    stopAutoplay();
  }
});

/* Example wiring (adapt freely):
 *   window.addEventListener('scroll', render, { passive: true });
 *   var courseStops = COURSE_DEFINED_STOPS;
 *   var courseDwellMs = COURSE_DEFINED_DWELL_MS;
 *   playBtn.addEventListener('click', function(){
 *     autoplay(courseStops, courseDwellMs, function(){ playBtn.textContent = '↻ Replay'; });
 *   });
 * Choose stops so each teaching state gets its own dwell; dwellMs should be
 * long enough to read the caption you actually wrote, not a default.
 */
