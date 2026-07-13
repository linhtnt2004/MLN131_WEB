const key = process.env.GEMINI_API_KEY || "your_api_key_here";
const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

async function testApiKey() {
  console.log("Testing as ?key=...");
  const res1 = await fetch(`${url}?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: "Hi" }] }] })
  });
  console.log("?key= status:", res1.status, await res1.text());

  console.log("\nTesting as Bearer token...");
  const res2 = await fetch(url, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`
    },
    body: JSON.stringify({ contents: [{ parts: [{ text: "Hi" }] }] })
  });
  console.log("Bearer status:", res2.status, await res2.text());
}

testApiKey();
