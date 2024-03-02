import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import ukFlag from '../assets/flags/ukFlag.png';
import franceFlag from '../assets/flags/franceFlag.png';
import italyFlag from '../assets/flags/italyFlag.png';
const Header = () => {
  const [showLanguages, setShowLanguages] = useState(false);

   return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Baristart ☕</Text>
      <View style={styles.languageSelector}>
      <TouchableOpacity onPress={() => setShowLanguages(!showLanguages)} style={styles.flagButton}>
        <Image source={ukFlag} style={styles.flag} />
      </TouchableOpacity>
      {showLanguages && (
        <View style={styles.languagesDropdown}>
          <TouchableOpacity onPress={() => {/* Logic for changing to French */}}>
            <Image source={franceFlag} style={styles.flag} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {/* Logic for changing to Italian */}}>
            <Image source={italyFlag} style={styles.flag} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 105,
    width: Dimensions.get('window').width,
    backgroundColor: '#002868', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 25,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 0,
    zIndex: 1
  },
  headerText: {
    fontSize: 28,
    fontFamily: 'serif',
    color: '#FFFFFF', 
    fontWeight: 'bold',
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languagesDropdown: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
  flag: {
    width: 30, 
    height: 20, 
    resizeMode: 'contain',
    marginVertical: 5,
  },
});

export default Header;
