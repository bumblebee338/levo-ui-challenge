const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60)); // difference in minutes
    return `${diff} min ago`;
};

export default getTimeAgo;