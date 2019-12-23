import { createRippleContainer } from 'base-ripple';

export function ripple(node, options) {
  let destroyContainer = createRippleContainer(node, options);

  return {
    update: options => {
      destroyContainer = createRippleContainer(node, options);
    },
    destroy() {
      destroyContainer();
    },
  };
}
