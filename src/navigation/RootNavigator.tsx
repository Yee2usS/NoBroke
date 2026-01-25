import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import TabNavigator from './TabNavigator';
import LoginScreen from '@/screens/LoginScreen';
import SignupScreen from '@/screens/SignupScreen';
import WelcomeScreen from '@/screens/Onboarding/WelcomeScreen';
import ProfileQuestionsScreen from '@/screens/Onboarding/ProfileQuestionsScreen';
import QuizScreen from '@/screens/Onboarding/QuizScreen';
import ResultScreen from '@/screens/Onboarding/ResultScreen';
import AvatarScreen from '@/screens/Onboarding/AvatarScreen';
import { useUserStore } from '@/store/useUserStore';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { user } = useUserStore();
  
  // Déterminer quel écran afficher
  const isAuthenticated = !!user;
  const hasCompletedOnboarding = user?.onboarding_completed || false;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#ffffff' },
      }}
    >
      {!isAuthenticated ? (
        // Stack d'authentification
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      ) : !hasCompletedOnboarding ? (
        // Stack d'onboarding
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="ProfileQuestions" component={ProfileQuestionsScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="Avatar" component={AvatarScreen} />
        </>
      ) : (
        // App principale
        <Stack.Screen name="MainTabs" component={TabNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
