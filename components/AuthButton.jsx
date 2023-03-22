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
   const res =await fetch("https://vp-api-manag.azure-api.net/testapi/api/v1/tokens/deconnexion", {
    method: "PUT",
    body: "",
    headers: {
      "X-ApiKey": "7388DFBB-AE8B-4331-9F60-3C247604F0B6",
      Authorization: token
    },
  })
  const json = await res.json();
    return json;
  } catch (err) {
   console.log('err: ', err) 
  }
}

export default function AuthButton() {
  const { setAuth, auth } = useContext(AuthContext);
  const actions = useContext(PopupContext);


  const onLogout = async () => {
    try {
      const result = await logoutRequest(auth.token);  
      console.log('result: ', result)
      if (result) {
        actions.setLogoutError(true, result)  
        return
      } 
      setAuth({ isLogged: false, token: "", data: {} });
      
    } catch (err) {
      console.log(err)
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
