import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { addMedicine } from '../utils/helpers';

const ConfirmMedicineScreen = ({ route, navigation }) => {
    const { medicineName, dosage, timesPerDay, timeOfDay, withFood, allMedicines = [] } = route.params || {};

    const handleConfirm = async () => {
        const medicinesToSave = allMedicines.length
            ? allMedicines.map((item) => ({
                name: item.name || medicineName || 'Medicine',
                dose: item.dose || dosage || '1 tablet',
                time: item.times || (timeOfDay?.[0] ? `${timeOfDay[0]} dose` : 'Morning dose'),
                times: item.times || timeOfDay?.join(', ') || 'As scheduled',
                meal: withFood ? 'with food' : 'without food',
                duration: item.duration || '30 days',
            }))
            : [{
                name: medicineName || 'Medicine',
                dose: dosage || '1 tablet',
                time: timeOfDay?.[0] ? `${timeOfDay[0]} dose` : 'Morning dose',
                times: timeOfDay?.join(', ') || 'As scheduled',
                meal: withFood ? 'with food' : 'without food',
                duration: '30 days',
            }];

        await Promise.all(medicinesToSave.map((item) => addMedicine(item)));
        navigation.navigate('HomeMain');
    };

    const timeString = timeOfDay ? timeOfDay.join(', ') : 'N/A';

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
            <Text style={styles.title}>Confirm details</Text>

            <View style={styles.confirmCard}>
                <View style={styles.medicineInfo}>
                    <Text style={styles.medicineName}>{medicineName}</Text>
                    <Text style={styles.dosage}>{dosage}</Text>
                </View>

                <View style={styles.detailsBox}>
                    <DetailRow
                        label="Times per day"
                        value={timesPerDay}
                    />
                    <DetailRow
                        label="Times"
                        value={timeString}
                    />
                    <DetailRow
                        label="With food"
                        value={withFood ? 'Yes' : 'No'}
                    />
                </View>

                <View style={styles.voiceCard}>
                    <Text style={styles.voiceEmoji}>🔊</Text>
                    <Text style={styles.voiceText}>
                        Take {medicineName} {dosage}, {timesPerDay} time{timesPerDay > 1 ? 's' : ''} daily. {withFood ? 'With food.' : 'Without food.'}
                    </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.ctaButton} onPress={handleConfirm}>
                <Text style={styles.ctaText}>Yes, add to schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
                <Text style={styles.secondaryText}>Scan again</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const DetailRow = ({ label, value }) => (
    <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

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
        marginBottom: SPACING.xl,
    },
    confirmCard: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.xl,
        padding: SPACING.xl,
        marginBottom: SPACING.xl,
    },
    medicineInfo: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        paddingBottom: SPACING.lg,
        marginBottom: SPACING.lg,
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
    },
    detailsBox: {
        marginBottom: SPACING.lg,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    detailLabel: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMuted,
        fontWeight: '600',
    },
    detailValue: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textDark,
        fontWeight: '700',
    },
    voiceCard: {
        backgroundColor: COLORS.primaryLight,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    voiceEmoji: {
        fontSize: 24,
        marginRight: SPACING.md,
    },
    voiceText: {
        flex: 1,
        fontSize: FONTS.sizes.sm,
        color: COLORS.textDark,
        lineHeight: 20,
        fontWeight: '600',
    },
    ctaButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.lg,
        borderRadius: BORDER_RADIUS.xl,
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    ctaText: {
        color: COLORS.white,
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
    },
    secondaryButton: {
        paddingVertical: SPACING.lg,
        alignItems: 'center',
    },
    secondaryText: {
        color: COLORS.textMuted,
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
    },
});

export default ConfirmMedicineScreen;
