import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabParamList } from '@/types';
import HomeScreen from '@/screens/HomeScreen';
import ModulesListScreen from '@/screens/modules/ModulesListScreen';
import SimulatorsScreen from '@/screens/SimulatorsScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import MoreScreen from '@/screens/MoreScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICONS: Record<string, 'home' | 'book' | 'calculator' | 'person' | 'ellipsis-horizontal'> = {
  Home: 'home',
  Modules: 'book',
  Simulators: 'calculator',
  Profile: 'person',
  More: 'ellipsis-horizontal',
};

const TabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  const tabBarPaddingBottom = Math.max(8, insets.bottom);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          paddingTop: 8,
          paddingBottom: tabBarPaddingBottom,
          height: 60 + tabBarPaddingBottom - 8,
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
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={TAB_ICONS.Home} size={size || 24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Modules"
        component={ModulesListScreen}
        options={{
          tabBarLabel: 'Cours',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={TAB_ICONS.Modules} size={size || 24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Simulators"
        component={SimulatorsScreen}
        options={{
          tabBarLabel: 'Simulateurs',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={TAB_ICONS.Simulators} size={size || 24} color={color} />
          ),
        }}
      />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
            tabBarLabel: 'Profil',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={TAB_ICONS.Profile} size={size || 24} color={color} />
            ),
            }}
          />
          <Tab.Screen
            name="More"
            component={MoreScreen}
            options={{
              tabBarLabel: 'Plus',
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons name={TAB_ICONS.More} size={size || 24} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      );
    };

export default TabNavigator;
