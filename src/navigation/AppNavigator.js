import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../constants/theme';

// Main screens
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import CalendarScreen from '../screens/CalendarScreen';
import MedicinesScreen from '../screens/MedicinesScreen';
import FamilyScreen from '../screens/FamilyScreen';

// Onboarding
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import OTPScreen from '../screens/OTPScreen';
import CaregiverSetupScreen from '../screens/CaregiverSetupScreen';
import AllSetScreen from '../screens/AllSetScreen';

// Daily flows
import QuestionScreen from '../screens/QuestionScreen';
import ConfirmMedicineScreen from '../screens/ConfirmMedicineScreen';
import DailyProofScreen from '../screens/DailyProofScreen';
import ProofCameraScreen from '../screens/ProofCameraScreen';
import VerifiedScreen from '../screens/VerifiedScreen';

// Alerts & Refills
import MissedDoseAlertScreen from '../screens/MissedDoseAlertScreen';
import RefillReminderScreen from '../screens/RefillReminderScreen';

// Settings
import SettingsScreen from '../screens/SettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import EditCaregiverScreen from '../screens/EditCaregiverScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeMain" component={HomeScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="Question" component={QuestionScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="ConfirmMedicine" component={ConfirmMedicineScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="DailyProof" component={DailyProofScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="ProofCamera" component={ProofCameraScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="Verified" component={VerifiedScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="MissedAlert" component={MissedDoseAlertScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="RefillReminder" component={RefillReminderScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="EditCaregiver" component={EditCaregiverScreen} options={{ animation: 'slide_from_right' }} />
    </Stack.Navigator>
);

const TAB_ICONS = {
    Home: { focused: 'home', unfocused: 'home-outline' },
    Calendar: { focused: 'calendar', unfocused: 'calendar-outline' },
    Medicines: { focused: 'bandage', unfocused: 'bandage-outline' },
    Family: { focused: 'people', unfocused: 'people-outline' },
    SettingsTab: { focused: 'settings', unfocused: 'settings-outline' },
};

const SettingsStack = ({ setIsOnboarded }) => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
            name="SettingsMain"
            children={(props) => (
                <SettingsScreen {...props} setIsOnboarded={setIsOnboarded} />
            )}
        />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="EditCaregiver" component={EditCaregiverScreen} options={{ animation: 'slide_from_right' }} />
    </Stack.Navigator>
);

const MainApp = ({ setIsOnboarded }) => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color }) => {
                const tabName = route.name === 'SettingsTab' ? 'SettingsTab' : route.name;
                const icons = TAB_ICONS[tabName];
                return <Ionicons name={focused ? icons.focused : icons.unfocused} size={22} color={color} />;
            },
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.textMuted,
            tabBarStyle: {
                backgroundColor: COLORS.white,
                borderTopWidth: 0,
                elevation: 10,
                shadowColor: COLORS.shadow,
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                height: 70,
                paddingBottom: 10,
                paddingTop: 8,
            },
            tabBarLabelStyle: {
                fontSize: FONTS.sizes.xs,
                fontWeight: '600',
                marginTop: 2,
            },
        })}
    >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Medicines" component={MedicinesScreen} />
        <Tab.Screen name="Family" component={FamilyScreen} />
        <Tab.Screen
            name="SettingsTab"
            options={{ tabBarLabel: 'Settings' }}
        >
            {() => <SettingsStack setIsOnboarded={setIsOnboarded} />}
        </Tab.Screen>
    </Tab.Navigator>
);

const OnboardingStack = ({ setIsOnboarded }) => (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="CaregiverSetup" component={CaregiverSetupScreen} />
        <Stack.Screen
            name="AllSet"
            children={(props) => (
                <AllSetScreen {...props} setIsOnboarded={setIsOnboarded} />
            )}
        />
    </Stack.Navigator>
);

const AppNavigator = () => {
    const [isOnboarded, setIsOnboarded] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkOnboarding();
    }, []);

    const checkOnboarding = async () => {
        try {
            const user = await AsyncStorage.getItem('user_profile');
            if (user) setIsOnboarded(true);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {isOnboarded ? (
                <MainApp setIsOnboarded={setIsOnboarded} />
            ) : (
                <OnboardingStack setIsOnboarded={setIsOnboarded} />
            )}
        </NavigationContainer>
    );
};

export default AppNavigator;