import { Link } from 'react-router-dom';
import PageNotFoundSvg from '../components/SVG/PageNotFoundSvg';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <div className="flex justify-center items-center p-6 mb-6">
                <PageNotFoundSvg />
            </div>
            {/* <h1 className="text-6xl font-bold text-red-500">404</h1> */}
            <p className="text-xl text-gray-600">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="flex mt-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-bl focus:ring-2 
            focus:outline-none focus:ring-blue-300 text-white font-medium py-3 px-6 transition-colors focus:ring-opacity-50">
                <svg class="w-6 h-6 mr-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
                </svg>

                <p>Go Back Home</p>
            </Link>
        </div>
    );
}