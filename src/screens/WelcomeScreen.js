import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

const languages = [
    { code: 'EN', label: 'English', flag: '🇮🇳' },
    { code: 'HI', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'TA', label: 'தமிழ்', flag: '🇮🇳' },
    { code: 'BN', label: 'বাংলা', flag: '🇮🇳' },
    { code: 'TE', label: 'తెలుగు', flag: '🇮🇳' },
    { code: 'PA', label: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
];

const WelcomeScreen = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('EN');

    const handleNext = () => {
        navigation.navigate('ProfileSetup', { language: selectedLanguage });
    };

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome!</Text>
                    <Text style={styles.subtitle}>Choose your language</Text>
                    <Text style={styles.description}>अपनी भाषा चुनें</Text>
                </View>

                <View style={styles.languageGrid}>
                    {languages.map((item) => (
                        <TouchableOpacity
                            key={item.code}
                            style={[
                                styles.languageButton,
                                selectedLanguage === item.code && styles.languageButtonActive,
                            ]}
                            onPress={() => setSelectedLanguage(item.code)}
                        >
                            <Text style={styles.languageFlag}>{item.flag}</Text>
                            <Text
                                style={
                                    selectedLanguage === item.code
                                        ? styles.languageLabelActive
                                        : styles.languageLabel
                                }
                            >
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.ctaButton} onPress={handleNext}>
                    <Text style={styles.ctaText}>Get Started →</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        padding: SPACING.xl,
        paddingTop: SPACING.xxxl,
    },
    header: {
        alignItems: 'center',
        marginBottom: SPACING.xxxl,
    },
    title: {
        fontSize: FONTS.sizes.xxl,
        fontWeight: '800',
        color: COLORS.textDark,
        marginBottom: SPACING.sm,
    },
    subtitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '700',
        color: COLORS.primary,
    },
    description: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textMuted,
        marginTop: SPACING.sm,
    },
    languageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: SPACING.sm,
    },
    languageButton: {
        width: '48%',
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.md,
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    languageButtonActive: {
        backgroundColor: COLORS.primaryLight,
        borderColor: COLORS.primary,
    },
    languageFlag: {
        fontSize: 24,
        marginBottom: SPACING.xs,
    },
    languageLabel: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textDark,
        fontWeight: '700',
        textAlign: 'center',
    },
    languageLabelActive: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.primaryDark,
        fontWeight: '700',
        textAlign: 'center',
    },
    ctaButton: {
        marginTop: SPACING.xxl,
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.lg,
        borderRadius: BORDER_RADIUS.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ctaText: {
        color: COLORS.white,
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
    },
});

export default WelcomeScreen;
