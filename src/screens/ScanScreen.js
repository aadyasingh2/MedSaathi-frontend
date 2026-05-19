import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import ScanOverlay from '../components/ScanOverlay';
import ConfirmationSheet from '../components/ConfirmationSheet';
import { SCANNED_MEDICINE } from '../constants/mockData';

const ScanScreen = ({ navigation }) => {
    const [scanned, setScanned] = useState(false);

    const handleSimulateScan = () => {
        setScanned(true);
    };

    const handleAddToSchedule = () => {
        navigation.navigate('Question', {
            medicineName: SCANNED_MEDICINE.name,
            dosage: SCANNED_MEDICINE.dose,
        });
    };

    const handleScanAgain = () => {
        setScanned(false);
    };

    return (
        <View style={styles.screen}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Scan Medicine</Text>
                <TouchableOpacity style={styles.micButton}>
                    <Ionicons name="mic-outline" size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            {!scanned ? (
                /* Camera viewfinder area */
                <View style={styles.cameraContainer}>
                    <TouchableOpacity
                        style={styles.cameraArea}
                        activeOpacity={0.9}
                        onPress={handleSimulateScan}
                    >
                        <ScanOverlay />
                        <Text style={styles.cameraText}>
                            Point camera at bottle{'\n'}or prescription
                        </Text>
                        <Text style={styles.tapHint}>(Tap to simulate scan)</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                /* Confirmation sheet after scan */
                <ConfirmationSheet
                    medicine={SCANNED_MEDICINE}
                    onAddToSchedule={handleAddToSchedule}
                    onScanAgain={handleScanAgain}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.xxxl + 16,
        paddingBottom: SPACING.lg,
        backgroundColor: COLORS.white,
    },
    backButton: {
        padding: SPACING.xs,
    },
    headerTitle: {
        fontSize: FONTS.sizes.xl,
        fontWeight: '700',
        color: COLORS.primary,
    },
    micButton: {
        padding: SPACING.xs,
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: SPACING.xxxl,
    },
    cameraArea: {
        backgroundColor: '#1A1A1A',
        borderRadius: BORDER_RADIUS.xl,
        width: '85%',
        aspectRatio: 0.85,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    cameraText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: FONTS.sizes.md,
        textAlign: 'center',
        marginTop: SPACING.xxl,
        lineHeight: 22,
    },
    tapHint: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: FONTS.sizes.sm,
        marginTop: SPACING.md,
    },
});

export default ScanScreen;
