import axios from "axios";

const URL = "https://rickandmortyapi.com/api/character";

export async function requestApiByPage(page = 1, counter = 1) {
  const { data } = await axios.get(URL + `?page=${page}`);
  return data?.results?.slice(0, counter).map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image,
  }));
}
