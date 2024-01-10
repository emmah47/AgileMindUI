import NavBar from "../NavBar";
import { useParams } from 'react-router-dom';

function Report() {
  const { id } = useParams();

  return (
    <div>
      <NavBar />
      <p>Report page</p>
      <p>project id: {id}</p>
    </div>
  );
}

export default Report;