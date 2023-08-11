import './css/App.css';
import { useEffect, useState, lazy } from 'react';
import axios from 'axios';

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
  const [postsPerPage, setPostsPerPage] = useState(20);
  
  useEffect(() => {
    Promise.all([
      axios.request(config),
    ])
    .then(([userDataResponse]) => {
      setUserData(userDataResponse.data.records); 
    })
    .catch((error) => {
      console.error('Failed to fetch data:', error.message);
    }) 
  }, []);

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

  function paginate(pageNum) {
    setCurrentPage(pageNum)
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
        </div>
        <div className='div'/>
        <LazyCards currentPosts={currentPosts}
        //sortedUserData={sortedUserData} 
        />
        <br />
        <LazyPages postsPerPage={postsPerPage} userData={userData} paginate={paginate} />
      </main>
    </div>
  );
}

export default App;

