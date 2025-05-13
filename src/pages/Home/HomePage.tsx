import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen px-4">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to English Word Trainer
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Improve your English vocabulary efficiently and track your progress
        easily.
      </p>
    </div>
  );
};

export default HomePage;
