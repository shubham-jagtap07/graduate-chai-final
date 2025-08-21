const fs = require("fs");
const path = require("path");

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, "../public/images");
const productsDir = path.join(imagesDir, "products");

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

// List of required images
const requiredImages = ["world-map.png", "hero-cup.png", "founder.jpg"];

const productImages = [
  "book.png",
  "tea-powder.png",
  "masala.png",
  "tea-set.png",
  "gift-hamper.png",
  "travel-mug.png",
];

// Create placeholder images
function createPlaceholderImage(filePath, text) {
  const placeholderSvg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" font-family="Arial" font-size="16" 
            text-anchor="middle" dominant-baseline="middle" fill="#666">
        ${text}
      </text>
    </svg>
  `;

  fs.writeFileSync(filePath, placeholderSvg.trim());
  console.log(`Created placeholder: ${filePath}`);
}

// Create main images
requiredImages.forEach((image) => {
  const filePath = path.join(imagesDir, image);
  if (!fs.existsSync(filePath)) {
    createPlaceholderImage(filePath, image.replace(".", " "));
  }
});

// Create product images
productImages.forEach((image) => {
  const filePath = path.join(productsDir, image);
  if (!fs.existsSync(filePath)) {
    createPlaceholderImage(filePath, `products/${image.replace(".", " ")}`);
  }
});

console.log("Placeholder images created successfully!");
