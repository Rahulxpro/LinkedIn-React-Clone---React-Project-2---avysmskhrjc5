import React from "react";
import { useDarkMode } from "../contexts/DarkModeProvider";

interface Question {
  id: number;
  ques: string;
  ans: string;
}
interface FrequentlyAskedQuestionsProps {
  frequentlyAkedQuestions: Question[];
}

const FrequentlyAskedQuestions: React.FC<FrequentlyAskedQuestionsProps> = ({
  frequentlyAkedQuestions,
}) => {
  const { darkMode } = useDarkMode();

  const midpoint = Math.ceil(frequentlyAkedQuestions.length / 2);

  const firstHalf = frequentlyAkedQuestions.slice(0, midpoint);
  const secondHalf = frequentlyAkedQuestions.slice(midpoint);
  return (
    <>
      <div className="w-full flex flex-col sm:flex-row gap-4">
        {/* 1ST HALF PART */}
        <div className="flex flex-col gap-4 w-full sm:w-1/2">
          {firstHalf.map((question) => (
            <li className="text-left list-none" key={question.id}>
              <h2
                className={`font-semibold ${
                  darkMode ? "text-white" : "text-gray-700"
                }`}
              >
                {question.ques}
              </h2>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {question.ans}
              </p>
            </li>
          ))}
        </div>
        {/* 2ND HALF PART */}
        <div className="flex flex-col gap-4 w-full sm:w-1/2">
          {secondHalf.map((question) => (
            <li className="text-left list-none" key={question.id}>
              <h2
                className={`font-semibold ${
                  darkMode ? "text-white" : "text-gray-700"
                }`}
              >
                {question.ques}
              </h2>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {question.ans}
              </p>
            </li>
          ))}
        </div>
      </div>
    </>
  );
};

export default FrequentlyAskedQuestions;
