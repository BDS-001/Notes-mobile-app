import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './global';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  title: {
    ...typography.header,
    textAlign: 'center',
    flex: 1,
  },
  backLink: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  backText: {
    fontSize: typography.subtitle.fontSize,
    color: colors.primary,
  },
  placeholder: {
    width: 50,
  }
});