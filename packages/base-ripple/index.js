const DEFAULT_COLOR = 'rgba(0, 0, 0, 0.1)';
const DEFAULT_DURATION = 450;

function createRipple(
  node,
  { top, left, diameter },
  { color = DEFAULT_COLOR, duration = DEFAULT_DURATION },
) {
  const targetDuration = duration * 3;
  const ripple = document.createElement('div');
  ripple.setAttribute(
    'style',
    `left: ${left}px; top: ${top}px; width: ${diameter}px; height: ${diameter}px; --color: ${color}; --duration: ${targetDuration}ms`,
  );

  ripple.classList.add('ripple');

  ripple.addEventListener('animationend', onAnimationEnd);
  node.appendChild(ripple);

  function onAnimationEnd() {
    node.removeEventListener('animationend', onAnimationEnd);
    node.removeChild(ripple);
  }
}

export function createRippleContainer(node, options = {}) {
  const { unbounded } = options;
  node.classList.add('ripple-container');
  node.addEventListener('click', onClick);

  if (unbounded) {
    node.classList.add('ripple-container-unbounded');
  }

  function onClick(e) {
    const { clientX, clientY } = e;
    const rect = node.getBoundingClientRect();
    const left = clientX - rect.left;
    const top = clientY - rect.top;
    const farX = left > rect.width / 2 ? 0 : rect.width;
    const farY = top > rect.height / 2 ? 0 : rect.height;
    const radius = Math.sqrt((left - farX) ** 2 + (top - farY) ** 2);
    const diameter = Math.round(radius) * 2;
    const measure = { left: left - radius, top: top - radius, diameter };
    createRipple(node, measure, options);
  }

  return function onDestroy() {
    node.removeEventListener('click', onClick);
  };
}
