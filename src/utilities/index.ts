export function formatTextForInnerHTML(text: string): string {
  // console.log("THIS IS BEFORE SANITIZING!!!!");
  // console.log(text);
  // Replace the opening and closing comment tags with an empty string
  const cleanedText = text.replace(/<!--\s*|\s*-->/g, "");

  // Replace any occurrences of the less-than and greater-than signs with their HTML entities
  const formattedText = cleanedText.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Wrap the formatted text in a div element with a class of 'md'
  const html = `<div class="md">${formattedText}</div>`;

  // console.log("THIS IS AFTER SANITIZING!!!!");
  // console.log(html);
  // Return the formatted HTML string
  return html;
}
