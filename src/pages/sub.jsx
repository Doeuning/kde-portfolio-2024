import useFetch from "../hooks/useFetch";

export default function Sub(props) {
  const key = "c79521c72b6690785c671f45832e339b";
  const { data, error, loading } = useFetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${key}`
  );
  return (
    <div>
      {data ? (
        <ul>
          {data.results.map((item) => {
            return <li key={item.id}>{item.original_name}</li>;
          })}
        </ul>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
