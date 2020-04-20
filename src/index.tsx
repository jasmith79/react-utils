/**
 * index.tsx
 *
 * @description My React utilities/types.
 *
 * @author jasmith79@gmail.com
 * @copyright Jared Smith, 2020
 * @license MIT
 */

import React from 'react';
import { HTMLFormControl } from '@jasmith79/ts-utils';

export type RenderPropsFn<T extends {}> = {
  (props: T): React.ReactElement<T>
}

export type RenderProps<T extends {}> = {
  children?: React.ReactChild | RenderPropsFn<T>,
  render?: (props: T) => React.ReactElement<T>,
  component?: React.ComponentType<T>,
}

/**
 * @description Type of the reducer given to useReducer
 */
export type Reducer<S, A> = (prevState: S, action: A) => S

/**
 * @description Same as the type of the dispatch function returned from useReducer.
 */
export type Dispatch<A> = (action: A) => void

/**
 * @description Custom hook for using render props. Takes optional render function and/or
 * component prop and/or function child from the calling component's props and returns the
 * render target in the following order of priority:
 * 
 * component prop > render function > child function
 *
 * in order to allow as much flexibility as possible in the calling component's API. **NOTE**
 * that the type parameter is for the type of props passed to the *render target*, NOT the
 * calling component.
 * 
 * @typeParam T The type for the props passed to the returned render target.
 * @param params The destructured params.
 * @param params.children The children passed to the function component calling the hook.
 * @param params.render The render method passed to the function component calling the hook.
 * @param params.component The Component prop passed to the function component calling the hook.
 * @returns The render function for the calling component.
 */
export const useRenderProps = <T extends {} = {}>({
  children,
  render,
  component,
}: RenderProps<T>) => {
  if (process?.env?.NODE_ENV !== 'production'
    && [children, render, component].filter(x => x != null).length > 1
  ) {
    console.warn('You should supply only one of component, render prop, or a child node/function.');
  }

  return component
    ? (params: T = ({} as T)) => { const Component = component; return <Component { ...params } />; }
    : render
      ? render
      : typeof children === 'function'
        ? children
        : null;
};

/**
 * @description Extracts a value, if present, from a React.SyntheticEvent.
 * NOTE: React events are pooled, this will not work asynchronously. Even
 * if you call event.persist(), if the underlying input is a controlled
 * component you will get the live value, use care when trying to pull
 * this from e.g. a debounced input handler.
 *
 * @param event The React.SyntheticEvent to get the value from.
 * @returns The extracted event value.
 */
export const extractSyntheticEventValue = (event: React.SyntheticEvent): string => {
  const target = event.target ? event.target as HTMLFormControl : null;
  const currentTarget = event.currentTarget ? event.currentTarget as HTMLFormControl : null;
  const targetValue = target?.value;
  const currentTargetValue = currentTarget?.value;
  return targetValue == null
    ? currentTargetValue == null
      ? ''
      : currentTargetValue
    : targetValue;
};
