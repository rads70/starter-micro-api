const axios = require("axios");
const { baseUrl } = require("./baseUrl");

const getUserActivities = async (body) => {
  const data = body;

  try {
    const res = await axios.post(baseUrl + "activities", data, {
      headers: {
        Authorization: process.env.DIESE_API_KEY,
        Idclient: "dnob",
        Token: process.env.DIESE_TOKEN,
      },
    });

    return res.data;
  } catch (error) {
    console.log("Error getUserActivities");
    return { error: true, message: error };
  }
};

const getActivityById = async (activity_id) => {
  try {
    const res = await axios.post(
      baseUrl + "activity/" + activity_id,
      { getAttendingArtists: true },
      {
        headers: {
          Authorization: process.env.DIESE_API_KEY,
          Idclient: "dnob",
          Token: process.env.DIESE_TOKEN,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log("Error getActivityById");
    return { error: true, message: error };
  }
};

module.exports = {
  getUserActivities,
  getActivityById,
};
