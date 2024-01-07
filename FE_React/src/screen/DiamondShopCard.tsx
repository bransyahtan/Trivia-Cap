import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DiamondShopCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Diamond Shop</Text>
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

export default DiamondShopCard;
