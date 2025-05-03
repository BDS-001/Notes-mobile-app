import { StyleSheet } from 'react-native';
import { colors, spacing, typography, layout } from './global';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    height: 70,
    ...layout.shadow,
    position: 'relative',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    zIndex: 2,
  },
  title: {
    ...typography.header,
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    color: colors.text.primary,
    zIndex: 1,
  },
  backLink: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.background.tertiary,
    borderRadius: 8,
  },
  backText: {
    fontSize: typography.subtitle.fontSize,
    color: colors.primary,
    fontWeight: '500',
  },
  placeholder: {
    width: 50,
  }
});