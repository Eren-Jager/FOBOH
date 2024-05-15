namespace FobohPricingAPI.Models
{
    public class Product : BaseProduct
    {
        public string brand { get; set; }
        public string category { get; set; }
        public string subCategory { get; set; }
        public string segment { get; set; }
        public string style { get; set; }
        public decimal globalWholesalePrice { get; set; }
    }
}
