import {
  View,
  Pressable,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableNativeFeedbackComponent,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Link, router } from "expo-router";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import {
  Button,
  Chip,
  Divider,
  Searchbar,
  Text,
  useTheme,
} from "react-native-paper";
import * as React from "react";
import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";

const HomePage = () => {
  const { user } = useUser();
  const auth = useAuth();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
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

  return (
    <SafeAreaView style={styles.container}>
      {/* up next */}

      <View style={styles.header}>
        <Text variant="headlineLarge" style={{}}>
          Up Next...
        </Text>
        <Text variant="titleLarge" style={{ marginTop: 4 }}>
          Workout Name
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Chip
            icon="clock"
            style={{ marginTop: 4, alignSelf: "center", margin: 4 }}
          >
            Time: 4 Hours
          </Chip>
          <Chip
            icon="clock"
            style={{ marginTop: 4, alignSelf: "center", margin: 4 }}
          >
            Style: Mixed
          </Chip>
        </View>
        <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
          <Button
            style={{
              marginTop: 20,
              padding: 5,
              backgroundColor: theme.colors.secondary,
            }}
            mode="contained"
          >
            Start
          </Button>
        </View>
      </View>
      {/* Start of scroll */}
      <ScrollView>
      {/* Find workout */}
      <View style={{ padding: 20 }}>
        <Text variant="headlineSmall">Find a workout</Text>
        <Searchbar
          placeholder="Search for a workout..."
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={[styles.header, { margin: 4, padding: 60 }]}>
            <Text> HELLLLLLLO</Text>
          </View>
          <View style={[styles.header, { margin: 4 }]}>
            <Text> HELLLLLLLO</Text>
          </View>
          <View style={[styles.header, { margin: 4 }]}>
            <Text> HELLLLLLLO</Text>
          </View>
          <View style={[styles.header, { margin: 4 }]}>
            <Text> HELLLLLLLO</Text>
          </View>
          <View style={[styles.header, { margin: 4 }]}>
            <Text> HELLLLLLLO</Text>
          </View>
          <View style={[styles.header, { margin: 4 }]}>
            <Text> HELLLLLLLO</Text>
          </View>
          <View style={[styles.header, { margin: 4 }]}>
            <Text> HELLLLLLLO</Text>
          </View>
        </ScrollView>
      </View>
      {/* recent */}
      <View style={{ padding: 20 }}>

        <Text variant="headlineSmall">Recent workouts</Text>

        <View style={{ flexDirection: "row", marginBottom: 12 }}>
          <View style={{ alignSelf: "flex-start", flex: 1 }}>
            <Text variant="bodyLarge">Workout Name</Text>
            <Text variant="bodySmall">Duration: 4 hours</Text>
            <Text variant="bodySmall">Duration: 4 hours</Text>
            <Text variant="bodySmall">Duration: 4 hours</Text>
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

        <View style={{ flexDirection: "row" }}>
          <View style={{ alignSelf: "flex-start", flex: 1 }}>
            <Text variant="bodyLarge">Workout Name</Text>
            <Text variant="bodySmall">Duration: 4 hours</Text>
          </View>
          <View
            style={{ flex: 1, alignItems: "flex-end", flexDirection: "row" }}
          >
            <Button
              style={{
                marginTop: 20,
                padding: 5,
                margin: 3,
                backgroundColor: theme.colors.primary,
              }}
              mode="contained"
            >
              View
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
          <Divider />
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ alignSelf: "flex-start", flex: 1 }}>
            <Text variant="bodyLarge">Workout Name</Text>
            <Text variant="bodySmall">Duration: 4 hours</Text>
          </View>
          <View
            style={{ flex: 1, alignItems: "flex-end", flexDirection: "row" }}
          >
            <Button
              style={{
                marginTop: 20,
                padding: 5,
                margin: 3,
                backgroundColor: theme.colors.primary,
              }}
              mode="contained"
            >
              View
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
          <Divider />
        </View>

        {/* <Link href="/individualWorkouts"> */}
        <Link href="(workouts)/allWorkouts">

          <Text style={{ fontSize: 16 }}>View all workouts</Text>
        </Link>
        
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
