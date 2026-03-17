import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary pour capturer les erreurs et les afficher (utile pour debug web)
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Text style={styles.title}>Erreur</Text>
          <Text style={styles.message}>{this.state.error.message}</Text>
          {Platform.OS === 'web' && this.state.error.stack && (
            <Text style={styles.stack} selectable>
              {this.state.error.stack}
            </Text>
          )}
        </ScrollView>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e1e1e' },
  content: { padding: 24, paddingTop: 48 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ef4444', marginBottom: 16 },
  message: { fontSize: 16, color: '#fff', marginBottom: 16 },
  stack: { fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' },
});
