import { useContext } from "react";
import useSWRMutation from "swr/mutation";
import { AuthContext } from "../store/AuthProvider";
import { PopupContext } from "../store/PopupProvider";
import Button from "./Button";

async function logoutRequest(url, { token }) {
  console.log("token: ", token);
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "X-ApiKey": "7388DFBB-AE8B-4331-9F60-3C247604F0B6",
      Authorization: token,
    },
  }).then((res) => res.json());
}

export default function AuthButton() {
  const { setAuth, auth } = useContext(AuthContext);
  const actions = useContext(PopupContext);

  const { trigger: logout, error } = useSWRMutation(
    "/deconnexion",
    (url, token) => logoutRequest(url, auth.token)
  );

  console.log('Logout ERR: ', error)

  const onLogout = async () => {
    try {
      await logout(auth.token);
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
