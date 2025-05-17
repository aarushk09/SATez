import { COLORS, SHADOWS, SIZES } from '@/constants/Colors';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type VocabCardProps = {
  title: string;
  description: string;
  image: any;
  onPress: () => void;
};

export const VocabQuestion = ({ title, description, image, onPress }: VocabCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: SIZES.padding,
    marginBottom: 16,
    borderRadius: '50',
    backgroundColor: COLORS.card,
    ...SHADOWS.small,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  description: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
});
