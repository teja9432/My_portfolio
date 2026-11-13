import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import styles from "./AdminSection.module.css";

export const AdminContact = () => {
  const { contact, updateContact } = usePortfolio();
  const [form, setForm] = useState({ ...contact });
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const handleSave = async () => {
    await updateContact(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const fields = [
    { key: "email",    label: "Email Address",  icon: "bi-envelope-fill",    placeholder: "your@email.com",            type: "email" },
    { key: "phone",    label: "Phone Number",   icon: "bi-telephone-fill",   placeholder: "9381475014",                type: "tel" },
    { key: "github",   label: "GitHub URL",     icon: "bi-github",           placeholder: "https://github.com/...",    type: "url" },
    { key: "linkedin", label: "LinkedIn URL",   icon: "bi-linkedin",         placeholder: "https://linkedin.com/in/...", type: "url" },
    { key: "instagram",label: "Instagram URL",  icon: "bi-instagram",        placeholder: "https://instagram.com/...", type: "url" },
    { key: "whatsapp", label: "WhatsApp URL",   icon: "bi-whatsapp",         placeholder: "https://wa.me/91...",       type: "url" },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}><i className="bi bi-envelope-fill" /> Contact Details</h2>
        <button className={`btn btn-primary ${styles.saveBtn}`} onClick={handleSave}>
          {saved ? <><i className="bi bi-check-circle-fill" /> Saved!</> : <><i className="bi bi-cloud-upload-fill" /> Save Changes</>}
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.contactGrid}>
          {fields.map(({ key, label, icon, placeholder, type }) => (
            <div key={key} className="form-group">
              <label className="form-label">
                <i className={`bi ${icon}`} style={{ color: "var(--color-primary)", marginRight: 6 }} />{label}
              </label>
              <input
                className="form-input"
                type={type}
                value={form[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
