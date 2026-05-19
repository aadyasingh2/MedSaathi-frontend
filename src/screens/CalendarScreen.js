import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { CALENDAR_MEDICINES, MARKED_DATES } from '../constants/mockData';
import { formatDateShort, getTodayString } from '../utils/helpers';
import TimelineItem from '../components/TimelineItem';

const CalendarScreen = () => {
    const todayStr = getTodayString();
    const [selectedDate, setSelectedDate] = useState(todayStr);

    // Merge marked dates with selected date
    const mergedMarkedDates = {
        ...MARKED_DATES,
        [selectedDate]: {
            ...(MARKED_DATES[selectedDate] || {}),
            selected: true,
            selectedColor: COLORS.primary,
        },
    };

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

                {/* Calendar */}
                <View style={styles.calendarContainer}>
                    <Calendar
                        current={todayStr}
                        onDayPress={(day) => setSelectedDate(day.dateString)}
                        markedDates={mergedMarkedDates}
                        theme={{
                            backgroundColor: COLORS.white,
                            calendarBackground: COLORS.white,
                            textSectionTitleColor: COLORS.textMuted,
                            selectedDayBackgroundColor: COLORS.primary,
                            selectedDayTextColor: COLORS.white,
                            todayTextColor: COLORS.primary,
                            dayTextColor: COLORS.textDark,
                            textDisabledColor: COLORS.textLight,
                            dotColor: COLORS.primary,
                            arrowColor: COLORS.primary,
                            monthTextColor: COLORS.textDark,
                            textMonthFontWeight: '700',
                            textMonthFontSize: FONTS.sizes.lg,
                            textDayFontSize: FONTS.sizes.md,
                            textDayHeaderFontSize: FONTS.sizes.sm,
                            textDayHeaderFontWeight: '600',
                            'stylesheet.day.basic': {
                                base: {
                                    width: 36,
                                    height: 36,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                },
                            },
                        }}
                        style={styles.calendar}
                    />
                </View>

                {/* Selected date label */}
                <Text style={styles.dateLabel}>
                    Today — {formatDateShort(displayDate)}
                </Text>

                {/* Timeline */}
                <View style={styles.timeline}>
                    {CALENDAR_MEDICINES.map((item) => (
                        <TimelineItem key={item.id} item={item} />
                    ))}
                </View>

                {/* Bottom spacer for tab bar */}
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
    calendarContainer: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        overflow: 'hidden',
        marginBottom: SPACING.xl,
    },
    calendar: {
        borderRadius: BORDER_RADIUS.lg,
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
