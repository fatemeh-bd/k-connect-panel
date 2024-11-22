import { postMethod } from "../../../api/callApi";
import {
  GET_SERVER_LIST,
  GET_SERVER_LOCATIONS,
  GET_SERVER_PLANS,
} from "../../../api/endpoints";
import { notify } from "../../../utils/notify";

export const fetchPlans = async () => {
  const res = await postMethod(GET_SERVER_PLANS, {});
  if (res?.isSuccess) {
    return res.data;
  } else {
    notify(res.message, "error");
    return [];
  }
};

export const fetchServerLocations = async () => {
  const res = await postMethod(GET_SERVER_LOCATIONS, {});
  if (res?.isSuccess) {
    return res.data;
  } else {
    notify(res.message, "error");
    return [];
  }
};

export const fetchServerList = async (id: string) => {
  const res = await postMethod(GET_SERVER_LIST, {
    serverLocationId: id,
  });
  if (res?.isSuccess) {
    return res.data;
  } else {
    notify(res.message, "error");
    return [];
  }
};

export const submitUser = async () => {
    const res = await postMethod("",{});
    if (res?.isSuccess) {
      return res.data;
    } else {
      notify(res.message, "error");
      return [];
    }
  };
  
