﻿using CatchAndCast.Data.Context;
using CatchAndCast.Data.Models;
using CatchAndCast.Service.Dto.Characteristic;
using CatchAndCast.Service.Dto.Product;
using CatchAndCast.Service.Dto.Product.Getters;
using CatchAndCast.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CatchAndCast.Service.Services;

public class ProductService : IProductService
{
    private readonly CatchAndCastContext context;
    public ProductService(CatchAndCastContext _context)
    {
        context = _context;
    }

    public async Task DeleteAsync(int id)
    {
        var product = await context.Products.FindAsync(id);
        context.Products.Remove(product);
        await context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Product>> GetAllProductAsync()
    {
        return await context.Products.ToListAsync();
    }

    public async Task<IEnumerable<Product>> GetProductsByCategoryAsync(GetByCategory dto)
    {
        return await context.Products.Where(x => x.CategoryId == dto.CategoryId).ToListAsync();
    }

    public async Task<GetProductWithCharacteristicDto> GetProductWithCharacteristicAsync(GetById dto)
    {
        var item = await context.Products.FindAsync(dto.Id);
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
            CreatedAt = item.CreatedAt,
            Rating = item.Rating,
            CountRate = item.CountRate,
            ProductCharacteristics = selectedCharacteristic.ToList()
        };
        return finishItem;
    }

    public async Task PostProductByIdAsync(CreateProductWithCategoryIdDto dto)
    {
        var newProduct = new Product
        {
            ProductName = dto.ProductName,
            ProductPrice = dto.ProductPrice,
            ProductDescription = dto.ProductDescription,
            ProductImageUrl = dto.ProductImageUrl,
            CategoryId = dto.CategoryId,
            CreatedAt = DateTime.Now
        };
        await context.Products.AddAsync(newProduct);
        await context.SaveChangesAsync();
    }

    public async Task UpdateCategoryAsync(UpdateProductCategoryDto dto)
    {
        var product = await context.Products.FindAsync(dto.Id);
        product.CategoryId = dto.CategoryId;
        await context.SaveChangesAsync();
    }

    public async Task UpdateDescroptionAsync(UpdateDescriptionDto dto)
    {
        var product = await context.Products.FindAsync(dto.Id);
        product.ProductDescription = dto.Description;
        await context.SaveChangesAsync();
    }

    public async Task UpdateProductNameAsync(UpdateProductNameDto dto)
    {
        var product = await context.Products.FindAsync(dto.Id);
        product.ProductName = dto.ProductName;
        await context.SaveChangesAsync();
    }

    public async Task UpdateProductNameAsync(UpdateProductPriceDto dto)
    {
        var product = await context.Products.FindAsync(dto.Id);
        product.ProductPrice = dto.Price;
        await context.SaveChangesAsync();
    }
}
