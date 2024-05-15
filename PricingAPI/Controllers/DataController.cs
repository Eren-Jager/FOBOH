using FobohPricingAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace FobohPricingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DataController : ControllerBase
    {
        private readonly IDataService _dataService;

        public DataController(IDataService dataService)
        {
            _dataService = dataService;
        }

        [HttpGet("allProducts")]
        public IActionResult GetAllProducts()
        {
            var products = _dataService.GetAllProducts();
            return Ok(products);
        }

        [HttpGet("subcategories")]
        public IActionResult GetSubCategories()
        {
            var categories = _dataService.GetSubCategories();
            return Ok(categories);
        }

        [HttpGet("segments")]
        public IActionResult GetSegments()
        {
            var segments = _dataService.GetSegments();
            return Ok(segments);
        }

        [HttpGet("brands")]
        public IActionResult GetBrands()
        {
            var brands = _dataService.GetBrands();
            return Ok(brands);
        }
    }
}
