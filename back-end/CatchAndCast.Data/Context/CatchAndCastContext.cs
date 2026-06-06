using CatchAndCast.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CatchAndCast.Data.Context;

public class CatchAndCastContext : IdentityDbContext<User>
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Favorite> Favorites { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<ProductCharacteristic> Characteristics { get; set; }
    public DbSet<Review> Reviews { get; set; }

    public CatchAndCastContext(DbContextOptions<CatchAndCastContext> options) : base(options)
    {

    }
    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //{
    //    optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=CatchAndCast;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
    //    base.OnConfiguring(optionsBuilder);
    //}
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Product>()
            .HasKey(x => x.Id);
        builder.Entity<Product>()
            .Property(x => x.ProductName)
            .HasMaxLength(100);
        builder.Entity<Product>()
            .Property(x => x.ProductDescription)
            .HasMaxLength(1500);
        builder.Entity<Product>()
            .Property(x => x.CreatedAt)
            .HasDefaultValueSql("GETDATE()");
        builder.Entity<Product>()
            .Property(x => x.Rating)
            .HasMaxLength(5);
        builder.Entity<Product>()
            .Property(x => x.Rating)
            .HasDefaultValue(0.0);
        builder.Entity<Product>()
            .Property(x => x.CountRate)
            .HasDefaultValue(0);
        builder.Entity<Product>()
            .HasOne(x => x.Category)
            .WithMany(u => u.Products)
            .HasForeignKey(t => t.CategoryId);

        builder.Entity<Category>()
            .HasKey(x => x.Id);
        builder.Entity<Category>()
            .Property(x => x.CategoryName)
            .HasMaxLength(100);

        builder.Entity<Favorite>()
            .HasKey(x => x.Id);
        builder.Entity<Favorite>()
            .HasOne(x => x.User)
            .WithMany(x => x.Favorites)
            .HasForeignKey(x => x.UserId);
        builder.Entity<Favorite>()
            .HasOne(x => x.Product)
            .WithMany(x => x.Favorites)
            .HasForeignKey(x => x.ProductId);
        builder.Entity<Favorite>()
            .HasIndex(x => new { x.UserId, x.ProductId })
            .IsUnique();

        builder.Entity<Cart>()
            .HasKey(x => x.Id);
        builder.Entity<Cart>()
            .HasOne(x => x.User)
            .WithMany(x => x.Carts)
            .HasForeignKey(x => x.UserId);
        builder.Entity<Cart>()
            .Property(x => x.CounterProducts)
            .HasDefaultValue(1);
        builder.Entity<Cart>()
           .HasOne(x => x.Product)
           .WithMany(x => x.Carts)
           .HasForeignKey(x => x.ProductId);
        builder.Entity<Cart>()
            .HasIndex(x => new { x.UserId, x.ProductId })
            .IsUnique();

        builder.Entity<ProductCharacteristic>()
            .HasKey(x=>x.Id);

        builder.Entity<ProductCharacteristic>()
            .HasOne(x => x.Product)
            .WithMany(x => x.Characteristics)
            .HasForeignKey(x => x.ProductId);

        builder.Entity<Review>()
            .HasKey(x => x.Id);
        builder.Entity<Review>()
            .HasOne(x => x.Product)
            .WithMany(x => x.Reviews)
            .HasForeignKey(x => x.ProductId);
         builder.Entity<Review>()
            .HasOne(x => x.User)
            .WithMany(x => x.Reviews)
            .HasForeignKey(x => x.UserId);
         builder.Entity<Review>()
           .Property(x => x.AddDate)
           .HasDefaultValueSql("GETDATE()");

        base.OnModelCreating(builder);
    }
}
