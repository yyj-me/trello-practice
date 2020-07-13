import dragula from 'dragula';
import 'dragula/dist/dragula.css';

const dragger = {
  init(container, options) {
    return dragula([...container], options);
  },
  siblings({el, wrapper, candidates, type}) {
    const curId = Number(el.dataset[`${type}Id`]);
    let prev = null;
    let next = null;
    candidates.forEach((el, idx, arr) => {
      const id = Number(el.dataset[`${type}Id`]);
      if (id === curId) {
        prev = idx > 0 ? {
          id: Number(arr[idx - 1].dataset[`${type}Id`]),
          pos: Number(arr[idx - 1].dataset[`${type}Pos`]),
        } : null;
        next = idx < arr.length - 1 ? {
          id: Number(arr[idx + 1].dataset[`${type}Id`]),
          pos: Number(arr[idx + 1].dataset[`${type}Pos`]),
        } : null;
      }
    });
    return {prev, next};
  },
};

export default dragger;
