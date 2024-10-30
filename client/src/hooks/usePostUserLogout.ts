import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { PostBodyLoginInterface, ResponseLoginInterface } from '../interfaces/UserInterface';
import { axiosInstance } from '../config/axios.config';

export const postUserLogout = async (): Promise<ResponseLoginInterface> =>
  await axiosInstance.post('/auth/logout').then(({ data }) => data);

function usePostUserLogout(
  mutateFn?: UseMutationOptions<
    ResponseLoginInterface,
    AxiosError<ResponseLoginInterface>
  >
) {
  return useMutation<
    ResponseLoginInterface,
    AxiosError<ResponseLoginInterface>
  >(postUserLogout, mutateFn);
}

export default usePostUserLogout;
