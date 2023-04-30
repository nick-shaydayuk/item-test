import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useState } from 'react';

type Timer = ReturnType<typeof setTimeout>;
type SomeFunction = (...args: any[]) => any;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useDebounce<Func extends SomeFunction>(func: Func, delay: number) {
  const [timer, setTimer] = useState<Timer>();

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);
    clearTimeout(timer);
    setTimer(newTimer);
  }) as Func;

  return debouncedFunction;
}
