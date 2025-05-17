import VocabWords from '@/data/vocab.json';
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

type Option = {
    key: string;
    description: string;
    isCorrect: boolean;
};

type VocabWord = {
    word: string;
    sentence: string;
};

const VocabPractice: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentWord, setCurrentWord] = useState<VocabWord | null>(null);
    const [options, setOptions] = useState<Option[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);

    const getRandomWord = (): VocabWord | null => {
        if (!VocabWords || !Array.isArray(VocabWords) || VocabWords.length === 0) {
            setError("No vocabulary words available");
            return null;
        }
        
        const randomIndex = Math.floor(Math.random() * VocabWords.length);
        return VocabWords[randomIndex];
    };

    const getRandomWrongDescriptions = (correctWord: VocabWord): string[] => {
        if (!VocabWords || !Array.isArray(VocabWords) || VocabWords.length < 4) {
            setError("Not enough vocabulary words for options");
            return [];
        }
        
        let wrongDescriptions: string[] = [];
        let usedIndices = new Set([VocabWords.findIndex(word => word.word === correctWord.word)]);
        
        while (wrongDescriptions.length < 3) {
            const randomIndex = Math.floor(Math.random() * VocabWords.length);
            if (!usedIndices.has(randomIndex)) {
                usedIndices.add(randomIndex);
                wrongDescriptions.push(VocabWords[randomIndex].sentence);
            }
        }
        
        return wrongDescriptions;
    };

    const createOptions = (word: VocabWord): Option[] => {
        if (!word) return [];
        const wrongDescriptions = getRandomWrongDescriptions(word);
        
        return [
            { key: "A", description: word.sentence, isCorrect: true },
            { key: "B", description: wrongDescriptions[0], isCorrect: false },
            { key: "C", description: wrongDescriptions[1], isCorrect: false },
            { key: "D", description: wrongDescriptions[2], isCorrect: false },
        ].sort(() => Math.random() - 0.5);
    };

    const loadWord = () => {
        setLoading(true);
        setShowAnswer(false);
        setSelectedOption(null);
        
        try {
            const word = getRandomWord();
            if (word) {
                setCurrentWord(word);
                setOptions(createOptions(word));
                setLoading(false);
            } else {
                setError("Failed to load a vocabulary word");
                setLoading(false);
            }
        } catch (err) {
            setError("Failed to load vocabulary data");
            setLoading(false);
            console.log(err);
        }
    };

    useEffect(() => {
        loadWord();
    }, []);

    const handleOptionSelect = (key: string) => {
        setSelectedOption(key);
    };

    const handleCheckAnswer = () => {
        setShowAnswer(true);
    };

    const handleNextWord = () => {
        loadWord();
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2E5BFF" />
                <Text style={styles.loadingText}>Loading vocabulary...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={loadWord}>
                    <Text style={styles.buttonText}>Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    {currentWord ? (
                        <>
                            <View style={styles.header}>
                                <Text style={styles.title}>Vocabulary Practice</Text>
                                <View style={styles.difficultyBadge}>
                                    <Text style={styles.difficultyText}>SAT</Text>
                                </View>
                            </View>

                            <View style={styles.wordContainer}>
                                <Text style={styles.wordTitle}>Word:</Text>
                                <Text style={styles.word}>{currentWord.word}</Text>
                            </View>

                            <View style={styles.questionContainer}>
                                <Text style={styles.question}>
                                    Which of the following correctly defines this word?
                                </Text>
                            </View>

                            <View style={styles.optionsContainer}>
                                {options.map((option) => (
                                    <TouchableOpacity
                                        key={option.key}
                                        style={[
                                            styles.optionButton,
                                            selectedOption === option.key && styles.selectedOption,
                                            showAnswer && option.isCorrect && styles.correctOption,
                                            showAnswer && 
                                                selectedOption === option.key && 
                                                !option.isCorrect && 
                                                styles.incorrectOption
                                        ]}
                                        onPress={() => handleOptionSelect(option.key)}
                                        disabled={showAnswer}
                                    >
                                        <Text style={styles.optionKey}>{option.key}</Text>
                                        <Text style={styles.optionText}>{option.description}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {showAnswer && (
                                <View style={styles.explanationContainer}>
                                    <Text style={styles.explanationTitle}>Definition:</Text>
                                    <Text style={styles.explanation}>
                                        {currentWord.sentence}
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
                                        onPress={handleNextWord}
                                    >
                                        <Text style={styles.buttonText}>Next Word</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </>
                    ) : (
                        <View style={styles.noQuestionsContainer}>
                            <Text style={styles.noQuestionsText}>
                                No vocabulary words available.
                            </Text>
                            <TouchableOpacity style={styles.button} onPress={loadWord}>
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
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flexGrow: 1,
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: height * 0.75,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#2E5BFF',
    },
    container: {
        minHeight: height * 0.75,
        width: width,
        padding: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E4E9F2',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#1A1A2E',
        flex: 1,
    },
    difficultyBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: '#2E5BFF',
    },
    difficultyText: {
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: "bold",
    },
    wordContainer: {
        backgroundColor: '#2E5BFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        alignItems: "center",
    },
    wordTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#FFFFFF',
        marginBottom: 4,
    },
    word: {
        fontSize: 32,
        fontWeight: "bold",
        color: '#FFFFFF',
        textAlign: "center",
    },
    questionContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    question: {
        fontSize: 18,
        fontWeight: "500",
        lineHeight: 26,
        color: '#1A1A2E',
    },
    optionsContainer: {
        marginBottom: 16,
    },
    optionButton: {
        flexDirection: "row",
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
        alignItems: "flex-start",
    },
    selectedOption: {
        backgroundColor: '#E1F0FF',
        borderColor: '#2E5BFF',
        borderWidth: 1,
    },
    correctOption: {
        backgroundColor: '#D4EDDA',
        borderColor: '#00C48C',
        borderWidth: 1,
    },
    incorrectOption: {
        backgroundColor: '#F8D7DA',
        borderColor: '#FF647C',
        borderWidth: 1,
    },
    optionKey: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#F4F6FA',
        textAlign: "center",
        lineHeight: 30,
        marginRight: 16,
        fontWeight: "bold",
        color: '#1A1A2E',
        fontSize: 16,
    },
    optionText: {
        fontSize: 16,
        color: '#1A1A2E',
        flex: 1,
    },
    explanationContainer: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#2E5BFF',
    },
    explanationTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: '#1A1A2E',
    },
    explanation: {
        fontSize: 16,
        lineHeight: 24,
        color: '#1A1A2E',
    },
    buttonsContainer: {
        marginTop: 16,
    },
    button: {
        backgroundColor: '#2E5BFF',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    buttonDisabled: {
        backgroundColor: '#8F9BB3',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: "bold",
    },
    retryButton: {
        backgroundColor: '#2E5BFF',
        paddingVertical: 16,
        borderRadius: 12,
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    noQuestionsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    noQuestionsText: {
        fontSize: 18,
        color: '#8F9BB3',
        textAlign: "center",
        marginBottom: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#FF647C',
        textAlign: "center",
    },
});

export default VocabPractice;