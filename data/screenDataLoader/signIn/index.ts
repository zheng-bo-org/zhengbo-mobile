import {Screen, ScreenDataLoader} from "../../data";
import {AppContext} from "../../../app";

export async function load(data: Object, context:AppContext): Promise<Record<Screen, Object>>  {
   return {
       "signIn/index": {}
   }
}

const loader:ScreenDataLoader = load;
export default loader;