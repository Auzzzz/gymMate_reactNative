import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Button, Chip, Text, useTheme } from "react-native-paper";
import Workout_click from "../components/workout_click";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_WorkoutGET } from "@/types/clerkTypes";

export default function AllWorkouts() {
  const theme = useTheme();
  const { user } = useUser();
  const auth = useAuth();
  const [workouts, setWorkouts] = useState<API_WorkoutGET[]>([]);
  const [loading, setLoading] = useState(false);

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
            // console.log("hi", res);
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
  }, []);

  if (loading || workouts === undefined) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator
          animating={true}
          size={70}
          color={theme.colors.primary}
        />
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    header: {
      backgroundColor: theme.colors.tertiary,
      padding: 20,
    },
  });

  //TODO: add custom header w/ name of WO
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="headlineMedium" style={{}}>
          {user?.username} workout's
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 4,
            flexShrink: 1,
            flexWrap: "wrap",
          }}
        >
          <Chip style={{ margin: 4 }} icon="numeric">
            4 hours
          </Chip>
          <Chip style={{ margin: 4 }} icon="weight">
            1200 Elements
          </Chip>
          <Chip style={{ margin: 4 }} icon="clock">
            4 hours
          </Chip>
          <Chip style={{ margin: 4 }} icon="lock">
            10 Private
          </Chip>
          <Chip style={{ margin: 4 }} icon="lock">
            12 Public
          </Chip>
        </View>
      </View>

      {/* Elements */}
      <ScrollView>
        <View style={{ margin: 10 }}>
          <Text variant="headlineSmall"> ALL WORKS</Text>
        </View>
        <View style={{ margin: 20 }}>
          {/* {workouts?.workouts.map((workout) => (
              <Workout_click key={workout.time} {...workout} />
            ))} */}

          {workouts.map((workout) =>
            workout.workouts.map((workout) => (
              <Workout_click key={workout.time} {...workout} />
            ))
          )}

          {/* <Workout_click workouts={workouts?.workouts} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
