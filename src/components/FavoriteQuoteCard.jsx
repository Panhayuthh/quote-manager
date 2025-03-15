import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteQuote, removeFavoriteQuote } from "../features/favoriteQuoteSlice";
import { AppContext } from "../context/AppContext";

export default function FavoriteQuoteCard() {

    const { user } = useContext(AppContext);

    const { favoriteQuotes, loading, error } = useSelector((state) => state.favorite);
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeFavoriteQuote(id));
    }

    useEffect(() => {
        // console.log('Fetching favorite quotes for user:', user.id);
        if (user && user.id) {
            dispatch(fetchFavoriteQuote(user.id));
        }
    }, [dispatch, user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-6 mb-6">
                <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
            </div> 
        );
    }

    if (!user) {
        return (
            <div className="container max-w-3xl mx-auto">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                    <img src="src\assets\woman-laptop-sitting-dark.png" alt="Login to see favorite quotes" className="h-48 mx-auto" />
                    <p className="text-gray-600 text-center mt-6"> You need to login to see your favorite quotes.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        );
    }

    if (favoriteQuotes.length === 0) {
        return (
            <div className="container max-w-3xl mx-auto">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                    <img src="src\assets\document-folders-dark.png" alt="No favorite quotes" className="h-48 mx-auto" />
                    <p className="text-gray-600 text-center mt-6">You have not saved any quotes yet!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container max-w-3xl mx-auto">
        
        {favoriteQuotes.map((favoriteQuote) => (
            <div key={favoriteQuote.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 m-6">
                <blockquote className="text-lg italic font-semibold text-gray-800 mb-4">
                    "{favoriteQuote.content}"
                </blockquote>
                <cite className="block text-right text-gray-600">— {favoriteQuote.author}</cite>
                <div className="mt-4 text-right">
                    <button
                        onClick={() => handleRemove(favoriteQuote.id)}
                        className="p-2 rounded-lg font-medium text-red-600 focus:outline-none bg-white border 
                        border-gray-200 hover:bg-red-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100"
                    >
                        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        ))}
    </div>
    )
}