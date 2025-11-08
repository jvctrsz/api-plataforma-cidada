import { format } from "date-fns";

const generateProtocol = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const options = letters + numbers + letters.toLocaleLowerCase();

  const date = format(new Date(), "MM/yyyy");

  let randomDigits = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * options.length);
    randomDigits += options[randomIndex];
  }
  return date + "-" + randomDigits;
};

export const getNewProtocol = (protocols: string[]) => {
  let protocol = generateProtocol();
  while (protocols.includes(protocol)) {
    protocol = generateProtocol();
  }
  return protocol;
};
