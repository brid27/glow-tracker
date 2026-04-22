import { useState, useEffect } from “react”;

const PASSWORD = “Tracker”;
const AUTH_KEY = “thebri_auth”;

const ALL_ZONES = [
{
key: “face”, label: “Face”, emoji: “🌿”, color: “#E8D8F0”, accent: “#7A4A9A”,
defaults: [“Facial”, “Brows”, “Lip Wax”, “Full Face Wax”],
suggestions: [“Chin Wax”, “Sideburn Wax”, “Brow Tint”, “Brow Lamination”, “Dermaplaning”, “Chemical Peel”, “Microneedling”, “LED Treatment”],
},
{
key: “hair”, label: “Hair”, emoji: “✂️”, color: “#F0E4D8”, accent: “#8B5A2B”,
defaults: [“Trim / Cut”, “Color / Highlights”, “Protective Style”, “Deep Condition”, “Relaxer / Texturizer”, “Silk Press / Blowout”],
suggestions: [“Wig Install”, “Weave / Sew-In”, “Braids”, “Locs Retwist”, “Twist Out”, “Scalp Treatment”, “Big Chop”, “Keratin Treatment”, “Henna”, “Tape-In Extensions”],
},
{
key: “lashes”, label: “Lashes”, emoji: “👁️”, color: “#D8ECF8”, accent: “#2A6090”,
defaults: [“Lash Fill”, “New Set”, “Lash Lift”, “Lash Tint”],
suggestions: [“Lash Removal”, “Bottom Lash Extensions”, “Mega Volume Set”, “Classic Set”, “Hybrid Set”, “Natural Set”],
},
{
key: “teeth”, label: “Teeth”, emoji: “🦷”, color: “#E8F4FC”, accent: “#2A7AA0”,
defaults: [“Dental Cleaning”, “Whitening”, “Dental Check-Up”],
suggestions: [“Whitening Strips”, “Whitening Tray”, “Oil Pulling”, “Fluoride Treatment”, “Invisalign Check”, “Bonding / Veneer Appt”],
},
{
key: “vision”, label: “Vision”, emoji: “👓”, color: “#FFF0D8”, accent: “#A06820”,
defaults: [“Eye Exam”, “Contact Lens Check”, “New Glasses / Contacts”],
suggestions: [“Dry Eye Treatment”, “Eye Pressure Check”, “Retinal Scan”, “Prescription Update”],
},
{
key: “health”, label: “Health”, emoji: “🩺”, color: “#FFE4E8”, accent: “#A03050”,
defaults: [“Last Period”, “Gyno Visit”, “Physical Exam”, “Mammogram”, “Blood Work”],
suggestions: [“Pap Smear”, “STI Screening”, “Mental Health Check-In”, “Dermatologist Visit”, “Colonoscopy”, “Bone Density Scan”, “Thyroid Check”, “Allergy Testing”],
},
{
key: “wellness”, label: “Wellness”, emoji: “🤍”, color: “#E8F4EC”, accent: “#2E7A56”,
defaults: [“Massage”, “Body Scrub”, “Self Tan”],
suggestions: [“Float / Sensory Tank”, “Infrared Sauna”, “Hot Tub / Spa”, “Dry Brushing”, “Body Wrap”, “Cryotherapy”, “Acupuncture”, “Lymphatic Drainage”, “Spray Tan”],
},
{
key: “hands”, label: “Hands & Feet”, emoji: “💅”, color: “#F8E4EC”, accent: “#B0406A”,
defaults: [“Nails”, “Pedicure”],
suggestions: [“Gel Nails”, “Acrylic Fill”, “Nail Art”, “Paraffin Treatment”, “Callus Treatment”],
},
{
key: “body”, label: “Body”, emoji: “✨”, color: “#EAE4F8”, accent: “#5A3A9A”,
defaults: [“Brazilian”, “Leg Wax”, “Arm Wax”, “Shave”],
suggestions: [“Back Wax”, “Bikini Line”, “Underarm Wax”, “Full Body Wax”, “Sugaring”],
},
];

const STORAGE_KEY = “selfcare_full_v1”;

