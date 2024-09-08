'use client'
import React, { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { dockerConfig } from './dockerconfig';
import { applicationPropertiesContent } from './propertiesConfig';




const Custom: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingsec, setLoadingsec] = useState(false);
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
    setLoadingsec(true);
    // Regex to match Java code blocks
    const regexCodeBlock = /```java\n([\s\S]*?)```/g;
    // Regex to extract class or interface names from Java code
    const regexClassName = /(class|interface)\s+(\w+)/;
  
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
  
              // Extract the class or interface name using regex
              const classNameMatch = regexClassName.exec(content);
              if (classNameMatch) {
                const className = classNameMatch[2]; // Use the second capture group (class/interface name)
                const filename = `${className}.java`;
                const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  
                // Save the file to IndexedDB
                const fileData = { filename, content: blob };
                objectStore.put(fileData);
              }
            });
  
            transaction.oncomplete = () => {
              console.log('Files saved to IndexedDB');
              generateAndSaveProject();
              
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
  

  interface ProjectDetails {
    name: string;
    groupId: string;
    artifactId: string;
    dependencies: string[];
    bootVersion: string;
    javaVersion: string;
  }
  
  // Function to fetch the project from the server
  async function fetchProject(projectDetails: ProjectDetails): Promise<Blob> {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectDetails),
      });
  
      if (!response.ok) throw new Error('Failed to generate project');
  
      return await response.blob(); 
    } catch (error) {
      console.error('Error fetching project:', error);
      alert('An error occurred while fetching the project.');
      throw error;
    }
  }


  
  // Function to integrate models and save the project
// Function to integrate models and save the project
async function integrateModelsAndSaveProject(projectBlob: Blob) {
  try {
    const zip = await JSZip.loadAsync(projectBlob);

    // Open a transaction on the IndexedDB to retrieve model files
    const dbRequest = indexedDB.open('modelDatabase', 1);

    dbRequest.onsuccess = () => {
      const db = dbRequest.result;
      const transaction = db.transaction(['models'], 'readonly');
      const objectStore = transaction.objectStore('models');

      const allFilesRequest = objectStore.getAll();
      allFilesRequest.onsuccess = async (event: Event) => {
        const files = allFilesRequest.result as Array<{ filename: string, content: Blob }>;

        // Create the model folder inside the project ZIP
        const modelFolder = zip.folder('src/main/java/com/example/demo/');
        const resourcesFolder = zip.folder('src/main/resources/'); // Create the resources folder
        const rootFolder = zip.folder(''); // Access the root folder

        files.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            const fileContent = e.target?.result as string;
            if (modelFolder) {
              // Add the file to the model folder in the ZIP
              modelFolder.file(file.filename, fileContent);
            }
          };
          reader.readAsText(file.content);
        });

        // Write application.properties file
        
        resourcesFolder?.file('application.properties', applicationPropertiesContent);

        // Write docker-compose.yml file
        
        rootFolder?.file('docker-compose.yml', dockerConfig);

        // Wait for all files to be added before generating the final ZIP
        setTimeout(async () => {
          const finalZipBlob = await zip.generateAsync({ type: 'blob' });

          // Download the ZIP file
          saveAs(finalZipBlob, 'demo.zip');

          console.log('Project generated and downloaded successfully.');
          setLoadingsec(false);
        }, 1000); // Adjust delay as needed for file processing
      };
    };

    dbRequest.onerror = (event: Event) => {
      console.error('Error opening IndexedDB:', event);
    };

  } catch (error) {
    console.error('Error integrating models and saving project:', error);
    alert('An error occurred while integrating models and saving the project.');
  }
}

  
  // Main function to generate and save the project
  async function generateAndSaveProject() {
    // const projectDetails: ProjectDetails = {
    //   name: 'demo',
    //   groupId: 'com.example',
    //   artifactId: 'demo',
    //   dependencies: ['web', 'data-jpa', 'mysql','validation'],
    //   bootVersion: '3.2.0',
    //   javaVersion: '17',
    // };
  
    try {
      const projectBlob = await getProjectBlob();
      if (projectBlob) {
        await integrateModelsAndSaveProject(projectBlob);
      } 
      indexedDB.deleteDatabase('modelDatabase');
    } catch (error) {
      console.error('Error generating and saving project:', error);
    }
  }

  
  const downloadProject = async () => {
    const cachedFiles = localStorage.getItem('projectFiles');
    if (cachedFiles) {
      const files = JSON.parse(cachedFiles);
      const zip = new JSZip();

      Object.keys(files).forEach((filename) => {
        zip.file(filename, files[filename]);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const projectName = localStorage.getItem('project');
      saveAs(blob, `${projectName}.zip`);
    } else {
      console.error('No project files found to download.');
    }
  };
  const getProjectBlob = async (): Promise<Blob | null> => {
    const cachedFiles = localStorage.getItem('projectFiles');
    if (cachedFiles) {
      const files = JSON.parse(cachedFiles);
      const zip = new JSZip();
  
      // Add each file to the ZIP
      Object.keys(files).forEach((filename) => {
        zip.file(filename, files[filename]);
      });
  
      try {
        // Generate the ZIP file as a Blob
        const blob = await zip.generateAsync({ type: 'blob' });
        return blob;
      } catch (error) {
        console.error('Error generating ZIP blob:', error);
        return null;
      }
    } else {
      console.error('No project files found to generate ZIP.');
      return null;
    }
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




  return (
    <div className="bg-white flex flex-col p-8 shadow-md rounded-md w-[80%] self-center items-center">
      <h1 className="text-2xl font-bold mb-4">Model Generator</h1>
      <span className="text-gray-500 text-lg font-bold mb-4">
        Create your spring projects using AI
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
          className="bg-green-600 text-white px-4 py-2 rounded-md mt-4 self-center w-[40%] hover:bg-green-700 flex justify-center items-center"
          onClick={handleSaveFiles}
        >
         {!loadingsec && <span>Code is Valid, Generate Project</span>}
          {loadingsec && (
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
       
       </>
      )}
    </div>
  )

};

export default Custom;