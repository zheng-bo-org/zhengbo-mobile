import AppContextProvider from "../component/contexts/appContext";
import {Slot} from "expo-router";

export default function Layout() {
   return <AppContextProvider>
       <Slot/>
   </AppContextProvider>
}