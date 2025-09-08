// categories section
const loadCategories = () => {
  const categoriesUrl = "https://openapi.programming-hero.com/api/categories";
  const categories = fetch(categoriesUrl)
    .then((res) => res.json())
    .then((data) => getCategories(data.categories));
};

loadCategories();

const getCategories = (datas) => {
  const categoriesContainer = document.getElementById("categories");
  categoriesContainer.innerHTML = `<h1 class="inter-font font-semibold text-xl mb-4">Categories</h1>`;
  console.log(datas);

  for (let data of datas) {
    const newdiv = document.createElement("div");
    console.log(data.category_name);
    newdiv.innerHTML = `
    <p class="inter-font mb-2">${data.category_name}</p>
    `;
    categoriesContainer.appendChild(newdiv);
  }
};
