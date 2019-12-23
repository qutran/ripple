import { MutableRefObject } from 'react';
import { IOptions } from 'base-ripple';

export function useRippleRef(options: IOptions): MutableRefObject<HTMLElement>;
