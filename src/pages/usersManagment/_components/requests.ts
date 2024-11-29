import { postMethod } from "../../../api/callApi";
import {
  CLIENT_EXIST_USERNAME,
  GET_SERVER_LIST,
  GET_SERVER_LOCATIONS,
  GET_SERVER_PLANS,
  INCREASE_VOLUME,
  REMOVE_CLIENT,
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
export const fetchUserNameExist = async (userName: string) => {
  const res = await postMethod(
    CLIENT_EXIST_USERNAME + `?userName=${userName}`,
    {}
  );
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
  const res = await postMethod("", {});
  if (res?.isSuccess) {
    return res.data;
  } else {
    notify(res.message, "error");
    return [];
  }
};
export const increaseVolume = async (clientId: number, unitGb: number) => {
  const res = await postMethod(INCREASE_VOLUME, {
    clientId: clientId,
    unitGB: unitGb,
  });
  if (res?.isSuccess) {
    return res;
  } else {
    notify(res.message, "error");
    return [];
  }
};
export const removeClient = async (id: number) => {
  const res = await postMethod(REMOVE_CLIENT + `?id=${id}`, {});
  if (res?.isSuccess) {
    return res;
  } else {
    notify(res.message, "error");
    return [];
  }
};
