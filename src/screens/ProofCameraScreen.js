import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
    ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { API_BASE_URL } from '../config/api';

const ProofCameraScreen = ({ route, navigation }) => {
    const { medicineName, dosage, selectedType, medicineId } = route.params || {};
    const [hasPhoto, setHasPhoto] = useState(false);
    const [photoUri, setPhotoUri] = useState('');
    const [loading, setLoading] = useState(false);
    const [verificationMessage, setVerificationMessage] = useState('');

    const handleCapture = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Camera access is required to verify the proof photo.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 0.8,
            allowsEditing: true,
            aspect: [4, 5],
        });

        if (result.canceled || !result.assets?.[0]?.uri) return;

        const uri = result.assets[0].uri;
        setPhotoUri(uri);
        setHasPhoto(true);
        await verifyPhoto(uri);
    };

    const verifyPhoto = async (uri) => {
        try {
            setLoading(true);
            setVerificationMessage('');

            const formData = new FormData();
            formData.append('image', {
                uri,
                type: 'image/jpeg',
                name: 'proof.jpg',
            });

            const res = await fetch(`${API_BASE_URL}/api/verify-proof`, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            const verified = Boolean(data?.verified);
            const confidence = data?.confidence || 'medium';
            const message = data?.message || (res.ok ? 'Medicine photo was reviewed.' : 'Verification request failed.');

            setVerificationMessage(`${verified ? 'AI verified' : 'Needs review'} · ${confidence.toUpperCase()} confidence · ${message}`);

            navigation.navigate('Verified', {
                medicineName,
                dosage,
                medicineId,
                verification: {
                    verified,
                    confidence,
                    message,
                    fallback: !res.ok,
                },
            });
        } catch (error) {
            const message = error.message || 'Could not verify this photo.';
            setVerificationMessage(`Verification issue · ${message}`);
            navigation.navigate('Verified', {
                medicineName,
                dosage,
                medicineId,
                verification: {
                    verified: false,
                    confidence: 'low',
                    message,
                    fallback: true,
                },
            });
        } finally {
            setLoading(false);
        }
    };

    const handleRetake = () => {
        setHasPhoto(false);
        setPhotoUri('');
        setVerificationMessage('');
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
                    <Image source={{ uri: photoUri }} style={styles.previewImage} />
                    {loading ? (
                        <View style={styles.loadingBox}>
                            <ActivityIndicator size="large" color={COLORS.primary} />
                            <Text style={styles.loadingText}>Checking photo with AI…</Text>
                        </View>
                    ) : null}
                    {verificationMessage ? (
                        <Text style={styles.verificationText}>{verificationMessage}</Text>
                    ) : null}
                </View>

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
                onPress={handleCapture}
                disabled={loading}
            >
                <View style={styles.captureDot} />
            </TouchableOpacity>

            <Text style={styles.hint}>{loading ? 'Verifying your photo…' : 'Tap to capture and verify with AI'}</Text>
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
    previewImage: {
        width: 260,
        height: 320,
        borderRadius: BORDER_RADIUS.lg,
        backgroundColor: COLORS.background,
    },
    loadingBox: {
        marginTop: SPACING.md,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: SPACING.sm,
        color: COLORS.textMuted,
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
    },
    verificationText: {
        marginTop: SPACING.md,
        textAlign: 'center',
        color: COLORS.textDark,
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
        lineHeight: 20,
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
