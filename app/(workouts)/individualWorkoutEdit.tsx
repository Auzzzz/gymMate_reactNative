import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    SafeAreaView,
    View,
    StyleSheet,
    ScrollView,
  } from "react-native";
  import { Button, Chip, Icon, Text, useTheme } from "react-native-paper";
  

export default function IndividualWorkoutEdit() {


    const theme = useTheme();

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
        {/* Elements */}
        <ScrollView>
          <View style={{ margin: 10, flexDirection: 'row' }}>
            <Text variant="headlineSmall"> Workout Elements</Text>
            <Button style={{alignItems: "flex-end", flex: 1}} onPress={() => router.push("/addToWorkout")}><MaterialCommunityIcons name="plus" size={18} /> <Text style={{fontSize: 18}}>Add</Text></Button>
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
          >
            Delete
          </Button>
          <Button
            style={{
              marginTop: 20,
              padding: 5,
              margin: 3,
              backgroundColor: theme.colors.secondary,
            }}
            mode="contained"
            onPress={() => router.push("/individualWorkoutEdit")}
          >
            Save
          </Button>
        </View>
      </SafeAreaView>
    );
  }