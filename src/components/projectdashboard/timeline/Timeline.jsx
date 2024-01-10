import NavBar from "../NavBar";
import { useParams } from 'react-router-dom';

function Timeline() {
  const { id } = useParams();

  return (
    <div>
      <NavBar />
      <p>Timeline page</p>
      <p>project id: {id}</p>
    </div>
  );
}

export default Timeline;