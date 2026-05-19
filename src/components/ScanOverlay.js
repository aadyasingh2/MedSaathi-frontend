import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../constants/theme';

const { width } = Dimensions.get('window');
const BRACKET_SIZE = 40;
const BRACKET_THICKNESS = 3;
const VIEWFINDER_SIZE = width * 0.7;

const ScanOverlay = () => {
    return (
        <View style={styles.container}>
            {/* Top-left corner */}
            <View style={[styles.corner, styles.topLeft]}>
                <View style={[styles.horizontalLine, styles.topHorizontal]} />
                <View style={[styles.verticalLine, styles.leftVertical]} />
            </View>

            {/* Top-right corner */}
            <View style={[styles.corner, styles.topRight]}>
                <View style={[styles.horizontalLine, styles.topHorizontal, { alignSelf: 'flex-end' }]} />
                <View style={[styles.verticalLine, styles.rightVertical]} />
            </View>

            {/* Bottom-left corner */}
            <View style={[styles.corner, styles.bottomLeft]}>
                <View style={[styles.verticalLine, styles.leftVertical, { alignSelf: 'flex-start' }]} />
                <View style={[styles.horizontalLine, styles.bottomHorizontal]} />
            </View>

            {/* Bottom-right corner */}
            <View style={[styles.corner, styles.bottomRight]}>
                <View style={[styles.verticalLine, styles.rightVertical]} />
                <View style={[styles.horizontalLine, styles.bottomHorizontal, { alignSelf: 'flex-end' }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: VIEWFINDER_SIZE,
        height: VIEWFINDER_SIZE,
        position: 'relative',
    },
    corner: {
        position: 'absolute',
        width: BRACKET_SIZE,
        height: BRACKET_SIZE,
    },
    topLeft: {
        top: 0,
        left: 0,
    },
    topRight: {
        top: 0,
        right: 0,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
    },
    horizontalLine: {
        width: BRACKET_SIZE,
        height: BRACKET_THICKNESS,
        backgroundColor: COLORS.scanBracket,
    },
    verticalLine: {
        width: BRACKET_THICKNESS,
        height: BRACKET_SIZE,
        backgroundColor: COLORS.scanBracket,
    },
    topHorizontal: {},
    bottomHorizontal: {},
    leftVertical: {
        alignSelf: 'flex-start',
    },
    rightVertical: {
        alignSelf: 'flex-end',
    },
});

export default ScanOverlay;
