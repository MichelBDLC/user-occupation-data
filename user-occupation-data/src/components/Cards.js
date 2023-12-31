import '../css/Cards.css';
import { lazy } from 'react';

const LazyGraph = lazy(() => import('./LineGraph'));

export default function Cards(props) {

    const userDetails = props.currentPosts.map(user => {
        const matchedUser = props.totalsRev.find(item => item.userId === user.fields.Id);

        return {
            userId: user.fields.id,
            impression: Math.round(matchedUser.impression),
            conversion: Math.round(matchedUser.conversion),
            revenues: matchedUser.revenues
        };
    });

    return (
        <div className="cards">
            {   
                userDetails.map((user, index) => {
                    return (
                        <div key={user.userId} className='card'>
                            <div className='userDetails'>
                            <div className='userPhoto'>{props.currentPosts[index].fields.Name.charAt(0).toUpperCase()}</div>
                            <div className='name-occupation'>
                            <strong>{props.currentPosts[index].fields.Name}</strong>
                            <p className='occupation'>{props.currentPosts[index].fields.occupation}</p>
                            </div>
                            </div>
                            <br />
                            <div className='revenues'>
                                {user.impression.toLocaleString()}
                                <p>Impressions</p>
                                {user.conversion.toLocaleString()}
                                <p>Conversions</p>
                                <strong className='total'>{Math.round(user.impression + user.conversion).toLocaleString()}</strong>
                            </div>
                            <LazyGraph revenues={user.revenues} />
                        </div>
                    )
                })
            }
        </div>
    )
}
