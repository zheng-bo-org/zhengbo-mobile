import {
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {useEffect, useRef, useState} from "react";
import {api} from "../../data/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
    const textRef = useRef("Nothing more nothing less");
    const [roles, setRoles] = useState([])
    useEffect(() => {
        api("(Local/set-in system-roles)", {
            roles: ["test1", "test2"]
        }).then(() => {
            api("(Local/get-in system-roles)", {}).then(rs => {
                console.log(`roles? ${rs.roles}`)
                setRoles(rs.roles as any)
            })
        })
    }, []);

    return <TouchableWithoutFeedback style={{height: '100%'}} onPress={() => {
        console.log("touched....")
        if (Keyboard.isVisible()) {
            Keyboard.dismiss()
            console.log("keyboard dismissed")
        }
    }}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>
                I am the home Screen.
            </Text>

            <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    textRef.current = text;
                }}
            />

            <Text>
                The roles are: {roles.join("-")}
            </Text>
        </View>
    </TouchableWithoutFeedback>
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});