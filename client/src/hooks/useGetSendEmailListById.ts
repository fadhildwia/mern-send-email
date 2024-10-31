import { useQuery, UseQueryOptions } from 'react-query';
import { axiosInstance } from '../config/axios.config';
import { ResponseSendEmailInterface } from '../interfaces/SendEmailInterface';

export const getSendEmailListById = async (id: string): Promise<Array<ResponseSendEmailInterface>> => {
  const { data } = await axiosInstance.get(`/sendEmail/${id}`);
  return data;
};

const useGetSendEmailListById = ({
  id,
  options
}: {
  id: string;
  options?: UseQueryOptions<Array<ResponseSendEmailInterface>>;
}) => {
  return useQuery<Array<ResponseSendEmailInterface>>(
    ['useGetSendEmailListById', id],
    () => getSendEmailListById(id),
    options
  );
};

export default useGetSendEmailListById;
