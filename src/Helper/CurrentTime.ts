export const CurrentTime = (): string => {
  const systemTime = new Date();

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-IN", options).format(systemTime);
};

export const getDateOnly = (): string => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0"); // Ensures two digits
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
};

export const calculateAge = (dateOfBirth) => {
  const dob = new Date(dateOfBirth); // Parse the given date
  const today = new Date(); // Current date

  let age = today.getFullYear() - dob.getFullYear(); // Calculate year difference
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();
  // Adjust age if the current month/day is earlier than the birth month/day
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};

export const getHoursAndMinutesBetween = (
  startTime: string,
  endTime: string
) => {
  // Parse the times as Date objects with the same date for comparison
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  // Set the date for both times
  const today = new Date();
  const startDate = new Date(today);
  startDate.setHours(startHour, startMinute, 0, 0);

  const endDate = new Date(today);
  endDate.setHours(endHour, endMinute, 0, 0);

  // If the end time is earlier than the start time, assume it's the next day
  if (endDate < startDate) {
    endDate.setDate(endDate.getDate() + 1);
  }

  // Calculate the difference in milliseconds
  const differenceMs = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to total minutes
  const totalMinutes = Math.floor(differenceMs / (1000 * 60));

  // Extract hours and minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
};

export const calculateDaysDifference = (date1, date2) =>{
  // Parse the dates
  const d1:any = new Date(date1);
  const d2:any = new Date(date2);
  
  // Calculate the difference in time (milliseconds)
  const diffInTime = Math.abs(d2 - d1);
  
  // Convert the difference to days
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
  return diffInDays;
}
