"use strict";
/**
 * index.tsx
 *
 * @description My React utilities/types.
 *
 * @author jasmith79@gmail.com
 * @copyright Jared Smith, 2020
 * @license MIT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
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
exports.useRenderProps = ({ children, render, component, }) => {
    if (process?.env?.NODE_ENV !== 'production'
        && [children, render, component].filter(x => x != null).length > 1) {
        console.warn('You should supply only one of component, render prop, ora function child.');
    }
    return component
        ? (params) => { const Component = component; return react_1.default.createElement(Component, Object.assign({}, params)); }
        : render
            ? render
            : typeof children === 'function'
                ? children
                : (...args) => null;
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
exports.extractSyntheticEventValue = (event) => {
    const target = event.target ? event.target : null;
    const currentTarget = event.currentTarget ? event.currentTarget : null;
    const targetValue = target?.value;
    const currentTargetValue = currentTarget?.value;
    return targetValue == null
        ? currentTargetValue == null
            ? ''
            : currentTargetValue
        : targetValue;
};
//# sourceMappingURL=index.js.map