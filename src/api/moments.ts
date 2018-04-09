function format(millisecond: number = 0): string {
  let hour: number = 0;
  let minutes: number = 0;
  let seconds: number = Math.round(millisecond / 1000);

  if (seconds > 60 * 60) {
    hour = Math.floor(seconds / (60 * 60));
    minutes = Math.floor((seconds % (60 * 60)) / 60);
    seconds = Math.round((seconds % (60 * 60)) % 60);
    minutes = doublePlace(minutes);
    seconds = doublePlace(seconds);
    return `${hour}h${minutes}'${seconds}"`;
  } else if (seconds > 60) {
    minutes = Math.floor(seconds / 60);
    seconds = Math.round(seconds % 60);
    minutes = doublePlace(minutes);
    seconds = doublePlace(seconds);
    return `${minutes}'${seconds}"`;
  }
  seconds = doublePlace(seconds);
  return `${seconds}"`;
}
function doublePlace(number) {
  return number < 10 ? `0${number}` : number;
}

export default {
  format
};
