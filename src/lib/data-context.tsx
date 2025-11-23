
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { doc, getDoc, setDoc, Firestore } from 'firebase/firestore';
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
  uploadFile: (file: File, path: string, onProgress: (progress: number) => void) => Promise<string | null>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const PORTFOLIO_DOC_ID = 'main-content';

const rehydrateSkills = (savedSkills: any[]): Skill[] => {
  if (!savedSkills) return [];
  return savedSkills.map(skill => ({ ...skill, icon: getIcon(skill.icon) || getIcon(skill.name) }));
};

const rehydrateServices = (savedServices: any[]): Service[] => {
  if (!savedServices) return [];
  return savedServices.map(service => ({ ...service, icon: getIcon(service.icon) || getIcon(service.title) }));
};

const fetcher = async (firestore: Firestore | null, docPath: string): Promise<any> => {
  if (!firestore) {
    return null;
  }
  const docRef = doc(firestore, docPath);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null; // No document found
  } catch (error: any) {
    if (error.code === 'permission-denied') {
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'get',
      });
      errorEmitter.emit('permission-error', permissionError);
      return null;
    } else {
      console.error("Firebase fetcher failed:", error);
    }
    return null;
  }
};


export function DataProvider({ children }: { children: ReactNode }) {
  const { storage, firestore, user } = useFirebase();
  const { mutate } = useSWRConfig();
  const { toast } = useToast();

  const { data: remoteData, isLoading } = useSWR(
    firestore ? `portfolioContent/${PORTFOLIO_DOC_ID}` : null,
    (path) => fetcher(firestore, path),
    { 
      revalidateOnFocus: false,
      shouldRetryOnError: false, // Don't retry on permission errors
    }
  );

  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [skills, setSkills] = useState<Skill[]>(rehydrateSkills(initialSkills));
  const [services, setServices] = useState<Service[]>(rehydrateServices(initialServices));
  const [about, setAbout] = useState<About>(initialAbout);
  const [contactDetails, setContactDetails] = useState<ContactDetail[]>(initialContactDetails);
  
  useEffect(() => {
    if (remoteData) {
      setProjects(remoteData.projects || initialProjects);
      setSkills(rehydrateSkills(remoteData.skills || initialSkills));
      setServices(rehydrateServices(remoteData.services || initialServices));
      setAbout(remoteData.about || initialAbout);
      setContactDetails(remoteData.contactDetails || initialContactDetails);
    } else if (!isLoading) {
      setProjects(initialProjects);
      setSkills(rehydrateSkills(initialSkills));
      setServices(rehydrateServices(initialServices));
      setAbout(initialAbout);
      setContactDetails(initialContactDetails);
    }
  }, [remoteData, isLoading]);
  
  const isDataLoaded = !isLoading;
  
  const uploadFile = useCallback(async (file: File, path: string, onProgress: (progress: number) => void) => {
    if (!storage) {
        toast({
            variant: "destructive",
            title: "Storage not configured",
            description: "Firebase Storage is not available.",
        });
        return null;
    }

    try {
        const url = await uploadFileToStorage(storage, path, file, onProgress);
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

    const docRef = doc(firestore, 'portfolioContent', PORTFOLIO_DOC_ID);
    
    setDoc(docRef, dataToSave, { merge: true }).then(() => {
       mutate(`portfolioContent/${PORTFOLIO_DOC_ID}`);
       toast({
        title: "Success!",
        description: "All your changes have been saved.",
      });
    }).catch(async (serverError) => {
        if (serverError.code === 'permission-denied') {
            const permissionError = new FirestorePermissionError({
                path: docRef.path,
                operation: 'update',
                requestResourceData: dataToSave,
            });
            errorEmitter.emit('permission-error', permissionError);
        } else {
            // For other errors, show a generic toast
            toast({
                variant: "destructive",
                title: "Error!",
                description: `Could not save changes: ${serverError.message}`,
            });
        }
    });

  }, [projects, skills, services, about, contactDetails, firestore, toast, user, mutate]);

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
