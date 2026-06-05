import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

const DailyProofScreen = ({ route, navigation }) => {
    const { medicineName, dosage, dueTime, medicineId } = route.params || {
        medicineName: 'Metformin',
        dosage: '500mg',
        dueTime: '9:00 AM',
    };

    const [selectedType, setSelectedType] = React.useState(null);

    const medicineTypes = [
        { id: 'tablet', label: 'Tablet', icon: '💊', guide: 'Pop tablet out of strip and photograph it' },
        { id: 'liquid', label: 'Liquid', icon: '🧪', guide: 'Photograph medicine cup with liquid' },
        { id: 'injection', label: 'Injection', icon: '💉', guide: 'Photograph used needle or empty vial' },
    ];

    const handleCameraPress = () => {
        if (!selectedType) {
            Alert.alert('Select type', 'Please select the medicine type first');
            return;
        }
        navigation.navigate('ProofCamera', { medicineName, dosage, selectedType, medicineId });
    };

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Time to take medicine</Text>
                <Text style={styles.dueTime}>{dueTime}</Text>
            </View>

            <View style={styles.medicineInfo}>
                <Text style={styles.medicineName}>{medicineName}</Text>
                <Text style={styles.dosage}>{dosage}</Text>
            </View>

            <Text style={styles.sectionTitle}>What type of medicine?</Text>

            <View style={styles.typeGrid}>
                {medicineTypes.map((type) => (
                    <TouchableOpacity
                        key={type.id}
                        style={[
                            styles.typeButton,
                            selectedType === type.id && styles.typeButtonActive,
                        ]}
                        onPress={() => setSelectedType(type.id)}
                    >
                        <Text style={styles.typeIcon}>{type.icon}</Text>
                        <Text
                            style={[
                                styles.typeLabel,
                                selectedType === type.id && styles.typeLabelActive,
                            ]}
                        >
                            {type.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {selectedType && (
                <View style={styles.guideCard}>
                    <Text style={styles.guideTitle}>How to photograph:</Text>
                    <Text style={styles.guideText}>
                        {medicineTypes.find((t) => t.id === selectedType)?.guide}
                    </Text>
                </View>
            )}

            <TouchableOpacity
                style={[styles.cameraButton, !selectedType && styles.cameraButtonDisabled]}
                onPress={handleCameraPress}
                disabled={!selectedType}
            >
                <Text style={styles.cameraIcon}>📷</Text>
                <Text style={styles.cameraText}>Take proof photo</Text>
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
    },
    header: {
        marginBottom: SPACING.xl,
    },
    headerTitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '600',
        color: COLORS.textMuted,
        marginBottom: SPACING.xs,
    },
    dueTime: {
        fontSize: FONTS.sizes.xl,
        fontWeight: '800',
        color: COLORS.primary,
    },
    medicineInfo: {
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
    },
    sectionTitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '700',
        color: COLORS.textDark,
        marginBottom: SPACING.lg,
    },
    typeGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.sm,
        marginBottom: SPACING.xl,
    },
    typeButton: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingVertical: SPACING.lg,
        alignItems: 'center',
    },
    typeButtonActive: {
        backgroundColor: COLORS.primaryLight,
        borderColor: COLORS.primary,
    },
    typeIcon: {
        fontSize: 32,
        marginBottom: SPACING.sm,
    },
    typeLabel: {
        fontSize: FONTS.sizes.sm,
        fontWeight: '700',
        color: COLORS.textDark,
    },
    typeLabelActive: {
        color: COLORS.primary,
    },
    guideCard: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.xl,
    },
    guideTitle: {
        fontSize: FONTS.sizes.sm,
        fontWeight: '700',
        color: COLORS.textMuted,
        marginBottom: SPACING.sm,
    },
    guideText: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textDark,
        lineHeight: 22,
    },
    cameraButton: {
        backgroundColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.xl,
        paddingVertical: SPACING.xxl,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.md,
    },
    cameraButtonDisabled: {
        backgroundColor: '#9BC9B3',
    },
    cameraIcon: {
        fontSize: 36,
    },
    cameraText: {
        color: COLORS.white,
        fontSize: FONTS.sizes.lg,
        fontWeight: '700',
    },
});

export default DailyProofScreen;
