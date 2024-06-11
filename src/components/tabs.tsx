import { useState } from 'react';
import { DocumentChartBarIcon, GlobeAltIcon, PhotoIcon } from '@heroicons/react/20/solid';
import { ThreeDot } from 'react-loading-indicators';
import Image from 'next/image';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Tabs({ data, isLoading }) {
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  function ExtractedDataComponent() {
    return (
      <div className="w-full p-3">
        {!isLoading ? (
          <ul>
            {Object.keys(data).map((d) => {
              if (typeof data[d] !== "string") return null;
              return (
                <li key={d} className="p-2 m-1 border-b border-black">
                  <span className="my-2 font-semibold">{d}</span> :{" "}
                  <span className="text-sm">{data[d]}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex items-center justify-center border-black h-screen">
            <ThreeDot color="#cc5800" />
          </div>
        )}
      </div>
    );
  }

  function ImagesComponent() {
    return <div className="w-full p-3">
       { Object.entries(data).length > 2 ? <span>Document: <Image
                    src={`data:image/jpeg;base64,${data["Images"]["Document"]}`}
                    alt="Preview"
                    width={200}
                    height={100}
                    objectFit="contain"
                    className="rounded-sm m-2"
                  />
         Portrait: <Image
                    src={`data:image/jpeg;base64,${data["Images"]["Portrait"]}`}
                    alt="Preview"
                    width={100}
                    height={50}
                    objectFit="contain"
                    className="rounded-sm m-2"
                  /></span>:<span></span>}
    </div>;
  }

  function ApiResponseComponent() {
    const formattedJson = JSON.stringify(data, null, 2);
  
    return (
      <div className="max-w-full p-3 overflow-auto">
        <pre className="whitespace-pre-wrap break-all p-4 rounded-md">
          {formattedJson}
        </pre>
      </div>
    );
  }

  const tabs = [
    { name: 'Extracted Data', icon: DocumentChartBarIcon, content: <ExtractedDataComponent />, current: true },
    { name: 'Images', icon: PhotoIcon, content: <ImagesComponent />, current: false },
    { name: 'API Response', icon: GlobeAltIcon, content: <ApiResponseComponent />, current: false },
  ];

  const [activeTab, setActiveTab] = useState(tabs.find((tab) => tab.current)!.name);

  return (
    <div className="w-7/12 h-full bgPlayground">
      <div className="sm:hidden w-full bg-white">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary"
          value={activeTab}
          onChange={(e) => handleTabClick(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.name} className="w-8/12 border-2">
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block w-full m-2 rounded-md bg-white">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab.name)}
                className={classNames(
                  activeTab === tab.name
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                )}
                aria-current={activeTab === tab.name ? 'page' : undefined}
              >
                <tab.icon
                  className={classNames(
                    activeTab === tab.name ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5'
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="m-1 w-full rounded-md overflow-scroll bg-white h-screen">
        {tabs.find((tab) => tab.name === activeTab)!.content}
      </div>
    </div>
  );
}
