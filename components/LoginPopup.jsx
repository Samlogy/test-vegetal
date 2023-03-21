import { useContext, useState } from "react";
import useSWRMutation from "swr/mutation";
import { AuthContext } from "../store/AuthProvider";
import { PopupContext } from "../store/PopupProvider";
import Button from "./Button";
import Modal from "./Modal";

async function loginRequest(url, { body }) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
      "X-ApiKey": "7388DFBB-AE8B-4331-9F60-3C247604F0B6",
      "Access-Control-Request-Method": "POST",
      "Access-Control-Request-Headers": "Content-Type, Authorization",
    },
  }).then((res) => res.json());
}

export default function LoginPopup() {
  const [form, setForm] = useState({
    userName: "",
    passWord: "",
  });

  const { setAuth } = useContext(AuthContext);
  const actions = useContext(PopupContext);

  const { trigger: login, data: token, error, isMutating } = useSWRMutation(
    "https://testapi-dev.bluewater-42fcce1d.northeurope.azurecontainerapps.io/api/v1/tokens/authentification",
    loginRequest
  );
  console.log('Login ERR: ', error)

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(form)
      const result = await login(form);
      console.log("result: ", result);
      setAuth({ isLogged: true, token });
    } catch (err) {
      console.log("err: ", err);
      actions.setLoginError(true, err.message);
    }
  };

  return (
    <Modal
      isOpen={actions.loginPopup.state}
      onClose={() => actions.setLoginPopup(false)}
    >
      <div className="px-6 py-6 lg:px-8 bg-gray-50 shadow-lg rounded-lg">
        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
          Se connecter
        </h3>
        <form className="space-y-6" onSubmit={onLogin}>
          <div>
            <label
              htmlFor="userName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Identifiant
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="userName"
              value={form.userName}
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              value={form.passWord}
              onChange={(e) => setForm({ ...form, passWord: e.target.value })}
            />
          </div>

          <Button type="submit" disabled={isMutating}>
            Se connecter
          </Button>
        </form>
      </div>
    </Modal>
  );
}
