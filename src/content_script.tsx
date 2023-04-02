// Load the React and ReactDOM libraries
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { PromptOptions } from "./content";

// Define the React component
function ChatGPT() {
  // State to hold the prompts
  const [selectedPrompt, setSelectedPrompt] = React.useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const options = PromptOptions.languages;

  // Effect to load the prompts from storage
  React.useEffect(() => {
    chrome.storage.sync.get("prompts", (result) => {
      const prompts = result.prompts || ["asdf", "adsf"];
      setPrompts(prompts);
    });
  }, []);

  const [prompts, setPrompts] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    // Fetch prompts from storage
    chrome.storage.sync.get("prompts", (result) => {
      setPrompts(result.prompts || []);
      setFilteredPrompts(result.prompts || []);
    });
  }, []);

  const onClickPromptMessage = (event: any) => {
    const selectedPrompt = event.target.innerHTML;
    const textarea: any = document.querySelector(
      'textarea[placeholder="Send a message..."]'
    );
    if (textarea) {
      // const modifiedMessage = selectedPrompt
      textarea.value = selectedPrompt;
      textarea.dispatchEvent(new Event("change"));
    }
  };

  const handleTextareaChange = (event: any) => {
    // Do something when textarea value changes
  };

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event: any) => {
    const { value } = event.target;
    setSearchValue(value);
    const filtered = prompts.filter((prompt: any) =>
      prompt.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPrompts(filtered);
  };

  return (
    <div>
      <h1>ChatGPT</h1>
      <div className="flex flex-row">
        <select
          id="category"
          className="bg-gray-100 border-0 text-sm rounded block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0 dark:hover:bg-gray-900"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {options.map((option) => (
            <option key={option.label} value={option.label}
            >
              {option.label}
            </option>
          ))}
        </select>

        <input
          id="search"
          type="text"
          className="bg-gray-100 border-0 text-sm rounded block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0 md:w-50"
          autoComplete="off"
          data-i18n-placeholder="search_prompts"
          placeholder="Search Prompts..."
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        {/* {options.map((option) => (
          <button 
          onClick={onClickPromptMessage}
          className="text-sm w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900">
            {option.label}
          </button>
        ))} */}
      </div>
    </div>
  );
}

setTimeout(() => {
  // Find the container element and render the React component
  let chatGptElement: any = document.querySelector("h1");
  const options = PromptOptions.languages;
  const tones = PromptOptions.tones;
  const styles = PromptOptions.styles;

  if (chatGptElement && chatGptElement.textContent === "ChatGPT") {
    ReactDOM.render(<ChatGPT />, chatGptElement);
  }

  const textarea: any = document.querySelector(
    'textarea[placeholder="Send a message..."]'
  );
  const newDiv = document.createElement('div'); // create a new div element
  ReactDOM.render(<CustomSelects />, newDiv);

  textarea.parentElement.insertAdjacentElement('afterend', newDiv);

  function CustomSelects() {
    return (
      <div className="flex w-full mt-5">
        <div>
        <select
          id="language"
          className="bg-gray-100 border-0 text-sm rounded block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0 dark:hover:bg-gray-900"
          // value={selectedCategory}
          // onChange={handleCategoryChange}
        >
          {options.map((option) => (
            <option key={option.label} value={option.label}
            >
              {option.label}
            </option>
          ))}
        </select>
        </div>
        <div className="ml-2">
        <select
          id="language"
          className="bg-gray-100 border-0 text-sm rounded block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0 dark:hover:bg-gray-900"
          // value={selectedCategory}
          // onChange={handleCategoryChange}
        >
          {tones.map((option) => (
            <option key={option.label} value={option.label}
            >
              {option.label}
            </option>
          ))}
        </select>
        </div>
        <div className="ml-2">
        <select
          id="language"
          className="bg-gray-100 border-0 text-sm rounded block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0 dark:hover:bg-gray-900"
          // value={selectedCategory}
          // onChange={handleCategoryChange}
        >
          {styles.map((option) => (
            <option key={option.label} value={option.label}
            >
              {option.label}
            </option>
          ))}
        </select>
        </div>
      </div>
    );
  }
  

  // <div class="flex w-full">
  //     <div>
  //       <select id="languageSelect" class="bg-gray-100 border-0 text-sm rounded block w-full dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-900 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0">
  //         <option value="">Select language</option>  


  //           <option value="German">
  //             Deutsch
  //             </option> 

  //       </select>
  //     </div>

  //     <div class="ml-2">

  //       <select id="toneSelect" class="bg-gray-100 border-0 text-sm rounded block w-full dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-900 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0">
  //         <option value="" selected="">Select Tone</option>


  //           <option value="1">
  //             Informative
  //             </option> 

  //       </select>
  //     </div>

  //     <div class="ml-2">
  //       <select id="writingStyleSelect" class="bg-gray-100 border-0 text-sm rounded block w-full dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-900 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0">
  //         <option value="" selected="">Select Style</option>


  //           <option value="1">
  //             Academic
  //             </option> 

  //       </select>
  //     </div>
  //   </div>
}, 2000);
