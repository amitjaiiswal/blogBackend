exports.getTodayDate = () => {
  let start = new Date();
  start.setHours(start.getHours() + 5);
  start.setMinutes(start.getMinutes() + 30);
  return start;
};
exports.getOneYearAfterFromTodayDate = () => {
  let start = new Date();
  start.setFullYear(start.getFullYear() + 1);
  return start;
};
exports.getCurrentTime = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const formattedHours = hours < 10 ? "0" + hours : hours;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

exports.changeDateTimeToNight = (d) => {
	let newDate = new Date(d);
	newDate.setUTCHours(0);
	newDate.setUTCMinutes(0);
	newDate.setUTCSeconds(0);
	newDate.setUTCMilliseconds(0);
	return newDate
}

exports.changeDateTimeToNightAfter = (d) => {
	let newDate = new Date(d);
	newDate.setUTCHours(23);
	newDate.setUTCMinutes(59);
	newDate.setUTCSeconds(59);
	newDate.setUTCMilliseconds(999);
	return newDate
}
