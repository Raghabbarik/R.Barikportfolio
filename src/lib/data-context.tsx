
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
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
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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

const rehydrateSkills = (savedSkills: any[]): Skill[] => {
  return savedSkills.map(skill => ({ ...skill, icon: getIcon(skill.icon) || getIcon(skill.name) }));
};

const rehydrateServices = (savedServices: any[]): Service[] => {
  return savedServices.map(service => ({ ...service, icon: getIcon(service.icon) || getIcon(service.title) }));
};

const PORTFOLIO_DOC_ID = 'main-content';

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [about, setAbout] = useState<About>(initialAbout);
  const [contactDetails, setContactDetails] = useState<ContactDetail[]>(initialContactDetails);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  const { storage, firestore, user } = useFirebase();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      if (firestore) {
        setIsDataLoaded(false);
        const docRef = doc(firestore, 'portfolioContent', PORTFOLIO_DOC_ID);
        
        try {
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Data loaded from Firestore:", data);
            if (data.projects) setProjects(data.projects);
            if (data.skills) setSkills(rehydrateSkills(data.skills));
            if (data.services) setServices(rehydrateServices(data.services));
            if (data.about) setAbout(data.about);
            if (data.contactDetails) setContactDetails(data.contactDetails);
          } else {
            console.log("No such document! Initializing with default data.");
            setProjects(initialProjects);
            setSkills(initialSkills);
            setServices(initialServices);
            setAbout(initialAbout);
            setContactDetails(initialContactDetails);
          }
        } catch (error: any) {
          if (error.code === 'permission-denied') {
            const permissionError = new FirestorePermissionError({
              path: docRef.path,
              operation: 'get',
            });
            errorEmitter.emit('permission-error', permissionError);
          } else {
            console.error("Failed to load data from Firestore", error);
            toast({ variant: 'destructive', title: 'Error', description: 'Could not load portfolio data.' });
          }
        } finally {
          setIsDataLoaded(true);
        }
      }
    };
    loadData();
  }, [firestore, toast]); 

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
    if (!firestore) {
      toast({ variant: 'destructive', title: 'Error', description: 'Database not available.' });
      return;
    }
    if (!user) {
      toast({ variant: 'destructive', title: 'Authentication Error', description: 'You must be logged in to save data.' });
      return;
    }
    
    const dataToSave = {
        projects,
        skills: skills.map(({ icon, ...rest }) => ({...rest, icon: (icon as any)?.displayName || 'Code'})), 
        services: services.map(({ icon, ...rest }) => ({...rest, icon: (icon as any)?.displayName || 'Monitor'})),
        about,
        contactDetails
    };

    console.log("Saving all data to Firestore...", dataToSave);
    const docRef = doc(firestore, 'portfolioContent', PORTFOLIO_DOC_ID);
    
    setDoc(docRef, dataToSave, { merge: true }).catch(async (serverError) => {
        if (serverError.code === 'permission-denied') {
            const permissionError = new FirestorePermissionError({
                path: docRef.path,
                operation: 'update',
                requestResourceData: dataToSave,
            });
            errorEmitter.emit('permission-error', permissionError);
        } else {
            // Handle other errors (e.g., network issues)
            console.error("Failed to save data:", serverError);
            toast({
                variant: "destructive",
                title: "Error!",
                description: `Could not save changes: ${serverError.message}`,
            });
        }
    });

  }, [projects, skills, services, about, contactDetails, firestore, toast, user]);

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
