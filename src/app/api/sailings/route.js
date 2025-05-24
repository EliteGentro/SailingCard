export async function GET() {
  try {
    const res = await fetch("https://sandbox.cruisebound-qa.com/sailings", {
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