import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, useTheme } from "react-native-paper";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_WorkoutGET } from "@/types/clerkTypes";

async function getWorkouts(): Promise<API_WorkoutGET> {
  const auth = useAuth();
  const url = "workout/getUserWorkout/1234abcd";
  try {
    const res = await axios.get(`${process.env.EXPO_PUBLIC_BaseURL + url}`, {
      headers: { Authorization: `Bearer ${await auth.getToken()}` },
    });

    res.data.json();
    console.log("Hello", res.data);

    return res.data as API_WorkoutGET;
  } catch (err) {
    console.log(err);
    return err as API_WorkoutGET;
  }
}

const index = () => {
  const { user } = useUser();
  const auth = useAuth();
  const theme = useTheme();
  const [update, setUpdate] = useState(false);
  const [workouts, setWorkouts] = useState<API_WorkoutGET[]>([]);
  const [loading, setLoading] = useState(false);

  if (update === true) {
    setUpdate(false);
  }

  useEffect(() => {
    const get = async () => {
      const url = "workout/getUserWorkout/1234abcd";
      try {
        setLoading(true);
        axios
          .get(`${process.env.EXPO_PUBLIC_BaseURL + url}`, {
            headers: { Authorization: `Bearer ${await auth.getToken()}` },
          })
          .then((res) => {
            if (
              res.data === null ||
              res.data === undefined ||
              res.data.length === 0
            ) {
              setLoading(false);
            }
            setWorkouts(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log("yo", err);
          });
      } catch (err) {
        console.log("hi", err);
      }
    };
    get();
  }, [update]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      paddingTop: 20,
    },
  });

  const workoutList = () => {
    // console.log(
    //   "workouts",
    //   workouts.map((workout) => workout.workouts.map((workout) => workout.name))
    // );
    // console.log(
    //   "workouts",
    //   workouts.map((workout) => typeof workout.clerkID)
    // );

    // return (
    //   <>
    //     {workouts.map((workout) => (
    //       <Text key={workout.id}>{JSON.stringify(workout)}</Text>
    //     ))}
    //   </>
    // );
    


  };

  return (
    <View style={styles.container}>
      <SignedIn>
        <Avatar.Image size={150} source={{ uri: user?.imageUrl }} />
        <Text>{user?.fullName}</Text>
        <Text>Hello {user?.username}</Text>
        <Text>{user?.emailAddresses[0].emailAddress}</Text>
        <Button onPress={() => auth.signOut()}> Sign Out </Button>
      </SignedIn>
      <SignedOut>
        <Text>Sign in or sign up to access your account</Text>
        <View style={{ flexDirection: "row" }}>
          <Button
            style={{ backgroundColor: theme.colors.secondary, margin: 6 }}
            mode="contained"
            onPress={() => router.push("/sign-in")}
          >
            Sign In
          </Button>
          <Button
            style={{ backgroundColor: theme.colors.primary, margin: 6 }}
            mode="contained"
            onPress={() => router.push("/sign-up")}
          >
            Sign Up
          </Button>
        </View>
      </SignedOut>
      <Button onPress={() => setUpdate(true)}> Workouts </Button>
      {/* {workoutList()} */}
    </View>
  );
};

export default index;
