import NavBar from "../NavBar";
import { useParams } from 'react-router-dom';

function WhiteBoard() {
  const { id } = useParams();

  return (
    <div>
      <NavBar />
      <p>WhiteBoard page</p>
      <p>project id: {id}</p>
    </div>
  );
}

export default WhiteBoard;