import { IOptions } from 'base-ripple';

interface ActionOutput {
  update: Function;
  destroy: Function;
}

export function ripple(node: HTMLElement, options: IOptions): ActionOutput;
