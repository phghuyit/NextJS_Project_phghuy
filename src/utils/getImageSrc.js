const STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export default function getImageSrc(path, fallback = "/no-image.svg") {
  if (!path) return fallback;

  const value = String(path).trim();
  if (!value) return fallback;

  if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("data:")) {
    return value;
  }

  if (value.startsWith("/")) {
    return BACKEND_URL ? `${BACKEND_URL.replace(/\/+$/, "")}${value}` : value;
  }

  if (!STORAGE_URL) return value;

  return `${STORAGE_URL.replace(/\/+$/, "")}/${value.replace(/^\/+/, "")}`;
}
