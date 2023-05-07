import { useState } from 'react';
import axios from 'axios';
import './App.css';

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(
                `http://127.0.0.1:5000/auth/searchUsers?query=${searchQuery}`
            );
            setSearchResult(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFollow = async () => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:5000/auth/follow/',
                {
                    userId: searchResult.id,
                }
            );
            console.log(response.data); // handle successful follow response
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for a user"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {searchResult && (
                <div>
                    <h2>{searchResult.name}</h2>
                    <img src={searchResult.profilePic} alt="Profile" />
                    <button onClick={handleFollow}>Follow</button>
                </div>
            )}
        </div>
    );
}

export default SearchBar;


