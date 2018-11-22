/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {StoreEnhancer} from 'redux';

import {RouterToken} from 'fusion-plugin-react-router';

export type ConnectedReactRouterDepsType = {
  router: typeof RouterToken,
};

export type ConnectedReactRouterServiceType = StoreEnhancer<any, any, any>;
