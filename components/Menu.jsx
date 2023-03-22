import { memo, useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/AuthProvider";
import { fetcher } from "../utils/fetcher";
import Button from "./Button";
// import { PopupContext } from "../store/PopupProvider";
import { GlobalContext } from "../store/GlobalStore";
import Link from "next/link";

const Menu = () => {
  const [isOpen, setOpen] = useState(false);

  const { auth, setAuth } = useContext(AuthContext);
  const { setArticles, setProfile } = useContext(GlobalContext);
  // const actions = useContext(PopupContext)

  function getArticles() {
    fetcher(
      "https://vp-api-manag.azure-api.net/testapi/api/v1/articles",
      auth.token
    ).then((res) =>
      setArticles({ fetch: true, data: res.data, isFetching: false })
    );
    setOpen(false);
  }

  function getProfile() {
    fetcher(
      "https://vp-api-manag.azure-api.net/testapi/api/v1/profils",
      auth.token
    ).then((res) =>
    {
      setProfile({
        fetch: true,
        data: res.data,
        isFetching: false
      });
      setAuth({isLogged: auth.isLogged, token: auth.token, data: typeof res.data !== "string" && res.data })
    }     
      
    );
    setOpen(false);
  }

  useEffect(() => {
    getArticles();
    getProfile();
  }, [auth.token]);

  return (
    <div className="relative">
      <Button onClick={() => setOpen((prev) => !prev)}>
        Menu
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute right-0 z-[100] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <div>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <Link href="/">
                  <a
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
                    onClick={() => getArticles()}
                  >
                    Liste des articles
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/profile">
                  <a
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
                    onClick={() => getProfile()}
                  >
                    Détails profil
                  </a>
                </Link>
              </li>
            </ul>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Menu);
