import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

const CaregiverSetupScreen = ({ route, navigation }) => {
    const { profile } = route.params || {};
    const [caregiverName, setCaregiverName] = useState('Priya (daughter)');
    const [caregiverPhone, setCaregiverPhone] = useState('99887 76655');

    const handleContinue = () => {
        navigation.navigate('AllSet', {
            profile: {
                ...profile,
                caregiverName: caregiverName.trim(),
                caregiverPhone: caregiverPhone.trim(),
            },
        });
    };

    const handleSkip = () => {
        navigation.navigate('AllSet', {
            profile: {
                ...profile,
                caregiverName: '',
                caregiverPhone: '',
            },
        });
    };

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Family contact</Text>
                <Text style={styles.subtitle}>
                    If you miss a medicine, we'll alert this person automatically
                </Text>
                <Text style={styles.note}>🔔 They'll get a message if you don't take your medicine within 30 minutes</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Caregiver name</Text>
                    <TextInput
                        style={styles.input}
                        value={caregiverName}
                        onChangeText={setCaregiverName}
                        placeholder="Priya (daughter)"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Caregiver phone</Text>
                    <View style={styles.phoneRow}>
                        <View style={styles.countryCode}>
                            <Text style={styles.countryText}>🇮🇳 +91</Text>
                        </View>
                        <TextInput
                            style={styles.phoneInput}
                            value={caregiverPhone}
                            onChangeText={setCaregiverPhone}
                            keyboardType="phone-pad"
                            maxLength={13}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.ctaButton} onPress={handleContinue}>
                    <Text style={styles.ctaText}>Continue →</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                    <Text style={styles.skipText}>Skip for now</Text>
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
        marginBottom: SPACING.sm,
    },
    note: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.primaryDark,
        marginBottom: SPACING.xl,
        lineHeight: 20,
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
    ctaButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.lg,
        borderRadius: BORDER_RADIUS.xl,
        alignItems: 'center',
        marginTop: SPACING.lg,
    },
    ctaText: {
        color: COLORS.white,
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
    },
    skipButton: {
        marginTop: SPACING.md,
        alignItems: 'center',
    },
    skipText: {
        color: COLORS.textMuted,
        fontSize: FONTS.sizes.sm,
        fontWeight: '700',
    },
});

export default CaregiverSetupScreen;
