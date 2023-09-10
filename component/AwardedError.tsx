import {View,Text} from "react-native";
import {ErrorBoundaryProps} from "expo-router";

type AwardedErrorType = "AppContextLoaderError" | "AppPrepareError";

class AwardedError extends Error {
    constructor(type: AwardedErrorType, details: any) {
        super(details);
        this.type = type;
        this.details = details;
    }

    type: AwardedErrorType
    details: any
}
export function buildError(errorType: AwardedErrorType, details: any): AwardedError {
    return new AwardedError(errorType, details);
}

export function ErrorBoundary(props: ErrorBoundaryProps) {
    console.log("error boundary caught...")
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "red" }}>
            <Text>{props.error.message}</Text>
            <Text onPress={props.retry}>Try Again?</Text>
        </View>
    );
}