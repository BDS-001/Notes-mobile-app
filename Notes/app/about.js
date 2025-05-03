import { View, Text, ScrollView } from 'react-native';
import Header from './components/Header';
import styles from './styles/aboutStyles';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>About Notes</Text>
          
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.paragraph}>
            This app is a free and open source simple note taking application that has no tracking and no ads. 
            All data is stored locally on your device.
          </Text>
          
          <Text style={styles.sectionTitle}>Privacy First</Text>
          <Text style={styles.paragraph}>
            We believe your notes are personal and should remain private. That's why we don't collect any 
            data about you or your notes. Everything stays on your device.
          </Text>
          
          <Text style={styles.sectionTitle}>Simplicity</Text>
          <Text style={styles.paragraph}>
            Our goal is to provide a clean, distraction-free environment for your thoughts. 
            No complicated features or cluttered interfaces - just you and your ideas.
          </Text>
          
          <Text style={styles.sectionTitle}>Open Source</Text>
          <Text style={styles.paragraph}>
            This app is developed as an open source project. Contributions, feedback, 
            and suggestions are always welcome!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}