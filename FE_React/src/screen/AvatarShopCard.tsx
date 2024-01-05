import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AvatarShopCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Avatar Shop</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '45%',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
});

export default AvatarShopCard;
