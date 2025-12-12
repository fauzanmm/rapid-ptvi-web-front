import { saveAs } from "file-saver";
import Papa from "papaparse";
import moment from "moment";
import { shiftFuelTimeLoss } from "$lib/api/fuel-time-loss";

moment.locale("id");

export const shiftFuelTimeLossDownloader = async () => {
  const filename = "Shift_EngineDetection.csv";

  const result = await shiftFuelTimeLoss();
  const data = result.data;

  if (!data || data.length === 0) {
    alert("No data available to download.");
    return;
  }

  const formattedData = data.map((item) => {
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

    return item;
  });

  const csvString = Papa.unparse(formattedData);

  const csvBlob = new Blob(["\ufeff", csvString], {
    type: "text/csv;charset=utf-8",
  });

  saveAs(csvBlob, filename);

  console.log(`File ${filename} berhasil diunduh menggunakan PapaParse.`);
};
