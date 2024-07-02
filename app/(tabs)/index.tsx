import { View, Text, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";

const HomePage = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <View>
      <Text>Home Page</Text>
      <Link href="/tab_1">Go to tab 1</Link>
      <Pressable onPress={() => router.push("/account")}>
        <Text>Go to tab 2</Text>
      </Pressable>

      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
    </View>
  );
};

export default HomePage;
