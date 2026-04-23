export default function standardized(string){
        return string.toString()
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "") // Remove Vietnamese diacritics
                .replace(/[đĐ]/g, "d") // Replace đ with d
                .replace(/\s+/g, "-") // Replace spaces with hyphens
                .replace(/[^\w\-]+/g, "") // Remove all non-word characters
                .replace(/\-\-+/g, "-") // Replace multiple hyphens with single hyphen
                .replace(/^-+/, "") // Trim hyphens from start
                .replace(/-+$/, ""); // Trim hyphens from end
};