import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AvatarShopCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <Image
        source={require('../../assets/avatar/avatar6.png')} // 
        style={styles.image}
      />
      <Text style={styles.title}>Avatar Shop</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    borderRadius : 50,
    width: 70, 
    height: 70,
    marginBottom: 10,
  },
});

export default AvatarShopCard;
