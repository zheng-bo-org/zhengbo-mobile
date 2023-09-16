import {Button, Text, View} from "react-native";
import {Link} from "expo-router";
import {useAppContext} from "../../component/contexts/appContext";
import React from "react";

export default function RoleSelectionScreen() {

    const {state, dispatch} = useAppContext();

    return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>
            I am the role selection page.
        </Text>
        <Text>
            The current lng is {state.system.lng}
        </Text>
        <Button title={"Change the Lng"} onPress={() => {
            dispatch({
                type: "changeLngTo",
                payload: "cn"
            })
        }}/>
        <Link href={"signIn/signInScreen"}>Teacher</Link>
        <Link href={"signIn/signInScreen"}>Parent</Link>
        <Link href={"signIn/signInScreen"}>Children</Link>
    </View>
}