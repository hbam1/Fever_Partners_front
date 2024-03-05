import { useEffect, useState } from "react";

function Auth() {
  const [auths, setAuths] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/rooms/1/activities/list/")
      .then((response) => response.json())
      .then((data) => setAuths(data));
  }, []);

  return (
    <div>
      <h1>인증 리스트</h1>
      <div>
        <ul>
          {auths.map((auth) => (
            <li key={auth.id}>
              <div>{auth.id}</div>
              <div>{auth.created_date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Auth;
