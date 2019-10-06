const validEmail = /\S+@\S+\.\S+/

const validUser = ({email, phone}) => {
  return email && validEmail.test(email) && phone
}

const multiply = (base) => {
  return (val) => Number(val) * base
}

const multiplyBy12 = multiply(12)

const generateRandomNumber = () => {
  return Math.floor((Math.random() * 100) + 1)
}

const enoughIncome = (annualIncome, hasA) => {
  return annualIncome >= 100000 && hasA
}

const unpredictableError = () => {
  return new Error('Something went wrong')
}

const saveUser = (user, db) => {
  if (!validUser(user))
    throw unpredictableError()
  let hasA = false;
  user.permissions.forEach(permission => hasA = permission === 'A')
  const annualIncome = multiplyBy12(user.monthlyIncome);
  if (enoughIncome(annualIncome, hasA)) {
    try {
      user.id = generateRandomNumber() // generate a random id between 1 and 100 (don't do it in production :P)
      db.init();
      db.save(user);
    } catch (e) {
      throw unpredictableError()
    }
  } else {
    throw new Error("No enough annual income");
  }
};

export default saveUser;