import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { loadPlans } from '../utils/storage';

export default function PlanDetail({ navigation, route }) {
  const { planId } = route.params;
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const plans = await loadPlans();
        const selectedPlan = plans.find(p => p.id === planId);
        setPlan(selectedPlan);
      } catch (error) {
        console.error('Error loading plan:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [planId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString([], { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'work': return { backgroundColor: '#e57373' };
      case 'personal': return { backgroundColor: '#64b5f6' };
      case 'study': return { backgroundColor: '#ba68c8' };
      default: return { backgroundColor: '#90a4ae' };
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!plan) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Plan not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ backgroundColor: '#4527a0', padding: 20, paddingTop: 40 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Back</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', flex: 1, textAlign: 'center' }}>
            Plan Details
          </Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={{
          backgroundColor: 'white',
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 8 }}>
            {plan.title}
          </Text>
          <Text style={{ fontSize: 16, color: '#757575', marginBottom: 12 }}>
            {formatDate(plan.date)}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, ...getCategoryColor(plan.category) }}>
              <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>{plan.category}</Text>
            </View>
            <View style={{ marginLeft: 12, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: plan.completed ? '#4caf50' : '#e0e0e0' }}>
              <Text style={{ color: plan.completed ? 'white' : '#333', fontSize: 14, fontWeight: '500' }}>
                {plan.completed ? 'Completed' : 'Not Completed'}
              </Text>
            </View>
          </View>
          {plan.note ? (
            <View>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8 }}>
                Notes
              </Text>
              <Text style={{ fontSize: 16, color: '#333', lineHeight: 24 }}>
                {plan.note}
              </Text>
            </View>
          ) : (
            <Text style={{ fontSize: 16, color: '#757575', fontStyle: 'italic' }}>
              No notes available
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#4527a0',
            borderRadius: 8,
            padding: 16,
            alignItems: 'center',
            marginBottom: 16,
          }}
          onPress={() => navigation.navigate('EditPlan', { planId: plan.id })}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            Edit Plan
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}