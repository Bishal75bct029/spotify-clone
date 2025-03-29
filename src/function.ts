export const getDuration = (milliseconds: number) => {
  const minutes = Math.floor(milliseconds / 60);
  const seconds = Math.floor(milliseconds % 60);
  let formattedMinutes = '';
  let formattedSeconds = '';

  if (minutes < 10) {
    formattedMinutes = '0' + minutes.toString();
  } else {
    formattedMinutes = minutes.toString();
  }
  if (seconds < 10) {
    formattedSeconds = '0' + seconds.toString();
  } else {
    formattedSeconds = seconds.toString();
  }

  return `${formattedMinutes}:${formattedSeconds}`;
};
