import moment from "moment";
import { shiftFuelTimeLoss } from "$lib/api/fuel-time-loss";

moment.locale("id");

export const shiftConverter = (shiftId) => {
  if (!shiftId || String(shiftId).length < 7) {
    return { date: null, shiftSuffix: null };
  }

  const shiftIdString = String(shiftId);

  // Extract YY-MM-DD
  const year = shiftIdString.substring(0, 2);
  const month = shiftIdString.substring(2, 4);
  const day = shiftIdString.substring(4, 6);

  // Extract shift suffix Shift 1, Shift 2, Shift 3
  const suffixId = shiftIdString.substring(6);

  // Date formatter
  const dateString = year + month + day;
  const shiftDate = moment(dateString, "YYMMDD").format("DD-MMM-YY");

  // Suffix formatter
  let shiftSuffix = "";
  switch (suffixId) {
    case "001":
      shiftSuffix = "Night Shift";
      break;
    case "002":
      shiftSuffix = "Day Shift";
      break;
    case "003":
      shiftSuffix = "Afternoon Shift";
      break;
    default:
      shiftSuffix = "Other Shift";
  }

  return { date: shiftDate, shiftSuffix };
};
