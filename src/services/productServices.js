import axiosClient from "@/lib/axiosClient";

export function filterByCategory(products,category){
    return products.filter(items=>items.category===category)
};

export function filterByPriceRange(products,min,max){
    return products.filter(items=>items.price<=max&&items.price>=min)
};

export function searchProduct(products,keyword){
    keyword=keyword.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
    return products.filter(items=>items.name.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").includes(keyword));
}

export function sortByPrice(products,order="asc"){
    return order==="desc"?products.sort(function(a,b){return b.price-a.price;} ):
    products.sort(function(a,b){return a.price-b.price;} );
}

export function getProducts(){
    return axiosClient.get("/products");
}

export function getDetailProducts(slug){
    return axiosClient.get(`/showDetails/${slug}`);
}

export async function getProductsByPageSize(params={}){
    const res= await axiosClient.get("/productsByPageSize",{params});
    return res;
}
export async function getTrashedProducts(params={}){
    const res= await axiosClient.get("/trashedProductsByPageSize",{params});
    return res;
}
export async function getNewProducts(param=4){
    const res= await axiosClient.get(`/newProducts/${param}`);
    return res;
}
export async function getSaleProducts(param=4){
    const res= await axiosClient.get(`/saleProducts/${param}`);
    return res;
}
export async function getHotProducts(param=4){
    const res= await axiosClient.get(`/hotProducts/${param}`);
    return res;
}

export function getProductById(id){
    return axiosClient.get(`/products/${id}`);
}

export function createProduct(data){
    return axiosClient.post("/products", data);
}

export async function updateProduct(id, data){
    if (data instanceof FormData) {
        data.append("_method", "PUT");
        return axiosClient.post(`/products/${id}`, data);
    }
    return axiosClient.put(`/products/${id}`, data);
}

export function deleteProduct(id){
    return axiosClient.delete(`/products/${id}`);
}

const productServices = {
    getAll: getProducts,
    getByPageSize: getProductsByPageSize,
    getById: getProductById,
    create: createProduct,
    update: updateProduct,
    delete: deleteProduct,
};

export default productServices;
