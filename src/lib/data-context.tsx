
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import type { Project, Skill, Service, About, ContactDetail } from '@/lib/definitions';
import {
  projects as initialProjects,
  skills as initialSkills,
  services as initialServices,
  about as initialAbout,
  contactDetails as initialContactDetails,
} from '@/lib/data';
import { getIcon } from '@/lib/get-icon';

interface DataContextType {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  about: About;
  setAbout: React.Dispatch<React.SetStateAction<About>>;
  contactDetails: ContactDetail[];
  setContactDetails: React.Dispatch<React.SetStateAction<ContactDetail[]>>;
  saveAllData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper to rehydrate icons which are not stored in JSON
const rehydrateSkills = (savedSkills: Omit<Skill, 'icon'>[]): Skill[] => {
  return savedSkills.map(skill => ({ ...skill, icon: getIcon(skill.name) }));
};

const rehydrateServices = (savedServices: Omit<Service, 'icon'>[]): Service[] => {
  return savedServices.map(service => ({ ...service, icon: getIcon(service.title) }));
};


export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [about, setAbout] = useState<About>(initialAbout);
  const [contactDetails, setContactDetails] = useState<ContactDetail[]>(initialContactDetails);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('portfolio-data');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData.projects) setProjects(parsedData.projects);
        if (parsedData.skills) setSkills(rehydrateSkills(parsedData.skills));
        if (parsedData.services) setServices(rehydrateServices(parsedData.services));
        if (parsedData.about) setAbout(parsedData.about);
        if (parsedData.contactDetails) setContactDetails(parsedData.contactDetails);
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    } finally {
        setIsDataLoaded(true);
    }
  }, []);

  const saveAllData = useCallback(async () => {
    // In a real app, this would be an API call to your backend to save the data.
    // Here, we'll simulate it with a timeout and log to the console.
    const dataToSave = {
        projects,
        // Remove icon components before saving to prevent circular JSON error
        skills: skills.map(({ icon, ...rest }) => ({...rest, icon: (icon as any).displayName})), 
        services: services.map(({ icon, ...rest }) => ({...rest, icon: (icon as any).displayName})),
        about,
        contactDetails
    };
    console.log("Saving all data...", dataToSave);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Data saved successfully!");
    localStorage.setItem('portfolio-data', JSON.stringify(dataToSave));
  }, [projects, skills, services, about, contactDetails]);


  // Render children only after data has been loaded to prevent flash of initial content
  if (!isDataLoaded) {
    return null; 
  }

  return (
    <DataContext.Provider
      value={{
        projects,
        setProjects,
        skills,
        setSkills,
        services,
        setServices,
        about,
        setAbout,
        contactDetails,
        setContactDetails,
        saveAllData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
