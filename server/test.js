import fs from 'fs';

const realProductTemplates = [
    // CÂY ĂN TRÁI (9 sản phẩm)
    {
        baseName: "Mít Thái Siêu Sớm",
        category: "CÂY ĂN TRÁI",
        images: [
            "https://vuonnhasau.com/wp-content/uploads/2021/03/3bxuFrrJPegQya6JutAl_simg_de2fe0_500x500_maxb.jpg",
            "https://nongsantaynguyen.net/wp-content/uploads/2017/04/mit-thai-mit-sieu-som-600x600.jpg",
            "https://caydep.vn/wp-content/uploads/2024/03/mui-mit-thai-sieu-som-ngon.jpg",
            "https://caydep.vn/wp-content/uploads/2024/03/mui-qua-mit-thai-sieu-som.jpg",
            "https://giongcay.net/uploads/products/mit-thai-giong.jpg"
        ]
    },
    {
        baseName: "Xoài Đài Loan",
        category: "CÂY ĂN TRÁI",
        images: [
            "https://bizweb.dktcdn.net/thumb/1024x1024/100/422/567/products/cay-giong-can-tho-xoai-dai-loan-1-2.jpg?v=1638956130830",
            "https://trungtamgiongcaynongnghiep.com/wp-content/uploads/2022/04/x4-730x430-1.jpg",
            "https://caycanhhaidang.com/wp-content/uploads/2018/03/xoaidailoan7.jpg",
            "https://thegioicaytrong.vn/upload/img/products/18062019/8eda3a6094d00335a06a604e0ecefcad.jpg",
            "https://navifruit.com.vn/wp-content/uploads/2022/07/xoai-dai-loan-vang-6-1.jpg"
        ]
    },
    {
        baseName: "Sầu Riêng Ri6",
        category: "CÂY ĂN TRÁI",
        images: [
            "https://www.sieuthisaigon.com.vn/upload/source/dichvu/MEo%20vat/meogiadinh/rau%20c%E1%BB%A7/saurieng_20180119101236.jpg",
            "https://delifruit.vn/wp-content/uploads/2024/08/sau-rieng-ri6-2.jpg",
            "https://traicaytonyteo.com/uploads/source/sau-rieng-ri-6-min.jpg",
            "https://cakho1nang.com/wp-content/uploads/2021/06/Sau-rieng-Ri6-chin-cay.jpg",
            "https://huynhlam.com.vn/upload/baiviet/sau-rieng-ri6-1583.jpg"
        ]
    },
    {
        baseName: "Vú Sữa Lò Rèn",
        category: "CÂY ĂN TRÁI",
        images: [
            "https://www.vietfuntravel.com.vn/image/data/Blog/dac-san/Vu-sua-Lo-Ren-Vinh-Kim/Vu-sua-Lo-Ren-Vinh-Kim-2.jpg",
            "https://mia.vn/media/uploads/blog-du-lich/ve-tien-giang-thuong-thuc-vu-sua-lo-ren-vinh-kim-nuc-tieng-1650969293.jpg",
            "https://static.tuoitre.vn/tto/i/s626/2014/12/12/07gRzXG8.jpg",
            "https://caytrong.vn/storage/uploads/noidung/v_sa_l_rn.jpg",
            "https://traicaytiengiang.com/uploads/images/2022/03/1648286985-single_product1-vusuatrang65557092ba8e4c69a9d98e26ca283d90master.jpg"
        ]
    },
    {
        baseName: "Bưởi Da Xanh",
        category: "CÂY ĂN TRÁI",
        images: [
            "https://tfruit.com.vn/wp-content/uploads/2019/08/B%C6%B0%E1%BB%9Fi-da-xanh-b%E1%BA%BFn-tre.jpg",
            "https://bizweb.dktcdn.net/100/481/714/products/buoi-da-xanh-1.jpg?v=1697190266940",
            "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m95jmdbtlp4y07_tn",
            "https://nongsantanlapmocchau.com/wp-content/uploads/2022/08/buoi-da-xanh-1.jpg",
            "https://cdnv2.tgdd.vn/ketnoicungcau/Contents/images/upload/product/20231216/113031129/buoi-da-xanh-an-lao-11303116122023I4FVH.jpg"
        ]
    },
    {
        baseName: "Ổi Tứ Quý",
        category: "CÂY ĂN TRÁI",
        images: [
            "https://bizweb.dktcdn.thumb/large/100/187/410/files/oi-gang-1.jpg?v=1494643883997",
            "https://xoaisaydeo.com/wp-content/uploads/2025/10/oi-tu-quy-3.jpg",
            "https://giongcay.net/uploads/images/images/P1160404.JPG",
            "https://xoaisaydeo.com/wp-content/uploads/2025/10/oi-tu-quy-2.jpg",
            "https://salt.tikicdn.com/cache/w300/ts/product/87/c9/a9/33cae5b88a5ca2366afa0e38fc2b162c.jpg"
        ]
    },
    {
        baseName: "Nhãn Ido",
        category: "CÂY ĂN TRÁI",
        images: [
            "https://cdn.nhandan.vn/images/a48e0596059359812a5b08ccf3f1da0e0eacff58be3c012ce307b8e5feea9d0848401e0279b7b82660f129ca1e2282e481eed2f735b0fef4353f12543ae1966c/nhan-9042-4781.jpg",
            "https://check.cantho.gov.vn/public/uploads/products/3616_nhan.jpg",
            "https://bizweb.dktcdn.net/thumb/1024x1024/100/482/702/products/nhan-ido-3.jpg?v=1697121610167",
            "https://vnxanh.com.vn/wp-content/uploads/2025/08/qua-nhan-011-16577236470411206981550.jpg",
            "https://vcdn1-vnexpress.vnecdn.net/2017/05/15/nhan-8017-1494840554.png?w=500&h=300&q=100&dpr=1&fit=crop&s=frvotTn3bnR3Nk6oX6pXNg"
        ]
    },
    {
        baseName: "Chôm Chôm Nhãn",
        category: "CÂY ĂN TRÁI",
        images: [
            "https://thuyanhfruits.com/wp-content/uploads/2021/02/unnamed.png",
            "https://traicayngon.com.vn/wp-content/uploads/2016/07/thumbs-chom-nhan.gif",
            "https://thegioicaygiong.net/wp-content/uploads/2022/03/chom-chom-nhan-4.jpg",
            "https://nongsanphuonganh.vn/image/data/chom-chom-nhan-mien-tay.jpg",
            "https://nongsanphuonganh.vn/image/data/chom-chom-nhan.jpg"
        ]
    },
    {
        baseName: "Măng Cụt Thái Lan",
        category: "CÂY ĂN TRÁI",
        images: [
            "https://traicaytonyteo.com/uploads/source/nho-mau-don/mang-cut-thai-lan-min.jpg",
            "https://nongsanbaolam.vn/wp-content/uploads/2023/12/mang-cut-thai-nongsanbaolam-2.jpg",
            "https://nghientrongcay.com/wp-content/uploads/2023/08/z4564278499224_de24797c417aa186b599a56794d2037d.jpg",
            "https://nongsanbaolam.vn/wp-content/uploads/2023/12/mang-cut-thai-nongsanbaolam.jpg",
            "https://product.hstatic.net/200000377165/product/mang_cut_thai_lan__2__05f57fd9cfb544f3a06d2da4be660108_master.jpg"
        ]
    },

    // CÂY BONSAI (3 sản phẩm)
    {
        baseName: "Tùng La Hán Cổ Thụ",
        category: "CÂY BONSAI",
        images: [
            "https://caydothi.vn/upload/image/Cay%20cong%20trinh/cay%20tung%20la%20han/z3774057078305_b7edc22d437784eaefc719fab4a455ef.jpg",
            "https://cayxanhvietnam.vn/uploads/images/product/Tung%20la%20han%20to.jpg",
            "https://cdn.eva.vn/upload/3-2022/images/2022-07-29/image11-1659064047-229-width1581height2048.jpg",
            "https://greenworks.com.vn/wp-content/uploads/2024/01/tung-la-han-682x1024.jpg",
            "https://vuoncayvietnam.com/wp-content/uploads/2020/01/dac-diem-ve-cay-tung-la-han.jpg"
        ]
    },
    {
        baseName: "Mai Chiếu Thủy",
        category: "CÂY BONSAI",
        images: [
            "https://caycanh4mua.com/UserFile/Product/cay-mai-chieu-thuy.jpg",
            "https://caycanhtamky.com/wp-content/uploads/2024/06/z5500434356226_5ab994a05a10eff56b7cbf21085ee4f6.jpg",
            "https://cdn.eva.vn/upload/3-2020/images/2020-07-13/mai-chieu-thuy-nhung-dieu-ma-ban-chua-biet-ve-loai-cay-thu-vi-nay-4-1594647850-489-width600height600.jpg",
            "https://trungtamthuoc.com/images/item/mai-chieu-thuy-pdh.jpg",
            "https://caycanhdep24h.com/wp-content/uploads/2023/02/bonsai-mai-chieu-thuy-mau-1.jpg"
        ]
    },
    {
        baseName: "Sanh Nam Điền",
        category: "CÂY BONSAI",
        images: [
            "https://bonsaibamien.com/wp-content/uploads/2024/05/sanh-nam-dien-3-1024x768.jpg",
            "https://caydepdienxa.com/wp-content/uploads/2023/05/sanh-nam-dien-1.jpg",
            "https://caydepdienxa.com/wp-content/uploads/2018/05/sanh-nam-dien-60.jpg",
            "https://bonsaihanoi.vn/wp-content/uploads/2022/04/z3366499820130_c61f9ac82c052e65c7e7155c2e6b9de5.jpg",
            "https://bonsaibamien.com/wp-content/uploads/2024/05/sanh-nam-dien-1024x576.jpg"
        ]
    },

    // CÂY CẢNH (2 sản phẩm)
    {
        baseName: "Kim Tiền Trụ",
        category: "CÂY CẢNH",
        images: [
            "https://ngoctangarden.com/wp-content/uploads/2025/04/cay-kim-tien-chau-tru-nen-soi.jpg",
            "https://mowgarden.com/wp-content/uploads/2022/11/cay-kim-tien-trang-tri-van-phong.jpg",
            "https://igardecor.com/wp-content/uploads/2021/05/eee3b4a6bdfd48a311ec-scaled.jpg",
            "https://caysenda.net/wp-content/uploads/2022/12/z3951432428596_d79669f68e9020a3412b163854d5e764.jpg",
            "https://media.loveitopcdn.com/31183/thumb/kim-tien-7.jpg"
        ]
    },
    {
        baseName: "Lưỡi Hổ Vàng",
        category: "CÂY CẢNH",
        images: [
            "https://mowgarden.com/wp-content/uploads/2021/11/cay-luoi-ho-thai-vang-mini.jpg",
            "https://mowgarden.com/wp-content/uploads/2021/11/cay-luoi-ho-vang-dai-Sansevieria-trifasciata-Laurentii-1.jpg",
            "https://cdn.eva.vn/upload/3-2022/images/2022-07-08/image16-1657261714-63-width2000height2000.jpg",
            "https://namix.vn/wp-content/uploads/2022/07/cay-luoi-ho-vien-vang-hop-tuoi-nao.jpg",
            "https://kiengla.vn/wp-content/uploads/2025/02/Luoi-ho-vang.jpg"
        ]
    },

    // CÂY CÓ HOA (2 sản phẩm)
    {
        baseName: "Hoa Hồng Pháp",
        category: "CÂY CÓ HOA",
        images: [
            "https://sfarm.vn/wp-content/uploads/2022/02/hoa-hong-leo-phap-cach-trong-va-cham-soc-1.jpg",
            "https://hatgiongphuongnam.com/asset/upload/image/hat-giong-hoa-hong-leo-phap-1.14_.jpg?v=20190410",
            "https://cdn.eva.vn/upload/3-2021/images/2021-08-20/image9-1629425505-236-width600height400.jpg",
            "https://happyflower.vn/tin-tuc/app/uploads/hoa-hong-do-phap-6.jpg",
            "https://cdn.tgdd.vn/Files/2023/03/16/1518503/hoa-hong-phap-y-nghia-hinh-anh-cach-trong-cham-soc-tai-nha-202303170632506206.jpg"
        ]
    },
    {
        baseName: "Tường Vi Thái",
        category: "CÂY CÓ HOA",
        images: [
            "https://cayxanhvietnam.vn/uploads/images/product/Bang%20lang%20ghep%20tuong%20vi%202.jpg",
            "https://cayxanhvietnam.vn/uploads/images/post/bang%20lang%20ghep%20tuong%20vi.jpg",
            "https://cayxanhvietnam.vn/uploads/images/post/CAY%20DEP%20TUONG%20VI.jpg",
            "https://cayxanhdalat.com/wp-content/uploads/2021/12/ca%CC%82y-tu%CC%9Bo%CC%9B%CC%80ng-vi.png",
            "https://file.hstatic.net/200000186977/file/cay-tuong-vi-bonsai-2_8e3cc9bf2b2b441081ea0c6f1f25c464_grande.jpg"
        ]
    },

    // CÂY ĐỘC LẠ (2 sản phẩm)
    {
        baseName: "Xương Rồng Đột Biến",
        category: "CÂY ĐỘC LẠ",
        images: [
            "https://kiengla.vn/wp-content/uploads/2025/06/Xuong-rong-Gymnocalycium-Mihanovichii-Variegata.jpg",
            "https://pixnio.com/free-images/2022/09/28/2022-09-28-08-52-12-1350x900.jpg",
            "https://kiengla.vn/wp-content/uploads/2025/06/Xuong-rong-Astro-Onzuka.jpeg",
            "https://afamilycdn.com/3DRoOzZayXT8Nj8aXsnmZT0sxS0Fc/Image/2015/08/xem-nhung-cay-xuong-rong-khong-lo-moc-mao-tren-dat-my_8fba52aa0b.jpg",
            "https://vcdn1-giadinh.vnecdn.net/2022/04/08/Screen-Shot-2022-04-08-at-13-4-2761-7466-1649402347.png?w=680&h=0&q=100&dpr=2&fit=crop&s=q0N8CaJNdIh7COv2nBoV1Q"
        ]
    },
    {
        baseName: "Sen Đá Thạch Anh",
        category: "CÂY ĐỘC LẠ",
        images: [
            "https://aiva.com.vn/wp-content/uploads/2024/11/CAY-TAI-LOC-DA-THACH-ANH-4.jpg",
            "https://aiva.com.vn/wp-content/uploads/2024/11/CAY-TAI-LOC-DA-THACH-ANH-1.jpg",
            "https://gomsusanvuon.com/wp-content/uploads/2024/07/sen-da-2.png",
            "https://aiva.com.vn/wp-content/uploads/2024/11/CAY-TAI-LOC-DA-THACH-ANH-7.jpg",
            "https://aiva.com.vn/wp-content/uploads/2024/11/CAY-TAI-LOC-DA-THACH-ANH-5.jpg"
        ]
    },

    // CÂY GIA VỊ (1 sản phẩm)
    {
        baseName: "Sả Chanh",
        category: "CÂY GIA VỊ",
        images: [
            "https://hatgiongphuongnam.com/asset/upload/image/hat-giong-sa-chanh-1.1_.jpg?v=20190410",
            "https://jungarden.com/wp-content/uploads/2024/06/sa-chanh-phap-24.jpg",
            "https://caythuoc.org/wp-content/uploads/2022/07/co-roi-ngua-sa-chanh-phap.jpg",
            "https://product.hstatic.net/200000858465/product/d55bd720-064f-431a-9fb4-d5f0eaabef70_2bba653422754b7fa61bb13e7afa01b4_master.jpg",
            "https://hoasenviet.net/uploads/images/C%C3%A2y%20s%E1%BA%A3%20chanh%20ph%C3%A1p(3).jpg"
        ]
    },

    // CÂY GIỐNG (1 sản phẩm)
    {
        baseName: "Giống Cà Chua Bi",
        category: "CÂY GIỐNG",
        images: [
            "https://nongsanhaugiang.com.vn/images/10012020/af016b3d2384d8f39cad4c0819aecf39.jpg",
            "https://hatgiongphuongnam.com/asset/upload/image/hat-giong-ca-chua-bi-do-lun-11.jpg?v=20190410",
            "https://vuonxanhnguyengia.com/uploads/source/san-pham/vuon-rau/ca-chua-bi-sach-1-600x600.jpg",
            "https://nongsanhaugiang.com.vn/images/10012020/43e56246a3ee2b670bec02ea3d75561d.jpg",
            "https://hatgiongphuongnam.com/asset/editor/ResponsiveFilemanager-master/source/hat-giong-ca-chua-bi-vang-lun.jpg"
        ]
    },

    // CÂY HOA LEO (1 sản phẩm)
    {
        baseName: "Tigon Đỏ",
        category: "CÂY HOA LEO",
        images: [
            "https://saigonhoa.com/wp-content/uploads/2015/05/hoa-tigon-do.jpg",
            "https://webcaycanh.com/wp-content/uploads/2019/07/hoa-tigon.jpg",
            "https://dienhoaxanh.com/wp-content/uploads/2021/09/hoa-tigon-do.jpg",
            "https://hoacuatroi.vn/wp-content/uploads/2024/12/hoa-tigon.jpg",
            "https://hoatuoi9x.com/wp-content/uploads/2021/05/hoa-tigon.jpg"
        ]
    },

    // CÂY LỚN (1 sản phẩm)
    {
        baseName: "Bàng Singapore",
        category: "CÂY LỚN",
        images: [
            "https://static-images.vnncdn.net/files/publish/2022/9/26/cay-phong-thuy-1007.jpg?width=0&s=sMlS1PKyfdIxK5LTnD5bFw",
            "https://mowgarden.com/wp-content/uploads/2021/04/cay-bang-singapore-mot-than-chau-xi-mang.jpg",
            "https://caycanh4mua.com/Uploads/images/cay-bang-singapo-la-to-van-phong.jpg",
            "https://joygarden.vn/wp-content/uploads/sites/16/2024/06/bang-11-of-23-1200x1200.jpg",
            "https://phuongtrunggreen.com/resource/images/2024/10/cay-bang-singapore.jpg"
        ]
    },

    // HOA LAN (2 sản phẩm)
    {
        baseName: "Lan Hồ Điệp",
        category: "HOA LAN",
        images: [
            "https://bizweb.dktcdn.net/thumb/1024x1024/100/261/741/products/chau-lan-ho-diep-vang-9-canh-hdv-0911.jpg?v=1527240003377",
            "https://bizweb.dktcdn.net/thumb/1024x1024/100/395/317/products/lan-ho-diep-hong-16-canh-lhd-787.jpg?v=1706516629510",
            "https://bizweb.dktcdn.net/thumb/1024x1024/100/512/634/products/lan-ho-diep-mau-hong-phan-10-canh-hd360.jpg?v=1725767964937",
            "https://flowersight.com/wp-content/uploads/2020/03/lan-h%E1%BB%93-%C4%91i%E1%BB%87p-e1584030166650.jpg",
            "https://www.bab-orchids.com/wp-content/uploads/2020/08/Bat-mi-cach-cham-Lan-Ho-Diep-ra-hoa-ruc-ro-3-scaled.jpg"
        ]
    },
    {
        baseName: "Lan Dendro",
        category: "HOA LAN",
        images: [
            "https://cdn.tgdd.vn/Files/2021/08/01/1372228/hoa-lan-dendro-nang-nguon-goc-dac-diem-cach-trong-202201071059040577.jpg",
            "https://cdn.eva.vn/upload/3-2022/images/2022-07-22/image11-1658476169-15-width2048height1365.jpg",
            "https://lanhodiep.vn/wp-content/uploads/2023/03/hoa-lan-dendro-1.jpg",
            "https://caycanhdanang.com.vn/wp-content/uploads/2024/09/Lan-Dendro-2.jpg",
            "https://cdn.tgdd.vn/Files/2021/08/01/1372228/hoa-lan-dendro-nang-nguon-goc-dac-diem-cach-trong-202108011209558147.jpg"
        ]
    },

    // PHÂN BÓN - VẬT TƯ (1 sản phẩm)
    {
        baseName: "Phân Bón NPK",
        category: "PHÂN BÓN - VẬT TƯ",
        images: [
            "https://vandienfmp.vn/wp-content/uploads/2019/05/NPK-5-10-3.jpg",
            "https://nongnghiepvui.vn/wp-content/uploads/2025/05/Artboard-1-copy-16@2x-100.jpg",
            "https://phanbondientrang.vn/upload/product/224435431112.jpg",
            "https://binhdienmekong.vn/wp-content/uploads/mau-bao-1kg-2.png",
            "https://bizweb.dktcdn.net/thumb/1024x1024/100/454/380/products/15-15-15-8a84417e-31d2-400d-8c9a-dce031d2498b.png?v=1734682495120"
        ]
    }
];

