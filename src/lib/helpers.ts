export const isAtLeast18 = (dob: string) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const isWeekend = (date: Date) => {
  const day = date.getDay(); // 0=Sun, 5=Fri, 6=Sat
  return day === 5 || day === 6;
};