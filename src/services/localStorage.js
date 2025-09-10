

export const saveEvents = (events) =>
  localStorage.setItem("events", JSON.stringify(events));

export const getEvents = () =>
  JSON.parse(localStorage.getItem("events") || "[]");
