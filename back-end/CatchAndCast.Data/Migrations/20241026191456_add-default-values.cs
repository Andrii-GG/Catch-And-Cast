using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CatchAndCast.Data.Migrations
{
    /// <inheritdoc />
    public partial class adddefaultvalues : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Rating",
                table: "Products",
                type: "float",
                maxLength: 5,
                nullable: true,
                defaultValue: 0.0,
                oldClrType: typeof(double),
                oldType: "float",
                oldMaxLength: 5,
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CountRate",
                table: "Products",
                type: "int",
                nullable: true,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Rating",
                table: "Products",
                type: "float",
                maxLength: 5,
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldMaxLength: 5,
                oldNullable: true,
                oldDefaultValue: 0.0);

            migrationBuilder.AlterColumn<int>(
                name: "CountRate",
                table: "Products",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true,
                oldDefaultValue: 0);
        }
    }
}
