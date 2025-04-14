import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
}

const questions: Question[] = [
    {
        id: 1,
        question: "If a train travels 360 kilometers in 4 hours, what is its speed in kilometers per hour?",
        options: ["80 km/h", "90 km/h", "85 km/h", "95 km/h"],
        correctAnswer: 0
    },
    {
        id: 2,
        question: "What comes next in the sequence: 2, 6, 12, 20, ?",
        options: ["30", "28", "32", "26"],
        correctAnswer: 0
    },
    {
        id: 3,
        question: "If 5 workers can complete a task in 12 days, how many days will it take 3 workers to complete the same task?",
        options: ["20 days", "15 days", "18 days", "22 days"],
        correctAnswer: 0
    },
    {
        id: 4,
        question: "A car depreciates by 15% annually. What will be its value after 2 years if the original price was ₹500,000?",
        options: ["₹361,250", "₹425,000", "₹350,000", "₹375,500"],
        correctAnswer: 0
    },
    {
        id: 5,
        question: "If the ratio of boys to girls in a class is 3:2 and there are 30 boys, how many students are there in total?",
        options: ["50", "45", "55", "40"],
        correctAnswer: 0
    },
    {
        id: 6,
        question: "A pipe can fill a tank in 8 hours. Another pipe can empty it in 12 hours. If both pipes are opened together, in how many hours will the tank be filled?",
        options: ["24 hours", "16 hours", "20 hours", "18 hours"],
        correctAnswer: 0
    },
    {
        id: 7,
        question: "What percentage of 250 is 75?",
        options: ["30%", "25%", "35%", "40%"],
        correctAnswer: 0
    },
    {
        id: 8,
        question: "If the cost price of an article is ₹800 and it is sold at a profit of 25%, what is the selling price?",
        options: ["₹1000", "₹950", "₹1050", "₹900"],
        correctAnswer: 0
    },
    {
        id: 9,
        question: "The average of five numbers is 45. If one number is excluded, the average becomes 40. What is the excluded number?",
        options: ["65", "60", "55", "70"],
        correctAnswer: 0
    },
    {
        id: 10,
        question: "A train 150 meters long passes a platform 150 meters long in 15 seconds. What is the speed of the train in meters per second?",
        options: ["20 m/s", "25 m/s", "30 m/s", "15 m/s"],
        correctAnswer: 0
    },
    {
        id: 11,
        question: "If x% of y is 90 and y% of x is 60, then what is the value of x?",
        options: ["30", "40", "50", "60"],
        correctAnswer: 0
    },
    {
        id: 12,
        question: "The simple interest on a sum for 3 years at 8% per annum is ₹3,600. What is the principal amount?",
        options: ["₹15,000", "₹12,000", "₹18,000", "₹20,000"],
        correctAnswer: 0
    },
    {
        id: 13,
        question: "A boat can travel 20 km upstream in 4 hours and the same distance downstream in 2 hours. What is the speed of the current?",
        options: ["2.5 km/h", "3 km/h", "3.5 km/h", "4 km/h"],
        correctAnswer: 0
    },
    {
        id: 14,
        question: "What is the probability of getting a sum of 7 when two dice are rolled?",
        options: ["1/6", "5/36", "7/36", "1/4"],
        correctAnswer: 0
    },
    {
        id: 15,
        question: "If 3x + 4y = 25 and 2x + 3y = 18, what is the value of x?",
        options: ["5", "4", "3", "6"],
        correctAnswer: 0
    },
    {
        id: 16,
        question: "A clock shows 3:30. What is the angle between the hour and minute hands?",
        options: ["75°", "80°", "85°", "70°"],
        correctAnswer: 0
    },
    {
        id: 17,
        question: "The compound interest on ₹8,000 for 2 years at 10% per annum is?",
        options: ["₹1,680", "₹1,600", "₹1,720", "₹1,640"],
        correctAnswer: 0
    },
    {
        id: 18,
        question: "If the perimeter of a square is 40 cm, what is its area?",
        options: ["100 sq cm", "80 sq cm", "120 sq cm", "90 sq cm"],
        correctAnswer: 0
    },
    {
        id: 19,
        question: "A mixture contains alcohol and water in the ratio 2:3. If 5 liters of water is added, the ratio becomes 2:4. How many liters of alcohol is in the mixture?",
        options: ["10 liters", "8 liters", "12 liters", "15 liters"],
        correctAnswer: 0
    },
    {
        id: 20,
        question: "If log 2 = 0.301 and log 3 = 0.477, then what is the value of log 72?",
        options: ["1.857", "1.778", "1.954", "1.845"],
        correctAnswer: 0
    }
];

const AptitudeTest = () => {
    const router = useRouter();
    const { testId } = router.query;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
    const [testSubmitted, setTestSubmitted] = useState(false);

    useEffect(() => {
        if (!testId) return;

        // Start the timer
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmitTest();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [testId]);

    const handleAnswerSelect = (answerIndex: number) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestion] = answerIndex;
        setSelectedAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmitTest = async () => {
        // Calculate score
        const score = selectedAnswers.reduce((total, answer, index) => {
            return total + (answer === questions[index].correctAnswer ? 1 : 0);
        }, 0);

        // Save test result
        const result = {
            testId,
            score,
            totalQuestions: questions.length,
            timestamp: new Date().toISOString(),
            answers: selectedAnswers
        };

        // Store result in localStorage for test history
        const testHistory = JSON.parse(localStorage.getItem('testHistory') || '[]');
        testHistory.push(result);
        localStorage.setItem('testHistory', JSON.stringify(testHistory));

        setTestSubmitted(true);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    if (!testId) return null;

    if (testSubmitted) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Head>
                    <title>Test Completed - MET BKC</title>
                </Head>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 text-center"
                >
                    <h1 className="text-2xl font-bold text-green-600 mb-4">Test Completed!</h1>
                    <p className="text-gray-600 mb-4">
                        Your test has been submitted successfully. You can view your results in the Test History section.
                    </p>
                    <button
                        onClick={() => router.push('/test-history')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        View Results
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Head>
                <title>Aptitude Test - MET BKC</title>
            </Head>

            <div className="max-w-3xl mx-auto">
                {/* Timer and Progress */}
                <div className="flex justify-between items-center mb-6">
                    <div className="text-lg font-semibold">
                        Question {currentQuestion + 1} of {questions.length}
                    </div>
                    <div className="text-lg font-semibold text-red-600">
                        Time Left: {formatTime(timeLeft)}
                    </div>
                </div>

                {/* Question Card */}
                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-lg shadow-lg p-6 mb-6"
                >
                    <h2 className="text-xl font-semibold mb-4">
                        {questions[currentQuestion].question}
                    </h2>

                    <div className="space-y-3">
                        {questions[currentQuestion].options.map((option, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-md cursor-pointer transition-colors
                                    ${selectedAnswers[currentQuestion] === index
                                        ? 'bg-blue-100 border-2 border-blue-500'
                                        : 'bg-gray-50 hover:bg-gray-100'
                                    }`}
                                onClick={() => handleAnswerSelect(index)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    <button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestion === 0}
                        className={`px-6 py-2 rounded-md ${currentQuestion === 0
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                    >
                        Previous
                    </button>

                    {currentQuestion === questions.length - 1 ? (
                        <button
                            onClick={handleSubmitTest}
                            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                        >
                            Submit Test
                        </button>
                    ) : (
                        <button
                            onClick={handleNextQuestion}
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AptitudeTest; 