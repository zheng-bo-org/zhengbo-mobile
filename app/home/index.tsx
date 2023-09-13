import {
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {useRef, useState} from "react";

export default function HomeScreen() {
    const textRef = useRef("Nothing more nothing less");
   return <TouchableWithoutFeedback  style={{height: '100%'}} onPress={() => {
       console.log("touched....")
       if(Keyboard.isVisible()) {
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