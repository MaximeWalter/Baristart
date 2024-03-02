import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InformationPage = () => {
  return (
    <View style={styles.centered}>
      <Text style={styles.title}>Useful informations</Text>
      <Text style={styles.content}>
        This section contains useful information for coffee lovers,
        like tips for choosing the best coffee, techniques for
        preparation, and product recommendations.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default InformationPage;