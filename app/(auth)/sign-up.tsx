import * as React from "react";
import { View, StyleSheet } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  useTheme,
  Button,
  TextInput,
  Text,
  HelperText,
} from "react-native-paper";
import { ClerkError } from "@/types/clerkTypes";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const theme = useTheme();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [error, setError] = React.useState({} as ClerkError);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
        username,
        
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setIsError(false);
      setPendingVerification(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setIsError(true);
      setError(err);
      // console.log(error.errors[0].message);
      console.error(JSON.stringify(err, null, 2));

      // error.errors.forEach((error) => {
      //   console.log(error.message);
      // });
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
       console.log(err);
      // console.error(JSON.stringify(err, null, 2));
      setIsError(true);
      setError(err);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 20,
    },
  });

  //TODO: add logo
  //TODO: password show/hide
  return (
    <View style={styles.container}>
      {isError &&
        error.errors &&
        error.errors.map((error) => (
          <Text
            variant="bodyLarge"
            style={{ color: "red", marginBottom: 10 }}
            key={error.longMessage}
          >
            {error.longMessage}
          </Text>
        ))}

      {!pendingVerification && (
        <>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(email) => setEmailAddress(email)}
            style={{ marginBottom: 20, width: "80%" }}
          />
          <TextInput
            autoCapitalize="none"
            value={username}
            placeholder="Nickname..."
            onChangeText={(username) => setUsername(username)}
            style={{ marginBottom: 20, width: "80%" }}
          />          
          
          <TextInput
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            style={{ marginBottom: 20, width: "80%" }}
          />
          <Button
            style={{
              backgroundColor: theme.colors.primary,
              margin: 6,
              width: "60%",
            }}
            mode="contained"
            onPress={onSignUpPress}
          >
            Sign Up
          </Button>

          <View style={{ marginTop: 20 }}>
            <Text>All ready have an account?</Text>
            <Button
              style={{ backgroundColor: theme.colors.secondary, margin: 6 }}
              mode="contained"
              onPress={() => router.push("/sign-in")}
            >
              Sign In
            </Button>
          </View>
        </>
      )}
      {pendingVerification && (
        <>
          <Text variant="titleMedium" style={{ marginBottom: 20 }}>
            Check your email for a verification code
          </Text>
          <TextInput
            value={code}
            placeholder="Code..."
            keyboardType="number-pad"
            onChangeText={(code) => setCode(code)}
            style={{ marginBottom: 20, width: "80%" }}
          />
          <Button
            style={{
              backgroundColor: theme.colors.primary,
              margin: 6,
              width: "60%",
            }}
            mode="contained"
            onPress={onPressVerify}
          >
            Verify Email
          </Button>
        </>
      )}
    </View>
  );
}
