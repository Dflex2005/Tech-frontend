import {createContext, useEffect, useReducer} from "react"
import Reducer from "./Reducer"

const intialState = {
    user: JSON.parse(localStorage.getItem("user")),
    isFetching: false,
    error: false,
};

export const Context = createContext(intialState);

export const ContextProvider = ({children}) =>{
     const [state, dispatch] = useReducer(Reducer, intialState);

     useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user) || null);
     },[state.user])

     return <Context.Provider value={{
        user:state.user,
        isFetching:state.isFetching,
        error: state.error,
        dispatch,
     }}>
        {children}
     </Context.Provider>
}