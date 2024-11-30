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