/**
 * index.test.tsx
 *
 * @description Tests for the React utilities/types.
 *
 * @author jasmith79@gmail.com
 * @copyright Jared Smith, 2020
 * @license MIT
 */
import 'jsdom-global/register';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import React, { useReducer } from 'react';

import {
  useRenderProps,
  RenderProps,
  Dispatch,
} from './index';

type TestComponentProps = {
  a: number,
};

type TestParams = {
  b: string
}

type TestProps = TestComponentProps & RenderProps<TestParams>;

const TestComponent = ({
  a,
  component,
  render,
  children,
}: TestProps) => {
  const renderTarget = useRenderProps({
    component,
    render,
    children,
  });

  return renderTarget({ b: '' + a });
};

const reducerInit = {
  a: 3,
  b: 'hi',
};

type State = typeof reducerInit;

type Action = { type: 'updatea', value: 5 }
  | { type: 'updateb', value: 'bye' }

const testReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'updatea': return { ...state, a: action.value };
    case 'updateb': return { ...state, b: action.value };
  }
};

const TakesReducerTypes = ({
  state,
  dispatch,
}: {
  state: string,
  dispatch: Dispatch<Action>,
}) => {
  return <button onClick={() => dispatch({ type: 'updateb', value: 'bye' })}>{state}</button>;
};

const WrapsWithReducer = () => {
  const [state, dispatch] = useReducer(testReducer, reducerInit);
  return <TakesReducerTypes state={state.b} dispatch={dispatch} />;
};

describe('useRenderProps', () => {
  it('should correctly use a function child', () => {
    const wrapper = mount(
      <TestComponent a={3}>{({ b }) => (
        <div>{b}</div>
      )}</TestComponent>
    );

    const b = wrapper.find('div').at(0).text().trim();
    expect(b).toBe('3');
  });

  it('should correctly use a render prop', () => {
    const render = ({ b }: { b: string }) => (
      <div>{b}</div>
    );

    const wrapper = mount(<TestComponent a={3} render={render} />);

    const b = wrapper.find('div').at(0).text().trim();
    expect(b).toBe('3');
  });

  it('should correctly use a component prop', () => {
    const Foo = class Foo extends React.Component<{ b: string }> {
      render () {
        return <div>{this.props.b}</div>
      }
    };

    const wrapper = mount(<TestComponent a={3} component={Foo} />);

    const b = wrapper.find('div').at(0).text().trim();
    expect(b).toBe('3');
  });
});
