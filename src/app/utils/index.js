import PendingIcon from "../../../public/assets/hourglass.svg";
import ApprovedIcon from "../../../public/assets/check-circle.svg";
import RejectedIcon from "../../../public/assets/rejected.svg";
import CancelledIcon from "../../../public/assets/slash-circle-01.svg";
import Negotiation from "../../../public/assets/negotiate.svg";
import Calendar from "../../../public/assets/calendar-check-01.svg";
export function appendArrayToUrl(url, arrParams, key) {
  const params = arrParams.map((elem, index) => `${key}[${index}]=${elem}`);

  const queryPrefix = url.includes("?") ? "&" : "?";
  const regionQueryString = params.join("&");

  return `${url}${queryPrefix}${regionQueryString}`;
}

export function appendParamToUrl(url, paramName, paramValue) {
  const queryPrefix = url.includes("?") ? "&" : "?";
  const param = `${paramName}=${paramValue}`;
  return `${url}${queryPrefix}${param}`;
}

// dynamic icon based on the status
export function getIcon(status) {
  let icon;
  switch (status) {
    case "reserved":
      icon = Calendar;
      break;
    case "accepted":
      icon = ApprovedIcon;
      break;
    case "pending":
      icon = PendingIcon;
      break;
    case "rejected":
      icon = RejectedIcon;
      break;
    case "canceled":
      icon = CancelledIcon;
      break;
    case "negotiation":
      icon = Negotiation;
      break;
  }

  return icon;
}
