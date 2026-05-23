function ListItem(title, justIconNoLink) {
  const iconSrc = `../assets/images/icon-${title.toLowerCase() === "javascript" ? "js" : title.toLowerCase()}.svg`;

  const li = document.createElement("li");
  li.classList.add("list-item");

  const link = document.createElement("a");
  link.href = `quiz.html?category=${title}`;
  link.classList.add(justIconNoLink ? "justIconNoLink" : null);

  const iconContainer = document.createElement("div");
  iconContainer.classList.add(`${title.toLowerCase()}`, "icon-container");

  const icon = document.createElement("img");
  icon.classList.add("list-item-icon");
  icon.setAttribute("alt", `${title} icon`);
  icon.src = iconSrc;

  const heading = document.createElement("p");
  heading.textContent = `${title}`;
  heading.classList.add("list-item-heading");

  iconContainer.appendChild(icon);
  link.appendChild(iconContainer);
  link.appendChild(heading);
  li.appendChild(link);

  return li;
}

export default ListItem;
