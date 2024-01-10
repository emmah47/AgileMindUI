import NavBar from "../NavBar";
import { useParams } from 'react-router-dom';

function Settings() {
  const { id } = useParams();

  return (
    <div>
      <NavBar />
      <p>Settings page</p>
      <p>project id: {id}</p>
    </div>
  );
}

export default Settings;