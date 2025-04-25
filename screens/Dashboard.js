import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { loadPlans } from '../utils/storage';

export default function Dashboard({ navigation }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch plans from storage
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const storedPlans = await loadPlans();
      setPlans(storedPlans);
    } catch (error) {
      console.error('Error loading plans:', error);
      alert('Failed to load plans. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();

    // Reload plans when the screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(fetchPlans, 200); // Increased delay to ensure savePlans completes
    });

    return unsubscribe;
  }, [navigation]);

  // Filter plans for today, excluding completed plans
  const todayPlans = plans.filter((plan) => {
    const planDate = new Date(plan.date);
    const today = new Date();
    return (
      planDate.getDate() === today.getDate() &&
      planDate.getMonth() === today.getMonth() &&
      planDate.getFullYear() === today.getFullYear() &&
      !plan.completed
    );
  });

  // Format date to show only time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Get color for category
  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'work':
        return { backgroundColor: '#e57373' };
      case 'personal':
        return { backgroundColor: '#64b5f6' };
      case 'health':
        return { backgroundColor: '#81c784' };
      case 'education':
        return { backgroundColor: '#ba68c8' };
      case 'study':
        return { backgroundColor: '#ba68c8' };
      default:
        return { backgroundColor: '#90a4ae' };
    }
  };

  // Render each plan item
  const renderPlanItem = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginVertical: 6,
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
      onPress={() => navigation.navigate('PlanDetail', { planId: item.id })}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', flex: 1 }}>{item.title}</Text>
        <View style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 16, ...getCategoryColor(item.category) }}>
          <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>{item.category}</Text>
        </View>
      </View>
      <Text style={{ color: '#757575', fontSize: 14 }}>{formatDate(item.date)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ backgroundColor: '#4527a0', padding: 20, paddingTop: 40 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>PlanEasy</Text>
        <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>Dashboard</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 15,
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: '#e0e0e0',
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '600', flex: 1 }}>Today's Plans</Text>
        <View
          style={{
            backgroundColor: '#4527a0',
            height: 28,
            width: 28,
            borderRadius: 14,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>{todayPlans.length}</Text>
        </View>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#4527a0" />
        </View>
      ) : todayPlans.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#757575', fontSize: 16 }}>No plans for today</Text>
        </View>
      ) : (
        <FlatList
          data={todayPlans}
          renderItem={renderPlanItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 10, paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
}