const variations = [
    "Giống F1", "Cây Cho Trái", "Gốc Cổ Thụ", "Hàng VIP", "Size Lớn",
    "Chậu Nhựa", "Bầu Rễ Ổn Định", "Cây Công Trình", "Hàng Tuyển Chọn", "Sản Phẩm Đang Hot"
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const plantList = [];
let idCounter = 1;
const quantityPerType = 20;

for (let i = 0; i < quantityPerType; i++) {
    realProductTemplates.forEach((template) => {
        const suffix = variations[i % variations.length];
        const price = randomInt(15, 200) * 10000;

        plantList.push({
            id: idCounter++,
            name: `${template.baseName} - ${suffix}`,
            category: template.category,
            price: price,
            oldPrice: Math.random() > 0.5 ? price + 50000 : null,
            description: `Cây ${template.baseName} chuẩn giống, được tuyển chọn kỹ lưỡng. ${suffix} phù hợp cho sân vườn hoặc trang trại.`,
            images: template.images,
            stock: randomInt(10, 50),
            rating: randomInt(4, 5),
            reviews: randomInt(10, 100)
        });
    });
}

const db = {
    products: plantList,
    cart: [],
    users: [],
    orders: []
};

fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
console.log(`Đã tạo thành công ${plantList.length} sản phẩm`);