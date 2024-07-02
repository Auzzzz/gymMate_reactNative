import { Link } from "expo-router"
import { View, Text } from "react-native"

const dummy_page = () => {
    return (
    <View>
        <Text>Dummy page HELLO</Text>
        <Text>Dummy page HELLO</Text>
        <Text>Dummy page HELLO</Text>
        <Text>Dummy page HELLO</Text>
        <Text>Dummy page HELLO</Text>
        <Link href="tab_1/index">Navigate back</Link>
    </View>
    )
}

export default dummy_page