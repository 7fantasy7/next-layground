'use client';

import React, {MutableRefObject, useEffect, useReducer, useRef} from "react";

interface Action {
  type: string;
  payload: any;
}

const ACTIONS = {
  setName: 'setName',
  setAge: 'setAge'
}
const reducer = (state: any, action: Action) => {
  console.log('processing action:', action);

  switch (action?.type) {
    case ACTIONS.setName:
      return {...state, name: action.payload.name};
    case ACTIONS.setAge:
      return {...state, age: action.payload.age};
    default:
      return state;
  }
}

const initialState = {
  name: 'Noname',
  age: 0
}

function NewReviewForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const ref: MutableRefObject<any> = useRef();

  // doesn't work
  ref.current?.focus();

  // works, useEffect works after DOM is ready
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  })

  // const setFocus = useCallback(
  //   (element: any) => {
  //     element.focus()
  //   }, []);


  const onNameChange = (event: any) => dispatch(
    {type: ACTIONS.setName, payload: {name: event.target.value}}
  )

  return (
    <div>
      <label>
        Name:
        <input
          ref={ref}
          // if pass function to ref, function is called when element appears in DOM.
          // so the same can be done with useCallback. @see setFocus
          value={state.name} onChange={onNameChange} type="text"/>
      </label>
    </div>
  )
}

export default function UseReducer() {
  return (
    <div className="flex flex-col	h-screen w-screen items-center justify-center bg-blue-500">
      <h1 className="text-white text-4xl font-mono mb-10">Use reducer</h1>
      <NewReviewForm/>
    </div>
  )
}

// todo useLayoutEffect, render stages
