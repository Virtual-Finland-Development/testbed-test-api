"use strict";
const fetch = require("node-fetch");

module.exports.getPopulation = async (event) => {
  const body = JSON.parse(event.body);

  if (!body || !(body.city && body.year)) {
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: "Both region and year must be defined.",
      }),
    };
  }

  const { city, year } = body;

  const testbedResponse = await fetch(
    "https://gateway.testbed.fi/test/lsipii/Figure/Population?source=virtual_finland",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": event.headers.authorization || event.headers.Authorization
      },
      body: JSON.stringify({ city, year }),
    }
  );

  const testbedData = await testbedResponse.json();

  return {
    statusCode: testbedData?.status || 200,
    body: JSON.stringify(testbedData),
  };
};

module.exports.findJobPostings = async (event) => {
  const body = JSON.parse(event.body);

  if (!body) {
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: "Request body is missing",
      }),
    };
  }

  const response = await fetch(
    "https://gateway.testbed.fi/test/lassipatanen/Job/JobPosting?source=tyomarkkinatori",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          event.headers.authorization || event.headers.Authorization,
      },
      body: event.body,
    }
  );

  let responseJson = await response.json();

  return {
    statusCode: responseJson?.status || 200,
    body: JSON.stringify(responseJson),
  };
};
