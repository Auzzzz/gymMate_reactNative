import { Tabs } from 'expo-router'

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
                    headerTitle: "Home Tab",
                    title: "Home Tab Title"
                }}
            />
            <Tabs.Screen
                name="account/index"
                options={{
                    headerTitle: "Account",
                    title: "Account Title"
                }} />
        </Tabs>
    )
}

export default TabsLayout