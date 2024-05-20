const products = [
    {
        title: 'REGAL MATTRESS TOPPER',
        sub_title: 'REGAL MATTRESS TOPPER KING (78×71) M-301',
        description: 'REGAL MATTRESS TOPPER KING (78×71) M-301',
        details: 'REGAL MATTRESS TOPPER DOUBLE (M-301)',
        sku: '745782',
        price: 6000,
        discount: '20',
        discountOn: 'parcent',
        isNewlyArrived: 'true',
        discount: '20%',
        brand: 'Regal',
        images: ['https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-10/mattress-topper.jpg']
    },
    {
        title: 'SLEEPY KING MATTRESS',
        sub_title: 'SLEEPY KING MATTRESS (M-301)',
        description: 'Antifungal, Hygenic, self- ventilation, anti-dust mite, excellent body support, and ergonomic',
        details: 'Comfort laver: Medium soft Material: Rebonded Foam Premium quality quilted fabric Benefits: Antifungal, Hygenic, self- ventilation, anti-dust mite, excellent body support, and ergonomic',
        sku: '745388',
        price: 7440,
        discount: '20',
        discountOn: 'parcent',
        isNewlyArrived: 'true',
        discount: '20%',
        brand: 'Regal',
        images: ['https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-301-1.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/sleepy-0301.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-301.jpg']
    },
    {
        title: 'SLEEPY DOUBLE MATTRESS',
        sub_title: 'SLEEPY DOUBLE MATTRESS (M-301)',
        description: 'Antifungal, Hygenic, self- ventilation, anti-dust mite, excellent body support, and ergonomic',
        details: 'Comfort laver: Medium soft Material: Rebonded Foam Premium quality quilted fabric Benefits: Antifungal, Hygenic, self- ventilation, anti-dust mite, excellent body support, and ergonomic',
        sku: '745384',
        price: 6250,
        discount: '20',
        discountOn: 'parcent',
        isNewlyArrived: 'true',
        discount: '20%',
        brand: 'Regal',
        images: ['https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-301-1.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/sleepy-0301.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-301.jpg']
    },
    {
        title: 'MEDIPEDIC KING MATTRESS',
        sub_title: 'MEDIPEDIC KING MATTRESS (M-301)',
        description: 'Antifungal, Hygienic, Excellent body support',
        details: 'Comfort laver: Medium soft Material: Rebonded Foam Premium quality quilted fabric Benefits: Antifungal, Hygenic, self- ventilation, anti-dust mite, excellent body support, and ergonomic',
        sku: '745380',
        price: 14380,
        discount: '20',
        discountOn: 'parcent',
        isNewlyArrived: 'true',
        discount: '20%',
        brand: 'Regal',
        images: ['https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-301-1.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/sleepy-0301.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-301.jpg']
    },
    {
        title: 'MEDIPEDIC DOUBLE MATTRESS',
        sub_title: 'MEDIPEDIC DOUBLE MATTRESS (M-301)',
        description: 'Antifungal, Hygienic, Excellent body support',
        details: 'Comfort laver: Medium soft Material: Rebonded Foam Premium quality quilted fabric Benefits: Antifungal, Hygenic, self- ventilation, anti-dust mite, excellent body support, and ergonomic',
        sku: '745376',
        price: 12750,
        discount: '20',
        discountOn: 'parcent',
        isNewlyArrived: 'true',
        discount: '20%',
        brand: 'Regal',
        images: ['https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-301-1.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/sleepy-0301.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-301.jpg']
    },
    {
        title: 'ULTRASOFT KING MATTRESS',
        sub_title: 'ULTRASOFT KING MATTRESS (M-301)',
        description: 'Antifungal, Hygienic, Excellent body support',
        details: 'Comfort laver: Medium soft Material: Rebonded Foam Premium quality quilted fabric Benefits: Antifungal, Hygenic, self- ventilation, anti-dust mite, excellent body support, and ergonomic',
        sku: '745372',
        price: 10750,
        discount: '20',
        discountOn: 'parcent',
        isNewlyArrived: 'true',
        discount: '20%',
        brand: 'Regal',
        images: ['https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-301-1.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/sleepy-0301.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-301.jpg']
    },
    {
        title: 'POPULAR KING MATTRESS',
        sub_title: 'POPULAR KING MATTRESS (M-501)',
        description: 'Antifungal, Hygienic, Excellent body support',
        details: 'Comfort laver: Medium soft Material: Rebonded Foam Premium quality quilted fabric Benefits: Antifungal, Hygenic, self- ventilation, anti-dust mite, excellent body support, and ergonomic',
        sku: '745398',
        price: 9630,
        discount: '20',
        discountOn: 'parcent',
        isNewlyArrived: 'true',
        discount: '20%',
        brand: 'Regal',
        images: ['https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-501-1.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-501.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/popular-0501.jpg']
    },
    {
        title: 'POPULAR DOUBLE MATTRESS',
        sub_title: 'POPULAR DOUBLE MATTRESS (M-301)',
        description: 'Antifungal, Hygienic, Excellent body support',
        details: 'Comfort laver: Medium soft Material: Rebonded Foam Premium quality quilted fabric Benefits: Antifungal, Hygenic, self- ventilation, anti-dust mite, excellent body support, and ergonomic',
        sku: '745392',
        price: 8130,
        discount: '20',
        discountOn: 'parcent',
        isNewlyArrived: 'true',
        discount: '20%',
        brand: 'Regal',
        images: ['https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-301-2.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-301-1.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/popular-0301.jpg']
    },
    {
        title: 'MEDIPEDIC KING MATTRESS',
        sub_title: 'MEDIPEDIC KING MATTRESS (M-301)',
        description: 'Antifungal, Hygienic, Excellent body support',
        details: 'Comfort laver: Medium soft Material: Rebonded Foam Premium quality quilted fabric Benefits: Antifungal, Hygenic, self- ventilation, anti-dust mite, excellent body support, and ergonomic',
        sku: '745382',
        price: 14380,
        discount: '20',
        discountOn: 'parcent',
        isNewlyArrived: 'true',
        discount: '20%',
        brand: 'Regal',
        images: ['https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-301-2.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-301-1.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/popular-0301.jpg']
    },
    {
        title: 'MEDIPEDIC DOUBLE MATTRESS',
        sub_title: 'MEDIPEDIC DOUBLE MATTRESS (M-501)',
        description: 'Antifungal, Hygienic, Excellent body support',
        details: 'Comfort laver: Medium soft Material: Rebonded Foam Premium quality quilted fabric Benefits: Antifungal, Hygenic, self- ventilation, anti-dust mite, excellent body support, and ergonomic',
        sku: '745378',
        price: 12750,
        discount: '20',
        discountOn: 'parcent',
        isNewlyArrived: 'true',
        discount: '20%',
        brand: 'Regal',
        images: ['https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-501-1.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-501.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/popular-0501.jpg']
    },
    {
        title: 'ULTRASOFT KING MATTRESS',
        sub_title: 'ULTRASOFT KING MATTRESS (M-501)',
        description: 'Antifungal, Hygienic, Excellent body support',
        details: 'Comfort laver: Medium soft Material: Rebonded Foam Premium quality quilted fabric Benefits: Antifungal, Hygenic, self- ventilation, anti-dust mite, excellent body support, and ergonomic',
        sku: '745374',
        price: 10750,
        discount: '20',
        discountOn: 'parcent',
        isNewlyArrived: 'true',
        discount: '20%',
        brand: 'Regal',
        images: ['https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-501-1.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-501.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/popular-0501.jpg']
    },
    {
        title: 'ULTRASOFT DOUBLE MATTRESS',
        sub_title: 'ULTRASOFT DOUBLE MATTRESS (M-301)',
        description: 'Antifungal, Hygienic, Excellent body support',
        details: 'Comfort laver: Medium soft Material: Rebonded Foam Premium quality quilted fabric Benefits: Antifungal, Hygenic, self- ventilation, anti-dust mite, excellent body support, and ergonomic',
        sku: '745368',
        price: 9500,
        discount: '20',
        discountOn: 'parcent',
        isNewlyArrived: 'true',
        discount: '20%',
        brand: 'Regal',
        images: ['https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-301-2.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/m-301-1.jpg', 'https://admin.regalfurniturebd.com/storage/uploads/fullsize/2023-07/popular-0301.jpg']
    }
]

