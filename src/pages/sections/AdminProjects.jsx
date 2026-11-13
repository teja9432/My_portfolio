import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import styles from "./AdminSection.module.css";

const EMPTY_PROJECT = { title: "", description: "", tech: [], link: "", github: "", featured: false };

export const AdminProjects = () => {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();
  const [form, setForm] = useState(EMPTY_PROJECT);
  const [techInput, setTechInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const addTech = () => {
    if (techInput.trim()) {
      setForm((p) => ({ ...p, tech: [...(p.tech || []), techInput.trim()] }));
      setTechInput("");
    }
  };
  const removeTech = (i) => setForm((p) => ({ ...p, tech: p.tech.filter((_, idx) => idx !== i) }));

  const handleAdd = async () => {
    if (!form.title.trim()) return;
    setAdding(true);
    try {
      if (editId) {
        await updateProject(editId, form);
        setEditId(null);
      } else {
        await addProject(form);
      }
      setForm(EMPTY_PROJECT);
      setTechInput("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save project. Check console for details.");
    } finally {
      setAdding(false);
    }
  };

  const startEdit = (p) => {
    if (!p.id) {
      console.warn("Project missing ID:", p);
      setEditId(null);
      return;
    }
    setEditId(p.id);
    setForm({ title: p.title, description: p.description, tech: p.tech || [], link: p.link || "", github: p.github || "", featured: p.featured || false });
  };

  const cancelEdit = () => { setEditId(null); setForm(EMPTY_PROJECT); };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}><i className="bi bi-grid-fill" /> Projects</h2>
      </div>

      {/* Form */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>{editId ? "Edit Project" : "Add New Project"}</h3>
        <div className={styles.grid2}>
          <div>
            <div className="form-group">
              <label className="form-label">Project Title</label>
              <input className="form-input" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="My Awesome Project" />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" rows={4} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Describe your project..." />
            </div>
          </div>
          <div>
            <div className="form-group">
              <label className="form-label">Technologies Used</label>
              <div className={styles.tagList}>
                {(form.tech || []).map((t, i) => (
                  <div key={i} className={styles.tag}>{t}<button className={styles.tagRemove} onClick={() => removeTech(i)}><i className="bi bi-x" /></button></div>
                ))}
              </div>
              <div className={styles.tagInput}>
                <input className="form-input" value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="e.g. React Js" onKeyDown={(e) => e.key === "Enter" && addTech()} />
                <button className="btn btn-outline" onClick={addTech}>Add</button>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Live URL</label>
              <input className="form-input" value={form.link} onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="form-group">
              <label className="form-label">GitHub URL</label>
              <input className="form-input" value={form.github} onChange={(e) => setForm((p) => ({ ...p, github: e.target.value }))} placeholder="https://github.com/..." />
            </div>
            <div className={styles.checkRow}>
              <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))} />
              <label htmlFor="featured">Mark as Featured</label>
            </div>
          </div>
        </div>
        <div className={styles.formActions}>
          {showSuccess && <span className={styles.successMsg}><i className="bi bi-check-circle-fill" /> Project saved successfully!</span>}
          {editId && <button className="btn btn-ghost" onClick={cancelEdit}><i className="bi bi-x-lg" /> Cancel</button>}
          <button className="btn btn-primary" onClick={handleAdd} disabled={adding}>
            <i className={`bi ${editId ? "bi-check-lg" : "bi-plus-lg"}`} />
            {adding ? "Saving..." : editId ? "Update Project" : "Add Project"}
          </button>
        </div>
      </div>

      {/* Project list */}
      <div className={styles.itemsList}>
        {(projects || []).map((project, i) => (
          <div key={project.id || i} className={styles.projectItem}>
            <div className={styles.projectItemInfo}>
              <div className={styles.projectItemTitle}>{project.title} {project.featured && <span className={styles.featuredTag}>Featured</span>}</div>
              <div className={styles.projectItemDesc}>{project.description?.slice(0, 80)}...</div>
              <div className={styles.techRow}>
                {(project.tech || []).map((t) => <span key={t} className={styles.techChip}>{t}</span>)}
              </div>
            </div>
            <div className={styles.itemActions}>
              <button className={styles.editBtn} onClick={() => startEdit(project)} title="Edit"><i className="bi bi-pencil-fill" /></button>
              <button className={styles.deleteBtn} onClick={() => {
                if(window.confirm(`Delete project "${project.title}"?`)) deleteProject(project.id);
              }} title="Delete"><i className="bi bi-trash3-fill" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
