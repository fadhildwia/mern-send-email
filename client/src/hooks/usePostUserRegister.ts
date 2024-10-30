import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { PostBodyLoginInterface, ResponseLoginInterface } from '../interfaces/UserInterface';
import { axiosInstance } from '../config/axios.config';

export const postUserRegister = async (
  body: PostBodyLoginInterface
): Promise<ResponseLoginInterface> =>
  await axiosInstance.post('/auth/register', body).then(({ data }) => data);

function usePostUserRegister(
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
  >(postUserRegister, mutateFn);
}

export default usePostUserRegister;
