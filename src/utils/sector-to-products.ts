import data from "../data/frontend_developer_practice.json";

export function sectorToProduct(sector: any) {
    const availableProducts: any[] = [];

    data.sector_product.forEach(currItem => {
        if (currItem.sector === sector) {
            data.products.forEach(currProduct => {
                if (currProduct.name === currItem.product) {
                    availableProducts.push(currProduct)
                }
            })
        }
    });

    return availableProducts
}