import '../css/Cards.css';

export default function Cards(props) {

    return (
        <div className="cards">
            {
                props.sortedUserData.map((user, index) => { 
                    return (
                        <div key={user.id} className='card'>
                            <img src={props.avatarImg[index]} alt='avatar-img'/>
                            <strong> {user.fields.Name} </strong>
                            <p> {user.fields.occupation} </p>
                        </div>
                    )
                })
            }
        </div>
    )
}