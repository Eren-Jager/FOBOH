using FobohPricingAPI.Models;
using FobohPricingAPI.Repositories;
using Newtonsoft.Json;
using System.Reflection;

namespace FobohPricingAPI.Services
{
    public class PricingService : IPricingService
    {
        private readonly IProductRepository _productRepository;

        public PricingService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public void AdjustPrices(PricingProfile profile)
        {
            IEnumerable<Product> productsToAdjust;

            productsToAdjust = _productRepository.GetProductsBySKUs(profile.products.Select(p => p.sku).ToList());


            foreach (var product in productsToAdjust)
            {
                if (product != null)
                {
                    var basePrice = GetPriceByHeader(product, profile.priceHeader);

                    if (profile.adjustmentType == "fixed")
                    {
                        basePrice = profile.operatorIndicator == "increase"
                            ? basePrice + profile.adjustmentValue
                            : basePrice - profile.adjustmentValue;
                    }
                    else
                    {
                        var adjustment = (profile.adjustmentValue / 100) * basePrice;
                        basePrice = profile.operatorIndicator == "increase"
                            ? basePrice + adjustment
                            : basePrice - adjustment;
                    }
                    SetPriceByHeader(product, profile.priceHeader, basePrice);
                    _productRepository.UpdateProduct(product);
                }
            }
        }

        public IEnumerable<Product> GetProductsBySKUs(List<string> skus)
        {
            return _productRepository.GetProductsBySKUs(skus);
        }

        private decimal GetPriceByHeader(Product product, string priceHeader)
        {
            PropertyInfo prop = typeof(Product).GetProperty(priceHeader, BindingFlags.Public | BindingFlags.Instance);
            if (prop != null)
            {
                object value = prop.GetValue(product, null);
                if (value is decimal decimalValue)
                {
                    return decimalValue;
                }
            }
            return 0;
        }

        private void SetPriceByHeader(Product product, string priceHeader, decimal newValue)
        {
            PropertyInfo prop = typeof(Product).GetProperty(priceHeader, BindingFlags.Public | BindingFlags.Instance);
            if (prop != null)
            {
                prop.SetValue(product, newValue, null);
            }
        }
    }
}
