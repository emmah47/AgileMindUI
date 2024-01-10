import NavBar from "../NavBar";
import { useParams } from 'react-router-dom';

function Backlog() {
  const { id } = useParams();

  return (
    <div>
      <NavBar />
      <p>Backlog page</p>
      <p>project id: {id}</p>
    </div>
  );
}

export default Backlog;