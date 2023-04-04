// Load the React and ReactDOM libraries
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { PromptOptions } from "./content";

// Define the React component
function ChatGPT() {
  const [topics, setTopics] = useState(PromptOptions.topics);
  const [topic, setTopic] = useState(topics[0].id);
  const [subTopic, setSubTopic] = useState("All");
  const [subTopics, setSubTopics] = useState(PromptOptions.activity);
  const [prompts, setPrompts] = useState(PromptOptions.prompts);

  const handleTopicChange = (event: any) => {
    // filter subtopics by topic
    if (event.target.value === "All") {
      setTopic(event.target.value);
      setSubTopics(PromptOptions.activity);
      setSubTopic("All");
      setPrompts(PromptOptions.prompts);
      return;
    }
    const filteredSubTopics = PromptOptions.activity.filter((p: any) => {
      if (p.TopicID.toLowerCase() === event.target.value.toLowerCase()) {
        return p
      }
    });
    setTopic(event.target.value);
    setSubTopics(filteredSubTopics);
  };


  const handleSubTopicsChange = (event: any) => {
    setSubTopic(event.target.value);
    // filter prompts by subtopic
    const filteredPrompts = PromptOptions.prompts.filter((p: any) => {
      if (p.Category.toLowerCase() === event.target.value.toLowerCase() && p.Topic.toLowerCase() === topic.toLowerCase()) {
        return p
      }
    });

    setPrompts(filteredPrompts);
  };
  const onClickPromptMessage = async (prompt: any) => {
    let selectedPrompt = prompt.Prompt;
    const textarea: any = document.querySelector(
      'textarea[placeholder="Send a message..."]'
    );
    if (textarea) {

      // get language from chrome storage
      let langauge = await chrome.storage.local.get(['language']);
      let tone = await chrome.storage.local.get(['tone']);
      let style = await chrome.storage.local.get(['style']);

      // find language tone and topic from prompts and replace with chrome storage values
      const modifiedMessage = selectedPrompt
        .replaceAll("[TARGETLANGUAGE]", langauge.language)
        .replaceAll("[TONE]", tone.tone)
        .replaceAll("[STYLE]", style.style)

      textarea.value = modifiedMessage + "\n";
      textarea.focus();
    }
  };

  const handleSearchChange = (event: any) => {
    const { value } = event.target;
    if (value === "") {
      setPrompts(PromptOptions.prompts);
      return;
    }
    const filtered = prompts.filter((prompt: any) =>
      prompt.Prompt.toLowerCase().includes(value.toLowerCase())
    );
    // setSearchValue(value);
    setPrompts(filtered);
  };

  const getWordStr = (str: any) => {
    return str.split(/\s+/).slice(0, 15).join(" ");
  }
  const PromptList = (prompts: any) => {
    return (
      <div className="flex flex-wrap scroll-view" style={{ flexWrap: 'wrap', height: "55vh", overflow: "scroll" }}>
        {prompts && prompts.PromptList && prompts.PromptList.length >= 1 && prompts.PromptList.map((prompt: any, index: any) => (
          <button
            key={index}
            onClick={() => onClickPromptMessage(prompt)}
            className="flex m-1 flex-col gap-2 w-full bg-gray-50 dark:bg-white/5 p-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900 text-left relative group"
            style={{ flex: '0 0 calc(26% - 1rem)' }}
          >
            <div className="flex items-start w-full justify-between">
              <h3 style={{ overflowWrap: 'anywhere', fontSize: '15px', lineHeight: 'unset' }}>{prompt?.Title}</h3>
            </div>

            <div className="-mt-0.5 text-gray-500 text-xs max-w-full">
              <span title="Topic: Copywriting">{prompt?.Topic}</span> / <span title="Activity: Accounting">{prompt?.Category}</span>
            </div>

            <p className="m-0 font-light text-gray-500 text-gray-600 dark:text-gray-200 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical' }} >
              {getWordStr(prompt?.Prompt)}...
            </p>
          </button>
        ))
        }
      </div>
    );
  };


  return (
    <div>
      <h1 className="text-center mt-4 mb-5">ChatGPT Prompty</h1>
      <div className="w-full">
        <div className="flex mb-1 flex-row">
          <select
            id="topic"
            className="bg-gray-100  border-0 text-sm rounded block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0 dark:hover:bg-gray-900"
            value={topic}
            onChange={handleTopicChange}
          >
            {topics.map((option, index) => (
              <option key={option.label + index} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            id="subtopic"
            className="bg-gray-100 border-0 text-sm rounded block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0 dark:hover:bg-gray-900 ml-2"
            value={subTopic}
            onChange={handleSubTopicsChange}
          >
            {subTopics.map((option, index) => (
              <option key={option.Label + index} value={option.Label}>
                {option.Label}
              </option>
            ))}
          </select>
        </div>

        <input
          id="search"
          type="text"
          className="bg-gray-100 border-0 text-sm rounded block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0 md:w-50"
          autoComplete="off"
          data-i18n-placeholder="search_prompts"
          placeholder="Search Prompts..."
          // value={searchValue}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex flex-row mt-4">
        <PromptList PromptList={prompts}></PromptList>
      </div>
    </div>
  );
}


const CustomSelects = () => {
  const [language, setLanguge] = useState('');
  const [style, setStyles] = useState('');
  const [tones, setTones] = useState('');


  const setDefault = async () => {
    let storage = await chrome.storage.local.get();
    if (!storage || !storage.language) {
      await chrome.storage.local.set({ style: 'Academic' });
      await chrome.storage.local.set({ language: 'English' })
      await chrome.storage.local.set({ tone: 'Informative' });
      setLanguge('English')
      setStyles('Academic')
      setTones('Informative')
    }
  }

  useEffect(() => {
    setDefault()
  }, [])

  const handleSetStyles = async (event: any) => {
    setStyles(event.target.value);
    // save to local storage
    await chrome.storage.local.set({ style: event.target.value });
  };

  const handleSetLanguge = async (event: any) => {
    setLanguge(event.target.value);
    // save to local storage
    await chrome.storage.local.set({ language: event.target.value })
  };

  const handleTonesChange = async (event: any) => {
    setTones(event.target.value);
    // save to local storage
    await chrome.storage.local.set({ tone: event.target.value });
  };

  return (
    <div className="flex w-full mt-5">
      <div>
        <select
          id="language"
          className="bg-gray-100 border-0 text-sm rounded block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0 dark:hover:bg-gray-900"
          value={language}
          onChange={handleSetLanguge}
        >
          {PromptOptions.languages.map((option: any, index: any) => (
            <option key={option.label + index} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="ml-2">
        <select
          id="language"
          className="bg-gray-100 border-0 text-sm rounded block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0 dark:hover:bg-gray-900"
          value={style}
          onChange={handleSetStyles}
        >
          {PromptOptions.styles.map((option, index) => (
            <option key={option.label + index} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="ml-2">
        <select
          id="language"
          className="bg-gray-100 border-0 text-sm rounded block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0 dark:hover:bg-gray-900"
          value={tones}
          onChange={handleTonesChange}
        >
          {PromptOptions.tones.map((option: any, index) => (
            <option key={option.label + index} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

// Define the callback function to execute when the element appears
const handleChatGPT = (mutationsList: any, observer: any) => {
  // Find the container element and render the React component
  let chatGptElement: any = document.querySelector("h1");

  if (chatGptElement && chatGptElement.textContent === "ChatGPT") {
    observer.disconnect();
    ReactDOM.render(<ChatGPT />, chatGptElement.parentElement);

    const textarea: any = document.querySelector(
      'textarea[placeholder="Send a message..."]'
    );
    const newDiv = document.createElement("div"); // create a new div element
    ReactDOM.render(<CustomSelects />, newDiv);
    textarea.parentElement.insertAdjacentElement("afterend", newDiv);
  }
};

export default CustomSelects;


// start observer function
function startObserver() {
  // Create a new observer and configure it to watch for changes to the body element
  const observer = new MutationObserver(handleChatGPT);
  observer.observe(document.body, { childList: true, subtree: true });
  // Call the observer after a timeout of 2000ms
  setTimeout(() => {
    observer.disconnect();
  }, 5000);
}
startObserver();
const newChatLink = document.querySelector<HTMLAnchorElement>(
  'a.flex.py-3.px-3.items-center.gap-3.rounded-md.hover\\:bg-gray-500\\/10.transition-colors.duration-200.text-white.cursor-pointer.text-sm.mb-2.flex-shrink-0.border.border-white\\/20'
);

// attach click listner on newchatbtn
if (newChatLink) {
  newChatLink.addEventListener('click', function () {
    // Handle click event here
    // startObserver();
  });
}
window.addEventListener('hashchange', e => {
  console.log('URL hash changed', e);
  debugger
});
window.addEventListener('popstate', e => {
  console.log('State changed', e);
});

// on extension start

const extInitlize =() => {
  chrome.storage.local.clear();
}
extInitlize();

