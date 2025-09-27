import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();
  const [userinfo, setUserinfo] = useState({});
  useEffect(() => {
    let jwt = sessionStorage.getItem("jwt") || localStorage.getItem("jwt");
    if (!jwt) {
      navigate("/login");
    } else {
      let domain = "http://82.112.241.233:1993";
      let endpoint = "/api/users/me";
      let url = domain + endpoint;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => {
          setUserinfo(res.data);
          console.log(res);
        })
        .catch((err) => {
          navigate("/login");
          sessionStorage.clear();
          localStorage.clear();
          console.log(err);
        });
    }
  }, []);
  let logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <p>welcome Mr.{userinfo.username} to home page</p>
      <button className="btn btn-error" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
