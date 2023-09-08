import {Text, View, Button} from "react-native";
import {Link} from "expo-router";

export default function RoleSelectionScreen() {
    return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
       <Text>
           I am the role selection page.
       </Text>
        <Link href={"signIn/signInScreen"}>Teacher</Link>
        <Link href={"signIn/signInScreen"}>Parent</Link>
        <Link href={"signIn/signInScreen"}>Children</Link>
    </View>
}