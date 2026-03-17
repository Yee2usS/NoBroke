/**
 * Point d'entrée web - styles forcés pour éviter page blanche (flex/height sur web)
 */
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Navigation from './src/navigation';
import { useSupabase } from './src/hooks/useSupabase';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { ErrorBoundary } from './src/components/ErrorBoundary';

// Fix scroll sur web : le template Expo a overflow:hidden, on injecte les styles nécessaires
function useWebScrollFix() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html, body { height: 100%; margin: 0; }
      body { overflow: auto !important; -webkit-overflow-scrolling: touch; }
      #root { min-height: 100% !important; overflow: visible !important; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
}

export default function AppWeb() {
  useWebScrollFix();
  const { isLoading } = useSupabase();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Chargement de NoBroke...</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <View style={styles.root}>
        <StatusBar style="auto" />
        <Navigation />
      </View>
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
  loadingText: { color: '#fff', fontSize: 18, fontWeight: '600', marginTop: 16 },
});
