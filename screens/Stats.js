import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { loadPlans } from '../utils/storage';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Stats({ navigation }) {
  const [stats, setStats] = useState({
    totalPlans: 0,
    completedPlans: 0,
    inProgressPlans: 0,
    categoryBreakdown: {},
  });
  const [loading, setLoading] = useState(true);
  const screenWidth = Dimensions.get('window').width - 40;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const plans = await loadPlans();
        
        // Calculate statistics
        const totalPlans = plans.length;
        const completedPlans = plans.filter(plan => plan.completed).length;
        const inProgressPlans = totalPlans - completedPlans;
        
        // Calculate category breakdown
        const categoryBreakdown = plans.reduce((acc, plan) => {
          const category = plan.category || 'Uncategorized';
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        setStats({
          totalPlans,
          completedPlans,
          inProgressPlans,
          categoryBreakdown,
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    // Refresh stats when screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      fetchStats();
    });

    return unsubscribe;
  }, [navigation]);

  const getCategoryColor = (category, index = 0) => {
    const colors = {
      work: '#e57373',
      personal: '#64b5f6',
      study: '#ba68c8',
      health: '#4db6ac',
      finance: '#ffb74d',
      travel: '#81c784',
      uncategorized: '#90a4ae'
    };
    
    if (category?.toLowerCase() in colors) {
      return colors[category.toLowerCase()];
    }
    
    // If not in predefined colors, use index to pick from color array
    const colorArray = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
    return colorArray[index % colorArray.length];
  };

  // Prepare data for pie chart
  const pieChartData = Object.entries(stats.categoryBreakdown).map(([category, count], index) => {
    return {
      name: category,
      count,
      color: getCategoryColor(category, index),
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    };
  });

  // Prepare data for completion status chart
  const completionData = {
    labels: ['Completed', 'In Progress'],
    datasets: [
      {
        data: [stats.completedPlans, stats.inProgressPlans],
      },
    ],
  };

  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(69, 39, 160, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4527a0" />
        <Text style={styles.loadingText}>Loading statistics...</Text>
      </SafeAreaView>
    );
  }

  const completionPercentage = stats.totalPlans > 0 
    ? Math.round((stats.completedPlans / stats.totalPlans) * 100)
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Statistics</Text>
        <Text style={styles.headerSubtitle}>
          Track your progress and achievements
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={[styles.summaryCard, styles.purpleGradient]}>
            <Text style={styles.cardLabel}>Total Plans</Text>
            <Text style={styles.cardValue}>{stats.totalPlans}</Text>
          </View>
          
          <View style={[styles.summaryCard, styles.greenGradient]}>
            <Text style={styles.cardLabel}>Completed</Text>
            <Text style={styles.cardValue}>{stats.completedPlans}</Text>
          </View>

          <View style={[styles.summaryCard, styles.orangeGradient]}>
            <Text style={styles.cardLabel}>In Progress</Text>
            <Text style={styles.cardValue}>{stats.inProgressPlans}</Text>
          </View>
        </View>

        {/* Completion Progress */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Completion Progress</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${completionPercentage}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {completionPercentage}% Complete
            </Text>
          </View>
        </View>

        {/* Plans by Status Chart */}
        {stats.totalPlans > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Plans by Status</Text>
            <BarChart
              data={completionData}
              width={screenWidth}
              height={220}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
                barPercentage: 0.7,
              }}
              style={styles.chart}
              fromZero
              showValuesOnTopOfBars
            />
          </View>
        )}

        {/* Plans by Category */}
        {Object.keys(stats.categoryBreakdown).length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Plans by Category</Text>
            
            {/* Pie Chart */}
            <PieChart
              data={pieChartData}
              width={screenWidth}
              height={200}
              chartConfig={chartConfig}
              accessor="count"
              backgroundColor="transparent"
              paddingLeft="15"
              center={[10, 0]}
              absolute
            />
            
            {/* Category List */}
            <View style={styles.categoryList}>
              {Object.entries(stats.categoryBreakdown).map(([category, count], index) => (
                <View
                  key={category}
                  style={styles.categoryItem}
                >
                  <View
                    style={[
                      styles.categoryDot,
                      { backgroundColor: getCategoryColor(category, index) },
                    ]}
                  />
                  <Text style={styles.categoryName}>{category}</Text>
                  <Text style={styles.categoryCount}>{count}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {stats.totalPlans === 0 && (
          <View style={styles.emptyStateCard}>
            <Text style={styles.emptyStateText}>
              No plans yet. Add some plans to see your statistics!
            </Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => navigation.navigate('AddPlan')}
            >
              <Text style={styles.addButtonText}>Add Your First Plan</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
    fontSize: 16,
  },
  header: {
    backgroundColor: '#4527a0',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  headerTitle: { 
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80, // Extra padding for bottom tabs
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryCard: {
    width: '30%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  purpleGradient: {
    backgroundColor: '#6200ea',
  },
  greenGradient: {
    backgroundColor: '#00c853',
  },
  orangeGradient: {
    backgroundColor: '#ff6d00',
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: { 
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBarContainer: {
    height: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 8,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4caf50',
    marginTop: 8,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  categoryList: {
    marginTop: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    paddingVertical: 4,
  },
  categoryDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 14,
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoryCount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  emptyStateCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 25,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#4527a0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});