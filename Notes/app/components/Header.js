import { View, Text, StyleSheet } from 'react-native';
import { usePathname, Link } from 'expo-router';
import styles from '../styles/headerStyles'

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