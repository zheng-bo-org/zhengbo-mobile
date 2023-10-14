import React, {createContext, useContext, useReducer} from "react";
import {buildAppContext, Context} from "../AppContextBuilder";
import {Themes} from "../theme/theme";
import {Nation} from "../../international/lang/international";

type ActionTypes = {
    "changeLngPackFor": Nation,
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
       case "changeLngPackFor":
           const theLngPack = state.system.lngPackOptions.find((pack) => {
               return pack.applyForTheNations.includes(action.payload)
           })

           if (theLngPack == undefined) {
               return state
           }

           return {
               ...state,
               system: {
                   ...state.system,
                   currentLngPack: theLngPack
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