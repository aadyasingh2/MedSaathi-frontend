import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

const MissedDoseAlertScreen = ({ route, navigation }) => {
    const { medicineName, dosage, scheduledTime, caregiverName } = route.params || {
        medicineName: 'Metformin',
        dosage: '500mg',
        scheduledTime: '9:00 AM',
        caregiverName: 'Rahul',
    };

    const [minutesPassed, setMinutesPassed] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            setMinutesPassed((prev) => prev + 1);
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.screen}>
            <View style={styles.alertBox}>
                <Text style={styles.alertIcon}>⚠️</Text>
                <Text style={styles.alertTitle}>Missed dose alert</Text>
                <Text style={styles.alertSubtitle}>
                    {minutesPassed} minutes since {scheduledTime}
                </Text>
            </View>

            <View style={styles.medicineCard}>
                <Text style={styles.medicineName}>{medicineName}</Text>
                <Text style={styles.dosage}>{dosage}</Text>
                <Text style={styles.scheduledTime}>Was due at {scheduledTime}</Text>
            </View>

            <View style={styles.notificationCard}>
                <Text style={styles.notificationTitle}>SMS sent to {caregiverName}</Text>
                <View style={styles.smsPreview}>
                    <Text style={styles.smsContent}>
                        "{caregiverName} hasn't taken their {medicineName} dose. Please check on them."
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.takeNowButton}
                onPress={() => navigation.navigate('DailyProof', { medicineName, dosage })}
            >
                <Text style={styles.takeNowText}>Take it now</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.dismissButton}
                onPress={() => navigation.navigate('HomeMain')}
            >
                <Text style={styles.dismissText}>Dismiss</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SPACING.xl,
        paddingTop: SPACING.xxxl,
        justifyContent: 'center',
    },
    alertBox: {
        backgroundColor: '#FDEDEC',
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.xl,
        alignItems: 'center',
        marginBottom: SPACING.xl,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.missed,
    },
    alertIcon: {
        fontSize: 40,
        marginBottom: SPACING.md,
    },
    alertTitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '800',
        color: COLORS.missed,
        marginBottom: SPACING.xs,
    },
    alertSubtitle: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textMuted,
    },
    medicineCard: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.xl,
    },
    medicineName: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '800',
        color: COLORS.textDark,
        marginBottom: SPACING.xs,
    },
    dosage: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textMuted,
        marginBottom: SPACING.sm,
    },
    scheduledTime: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.missed,
        fontWeight: '600',
    },
    notificationCard: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.xl,
    },
    notificationTitle: {
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
        color: COLORS.textDark,
        marginBottom: SPACING.md,
    },
    smsPreview: {
        backgroundColor: COLORS.background,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        borderLeftWidth: 3,
        borderLeftColor: COLORS.missed,
    },
    smsContent: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMuted,
        lineHeight: 20,
        fontStyle: 'italic',
    },
    takeNowButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.lg,
        borderRadius: BORDER_RADIUS.xl,
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    takeNowText: {
        color: COLORS.white,
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
    },
    dismissButton: {
        paddingVertical: SPACING.lg,
        alignItems: 'center',
    },
    dismissText: {
        color: COLORS.textMuted,
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
    },
});

export default MissedDoseAlertScreen;
