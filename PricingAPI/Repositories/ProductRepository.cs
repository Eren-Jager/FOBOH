using FobohPricingAPI.Models;
using FuzzySharp;
using Newtonsoft.Json;

namespace FobohPricingAPI.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly List<Product> _products;

        public ProductRepository()
        {
            _products = new List<Product>
            {
                new Product { sku = "HGVPIN216", title = "High Garden Pinot Noir 2021", brand = "High Garden", category = "Alcoholic Beverage", subCategory = "Wine", segment = "Red", globalWholesalePrice = 279.06M },
                new Product { sku = "KOYBRUNV6", title = "Koyama Methode Brut Nature NV", brand = "Koyama Wines", category = "Alcoholic Beverage", subCategory = "Wine", segment = "Sparkling", globalWholesalePrice = 120M },
                new Product { sku = "KOYNR1837", title = "Koyama Riesling 2018", brand = "Koyama Wines", category = "Alcoholic Beverage", subCategory = "Wine", segment = "Port/Dessert", globalWholesalePrice = 215.04M },
                new Product { sku = "KOYRIE19", title = "Koyama Tussock Riesling 2019", brand = "Koyama Wines", category = "Alcoholic Beverage", subCategory = "Wine", segment = "White", globalWholesalePrice = 215.04M },
                new Product { sku = "LACBNATNV6", title = "Lacourte-Godbillon Brut Cru NV", brand = "Lacourte-Godbillon", category = "Alcoholic Beverage", subCategory = "Wine", segment = "Sparkling", globalWholesalePrice = 409.32M }
            };
        }

        public IEnumerable<BaseProduct> GetAllProducts()
        {
            return _products;
        }

        public IEnumerable<BaseProduct> SearchProducts(string searchTerm)
        {
            var threshold = 70; // set to default value for now
            return _products.Where(p =>
                Fuzz.PartialRatio(p.title, searchTerm) >= threshold ||
                Fuzz.PartialRatio(p.sku, searchTerm) >= threshold
            );
        }

        public IEnumerable<BaseProduct> FilterProducts(string category, string segment, string brand)
        {
            return _products.Where(p =>
                (string.IsNullOrEmpty(category) || p.category == category) &&
                (string.IsNullOrEmpty(segment) || p.segment == segment) &&
                (string.IsNullOrEmpty(brand) || p.brand == brand)
            );
        }

        public BaseProduct GetProductBySKU(string sku)
        {
            return _products.FirstOrDefault(p => p.sku == sku);
        }

        public void UpdateProduct(Product product)
        {
            int index = _products.FindIndex(p => p.sku == product.sku);
            if (index != -1)
            {
                _products[index] = product;
            }
            Console.WriteLine(JsonConvert.SerializeObject(_products, Formatting.Indented));
        }

        public IEnumerable<Product> GetProductsBySKUs(List<string> skus)
        {
            return _products.Where(p => skus.Contains(p.sku)).ToList();
        }

        public IEnumerable<string> GetSubCategories()
        {
            return _products.Select(p => p.subCategory).Distinct();
        }

        public IEnumerable<string> GetSegments()
        {
            return _products.Select(p => p.segment).Distinct();
        }

        public IEnumerable<string> GetBrands()
        {
            return _products.Select(p => p.brand).Distinct();
        }
    }
}
