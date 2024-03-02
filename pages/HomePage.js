import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';

const HomePage = () => {
  const [expanded, setExpanded] = useState({});
  const [subExpanded, setSubExpanded] = useState({});
  const [demoLevel, setDemoLevel] = useState({});
  const [historyText, setHistoryText] = useState('');

  const coffeeTypes = [
    "Ristretto",
    "Espresso",
    "Americano",
    "Cappuccino",
    "Flat White",
    "Lungo",
    "Latte",
    "Latte Macchiato",
    "Mocha",
    "White Mocha"
  ];

  const toggleExpand = (name, type = 'main') => {
    if (type === 'main') {
      setExpanded(prev => ({ ...prev, [name]: !prev[name] }));
    } else if (type === 'sub') {
      setSubExpanded(prev => ({ ...prev, [name]: !prev[name] }));
    } else if (type === 'demo') {
      setDemoLevel(prev => ({ ...prev, [name]: !prev[name] }));
    }
  };

  const handleHistoryPress = (coffee) => {
    const newText = coffee === "Latte" ? 
      "Although the practice of steaming milk has been around since the late 19th century, it actually took another few decades for latte art to emerge. There were early reports of it in northern Italy, but most industry professionals agree that Espresso Vivace in Seattle, US was the real birthplace." : 
      "";
    setHistoryText(newText);
    toggleExpand(`history-${coffee}`, 'sub');
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {coffeeTypes.map((coffee, index) => (
          <View key={index}>
            <TouchableOpacity onPress={() => toggleExpand(coffee)} style={styles.coffeeItem}>
              <Text style={styles.coffeeText}>{coffee}</Text>
            </TouchableOpacity>
            {expanded[coffee] && (
              <View style={styles.optionsContainer}>
                <TouchableOpacity onPress={() => handleHistoryPress(coffee)} style={styles.subMenu}>
                  <Text style={styles.subMenuText}>History</Text>
                  {subExpanded[`history-${coffee}`] && (
                    <Text style={styles.historyText}>{historyText}</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleExpand(`description-${coffee}`, 'sub')} style={styles.subMenu}>
                  <Text style={styles.subMenuText}>Description</Text>
                </TouchableOpacity>
                {coffee !== "Latte" ? (
                  <TouchableOpacity onPress={() => toggleExpand(`demonstration-${coffee}`, 'sub')} style={styles.subMenu}>
                    <Text style={styles.subMenuText}>Extraction Methodology</Text>
                    {subExpanded[`demonstration-${coffee}`] && (
                      <View>
                        <TouchableOpacity onPress={() => toggleExpand(`Moka-${coffee}`, 'demo')} style={styles.demoLevel}>
                          <Text style={demoLevel[`Moka-${coffee}`] ? styles.demoLevelSelected : styles.demoLevelText}>Moka</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleExpand(`Filter Coffee-${coffee}`, 'demo')} style={styles.demoLevel}>
                          <Text style={demoLevel[`Filter Coffee-${coffee}`] ? styles.demoLevelSelected : styles.demoLevelText}>Filter Coffee</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleExpand(`Professional Coffee Machine-${coffee}`, 'demo')} style={styles.demoLevel}>
                          <Text style={demoLevel[`Professional Coffee Machine-${coffee}`] ? styles.demoLevelSelected : styles.demoLevelText}>Professional Coffee Machine</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => toggleExpand(`demonstration-${coffee}`, 'sub')} style={styles.subMenu}>
                    <Text style={styles.subMenuText}>Demonstration</Text>
                    {subExpanded[`demonstration-${coffee}`] && (
                      <View>
                        <TouchableOpacity onPress={() => toggleExpand(`Beginner-${coffee}`, 'demo')} style={styles.demoLevel}>
                          <Text style={demoLevel[`Beginner-${coffee}`] ? styles.demoLevelSelected : styles.demoLevelText}>Beginner</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleExpand(`Intermediate-${coffee}`, 'demo')} style={styles.demoLevel}>
                          <Text style={demoLevel[`Intermediate-${coffee}`] ? styles.demoLevelSelected : styles.demoLevelText}>Intermediate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleExpand(`Advanced-${coffee}`, 'demo')} style={styles.demoLevel}>
                          <Text style={demoLevel[`Advanced-${coffee}`] ? styles.demoLevelSelected : styles.demoLevelText}>Advanced</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => toggleExpand(`practice-${coffee}`, 'sub')} style={styles.practiceContainer}>
                  <Text style={styles.practiceText}>Practice</Text>
                  {subExpanded[`practice-${coffee}`] && (
                    <View style={styles.practiceSection}>
                      <Text style={styles.practiceDescription}>
                        Practice (Baristart Plus – 4,99€/Month)
                        {"\n"}Record yourself, make a video shorter than 59 seconds. One of our master barista will evaluate your skill.
                      </Text>
                      <TouchableOpacity style={styles.uploadButton} disabled>
                        <Text style={styles.uploadButtonText}>Upload</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleExpand(`Test-${coffee}`, 'sub')} style={styles.subMenu}>
                  <Text style={styles.subMenuText}>Test</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: 105,
    paddingBottom: 0,
  },
  coffeeItem: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  coffeeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002868',
  },
  optionsContainer: {
    backgroundColor: '#e6e6e6',
  },
  subMenu: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  subMenuText: {
    fontSize: 16,
    color: '#555',
  },
  practiceContainer: {
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  practiceText: {
    fontSize: 16,
    color: 'rgba(85, 85, 85, 0.8)',
    marginBottom: 5,
  },
  practiceSection: {
    marginTop: 10,
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  practiceDescription: {
    fontSize: 14,
    color: 'rgba(49, 112, 143, 0.8)',
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: 'rgba(74, 144, 226, 0.8)',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  demoLevel: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  demoLevelText: {
    color: '#555',
  },
  demoLevelSelected: {
    color: '#800000',
    fontWeight: 'bold',
  },
  historyText: {
    backgroundColor: '#ffffff',
    padding: 10,
    fontSize: 14,
    color: '#555',
  },
});

export default HomePage;
