
function useGetToken(user) {
  const item =
    typeof window !== "undefined" ? localStorage.getItem(user) : null;

  return JSON.parse(item);
};
export default useGetToken;
