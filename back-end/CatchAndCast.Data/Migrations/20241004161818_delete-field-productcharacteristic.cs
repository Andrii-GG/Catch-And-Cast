using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CatchAndCast.Data.Migrations
{
    /// <inheritdoc />
    public partial class deletefieldproductcharacteristic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductCharacteristic",
                table: "Products");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProductCharacteristic",
                table: "Products",
                type: "nvarchar(1500)",
                maxLength: 1500,
                nullable: true);
        }
    }
}
