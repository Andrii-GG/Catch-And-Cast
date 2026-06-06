using CatchAndCast.Data.Context;
using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Characteristic;
using CatchAndCast.Service.Dto.Product;
using CatchAndCast.Service.Dto.Product.Getters;
using CatchAndCast.Service.Exceptions;
using CatchAndCast.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CatchAndCast.Service.Services;

public class ProductService : IProductService
{
    private readonly CatchAndCastContext context;
    private readonly ICurrentUserService currentUserService;
    public ProductService(CatchAndCastContext _context, ICurrentUserService _currentUserService)
    {
        context = _context;
        currentUserService = _currentUserService;
    }

    public async Task DeleteAsync(int id)
    {
        if (currentUserService.UserRole != Data.Enums.UserRoles.Admin)
        {
            throw new ClosedAction();
        }
        var product = await context.Products.FindAsync(id);
        if (product is null)
        {
            throw new ItemNotFound();
        }
        context.Products.Remove(product);
        await context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Product>> GetAllProductAsync()
    {
        return await context.Products.ToListAsync();
    }

    public async Task<IEnumerable<GetProductDto>> GetProduct(FilterProduct dto)
    {
        if (dto.CategoryId is null)
        {
            var items = await context.Products.Where(x => x.ProductName.Contains(dto.FilterString)).ToListAsync();
            var finishItems = items.Select(x => new GetProductDto
            {
                Id = x.Id,
                CategoryId = x.CategoryId,
                AmountOfProduct = x.AmountOfProduct,
                CountRate = x.CountRate,
                CreatedAt = x.CreatedAt,
                ProductDescription = x.ProductDescription,
                ProductName = x.ProductName,
                ProductImageUrl = x.ProductImageUrl,
                ProductPrice = x.ProductPrice,
                Rating = x.Rating
            });

            return finishItems;
        }
        if (await context.Categories.FindAsync(dto.CategoryId) is null)
        {
            throw new ItemNotFound();
        }
        var itemsWithId = await context.Products.Where(x => x.CategoryId == dto.CategoryId && x.ProductName.Contains(dto.FilterString)).ToListAsync();
        var finish = itemsWithId.Select(x => new GetProductDto {
             Id = x.Id,
             CategoryId = x.CategoryId,
             AmountOfProduct = x.AmountOfProduct,
             CountRate = x.CountRate,
             CreatedAt = x.CreatedAt,
             ProductDescription = x.ProductDescription,
             ProductName = x.ProductName,
             ProductImageUrl = x.ProductImageUrl,
             ProductPrice = x.ProductPrice,
             Rating = x.Rating
        });

        return finish;
    }

    public async Task<IEnumerable<Product>> GetProductsByCategoryAsync(GetByCategory dto)
    {
        return await context.Products.Where(x => x.CategoryId == dto.CategoryId).ToListAsync();
    }



    public async Task<GetProductWithCharacteristicDto> GetProductWithCharacteristicAsync(GetById dto)
    {
        var item = await context.Products.FindAsync(dto.Id);
        if (item is null)
        {
            throw new ItemNotFound();
        }
        var allCharacteristics = await context.Characteristics.Where(x => x.ProductId == dto.Id).ToListAsync();
        var selectedCharacteristic = allCharacteristics.Select(x => new GetCharacteristicDto
        {
            ProductId = x.ProductId,
            NameOfCharacteristic = x.NameOfCharacteristic,
            DescriptionOfCharacteristic = x.DescriptionOfCharacteristic
        });
        var finishItem = new GetProductWithCharacteristicDto
        {
            Id = item.Id,
            ProductName = item.ProductName,
            ProductDescription = item.ProductDescription,
            ProductImageUrl = item.ProductImageUrl,
            ProductPrice = item.ProductPrice,
            AmountOfProduct = item.AmountOfProduct,
            CreatedAt = item.CreatedAt,
            Rating = item.Rating,
            CountRate = item.CountRate,
            ProductCharacteristics = selectedCharacteristic.ToList()
        };
        return finishItem;
    }

    public async Task PostProductByIdAsync(List<CreateProductWithCategoryIdDto> list)
    {
        if (currentUserService.UserRole != Data.Enums.UserRoles.Admin)
        {
            throw new ClosedAction();
        }
        foreach (var dto in list)
        {
            var newProduct = new Product
            {
                ProductName = dto.ProductName,
                ProductPrice = dto.ProductPrice,
                ProductDescription = dto.ProductDescription,
                ProductImageUrl = dto.ProductImageUrl,
                AmountOfProduct = dto.AmountOfProduct,
                CategoryId = dto.CategoryId,
                CreatedAt = DateTime.Now
            };
            await context.Products.AddAsync(newProduct);
        }
        await context.SaveChangesAsync();
    }

    public async Task UpdateCategoryAsync(UpdateProductCategoryDto dto)
    {
        if (currentUserService.UserRole != Data.Enums.UserRoles.Admin)
        {
            throw new ClosedAction();
        }
        var product = await context.Products.FindAsync(dto.Id);
        if (product is null)
        {
            throw new ItemNotFound();
        }
        product.CategoryId = dto.CategoryId;
        await context.SaveChangesAsync();
    }

    public async Task UpdateDescroptionAsync(UpdateDescriptionDto dto)
    {
        if (currentUserService.UserRole != Data.Enums.UserRoles.Admin)
        {
            throw new ClosedAction();
        }
        var product = await context.Products.FindAsync(dto.Id);
        if (product is null)
        {
            throw new ItemNotFound();
        }
        product.ProductDescription = dto.Description;
        await context.SaveChangesAsync();
    }

    public async Task UpdateProductNameAsync(UpdateProductNameDto dto)
    {
        if (currentUserService.UserRole != Data.Enums.UserRoles.Admin)
        {
            throw new ClosedAction();
        }
        var product = await context.Products.FindAsync(dto.Id);
        if (product is null)
        {
            throw new ItemNotFound();
        }
        product.ProductName = dto.ProductName;
        await context.SaveChangesAsync();
    }

    public async Task UpdateProductNameAsync(UpdateProductPriceDto dto)
    {
        if (currentUserService.UserRole != Data.Enums.UserRoles.Admin)
        {
            throw new ClosedAction();
        }
        var product = await context.Products.FindAsync(dto.Id);
        if (product is null)
        {
            throw new ItemNotFound();
        }
        product.ProductPrice = dto.Price;
        await context.SaveChangesAsync();
    }
    public async Task UpdateImageAsync(UpdateImageDto dto)
    {
        if (currentUserService.UserRole != Data.Enums.UserRoles.Admin)
        {
            throw new ClosedAction();
        }
        var product = await context.Products.FindAsync(dto.Id);
        if (product is null)
        {
            throw new ItemNotFound();
        }
        product.ProductImageUrl = dto.Image;
        await context.SaveChangesAsync();
    }

}
