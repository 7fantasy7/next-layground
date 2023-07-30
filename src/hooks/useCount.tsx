import {useCallback, useState} from "react";

function useCount(initialValue: number = 0) {
  let [count, setCount] = useState(initialValue);

  // deps are no needed
  const increment = useCallback(() => {
    setCount((currentCount) => currentCount + 1)
  }, []);

  // with deps (as an example)
  const decrement = useCallback(() => {
    setCount(count - 1)
  }, [count]);

  return {count, increment, decrement}
}