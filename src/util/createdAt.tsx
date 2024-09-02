export const calculateTimeAgo = (createdAt: string): string => {
  const currentDate = new Date();
  const postDate = new Date(createdAt);
  const diffInTime = currentDate.getTime() - postDate.getTime();
  const diffInSeconds = Math.abs(Math.round(diffInTime / 1000));
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return `${diffInYears} yr`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} mo`;
  } else if (diffInDays > 0) {
    return `${diffInDays} d`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hr`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} min`;
  } else {
    return `${diffInSeconds} sec`;
  }
};
