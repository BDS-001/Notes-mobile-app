import { View, Text, StyleSheet } from 'react-native';
import { usePathname, Link } from 'expo-router';

export default function Header() {
  const pathname = usePathname();
  const isNotesPage = pathname.includes('/notes/');

  return (
    <View style={styles.header}>
      {isNotesPage && (
        <Link href="/" style={styles.backLink}>
          <Text style={styles.backText}>←Back</Text>
        </Link>
      )}
      <Text style={styles.title}>Notes</Text>
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  backLink: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
  },
  placeholder: {
    width: 50,
  }
});