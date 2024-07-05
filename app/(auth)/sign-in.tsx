import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import React from "react";
import { useTheme, Button, TextInput, Text } from "react-native-paper";
import { ClerkError } from "@/types/clerkTypes";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const theme = useTheme();
  const [textEntry, setTextEntry] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [error, setError] = React.useState({} as ClerkError);
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // console.error(JSON.stringify(err, null, 2));
      setIsError(true);
      setError(err);
    }
  }, [isLoaded, emailAddress, password]);

  const showPassword = () => {
    setTextEntry(!textEntry);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 20,
    },
  });
  // TODO: add logo
  //TODO: add show password w/ JS toggle as TextInput.Icon EOL
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
            {error.message}
          </Text>
        ))}
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        style={{ marginBottom: 20, width: "80%" }}
      />
      <TextInput
        value={password}
        placeholder="Password..."
        secureTextEntry={false}
        onChangeText={(password) => setPassword(password)}
        style={{ marginBottom: 20, width: "80%" }}
      />
      <Button
        style={{
          backgroundColor: theme.colors.secondary,
          margin: 6,
          width: "60%",
        }}
        mode="contained"
        onPress={onSignInPress}
      >
        Sign In
      </Button>
      <View style={{ marginTop: 20 }}>
        <Text>Don't have an account?</Text>
        <Button
          style={{ backgroundColor: theme.colors.primary, margin: 6 }}
          mode="contained"
          onPress={() => router.push("/sign-up")}
        >
          Sign Up
        </Button>
      </View>
      <View style={{ paddingTop: 20}}>
      <Link href="/reset">
          <Text style={{ fontSize: 16 }}>Forgot your password?</Text>
        </Link>
        </View>
    </View>
  );
}
