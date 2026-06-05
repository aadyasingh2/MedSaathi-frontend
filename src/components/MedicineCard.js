import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SPACING, SHADOWS, BORDER_RADIUS } from '../constants/theme';
import StatusBadge from './StatusBadge';

const MedicineCard = ({ medicine, onTake }) => {
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                {/* Color dot */}
                <View style={[styles.dot, { backgroundColor: medicine.color }]} />

                {/* Medicine info */}
                <View style={styles.info}>
                    <Text style={styles.name}>
                        {medicine.name}
                    </Text>
                    <Text style={styles.dose}>{medicine.dose}</Text>
                    <Text style={styles.details}>
                        {medicine.time} —{'\n'}{medicine.meal}
                    </Text>
                </View>

                {/* Status badge */}
                <View style={styles.badgeContainer}>
                    <StatusBadge status={medicine.status} />
                    {onTake && (
                        <TouchableOpacity style={styles.takeButton} onPress={onTake}>
                            <Text style={styles.takeButtonText}>Take medicine</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        ...SHADOWS.card,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: SPACING.md,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '700',
        color: COLORS.textDark,
    },
    dose: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '700',
        color: COLORS.textDark,
    },
    details: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMuted,
        marginTop: SPACING.xs,
        lineHeight: 18,
    },
    badgeContainer: {
        marginLeft: SPACING.sm,
        alignItems: 'flex-end',
    },
    takeButton: {
        marginTop: SPACING.sm,
        backgroundColor: COLORS.primaryLight,
        borderRadius: BORDER_RADIUS.round,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
    },
    takeButtonText: {
        color: COLORS.primary,
        fontSize: FONTS.sizes.xs,
        fontWeight: '700',
    },
});

export default MedicineCard;
