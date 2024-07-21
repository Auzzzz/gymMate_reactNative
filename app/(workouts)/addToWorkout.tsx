import { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import {
  Button,
  Searchbar,
  Text,
  useTheme,
  Modal,
  Portal,
  TextInput,
} from "react-native-paper";

export default function AddToWorkout() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  // Model
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
  return (
    <SafeAreaView style={styles.container}>
      {/* Search */}

      <View style={{ padding: 20 }}>
        <Text variant="headlineSmall">Find a workout element</Text>
        <Searchbar
          placeholder="Search for a workout..."
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>

      {/* Recently Used */}

      <View>
        <Text variant="headlineSmall" style={{ padding: 20 }}>
          Recently Used
        </Text>
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
      {/* Results */}

      <View>
        {/* Don't know what it's returning yet */}
        <Button mode="contained" style={{ margin: 20 }} onPress={showModal}>
          {" "}
          Add{" "}
        </Button>
      </View>

      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <View style={{ backgroundColor: "white" }}>
            <View>
              <Text
                variant="titleLarge"
                style={{ textAlign: "center", margin: 8 }}
              >
                Workout Name
              </Text>
              <Image
                source={{
                  uri: "https://downunderaussie.com/gym/images/3-4_sit-up.gif ",
                }}
                style={{ width: "100%", height: 250 }}
              />
            </View>
            <View
              style={{
                marginTop: 8,
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <TextInput
                style={{ width: "40%", margin: 4 }}
                label="Sets"
                keyboardType={"number-pad"}
              />
              <TextInput
                style={{ width: "40%", margin: 4 }}
                label="Reps"
                keyboardType={"number-pad"}
              />
              <TextInput
                style={{ width: "40%", margin: 4 }}
                label="Rest"
                keyboardType={"number-pad"}
              />
              <TextInput
                style={{ width: "40%", margin: 4 }}
                label="Repeat"
                keyboardType={"number-pad"}
              />
               <TextInput
                style={{ width: "40%", margin: 4 }}
                label="Weight"
                keyboardType={"number-pad"}
              />
            </View>
            <View>
              <Button style={{backgroundColor: theme.colors.secondary, margin: 20}} mode="contained" >
                Add
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}
