import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import styles from "./AdminSection.module.css";
import meImg from "../../assets/me.jpeg";
import { compressImage } from "../../utils/imageUtils";

export const AdminHero = () => {
  const { hero, updateHero, uploadHeroPhoto } = usePortfolio();
  const [form, setForm] = useState({ ...hero });
  const [titleInput, setTitleInput] = useState("");
  const [uploading, setUploading] = useState(null); // 'photo' | 'bg' | null
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addTitle = () => {
    if (titleInput.trim()) {
      setForm((prev) => ({ ...prev, titles: [...(prev.titles || []), titleInput.trim()] }));
      setTitleInput("");
    }
  };

  const removeTitle = (i) => {
    setForm((prev) => ({ ...prev, titles: prev.titles.filter((_, idx) => idx !== i) }));
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading('photo');
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const compressed = await compressImage(ev.target.result);
        const url = await uploadHeroPhoto(compressed, file.name);
        setForm((prev) => ({ ...prev, photo: url }));
      } finally {
        setUploading(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBgChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading('bg');
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const compressed = await compressImage(ev.target.result, 1920, 0.7);
        const url = await uploadHeroPhoto(compressed, `bg_${file.name}`);
        setForm((prev) => ({ ...prev, bgImage: url }));
      } finally {
        setUploading(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    await updateHero(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}><i className="bi bi-house-fill" /> Hero Section</h2>
        <button className={`btn btn-primary ${styles.saveBtn}`} onClick={handleSave}>
          {saved ? <><i className="bi bi-check-circle-fill" /> Saved!</> : <><i className="bi bi-cloud-upload-fill" /> Save Changes</>}
        </button>
      </div>

      <div className={styles.grid2}>
        {/* Photo upload */}
        <div className={styles.photoBlock}>
          <div className={styles.photoPreview}>
            <img src={form.photo || meImg} alt="Preview" className={styles.photoImg}
              onError={(e) => { e.target.src = meImg; }} />
            {uploading && <div className={styles.photoOverlay}><i className="bi bi-arrow-repeat" /> Uploading...</div>}
          </div>
          <label className={`btn btn-outline ${styles.uploadBtn}`}>
            <i className="bi bi-camera-fill" />
            {uploading ? "Uploading..." : "Change Photo"}
            <input type="file" accept="image/*" onChange={handlePhotoChange} hidden />
          </label>
          <p className={styles.photoHint}>Recommended: Square image, min 400×400px</p>
        </div>

        {/* Form fields */}
        <div className={styles.formBlock}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" value={form.name || ""} onChange={(e) => handleChange("name", e.target.value)} placeholder="Tejeswara Rao" />
          </div>

          <div className="form-group">
            <label className="form-label">Bio / Tagline</label>
            <textarea className="form-textarea" value={form.bio || ""} onChange={(e) => handleChange("bio", e.target.value)} placeholder="Short introduction..." rows={4} />
          </div>

          <div className="form-group">
            <label className="form-label">Typewriter Titles</label>
            <div className={styles.tagList}>
              {(form.titles || []).map((t, i) => (
                <div key={i} className={styles.tag}>
                  {t}
                  <button className={styles.tagRemove} onClick={() => removeTitle(i)}>
                    <i className="bi bi-x" />
                  </button>
                </div>
              ))}
            </div>
            <div className={styles.tagInput}>
              <input className="form-input" value={titleInput} onChange={(e) => setTitleInput(e.target.value)}
                placeholder="e.g. React Developer" onKeyDown={(e) => e.key === "Enter" && addTitle()} />
              <button className="btn btn-primary" onClick={addTitle}>Add</button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Resume URL (optional)</label>
            <input className="form-input" value={form.resumeUrl || ""} onChange={(e) => handleChange("resumeUrl", e.target.value)} placeholder="https://drive.google.com/..." />
          </div>
        </div>

        {/* Section Background */}
        <div className={styles.formBlock} style={{ marginTop: "var(--space-xl)" }}>
          <h3 className={styles.cardTitle}><i className="bi bi-image-fill" /> Section Background</h3>
          <div className={styles.photoPreview} style={{ height: "150px", marginBottom: "var(--space-md)" }}>
            <img src={form.bgImage || "https://images.unsplash.com/photo-1510511459019-5dee8524ef10?q=80&w=2070&auto=format&fit=crop"} 
                 alt="BG Preview" className={styles.photoImg} />
            {uploading === 'bg' && <div className={styles.photoOverlay}><i className="bi bi-arrow-repeat" /> Uploading...</div>}
          </div>
          <label className={`btn btn-outline ${styles.uploadBtn}`}>
            <i className="bi bi-image" />
            {uploading === 'bg' ? "Uploading..." : "Change Background"}
            <input type="file" accept="image/*" onChange={(e) => handleBgChange(e)} hidden />
          </label>
        </div>
      </div>
    </div>
  );
};