function timeSince(dateStr) {
if (!dateStr) return null;
const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
if (days === 0) return “Today 🩷”;
if (days === 1) return “Yesterday”;
if (days < 7) return `${days} days ago`;
if (days < 14) return “1 week ago”;
if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
if (days < 60) return “1 month ago”;
return `${Math.floor(days / 30)} months ago`;
}

// ── Password Screen ──────────────────────────────────────────
function PasswordScreen({ onUnlock }) {
const [val, setVal] = useState(””);
const [error, setError] = useState(false);
const [shake, setShake] = useState(false);

const attempt = () => {
if (val.trim() === PASSWORD) {
onUnlock();
} else {
setError(true);
setShake(true);
setTimeout(() => setShake(false), 500);
setVal(””);
}
};

return (
<div style={{
minHeight: “100vh”,
background: “linear-gradient(160deg, #1C0F1E 0%, #2E1535 50%, #1C0F1E 100%)”,
display: “flex”, flexDirection: “column”, alignItems: “center”, justifyContent: “center”,
padding: “24px”, fontFamily: “‘Palatino Linotype’, ‘Book Antiqua’, Palatino, serif”,
}}>
{/* Decorative orbs */}
<div style={{
position: “absolute”, width: 300, height: 300, borderRadius: “50%”,
background: “radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)”,
top: “10%”, left: “50%”, transform: “translateX(-50%)”,
pointerEvents: “none”,
}} />
<div style={{
position: “absolute”, width: 200, height: 200, borderRadius: “50%”,
background: “radial-gradient(circle, rgba(196,114,138,0.10) 0%, transparent 70%)”,
bottom: “15%”, right: “10%”,
pointerEvents: “none”,
}} />

```
  {/* Card */}
  <div style={{
    width: "100%", maxWidth: 360,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(201,168,76,0.3)",
    borderRadius: 24, padding: "40px 28px 36px",
    backdropFilter: "blur(10px)",
    textAlign: "center",
    animation: shake ? "shake 0.4s ease" : "fadeIn 0.6s ease",
  }}>
    {/* Brand */}
    <div style={{ fontSize: 10, color: "#C9A84C", letterSpacing: "0.35em", marginBottom: 10 }}>
      T H E B R I B Y D O R S E Y
    </div>
    <div style={{ fontSize: 11, color: "rgba(201,168,76,0.5)", marginBottom: 20, letterSpacing: "0.2em" }}>
      ✦ ———————— ✦
    </div>

    {/* Lock icon */}
    <div style={{ fontSize: 38, marginBottom: 12 }}>🔐</div>

    <h1 style={{ color: "white", fontWeight: "normal", fontSize: 22, margin: "0 0 6px" }}>
      My Self-Care Tracker
    </h1>
    <p style={{ color: "rgba(232,180,192,0.7)", fontSize: 13, margin: "0 0 28px", fontStyle: "italic" }}>
      Enter your access password to continue
    </p>

    {/* Input */}
    <input
      type="password"
      value={val}
      onChange={e => { setVal(e.target.value); setError(false); }}
      onKeyDown={e => e.key === "Enter" && attempt()}
      placeholder="Password"
      style={{
        width: "100%", padding: "14px 16px", borderRadius: 12, fontSize: 15,
        border: `1.5px solid ${error ? "#E87070" : "rgba(201,168,76,0.4)"}`,
        background: "rgba(255,255,255,0.07)", color: "white",
        fontFamily: "inherit", textAlign: "center", boxSizing: "border-box",
        marginBottom: 10, outline: "none",
        letterSpacing: "0.1em",
      }}
      autoFocus
    />

    {error && (
      <div style={{ color: "#E87070", fontSize: 12, marginBottom: 10 }}>
        Incorrect password — please try again
      </div>
    )}

    <button onClick={attempt} style={{
      width: "100%", padding: "14px",
      background: "linear-gradient(135deg, #C9A84C, #A07830)",
      color: "white", border: "none", borderRadius: 12,
      fontSize: 14, fontFamily: "inherit", cursor: "pointer",
      letterSpacing: "0.08em", fontWeight: 600, marginTop: 4,
    }}>
      Unlock My Tracker ✦
    </button>

    <p style={{ color: "rgba(184,144,154,0.5)", fontSize: 10, marginTop: 20, fontStyle: "italic" }}>
      Password provided in your purchase receipt
    </p>
  </div>

  <style>{`
    @keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
  `}</style>
</div>
```

);
}

