
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
import { Skeleton } from '@/components/ui/skeleton';

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
  isDataLoaded: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper to rehydrate icons which are not stored in JSON
const rehydrateSkills = (savedSkills: any[]): Skill[] => {
  return savedSkills.map(skill => ({ ...skill, icon: getIcon(skill.icon) }));
};

const rehydrateServices = (savedServices: any[]): Service[] => {
  return savedServices.map(service => ({ ...service, icon: getIcon(service.icon) }));
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
      // If loading fails, we still proceed with initial data
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
        skills: skills.map(({ icon, ...rest }) => ({...rest, icon: (icon as any)?.displayName || rest.name})), 
        services: services.map(({ icon, ...rest }) => ({...rest, icon: (icon as any)?.displayName || rest.title})),
        about,
        contactDetails
    };

    console.log("Saving all data...", dataToSave);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      localStorage.setItem('portfolio-data', JSON.stringify(dataToSave));
      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Failed to save data to localStorage", error);
      throw error; // Re-throw to be caught by the calling function
    }
  }, [projects, skills, services, about, contactDetails]);


  // Render a loader or skeleton while data is loading to prevent flash of initial content
  if (!isDataLoaded) {
    return (
      <div className="w-full min-h-screen bg-background p-8">
        <div className="space-y-8">
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
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
        isDataLoaded,
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
