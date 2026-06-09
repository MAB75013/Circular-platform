'use client';
import { useState } from 'react';
import { useAppStore } from '../../lib/store';
import { FORM_STEPS } from '../../lib/data';
import { Icon } from '../Icons';

const STEPS_DATA = [
  {
    title: 'Company information',
    fields: [
      { id:'legalName', label:'Legal company name *', type:'text', placeholder:'e.g. EcoLoop GmbH' },
      { id:'tradeName', label:'Trading name', type:'text', placeholder:'If different from legal name' },
      { id:'country', label:'Country of registration *', type:'select', opts:['France','Germany','Italy','United Kingdom','Spain','Switzerland','United States','Japan','Singapore','South Korea','Brazil','Mexico'] },
      { id:'website', label:'Website', type:'text', placeholder:'https://' },
      { id:'description', label:'Company description *', type:'textarea', placeholder:'Brief overview of your company and circular economy activities…' },
    ],
  },
  {
    title: 'Geographic coverage',
    fields: [
      { id:'region', label:'Primary region *', type:'select', opts:['EMEA','Americas','Asia','Global'] },
      { id:'countries', label:'Countries of operation *', type:'text', placeholder:'e.g. Germany, France, Netherlands' },
      { id:'network', label:'Collection network reach', type:'select', opts:['Local (1 country)','Regional (2–5 countries)','International (5+ countries)','Global'] },
    ],
  },
  {
    title: 'Circularity expertise',
    fields: [
      { id:'specialty', label:'Primary specialty *', type:'select', opts:['Reuse','Recycling','Both — Reuse & Recycling','Waste management'] },
      { id:'experience', label:'Years of circular economy experience *', type:'select', opts:['Less than 2 years','2–5 years','5–10 years','More than 10 years'] },
      { id:'certifications', label:'Certifications held', type:'text', placeholder:'e.g. ISO 14001, Cradle to Cradle, EMAS, GOTS' },
      { id:'luxuryExp', label:'Previous work with luxury goods? *', type:'select', opts:['Yes — regularly','Yes — occasionally','No, but capability exists','No'] },
    ],
  },
  {
    title: 'Technical capabilities',
    fields: [
      { id:'capacity', label:'Monthly processing capacity', type:'select', opts:['Less than 10 tonnes','10–50 tonnes','50–200 tonnes','More than 200 tonnes'] },
      { id:'materials', label:'Material types handled *', type:'text', placeholder:'e.g. Textiles, leather, metals, glass, packaging' },
      { id:'technologies', label:'Technologies & processes', type:'textarea', placeholder:'Describe your sorting, processing, or treatment technologies…' },
    ],
  },
  {
    title: 'Logistics capacity',
    fields: [
      { id:'collection', label:'Collection frequency', type:'select', opts:['Daily','Weekly','Bi-weekly','Monthly','On demand'] },
      { id:'storage', label:'Storage capacity', type:'select', opts:['Less than 100 m²','100–500 m²','500–2,000 m²','More than 2,000 m²'] },
      { id:'fleet', label:'Own fleet?', type:'select', opts:['Yes — full fleet','Yes — partial fleet','No — partner logistics only'] },
    ],
  },
  {
    title: 'Traceability & reporting',
    fields: [
      { id:'traceability', label:'Traceability system *', type:'select', opts:['None','Manual tracking','Digital system (proprietary)','Blockchain / distributed ledger'] },
      { id:'reporting', label:'Reporting maturity', type:'select', opts:['No reporting','Basic annual report','Regular reports available','Automated / real-time dashboards'] },
      { id:'impactData', label:'Can you provide impact data per collection? *', type:'select', opts:['Yes — fully','Yes — partially','In development','No'] },
    ],
  },
  {
    title: 'Due diligence documents',
    docs: [
      'Legal registration certificate / Kbis extract',
      'Compliance documentation',
      'Insurance certificate (valid)',
      'Governance / ownership structure',
    ],
  },
  {
    title: 'Review & submit',
    review: true,
  },
];

