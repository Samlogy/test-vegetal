import { useContext } from "react";
import { GlobalContext } from "../store/GlobalStore";

export default function Articles() {
  const { articles } = useContext(GlobalContext);

  // console.log('articles: ', articles)
  return (
    <div className="flex flex-col w-full md:w-2/3 lg:w-3/4 mb-4">
      <h2 className="font-bold text-xl mb-4"> Articles</h2>

      {articles.isFetching ? (
        <p className="w-ful">Loading ...</p>
      ) : articles.error ? (
        <p className="bg-gray-100 shadow-md p-4 rounded-md w-full text-red-600">
          {articles?.error?.message}
        </p>
      ) : articles.data &&
        Array.isArray(articles.data) &&
        articles.data.length > 0 ? (
        <table className="overflow-x-auto shadow-md rounded-lg w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-4">
                ID
              </th>
              <th scope="col" className="px-2 py-4">
                Article
              </th>
              <th scope="col" className="px-2 py-4">
                Quantité disponible
              </th>
              <th scope="col" className="px-2 py-4">
                Prix unitaire
              </th>
            </tr>
          </thead>

          <tbody className="w-full">
            {articles.data.map((article) => (
              <tr
                key={article.id}
                className="odd:bg-gray-100 even:bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-800"
              >
                <td className="px-2 py-4 max-w-12">{article?.id}</td>
                <td className="px-2 py-4 whitespace-nowrap">
                  {article?.article}
                </td>
                <td className="px-2 py-4 max-w-12">
                  {article?.quantiteDisponible}
                </td>
                <td className="px-2 py-4 max-w-12">
                  {article?.prixUnitaire ? article?.prixUnitaire : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="bg-gray-100 shadow-md p-4 rounded-md w-full">
          Aucun article !{" "}
        </p>
      )}
    </div>
  );
}
