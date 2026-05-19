import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

const STATUS_CONFIG = {
    taken: { label: '✓ Taken', color: COLORS.taken, bg: COLORS.takenBg },
    dueSoon: { label: 'Due soon', color: COLORS.dueSoon, bg: COLORS.dueSoonBg },
    missed: { label: 'Missed', color: COLORS.missed, bg: COLORS.missedBg },
    done: { label: '✓ Done', color: COLORS.done, bg: COLORS.doneBg },
    upcoming: { label: 'Upcoming', color: COLORS.upcoming, bg: COLORS.upcomingBg },
};

const StatusBadge = ({ status }) => {
    const config = STATUS_CONFIG[status];
    if (!config) return null;

    return (
        <View style={[styles.badge, { backgroundColor: config.bg }]}>
            <Text style={[styles.badgeText, { color: config.color }]}>
                {config.label}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs + 2,
        borderRadius: BORDER_RADIUS.round,
        alignSelf: 'flex-start',
    },
    badgeText: {
        fontSize: FONTS.sizes.xs,
        fontWeight: '600',
    },
});

export default StatusBadge;
