import { Workout } from "@/types/clerkTypes";
import { useAuth } from "@clerk/clerk-expo";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";

import { Button, Chip, Text, useTheme } from "react-native-paper";
import Element_Dispay from "@/app/components/element_display";


export default function IndividualWorkout(workout: Workout) {
  const theme = useTheme();

  const [workoutElements, setWorkoutElements] = useState<Workout>();
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const { id } = useLocalSearchParams();

  useEffect(() => {
    const get = async () => {
      const url = `workout/getIndividualWorkout/${id} `;
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
            setWorkoutElements(res.data);
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

  // console.log(workoutElements);

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
        <Text variant="headlineLarge" style={{}}>
          {workoutElements?.name}
        </Text>
        <Text variant="bodyMedium">{workoutElements?.desc}</Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 4,
            flexShrink: 1,
            flexWrap: "wrap",
          }}
        >
          <Chip style={{ margin: 4 }} icon="clock">
            {workoutElements?.time} hours
          </Chip>
          <Chip style={{ margin: 4 }} icon="weight">
            {workoutElements?.elements?.length} Elements
          </Chip>
          {/* TODO: Add in last completed */}
          <Chip style={{ margin: 4 }} icon="clock">
            Completed Never
          </Chip>
          {/* TODO: Add in original link */}
          <Chip style={{ margin: 4 }} icon="lock">
            {workoutElements?.private ? "Private" : "Public"}
          </Chip>
        </View>
      </View>

      {/* Elements */}
      <ScrollView>
        <View style={{ margin: 10 }}>
          <Text variant="headlineSmall"> Workout Elements</Text>
        </View>
        <View style={{ margin: 10 }}>
          {workoutElements?.elements?.map((element) => (
            <Element_Dispay key={element.order} {...element} />
          ))}
          </View>
          {/* <Element_Dispay  /> */}
      </ScrollView>
      {/* Buttons */}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          position: "absolute",
          bottom: 30,
          width: "100%",
        }}
      >
        <Button
          style={{
            marginTop: 20,
            padding: 5,
            margin: 3,
            backgroundColor: theme.colors.primary,
          }}
          mode="contained"
          onPress={() => router.push("/individualWorkoutEdit")}
        >
          Edit
        </Button>
        <Button
          style={{
            marginTop: 20,
            padding: 5,
            margin: 3,
            backgroundColor: theme.colors.secondary,
          }}
          mode="contained"
        >
          Start
        </Button>
      </View>
    </SafeAreaView>
  );
}
