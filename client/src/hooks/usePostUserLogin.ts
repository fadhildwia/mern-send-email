import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { PostBodyLoginInterface, ResponseLoginInterface } from '../interfaces/UserInterface';
import { axiosInstance } from '../config/axios.config';

export const postUserLogin = async (
  body: PostBodyLoginInterface
): Promise<ResponseLoginInterface> =>
  await axiosInstance.post('/auth/login', body).then(({ data }) => data);

function usePostUserLogin(
  mutateFn?: UseMutationOptions<
    ResponseLoginInterface,
    AxiosError<ResponseLoginInterface>,
    PostBodyLoginInterface
  >
) {
  return useMutation<
    ResponseLoginInterface,
    AxiosError<ResponseLoginInterface>,
    PostBodyLoginInterface
  >(postUserLogin, mutateFn);
}

export default usePostUserLogin;
