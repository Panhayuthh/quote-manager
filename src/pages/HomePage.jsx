import QuoteCard from "../components/QuoteCard"
import { useDispatch } from "react-redux"
import { fetchQuote } from "../features/quoteSlice"

export default function HomePage() {
    const dispatch = useDispatch()

    const handleGenerateQuote = () => {
        dispatch(fetchQuote())
    }

    return (
        <div className="max-w-2xl mx-auto my-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Random Quote Generator</h2>
            <p className="text-gray-600 mb-6">Click the button below to generate a random quote.</p>
            <QuoteCard />
            <button
              onClick={handleGenerateQuote}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Generate Quote
            </button>
          </div>
        </div>
    );
}
