// MedRemind Design System
// Colors, typography, spacing, and shadows derived from Figma

export const COLORS = {
    // Primary
    primary: '#1B8A6B',
    primaryLight: '#E8F5F0',
    primaryDark: '#15705A',

    // Background
    background: '#F5F5F5',
    white: '#FFFFFF',
    card: '#FFFFFF',

    // Text
    textDark: '#1A1A1A',
    textMedium: '#4A4A4A',
    textMuted: '#888888',
    textLight: '#AAAAAA',

    // Status
    taken: '#2ECC71',
    takenBg: '#E8FAF0',
    dueSoon: '#F39C12',
    dueSoonBg: '#FEF5E7',
    missed: '#E74C3C',
    missedBg: '#FDEDEC',
    upcoming: '#95A5A6',
    upcomingBg: '#F0F3F4',
    done: '#1B8A6B',
    doneBg: '#E8F5F0',

    // Misc
    border: '#E0E0E0',
    shadow: '#000000',
    overlay: 'rgba(0,0,0,0.5)',
    scanBracket: '#1B8A6B',
};

export const FONTS = {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    sizes: {
        xs: 11,
        sm: 13,
        md: 15,
        lg: 18,
        xl: 22,
        xxl: 28,
        title: 24,
    },
};

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
};

export const SHADOWS = {
    card: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    cardLight: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
};

export const BORDER_RADIUS = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    round: 50,
};
