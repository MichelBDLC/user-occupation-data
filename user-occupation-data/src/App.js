import './css/App.css';
import { useEffect, useState } from 'react';
import { lazy } from 'react';
import axios from 'axios';

const LazyCards = lazy(() => import('./components/Cards'));

const API_KEY = process.env.REACT_APP_API_KEY;
const randomUsersApi = 'https://randomuser.me/api/?results=300'; 

const config = {
  method: 'get', 
  url: 'https://api.airtable.com/v0/appBTaX8XIvvr6zEC/Users?',
  headers: { 
    'Authorization': `Bearer ${API_KEY}`, 
  },
};

function App() {
  const [userData, setUserData] = useState([]); 
  const [avatarData, setAvatarData] = useState([]);
  const [avatarImg, setAvatarImg] = useState([]);
  const [sorting, setSorting] = useState('');
 

  useEffect(() => {
    Promise.all([
      axios.request(config),
      axios.get(randomUsersApi)
    ])
    .then(([userDataResponse, randoUsersResponse]) => {
      setUserData(userDataResponse.data.records); 
      setAvatarData(randoUsersResponse.data.results); 
      setAvatarImg(randoUsersResponse.data.results.map(avatar => avatar.picture.medium));
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

  return (
    <div className="App">
      <header className="App-header">
        <h3> Occupation Performance Data Tracker </h3>
      </header>
      <main>
        <div className='sorting'>
          <select type='button' onChange={handleSorting}>
            <option> Sort </option>
            <option value='ascending' onClick={handleSorting}> Name Ascending </option>
            <option value='descending' onClick={handleSorting}> Name Descending </option>
          </select>
        </div>
        <div className='div'/>
        <LazyCards userData={userData} sortedUserData={sortedUserData} avatarImg={avatarImg} sorting={sorting} />
      </main>
    </div>
  );
}

export default App;

