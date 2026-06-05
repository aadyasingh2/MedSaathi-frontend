import React, { useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { markMedicineTaken } from '../utils/helpers';

const VerifiedScreen = ({ route, navigation }) => {
    const { medicineName, dosage, medicineId, verification } = route.params || {
        medicineName: 'Metformin',
        dosage: '500mg',
    };

    const scaleAnim = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const markAsTaken = async () => {
            if (medicineId) {
                await markMedicineTaken(medicineId);
            }
        };

        markAsTaken();
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    }, [medicineId, scaleAnim]);

    return (
        <View style={styles.screen}>
            <Animated.View
                style={[
                    styles.checkmarkCircle,
                    {
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <Text style={styles.checkmark}>✓</Text>
            </Animated.View>

            <Text style={styles.title}>Well done!</Text>
            <Text style={styles.subtitle}>
                {medicineName} {dosage} marked as taken
            </Text>

            <View style={styles.confirmationCards}>
                <ConfirmationCard
                    icon="✓"
                    title="Photo verified"
                    subtitle={verification?.confidence ? `${verification.confidence} confidence` : 'by AI'}
                />
                <ConfirmationCard
                    icon="📲"
                    title="Caregiver notified"
                    subtitle="notification sent"
                />
            </View>

            <View style={styles.voiceCard}>
                <Text style={styles.voiceEmoji}>🔊</Text>
                <View style={styles.voiceContent}>
                    <Text style={styles.voiceTitle}>Next dose in 12 hours</Text>
                    <Text style={styles.voiceSubtitle}>
                        Remember to take your next medicine at 9:00 PM
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.navigate('HomeMain')}
            >
                <Text style={styles.homeButtonText}>Back to home</Text>
            </TouchableOpacity>
        </View>
    );
};

const ConfirmationCard = ({ icon, title, subtitle }) => (
    <View style={styles.card}>
        <Text style={styles.cardIcon}>{icon}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
);

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SPACING.xl,
        paddingTop: SPACING.xxxl,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xxl,
    },
    checkmark: {
        fontSize: 40,
        color: COLORS.primary,
        fontWeight: '800',
    },
    title: {
        fontSize: FONTS.sizes.xl,
        fontWeight: '800',
        color: COLORS.textDark,
        marginBottom: SPACING.sm,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textMuted,
        textAlign: 'center',
        marginBottom: SPACING.xxl,
        lineHeight: 22,
    },
    confirmationCards: {
        flexDirection: 'row',
        gap: SPACING.md,
        marginBottom: SPACING.xl,
        width: '100%',
    },
    card: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardIcon: {
        fontSize: 28,
        marginBottom: SPACING.sm,
    },
    cardTitle: {
        fontSize: FONTS.sizes.sm,
        fontWeight: '700',
        color: COLORS.textDark,
        textAlign: 'center',
        marginBottom: SPACING.xs,
    },
    cardSubtitle: {
        fontSize: FONTS.sizes.xs,
        color: COLORS.textMuted,
        textAlign: 'center',
    },
    voiceCard: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: SPACING.xl,
        width: '100%',
    },
    voiceEmoji: {
        fontSize: 24,
        marginRight: SPACING.md,
    },
    voiceContent: {
        flex: 1,
    },
    voiceTitle: {
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
        color: COLORS.textDark,
        marginBottom: SPACING.xs,
    },
    voiceSubtitle: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMuted,
        lineHeight: 20,
    },
    homeButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.xxl,
        borderRadius: BORDER_RADIUS.xl,
        alignItems: 'center',
        width: '100%',
    },
    homeButtonText: {
        color: COLORS.white,
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
    },
});

export default VerifiedScreen;
