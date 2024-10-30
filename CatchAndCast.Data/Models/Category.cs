using CatchAndCast.Data.Models;
using System.ComponentModel.DataAnnotations;


namespace CatchAndCast.Data.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public string CategoryImageUrl { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
