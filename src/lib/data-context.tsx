
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
import { useFirebase } from '@/firebase/provider';
import { uploadFile as uploadFileToStorage } from '@/firebase/storage';
import { useToast } from '@/hooks/use-toast';

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
  uploadFile: (file: File, path: string) => Promise<string | null>;
  isUploading: boolean;
  uploadProgress: number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper to rehydrate icons which are not stored in JSON
const rehydrateSkills = (savedSkills: any[]): Skill[] => {
  return savedSkills.map(skill => ({ ...skill, icon: getIcon(skill.icon) || getIcon(skill.name) }));
};

const rehydrateServices = (savedServices: any[]): Service[] => {
  return savedServices.map(service => ({ ...service, icon: getIcon(service.icon) || getIcon(service.title) }));
};


export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [about, setAbout] = useState<About>(initialAbout);
  const [contactDetails, setContactDetails] = useState<ContactDetail[]>(initialContactDetails);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  const { storage } = useFirebase();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
  
  const uploadFile = useCallback(async (file: File, path: string) => {
    if (!storage) {
        toast({
            variant: "destructive",
            title: "Storage not configured",
            description: "Firebase Storage is not available.",
        });
        return null;
    }
    setIsUploading(true);
    setUploadProgress(0);
    try {
        const url = await uploadFileToStorage(storage, path, file, setUploadProgress);
        toast({
            title: "Upload Successful",
            description: "Your image has been uploaded.",
        });
        return url;
    } catch (error) {
        console.error("Upload failed", error);
        toast({
            variant: "destructive",
            title: "Upload Failed",
            description: "Could not upload the image. Please try again.",
        });
        return null;
    } finally {
        setIsUploading(false);
        setUploadProgress(0);
    }
  }, [storage, toast]);

  const saveAllData = useCallback(async () => {
    const dataToSave = {
        projects,
        skills: skills.map(({ icon, ...rest }) => ({...rest, icon: (icon as any)?.displayName})), 
        services: services.map(({ icon, ...rest }) => ({...rest, icon: (icon as any)?.displayName})),
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
      throw error;
    }
  }, [projects, skills, services, about, contactDetails]);

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
        uploadFile,
        isUploading,
        uploadProgress
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

    