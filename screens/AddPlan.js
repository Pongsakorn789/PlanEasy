import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { savePlans, loadPlans } from '../utils/storage';
import { scheduleNotification } from '../utils/notifications';
import * as Notifications from 'expo-notifications';

export default function AddPlan({ navigation }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [timeString, setTimeString] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
  const [category, setCategory] = useState('Study');
  const [note, setNote] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const formatDateForDisplay = (date) => {
    return date.toLocaleDateString([], {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setDate(selectedTime);
      setTimeString(selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleAddPlan = async () => {
    if (!title.trim()) {
      alert('Please enter a plan title');
      return;
    }

    const planDateTime = new Date(date);
    
    const newPlan = {
      id: Date.now().toString(),
      title,
      date: planDateTime.toISOString(),
      category,
      note,
      completed: false,
      createdAt: new Date().toISOString()
    };

    try {
      const plans = await loadPlans();
      const updatedPlans = [...plans, newPlan];
      await savePlans(updatedPlans);

      await scheduleNotification(title, planDateTime);
      
      alert('Plan added successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving plan:', error);
      alert('Failed to save plan. Please try again.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#4527a0',
              padding: 16,
              paddingTop: Platform.OS === 'android' ? 40 : 16,
            }}
          >
            <TouchableOpacity
              style={{ padding: 8 }}
              onPress={() => navigation.goBack()}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              New Plan
            </Text>
            <View style={{ width: 50 }} />
          </View>

          <View style={{ padding: 20 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 8,
                marginTop: 16,
                color: '#333',
              }}
            >
              Title
            </Text>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                borderWidth: 1,
                borderColor: '#e0e0e0',
              }}
              placeholder="What's your plan?"
              value={title}
              onChangeText={setTitle}
              maxLength={50}
            />
            
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 8,
                marginTop: 16,
                color: '#333',
              }}
            >
              Date
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                padding: 12,
                borderWidth: 1,
                borderColor: '#e0e0e0',
              }}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ fontSize: 16, color: '#333' }}>
                {formatDateForDisplay(date)}
              </Text>
            </TouchableOpacity>
            
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 8,
                marginTop: 16,
                color: '#333',
              }}
            >
              Time
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                padding: 12,
                borderWidth: 1,
                borderColor: '#e0e0e0',
              }}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={{ fontSize: 16, color: '#333' }}>{timeString}</Text>
            </TouchableOpacity>
            
            {showTimePicker && (
              <DateTimePicker
                value={date}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
            
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 8,
                marginTop: 16,
                color: '#333',
              }}
            >
              servants
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              {['Study', 'Work', 'Personal'].map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={{
                    flex: 1,
                    padding: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginHorizontal: 4,
                    backgroundColor:
                      category === cat
                        ? cat === 'Study'
                          ? '#ba68c8'
                          : cat === 'Work'
                          ? '#e57373'
                          : '#64b5f6'
                        : '#e0e0e0',
                  }}
                  onPress={() => handleCategorySelect(cat)}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: category === cat ? 'white' : '#333',
                    }}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 8,
                marginTop: 16,
                color: '#333',
              }}
            >
              Notes (Optional)
            </Text>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                borderWidth: 1,
                borderColor: '#e0e0e0',
                minHeight: 100,
                paddingTop: 12,
              }}
              placeholder="Add additional details..."
              value={note}
              onChangeText={setNote}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View
            style={{
              padding: 16,
              paddingBottom: Platform.OS === 'ios' ? 30 : 16,
              backgroundColor: 'white',
              borderTopWidth: 1,
              borderTopColor: '#e0e0e0',
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: '#4527a0',
                borderRadius: 8,
                padding: 16,
                alignItems: 'center',
              }}
              onPress={handleAddPlan}
            >
              <Text
                style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}
              >
                Save Plan
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}