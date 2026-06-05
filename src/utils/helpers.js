// Utility helpers for MedRemind

import AsyncStorage from '@react-native-async-storage/async-storage';

const MEDICINES_KEY = '@medsaathi_medicines';
const ADHERENCE_KEY = '@medsaathi_adherence';

export const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
};

/**
 * Formats a Date object to "13 May" style.
 */
export const formatDateShort = (date) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return `${date.getDate()} ${months[date.getMonth()]}`;
};

/**
 * Returns today's date as YYYY-MM-DD.
 */
export const getTodayString = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

export const saveMedicines = async (medicines) => {
    await AsyncStorage.setItem(MEDICINES_KEY, JSON.stringify(medicines));
};

export const loadMedicines = async () => {
    const raw = await AsyncStorage.getItem(MEDICINES_KEY);
    return raw ? JSON.parse(raw) : [];
};

export const saveAdherenceDates = async (dates) => {
    await AsyncStorage.setItem(ADHERENCE_KEY, JSON.stringify(dates));
};

export const loadAdherenceDates = async () => {
    const raw = await AsyncStorage.getItem(ADHERENCE_KEY);
    return raw ? JSON.parse(raw) : {};
};

export const addMedicine = async (medicine) => {
    const current = await loadMedicines();
    const entry = {
        id: String(Date.now()),
        ...medicine,
        status: 'dueSoon',
        color: '#1B8A6B',
    };
    const next = [entry, ...current];
    await saveMedicines(next);
    return next;
};

export const markMedicineTaken = async (medicineId) => {
    const current = await loadMedicines();
    const today = getTodayString();
    const next = current.map((item) =>
        item.id === medicineId ? { ...item, status: 'taken' } : item
    );
    await saveMedicines(next);
    const adherence = await loadAdherenceDates();
    adherence[today] = { marked: true, dotColor: '#1B8A6B' };
    await saveAdherenceDates(adherence);
    return next;
};
