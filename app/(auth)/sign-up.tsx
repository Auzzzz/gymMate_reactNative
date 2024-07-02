import * as React from "react";
import { View, StyleSheet } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useTheme, Button, TextInput, Text } from "react-native-paper";


export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const theme = useTheme();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
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
      console.error(JSON.stringify(err, null, 2));
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
  return (
    <View style={styles.container}>
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
