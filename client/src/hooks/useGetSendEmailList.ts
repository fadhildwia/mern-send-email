import { useQuery, UseQueryOptions } from 'react-query';
import { axiosInstance } from '../config/axios.config';
import { ResponseSendEmailInterface } from '../interfaces/SendEmailInterface';

export const getSendEmailList = async (): Promise<Array<ResponseSendEmailInterface>> => {
  const { data } = await axiosInstance.get('/sendEmail');
  return data;
};

const useGetSendEmailList = ({ options }: { options?: UseQueryOptions<Array<ResponseSendEmailInterface>> }) => {
  return useQuery<Array<ResponseSendEmailInterface>>(
    ['useGetSendEmailList'],
    () => getSendEmailList(),
    options
  );
};

export default useGetSendEmailList;
