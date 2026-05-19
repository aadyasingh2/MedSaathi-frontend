import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

const QuestionScreen = ({ route, navigation }) => {
    const { medicineName, dosage } = route.params || {};
    const [timesPerDay, setTimesPerDay] = useState(null);
    const [timeOfDay, setTimeOfDay] = useState([]);
    const [withFood, setWithFood] = useState(null);

    const handleNext = () => {
        navigation.navigate('ConfirmMedicine', {
            medicineName,
            dosage,
            timesPerDay,
            timeOfDay,
            withFood,
        });
    };

    const isComplete = timesPerDay && timeOfDay.length > 0 && withFood !== null;

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
            <Text style={styles.title}>Set up {medicineName}</Text>
            <Text style={styles.subtitle}>Just a few quick questions</Text>

            {/* Times per day */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>How many times a day?</Text>
                <View style={styles.buttonGroup}>
                    {[1, 2, 3].map((num) => (
                        <TouchableOpacity
                            key={num}
                            style={[
                                styles.optionButton,
                                timesPerDay === num && styles.optionButtonActive,
                            ]}
                            onPress={() => {
                                setTimesPerDay(num);
                                setTimeOfDay(Array(num).fill(null));
                            }}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    timesPerDay === num && styles.optionTextActive,
                                ]}
                            >
                                {num} time{num > 1 ? 's' : ''}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Time of day selection */}
            {timesPerDay && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>When?</Text>
                    <View style={styles.buttonGroup}>
                        {['Morning', 'Afternoon', 'Evening', 'Night'].map((time) => (
                            <TouchableOpacity
                                key={time}
                                style={[
                                    styles.optionButton,
                                    timeOfDay.includes(time) && styles.optionButtonActive,
                                ]}
                                onPress={() => {
                                    if (timeOfDay.includes(time)) {
                                        setTimeOfDay(timeOfDay.filter((t) => t !== time));
                                    } else if (timeOfDay.length < timesPerDay) {
                                        setTimeOfDay([...timeOfDay, time]);
                                    }
                                }}
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        timeOfDay.includes(time) && styles.optionTextActive,
                                    ]}
                                >
                                    {time}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {timeOfDay.length < timesPerDay && (
                        <Text style={styles.hint}>Select {timesPerDay - timeOfDay.length} more</Text>
                    )}
                </View>
            )}

            {/* With food */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Take with food?</Text>
                <View style={styles.buttonGroup}>
                    {[
                        { label: 'Yes', value: true },
                        { label: 'No', value: false },
                    ].map(({ label, value }) => (
                        <TouchableOpacity
                            key={label}
                            style={[
                                styles.optionButton,
                                withFood === value && styles.optionButtonActive,
                            ]}
                            onPress={() => setWithFood(value)}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    withFood === value && styles.optionTextActive,
                                ]}
                            >
                                {label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <TouchableOpacity
                style={[styles.ctaButton, !isComplete && styles.ctaButtonDisabled]}
                onPress={handleNext}
                disabled={!isComplete}
            >
                <Text style={styles.ctaText}>Continue →</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        padding: SPACING.xl,
        paddingTop: SPACING.xxxl,
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
        marginBottom: SPACING.xxxl,
    },
    section: {
        marginBottom: SPACING.xxl,
    },
    sectionTitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '700',
        color: COLORS.textDark,
        marginBottom: SPACING.lg,
    },
    buttonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.sm,
    },
    optionButton: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.md,
        alignItems: 'center',
    },
    optionButtonActive: {
        backgroundColor: COLORS.primaryLight,
        borderColor: COLORS.primary,
    },
    optionText: {
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
        color: COLORS.textDark,
        textAlign: 'center',
    },
    optionTextActive: {
        color: COLORS.primary,
    },
    hint: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMuted,
        marginTop: SPACING.sm,
    },
    ctaButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.lg,
        borderRadius: BORDER_RADIUS.xl,
        alignItems: 'center',
        marginTop: SPACING.xl,
    },
    ctaButtonDisabled: {
        backgroundColor: '#9BC9B3',
    },
    ctaText: {
        color: COLORS.white,
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
    },
});

export default QuestionScreen;
