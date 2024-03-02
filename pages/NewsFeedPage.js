import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NewsFeedPage = () => {
  const navigation = useNavigation();

  const TouchableText = ({ onPress, children, style }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.1}>
      <Text style={style}>{children}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Baristart Forum</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableText onPress={() => navigation.navigate('NewsFeed')} style={styles.tabText}>
          News Feed
        </TouchableText>
        <TouchableText onPress={() => navigation.navigate('Topics')} style={styles.tabText}>
          Topics
        </TouchableText>
      </View>

      <View style={styles.center}>
      <Text style={styles.text}>Welcome to the News Feed!</Text>
     </View>

      <View style={styles.contentSpace}></View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#e1e1e1',
  },
  tabText: {
    fontSize: 18,
    fontWeight: '600',
  },
  contentSpace: {
    flex: 1, 
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default NewsFeedPage;