const categoryId = '664975ab3ad3d3f4adb89066';
const size = [
    '6649747e3ad3d3f4adb8905d',
    '6649747e3ad3d3f4adb8905e',
    '6649747e3ad3d3f4adb8905f',
    '6649747e3ad3d3f4adb89060',
]

const color = [
    '664974123ad3d3f4adb89055',
    '664974123ad3d3f4adb89055',
    '664974123ad3d3f4adb89057',
    '664974123ad3d3f4adb89058',
    '664974123ad3d3f4adb89059',
    '664974123ad3d3f4adb8905a',
    '664974123ad3d3f4adb8905b',
]

const specification = [
    '6648f50a3ad3d3f4adb8903c',
    '6648f50a3ad3d3f4adb8903d',
    '6648f50a3ad3d3f4adb8903e',
]

const modifiedData = products?.map((data, index) => {
    return ({
        "name": data?.title,
        "shortName": data?.sub_title,
        "details": data?.details,
        "description": data?.description,
        "price": data?.price,
        "availableCount": 50,
        "brand": data?.brand,
        "discountAvailable": true,
        "discountPercent": 20,
        "productCode": data?.sku,
        "images": data?.images,
        "category": categoryId,
        "size": size[index % size?.length],
        "color": color[index % color?.length],
        "specificationId": specification[index % specification?.length],

    })
});


console.log(modifiedData)