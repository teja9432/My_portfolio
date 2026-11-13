import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import styles from "./AdminSection.module.css";
import nptel from "../../assets/Certificates/nptel.png";
import java from "../../assets/Certificates/java_hack.png";
import edx from "../../assets/Certificates/edx1.png";
import { compressImage } from "../../utils/imageUtils";

const fallback = [nptel, java, edx];

export const AdminCerts = () => {
  const { certifications, addCertification, updateCertification, deleteCertification } = usePortfolio();
  const [form, setForm] = useState({ title: "", issuer: "", imageBase64: "" });
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const [adding, setAdding] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const compressed = await compressImage(ev.target.result);
      setPreview(compressed);
      setForm((p) => ({ ...p, imageBase64: compressed }));
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = async () => {
    if (!form.title.trim()) return;
    setAdding(true);
    if (editId) {
      await updateCertification(editId, form);
      setEditId(null);
    } else {
      await addCertification(form);
    }
    setForm({ title: "", issuer: "", imageBase64: "" });
    setPreview(null);
    setAdding(false);
  };

  const startEdit = (cert) => {
    if (!cert.id) {
      console.warn("Cert missing ID:", cert);
      setEditId(null);
      return;
    }
    setEditId(cert.id);
    setForm({ title: cert.title, issuer: cert.issuer, imageBase64: "" });
    setPreview(cert.image);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({ title: "", issuer: "", imageBase64: "" });
    setPreview(null);
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}><i className="bi bi-award-fill" /> Certifications</h2>
      </div>

      {/* Form */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>{editId ? "Edit Certification" : "Add Certification"}</h3>
        <div className={styles.certAddGrid}>
          <div className={styles.certUploadArea}>
            <label className={styles.certUpload}>
              {preview ? (
                <img src={preview} alt="preview" className={styles.certPreviewImg} />
              ) : (
                <div className={styles.certUploadPlaceholder}>
                  <i className="bi bi-cloud-upload" />
                  <span>Upload Image</span>
                  <span className={styles.certUploadHint}>JPG, PNG up to 2MB</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} hidden />
            </label>
          </div>
          <div className={styles.certFormFields}>
            <div className="form-group">
              <label className="form-label">Certificate Title</label>
              <input className="form-input" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="e.g. AWS Cloud Practitioner" />
            </div>
            <div className="form-group">
              <label className="form-label">Issuing Organization</label>
              <input className="form-input" value={form.issuer} onChange={(e) => setForm((p) => ({ ...p, issuer: e.target.value }))} placeholder="e.g. Amazon, NPTEL, Coursera" />
            </div>
            <div className={styles.formActions}>
              {editId && <button className="btn btn-ghost" onClick={cancelEdit}><i className="bi bi-x-lg" /> Cancel</button>}
              <button className="btn btn-primary" onClick={handleAdd} disabled={adding}>
                <i className={editId ? "bi-check-lg" : "bi-plus-circle-fill"} /> 
                {adding ? "Saving..." : editId ? "Update Certificate" : "Add Certificate"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div className={styles.certsGrid}>
        {(certifications || []).map((cert, i) => (
          <div key={cert.id || i} className={styles.certCard}>
            <div className={styles.certCardImg}>
              <img src={cert.image || fallback[i % fallback.length]} alt={cert.title}
                onError={(e) => { e.target.src = fallback[i % fallback.length]; }} />
            </div>
            <div className={styles.certCardInfo}>
              <div className={styles.certCardTitle}>{cert.title}</div>
              <div className={styles.certCardIssuer}>{cert.issuer}</div>
            </div>
            <div className={styles.itemActions}>
              <button className={styles.editBtn} onClick={() => startEdit(cert)} title="Edit"><i className="bi bi-pencil-fill" /></button>
              <button className={styles.deleteBtn} onClick={() => {
                if(window.confirm(`Delete certificate "${cert.title}"?`)) deleteCertification(cert.id);
              }} title="Delete"><i className="bi bi-trash3-fill" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
