import { saveAs } from "file-saver";
import Papa from "papaparse";
import moment from "moment";
import { shiftFuelTimeLoss } from "$lib/api/fuel-time-loss";
import { shiftConverter } from "$lib/services/shift-fueltimeloss-shiftconvert";

moment.locale("id");

export const shiftFuelTimeLossDownloader = async () => {
  const filename = "Shift_EngineDetection.csv";
  // Fetch dataset
  const result = await shiftFuelTimeLoss();
  let data = result.data;

  // Validate dataset
  if (!data || data.length === 0) {
    alert("No data available to download.");
    return;
  }

  // Change format data type
  const formattedData = data.map((item) => {
    if (item.ShiftId) {
      const shiftInfo = shiftConverter(item.ShiftId);
      item.Date = shiftInfo.date;
      item.ShiftSuffix = shiftInfo.shiftSuffix;
    }

    if (item.TimeFuelRate) {
      item.TimeFuelRate = moment
        .utc(item.TimeFuelRate)
        .format("YYYY-MM-DD hh:mm:ss A");
    }

    if (item.TimeRPM) {
      item.TimeRPM = moment.utc(item.TimeRPM).format("YYYY-MM-DD hh:mm:ss A");
    }

    if (item.RefreshTime) {
      item.RefreshTime = moment
        .utc(item.RefreshTime)
        .format("YYYY-MM-DD hh:mm:ss A");
    }

    return {
      Id: item.RecordId,
      Date: item.Date,
      ShiftId: item.ShiftId,
      ShiftSuffix: item.ShiftSuffix,
      Equipment: item.Equipment,
      Status: item.Status,
      Reason: item.Reason,
      Load: item.Load,
      Location: item.Location,
      UnitLoc: item.UnitLoc,
      OperatorName: item.OperatorName,
      Crew: item.Crew,
      FuelRate: item.FuelRate,
      FuelLoss: item.FuelLoss,
      TimeFuelRate: item.TimeFuelRate,
      RPM: item.RPM,
      TimeRPM: item.TimeRPM,
      RefreshTime: item.RefreshTime,
    };
  });

  // Convert to CSV
  const csvString = Papa.unparse(formattedData);
  const csvBlob = new Blob(["\ufeff", csvString], {
    type: "text/csv;charset=utf-8",
  });

  // Download trigger
  saveAs(csvBlob, filename);

  console.log(`File ${filename} berhasil diunduh menggunakan PapaParse.`);
};
