import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-50">
      <div className="max-w-[80vw] mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
        Client Page
        </h2>
        <p className="mt-2 text-gray-600">
        This is the Clent Dashboard page
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
