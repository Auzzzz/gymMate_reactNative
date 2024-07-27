import { Elements } from "@/types/clerkTypes";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button, Card, Divider, Text, useTheme } from "react-native-paper";

const Element_Display = (elements: Elements) => {
  
  console.log(elements);
  const theme = useTheme();
  // Add one cause array rules
  const order = elements.order + 1

  return (
    <View>
      <View>
        <Card mode="outlined" style={{marginVertical: 8, backgroundColor: theme.colors.background}}>
          <Card.Content style={{marginBottom: 6}}>
            <Text variant="titleLarge">{order} | {elements.element.name}</Text>
            <Text variant="bodyMedium">{elements.element.desc}</Text>
          </Card.Content>
          <Card.Cover source={{ uri: `${elements.element.uri}` }} resizeMode="cover" style={{}}/>
        </Card>
      </View>
    </View>

    // <View style={{ flexDirection: "row", marginBottom: 12 }}>
    //   <View style={{ alignSelf: "flex-start", flex: 1 }}>
    //     <Text variant="bodyLarge">bla</Text>
    //     <Text variant="bodySmall">ha</Text>
    //     <Text variant="bodySmall">na hours</Text>
    //   </View>
    //   <View style={{ flex: 1.5, alignItems: "flex-end", flexDirection: "row" }}>
    //     <Button
    //       style={{
    //         marginTop: 20,
    //         padding: 5,
    //         margin: 6,
    //       }}
    //     //   onPress={() =>
    //     //     router.push("individualWorkouts/" + workouts.workoutId)
    //     //   }
    //       mode="contained"
    //     >
    //       View
    //     </Button>
    //     <Button
    //       style={{
    //         marginTop: 20,
    //         padding: 5,
    //         margin: 6,
    //       }}
    //       mode="contained"
    //     >
    //       Start
    //     </Button>
    //   </View>
    //   <Divider />
    // </View>
  );
};

export default Element_Display;
