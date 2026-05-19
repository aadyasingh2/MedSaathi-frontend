import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const FamilyScreen = () => {
    return (
        <View style={styles.screen}>
            <View style={styles.content}>
                <Ionicons name="people-outline" size={64} color={COLORS.primary} />
                <Text style={styles.title}>Family</Text>
                <Text style={styles.subtitle}>
                    Manage medicine reminders for your family members here.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.xxxl,
    },
    title: {
        fontSize: FONTS.sizes.xl,
        fontWeight: '700',
        color: COLORS.textDark,
        marginTop: SPACING.xl,
    },
    subtitle: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textMuted,
        textAlign: 'center',
        marginTop: SPACING.sm,
        lineHeight: 22,
    },
});

export default FamilyScreen;
