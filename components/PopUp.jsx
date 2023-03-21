import { useCallback, useContext, useMemo } from "react";
import { PopupContext } from "../store/PopupProvider";
import Modal from "./Modal";

export default function PopUp() {
  const actions = useContext(PopupContext);

  const onClose = useCallback(() => {
    actions.setLogoutError(false, "");
    actions.setLoginError(false, "");
    actions.setProfileError(false, "");
  }, []);

  const isOpen = useMemo(
    () =>
      actions.loginError.state ||
      actions.logoutError.state ||
      actions.profileError.state ||
      actions.articlesError.state,
    [
      actions.loginError.state,
      actions.logoutError.state,
      actions.profileError.state,
      actions.articlesError.state,
    ]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} type="error">
        <div className="px-6 py-6 lg:px-8 bg-gray-50 shadow-lg rounded-lg">
        <svg
          className="mx-auto mb-4 text-orange-400 w-14 h-14 dark:text-orange-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-center">
          {actions.loginError.message ||
            actions.logoutError.message ||
            actions.articlesError.message ||
            actions.profileError.message}
        </h3>
      </div>
    </Modal>
  );
}
