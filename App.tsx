import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import Navigation from './src/navigation';
import { useSupabase } from './src/hooks/useSupabase';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { ErrorBoundary } from './src/components/ErrorBoundary';

const AppRoot = Platform.OS === 'web' ? View : GestureHandlerRootView;

export default function App() {
  const { isLoading } = useSupabase();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>
          Chargement de NoBroke...
        </Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <AppRoot style={styles.root}>
          <StatusBar style="auto" />
          <Navigation />
        </AppRoot>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
});
