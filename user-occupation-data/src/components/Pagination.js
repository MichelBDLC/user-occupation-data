import '../css/pagination.css';

export default function Pagination(props) {

    const pages = [];

    for (let i = 1; i <= Math.ceil(props.userData.length / props.postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <>
        <br />
        <nav>
            <ul>
                {pages.map(num => (
                    <li key={num}>
                        <button onClick={() => props.paginate(num)}> <p> {num} </p> </button>
                     </li>
                ))}
            </ul>
        </nav>
        </>
    )

}