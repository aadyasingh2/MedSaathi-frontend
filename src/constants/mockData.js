// Mock data for the MedRemind app

export const USER_PROFILE = {
    name: 'Amma',
    language: 'EN', // EN, HI, TA
};

export const TODAY_MEDICINES = [
    {
        id: '1',
        name: 'Metformin',
        dose: '500mg',
        time: '8:00 AM',
        times: '8:00 AM · 8:00 PM',
        meal: 'with breakfast',
        status: 'taken', // taken | dueSoon | missed | upcoming | done
        color: '#2ECC71', // green dot
        duration: '30 days',
    },
    {
        id: '2',
        name: 'Amlodipine',
        dose: '5mg',
        time: '2:00 PM',
        times: '2:00 PM',
        meal: 'after lunch',
        status: 'dueSoon',
        color: '#F39C12', // orange dot
        duration: '30 days',
    },
    {
        id: '3',
        name: 'Atorvastatin',
        dose: '10mg',
        time: '9:00 PM',
        times: '9:00 PM',
        meal: 'after dinner',
        status: 'missed',
        color: '#E74C3C', // red dot
        duration: '30 days',
    },
];

export const CALENDAR_MEDICINES = [
    {
        id: '1',
        name: 'Metformin',
        dose: '500mg',
        timeLabel: '8 AM',
        meal: 'with breakfast',
        status: 'done',
    },
    {
        id: '2',
        name: 'Amlodipine',
        dose: '5mg',
        timeLabel: '2 PM',
        meal: 'after lunch',
        status: 'upcoming',
    },
    {
        id: '3',
        name: 'Atorvastatin',
        dose: '10mg',
        timeLabel: '9 PM',
        meal: 'after dinner',
        status: 'upcoming',
    },
];

export const SCANNED_MEDICINE = {
    name: 'Metformin',
    dose: '500 mg',
    times: '8:00 AM · 8:00 PM',
    duration: '30 days',
    voiceMessage:
        '"I will remind you every morning at 8 and every evening at 8. Shall I add this?"',
};

// Dates with medicines for calendar marking (May 2026)
export const MARKED_DATES = {
    '2026-05-04': { marked: true, dotColor: '#1B8A6B' },
    '2026-05-05': { marked: true, dotColor: '#1B8A6B' },
    '2026-05-06': { marked: true, dotColor: '#1B8A6B' },
    '2026-05-07': { marked: true, dotColor: '#1B8A6B' },
    '2026-05-08': { marked: true, dotColor: '#1B8A6B' },
    '2026-05-09': { marked: true, dotColor: '#1B8A6B' },
    '2026-05-10': { marked: true, dotColor: '#1B8A6B' },
    '2026-05-11': { marked: true, dotColor: '#1B8A6B' },
    '2026-05-12': { marked: true, dotColor: '#1B8A6B' },
    '2026-05-13': { selected: true, selectedColor: '#1B8A6B', marked: true, dotColor: '#1B8A6B' },
};
