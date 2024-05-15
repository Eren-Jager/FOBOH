using FobohPricingAPI.Models;

namespace FobohPricingAPI.Services
{
    public interface IPricingService
    {
        void AdjustPrices(PricingProfile profile);
        IEnumerable<Product> GetProductsBySKUs(List<string> skus);
    }
}
