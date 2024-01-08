import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const DiamondShopCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <Image
        source={require('../../assets/images/diamond.png')} // 
        style={styles.image}
      />
      <Text style={styles.title}>Diamond Shop</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '45%',
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 70, 
    height: 70,
    marginBottom: 10,
  },
});

export default DiamondShopCard;
