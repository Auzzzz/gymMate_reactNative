import { API_WorkoutGET, Workout } from '@/types/clerkTypes'
import { router } from 'expo-router';
import React from 'react'
import { View } from 'react-native'
import {
    Button,
    Text,
    Divider,
    useTheme,
  } from "react-native-paper";

const Workout_click = (workouts: Workout) => {

    const theme = useTheme();
  return (
    <View style={{ flexDirection: "row", marginBottom: 12 }}>
          <View style={{ alignSelf: "flex-start", flex: 1 }}>
            <Text variant="bodyLarge">{workouts.name}</Text>
            <Text variant="bodySmall">{workouts.desc}</Text>
            <Text variant="bodySmall">{workouts.time} hours</Text>
          </View>
          <View
            style={{ flex: 1.5, alignItems: "flex-end", flexDirection: "row"}}
          >
            <Button
              style={{
                marginTop: 20,
                padding: 5,
                margin: 6,
                backgroundColor: theme.colors.primary,
              }}
              onPress={() => router.push("individualWorkouts/" + workouts.workoutId)}
              mode="contained"
            >
              View
            </Button>
            <Button
              style={{
                marginTop: 20,
                padding: 5,
                margin: 6,
                backgroundColor: theme.colors.secondary,
              }}
              mode="contained"
            >
              Start
            </Button>
          </View>
          <Divider />
        </View>
  )
}

export default Workout_click
