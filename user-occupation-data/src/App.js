import './css/App.css';
import { useEffect, useState, lazy } from 'react';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import logs from './assets/logs.json';

const LazyCards = lazy(() => import('./components/Cards'));
const LazyPages = lazy(() => import('./components/Pagination'));

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

const config = {
  method: 'get', 
  url: 'https://api.airtable.com/v0/appBTaX8XIvvr6zEC/Users?',
  headers: { 
    'Authorization': `Bearer ${REACT_APP_API_KEY}`, 
  },
};

function App() {
  const [userData, setUserData] = useState([]); 
  const [sorting, setSorting] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(18);
  const [loading, setLoading] = useState(true);
const [searchInput, setSearchInput] = useState(''); 
  
  useEffect(() => {
    setLoading(true)
    axios.request(config) 
    .then((userDataResponse) => {
      setUserData(userDataResponse.data.records); 
    })
    .catch((error) => {
      console.error('Failed to fetch data:', error.message);
    })
    .finally(() => {
      setLoading(false);
    }) 
  }, []);

  function calculateTotals(logs) {
  
    const result = [];

    for (let log of logs) {
      const { user_id, type, revenue, time } = log;

      let userObj = result.find(item => item.userId === user_id);

      if (!userObj) {
        userObj = { userId: user_id, impression: 0, conversion: 0, revenues: [] };
        result.push(userObj);
      }

      userObj[type] += revenue; 

      let revenueEntry = userObj.revenues.find(entry => entry.time === time);
      
      if (!revenueEntry) {
        revenueEntry = { time: time, revenue: 0 };
        userObj.revenues.push(revenueEntry);
      }
      revenueEntry.revenue += revenue;
    }
    return result;
  }

  const totalsRev = calculateTotals(logs);

  function handleSorting(event) {
    setSorting(event.target.value)
  }

  const sortedUserData = userData.slice().sort((a, b) => {
    if (sorting === 'ascending') {
      return a.fields.Name.localeCompare(b.fields.Name);
    }
    else if (sorting === 'descending') {
      return b.fields.Name.localeCompare(a.fields.Name);
    }
    else {
      return 0;
    }
  })

  const lastPostI = currentPage * postsPerPage;
  const firstPostI = lastPostI - postsPerPage; 
  const currentPosts = sortedUserData.slice(firstPostI, lastPostI); 
  const searchedUsers = [] //shoukd this be a state? 

  function paginate(pageNum) {
    setCurrentPage(pageNum)
  }
  
  function handleSearch(event) {
    event.preventDefault();
    
    setSearchInput(event.target.value);
    
    for (let user of currentPosts) {
      if (user.fields.Name.includes(searchInput))     {
        searchedUsers.push(user);
      }
    }
    return searchedUsers; 
  } 

  return (
    <div className="App">
      <header className="App-header">
        <h3> Occupation Performance Data Tracker </h3>
      </header>
      <main>
        <div className='sorting'>
          <select type='button' onChange={handleSorting}>
            <option> Sort </option>
            <option value='ascending'> Name Ascending </option>
            <option value='descending'> Name Descending </option>
          </select>
          <input onChage={handleSearch}/>
        </div>
        <div className='div'/>
        {loading ? (<div className='loader'>
          <ClipLoader loading={loading} size={77} />
          </div>) : (
          <>
        <LazyCards currentPosts={currentPosts} totalsRev={totalsRev} />
        <br />
        <LazyPages postsPerPage={postsPerPage} userData={userData} paginate={paginate} currentPage={currentPage}/>
          </>
        )}
      </main>
    </div>
  );
}

export default App;