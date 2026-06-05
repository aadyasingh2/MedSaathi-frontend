import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { getTranslation } from '../constants/translations';
import { API_BASE_URL } from '../config/api';

const ProfileSetupScreen = ({ route, navigation }) => {
    const { language = 'EN' } = route.params || {};
    const t = (key) => getTranslation(language, key);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isSendingOtp, setIsSendingOtp] = useState(false);

    const handleSendOTP = async () => {
        const cleanPhone = phone.trim();
        if (!name.trim() || !cleanPhone) return;

        setIsSendingOtp(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: cleanPhone }),
            });

            const data = await res.json();

            if (!res.ok) {
                const message = data?.error || data?.message || 'Could not send OTP right now.';
                Alert.alert('OTP error', message);
                return;
            }

            navigation.navigate('OTP', {
                profile: { language, name: name.trim(), phone: cleanPhone },
            });
        } catch (e) {
            Alert.alert('Connection error', 'Could not send OTP right now.');
        } finally {
            setIsSendingOtp(false);
        }
    };

    const isDisabled = !name.trim() || !phone.trim();

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                <Text style={styles.title}>{t('yourDetails')}</Text>
                <Text style={styles.subtitle}>{t('yourDetailsSubtitle')}</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>{t('yourName')}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ramesh Kumar"
                        value={name}
                        onChangeText={setName}
                        returnKeyType="next"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>{t('yourPhone')}</Text>
                    <View style={styles.phoneRow}>
                        <View style={styles.countryCode}>
                            <Text style={styles.countryText}>🇮🇳 +91</Text>
                        </View>
                        <TextInput
                            style={styles.phoneInput}
                            placeholder="98765 43210"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                            maxLength={13}
                        />
                    </View>
                </View>

                <View style={styles.noticeCard}>
                    <Text style={styles.noticeText}>
                        {t('otpNotice')}
                    </Text>
                </View>

                <TouchableOpacity
                    style={[styles.ctaButton, (isDisabled || isSendingOtp) && styles.ctaButtonDisabled]}
                    onPress={handleSendOTP}
                    disabled={isDisabled || isSendingOtp}
                >
                    <Text style={styles.ctaText}>{isSendingOtp ? 'Sending…' : t('sendOtp')}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: SPACING.xl,
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
        marginBottom: SPACING.xxl,
    },
    inputGroup: {
        marginBottom: SPACING.lg,
    },
    label: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMedium,
        marginBottom: SPACING.xs,
        fontWeight: '700',
    },
    input: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: SPACING.lg,
        fontSize: FONTS.sizes.md,
        color: COLORS.textDark,
    },
    phoneRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    countryCode: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.md,
    },
    countryText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textDark,
        fontWeight: '700',
    },
    phoneInput: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: SPACING.lg,
        fontSize: FONTS.sizes.md,
        color: COLORS.textDark,
    },
    noticeCard: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.primaryLight,
        marginBottom: SPACING.xl,
    },
    noticeText: {
        color: COLORS.textMedium,
        fontSize: FONTS.sizes.sm,
        lineHeight: 20,
    },
    ctaButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.lg,
        borderRadius: BORDER_RADIUS.xl,
        alignItems: 'center',
    },
    ctaButtonDisabled: {
        backgroundColor: '#9BC9B3',
    },
    ctaText: {
        color: COLORS.white,
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
    },
});

export default ProfileSetupScreen;
