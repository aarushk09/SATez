import { PracticeCard } from '@/components/PracticeCard';
import { VocabQuestion } from '@/components/Vocab';
import { COLORS, SHADOWS, SIZES } from '@/constants/Colors';
import { practiceTests } from '@/constants/mockData';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type PracticeCategory = 'full' | 'drill' | 'quiz';

export default function PracticeScreen() {
  const [activeTab, setActiveTab] = useState<PracticeCategory>('full');
  const router = useRouter();

  const filteredTests = practiceTests.filter(test => test.type === activeTab);

  const handleCardPress = (id: string) => {
    // Navigate to quiz screen with the selected quiz ID
    router.push(`/quiz?id=${id}`);
  };

  const renderTabButton = (title: string, value: PracticeCategory) => {
    const isActive = activeTab === value;
    return (
      <TouchableOpacity
        style={[
          styles.tabButton,
          isActive && styles.activeTabButton,
        ]}
        onPress={() => setActiveTab(value)}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ selected: isActive }}
      >
        <Text
          style={[
            styles.tabButtonText,
            isActive && styles.activeTabButtonText,
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Practice</Text>
        <Text style={styles.subtitle}>Sharpen your skills with practice tests and quizzes</Text>
      </View>

      <View style={styles.tabsContainer}>
        {renderTabButton('Full-Length Tests', 'full')}
        {renderTabButton('Timed Drills', 'drill')}
        {renderTabButton('Quick Quizzes', 'quiz')}
      </View>

      {/* <ScrollView 
        style={styles.testsList} 
        contentContainerStyle={styles.testsListContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredTests.length > 0 ? (
          filteredTests.map(test => (
            <PracticeCard
              key={test.id}
              id={test.id}
              title={test.title}
              description={test.description}
              timeEstimate={test.timeEstimate}
              difficulty={test.difficulty as 'Easy' | 'Medium' | 'Hard'}
              progress={test.progress}
              onPress={() => handleCardPress(test.id)}
            />
          ))}
        // ) : (
        //   <View style={styles.emptyState}>
        //     <Text style={styles.emptyStateText}>No tests available in this category yet.</Text>
        //   </View>
        // )}
      </ScrollView> */}
      <ScrollView
        style={styles.testsList}
        contentContainerStyle={styles.testsListContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredTests.map(test => (
          <PracticeCard 
            key={test.id}
            id={test.id}
            title={test.title}
            description={test.description}
            timeEstimate={test.timeEstimate}
            difficulty={test.difficulty as 'Easy' | 'Medium' | 'Hard'}
            progress={test.progress}
            onPress={() => handleCardPress(test.id)}
          />
        ))}
        
        {activeTab==='full' && (
          <VocabQuestion
            title="Full Length Vocabulary Practice Questions"
            description="All words that appear on the SAT"
            image={require('@/assets/images/favicon.png')}
            onPress={() => router.push("/(tabs)/vocabpractice")}
          />
        )}

        {activeTab==='full' && (
          <VocabQuestion
            title="Full Length Reading Practice Questions"
            description="All Questions that appear on the SAT"
            image={require('@/assets/images/favicon.png')}
            onPress={() => router.push("/(tabs)/readingpractice")}
          />
        )}

        {filteredTests.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No Tests Available In This Category</Text>
          </View>
        )}
      </ScrollView>
      {/* <ScrollView 
        style={styles.testsList}
        contentContainerStyle={styles.testsListContent}
        showsVerticalScrollIndicator={false}
      >
        <VocabQuestion />
      </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  tabsContainer: {
    flexDirection: 'row',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 8,
    backgroundColor: COLORS.background,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.smallRadius,
    backgroundColor: COLORS.card,
    paddingHorizontal: 8,
  },
  activeTabButton: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.small,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  activeTabButtonText: {
    color: '#FFF',
  },
  testsList: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  testsListContent: {
    padding: SIZES.padding,
    paddingBottom: 40,
  },
  emptyState: {
    padding: SIZES.padding * 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});
