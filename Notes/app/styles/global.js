import { StyleSheet } from 'react-native';

// Theme definitions for dark and light modes
export const themes = {
  dark: {
    primary: '#6C5CE7', //  Purple
    secondary: '#00CEC9', // Teal accent
    background: {
      primary: '#1E1E2E', // Dark background
      secondary: '#2D2D3A', // Slightly lighter
      tertiary: '#3F3F5A', // For subtle elements
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B8B8C7',
      placeholder: '#6C6C7E',
      error: '#FF6B6B',
    },
    border: {
      light: '#3F3F5A',
      medium: '#4A4A5A',
    }
  },
  light: {
    primary: '#6C5CE7',
    secondary: '#00CEC9',
    background: {
      primary: '#FFFFFF',
      secondary: '#F5F5F7',
      tertiary: '#EAEAEC',
    },
    text: {
      primary: '#2D2D3A',
      secondary: '#6C6C7E',
      placeholder: '#AAAAAA',
      error: '#FF6B6B',
    },
    border: {
      light: '#EAEAEC',
      medium: '#D1D1D6',
    }
  }
};

// Default theme (dark mode)
export const colors = themes.dark;

// Modern typography
export const typography = {
  header: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  noteTitle: {
    fontSize: 30,
    fontWeight: '600',
  }
};

// Enhanced spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Common layout styles
export const layout = {
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    // For native
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    // For web
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  }
};

// Common UI components
export const ui = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...layout.shadow,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background.primary,
  },
  loadingText: {
    fontSize: typography.body.fontSize,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background.primary,
  },
  errorText: {
    fontSize: typography.body.fontSize,
    color: colors.text.error,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    ...layout.shadow,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: typography.body.fontSize,
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
});

export default {
  colors,
  themes,
  typography,
  spacing,
  layout,
  ui,
};