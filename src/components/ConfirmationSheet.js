import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, SHADOWS, BORDER_RADIUS } from '../constants/theme';
import { SCANNED_MEDICINE } from '../constants/mockData';

const ConfirmationSheet = ({ onAddToSchedule, onScanAgain }) => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* AI confirmation message */}
            <View style={styles.messageRow}>
                <MaterialCommunityIcons name="auto-fix" size={20} color={COLORS.primary} />
                <Text style={styles.messageText}>
                    I found your medicine. Please confirm the details below.
                </Text>
            </View>

            {/* Medicine details card */}
            <View style={styles.detailsCard}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Medicine</Text>
                    <Text style={styles.detailValue}>{SCANNED_MEDICINE.name}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Dose</Text>
                    <Text style={styles.detailValue}>{SCANNED_MEDICINE.dose}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Times</Text>
                    <Text style={styles.detailValue}>{SCANNED_MEDICINE.times}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Duration</Text>
                    <Text style={styles.detailValue}>{SCANNED_MEDICINE.duration}</Text>
                </View>
            </View>

            {/* Voice confirmation */}
            <View style={styles.voiceCard}>
                <Ionicons name="volume-high-outline" size={22} color={COLORS.primary} />
                <Text style={styles.voiceText}>{SCANNED_MEDICINE.voiceMessage}</Text>
            </View>

            {/* Action buttons */}
            <TouchableOpacity style={styles.addButton} onPress={onAddToSchedule} activeOpacity={0.8}>
                <Ionicons name="checkmark" size={18} color={COLORS.white} />
                <Text style={styles.addButtonText}>Yes, add to my schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.scanAgainButton} onPress={onScanAgain} activeOpacity={0.8}>
                <Text style={styles.scanAgainText}>Scan again</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    content: {
        padding: SPACING.xl,
        paddingBottom: SPACING.xxxl,
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: SPACING.xl,
        backgroundColor: COLORS.primaryLight,
        padding: SPACING.lg,
        borderRadius: BORDER_RADIUS.md,
    },
    messageText: {
        flex: 1,
        fontSize: FONTS.sizes.md,
        color: COLORS.textDark,
        marginLeft: SPACING.md,
        lineHeight: 22,
    },
    detailsCard: {
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.lg,
        marginBottom: SPACING.xl,
        borderStyle: 'dashed',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SPACING.sm,
    },
    detailLabel: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textMuted,
    },
    detailValue: {
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
        color: COLORS.textDark,
    },
    voiceCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: COLORS.primaryLight,
        padding: SPACING.lg,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.xxl,
    },
    voiceText: {
        flex: 1,
        fontSize: FONTS.sizes.md,
        color: COLORS.textDark,
        marginLeft: SPACING.md,
        fontStyle: 'italic',
        lineHeight: 22,
    },
    addButton: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.lg,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.md,
        ...SHADOWS.card,
    },
    addButtonText: {
        color: COLORS.white,
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
        marginLeft: SPACING.sm,
    },
    scanAgainButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.lg,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
    },
    scanAgainText: {
        color: COLORS.primary,
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
    },
});

export default ConfirmationSheet;
