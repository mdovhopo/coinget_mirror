export default function (input, type) {
  // console.log("Valid", input, type);
  switch(type) {
    case "email":
      return /^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,10}$/g.test(input);
    case "name":
      return /\w{3,30}/g.test(input);
    case "password":
      return /\w{8,24}/g.test(input);
  }
  return false;
}

