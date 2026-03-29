import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState("");
  const [type, setType] = useState("");
  const [rewritten, setRewritten] = useState("");
  const [loading, setLoading] = useState(false);

  const tones = ["professional", "friendly", "apologetic", "confident"];
  const types = ["email", "message"];
  const MAX_LIMIT = 1000;

  // 🎭 Effect to dynamically change BODY background based on TONE 🎭
  useEffect(() => {
    // Remove old tone classes from body
    document.body.className = '';
    // Add new tone class to body
    if (tone) {
      document.body.classList.add(`body-tone-${tone}`);
    } else {
      document.body.classList.add('body-tone-default');
    }
  }, [tone]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setMessage(val);
    if (val.trim() === "") setRewritten("");
  };

  const handleReset = () => {
    setMessage(""); setTone(""); setType(""); setRewritten("");
  };

  const handleRewrite = async () => {
    if (!message.trim()) return alert("write message first!");
    if (!type || !tone) return alert("Please select Type and Tone!");

    const wordCount = message.trim().split(/\s+/).length;
    if (wordCount < 5) return alert("Too short! Please enter at least 5 words.");

    setLoading(true);
    try {
      const response = await fetch('https://my-react-aap.vercel.app/ai/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, tone, type }),
      });
      const data = await response.json();
      if (data.success) {
        setRewritten(data.rewritten);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("check backend!");
    }
    setLoading(false);
  };

  return (
    // We add a wrapper to apply styles inside the body dynamic class
    <div className="main-wrapper">
      <div className="container">
        <h1>Tone Transformer AI</h1>
        
        <div className="input-section">
          <div className="controls">
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="" disabled>SELECT FORMAT</option>
              {types.map((t, i) => <option key={i} value={t}>{t.toUpperCase()}</option>)}
            </select>

            <select value={tone} onChange={(e) => setTone(e.target.value)}>
              <option value="" disabled>SELECT TONE</option>
              {tones.map((t, i) => <option key={i} value={t}>{t.toUpperCase()}</option>)}
            </select>
          </div>

          <div className="textarea-wrapper">
            <textarea 
              value={message} 
              onChange={handleInputChange}
              maxLength={MAX_LIMIT}
              placeholder={type ? `Enter your raw ${type} here...` : "Write your rough draft here..."}
            />
            <div className={`char-count ${message.length >= MAX_LIMIT ? 'limit-reached' : ''}`}>
              {message.length} / {MAX_LIMIT} Characters
            </div>
          </div>

          <div className="btn-group">
            <button onClick={handleRewrite} disabled={loading} className="main-btn">
              {loading ? "Transforming..." : `Rewrite Now`}
            </button>
            {(message || rewritten) && (
              <button onClick={handleReset} className="clear-btn">Clear All</button>
            )}
          </div>
        </div>

        {rewritten && (
          <div className="output-section">
            <h3>✨ Your Rewritten {type}:</h3>
            <div className="result-box">{rewritten}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
