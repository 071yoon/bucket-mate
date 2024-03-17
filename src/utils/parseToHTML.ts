export const parseToHTML = (content: string) => {
  // parse in mardown rule for http
  // const parsedContent = content.replace(
  //   /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,
  //   "<a href='$1' target='_blank'>$1</a>"
  // );

  // parse in mardown rule for www
  // const parsedContent2 = content.replace(
  //   /(^|[^\/])(www\.[\S]+(\b|$))/gim,
  //   "$1<a target='_blank' href='http://$2'>$2</a>"
  // );

  // parse in mardown rule for email
  // const parsedContent3 = parsedContent2.replace(
  //   /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gi,
  //   "<a href='mailto:$1'>$1</a>"
  // );

  // parse in mardown rule for line break
  const parsedContent4 = content.replace(/\n/g, "<br />");

  // parse in mardown rule for links
  const parsedContent5 = parsedContent4.replace(
    /\[(.*?)\]\((.*?)\)/g,
    "<a href='$2' target='_blank'>$1</a>"
  );

  // parse in mardown rule for bold
  const parsedContent6 = parsedContent5.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  return parsedContent6;
};
