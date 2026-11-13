import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import styles from "./AdminSection.module.css";

const EMPTY_INTERN = { role: "", company: "", duration: "", description: "", tech: [] };

export const AdminInterns = () => {
  const { internships, addInternship, updateInternship, deleteInternship } = usePortfolio();
  const [form, setForm] = useState(EMPTY_INTERN);
  const [techInput, setTechInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const addTech = () => {
    if (techInput.trim()) {
      setForm((p) => ({ ...p, tech: [...(p.tech || []), techInput.trim()] }));
      setTechInput("");
    }
  };
  const removeTech = (i) => setForm((p) => ({ ...p, tech: p.tech.filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    if (!form.role.trim() || !form.company.trim()) return;
    setSaving(true);
    try {
      if (editId) {
        await updateInternship(editId, form);
        setEditId(null);
      } else {
        await addInternship(form);
      }
      setForm(EMPTY_INTERN);
      setTechInput("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save internship data.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (p) => {
    setEditId(p.id);
    setForm({ 
      role: p.role, 
      company: p.company, 
      duration: p.duration, 
      description: p.description, 
      tech: p.tech || [] 
    });
  };

  const cancelEdit = () => { setEditId(null); setForm(EMPTY_INTERN); };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}><i className="bi bi-briefcase-fill" /> Internships</h2>
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>{editId ? "Edit Internship" : "Add New Internship"}</h3>
        <div className={styles.grid2}>
          <div>
            <div className="form-group">
              <label className="form-label">Role / Job Title</label>
              <input className="form-input" value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} placeholder="Java Developer Intern" />
            </div>
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input className="form-input" value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} placeholder="Tech Solutions Inc." />
            </div>
            <div className="form-group">
              <label className="form-label">Duration</label>
              <input className="form-input" value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))} placeholder="June 2023 - Aug 2023" />
            </div>
          </div>
          <div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" rows={3} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Key responsibilities and achievements..." />
            </div>
            <div className="form-group">
              <label className="form-label">Tech Stack Tags</label>
              <div className={styles.tagList}>
                {(form.tech || []).map((t, i) => (
                  <div key={i} className={styles.tag}>{t}<button className={styles.tagRemove} onClick={() => removeTech(i)}><i className="bi bi-x" /></button></div>
                ))}
              </div>
              <div className={styles.tagInput}>
                <input className="form-input" value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="e.g. Java" onKeyDown={(e) => e.key === "Enter" && addTech()} />
                <button className="btn btn-outline" onClick={addTech}>Add</button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.formActions}>
          {showSuccess && <span className={styles.successMsg}><i className="bi bi-check-circle-fill" /> Experience saved!</span>}
          {editId && <button className="btn btn-ghost" onClick={cancelEdit}><i className="bi bi-x-lg" /> Cancel</button>}
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            <i className={`bi ${editId ? "bi-check-lg" : "bi-plus-lg"}`} />
            {saving ? "Saving..." : editId ? "Update Experience" : "Add Experience"}
          </button>
        </div>
      </div>

      <div className={styles.itemsList}>
        {(internships || []).map((item, i) => (
          <div key={item.id || i} className={styles.projectItem}>
            <div className={styles.projectItemInfo}>
              <div className={styles.projectItemTitle}>{item.role} @ {item.company}</div>
              <div className={styles.projectItemDesc}>{item.duration}</div>
              <div className={styles.techRow}>
                {(item.tech || []).map((t) => <span key={t} className={styles.techChip}>{t}</span>)}
              </div>
            </div>
            <div className={styles.itemActions}>
              <button className={styles.editBtn} onClick={() => startEdit(item)} title="Edit"><i className="bi bi-pencil-fill" /></button>
              <button className={styles.deleteBtn} onClick={() => {
                if(window.confirm(`Delete internship at "${item.company}"?`)) deleteInternship(item.id);
              }} title="Delete"><i className="bi bi-trash3-fill" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
