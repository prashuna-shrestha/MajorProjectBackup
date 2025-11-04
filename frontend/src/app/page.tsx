import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black font-sans p-8">
      {/* Logo Section */}
      <div className="mb-10 flex flex-col items-center gap-4">
        <Image
          src="/logo.svg" // Your logo
          alt="My Logo"
          width={200}    // Adjust width
          height={200}   // Adjust height
          priority
        />
        <h1 className="text-3xl font-bold text-black dark:text-zinc-50">
          Welcome to My Demo Page
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-center max-w-md">
          This page shows how your logo appears in the project. You can add
          more text or buttons below to demonstrate layout.
        </p>
      </div>

      {/* Buttons / Links */}
      <div className="flex gap-4 flex-wrap justify-center">
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Next.js Docs
        </a>
        <a
          href="https://vercel.com/new"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full bg-gray-800 text-white font-medium hover:bg-gray-900 transition"
        >
          Deploy Project
        </a>
      </div>
    </div>
  );
}
