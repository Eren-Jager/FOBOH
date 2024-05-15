using FobohPricingAPI.Models;
using FobohPricingAPI.Repositories;
using FobohPricingAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace FobohPricingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PricingController : ControllerBase
    {
        private readonly IPricingService _pricingService;
        private readonly IProductRepository _productRepository;

        public PricingController(IPricingService pricingService, IProductRepository productRepository)
        {
            _pricingService = pricingService;
            _productRepository = productRepository;
        }


        [HttpGet("search-products")]
        public IActionResult SearchProducts(string searchTerm)
        {
            var products = _productRepository.SearchProducts(searchTerm);
            return Ok(products);
        }

        [HttpGet("search-SKU")]
        public IActionResult SearchSKU(string sku)
        {
            var product = _productRepository.GetProductBySKU(sku);
            return Ok(product);
        }

        [HttpGet("filter-products")]
        public IActionResult FilterProducts(string category = "", string segment = "", string brand = "")
        {
            var products = _productRepository.FilterProducts(category, segment, brand);
            return Ok(products);
        }

        [HttpPost("adjust-price")]
        public IActionResult AdjustPrice([FromBody] PricingProfile profile)
        {
            _pricingService.AdjustPrices(profile);
            return Ok(profile);
        }

        [HttpPost("fetch-by-skus")]
        public IActionResult FetchProductsBySKUs([FromBody] getFromSKUsRequest request)
        {
            var products = _pricingService.GetProductsBySKUs(request.skus);
            return Ok(products);
        }

        public class getFromSKUsRequest
        {
            public List<string> skus { get; set; }
        }
    }
}
