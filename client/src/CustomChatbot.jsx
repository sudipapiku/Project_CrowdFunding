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
        { value: 2, label: 'What kind of projects can I support here?', trigger: '32' },
        { value: 3, label: 'What information do I need to provide when contributing to a project?', trigger: '33' },
        { value: 4, label: 'How can I track the project progress I contributed to?', trigger: '34' },
        { value: 5, label: 'How do I create a project on the platform?', trigger: '35' },
        { value: 6, label: 'Back To Main Menu', trigger: '2' },
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
      id: '33',
      message: "When contributing, you need to link your cryptocurrency wallet. You’ll also need to select the project you wish to support and specify the amount you want to contribute.",
      trigger:'3',

    },{
      id: '34',
      message: "You can track the progress through the project's dashboard on our platform. It provides real-time updates on milestones all recorded on the blockchain. ",
      trigger:'3',

    },{
      id: '35',
      message: "To create a project, you need to register on the platform, complete your profile, and then submit your project proposal. Include detailed information about your project goals, funding requirements, and milestones. Once approved, your project will go live for funding.",
      trigger:'3',

    },
    {
      id: '4',
      options: [
        { value: 1, label: 'How do you keep my money safe?', trigger: '41' },
        { value: 2, label: 'Can I trust this platform with my personal information?', trigger: '42' },
        { value: 3, label: 'How are transactions secured on the platform?', trigger: '43' },
        { value: 4, label: 'How can I check if my donation is being used in legitimate activity?', trigger: '44' },
        { value: 5, label: 'Back To Main Menu', trigger: '2' },
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
      id: '43',
      message: "Transactions on the platform are secured using blockchain technology. Each transaction is recorded on the blockchain, making it immutable and transparent. Additionally, we use secure wallets to protect funds.",
      trigger:'4',

    },{
      id: '44',
      message: "We provide an accessible link in our system where you can check the transaction history and be sure about your donation’s usage.",
      trigger:'4',

    },
    {
      id: '5',
      options: [
        { value: 1, label: "What's a smart contract, and why does it matter in crowdfunding?", trigger: '51' },
        { value: 2, label: 'How do I know where my money goes after I contribute?', trigger: '52' },
        { value: 3, label: "What technology underpins this crowdfunding platform?", trigger: '53' },
        { value: 4, label: 'What is blockchain technology, and how does it benefit crowdfunding?', trigger: '54' },
        { value: 5, label: "How are funds stored and managed on the platform?", trigger: '55' },
        { value: 6, label: 'What is a multi-signature wallet, and why is it important?', trigger: '56' },
        { value: 7, label: 'Back To Main Menu', trigger: '2' },
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
      id: '53',
      message: "The platform is built on blockchain technology, utilizing smart contracts and decentralized ledgers to ensure transparency, security, and efficiency in managing contributions and project milestones.",
      trigger:'5',

    },
    {
      id: '54',
      message: "Blockchain is a decentralized, immutable ledger that records transactions across a network of computers. For crowdfunding, it ensures transparency, reduces fraud, and automates fund management through smart contracts, making the process more secure and efficient.",
      trigger:'5',

    },
    {
      id: '55',
      message: "Funds are stored in secure, multi-signature wallets managed by smart contracts. These contracts ensure that funds are only released according to the agreed-upon project milestones, providing security and accountability.",
      trigger:'5',

    },
    {
      id: '56',
      message: "A multi-signature wallet requires multiple private keys to authorize a transaction. This adds an extra layer of security by ensuring that no single party can unilaterally access or transfer the funds.",
      trigger:'5',

    },
    {
      id: '6',
      options: [
        { value: 1, label: 'Is it legal to crowdfund here?', trigger: '61' },
        { value: 2, label: 'How is my data protected?', trigger: '62' },
        { value: 3, label: 'Do I need to do anything special if I want to start a project?', trigger: '63' },
        { value: 4, label: 'Back To Main Menu', trigger: '2' },
      ],
    },
    {
      id: '61',
      message: 'Yes, we follow all the rules and regulations to keep everything legal and safe for everyone involved.',
      trigger:'6',
    },{
      id: '62',
      message: 'Your data is protected with strong encryption and secure storage. The platform keep your information private and secure.',
      trigger:'6',
    },{
      id: '63',
      message: 'Yes, you must follow the platform’s guidelines, and verify your identity. The platform will guide you through the process.',
      trigger:'6',
    },
    
];

const CustomChatbot = () => (
  <ThemeProvider theme={theme}>
    <ChatBot headerTitle="Chat bot" floating={true}  steps={steps} />;
  </ThemeProvider>
);

export default CustomChatbot;