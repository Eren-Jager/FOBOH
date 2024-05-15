using FobohPricingAPI.Models;

namespace FobohPricingAPI.Services
{
    public interface IDataService
    {
        IEnumerable<BaseProduct> GetAllProducts();
        IEnumerable<string> GetSubCategories();
        IEnumerable<string> GetSegments();
        IEnumerable<string> GetBrands();
    }
}
