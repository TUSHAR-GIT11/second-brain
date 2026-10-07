const fetchUrlContent = async (url) => {

  const parsedUrl = new URL(url);

if (!["http:", "https:"].includes(parsedUrl.protocol)) {
  throw new Error("Only HTTP and HTTPS URLs are allowed.");
}
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.status}`);
  }

  const html = await response.text();

  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text;
};

module.exports = fetchUrlContent;