import * as React from 'react';
/** Similar with `useEffect` but only trigger after mounted */
var useUpdatedEffect = function useUpdatedEffect(callback, conditions) {
  var mountRef = React.useRef(false);
  React.useEffect(function () {
    if (mountRef.current) {
      callback();
    } else {
      mountRef.current = true;
    }
  }, conditions);
};
export default useUpdatedEffect;