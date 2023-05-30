import React, { useState } from 'react';

const ImageGenerationForm = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  };

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  return (
    <div className="container al-c mt-3">
      <h1>Text2Image Generator</h1>
      <p>
        Transform text into stunning images effortlessly with our text2image generator, powered by Hugging Face's innovative midjourney API.
      </p>
      <form className="gen-form" onSubmit={handleSubmit}>
        <p>HuggingFace API (Get your key for free <a href = "https://huggingface.co/settings/tokens">here</a>)</p>
        <input
          type="text"
          name="apiKey"
          placeholder="Enter your API key..."
          value={apiKey}
          onChange={handleApiKeyChange}
        />
        <p>Image prompt</p>
        <input type="text" name="input" placeholder="Type your prompt here..." />
        
        <button type="submit">Generate</button>
      </form>
      <div>
        {loading && <div className="loading">Loading...</div>}
        {!loading && output && (
          <div className="result-image">
            <img src={output} alt="art" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerationForm;
