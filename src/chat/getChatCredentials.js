export async function getChatCredentials() {
  const res = await fetch("http://localhost:4000/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: "panda-viewer-" + Date.now(),
      userName: "SGT Panda Viewer"
    })
  });

  if (!res.ok) throw new Error("Failed to get chat token");
  return res.json(); // { endpoint, token, sessionExpirationTime }
}
