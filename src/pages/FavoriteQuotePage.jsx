import FavoriteQuoteCard from '../components/FavoriteQuoteCard';

export default function FavoriteQuotePage() {
    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-8">My Favorite Quote</h1>
            <div className="mt-8">
                <FavoriteQuoteCard />
            </div>
        </div>
    )
}