import { useState } from 'react';
import Layout from './components/Layout';
import SearchBar from './components/SearchBar';
import PubCard from './components/PubCard';
import NearestPubFinder from './components/NearestPubFinder';
import type { Pub } from './types/Pub';
import rawPubs from './assets/pubs.json' assert { type: 'json' };

const pubs: Pub[] = rawPubs;

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPubs = pubs.filter((pub) =>
    pub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <NearestPubFinder pubs={pubs} />
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <div className="space-y-4 mt-4">
        {filteredPubs.length > 0 ? (
          filteredPubs.map((pub, index) => (
            <PubCard key={index} pub={pub} />
          ))
        ) : (
          <p className="text-center text-gray-400 mt-8">
            No pubs found. Try a different search.
          </p>
        )}
      </div>
    </Layout>
  );
}
