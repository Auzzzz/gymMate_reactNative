import { Tabs } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
const TabsLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="tab_1"
                options={{
                    headerTitle: "Tab 1",
                    title: "Tab 1 Title"
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: "Home Tab Title",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="weight-lifter" size={24} color={color} />

                    
                }}
            />
            <Tabs.Screen
                name="account/index"
                options={{
                    headerTitle: "Account",
                    title: "My Account",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" size={24} color={color} />
                }} />

            
        </Tabs>
    )
}

export default TabsLayout