export default function QualificationForm() {
  const { addToast } = useAppStore();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});

  const pct = Math.round(((step + 1) / FORM_STEPS.length) * 100);
  const isLast = step === FORM_STEPS.length - 1;
  const current = STEPS_DATA[step];

  const handleField = (id: string, val: string) => setFormData(p => ({ ...p, [id]: val }));

  const handleNext = () => {
    if (isLast) { addToast('Qualification form submitted successfully!', 'success'); setStep(0); setFormData({}); }
    else setStep(s => s + 1);
  };

  return (
    <div className="animate-in" style={{ maxWidth:620, margin:'0 auto' }}>
      {/* Progress */}
      <div style={{ marginBottom:24 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
          <span style={{ fontSize:10, color:'var(--text-faint)', letterSpacing:'0.1em', textTransform:'uppercase' }}>Step {step + 1} of {FORM_STEPS.length}</span>
          <span style={{ fontSize:10, color:'var(--text-faint)' }}>{pct}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width:`${pct}%` }} />
        </div>
      </div>

      {/* Step indicator */}
      <div className="step-list" style={{ marginBottom:28 }}>
        {FORM_STEPS.map((s, i) => (
          <div key={s} className={`step-item${i < step ? ' done' : i === step ? ' active' : ''}`}>{s}</div>
        ))}
      </div>

      {/* Form card */}
      <div className="card" style={{ marginBottom:16 }}>
        <div style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:400, color:'var(--text-primary)', marginBottom:20 }}>
          {current.title}
        </div>

        {/* Regular fields */}
        {'fields' in current && current.fields.map(f => (
          <div key={f.id} className="form-group">
            <label className="form-label">{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea className="form-textarea" placeholder={f.placeholder} value={formData[f.id] || ''} onChange={e => handleField(f.id, e.target.value)} />
            ) : f.type === 'select' ? (
              <select className="form-select" value={formData[f.id] || ''} onChange={e => handleField(f.id, e.target.value)}>
                <option value="">— Select —</option>
                {f.opts?.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input className="form-input" type="text" placeholder={f.placeholder} value={formData[f.id] || ''} onChange={e => handleField(f.id, e.target.value)} />
            )}
          </div>
        ))}

        {/* Documents upload */}
        {'docs' in current && (
          <div>
            <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:20, lineHeight:1.7 }}>
              Upload or confirm the availability of the following documents. All files are stored securely and only accessible to authorised analysts.
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {current.docs.map((doc: string) => (
                <div key={doc} className="doc-item">
                  <Icon.File />
                  <span style={{ flex:1, color:'var(--text-secondary)', fontSize:12 }}>{doc}</span>
                  {uploadedDocs[doc] ? (
                    <span style={{ fontSize:9, color:'#6B8F3A', textTransform:'uppercase', letterSpacing:'0.08em', display:'flex', alignItems:'center', gap:4 }}>
                      <Icon.Check /> Uploaded
                    </span>
                  ) : (
                    <button className="btn btn-sm" onClick={() => { setUploadedDocs(p => ({ ...p, [doc]: true })); addToast(`${doc} uploaded`, 'success'); }}>
                      <Icon.Upload /> Upload
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Review */}
        {'review' in current && (
          <div>
            <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:20, lineHeight:1.7 }}>
              Please review the summary below before submitting. An analyst will review your submission within 5 business days.
            </div>
            <div style={{ background:'var(--bg-subtle)', borderRadius:'var(--r-md)', padding:20, border:'1px solid var(--border-faint)' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                {[
                  ['Legal name', formData.legalName || '—'],
                  ['Country', formData.country || '—'],
                  ['Specialty', formData.specialty || '—'],
                  ['Region', formData.region || '—'],
                  ['Experience', formData.experience || '—'],
                  ['Traceability', formData.traceability || '—'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize:9, color:'var(--text-faint)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:3 }}>{k}</div>
                    <div style={{ fontSize:12, color:'var(--text-primary)', fontWeight:500 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop:'1px solid var(--border-faint)', marginTop:16, paddingTop:14 }}>
                <div style={{ fontSize:9, color:'var(--text-faint)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>Documents</div>
                <div style={{ fontSize:12, color:'var(--text-secondary)' }}>
                  {Object.values(uploadedDocs).filter(Boolean).length} document(s) uploaded
                </div>
              </div>
            </div>
            <div style={{ fontSize:11, color:'var(--text-faint)', marginTop:14, lineHeight:1.7 }}>
              By submitting, you confirm that all information provided is accurate and complete. Submitting false information may result in disqualification.
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <button className="btn" style={{ visibility: step > 0 ? 'visible' : 'hidden' }} onClick={() => setStep(s => s - 1)}>
          <Icon.ArrowLeft /> Previous
        </button>
        <div style={{ display:'flex', gap:8 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => addToast('Draft saved', 'info')}>
            Save draft
          </button>
          <button className="btn btn-primary" onClick={handleNext}>
            {isLast ? <><Icon.Check /> Submit</> : <>Next <Icon.ArrowRight /></>}
          </button>
        </div>
      </div>
    </div>
  );
}
