export const fetcher = async (url, token) => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
        "X-ApiKey": "7388DFBB-AE8B-4331-9F60-3C247604F0B6",
        Authorization: token,
      },
    });
    const json = await res.json();
    return {
      data: json,
      error: null,
    };
  } catch (err) {
    console.log(err);
    return {
      data: null,
      error: err,
    };
  }
};
