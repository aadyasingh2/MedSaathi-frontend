import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Switch,
    ScrollView,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

const SettingsScreen = ({ navigation, setIsOnboarded }) => {
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [photoProofEnabled, setPhotoProofEnabled] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState('EN');

    const languages = [
        { code: 'EN', label: 'English' },
        { code: 'HI', label: 'हिंदी' },
        { code: 'TA', label: 'தமிழ்' },
        { code: 'BE', label: 'বাংলা' },
        { code: 'TE', label: 'తెలుగు' },
        { code: 'PA', label: 'ਪੰਜਾਬੀ' },
    ];

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', onPress: () => { } },
                {
                    text: 'Logout',
                    onPress: async () => {
                        await AsyncStorage.removeItem('user_profile');
                        setIsOnboarded(false);
                    },
                },
            ]
        );
    };

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
            <Text style={styles.screenTitle}>Settings</Text>

            {/* Profile Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Profile</Text>
                <SettingCard
                    title="Edit profile"
                    subtitle="Name and phone number"
                    icon="👤"
                    onPress={() => navigation.navigate('EditProfile')}
                />
            </View>

            {/* Language Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Language</Text>
                <View style={styles.languageGrid}>
                    {languages.map((lang) => (
                        <TouchableOpacity
                            key={lang.code}
                            style={[
                                styles.languageButton,
                                selectedLanguage === lang.code &&
                                styles.languageButtonActive,
                            ]}
                            onPress={() => setSelectedLanguage(lang.code)}
                        >
                            <Text
                                style={[
                                    styles.languageLabel,
                                    selectedLanguage === lang.code &&
                                    styles.languageLabelActive,
                                ]}
                            >
                                {lang.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Features Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Features</Text>
                <SettingToggle
                    title="Voice assistant"
                    subtitle="Read reminders aloud"
                    icon="🔊"
                    value={voiceEnabled}
                    onToggle={setVoiceEnabled}
                />
                <SettingToggle
                    title="Photo proof"
                    subtitle="Require photo for each dose"
                    icon="📷"
                    value={photoProofEnabled}
                    onToggle={setPhotoProofEnabled}
                />
            </View>

            {/* Caregiver Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Caregiver</Text>
                <SettingCard
                    title="Edit caregiver"
                    subtitle="Update contact details"
                    icon="👨‍👩‍👧"
                    onPress={() => navigation.navigate('EditCaregiver')}
                />
            </View>

            {/* About Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <SettingCard
                    title="App version"
                    subtitle="MedRemind v1.0.0"
                    icon="ℹ️"
                />
                <SettingCard
                    title="Privacy policy"
                    subtitle="Your data protection"
                    icon="🔒"
                />
                <SettingCard
                    title="Help & support"
                    subtitle="Contact us anytime"
                    icon="❓"
                />
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const SettingCard = ({ title, subtitle, icon, onPress }) => (
    <TouchableOpacity style={styles.settingCard} onPress={onPress}>
        <View style={styles.settingContent}>
            <Text style={styles.settingIcon}>{icon}</Text>
            <View style={styles.settingText}>
                <Text style={styles.settingTitle}>{title}</Text>
                <Text style={styles.settingSubtitle}>{subtitle}</Text>
            </View>
        </View>
        <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
);

const SettingToggle = ({ title, subtitle, icon, value, onToggle }) => (
    <View style={styles.settingCard}>
        <View style={styles.settingContent}>
            <Text style={styles.settingIcon}>{icon}</Text>
            <View style={styles.settingText}>
                <Text style={styles.settingTitle}>{title}</Text>
                <Text style={styles.settingSubtitle}>{subtitle}</Text>
            </View>
        </View>
        <Switch
            value={value}
            onValueChange={onToggle}
            trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
            thumbColor={value ? COLORS.primary : COLORS.white}
        />
    </View>
);

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        padding: SPACING.xl,
        paddingTop: SPACING.xxxl,
    },
    screenTitle: {
        fontSize: FONTS.sizes.xl,
        fontWeight: '800',
        color: COLORS.textDark,
        marginBottom: SPACING.xl,
    },
    section: {
        marginBottom: SPACING.xxl,
    },
    sectionTitle: {
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
        color: COLORS.textMuted,
        marginBottom: SPACING.md,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    settingCard: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SPACING.md,
    },
    settingContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingIcon: {
        fontSize: 24,
        marginRight: SPACING.lg,
    },
    settingText: {
        flex: 1,
    },
    settingTitle: {
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
        color: COLORS.textDark,
        marginBottom: SPACING.xs,
    },
    settingSubtitle: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMuted,
    },
    chevron: {
        fontSize: FONTS.sizes.lg,
        color: COLORS.textMuted,
        marginLeft: SPACING.md,
    },
    languageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.md,
    },
    languageButton: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        paddingVertical: SPACING.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    languageButtonActive: {
        backgroundColor: COLORS.primaryLight,
        borderColor: COLORS.primary,
    },
    languageLabel: {
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
        color: COLORS.textDark,
    },
    languageLabelActive: {
        color: COLORS.primary,
    },
    logoutButton: {
        backgroundColor: '#FDEDEC',
        borderWidth: 1,
        borderColor: COLORS.missed,
        paddingVertical: SPACING.lg,
        borderRadius: BORDER_RADIUS.xl,
        alignItems: 'center',
        marginTop: SPACING.xl,
        marginBottom: SPACING.xl,
    },
    logoutText: {
        color: COLORS.missed,
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
    },
});

export default SettingsScreen;
