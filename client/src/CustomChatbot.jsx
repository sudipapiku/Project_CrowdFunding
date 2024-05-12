import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';

// all available props
const theme = {
  background: '#c8d3de',
  fontFamily: 'Epilogue',
  headerBgColor: '#8c6dfd',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#8c6dfd',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const steps = [
  
    {
      id: '1',
      message: 'Hi.My Name is Sam. How can I help you?',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 1, label: 'Platform Functionality & Participation', trigger: '3' },
        { value: 2, label: 'Security & Safety', trigger: '4' },
        { value: 3, label: 'Technology & Mechanisms', trigger: '5' },
        { value: 4, label: 'Legality & Compliance', trigger: '6' },

      ],
    },
    {
      id: '3',
      options: [
        { value: 1, label: 'Can I join crowdfunding projects on this platform?', trigger: '31' },
        { value: 2, label: 'What kind of projects can I support here?', trigger: '3' },
        { value: 3, label: 'Back To Main Menu', trigger: '2' },
      ],
    },
    {
      id: '31',
      message: 'Yes, you can! You can start your project or support others by contributing funds.' ,
      trigger:'3',
      
    },
    {
      id: '32',
      message: "You can support various projects like startups, social causes, art, or technology. There's something for everyone!",
      trigger:'3',

    },
    {
      id: '4',
      options: [
        { value: 1, label: 'How do you keep my money safe?', trigger: '41' },
        { value: 2, label: 'Can I trust this platform with my personal information?', trigger: '42' },
        { value: 3, label: 'Back To Main Menu', trigger: '2' },
      ],
    },
    {
      id: '41',
      message: "We use strong security measures like encryption and smart contracts to keep your money safe from hackers or misuse.",
      trigger:'4',

    },{
      id: '42',
      message: "Absolutely! We take privacy seriously and use the Blockchain technology to keep your information safe and secure.",
      trigger:'4',

    },
    {
      id: '5',
      options: [
        { value: 1, label: "What's a smart contract, and why does it matter in crowdfunding?", trigger: '51' },
        { value: 2, label: 'How do I know where my money goes after I contribute?', trigger: '52' },
        { value: 3, label: 'Back To Main Menu', trigger: '2' },
      ],
    },
    {
      id: '51',
      message: "A smart contract is a digital agreement that automatically does what it's programmed to do. In crowdfunding, it ensures that funds are used as promised.",
      trigger:'5',

    },
    {
      id: '52',
      message: "We use transparent systems powered by blockchain to track every penny. You can see exactly where your contribution goes and how it's used.",
      trigger:'5',

    },
    {
      id: '6',
      options: [
        { value: 1, label: 'Is it legal to crowdfund here?', trigger: '61' },
        { value: 3, label: 'Back To Main Menu', trigger: '2' },
      ],
    },
    {
      id: '61',
      message: 'Yes, we follow all the rules and regulations to keep everything legal and safe for everyone involved.',
      trigger:'6',
    },
    
];

const CustomChatbot = () => (
  <ThemeProvider theme={theme}>
    <ChatBot headerTitle="Chat bot" floating={true}  steps={steps} />;
  </ThemeProvider>
);

export default CustomChatbot;