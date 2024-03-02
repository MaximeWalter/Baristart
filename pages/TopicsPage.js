import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const topics = [
  { id: '1', title: 'Latte Art', description: 'Share your creations & ask questions to the community.' },
  { id: '2', title: 'Recipes', description: 'Discover and share unique coffee recipes.' },
  { id: '3', title: 'Equipment & Accessories', description: 'Advice and recommendations.' },
];

const TopicsPage = () => {
  const navigation = useNavigation();

  const renderTopic = ({ item }) => (
    <View style={styles.topicItem}>
      <Text style={styles.topicTitle}>{item.title}</Text>
      <Text style={styles.topicDescription}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Baristart Forum</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('NewsFeed')} style={styles.touchableTab}>
          <Text style={styles.tabText}>News Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Topics')} style={styles.touchableTab}>
          <Text style={styles.tabText}>Topics</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={topics}
        renderItem={renderTopic}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
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
  touchableTab: {
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 18,
    fontWeight: '600',
  },
  list: {
    marginTop: 20,
  },
  topicItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  topicDescription: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default TopicsPage;
