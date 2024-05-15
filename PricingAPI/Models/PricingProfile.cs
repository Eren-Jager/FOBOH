namespace FobohPricingAPI.Models
{
    public class PricingProfile
    {
        public string profileId { get; set; }
        public List<BaseProduct> products { get; set; } = new List<BaseProduct>();
        public string adjustmentType { get; set; }
        public decimal adjustmentValue { get; set; }
        public string operatorIndicator { get; set; }
        public string priceHeader { get; set; } = "globalWholesalePrice";
    }
}
