import React from 'react';
import MessageForm from '../components/MessageForm';

const CreateMessagePage: React.FC = () => {
  return (
    <div className="container-custom py-8 md:py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Create New Message
      </h1>
      <MessageForm />
    </div>
  );
};

export default CreateMessagePage;