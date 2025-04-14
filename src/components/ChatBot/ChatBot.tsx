import React, { useState, useRef, useEffect } from 'react';
import { IoMdSend } from 'react-icons/io';
import { BsChatDotsFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    text: string;
    isBot: boolean;
    timestamp: Date;
    options?: string[];
}

const STORAGE_KEY = 'chatbot_state';

const ChatBot: React.FC = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                return parsed.isOpen || false;
            }
        }
        return false;
    });

    const [messages, setMessages] = useState<Message[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                return parsed.messages?.map((msg: any) => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                })) || [
                        {
                            text: "Hello! I'm your MET BKC assistant. How can I help you today?",
                            isBot: true,
                            timestamp: new Date(),
                            options: [
                                "1. Home",
                                "2. Admission Request",
                                "3. Feedback Form",
                                "4. Update Profile",
                                "5. Change Password",
                                "6. Hostel",
                                "7. Assignments",
                                "8. Internship",
                                "9. Grievance",
                                "10. Online Test",
                                "11. Online ESAT",
                                "12. E-Material",
                                "13. Course-PO-PSO"
                            ]
                        }
                    ];
            }
        }
        return [
            {
                text: "Hello! I'm your MET BKC assistant. How can I help you today?",
                isBot: true,
                timestamp: new Date(),
                options: [
                    "1. Home",
                    "2. Admission Request",
                    "3. Feedback Form",
                    "4. Update Profile",
                    "5. Change Password",
                    "6. Hostel",
                    "7. Assignments",
                    "8. Internship",
                    "9. Grievance",
                    "10. Online Test",
                    "11. Online ESAT",
                    "12. E-Material",
                    "13. Course-PO-PSO"
                ]
            }
        ];
    });

    const [inputMessage, setInputMessage] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [currentMenu, setCurrentMenu] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                return parsed.currentMenu || 'main';
            }
        }
        return 'main';
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);

    // Initialize speech recognition
    useEffect(() => {
        if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInputMessage(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                isOpen,
                messages,
                currentMenu
            }));
        }
    }, [isOpen, messages, currentMenu]);

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert('Speech recognition is not supported in your browser.');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    // Clear chat history when clicking close button
    const handleClose = () => {
        setIsOpen(false);
        setMessages([
            {
                text: "Hello! I'm your MET BKC assistant. How can I help you today?",
                isBot: true,
                timestamp: new Date(),
                options: [
                    "1. Home",
                    "2. Admission Request",
                    "3. Feedback Form",
                    "4. Update Profile",
                    "5. Change Password",
                    "6. Hostel",
                    "7. Assignments",
                    "8. Internship",
                    "9. Grievance",
                    "10. Online Test",
                    "11. Online ESAT",
                    "12. E-Material",
                    "13. Course-PO-PSO"
                ]
            }
        ]);
        setCurrentMenu('main');
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleOptionClick = (option: string) => {
        const userMessage: Message = {
            text: option,
            isBot: false,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        handleMenuSelection(option);
    };

    const handleMenuSelection = async (selection: string) => {
        const lowerSelection = selection.toLowerCase();
        let botResponse: Message = {
            text: "",
            isBot: true,
            timestamp: new Date(),
        };

        // Main Menu Options
        if (lowerSelection.includes('1') || lowerSelection.includes('home')) {
            router.push('/');
            botResponse = {
                text: "Welcome to the home page. What would you like to do?",
                isBot: true,
                timestamp: new Date(),
                options: [
                    "1. View announcements",
                    "2. Check notifications",
                    "3. Back to main menu"
                ]
            };
            setCurrentMenu('home');
        }
        else if (lowerSelection.includes('2') || lowerSelection.includes('admission')) {
            router.push('/admission-request');
            botResponse = {
                text: "You're in the Admission Request section. What information do you need?",
                isBot: true,
                timestamp: new Date(),
                options: [
                    "1. New admission application",
                    "2. Check application status",
                    "3. Required documents",
                    "4. Fee structure",
                    "5. Back to main menu"
                ]
            };
            setCurrentMenu('admission');
        }
        else if (lowerSelection.includes('3') || lowerSelection.includes('feedback')) {
            router.push('/feedback');
            botResponse = {
                text: "You're in the Feedback section. What would you like to do?",
                isBot: true,
                timestamp: new Date(),
                options: [
                    "1. Submit new feedback",
                    "2. View previous feedback",
                    "3. Back to main menu"
                ]
            };
            setCurrentMenu('feedback');
        }
        else if (lowerSelection.includes('4') || lowerSelection.includes('profile')) {
            router.push('/profile');
            botResponse = {
                text: "You're in the Profile Update section. What would you like to update?",
                isBot: true,
                timestamp: new Date(),
                options: [
                    "1. Personal information",
                    "2. Contact details",
                    "3. Academic information",
                    "4. Back to main menu"
                ]
            };
            setCurrentMenu('profile');
        }
        else if (lowerSelection.includes('6') || lowerSelection.includes('hostel')) {
            router.push('/hostel');
            botResponse = {
                text: "Welcome to the Hostel section. How can I assist you?",
                isBot: true,
                timestamp: new Date(),
                options: [
                    "1. Room allocation",
                    "2. Hostel rules",
                    "3. Mess information",
                    "4. Fee details",
                    "5. Back to main menu"
                ]
            };
            setCurrentMenu('hostel');
        }
        else if (lowerSelection.includes('7') || lowerSelection.includes('assignment')) {
            router.push('/assignments');
            botResponse = {
                text: "You're in the Assignments section. What would you like to do?",
                isBot: true,
                timestamp: new Date(),
                options: [
                    "1. View assignments",
                    "2. Submit assignment",
                    "3. Check submission status",
                    "4. View grades",
                    "5. Back to main menu"
                ]
            };
            setCurrentMenu('assignments');
        }
        else if (lowerSelection.includes('8') || lowerSelection.includes('internship')) {
            router.push('/internship');
            botResponse = {
                text: "Welcome to the Internship Portal. What would you like to know?",
                isBot: true,
                timestamp: new Date(),
                options: [
                    "1. Add new internship",
                    "2. View current internships",
                    "3. Check internship status",
                    "4. Update progress",
                    "5. View analytics",
                    "6. Back to main menu"
                ]
            };
            setCurrentMenu('internship');
        }
        else if (lowerSelection.includes('9') || lowerSelection.includes('grievance')) {
            router.push('/grievance');
            botResponse = {
                text: "You're in the Grievance section. How can I help?",
                isBot: true,
                timestamp: new Date(),
                options: [
                    "1. Submit new grievance",
                    "2. Track grievance status",
                    "3. View resolved grievances",
                    "4. Back to main menu"
                ]
            };
            setCurrentMenu('grievance');
        }
        else if (lowerSelection.includes('10') || lowerSelection.includes('online test')) {
            router.push('/online-test');
            botResponse = {
                text: "Welcome to Online Test section. What would you like to do?",
                isBot: true,
                timestamp: new Date(),
                options: [
                    "1. Available tests",
                    "2. Test schedule",
                    "3. View results",
                    "4. Practice tests",
                    "5. Back to main menu"
                ]
            };
            setCurrentMenu('online-test');
        }
        else if (lowerSelection.includes('11') || lowerSelection.includes('esat')) {
            router.push('/online-esat');
            botResponse = {
                text: "You're in the Online ESAT section. What would you like to access?",
                isBot: true,
                timestamp: new Date(),
                options: [
                    "1. Take ESAT test",
                    "2. View previous results",
                    "3. Test guidelines",
                    "4. Back to main menu"
                ]
            };
            setCurrentMenu('esat');
        }
        else if (lowerSelection.includes('12') || lowerSelection.includes('material')) {
            router.push('/e-material');
            botResponse = {
                text: "Welcome to E-Material section. What content would you like to access?",
                isBot: true,
                timestamp: new Date(),
                options: [
                    "1. Course materials",
                    "2. Reference books",
                    "3. Video lectures",
                    "4. Download materials",
                    "5. Back to main menu"
                ]
            };
            setCurrentMenu('e-material');
        }

        // Handle sub-menu options for each section
        else if (currentMenu === 'internship') {
            if (lowerSelection.includes('add new')) {
                botResponse = {
                    text: "To add a new internship:\n1. Click the '+ Add New Internship' button\n2. Fill in company details\n3. Add internship duration\n4. Submit the form\n\nWould you like me to show you the form?",
                    isBot: true,
                    timestamp: new Date(),
                    options: [
                        "1. Show add internship form",
                        "2. Back to internship menu",
                        "3. Back to main menu"
                    ]
                };
            }
            else if (lowerSelection.includes('view analytics')) {
                botResponse = {
                    text: "The analytics dashboard shows:\n- Skills progress\n- Internship status distribution\n- Learning progress\n\nWould you like to view the details?",
                    isBot: true,
                    timestamp: new Date(),
                    options: [
                        "1. Show analytics",
                        "2. Back to internship menu",
                        "3. Back to main menu"
                    ]
                };
            }
        }
        else if (currentMenu === 'hostel') {
            if (lowerSelection.includes('room')) {
                botResponse = {
                    text: "Room allocation process:\n1. Check availability\n2. Submit preferences\n3. Pay hostel fees\n4. Get room assigned\n\nWould you like to proceed with room allocation?",
                    isBot: true,
                    timestamp: new Date(),
                    options: [
                        "1. Check room availability",
                        "2. Back to hostel menu",
                        "3. Back to main menu"
                    ]
                };
            }
        }

        // Handle "Back to main menu" option
        if (lowerSelection.includes('back to main menu')) {
            botResponse = {
                text: "What else can I help you with?",
                isBot: true,
                timestamp: new Date(),
                options: [
                    "1. Home",
                    "2. Admission Request",
                    "3. Feedback Form",
                    "4. Update Profile",
                    "5. Change Password",
                    "6. Hostel",
                    "7. Assignments",
                    "8. Internship",
                    "9. Grievance",
                    "10. Online Test",
                    "11. Online ESAT",
                    "12. E-Material",
                    "13. Course-PO-PSO"
                ]
            };
            setCurrentMenu('main');
        }

        // Handle back to specific menu options
        if (lowerSelection.includes('back to internship menu')) {
            handleMenuSelection('8');
        } else if (lowerSelection.includes('back to hostel menu')) {
            handleMenuSelection('6');
        } else if (lowerSelection.includes('back to admission menu')) {
            handleMenuSelection('2');
        }

        // Handle invalid input
        if (!botResponse.text) {
            botResponse = {
                text: "I'm sorry, I didn't understand that. Please select from the available options or try again.",
                isBot: true,
                timestamp: new Date(),
                options: currentMenu === 'main' ? [
                    "1. Home",
                    "2. Admission Request",
                    "3. Feedback Form",
                    "4. Update Profile",
                    "5. Change Password",
                    "6. Hostel",
                    "7. Assignments",
                    "8. Internship",
                    "9. Grievance",
                    "10. Online Test",
                    "11. Online ESAT",
                    "12. E-Material",
                    "13. Course-PO-PSO"
                ] : ["Back to main menu"]
            };
        }

        setMessages(prev => [...prev, botResponse]);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const userMessage: Message = {
            text: inputMessage,
            isBot: false,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');

        await handleMenuSelection(inputMessage);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Chat Toggle Button */}
            <motion.button
                onClick={() => isOpen ? handleClose() : setIsOpen(true)}
                className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isOpen ? (
                    <AiOutlineClose size={24} />
                ) : (
                    <BsChatDotsFill size={24} />
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl"
                    >
                        {/* Chat Header */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-red-600 text-white px-4 py-3 rounded-t-lg"
                        >
                            <h3 className="text-lg font-medium">MET BKC Assistant</h3>
                            <p className="text-sm opacity-75">How can I help you today?</p>
                        </motion.div>

                        {/* Messages Container */}
                        <div className="h-96 overflow-y-auto p-4 space-y-4">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: message.isBot ? -20 : 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div
                                        className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                                    >
                                        <motion.div
                                            initial={{ scale: 0.9 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.2 }}
                                            className={`max-w-[75%] rounded-lg px-4 py-2 ${message.isBot
                                                ? 'bg-gray-100 text-gray-800'
                                                : 'bg-red-600 text-white'
                                                }`}
                                        >
                                            <p className="text-sm whitespace-pre-line">{message.text}</p>
                                            <p className="text-xs mt-1 opacity-75">
                                                {message.timestamp.toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </motion.div>
                                    </div>
                                    {message.options && message.isBot && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.3 }}
                                            className="mt-2 space-y-2"
                                        >
                                            {message.options.map((option, optionIndex) => (
                                                <motion.button
                                                    key={optionIndex}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 * optionIndex }}
                                                    whileHover={{ scale: 1.02, x: 5 }}
                                                    onClick={() => handleOptionClick(option)}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    {option}
                                                </motion.button>
                                            ))}
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Form */}
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            onSubmit={handleSendMessage}
                            className="border-t p-4"
                        >
                            <div className="flex space-x-2">
                                <motion.input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    placeholder="Type your message or select an option above..."
                                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm"
                                    whileFocus={{ scale: 1.01 }}
                                />
                                <motion.button
                                    type="button"
                                    onClick={toggleListening}
                                    className={`p-2 rounded-md transition-colors ${isListening ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {isListening ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
                                </motion.button>
                                <motion.button
                                    type="submit"
                                    className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <IoMdSend size={20} />
                                </motion.button>
                            </div>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatBot;