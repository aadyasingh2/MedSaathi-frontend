import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import ScanOverlay from '../components/ScanOverlay';
import { API_BASE_URL } from '../config/api';

const fallbackMedicines = [
    { name: 'Metformin', dose: '500 mg' },
    { name: 'Amlodipine', dose: '5 mg' },
];

const ScanScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const scanImage = async (uri) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', {
                uri,
                type: 'image/jpeg',
                name: 'prescription.jpg',
            });

            const response = await fetch(`${API_BASE_URL}/api/scan`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Backend scan failed');
            }

            const data = await response.json();
            const medicines = data.medicines && data.medicines.length ? data.medicines : fallbackMedicines;

            navigation.navigate('Question', {
                medicineName: medicines[0].name,
                dosage: medicines[0].dose,
                allMedicines: medicines,
            });
        } catch (e) {
            console.error(e);
            navigation.navigate('Question', {
                medicineName: fallbackMedicines[0].name,
                dosage: fallbackMedicines[0].dose,
                allMedicines: fallbackMedicines,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') { Alert.alert('Permission needed'); return; }
        const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
        if (!result.canceled) await scanImage(result.assets[0].uri);
    };

    const handleGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7 });
        if (!result.canceled) await scanImage(result.assets[0].uri);
    };

    return (
        <View style={styles.screen}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Scan Medicine</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.cameraContainer}>
                {loading ? (
                    <View style={styles.loadingBox}>
                        <ActivityIndicator size="large" color={COLORS.primary} />
                        <Text style={styles.loadingText}>Reading prescription...</Text>
                    </View>
                ) : (
                    <View style={styles.cameraArea}>
                        <ScanOverlay />
                        <Text style={styles.cameraText}>Point camera at prescription{'\n'}or medicine bottle</Text>
                    </View>
                )}
            </View>

            {!loading && (
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.primaryBtn} onPress={handleCamera}>
                        <Ionicons name="camera" size={22} color={COLORS.white} />
                        <Text style={styles.primaryBtnText}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryBtn} onPress={handleGallery}>
                        <Text style={styles.secondaryBtnText}>Choose from Gallery</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: COLORS.white },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: SPACING.xl, paddingTop: SPACING.xxxl + 16, paddingBottom: SPACING.lg,
    },
    headerTitle: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.primary },
    cameraContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    cameraArea: {
        backgroundColor: '#1A1A1A', borderRadius: BORDER_RADIUS.xl,
        width: '85%', aspectRatio: 0.85, justifyContent: 'center', alignItems: 'center',
    },
    cameraText: { color: 'rgba(255,255,255,0.7)', fontSize: FONTS.sizes.md, textAlign: 'center', marginTop: SPACING.xxl },
    loadingBox: { alignItems: 'center', gap: SPACING.lg },
    loadingText: { fontSize: FONTS.sizes.md, color: COLORS.textMuted, fontWeight: '600' },
    buttons: { padding: SPACING.xl, gap: SPACING.md, paddingBottom: SPACING.xxxl },
    primaryBtn: {
        backgroundColor: COLORS.primary, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'center', paddingVertical: SPACING.lg, borderRadius: BORDER_RADIUS.xl, gap: SPACING.sm,
    },
    primaryBtnText: { color: COLORS.white, fontSize: FONTS.sizes.md, fontWeight: '700' },
    secondaryBtn: { alignItems: 'center', paddingVertical: SPACING.lg },
    secondaryBtnText: { color: COLORS.textMuted, fontSize: FONTS.sizes.md, fontWeight: '700' },
});

export default ScanScreen;