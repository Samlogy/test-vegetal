import { useContext } from "react";
import { AuthContext } from "../store/AuthProvider";
import { PopupContext } from "../store/PopupProvider";
import Button from "./Button";

async function logoutRequest(token) {
 const form = {
  "userName": "userTest1",
  "passWord": "Algeria@1234"
}
  try {
   const res =await fetch("https://testapi-dev.bluewater-42fcce1d.northeurope.azurecontainerapps.io/api/v1/tokens/deconnexion", {
    method: "PUT",
    body: JSON.stringify(form),
    headers: {
      "Content-type": "application/json",
      "X-ApiKey": "7388DFBB-AE8B-4331-9F60-3C247604F0B6",
      Authorization: token
    },
  })
  const d = res.json();
    console.log("ress: ", d);
    return d;
  } catch (err) {
   console.log('err: ', err) 
  }
}

export default function AuthButton() {
  const { setAuth, auth } = useContext(AuthContext);
  const actions = useContext(PopupContext);

  // console.log('Logout ERR: ', error)

  const onLogout = async () => {
    try {
      await logoutRequest(auth.token);
      setAuth({ isLogged: false, token: "" });
    } catch (err) {
      actions.setLogoutError(true, err.message);
    }
  };

  return (
    <Button
      onClick={
        auth.isLogged ? () => onLogout() : () => actions.setLoginPopup(true)
      }
    >
      {auth.isLogged ? "Se déconnecter" : "Connexion"}
    </Button>
  );
}
