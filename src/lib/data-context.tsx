
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import type { Project, Skill, Service, About, ContactDetail, Certificate, Thought } from '@/lib/definitions';
import {
  projects as initialProjects,
  skills as initialSkills,
  services as initialServices,
  about as initialAbout,
  contactDetails as initialContactDetails,
  certificates as initialCertificates,
  thoughts as initialThoughts,
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
  certificates: Certificate[];
  setCertificates: React.Dispatch<React.SetStateAction<Certificate[]>>;
  thoughts: Thought[];
  setThoughts: React.Dispatch<React.SetStateAction<Thought[]>>;
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
  if (!Array.isArray(savedSkills)) return [];
  return savedSkills.map(skill => ({ ...skill, icon: getIcon(skill.icon) || getIcon(skill.name) }));
};

const rehydrateServices = (savedServices: any[]): Service[] => {
    if (!Array.isArray(savedServices)) return [];
  return savedServices.map(service => ({ ...service, icon: getIcon(service.icon) || getIcon(service.title) }));
};


export function DataProvider({ children }: { children: ReactNode }) {
  const { storage, firestore, user } = useFirebase();
  const { toast } = useToast();

  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [about, setAbout] = useState<About>(initialAbout);
  const [contactDetails, setContactDetails] = useState<ContactDetail[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  useEffect(() => {
    const loadData = async () => {
        setIsDataLoaded(false);
        if (!firestore) {
            console.warn("Firestore not ready, loading initial local data.");
            setProjects(initialProjects);
            setSkills(rehydrateSkills(initialSkills));
            setServices(rehydrateServices(initialServices));
            setCertificates(initialCertificates);
            setThoughts(initialThoughts);
            setAbout(initialAbout);
            setContactDetails(initialContactDetails);
            setIsDataLoaded(true);
            return;
        }

        const docRef = doc(firestore, 'portfolioContent', PORTFOLIO_DOC_ID);
        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Loading data from Firestore...");
                const data = docSnap.data();
                setProjects(data.projects || initialProjects);
                setSkills(rehydrateSkills(data.skills) || rehydrateSkills(initialSkills));
                setServices(rehydrateServices(data.services) || rehydrateServices(initialServices));
                setCertificates(data.certificates || initialCertificates);
                setThoughts(data.thoughts || initialThoughts);
                setAbout(data.about || initialAbout);
                setContactDetails(data.contactDetails || initialContactDetails);
            } else {
                console.log("No data in Firestore, loading initial local data.");
                setProjects(initialProjects);
                setSkills(rehydrateSkills(initialSkills));
                setServices(rehydrateServices(initialServices));
                setCertificates(initialCertificates);
                setThoughts(initialThoughts);
                setAbout(initialAbout);
                setContactDetails(initialContactDetails);
            }
        } catch (error) {
            console.error("Error fetching from Firestore, falling back to local data:", error);
            setProjects(initialProjects);
            setSkills(rehydrateSkills(initialSkills));
            setServices(rehydrateServices(initialServices));
            setCertificates(initialCertificates);
            setThoughts(initialThoughts);
            setAbout(initialAbout);
            setContactDetails(initialContactDetails);
        } finally {
            setIsDataLoaded(true);
        }
    };

    loadData();
  }, [firestore]);
  
  
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
      toast({ variant: 'destructive', title: 'Error', description: 'Database not available. Please try again.' });
      return;
    }
    if (!user) {
      toast({ variant: 'destructive', title: 'Authentication Error', description: 'You must be logged in to save data. Please log in and try again.' });
      return;
    }
    
    const dataToSave = {
        projects,
        skills: skills.map(({ icon, ...rest }) => ({...rest, icon: (icon as any)?.displayName || 'Code'})), 
        services: services.map(({ icon, ...rest }) => ({...rest, icon: (icon as any)?.displayName || 'Monitor'})),
        certificates,
        thoughts,
        about,
        contactDetails
    };

    const docRef = doc(firestore, 'portfolioContent', PORTFOLIO_DOC_ID);
    
    setDoc(docRef, dataToSave, { merge: true }).then(() => {
       toast({
        title: "Success!",
        description: "All your changes have been saved successfully.",
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
            console.error("Firestore save failed:", serverError);
            toast({
                variant: "destructive",
                title: "Save Failed!",
                description: `Could not save changes to the database: ${serverError.message}`,
            });
        }
    });

  }, [projects, skills, services, certificates, about, contactDetails, firestore, toast, user, thoughts]);

  return (
    <DataContext.Provider
      value={{
        projects,
        setProjects,
        skills,
        setSkills,
        services,
        setServices,
        certificates,
        setCertificates,
        thoughts,
        setThoughts,
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
