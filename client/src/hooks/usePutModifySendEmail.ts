import { useMutation, UseMutationOptions } from "react-query";
import { axiosInstance } from "../config/axios.config";
import { PutBodyModifySendEmailInterface, ResponseSendEmailInterface } from "../interfaces/SendEmailInterface";
import { AxiosError } from "axios";

export const putModifySendEmail = async (
  body: PutBodyModifySendEmailInterface
): Promise<ResponseSendEmailInterface> => {
  const { data } = await axiosInstance.put(`/sendEmail/${body.id}`, body);
  return data;
};
function usePutModifySendEmail(
  mutateFn?: UseMutationOptions<ResponseSendEmailInterface,
    AxiosError<ResponseSendEmailInterface>,
    PutBodyModifySendEmailInterface
  >
) {
  return useMutation<ResponseSendEmailInterface,
    AxiosError<ResponseSendEmailInterface>,
    PutBodyModifySendEmailInterface
  >(putModifySendEmail, mutateFn);
}
export default usePutModifySendEmail;
