import React, { createContext, useContext, useState, useEffect } from "react";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase";

const PortfolioContext = createContext();

// Default seed data
const defaultData = {
  hero: {
    name: "Tejeswara Rao",
    titles: ["Full Stack Developer", "Java Engineer", "React Developer"],
    bio: "I'm a passionate Full Stack Developer with a knack for turning ideas into reality. My journey in coding has equipped me with the skills to create dynamic, user-friendly web applications from start to finish.",
    photo: "",
    resumeUrl: "",
  },
  about: {
    description:
      "👋 Hello! I'm Tejeswara Rao, a Computer Science Engineer with a strong passion for innovation and technology. Pursuing a Bachelor's degree from Raghu Engineering College, I am a proficient software developer specializing in Java, Spring, Spring Boot, Microservices, HTML, CSS, JavaScript, React Js, Bootstrap, and SQL.",
    stats: [
      { label: "Projects", value: "3+" },
      { label: "Certifications", value: "3+" },
      { label: "Technologies", value: "8+" },
    ],
  },
  contact: {
    email: "karukolatejeswararao@gmail.com",
    phone: "9381475014",
    github: "https://github.com/teja9432",
    linkedin: "https://www.linkedin.com/in/tejeswararao/",
    instagram: "https://www.instagram.com/_teja_1432__/",
    whatsapp: "https://wa.me/919381475014",
  },
  skillsSettings: {
    bgImage: "",
  },
  internships: [],
};

const defaultSkills = [
  { id: "s1", title: "Java", level: 85, category: "technical" },
  { id: "s2", title: "Spring Boot", level: 80, category: "technical" },
  { id: "s3", title: "React Js", level: 80, category: "technical" },
  { id: "s4", title: "HTML", level: 93, category: "technical" },
  { id: "s5", title: "CSS", level: 80, category: "technical" },
  { id: "s6", title: "JavaScript", level: 75, category: "technical" },
  { id: "s7", title: "Oracle DB", level: 85, category: "technical" },
  { id: "s8", title: "Bootstrap", level: 83, category: "technical" },
  { id: "s9", title: "Team Working", level: 90, category: "professional" },
  { id: "s10", title: "Communication", level: 80, category: "professional" },
  { id: "s11", title: "Creativity", level: 70, category: "professional" },
  { id: "s12", title: "Project Management", level: 70, category: "professional" },
];

const defaultProjects = [
  {
    id: "p1",
    title: "Task Management Application",
    description:
      "A web-based tool built using the MERN stack designed to help users efficiently manage their tasks and to-dos with an intuitive interface. Users can create, update, and delete tasks, set priorities, and track progress.",
    tech: ["React Js", "Node.js", "MongoDB"],
    link: "",
    github: "",
    featured: true,
  },
  {
    id: "p2",
    title: "Portfolio Website",
    description:
      "A professional portfolio built with React.js showcasing my profile through sections: About, Skills, Certifications, Projects, and Contact. An interactive and comprehensive representation of my professional journey.",
    tech: ["React Js", "Vite", "CSS"],
    link: "",
    github: "https://github.com/teja9432",
    featured: true,
  },
  {
    id: "p3",
    title: "Gemini Clone",
    description:
      "A web application developed in React.js replicating the interface of a sophisticated AI chat platform. Features a clean, intuitive design with a user-friendly interface.",
    tech: ["React Js"],
    link: "",
    github: "",
    featured: false,
  },
];

const defaultCerts = [
  { id: "c1", title: "NPTEL Certification", issuer: "NPTEL", image: "" },
  { id: "c2", title: "Java Hackathon", issuer: "Hackathon", image: "" },
  { id: "c3", title: "edX Certificate", issuer: "edX", image: "" },
];

