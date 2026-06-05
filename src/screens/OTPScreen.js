import React, { useState, useRef, useEffect } from 'react';
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

const OTPScreen = ({ route, navigation }) => {
    const { profile } = route.params || {};
    const language = profile?.language || 'EN';
    const t = (key) => getTranslation(language, key);
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const otpInput = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => otpInput.current?.focus(), 300);
        return () => clearTimeout(timeout);
    }, []);

    const handleVerify = async () => {
        if (!otp || otp.length < 6) return;

        setIsVerifying(true);
        setErrorMessage('');

        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: profile?.phone, otp }),
            });

            const data = await res.json();

            if (res.ok && data?.success) {
                navigation.navigate('CaregiverSetup', { profile });
                return;
            }

            const message = data?.error || data?.message || 'Please enter the correct 6-digit code.';
            setErrorMessage(message);
            Alert.alert('Invalid OTP', message);
        } catch (error) {
            const message = 'Could not verify OTP right now.';
            setErrorMessage(message);
            Alert.alert('Connection error', message);
        } finally {
            setIsVerifying(false);
        }
    };

    const handleChange = (value) => {
        const sanitized = value.replace(/[^0-9]/g, '');
        setOtp(sanitized.slice(0, 6));
        if (errorMessage) setErrorMessage('');
    };

    const digits = otp.padEnd(6, ' ').split('');
    const isDisabled = otp.length < 6 || isVerifying;

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                <Text style={styles.icon}>📲</Text>
                <Text style={styles.title}>{t('checkPhone')}</Text>
                <Text style={styles.subtitle}>
                    {t('otpSubtitle')} {profile?.phone || '+91 98765 43210'}
                </Text>

                <TextInput
                    ref={otpInput}
                    style={styles.hiddenInput}
                    keyboardType="number-pad"
                    value={otp}
                    onChangeText={handleChange}
                    maxLength={6}
                    autoFocus
                    blurOnSubmit={false}
                />

                <TouchableOpacity style={styles.codeRow} onPress={() => otpInput.current?.focus()} activeOpacity={0.9}>
                    {digits.map((digit, index) => (
                        <View key={index} style={styles.codeBox}>
                            <Text style={styles.codeText}>{digit !== ' ' ? digit : ''}</Text>
                        </View>
                    ))}
                </TouchableOpacity>

                {errorMessage ? (
                    <Text style={styles.errorText} accessibilityLiveRegion="polite">{errorMessage}</Text>
                ) : null}

                <TouchableOpacity style={styles.resendButton}>
                    <Text style={styles.resendText}>{t('resendCode')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.ctaButton, isDisabled && styles.ctaButtonDisabled]}
                    onPress={handleVerify}
                    disabled={isDisabled}
                >
                    <Text style={styles.ctaText}>{t('verify')}</Text>
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
        alignItems: 'center',
        padding: SPACING.xl,
    },
    icon: {
        fontSize: 36,
        marginBottom: SPACING.lg,
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
        marginBottom: SPACING.xxxl,
        lineHeight: 22,
    },
    hiddenInput: {
        position: 'absolute',
        opacity: 0,
        width: 1,
        height: 1,
    },
    codeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: SPACING.xl,
    },
    codeBox: {
        width: 48,
        height: 60,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    codeText: {
        fontSize: FONTS.sizes.xl,
        fontWeight: '700',
        color: COLORS.textDark,
    },
    errorText: {
        color: '#B42318',
        fontSize: FONTS.sizes.sm,
        textAlign: 'center',
        marginBottom: SPACING.md,
        fontWeight: '600',
    },
    resendButton: {
        marginBottom: SPACING.xxxl,
    },
    resendText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.primary,
        fontWeight: '700',
    },
    ctaButton: {
        width: '100%',
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

export default OTPScreen;
