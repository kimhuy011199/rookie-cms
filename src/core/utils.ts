export const generatePageRange = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const getWordsFromContent = (content: string, length: number) => {
  const contentArr = content.split(' ');
  return contentArr.length > length
    ? contentArr.splice(0, length).join(' ') + ' ...'
    : content;
};

export const formatMonthDateYear = (date: string) => {
  return new Date(date).toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
