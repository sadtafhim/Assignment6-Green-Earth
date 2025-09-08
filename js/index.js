// categories section
const loadCategories = () => {
  const categoriesUrl = "https://openapi.programming-hero.com/api/categories";
  fetch(categoriesUrl)
    .then((res) => res.json())
    .then((data) => getCategories(data.categories));
};

loadCategories();

const getCategories = (datas) => {
  const categoriesContainer = document.getElementById("categories");
  categoriesContainer.innerHTML = `<h1 class="inter-font font-semibold text-xl mb-4">Categories</h1>`;

  const container = document.getElementById("trees");

  for (let data of datas) {
    const newdiv = document.createElement("div");
    newdiv.innerHTML = `
      <p class="inter-font mb-2 cursor-pointer">${data.category_name}</p>
    `;
    newdiv.querySelector("p").addEventListener("click", () => {
      const categoryDataUrl = `https://openapi.programming-hero.com/api/category/${data.id}`;

      fetch(categoryDataUrl)
        .then((res) => res.json())
        .then((datas) => {
          loadTrees(datas.plants, container);
        });
    });

    categoriesContainer.appendChild(newdiv);
  }
};

// Preloaded Data in trees

const preloadTrees = () => {
  const allTreesLink = "https://openapi.programming-hero.com/api/plants";
  const container = document.getElementById("trees");
  fetch(allTreesLink)
    .then((res) => res.json())
    .then((data) => loadTrees(data.plants, container));
};

preloadTrees();

const loadTrees = (datas, container) => {
  container.innerHTML = "";
  for (let data of datas) {
    const newdiv = document.createElement("div");
    newdiv.innerHTML = `
    <div class="bg-white w-[300px] p-5">
              <img class="w-[280px] h-[190px]" src="${data.image}" alt="" />
              <h1 class="inter-font text-sm">${data.name}</h1>
              <p class="inter-font text-xs">
                ${data.description}
              </p>
              <div class="flex justify-between">
                <button class="btn btn-soft btn-success rounded-md">
                  ${data.category}
                </button>
                <h4>৳${data.price}</h4>
              </div>
              <div class="flex justify-center">
                <button class="btn bg-green-700 text-white w-[95%] rounded-3xl">Add to Cart</button>
              </div>
            </div>`;
    container.appendChild(newdiv);
  }
};
