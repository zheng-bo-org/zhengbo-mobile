import React, {createContext, Reducer, useContext, useReducer} from "react";
import {AppLanguage, buildAppContext, Context} from "../AppContextBuilder";

type ActionTypes = {
    "changeLngTo": AppLanguage,
}


type Action = {
    [K in keyof ActionTypes]: {
        type: K,
        payload: ActionTypes[K] 
    }
}[keyof ActionTypes]


const reducer = (state: Context, action: Action): Context => {
   switch (action.type) {
       case "changeLngTo":
           return {
               ...state,
               system: {
                   ...state.system,
                   lng: action.payload
               }
           }
       default:
           return state;
   }
}

const initializedContext: Context = buildAppContext();

const AppContext = createContext<{
    state: Context,
    dispatch: React.Dispatch<Action>
}>({
    state: initializedContext,
    dispatch: () => null
});

export default function AppContextProvider({children}: {children: React.ReactNode}) {
    const [state, dispatch] = useReducer(reducer, initializedContext);

    return <AppContext.Provider value={{state, dispatch}}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}