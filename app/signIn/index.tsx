import {Button, Text, View} from "react-native";
import {Link} from "expo-router";
import {useAppContext} from "../../component/contexts/appContext";
import React from "react";

export default function RoleSelectionScreen() {

    const {state: {system: {currentTheme: {theme}, lng}}, dispatch} = useAppContext();

    return <View style={{backgroundColor: theme["40%"], flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color:theme["30%"], fontWeight: 'bold', fontSize: 29}}>
            I am the role selection page.
        </Text>

        <Text>
            The current lng is {<Text style={{color: theme["10%"]}}>
            {lng}
        </Text>}

        </Text>
        <Button title={"Change the Lng"} onPress={() => {
            dispatch({
                type: "changeLngTo",
                payload: "cn"
            })
        }} color={theme["10%"]}/>

        <Button title={"change the theme"} onPress={() => {
            dispatch({
                type: "changeThemeTo",
                payload: "Pink"
            })
        }} color={theme["10%"]}/>

        <Link href={"signIn/signInScreen"}>Teacher</Link>
        <Link href={"signIn/signInScreen"}>Parent</Link>
        <Link href={"signIn/signInScreen"}>Children</Link>
    </View>
}