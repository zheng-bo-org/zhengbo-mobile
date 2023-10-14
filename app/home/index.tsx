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
        api('(Rest/get /systems/roles {} (Get system roles))', {}).then(rs => {
            console.log(`rs? ${JSON.stringify(rs.roles)}`)
            setRoles(rs.roles as any)
        })
    }, []);

    return <TouchableWithoutFeedback style={{height: '100%'}} onPress={() => {
        if (Keyboard.isVisible()) {
            Keyboard.dismiss()
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