import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, SHADOWS, BORDER_RADIUS } from '../constants/theme';
import { USER_PROFILE } from '../constants/mockData';
import { getGreeting, loadMedicines } from '../utils/helpers';
import MedicineCard from '../components/MedicineCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [profile, setProfile] = useState(USER_PROFILE);
    const [medicines, setMedicines] = useState([]);
    const greeting = getGreeting();

    const refreshMedicines = async () => {
        const saved = await loadMedicines();
        setMedicines(saved.length ? saved : []);
    };

    useEffect(() => {
        const loadProfile = async () => {
            const value = await AsyncStorage.getItem('user_profile');
            if (value) {
                const parsed = JSON.parse(value);
                setProfile({ name: parsed.name || USER_PROFILE.name });
            }
        };
        loadProfile();
        refreshMedicines();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', refreshMedicines);
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.screen}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.appTitle}>MedRemind</Text>
                    <View style={styles.langRow}>
                        <View style={styles.langPillActive}>
                            <Text style={styles.langTextActive}>EN</Text>
                        </View>
                        <TouchableOpacity style={styles.langPill}>
                            <Text style={styles.langText}>हिं</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.langPill}>
                            <Text style={styles.langText}>தமி</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Greeting */}
                <View style={styles.greetingSection}>
                    <Text style={styles.greetingText}>
                        {greeting}, {profile.name || USER_PROFILE.name} 🌿
                    </Text>
                    <Text style={styles.subText}>
                        You have {medicines.length || 0} medicines today
                    </Text>
                </View>

                {/* Scan New Medicine CTA */}
                <TouchableOpacity
                    style={styles.scanCard}
                    activeOpacity={0.85}
                    onPress={() => navigation.navigate('Scan')}
                >
                    <View style={styles.scanCardOverlay}>
                        <Ionicons name="camera-outline" size={40} color={COLORS.white} />
                        <Text style={styles.scanTitle}>Scan New{'\n'}Medicine</Text>
                        <Text style={styles.scanSubtitle}>
                            Take a photo of your bottle
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Listen to schedule */}
                <TouchableOpacity style={styles.listenCard} activeOpacity={0.8}>
                    <View style={styles.listenRow}>
                        <Ionicons name="mic-outline" size={22} color={COLORS.primary} />
                        <View style={styles.listenContent}>
                            <Text style={styles.listenIcon}>🔊</Text>
                            <Text style={styles.listenText}>Listen to today's{'\n'}schedule</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Today's medicines */}
                <Text style={styles.sectionTitle}>Today's medicines</Text>
                {medicines.length ? medicines.map((med) => (
                    <MedicineCard
                        key={med.id}
                        medicine={med}
                        onTake={() => navigation.navigate('DailyProof', {
                            medicineName: med.name,
                            dosage: med.dose,
                            dueTime: med.time || 'Now',
                            medicineId: med.id,
                        })}
                    />
                )) : (
                    <Text style={styles.emptyText}>Scan a prescription to add your first medicine.</Text>
                )}

                {/* Bottom spacer for tab bar */}
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.xxxl + 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    appTitle: {
        fontSize: FONTS.sizes.title,
        fontWeight: '800',
        color: COLORS.primary,
    },
    langRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    },
    langPillActive: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs + 2,
        borderRadius: BORDER_RADIUS.round,
    },
    langTextActive: {
        color: COLORS.white,
        fontSize: FONTS.sizes.sm,
        fontWeight: '700',
    },
    langPill: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs + 2,
    },
    langText: {
        color: COLORS.textMuted,
        fontSize: FONTS.sizes.sm,
        fontWeight: '600',
    },
    greetingSection: {
        marginBottom: SPACING.xl,
    },
    greetingText: {
        fontSize: FONTS.sizes.xl,
        fontWeight: '700',
        color: COLORS.textDark,
    },
    subText: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textMuted,
        marginTop: SPACING.xs,
    },
    scanCard: {
        backgroundColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.xl,
        overflow: 'hidden',
        marginBottom: SPACING.lg,
        ...SHADOWS.card,
    },
    scanCardOverlay: {
        padding: SPACING.xxl,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 160,
    },
    scanTitle: {
        fontSize: FONTS.sizes.xl,
        fontWeight: '800',
        color: COLORS.white,
        textAlign: 'center',
        marginTop: SPACING.md,
    },
    scanSubtitle: {
        fontSize: FONTS.sizes.sm,
        color: 'rgba(255,255,255,0.8)',
        marginTop: SPACING.sm,
        textAlign: 'center',
    },
    listenCard: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.xxl,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    listenRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listenContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: SPACING.md,
    },
    listenIcon: {
        fontSize: 18,
        marginRight: SPACING.sm,
    },
    listenText: {
        fontSize: FONTS.sizes.md,
        fontWeight: '700',
        color: COLORS.primary,
        lineHeight: 22,
    },
    sectionTitle: {
        fontSize: FONTS.sizes.lg,
        fontWeight: '700',
        color: COLORS.textDark,
        marginBottom: SPACING.lg,
    },
    emptyText: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textMuted,
        marginBottom: SPACING.xl,
    },
});

export default HomeScreen;
