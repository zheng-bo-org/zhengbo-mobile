import {Screen, ScreenDataLoader} from "../../data";
import {Context} from "../../../component/AppContextBuilder";

export async function load(data: Object, context:Context): Promise<Record<Screen, Object>>  {
   return {
       "signIn/index": {}
   }
}

const loader:ScreenDataLoader = load;
export default loader;