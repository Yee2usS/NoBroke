import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import TabNavigator from './TabNavigator';
import LoginScreen from '@/screens/LoginScreen';
import SignupScreen from '@/screens/SignupScreen';
import WelcomeScreen from '@/screens/Onboarding/WelcomeScreen';
import ProfileQuestionsScreen from '@/screens/Onboarding/ProfileQuestionsScreen';
import QuizScreen from '@/screens/Onboarding/QuizScreen';
import QuickWinsScreen from '@/screens/Onboarding/QuickWinsScreen';
import ResultScreen from '@/screens/Onboarding/ResultScreen';
import AvatarScreen from '@/screens/Onboarding/AvatarScreen';
import DailyChoiceScreen from '@/screens/DailyChoiceScreen';
import ModulesListScreen from '@/screens/modules/ModulesListScreen';
import ModuleDetailScreen from '@/screens/modules/ModuleDetailScreen';
import ModuleQuizScreen from '@/screens/modules/ModuleQuizScreen';
import SubscriptionScreen from '@/screens/SubscriptionScreen';
import WalletScreen from '@/screens/WalletScreen';
import LeaderboardScreen from '@/screens/LeaderboardScreen';
import CommunityScreen from '@/screens/community/CommunityScreen';
import TopicScreen from '@/screens/community/TopicScreen';
import BadgesScreen from '@/screens/BadgesScreen';
import BattlesScreen from '@/screens/battles/BattlesScreen';
import FriendsScreen from '@/screens/battles/FriendsScreen';
import CreateBattleScreen from '@/screens/battles/CreateBattleScreen';
import BattleDetailScreen from '@/screens/battles/BattleDetailScreen';
import BattleQuizScreen from '@/screens/battles/BattleQuizScreen';
import BattleChoiceScreen from '@/screens/battles/BattleChoiceScreen';
import BattleResultScreen from '@/screens/battles/BattleResultScreen';
import UpcomingFeaturesScreen from '@/screens/UpcomingFeaturesScreen';
import SavingsScreen from '@/screens/SavingsScreen';
import { useUserStore } from '@/store/useUserStore';
import StreakWelcomeModal from '@/components/StreakWelcomeModal';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { user } = useUserStore();
  
  // Déterminer quel écran afficher
  const isAuthenticated = !!user;
  const hasCompletedOnboarding = user?.onboarding_completed || false;

  return (
    <>
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
          <Stack.Screen name="QuickWins" component={QuickWinsScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="Avatar" component={AvatarScreen} />
        </>
      ) : (
        // App principale
        <>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="DailyChoice" component={DailyChoiceScreen} />
          <Stack.Screen name="ModulesList" component={ModulesListScreen} />
          <Stack.Screen name="ModuleDetail" component={ModuleDetailScreen} />
          <Stack.Screen name="ModuleQuiz" component={ModuleQuizScreen} />
          <Stack.Screen name="Subscription" component={SubscriptionScreen} />
          <Stack.Screen name="Wallet" component={WalletScreen} />
          <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
          <Stack.Screen name="Community" component={CommunityScreen} />
          <Stack.Screen name="CommunityTopic" component={TopicScreen} />
          <Stack.Screen name="Badges" component={BadgesScreen} />
          <Stack.Screen name="Battles" component={BattlesScreen} />
          <Stack.Screen name="Friends" component={FriendsScreen} />
          <Stack.Screen name="CreateBattle" component={CreateBattleScreen} />
          <Stack.Screen name="BattleDetail" component={BattleDetailScreen} />
          <Stack.Screen name="BattleQuiz" component={BattleQuizScreen} />
          <Stack.Screen name="BattleChoice" component={BattleChoiceScreen} />
          <Stack.Screen name="BattleResult" component={BattleResultScreen} />
          <Stack.Screen name="UpcomingFeatures" component={UpcomingFeaturesScreen} />
          <Stack.Screen name="Savings" component={SavingsScreen} />
        </>
      )}
    </Stack.Navigator>
    {hasCompletedOnboarding && <StreakWelcomeModal />}
    </>
  );
};

export default RootNavigator;
