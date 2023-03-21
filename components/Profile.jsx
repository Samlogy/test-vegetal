import { useContext } from "react";
import { AuthContext } from "../store/AuthProvider";
import { GlobalContext } from "../store/GlobalStore";
// import { PopupContext } from "../store/PopupProvider";

export default function Profile() {
  const { auth } = useContext(AuthContext);
  // const actions = useContext(PopupContext)
  const { profile } = useContext(GlobalContext);

  if (!auth.isLogged)
    return (
      <div className="flex flex-col w-full md:w-2/3 lg:w-3/4 mb-4">
        <h2 className="font-bold text-xl mb-4"> Profil</h2>
        <p className="bg-gray-100 shadow-md p-4 rounded-md w-full text-red-600">
          {profile.data}
        </p>
      </div>
    );
  return (
    <div className="flex flex-col w-full md:w-2/3 lg:w-3/4 mb-4">
      <h2 className="font-bold text-xl mb-4"> Profil</h2>

      {profile.fetch && !profile.error && (
        <div className="flex flex-col gap-6 bg-gray-100 shadow-md p-4 rounded-md w-full">
          <DisplayItem label="email" data={profile.data?.email} />
          <DisplayItem label="nom" data={profile.data?.nom} />
          <DisplayItem label="prénom" data={profile.data?.prenom} />
          <DisplayItem label="passWord" data={profile.data?.passWord} />
          <DisplayItem label="qualité" data={profile.data?.qualite} />
          <DisplayItem label="clé" data={profile.data?.cle} />
          <DisplayItem
            label="disconnected"
            data={profile.disconnected ? "connecté" : "déconnecté"}
          />
        </div>
      )}
    </div>
  );
}

function DisplayItem({ label, data }) {
  return (
    <div className="grid md:grid-cols-2 place-items-start">
      <div className="capitalize font-medium text-gray-700"> {label}: </div>
      <div> {data} </div>
    </div>
  );
}
