import { COLORS } from '@/constants/Colors';
import React, { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

interface CarouselProps {
  data: React.ReactNode[];
  height?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicator?: boolean;
}

export const Carousel = ({
  data,
  height = 180,
  autoPlay = false,
  autoPlayInterval = 3000,
  showIndicator = true,
}: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < data.length) {
      setActiveIndex(newIndex);
    }
  }, [activeIndex, data.length]);

  const scrollToIndex = useCallback((index: number) => {
    if (scrollViewRef.current && index >= 0 && index < data.length) {
      scrollViewRef.current.scrollTo({
        x: index * width,
        animated: true,
      });
    }
  }, [data.length]);

  React.useEffect(() => {
    if (autoPlay && data.length > 1) {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
      
      autoPlayTimeoutRef.current = setTimeout(() => {
        const newIndex = (activeIndex + 1) % data.length;
        setActiveIndex(newIndex);
        scrollToIndex(newIndex);
      }, autoPlayInterval) as unknown as NodeJS.Timeout;

      return () => {
        if (autoPlayTimeoutRef.current) {
          clearTimeout(autoPlayTimeoutRef.current);
        }
      };
    }
  }, [activeIndex, autoPlay, autoPlayInterval, data.length, scrollToIndex]);

  return (
    <View style={[styles.container, { height }]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {data.map((item, index) => (
          <View key={index} style={[styles.item, { width }]}>
            {item}
          </View>
        ))}
      </ScrollView>

      {showIndicator && data.length > 1 && (
        <View style={styles.indicatorContainer}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === activeIndex && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    // Add this to fix Android rendering issues
    ...(Platform.OS === 'android' && { flexGrow: 1 }),
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(150, 150, 150, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: COLORS.primary,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
}); 