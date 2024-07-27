import { Elements } from "@/types/clerkTypes";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button, Card, Divider, Text, useTheme } from "react-native-paper";

const Element_Display = (elements: Elements) => {
  
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
  );
};

export default Element_Display;
