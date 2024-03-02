import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ForumPage = () => {
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

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          🌟 Welcome to the Community tab of Baristart!  🌟
          {"\n"}What do you want to see today?
        </Text>
      </View>

      <View style={styles.contentSpace}></View>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Utility')}>
          <Text style={styles.footerEmoji}>🔧</Text>
          <Text style={styles.footerText}>Utility of Forum</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Information')}>
          <Text style={styles.footerEmoji}>ℹ️</Text>
          <Text style={styles.footerText}>Useful Information</Text>
        </TouchableOpacity>
      </View>
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
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
  },
  contentSpace: {
    flex: 1, 
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerEmoji: {
    fontSize: 28,
  },
  footerText: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default ForumPage;
