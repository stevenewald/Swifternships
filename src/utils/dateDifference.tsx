export function dateDifference(targetDate: Date) {
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - targetDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  let differenceString;

  if (differenceInDays < 1) {
    differenceString = "Today";
  } else if (differenceInDays === 1) {
    differenceString = "Yesterday";
  } else if (differenceInDays < 7) {
    differenceString = `${differenceInDays} days ago`;
  } else if (differenceInDays < 30) {
    const weeks = Math.floor(differenceInDays / 7);
    differenceString = `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else {
    const months = Math.floor(differenceInDays / 30);
    differenceString = `${months} ${months === 1 ? "month" : "months"} ago`;
  }

  return differenceString;
}
