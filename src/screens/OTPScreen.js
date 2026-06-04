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

const OTPScreen = ({ route, navigation }) => {
    const { profile } = route.params || {};
    const [otp, setOtp] = useState('');
    const otpInput = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => otpInput.current?.focus(), 300);
        return () => clearTimeout(timeout);
    }, []);

    const handleVerify = async () => {
        const res = await fetch('http://10.255.177.152:3000/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: profile?.phone, otp }),
        });
        const data = await res.json();
        if (data.success) {
            navigation.navigate('CaregiverSetup', { profile });
        } else {
            Alert.alert('Wrong OTP', 'Use 123456 for now');
        }
    };

    const handleChange = (value) => {
        const sanitized = value.replace(/[^0-9]/g, '');
        setOtp(sanitized.slice(0, 6));
    };

    const digits = otp.padEnd(6, ' ').split('');
    const isDisabled = otp.length < 6;

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                <Text style={styles.icon}>📲</Text>
                <Text style={styles.title}>Check your phone</Text>
                <Text style={styles.subtitle}>
                    Enter the 6-digit code sent to {profile?.phone || '+91 98765 43210'}
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

                <TouchableOpacity style={styles.resendButton}>
                    <Text style={styles.resendText}>Resend code</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.ctaButton, isDisabled && styles.ctaButtonDisabled]}
                    onPress={handleVerify}
                    disabled={isDisabled}
                >
                    <Text style={styles.ctaText}>Verify →</Text>
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
