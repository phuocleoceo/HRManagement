using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class RefreshTokenHosting : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "7f50da88-b2f6-4713-a1b3-ca9439d6c2e0");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "c67df226-4e33-4843-a1c2-c68062f70d87");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "f18b574f-2f8d-452e-b3b8-5ab571d6710e", "ad3583e4-993f-4c62-b98d-1ea394670f42", "Manager", "MANAGER" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "80292499-fda6-4f4b-89da-95d51fb01c2e", "415ccb1e-2a99-4953-8fa7-3be15dd97365", "Administrator", "ADMINISTRATOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "80292499-fda6-4f4b-89da-95d51fb01c2e");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "f18b574f-2f8d-452e-b3b8-5ab571d6710e");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "7f50da88-b2f6-4713-a1b3-ca9439d6c2e0", "4c4890d8-5f8a-4f94-8edf-46e1e2781f37", "Manager", "MANAGER" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c67df226-4e33-4843-a1c2-c68062f70d87", "2d588cf7-6baf-4ebd-9821-5ee049935367", "Administrator", "ADMINISTRATOR" });
        }
    }
}
