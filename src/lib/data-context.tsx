
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';
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

const PORTFOLIO_DOC_ID = 'main-content';

const rehydrateSkills = (savedSkills: any[]): Skill[] => {
  return savedSkills.map(skill => ({ ...skill, icon: getIcon(skill.icon) || getIcon(skill.name) }));
};

const rehydrateServices = (savedServices: any[]): Service[] => {
  return savedServices.map(service => ({ ...service, icon: getIcon(service.icon) || getIcon(service.title) }));
};

const fetcher = async (firestore: any, docPath: string) => {
  if (!firestore) return null;
  const docRef = doc(firestore, docPath);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error: any) {
    if (error.code === 'permission-denied') {
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'get',
      });
      errorEmitter.emit('permission-error', permissionError);
    } else {
      console.error("Fetcher failed:", error);
    }
    throw error;
  }
};


export function DataProvider({ children }: { children: ReactNode }) {
  const { storage, firestore, user } = useFirebase();
  const { mutate } = useSWRConfig();
  const { toast } = useToast();

  const { data: remoteData, error: remoteError } = useSWR(
    firestore ? `portfolioContent/${PORTFOLIO_DOC_ID}` : null,
    (path) => fetcher(firestore, path),
    { revalidateOnFocus: false }
  );

  const initialData = {
      projects: initialProjects,
      skills: initialSkills,
      services: initialServices,
      about: initialAbout,
      contactDetails: initialContactDetails,
  };

  const data = remoteData || initialData;

  const [projects, setProjects] = useState<Project[]>(data.projects);
  const [skills, setSkills] = useState<Skill[]>(rehydrateSkills(data.skills));
  const [services, setServices] = useState<Service[]>(rehydrateServices(data.services));
  const [about, setAbout] = useState<About>(data.about);
  const [contactDetails, setContactDetails] = useState<ContactDetail[]>(data.contactDetails);

  React.useEffect(() => {
    if (remoteData) {
        setProjects(remoteData.projects || []);
        setSkills(rehydrateSkills(remoteData.skills || []));
        setServices(rehydrateServices(remoteData.services || []));
        setAbout(remoteData.about || initialAbout);
        setContactDetails(remoteData.contactDetails || []);
    }
  }, [remoteData]);
  
  const isDataLoaded = remoteData !== undefined || remoteError !== undefined;
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
            console.error("Failed to save data:", serverError);
            toast({
                variant: "destructive",
                title: "Error!",
                description: `Could not save changes: ${serverError.message}`,
            });
        }
    });

    mutate(`portfolioContent/${PORTFOLIO_DOC_ID}`);

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
