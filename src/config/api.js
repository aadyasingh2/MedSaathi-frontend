import { Platform } from 'react-native';

export const API_BASE_URL = Platform.OS === 'web'
    ? 'http://localhost:3000'
    : 'http://10.29.185.152:3000';
