const { faker } = require("@faker-js/faker");
const config = require("../configs");
const { publishKafkaMessage } = require("../kafka/producer");
const { createFlight, getFlights } = require("../services/flight.services");

const generateRandomFlight = async () => {
  const origin = faker.location.city();
  let destination;

  do {
    destination = faker.location.city();
  } while (destination === origin);

  const flightData = {
    flightNumber: faker.string.alphanumeric(8).toUpperCase(),
    origin,
    destination,
    scheduledDepartureTime: faker.date.future(),
    status: faker.helpers.arrayElement([
      "Delayed",
      "Cancelled",
      "In-flight",
      "Scheduled/En Route"
    ]),
    flightType: faker.helpers.arrayElement([
      "Commercial",
      "Military",
      "Private"
    ]),
    airline: faker.helpers.arrayElement([
      "Pakistan International Airlines",
      "Emirates",
      "Qatar Airlines",
      "Air India",
      "British Airways"
    ])
  };

  try {
    const flight = await createFlight(flightData);
    publishKafkaMessage("flightCreated", "created");
    console.log("New flight created:", flightData.flightNumber);
  } catch (error) {
    console.error("Error generating random flight:", error);
  }
};

setInterval(generateRandomFlight, config.tasks.createFlightInterval);

const updateFlightStatus = async () => {
  try {
    // const flights = await Flight.find();
    const data = await getFlights({}, "", 1, 10, true);

    const flights = data.flights;

    if (flights.length === 0) {
      console.log("No flights to update status.");
      return;
    }

    const flightToUpdate = faker.helpers.arrayElement(flights);
    const newStatus = faker.helpers.arrayElement(["Cancelled", "Delayed"]);

    flightToUpdate.status = newStatus;

    await flightToUpdate.save();
    publishKafkaMessage("flightUpdate", "updated");
    console.log(
      `Flight ${flightToUpdate.flightNumber} status updated to ${newStatus}`
    );
  } catch (error) {
    console.error("Error updating flight status:", error);
  }
};

setInterval(updateFlightStatus, config.tasks.updateFlightInterval);
