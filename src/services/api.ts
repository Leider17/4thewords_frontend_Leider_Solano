const API_URL = import.meta.env.VITE_API_URL;
console.log("API URL:", API_URL);

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message );
  }
  return response.json();
};

export { API_URL, handleResponse };
