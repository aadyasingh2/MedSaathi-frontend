import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Linking,
    Alert,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

const RefillReminderScreen = ({ route, navigation }) => {
    const { medicineName, daysRemaining, pharmacy } = route.params || {
        medicineName: 'Metformin',
        daysRemaining: 3,
        pharmacy: 'Apollo Pharmacy',
    };

    const handleContactPharmacy = () => {
        // Simulate contacting pharmacy - in real app would open phone/SMS
        Alert.alert('Success', 'Pharmacy has been contacted. They will prepare your refill.');
    };

    const handleIgnore = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.screen}>
            <View style={styles.warningCard}>
                <Text style={styles.warningIcon}>⏰</Text>
                <Text style={styles.warningTitle}>Refill reminder</Text>
                <Text style={styles.warningText}>
                    {daysRemaining} days of {medicineName} remaining
                </Text>
            </View>

            <View style={styles.medicineCard}>
                <View style={styles.medicineHeader}>
                    <Text style={styles.medicineName}>{medicineName}</Text>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>Low stock</Text>
                    </View>
                </View>

                <View style={styles.stockBar}>
                    <View
                        style={[
                            styles.stockFill,
                            { width: `${(daysRemaining / 30) * 100}%` },
                        ]}
                    />
                </View>

                <Text style={styles.stockLabel}>
                    {daysRemaining} days left (estimate)
                </Text>
            </View>

            <View style={styles.pharmacyCard}>
                <Text style={styles.pharmacyTitle}>Contact pharmacy</Text>
                <Text style={styles.pharmacyName}>{pharmacy}</Text>
                <View style={styles.pharmacyDetails}>
                    <Text style={styles.detailText}>📞 One-tap to call</Text>
                    <Text style={styles.detailText}>💬 Send order message</Text>
                </View>
            </View>

            <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={styles.contactButton}
                    onPress={handleContactPharmacy}
                >
                    <Text style={styles.contactButtonText}>
                        Contact {pharmacy} →
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.laterButton}
                    onPress={handleIgnore}
                >
                    <Text style={styles.laterText}>Remind me later</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.infoIcon}>ℹ️</Text>
                <Text style={styles.infoText}>
                    Refill reminders help you never run out of medicine. Set your preferred lead time in settings.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SPACING.xl,
        paddingTop: SPACING.xxxl,
    },
    warningCard: {
        backgroundColor: COLORS.dueSoonBg,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        alignItems: 'center',
        marginBottom: SPACING.xl,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.dueSoon,
    },
    warningIcon: {
        fontSize: 36,
        marginBottom: SPACING.sm,
    },
    warningTitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '800',
        color: COLORS.dueSoon,
        marginBottom: SPACING.xs,
    },
    warningText: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textMuted,
        textAlign: 'center',
    },
    medicineCard: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.xl,
    },
    medicineHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    medicineName: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '800',
        color: COLORS.textDark,
    },
    statusBadge: {
        backgroundColor: COLORS.dueSoonBg,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.round,
    },
    statusText: {
        fontSize: FONTS.sizes.xs,
        fontWeight: '700',
        color: COLORS.dueSoon,
    },
    stockBar: {
        height: 8,
        backgroundColor: COLORS.border,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: SPACING.md,
    },
    stockFill: {
        height: '100%',
        backgroundColor: COLORS.dueSoon,
    },
    stockLabel: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMuted,
        fontWeight: '600',
    },
    pharmacyCard: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.xl,
    },
    pharmacyTitle: {
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
        color: COLORS.textMuted,
        marginBottom: SPACING.sm,
    },
    pharmacyName: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '800',
        color: COLORS.textDark,
        marginBottom: SPACING.md,
    },
    pharmacyDetails: {
        gap: SPACING.sm,
    },
    detailText: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMuted,
        fontWeight: '600',
    },
    actionButtons: {
        gap: SPACING.md,
        marginBottom: SPACING.xl,
    },
    contactButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.lg,
        borderRadius: BORDER_RADIUS.xl,
        alignItems: 'center',
    },
    contactButtonText: {
        color: COLORS.white,
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
    },
    laterButton: {
        paddingVertical: SPACING.lg,
        alignItems: 'center',
    },
    laterText: {
        color: COLORS.textMuted,
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
    },
    infoCard: {
        backgroundColor: COLORS.primaryLight,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        flexDirection: 'row',
    },
    infoIcon: {
        fontSize: 20,
        marginRight: SPACING.md,
    },
    infoText: {
        flex: 1,
        fontSize: FONTS.sizes.sm,
        color: COLORS.textDark,
        lineHeight: 20,
    },
});

export default RefillReminderScreen;
