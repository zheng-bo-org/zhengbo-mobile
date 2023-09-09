import {Text, View} from "react-native";
import {Link} from "expo-router";

export default function SignInScreen() {
    return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>
            I am the signIn page...
        </Text>

        <Link href={"home"}>
            Login
        </Link>

        <Link href={"signIn/resetPasswordScreen"}>
            resetPassword
        </Link>

        <Link href={"signIn/registerScreen"}>
            Register
        </Link>

    </View>
}