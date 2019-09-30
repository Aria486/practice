/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// react-app-polyfill@0.2.0

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
require('core-js/fn/object/assign');

require('core-js/fn/object/values');

// Support for...of (a commonly used syntax feature that requires Symbols)
require('core-js/es6/symbol');
// Support iterable spread (...Set, ...Map)
require('core-js/fn/array/from');

require('core-js/fn/array/find');
require('core-js/fn/array/find-index');

// React 16+ relies on Map, Set, and requestAnimationFrame
require('core-js/es6/map');
require('core-js/es6/set');
require('raf').polyfill(window);
