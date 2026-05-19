import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, SHADOWS, BORDER_RADIUS } from '../constants/theme';
import StatusBadge from './StatusBadge';

const TimelineItem = ({ item }) => {
    return (
        <View style={styles.container}>
            {/* Time label */}
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{item.timeLabel}</Text>
            </View>

            {/* Vertical line connector */}
            <View style={styles.lineContainer}>
                <View style={styles.dot} />
                <View style={styles.line} />
            </View>

            {/* Medicine card */}
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.cardInfo}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.details}>
                            {item.dose} · {item.meal}
                        </Text>
                    </View>
                    <StatusBadge status={item.status} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: SPACING.lg,
        minHeight: 80,
    },
    timeContainer: {
        width: 50,
        paddingTop: SPACING.lg,
    },
    timeText: {
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
        color: COLORS.primary,
    },
    lineContainer: {
        alignItems: 'center',
        width: 20,
        paddingTop: SPACING.lg + 4,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
    },
    line: {
        width: 2,
        flex: 1,
        backgroundColor: COLORS.border,
        marginTop: SPACING.xs,
    },
    card: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginLeft: SPACING.md,
        ...SHADOWS.cardLight,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardInfo: {
        flex: 1,
    },
    name: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '700',
        color: COLORS.textDark,
    },
    details: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMuted,
        marginTop: SPACING.xs,
    },
});

export default TimelineItem;