// ── Zone Component ───────────────────────────────────────────
function Zone({ zone, items, dates, onEdit, onClear, onRemove, onAdd }) {
const [open, setOpen] = useState(true);
const [adding, setAdding] = useState(false);
const [input, setInput] = useState(””);
const logged = items.filter(i => dates[i.id]).length;

const availSuggestions = zone.suggestions.filter(
s => !items.some(i => i.label.toLowerCase() === s.toLowerCase())
);

const handleAdd = (label) => { onAdd(zone.key, label); setAdding(false); setInput(””); };

return (
<div style={{
marginBottom: 14, borderRadius: 20, overflow: “hidden”,
boxShadow: “0 2px 14px rgba(60,20,60,0.07)”, border: `1.5px solid ${zone.color}`,
}}>
<div onClick={() => setOpen(o => !o)} style={{
background: `linear-gradient(135deg, ${zone.color}90, ${zone.color}40)`,
padding: “13px 18px”, display: “flex”, alignItems: “center”, gap: 12, cursor: “pointer”,
}}>
<div style={{
width: 36, height: 36, borderRadius: “50%”, background: zone.color,
display: “flex”, alignItems: “center”, justifyContent: “center”,
fontSize: 16, flexShrink: 0,
}}>{zone.emoji}</div>
<div style={{ flex: 1 }}>
<div style={{ fontSize: 15, fontWeight: “bold”, color: zone.accent }}>{zone.label}</div>
<div style={{ fontSize: 11, color: `${zone.accent}80`, marginTop: 1 }}>
{items.length === 0
? “No services — tap to add”
: logged === 0
? `${items.length} service${items.length > 1 ? "s" : ""} · nothing logged yet`
: `${logged} of ${items.length} logged`}
</div>
</div>
<div style={{ fontSize: 18, color: zone.accent, transform: open ? “rotate(180deg)” : “rotate(0deg)”, transition: “transform 0.25s”, lineHeight: 1 }}>⌄</div>
</div>

```
  {open && (
    <div style={{ background: "#fff", padding: "4px 16px 4px" }}>
      {items.length === 0 && (
        <div style={{ padding: "14px 0", textAlign: "center", color: "#C0A8C0", fontSize: 13, fontStyle: "italic" }}>
          No services yet — add one below
        </div>
      )}
      {items.map((item, idx) => {
        const d = dates[item.id];
        const since = timeSince(d);
        return (
          <div key={item.id} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 2px",
            borderBottom: idx < items.length - 1 ? `1px solid ${zone.color}50` : "none",
          }}>
            <button onClick={() => onRemove(zone.key, item.id)} style={{
              width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
              border: `1px solid ${zone.color}`, background: "#FAF6FB",
              color: "#C090B0", fontSize: 12, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>×</button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#2E1A38" }}>{item.label}</div>
              <div style={{ fontSize: 11, marginTop: 1, color: d ? zone.accent : "#C0A8C0", fontStyle: d ? "normal" : "italic" }}>
                {d
                  ? <><span style={{ fontWeight: 600 }}>{since}</span>
                      <span style={{ color: "#C0A8C0", marginLeft: 6 }}>
                        · {new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span></>
                  : "Not logged yet"}
              </div>
            </div>
            <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
              {d && (
                <button onClick={() => onClear(item.id)} style={{
                  width: 26, height: 26, borderRadius: "50%",
                  border: `1px solid ${zone.color}`, background: "#FAF6FB",
                  color: "#B090B8", fontSize: 12, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>↺</button>
              )}
              <button onClick={() => onEdit(item.id, item.label, zone.emoji, zone.accent, zone.color)} style={{
                padding: "5px 13px", borderRadius: 20, fontSize: 11,
                background: d ? "#FAF6FB" : `linear-gradient(135deg, ${zone.accent}, ${zone.accent}BB)`,
                color: d ? zone.accent : "#fff",
                border: d ? `1.5px solid ${zone.color}` : "none",
                cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
              }}>{d ? "Edit" : "Log"}</button>
            </div>
          </div>
        );
      })}

      {!adding ? (
        <button onClick={() => setAdding(true)} style={{
          width: "100%", padding: "9px", margin: "6px 0 8px",
          background: "none", border: `1.5px dashed ${zone.color}`,
          borderRadius: 12, color: zone.accent, fontSize: 12,
          cursor: "pointer", fontFamily: "inherit",
        }}>+ Add a service</button>
      ) : (
        <div style={{ padding: "8px 0 12px" }}>
          {availSuggestions.length > 0 && (
            <>
              <div style={{ fontSize: 10, color: "#9A7060", marginBottom: 7, letterSpacing: "0.08em", textTransform: "uppercase" }}>Quick add</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                {availSuggestions.map(s => (
                  <button key={s} onClick={() => handleAdd(s)} style={{
                    padding: "5px 11px", borderRadius: 20, fontSize: 11,
                    border: `1.5px solid ${zone.color}`, background: "#fff",
                    color: zone.accent, cursor: "pointer", fontFamily: "inherit",
                  }}>{s}</button>
                ))}
              </div>
            </>
          )}
          <div style={{ fontSize: 10, color: "#9A7060", marginBottom: 5, letterSpacing: "0.08em", textTransform: "uppercase" }}>Type your own</div>
          <div style={{ display: "flex", gap: 7 }}>
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && input.trim() && handleAdd(input.trim())}
              placeholder="Service name..."
              style={{
                flex: 1, padding: "8px 11px", borderRadius: 10,
                border: `1.5px solid ${zone.color}`, fontSize: 12,
                fontFamily: "inherit", background: "#fff", color: "#2E1A38",
              }}
            />
            <button onClick={() => input.trim() && handleAdd(input.trim())} style={{
              padding: "8px 14px", borderRadius: 10, fontSize: 12,
              background: `linear-gradient(135deg, ${zone.accent}, ${zone.accent}AA)`,
              color: "#fff", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
            }}>Add</button>
          </div>
          <button onClick={() => { setAdding(false); setInput(""); }} style={{
            width: "100%", marginTop: 6, padding: "6px", background: "none",
            border: "none", color: "#B09080", fontSize: 11, cursor: "pointer", fontFamily: "inherit",
          }}>Cancel</button>
        </div>
      )}
    </div>
  )}
</div>
```

);
}

