import { StyleSheet } from 'react-native';
import { colors, spacing, typography, layout } from './global';

export default StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    noteItem: {
        padding: spacing.md,
        marginHorizontal: spacing.md,
        marginVertical: spacing.sm,
        backgroundColor: colors.background.secondary,
        borderRadius: 16,
        borderLeftWidth: 4,
        borderLeftColor: colors.primary,
        ...layout.shadow,
    },
    noteTitle: {
        ...typography.title,
        marginBottom: spacing.xs,
        color: colors.text.primary,
    },
    noteContent: {
        ...typography.body,
        marginBottom: spacing.sm,
        color: colors.text.secondary,
        maxHeight: 44,
    },
    noteDate: {
        ...typography.caption,
        color: colors.text.secondary,
    },
    newNoteButton: {
        backgroundColor: colors.primary,
        padding: spacing.md,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: spacing.lg,
        marginBottom: spacing.lg,
        marginTop: spacing.md,
        height: 56,
        ...layout.shadow,
    },
    newNoteText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: typography.subtitle.fontSize,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.lg,
        backgroundColor: colors.background.primary,
    },
    emptyText: {
        fontSize: typography.body.fontSize,
        color: colors.text.secondary,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    errorText: {
        fontSize: typography.body.fontSize,
        color: colors.text.error,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
});