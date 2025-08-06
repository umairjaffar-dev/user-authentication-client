
const useClearAppState = () => {

  function clearAppState() {
    localStorage.removeItem('token');
  }

  return clearAppState;
};

export default useClearAppState;
