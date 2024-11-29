// account
export const GET_BALANCE = "/v1/Account/GetBalance";
export const LOGIN = "/v1/Account/Login";
export const REGISTER = "/v1/Account/Register";
export const GET_PROFILE = "/v1/Account/GetProfile";
export const GET_NOTIF = "/v1/Account/GetUserNotifications";
export const READ_NOTIF = "/v1/Account/ReadNotify";
export const EDIT_PROFILE = "/v1/Account/EditProfile";
export const CHANGE_PASSOWRD = "/v1/Account/ChangePassword";
// support
export const SUPPORT_SECTIONS_LIST = "/v1/Support/TicketSections";
export const CREATE_TICKET = "/v1/Support/CreateTicket";
export const TICKET_LIST = "/v1/Support/GetTickets";
export const TICKET_DETAILS = "/v1/Support/GetTicketMessages";
export const SEND_MESSAGE = "/v1/Support/SendTicket";
export const CLOSE_TICKET = "/v1/Support/CloseTicket";
// server plan
export const GET_SERVER_PLANS = "/v1/ServerPlan/GetServerPlanSelectList";
// server location
export const GET_SERVER_LOCATIONS =
  "/v1/ServerLocation/ServerLocationSelectList";
export const GET_SERVER_LIST = "/v1/Server/GetServerSelectList";

// Client
export const CLIENT_EXIST_USERNAME = "/v1/Client/CheckUserNameExists";
export const CREATE_CLIENT = "/v1/Client/Create";
export const CLIENT_LIST = "/v1/Client/MyCustomers";
export const GET_NEWS = "/v1/Server/GetNews";
export const INCREASE_VOLUME = "/v1/Client/IncreaseVolume";
export const REMOVE_CLIENT = "/v1/Client/RemoveClient";

export const DASHBOARD = "/v1/Zone/GetDashboardZone";


//Crypto

export const CryptoTransaction = "/v1/Finance/GetCryptoTransaction";
export const WalletTransaction = "/v1/Finance/GetWalletTransaction";
