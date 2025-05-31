
import SearchDetails from '@/components/SearchDetails';
import { useParams } from 'react-router-dom';

const SearchPage = () => {

  const { searchId } = useParams();
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">{}</h1>
          <SearchDetails searchId={searchId}/>
      </div>
    </div>
    </div>
  );
};

export default SearchPage;