// ── Main App ─────────────────────────────────────────────────
export default function SelfCare() {
const [unlocked, setUnlocked] = useState(false);
const [dates, setDates] = useState({});
const [zoneItems, setZoneItems] = useState(() =>
Object.fromEntries(ALL_ZONES.map(z => [
z.key,
z.defaults.map((label, i) => ({ id: `${z.key}_default_${i}`, label }))
]))
);
const [editing, setEditing] = useState(null);
const [tempDate, setTempDate] = useState(””);

useEffect(() => {
try {
const auth = localStorage.getItem(AUTH_KEY);
if (auth === “true”) setUnlocked(true);
const s = localStorage.getItem(STORAGE_KEY);
if (s) {
const p = JSON.parse(s);
if (p.dates) setDates(p.dates);
if (p.zoneItems) setZoneItems(p.zoneItems);
}
} catch {}
}, []);

const handleUnlock = () => {
setUnlocked(true);
try { localStorage.setItem(AUTH_KEY, “true”); } catch {}
};

const persist = (d, zi) => {
try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ dates: d, zoneItems: zi })); } catch {}
};

const saveDates = (next) => { setDates(next); persist(next, zoneItems); };
const openEdit = (id, label, emoji, accent, color) => {
setEditing({ id, label, emoji, accent, color });
setTempDate(dates[id] || new Date().toISOString().split(“T”)[0]);
};
const confirm = () => { saveDates({ …dates, [editing.id]: tempDate }); setEditing(null); };
const clear = (id) => { const n = { …dates }; delete n[id]; saveDates(n); };

const addService = (zoneKey, label) => {
const id = `${zoneKey}_custom_${Date.now()}`;
const newZI = { …zoneItems, [zoneKey]: […zoneItems[zoneKey], { id, label }] };
setZoneItems(newZI); persist(dates, newZI);
};

