import { useContext, useState } from "react";
import { AuthContext } from "../store/AuthProvider";
import { PopupContext } from "../store/PopupProvider";
import Button from "./Button";
import Modal from "./Modal"

const loginRequest = async (url, body) => {
  console.log('body: ',body)
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      mode: "no-cors",
      headers: {
        accept: "text/plain",
        // "Content-type": "text/plain",
        "X-ApiKey": "7388DFBB-AE8B-4331-9F60-3C247604F0B6",
        "Access-Control-Allow-Origin": "*"
        
      },
    });
    console.log("res: ", res);
    const json = await res.json();
    console.log("json: ", json);
    return json
    // return {
    //   data: json,
    //   error: null,
    // };
  } catch (err) {
    console.log("login error: ", err);
    // return {
    //   data: null,
    //   error: err,
    // };
  }
};

export default function LoginPopup() {
  const [form, setForm] = useState({
    userName: "userTest1",
    passWord: "Algeria@1234",
  });
  const [isMutating, setMutating] = useState(false);

  // const { setAuth } = useContext(AuthContext);
  const actions = useContext(PopupContext);


  const onLogin = (e) => {
    e.preventDefault();
    setMutating(true);

    loginRequest(
      "https://testapi-dev.bluewater-42fcce1d.northeurope.azurecontainerapps.io/api/v1/tokens/authentification",
      form
    ).then(
      (res) => console.log("result: ", res)
      // setAuth({ isLogged: true, token: result })
    );
    setMutating(false);
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
