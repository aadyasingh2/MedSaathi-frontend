import React, { useEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { CALENDAR_MEDICINES, MARKED_DATES } from '../constants/mockData';
import { formatDateShort, getTodayString, loadAdherenceDates } from '../utils/helpers';
import TimelineItem from '../components/TimelineItem';

const CalendarScreen = () => {
    const todayStr = getTodayString();
    const [selectedDate, setSelectedDate] = useState(todayStr);
    const [markedDates, setMarkedDates] = useState(MARKED_DATES);

    useEffect(() => {
        const refresh = async () => {
            const adherence = await loadAdherenceDates();
            setMarkedDates({ ...MARKED_DATES, ...adherence });
        };
        refresh();
    }, []);

    const calendarDays = useMemo(
        () => Object.keys(markedDates).sort(),
        [markedDates]
    );

    const displayDate = new Date(selectedDate + 'T00:00:00');

    return (
        <View style={styles.screen}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Calendar</Text>
                    <TouchableOpacity style={styles.micButton}>
                        <Ionicons name="mic-outline" size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                {/* Day strip */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.dayStrip}
                >
                    {calendarDays.map((dateString) => {
                        const date = new Date(dateString + 'T00:00:00');
                        const isSelected = dateString === selectedDate;
                        const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });
                        const dayNumber = String(date.getDate()).padStart(2, '0');
                        const hasDot = markedDates[dateString]?.marked;

                        return (
                            <TouchableOpacity
                                key={dateString}
                                style={[
                                    styles.dayCard,
                                    isSelected && styles.dayCardActive,
                                ]}
                                onPress={() => setSelectedDate(dateString)}
                            >
                                <Text style={[
                                    styles.dayLabel,
                                    isSelected && styles.dayLabelActive,
                                ]}
                                >
                                    {dayLabel}
                                </Text>
                                <Text style={[
                                    styles.dayNumber,
                                    isSelected && styles.dayNumberActive,
                                ]}
                                >
                                    {dayNumber}
                                </Text>
                                <View style={[
                                    styles.dot,
                                    hasDot && styles.dotActive,
                                ]}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                <Text style={styles.dateLabel}>{formatDateShort(displayDate)}</Text>

                <View style={styles.timeline}>
                    {CALENDAR_MEDICINES.map((item) => (
                        <TimelineItem key={item.id} item={item} />
                    ))}
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.xxxl + 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    headerTitle: {
        fontSize: FONTS.sizes.title,
        fontWeight: '800',
        color: COLORS.primary,
    },
    micButton: {
        padding: SPACING.xs,
    },
    dayStrip: {
        paddingBottom: SPACING.lg,
        marginBottom: SPACING.lg,
    },
    dayCard: {
        width: 88,
        height: 96,
        marginRight: SPACING.sm,
        borderRadius: BORDER_RADIUS.lg,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.sm,
    },
    dayCardActive: {
        backgroundColor: COLORS.primary,
    },
    dayLabel: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMuted,
        marginBottom: SPACING.xs,
        fontWeight: '700',
    },
    dayLabelActive: {
        color: COLORS.white,
    },
    dayNumber: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '800',
        color: COLORS.textDark,
    },
    dayNumberActive: {
        color: COLORS.white,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.border,
        marginTop: SPACING.sm,
    },
    dotActive: {
        backgroundColor: COLORS.primary,
    },
    dateLabel: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '700',
        color: COLORS.textDark,
        marginBottom: SPACING.xl,
    },
    timeline: {
        paddingLeft: SPACING.xs,
    },
});

export default CalendarScreen;
