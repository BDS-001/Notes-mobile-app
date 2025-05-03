import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './global';

export default StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    notes: {
        padding: spacing.lg,
        flex: 1,
        outlineStyle: 'none',
        fontSize: typography.body.fontSize,
        color: colors.text.primary,
        backgroundColor: colors.background.primary,
        lineHeight: 24,
    },
    title: {
        ...typography.noteTitle,
        margin: spacing.lg,
        marginBottom: spacing.md,
        color: colors.text.primary,
        borderBottomColor: colors.border.light,
        borderBottomWidth: 2,
        paddingBottom: spacing.sm,
        outlineStyle: 'none',
    },
    loadingText: {
        fontSize: typography.body.fontSize,
        color: colors.text.secondary,
        textAlign: 'center',
        marginTop: spacing.xl,
    },
    errorText: {
        fontSize: typography.body.fontSize,
        color: colors.text.error,
        textAlign: 'center',
        marginTop: spacing.xl,
    }
});