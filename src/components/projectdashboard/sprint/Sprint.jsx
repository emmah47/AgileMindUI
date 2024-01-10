import NavBar from "../NavBar";
import { useParams } from 'react-router-dom';

function Sprint() {
  const { id } = useParams();

  return (
    <div>
      <NavBar />
      <p>Sprint page</p>
      <p>project id: {id}</p>
    </div>
  );
}

export default Sprint;