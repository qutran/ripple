const DEFAULT_COLOR = 'rgba(0, 0, 0, 0.1)';
const DEFAULT_DURATION = 450;

function createRipple(
  node,
  { top, left, diameter },
  { color = DEFAULT_COLOR, duration = DEFAULT_DURATION },
) {
  const ripple = document.createElement('div');
  let resolveTransition = null;
  let resolveInteraction = null;

  const transitionPromise = new Promise(resolve => {
    resolveTransition = resolve;
  });

  const interactionPromise = new Promise(resolve => {
    resolveInteraction = resolve;
  });

  ripple.setAttribute(
    'style',
    `left: ${left}px; top: ${top}px; width: ${diameter}px; height: ${diameter}px; --color: ${color}; --duration: ${duration}ms`,
  );

  ripple.addEventListener('transitionend', onAppearAnimationEnd);
  ripple.classList.add('ripple');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => ripple.classList.add('ripple-appear'));
  });

  node.appendChild(ripple);
  node.addEventListener('touchend', onInteractionEnd);
  node.addEventListener('mouseup', onInteractionEnd);
  node.addEventListener('mouseleave', onInteractionEnd);

  Promise.all([transitionPromise, interactionPromise]).then(() => {
    ripple.classList.add('ripple-disappear');
  });

  function onInteractionEnd(e) {
    node.removeEventListener('touchend', onInteractionEnd);
    node.removeEventListener('mouseup', onInteractionEnd);
    node.removeEventListener('mouseleave', onInteractionEnd);
    resolveInteraction();
    e.preventDefault();
    e.stopPropagation();
  }

  function onAppearAnimationEnd() {
    ripple.removeEventListener('transitionend', onAppearAnimationEnd);
    requestAnimationFrame(() => {
      ripple.addEventListener('transitionend', onDisappearAnimationEnd);
      resolveTransition();
    });
  }

  function onDisappearAnimationEnd() {
    ripple.removeEventListener('transitionend', onDisappearAnimationEnd);
    node.removeChild(ripple);
  }
}

export function createRippleContainer(node, options = {}) {
  const { unbounded } = options;
  node.classList.add('ripple-container');
  node.addEventListener('touchstart', onStart);
  node.addEventListener('mousedown', onStart);

  if (unbounded) {
    node.classList.add('ripple-container-unbounded');
  }

  function onStart(e) {
    const { clientX, clientY } = e.touches ? e.touches[0] : e;
    const rect = node.getBoundingClientRect();
    const left = clientX - rect.left;
    const top = clientY - rect.top;
    const farX = left > rect.width / 2 ? 0 : rect.width;
    const farY = top > rect.height / 2 ? 0 : rect.height;
    const radius = Math.sqrt((left - farX) ** 2 + (top - farY) ** 2);
    const diameter = Math.round(radius) * 2;
    const measure = { left: left - radius, top: top - radius, diameter };
    createRipple(node, measure, options);
    e.preventDefault();
    e.stopPropagation();
  }

  return function onDestroy() {
    node.classList.remove('ripple-container-unbounded');
    node.removeEventListener('touchstart', onStart);
    node.removeEventListener('mousedown', onStart);
  };
}
