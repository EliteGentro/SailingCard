const API_URL = process.env.API_URL;

export async function GET() {
  try {
    const res = await fetch(API_URL, {
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
  console.error("API Error:", error);
  return new Response(JSON.stringify({ error: error.message || String(error) }), { status: 500 });
}
}