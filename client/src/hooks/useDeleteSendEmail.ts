import { useMutation, UseMutationOptions } from 'react-query';
import { axiosInstance } from '../config/axios.config';
import { AxiosError } from 'axios';

export const deleteSendEmailById = async (id: string): Promise<void> => {
  const { data } = await axiosInstance.delete(`/sendEmail/${id}`);
  return data;
};

export function useDeleteSendEmailById(
  options: UseMutationOptions<unknown, AxiosError, { id: string }>
) {
  return useMutation(
    ({ id }: { id: string }) => deleteSendEmailById(id),
    options
  );
}
export default useDeleteSendEmailById;
