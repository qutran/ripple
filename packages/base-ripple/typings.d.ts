interface IOptions {
  color?: string;
  duration?: number;
  unbounded?: boolean;
}

function onDestroy(): undefined;

export function createRippleContainer(
  node: HTMLElement,
  options?: IOptions,
): typeof onDestroy;
