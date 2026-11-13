import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import styles from "./AdminSection.module.css";
import { compressImage } from "../../utils/imageUtils";

const EMPTY_SKILL = { title: "", level: 80, category: "technical" };

export const AdminSkills = () => {
  const { 
    skills = [], 
    addSkill, 
    updateSkill, 
    deleteSkill, 
    skillsSettings, 
    updateSkillsSettings,
    uploadHeroPhoto // reusing the same storage function for generic image upload
  } = usePortfolio();
  const [newSkill, setNewSkill] = useState(EMPTY_SKILL);
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [tab, setTab] = useState("technical");
  const [uploading, setUploading] = useState(false);

  const displayed = (skills || []).filter((s) => s.category === tab);

  const handleAdd = async () => {
    if (!newSkill.title.trim()) return;
    setAdding(true);
    await addSkill(newSkill);
    setNewSkill(EMPTY_SKILL);
    setAdding(false);
  };

  const startEdit = (skill) => {
    setEditId(skill.id);
    setEditForm({ ...skill });
  };

  const saveEdit = async () => {
    await updateSkill(editId, editForm);
    setEditId(null);
  };

  const handleBgChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const compressed = await compressImage(ev.target.result, 1920, 0.7);
        // Using uploadHeroPhoto as a generic storage uploader here for simplicity
        const url = await uploadHeroPhoto(compressed, `skills_bg_${Date.now()}`);
        await updateSkillsSettings({ ...skillsSettings, bgImage: url });
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}><i className="bi bi-code-slash" /> Skills</h2>
        <div className={styles.tabsSmall}>
          <button className={`${styles.tabSmall} ${tab === "technical" ? styles.tabSmallActive : ""}`} onClick={() => setTab("technical")}>Technical</button>
          <button className={`${styles.tabSmall} ${tab === "professional" ? styles.tabSmallActive : ""}`} onClick={() => setTab("professional")}>Professional</button>
        </div>
      </div>

      {/* Add new skill */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Add New Skill</h3>
        <div className={styles.inlineForm}>
          <input className="form-input" value={newSkill.title} onChange={(e) => setNewSkill((p) => ({ ...p, title: e.target.value }))} placeholder="Skill name (e.g. TypeScript)" />
          <select className="form-select" value={newSkill.category} onChange={(e) => setNewSkill((p) => ({ ...p, category: e.target.value }))}>
            <option value="technical">Technical</option>
            <option value="professional">Professional</option>
          </select>
          <div className={styles.sliderGroup}>
            <span>{newSkill.level}%</span>
            <input type="range" min="10" max="100" value={newSkill.level} onChange={(e) => setNewSkill((p) => ({ ...p, level: parseInt(e.target.value) }))} className={styles.slider} />
          </div>
          <button className="btn btn-primary" onClick={handleAdd} disabled={adding}>
            <i className="bi bi-plus-lg" /> {adding ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      {/* Skill list */}
      <div className={styles.itemsList}>
        {displayed.map((skill) => (
          <div key={skill.id} className={styles.skillItem}>
            {editId === skill.id ? (
              <div className={styles.editRow}>
                <input className="form-input" value={editForm.title} onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))} />
                <div className={styles.sliderGroup}>
                  <span>{editForm.level}%</span>
                  <input type="range" min="10" max="100" value={editForm.level} onChange={(e) => setEditForm((p) => ({ ...p, level: parseInt(e.target.value) }))} className={styles.slider} />
                </div>
                <button className="btn btn-primary" onClick={saveEdit}><i className="bi bi-check-lg" /> Save</button>
                <button className="btn btn-ghost" onClick={() => setEditId(null)}><i className="bi bi-x-lg" /></button>
              </div>
            ) : (
              <div className={styles.skillRow}>
                <div className={styles.skillInfo}>
                  <span className={styles.skillName}>{skill.title}</span>
                  <div className={styles.miniBar}>
                    <div className={styles.miniBarFill} style={{ width: `${skill.level}%` }} />
                  </div>
                  <span className={styles.skillPct}>{skill.level}%</span>
                </div>
                <div className={styles.itemActions}>
                  <button className={styles.editBtn} onClick={() => startEdit(skill)}><i className="bi bi-pencil-fill" /></button>
                  <button className={styles.deleteBtn} onClick={() => deleteSkill(skill.id)}><i className="bi bi-trash3-fill" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
        {displayed.length === 0 && (
          <div className={styles.emptyState}>
            <i className="bi bi-inbox" /> No {tab} skills yet. Add one above.
          </div>
        )}
      </div>

      {/* Section Settings */}
      <div className={styles.card} style={{ marginTop: "var(--space-2xl)" }}>
        <h3 className={styles.cardTitle}><i className="bi bi-gear-fill" /> Section Settings</h3>
        <div className={styles.grid2}>
          <div>
            <label className="form-label">Expertise Background Image</label>
            <div className={styles.photoPreview} style={{ height: "140px", marginBottom: "var(--space-md)" }}>
              <img 
                src={skillsSettings?.bgImage || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"} 
                alt="Skills BG Preview" 
                className={styles.photoImg} 
              />
              {uploading && <div className={styles.photoOverlay}><i className="bi bi-arrow-repeat" /> Uploading...</div>}
            </div>
            <label className={`btn btn-outline ${styles.uploadBtn}`}>
              <i className="bi bi-image" />
              {uploading ? "Uploading..." : "Change Background"}
              <input type="file" accept="image/*" onChange={handleBgChange} hidden />
            </label>
          </div>
          <div>
            <p className={styles.photoHint}>
              <strong>Note:</strong> This image will appear behind your skills bars with a dark overlay. 
              High-resolution wide images (1920px+) work best.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
