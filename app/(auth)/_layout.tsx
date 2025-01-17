import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  return <Stack screenOptions={{headerShown: true}}> 
    <Stack.Screen name="sign-in" options={{ headerTitle: "Sign In"}} />
    <Stack.Screen name="sign-up" options={{ headerTitle: "Sign Up"}}/>
    <Stack.Screen name="reset" options={{ headerTitle: "Reset Password"}}/>
  </Stack>
}