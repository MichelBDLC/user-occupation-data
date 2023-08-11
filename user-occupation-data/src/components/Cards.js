import '../css/Cards.css';

export default function Cards(props) {

    return (
        <div className="cards">
            { //this was props.sortedUserData
                props.currentPosts.map((user, index) => { 
                    return (
                        <div key={user.id} className='card'>
                            <div className='userPhoto'> {user.fields.Name.charAt(0).toUpperCase()} </div>
                            <strong> {user.fields.Name} </strong>
                            <p> {user.fields.occupation} </p>
                        </div>
                    )
                })
            }
        </div>
    )
}