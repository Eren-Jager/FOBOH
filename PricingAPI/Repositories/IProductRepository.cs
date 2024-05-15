using FobohPricingAPI.Models;

namespace FobohPricingAPI.Repositories
{
    public interface IProductRepository
    {
        IEnumerable<BaseProduct> GetAllProducts();
        IEnumerable<string> GetSubCategories();
        IEnumerable<string> GetSegments();
        IEnumerable<string> GetBrands();
        IEnumerable<BaseProduct> SearchProducts(string searchTerm);
        IEnumerable<BaseProduct> FilterProducts(string category, string segment, string brand);
        BaseProduct GetProductBySKU(string sku);
        IEnumerable<Product> GetProductsBySKUs(List<string> skus);
        void UpdateProduct(Product product);
    }
}
