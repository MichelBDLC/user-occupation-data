import '../css/pagination.css';
import { VscTriangleLeft } from "react-icons/vsc";
import { VscTriangleRight } from 'react-icons/vsc';

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
                <li className='prev'>
                    <button onClick={() => props.paginate(props.currentPage - 1)} disabled={props.currentPage === 1}> <VscTriangleLeft /> </button>
                </li>
                {pages.map(num => (
                    <li key={num} className='pageNum'>
                        <button onClick={() => props.paginate(num)}> <p> {num} </p> </button>
                     </li>
                ))}
                <li className='next'>
                    <button onClick={() => props.paginate(props.currentPage + 1)}> <VscTriangleRight /> </button>
                </li>
            </ul>
        </nav>
        </>
    )

}