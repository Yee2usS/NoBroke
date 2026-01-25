import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from '@/types';
import HomeScreen from '@/screens/HomeScreen';
import LearnScreen from '@/screens/LearnScreen';
import BadgesScreen from '@/screens/BadgesScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator<TabParamList>();

// Icônes simples en attendant l'intégration de react-native-svg
const TabIcon: React.FC<{ name: string; focused: boolean }> = ({ name, focused }) => (
  <View className={`w-6 h-6 items-center justify-center rounded-full ${focused ? 'bg-primary-500' : 'bg-gray-300'}`}>
    <Text className="text-white text-xs font-bold">{name[0]}</Text>
  </View>
);

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ focused }) => <TabIcon name="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Learn"
        component={LearnScreen}
        options={{
          tabBarLabel: 'Apprendre',
          tabBarIcon: ({ focused }) => <TabIcon name="Learn" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Badges"
        component={BadgesScreen}
        options={{
          tabBarLabel: 'Badges',
          tabBarIcon: ({ focused }) => <TabIcon name="Badges" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ focused }) => <TabIcon name="Profile" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
