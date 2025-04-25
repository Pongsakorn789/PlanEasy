import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Dashboard from './Dashboard';
import AddPlan from './AddPlan';
import PlanList from './PlanList';
import EditPlan from './EditPlan';
import Stats from './Stats';
import PlanDetail from './PlanDetail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigators (ไม่เปลี่ยนแปลง)
function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardHome" component={Dashboard} />
      <Stack.Screen name="PlanDetail" component={PlanDetail} />
      <Stack.Screen name="EditPlan" component={EditPlan} />
    </Stack.Navigator>
  );
}

function PlanListStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PlanListHome" component={PlanList} />
      <Stack.Screen name="PlanDetail" component={PlanDetail} />
      <Stack.Screen name="EditPlan" component={EditPlan} />
    </Stack.Navigator>
  );
}

function AddPlanStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddPlanHome" component={AddPlan} />
    </Stack.Navigator>
  );
}

function StatsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StatsHome" component={Stats} />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator ที่ปรับปรุงแล้ว
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#4527a0', // พื้นหลังสีม่วงเข้ม
          borderTopWidth: 0,
          paddingBottom: 8, // ลด padding ด้านล่างเล็กน้อย
          paddingTop: 8, // เพิ่ม padding ด้านบนเล็กน้อย
          height: 64, // ปรับความสูงให้สมดุล
          marginBottom: 20, // เพิ่มระยะห่างจากขอบล่างของหน้าจอ
          marginHorizontal: 10, // เพิ่มระยะห่างจากขอบซ้าย-ขวา
          borderRadius: 15, // เพิ่มความโค้งมนให้แถบ
          shadowColor: '#000', // เงาสีดำ
          shadowOffset: { width: 0, height: 4 }, // เงาด้านล่าง
          shadowOpacity: 0.2, // ความเข้มของเงา
          shadowRadius: 8, // ความฟุ้งของเงา
          elevation: 10, // เงาสำหรับ Android
          position: 'absolute', // ทำให้แถบลอยจากขอบล่าง
        },
        tabBarActiveTintColor: '#ffffff', // สีขาวสำหรับแท็บที่เลือก
        tabBarInactiveTintColor: 'rgba(255,255,255,0.5)', // สีขาวกึ่งโปร่งใส
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 4, // ปรับระยะห่างของป้ายชื่อ
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size + 4}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PlanList"
        component={PlanListStack}
        options={{
          tabBarLabel: 'Plans',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'list-circle' : 'list-circle-outline'}
              size={size + 4}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddPlan"
        component={AddPlanStack}
        options={{
          tabBarLabel: 'Add Plan',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'add-circle' : 'add-circle-outline'}
              size={size + 6}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsStack}
        options={{
          tabBarLabel: 'Stats',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'stats-chart' : 'stats-chart-outline'}
              size={size + 4}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Root Navigator
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}