import { useSignIn } from "@clerk/clerk-expo";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Button,
  TextInput,
  Text,
  HelperText,
} from "react-native-paper";
import { ClerkError } from "@/types/clerkTypes";


export default function pwReset() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [success, setSuccess] = useState(false);
  const { signIn, setActive } = useSignIn();
  const [error, setError] = useState("");

  const theme = useTheme();

  // Send password reset email
  const resetEmail = async () => {
    try {
      await signIn!.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setSuccess(true);
    } catch (err: any) {
      console.error(err)      
      setError("Please ensure you use a registered email address")
    }
  };

  const onReset = async () => {
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      console.log(result);

      // set user to active to log the user in
      await setActive!({ session: result.createdSessionId });
    } catch (err: any) {
      console.error(err);
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
  //TODO: Error handling

  return (
    <View style={styles.container}>
      {success ? (
        <>
          <Text>Password reset email sent!</Text>
          <TextInput
            label="Code"
            value={code}
            onChangeText={setCode}
            style={{ marginBottom: 20, width: "80%" }}
          />
          <TextInput
            label="New Password"
            value={password}
            onChangeText={setPassword}
            style={{ marginBottom: 20, width: "80%" }}
          />
          <Button mode="contained" onPress={onReset}>
            Reset Password
          </Button>
        </>
      ) : (
        <>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={{ marginBottom: 20, width: "80%" }}
          />
          <Button mode="contained" onPress={resetEmail}>
            Send Reset Email
          </Button>
        </>
      )}
    </View>
  );
}
