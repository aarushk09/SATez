export const practiceTests = [
    {
      id: '1',
      title: 'Full SAT Practice Test #1',
      description: 'Complete practice test with all sections',
      timeEstimate: '3 hours',
      difficulty: 'Medium',
      progress: 0,
      type: 'full',
    },
    {
      id: '2',
      title: 'Full SAT Practice Test #2',
      description: 'Official College Board practice test',
      timeEstimate: '3 hours',
      difficulty: 'Medium',
      progress: 25,
      type: 'full',
    },
    {
      id: '3',
      title: 'Full Vocab Practice',
      description: 'Official College Board Vocab Test',
      timeEstimate: '5 hours',
      difficulty: 'Medium',
      progress: 10,
      type: 'full'
    },
    {
      id: '4',
      title: 'Reading & Writing Section',
      description: 'Practice for the verbal section',
      timeEstimate: '65 minutes',
      difficulty: 'Medium',
      progress: 75,
      type: 'section',
    },
    {
      id: '5',
      title: 'Math No-Calculator Drill',
      description: 'Quick math practice without calculators',
      timeEstimate: '25 minutes',
      difficulty: 'Hard',
      progress: 100,
      type: 'drill',
    },
    {
      id: '6',
      title: 'Vocabulary Quiz',
      description: 'Test your knowledge of common SAT vocabulary',
      timeEstimate: '15 minutes',
      difficulty: 'Easy',
      progress: 0,
      type: 'quiz',
    },
    {
      id: '7',
      title: 'Grammar Quick Quiz',
      description: 'Practice essential grammar concepts',
      timeEstimate: '10 minutes',
      difficulty: 'Easy',
      progress: 50,
      type: 'quiz',
    },
  ];
  
  export const resources = [
    {
      id: '1',
      title: 'Essential SAT Strategies',
      description: 'Top strategies to improve your score fast',
      image: require('../assets/images/react-logo.png'),
      category: 'tips',
    },
    {
      id: '2',
      title: 'Time Management Tips',
      description: 'How to manage your time during the test',
      image: require('../assets/images/react-logo.png'),
      category: 'tips',
    },
    {
      id: '3',
      title: 'Top 100 SAT Vocabulary Words',
      description: 'Most frequently appearing words on the test',
      image: require('../assets/images/react-logo.png'),
      category: 'vocabulary',
    },
    {
      id: '4',
      title: 'Math Formulas Cheat Sheet',
      description: 'All the formulas you need to memorize',
      image: require('../assets/images/react-logo.png'),
      category: 'math',
    },
    {
      id: '5',
      title: 'Grammar Rules to Remember',
      description: 'Common grammar mistakes to avoid',
      image: require('../assets/images/react-logo.png'),
      category: 'tips',
    },
  ];
  
  export const profileStats = {
    name: 'Alex Johnson',
    quizzesTaken: 27,
    averageScore: 680,
    streak: 5,
    totalHours: 42,
    completedTests: 3,
  };
  
  export const quizQuestions = [
    {
      id: '1',
      question: "The author's primary purpose in the passage is to:",
      options: [
        'argue against a popular scientific theory',
        'explain the origins of a natural phenomenon',
        'compare competing scientific explanations',
        'describe a recent scientific discovery',
      ],
      correctAnswer: 1,
    },
    {
      id: '2',
      question: 'Based on the passage, the research team was surprised to discover that:',
      options: [
        'the samples contained unexpected elements',
        'the testing method had significant flaws',
        'previous studies had overlooked key evidence',
        'their hypothesis contradicted established theories',
      ],
      correctAnswer: 0,
    },
    {
      id: '3',
      question: 'In the equation 2x² + 5x - 3 = 0, what is the value of x?',
      options: [
        'x = -3 or x = 1/2',
        'x = 3 or x = -1/2',
        'x = -3/2 or x = 1',
        'x = 3/2 or x = -1',
      ],
      correctAnswer: 2,
    },
  ];