import { useState, useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import QuickActions from './QuickActions';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: "Bonjour ! Je suis votre assistant RH Nestlé. Comment puis-je vous aider aujourd'hui ?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    animations: true,
    sounds: true
  });
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulation d'une réponse du bot avec des réponses prédéfinies
  const getBotResponse = (userMessage) => {
    const responses = {
      'congés': "Pour consulter vos congés, vous pouvez accéder à votre espace personnel RH ou me demander votre solde actuel. Souhaitez-vous que je vous aide avec une demande spécifique ?",
      'horaires': "Vos horaires de travail sont consultables dans votre planning personnel. Les horaires standard chez Nestlé sont de 9h à 17h30 avec une pause déjeuner d'1h. Avez-vous une question spécifique sur vos horaires ?",
      'aide': "Je suis là pour vous aider ! Je peux vous renseigner sur : les congés, les horaires, les politiques RH, les avantages sociaux, les contacts utiles, et bien plus. Que souhaitez-vous savoir ?",
      'salaire': "Pour toute question concernant votre rémunération, je vous invite à contacter directement le service paie ou votre responsable RH. Ces informations sont confidentielles et nécessitent une vérification d'identité.",
      'formation': "Nestlé propose de nombreuses formations internes et externes. Vous pouvez consulter le catalogue de formations sur l'intranet ou contacter votre manager pour discuter de vos besoins en développement professionnel.",
      'contact': "Voici les contacts utiles :\n• RH Général: rh@nestle.fr\n• Support IT: support-it@nestle.fr\n• Urgences: +33 1 23 45 67 89\n• Reception: +33 1 23 45 67 00"
    };

    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return "Je comprends votre question. Pour vous donner la réponse la plus précise, pourriez-vous me donner plus de détails ? Je peux vous aider avec les congés, horaires, formations, contacts, et bien d'autres sujets RH.";
  };

  const handleSendMessage = async (content) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);

    // Simulation d'un délai de réponse
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(content),
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action);
  };

  return (
    <div className="max-w-6xl mx-auto h-screen flex flex-col bg-white dark:bg-gray-900 shadow-2xl rounded-lg overflow-hidden">
      <ChatHeader 
        settings={settings} 
        onSettingsChange={setSettings}
      />
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <MessageList 
          messages={messages}
          isTyping={isTyping}
          settings={settings}
        />
        
        <div ref={messagesEndRef} />
        
        {/* <QuickActions 
          onActionClick={handleQuickAction}
          settings={settings}
        /> */}
        
        <MessageInput 
          onSendMessage={handleSendMessage}
          settings={settings}
        />
      </div>
    </div>
  );
};

export default ChatInterface;

