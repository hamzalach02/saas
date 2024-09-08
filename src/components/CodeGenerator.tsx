'use client'
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';


const CodeGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/groq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setCode(data.code);
      setLoading(false);
      setLoaded(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSaveFiles = (): void => {
    // Regex to match Java code blocks
    const regexCodeBlock = /```java\n([\s\S]*?)```/g;
    // Regex to extract class names from Java code
    const regexClassName = /class\s+(\w+)/;
  
    // Open or create an IndexedDB database
    const openDatabase = () => {
      return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open('modelDatabase', 1);
  
        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
          const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
          // Create an object store for models if it doesn't exist
          if (!db.objectStoreNames.contains('models')) {
            db.createObjectStore('models', { keyPath: 'filename' });
          }
        };
  
        request.onsuccess = (event: Event) => {
          const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
          resolve(db);
        };
  
        request.onerror = (event: Event) => {
          reject(event);
        };
      });
    };
  
    openDatabase()
      .then((db) => {
        // Ensure the object store exists
        if (db.objectStoreNames.contains('models')) {
          const transaction = db.transaction(['models'], 'readwrite');
          const objectStore = transaction.objectStore('models');
  
          // Find all Java code blocks
          const matches = code.match(regexCodeBlock);
  
          if (matches) {
            matches.forEach((match) => {
              // Extract the content of the code block
              const content = match.slice(7, -3).trim(); // Remove the ```java\n and ```
  
              // Extract the class name using regex
              const classNameMatch = regexClassName.exec(content);
              if (classNameMatch) {
                const className = classNameMatch[1];
                const filename = `${className}.java`;
                const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  
                // Save the file to IndexedDB
                const fileData = { filename, content: blob };
                objectStore.put(fileData);
              }
            });
  
            transaction.oncomplete = () => {
              console.log('Files saved to IndexedDB');
            };
  
            transaction.onerror = (event: Event) => {
              console.error('Error saving files to IndexedDB', event);
            };
          }
        } else {
          // If the object store doesn't exist, reopen the database in upgrade mode
          const version = db.version + 1;
          db.close();
  
          const request = indexedDB.open('modelDatabase', version);
  
          request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
            db.createObjectStore('models', { keyPath: 'filename' });
          };
  
          request.onsuccess = (event: Event) => {
            const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
            handleSaveFiles(); // Retry saving the files
          };
  
          request.onerror = (event: Event) => {
            console.error('Error reopening IndexedDB to create object store', event);
          };
        }
      })
      .catch((event) => {
        console.error('Error opening IndexedDB', event);
      });
  };
  
  
  
  const retrieveFiles = (): void => {
    const request = indexedDB.open('modelDatabase', 1);
  
    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
      const transaction = db.transaction(['models'], 'readonly');
      const objectStore = transaction.objectStore('models');
  
      const allFilesRequest = objectStore.getAll();
  
      allFilesRequest.onsuccess = (event: Event) => {
        const files = allFilesRequest.result as Array<{ filename: string, content: Blob }>;
        files.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            console.log('File content:', e.target?.result);
          };
          reader.readAsText(file.content);
        });
      };
  
      allFilesRequest.onerror = (event: Event) => {
        console.error('Error retrieving files from IndexedDB', event);
      };
    };
  
    request.onerror = (event: Event) => {
      console.error('Error opening IndexedDB', event);
    };
  };
  
  const customStyle = {
    ...dark,
    'pre[class*="language-"]': {
      ...dark['pre[class*="language-"]'],
      background: '#001f3f',
    },
  };

  const renderCodeWithBackground = (code: string) => {
    const regexCodeBlock = /```(\w+)?\n([\s\S]*?)```/g;
    const regexBoldText = /\*\*(.*?)\*\*/g;

    let parts: (string | React.ReactNode)[] = [];
    let lastIndex = 0;

    code.replace(regexCodeBlock, (match, language, codeBlock, offset) => {
      if (offset > lastIndex) {
        const preCode = code.substring(lastIndex, offset);
        parts.push(
          ...preCode.split(regexBoldText).map((subPart, subIndex) =>
            subIndex % 2 === 1 ? (
              <strong key={subIndex} className="font-bold">
                {subPart}
              </strong>
            ) : (
              subPart
            )
          )
        );
      }
      parts.push(
        <div className="mb-4" key={offset}>
          <SyntaxHighlighter language={language || 'plaintext'} style={customStyle}>
            {codeBlock.trim()}
          </SyntaxHighlighter>
        </div>
      );
      lastIndex = offset + match.length;
      return match;
    });

    if (lastIndex < code.length) {
      const remainingText = code.substring(lastIndex);
      parts.push(
        ...remainingText.split(regexBoldText).map((subPart, subIndex) =>
          subIndex % 2 === 1 ? (
            <strong key={subIndex} className="font-bold">
              {subPart}
            </strong>
          ) : (
            subPart
          )
        )
      );
    }

    return parts;
  };



  const downloadFilesAsZip = async (): Promise<void> => {
    // Open the IndexedDB database
    const request = indexedDB.open('modelDatabase', 1);
  
    request.onsuccess = async (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
      const transaction = db.transaction(['models'], 'readonly');
      const objectStore = transaction.objectStore('models');
  
      // Retrieve all files from IndexedDB
      const allFilesRequest = objectStore.getAll();
  
      allFilesRequest.onsuccess = async (event: Event) => {
        const files = allFilesRequest.result as Array<{ filename: string, content: Blob }>;
  
        const zip = new JSZip();
  
        // Add files to the zip
        files.forEach((file) => {
          zip.file(file.filename, file.content);
        });
  
        // Generate the zip file and trigger download
        zip.generateAsync({ type: 'blob' }).then((content: Blob) => {
          saveAs(content, 'model.zip');
        });
      };
  
      allFilesRequest.onerror = (event: Event) => {
        console.error('Error retrieving files from IndexedDB', event);
      };
    };
  
    request.onerror = (event: Event) => {
      console.error('Error opening IndexedDB', event);
    };
  };

  return (
    <div className="bg-white flex flex-col p-8 shadow-md rounded-md w-[80%] self-center items-center">
      <h1 className="text-2xl font-bold mb-4">Model Generator</h1>
      <span className="text-gray-500 text-lg font-bold mb-4">
        Create your spring models using AI
      </span>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2 w-full">
        <textarea
          className="w-[90%] p-2 border rounded-md focus:outline-none focus:ring-1 bg-gray-200 focus:ring-green-500 resize-none"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          {!loading && <span>Generate</span>}
          {loading && (
            <div className="flex gap-2 items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="text-white">Loading...</span>
            </div>
          )}
        </button>
      </form>
      {code && (
        <div>
          <h2 className="text-xl font-bold mb-2">Generated Code:</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            {renderCodeWithBackground(code)}
          </div>
        </div>
      )}
      {loaded && (
        <> 
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md mt-4 self-center w-[40%] hover:bg-green-700"
          onClick={handleSaveFiles}
        >
          Models are valid, continue
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 self-center w-[40%] hover:bg-blue-700"
          onClick={downloadFilesAsZip}
        >
          get files
        </button>
</>
      )}
    </div>
  );
};

export default CodeGenerator;