import React, { useEffect, useState, createContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { useFetchLinks } from '@/hooks/useFetchLinks';
import Recents from './dashboard/Recents';
import Important from './dashboard/Important';
import AllLinks from './dashboard/AllLinks';
import { LinksContextType } from '@/models/Dashboard/LinksOut';
import { LinksOut } from '@/models/Dashboard/LinksOut';
import { useUserId } from '@/hooks/useUserId';
import { FontAwesome } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
export const LinksContext = createContext<LinksContextType | undefined>(undefined);

const Dashboard = () => {
    const [links, setLinks] = useState<LinksOut[]>([]); // State to hold links data
    const userId = useUserId(); // Get userId from a custom hook

    // Fetch links when the component mounts or userId changes
    useEffect(() => {
        useFetchLinks(setLinks, userId);
    }, [userId]);

    return (
        <LinksContext.Provider value={{ links, setLinks }}>
            <Tab.Navigator initialRouteName="Recents">
                {/* Recents Tab */}
                <Tab.Screen
                    name="Recents"
                    component={Recents}
                    options={{
                        tabBarLabel: 'Recents',
                        tabBarIcon: ({ color, size }) => <FontAwesome name="clock-o" color={color} size={size} />,
                    }}
                />
                {/* Important Tab */}
                <Tab.Screen
                    name="Important"
                    component={Important}
                    options={{
                        tabBarLabel: 'Important',
                        tabBarIcon: ({ color, size }) => <FontAwesome name="exclamation-circle" color={color} size={size} />,
                    }}
                />
                {/* All Links Tab */}
                <Tab.Screen
                    name="All Links"
                    component={AllLinks}
                    options={{
                        tabBarLabel: 'All Links',
                        tabBarIcon: ({ color, size }) => <FontAwesome name="list-ul" color={color} size={size} />,
                    }}
                />
            </Tab.Navigator>
        </LinksContext.Provider>
    );
};

export default Dashboard;
