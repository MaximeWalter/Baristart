import React, { useState, useEffect } from 'react';
import { Animated, View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal, TextInput, Linking } from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Header from '../components/Header';
import { getFirestore, getDoc, doc, collection, getDocs } from 'firebase/firestore';
import { Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOpacity, setModalOpacity] = useState(new Animated.Value(0)); // Ajout pour l'opacité du modal

  useEffect(() => {

    const fetchShopData = async () => {
      const firestore = getFirestore();
      
      const shopCollectionRef = collection(firestore, 'Shop');

      try {
        const productsData = [];
        const querySnapshot = await getDocs(shopCollectionRef);
        querySnapshot.forEach((doc) => {
          console.log("Data is here ??",doc.id, ' => ', doc.data());
          // Here you can handle each document's data
          const productData = doc.data();
          productsData.push(productData);
        });
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching shop data:', error);
      }
    }

    fetchShopData();
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisible(true);
    }, 10000); 
  
    return () => clearTimeout(timer);
  }, []);
  

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(modalOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      modalOpacity.setValue(0);
    }
  }, [modalVisible, modalOpacity]);


  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productPrice}>{`${item.prix}€`}</Text>
      <Text style={styles.productName}>{item.nom}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
    </View>
  );

  const handlePressShop = () => {
    Linking.openURL('https://shop.dersut.it/categoria-prodotto/caffe/caffe-in-grani/');
  };

  return (
    <View style={styles.container}>
     <Header /> 
     <View style={styles.discountBanner}>
      <Text style={styles.discountText}>
        Enjoy a 10% discount with code "Baristart10" - Shop Now!
      </Text>
    </View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
         <Animated.View style={[styles.modalView, {opacity: modalOpacity}]}>
         <View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textStyle}>×</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Subscribe to the Newsletter</Text>
          <Text style={styles.description}>
            Receive the latest news, details on exclusive offers on our products.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Subscribe</Text>
          </TouchableOpacity>
         </View>
         </Animated.View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContainer: {
    paddingTop: 130,
    paddingBottom: 0,
  },
  productContainer: {
    backgroundColor: 'rgba(245, 245, 245, 0.1)', // Translucide
    borderWidth: 10,
    borderColor: '#ddd', 
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, // Ombre plus subtile
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 150, 
    height: 150, 
    resizeMode: 'contain',
    marginBottom: 8, 
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', 
    marginTop: 4, 
  },
  productDescription: {
    fontSize: 14,
    textAlign: 'center', 
    marginTop: 4, 
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingTop: 100,
  },
  shopContent: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002868',
    marginBottom: 15,
  },
  descriptionShop: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonShop: {
    backgroundColor: '#BF0A30',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  modalView: {
    left: '10%',
    top: '25%',
    width: width * 0.8, 
    height: width * 0.8, 
    backgroundColor: "white",
    borderRadius: 20,
    padding:5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 10,
  },
  
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002868',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    marginBottom: 20,
    alignSelf: 'center', 
  },
  button: {
    backgroundColor: '#BF0A30',
    padding: 10,
    borderRadius: 5,
    width: '60%', 
    alignSelf: 'center', 

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  discountBanner: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#BF0A30',
    marginTop: 100,
    zIndex: 1, 
  },
  discountText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ShopPage;