import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-white gap-4">
      <div className="text-8xl">☕</div>
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-xl text-gray-400">This creator page does not exist!</p>
      <p className="text-gray-500">The username you searched for is not registered.</p>
      <Link href="/">
        <button className="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 border border-transparent rounded-full font-medium text-sm px-6 py-2.5">
          Go Back Home
        </button>
      </Link>
    </div>
  )
}