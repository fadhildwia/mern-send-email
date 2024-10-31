import { useQuery, UseQueryOptions } from 'react-query';
import { axiosInstance } from '../config/axios.config';
import { ResponseLoginInterface } from '../interfaces/UserInterface';

export const getUser = async (): Promise<ResponseLoginInterface> => {
  const { data } = await axiosInstance.get('/profile');
  return data;
};

const useGetUser = ({ options }: { options?: UseQueryOptions<ResponseLoginInterface> }) => {
  return useQuery<ResponseLoginInterface>(
    ['useGetUser'],
    () => getUser(),
    options
  );
};

export default useGetUser;
