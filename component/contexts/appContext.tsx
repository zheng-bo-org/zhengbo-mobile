import React, {createContext, Reducer, useContext, useReducer} from "react";
import {AppLanguage, buildAppContext, Context} from "../AppContextBuilder";
import {Themes} from "../theme/theme";

type ActionTypes = {
    "changeLngTo": AppLanguage,
    "changeThemeTo": Themes
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
       case "changeThemeTo":
           const theTheme = state.system.themeOptions.find((theme) => {
               return theme.code === action.payload;
           })
           if (theTheme == undefined) {
               return state;
           }

           return {
               ...state,
               system: {
                   ...state.system,
                   currentTheme: theTheme
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