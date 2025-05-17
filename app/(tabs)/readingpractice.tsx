import Questions from '@/data/sat_questions_parsed.json'; // Ensure the path is correct
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const { width, height } = Dimensions.get('window');

const ReadingPractice: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<any | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  // Function to get a random question
  const getRandomQuestion = () => {
    if (!Questions || !Questions.questions || !Array.isArray(Questions.questions) || Questions.questions.length === 0) {
      setError("No questions available in the dataset");
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * Questions.questions.length);
    return Questions.questions[randomIndex];
  };

  const loadQuestion = () => {
    setLoading(true);
    setShowAnswer(false);
    setSelectedOption(null);
    
    try {
      const question = getRandomQuestion();
      if (question) {
        setCurrentQuestion(question);
        setLoading(false);
      } else {
        setError("Failed to load a question");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error loading question:", err);
      setError("Failed to load question data");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    loadQuestion();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading question...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadQuestion}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          {currentQuestion ? (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>{currentQuestion.domain || "Reading and Writing"}</Text>
                <View style={styles.difficultyBadge}>
                  <Text style={styles.difficultyText}>
                    {currentQuestion.difficulty || "SAT"}
                  </Text>
                </View>
              </View>

              {/* Question description/passage */}
              {currentQuestion.questionDescription && (
                <View style={styles.passageContainer}>
                  <Text style={styles.passageTitle}>Passage:</Text>
                  <Text style={styles.passage}>{currentQuestion.questionDescription}</Text>
                </View>
              )}

              {/* Question */}
              <View style={styles.questionContainer}>
                <Text style={styles.question}>
                  {currentQuestion.question || "No question available"}
                </Text>
              </View>

              {/* Answer Choices */}
              {currentQuestion.options && (
                <View style={styles.optionsContainer}>
                  {Object.entries(currentQuestion.options).map(([key, value]) => (
                    <TouchableOpacity
                      key={key}
                      style={[
                        styles.optionButton,
                        selectedOption === key && styles.selectedOption,
                        showAnswer && 
                          key === currentQuestion.correctAnswer && 
                          styles.correctOption,
                        showAnswer && 
                          selectedOption === key && 
                          key !== currentQuestion.correctAnswer && 
                          styles.incorrectOption
                      ]}
                      onPress={() => handleOptionSelect(key)}
                      disabled={showAnswer}
                    >
                      <Text style={styles.optionKey}>{key}</Text>
                      <Text style={styles.optionText}>{value as string}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Explanation */}
              {showAnswer && currentQuestion.rationale && (
                <View style={styles.explanationContainer}>
                  <Text style={styles.explanationTitle}>Explanation:</Text>
                  <Text style={styles.explanation}>
                    {currentQuestion.rationale}
                  </Text>
                </View>
              )}

              <View style={styles.buttonsContainer}>
                {!showAnswer ? (
                  <TouchableOpacity
                    style={[styles.button, !selectedOption && styles.buttonDisabled]}
                    onPress={handleCheckAnswer}
                    disabled={!selectedOption}
                  >
                    <Text style={styles.buttonText}>Check Answer</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleNextQuestion}
                  >
                    <Text style={styles.buttonText}>Next Question</Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          ) : (
            <View style={styles.noQuestionsContainer}>
              <Text style={styles.noQuestionsText}>
                No questions available.
              </Text>
              <TouchableOpacity style={styles.button} onPress={loadQuestion}>
                <Text style={styles.buttonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f8fa",
  },
  scrollView: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.75,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#3498db",
  },
  container: {
    minHeight: height * 0.75,
    width: width,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#3498db",
  },
  difficultyText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  passageContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  passageTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  passage: {
    fontSize: 16,
    lineHeight: 24,
    color: "#2c3e50",
  },
  questionContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  question: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 26,
    color: "#2c3e50",
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    alignItems: "flex-start",
  },
  selectedOption: {
    backgroundColor: "#e1f0ff",
    borderColor: "#3498db",
    borderWidth: 1,
  },
  correctOption: {
    backgroundColor: "#d4edda",
    borderColor: "#28a745",
    borderWidth: 1,
  },
  incorrectOption: {
    backgroundColor: "#f8d7da",
    borderColor: "#dc3545",
    borderWidth: 1,
  },
  optionKey: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    lineHeight: 30,
    marginRight: 15,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  optionText: {
    fontSize: 16,
    color: "#2c3e50",
    flex: 1,
  },
  explanationContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#3498db",
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2c3e50",
  },
  explanation: {
    fontSize: 16,
    lineHeight: 24,
    color: "#2c3e50",
  },
  buttonsContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#b2d3ea",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  retryButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
  },
  noQuestionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noQuestionsText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: {
    color: "#dc3545",
    fontSize: 18,
    textAlign: "center",
  },
});

export default ReadingPractice;