import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Modal, Alert } from 'react-native';
import auth from 'firebase/auth';
import Header from '../components/Header';
import { useAuth } from '../AuthContext';
import { getFirestore, doc, getDoc } from '@firebase/firestore';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; 

const ProfilePage = () => {
  const [showBaristartPlusModal, setShowBaristartPlusModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    country: "",
    memberSince: "",
    progress: 0, 
  });
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const firestore = getFirestore();
    const fetchUserData = async (userId) => {
      try {
        const userDocRef = doc(firestore, '(default)', userId);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserInfo({
              name: userData.firstName + ' ' + userData.lastName,
              email: userData.email,
              country: userData.country,
              memberSince: userData.registrationDate,
              progress: userData.progress || 0,
            });
          return userData;
        } else {
          console.log('User document does not exist');
          return null;
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }
    };
    const userId = currentUser.uid;
    fetchUserData(userId);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const ProgressionBar = ({ progress, title, isLocked }) => (
    <View style={styles.progressionContainer}>
      <Text style={styles.progressionTitle}>{title}</Text>
      <View style={styles.progressBarBackground}>
        <View 
          style={[
            styles.progressBarFill, 
            { width: `${isLocked ? 0 : progress * 100}%` }
          ]} 
        />
      </View>
      {isLocked && <View style={styles.lockedOverlay} />}
    </View>
  );
  
  const TrophySilhouette = ({ color, isUnlocked }) => (
    <View style={[styles.trophySilhouette, { borderColor: isUnlocked ? color : '#ccc' }]}>
      {isUnlocked ? (
        <Text style={{ color }}>🏆</Text> // replace with a jug
      ) : (
        <Text style={{ color: '#ccc' }}>🏆</Text> // grey for locked trophy
      )}
    </View>
  );
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.avatarContainer}>
          <MaterialIcons name="account-circle" size={100} color="#cccccc" />
        </View>
        
        <View style={styles.transparentContainer}>
          <Text style={styles.infoText}>{userInfo.name}</Text>
          <Text style={styles.infoText}><MaterialIcons name="location-on" size={16} /> {userInfo.country}</Text>
          <Text style={styles.infoText}>Member Since: {userInfo.memberSince}</Text>
        </View>
  
        <View style={styles.transparentContainer}>
          <Text style={styles.progressionTitle}>Progression</Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, {width: `${userInfo.progress * 100}%`}]}></View>
          </View>
        </View>
  
        <View style={styles.transparentContainer}>
          <Text style={styles.progressionTitle}>Trophies</Text>
          <View style={styles.trophiesContainer}>
            <TrophySilhouette color="#FFFFFF" isUnlocked={false} />
            <TrophySilhouette color="#0000FF" isUnlocked={false} />
            <TrophySilhouette color="#EE82EE" isUnlocked={false} />
            <TrophySilhouette color="#A52A2A" isUnlocked={false} />
            <TrophySilhouette color="#000000" isUnlocked={false} />
          </View>
        </View>
  
        <TouchableOpacity style={styles.upgradeButton} onPress={() => setShowBaristartPlusModal(true)} >
         <Text style={styles.upgradeButtonText}>Upgrade to Baristart Plus 🏆</Text>
        </TouchableOpacity>

        <View style={styles.settingsLogoutContainer}>
          <TouchableOpacity style={styles.settingsButton} onPress={() => {}}>
            <MaterialIcons name="settings" size={24} color="black" />
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <MaterialIcons name="logout" size={24} color="black" />
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    scrollViewContent: {
      alignItems: 'center',
      padding: 20,
      paddingTop: 120, 
      paddingBottom: 0, 
    },
    avatarContainer: {
      marginBottom: 10,
    },
    infoContainer: {
      width: '90%',
      backgroundColor: '#ffffff',
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
    },
    infoText: {
      fontSize: 16,
      marginBottom: 5,
    },
    trophiesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: 20,
    },
    trophySilhouette: {
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderRadius: 25, 
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      marginBottom: 20,
      borderWidth: 0, 
      backgroundColor: 'transparent', 
    },
    buttonText: {
      color: '#000000', 
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    settingsLogoutContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: 20,
    },
    settingsButton: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'transparent', 
    },
    logoutButton: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'transparent', 
    },
    progressionTitle: {
      fontSize: 16,
      marginBottom: 4,
    },
    progressBarBackground: {
      width: '100%', 
      height: 10,
      backgroundColor: '#ddd',
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 10,

    },
    progressBarFill: {
      height: '100%',
      backgroundColor: '#BF0A30', 
      borderRadius: 10,
    },
    transparentContainer: {
      width: '90%',
      alignItems: 'center',
      backgroundColor: '#fafafa', 
      marginBottom: 10,
    },
    upgradeButtonGradient: {
      borderRadius: 5, 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 6,
    },
    upgradeButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      backgroundColor: '#FFD700', // Un doré standard, ajuste selon tes préférences
      marginBottom: 20,
      borderWidth: 0,
      shadowColor: '#000', // Couleur de l'ombre
      shadowOffset: { width: 0, height: 4 }, // Décalage de l'ombre
      shadowOpacity: 0.3, // Opacité de l'ombre
      shadowRadius: 5, // Rayon du flou de l'ombre
      elevation: 6, // Élévation pour Android pour l'effet de surélévation
    },
    upgradeButtonText: {
      color: '#ffffff', // Texte blanc pour contraster avec le fond doré
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.75)', // Ombre du texte pour améliorer la lisibilité
      textShadowOffset: { width: -1, height: 1 }, // Décalage de l'ombre du texte
      textShadowRadius: 10, // Rayon du flou de l'ombre du texte
    },
});

export default ProfilePage;