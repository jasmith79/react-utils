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
export declare type RenderPropsFn<T extends {}> = {
    (props: T): React.ReactElement<T>;
};
export declare type RenderProps<T extends {}> = {
    children?: React.ReactChild | RenderPropsFn<T>;
    render?: RenderPropsFn<T>;
    component?: React.ComponentType<T>;
};
/**
 * @description Type of the reducer given to useReducer
 */
export declare type Reducer<S, A> = (prevState: S, action: A) => S;
/**
 * @description Same as the type of the dispatch function returned from useReducer.
 */
export declare type Dispatch<A> = (action: A) => void;
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
export declare const useRenderProps: <T extends {} = {}>({ children, render, component, }: RenderProps<T>) => RenderPropsFn<T> | ((params?: T) => JSX.Element) | ((..._args: any[]) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>);
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
export declare function extractSyntheticEventValue<T = string>(event: React.SyntheticEvent<HTMLFormControl>): T;
