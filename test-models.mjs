const key = process.env.GEMINI_API_KEY || "your_api_key_here";
const url = "https://generativelanguage.googleapis.com/v1beta/models?key=" + key;

async function listModels() {
  const res = await fetch(url);
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

listModels();
