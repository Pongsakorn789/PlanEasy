import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import { loadPlans, savePlans } from '../utils/storage';

export default function PlanList({ navigation }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Reload plans when the screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPlans();
    });
    return unsubscribe;
  }, [navigation]);

  // Fetch plans from storage
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const storedPlans = await loadPlans();
      const sortedPlans = storedPlans.sort((a, b) => new Date(a.date) - new Date(b.date));
      setPlans(sortedPlans);
    } catch (error) {
      console.error('Error loading plans:', error);
      Alert.alert('Error', 'Failed to load plans. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete a plan
  const deletePlan = async (id) => {
    Alert.alert(
      'Delete Plan',
      'Are you sure you want to delete this plan?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const updatedPlans = plans.filter((plan) => plan.id !== id);
              setPlans(updatedPlans);
              await savePlans(updatedPlans);
            } catch (error) {
              console.error('Error deleting plan:', error);
              Alert.alert('Error', 'Failed to delete plan. Please try again.');
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  // Toggle plan completion status
  const toggleCompletion = async (id) => {
    try {
      const updatedPlans = plans.map((plan) =>
        plan.id === id ? { ...plan, completed: !plan.completed } : plan,
      );
      setPlans(updatedPlans);
      await savePlans(updatedPlans);
    } catch (error) {
      console.error('Error toggling completion:', error);
      Alert.alert('Error', 'Failed to update plan status. Please try again.');
    }
  };

  // Get unique categories
  const getUniqueCategories = () => {
    const categories = plans.map((plan) => plan.category);
    return ['All', ...new Set(categories)];
  };

  // Group plans by date
  const groupPlansByDate = () => {
    const grouped = {};
    const filteredPlans = selectedCategory === 'All' ? plans : plans.filter((plan) => plan.category === selectedCategory);

    filteredPlans.forEach((plan) => {
      const date = new Date(plan.date);
      const dateKey = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(plan);
    });

    return Object.keys(grouped)
      .sort((a, b) => new Date(plans.find((p) => p.date.includes(a.split(' ')[1]))?.date) - new Date(plans.find((p) => p.date.includes(b.split(' ')[1]))?.date))
      .map((date) => ({
        title: date,
        data: grouped[date],
      }));
  };

  // Format date to show only time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get color for category
  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'work':
        return { backgroundColor: '#e57373' };
      case 'personal':
        return { backgroundColor: '#64b5f6' };
      case 'study':
        return { backgroundColor: '#ba68c8' };
      case 'health':
        return { backgroundColor: '#81c784' };
      case 'education':
        return { backgroundColor: '#ba68c8' };
      default:
        return { backgroundColor: '#90a4ae' };
    }
  };

  // Render category filter
  const renderCategoryFilter = () => {
    const categories = getUniqueCategories();

    return (
      <View style={{ backgroundColor: 'white', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                marginHorizontal: 6,
                borderRadius: 20,
                backgroundColor: selectedCategory === item ? (item === 'All' ? '#4527a0' : getCategoryColor(item).backgroundColor) : '#f0f0f0',
              }}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: selectedCategory === item ? 'white' : '#757575',
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  // Render each plan item
  const renderItem = ({ item }) => {
    const isPastDue = new Date(item.date) < new Date() && !item.completed;

    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          marginHorizontal: 12,
          marginVertical: 6,
          borderRadius: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        }}
        onPress={() => navigation.navigate('PlanDetail', { planId: item.id })}
      >
        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                flex: 1,
                textDecorationLine: item.completed ? 'line-through' : 'none',
                color: item.completed ? '#9e9e9e' : isPastDue ? '#d32f2f' : 'black',
              }}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            {isPastDue && (
              <View style={{ backgroundColor: '#ffebee', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, marginLeft: 8 }}>
                <Text style={{ color: '#d32f2f', fontSize: 12, fontWeight: '500' }}>Past Due</Text>
              </View>
            )}
          </View>

          <Text style={{ color: '#757575', fontSize: 14, marginBottom: 10 }}>{formatDate(item.date)}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  marginRight: 10,
                  borderRadius: 16,
                  backgroundColor: item.completed ? '#4caf50' : '#e0e0e0',
                  borderWidth: 1,
                  borderColor: item.completed ? '#388e3c' : '#bdbdbd',
                }}
                onPress={() => toggleCompletion(item.id)}
              >
                <Text
                  style={{
                    color: item.completed ? 'white' : '#333',
                    fontWeight: '600',
                    fontSize: 14,
                    marginRight: 6,
                  }}
                >
                  {item.completed ? 'Completed' : 'Mark as Done'}
                </Text>
                {item.completed && <Text style={{ color: 'white', fontSize: 14 }}>✓</Text>}
              </TouchableOpacity>
              <View style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 16, ...getCategoryColor(item.category) }}>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>{item.category}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={{ paddingHorizontal: 10, paddingVertical: 6, marginRight: 10 }}
                onPress={() => navigation.navigate('EditPlan', { planId: item.id })}
              >
                <Text style={{ color: '#4527a0', fontWeight: '600', fontSize: 14 }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ paddingHorizontal: 10, paddingVertical: 6 }} onPress={() => deletePlan(item.id)}>
                <Text style={{ color: '#f44336', fontWeight: '600', fontSize: 14 }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Render section header for date
  const renderSectionHeader = ({ section: { title } }) => (
    <View
      style={{
        backgroundColor: '#f5f5f5',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#4527a0',
        }}
      >
        {title}
      </Text>
    </View>
  );

  // Render empty list message
  const renderEmptyList = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, marginTop: 50 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#757575', marginBottom: 10 }}>No Plans Found</Text>
      <Text style={{ fontSize: 14, color: '#9e9e9e', textAlign: 'center' }}>
        {selectedCategory !== 'All' ? `No plans in "${selectedCategory}". Try another category or add a new plan.` : `No plans available. Tap "Add New" to create a plan.`}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <StatusBar backgroundColor="#4527a0" barStyle="light-content" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#4527a0',
          padding: 20,
          paddingTop: 40,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>All Plans</Text>
        <TouchableOpacity
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 }}
          onPress={() => navigation.navigate('AddPlan')}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>+ Add New</Text>
        </TouchableOpacity>
      </View>

      {renderCategoryFilter()}

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#4527a0" />
        </View>
      ) : (
        <SectionList
          sections={groupPlansByDate()}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 10, paddingBottom: 20, flexGrow: 1 }}
          ListEmptyComponent={renderEmptyList}
          stickySectionHeadersEnabled={true}
        />
      )}
    </SafeAreaView>
  );
}