import { useState } from "react";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [analytics, setAnalytics] = useState(null);

  const handleSubmit = async () => {
    if (!longUrl.trim()) {
      alert("Please enter a valid URL!");
      return;
    }

    const response = await fetch("http://localhost:8000/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: longUrl }),
    });

    const data = await response.json();
    setShortUrl(data.id);
  };

  const fetchAnalytics = async () => {
    if (!shortUrl) return;

    const shortId = shortUrl.split("/").pop();
    const response = await fetch(`http://localhost:8000/url/analytics/${shortId}`);
    const data = await response.json();

    setAnalytics({
      clicks: data.totalCLicks,
      analytics: data.analytics,
    });
  };

  return (
    <div>
      <h2>URL Shortener</h2>
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Enter a long URL"
      />
      <button onClick={handleSubmit}>Shorten</button>

      {shortUrl && (
        <div>
          <p>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
          <button onClick={fetchAnalytics}>Get Analytics</button>
        </div>
      )}

      {analytics && (
        <div>
          <p>Clicks: {analytics.clicks}</p>
        </div>
      )}

    </div>
  );
}

export default App;
