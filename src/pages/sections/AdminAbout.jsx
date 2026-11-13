import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import styles from "./AdminSection.module.css";

export const AdminAbout = () => {
  const { about, updateAbout } = usePortfolio();
  const [form, setForm] = useState({ ...about });
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await updateAbout(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const updateStat = (i, field, value) => {
    const stats = [...(form.stats || [])];
    stats[i] = { ...stats[i], [field]: value };
    setForm((prev) => ({ ...prev, stats }));
  };

  const addStat = () => {
    setForm((prev) => ({ ...prev, stats: [...(prev.stats || []), { label: "", value: "" }] }));
  };

  const removeStat = (i) => {
    setForm((prev) => ({ ...prev, stats: prev.stats.filter((_, idx) => idx !== i) }));
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}><i className="bi bi-person-fill" /> About Section</h2>
        <button className={`btn btn-primary ${styles.saveBtn}`} onClick={handleSave}>
          {saved ? <><i className="bi bi-check-circle-fill" /> Saved!</> : <><i className="bi bi-cloud-upload-fill" /> Save Changes</>}
        </button>
      </div>

      <div className={styles.card}>
        <div className="form-group">
          <label className="form-label">About Description</label>
          <textarea
            className="form-textarea"
            value={form.description || ""}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            rows={8}
            placeholder="Write your about description..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Stats (shown in About card)</label>
          <div className={styles.statsList}>
            {(form.stats || []).map((stat, i) => (
              <div key={i} className={styles.statRow}>
                <input className="form-input" value={stat.value} onChange={(e) => updateStat(i, "value", e.target.value)} placeholder="3+" style={{ flex: "0 0 100px" }} />
                <input className="form-input" value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)} placeholder="Projects" />
                <button className={styles.deleteBtn} onClick={() => removeStat(i)}><i className="bi bi-trash3-fill" /></button>
              </div>
            ))}
          </div>
          <button className={`btn btn-outline ${styles.addBtn}`} onClick={addStat}>
            <i className="bi bi-plus-lg" /> Add Stat
          </button>
        </div>
      </div>
    </div>
  );
};
