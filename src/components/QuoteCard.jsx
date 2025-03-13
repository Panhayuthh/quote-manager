import React from "react";
import { useSelector ,useDispatch } from "react-redux";
import { saveFavoriteQuote } from "../features/favoriteQuoteSlice";

export default function QuoteCard() {
    const { quote, loading, error } = useSelector((state) => state.quote);
    const dispatch = useDispatch();

    const handleSaveFavorite = () => {
        if (quote) {
            dispatch(saveFavoriteQuote(quote));
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
    
    return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        {quote && quote.content ? (
        <>
            <blockquote className="text-xl italic font-semibold text-gray-800 mb-4">
            "{quote.content}"
            </blockquote>
            <cite className="block text-right text-gray-600">— {quote.author || 'Unknown'}</cite>
            <div className="mt-6 text-right">
            <button
                onClick={handleSaveFavorite}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            >
                Save Quote
            </button>
            </div>
        </>
        ) : (
        <p className="text-gray-600 text-center">Generate a quote to get started!</p>
        )}
    </div>
    );

}