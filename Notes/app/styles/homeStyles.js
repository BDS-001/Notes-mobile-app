import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './global';

export default StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: colors.background,
    },
    noteItem: {
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.light,
    },
    noteTitle: {
        ...typography.title,
        marginBottom: spacing.xs,
    },
    noteContent: {
        ...typography.body,
        marginBottom: spacing.xs,
    },
    noteDate: {
        ...typography.caption,
    },
    newNoteButton: {
        backgroundColor: colors.primary,
        padding: spacing.md,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: spacing.lg,
        marginBottom: spacing.lg,
    },
    newNoteText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: typography.subtitle.fontSize,
    }
});