const removeService = (zoneKey, id) => {
const newZI = { …zoneItems, [zoneKey]: zoneItems[zoneKey].filter(i => i.id !== id) };
const newD = { …dates }; delete newD[id];
setZoneItems(newZI); setDates(newD); persist(newD, newZI);
};

if (!unlocked) return <PasswordScreen onUnlock={handleUnlock} />;

return (
<div style={{ minHeight: “100vh”, background: “#FAF6FB”, fontFamily: “‘Palatino Linotype’, ‘Book Antiqua’, Palatino, serif” }}>
<div style={{ background: “linear-gradient(160deg, #1C0F1E 0%, #2E1535 50%, #3A1828 100%)”, padding: “38px 24px 30px”, textAlign: “center” }}>
<div style={{ fontSize: 10, color: “#C9A84C”, letterSpacing: “0.35em”, textTransform: “uppercase”, marginBottom: 6 }}>
T H E B R I B Y D O R S E Y
</div>
<div style={{ fontSize: 11, color: “rgba(201,168,76,0.4)”, marginBottom: 10, letterSpacing: “0.15em” }}>✦ ———————— ✦</div>
<div style={{ fontSize: 28, color: “#F5EAF2”, fontWeight: “normal”, letterSpacing: “0.04em” }}>My Self-Care</div>
<div style={{ marginTop: 6, fontSize: 13, color: “#C9A84C”, letterSpacing: “0.15em” }}>Track · Schedule · Glow</div>
<div style={{ marginTop: 8, fontSize: 11, color: “rgba(184,144,154,0.6)”, fontStyle: “italic” }}>Tap × to remove · + to add your own</div>
</div>

```
  <div style={{ padding: "18px 16px 70px" }}>
    {ALL_ZONES.map(zone => (
      <Zone key={zone.key} zone={zone} items={zoneItems[zone.key] || []}
        dates={dates} onEdit={openEdit} onClear={clear}
        onRemove={removeService} onAdd={addService} />
    ))}
  </div>

  {editing && (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(20,8,25,0.75)",
      display: "flex", alignItems: "flex-end", zIndex: 50, backdropFilter: "blur(8px)",
    }} onClick={e => e.target === e.currentTarget && setEditing(null)}>
      <div style={{ background: "#FDF8F5", width: "100%", borderRadius: "24px 24px 0 0", padding: "32px 24px 46px" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 36, marginBottom: 6 }}>{editing.emoji}</div>
          <div style={{ fontSize: 19, color: "#1C0F1E" }}>Last {editing.label}</div>
        </div>
        <input type="date" value={tempDate} onChange={e => setTempDate(e.target.value)}
          style={{
            width: "100%", padding: "14px", borderRadius: 14,
            border: `1.5px solid ${editing.color}`, fontSize: 15,
            fontFamily: "inherit", background: "#fff", color: "#1C0F1E",
            textAlign: "center", boxSizing: "border-box", marginBottom: 14,
          }}
        />
        <div style={{ display: "flex", gap: 8, marginBottom: 22, justifyContent: "center", flexWrap: "wrap" }}>
          {[["Today",0],["Yesterday",1],["1 week ago",7],["2 weeks ago",14],["1 month ago",30]].map(([label, offset]) => {
            const d = new Date(Date.now() - offset * 86400000).toISOString().split("T")[0];
            return (
              <button key={label} onClick={() => setTempDate(d)} style={{
                padding: "7px 13px", borderRadius: 20, fontSize: 12,
                border: `1.5px solid ${tempDate === d ? editing.accent : editing.color}`,
                background: tempDate === d ? editing.accent : "#fff",
                color: tempDate === d ? "#fff" : editing.accent,
                cursor: "pointer", fontFamily: "inherit",
              }}>{label}</button>
            );
          })}
        </div>
        <button onClick={confirm} style={{
          width: "100%", padding: "15px",
          background: "linear-gradient(135deg, #C9A84C, #A07830)",
          color: "#fff", border: "none", borderRadius: 14,
          fontSize: 15, fontFamily: "inherit", cursor: "pointer",
          letterSpacing: "0.05em", fontWeight: 600,
        }}>Save ✦</button>
      </div>
    </div>
  )}
</div>
```

);
}
