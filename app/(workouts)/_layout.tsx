import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function WorkoutsRoutesLayout() {
  const { isSignedIn } = useAuth();

  // if (isSignedIn) {
  //   return <Redirect href={"/"} />;
  // }

  return <Stack screenOptions={{headerShown: true}}> 
    <Stack.Screen name="individualWorkouts/[id]" options={{ headerTitle: "I Workout"}} />
    <Stack.Screen name="individualWorkoutEdit" />
    <Stack.Screen name="allWorkouts" options={{headerTitle: "All workouts"}} />

    {/* <Stack.Screen name="sign-up" options={{ headerTitle: "Sign Up"}}/>
    <Stack.Screen name="reset" options={{ headerTitle: "Reset Password"}}/> */}
  </Stack>
}