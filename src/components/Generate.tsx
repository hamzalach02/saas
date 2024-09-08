"use client"
import React, { useState } from 'react';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { openDB, deleteDB, wrap, unwrap } from 'idb';
import Link from 'next/link';

interface ProjectForm {
  name: string;
  groupId: string;
  artifactId: string;
  dependencies: string[];
  bootVersion: string;
  javaVersion: string;
}

const availableDependencies = [
  'web', 
  'jpa', 
  'mysql', 
  'data-rest', 
  'security', 
  'thymeleaf', 
  'validation', 
  'actuator', 
  'devtools',
  'h2', 
  'batch', 
  'cloud',
  'websocket',
  'aop', 
  'cache', 
  'mail', 
  'quartz', 
  'mongodb', 
  'redis', 
  'rabbitmq', 
  'kafka', 
  'cloud-config-client', 
  'cloud-eureka', 
  'cloud-hystrix', 
  'cloud-feign', 
  'cloud-gateway', 
  'cloud-zuul', 
  'cloud-sleuth', 
  'cloud-oauth2', 
  'cloud-security', 
  'cloud-stream', 
  'integration', 
  'jooq',
  'liquibase',
  'flyway',
  'oauth2-client',
  'oauth2-resource-server',
  'session',
  'ldap',
  'jdbc',
  'test',
  'testcontainers',
  'restdocs',
  'graphql'
];


const ProjectGenerator: React.FC = () => {
  const [formData, setFormData] = useState<ProjectForm>({
    name: '',
    groupId: '',
    artifactId: '',
    dependencies: [],
    bootVersion: '3.2.0',
    javaVersion: '11',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading,setLoading] = useState(false)
  const [loaded,setLoaded] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      dependencies: checked
        ? [...prevFormData.dependencies, value]
        : prevFormData.dependencies.filter(dep => dep !== value),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/generate', formData, {
        responseType: 'blob',
      });

      const zip = new JSZip();
      const content = await zip.loadAsync(response.data);
      const files: { [key: string]: string } = {};

      for (const [filename, file] of Object.entries(content.files)) {
        if (!file.dir) {
          const fileData = await file.async('text');
          files[filename] = fileData;
        }
      }

      // Save the files in localStorage or indexedDB
      localStorage.setItem('projectFiles', JSON.stringify(files));
      localStorage.setItem('project', formData.artifactId);

      console.log('Project files saved to cache:', files);
      setLoading(false);
      setLoaded(true);
    } catch (error) {
      console.error('Error generating project:', error);
    }
  };


  const downloadProject = async () => {
    const cachedFiles = localStorage.getItem('projectFiles');
    if (cachedFiles) {
      const files = JSON.parse(cachedFiles);
      const zip = new JSZip();

      Object.keys(files).forEach((filename) => {
        zip.file(filename, files[filename]);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, `${formData.artifactId}.zip`);
    } else {
      console.error('No project files found to download.');
    }
  };

  return (
   <div className='min-h-screen flex justify-center items-baseline '>
     <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-20">
      <h1 className="text-4xl font-bold mb-4 text-center underline decoration-green-500">Spring Boot Project Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Project Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Group ID:</label>
          <input
            type="text"
            name="groupId"
            value={formData.groupId}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Artifact ID:</label>
          <input
            type="text"
            name="artifactId"
            value={formData.artifactId}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Dependencies:</label>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-green-700 text-white"
          >
            Select Dependencies
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Spring Boot Version:</label>
          <input
            type="text"
            name="bootVersion"
            value={formData.bootVersion}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Java Version:</label>
          <input
            type="text"
            name="javaVersion"
            value={formData.javaVersion}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 focus:outline-none rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-700 hover:bg-opacity-70 ">
           { !loading && <span>Generate Project</span>}
           {loading && 
            <div className='flex gap-2 items-center'>
                <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="stext-white">Loading...</span>
            </div>
            }
          </button>
        
        </div>
       {loaded && <div className='flex gap-2 items-center bg-green-200 rounded-md w-full p-4'> 
            <span className='text-green-800 text-sm'>Project Generated Successfully !!</span>
            <button className='bg-green-700 rounded-md px-3 py-1 text-sm text-white'  onClick={downloadProject}>download</button>
            <Link href='/custom' className='bg-darker-blue   rounded-md py-1 px-2  text-sm  text-white hover:bg-opacity-40'>Continue</Link>
        </div>}
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-lg font-semibold mb-4">Select Dependencies</h2>
          <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-60">
            {availableDependencies.map((dependency) => (
              <label key={dependency} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={dependency}
                  checked={formData.dependencies.includes(dependency)}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-gray-700">{dependency}</span>
              </label>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="inline-flex justify-center py-2 px-4 border border-transparent bg-green-700 shadow-sm text-sm font-medium rounded-md text-white "
            >
              Done
            </button>
          </div>
        </div>
      </div>
      
      )}
    </div>
   </div>
  );
};

export default ProjectGenerator;
