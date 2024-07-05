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
} from "react-native";
import { Link, router } from "expo-router";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Button, Text } from "react-native-paper";
import * as React from "react";
import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";

type ItemData = {
  id: string;
  title: string;
};

const DATA: ItemData[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};


const HomePage = () => {
  const { user } = useUser();
  const auth = useAuth();
  // console.log(user);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });

  const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
      <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
    </TouchableOpacity>
  );
  
  
  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';
    console.log(item.id, selectedId)
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );



  // return (
  //   <View>

  //     <Text variant="displayLarge">Home Page</Text>

  //     <Link href="/tab_1">Go to tab 1</Link>
  //     <Pressable onPress={() => router.push("/account")}>
  //       <Text>Go to tab 2</Text>
  //     </Pressable>

  //     <SignedIn>
  //       <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
  //       <Button onPress={() => auth.signOut()}> Sign Out </Button>
  //     </SignedIn>
  //     <SignedOut>
  //       <Link href="/sign-in">
  //         <Text>Sign In</Text>
  //       </Link>
  //       <Link href="/sign-up">
  //         <Text>Sign Up</Text>
  //       </Link>
  //     </SignedOut>
  //   </View>
  // );
};

export default HomePage;
