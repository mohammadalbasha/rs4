import { useState, useCallback, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../store/auth-context';
//import { useHistory } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom'; // react router 6

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const authCtx = useContext(AuthContext);
  //  const history = useHistory();
  //const navigate = useNavigate(); react router 6

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setSuccess(false);
    setError(null);

    let headers = { ...requestConfig.headers };
    headers = { ...headers, authorization: `Bearer ${authCtx.tokens?.accessToken}` };
    try {
      const response = await axios({
        url: requestConfig.url,
        data: requestConfig.body ? requestConfig.body : null,
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers
      });
      const data = await response.data;
      setSuccess(true);
      applyData(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      if (err.response?.data?.error?.statusCode == 500) {
        setError('something went wrong');
      } else if (err.message) {
        setError(err.message);
      } else {
        setError(
          err.response?.data?.error?.details?.message[0] != 'c'
            ? err.response?.data?.error?.details?.message[0]
            : err.response?.data?.error?.message
        );
      }

      setIsLoading(false);

      if (
        err.response &&
        (err.response.data?.statusCode == 401 || err.response.data.message === 'jwt expired')
      ) {
        //history.push('/login');
        //navigate('/login');// react router 6
        authCtx.logout();
      }
    }
  }, []);

  return {
    isLoading,
    error,
    success,
    sendRequest
  };
};

export default useHttp;
