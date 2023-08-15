import '../css/Cards.css';
//additional features, ability to click on chart and see bigger
//don't forget sorting features

export default function Cards(props) {

    const userDetails = props.currentPosts.map(user => {
        const matchedUser = props.totalsRev.find(item => item.userId === user.fields.Id);

        return {
            userId: user.fields.id,
            impression: Math.round(matchedUser.impression),
            conversion: Math.round(matchedUser.conversion)
        };
    });

    return (
        <div className="cards">
            {   
                userDetails.map((user, index) => {
                    return (
                        <div key={user.userId} className='card'>
                            <div className='userPhoto'>{props.currentPosts[index].fields.Name.charAt(0).toUpperCase()}</div>
                            <strong>{props.currentPosts[index].fields.Name}</strong>
                            <p>{props.currentPosts[index].fields.occupation}</p>
                            <div>
                                {user.impression.toLocaleString()}
                                <p>Impressions</p>
                                {user.conversion.toLocaleString()}
                                <p>Conversions</p>
                                {Math.round(user.impression + user.conversion).toLocaleString()}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
