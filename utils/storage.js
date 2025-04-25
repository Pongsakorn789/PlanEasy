
import AsyncStorage from '@react-native-async-storage/async-storage';

export const savePlans = async (plans) => {
  try {
    await AsyncStorage.setItem('plans', JSON.stringify(plans));
  } catch (error) {
    console.error('Error saving plans:', error);
  }
};

export const loadPlans = async () => {
  try {
    const plans = await AsyncStorage.getItem('plans');
    return plans ? JSON.parse(plans) : [];
  } catch (error) {
    console.error('Error loading plans:', error);
    return [];
  }
}