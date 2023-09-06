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
    </Stack>
}