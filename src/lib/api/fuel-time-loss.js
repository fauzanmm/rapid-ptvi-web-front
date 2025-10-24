// Get data current fuel time
export const currentFuelTimeLoss = async (department) => {
  const url = new URL(
    `${import.meta.env.VITE_URL_API}/fuelTimeLoss/current/${department}`
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

export const shiftFuelTimeLoss = async (department) => {
  const url = new URL(
    `${import.meta.env.VITE_URL_API}/fuelTimeLoss/shift/${department}`
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

export const shiftSummaryFuelTimeLoss = async (department) => {
  const url = new URL(
    `${import.meta.env.VITE_URL_API}/fuelTimeLoss/shift/summary/${department}`
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

export const shiftTableFuelTimeLoss = async (department, params = {}) => {
  const url = new URL(
    `${import.meta.env.VITE_URL_API}/fuelTimeLoss/shift/table/${department}`
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
