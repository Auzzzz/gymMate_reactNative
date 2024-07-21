import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Button, Chip, Text, useTheme } from "react-native-paper";

export default function AllWorkouts() {
  const theme = useTheme();
  const { user } = useUser();
  
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
