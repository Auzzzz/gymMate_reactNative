import {  useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { useTheme, Button, TextInput } from "react-native-paper";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const theme = useTheme();

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

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

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
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        style={{marginBottom: 20, width: '80%'}}
      />
      <TextInput
        value={password}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={{marginBottom: 20, width: '80%'}}
      />
      <Button style={{backgroundColor: theme.colors.secondary, margin: 6, width: '60%'}} mode="contained" onPress={onSignInPress}> Sign In </Button>
      <View style={{marginTop: 20}}>
        <Text>Don't have an account?</Text>
				<Button style={{backgroundColor: theme.colors.primary, margin: 6}} mode="contained" onPress={() => router.push("/sign-up")}> Sign Up </Button>
      </View>
    </View>
  );
}