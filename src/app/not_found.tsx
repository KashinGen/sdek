// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-blue-600">404</h1>
        <p className="mt-4 text-xl text-gray-700">
          Извините, страница, которую вы ищете, не найдена.
        </p>
        <p className="mt-2 text-gray-600">
          Возможно, вы ввели неправильный адрес или страница была удалена.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
