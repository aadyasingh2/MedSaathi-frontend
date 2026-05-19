import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

const ProofCameraScreen = ({ route, navigation }) => {
    const { medicineName, dosage, selectedType } = route.params || {};
    const [hasPhoto, setHasPhoto] = useState(false);

    const handleSimulateCapture = () => {
        setHasPhoto(true);
    };

    const handleVerify = () => {
        navigation.navigate('Verified', { medicineName, dosage });
    };

    const handleRetake = () => {
        setHasPhoto(false);
    };

    const guides = {
        tablet: 'Pop tablet out of strip and photograph it',
        liquid: 'Photograph medicine cup with liquid',
        injection: 'Photograph used needle or empty vial',
    };

    if (hasPhoto) {
        return (
            <View style={styles.screen}>
                <View style={styles.previewCard}>
                    <View style={styles.placeholderImage}>
                        <Text style={styles.placeholderEmoji}>📸</Text>
                        <Text style={styles.placeholderText}>Photo captured</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
                    <Text style={styles.verifyButtonText}>Verify →</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
                    <Text style={styles.retakeButtonText}>Retake photo</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Point camera at {selectedType}</Text>
                <Text style={styles.guide}>{guides[selectedType]}</Text>
            </View>

            <View style={styles.cameraContainer}>
                <View style={styles.cameraFrame}>
                    <View style={styles.corner} />
                    <View style={[styles.corner, { top: undefined, bottom: 0 }]} />
                    <View style={[styles.corner, { right: undefined, left: 0 }]} />
                    <View
                        style={[
                            styles.corner,
                            { top: undefined, bottom: 0, right: undefined, left: 0 },
                        ]}
                    />

                    <View style={styles.cameraArea}>
                        <Text style={styles.cameraPlaceholder}>
                            {selectedType === 'tablet'
                                ? '💊'
                                : selectedType === 'liquid'
                                    ? '🧪'
                                    : '💉'}
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={styles.captureButton}
                onPress={handleSimulateCapture}
            >
                <View style={styles.captureDot} />
            </TouchableOpacity>

            <Text style={styles.hint}>(Tap to simulate capture)</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: SPACING.xl,
        paddingTop: SPACING.xxxl,
    },
    header: {
        marginBottom: SPACING.xl,
    },
    headerTitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '800',
        color: COLORS.textDark,
        marginBottom: SPACING.sm,
    },
    guide: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textMuted,
        lineHeight: 20,
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: SPACING.xl,
    },
    cameraFrame: {
        width: '85%',
        aspectRatio: 0.75,
        backgroundColor: '#1A1A1A',
        borderRadius: BORDER_RADIUS.xl,
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    corner: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderColor: COLORS.primary,
        borderTopWidth: 3,
        borderRightWidth: 3,
        top: 0,
        right: 0,
    },
    cameraArea: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    cameraPlaceholder: {
        fontSize: 48,
    },
    previewCard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    placeholderImage: {
        width: 200,
        height: 250,
        backgroundColor: COLORS.background,
        borderRadius: BORDER_RADIUS.lg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderEmoji: {
        fontSize: 48,
        marginBottom: SPACING.md,
    },
    placeholderText: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textMuted,
        fontWeight: '600',
    },
    captureButton: {
        alignSelf: 'center',
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    captureDot: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.white,
    },
    hint: {
        fontSize: FONTS.sizes.sm,
        color: COLORS.textMuted,
        textAlign: 'center',
        marginBottom: SPACING.lg,
    },
    verifyButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.lg,
        borderRadius: BORDER_RADIUS.xl,
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    verifyButtonText: {
        color: COLORS.white,
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
    },
    retakeButton: {
        paddingVertical: SPACING.lg,
        alignItems: 'center',
    },
    retakeButtonText: {
        color: COLORS.textMuted,
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
    },
});

export default ProofCameraScreen;
