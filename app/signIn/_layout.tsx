import {Stack} from "expo-router";

export default function Layout() {
    return <Stack screenOptions={{
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }}>
        <Stack.Screen name={"index"} options={{
            title: "Select a role to continue"
        }}/>
        <Stack.Screen name={"signInScreen"} options={{
            title: "Sign In to continue"
        }}/>

        <Stack.Screen name={"registerScreen"} options={{
            title: "Register an account"
        }}/>

        <Stack.Screen name={"resetPasswordScreen"} options={{
            title: "Reset your password"
        }}/>
    </Stack>
}