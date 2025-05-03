import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './global';

export default StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: colors.background,
    },
    notes: {
        padding: spacing.lg,
        flex: 1,
        outlineStyle: 'none',
        fontSize: typography.body.fontSize,
    },
    title: {
        ...typography.noteTitle,
        margin: spacing.lg,
        borderBottomColor: colors.text.secondary,
        borderBottomWidth: 5,
        outlineStyle: 'none',
    }
});