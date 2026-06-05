import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { getTranslation } from '../constants/translations';
import { API_BASE_URL } from '../config/api';

const AllSetScreen = ({ route, navigation, setIsOnboarded }) => {
    const { profile } = route.params || {};
    const language = profile?.language || 'EN';
    const t = (key) => getTranslation(language, key);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!profile) {
            navigation.replace('Splash');
        }
    }, [profile, navigation]);


    const handleFinish = async () => {
        setSaving(true);
        try {
            // Save to MongoDB
            await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: profile?.name,
                    phone: profile?.phone,
                    language: profile?.language,
                    caregiverName: profile?.caregiverName,
                    caregiverPhone: profile?.caregiverPhone,
                }),
            });
            // Save to AsyncStorage
            await AsyncStorage.setItem('user_profile', JSON.stringify(profile));
            setIsOnboarded(true);
        } catch (error) {
            console.log('Failed to save profile', error);
        } finally {
            setSaving(false);
        }
    };
    return (
        <View style={styles.screen}>
            <View style={styles.card}>
                <View style={styles.iconCircle}>
                    <Text style={styles.icon}>✓</Text>
                </View>
                <Text style={styles.title}>{t('allSet')}</Text>
                <Text style={styles.subtitle}>
                    {t('allSetSubtitle').replace('{name}', profile?.name || 'Friend')}
                </Text>
                <View style={styles.voiceCard}>
                    <Text style={styles.voiceIcon}>🔊</Text>
                    <View style={styles.voiceTextContainer}>
                        <Text style={styles.voiceTitle}>{t('voiceReady')}</Text>
                        <Text style={styles.voiceSubtitle}>
                            "Time for your Metformin at 9 PM"
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.ctaButton}
                    onPress={handleFinish}
                    disabled={saving}
                >
                    {saving ? (
                        <ActivityIndicator color={COLORS.white} />
                    ) : (
                        <Text style={styles.ctaText}>{t('scanFirstMedicine')}</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
    },
    card: {
        width: '100%',
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.xl,
        padding: SPACING.xl,
        alignItems: 'center',
        ...{
            shadowColor: COLORS.shadow,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
            elevation: 5,
        },
    },
    iconCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    icon: {
        fontSize: 36,
        color: COLORS.primary,
    },
    title: {
        fontSize: FONTS.sizes.xl,
        fontWeight: '800',
        color: COLORS.textDark,
        marginBottom: SPACING.sm,
    },
    subtitle: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textMuted,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: SPACING.xl,
    },
    voiceCard: {
        width: '100%',
        backgroundColor: COLORS.primaryLight,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    voiceIcon: {
        fontSize: 28,
        marginRight: SPACING.md,
    },
    voiceTextContainer: {
        flex: 1,
    },
    voiceTitle: {
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
        color: COLORS.textDark,
        marginBottom: SPACING.xs,
    },
    voiceSubtitle: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMuted,
        lineHeight: 20,
    },
    ctaButton: {
        width: '100%',
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.lg,
        borderRadius: BORDER_RADIUS.xl,
        alignItems: 'center',
    },
    ctaText: {
        color: COLORS.white,
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
    },
});

export default AllSetScreen;
