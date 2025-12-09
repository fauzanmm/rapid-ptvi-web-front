// Get data current fuel time
export const currentFuelTimeLoss = async () => {
  const url = new URL(`${import.meta.env.VITE_URL_API}/fuelTimeLoss/current`);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error(`Request failed with status ${response.status}`);
  }
};

export const shiftFuelTimeLoss = async () => {
  const url = new URL(`${import.meta.env.VITE_URL_API}/fuelTimeLoss/shift`);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error(`Request failed with status ${response.status}`);
  }
};

export const shiftSummaryFuelTimeLoss = async () => {
  const url = new URL(
    `${import.meta.env.VITE_URL_API}/fuelTimeLoss/shift/summary`
  );

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error(`Request failed with status ${response.status}`);
  }
};

export const shiftTableFuelTimeLoss = async (params = {}) => {
  const url = new URL(
    `${import.meta.env.VITE_URL_API}/fuelTimeLoss/shift/table`
  );

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value);
    }
  });
  url.search = searchParams.toString();

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error(`Request failed with status ${response.status}`);
  }
};
