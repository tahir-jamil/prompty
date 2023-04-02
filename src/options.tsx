import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const Options = () => {
  const [prompts, setPrompts] = useState<string[]>([]);

  const [content, setContent] = useState("Default content");

  const handleItemClick = (newContent: any) => {
    setContent(newContent);
  };
  useEffect(() => {
    // Restores the prompts list using the preferences stored in chrome.storage.

    chrome.storage.sync.get("prompts", (data) => {
      if (!data.prompts) {
        const prompts = [
          "What's your name?",
          "What's your favorite color?",
          "What do you like to do for fun?",
          "Tell me about your job.",
          "What's your favorite book or movie?",
          "Do you have any pets?",
          "Where's your favorite place to travel?",
          "What's your favorite food?",
          "Tell me about your family.",
          "What's something interesting about you?",
        ];
        chrome.storage.sync.set({ prompts: prompts });
        setPrompts(prompts);
      } else {
        setPrompts(data.prompts);
      }
    });
  }, []);

  return (
    <div className="flex flex-row">
      <div className="bg-gray-700 w-1/6 min-h-screen">
        <div className="p-4 text-white font-bold">Menu</div>
        <ul className="p-2 text-white">
          <li
            className="my-2 hover:bg-gray-600 rounded-md p-2 cursor-pointer"
            onClick={() => handleItemClick("New Prompt content")}
          >
            New Prompt
          </li>
          <li
            className="my-2 hover:bg-gray-600 rounded-md p-2 cursor-pointer"
            onClick={() => handleItemClick("Public Prompts content")}
          >
            Public Prompts
          </li>
        </ul>
      </div>
      <div className="flex-1 bg-gray-200 p-4">{content}</div>
    </div>

  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.17/tailwind.min.css"
    />
    <Options />
  </React.StrictMode>
);

{/* <li className="my-2 hover:bg-gray-600 rounded-md p-2 cursor-pointer">
          Curated Prompts
        </li> */}
{/* <li className="my-2 hover:bg-gray-600 rounded-md p-2 cursor-pointer">
          Light Mode
        </li>
        <li className="my-2 hover:bg-gray-600 rounded-md p-2 cursor-pointer">
          History
        </li>
        <li className="my-2 hover:bg-gray-600 rounded-md p-2 cursor-pointer">
          Settings
        </li>
        <li className="my-2 hover:bg-gray-600 rounded-md p-2 cursor-pointer">
          Storage
        </li> */}