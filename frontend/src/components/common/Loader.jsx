export default function Loader({ fullScreen = false }) {
  const loader = (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-100"></div>
      <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-200"></div>
    </div>
  );

  if (fullScreen) {
    return <div className="min-h-screen flex justify-center items-center bg-light">{loader}</div>;
  }

  return <div className="py-8">{loader}</div>;
}