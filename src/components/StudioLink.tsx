export default function StudioLink() {
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href="/studio"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium transition-colors"
      >
        🎨 Open CMS
      </a>
    </div>
  );
}
