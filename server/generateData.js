import fs from 'fs';

const categories = [
    "CÂY ĂN TRÁI", "CÂY BONSAI", "CÂY CẢNH", "CÂY CÓ HOA",
    "CÂY ĐỘC LẠ", "CÂY GIA VỊ", "CÂY GIỐNG", "CÂY HOA LEO",
    "CÂY LỚN", "HOA LAN", "PHÂN BÓN - VẬT TƯ"
];

const names = {
    "CÂY ĂN TRÁI": ["Xoài", "Mít", "Sầu Riêng", "Vú Sữa", "Bưởi", "Ổi", "Nhãn", "Chôm Chôm", "Măng Cụt"],
    "CÂY BONSAI": ["Tùng La Hán", "Mai Chiếu Thủy", "Linh Sam", "Nguyệt Quế", "Sanh", "Đa Búp Đỏ"],
    "HOA LAN": ["Phi Điệp", "Dendro", "Hồ Điệp", "Mokara", "Vũ Nữ", "Ngọc Điểm"],
    "DEFAULT": ["Kim Tiền", "Lưỡi Hổ", "Trầu Bà", "Sen Đá", "Xương Rồng", "Phát Tài", "Vạn Lộc"]
};

const suffixes = ["Thái Lan", "Cổ Thụ", "Gốc VIP", "F1", "Siêu Trái", "Mini", "Để Bàn", "Đột Biến"];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createPlant = (id) => {
    const category = getRandom(categories);
    const baseName = getRandom(names[category] || names["DEFAULT"]);
    const suffix = getRandom(suffixes);

    const price = randomInt(5, 500) * 10000;
    const isSale = Math.random() > 0.7;

    return {
        id: id,
        name: `${baseName} ${suffix} #${id}`,
        category: category,
        price: price,
        oldPrice: isSale ? price + randomInt(2, 10) * 10000 : null,
        description: `Sản phẩm ${baseName} chất lượng cao, phù hợp khí hậu Việt Nam. Cây khỏe, bầu rễ ổn định.`,
        images: [
            `https://picsum.photos/seed/${id}-1/400/400`,
            `https://picsum.photos/seed/${id}-2/400/400`,
            `https://picsum.photos/seed/${id}-3/400/400`,
            `https://picsum.photos/seed/${id}-4/400/400`,
            `https://picsum.photos/seed/${id}-5/400/400`
        ],
        stock: randomInt(0, 100),
        rating: randomInt(3, 5),
        reviews: randomInt(5, 200)
    };
};

const plantList = [];
for (let i = 1; i <= 500; i++) {
    plantList.push(createPlant(i));
}

const db = {
    products: plantList,
    cart: [],
    users: [],
    orders: []
};

fs.writeFileSync('./server/db.json', JSON.stringify(db, null, 2));
console.log("Đã tạo 500 cây cảnh vào server/db.json!");