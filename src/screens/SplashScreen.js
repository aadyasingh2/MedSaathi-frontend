import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => navigation.replace('Welcome'), 5000);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.screen}>
            <View style={styles.phoneFrame}>
                <View style={styles.topBar} />
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.title}>MedRemind</Text>
                    <Text style={styles.subtitle}>Medicine reminders made simple</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.lg,
    },
    phoneFrame: {
        width: '86%',
        aspectRatio: 0.55,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.xl,
        overflow: 'hidden',
        alignItems: 'center',
    },
    topBar: {
        width: '30%',
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.primaryLight,
        marginTop: SPACING.lg,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.xl,
    },
    logoContainer: {
        width: 96,
        height: 96,
        borderRadius: 32,
        backgroundColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    logo: {
        width: 52,
        height: 52,
    },
    title: {
        fontSize: FONTS.sizes.xxl,
        fontWeight: '800',
        color: COLORS.textDark,
        marginBottom: SPACING.sm,
    },
    subtitle: {
        fontSize: FONTS.sizes.md,
        color: COLORS.textMuted,
        textAlign: 'center',
        lineHeight: 22,
    },
});

export default SplashScreen;
