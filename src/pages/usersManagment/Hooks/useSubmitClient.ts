import { useMutation } from "react-query";
import { postMethod } from "../../../api/callApi";
import { CREATE_CLIENT } from "../../../api/endpoints";
import { notify } from "../../../utils/notify";

export const useSubmitClient = () => {
  return useMutation(
    async (input: any) => {
      const response = await postMethod(CREATE_CLIENT, input);
      if (response?.isSuccess) {
        return response;
      } else {
        return response;
      }
    },
    {
      onSuccess: (data) => {
        notify(data.message, data.isSuccess ? "success" : "error");
      },
      onError: (error: Error) => {
        notify(error.message, "error");
      },
    }
  );
};
