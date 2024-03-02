import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UtilityPage = () => {
  return (
    <View style={styles.centered}>
      <Text style={styles.title}>Utility of Forum</Text>
      <Text style={styles.content}>
        Here you can find discussions about the importance of forum,
        how to use it effectively, and the rules to follow for
        healthy and productive community.
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

export default UtilityPage;