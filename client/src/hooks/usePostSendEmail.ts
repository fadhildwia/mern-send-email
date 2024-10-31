import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { axiosInstance } from '../config/axios.config';
import { PostBodySendEmailInterface, ResponseSendEmailInterface } from '../interfaces/SendEmailInterface';

export const postSendEmail = async (
  body: PostBodySendEmailInterface
): Promise<ResponseSendEmailInterface> =>
  await axiosInstance.post('/sendEmail', body).then(({ data }) => data);

function usePostSendEmail(
  mutateFn?: UseMutationOptions<
    ResponseSendEmailInterface,
    AxiosError<ResponseSendEmailInterface>,
    PostBodySendEmailInterface
  >
) {
  return useMutation<
    ResponseSendEmailInterface,
    AxiosError<ResponseSendEmailInterface>,
    PostBodySendEmailInterface
  >(postSendEmail, mutateFn);
}

export default usePostSendEmail;
