import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

const EditCaregiverScreen = ({ route, navigation }) => {
    const [caregiverName, setCaregiverName] = useState('');
    const [caregiverPhone, setCaregiverPhone] = useState('+91 ');
    const [isDisabled, setIsDisabled] = useState(true);

    React.useEffect(() => {
        setIsDisabled(!caregiverName.trim() || !caregiverPhone.trim() || caregiverPhone.length < 10);
    }, [caregiverName, caregiverPhone]);

    const handleUpdate = async () => {
        const caregiver = {
            name: caregiverName.trim(),
            phone: caregiverPhone.trim(),
            updatedAt: new Date().toISOString(),
        };

        const profile = await AsyncStorage.getItem('user_profile');
        const updatedProfile = {
            ...JSON.parse(profile),
            caregiver,
        };

        await AsyncStorage.setItem('user_profile', JSON.stringify(updatedProfile));
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
                <Text style={styles.title}>Edit Caregiver</Text>

                <View style={styles.form}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Caregiver Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter caregiver's name"
                            placeholderTextColor={COLORS.textMuted}
                            value={caregiverName}
                            onChangeText={setCaregiverName}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Caregiver Phone</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="+91 98765 43210"
                            placeholderTextColor={COLORS.textMuted}
                            keyboardType="phone-pad"
                            value={caregiverPhone}
                            onChangeText={setCaregiverPhone}
                            maxLength={15}
                        />
                    </View>

                    <View style={styles.infoCard}>
                        <Text style={styles.infoIcon}>📲</Text>
                        <Text style={styles.infoText}>
                            They'll receive SMS alerts if you miss a dose. You can update this anytime.
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.updateButton, isDisabled && styles.updateButtonDisabled]}
                    onPress={handleUpdate}
                    disabled={isDisabled}
                >
                    <Text style={styles.updateButtonText}>Update Caregiver</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        padding: SPACING.xl,
        paddingTop: SPACING.xxxl,
    },
    title: {
        fontSize: FONTS.sizes.xl,
        fontWeight: '800',
        color: COLORS.textDark,
        marginBottom: SPACING.xxl,
    },
    form: {
        marginBottom: SPACING.xl,
    },
    field: {
        marginBottom: SPACING.xl,
    },
    label: {
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
        color: COLORS.textDark,
        marginBottom: SPACING.sm,
    },
    input: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.lg,
        fontSize: FONTS.sizes.md,
        color: COLORS.textDark,
    },
    infoCard: {
        backgroundColor: COLORS.primaryLight,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: SPACING.lg,
    },
    infoIcon: {
        fontSize: 18,
        marginRight: SPACING.md,
    },
    infoText: {
        flex: 1,
        fontSize: FONTS.sizes.sm,
        color: COLORS.textDark,
        lineHeight: 20,
    },
    updateButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.lg,
        borderRadius: BORDER_RADIUS.xl,
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    updateButtonDisabled: {
        backgroundColor: '#9BC9B3',
    },
    updateButtonText: {
        color: COLORS.white,
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
    },
    cancelButton: {
        paddingVertical: SPACING.lg,
        alignItems: 'center',
    },
    cancelText: {
        color: COLORS.textMuted,
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
    },
});

export default EditCaregiverScreen;
