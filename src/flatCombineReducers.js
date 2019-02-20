// @flow
import type {Reducer} from 'redux';

function flatCombineReducers(...reducers: Array<Reducer<Object, Object>>): Reducer<Object, Object> {
  return (state: Object | void, action: Object) => {
    return reducers.reduce((newState: Object, reducer: Reducer<Object, Object>): Object => {
      return {...newState, ...reducer(newState, action)};
    }, state);
  };
}

export default flatCombineReducers;