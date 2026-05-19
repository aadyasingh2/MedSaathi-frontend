import React, { useEffect, useState } from 'react';
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

const EditProfileScreen = ({ route, navigation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('+91 ');
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem('user_profile').then((user) => {
            if (user) {
                const parsed = JSON.parse(user);
                setName(parsed.name || '');
                setPhone(parsed.phone || '+91 ');
            }
        });
    }, []);

    React.useEffect(() => {
        setIsDisabled(!name.trim() || !phone.trim() || phone.length < 10);
    }, [name, phone]);

    const handleUpdate = async () => {
        const profile = {
            name: name.trim(),
            phone: phone.trim(),
            updatedAt: new Date().toISOString(),
        };

        await AsyncStorage.setItem('user_profile', JSON.stringify(profile));
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
                <Text style={styles.title}>Edit Profile</Text>

                <View style={styles.form}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your name"
                            placeholderTextColor={COLORS.textMuted}
                            value={name}
                            onChangeText={setName}
                            editable={true}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Phone Number</Text>
                        <View style={styles.phoneRow}>
                            <TextInput
                                style={[styles.input, styles.phoneInput]}
                                placeholder="+91 98765 43210"
                                placeholderTextColor={COLORS.textMuted}
                                keyboardType="phone-pad"
                                value={phone}
                                onChangeText={setPhone}
                                maxLength={15}
                            />
                        </View>
                    </View>

                    <View style={styles.infoCard}>
                        <Text style={styles.infoIcon}>ℹ️</Text>
                        <Text style={styles.infoText}>
                            This number will be used to verify your identity and receive OTP codes.
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.updateButton, isDisabled && styles.updateButtonDisabled]}
                    onPress={handleUpdate}
                    disabled={isDisabled}
                >
                    <Text style={styles.updateButtonText}>Update Profile</Text>
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
    phoneRow: {
        flexDirection: 'row',
    },
    phoneInput: {
        flex: 1,
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

export default EditProfileScreen;