export const PortfolioProvider = ({ children }) => {
  const [hero, setHero] = useState(defaultData.hero);
  const [about, setAbout] = useState(defaultData.about);
  const [contact, setContact] = useState(defaultData.contact);
  const [skills, setSkills] = useState(defaultSkills);
  const [skillsSettings, setSkillsSettings] = useState(defaultData.skillsSettings);
  const [internships, setInternships] = useState(defaultData.internships);
  const [projects, setProjects] = useState(defaultProjects);
  const [certifications, setCertifications] = useState(defaultCerts);
  const [loading, setLoading] = useState(true);
  const [useFirebase, setUseFirebase] = useState(true);
  const [syncStatus, setSyncStatus] = useState("connecting"); // 'connecting' | 'online' | 'local-only'

  // Load from LocalStorage only as a backup initially
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_data");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.hero) setHero(data.hero);
        if (data.about) setAbout(data.about);
        if (data.contact) setContact(data.contact);
        if (data.skills) setSkills(data.skills);
        if (data.skillsSettings) setSkillsSettings(data.skillsSettings);
        if (data.internships) setInternships(data.internships);
        if (data.projects) setProjects(data.projects);
        if (data.certifications) setCertifications(data.certifications);
      } catch (e) {
        console.warn("Storage load failed:", e);
      }
    }
  }, []);

  useEffect(() => {
    console.log("Setting up Firebase listeners...");
    
    let active = true;
    const handleError = (err) => {
      console.warn("Firebase Sync Error:", err);
      // If permission denied or missing, fallback to local
      if (err.code === "permission-denied" || err.code === "unavailable") {
        setUseFirebase(false);
        setSyncStatus("local-only");
      }
    };

    // 1. Hero
    const unsubHero = onSnapshot(doc(db, "portfolio", "hero"), (snap) => {
      if (!active) return;
      setSyncStatus("online");
      if (snap.exists()) {
        setHero({ ...defaultData.hero, ...snap.data() });
      }
    }, handleError);

    // 2. About
    const unsubAbout = onSnapshot(doc(db, "portfolio", "about"), (snap) => {
      if (!active) return;
      if (snap.exists()) setAbout({ ...defaultData.about, ...snap.data() });
    }, handleError);

    // 3. Contact
    const unsubContact = onSnapshot(doc(db, "portfolio", "contact"), (snap) => {
      if (!active) return;
      if (snap.exists()) setContact({ ...defaultData.contact, ...snap.data() });
    }, handleError);

    // 4. Skills Settings
    const unsubSkillsSettings = onSnapshot(doc(db, "portfolio", "skillsSettings"), (snap) => {
      if (!active) return;
      if (snap.exists()) setSkillsSettings({ ...defaultData.skillsSettings, ...snap.data() });
    }, handleError);

    // 5. Internships
    const unsubInterns = onSnapshot(collection(db, "internships"), (snap) => {
      if (!active) return;
      if (!snap.empty) {
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setInternships(items);
      }
    }, handleError);

    // 4. Skills
    const unsubSkills = onSnapshot(collection(db, "skills"), (snap) => {
      if (!active) return;
      if (!snap.empty) {
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setSkills(items);
      }
    }, handleError);

    // 5. Projects
    const unsubProjects = onSnapshot(collection(db, "projects"), (snap) => {
      if (!active) return;
      if (!snap.empty) {
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setProjects(items);
      }
    }, handleError);

    // 6. Certifications
    const unsubCerts = onSnapshot(collection(db, "certifications"), (snap) => {
      if (!active) return;
      setSyncStatus("online");
      if (!snap.empty) {
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setCertifications(items);
      }
    }, handleError);

    setLoading(false);

    return () => {
      active = false;
      unsubHero();
      unsubAbout();
      unsubContact();
      unsubSkillsSettings();
      unsubInterns();
      unsubSkills();
      unsubProjects();
      unsubCerts();
    };
  }, []);

  const saveToLocalStorage = (key, value) => {
    try {
      const saved = JSON.parse(localStorage.getItem("portfolio_data") || "{}");
      saved[key] = value;
      localStorage.setItem("portfolio_data", JSON.stringify(saved));
    } catch (e) {
      console.warn("localStorage save failed:", e);
    }
  };

  // --- HERO ---
  const updateHero = async (data) => {
    setHero(data);
    if (useFirebase) {
      try {
        await setDoc(doc(db, "portfolio", "hero"), data);
      } catch (e) {
        saveToLocalStorage("hero", data);
      }
    } else {
      saveToLocalStorage("hero", data);
    }
  };

  const uploadHeroPhoto = async (base64Data, fileName) => {
    if (!useFirebase) {
      const updated = { ...hero, photo: base64Data };
      setHero(updated);
      saveToLocalStorage("hero", updated);
      return base64Data;
    }
    try {
      const storageRef = ref(storage, `portfolio/hero/${fileName}`);
      await uploadString(storageRef, base64Data, "data_url");
      const url = await getDownloadURL(storageRef);
      const updated = { ...hero, photo: url };
      await setDoc(doc(db, "portfolio", "hero"), updated);
      setHero(updated);
      return url;
    } catch (e) {
      console.warn("Storage upload failed, saving as base64:", e);
      const updated = { ...hero, photo: base64Data };
      setHero(updated);
      saveToLocalStorage("hero", updated);
      return base64Data;
    }
  };

  // --- ABOUT ---
  const updateAbout = async (data) => {
    setAbout(data);
    if (useFirebase) {
      try {
        await setDoc(doc(db, "portfolio", "about"), data);
      } catch (e) {
        saveToLocalStorage("about", data);
      }
    } else {
      saveToLocalStorage("about", data);
    }
  };

  // --- CONTACT ---
  const updateContact = async (data) => {
    setContact(data);
    if (useFirebase) {
      try {
        await setDoc(doc(db, "portfolio", "contact"), data);
      } catch (e) {
        saveToLocalStorage("contact", data);
      }
    } else {
      saveToLocalStorage("contact", data);
    }
  };

  // --- SKILLS ---
  const addSkill = async (skill) => {
    if (useFirebase) {
      try {
        const docRef = await addDoc(collection(db, "skills"), skill);
        const newSkill = { id: docRef.id, ...skill };
        setSkills((prev) => [...prev, newSkill]);
        return newSkill;
      } catch (e) {
        const newSkill = { id: Date.now().toString(), ...skill };
        const updated = [...skills, newSkill];
        setSkills(updated);
        saveToLocalStorage("skills", updated);
        return newSkill;
      }
    } else {
      const newSkill = { id: Date.now().toString(), ...skill };
      const updated = [...skills, newSkill];
      setSkills(updated);
      saveToLocalStorage("skills", updated);
      return newSkill;
    }
  };

  const updateSkill = async (id, data) => {
    const updated = skills.map((s) => (s.id === id ? { ...s, ...data } : s));
    setSkills(updated);
    if (useFirebase) {
      try {
        await updateDoc(doc(db, "skills", id), data);
      } catch (e) {
        saveToLocalStorage("skills", updated);
      }
    } else {
      saveToLocalStorage("skills", updated);
    }
  };

  const deleteSkill = async (id) => {
    const updated = skills.filter((s) => s.id !== id);
    setSkills(updated);
    if (useFirebase) {
      try {
        await deleteDoc(doc(db, "skills", id));
      } catch (e) {
        saveToLocalStorage("skills", updated);
      }
    } else {
      saveToLocalStorage("skills", updated);
    }
  };

  const updateSkillsSettings = async (data) => {
    setSkillsSettings(data);
    if (useFirebase) {
      try {
        await setDoc(doc(db, "portfolio", "skillsSettings"), data);
      } catch (e) {
        saveToLocalStorage("skillsSettings", data);
      }
    } else {
      saveToLocalStorage("skillsSettings", data);
    }
  };

  // --- INTERNSHIPS ---
  const addInternship = async (intern) => {
    if (useFirebase) {
      try {
        const docRef = await addDoc(collection(db, "internships"), intern);
        const newItem = { id: docRef.id, ...intern };
        setInternships((prev) => [...prev, newItem]);
        return newItem;
      } catch (e) {
        const newItem = { id: Date.now().toString(), ...intern };
        const updated = [...internships, newItem];
        setInternships(updated);
        saveToLocalStorage("internships", updated);
        return newItem;
      }
    } else {
      const newItem = { id: Date.now().toString(), ...intern };
      const updated = [...internships, newItem];
      setInternships(updated);
      saveToLocalStorage("internships", updated);
      return newItem;
    }
  };

  const updateInternship = async (id, data) => {
    const updated = internships.map((i) => (i.id === id ? { ...i, ...data } : i));
    setInternships(updated);
    if (useFirebase) {
      try {
        await updateDoc(doc(db, "internships", id), data);
      } catch (e) {
        saveToLocalStorage("internships", updated);
      }
    } else {
      saveToLocalStorage("internships", updated);
    }
  };

  const deleteInternship = async (id) => {
    const updated = internships.filter((i) => i.id !== id);
    setInternships(updated);
    if (useFirebase) {
      try {
        await deleteDoc(doc(db, "internships", id));
      } catch (e) {
        saveToLocalStorage("internships", updated);
      }
    } else {
      saveToLocalStorage("internships", updated);
    }
  };

  // --- PROJECTS ---
  const addProject = async (project) => {
    if (useFirebase) {
      try {
        const docRef = await addDoc(collection(db, "projects"), project);
        const newProject = { id: docRef.id, ...project };
        setProjects((prev) => [...prev, newProject]);
        return newProject;
      } catch (e) {
        const newProject = { id: Date.now().toString(), ...project };
        const updated = [...projects, newProject];
        setProjects(updated);
        saveToLocalStorage("projects", updated);
        return newProject;
      }
    } else {
      const newProject = { id: Date.now().toString(), ...project };
      const updated = [...projects, newProject];
      setProjects(updated);
      saveToLocalStorage("projects", updated);
      return newProject;
    }
  };

  const updateProject = async (id, data) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, ...data } : p));
    setProjects(updated);
    if (useFirebase) {
      try {
        await updateDoc(doc(db, "projects", id), data);
      } catch (e) {
        saveToLocalStorage("projects", updated);
      }
    } else {
      saveToLocalStorage("projects", updated);
    }
  };

  const deleteProject = async (id) => {
    if (!id) {
      console.error("deleteProject: Missing ID");
      return;
    }
    console.log("deleting project:", id);
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    if (useFirebase) {
      try {
        await deleteDoc(doc(db, "projects", id));
        console.log("Firestore delete successful");
      } catch (e) {
        console.warn("Firestore delete failed, using local:", e);
        saveToLocalStorage("projects", updated);
      }
    } else {
      saveToLocalStorage("projects", updated);
    }
  };

  // --- CERTIFICATIONS ---
  const addCertification = async (cert) => {
    if (useFirebase) {
      try {
        const certData = { ...cert };
        if (cert.imageBase64) {
          const storageRef = ref(storage, `portfolio/certs/${Date.now()}`);
          await uploadString(storageRef, cert.imageBase64, "data_url");
          certData.image = await getDownloadURL(storageRef);
          delete certData.imageBase64;
        }
        const docRef = await addDoc(collection(db, "certifications"), certData);
        const newCert = { id: docRef.id, ...certData };
        setCertifications((prev) => [...prev, newCert]);
        return newCert;
      } catch (e) {
        const newCert = { id: Date.now().toString(), ...cert, image: cert.imageBase64 || "" };
        const updated = [...certifications, newCert];
        setCertifications(updated);
        saveToLocalStorage("certifications", updated);
        return newCert;
      }
    } else {
      const newCert = { id: Date.now().toString(), ...cert, image: cert.imageBase64 || "" };
      const updated = [...certifications, newCert];
      setCertifications(updated);
      saveToLocalStorage("certifications", updated);
      return newCert;
    }
  };

  const updateCertification = async (id, data) => {
    try {
      let certData = { ...data };
      if (data.imageBase64) {
        const storageRef = ref(storage, `portfolio/certs/${Date.now()}`);
        await uploadString(storageRef, data.imageBase64, "data_url");
        certData.image = await getDownloadURL(storageRef);
        delete certData.imageBase64;
      }

      const updated = certifications.map((c) => (c.id === id ? { ...c, ...certData } : c));
      setCertifications(updated);

      if (useFirebase) {
        await updateDoc(doc(db, "certifications", id), certData);
      } else {
        saveToLocalStorage("certifications", updated);
      }
    } catch (e) {
      console.error("Update certification failed:", e);
      // Fallback
      const updated = certifications.map((c) => (c.id === id ? { ...c, ...data, image: data.imageBase64 || c.image } : c));
      setCertifications(updated);
      saveToLocalStorage("certifications", updated);
    }
  };

  const deleteCertification = async (id) => {
    const updated = certifications.filter((c) => c.id !== id);
    setCertifications(updated);
    if (useFirebase) {
      try {
        await deleteDoc(doc(db, "certifications", id));
      } catch (e) {
        saveToLocalStorage("certifications", updated);
      }
    } else {
      saveToLocalStorage("certifications", updated);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        hero,
        about,
        contact,
        skills,
        projects,
        certifications,
        skillsSettings,
        internships,
        loading,
        useFirebase,
        syncStatus,
        updateHero,
        uploadHeroPhoto,
        updateAbout,
        updateContact,
        addSkill,
        updateSkill,
        deleteSkill,
        updateSkillsSettings,
        addInternship,
        updateInternship,
        deleteInternship,
        addProject,
        updateProject,
        deleteProject,
        addCertification,
        updateCertification,
        deleteCertification,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
};
