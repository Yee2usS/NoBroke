import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSavings } from '@/hooks/useSavings';
import { useUserStore } from '@/store/useUserStore';

const SavingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useUserStore();
  const { actions, totalSaved, loading, addAction, removeAction, refresh } = useSavings();

  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [amountStr, setAmountStr] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      refresh();
    }, [refresh])
  );

  const handleAdd = async () => {
    const desc = description.trim();
    const amount = parseFloat(amountStr.replace(',', '.'));

    if (!desc) {
      Alert.alert('Oups', 'Décris ton action (ex: Résilié Netflix)');
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Oups', 'Entre un montant valide en €');
      return;
    }

    setSubmitting(true);
    try {
      await addAction({ description: desc, amount_euros: amount });
      setModalVisible(false);
      setDescription('');
      setAmountStr('');
    } catch (e) {
      const msg = (e as Error)?.message ?? (e as { message?: string })?.message ?? 'Impossible d\'ajouter';
      console.error('[SavingsScreen] handleAdd error:', e);
      Alert.alert('Erreur', msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: string, desc: string) => {
    Alert.alert(
      'Supprimer cette action ?',
      `"${desc}" sera retirée de tes économies.`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: () => removeAction(id) },
      ]
    );
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyCenter}>
          <Text style={styles.emptyText}>Connecte-toi pour suivre tes économies</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <LinearGradient
        colors={['#065f46', '#059669']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Espace Économies</Text>
          <Text style={styles.headerSub}>Tes actions concrètes</Text>
        </View>
      </LinearGradient>

      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#059669" />
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Carte principale : Tu as déjà économisé X € */}
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Tu as déjà économisé</Text>
            <Text style={styles.totalAmount}>
              {totalSaved.toLocaleString('fr-FR')} €
            </Text>
            <Text style={styles.totalSub}>
              {actions.length} action{actions.length !== 1 ? 's' : ''} concrète{actions.length !== 1 ? 's' : ''}
            </Text>
          </View>

          {/* Bouton ajouter */}
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#059669', '#047857']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.addBtnGradient}
            >
              <Ionicons name="add-circle" size={24} color="#fff" />
              <Text style={styles.addBtnText}>Ajouter une action</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Liste des actions */}
          <Text style={styles.sectionTitle}>Historique</Text>

          {actions.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>💰</Text>
              <Text style={styles.emptyTitle}>Aucune action encore</Text>
              <Text style={styles.emptyText}>
                Ajoute tes premières économies : abonnement résilié, budget optimisé, etc.
              </Text>
              <TouchableOpacity
                style={styles.emptyBtn}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.emptyBtnText}>Ajouter ma première action</Text>
              </TouchableOpacity>
            </View>
          ) : (
            actions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onLongPress={() => handleDelete(action.id, action.description)}
                activeOpacity={0.8}
              >
                <View style={styles.actionIcon}>
                  <Ionicons name="checkmark-circle" size={24} color="#059669" />
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionDesc}>{action.description}</Text>
                  <Text style={styles.actionDate}>{formatDate(action.created_at)}</Text>
                </View>
                <Text style={styles.actionAmount}>
                  +{action.amount_euros.toLocaleString('fr-FR')} €
                </Text>
              </TouchableOpacity>
            ))
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      )}

      {/* Modal ajout */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalOverlay}
        >
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Nouvelle économie</Text>

            <Text style={styles.inputLabel}>Qu'as-tu fait ?</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Résilié Netflix, réduit forfait mobile..."
              placeholderTextColor="#94a3b8"
              value={description}
              onChangeText={setDescription}
              autoCapitalize="sentences"
            />

            <Text style={styles.inputLabel}>Montant économisé (€)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 15"
              placeholderTextColor="#94a3b8"
              value={amountStr}
              onChangeText={setAmountStr}
              keyboardType="decimal-pad"
            />

            <TouchableOpacity
              style={[styles.submitBtn, submitting && styles.submitBtnDisabled]}
              onPress={handleAdd}
              disabled={submitting}
            >
              <LinearGradient
                colors={['#059669', '#047857']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitBtnGradient}
              >
                {submitting ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Ionicons name="checkmark" size={20} color="#fff" />
                    <Text style={styles.submitBtnText}>Ajouter</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelBtnText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#64748b' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: { padding: 4 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  headerSub: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2 },

  scroll: { flex: 1 },
  content: { padding: 20 },

  totalCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#d1fae5',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  totalLabel: {
    fontSize: 15,
    color: '#047857',
    fontWeight: '600',
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 48,
    fontWeight: '800',
    color: '#065f46',
    letterSpacing: -1,
  },
  totalSub: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 8,
  },

  addBtn: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  addBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  addBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: { fontSize: 56, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#374151', marginBottom: 8 },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  emptyBtn: {
    backgroundColor: '#059669',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
  },
  emptyBtnText: { fontSize: 15, fontWeight: '600', color: '#fff' },

  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 14,
  },
  actionIcon: {},
  actionContent: { flex: 1 },
  actionDesc: { fontSize: 15, fontWeight: '600', color: '#1e293b', lineHeight: 20 },
  actionDate: { fontSize: 12, color: '#94a3b8', marginTop: 4 },
  actionAmount: { fontSize: 16, fontWeight: '700', color: '#059669' },

  /* Modal */
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 12,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e2e8f0',
    alignSelf: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
  },
  submitBtn: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 8,
  },
  submitBtnDisabled: { opacity: 0.7 },
  submitBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  submitBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  cancelBtn: {
    alignItems: 'center',
    marginTop: 16,
  },
  cancelBtnText: { fontSize: 15, color: '#64748b', fontWeight: '500' },
});

export default SavingsScreen;
