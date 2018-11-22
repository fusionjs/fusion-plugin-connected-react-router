/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import {createPlugin, createToken} from 'fusion-core';
import type {FusionPlugin} from 'fusion-core';
import {
  routerMiddleware as createRouterMiddleware,
  connectRouter,
} from 'connected-react-router';
import {RouterToken} from 'fusion-plugin-react-router';
import {EnhancerToken} from 'fusion-plugin-react-redux';

import type {
  ConnectedReactRouterDepsType,
  ConnectedReactRouterServiceType,
} from './types.js';

export const ConnectedRouterEnhancerToken: typeof EnhancerToken = createToken(
  'ConnectedRouterEnhancer'
);

const plugin: FusionPlugin<
  ConnectedReactRouterDepsType,
  ConnectedReactRouterServiceType
> = createPlugin({
  deps: {
    router: RouterToken,
  },
  provides: ({router}): ConnectedReactRouterServiceType => {
    const enhancer = createStore => {
      return function _createStore(reducer, initialState) {
        const store = createStore(reducer, initialState);
        // $FlowFixMe - We enhance the store to add ctx onto it, which doesn't exist in the redux libdef
        const {history} = router.from(store.ctx);
        store.replaceReducer(connectRouter(history)(reducer));
        const oldDispatch = store.dispatch;
        const routerMiddleware = createRouterMiddleware(history)(store);
        store.dispatch = action => {
          return routerMiddleware(function next(action) {
            return oldDispatch(action);
          })(action);
        };
        return store;
      };
    };
    return enhancer;
  },
});

export default plugin;
