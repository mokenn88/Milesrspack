import { useState } from 'react';
import SearchBar from './SearchBar';
import PubCard from './PubCard'; // ✅
import type { Pub } from './PubCard';
import rawPubs from '../assets/pubs.json' assert { type: 'json' };

const pubs: Pub[] = rawPubs;

// src/components/PubList.tsx

export function PubList() {
  // ...
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPubs = pubs.filter((pub) =>
    pub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      {filteredPubs.length > 0 ? (
        filteredPubs.map((pub) => (
          <PubCard key={pub.name} pub={pub} />
        ))
      ) : (
        <p className="text-center text-gray-400 mt-8">
          No pubs found. Try a different search.
        </p>
      )}
    </div>
  );
}
