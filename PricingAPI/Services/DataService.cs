using FobohPricingAPI.Models;
using FobohPricingAPI.Repositories;

namespace FobohPricingAPI.Services
{
    public class DataService : IDataService
    {
        private readonly IProductRepository _productRepository;

        public DataService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public IEnumerable<BaseProduct> GetAllProducts()
        {
            return _productRepository.GetAllProducts();
        }

        public IEnumerable<string> GetSubCategories()
        {
            return _productRepository.GetSubCategories();
        }

        public IEnumerable<string> GetSegments()
        {
            return _productRepository.GetSegments();
        }

        public IEnumerable<string> GetBrands()
        {
            return _productRepository.GetBrands();
        }
    }
}
