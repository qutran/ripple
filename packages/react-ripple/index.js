import { useRef, useLayoutEffect } from 'react';
import { createRippleContainer } from 'base-ripple';

export function useRippleRef({
  duration = 450,
  color = 'rgba(0, 0, 0, 0.1)',
  unbounded = false,
}) {
  const ref = useRef(null);

  useLayoutEffect(
    () => createRippleContainer(ref.current, { duration, color, unbounded }),
    [ref, duration, color, unbounded],
  );

  return ref;
}
